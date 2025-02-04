import {store} from './store.js'

export default {
  computed: {
    classObject() {
        return {disabled: store.selected.elementType!='d'}
    }
  },
  methods:{
   onEdit (){
        const [rowId, colId ] = store.selected.elementId
        const cell = store.tableData.getCell(rowId, colId)
        if (cell.id) {
            this.$root.alert('нельзя менять текст в ячейке со знанием')
            return
        }
        this.$root.prompt(cell.text, (value) => {
            if (value)  store.tableData.setCellText(rowId, colId, value)
            })
        },
   onCreate() { this.$root.createKnowledge() },
   onSelect() {this.$root.selectKnowledge() },
   onClear() {
        const [rowId, colId ] = store.selected.elementId
        store.tableData.clearCell(rowId, colId)
   },
  },
  template: `
        <div class="btn-group float-end btn-group-lg" role="group">
            <button @click="onEdit" id="btn_data_edit" title="Редактировать текст" type="button" class="btn btn-primary" :class="classObject">✐</button>
            <button @click="onCreate" id="btn_data_add" title="Добавить знание" type="button" class="btn btn-primary" :class="classObject">+</button>
            <button @click="onSelect" id="btn_data_select" title="Выбрать знание" type="button" class="btn btn-primary" :class="classObject">🗀</button>
            <button @click="onClear" id="btn_data_clear" title="Очистить ячейку" type="button" class="btn btn-primary" :class="classObject">🗑</button>
        </div>`
}