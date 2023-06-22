import { default as axios } from "axios"

void new class ViewAds{
    constructor(){

        this.first_name = document.querySelector('[name="first_name"]')

        this.last_name = document.querySelector('[name="last_name"]')

        this.email = document.querySelector('[name="email"]')

        this.buyer_code = document.querySelector('[name="buyer_code"]')

        this.form = document.querySelector('#editUserForm')

        this.headBuyers = headBuyers

        this.submitButton = document.querySelector('#updateUser')

        this.cancelButton = document.querySelector('#cancelUpdate')

        this.savedBuyer = []

        this.tagify = document.querySelector("#permissionTags")

        this.btnAddUser = document.querySelector('#addUser')

        this.modalTitle= document.querySelector('#modal-title')

        this.modalDetails = document.querySelector('#modal-details')

        headBuyers = undefined

        this.initDatable()

        this.initFormValidation()

        this.eventHandlers()


    }


    initDatable = () => {
        this.dataTable = $('#ad_table').DataTable({
            responsive: true,
            searchDelay: 1000,
            processing: true,
            serverSide: true,
            order: [[0, 'desc']],
            select: {
                style: 'os',
                selector: 'td:first-child',
                className: 'row-selected'
            },
            ajax: {
                url: "/ads",
            },
            columns: [
                { data: null },
                { data: null },
                { data: null },
                { data: null },
                { data: null },
            ],
            columnDefs: [
            {
                targets: 0 ,
                render:({first_name,last_name}) => `${first_name} ${last_name}`
            },
            {
                targets: 1 ,
                render:({user}) => `${user.email}`
            },
            {
                targets: 2 ,
                render:({user}) => `${user.buyer_code}`
            },
            {
                targets: 3 ,
                render:({user:{head_buyers}}) =>{
                    let list = ''

                    head_buyers.forEach((head_buyer) => {
                        if(head_buyer.head_buyer_details){
                            let {person} = head_buyer.head_buyer_details
                            list += `<div class="fw-bold text-gray-600">${person.first_name} ${person.last_name}</div>`
                        }
                    })

                    return list
                }
            },
            {
                targets: -1,
                data: null,
                orderable: false,
                render: function ({id}) {
                    return `
                        <a href="javascript:;" class="btn btn-light btn-active-light-primary btn-sm onUpdateUser" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-menu-flip="top-end">
                            Actions
                            <span class="svg-icon svg-icon-5 m-0">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <polygon points="0 0 24 0 24 24 0 24"></polygon>
                                        <path d="M6.70710678,15.7071068 C6.31658249,16.0976311 5.68341751,16.0976311 5.29289322,15.7071068 C4.90236893,15.3165825 4.90236893,14.6834175 5.29289322,14.2928932 L11.2928932,8.29289322 C11.6714722,7.91431428 12.2810586,7.90106866 12.6757246,8.26284586 L18.6757246,13.7628459 C19.0828436,14.1360383 19.1103465,14.7686056 18.7371541,15.1757246 C18.3639617,15.5828436 17.7313944,15.6103465 17.3242754,15.2371541 L12.0300757,10.3841378 L6.70710678,15.7071068 Z" fill="#000000" fill-rule="nonzero" transform="translate(12.000003, 11.999999) rotate(-180.000000) translate(-12.000003, -11.999999)"></path>
                                    </g>
                                </svg>
                            </span>
                        </a>
                        <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4" data-kt-menu="true">
                            <div class="menu-item px-3">
                                <a href="javascript:;" class="menu-link px-3 edit-info" data-person="${id}">
                                    Edit
                                </a>
                            </div>

                            <div class="menu-item px-3">
                                <a href="javascript:;" class="menu-link px-3 delete-user" data-person="${id}">
                                    Delete
                                </a>
                            </div>
                        </div>
                    `;
                },
            }
            ]
        })


        this.dataTable.on('draw', () =>  {

            KTMenu.createInstances()

            document.querySelectorAll('.edit-info').forEach(async el =>  el.addEventListener('click', this.getPersonInformation))

            this.initTagify()

            this.initDualListBox()

        })



    }

    initTagify = () => {

        this.permissions = new Tagify(this.tagify, {
            whitelist: [{id:1,value:"View"},{id:2,value:"Delegate"},{id:3,value:"Approve"}],
            maxTags: 10,
            dropdown: {
                maxItems: 3,
                classname: "",
                enabled: 0,
                closeOnSelect: false
            },
            enforceWhitelist: true
        })


        this.tagify.addEventListener('change',() => {
            this.validation.revalidateField('permissions')
        })
    }

    initDualListBox = () => {
        this.head_buyer_lists = new DualListbox(document.querySelector('#headbuyers'), {
            addEvent: (value) =>  {
                this.savedBuyer.push(value)
                console.log(this.savedBuyer)
            },
            removeEvent: (value) =>  {
                this.savedBuyer = this.savedBuyer.filter(e => e != value)
                console.log(this.savedBuyer)
            },
            availableTitle: 'Head Buyers List',
            selectedTitle: 'Selected Head Buyers',
            addButtonText: '>',
            removeButtonText: '<',
            addAllButtonText: '>>',
            removeAllButtonText: '<<',
        })

    }

    initFormValidation = () => {
        this.validation = FormValidation.formValidation(this.form,{
            fields:{
                first_name:{
                    validators:{
                        notEmpty:{
                            message:'Fist Name is required'
                        }
                    }
                },
                last_name:{
                    validators:{
                        notEmpty:{
                            message:'Last Name is required'
                        }
                    }
                },
                email:{
                    validators:{
                        notEmpty:{
                            message:'Email is required'
                        },
                        emailAddress: {
                            message: 'Invalid email address'
                        }
                    }
                },
                permissions:{
                    validators:{
                        notEmpty:{
                            message:'Permission is required'
                        }
                    }
                },
                buyer_code:{
                    validators:{
                        notEmpty:{
                            message:'Buyer Code is required'
                        }
                    }
                },
                password_confirmation:{
                    validators:{
                        identical:{
                            compare:() =>  this.form.querySelector('[name="password"]').value,
                            message:"Password does not match"
                        }
                    }
                }
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap: new FormValidation.plugins.Bootstrap5({
                    rowSelector: '.fv-row',
                    eleInvalidClass: '',
                    eleValidClass: ''
                })
            }
        })
    }

    getPersonInformation = async({target}) =>{
        try{
            this.personId = target.dataset.person

            this.form.reset()

            const {data:result} = await axios.get(`/person/${target.dataset.person}`)

            this.populateUserInformation(result)

            this.modalTitle.innerHTML = 'Edit User'

            this.modalDetails.innerHTML = 'Update Personal Information and User credentials'

            this.submitButton.dataset.action = 'UPDATE'

            $('#updateUserModal').modal('show')
        }catch(err){
            console.log(err)
        }
    }

    populateUserInformation =  (data) => {
        const {user} =  data

        this.first_name.value = data.first_name

        this.last_name.value = data.last_name

        this.email.value = user.email

        this.buyer_code.value = user.buyer_code

        this.populateTagify(user.user_access)

        if(user.head_buyers) this.populateDualListBox(user.head_buyers)
    }

    populateTagify = (user_access) =>{
        this.permissions.removeAllTags()

        const accesses = []

        user_access.forEach(({access}) => accesses.push(access.description))

        this.permissions.addTags(accesses)
    }

    populateDualListBox = (head_buyers = null) => {
        this.savedBuyer = []

        if(head_buyers)  head_buyers.forEach(({head_buyer}) => this.savedBuyer.push(head_buyer))

        this.head_buyer_lists.available = []

        this.head_buyer_lists.selected = []

        this.headBuyers.forEach(({text,value}) => {
            this.head_buyer_lists._addOption({
                text:text ,
                value: value,
                selected:this.savedBuyer.includes(value)
            })
        })

        this.head_buyer_lists.redraw()

    }

    eventHandlers = () => {

        this.submitButton.addEventListener('click',this.submitForm)

        this.cancelButton.addEventListener('click', () => $('#updateUserModal').modal('hide'))

        this.btnAddUser.addEventListener('click',() => {

            this.modalTitle.innerHTML = 'Add User'

            this.modalDetails.innerHTML = 'Add Personal Information and User credentials'

            this.form.reset()

            this.submitButton.dataset.action = 'ADD'

            this.populateDualListBox()

            $('#updateUserModal').modal('show')

        })

    }


    submitForm = async () => {

        if(this.submitButton.dataset.action === 'ADD'){
            confirmAlert('Create User','Do you wish to continue',this.addUser)
        }else if(this.submitButton.dataset.action === 'UPDATE'){
            confirmAlert('Update User','Do you wish to continue',this.updateUserInformation)
        }
    }


    updateUserInformation = async () => {
        try{
            const result = await this.validation.validate()

            if(result === 'Valid'){
                    const formData = new FormData(this.form)

                    formData.append('buyers',this.savedBuyer)

                    formData.append('personId' , this.personId)

                    await axios.post('/update/user',formData)

                     $('#updateUserModal').modal('hide')

                     showAlert('Success!','User Updated Successfully','success')
            }

        }catch(err){
            $('#updateUserModal').modal('hide')

            showAlert('Warning!','Something went wrong','warning')
        }
    }


    addUser = async () => {
        try{
            const formData = new FormData(this.form)

            formData.append('buyers',this.savedBuyer)

            const {data:result} = await axios.post('/user',formData)

            $('#updateUserModal').modal('hide')

            showAlert('Success!','User Created','success')

        }catch(err){
            $('#updateUserModal').modal('hide')

            showAlert('Warning!','Something went wrong','warning')
        }
    }


}
