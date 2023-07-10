void new class LogoWPI{
    constructor(){

        this.initDatatable()

        this.addLogoForm = document.querySelector('#add_logo_form')

        this.submitLogoButton = document.querySelector('#logo_submit')

        this.updateLogoButton = document.querySelector('#logo_update')

        this.addLogoButton = document.querySelector('#btn_add_logo_modal')

        this.modalLogoTitle = document.querySelector('#modal_logo_title')

        this.adminHiddenFile= document.querySelector('#admin_file_version')

        this.customerHiddenFile= document.querySelector('#customer_file_version')

        this.LogoDismissButton = document.querySelector('#logoModal_cancel')

        this.logoDeleteId= document.querySelector('#delete_logo_id')

        this.logoName = document.getElementById('logo_name')

        this.logoDeleteProceedButton = document.querySelector('#logo_proceed_delete')

        this.logoDeleteDismissButton = document.querySelector('#logoDeleteModal_dismiss')

        this.eventHandler()

        this.initFileInput()

        this.initialization()

    }

    eventHandler(){

        this.submitLogoButton.addEventListener('click', (e) => {
            
            const buttonAction = 'create'

            this.checkExistingName(this.logoName.value, buttonAction)
        })

        this.addLogoButton.addEventListener('click', (e) => {

            console.log('sige');

            this.addLogoForm.reset()

            this.modalLogoTitle.innerHTML = 'Add New Logo'

            this.updateLogoButton.style.display = 'none';

            this.submitLogoButton.style.display = '';

            $('#kt_modal_add_logo').modal('show')

        })

        this.LogoDismissButton.addEventListener('click', (e) => {

            $('#kt_modal_add_logo').modal('hide')

        })

        $('#logos').on('click', '.activateLogo', (e) => {

            const logoId = $(e.currentTarget).data('id')
    
            this.activateInquiryLogo(logoId)
            
        })

        $('#logos').on('click', '.deleteLogo', (e) => {

            const logoId = $(e.currentTarget).data('id')

            $('#modal_delete_logo').modal('show')

            this.logoDeleteId.value = logoId
            
        })

        this.logoDeleteProceedButton.addEventListener('click', (e) => {

            $('#modal_delete_logo').modal('hide')

            this.logoDeleteProceed(this.logoDeleteId.value)
            
        })

        this.logoDeleteDismissButton.addEventListener('click', (e) => {

            $('#modal_delete_logo').modal('hide')

        })

    }

    initialization = () => { 

        this.InquiryBgColor()

     }

     initFileInput = () => {

        $("#customer_logo_file").fileinput({
            theme: "explorer",
            uploadUrl: "#",
            deleteUrl: '#',
            enableResumableUpload: true,
            allowedFileExtensions: ['png'],
            theme: 'fas',
            showUpload:false,
            removeFromPreviewOnError: true,
            overwriteInitial: false,
        }).on('change',() => {

            this.customerHiddenFile.value = 'new'

            $('#customer_attachment_error').html('')

            const inputFiles = document.getElementById('customer_logo_file').files;
        
            for (let i = 0; i < inputFiles.length; i++) {

                const file = inputFiles[i]

                const fileSize = file.size

                console.log('File Size: ' + fileSize + ' bytes')

                this.getFileDimensions(file, function(dimensions) {

                    if (dimensions) {

                        if (dimensions.width >= dimensions.height && fileSize <= 10485760 ) {
                            // submitButton.removeAttribute("disabled");
                            $('#customer_attachment_error').html('')
                        } else if (dimensions.width < dimensions.height || fileSize > 10485760 ){
                            // submitButton.setAttribute("disabled", "true");
                            $('#customer_attachment_error').html('Check your file orientation or size.')
                        }

                    } else {

                        $('#customer_attachment_error').html('Unsupported file type.')

                    }
                })
                
            }
            
        })

        $("#admin_logo_file").fileinput({
            theme: "explorer",
            uploadUrl: "#",
            deleteUrl: '#',
            enableResumableUpload: true,
            // maxFileCount: 5,
            allowedFileExtensions: ['png'],
            theme: 'fas',
            showUpload:false,
            removeFromPreviewOnError: true,
            overwriteInitial: false,
        }).on('change',() => {

            this.adminHiddenFile.value = 'new'

            $('#admin_attachment_error').html('')

            const inputFiles = document.getElementById('admin_logo_file').files;
        
            for (let i = 0; i < inputFiles.length; i++) {

                const file = inputFiles[i]

                const fileSize = file.size

                console.log('File Size: ' + fileSize + ' bytes')

                this.getFileDimensions(file, function(dimensions) {

                    if (dimensions) {

                        if (dimensions.width >= dimensions.height && fileSize <= 10485760 ) {
                            // submitButton.removeAttribute("disabled");
                            $('#admin_attachment_error').html('')
                        } else if (dimensions.width < dimensions.height || fileSize > 10485760 ){
                            // submitButton.setAttribute("disabled", "true");
                            $('#admin_attachment_error').html('Check your file orientation or size.')
                        }

                    } else {

                        $('#admin_attachment_error').html('Unsupported file type.')

                    }
                })
                
            }
            
        })

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

    activateInquiryLogo = async(id) => {

        const { data: result } = await axios.get(

            `/activate_logo/${id}`

        )
        
        showAlert('Success', result.message,'success')

        $('#logos').KTDatatable('reload')

        this.initialization()
    }

    logoDeleteProceed = async(id) => { 

        const { data: result } = await axios.get(

            `/logo_delete/${id}`

        )
        
        showAlert('Success', result.message,'success')

        $('#logos').KTDatatable('reload')
    }

    checkExistingName = async(logoName, buttonAction) => {  
       
        try{
            const {data:result} = await axios.get(`/check_name/${logoName}`)
            
            if (result == 0 && buttonAction == 'create'){ 
                this.insertLogoAttachmentAjax()
            }else if (result == 0 && buttonAction == 'update'){
                this.updateAdAjax()
            }else{
                $('#title_error').html('Name Already Exist!')
            }
            
            
        }catch({response:err}){
            
        }
    }

    insertLogoAttachmentAjax = async() =>{

        console.log("2")

        this.formData = new FormData(this.addLogoForm)

        try{ console.log("3")

            const response = await axios.post(`/create_logo`, this.formData)

            const data = response.data

            $('#logoModal_cancel').click()

            this.addLogoForm.reset()

            $('#kt_modal_add_logo').modal('hide')

            showAlert('Success', data.message,'success')
            
            $('#logos').KTDatatable('reload')
        }catch({response:err}){
            console.log(err.message);
            if (err.message === 'no_file') {
                showAlert('Please complete file attachment!', err.message,'error')
            }else{
                showAlert('Error', err.message,'error')
            }
            
        }
    }

    getFileDimensions = (file, callback) => {
        if (file.type === 'image/gif' || file.type === 'image/jpeg' || file.type === 'image/png') {
        const img = new Image();
    
        img.onload = function() {
            const dimensions = {
            width: img.width,
            height: img.height
            };
    
            callback(dimensions);
        };
    
        img.src = URL.createObjectURL(file);
        } else if (file.type === 'video/mp4') {
        const video = document.createElement('video');
    
        video.addEventListener('loadedmetadata', function() {
            const dimensions = {
            width: this.videoWidth,
            height: this.videoHeight
            };
    
            callback(dimensions);
        });
    
        video.src = URL.createObjectURL(file);
        } else {
        // Unsupported file type
            callback(null);
        }
    }

    activateThemeColor = async(id) => {

        const { data: result } = await axios.get(

            `/activate_color/${id}`

        )
        
        showAlert('Success', result.message,'success')

        $('#logos').KTDatatable('reload')

        this.initialization()
    }

    insertLogo = async() =>{

        this.formData = new FormData(this.addLogoForm)

        try{ 

            const response = await axios.post(`/add_color`, this.formData)

            const data = response.data

            $('#newLogoModal_cancel').click()

            this.addLogoForm.reset()

            this.initialization()

            $('#kt_modal_add_logo').modal('hide')

            showAlert('Success', data.message,'success')
            
            $('#logos').KTDatatable('reload')
        }catch({response:err}){
            showAlert('Error', err.message,'error')
        }
    }

    updateLogoAjax = async() =>{

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
        
        this.dataTable = $('#logos').KTDatatable({
            data:{
                type:'remote',
                source:{
                    read:{
                        url:`/logo_list`,
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
                    field:'name',
                    title:'Logo Name',
                    template:(data)=> `<span>${data.name}</span>`
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
                        <a href="javascript:;" class="btn btn-sm btn-clean ${data.status == 1 ? 'btn-success' : 'btn-danger activateLogo'} btn-icon m-2" data-id="${data.id}" title="${data.status == 1 ? 'Disable' : 'Enable'}">
                            <i class="fa-solid fa-toggle-on"></i>
                        </a>
                        <a href="javascript:;" class="btn btn-sm btn-clean  ${data.status == 1 ? 'btn-success' : 'btn-danger deleteLogo'} btn-icon m-2" data-id="${data.id}" title="Delete Logo">
                            <i class="fa-solid fa-trash"></i>
                        </a> `
                    },
                }
            ]
        })

    }

}
