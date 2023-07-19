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

<div class="container text-center">
    
    <br/><br/><br/><br/><br/>
    <h1 class="text-danger" style="font-size:10rem;font-weight:bold;">404</h1><br/>
    <h1 class="text-danger">PAGE NOT FOUND!</h1>

</div>

@endsection

@push('scripts')
    
@endpush

