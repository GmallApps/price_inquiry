@push('styles')
<link href="{{asset('/css/globals/fileinput.min.css')}}" media="all" rel="stylesheet" type="text/css" />
<style>
.file-upload-indicator,.btn-close , .fileinput-pause-button{
    display: none !important;
}

.child_datatable > .datatable-pager
{
    display: none !important;
}
</style>
@endpush
<!--begin::Modal - Users Search-->
<div class="modal fade" id="kt_modal_create_ad" tabindex="-1" aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
        <!--begin::Modal content-->
        <div class="modal-content">
            <!--begin::Modal header-->
            <div class="modal-header pb-0 border-0 justify-content-end">
                <!--begin::Close-->
                <div class="btn btn-sm btn-icon btn-active-color-primary" data-dismiss="modal">
                    <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->
                    <span class="svg-icon svg-icon-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
                            <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
                        </svg>
                    </span>
                    <!--end::Svg Icon-->
                </div>
                <!--end::Close-->
            </div>
            <!--begin::Modal header-->
            <!--begin::Modal body-->
            <div class="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15">
                <!--begin::Content-->
                <div class="text-center mb-13">
                    <h1 class="mb-3">Create an Advertisement</h1>
                    <div class="text-muted fw-bold fs-5">Upload either an MP4 or GIF file</div>
                </div>
                <!--end::Content-->
                
                <form action="post" class="form" id="create_ad_form">

                    <div class="form-group row">
                        <label class="col-form-label col-lg-3 col-sm-12 text-right">Title</label>
                        <div class="col-lg-8 col-md-9 col-sm-12">
                            <div class="input-group">
                                <input type="text" class="form-control" name="ad_title" id="ad_title" placeholder="Advertisement Title"/>
                            </div>
                            <div class="fv-plugins-message-container">
                                <div id="title_error" class="fv-help-block"></div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-form-label col-lg-3 col-sm-12 text-right">Upload</label>
                        <div class="col-lg-8 col-md-12 col-sm-12">
                            <div class="file-loading">
                                <input name="ad_file" id="ad_file" type="file" data-show-preview="false">
                            </div>
                            <div class="fv-plugins-message-container">
                                <div data-field="ad_file" data-validator="ad_file" id="attachment_error" class="fv-help-block"></div>
                            </div>
                        </div>
                    </div>

                    

                </form>
            </div>
            <!--end::Modal body-->
            <div class="modal-footer">
                <button type="button" class="btn btn-light-primary font-weight-bold" id="createAdModal_cancel" data-dismiss="modal">Close</button>
                <button type="button" id="ad_submit" class="btn btn-dark font-weight-bold">Submit</button>
            </div>
        </div>
        <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
</div>
<!--end::Modal - Users Search-->
@push('scripts')
<script src="{{asset('/js/globals/fileinput.min.js')}}"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
@endpush