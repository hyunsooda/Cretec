<template>
      <v-container>
            <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-card dark>
                <v-card-media src="src/assets/dke.png" height="500px">
                </v-card-media>
                <v-card-title primary-title>
                <div>
                    <slot></slot>
                </div>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>

            <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>{{headerText}}</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent='register'>  
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                
                counter='15'
                name="ID"
                label="ID"
                id="ID"
                v-model="formId"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                type='password'
                :append-icon="'visibility_off'"
                
                counter='15'
                name="PASSWORD"
                label="PASSWORD"
                id="PASSWORD"
                v-model="formPassword"
                required></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-xs3>
                <v-layout row justify-center>
                    <v-btn 
                    color="primary" 
                    slot="activator"
                    :disabled='formVerification'
                    id='submit'
                    type="submit">{{btnText}}</v-btn> 
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
    props: ['id', 'password', 'btnText', 'verfication', 'headerText', 'login'],
    data() {
        return {
            formId: this.id,
            formPassword: this.password
        }
    },
    computed: {
        formVerification() {
            return this.verfication(this.formId, this.formPassword);
        }
    },
    methods: {
        register() {
            this.login({
                ID: this.formId,
                PASSWORD: this.formPassword
            }, _=> {
                this.formPassword = '';
            });
        }
    }
}
</script>