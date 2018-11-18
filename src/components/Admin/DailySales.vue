<template>
  <v-container>
  <v-data-table
    :headers='headers'
    :items="allItems"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-right">{{ props.item.Daily_sales }}</td>
      <td class="text-xs-right">{{ props.item.session }}</td>
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
                    text: '일별매출 조회',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                { text: '일별매출', value: 'Daily_sales' },
                { text: '기간', value: 'session' }
            ]
        }
    },
    computed: {
        ...mapState(['allItems'])   
    }
}
</script>
