export default {
    props:["onSave", "SaveEnabled"],

    methods: {
        goPrev() {
         if (document.getElementById('prev')) {
            window.location = document.getElementById('prev').value
         }
         else
         { console.log('invalid prev value')}
        },
        doSave(){
            this.onSave();
        },
    },
  template: `
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-primary md-3" :disabled="!SaveEnabled" @click="doSave" type="button">Сохранить</button>
            <button class="btn btn-secondary" @click="goPrev" type="button">Закрыть</button>
        </div>`
}