<template>
  <v-container>
  <v-data-table
    :headers='headers'
    :items="allItems"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-right">{{ props.item.Total_sales }}</td>
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
                    text: '총매출 조회',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                { text: '총판매량', value: 'Total_sales' },
            ]
        }
    },
    computed: {
        ...mapState(['allItems'])   
    }
}
</script>
