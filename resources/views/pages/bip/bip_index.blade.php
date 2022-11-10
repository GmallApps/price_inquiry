@extends('pages.index')

<style>
.flex-container {
  display: flex;
}
.center-container-element {
   margin-left:auto;
   margin-right:auto;
   display:block;
}

.align-text-elements-left {
    padding-left:10% !important;
}

.align-text-elements-right {
    padding-left:15% !important;
}
</style>

@section('content')

<div class="container" >
    <form class="form" id="kt_form" >

        <div class="card card-custom gutter-b" style="background-color:#94d952;">
            <div class="card-body" >
                <div class="form-group row" >
                    <div class="col-md-8">
                        <div id="myCarousel" class="carousel slide" data-ride="carousel">
                            <!-- Indicators -->
                            <ol class="carousel-indicators">
                                <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                                <li data-target="#myCarousel" data-slide-to="1"></li>
                                <li data-target="#myCarousel" data-slide-to="2"></li>
                            </ol>

                            <!-- Wrapper for slides -->
                            <div class="carousel-inner">
                                <div class="item active">
                                    <img src="{{asset('/assets/images/ad1.jpg')}}" alt="Davao" style="width:100%;">
                                </div>

                                <div class="item">
                                    <img src="{{asset('/assets/images/ad2.jpg')}}" alt="Toril" style="width:100%;">
                                </div>
                                
                                <div class="item">
                                    <img src="{{asset('/assets/images/ad3.jpg')}}" alt="Digos" style="width:100%;">
                                </div>
                            </div>

                            <!-- Left and right controls -->
                            <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                            <span class="glyphicon glyphicon-chevron-left"></span>
                            <span class="sr-only">Previous</span>
                            </a>
                            <a class="right carousel-control" href="#myCarousel" data-slide="next">
                            <span class="glyphicon glyphicon-chevron-right"></span>
                            <span class="sr-only">Next</span>
                            </a>

                        </div>
                    </div>
                    <div class="col-md-4 justify-content-between d-flex flex-column">
                        <div class="ps-lg-6 mb-16 mt-md-0 mt-17">
                            <br/>
                            <div class="text-center mb-18">
                                <img width="95%" src="{{asset('/assets/images/gmarket2.png')}}" alt="" />
                            </div>
                            
                            <div class="text-center  mb-18">
                                <h1 class="fs-2hx text-dark mb-3" style="font-weight: bold;font-size: 48pt;" id="price">--</h1>
                                <h2 class="fs-2hx text-dark mb-3" style="font-weight: bold;" id="short_descr">Scan Barcode</h2>
                                <h3 class="fs-2hx text-dark mb-3" id="actual_barcode"></h3>
                            </div>
                            <div class="text-center  mb-18">
                                <h3 class="fs-2hx text-dark mb-3"><b>Barcode</b></h3>
                                <input type="hidden" class="form-control" name="store" id="store" value="">
                                <input type="hidden" class="form-control" name="store_code" id="store_code" value="2001">
                                <input type="url" class="form-control" name="upc_barcode" id="upc_barcode" autofocus>
                                <input type="hidden" class="form-control" name="upc_dummy" id="upc_dummy" autofocus>
                            </div>
                        </div>
                        <!--end::Post-->
                    </div>
                    <!--end::Col-->
                </div>
                <div class="form-group row">
                    <div class="col-md-12 justify-content-between d-flex flex-column">
                        <div class="mb-16">
                            <!--div class="text-center mb-12">
                                <h3 class="fs-2hx text-dark mb-5">Branches</h3>
                            </div-->
                            <div class="row g-10">
                                <div class="col-md-4">
                                    <div class="card-xl-stretch me-md-6">
                                        <a class="d-block overlay mb-4" data-fslightbox="lightbox-hot-sales" href="{{asset('/assets/images/davB.jpg')}}">
                                            <div class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-175px" style="background-image:url({{asset('/assets/images/davB.jpg')}})"></div>
                                            <div class="overlay-layer bg-dark card-rounded bg-opacity-25">
                                                <i class="bi bi-eye-fill fs-2x text-white"></i>
                                            </div>
                                        </a>
                                        <div class="m-0"></div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card-xl-stretch me-md-6">
                                        <a class="d-block overlay mb-4" data-fslightbox="lightbox-hot-sales" href="{{asset('/assets/images/tagB.jpg')}}">
                                            <div class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-175px" style="background-image:url({{asset('/assets/images/tagB.jpg')}})"></div>
                                            <div class="overlay-layer bg-dark card-rounded bg-opacity-25">
                                                <i class="bi bi-eye-fill fs-2x text-white"></i>
                                            </div>
                                        </a>
                                        <div class="m-0"></div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card-xl-stretch me-md-6">
                                        <a class="d-block overlay mb-4" data-fslightbox="lightbox-hot-sales" href="{{asset('/assets/images/torB.jpg')}}">
                                            <div class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-175px" style="background-image:url({{asset('/assets/images/torB.jpg')}})"></div>
                                            <div class="overlay-layer bg-dark card-rounded bg-opacity-25">
                                                <i class="bi bi-eye-fill fs-2x text-white"></i>
                                            </div>
                                        </a>
                                        <div class="m-0"></div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card-xl-stretch me-md-6">
                                        <a class="d-block overlay mb-4" data-fslightbox="lightbox-hot-sales" href="{{asset('/assets/images/digB.jpg')}}">
                                            <div class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-175px" style="background-image:url({{asset('/assets/images/digB.jpg')}})"></div>
                                            <div class="overlay-layer bg-dark card-rounded bg-opacity-25">
                                                <i class="bi bi-eye-fill fs-2x text-white"></i>
                                            </div>
                                        </a>
                                        <div class="m-0"></div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card-xl-stretch me-md-6">
                                        <a class="d-block overlay mb-4" data-fslightbox="lightbox-hot-sales" href="{{asset('/assets/images/genB.jpg')}}">
                                            <div class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-175px" style="background-image:url({{asset('/assets/images/genB.jpg')}})"></div>
                                            <div class="overlay-layer bg-dark card-rounded bg-opacity-25">
                                                <i class="bi bi-eye-fill fs-2x text-white"></i>
                                            </div>
                                        </a>
                                        <div class="m-0"></div>
                                    </div>
                                </div>
                            </div>
                            <!--end::Row-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </form>
</div>

@endsection

@push('scripts')
    <script src="{{ asset('/js/pages/bip/bip_index.js')}}"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
@endpush

