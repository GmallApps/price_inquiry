void new class Ads{
    constructor(){
        console.log("test")
        this.uploadForm = document.querySelector('#create_ad_form')
        this.titleInput = document.getElementById('ad_title');
        this.initDatatable()
        this.initFileInput()
        this.submitButton = document.querySelector('#ad_submit')
        this.PreviewDismissButton = document.querySelector('#previewModal_dismiss')
        this.eventHandler()

        console.log('starting..');
    }

    eventHandler(){

        this.submitButton.addEventListener('click', (e) => {
            console.log(this.titleInput.value);
            this.checkExistingTitle(this.titleInput.value)
        })

        this.PreviewDismissButton.addEventListener('click', (e) => {
            $('#previewInfo').modal('hide')
        })

        // document.querySelectorAll(".viewInfo").forEach(async (el) =>
        //         el.addEventListener("click", this.getAdInformation)
        // );

        $('#advertisements').on('click', '.viewInfo', (e) => {
            // e.preventDefault();
            const adId = $(e.currentTarget).data('id')
            this.previewAdvertisement(adId)
        });

    }

    previewAdvertisement = async(id) => {

            const { data: result } = await axios.get(
                `/ad_preview/${id}`
            )

            console.log(result.file)

            const imagePath = `assets/ad_files/${result.file}`

            // window.open(rsr, '_blank')
            
            fetch(imagePath)
            .then(response => {
                if (!response.ok) {
                throw new Error('HTTP error, status = ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                $("#previewInfo").modal("show")
                $('#adPreview').html(`<img width="100%" height="550" src="${imagePath}" alt="Advertisement" />`)
            })
            .catch(error => {
                // Handle the error here
                console.error(error);
                if (error.message.includes('404')) {
                     // Perform specific actions for a 404 error
                    showAlert('Warning','No Preview Available for this File!','warning')
                } else {
                    $("#previewInfo").modal("show")
                    $('#adPreview').html(`<img width="100%" height="550" src="${imagePath}" alt="Advertisement" />`)
                }
            });

    };

    checkExistingTitle = async(adTitle) => {  
        console.log("checking...")
        try{
            const {data:result} = await axios.get(`/check_title/${adTitle}`)
            console.log("proceeding...")
            // this.data = result   
            console.log(result);
            if (result == 0){ console.log('suldsd');
                this.insertAttachmentAjax()
            }else{
                $('#title_error').html('Title Already Exist!')
            }
            
            
        }catch({response:err}){
            
        }
    }

    insertAttachmentAjax = async() =>{
        console.log("2")
        this.formData = new FormData(this.uploadForm)
        try{ console.log("3")
            const response = await axios.post(`/create_ad`, this.formData)
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

    initFileInput = () => {
        $("#ad_file").fileinput({
            theme: "explorer",
            uploadUrl: "#",
            deleteUrl: '#',
            enableResumableUpload: true,
            // maxFileCount: 5,
            allowedFileExtensions: ['jpg', 'png', 'jpeg','pdf', 'docs', 'docx', 'txt','xls','xlsx','csv','gif','mp4','zip'],
            theme: 'fas',
            showUpload:false,
            removeFromPreviewOnError: true,
            overwriteInitial: false,
        }).on('change',() => {
            $('#attachment_error').html('')
        })
    }
    
    initDatatable = () => {
        
        this.dataTable = $('#advertisements').KTDatatable({
            data:{
                type:'remote',
                source:{
                    read:{
                        url:`/ad_list`,
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
                    field:'title',
                    title:'Title',
                    template:(data)=> `<span>${data.title}</span>`
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
                        <a href="javascript:;" class="btn btn-sm btn-clean viewInfo btn-icon mr-2" data-id="${data.id}" title="View">
                            <i class="fa-solid fa-eye"></i>
                        </a>
                        <a href="#" target="_blank" class="btn btn-sm btn-clean btn-icon mr-2" title="Enable">
                            <i class="fa-solid fa-toggle-on"></i>
                        </a>
                        <a href="#" target="_blank" class="btn btn-sm btn-clean btn-icon mr-2" title="Edit">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </a>
                        <a href="#" target="_blank" class="btn btn-sm btn-clean btn-icon mr-2" title="Delete">
                            <i class="fa-solid fa-trash"></i>
                        </a> `
                    },
                }
            ]
        })

    }

}
