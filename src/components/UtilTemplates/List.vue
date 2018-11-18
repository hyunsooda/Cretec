<template>
  <v-container fluid grid-list-md>
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
              <v-list-tile-content>상품 재고 :</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.stock }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
        <v-btn 
          color="primary" 
          slot="activator"
          id='submit'
          @click="addToBasket(props.item)"
          type="submit">장바구니에 추가</v-btn> 
      </v-flex>
    </v-data-iterator>
  </v-container>
</template>
<script>
import { mapState } from 'vuex';
export default {
    data: () => ({
      rowsPerPageItems: [4, 8, 12, 16, 20],
      pagination: {
        rowsPerPage: 4
      }
    }),
    computed: {
        ...mapState(['items', 'userInfo'])
    },
    methods: {
      addToBasket(item) {
        if(this.userInfo.id === 'Admin123') {
          alert('관리자는 추가할수없음');
          return;
        }
        this.$axios({
          method: 'post',
          url: '/AddToBasket',
          data: {
            custid: this.userInfo.id,
            itemid: item.id
          }
        }).then(res => {
          if(res.data === 'already')
            alert('이미 장바구니에 추가되있습니다');
          else if(res.data === 'Success') {
            alert('장바구니 추가완료');
            this.$router.push({path: '/List'});
          } else 
            alert('장바구니 추가 실패');
        }).catch(err => {
          throw err;
        });
      }
    }
  }
</script>