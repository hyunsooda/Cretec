<template>
    <Manage :title="'관리'" :subtitle="'재고가 모자란 상품들'">
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
                required></v-text-field>

                <v-btn 
                color="primary" 
                slot="activator"
                id='submit'
                @click="increase(props.item)"
                type="submit">재고증가</v-btn> 

            </v-flex>
        </v-data-iterator>
    </Manage>
</template>

<script>
import Manage from '../UtilTemplates/Manage';
import {mapState} from 'vuex';

export default {
    components: {
        Manage
    },
    data() {
        return {
            rowsPerPageItems: [4,8],
            pagination: {
                rowsPerPage: 4
            }
        }
    },
    computed: {
        ...mapState({
            items: 'allItems'
        })
    },
    methods: {
        increase(item) {
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
                url: '/IncreaseStock',
                data: item
            }).then(res => {
                console.log(res.data);
                if(res.data === 'full') 
                    alert('재고를 확인해주세요');
                else if(res.data === 'error')
                    alert('에러발생');
                else {
                    this.$store.commit('setAllItems', res.data);
                    this.$router.push({path: '/Stocklist'});
                }
            }).catch(err => {
                throw err;
            })
        }
    }
}
</script>



