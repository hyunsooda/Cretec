<template>
<div>
<div>

        <br><br><br><br>
        <v-container>
            <v-layout
        align-center
        column
        >
        <h1 class="display-2 font-weight-thin mb-3">구매이력</h1>
        <h4 class="subheading">Purchase History</h4>
        </v-layout>

        <br><br><br><br>
         <v-data-iterator
            :items="items"
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
            content-tag="v-layout"
            row
            wrap
            >
            <v-flex
                slot="item"
                slot-scope="props"
                xs12
                sm6
                md4
                lg3
            >
                <v-card>
                <v-card-title><h4>상품 이름 : {{ props.item.name }}</h4></v-card-title>
                <v-divider></v-divider>
                <v-list dense>
                    <v-list-tile>
                    <v-list-tile-content>상품 가격 :</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.price }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                    <v-list-tile-content>상품 갯수 :</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.count }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                    <v-list-tile-content>구매 날짜 :</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.shipping_date }}</v-list-tile-content>
                    </v-list-tile>
                </v-list>
                </v-card>
            </v-flex>
        </v-data-iterator>
        </v-container>

    </div>
</div>
</template>


<script>
import {mapState, mapGetters} from 'vuex';
export default {
    data() {
        return {
            items: undefined,
            rowsPerPageItems: [4, 8],
            pagination: {
                rowsPerPage: 4
            }
        }
    },
    computed: {
        ...mapState(['userInfo']),
        height() {
            return window.innerHeight;
        },
    },
    created() {
        this.$axios({
            method: 'post',
            url: '/GetPurchaseHistory',
            data: {
                custid: this.userInfo.id
            }
        }).then(res => {
            if(typeof res.data === 'object') {
                this.items = res.data;
                for(let i=0; i<this.items.length; i++)
                    this.items[i].shipping_date = new Date(this.items[i].shipping_date).format('yyyy년 MM월 dd일 E hh시 mm분 ss초');
            }
        }).catch(err => {
            throw err;
        })
    }
}
/*
select item.name,price,count,shipping_date from
    (select cust_id_FK,item_id_FK,shipping_date,count from `Order` where cust_id_FK='retell7') as T
    join customer on customer.id=T.cust_id_FK join item on item.id=T.item_id_FK



'select item.name,price,count,shipping_date from' +
    '(select cust_id_FK,item_id_FK,shipping_date,count from `Order` where cust_id_FK='+"'"+req.body.custid+"') as T"+
    'join customer on customer.id=T.cust_id_FK join item on item.id=T.item_id_FK'
상품이름, 상품가격, 상품수량 (item)
구매날짜,
*/

</script>

