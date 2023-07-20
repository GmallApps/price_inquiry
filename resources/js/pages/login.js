"use strict";
import axios from 'axios';
var KTLogin = function() {
    var _login;

    var _showForm = function(form) {
        var cls = 'login-' + form + '-on';
        var form = 'kt_login_' + form + '_form';

        _login.removeClass('login-forgot-on');
        _login.removeClass('login-signin-on');
        _login.removeClass('login-signup-on');

        _login.addClass(cls);

        KTUtil.animateClass(KTUtil.getById(form), 'animate__animated animate__backInUp');
    }

    var _handleSignInForm = function() {
        var validation;

        validation = FormValidation.formValidation(
			KTUtil.getById('kt_login_signin_form'),
			{
				fields: {
					email: {
						validators: {
							notEmpty: {
								message: 'Email is required'
							},
                            emailAddress:{
                                message:'Invalid Email Address'
                            }
						}
					},
					password: {
						validators: {
							notEmpty: {
								message: 'Password is required'
							}
						}
					}
				},
				plugins: {
                    trigger: new FormValidation.plugins.Trigger({
                        delay:{
                            email:1
                        }
                    }),
                    submitButton: new FormValidation.plugins.SubmitButton(),
					bootstrap: new FormValidation.plugins.Bootstrap()
				}
			}
		);

        $('#password').on('keypress' , (e)=>{
                if(e.which == 13 && !e.shiftKey)
                    $('#kt_login_signin_submit').click();
        });

        $('#kt_login_signin_submit').on('click', function (e) {
            e.preventDefault();
            validation.validate().then(function(status) {
		        if (status == 'Valid') {
                    $('#kt_login_signin_submit').attr('disabled',true).html('Validating...');
                    const form_data = new FormData($('#kt_login_signin_form')[0])
                    axios({
                        url:'/login',
                        method:'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data:form_data
                    }).then((response) => {
                            if(response.data.success){
                                window.location.href = "/dashboard";
                            }
                    }).catch((err)=>{
                        $('.is-valid').addClass('is-invalid').removeClass('is-valid')
                        $($('#email').next()[0]).empty()
                        $($('#password').next()[0]).empty()
                        $('#kt_login_signin_submit').attr('disabled',false).html('Sign In');
                        if(err.response.status === 404){
                            $($('#email').next()[0]).append(`<div data-field="email" data-validator="notEmpty" class="fv-help-block">Invalid Email</div>`)
                            $($('#password').next()[0]).append(`<div data-field="password" data-validator="notEmpty" class="fv-help-block">Invalid Password</div>`)
                            $('#email').focus()
                        }else if(err.response.status === 429){
                            let headers = err.response.headers
                            $('#email,#password,#kt_login_signin_submit').attr('disabled',true);
                            if(headers['x-ratelimit-remaining'] == 0){
                                        $($('#kt_login_signin_submit').parent()[0]).prepend(`<div class="fv-plugins-message-container" id="attempts-error"><div data-field="password" data-validator="notEmpty" class="fv-help-block">Too Many Attempts. Please try again after <span id="counter"></span> second/s</div> </div>`)
                                        countdown(headers['retry-after']);
                                }
                        }


                    });
				} else {
                    if( !(((window.innerWidth > 0) ? window.innerWidth : screen.width) < 992))
                    KTUtil.scrollTop();
				}
		    });
        });

        $('#kt_login_forgot').on('click', function (e) {
            e.preventDefault();
            _showForm('forgot');
        });

        $('#kt_login_signup').on('click', function (e) {
            e.preventDefault();
            _showForm('signup');
        });
    }


    var _handleForgotForm = function(e) {
        var validation;

        validation = FormValidation.formValidation(
			KTUtil.getById('kt_login_forgot_form'),
			{
				fields: {
					email: {
						validators: {
							notEmpty: {
								message: 'Email address is required'
							},
                            emailAddress: {
								message: 'Invalid email format'
							}
						}
					}
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger({
                        delay:{
                            email:1
                        }
                    }),
					bootstrap: new FormValidation.plugins.Bootstrap()
				}
			}
		);

        $('#kt_login_forgot_submit').on('click', function (e) {
            e.preventDefault();

            validation.validate().then(function(status) {
		        if (status == 'Valid') {
                    KTUtil.scrollTop();
				} else {
				}
		    });
        });

        $('#kt_login_forgot_cancel').on('click', function (e) {
            e.preventDefault();

            _showForm('signin');
        });
    }


    var countdown = function(timer){
        var seconds = parseInt(timer);
        function tick() {
          var counter = document.getElementById("counter");
          seconds--;
          counter.innerHTML = String(seconds);
          if (seconds > 0) {
            setTimeout(tick, 1000);
          } else {
            $('#attempts-error').remove();
            $('#email,#password,#kt_login_signin_submit').attr('disabled',false);
          }
        }
        tick();
      }

    return {

        init: function() {
            _login = $('#kt_login');

            _handleSignInForm();
            _handleForgotForm();
        }
    };
}();

var PriceInquiryBgColor = function() {
    axios.get(`/bg_color/`)
    .then((response) => {
        let data  = response.data
       console.log(data.code);
       $('.bg_gmall').css('background-color', data.code);
    })
    .catch((err) =>{
        console.log(err)
    })
}();

var PriceInquiryLogo = function() {
    axios.get(`/inquiry_logo/`)
    .then((response) => {
        let data  = response.data

        const logo_id = data.id

        const imagePath = `assets/logo_files/admin/${logo_id}.png`

        $('#login_logo').html(`<img class="max-w-250px" src="${imagePath}" alt="Logo" />`)
    })
    .catch((err) =>{
        console.log(err)
    })
}();

jQuery(document).ready(function() {
    KTLogin.init();
    PriceInquiryBgColor.init();
    PriceInquiryLogo.init();
});
