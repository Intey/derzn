const { reactive } = Vue
function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
}

export const store = reactive({
    app: 0,
    isChanged: false,
    // выбранная ячейка -'r' - строка, 'c' - колонка, 'd' - ячейка таблицы
    selected: {
        elementType: '',
        elementId: 0,
        select_element(elementType, elementId) {
            this.elementType = elementType
            this.elementId = elementId
        },
        isSelected (elementType, elementId) {
            return this.elementType == elementType && JSON.stringify(this.elementId)==JSON.stringify(elementId)
        }
    },
    tableData:{
        group:'Заголовок',
        group_row:'Строки',
        group_col:'Колонки',
        cols: [{'id':1, 'name': 'колонка 1'}, {'id':2, 'name': 'колонка 2'}, {'id':3, 'name': 'колонка 3'}],
        newColId() {
            if (this.cols.length === 0) {
                return 1; // или любое другое значение по умолчанию
            }
            return this.cols.reduce((max, item) => {
                return item.id > max ? item.id : max;}, this.cols[0].id) + 1
        },
        rows: [{'id':1, 'name': 'Строка 1'}, {'id':2, 'name': 'Строка 2'}, {'id':3, 'name': 'Строка 3'} ],
        move(itemPos, newPos, elType){
            if (elType=='c') {
                array_move(this.cols, itemPos, newPos)
                store.isChanged = true
            }
            else if (elType=='r') {
                array_move(this.rows, itemPos, newPos)
                store.isChanged = true
            }
        },
        newRowId() {
            if (this.rows.length === 0) {
                return 1; // или любое другое значение по умолчанию
            }
            return this.rows.reduce((max, item) => {
                return item.id > max ? item.id : max;}, this.rows[0].id) + 1
        },
        //универсальная двигалка колонок и строк
        // what = 'r','c' direction='+','-'

        headerMove(id, what, direction) {
            let arr = 0
            if (what=='r') arr=this.rows
            else if (what=='c') arr=this.cols
            else return

            const pos = arr.findIndex(item => item.id==id)
            //console.log(pos, id)
            if (pos ==-1)  return

            store.isChanged = true

            if (direction=='-') {
                if (pos==0)  {
                    //из начала переносим в конец
                   arr.push(arr.shift())
                   return
                }
                const temp = arr[pos-1]
                arr[pos-1] = arr[pos]
                arr[pos] = temp
            }
            else if (direction=='+') {
                    if (pos==arr.length-1)  {
                        //из конца переносим в начало
                        arr.unshift(arr.pop())
                        return
                    }
                    const temp = arr[pos+1]
                    arr[pos+1] = arr[pos]
                    arr[pos] = temp
            }
        },
        addRow(caption) {
            const id = this.newRowId()
            this.rows.push({id: id, 'name': caption})
            store.selected.select_element('r', id)

            store.isChanged = true
        },
        addCol(caption) {
            const id = this.newColId()
            this.cols.push({id: id, 'name': caption})
            store.selected.select_element('c', id)

            store.isChanged = true
        },
        delColRow(elementType, id) {
            if (elementType=='r') {
                if (this.rows.length==1) {

                }
                const exist = [...this.cells.keys()].some((key) => key.split(':')[0]==id);
                if (exist) {
                    store.app.alert('Cтрока не пустая!')
                    return
                }
                const pos = this.rows.findIndex(item => item.id==id)
                this.rows=this.rows.filter(item => item.id!=id)
                store.selected.select_element('r', pos<this.rows.length ? this.rows[pos].id: this.rows[pos-1].id  )
            }
            else if (elementType=='c') {
                if (this.cols.length==1) {
                    store.app.alert('Должна присутствовать минимум одна колонка!')
                    return
                }
                const exist = [...this.cells.keys()].some((key) => key.split(':')[1]==id);
                if (exist) {
                    store.app.alert('Колонка не пустая!')
                    return
                }
                const pos = this.cols.findIndex(item => item.id==id)
                this.cols=this.cols.filter(item => item.id!=id)
                store.selected.select_element('c', pos<this.cols.length ? this.cols[pos].id: this.cols[pos-1].id  )
            }
            else return
            //удаляем из данных ячейки с этой колонкой/строкой
            let flag
            for (const [key, value] of this.cells) {
                flag = (elementType=='r') && (key.split(':')[0]==id) ||
                         (elementType=='c') && (key.split(':')[1]==id)
                if (flag) {
                    this.cells.delete(key);
                }
            }
            store.isChanged = true
        },
        cells: new Map(),
        hashByIndex(i, j) {   return this.rows[i].id+':'+ this.cols[j].id },
        hashById(rowId, colId)  { return rowId+':'+ colId },
        getCell (rowId, colId) {
            const key = this.hashById(rowId, colId)
            if (this.cells.has(key)) {
                return this.cells.get(key)
            }
            else {
                return {id:0, text:''}
            }
        },
        clearCell(rowId, colId) {
           const key = this.hashById(rowId, colId)
           this.cells.delete(key)
        },
        getCellText(rowId, colId) {
            const value = this.getCell(rowId, colId)
            return value? value.text : ''
        },
        setCell(rowId, colId, value) {
              const key = this.hashById(rowId, colId)
              this.cells.set(key, value)
              store.isChanged = true

        },
        setCellText(rowId, colId, value) {
              this.setCell(rowId, colId, {id:0, text: value})
        },
        getCellByIndex(i, j) {
            const rowId = this.rows[i].id
            const colId = this.cols[j].id
            const result =  this.getCell(rowId, colId)
            return result
        },
        setCellByIndex(i, j, data) {
            this.cells.set(this.hashByIndex(i,j), data)
            //store.isChanged = true
        }
    },
})