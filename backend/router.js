const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const connection = require('../src/config/database').connection;
const bcrypt = require('bcrypt-nodejs');
const redis = require('redis');
const redisClient = redis.createClient();
require('../src/Util');

router.post('/Login', (req, res, next) => {
  passport.authenticate('local-login', (err, user, info) => {
    if(err) {
      res.end('FAIL');
      return;
    }
    req.logIn(user, err => {
      if(err) {
        res.end('FAIL');
        return;
      }
      req.session.save(_=> {
        connection.query(`select * from customer where id = '${req.user.id}'`, (err, result) => {
          delete result[0].pswd;
          res.json(result[0]);
        });
      });
      redisClient.lpush(new Date().format('yyyy-MM-dd'), new Date().format('yyyy년 MM월 dd일 E hh시 mm분 ss초') + ': ' + req.user.id, (err, reply) => {
        // nothing...
      })
    });
    return;
  })(req, res, next);
  return;
})
router.post('/Signup', (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    if(err) {
      res.end('FAIL')
      return;
    }
    req.logIn(user, err => {
      if(err) {
        res.end('FAIL')
        return;
      }
      req.session.save(() => {
        connection.query(`select * from customer where id = '${req.user.id}'`, (err, result) => {
          delete result[0].pswd;
          res.json(result[0]);
        })
      });
    });
    return;
  })(req,res,next);
  return;
});

router.post('/Fetch', (req, res, next) => {
  connection.query(`select * from customer where id = '${req.body.id}'`, (err, result) => {
    if(err)
      res.end('error');
    delete result[0].pswd;
    res.json(result[0]);
  })
});


router.post('/Correct', (req, res, next) => {
  let query;
  let pArr = [];

  for(let prop in req.body) {
    if(prop === 'password') {
      req.body[prop] = bcrypt.hashSync(req.body[prop], bcrypt.genSaltSync(8), null);
      query = `UPDATE Customer SET pswd = '${req.body[prop]}' WHERE id = '${req.body.id}'`;
    } else if(typeof req.body[prop] === 'string')
        query = `UPDATE Customer SET ${prop} = '${req.body[prop]}' WHERE id = '${req.body.id}'`;
    else 
      query = `UPDATE Customer SET ${prop} = ${req.body[prop]} WHERE id = '${req.body.id}'`;
    console.log(query);
    pArr.push(new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if(err)
          reject();
        resolve();
      });
    }));
  }

  Promise.all(pArr).then(value => {
    // console.log(`select * from customer where id = '${req.body.id}'`)
    connection.query(`select * from customer where id = '${req.body.id}'`, (err, result) => {
      if(err)
        res.end('error');
      // console.log('결과', result[0]);
      delete result[0].pswd;
      res.json(result[0]);
    })
  }, reason => {
    res.end('error')
  });
});

router.post('/getItems', (req, res, next) => {
  connection.query(`select * from item where name like '%${req.body.name}%'`, (err, result) => {
    if(err)
      res.end('error');
    if(typeof result[0] === 'object')
      res.json(result);
    else 
      res.end('none');
  });
});

// select * from customer as c join basket as b on c.id=b.cust_id_FK;
router.post('/AddToBasket', (req, res, next) => {
  connection.query(`select * from basket where cust_id_FK='${req.body.custid}' AND item_id_FK='${req.body.itemid}'`, (err, result) => {
    if(result.length) {
      res.end('already');
      return;
    }
    connection.query(`insert into basket (count,cust_id_FK,item_id_FK) values(1, '${req.body.custid}', ${req.body.itemid})`, (err, result) => {
      if(err)
        res.end('error');
      if(typeof result === 'object')
        res.json('Success');
      else 
        res.end('none');
    });
  });
});

router.post('/Buy', (req, res, next) => {
  let delivery_company_name;

  connection.beginTransaction(err => {
    if(err) {
      res.end('error');
      return;
    }
    /*
    START TRNASACTION 혹은 BEGIN으로 시작해서
    COMMIT 사이에 있는 update,delete statement가 있을시 update,delete되는 테이블은 다른 트랜젝션에서는 COMMIT되기전까지 블럭킹된다. 
    */

    connection.query(`select stock from item where id=${req.body.itemid}`, (err, result) => {
      if(err) {
        res.end('error');
        return;
      }
      if(result[0].stock < req.body.stock) {
        res.end('full');
        return;
      }
      connection.query(`update item set stock = stock - ${req.body.stock} where id=${req.body.itemid} `, (err, result) => {
        if(err)
          res.end('error');
        connection.query(`delete from basket where cust_id_FK='${req.body.custid}' AND item_id_FK=${req.body.itemid}`, (err, result) => {
          if(err) {
            res.end('error');
            return;
          }

          connection.query('select name from delivery_company', (err, result) => {
            if(err) {
              res.end('error');
              return;
            }
            delivery_company_name = "'"+ result[Math.floor(Math.random() * 3)].name + "'";
            console.log(delivery_company_name);

            connection.query(`update delivery_company set del_count = del_count + 1 where name=${delivery_company_name}`, (err, result) => {
              if(err) {
                res.end('error');
                return;
              }
              connection.query('insert into `Order` (cust_id_FK,item_id_FK,count,shipping_date,delivery_company_name_FK) values(' +
                            "'"+req.body.custid+"',"+req.body.itemid+","+req.body.stock+","+"'"+req.body.date+"',"+ delivery_company_name + ')', (err, result) => {
                if(err) {
                  res.end('error');
                  return;
                }
                connection.query(`select * from basket where cust_id_FK='${req.body.custid}'`, (err, result) => {
                  if(err)
                    res.end('error');
                  connection.commit(err => {
                    if (err) 
                      return connection.rollback(err => { throw err } );
                      res.json(result);
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

router.post('/getMyBasket', (req, res, next) => {  
  connection.query(`select * from basket as b join customer as c on c.id=b.cust_id_FK join item as i on b.item_id_FK=i.id where c.id='${req.body.id}'`, (err, result) => {
    if(err)
      res.end('error');
    if(typeof result === 'object') {
      for(let i=0; i<result.length; i++)
        delete result[i].pswd;
      res.json(result);
    }
    else 
      res.end('none');
  });
});

router.post('/RemoveBasket', (req, res, next) => {
  connection.query(`delete from basket where cust_id_FK='${req.body.cust_id_FK}' AND item_id_FK=${req.body.item_id_FK}`, (err, result) => {
    if(err) {
      res.end('error');
      return;
    }
    res.end('Success');
  });
});

router.post('/GetPurchaseHistory', (req, res, next) => {
  console.log('select item.name,price,count,shipping_date from ' +
  '(select cust_id_FK,item_id_FK,shipping_date,count from `Order` where cust_id_FK='+"'"+req.body.custid+"') as T "+
  'join customer on customer.id=T.cust_id_FK join item on item.id=T.item_id_FK')
  connection.query('select item.name,price,count,shipping_date,delivery_company_name_FK from ' +
  '(select cust_id_FK,item_id_FK,shipping_date,count,delivery_company_name_FK from `Order` where cust_id_FK='+"'"+req.body.custid+"') as T "+
  'join customer on customer.id=T.cust_id_FK join item on item.id=T.item_id_FK', (err, result) => {
    if(err) {
      res.end('error');
      return;
    }
    res.json(result);
  });
});

router.post('/IsAdmin', (req, res, next) => {
  connection.query(`select * from customer where id='${req.body.id}'`, (err, result) => {
    if(err) {
      res.end('error');
      return;
    }
    if(result.length && result[0].id === 'Admin123') {
      if(bcrypt.compareSync(req.body.pswd, result[0].pswd))
        res.end('Success');
      else 
        res.end('FAIL')
    } else 
      res.end('FAIL')
  });
})

router.post('/Logout', (req, res, next) => {
  req.logout();
  res.end();
});

router.get('/GetAllItems', (req, res, next) => {
  connection.query(`select * from item`, (err, result) => {
    if(err) {
      res.end('error');
      return;
    }
    res.json(result);
  });
})

router.post('/IncreaseStock', (req, res, next) => {
    connection.query(`update item set stock = stock + ${req.body.num} where id=${req.body.id} `, (err, result) => {
      if(err) {
        res.end('error');
        return;
      }
      connection.query(`select * from item`, (err, result) => {
        if(err) {
          res.end('error');
          return;
        }
        res.json(result);
      });
    });
});

router.get('/GetStockZeroItems', (req, res, next) => {
  connection.query(`select * from item where stock=0`, (err, result) => {
    if(err) {
      res.end('error');
      return;
    }
    res.json(result);
  });
});

router.get('/GetMonthSales', (req, res, next) => {
  connection.query("select SUM(price * count) as Month_sales,DATE(shipping_date) as session " +
  "from `Order` O,Item I " +
  "where (O.item_id_FK=I.id) AND " +
        "DATE(shipping_date) >= STR_TO_DATE('2010-01-01','%Y-%m-%d') AND DATE(shipping_date) <=STR_TO_DATE('2018-12-30','%Y-%m-%d') " +
  "group by session;", (err, result) => {
    if(err) {
      res.end('error');
      return;
    }
    res.json(result);
  });
});

router.get('/GetDailySales', (req, res, next) => {
  connection.query("select SUM(price * count) as Daily_sales,DATE(shipping_date) as session "+
  "from `Order` O,Item I "+
  "where O.item_id_FK=I.id "+
  "group by session;", (err, result) => {
    if(err) {
      res.end('error');
      return;
    }
    res.json(result);
  });
});

router.get('/GetTotalSales', (req, res, next) => {
  connection.query("select SUM(price * count) as Total_sales " +
  "from `Order` O,Item I " +
  "where O.item_id_FK=I.id;", (err, result) => {
    if(err) {
      res.end('error');
      return;
    }
    res.json(result);
  });
});

router.get('/GetDeliveryCompanyInfo', (req, res, next) => {
  connection.query(`select name,del_count from Delivery_company;`, (err, result) => {
    if(err) {
      res.end('error');
      return;
    }
    res.json(result);
  });
});


router.get('/getInfo/:id', (req, res, next) => {
  
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}


module.exports = router;
