<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <title>{{$title}} - Price Inquiry</title>
      <meta name="description" content="Gaisano Malls Tenant Portal" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <!--begin::Fonts-->
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" />
      <!--begin::Global CSS-->
      <link rel="stylesheet" href="{{ asset('/css/globals/plugins.bundle.css')}}" async>
      <link rel="stylesheet" href="{{ asset('/css/globals/prismjs.bundle.css')}}" async>
      <link rel="stylesheet" href="{{ asset('/css/globals/style.bundle.min.css')}}" async>
      @once
      @stack('styles')
      @endonce
      <!--end::Global CSS-->
   </head>
   <body id="kt_body" class="header-fixed header-mobile-fixed page-loading">
      <!--begin::Main-->
      <!--begin::Header Mobile-->
      <div id="kt_header_mobile" class="header-mobile bg-primary header-mobile-fixed">
         <!--begin::Logo-->
         <a href="/admin/dashboard">
         <img alt="Logo" src="{{asset('/assets/images/GaisanoMalls-White.png')}}" class="max-h-30px" />
         {{-- Logo for Mobile View --}}
         </a>
         <!--end::Logo-->
         <!--begin::Toolbar-->
         <div class="d-flex align-items-center">
            <button class="btn p-0 burger-icon burger-icon-left ml-4" id="kt_header_mobile_toggle">
            <span></span>
            </button>
            <button class="btn p-0 ml-2" id="kt_header_mobile_topbar_toggle">
               <span class="svg-icon svg-icon-xl">
                  <!--begin::Svg Icon | path:assets/media/svg/icons/General/User.svg-->
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                     <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <polygon points="0 0 24 0 24 24 0 24" />
                        <path d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />
                        <path d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z" fill="#000000" fill-rule="nonzero" />
                     </g>
                  </svg>
                  <!--end::Svg Icon-->
               </span>
            </button>
         </div>
         <!--end::Toolbar-->
      </div>
      <!--end::Header Mobile-->
      <div class="d-flex flex-column flex-root">
         <!--begin::Page-->
         <div class="d-flex flex-row flex-column-fluid page">
            <!--begin::Wrapper-->
            <div class="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">
               <!--begin::Header-->
               <div id="kt_header" class="header flex-column header-fixed">
                  <!--begin::Top-->
                  <div class="header-top">
                     <!--begin::Container-->
                     <div class="container">
                        <!--begin::Left-->
                        <div class="d-none d-lg-flex align-items-center mr-3">
                           <!--begin::Logo-->
                           <a href="/admin/dashboard" class="mr-20">
                            <img alt="Logo" src="{{asset('/assets/images/branchlogo.png')}}" class="max-h-30px" />

                           {{-- Logo For Desktop view --}}
                           </a>
                           <!--end::Logo-->
                        </div>
                        <!--end::Left-->
                        <!--begin::Topbar-->
                        <div class="topbar">

                           <!--end::Notifications-->
                           <!--begin::User-->
                           <div class="topbar-item">
                              <div class="btn btn-icon btn-hover-transparent-white w-auto d-flex align-items-center btn-lg px-2" id="kt_quick_user_toggle">
                                 <div class="d-flex flex-column text-right pr-3">
                                    <span class="text-white opacity-50 font-weight-bold font-size-sm d-none d-md-inline">{{ Auth::user()->firstname ?? 'User'}}</span>
                                    <span class="text-white font-weight-bolder font-size-sm d-none d-md-inline">{{ Auth::user()->email ?? 'No email'}}</span>
                                 </div>
                                 <span class="symbol symbol-35">
                                 <span class="symbol-label font-size-h5 font-weight-bold text-white bg-white-o-30">{{ucwords(Auth::user()->firstname)}}</span>
                                 </span>
                              </div>
                           </div>
                           <!--end::User-->
                        </div>
                        <!--end::Topbar-->
                     </div>
                     <!--end::Container-->
                  </div>
                  <!--end::Top-->
                  
               </div>
               <!--end::Header-->
               <!--begin::Content-->
               <div class="content d-flex flex-column flex-column-fluid" id="kt_content">
                  <!--begin::Entry-->
                  <div class="d-flex flex-column-fluid">
                     <!--begin::Container-->
                     @yield('content')
                     <!--end::Container-->
                  </div>
                  <!--end::Entry-->
               </div>
               <!--end::Content-->
            </div>
            <!--end::Wrapper-->
         </div>
         <!--end::Page-->
      </div>
      <!--end::Main-->
      <!-- begin::User Panel-->
      <div id="kt_quick_user" class="offcanvas offcanvas-right p-10">
         <!--begin::Header-->
         <div class="offcanvas-header d-flex align-items-center justify-content-between pb-5">
            <h3 class="font-weight-bold m-0">User Profile
               <small class="text-muted font-size-sm ml-2"></small>
            </h3>
            <a href="#" class="btn btn-xs btn-icon btn-light btn-hover-primary" id="kt_quick_user_close">
            <i class="ki ki-close icon-xs text-muted"></i>
            </a>
         </div>
         <!--end::Header-->
         <!--begin::Content-->
         <div class="offcanvas-content pr-5 mr-n5">
            <!--begin::Header-->
            <div class="d-flex align-items-center mt-5">
               
               <div class="d-flex flex-column">
                  <a href="#" class="font-weight-bold font-size-h5 text-dark-75 text-hover-primary">{{Auth::user()->firstname}}</a>
                  <div class="text-muted mt-1">{{Auth::user()->firstname}}</div>
                  <div class="navi mt-2">
                     <a href="#" class="navi-item" >
                        <span class="navi-link p-0 pb-2 d-flex" style="flex-wrap:wrap;">
                           <span class="navi-icon mr-1">
                              <span class="svg-icon svg-icon-lg svg-icon-primary">
                                 <!--begin::Svg Icon | path:assets/media/svg/icons/Communication/Mail-notification.svg-->
                                 <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                       <rect x="0" y="0" width="24" height="24" />
                                       <path d="M21,12.0829584 C20.6747915,12.0283988 20.3407122,12 20,12 C16.6862915,12 14,14.6862915 14,18 C14,18.3407122 14.0283988,18.6747915 14.0829584,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,8 C3,6.8954305 3.8954305,6 5,6 L19,6 C20.1045695,6 21,6.8954305 21,8 L21,12.0829584 Z M18.1444251,7.83964668 L12,11.1481833 L5.85557487,7.83964668 C5.4908718,7.6432681 5.03602525,7.77972206 4.83964668,8.14442513 C4.6432681,8.5091282 4.77972206,8.96397475 5.14442513,9.16035332 L11.6444251,12.6603533 C11.8664074,12.7798822 12.1335926,12.7798822 12.3555749,12.6603533 L18.8555749,9.16035332 C19.2202779,8.96397475 19.3567319,8.5091282 19.1603533,8.14442513 C18.9639747,7.77972206 18.5091282,7.6432681 18.1444251,7.83964668 Z" fill="#000000" />
                                       <circle fill="#000000" opacity="0.3" cx="19.5" cy="17.5" r="2.5" />
                                    </g>
                                 </svg>
                                 <!--end::Svg Icon-->
                              </span>
                           </span>
                           <span class="navi-text text-muted text-hover-primary">{{Auth::user()->email}}</span>
                        </span>
                     </a>
                     <a href="{{route('logout')}}" class="btn btn-sm btn-light-primary font-weight-bolder py-2 px-5">Sign Out</a>
                  </div>
               </div>
            </div>
            <!--end::Header-->
            <!--begin::Separator-->
            <div class="separator separator-dashed mt-8 mb-5"></div>
            <!--end::Separator-->
            <!--begin::Nav-->
            <!--end::Nav-->
            <!--begin::Separator-->
            <div class="separator separator-dashed my-7"></div>
            <!--end::Separator-->
         </div>
         <!--end::Content-->
      </div>
      <!-- end::User Panel-->
      <!--begin::Scrolltop-->
      <div id="kt_scrolltop" class="scrolltop">
         <span class="svg-icon">
            <!--begin::Svg Icon | path:assets/media/svg/icons/Navigation/Up-2.svg-->
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
               <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <polygon points="0 0 24 0 24 24 0 24" />
                  <rect fill="#000000" opacity="0.3" x="11" y="10" width="2" height="10" rx="1" />
                  <path d="M6.70710678,12.7071068 C6.31658249,13.0976311 5.68341751,13.0976311 5.29289322,12.7071068 C4.90236893,12.3165825 4.90236893,11.6834175 5.29289322,11.2928932 L11.2928932,5.29289322 C11.6714722,4.91431428 12.2810586,4.90106866 12.6757246,5.26284586 L18.6757246,10.7628459 C19.0828436,11.1360383 19.1103465,11.7686056 18.7371541,12.1757246 C18.3639617,12.5828436 17.7313944,12.6103465 17.3242754,12.2371541 L12.0300757,7.38413782 L6.70710678,12.7071068 Z" fill="#000000" fill-rule="nonzero" />
               </g>
            </svg>
            <!--end::Svg Icon-->
         </span>
      </div>
      <!--end::Scrolltop-->
      <!--begin::Global Theme Bundle(used by all pages)-->
      <script>
         const bir_pdf = "{{ asset('/assets/BIR_2307.pdf')}}"
      </script>
      <script src="{{mix('/js/app.js')}}" ></script>
      <script src="{{ asset('/js/globals/plugins.bundle.js')}}" ></script>
      <script src="{{ asset('/js/globals/prismjs.bundle.js')}}" ></script>
      <script src="{{ asset('/js/globals/scripts.bundle.min.js')}}" ></script>
      <!--end::Global Theme Bundle-->
      @once
        @stack('scripts')
      @endonce
   </body>
</html>

