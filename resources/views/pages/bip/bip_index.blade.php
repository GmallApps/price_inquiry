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
    

        <div class="card card-custom gutter-b" style="background-color:#94d952;">
            <div class="card-body pb-0" >
                <div class="form-group row" >
                    <div class="col-md-4 justify-content-between d-flex flex-column">
                        <div class="card-body pb-0 ps-lg-6 mb-16 mt-md-0 mt-17 ">
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
                                <input type="text" class="form-control" name="upc_barcode" id="upc_barcode" autofocus>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <br/>
                        <video id="rewardsVid" width="100%" loop controls>
                            <source src="{{asset('/assets/images/GmallGCARDPLUS.mp4')}}" type="video/mp4">
                        </video>
                    </div>
                </div>
            </div>
        </div>
    
</div>

@endsection

@push('scripts')
    <script src="{{ asset('/js/pages/bip/bip_index.js')}}"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
@endpush

