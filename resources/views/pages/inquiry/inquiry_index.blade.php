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

.box {
  box-shadow:
  0 2.8px 2.2px rgba(0, 0, 0, 0.034),
  0 6.7px 5.3px rgba(0, 0, 0, 0.048),
  0 12.5px 10px rgba(0, 0, 0, 0.06),
  0 22.3px 17.9px rgba(0, 0, 0, 0.072),
  0 41.8px 33.4px rgba(0, 0, 0, 0.086),
  0 5px 80px rgba(0, 0, 0, 0.12);
  border-radius:5px;
}

</style>

@section('content')

<div class="container">
    
        <br/><br/><br/>
        <!-- <div class="card card-custom gutter-b mt-5" style="background-color:#84be4d;"> -->
        <div class="card card-custom gutter-b mt-5 bg_gmall">
            <br/><br/>
            <div class="card-body pb-0" >
                <div class="form-group row" >
                    <div class="col-md-4 justify-content-between d-flex flex-column">
                        <!-- <div class="card-body pb-0 ps-lg-6 mb-16 mt-md-0 mt-5 box" style="background-color:#94d952;"> -->
                        <div class="card-body pb-0 ps-lg-6 mb-16 mt-md-0 mt-5 box " style="background-color:#ffffff">
                            <div class="text-center mb-18">
                                <img width="80%" src="{{asset('/assets/images/gmall_davao.png')}}" alt="" />
                            </div>
                            <div class="text-center  mb-3">
                                <h1 class="fs-2hx text-dark mb-3" style="font-weight: bold;font-size: 35pt;" id="price">--</h1>
                                <h2 class="text-dark mb-3" style="font-weight: bold;" id="short_descr">Scan Barcode</h2>
                                <h3 class="fs-2hx text-dark mb-3" id="actual_barcode">--</h3>
                                <h3><span id="sale_term" style="display:none;color:red;font-weight: bold;"></span><br/><span style="display:none;font-weight: bold;font-size: 35pt;color:red;" id="sale_price"></span></h3>
                            </div>
                            <div class="text-center  mb-18">
                                <h3 class="fs-2hx text-dark mb-3"><b>Barcode</b></h3>
                                <input type="text" class="form-control" name="upc_barcode" id="upc_barcode" autofocus>
                            </div>
                            <!-- <div class="text-center  mb-18">
                                <h5 class="fs-2hx text-dark mb-3"><b>Current Date (For Testing Only)</b></h5>
                                <input type="date" class="form-control" name="current_date" id="current_date">
                            </div> -->
                            
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="form-group row" >
                            <div class="col-md-12 justify-content-between d-flex flex-column">
                                <div id="ad_media"></div>
                                <!-- <img width="100%" height="550" src="{{asset('/assets/images/ramadan.gif')}}" alt="RAMADAN" /> -->

                                <!-- <video width="100%" loop autoplay="autoplay" class="box">
                                    <source src="{{asset('/assets/ad_files/1.mp4')}}" type="video/mp4">
                                </video> -->

                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        
</div>

@endsection

@push('scripts')
    <script src="{{ asset('/js/pages/inquiry/inquiry_index.js')}}"></script>
    
@endpush

