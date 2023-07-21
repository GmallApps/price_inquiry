@extends('admin.index',['title' => 'Terminal'])


@push('styles')
<!-- <link rel="stylesheet" href="{{asset('/css/globals/datatables.bundle.css')}}"> -->
@endpush
@section('content')
    <div class="container">
        <!--begin::Card-->
        <div class="card card-custom">
            <div class="card-header flex-wrap border-0 pt-6 pb-0">
                <div class="card-title">
                    <h3 class="card-label">Terminal
                    <span class="text-muted pt-2 font-size-sm d-block">Terminal List</span></h3>
                </div>
                <div class="card-toolbar">
                    <!-- <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#kt_modal_create_ad"> -->
                    <button type="button" class="btn btn-dark" id="btn_add_terminal_modal">
                        Add Terminal
                    </button>
                </div>
            </div>
            <div class="card-body">
            <div class="datatable datatable-bordered datatable-head-custom" id="terminals"></div>
                <!--end::Datatable-->

            </div>
        </div>
        <!--end::Card-->
    </div>
    @include('pages.modals.new_terminal')
    @include('pages.modals.delete_terminal')

@endsection

@push('scripts')
<script src="{{mix('/js/pages/terminal/terminal.js')}}"></script>
@endpush
