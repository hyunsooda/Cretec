<template>
  <v-container>
  <v-data-table
    :headers='headers'
    :items="allItems"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-right">{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.del_count }}</td>
    </template>
  </v-data-table>
  </v-container>
</template>
<script>
import {mapState} from 'vuex';

export default {
    data() {
        return {
            headers: [
                {
                    text: '배송업체 정보 조회',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                { text: '배송업체', value: 'name' },
                { text: '배송횟수', value: 'del_count' }
            ]
        }
    },
    computed: {
        ...mapState(['allItems'])   
    }
}
</script>
