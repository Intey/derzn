import {store} from './store.js'
const { ElMessage } = ElementPlus
export default {
    props: ['rowId','colId'],

    data(){
        return {
        store,
        timer: 0,
         }
    },
   mounted(){
    //console.log('i mounted')
   },
   computed: {
    classObject() {
        let cell = store.tableData.getCell(this.rowId,this.colId)
        return {
                selected: store.selected.isSelected('d', [this.rowId,this.colId]),
                is_text: !cell.id
            }
    }
  },
    methods: {
        onClick() {
            store.selected.select_element('d', [this.rowId,this.colId]);
            let now = new Date()
            let period = now - this.timer/1
            if (period <220) {
                //dblclick
                this.onEdit()
            }
            else this.timer = now
       },
       onEdit() {
       const [rowId, colId ] = store.selected.elementId
        const cell = store.tableData.getCell(rowId, colId)
        if (cell.id) {
            ElMessage.error('нельзя менять текст в ячейке со знанием')
            return
        }
        this.$root.prompt(cell.text, (value) => {
            if (value)  store.tableData.setCellText(rowId, colId, value)
            })

       },
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
