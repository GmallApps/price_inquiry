@extends('pages.index')

@section('content')

<div class="container text-center">
    
    <div id="ip"></div>

</div>

@endsection

@push('scripts')
    <script src="{{ asset('/js/pages/ip_check/ip_check.js')}}"></script>
@endpush

