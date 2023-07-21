void new class Terminal{
    constructor(){

        this.initialization()

        this.addTerminalButton = document.querySelector('#btn_add_terminal_modal')

        this.addTerminalButton = document.querySelector('#btn_add_terminal_modal')

        this.createSubmitButton = document.querySelector('#terminal_submit')

        this.updateSubmitButton = document.querySelector('#terminal_update')

        this.terminalDismissButton = document.querySelector('#createTerminalModal_cancel')

        this.deleteProceedButton = document.querySelector('#terminal_proceed_delete')

        this.DeleteDismissButton = document.querySelector('#deleteModal_dismiss')

        this.addTerminalForm = document.querySelector('#create_terminal_form')
        
        this.modalTitle= document.querySelector('#modal_title')

        this.ip_error= document.querySelector('#ip_error')

        this.desc_error= document.querySelector('#desc_error')

        this.ipInput = document.getElementById('ip_address')

        this.terminal_id = document.getElementById('terminal_id')

        this.delete_terminal_id= document.querySelector('#delete_terminal_id')

        this.descriptionInput = document.getElementById('description')

        this.initDatatable()

        this.eventHandler()

    }

    eventHandler(){

        this.addTerminalButton.addEventListener('click', (e) => {

            this.addTerminalForm.reset()

            this.modalTitle.innerHTML = 'Add a Terminal'

            this.updateSubmitButton.style.display = 'none'

            this.createSubmitButton.style.display = ''

            this.ip_error.innerHTML = ''

            this.desc_error.innerHTML = ''

            $('#kt_modal_create_terminal').modal('show')

        })

        this.terminalDismissButton.addEventListener('click', (e) => {

            $('#kt_modal_create_terminal').modal('hide')

        })

        this.createSubmitButton.addEventListener('click', (e) => {
            
            const buttonAction = 'create'

            if (this.descriptionInput.value == ''){

                this.desc_error.innerHTML = 'This field is required'

            }

            if (this.ipInput.value == ''){

                this.ip_error.innerHTML = 'This field is required'

            }

            if (this.descriptionInput.value != '' && this.ipInput.value != '') {

                this.checkExistingIp(this.ipInput.value, buttonAction)

            }

        })

        this.updateSubmitButton.addEventListener('click', (e) => {
            
            const buttonAction = 'update'

            if (this.descriptionInput.value == ''){

                this.desc_error.innerHTML = 'This field is required'

            }

            if (this.ipInput.value == ''){

                this.ip_error.innerHTML = 'This field is required'

            }

            this.checkExistingIp(this.ipInput.value, buttonAction)

        })

        this.deleteProceedButton.addEventListener('click', (e) => {

            $('#kt_modal_delete_terminal').modal('hide')

            this.deleteTerminal(this.delete_terminal_id.value)
            
        })

        this.DeleteDismissButton.addEventListener('click', (e) => {

            $('#kt_modal_delete_terminal').modal('hide')

        })

        $('#terminals').on('click', '.editInfo', (e) => {

            const id = $(e.currentTarget).data('id')

            this.terminal_id.value = id

            this.updateTerminal(id)
            
        });

        $('#terminals').on('click', '.activate', (e) => {

            const id = $(e.currentTarget).data('id')

            this.activateTerminal(id)
            
        });

        $('#terminals').on('click', '.deactivate', (e) => {

            const id = $(e.currentTarget).data('id')

            this.deactivateTerminal(id)
            
        });

        $('#terminals').on('click', '.deleteInfo', (e) => {

            const id = $(e.currentTarget).data('id')

            $('#kt_modal_delete_terminal').modal('show')

            console.log(id);

            this.delete_terminal_id.value = id
            
        });

    }

    initialization = () => { 

        this.InquiryBgColor()

        this.InquiryLogo()

     }
    
    InquiryBgColor = () => {

        axios.get(`/bg_color/`)

        .then((response) => {

            let data  = response.data

        console.log(data.code)

        $('.bg_gmall').css('background-color', data.code)

        })
        .catch((err) =>{

            console.log(err)
            
        })
    }

    InquiryLogo = () => {

        console.log('inquiryLogo')

        axios.get(`/inquiry_logo/`)

        .then((response) => {

            let data  = response.data

            const logo_id = data.id

            const imagePath = `assets/logo_files/admin/${logo_id}.png`

            $('#admin_logo').html(`<img class="max-h-50px" src="${imagePath}" alt="logo" />`)

            $('#admin_logo_mobile').html(`<img class="max-h-30px" src="${imagePath}" alt="logo" />`)


        })
        .catch((err) =>{

            console.log(err)
            
        })
    }

    checkExistingIp = async(ipAddress, buttonAction) => {  
       
        try{
            const {data:result} = await axios.get(`/check_ip/${ipAddress}`)
            
            if ( buttonAction == 'create' ){ 

                console.log('create');

                if (result.length === 0) {
                    
                    this.insertIpAjax()
                    
                }else{

                    this.ip_error.innerHTML = 'IP address already exist!'

                }

            }else if ( buttonAction == 'update'){

                if (result.length === 0) {
                    
                    this.updateIpAjax()
                    
                }else if(result[0].id == this.terminal_id.value){

                    this.updateIpAjax()

                }else{

                    this.ip_error.innerHTML = 'IP address already exist!'
                    
                }

                

            }
            
            
        }catch({response:err}){

            showAlert('Error', err.data.message,'error')

        }
    }

    insertIpAjax = async() =>{

        this.formData = new FormData(this.addTerminalForm)

        try{

            const response = await axios.post(`/create_terminal`, this.formData)

            const data = response.data

            $('#createTerminalModal_cancel').click()

            this.addTerminalForm.reset()

            $('#kt_modal_create_terminal').modal('hide')

            showAlert('Success', data.message,'success')
            
            $('#terminals').KTDatatable('reload')

        }catch({response:err}){
            console.log(err);
            showAlert('Error', err.data.message,'error')
        }
    }

    updateIpAjax = async() =>{

        this.formData = new FormData(this.addTerminalForm)

        try{ 

            const response = await axios.post(`/update_ip`, this.formData)

            const data = response.data

            $('#createTerminalModal_cancel').click()

            this.addTerminalForm.reset()

            $('#kt_modal_create_terminal').modal('hide')

            showAlert('Success', data.message,'success')
            
            $('#terminals').KTDatatable('reload')

        }catch({response:err}){

            showAlert('Error', 'Duplicate Entry!','error')

        }
    }

    updateTerminal = async(id) => {

        try{

            this.addTerminalForm.reset()

            this.modalTitle.innerHTML = 'Update a Terminal'

            this.updateSubmitButton.style.display = ''

            this.createSubmitButton.style.display = 'none'

            this.ip_error.innerHTML = ''

            this.desc_error.innerHTML = ''

            const { data: result } = await axios.get(
                `/get_ip_details/${id}`
            )

            this.ipInput.value = result.ipaddress;

            this.descriptionInput.value = result.description;

            $('#kt_modal_create_terminal').modal('show')
            
        }catch({response:err}){

            showAlert('Error', err.data.message,'error')

        }
    }

    activateTerminal = async(id) => {

        const { data: result } = await axios.get(

            `/activate_ip/${id}`

        )
        
        showAlert('Success', result.message,'success')

        $('#terminals').KTDatatable('reload')

    }

    deactivateTerminal = async(id) => {

        const { data: result } = await axios.get(

            `/deactivate_ip/${id}`

        )
        
        showAlert('Success', result.message,'success')

        $('#terminals').KTDatatable('reload')
        
    }

    deleteTerminal = async(id) => {

        const { data: result } = await axios.get(

            `/terminal_delete/${id}`

        )
        
        showAlert('Success', result.message,'success')

        $('#terminals').KTDatatable('reload')
    }
    
    initDatatable = () => {
        
        this.dataTable = $('#terminals').KTDatatable({
            data:{
                type:'remote',
                source:{
                    read:{
                        url:`/terminal_list`,
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
                    field:'ipaddress',
                    title:'IP Address',
                    template:(data)=> `<span>${data.ipaddress}</span>`
                },
                {
                    field:'description',
                    title:'Description',
                    template:(data)=> `<span>${data.description}</span>`
                },
                {
                    field:'created_at',
                    title:'Date Created',
                    template:(data)=> `<span>${humanDate(data.created_at)}</span>`
                },
                {
                    field:'status',
                    title:'Status',
                    template:(data)=> data.status == 1 ? `<span class="badge badge-success">Active</span>` : `<span class="badge badge-danger">Inactive</span>`
                },
                {
                    field: 'Actions',
                    title: 'Actions',
                    sortable: false,
                    width: 150,
                    overflow: 'visible',
                    autoHide: false,
                    template: function(data) {
                        return `
                        <a href="javascript:;" class="btn btn-sm btn-clean  ${data.status == 1 ? 'btn-success' : 'btn-danger'} editInfo btn-icon m-2" data-id="${data.id}" title="Edit">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </a>
                        <a href="javascript:;" class="btn btn-sm btn-clean ${data.status == 1 ? 'btn-success deactivate' : 'btn-danger activate'} btn-icon m-2" data-id="${data.id}" title="${data.status == 1 ? 'Disable' : 'Enable'}">
                            <i class="fa-solid fa-toggle-on"></i>
                        </a>
                        <a href="javascript:;" class="btn btn-sm btn-clean  ${data.status == 1 ? 'btn-success deleteInfo' : 'btn-danger deleteInfo'} btn-icon m-2" data-id="${data.id}" title="Delete">
                            <i class="fa-solid fa-trash"></i>
                        </a> `
                    },
                }
            ]
        })

    }

}
