void new class ThemeColor{
    constructor(){

        this.addColorForm = document.querySelector('#add_color_form')

        this.initDatatable()

        this.submitColorButton = document.querySelector('#color_submit')

        this.updateColorButton = document.querySelector('#color_update')

        this.addColorButton = document.querySelector('#btn_add_color_modal')

        this.modalColorTitle = document.querySelector('#modal_color_title')

        this.ColorDismissButton = document.querySelector('#newColorModal_cancel')

        this.colorInput = document.getElementById('color_input')

        this.eventHandler()
    }

    eventHandler(){

        this.addColorButton.addEventListener('click', (e) => {

            this.addColorForm.reset()

            this.modalColorTitle.innerHTML = 'Add New Color'

            this.updateColorButton.style.display = 'none';

            this.submitColorButton.style.display = '';

            $('#kt_modal_add_color').modal('show')

        })

        this.ColorDismissButton.addEventListener('click', (e) => {

            $('#kt_modal_add_color').modal('hide')

        })

        this.submitColorButton.addEventListener('click', (e) => {
            
            const buttonAction = 'add'

            this.checkExistingColor(this.colorInput.value, buttonAction)
        })

    }

    


    checkExistingColor = async(colorCode, buttonAction) => {  
        try {
            const response = await axios.get(`/check_color_code/${colorCode}`);
            const { data: result, status } = response;
            
            
          } catch (error) {
            
          }
          
    }

    insertColor = async() =>{

        this.formData = new FormData(this.addColorForm)

        try{ 

            const response = await axios.post(`/add_color`, this.formData)

            const data = response.data

            $('#newColorModal_cancel').click()

            this.addColorForm.reset()

            $('#kt_modal_add_color').modal('hide')

            showAlert('Success', data.message,'success')
            
            $('#colors').KTDatatable('reload')
        }catch({response:err}){
            showAlert('Error', err.message,'error')
        }
    }

    updateAdAjax = async() =>{

        this.formData = new FormData(this.uploadForm)

        try{ 

            const response = await axios.post(`/update_ad`, this.formData)

            const data = response.data

            $('#createAdModal_cancel').click()

            this.uploadForm.reset()

            $('#kt_modal_create_ad').modal('hide')

            showAlert('Success', data.message,'success')
            
            $('#advertisements').KTDatatable('reload')

        }catch({response:err}){

            showAlert('Error', err.message,'error')

        }
    }

    
    initDatatable = () => {
        
        this.dataTable = $('#colors').KTDatatable({
            data:{
                type:'remote',
                source:{
                    read:{
                        url:`/color_list`,
                        method:'GET'
                    }
                },
                pageSize: 5,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },
            layout: {
                scroll: false,
                footer: false,
            },
            sortable: true,
            pagination: true,
            // detail:{
            //     title:'Attachments',
            //     content : this.attachmentsTable
            // },

            columns:[
                {
                    field:'id',
                    title:'ID',
                    sortable: false,
					width: 25,
					textAlign: 'center',
                },
                {
                    field:'code',
                    title:'Color Code',
                    template:(data)=> `<span>${data.code}</span>`
                },
                {
                    field:'Color',
                    title:'Color',
                    template:(data)=> `<div class="rounded" style="background-color:${data.code};">&nbsp;</div`
                },
                {
                    field:'created_at',
                    title:'Date Created',
                    template:(data)=> `<span>${humanDate(data.created_at)}</span>`
                },
                {
                    field:'status',
                    title:'Status',
                    template:(data)=> data.status == 1 ? `<span class="badge badge-success">Enabled</span>` : `<span class="badge badge-danger">Disabled</span>`
                },
                {
                    field: 'Actions',
                    title: 'Actions',
                    sortable: false,
                    width: 100,
                    overflow: 'visible',
                    autoHide: false,
                    template: function(data) {
                        return `
                        <a href="javascript:;" class="btn btn-sm btn-clean ${data.status == 1 ? 'btn-success' : 'btn-danger activateColor'} btn-icon m-2" data-id="${data.id}" title="${data.status == 1 ? 'Disable' : 'Enable'}">
                            <i class="fa-solid fa-toggle-on"></i>
                        </a>
                        <a href="javascript:;" class="btn btn-sm btn-clean  ${data.status == 1 ? 'btn-success' : 'btn-danger'} deleteColor btn-icon m-2" data-id="${data.id}" title="Delete">
                            <i class="fa-solid fa-trash"></i>
                        </a> `
                    },
                }
            ]
        })

    }

}
