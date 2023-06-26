@push('styles')

@endpush
<!--begin::Modal - Users Search-->
<div class="modal fade" id="previewInfo" tabindex="-1" aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
        <!--begin::Modal content-->
        <div class="modal-content">
            <!--begin::Modal header-->
            <div class="modal-header pb-0 border-0 justify-content-end">
                
            </div>
            <!--begin::Modal header-->
            <!--begin::Modal body-->
            <div class="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15">
                <!--begin::Content-->
                <div class="text-center mb-13">
                    <h1 class="mb-3">Advertisement Preview</h1>
                </div>
                <!--end::Content-->
                
                <div class="form-group row" >
                    <div class="col-md-12 justify-content-between d-flex flex-column">
                        <!-- <img width="100%" height="550" src="{{asset('/assets/images/ramadan.gif')}}" alt="RAMADAN" /> -->
                        <div id="adPreview">

                        </div>
                    </div>
                </div>

            </div>
            <!--end::Modal body-->
            <div class="modal-footer">
                <button type="button" class="btn btn-light-primary font-weight-bold" id="previewModal_dismiss" data-dismiss="modal">Close</button>
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
