void new class ViewAds
{
    constructor()
    {
        this.tableName = 'view_ads'
        this.initDatatable(this.tableName)
        this.eventHandlers()
        console.log('test');
    }

    initDatatable()
    {
        this.dataTable = $(`#${this.tableName}`).KTDatatable({
                data:{
                    type: 'remote',
                    source:{
                        read:{
                            url:'/ad-list',
                            method:'GET',
                            headers:{
                                'X-CSRF-TOKEN':$('meta[name="_token"]').attr('content')
                            },
                            params:{
                                status:'1'
                            }
                        }
                    },
                    pageSize:5,
                    serverPaging:true,
                    serverFiltering:true,
                    serverSorting:true,
                    saveState:false
                },
                layout:{
                    scroll:false,
                    footer:false
                },
                sortable:true,
                toolbar: {
                    placement: ['bottom'],
                    items: {
                        pagination: {
                            pageSizeSelect: [5, 10, 20, 30, 50],
                        },
                    },
                },
                columns: this.datatableColumns()
        })

    }

    
    eventHandlers()
    {
        $(document).on('click','.edit_requisition',function(){
            if($(this).data('valid')) window.location.href = `/update-request/${$(this).data('requisition')}`;
        })

        $(document).on('click','.preview_requisition',function(){
            window.location.href=`/preview/requisition/${$(this).data('requisition')}`;
        })

    }

    datatableColumns()
    {
        const columns = [
            {
                field:'id',
                title:'Ad Number',
                width:100
            },
            {
                field:'title',
                title:'Title',
                width:100,
                template:(row) => `${row.ad.title}`
            },
            {
                field:'file',
                title:'File',
                width:150
            },
            {
                field:'status',
                title:'Status',
                width:300,
                template:(row) =>  `${row.ad.status}`
            },
            {
                field:'created_at',
                title:'Created At'
            }
        ]

        // if(access_level === 'REQUESTER') columns.splice(1,1)

        return columns
    }

}
