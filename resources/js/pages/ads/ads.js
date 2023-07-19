void new class Ads{
    constructor(){

        this.initialization()

        this.uploadForm = document.querySelector('#create_ad_form')

        this.modalTitle= document.querySelector('#modal_title')

        this.adHiddenId= document.querySelector('#advertisement_id')

        this.adDeleteId= document.querySelector('#delete_ad_id')

        this.adHiddenFile= document.querySelector('#ad_file_version')

        this.titleInput = document.getElementById('ad_title')

        this.fileInput = document.getElementById('ad_file')

        this.adType = document.querySelector('[name="ad_type"]')

        this.initDatatable()

        this.initFileInput()

        this.submitButton = document.querySelector('#ad_submit')

        this.createButton = document.querySelector('#btn_create_modal')

        this.updateButton = document.querySelector('#ad_update')

        this.deleteProceedButton = document.querySelector('#ad_proceed_delete')

        this.PreviewDismissButton = document.querySelector('#previewModal_dismiss')

        this.DeleteDismissButton = document.querySelector('#deleteModal_dismiss')

        this.AdDismissButton = document.querySelector('#createAdModal_cancel')

        this.radioVideo = document.querySelector('#video_gif')

        this.radioSlider = document.querySelector('#slider')

        this.eventHandler()

    }

    initialization = () => { 

        this.InquiryBgColor()

        this.InquiryLogo()

        // console.log(this.adType.value);
        
     }

    eventHandler(){

        console.log('inside');

        this.submitButton.addEventListener('click', (e) => {
            
            const buttonAction = 'create'

            this.checkExistingTitle(this.titleInput.value, buttonAction)
        })

        this.updateButton.addEventListener('click', (e) => {
            
            const buttonAction = 'update'

            console.log(`version: ${this.adHiddenFile.value}`)

            this.checkExistingTitle(this.titleInput.value, buttonAction)
        })

        this.deleteProceedButton.addEventListener('click', (e) => {

            $('#kt_modal_delete_ad').modal('hide')

            this.deleteAdvertisement(this.adDeleteId.value)
            
        })

        this.createButton.addEventListener('click', (e) => {

            this.uploadForm.reset()

            this.modalTitle.innerHTML = 'Create an Advertisement'

            this.updateButton.style.display = 'none';

            this.submitButton.style.display = '';

            // $('#video_gif').click()

            $('#kt_modal_create_ad').modal('show')

        })

        this.PreviewDismissButton.addEventListener('click', (e) => {

            $('#previewInfo').modal('hide')

        })

        this.DeleteDismissButton.addEventListener('click', (e) => {

            $('#kt_modal_delete_ad').modal('hide')

        })

        this.AdDismissButton.addEventListener('click', (e) => {

            $('#kt_modal_create_ad').modal('hide')

        })

        this.radioVideo.addEventListener('change', (e) => {

            this.fileInput.removeAttribute('multiple')

        })

        this.radioSlider.addEventListener('change', (e) => {

            this.fileInput.setAttribute('multiple', 'multiple')

        })

        $('#advertisements').on('click', '.viewInfo', (e) => {

            const adId = $(e.currentTarget).data('id')

            this.previewAdvertisement(adId)

        });

        $('#advertisements').on('click', '.enableAd', (e) => {

            const adId = $(e.currentTarget).data('id')

            this.enableAdvertisement(adId)
            
        });

        $('#advertisements').on('click', '.editInfo', (e) => {

            const adId = $(e.currentTarget).data('id')

            this.adHiddenId.value = adId

            this.updateAdvertisement(adId)
            
        });

        $('#advertisements').on('click', '.deleteInfo', (e) => {

            const adId = $(e.currentTarget).data('id')

            // console.log(adId)

            $('#kt_modal_delete_ad').modal('show')

            this.adDeleteId.value = adId
            
        });
        

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

    previewAdvertisement = async(id) => {

            const { data: result } = await axios.get(
                `/ad_preview/${id}`
            )

            const ad_file = result.file

            const ad_type = result.ad_type

            // console.log(`id is : ${id} & ad_type is : ${ad_type}`);

            // const imagePath = ''

            // if (ad_type == 'slider'){
            //     imagePath = `assets/slider_files/${id}`
            // }else{
            //     imagePath = `assets/ad_files/`
            // }
            
            fetch(ad_type == 'slider' ? `assets/slider_files/${id}` : `assets/ad_files/`)
            .then(response => {
                if (!response.ok) {
                throw new Error('HTTP error, status = ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                $("#previewInfo").modal("show")

                this.previewMedia(id,ad_file,ad_type)

                

                // $('#adPreview').html(`<img width="100%" src="${imagePath}" alt="Advertisement" />`)
            })
            .catch(error => {
                // Handle the error here
                console.error(error);
                if (error.message.includes('404')) {
                     // Perform specific actions for a 404 error
                    showAlert('Warning','No Preview Available for this File!','warning')
                } else {
                    console.log('show file');
                    $("#previewInfo").modal("show")
                    console.log(`id is : ${id} & ad_type is : ${ad_type} & ad_file : ${ad_file}`);
                    this.previewMedia(id,ad_file,ad_type)

                   
                    // $('#adPreview').html(`<img width="100%" src="${imagePath}" alt="Advertisement" />`)
                }
            });

    }

    previewMedia = (ad_id,ad_file,ad_type) => {

        $('#adPreview').html('')

        // console.log(`id is : ${id} & ad_type is : ${ad_type} & ad_file : ${ad_file}`);

        const imagePath = ad_type == 'slider' ? `assets/slider_files/${ad_id}` : `assets/ad_files/${ad_file}`

        const split_file = ad_file.split('.')

        const file_ext = split_file[1]

        console.log(`file_ext is : ${file_ext}`);

        switch (file_ext) {

            case 'mp4':

                    $('#adPreview').html(`<video width="100%" loop autoplay="autoplay" class="box">
                        <source src="${imagePath}" type="video/mp4">
                    </video>`)

                break;

            case 'gif':

                $('#adPreview').html(`<img width="100%" src="${imagePath}" alt="advertisement" />`)

                break;

            default:

                const sliderImagePath = `assets/slider_files/${ad_id}/`;
                const adArray = JSON.parse(ad_file);

                const carouselDiv = document.createElement('div');
                carouselDiv.id = "myCarousel";
                carouselDiv.classList.add("carousel", "slide");
                carouselDiv.setAttribute("data-ride", "carousel");
                carouselDiv.setAttribute("data-interval", "3000");

                const olElement = document.createElement('ol');
                olElement.classList.add("carousel-indicators");

                // Generate the carousel indicators dynamically
                for (let i = 0; i < adArray.length; i++) {
                    const liElement = document.createElement('li');
                    liElement.setAttribute("data-target", "#myCarousel");
                    liElement.setAttribute("data-slide-to", i);
                    if (i === 0) {
                        liElement.classList.add("active");
                    }
                    olElement.appendChild(liElement);
                }
                carouselDiv.appendChild(olElement);

                const innerDiv = document.createElement('div');
                innerDiv.classList.add("carousel-inner");

                // Generate the carousel slides dynamically
                for (let i = 0; i < adArray.length; i++) {
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add("carousel-item");
                    if (i === 0) {
                        itemDiv.classList.add("active");
                    }

                    const imgElement = document.createElement('img');
                    imgElement.src = `${sliderImagePath + adArray[i]}`;
                    imgElement.alt = `Slide ${i + 1}`;
                    imgElement.style.width = "100%";

                    itemDiv.appendChild(imgElement);
                    innerDiv.appendChild(itemDiv);
                }

                carouselDiv.appendChild(innerDiv);

                const leftControlLink = document.createElement('a');
                leftControlLink.classList.add("carousel-control-prev");
                leftControlLink.href = "#myCarousel";
                leftControlLink.setAttribute("role", "button");
                leftControlLink.setAttribute("data-slide", "prev");

                const leftControlSpan = document.createElement('span');
                leftControlSpan.classList.add("carousel-control-prev-icon");
                leftControlSpan.setAttribute("aria-hidden", "true");

                leftControlLink.appendChild(leftControlSpan);
                carouselDiv.appendChild(leftControlLink);

                const rightControlLink = document.createElement('a');
                rightControlLink.classList.add("carousel-control-next");
                rightControlLink.href = "#myCarousel";
                rightControlLink.setAttribute("role", "button");
                rightControlLink.setAttribute("data-slide", "next");

                const rightControlSpan = document.createElement('span');
                rightControlSpan.classList.add("carousel-control-next-icon");
                rightControlSpan.setAttribute("aria-hidden", "true");

                rightControlLink.appendChild(rightControlSpan);
                carouselDiv.appendChild(rightControlLink);

                document.getElementById('adPreview').appendChild(carouselDiv);

                // Auto-slide every 3 seconds
                // const carousel = new bootstrap.Carousel(document.getElementById('myCarousel'), {
                //     interval: 3000
                // });
                break;
            }
    }

    enableAdvertisement = async(id) => {

        const { data: result } = await axios.get(

            `/ad_enable/${id}`

        )
        
        showAlert('Success', result.message,'success')

        $('#advertisements').KTDatatable('reload')
    }

    deleteAdvertisement = async(id) => {

        const { data: result } = await axios.get(

            `/ad_delete/${id}`

        )
        
        showAlert('Success', result.message,'success')

        $('#advertisements').KTDatatable('reload')
    }

    updateAdvertisement = async(id) => {

        try{

            this.uploadForm.reset()

            this.modalTitle.innerHTML = 'Update Advertisement'

            this.submitButton.style.display = 'none';

            this.updateButton.style.display = '';

            const { data: result } = await axios.get(
                `/ad_preview/${id}`
            )

            this.titleInput.value = result.title;

            if ( result.ad_type == 'slider') {

                this.radioSlider.checked = true

            }else {

                this.radioVideo.checked = true

            }

            $('#kt_modal_create_ad').modal('show')
            
        }catch({response:err}){

            showAlert('Error', err.data.message,'error')

        }
    }


    checkExistingTitle = async(adTitle, buttonAction) => {  
       
        try{
            const {data:result} = await axios.get(`/check_title/${adTitle}`)
            
            if (result == 0 && buttonAction == 'create'){ 
                this.insertAttachmentAjax()
            }else if (result == 0 && buttonAction == 'update'){
                this.updateAdAjax()
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
            console.log(err);
            showAlert('Error', err.data.message,'error')
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

            showAlert('Error', err.data.message,'error')

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

    initFileInput = () => {

        //const allowed_ext_input = ['jpg', 'png', 'jpeg','pdf', 'docs', 'docx', 'txt','xls','xlsx','csv','gif','mp4','zip']

        $("#ad_file").fileinput({
            theme: "explorer",
            uploadUrl: "#",
            deleteUrl: '#',
            enableResumableUpload: true,
            // maxFileCount: 5,
            allowedFileExtensions: ['mp4', 'gif','jpg'],
            theme: 'fas',
            showUpload:false,
            removeFromPreviewOnError: true,
            overwriteInitial: false,
        }).on('change',() => {

            this.adHiddenFile.value = 'new'

            $('#attachment_error').html('')

                const inputFiles = document.getElementById('ad_file').files;
            
                for (let i = 0; i < inputFiles.length; i++) {

                    const file = inputFiles[i]

                    const fileSize = file.size

                    console.log('File Size: ' + fileSize + ' bytes')

                    this.getFileDimensions(file, function(dimensions) {

                        if (dimensions) {

                            if (dimensions.width >= dimensions.height && fileSize <= 10485760 ) {
                                // submitButton.removeAttribute("disabled");
                                $('#attachment_error').html('')
                            } else if (dimensions.width < dimensions.height || fileSize > 10485760 ){
                                // submitButton.setAttribute("disabled", "true");
                                $('#attachment_error').html('Check your file orientation or size.')
                            }

                        } else {

                            $('#attachment_error').html('Unsupported file type.')

                        }
                    })
                    
                }
            
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
                    field:'ad_type',
                    title:'Ad Type',
                    template:(data)=> `<span>${data.ad_type}</span>`
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
                        <a href="javascript:;" class="btn btn-sm btn-clean  ${data.status == 1 ? 'btn-success' : 'btn-danger'} viewInfo btn-icon m-2" data-id="${data.id}" title="View">
                            <i class="fa-solid fa-eye"></i>
                        </a>
                        <a href="javascript:;" class="btn btn-sm btn-clean ${data.status == 1 ? 'btn-success disableAd' : 'btn-danger enableAd'} btn-icon m-2" data-id="${data.id}" title="${data.status == 1 ? '' : 'Enable'}">
                            <i class="fa-solid fa-toggle-on"></i>
                        </a>
                        <a href="javascript:;" class="btn btn-sm btn-clean  ${data.status == 1 ? 'btn-success' : 'btn-danger'} editInfo btn-icon m-2" data-id="${data.id}" title="Edit">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </a>
                        <a href="javascript:;" class="btn btn-sm btn-clean  ${data.status == 1 ? 'btn-success' : 'btn-danger deleteInfo'}  btn-icon m-2" data-id="${data.id}" title="Delete">
                            <i class="fa-solid fa-trash"></i>
                        </a> `
                    },
                }
            ]
        })

    }

}
