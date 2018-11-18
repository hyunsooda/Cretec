<template>
  <v-app m-a-0>
    <v-navigation-drawer temporary absolute v-model="sideNav">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    
    <v-toolbar dark class="blue">
      <v-toolbar-side-icon 
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up "></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Home</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems" 
          v-show="adjustView(item.title)"
          :id="item.title"
          :key="item.title"
          :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn
          flat
          v-show="adjustView('Category')"
          @click="categoryClick"
        >
          <v-icon left dark>apps</v-icon>
          Category
        </v-btn>
        <v-btn
          flat
          v-show="adjustView('Manage')"
          @click="manageClick"
        >
          <v-icon left dark>folder_shared</v-icon>
          Manage
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>



  <v-navigation-drawer style='position:absolute; left:0px; top:0px;'
    stateless
    :value="true"
    v-if='isCategoryActivated'
  >

  <v-list-tile>
        <v-list-tile-action>
          <v-icon>search</v-icon>
        </v-list-tile-action>
        <v-text-field v-model='search' v-on:keyup.enter="getItem" />
  </v-list-tile>



    <v-list>
      <v-list-group
        prepend-icon="account_circle"
        :value="false"
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>철물 원예 사무용품</v-list-tile-title>
        </v-list-tile>

        <v-list-group
          no-action
          sub-group
          :value="false"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>사다리,운반기</v-list-tile-title>
          </v-list-tile>

          <v-list-group
          no-action
          sub-group
          :value="false"
          >
            <v-list-tile slot="activator">
              <v-list-tile-title>사다리</v-list-tile-title>
            </v-list-tile>

              <v-list-tile 
                v-for="(crud, i) in a_first"
                :key="i"
                @click='enterMenu(crud[0])'
              >
                <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="crud[1]"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
          </v-list-group>

          <v-list-group
          no-action
          sub-group
          :value="false"
          >
              <v-list-tile slot="activator">
              <v-list-tile-title>캐스터</v-list-tile-title>
            </v-list-tile>

              <v-list-tile 
                v-for="(crud, i) in a_second"
                :key="i"
                @click='enterMenu(crud[0])'
              >
                <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="crud[1]"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
          </v-list-group>

          <v-list-group
          no-action
          sub-group
          :value="false"
          >
              <v-list-tile slot="activator">
              <v-list-tile-title>핸드트럭</v-list-tile-title>
            </v-list-tile>

              <v-list-tile 
                v-for="(crud, i) in a_third"
                :key="i"
                @click='enterMenu(crud[0])'
              >
                <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="crud[1]"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
          </v-list-group>
        </v-list-group>  

        <v-list-group
          no-action
          sub-group
          :value="false"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>생활청소용품</v-list-tile-title>
          </v-list-tile>

          <v-list-group
          no-action
          sub-group
          :value="false"
          >
            <v-list-tile slot="activator">
              <v-list-tile-title>건전지</v-list-tile-title>
            </v-list-tile>

              <v-list-tile 
                v-for="(crud, i) in a_fourth"
                :key="i"
                @click='enterMenu(crud[0])'
              >
                <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="crud[1]"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
          </v-list-group>

          <v-list-group
          no-action
          sub-group
          :value="false"
          >
              <v-list-tile slot="activator">
              <v-list-tile-title>청소용품</v-list-tile-title>
            </v-list-tile>

              <v-list-tile 
                v-for="(crud, i) in a_five"
                :key="i"
                @click='enterMenu(crud[0])'
              >
                <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="crud[1]"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
          </v-list-group>

          <v-list-group
          no-action
          sub-group
          :value="false"
          >
              <v-list-tile slot="activator">
              <v-list-tile-title>생활용품</v-list-tile-title>
            </v-list-tile>

              <v-list-tile 
                v-for="(crud, i) in a_six"
                :key="i"
                @click='enterMenu(crud[0])'
              >
                <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="crud[1]"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
          </v-list-group>
        </v-list-group>  
      </v-list-group>
      <!--    ----------------------------------------------------------------------- -->
      <v-list-group
        prepend-icon="account_circle"
        :value="false"
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>안전용품</v-list-tile-title>
        </v-list-tile>

        <v-list-group
          no-action
          sub-group
          :value="false"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>안면보호구</v-list-tile-title>
          </v-list-tile>

          <v-list-group
          no-action
          sub-group
          :value="false"
          >
            <v-list-tile slot="activator">
              <v-list-tile-title>보안경</v-list-tile-title>
            </v-list-tile>

              <v-list-tile 
                v-for="(crud, i) in b_first"
                :key="i"
                @click='enterMenu(crud[0])'
              >
                <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="crud[1]"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
          </v-list-group>

          <v-list-group
          no-action
          sub-group
          :value="false"
          >
              <v-list-tile slot="activator">
              <v-list-tile-title>용접면</v-list-tile-title>
            </v-list-tile>

              <v-list-tile 
                v-for="(crud, i) in b_second"
                :key="i"
                @click='enterMenu(crud[0])'
              >
                <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="crud[1]"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
          </v-list-group>

          <v-list-group
          no-action
          sub-group
          :value="false"
          >
              <v-list-tile slot="activator">
              <v-list-tile-title>호흡보호구</v-list-tile-title>
            </v-list-tile>

              <v-list-tile 
                v-for="(crud, i) in b_third"
                :key="i"
                @click='enterMenu(crud[0])'
              >
                <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="crud[1]"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
          </v-list-group>
        </v-list-group>  

        <v-list-group
          no-action
          sub-group
          :value="false"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>도로안전용품</v-list-tile-title>
          </v-list-tile>

          <v-list-group
          no-action
          sub-group
          :value="false"
          >
            <v-list-tile slot="activator">
              <v-list-tile-title>경고용품</v-list-tile-title>
            </v-list-tile>

              <v-list-tile 
                v-for="(crud, i) in b_fourth"
                :key="i"
                @click='enterMenu(crud[0])'
              >
                <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="crud[1]"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
          </v-list-group>

          <v-list-group
          no-action
          sub-group
          :value="false"
          >
              <v-list-tile slot="activator">
              <v-list-tile-title>차단용품</v-list-tile-title>
            </v-list-tile>

              <v-list-tile 
                v-for="(crud, i) in b_five"
                :key="i"
                @click='enterMenu(crud[0])'
              >
                <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="crud[1]"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
          </v-list-group>

          <v-list-group
          no-action
          sub-group
          :value="false"
          >
              <v-list-tile slot="activator">
              <v-list-tile-title>도로안전용품</v-list-tile-title>
            </v-list-tile>

              <v-list-tile 
                v-for="(crud, i) in b_six"
                :key="i"
                @click='enterMenu(crud[0])'
              >
                <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="crud[1]"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
          </v-list-group>
        </v-list-group>  
      </v-list-group>
      <!--    ----------------------------------------------------------------------- -->
      <v-list-group
        prepend-icon="account_circle"
        :value="false"
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>산업용품</v-list-tile-title>
        </v-list-tile>

        <v-list-group
          no-action
          sub-group
          :value="false"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>전자기자재</v-list-tile-title>
          </v-list-tile>

          <v-list-group
          no-action
          sub-group
          :value="false"
          >
            <v-list-tile slot="activator">
              <v-list-tile-title>배선기구</v-list-tile-title>
            </v-list-tile>

              <v-list-tile 
                v-for="(crud, i) in c_first"
                :key="i"
                @click='enterMenu(crud[0])'
              >
                <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="crud[1]"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
          </v-list-group>

          <v-list-group
          no-action
          sub-group
          :value="false"
          >
              <v-list-tile slot="activator">
              <v-list-tile-title>제어기기</v-list-tile-title>
            </v-list-tile>

              <v-list-tile 
                v-for="(crud, i) in c_second"
                :key="i"
                @click='enterMenu(crud[0])'
              >
                <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="crud[1]"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
          </v-list-group>

          <v-list-group
          no-action
          sub-group
          :value="false"
          >
              <v-list-tile slot="activator">
              <v-list-tile-title>조작스위치</v-list-tile-title>
            </v-list-tile>

              <v-list-tile 
                v-for="(crud, i) in c_third"
                :key="i"
                @click='enterMenu(crud[0])'
              >
                <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="crud[1]"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
          </v-list-group>
        </v-list-group>  

        <v-list-group
          no-action
          sub-group
          :value="false"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>냉난방용품</v-list-tile-title>
          </v-list-tile>

          <v-list-group
          no-action
          sub-group
          :value="false"
          >
            <v-list-tile slot="activator">
              <v-list-tile-title>가전용품</v-list-tile-title>
            </v-list-tile>

              <v-list-tile 
                v-for="(crud, i) in c_fourth"
                :key="i"
                @click='enterMenu(crud[0])'
              >
                <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="crud[1]"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
          </v-list-group>

          <v-list-group
          no-action
          sub-group
          :value="false"
          >
              <v-list-tile slot="activator">
              <v-list-tile-title>동절용</v-list-tile-title>
            </v-list-tile>

              <v-list-tile 
                v-for="(crud, i) in c_five"
                :key="i"
                @click='enterMenu(crud[0])'
              >
                <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="crud[1]"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
          </v-list-group>

          <v-list-group
          no-action
          sub-group
          :value="false"
          >
              <v-list-tile slot="activator">
              <v-list-tile-title>하절용</v-list-tile-title>
            </v-list-tile>

              <v-list-tile 
                v-for="(crud, i) in c_six"
                :key="i"
                @click='enterMenu(crud[0])'
              >
                <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="crud[1]"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
          </v-list-group>
        </v-list-group>  
      </v-list-group>
    </v-list>
  </v-navigation-drawer>

  <v-navigation-drawer 
          stateless
          value="true"
          style='position:absolute; left:0px; top:0px;'
          v-if='isManageActivated'
        >
          <v-toolbar flat>
            <v-list>
              <v-list-tile>
                <v-list-tile-title class="title">
                  관라자 페이지
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-toolbar>

          <v-divider></v-divider>

          <v-list>
            <v-list-tile @click='simulation'>
              <v-list-tile-action>
                <v-icon>layers</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>재고 시뮬레이션</v-list-tile-title>
            </v-list-tile>
            
            <v-list-tile @click='getStockZeroItems'>
              <v-list-tile-action>
                <v-icon>done</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>재고없는 상품확인</v-list-tile-title>
            </v-list-tile>

            <v-list-tile @click='checkTotal'>
              <v-list-tile-action>
                <v-icon>grade</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>총매출확인</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click='checkDaily'>
              <v-list-tile-action>
                <v-icon>grade</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>일별매출확인</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click='checkMonth'>
              <v-list-tile-action>
                <v-icon>grade</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>월별매출확인</v-list-tile-title>
            </v-list-tile>

            <v-list-tile @click='checkDelivery'>
              <v-list-tile-action>
                <v-icon>flight</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>배송업체 현황</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>

    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>




<script>
import { mapState } from 'vuex';
import router from 'vue-router';
  export default {
    data () {
      return {
        sideNav: false,
        isCategoryActivated: false,
        isManageActivated: false,
        search: '',
        a_first: [
          ['로프사다리', 'people_outline'],
          ['과수용사다리', 'settings'],
          ['가정용사다리', 'people_outline'],
          ['다기능사다리', 'settings']
        ],
        a_second: [
          ['캐스터_고무고정', 'people_outline'],
          ['캐스터_고무브레이크', 'people_outline'],
          ['캐스터_고무회전', 'settings'],
          ['캐스터_우레탄고정', 'settings']
        ],
        a_third: [
          ['바퀴', 'people_outline'],
          ['운반구', 'people_outline'],
          ['핸드카', 'settings'],
          ['테크트럭', 'settings']
        ],
        a_fourth: [
          ['충전지', 'people_outline'],
          ['리튬건전지', 'settings'],
          ['건전지_알카라인', 'people_outline'],
          ['건전지_망간', 'settings']
        ],
        a_five: [
          ['휴지통', 'people_outline'],
          ['건조대', 'people_outline'],
          ['분리수거', 'settings'],
          ['용기', 'settings']
        ],
        a_six: [
          ['바스켓', 'people_outline'],
          ['옷걸이', 'people_outline'],
          ['용기', 'settings'],
          ['종이컵', 'settings']
        ],

        b_first: [
          ['안경렌즈', 'people_outline'],
          ['안전안경', 'settings'],
          ['차광안경', 'people_outline'],
          ['클립형보안경', 'settings']
        ],
        b_second: [
          ['개폐면', 'people_outline'],
          ['수동면', 'people_outline'],
          ['자동차광용접면', 'settings'],
          ['황사마스크', 'settings']
        ],
        b_third: [
          ['대피용마스크', 'people_outline'],
          ['방진마스크', 'people_outline'],
          ['방독마스크', 'settings'],
          ['황사마스크', 'settings']
        ],
        b_fourth: [
          ['경고등', 'people_outline'],
          ['경광등', 'settings'],
          ['경광등', 'people_outline'],
          ['신호봉', 'settings']
        ],
        b_five: [
          ['바리케이드', 'people_outline'],
          ['플라스틱체인', 'people_outline'],
          ['꼬깔콘', 'settings'],
          ['경고판', 'settings']
        ],
        b_six: [
          ['간판틀', 'people_outline'],
          ['걸이대', 'people_outline'],
          ['안전망', 'settings'],
          ['과속방지턱', 'settings']
        ],
        c_first: [
          ['누전차단기', 'people_outline'],
          ['배선차단기', 'settings'],
          ['열수축튜브', 'people_outline'],
          ['콘센트', 'settings']
        ],
        c_second: [
          ['기록계', 'people_outline'],
          ['타임스위치', 'people_outline'],
          ['회전경광등', 'settings'],
          ['온도컨트롤러', 'settings']
        ],
        c_third: [
          ['근접센서', 'people_outline'],
          ['단자대', 'people_outline'],
          ['발판스위치', 'settings'],
          ['제어용스위치', 'settings']
        ],
        c_fourth: [
          ['가스레인지', 'people_outline'],
          ['공기청정기', 'settings'],
          ['믹서기', 'people_outline'],
          ['빙수기', 'settings']
        ],
        c_five: [
          ['가습기', 'people_outline'],
          ['라디에이터', 'people_outline'],
          ['매트류', 'settings'],
          ['열풍기', 'settings']
        ],
        c_six: [
          ['박스팬', 'people_outline'],
          ['벅킬러', 'people_outline'],
          ['선풍기', 'settings'],
          ['타워팬', 'settings']
        ],

      menuItems: [
          { icon: 'person', title: 'Profile', link: '/Profile' },
          { icon: 'face', title: 'Sign up', link: '/Signup' },
          { icon: 'lock_open', title: 'Login', link: '/Login' },
          { icon: 'shopping_basket', title: 'Basket', link: '/Basket' },
          { icon: 'history', title: 'History', link: '/History' },
          { icon: 'lock', title: 'Logout' }, // link 안달면 버튼태그로 만들어짐
        ],
      }
    },
    computed: {
      ...mapState(['userInfo']),
    },
    mounted() {
      document.querySelector('#Logout').onclick = e => {
        this.$axios({
          method: 'post',
          url: 'Logout'
        }).then(_=> {
          this.$store.commit('setUserInfo', undefined);
          this.$router.push({ path: '/' });
        });
      }
    },
    methods: {
      toggle() {
        sideNav = !sideNav;
      },
      adjustView(title) {
        if(title === 'Sign up' && this.userInfo)
          return false;
        else if(title === 'Profile' && !this.userInfo)
          return false;
        else if(title === 'Logout' && !this.userInfo)
          return false;
        else if(title === 'Login' && this.userInfo)
          return false;
        else if(title === 'Category' && !this.userInfo)
          return false;
        else if(title === 'Basket' && !this.userInfo)
          return false;
        else if(title === 'Basket' && this.userInfo && this.userInfo.id === 'Admin123')
          return false;
        else if(title === 'History' && !this.userInfo)
          return false;
        else if(title === 'History' && this.userInfo.id === 'Admin123')
          return false;
        
        
        if(title === 'Manage' && this.userInfo && this.userInfo.id === 'Admin123') 
          return true;
        else if(title === 'Manage')
          return false;
        return true;
      },
      categoryClick() {
        this.isCategoryActivated = !this.isCategoryActivated;
      },
      manageClick() {
        let pswd = prompt('비밀번호를 입력하세요');
    
        this.$axios({
          method: 'post',
          url: '/IsAdmin',
          data:{
            id: this.$store.state.userInfo.id,
            pswd: pswd
          }
        }).then(res => {  
          if(res.data === 'Success') 
            this.isManageActivated = !this.isManageActivated;    
          else 
            alert('비밀번호가 틀렸습니다');
        }).catch(err => {
          throw err;
        });
      },
      enterMenu(text) {
        text = text.split("'").join('');
        this.$axios({
          method: 'post',
          url: '/getItems',
          data: {
            name: text
          }
        }).then(res => {
          if(typeof res.data === 'object') {
            this.$store.commit('setItems', res.data);
            this.$router.push({path: '/List'})
          } else 
            alert('찾으신 물품은 존재하지 않습니다');
        }).catch(err => {
          throw err;
        });
      },
      getItem() {
        this.search = this.search.split("'").join('');
        this.$axios({
          method: 'post',
          url: '/getItems',
          data: {
            name: this.search
          }
        }).then(res => {
          if(typeof res.data === 'object') {
            this.$store.commit('setItems', res.data);
            this.$router.push({path: '/List'})
          } else 
            alert('찾으신 물품은 존재하지 않습니다');
        }).catch(err => {
          throw err;
        });
      },

      simulation() {
        this.$axios({
          method: 'get',
          url: '/GetAllItems'
        }).then(res => {
          for(let p of res.data)
                p.num = 0;
          this.$store.commit('setAllItems', res.data);
          this.isManageActivated = !this.isManageActivated;    
          this.$router.push({path: '/Simulation'});
        }).catch(err => {
          throw err;
        })
      },
      getStockZeroItems() {
        this.$axios({
          method: 'get',
          url: '/GetStockZeroItems'
        }).then(res => {
          if(typeof res.data === 'object') {
            for(let p of res.data)
                  p.num = 0;
            this.$store.commit('setAllItems', res.data);
            this.isManageActivated = !this.isManageActivated;    
            this.$router.push({path: '/Stocklist'});
          }
        }).catch(err => {
          throw err;
        })
      },
      checkMonth() {
        getSales.call(this,'GetMonthSales', 'MonthSales');
      },
      checkDaily() {
        getSales.call(this,'GetDailySales', 'DailySales');
      },
      checkTotal() {  
          this.$axios({
            method: 'get',
            url: '/GetTotalSales'
          }).then(res => {
            if(typeof res.data === 'object') {
              this.$store.commit('setAllItems', res.data);
              this.isManageActivated = !this.isManageActivated;    
              this.$router.push({path: '/TotalSales'});
            }
          }).catch(err => {
            throw err;
          });
      },
      checkDelivery() {
          this.$axios({
            method: 'get',
            url: '/GetDeliveryCompanyInfo'
          }).then(res => {
            if(typeof res.data === 'object') {
              this.$store.commit('setAllItems', res.data);
              this.isManageActivated = !this.isManageActivated;    
              this.$router.push({path: '/DeliveryCompanyInfo'});
            }
          }).catch(err => {
            throw err;
          });
      }
    }
  }

function getSales(url,path) {
  this.$axios({
          method: 'get',
          url: '/' + url,
        }).then(res => {
          if(typeof res.data === 'object') {
            for(let i=0; i<res.data.length; i++) 
              res.data[i].session = new Date(res.data[i].session).format('yyyy년 MM월 dd일 E hh시 mm분 ss초');

            this.$store.commit('setAllItems', res.data);
            this.isManageActivated = !this.isManageActivated;    
            this.$router.push({path: '/' + path});
          }
        }).catch(err => {
          throw err;
    });
}
</script>



<style lang="stylus">
  @import './stylus/main'
  html {   overflow-y: scroll; } 
</style>


