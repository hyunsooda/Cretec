


<template>
<v-container>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>회원정보수정</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent='correct'>  
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                :rules='[rules.common]'
                counter='15'
                name="ID"
                label="ID"
                id="ID"
                v-model="id"
                :disabled='true'
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
                    type="submit">correct</v-btn> 
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
import { mapState } from 'vuex';
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
    ...mapState(['userInfo']),
    formIsValid () {
      const regex =  /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}/;
      const numRegex =  /^[0-9]*$/;
      return (regex.test(this.password) === true) && (regex.test(this.password2) === true) &&
              this.password === this.password2 &&
              this.address !== '' && this.phone !== '' && numRegex.test(this.age) && this.age !== '';
    }
  },
  created() {
    this.$axios({
        method: 'post',
        url: '/Fetch',
        data: this.userInfo
    }).then(response => {
      this.id = this.userInfo.id,
      this.address = this.userInfo.address,
      this.phone = this.userInfo.phone,
      this.sex = this.userInfo.sex,
      this.age = this.userInfo.age,  
      this.name = this.userInfo.name,
      this.job = this.userInfo.job,
      this.type = this.userInfo.type
    }).catch(err => {
      throw err;
    });
  },
  methods: {
    correct() {
        this.$axios({
            method: 'post',
            url: '/Correct',
            data: {
              id: this.id,
              password: this.password,
              address: this.address,
              phone: this.phone,
              sex: this.sex,
              age: this.age,
              name: this.name,
              job: this.job,
              type: this.type,
            }
        }).then(res => {
            alert('수정이 완료되었습니다');
            this.$store.commit('setUserInfo', res.data);
        }).catch(err => {
          alert('에러가 발생했습니다');
          throw err;
        });
    }
  }
}
</script>
