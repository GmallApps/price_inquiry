void new class Terminal{
    constructor(){

        this.addTerminalForm = document.querySelector('#add_terminal_form')

        this.addTerminalButton = document.querySelector('#btn_add_terminal_modal')

        this.initDatatable()

        this.eventHandler()

        this.initialization()
    }

    eventHandler(){

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
