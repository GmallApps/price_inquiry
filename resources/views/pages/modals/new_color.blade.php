@push('styles')

@endpush
<!--begin::Modal - Users Search-->
<div class="modal fade" id="kt_modal_add_color" tabindex="-1" aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
        <!--begin::Modal content-->
        <div class="modal-content">
            <!--begin::Modal header-->
            <div class="modal-header pb-0 border-0 justify-content-end">
                <!--begin::Close-->
                <div class="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
                    <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->
                   
                    <!--end::Svg Icon-->
                </div>
                <!--end::Close-->
            </div>
            <!--begin::Modal header-->
            <!--begin::Modal body-->
            <div class="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15">
                <!--begin::Content-->
                <div class="text-center mb-13">
                    <h1 class="mb-3" id="modal_color_title">Add New Color</h1>
                    <!-- <div class="text-muted fw-bold fs-5">The new color </div> -->
                </div>
                <!--end::Content-->
                
                <form action="post" class="form" id="add_color_form">

                    <div class="form-group row">
                        <label class="col-form-label col-lg-3 col-sm-12 text-right">Pick Color</label>
                        <div class="col-lg-8 col-md-9 col-sm-12">
                            <!-- <label for="exampleColorInput" class="form-label">Color picker</label> -->
                            <input type="color" class="form-control form-control-color" id="color_input" name="color_input" value="#94d952" title="Choose your color">
                        </div>
                        <div class="fv-plugins-message-container">
                            <div id="color_error" class="fv-help-block"></div>
                        </div>
                    </div>

                    

                </form>
            </div>
            <!--end::Modal body-->
            <div class="modal-footer">
                <button type="button" class="btn btn-light-primary font-weight-bold" id="newColorModal_cancel" data-dismiss="modal">Close</button>
                <button type="button" id="color_submit" class="btn btn-dark font-weight-bold">Submit</button>
                <button type="button" id="color_update" class="btn btn-dark font-weight-bold">Update</button>
            </div>
        </div>
        <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
</div>
<!--end::Modal - Users Search-->
@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
@endpush
