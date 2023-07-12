@extends('admin.index',['title' => 'Ads'])


@push('styles')
<!-- <link rel="stylesheet" href="{{asset('/css/globals/datatables.bundle.css')}}"> -->

</style>
@endpush
    @section('content')
    <div class="container">
        <!--begin::Card-->
        <div class="card card-custom">
            <div class="card-header flex-wrap border-0 pt-6 pb-0">
                <div class="card-title">
                    <h3 class="card-label">Advertisements
                    <span class="text-muted pt-2 font-size-sm d-block">Ad List</span></h3>
                </div>
                <div class="card-toolbar">
                    <!-- <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#kt_modal_create_ad"> -->
                    <button type="button" class="btn btn-dark" id="btn_create_modal">
                        Create Ad
                    </button>
                </div>
            </div>
            <div class="card-body">
            <div class="datatable datatable-bordered datatable-head-custom" id="advertisements"></div>
                <!--end::Datatable-->

            </div>
        </div>
        <!--end::Card-->
    </div>
    @include('pages.modals.new_ad')
    @include('pages.modals.preview_ad')
    @include('pages.modals.delete_ad')
@endsection

@push('scripts')
<!-- <script src="{{asset('/js/globals/datatables.bundle.js')}}" ></script>
<script src="{{ asset('/js/pages/tenant/tenant.js')}}"></script> -->
<script src="{{mix('/js/pages/ads/ads.js')}}"></script>

@endpush
