@extends('admin.app',['title' => 'Ads'])

@section('content')



<!--begin::Content-->
<div class="content d-flex flex-column flex-column-fluid" id="kt_content">
    <!--begin::Toolbar-->
    <div class="toolbar" id="kt_toolbar">
        <!--begin::Container-->
        <div id="kt_toolbar_container" class="container-fluid d-flex flex-stack">
            <!--begin::Page title-->
            <div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" class="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
                <!--begin::Title-->
                <h1 class="d-flex text-dark fw-bolder fs-3 align-items-center my-1">Advertisements</h1>
                <!--end::Title-->
            </div>
            <!--end::Page title-->
            <!--begin::Actions-->
            <div class="d-flex align-items-center gap-2 gap-lg-3">
               
                <!--begin::Primary button-->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_create_ad">
                    Create Ad
                </button>
                <!--end::Primary button-->
            </div>
            <!--end::Actions-->
        </div>
        <!--end::Container-->
    </div>
    <!--end::Toolbar-->
    
    <!--begin::Post-->
    <div class="post d-flex flex-column-fluid" id="kt_post">
        <!--begin::Container-->
        <div id="kt_content_container" class="container-xxl">
            
            <!--begin::Row-->
            <div class="row gy-5 g-xl-10">
                
                <!--begin::Col-->
                <div class="col-xl-12 mb-5 mb-xl-10">
                    <!--begin::Table Widget 4-->
                    <div class="card card-flush h-xl-100">
                        <!--begin::Card header-->
                        <div class="card-header pt-7">
                            <!--begin::Title-->
                            <!--livewire:ad-lists /--> 
                            <h3 class="card-title align-items-start flex-column">
                                <span class="card-label fw-bolder text-gray-800">Ad List</span>
                                <!-- <span class="text-gray-400 mt-1 fw-bold fs-6">Avg. 57 orders per day</span> -->
                            </h3>
                            <!--end::Title-->
                            <!--begin::Actions-->
                            <div class="card-toolbar">
                                <!--begin::Filters-->
                                <div class="d-flex flex-stack flex-wrap gap-4">
                                   
                                    <!--begin::Search-->
                                    <!-- <div class="position-relative my-1">
                                        <span class="svg-icon svg-icon-2 position-absolute top-50 translate-middle-y ms-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
                                                <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
                                            </svg>
                                        </span>
                                        <input type="text" data-kt-table-widget-4="search" class="form-control w-150px fs-7 ps-12" placeholder="Search" />
                                    </div> -->
                                    <!--end::Search-->
                                </div>
                                <!--begin::Filters-->
                            </div>
                            <!--end::Actions-->
                        </div>
                        <!--end::Card header-->
                        <!--begin::Card body-->
                        
                        <div class="card-body pt-2">
                            <table class="table align-middle table-row-dashed fs-6 gy-3" id="ad_table">
                                <thead>
                                    <tr class="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
                                        <th class="min-w-100px">Ad no.</th>
                                        <th class="text-end min-w-100px">Title</th>
                                        <th class="text-end min-w-125px">Created</th>
                                        <th class="text-end min-w-125px">Status</th>
                                        <th class="text-end min-w-50px">Actions</th>
                                    </tr>
                                </thead>
                                <tbody class="fw-bolder text-gray-600">
                                    @foreach ($ads as $ad)
                                        <tr>
                                            <td>
                                                <a href="../../demo1/dist/apps/ecommerce/catalog/edit-product.html" class="text-gray-800 text-hover-primary">{{$ad->id}}</a>
                                            </td>
                                            <td class="text-end">{{$ad->title}}</td>
                                            <td class="text-end">
                                                <a href="#" class="text-gray-600 text-hover-primary">{{$ad->created_at}}</a>
                                            </td>
                                            <td class="text-end">
                                                @if($ad->status==1)
                                                    <span class="badge badge-success">Published</span>
                                                @else
                                                    <span class="badge badge-danger">Unpublished</span>
                                                @endif
                                                

                                            </td>
                                            <td class="text-end">
                                                <div class="dropdown">
                                                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                       
                                                    </a>

                                                    <ul class="dropdown-menu">
                                                        <li><a class="dropdown-item" href="#">View</a></li>
                                                        <li><a class="dropdown-item" href="#">Edit</a></li>
                                                        <li><a class="dropdown-item" href="#">Delete</a></li>
                                                        <li><a class="dropdown-item" href="#">Publish</a></li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                        <!-- <div class="datatable datatable-bordered datatable-head-custom" id="view_ads"></div> -->
                        <!--end::Card body-->
                    </div>
                    <!--end::Table Widget 4-->
                </div>
                <!--end::Col-->
            </div>
            <!--end::Row-->
        </div>
        <!--end::Container-->
    </div>
    <!--end::Post-->
</div>
<!--end::Content-->
@include('pages.modals.new_ad')

@endsection



<!-- @push('scripts')

@endpush -->

@section('scripts')
<script>
    document.addEventListener('alert', function (event) {
        var type = event.detail.type;
        var message = event.detail.message;

        // Show the alert using your preferred alert library
        // Here's an example using Bootstrap's alert component
        var alertHtml = '<div class="alert alert-' + type + ' alert-dismissible fade show" role="alert">' +
            message +
            '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
            '</div>';
        document.querySelector('#alerts').innerHTML = alertHtml;
    });
</script>

@endsection

