<template>
  <LoginTemplate :btnText='btnText' :verfication='formIsValid' :id='id' :password='password' :headerText='headerText' :login='login'> 
    <h1 class="headline mb-0 green--text" >Hyunsoo Shin</h1>
    <h3>데이터베이스 기말프로젝트 <br> Welcome to join 크레텍!</h3>
  </LoginTemplate>
</template>





<script>
import LoginTemplate from '../UtilTemplates/LoginSlot';

export default {
  components: {
    LoginTemplate
  },
  data() {
    return {
      id: '',
      password: '',
      btnText: 'Login',
      headerText: 'Login'
    }
  },
  methods: {
    formIsValid(id, password) {
        if(id !== '' && password !== '')
          return false;
        return true;
    },
    login(input, cb) {
      this.$axios({
        method: 'post',
        url: '/Login',
        data: input
      }).then(res => {
        if(typeof res.data === 'object') {
          this.$store.commit('setUserInfo', res.data);
          this.$router.push({ path: '/' });
        } else {
          alert('아이디 혹은 비밀번호가 틀립니다');
        }
        cb();
      }).catch(err => {
        throw err;
      });
    }
  }
}
</script>