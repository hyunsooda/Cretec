


<template>
      <v-container>
            <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-card dark>
                <v-card-media src="src/assets/ykseo.png" height="500px">
                </v-card-media>
                <v-card-title primary-title>
                <div>
                    <h1 class="headline mb-0 green--text" >Hyunsoo Shin</h1>
                    <h3>데이터베이스 기말프로젝트<br> Welcome to join 크레텍!</h3>
                </div>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>

            <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Create your ID for 크레텍!</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <!-- <form action='/Signup' method='post'>  -->
        <form @submit.prevent='register()'>  
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                :rules='[rules.common]'
                counter='15'
                name="ID"
                label="ID"
                id="ID"
                v-model="id"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                type='password'
                :append-icon="'visibility_off'"
                :rules='[rules.password]'
                counter='15'
                name="PASSWORD"
                label="PASSWORD"
                id="PASSWORD"
                v-model="password"
                required></v-text-field>
            </v-flex>
          </v-layout>
           <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                type='password'
                :append-icon="'visibility_off'"
                :rules='[rules.password]'
                counter='15'
                hint='once again'
                name="PASSWORD2"
                label="PASSWORD CONFIRMATION"
                id="PASSWORD2"
                v-model="password2"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="ADDRESS"
                label="ADDRESS"
                id="ADDRESS"
                v-model="address"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="PHONE"
                label="PHONE"
                id="PHONE"
                v-model="phone"
                required></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-select
              name="SEX"
              :items="sexs"
              v-model='sex'
              label="Sex"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                :rules='[rules.onlyNumber]'
                name="AGE"
                label="AGE"
                id="AGE"
                v-model="age"
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="NAME"
                label="NAME"
                id="NAME"
                v-model="name"
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="JOB"
                label="JOB"
                id="JOB"
                v-model="job"
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-select
              name="TYPE"
              :items="types"
              v-model='type'
              label="Type"
              ></v-select>
            </v-flex>
          </v-layout>

          <v-layout v-show='false' row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="TYPE"
                label="TYPE"
                id="TYPE"
                :items="types"
                v-model="type"
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout v-show='false' row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                :items="sexs"
                name="SEX"
                label="SEX"
                id="SEX"
                v-model="sex"
                ></v-text-field>
            </v-flex>
          </v-layout>


          <v-layout row>
            <v-flex xs12 sm6 offset-xs3>
                <v-layout row justify-center>
                    <v-btn 
                    color="primary" 
                    slot="activator"
                    :disabled="!formIsValid"
                    id='submit'
                    type="submit">Register</v-btn> 
                </v-layout>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>


      </v-container>
</template>


<script>  


export default {
  data () {
    return {  
      id: '',
      password: '',
      password2: '',    
      address: '',  
      phone: '',
      sexs: ['male', 'female'],
      types: ['도매업', '소매업', '기타'],
      sex: '',
      type: '',
      age: '',
      name: '',
      job: '',
      rules: {
        common(value) {
          return (value.length > 15 || value.length <= 5) ? 'please confirm length' : true
        },
        password(value) {
          const regex =  /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}/;
          return regex.test(value) ? true : 
          ` password must be consist of special letters and contain letters of eight at least.
            (패스워드는 반드시 특수문자를 포함하고 최소 8자리 이상이어야 합니다)`;
        },
        onlyNumber(value) {
          const regex = /^[0-9]*$/;
          return regex.test(value) ? true : 'you have to give only number without any string(숫자만입력하세요)';
        }
      }
    }
  },
  computed: {
    formIsValid () {
      const regex =  /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}/;
      const numRegex =  /^[0-9]*$/;
      return (! (this.id.length > 15 || this.id.length <= 5)) && 
              (regex.test(this.password) === true) && (regex.test(this.password2) === true) &&
              this.password === this.password2 &&
              this.address !== '' && this.phone !== '' && numRegex.test(this.age) && this.age !== '';
    }
  },
  methods: {
    register() {
      this.$axios({
        method: 'post',
        url: '/Signup',
        data: {
          ID: this.id,
          PASSWORD: this.password,
          ADDRESS: this.address,
          PHONE: this.phone,
          SEX: this.sex,
          AGE: this.age,  
          NAME: this.name,
          JOB: this.job,
          TYPE: this.type
        }
      }).then(response => {
        console.log(response.data)
        if(typeof response.data === 'object') {
          alert('아이디가 생성되었습니다');
          this.$store.commit('setUserInfo', response.data);
          this.$router.push({ path: '/' });
        } else {
          alert('이미 아이디가 존재합니다');
        }
      }).catch(err => {
        throw err;
      });
    }
  }
}
</script>
