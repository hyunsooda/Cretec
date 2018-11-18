<template>
<div>
<div>

        <br><br><br><br>
        <v-container>
            <v-layout
        align-center
        column
        >
        <h1 class="display-2 font-weight-thin mb-3">장바구니</h1>
        <h4 class="subheading">Basket</h4>
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
                    <v-list-tile-content>상품 재고 :</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.stock }}</v-list-tile-content>
                    </v-list-tile>
                </v-list>
                </v-card>
                <v-text-field
                counter='15'
                label='수량을 입력해주세요'
                v-model='props.item.num'
                v-on:keyup.enter="buy"
                :id="props.item.name"
                :key='props.item.name'
                required></v-text-field>

                <v-btn 
                color="primary" 
                slot="activator"
                id='submit'
                @click="buy(props.item)"
                type="submit">구매하기</v-btn> 

                <v-btn 
                color="primary" 
                slot="activator"
                id='submit'
                @click="remove(props.item)"
                type="submit">지우기</v-btn> 
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
        height() {
            return window.innerHeight;
        },
        ...mapState(['userInfo'])
    },
    created() {
        this.$axios({
            method: 'post',
            url: '/getMyBasket',
            data: {
                id: this.userInfo.id
            }
        }).then(res => {
            this.items = res.data; 
            for(let p of this.items)
                p.num = 0;
        }).catch(err => {
            throw err;
        })
    },
    methods: {
        buy(item) {
            if(item.num === '0' || item.num === 0) {
                alert('상품갯수를 입력해주세요');
                return;
            }
            item.num = Number(item.num);
            if(isNaN(item.num)) {
                alert('숫자만 입력해주세요');
                return;
            }
            this.$axios({
                method: 'post',
                url: '/Buy',
                data: {
                    itemid: item.id,
                    custid: this.userInfo.id,
                    stock: item.num,
                    date: new Date().format('yyyy-MM-dd-hh-mm-ss')
                }
            }).then(res => {
                if(typeof res.data === 'object') {    
                    const idx = this.items.indexOf(item);
                    alert('구매 완료');
                    this.items.splice(idx, 1);
                } else {
                    if(res.data === 'full')
                        alert('상품 재고를 확인해주세요');
                }
            }).catch(err => {
                throw err;
            })
        },
        remove(item) {
            this.$axios({
                method: 'post',
                url: 'RemoveBasket',
                data: item
            }).then(res => {
                if(res.data === 'Success') {
                    alert('삭제완료');
                    for(let i=0; i<this.items.length; i++) { // 쿼리안날리고 업데이트(performance increased)
                        let temp = this.items[i];
                        for(let p in temp) {
                            if(temp[p] === item.name) {
                                this.items.splice(i,1);
                                return;
                            }
                        }
                    }
                    this.$router.push({path: '/Basket'});
                }
            }).catch(err => {
                throw err;
            })
        }
    }
}
</script>