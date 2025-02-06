import {store} from './store.js'

export default {
    props: ['rowId','colId'],

    data(){
        return { store }
    },
   computed: {
    classObject() {
        return {
                selected: store.selected.isSelected('d', [this.rowId,this.colId])
            }
    }
  },
    methods: {
        onClick() {
            store.selected.select_element('d', [this.rowId,this.colId])
       }

    },
template: `
<td :class="classObject"
    @click="onClick"
    :key="{rowId, colId}">
    <div class="data_cell text-start p-1">
    <span>{{ store.tableData.getCellText(rowId, colId) }}</span>
  </div>
</td>`
}
