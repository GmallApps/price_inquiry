void new class Terminal{
    constructor(){

        this.addTerminalButton = document.querySelector('#btn_add_terminal_modal')

        this.addTerminalButton = document.querySelector('#btn_add_terminal_modal')

        this.createSubmitButton = document.querySelector('#terminal_submit')

        this.updateSubmitButton = document.querySelector('#terminal_update')

        this.terminalDismissButton = document.querySelector('#createTerminalModal_cancel')

        this.addTerminalForm = document.querySelector('#create_terminal_form')
        
        this.modalTitle= document.querySelector('#modal_title')

        this.ip_error= document.querySelector('#ip_error')

        this.desc_error= document.querySelector('#desc_error')

        this.ipInput = document.getElementById('ip_address')

        this.descriptionInput = document.getElementById('description')

        this.initDatatable()

        this.eventHandler()

        this.initialization()
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
            
            console.log(result);

            if (result == 0 && buttonAction == 'create'){ 
                this.insertIpAjax()
            }else if (result == 0 && buttonAction == 'update'){
                // this.updateIpAjax()
            }else{
                this.ip_error.innerHTML = 'IP address already exist!'
            }
            
            
        }catch({response:err}){
            
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
                        <a href="javascript:;" class="btn btn-sm btn-clean  ${data.status == 1 ? 'btn-success' : 'btn-danger deleteColor'} btn-icon m-2" data-id="${data.id}" title="Delete">
                            <i class="fa-solid fa-trash"></i>
                        </a> `
                    },
                }
            ]
        })

    }

}
