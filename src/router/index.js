import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Profile from '../components/User/Profile'
import Signup from '../components/User/Signup'
import Login from '../components/User/Login'
import NotFound from '../components/NotFound'
import List from '../components/UtilTemplates/List';
import Basket from '../components/User/Basket';
import History from '../components/User/History';
import Simulation from '../components/Admin/Simulation';
import Stocklist from '../components/Admin/Stocklist'
import MonthSales from '../components/Admin/MonthSales';
import TotalSales from '../components/Admin/TotalSales';
import DailySales from '../components/Admin/DailySales';
import DeliveryCompanyInfo from '../components/Admin/DeliveryCompanyInfo';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/List',
      name: 'List',
      component: List
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/Basket',
      name: 'Basket',
      component: Basket
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/History',
      name: 'History',
      component: History
    },
    {
      path: '/Simulation',
      name: 'Simulation',
      component: Simulation
    },
    {
      path: '/Stocklist',
      name: 'Stocklist',
      component: Stocklist
    },
    {
      path: '/MonthSales',
      name: 'MonthSales',
      component: MonthSales
    },
    {
      path: '/DailySales',
      name: 'DailySales',
      component: DailySales
    },
    {
      path: '/TotalSales',
      name: 'TotalSales',
      component: TotalSales
    },
    {
      path: '/DeliveryCompanyInfo',
      name: 'DeliveryCompanyInfo',
      component: DeliveryCompanyInfo
    },
    { 
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ],
  mode: 'history'
});
