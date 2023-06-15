"use strict";var KTApp=function(){/** @type {object} colors State colors **/
    var settings = {};

    var initTooltip = function(el) {
        var theme = el.data('theme') ? 'tooltip-' + el.data('theme') : '';
        var width = el.data('width') == 'auto' ? 'tooltop-auto-width' : '';
        var trigger = el.data('trigger') ? el.data('trigger') : 'hover';

        $(el).tooltip({
            trigger: trigger,
            template: '<div class="tooltip ' + theme + ' ' + width + '" role="tooltip">\
                <div class="arrow"></div>\
                <div class="tooltip-inner"></div>\
            </div>'
        });
    }

    var initTooltips = function() {
        // init bootstrap tooltips
        $('[data-toggle="tooltip"]').each(function() {
            initTooltip($(this));
        });
    }

    var initPopover = function(el) {
        var skin = el.data('skin') ? 'popover-' + el.data('skin') : '';
        var triggerValue = el.data('trigger') ? el.data('trigger') : 'hover';

        el.popover({
            trigger: triggerValue,
            template: '\
            <div class="popover ' + skin + '" role="tooltip">\
                <div class="arrow"></div>\
                <h3 class="popover-header"></h3>\
                <div class="popover-body"></div>\
            </div>'
        });
    }

    var initPopovers = function() {
        // init bootstrap popover
        $('[data-toggle="popover"]').each(function() {
            initPopover($(this));
        });
    }

    var initFileInput = function() {
        // init bootstrap popover
        $('.custom-file-input').on('change', function() {
            var fileName = $(this).val();
            $(this).next('.custom-file-label').addClass("selected").html(fileName);
        });
    }

    var initScroll = function() {
        $('[data-scroll="true"]').each(function() {
            var el = $(this);

            KTUtil.scrollInit(this, {
                mobileNativeScroll: true,
                handleWindowResize: true,
                rememberPosition: (el.data('remember-position') == 'true' ? true : false),
                height: function() {
                    if (KTUtil.isBreakpointDown('lg') && el.data('mobile-height')) {
                        return el.data('mobile-height');
                    } else {
                        return el.data('height');
                    }
                }
            });
        });
    }

    var initAlerts = function() {
        // init bootstrap popover
        $('body').on('click', '[data-close=alert]', function() {
            $(this).closest('.alert').hide();
        });
    }

    var initCard = function(el, options) {
        // init card tools
        var el = $(el);
        var card = new KTCard(el[0], options);
    }

    var initCards = function() {
        // init card tools
        $('[data-card="true"]').each(function() {
            var el = $(this);
            var options = {};

            if (el.data('data-card-initialized') !== true) {
                initCard(el, options);
                el.data('data-card-initialized', true);
            }
        });
    }

    var initStickyCard = function() {
        if (typeof Sticky === 'undefined') {
            return;
        }

        var sticky = new Sticky('[data-sticky="true"]');
    }

    var initAbsoluteDropdown = function(context) {
        var dropdownMenu;

        if (!context) {
            return;
        }

        $('body').on('show.bs.dropdown', context, function(e) {
        	dropdownMenu = $(e.target).find('.dropdown-menu');
        	$('body').append(dropdownMenu.detach());
        	dropdownMenu.css('display', 'block');
        	dropdownMenu.position({
        		'my': 'right top',
        		'at': 'right bottom',
        		'of': $(e.relatedTarget),
        	});
        }).on('hide.bs.dropdown', context, function(e) {
        	$(e.target).append(dropdownMenu.detach());
        	dropdownMenu.hide();
        });
    }

    var initAbsoluteDropdowns = function() {
        $('body').on('show.bs.dropdown', function(e) {
            // e.target is always parent (contains toggler and menu)
            var $toggler = $(e.target).find("[data-attach='body']");
            if ($toggler.length === 0) {
                return;
            }
            var $dropdownMenu = $(e.target).find('.dropdown-menu');
            // save detached menu
            var $detachedDropdownMenu = $dropdownMenu.detach();
            // save reference to detached menu inside data of toggler
            $toggler.data('dropdown-menu', $detachedDropdownMenu);

            $('body').append($detachedDropdownMenu);
            $detachedDropdownMenu.css('display', 'block');
            $detachedDropdownMenu.position({
                my: 'right top',
                at: 'right bottom',
                of: $(e.relatedTarget),
            });
        });

        $('body').on('hide.bs.dropdown', function(e) {
            var $toggler = $(e.target).find("[data-attach='body']");
            if ($toggler.length === 0) {
                return;
            }
            // access to reference of detached menu from data of toggler
            var $detachedDropdownMenu = $toggler.data('dropdown-menu');
            // re-append detached menu inside parent
            $(e.target).append($detachedDropdownMenu.detach());
            // hide dropdown
            $detachedDropdownMenu.hide();
        });
    };

    return {
        init: function(settingsArray) {
            if (settingsArray) {
                settings = settingsArray;
            }

            KTApp.initComponents();
        },

        initComponents: function() {
            initScroll();
            initTooltips();
            initPopovers();
            initAlerts();
            initFileInput();
            initCards();
            initStickyCard();
            initAbsoluteDropdowns();
        },

        initTooltips: function() {
            initTooltips();
        },

        initTooltip: function(el) {
            initTooltip(el);
        },

        initPopovers: function() {
            initPopovers();
        },

        initPopover: function(el) {
            initPopover(el);
        },

        initCard: function(el, options) {
            initCard(el, options);
        },

        initCards: function() {
            initCards();
        },

        initSticky: function() {
            initSticky();
        },

        initAbsoluteDropdown: function(context) {
            initAbsoluteDropdown(context);
        },

        block: function(target, options) {
            var el = $(target);

            options = $.extend(true, {
                opacity: 0.05,
                overlayColor: '#000000',
                type: '',
                size: '',
                state: 'primary',
                centerX: true,
                centerY: true,
                message: '',
                shadow: true,
                width: 'auto'
            }, options);

            var html;
            var version = options.type ? 'spinner-' + options.type : '';
            var state = options.state ? 'spinner-' + options.state : '';
            var size = options.size ? 'spinner-' + options.size : '';
            var spinner = '<span class="spinner ' + version + ' ' + state + ' ' + size + '"></span';

            if (options.message && options.message.length > 0) {
                var classes = 'blockui ' + (options.shadow === false ? 'blockui' : '');

                html = '<div class="' + classes + '"><span>' + options.message + '</span>' + spinner + '</div>';

                var el = document.createElement('div');

                $('body').prepend(el);
                KTUtil.addClass(el, classes);
                el.innerHTML = html;
                options.width = KTUtil.actualWidth(el) + 10;
                KTUtil.remove(el);

                if (target == 'body') {
                    html = '<div class="' + classes + '" style="margin-left:-' + (options.width / 2) + 'px;"><span>' + options.message + '</span><span>' + spinner + '</span></div>';
                }
            } else {
                html = spinner;
            }

            var params = {
                message: html,
                centerY: options.centerY,
                centerX: options.centerX,
                css: {
                    top: '30%',
                    left: '50%',
                    border: '0',
                    padding: '0',
                    backgroundColor: 'none',
                    width: options.width
                },
                overlayCSS: {
                    backgroundColor: options.overlayColor,
                    opacity: options.opacity,
                    cursor: 'wait',
                    zIndex: (target == 'body' ? 1100 : 10)
                },
                onUnblock: function() {
                    if (el && el[0]) {
                        KTUtil.css(el[0], 'position', '');
                        KTUtil.css(el[0], 'zoom', '');
                    }
                }
            };

            if (target == 'body') {
                params.css.top = '50%';
                $.blockUI(params);
            } else {
                var el = $(target);
                el.block(params);
            }
        },

        unblock: function(target) {
            if (target && target != 'body') {
                $(target).unblock();
            } else {
                $.unblockUI();
            }
        },

        blockPage: function(options) {
            return KTApp.block('body', options);
        },

        unblockPage: function() {
            return KTApp.unblock('body');
        },

        progress: function(target, options) {
            var color = (options && options.color) ? options.color : 'light';
            var alignment = (options && options.alignment) ? options.alignment : 'right';
            var size = (options && options.size) ? ' spinner-' + options.size : '';
            var classes = 'spinner ' + 'spinner-' + skin + ' spinner-' + alignment + size;

            KTApp.unprogress(target);
            KTUtil.attr(target, 'disabled', true);

            $(target).addClass(classes);
            $(target).data('progress-classes', classes);
        },

        unprogress: function(target) {
            $(target).removeClass($(target).data('progress-classes'));
            KTUtil.removeAttr(target, 'disabled');
        },

        getSettings: function() {
            return settings;
        }
    };
}();

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KTApp;
}

// Initialize KTApp class on document ready
$(document).ready(function() {
    KTApp.init(KTAppSettings);
});

"use strict";

// Component Definition
var KTCard = function(elementId, options) {
    // Main object
    var the = this;
    var init = false;

    // Get element object
    var element = KTUtil.getById(elementId);
    var body = KTUtil.getBody();

    if (!element) {
        return;
    }

    // Default options
    var defaultOptions = {
        toggleSpeed: 400,
        sticky: {
            releseOnReverse: false,
            offset: 300,
            zIndex: 101
        }
    };

    ////////////////////////////
    // ** Private Methods  ** //
    ////////////////////////////

    var Plugin = {
        /**
         * Construct
         */

        construct: function(options) {
            if (KTUtil.data(element).has('card')) {
                the = KTUtil.data(element).get('card');
            } else {
                // reset menu
                Plugin.init(options);

                // build menu
                Plugin.build();

                KTUtil.data(element).set('card', the);
            }

            return the;
        },

        /**
         * Init card
         */
        init: function(options) {
            the.element = element;
            the.events = [];

            // merge default and user defined options
            the.options = KTUtil.deepExtend({}, defaultOptions, options);
            the.header = KTUtil.child(element, '.card-header');
            the.footer = KTUtil.child(element, '.card-footer');

            if (KTUtil.child(element, '.card-body')) {
                the.body = KTUtil.child(element, '.card-body');
            } else if (KTUtil.child(element, '.form')) {
                the.body = KTUtil.child(element, '.form');
            }
        },

        /**
         * Build Form Wizard
         */
        build: function() {
            // Remove
            var remove = KTUtil.find(the.header, '[data-card-tool=remove]');
            if (remove) {
                KTUtil.addEvent(remove, 'click', function(e) {
                    e.preventDefault();
                    Plugin.remove();
                });
            }

            // Reload
            var reload = KTUtil.find(the.header, '[data-card-tool=reload]');
            if (reload) {
                KTUtil.addEvent(reload, 'click', function(e) {
                    e.preventDefault();
                    Plugin.reload();
                });
            }

            // Toggle
            var toggle = KTUtil.find(the.header, '[data-card-tool=toggle]');
            if (toggle) {
                KTUtil.addEvent(toggle, 'click', function(e) {
                    e.preventDefault();
                    Plugin.toggle();
                });
            }
        },

        /**
         * Enable stickt mode
         */
        initSticky: function() {
            var lastScrollTop = 0;
            var offset = the.options.sticky.offset;

            if (!the.header) {
                return;
            }

	        window.addEventListener('scroll', Plugin.onScrollSticky);
        },

	    /**
	     * Window scroll handle event for sticky card
	     */
	    onScrollSticky: function(e) {
		    var offset = the.options.sticky.offset;

		    if(isNaN(offset)) return;

		    var st = KTUtil.getScrollTop();

		    if (st >= offset && KTUtil.hasClass(body, 'card-sticky-on') === false) {
			    Plugin.eventTrigger('stickyOn');

			    KTUtil.addClass(body, 'card-sticky-on');

			    Plugin.updateSticky();

		    } else if ((st*1.5) <= offset && KTUtil.hasClass(body, 'card-sticky-on')) {
			    // Back scroll mode
			    Plugin.eventTrigger('stickyOff');

			    KTUtil.removeClass(body, 'card-sticky-on');

			    Plugin.resetSticky();
		    }
	    },

        updateSticky: function() {
            if (!the.header) {
                return;
            }

            var top;

            if (KTUtil.hasClass(body, 'card-sticky-on')) {
                if (the.options.sticky.position.top instanceof Function) {
                    top = parseInt(the.options.sticky.position.top.call(this, the));
                } else {
                    top = parseInt(the.options.sticky.position.top);
                }

                var left;
                if (the.options.sticky.position.left instanceof Function) {
                    left = parseInt(the.options.sticky.position.left.call(this, the));
                } else {
                    left = parseInt(the.options.sticky.position.left);
                }

                var right;
                if (the.options.sticky.position.right instanceof Function) {
                    right = parseInt(the.options.sticky.position.right.call(this, the));
                } else {
                    right = parseInt(the.options.sticky.position.right);
                }

                KTUtil.css(the.header, 'z-index', the.options.sticky.zIndex);
                KTUtil.css(the.header, 'top', top + 'px');
                KTUtil.css(the.header, 'left', left + 'px');
                KTUtil.css(the.header, 'right', right + 'px');
            }
        },

        resetSticky: function() {
            if (!the.header) {
                return;
            }

            if (KTUtil.hasClass(body, 'card-sticky-on') === false) {
                KTUtil.css(the.header, 'z-index', '');
                KTUtil.css(the.header, 'top', '');
                KTUtil.css(the.header, 'left', '');
                KTUtil.css(the.header, 'right', '');
            }
        },

        /**
         * Remove card
         */
        remove: function() {
            if (Plugin.eventTrigger('beforeRemove') === false) {
                return;
            }

            KTUtil.remove(element);

            Plugin.eventTrigger('afterRemove');
        },

        /**
         * Set content
         */
        setContent: function(html) {
            if (html) {
                the.body.innerHTML = html;
            }
        },

        /**
         * Get body
         */
        getBody: function() {
            return the.body;
        },

        /**
         * Get self
         */
        getSelf: function() {
            return element;
        },

        /**
         * Reload
         */
        reload: function() {
            Plugin.eventTrigger('reload');
        },

        /**
         * Toggle
         */
        toggle: function() {
            if (KTUtil.hasClass(element, 'card-collapse') || KTUtil.hasClass(element, 'card-collapsed')) {
                Plugin.expand();
            } else {
                Plugin.collapse();
            }
        },

        /**
         * Collapse
         */
        collapse: function() {
            if (Plugin.eventTrigger('beforeCollapse') === false) {
                return;
            }

            KTUtil.slideUp(the.body, the.options.toggleSpeed, function() {
                Plugin.eventTrigger('afterCollapse');
            });

            KTUtil.addClass(element, 'card-collapse');
        },

        /**
         * Expand
         */
        expand: function() {
            if (Plugin.eventTrigger('beforeExpand') === false) {
                return;
            }

            KTUtil.slideDown(the.body, the.options.toggleSpeed, function() {
                Plugin.eventTrigger('afterExpand');
            });

            KTUtil.removeClass(element, 'card-collapse');
            KTUtil.removeClass(element, 'card-collapsed');
        },

        /**
         * Trigger events
         */
        eventTrigger: function(name) {
            //KTUtil.triggerCustomEvent(name);
            for (var i = 0; i < the.events.length; i++) {
                var event = the.events[i];
                if (event.name == name) {
                    if (event.one == true) {
                        if (event.fired == false) {
                            the.events[i].fired = true;
                            return event.handler.call(this, the);
                        }
                    } else {
                        return event.handler.call(this, the);
                    }
                }
            }
        },

        addEvent: function(name, handler, one) {
            the.events.push({
                name: name,
                handler: handler,
                one: one,
                fired: false
            });

            return the;
        }
    };

    //////////////////////////
    // ** Public Methods ** //
    //////////////////////////

    /**
     * Set default options
     */

    the.setDefaults = function(options) {
        defaultOptions = options;
    };

    /**
     * Remove card
     */
    the.remove = function() {
        return Plugin.remove(html);
    };

    /**
     * Init sticky card
     */
    the.initSticky = function() {
        return Plugin.initSticky();
    };

    /**
     * Rerender sticky layout
     */
    the.updateSticky = function() {
        return Plugin.updateSticky();
    };

    /**
     * Reset the sticky
     */
    the.resetSticky = function() {
        return Plugin.resetSticky();
    };

	/**
	 * Destroy sticky card
	 */
	the.destroySticky = function() {
		Plugin.resetSticky();
		window.removeEventListener('scroll', Plugin.onScrollSticky);
	};

    /**
     * Reload card
     */
    the.reload = function() {
        return Plugin.reload();
    };

    /**
     * Set card content
     */
    the.setContent = function(html) {
        return Plugin.setContent(html);
    };

    /**
     * Toggle card
     */
    the.toggle = function() {
        return Plugin.toggle();
    };

    /**
     * Collapse card
     */
    the.collapse = function() {
        return Plugin.collapse();
    };

    /**
     * Expand card
     */
    the.expand = function() {
        return Plugin.expand();
    };

    /**
     * Get cardbody
     * @returns {jQuery}
     */
    the.getBody = function() {
        return Plugin.getBody();
    };

    /**
     * Get cardbody
     * @returns {jQuery}
     */
    the.getSelf = function() {
        return Plugin.getSelf();
    };

    /**
     * Attach event
     */
    the.on = function(name, handler) {
        return Plugin.addEvent(name, handler);
    };

    /**
     * Attach event that will be fired once
     */
    the.one = function(name, handler) {
        return Plugin.addEvent(name, handler, true);
    };

    // Construct plugin
    Plugin.construct.apply(the, [options]);

    return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KTCard;
}

"use strict";
// DOCS: https://javascript.info/cookie

// Component Definition
var KTCookie = function() {
  return {
    // returns the cookie with the given name,
    // or undefined if not found
    getCookie: function(name) {
      var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    },
    // Please note that a cookie value is encoded,
    // so getCookie uses a built-in decodeURIComponent function to decode it.
    setCookie: function(name, value, options) {
      if (!options) {
        options = {};
      }

      options = Object.assign({}, {path: '/'}, options);

      if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
      }

      var updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

      for (var optionKey in options) {
        if (!options.hasOwnProperty(optionKey)) {
          continue;
        }
        updatedCookie += "; " + optionKey;
        var optionValue = options[optionKey];
        if (optionValue !== true) {
          updatedCookie += "=" + optionValue;
        }
      }

      document.cookie = updatedCookie;
    },
    // To delete a cookie, we can call it with a negative expiration date:
    deleteCookie: function(name) {
      setCookie(name, "", {
        'max-age': -1
      })
    }
  }
}();

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = KTCookie;
}

"use strict";

// Component Definition
var KTDialog = function(options) {
    // Main object
    var the = this;

    // Get element object
    var element;
    var body = KTUtil.getBody();

    // Default options
    var defaultOptions = {
        'placement' : 'top center',
        'type'  : 'loader',
        'width' : 100,
        'state' : 'default',
        'message' : 'Loading...'
    };

    ////////////////////////////
    // ** Private Methods  ** //
    ////////////////////////////

    var Plugin = {
        /**
         * Construct
         */

        construct: function(options) {
            Plugin.init(options);

            return the;
        },

        /**
         * Handles subtoggle click toggle
         */
        init: function(options) {
            the.events = [];

            // merge default and user defined options
            the.options = KTUtil.deepExtend({}, defaultOptions, options);

            the.state = false;
        },

        /**
         * Show dialog
         */
        show: function() {
            Plugin.eventTrigger('show');

            element = document.createElement("DIV");
            KTUtil.setHTML(element, the.options.message);

            KTUtil.addClass(element, 'dialog dialog-shown');
            KTUtil.addClass(element, 'dialog-' + the.options.state);
            KTUtil.addClass(element, 'dialog-' + the.options.type);

            if (the.options.placement == 'top center') {
                KTUtil.addClass(element, 'dialog-top-center');
            }

            body.appendChild(element);

            the.state = 'shown';

            Plugin.eventTrigger('shown');

            return the;
        },

        /**
         * Hide dialog
         */
        hide: function() {
            if (element) {
                Plugin.eventTrigger('hide');

                element.remove();
                the.state = 'hidden';

                Plugin.eventTrigger('hidden');
            }

            return the;
        },

        /**
         * Trigger events
         */
        eventTrigger: function(name) {
            for (var i = 0; i < the.events.length; i++) {
                var event = the.events[i];

                if (event.name == name) {
                    if (event.one == true) {
                        if (event.fired == false) {
                            the.events[i].fired = true;
                            return event.handler.call(this, the);
                        }
                    } else {
                        return event.handler.call(this, the);
                    }
                }
            }
        },

        addEvent: function(name, handler, one) {
            the.events.push({
                name: name,
                handler: handler,
                one: one,
                fired: false
            });

            return the;
        }
    };

    //////////////////////////
    // ** Public Methods ** //
    //////////////////////////

    /**
     * Set default options
     */

    the.setDefaults = function(options) {
        defaultOptions = options;
    };

    /**
     * Check shown state
     */
    the.shown = function() {
        return the.state == 'shown';
    };

    /**
     * Check hidden state
     */
    the.hidden = function() {
        return the.state == 'hidden';
    };

    /**
     * Show dialog
     */
    the.show = function() {
        return Plugin.show();
    };

    /**
     * Hide dialog
     */
    the.hide = function() {
        return Plugin.hide();
    };

    /**
     * Attach event
     * @returns {KTToggle}
     */
    the.on = function(name, handler) {
        return Plugin.addEvent(name, handler);
    };

    /**
     * Attach event that will be fired once
     * @returns {KTToggle}
     */
    the.one = function(name, handler) {
        return Plugin.addEvent(name, handler, true);
    };

    // Construct plugin
    Plugin.construct.apply(the, [options]);

    return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KTDialog;
}

"use strict";

// Component Definition
var KTHeader = function(elementId, options) {
    // Main object
    var the = this;
    var init = false;

    // Get element object
    var element = KTUtil.getById(elementId);
    var body = KTUtil.getBody();

    if (element === undefined) {
        return;
    }

    // Default options
    var defaultOptions = {
        offset: {
            desktop: true,
            tabletAndMobile: true
        },
        releseOnReverse: {
            desktop: false,
            tabletAndMobile: false
        }
    };

    ////////////////////////////
    // ** Private Methods  ** //
    ////////////////////////////

    var Plugin = {
        /**
         * Run plugin
         * @returns {KTHeader}
         */
        construct: function(options) {
            if (KTUtil.data(element).has('header')) {
                the = KTUtil.data(element).get('header');
            } else {
                // reset header
                Plugin.init(options);

                // build header
                Plugin.build();

                KTUtil.data(element).set('header', the);
            }

            return the;
        },

        /**
         * Handles subheader click toggle
         * @returns {KTHeader}
         */
        init: function(options) {
            the.events = [];

            // merge default and user defined options
            the.options = KTUtil.deepExtend({}, defaultOptions, options);
        },

        /**
         * Reset header
         * @returns {KTHeader}
         */
        build: function() {
            var eventTriggerState = true;
            var lastScrollTop = 0;

            window.addEventListener('scroll', function() {
                var offset = 0, st, attrName;

                if (KTUtil.isBreakpointDown('lg') && the.options.offset.tabletAndMobile === false) {
                    return;
                }

                if (KTUtil.isBreakpointUp('lg') && the.options.offset.desktop === false) {
                    return;
                }

                if (KTUtil.isBreakpointUp('lg')) {
                    offset = the.options.offset.desktop;
                } else if (KTUtil.isBreakpointDown('lg')) {
                    offset = the.options.offset.tabletAndMobile;
                }

                st = KTUtil.getScrollTop();

                if (
                    (KTUtil.isBreakpointDown('lg') && the.options.releseOnReverse.tabletAndMobile) ||
                    (KTUtil.isBreakpointUp('lg') && the.options.releseOnReverse.desktop)
                ) {
                    if (st > offset && lastScrollTop < st) { // down scroll mode
                        if (body.hasAttribute('data-header-scroll') === false) {
                            body.setAttribute('data-header-scroll', 'on');
                        }

                        if (eventTriggerState) {
                            Plugin.eventTrigger('scrollOn', the);
                            eventTriggerState = false;
                        }
                    } else { // back scroll mode
                        if (body.hasAttribute('data-header-scroll') === true) {
                            body.removeAttribute('data-header-scroll');
                        }

                        if (eventTriggerState == false) {
                            Plugin.eventTrigger('scrollOff', the);
                            eventTriggerState = true;
                        }
                    }

                    lastScrollTop = st;
                } else {
                    if (st > offset) { // down scroll mode
                        if (body.hasAttribute('data-header-scroll') === false) {
                            body.setAttribute('data-header-scroll', 'on');
                        }

                        if (eventTriggerState) {
                            Plugin.eventTrigger('scrollOn', the);
                            eventTriggerState = false;
                        }
                    } else { // back scroll mode
                        if (body.hasAttribute('data-header-scroll') === true) {
                            body.removeAttribute('data-header-scroll');
                        }

                        if (eventTriggerState == false) {
                            Plugin.eventTrigger('scrollOff', the);
                            eventTriggerState = true;
                        }
                    }
                }
            });
        },

        /**
         * Trigger events
         */
        eventTrigger: function(name, args) {
            for (var i = 0; i < the.events.length; i++) {
                var event = the.events[i];
                if (event.name == name) {
                    if (event.one == true) {
                        if (event.fired == false) {
                            the.events[i].fired = true;
                            return event.handler.call(this, the, args);
                        }
                    } else {
                        return event.handler.call(this, the, args);
                    }
                }
            }
        },

        addEvent: function(name, handler, one) {
            the.events.push({
                name: name,
                handler: handler,
                one: one,
                fired: false
            });
        }
    };

    //////////////////////////
    // ** Public Methods ** //
    //////////////////////////

    /**
     * Set default options
     */

    the.setDefaults = function(options) {
        defaultOptions = options;
    };

    /**
     * Register event
     */
    the.on = function(name, handler) {
        return Plugin.addEvent(name, handler);
    };

    ///////////////////////////////
    // ** Plugin Construction ** //
    ///////////////////////////////

    // Run plugin
    Plugin.construct.apply(the, [options]);

    // Init done
    init = true;

    // Return plugin instance
    return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KTHeader;
}

"use strict";

// Component Definition
var KTImageInput = function(elementId, options) {
    // Main object
    var the = this;
    var init = false;

    // Get element object
    var element = KTUtil.getById(elementId);
    var body = KTUtil.getBody();

    if (!element) {
        return;
    }

    // Default options
    var defaultOptions = {
        editMode: false
    };

    ////////////////////////////
    // ** Private Methods  ** //
    ////////////////////////////

    var Plugin = {
        /**
         * Construct
         */

        construct: function(options) {
            if (KTUtil.data(element).has('imageinput')) {
                the = KTUtil.data(element).get('imageinput');
            } else {
                // reset menu
                Plugin.init(options);

                // build menu
                Plugin.build();

                KTUtil.data(element).set('imageinput', the);
            }

            return the;
        },

        /**
         * Init avatar
         */
        init: function(options) {
            the.element = element;
            the.events = [];

            the.input = KTUtil.find(element, 'input[type="file"]');
            the.wrapper = KTUtil.find(element, '.image-input-wrapper');
            the.cancel = KTUtil.find(element, '[data-action="cancel"]');
            the.remove = KTUtil.find(element, '[data-action="remove"]');
            the.src = KTUtil.css(the.wrapper, 'backgroundImage');
            the.hidden = KTUtil.find(element, 'input[type="hidden"]');

            // merge default and user defined options
            the.options = KTUtil.deepExtend({}, defaultOptions, options);
        },

        /**
         * Build
         */
        build: function() {
            // Handle change
            KTUtil.addEvent(the.input, 'change', function(e) {
                e.preventDefault();

	            if (the.input && the.input.files && the.input.files[0]) {
	                var reader = new FileReader();
	                reader.onload = function(e) {
	                    KTUtil.css(the.wrapper, 'background-image', 'url('+e.target.result +')');
	                }
	                reader.readAsDataURL(the.input.files[0]);

	                KTUtil.addClass(the.element, 'image-input-changed');
                    KTUtil.removeClass(the.element, 'image-input-empty');

                    // Fire change event
                    Plugin.eventTrigger('change');
	            }
            });

            // Handle cancel
            KTUtil.addEvent(the.cancel, 'click', function(e) {
                e.preventDefault();

                // Fire cancel event
                Plugin.eventTrigger('cancel');

	            KTUtil.removeClass(the.element, 'image-input-changed');
                KTUtil.removeClass(the.element, 'image-input-empty');
	            KTUtil.css(the.wrapper, 'background-image', the.src);
	            the.input.value = "";

                if (the.hidden) {
                    the.hidden.value = "0";
                }
            });

            // Handle remove
            KTUtil.addEvent(the.remove, 'click', function(e) {
                e.preventDefault();

                // Fire cancel event
                Plugin.eventTrigger('remove');

	            KTUtil.removeClass(the.element, 'image-input-changed');
                KTUtil.addClass(the.element, 'image-input-empty');
	            KTUtil.css(the.wrapper, 'background-image', "none");
	            the.input.value = "";

                if (the.hidden) {
                    the.hidden.value = "1";
                }
            });
        },

        /**
         * Trigger events
         */
        eventTrigger: function(name) {
            //KTUtil.triggerCustomEvent(name);
            for (var i = 0; i < the.events.length; i++) {
                var event = the.events[i];
                if (event.name == name) {
                    if (event.one == true) {
                        if (event.fired == false) {
                            the.events[i].fired = true;
                            return event.handler.call(this, the);
                        }
                    } else {
                        return event.handler.call(this, the);
                    }
                }
            }
        },

        addEvent: function(name, handler, one) {
            the.events.push({
                name: name,
                handler: handler,
                one: one,
                fired: false
            });

            return the;
        }
    };

    //////////////////////////
    // ** Public Methods ** //
    //////////////////////////

    /**
     * Set default options
     */

    the.setDefaults = function(options) {
        defaultOptions = options;
    };

    /**
     * Attach event
     */
    the.on = function(name, handler) {
        return Plugin.addEvent(name, handler);
    };

    /**
     * Attach event that will be fired once
     */
    the.one = function(name, handler) {
        return Plugin.addEvent(name, handler, true);
    };

    // Construct plugin
    Plugin.construct.apply(the, [options]);

    return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KTImageInput;
}

"use strict";

// Component Definition
var KTMenu = function(elementId, options) {
    // Main object
    var the = this;
    var init = false;

    // Get element object
    var element = KTUtil.getById(elementId);
    var body = KTUtil.getBody();

    if (!element) {
        return;
    }

    // Default options
    var defaultOptions = {
        // scrollable area with Perfect Scroll
        scroll: {
            rememberPosition: false
        },

        // accordion submenu mode
        accordion: {
            slideSpeed: 200, // accordion toggle slide speed in milliseconds
            autoScroll: false, // enable auto scrolling(focus) to the clicked menu item
            autoScrollSpeed: 1200,
            expandAll: true // allow having multiple expanded accordions in the menu
        },

        // dropdown submenu mode
        dropdown: {
            timeout: 500 // timeout in milliseconds to show and hide the hoverable submenu dropdown
        }
    };

    ////////////////////////////
    // ** Private Methods  ** //
    ////////////////////////////

    var Plugin = {
        /**
         * Run plugin
         * @returns {KTMenu}
         */
        construct: function(options) {
            if (KTUtil.data(element).has('menu')) {
                the = KTUtil.data(element).get('menu');
            } else {
                // reset menu
                Plugin.init(options);

                // reset menu
                Plugin.reset();

                // build menu
                Plugin.build();

                KTUtil.data(element).set('menu', the);
            }

            return the;
        },

        /**
         * Handles submenu click toggle
         * @returns {KTMenu}
         */
        init: function(options) {
            the.events = [];

            the.eventHandlers = {};

            // merge default and user defined options
            the.options = KTUtil.deepExtend({}, defaultOptions, options);

            // pause menu
            the.pauseDropdownHoverTime = 0;

            the.uid = KTUtil.getUniqueID();
        },

        update: function(options) {
            // merge default and user defined options
            the.options = KTUtil.deepExtend({}, defaultOptions, options);

            // pause menu
            the.pauseDropdownHoverTime = 0;

             // reset menu
            Plugin.reset();

            the.eventHandlers = {};

            // build menu
            Plugin.build();

            KTUtil.data(element).set('menu', the);
        },

        reload: function() {
             // reset menu
            Plugin.reset();

            // build menu
            Plugin.build();

            // reset submenu props
            Plugin.resetSubmenuProps();
        },

        /**
         * Reset menu
         * @returns {KTMenu}
         */
        build: function() {
            // General accordion submenu toggle
            the.eventHandlers['event_1'] = KTUtil.on( element, '.menu-toggle', 'click', Plugin.handleSubmenuAccordion);

            // Dropdown mode(hoverable)
            if (Plugin.getSubmenuMode() === 'dropdown' || Plugin.isConditionalSubmenuDropdown()) {
                // dropdown submenu - hover toggle
                the.eventHandlers['event_2'] = KTUtil.on( element, '[data-menu-toggle="hover"]', 'mouseover', Plugin.handleSubmenuDrodownHoverEnter);
                the.eventHandlers['event_3'] = KTUtil.on( element, '[data-menu-toggle="hover"]', 'mouseout', Plugin.handleSubmenuDrodownHoverExit);

                // dropdown submenu - click toggle
                the.eventHandlers['event_4'] = KTUtil.on( element, '[data-menu-toggle="click"] > .menu-toggle, [data-menu-toggle="click"] > .menu-link .menu-toggle', 'click', Plugin.handleSubmenuDropdownClick);
                the.eventHandlers['event_5'] = KTUtil.on( element, '[data-menu-toggle="tab"] > .menu-toggle, [data-menu-toggle="tab"] > .menu-link .menu-toggle', 'click', Plugin.handleSubmenuDropdownTabClick);
            }

            // Handle general link click
            the.eventHandlers['event_6'] = KTUtil.on(element, '.menu-item > .menu-link:not(.menu-toggle):not(.menu-link-toggle-skip)', 'click', Plugin.handleLinkClick);

            // Init scrollable menu
            if (the.options.scroll && the.options.scroll.height) {
                Plugin.scrollInit();
            }
        },

        /**
         * Reset menu
         * @returns {KTMenu}
         */
        reset: function() {
            KTUtil.off( element, 'click', the.eventHandlers['event_1']);

            // dropdown submenu - hover toggle
            KTUtil.off( element, 'mouseover', the.eventHandlers['event_2']);
            KTUtil.off( element, 'mouseout', the.eventHandlers['event_3']);

            // dropdown submenu - click toggle
            KTUtil.off( element, 'click', the.eventHandlers['event_4']);
            KTUtil.off( element, 'click', the.eventHandlers['event_5']);

            // handle link click
            KTUtil.off(element, 'click', the.eventHandlers['event_6']);
        },

        /**
         * Init scroll menu
         *
        */
        scrollInit: function() {
            if ( the.options.scroll && the.options.scroll.height ) {
                KTUtil.scrollDestroy(element, true);
                KTUtil.scrollInit(element, {mobileNativeScroll: true, windowScroll: false, resetHeightOnDestroy: true, handleWindowResize: true, height: the.options.scroll.height, rememberPosition: the.options.scroll.rememberPosition});
            } else {
                KTUtil.scrollDestroy(element, true);
            }
        },

        /**
         * Update scroll menu
        */
        scrollUpdate: function() {
            if ( the.options.scroll && the.options.scroll.height ) {
                KTUtil.scrollUpdate(element);
            }
        },

        /**
         * Scroll top
        */
        scrollTop: function() {
            if ( the.options.scroll && the.options.scroll.height ) {
                KTUtil.scrollTop(element);
            }
        },

        /**
         * Get submenu mode for current breakpoint and menu state
         * @returns {KTMenu}
         */
        getSubmenuMode: function(el) {
            if ( KTUtil.isBreakpointUp('lg') ) {
                if (el && KTUtil.hasAttr(el, 'data-menu-toggle') && KTUtil.attr(el, 'data-menu-toggle') == 'hover') {
                    return 'dropdown';
                }

                if ( KTUtil.isset(the.options.submenu, 'desktop.state.body') ) {
                    if ( KTUtil.hasClasses(body, the.options.submenu.desktop.state.body) ) {
                        return the.options.submenu.desktop.state.mode;
                    } else {
                        return the.options.submenu.desktop.default;
                    }
                } else if ( KTUtil.isset(the.options.submenu, 'desktop') ) {
                    return the.options.submenu.desktop;
                }
            } else if ( KTUtil.isBreakpointUp('md') && KTUtil.isBreakpointDown('lg') && KTUtil.isset(the.options.submenu, 'tablet') ) {
                return the.options.submenu.tablet;
            } else if ( KTUtil.isBreakpointDown('md') && KTUtil.isset(the.options.submenu, 'mobile') ) {
                return the.options.submenu.mobile;
            } else {
                return false;
            }
        },

        /**
         * Get submenu mode for current breakpoint and menu state
         * @returns {KTMenu}
         */
        isConditionalSubmenuDropdown: function() {
            if ( KTUtil.isBreakpointUp('lg') && KTUtil.isset(the.options.submenu, 'desktop.state.body') ) {
                return true;
            } else {
                return false;
            }
        },


        /**
         * Reset submenu attributes
         * @returns {KTMenu}
         */
        resetSubmenuProps: function(e) {
            var submenus = KTUtil.findAll(element, '.menu-submenu');
            if ( submenus ) {
                for (var i = 0, len = submenus.length; i < len; i++) {
                    var submenu = submenus[0];

                    KTUtil.css(submenu, 'display', '');
                    KTUtil.css(submenu, 'overflow', '');

                    if (submenu.hasAttribute('data-hor-direction')) {
                        KTUtil.removeClass(submenu, 'menu-submenu-left');
                        KTUtil.removeClass(submenu, 'menu-submenu-right');
                        KTUtil.addClass(submenu, submenu.getAttribute('data-hor-direction'));
                    }
                }
            }
        },

        /**
         * Handles submenu hover toggle
         * @returns {KTMenu}
         */
        handleSubmenuDrodownHoverEnter: function(e) {
            if ( Plugin.getSubmenuMode(this) === 'accordion' ) {
                return;
            }

            if ( the.resumeDropdownHover() === false ) {
                return;
            }

            var item = this;

            if ( item.getAttribute('data-hover') == '1' ) {
                item.removeAttribute('data-hover');
                clearTimeout( item.getAttribute('data-timeout') );
                item.removeAttribute('data-timeout');
            }

            Plugin.showSubmenuDropdown(item);
        },

        /**
         * Handles submenu hover toggle
         * @returns {KTMenu}
         */
        handleSubmenuDrodownHoverExit: function(e) {
            if ( the.resumeDropdownHover() === false ) {
                return;
            }

            if ( Plugin.getSubmenuMode(this) === 'accordion' ) {
                return;
            }

            var item = this;
            var time = the.options.dropdown.timeout;

            var timeout = setTimeout(function() {
                if ( item.getAttribute('data-hover') == '1' ) {
                    Plugin.hideSubmenuDropdown(item, true);
                }
            }, time);

            item.setAttribute('data-hover', '1');
            item.setAttribute('data-timeout', timeout);
        },

        /**
         * Handles submenu click toggle
         * @returns {KTMenu}
         */
        handleSubmenuDropdownClick: function(e) {
            if ( Plugin.getSubmenuMode(this) === 'accordion' ) {
                return;
            }

            var item = this.closest('.menu-item');

            // Trigger click event handlers
            var result = Plugin.eventTrigger('submenuToggle', this, e);
            if (result === false) {
                return;
            }

            if ( item.getAttribute('data-menu-submenu-mode') == 'accordion' ) {
                return;
            }

            if ( KTUtil.hasClass(item, 'menu-item-hover') === false ) {
                KTUtil.addClass(item, 'menu-item-open-dropdown');
                Plugin.showSubmenuDropdown(item);
            } else {
                KTUtil.removeClass(item, 'menu-item-open-dropdown' );
                Plugin.hideSubmenuDropdown(item, true);
            }

            e.preventDefault();
        },

        /**
         * Handles tab click toggle
         * @returns {KTMenu}
         */
        handleSubmenuDropdownTabClick: function(e) {
            if (Plugin.getSubmenuMode(this) === 'accordion') {
                return;
            }
            var item = this.closest('.menu-item');

            // Trigger click event handlers
            var result = Plugin.eventTrigger('submenuToggle', this, e);
            if (result === false) {
                return;
            }

            if (item.getAttribute('data-menu-submenu-mode') == 'accordion') {
                return;
            }

            if (KTUtil.hasClass(item, 'menu-item-hover') == false) {
                KTUtil.addClass(item, 'menu-item-open-dropdown');
                Plugin.showSubmenuDropdown(item);
            }

            e.preventDefault();
        },

        /**
         * Handles link click
         * @returns {KTMenu}
         */
        handleLinkClick: function(e) {
            var submenu = this.closest('.menu-item.menu-item-submenu');

            // Trigger click event handlers
            var result = Plugin.eventTrigger('linkClick', this, e);
            if (result === false) {
                return;
            }

            if ( submenu && Plugin.getSubmenuMode(submenu) === 'dropdown' ) {
                Plugin.hideSubmenuDropdowns();
            }
        },

        /**
         * Handles submenu dropdown close on link click
         * @returns {KTMenu}
         */
        handleSubmenuDropdownClose: function(e, el) {
            // exit if its not submenu dropdown mode
            if (Plugin.getSubmenuMode(el) === 'accordion') {
                return;
            }

            var shown = element.querySelectorAll('.menu-item.menu-item-submenu.menu-item-hover:not(.menu-item-tabs)');

            // check if currently clicked link's parent item ha
            if (shown.length > 0 && KTUtil.hasClass(el, 'menu-toggle') === false && el.querySelectorAll('.menu-toggle').length === 0) {
                // close opened dropdown menus
                for (var i = 0, len = shown.length; i < len; i++) {
                    Plugin.hideSubmenuDropdown(shown[0], true);
                }
            }
        },

        /**
         * helper functions
         * @returns {KTMenu}
         */
        handleSubmenuAccordion: function(e, el) {
            var query;
            var item = el ? el : this;

            // Trigger click event handlers
            var result = Plugin.eventTrigger('submenuToggle', this, e);
            if (result === false) {
                return;
            }

            if ( Plugin.getSubmenuMode(el) === 'dropdown' && (query = item.closest('.menu-item') ) ) {
                if (query.getAttribute('data-menu-submenu-mode') != 'accordion' ) {
                    e.preventDefault();
                    return;
                }
            }

            var li = item.closest('.menu-item');
            var submenu = KTUtil.child(li, '.menu-submenu, .menu-inner');

            if (KTUtil.hasClass(item.closest('.menu-item'), 'menu-item-open-always')) {
                return;
            }

            if ( li && submenu ) {
                e.preventDefault();
                var speed = the.options.accordion.slideSpeed;
                var hasClosables = false;

                if ( KTUtil.hasClass(li, 'menu-item-open') === false ) {
                    // hide other accordions
                    if ( the.options.accordion.expandAll === false ) {
                        var subnav = item.closest('.menu-nav, .menu-subnav');
                        var closables = KTUtil.children(subnav, '.menu-item.menu-item-open.menu-item-submenu:not(.menu-item-here):not(.menu-item-open-always)');

                        if ( subnav && closables ) {
                            for (var i = 0, len = closables.length; i < len; i++) {
                                var el_ = closables[0];
                                var submenu_ = KTUtil.child(el_, '.menu-submenu');
                                if ( submenu_ ) {
                                    KTUtil.slideUp(submenu_, speed, function() {
                                        Plugin.scrollUpdate();
                                        KTUtil.removeClass(el_, 'menu-item-open');
                                    });
                                }
                            }
                        }
                    }

                    KTUtil.slideDown(submenu, speed, function() {
                        Plugin.scrollToItem(item);
                        Plugin.scrollUpdate();

                        Plugin.eventTrigger('submenuToggle', submenu, e);
                    });

                    KTUtil.addClass(li, 'menu-item-open');

                } else {
                    KTUtil.slideUp(submenu, speed, function() {
                        Plugin.scrollToItem(item);
                        Plugin.eventTrigger('submenuToggle', submenu, e);
                    });

                    KTUtil.removeClass(li, 'menu-item-open');
                }
            }
        },

        /**
         * scroll to item function
         * @returns {KTMenu}
         */
        scrollToItem: function(item) {
            // handle auto scroll for accordion submenus
            if ( KTUtil.isBreakpointUp('lg')  && the.options.accordion.autoScroll && element.getAttribute('data-menu-scroll') !== '1' ) {
                KTUtil.scrollTo(item, the.options.accordion.autoScrollSpeed);
            }
        },

        /**
         * Hide submenu dropdown
         * @returns {KTMenu}
         */
        hideSubmenuDropdown: function(item, classAlso) {
            // remove submenu activation class
            if ( classAlso ) {
                KTUtil.removeClass(item, 'menu-item-hover');
                KTUtil.removeClass(item, 'menu-item-active-tab');
            }

            // clear timeout
            item.removeAttribute('data-hover');

            if ( item.getAttribute('data-menu-toggle-class') ) {
                KTUtil.removeClass(body, item.getAttribute('data-menu-toggle-class'));
            }

            var timeout = item.getAttribute('data-timeout');
            item.removeAttribute('data-timeout');
            clearTimeout(timeout);
        },

        /**
         * Hide submenu dropdowns
         * @returns {KTMenu}
         */
        hideSubmenuDropdowns: function() {
            var items;
            if ( items = element.querySelectorAll('.menu-item-submenu.menu-item-hover:not(.menu-item-tabs):not([data-menu-toggle="tab"])') ) {
                for (var j = 0, cnt = items.length; j < cnt; j++) {
                    Plugin.hideSubmenuDropdown(items[j], true);
                }
            }
        },

        /**
         * helper functions
         * @returns {KTMenu}
         */
        showSubmenuDropdown: function(item) {
            // close active submenus
            var list = element.querySelectorAll('.menu-item-submenu.menu-item-hover, .menu-item-submenu.menu-item-active-tab');

            if ( list ) {
                for (var i = 0, len = list.length; i < len; i++) {
                    var el = list[i];
                    if ( item !== el && el.contains(item) === false && item.contains(el) === false ) {
                        Plugin.hideSubmenuDropdown(el, true);
                    }
                }
            }

            // add submenu activation class
            KTUtil.addClass(item, 'menu-item-hover');

            // Change the alignment of submenu is offscreen.
            var submenu = KTUtil.find(item, '.menu-submenu');

            if (submenu && submenu.hasAttribute('data-hor-direction') === false) {
                if (KTUtil.hasClass(submenu, 'menu-submenu-left')) {
                    submenu.setAttribute('data-hor-direction', 'menu-submenu-left');
                } else if (KTUtil.hasClass(submenu, 'menu-submenu-right')) {
                    submenu.setAttribute('data-hor-direction', 'menu-submenu-right');
                }
            }

            if ( submenu && KTUtil.isOffscreen(submenu, 'left', 15) === true ) {
                KTUtil.removeClass(submenu, 'menu-submenu-left');
                KTUtil.addClass(submenu, 'menu-submenu-right');
            } else if ( submenu && KTUtil.isOffscreen(submenu, 'right', 15) === true ) {
                KTUtil.removeClass(submenu, 'menu-submenu-right');
                KTUtil.addClass(submenu, 'menu-submenu-left');
            }

            if ( item.getAttribute('data-menu-toggle-class') ) {
                KTUtil.addClass(body, item.getAttribute('data-menu-toggle-class'));
            }
        },

        /**
         * Handles submenu slide toggle
         * @returns {KTMenu}
         */
        createSubmenuDropdownClickDropoff: function(el) {
            var query;
            var zIndex = (query = KTUtil.child(el, '.menu-submenu') ? KTUtil.css(query, 'z-index') : 0) - 1;

            var dropoff = document.createElement('<div class="menu-dropoff" style="background: transparent; position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: ' + zIndex + '"></div>');

            body.appendChild(dropoff);

            KTUtil.addEvent(dropoff, 'click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                KTUtil.remove(this);
                Plugin.hideSubmenuDropdown(el, true);
            });
        },

        /**
         * Handles submenu hover toggle
         * @returns {KTMenu}
         */
        pauseDropdownHover: function(time) {
            var date = new Date();

            the.pauseDropdownHoverTime = date.getTime() + time;
        },

        /**
         * Handles submenu hover toggle
         * @returns {KTMenu}
         */
        resumeDropdownHover: function() {
            var date = new Date();

            return (date.getTime() > the.pauseDropdownHoverTime ? true : false);
        },

        /**
         * Reset menu's current active item
         * @returns {KTMenu}
         */
        resetActiveItem: function(item) {
            var list;
            var parents;

            list = element.querySelectorAll('.menu-item-active');

            for (var i = 0, len = list.length; i < len; i++) {
                var el = list[0];
                KTUtil.removeClass(el, 'menu-item-active');
                KTUtil.hide( KTUtil.child(el, '.menu-submenu') );
                parents = KTUtil.parents(el, '.menu-item-submenu') || [];

                for (var i_ = 0, len_ = parents.length; i_ < len_; i_++) {
                    var el_ = parents[i];
                    KTUtil.removeClass(el_, 'menu-item-open');
                    KTUtil.hide( KTUtil.child(el_, '.menu-submenu') );
                }
            }

            // close open submenus
            if ( the.options.accordion.expandAll === false ) {
                if ( list = element.querySelectorAll('.menu-item-open') ) {
                    for (var i = 0, len = list.length; i < len; i++) {
                        KTUtil.removeClass(parents[0], 'menu-item-open');
                    }
                }
            }
        },

        /**
         * Sets menu's active item
         * @returns {KTMenu}
         */
        setActiveItem: function(item) {
            // reset current active item
            Plugin.resetActiveItem();

            var parents = KTUtil.parents(item, '.menu-item-submenu') || [];
            for (var i = 0, len = parents.length; i < len; i++) {
                KTUtil.addClass(parents[i], 'menu-item-open');
            }

            KTUtil.addClass(item, 'menu-item-active');
        },

        /**
         * Returns page breadcrumbs for the menu's active item
         * @returns {KTMenu}
         */
        getBreadcrumbs: function(item) {
            var query;
            var breadcrumbs = [];
            var link = KTUtil.child(item, '.menu-link');

            breadcrumbs.push({
                text: (query = KTUtil.child(link, '.menu-text') ? query.innerHTML : ''),
                title: link.getAttribute('title'),
                href: link.getAttribute('href')
            });

            var parents = KTUtil.parents(item, '.menu-item-submenu');
            for (var i = 0, len = parents.length; i < len; i++) {
                var submenuLink = KTUtil.child(parents[i], '.menu-link');

                breadcrumbs.push({
                    text: (query = KTUtil.child(submenuLink, '.menu-text') ? query.innerHTML : ''),
                    title: submenuLink.getAttribute('title'),
                    href: submenuLink.getAttribute('href')
                });
            }

            return  breadcrumbs.reverse();
        },

        /**
         * Returns page title for the menu's active item
         * @returns {KTMenu}
         */
        getPageTitle: function(item) {
            var query;

            return (query = KTUtil.child(item, '.menu-text') ? query.innerHTML : '');
        },

        /**
         * Trigger events
         */
        eventTrigger: function(name, target, e) {
            for (var i = 0; i < the.events.length; i++ ) {
                var event = the.events[i];
                if ( event.name == name ) {
                    if ( event.one == true ) {
                        if ( event.fired == false ) {
                            the.events[i].fired = true;
                            return event.handler.call(this, target, e);
                        }
                    } else {
                        return event.handler.call(this, target, e);
                    }
                }
            }
        },

        addEvent: function(name, handler, one) {
            the.events.push({
                name: name,
                handler: handler,
                one: one,
                fired: false
            });
        },

        removeEvent: function(name) {
            if (the.events[name]) {
                delete the.events[name];
            }
        }
    };

    //////////////////////////
    // ** Public Methods ** //
    //////////////////////////

    /**
     * Set default options
     */

    the.setDefaults = function(options) {
        defaultOptions = options;
    };

    /**
     * Update scroll
     */
    the.scrollUpdate = function() {
        return Plugin.scrollUpdate();
    };

    /**
     * Re-init scroll
     */
    the.scrollReInit = function() {
        return Plugin.scrollInit();
    };

    /**
     * Scroll top
     */
    the.scrollTop = function() {
        return Plugin.scrollTop();
    };

    /**
     * Set active menu item
     */
    the.setActiveItem = function(item) {
        return Plugin.setActiveItem(item);
    };

    the.reload = function() {
        return Plugin.reload();
    };

    the.update = function(options) {
        return Plugin.update(options);
    };

    /**
     * Set breadcrumb for menu item
     */
    the.getBreadcrumbs = function(item) {
        return Plugin.getBreadcrumbs(item);
    };

    /**
     * Set page title for menu item
     */
    the.getPageTitle = function(item) {
        return Plugin.getPageTitle(item);
    };

    /**
     * Get submenu mode
     */
    the.getSubmenuMode = function(el) {
        return Plugin.getSubmenuMode(el);
    };

    /**
     * Hide dropdown
     * @returns {Object}
     */
    the.hideDropdown = function(item) {
        Plugin.hideSubmenuDropdown(item, true);
    };

    /**
     * Hide dropdowns
     * @returns {Object}
     */
    the.hideDropdowns = function() {
        Plugin.hideSubmenuDropdowns();
    };

    /**
     * Disable menu for given time
     * @returns {Object}
     */
    the.pauseDropdownHover = function(time) {
        Plugin.pauseDropdownHover(time);
    };

    /**
     * Disable menu for given time
     * @returns {Object}
     */
    the.resumeDropdownHover = function() {
        return Plugin.resumeDropdownHover();
    };

    /**
     * Register event
     */
    the.on = function(name, handler) {
        return Plugin.addEvent(name, handler);
    };

    the.off = function(name) {
        return Plugin.removeEvent(name);
    };

    the.one = function(name, handler) {
        return Plugin.addEvent(name, handler, true);
    };

    ///////////////////////////////
    // ** Plugin Construction ** //
    ///////////////////////////////

    // Run plugin
    Plugin.construct.apply(the, [options]);

    // Handle plugin on window resize
    KTUtil.addResizeHandler(function() {
        if (init) {
            the.reload();
        }
    });

    // Init done
    init = true;

    // Return plugin instance
    return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KTMenu;
}

// Plugin global lazy initialization
document.addEventListener("click", function (e) {
    var body = KTUtil.getByTagName('body')[0];
    var query;
    if ( query = body.querySelectorAll('.menu-nav .menu-item.menu-item-submenu.menu-item-hover:not(.menu-item-tabs)[data-menu-toggle="click"]') ) {
        for (var i = 0, len = query.length; i < len; i++) {
            var element = query[i].closest('.menu-nav').parentNode;

            if ( element ) {
                var the = KTUtil.data(element).get('menu');

                if ( !the ) {
                    break;
                }

                if ( !the || the.getSubmenuMode() !== 'dropdown' ) {
                    break;
                }

                if ( e.target !== element && element.contains(e.target) === false ) {
                    the.hideDropdowns();
                }
            }
        }
    }
});

"use strict";

// Component Definition
var KTOffcanvas = function(elementId, options) {
    // Main object
    var the = this;
    var init = false;

    // Get element object
    var element = KTUtil.getById(elementId);
    var body = KTUtil.getBody();

    if (!element) {
        return;
    }

    // Default options
    var defaultOptions = {
        attrCustom: ''
    };

    ////////////////////////////
    // ** Private Methods  ** //
    ////////////////////////////

    var Plugin = {
        construct: function(options) {
            if (KTUtil.data(element).has('offcanvas')) {
                the = KTUtil.data(element).get('offcanvas');
            } else {
                // Reset offcanvas
                Plugin.init(options);

                // Build offcanvas
                Plugin.build();

                KTUtil.data(element).set('offcanvas', the);
            }

            return the;
        },

        init: function(options) {
            the.events = [];

            // merge default and user defined options
            the.options = KTUtil.deepExtend({}, defaultOptions, options);

            the.classBase = the.options.baseClass;
            the.attrCustom = the.options.attrCustom;
            the.classShown = the.classBase + '-on';
            the.classOverlay = the.classBase + '-overlay';
            the.target;

            the.state = KTUtil.hasClass(element, the.classShown) ? 'shown' : 'hidden';
        },

        build: function() {
            // offcanvas toggle
            if (the.options.toggleBy) {
                if (typeof the.options.toggleBy === 'string') {
                    KTUtil.addEvent(KTUtil.getById(the.options.toggleBy), 'click', function(e) {
                        e.preventDefault();
                        the.target = this;
                        Plugin.toggle();
                    });
                } else if (the.options.toggleBy && the.options.toggleBy[0]) {
                    if (the.options.toggleBy[0].target) {
                        for (var i in the.options.toggleBy) {
                            KTUtil.addEvent(KTUtil.getById(the.options.toggleBy[i].target), 'click', function(e) {
                                e.preventDefault();
                                the.target = this;
                                Plugin.toggle();
                            });
                        }
                    } else {
                        for (var i in the.options.toggleBy) {
                            KTUtil.addEvent(KTUtil.getById(the.options.toggleBy[i]), 'click', function(e) {
                                e.preventDefault();
                                the.target = this;
                                Plugin.toggle();
                            });
                        }
                    }

                } else if (the.options.toggleBy && the.options.toggleBy.target) {
                    KTUtil.addEvent( KTUtil.getById(the.options.toggleBy.target), 'click', function(e) {
                        e.preventDefault();
                        the.target = this;
                        Plugin.toggle();
                    });
                }
            }

            // offcanvas close
            var closeBy = KTUtil.getById(the.options.closeBy);
            if (closeBy) {
                KTUtil.addEvent(closeBy, 'click', function(e) {
                    e.preventDefault();
                    the.target = this;
                    Plugin.hide();
                });
            }
        },

        isShown: function() {
            return (the.state == 'shown' ? true : false);
        },

        toggle: function() {;
            Plugin.eventTrigger('toggle');

            if (the.state == 'shown') {
                Plugin.hide();
            } else {
                Plugin.show();
            }
        },

        show: function() {
            if (the.state == 'shown') {
                return;
            }

            Plugin.eventTrigger('beforeShow');

            Plugin.toggleClass('show');

            // Offcanvas panel
            KTUtil.attr(body, 'data-offcanvas-' + the.classBase, 'on');
            KTUtil.addClass(element, the.classShown);

            if (the.attrCustom.length > 0) {
                KTUtil.attr(body, 'data-offcanvas-' + the.classCustom, 'on');
                //KTUtil.addClass(body, the.classCustom);
            }

            the.state = 'shown';

            if (the.options.overlay) {
                the.overlay = KTUtil.insertAfter(document.createElement('DIV') , element );
                KTUtil.addClass(the.overlay, the.classOverlay);

                KTUtil.addEvent(the.overlay, 'click', function(e) {
                    //e.stopPropagation();
                    e.preventDefault();
                    Plugin.hide(the.target);
                });
            }

            Plugin.eventTrigger('afterShow');
        },

        hide: function() {
            if (the.state == 'hidden') {
                return;
            }

            Plugin.eventTrigger('beforeHide');

            Plugin.toggleClass('hide');

            KTUtil.removeAttr(body, 'data-offcanvas-' + the.classBase);
            KTUtil.removeClass(element, the.classShown);

            if (the.attrCustom.length > 0) {
                KTUtil.removeAttr(body, 'data-offcanvas-' + the.attrCustom);
            }

            the.state = 'hidden';

            if (the.options.overlay && the.overlay) {
                KTUtil.remove(the.overlay);
            }

            Plugin.eventTrigger('afterHide');
        },

        toggleClass: function(mode) {
            var id = KTUtil.attr(the.target, 'id');
            var toggleBy;

            if (the.options.toggleBy && the.options.toggleBy[0] && the.options.toggleBy[0].target) {
                for (var i in the.options.toggleBy) {
                    if (the.options.toggleBy[i].target === id) {
                        toggleBy = the.options.toggleBy[i];
                    }
                }
            } else if (the.options.toggleBy && the.options.toggleBy.target) {
                toggleBy = the.options.toggleBy;
            }

            if (toggleBy) {
                var el = KTUtil.getById(toggleBy.target);

                if (mode === 'show') {
                    KTUtil.addClass(el, toggleBy.state);
                }

                if (mode === 'hide') {
                    KTUtil.removeClass(el, toggleBy.state);
                }
            }
        },

        eventTrigger: function(name, args) {
            for (var i = 0; i < the.events.length; i++) {
                var event = the.events[i];
                if (event.name == name) {
                    if (event.one == true) {
                        if (event.fired == false) {
                            the.events[i].fired = true;
                            return event.handler.call(this, the, args);
                        }
                    } else {
                        return event.handler.call(this, the, args);
                    }
                }
            }
        },

        addEvent: function(name, handler, one) {
            the.events.push({
                name: name,
                handler: handler,
                one: one,
                fired: false
            });
        }
    };

    //////////////////////////
    // ** Public Methods ** //
    //////////////////////////

    /**
     * Set default options
     * @param options
     */
    the.setDefaults = function(options) {
        defaultOptions = options;
    };

    /**
     * Check if canvas is shown
     * @returns {boolean}
     */
    the.isShown = function() {
        return Plugin.isShown();
    };

    /**
     * Set to hide the canvas
     */
    the.hide = function() {
        return Plugin.hide();
    };

    /**
     * Set to show the canvas
     */
    the.show = function() {
        return Plugin.show();
    };

    /**
     * Attach event
     * @param name
     * @param handler
     */
    the.on = function(name, handler) {
        return Plugin.addEvent(name, handler);
    };

    /**
     * Attach event that will be fired once
     * @param name
     * @param handler
     */
    the.one = function(name, handler) {
        return Plugin.addEvent(name, handler, true);
    };

    ///////////////////////////////
    // ** Plugin Construction ** //
    ///////////////////////////////

    // Run plugin
    Plugin.construct.apply(the, [options]);

    // Init done
    init = true;

    // Return plugin instance
    return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KTOffcanvas;
}

"use strict";

// Component Definition
var KTScrolltop = function(elementId, options) {
    // Main object
    var the = this;
    var init = false;

    // Get element object
    var element = KTUtil.getById(elementId);
    var body = KTUtil.getBody();

    if (!element) {
        return;
    }

    // Default options
    var defaultOptions = {
        offset: 300,
        speed: 6000
    };

    ////////////////////////////
    // ** Private Methods  ** //
    ////////////////////////////

    var Plugin = {
        /**
         * Run plugin
         * @returns {mscrolltop}
         */
        construct: function(options) {
            if (KTUtil.data(element).has('scrolltop')) {
                the = KTUtil.data(element).get('scrolltop');
            } else {
                // reset scrolltop
                Plugin.init(options);

                // build scrolltop
                Plugin.build();

                KTUtil.data(element).set('scrolltop', the);
            }

            return the;
        },

        /**
         * Handles subscrolltop click toggle
         * @returns {mscrolltop}
         */
        init: function(options) {
            the.events = [];

            // merge default and user defined options
            the.options = KTUtil.deepExtend({}, defaultOptions, options);
        },

        build: function() {
            var timer;

            window.addEventListener('scroll', function() {
                KTUtil.throttle(timer, function() {
                    Plugin.handle();
                }, 200);
            });

            // handle button click
            KTUtil.addEvent(element, 'click', Plugin.scroll);
        },

        /**
         * Handles scrolltop click scrollTop
         */
        handle: function() {
            var pos = KTUtil.getScrollTop(); // current vertical position

            if (pos > the.options.offset) {
                if (body.hasAttribute('data-scrolltop') === false) {
                    body.setAttribute('data-scrolltop', 'on');
                }
            } else {
                if (body.hasAttribute('data-scrolltop') === true) {
                    body.removeAttribute('data-scrolltop');
                }
            }
        },

        /**
         * Handles scrolltop click scrollTop
         */
        scroll: function(e) {
            e.preventDefault();

            KTUtil.scrollTop(0, the.options.speed);
        },


        /**
         * Trigger events
         */
        eventTrigger: function(name, args) {
            for (var i = 0; i < the.events.length; i++) {
                var event = the.events[i];
                if (event.name == name) {
                    if (event.one == true) {
                        if (event.fired == false) {
                            the.events[i].fired = true;
                            return event.handler.call(this, the, args);
                        }
                    } else {
                       return event.handler.call(this, the, args);
                    }
                }
            }
        },

        addEvent: function(name, handler, one) {
            the.events.push({
                name: name,
                handler: handler,
                one: one,
                fired: false
            });
        }
    };

    //////////////////////////
    // ** Public Methods ** //
    //////////////////////////

    /**
     * Set default options
     */

    the.setDefaults = function(options) {
        defaultOptions = options;
    };

    /**
     * Get subscrolltop mode
     */
    the.on = function(name, handler) {
        return Plugin.addEvent(name, handler);
    };

    /**
     * Set scrolltop content
     * @returns {mscrolltop}
     */
    the.one = function(name, handler) {
        return Plugin.addEvent(name, handler, true);
    };

    ///////////////////////////////
    // ** Plugin Construction ** //
    ///////////////////////////////

    // Run plugin
    Plugin.construct.apply(the, [options]);

    // Init done
    init = true;

    // Return plugin instance
    return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KTScrolltop;
}

"use strict";

// Component Definition
var KTToggle = function(elementId, options) {
    // Main object
    var the = this;
    var init = false;

    // Get element object
    var element = KTUtil.getById(elementId);

    if (!element) {
        return;
    }

    // Default options
    var defaultOptions = {
        targetToggleMode: 'class' // class|attribute
    };

    ////////////////////////////
    // ** Private Methods  ** //
    ////////////////////////////

    var Plugin = {
        /**
         * Construct
         */

        construct: function(options) {
            if (KTUtil.data(element).has('toggle')) {
                the = KTUtil.data(element).get('toggle');
            } else {
                // reset menu
                Plugin.init(options);

                // build menu
                Plugin.build();

                KTUtil.data(element).set('toggle', the);
            }

            return the;
        },

        /**
         * Handles subtoggle click toggle
         */
        init: function(options) {
            the.element = element;
            the.events = [];

            // Merge default and user defined options
            the.options = KTUtil.deepExtend({}, defaultOptions, options);

            //alert(the.options.target.tagName);
            the.target = KTUtil.getById(options.target);

            the.targetState = the.options.targetState;
            the.toggleState = the.options.toggleState;

            if (the.options.targetToggleMode == 'class') {
                the.state = KTUtil.hasClasses(the.target, the.targetState) ? 'on' : 'off';
            } else {
                the.state = KTUtil.hasAttr(the.target, 'data-' + the.targetState) ? KTUtil.attr(the.target, 'data-' + the.targetState) : 'off';
            }
        },

        /**
         * Setup toggle
         */
        build: function() {
            KTUtil.addEvent(element, 'mouseup', Plugin.toggle);
        },

        /**
         * Handles offcanvas click toggle
         */
        toggle: function(e) {
            Plugin.eventTrigger('beforeToggle');

            if (the.state == 'off') {
                Plugin.toggleOn();
            } else {
                Plugin.toggleOff();
            }

            Plugin.eventTrigger('afterToggle');

            e.preventDefault();

            return the;
        },

        /**
         * Handles toggle click toggle
         */
        toggleOn: function() {
            Plugin.eventTrigger('beforeOn');

            if (the.options.targetToggleMode == 'class') {
                KTUtil.addClass(the.target, the.targetState);
            } else {
                KTUtil.attr(the.target, 'data-' + the.targetState, 'on');
            }

            if (the.toggleState) {
                KTUtil.addClass(element, the.toggleState);
            }

            the.state = 'on';

            Plugin.eventTrigger('afterOn');

            Plugin.eventTrigger('toggle');

            return the;
        },

        /**
         * Handles toggle click toggle
         */
        toggleOff: function() {
            Plugin.eventTrigger('beforeOff');

            if (the.options.targetToggleMode == 'class') {
                KTUtil.removeClass(the.target, the.targetState);
            } else {
                KTUtil.removeAttr(the.target, 'data-' + the.targetState);
            }

            if (the.toggleState) {
                KTUtil.removeClass(element, the.toggleState);
            }

            the.state = 'off';

            Plugin.eventTrigger('afterOff');

            Plugin.eventTrigger('toggle');

            return the;
        },

        /**
         * Trigger events
         */
        eventTrigger: function(name) {
            for (var i = 0; i < the.events.length; i++) {
                var event = the.events[i];

                if (event.name == name) {
                    if (event.one == true) {
                        if (event.fired == false) {
                            the.events[i].fired = true;
                            return event.handler.call(this, the);
                        }
                    } else {
                        return event.handler.call(this, the);
                    }
                }
            }
        },

        addEvent: function(name, handler, one) {
            the.events.push({
                name: name,
                handler: handler,
                one: one,
                fired: false
            });

            return the;
        }
    };

    //////////////////////////
    // ** Public Methods ** //
    //////////////////////////

    /**
     * Set default options
     */

    the.setDefaults = function(options) {
        defaultOptions = options;
    };

    /**
     * Get toggle state
     */
    the.getState = function() {
        return the.state;
    };

    /**
     * Toggle
     */
    the.toggle = function() {
        return Plugin.toggle();
    };

    /**
     * Toggle on
     */
    the.toggleOn = function() {
        return Plugin.toggleOn();
    };

    /**
     * Toggle off
     */
    the.toggleOff = function() {
        return Plugin.toggleOff();
    };

    /**
     * Attach event
     * @returns {KTToggle}
     */
    the.on = function(name, handler) {
        return Plugin.addEvent(name, handler);
    };

    /**
     * Attach event that will be fired once
     * @returns {KTToggle}
     */
    the.one = function(name, handler) {
        return Plugin.addEvent(name, handler, true);
    };

    // Construct plugin
    Plugin.construct.apply(the, [options]);

    return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KTToggle;
}

"use strict";

/**
 * @class KTUtil  base utilize class that privides helper functions
 */

// Polyfills
/**
 * Element.matches() polyfill (simple version)
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
 */
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

/**
 * Element.closest() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
 */
if (!Element.prototype.closest) {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}
	Element.prototype.closest = function (s) {
		var el = this;
		var ancestor = this;
		if (!document.documentElement.contains(el)) return null;
		do {
			if (ancestor.matches(s)) return ancestor;
			ancestor = ancestor.parentElement;
		} while (ancestor !== null);
		return null;
	};
}

/**
 * ChildNode.remove() polyfill
 * https://gomakethings.com/removing-an-element-from-the-dom-the-es6-way/
 * @author Chris Ferdinandi
 * @license MIT
 */
(function(elem){for(var i=0;i<elem.length;i++){if(!window[elem[i]]||'remove' in window[elem[i]].prototype)continue;window[elem[i]].prototype.remove=function(){this.parentNode.removeChild(this)}}})(['Element','CharacterData','DocumentType']);(function(){var lastTime=0;var vendors=['webkit','moz'];for(var x=0;x<vendors.length&&!window.requestAnimationFrame;++x){window.requestAnimationFrame=window[vendors[x]+'RequestAnimationFrame'];window.cancelAnimationFrame=window[vendors[x]+'CancelAnimationFrame']||window[vendors[x]+'CancelRequestAnimationFrame']}
if(!window.requestAnimationFrame)
window.requestAnimationFrame=function(callback){var currTime=new Date().getTime();var timeToCall=Math.max(0,16-(currTime-lastTime));var id=window.setTimeout(function(){callback(currTime+timeToCall)},timeToCall);lastTime=currTime+timeToCall;return id};if(!window.cancelAnimationFrame)
window.cancelAnimationFrame=function(id){clearTimeout(id)}}());(function(arr){arr.forEach(function(item){if(item.hasOwnProperty('prepend')){return}
Object.defineProperty(item,'prepend',{configurable:!0,enumerable:!0,writable:!0,value:function prepend(){var argArr=Array.prototype.slice.call(arguments),docFrag=document.createDocumentFragment();argArr.forEach(function(argItem){var isNode=argItem instanceof Node;docFrag.appendChild(isNode?argItem:document.createTextNode(String(argItem)))});this.insertBefore(docFrag,this.firstChild)}})})})([Element.prototype,Document.prototype,DocumentFragment.prototype]);window.KTUtilElementDataStore={};window.KTUtilElementDataStoreID=0;window.KTUtilDelegatedEventHandlers={};var KTUtil=function(){var resizeHandlers=[];var breakpoints={sm:544,md:768,lg:992,xl:1200};var _windowResizeHandler=function(){var _runResizeHandlers=function(){for(var i=0;i<resizeHandlers.length;i++){var each=resizeHandlers[i];each.call()}};var timer;window.addEventListener('resize',function(){KTUtil.throttle(timer,function(){_runResizeHandlers()},200)})};return{init:function(settings){if(settings&&settings.breakpoints){breakpoints=settings.breakpoints}
_windowResizeHandler()},addResizeHandler:function(callback){resizeHandlers.push(callback)},removeResizeHandler:function(callback){for(var i=0;i<resizeHandlers.length;i++){if(callback===resizeHandlers[i]){delete resizeHandlers[i]}}},runResizeHandlers:function(){_runResizeHandlers()},resize:function(){if(typeof(Event)==='function'){window.dispatchEvent(new Event('resize'))}else{var evt=window.document.createEvent('UIEvents');evt.initUIEvent('resize',!0,!1,window,0);window.dispatchEvent(evt)}},getURLParam:function(paramName){var searchString=window.location.search.substring(1),i,val,params=searchString.split("&");for(i=0;i<params.length;i++){val=params[i].split("=");if(val[0]==paramName){return unescape(val[1])}}
return null},isMobileDevice:function(){return(this.getViewPort().width<this.getBreakpoint('lg')?!0:!1)},isDesktopDevice:function(){return KTUtil.isMobileDevice()?!1:!0},getViewPort:function(){var e=window,a='inner';if(!('innerWidth' in window)){a='client';e=document.documentElement||document.body}
return{width:e[a+'Width'],height:e[a+'Height']}},isInResponsiveRange:function(mode){var breakpoint=this.getViewPort().width;if(mode=='general'){return!0}else if(mode=='desktop'&&breakpoint>=(this.getBreakpoint('lg')+1)){return!0}else if(mode=='tablet'&&(breakpoint>=(this.getBreakpoint('md')+1)&&breakpoint<this.getBreakpoint('lg'))){return!0}else if(mode=='mobile'&&breakpoint<=this.getBreakpoint('md')){return!0}else if(mode=='desktop-and-tablet'&&breakpoint>=(this.getBreakpoint('md')+1)){return!0}else if(mode=='tablet-and-mobile'&&breakpoint<=this.getBreakpoint('lg')){return!0}else if(mode=='minimal-desktop-and-below'&&breakpoint<=this.getBreakpoint('xl')){return!0}
return!1},isBreakpointUp:function(mode){var width=this.getViewPort().width;var breakpoint=this.getBreakpoint(mode);return(width>=breakpoint)},isBreakpointDown:function(mode){var width=this.getViewPort().width;var breakpoint=this.getBreakpoint(mode);return(width<breakpoint)},getUniqueID:function(prefix){return prefix+Math.floor(Math.random()*(new Date()).getTime())},getBreakpoint:function(mode){return breakpoints[mode]},isset:function(obj,keys){var stone;keys=keys||'';if(keys.indexOf('[')!==-1){throw new Error('Unsupported object path notation.')}
keys=keys.split('.');do{if(obj===undefined){return!1}
stone=keys.shift();if(!obj.hasOwnProperty(stone)){return!1}
obj=obj[stone]}while(keys.length);return!0},getHighestZindex:function(el){var position,value;while(el&&el!==document){position=KTUtil.css(el,'position');if(position==="absolute"||position==="relative"||position==="fixed"){value=parseInt(KTUtil.css(el,'z-index'));if(!isNaN(value)&&value!==0){return value}}
el=el.parentNode}
return null},hasFixedPositionedParent:function(el){var position;while(el&&el!==document){position=KTUtil.css(el,'position');if(position==="fixed"){return!0}
el=el.parentNode}
return!1},sleep:function(milliseconds){var start=new Date().getTime();for(var i=0;i<1e7;i++){if((new Date().getTime()-start)>milliseconds){break}}},getRandomInt:function(min,max){return Math.floor(Math.random()*(max-min+1))+min},isAngularVersion:function(){return window.Zone!==undefined?!0:!1},deepExtend:function(out){out=out||{};for(var i=1;i<arguments.length;i++){var obj=arguments[i];if(!obj)
continue;for(var key in obj){if(obj.hasOwnProperty(key)){if(typeof obj[key]==='object')
out[key]=KTUtil.deepExtend(out[key],obj[key]);else out[key]=obj[key]}}}
return out},extend:function(out){out=out||{};for(var i=1;i<arguments.length;i++){if(!arguments[i])
continue;for(var key in arguments[i]){if(arguments[i].hasOwnProperty(key))
out[key]=arguments[i][key]}}
return out},getById:function(el){if(typeof el==='string'){return document.getElementById(el)}else{return el}},getByTag:function(query){return document.getElementsByTagName(query)},getByTagName:function(query){return document.getElementsByTagName(query)},getByClass:function(query){return document.getElementsByClassName(query)},getBody:function(){return document.getElementsByTagName('body')[0]},hasClasses:function(el,classes){if(!el){return}
var classesArr=classes.split(" ");for(var i=0;i<classesArr.length;i++){if(KTUtil.hasClass(el,KTUtil.trim(classesArr[i]))==!1){return!1}}
return!0},hasClass:function(el,className){if(!el){return}
return el.classList?el.classList.contains(className):new RegExp('\\b'+className+'\\b').test(el.className)},addClass:function(el,className){if(!el||typeof className==='undefined'){return}
var classNames=className.split(' ');if(el.classList){for(var i=0;i<classNames.length;i++){if(classNames[i]&&classNames[i].length>0){el.classList.add(KTUtil.trim(classNames[i]))}}}else if(!KTUtil.hasClass(el,className)){for(var x=0;x<classNames.length;x++){el.className+=' '+KTUtil.trim(classNames[x])}}},removeClass:function(el,className){if(!el||typeof className==='undefined'){return}
var classNames=className.split(' ');if(el.classList){for(var i=0;i<classNames.length;i++){el.classList.remove(KTUtil.trim(classNames[i]))}}else if(KTUtil.hasClass(el,className)){for(var x=0;x<classNames.length;x++){el.className=el.className.replace(new RegExp('\\b'+KTUtil.trim(classNames[x])+'\\b','g'),'')}}},triggerCustomEvent:function(el,eventName,data){var event;if(window.CustomEvent){event=new CustomEvent(eventName,{detail:data})}else{event=document.createEvent('CustomEvent');event.initCustomEvent(eventName,!0,!0,data)}
el.dispatchEvent(event)},triggerEvent:function(node,eventName){var doc;if(node.ownerDocument){doc=node.ownerDocument}else if(node.nodeType==9){doc=node}else{throw new Error("Invalid node passed to fireEvent: "+node.id)}
if(node.dispatchEvent){var eventClass="";switch(eventName){case "click":case "mouseenter":case "mouseleave":case "mousedown":case "mouseup":eventClass="MouseEvents";break;case "focus":case "change":case "blur":case "select":eventClass="HTMLEvents";break;default:throw "fireEvent: Couldn't find an event class for event '"+eventName+"'.";break}
var event=doc.createEvent(eventClass);var bubbles=eventName=="change"?!1:!0;event.initEvent(eventName,bubbles,!0);event.synthetic=!0;node.dispatchEvent(event,!0)}else if(node.fireEvent){var event=doc.createEventObject();event.synthetic=!0;node.fireEvent("on"+eventName,event)}},index:function(el){var c=el.parentNode.children,i=0;for(;i<c.length;i++)
if(c[i]==el)return i},trim:function(string){return string.trim()},eventTriggered:function(e){if(e.currentTarget.dataset.triggered){return!0}else{e.currentTarget.dataset.triggered=!0;return!1}},remove:function(el){if(el&&el.parentNode){el.parentNode.removeChild(el)}},find:function(parent,query){parent=KTUtil.getById(parent);if(parent){return parent.querySelector(query)}},findAll:function(parent,query){parent=KTUtil.getById(parent);if(parent){return parent.querySelectorAll(query)}},insertAfter:function(el,referenceNode){return referenceNode.parentNode.insertBefore(el,referenceNode.nextSibling)},parents:function(elem,selector){if(!Element.prototype.matches){Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(s){var matches=(this.document||this.ownerDocument).querySelectorAll(s),i=matches.length;while(--i>=0&&matches.item(i)!==this){}
return i>-1}}
var parents=[];for(;elem&&elem!==document;elem=elem.parentNode){if(selector){if(elem.matches(selector)){parents.push(elem)}
continue}
parents.push(elem)}
return parents},children:function(el,selector,log){if(!el||!el.childNodes){return}
var result=[],i=0,l=el.childNodes.length;for(var i;i<l;++i){if(el.childNodes[i].nodeType==1&&KTUtil.matches(el.childNodes[i],selector,log)){result.push(el.childNodes[i])}}
return result},child:function(el,selector,log){var children=KTUtil.children(el,selector,log);return children?children[0]:null},matches:function(el,selector,log){var p=Element.prototype;var f=p.matches||p.webkitMatchesSelector||p.mozMatchesSelector||p.msMatchesSelector||function(s){return[].indexOf.call(document.querySelectorAll(s),this)!==-1};if(el&&el.tagName){return f.call(el,selector)}else{return!1}},data:function(el){return{set:function(name,data){if(!el){return}
if(el.customDataTag===undefined){window.KTUtilElementDataStoreID++;el.customDataTag=window.KTUtilElementDataStoreID}
if(window.KTUtilElementDataStore[el.customDataTag]===undefined){window.KTUtilElementDataStore[el.customDataTag]={}}
window.KTUtilElementDataStore[el.customDataTag][name]=data},get:function(name){if(!el){return}
if(el.customDataTag===undefined){return null}
return this.has(name)?window.KTUtilElementDataStore[el.customDataTag][name]:null},has:function(name){if(!el){return!1}
if(el.customDataTag===undefined){return!1}
return(window.KTUtilElementDataStore[el.customDataTag]&&window.KTUtilElementDataStore[el.customDataTag][name])?!0:!1},remove:function(name){if(el&&this.has(name)){delete window.KTUtilElementDataStore[el.customDataTag][name]}}}},outerWidth:function(el,margin){var width;if(margin===!0){width=parseFloat(el.offsetWidth);width+=parseFloat(KTUtil.css(el,'margin-left'))+parseFloat(KTUtil.css(el,'margin-right'));return parseFloat(width)}else{width=parseFloat(el.offsetWidth);return width}},offset:function(el){var rect,win;if(!el){return}
if(!el.getClientRects().length){return{top:0,left:0}}
rect=el.getBoundingClientRect();win=el.ownerDocument.defaultView;return{top:rect.top+win.pageYOffset,left:rect.left+win.pageXOffset}},height:function(el){return KTUtil.css(el,'height')},outerHeight:function(el,withMargic=!1){var height=el.offsetHeight;var style;if(withMargic){style=getComputedStyle(el);height+=parseInt(style.marginTop)+parseInt(style.marginBottom);return height}else{return height}},visible:function(el){return!(el.offsetWidth===0&&el.offsetHeight===0)},attr:function(el,name,value){if(el==undefined){return}
if(value!==undefined){el.setAttribute(name,value)}else{return el.getAttribute(name)}},hasAttr:function(el,name){if(el==undefined){return}
return el.getAttribute(name)?!0:!1},removeAttr:function(el,name){if(el==undefined){return}
el.removeAttribute(name)},animate:function(from,to,duration,update,easing,done){var easings={};var easing;easings.linear=function(t,b,c,d){return c*t/d+b};easing=easings.linear;if(typeof from!=='number'||typeof to!=='number'||typeof duration!=='number'||typeof update!=='function'){return}
if(typeof done!=='function'){done=function(){}}
var rAF=window.requestAnimationFrame||function(callback){window.setTimeout(callback,1000/50)};var canceled=!1;var change=to-from;function loop(timestamp){var time=(timestamp||+new Date())-start;if(time>=0){update(easing(time,from,change,duration))}
if(time>=0&&time>=duration){update(to);done()}else{rAF(loop)}}
update(from);var start=window.performance&&window.performance.now?window.performance.now():+new Date();rAF(loop)},actualCss:function(el,prop,cache){var css='';if(el instanceof HTMLElement===!1){return}
if(!el.getAttribute('kt-hidden-'+prop)||cache===!1){var value;css=el.style.cssText;el.style.cssText='position: absolute; visibility: hidden; display: block;';if(prop=='width'){value=el.offsetWidth}else if(prop=='height'){value=el.offsetHeight}
el.style.cssText=css;el.setAttribute('kt-hidden-'+prop,value);return parseFloat(value)}else{return parseFloat(el.getAttribute('kt-hidden-'+prop))}},actualHeight:function(el,cache){return KTUtil.actualCss(el,'height',cache)},actualWidth:function(el,cache){return KTUtil.actualCss(el,'width',cache)},getScroll:function(element,method){method='scroll'+method;return(element==window||element==document)?(self[(method=='scrollTop')?'pageYOffset':'pageXOffset']||(browserSupportsBoxModel&&document.documentElement[method])||document.body[method]):element[method]},css:function(el,styleProp,value){if(!el){return}
if(value!==undefined){el.style[styleProp]=value}else{var defaultView=(el.ownerDocument||document).defaultView;if(defaultView&&defaultView.getComputedStyle){styleProp=styleProp.replace(/([A-Z])/g,"-$1").toLowerCase();return defaultView.getComputedStyle(el,null).getPropertyValue(styleProp)}else if(el.currentStyle){styleProp=styleProp.replace(/\-(\w)/g,function(str,letter){return letter.toUpperCase()});value=el.currentStyle[styleProp];if(/^\d+(em|pt|%|ex)?$/i.test(value)){return(function(value){var oldLeft=el.style.left,oldRsLeft=el.runtimeStyle.left;el.runtimeStyle.left=el.currentStyle.left;el.style.left=value||0;value=el.style.pixelLeft+"px";el.style.left=oldLeft;el.runtimeStyle.left=oldRsLeft;return value})(value)}
return value}}},slide:function(el,dir,speed,callback,recalcMaxHeight){if(!el||(dir=='up'&&KTUtil.visible(el)===!1)||(dir=='down'&&KTUtil.visible(el)===!0)){return}
speed=(speed?speed:600);var calcHeight=KTUtil.actualHeight(el);var calcPaddingTop=!1;var calcPaddingBottom=!1;if(KTUtil.css(el,'padding-top')&&KTUtil.data(el).has('slide-padding-top')!==!0){KTUtil.data(el).set('slide-padding-top',KTUtil.css(el,'padding-top'))}
if(KTUtil.css(el,'padding-bottom')&&KTUtil.data(el).has('slide-padding-bottom')!==!0){KTUtil.data(el).set('slide-padding-bottom',KTUtil.css(el,'padding-bottom'))}
if(KTUtil.data(el).has('slide-padding-top')){calcPaddingTop=parseInt(KTUtil.data(el).get('slide-padding-top'))}
if(KTUtil.data(el).has('slide-padding-bottom')){calcPaddingBottom=parseInt(KTUtil.data(el).get('slide-padding-bottom'))}
if(dir=='up'){el.style.cssText='display: block; overflow: hidden;';if(calcPaddingTop){KTUtil.animate(0,calcPaddingTop,speed,function(value){el.style.paddingTop=(calcPaddingTop-value)+'px'},'linear')}
if(calcPaddingBottom){KTUtil.animate(0,calcPaddingBottom,speed,function(value){el.style.paddingBottom=(calcPaddingBottom-value)+'px'},'linear')}
KTUtil.animate(0,calcHeight,speed,function(value){el.style.height=(calcHeight-value)+'px'},'linear',function(){el.style.height='';el.style.display='none';if(typeof callback==='function'){callback()}})}else if(dir=='down'){el.style.cssText='display: block; overflow: hidden;';if(calcPaddingTop){KTUtil.animate(0,calcPaddingTop,speed,function(value){el.style.paddingTop=value+'px'},'linear',function(){el.style.paddingTop=''})}
if(calcPaddingBottom){KTUtil.animate(0,calcPaddingBottom,speed,function(value){el.style.paddingBottom=value+'px'},'linear',function(){el.style.paddingBottom=''})}
KTUtil.animate(0,calcHeight,speed,function(value){el.style.height=value+'px'},'linear',function(){el.style.height='';el.style.display='';el.style.overflow='';if(typeof callback==='function'){callback()}})}},slideUp:function(el,speed,callback){KTUtil.slide(el,'up',speed,callback)},slideDown:function(el,speed,callback){KTUtil.slide(el,'down',speed,callback)},show:function(el,display){if(typeof el!=='undefined'){el.style.display=(display?display:'block')}},hide:function(el){if(typeof el!=='undefined'){el.style.display='none'}},addEvent:function(el,type,handler,one){if(typeof el!=='undefined'&&el!==null){el.addEventListener(type,handler)}},removeEvent:function(el,type,handler){if(el!==null){el.removeEventListener(type,handler)}},on:function(element,selector,event,handler){if(!selector){return}
var eventId=KTUtil.getUniqueID('event');window.KTUtilDelegatedEventHandlers[eventId]=function(e){var targets=element.querySelectorAll(selector);var target=e.target;while(target&&target!==element){for(var i=0,j=targets.length;i<j;i++){if(target===targets[i]){handler.call(target,e)}}
target=target.parentNode}}
KTUtil.addEvent(element,event,window.KTUtilDelegatedEventHandlers[eventId]);return eventId},off:function(element,event,eventId){if(!element||!window.KTUtilDelegatedEventHandlers[eventId]){return}
KTUtil.removeEvent(element,event,window.KTUtilDelegatedEventHandlers[eventId]);delete window.KTUtilDelegatedEventHandlers[eventId]},one:function onetime(el,type,callback){el.addEventListener(type,function callee(e){if(e.target&&e.target.removeEventListener){e.target.removeEventListener(e.type,callee)}
if(el&&el.removeEventListener){e.currentTarget.removeEventListener(e.type,callee)}
return callback(e)})},hash:function(str){var hash=0,i,chr;if(str.length===0)return hash;for(i=0;i<str.length;i++){chr=str.charCodeAt(i);hash=((hash<<5)-hash)+chr;hash|=0}
return hash},animateClass:function(el,animationName,callback){var animation;var animations={animation:'animationend',OAnimation:'oAnimationEnd',MozAnimation:'mozAnimationEnd',WebkitAnimation:'webkitAnimationEnd',msAnimation:'msAnimationEnd',};for(var t in animations){if(el.style[t]!==undefined){animation=animations[t]}}
KTUtil.addClass(el,'animated '+animationName);KTUtil.one(el,animation,function(){KTUtil.removeClass(el,'animated '+animationName)});if(callback){KTUtil.one(el,animation,callback)}},transitionEnd:function(el,callback){var transition;var transitions={transition:'transitionend',OTransition:'oTransitionEnd',MozTransition:'mozTransitionEnd',WebkitTransition:'webkitTransitionEnd',msTransition:'msTransitionEnd'};for(var t in transitions){if(el.style[t]!==undefined){transition=transitions[t]}}
KTUtil.one(el,transition,callback)},animationEnd:function(el,callback){var animation;var animations={animation:'animationend',OAnimation:'oAnimationEnd',MozAnimation:'mozAnimationEnd',WebkitAnimation:'webkitAnimationEnd',msAnimation:'msAnimationEnd'};for(var t in animations){if(el.style[t]!==undefined){animation=animations[t]}}
KTUtil.one(el,animation,callback)},animateDelay:function(el,value){var vendors=['webkit-','moz-','ms-','o-',''];for(var i=0;i<vendors.length;i++){KTUtil.css(el,vendors[i]+'animation-delay',value)}},animateDuration:function(el,value){var vendors=['webkit-','moz-','ms-','o-',''];for(var i=0;i<vendors.length;i++){KTUtil.css(el,vendors[i]+'animation-duration',value)}},scrollTo:function(target,offset,duration){var duration=duration?duration:500;var targetPos=target?KTUtil.offset(target).top:0;var scrollPos=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;var from,to;if(offset){scrollPos+=offset}
from=scrollPos;to=targetPos;KTUtil.animate(from,to,duration,function(value){document.documentElement.scrollTop=value;document.body.parentNode.scrollTop=value;document.body.scrollTop=value})},scrollTop:function(offset,duration){KTUtil.scrollTo(null,offset,duration)},isArray:function(obj){return obj&&Array.isArray(obj)},ready:function(callback){if(document.attachEvent?document.readyState==="complete":document.readyState!=="loading"){callback()}else{document.addEventListener('DOMContentLoaded',callback)}},isEmpty:function(obj){for(var prop in obj){if(obj.hasOwnProperty(prop)){return!1}}
return!0},numberString:function(nStr){nStr+='';var x=nStr.split('.');var x1=x[0];var x2=x.length>1?'.'+x[1]:'';var rgx=/(\d+)(\d{3})/;while(rgx.test(x1)){x1=x1.replace(rgx,'$1'+','+'$2')}
return x1+x2},detectIE:function(){var ua=window.navigator.userAgent;var msie=ua.indexOf('MSIE ');if(msie>0){return parseInt(ua.substring(msie+5,ua.indexOf('.',msie)),10)}
var trident=ua.indexOf('Trident/');if(trident>0){var rv=ua.indexOf('rv:');return parseInt(ua.substring(rv+3,ua.indexOf('.',rv)),10)}
var edge=ua.indexOf('Edge/');if(edge>0){return parseInt(ua.substring(edge+5,ua.indexOf('.',edge)),10)}
return!1},isRTL:function(){var html=KTUtil.getByTagName('html')[0];if(html){return(KTUtil.attr(html,'direction')=='rtl')}},scrollInit:function(element,options){if(!element){return}
var pluginDefOptions={wheelSpeed:0.5,swipeEasing:!0,wheelPropagation:!1,minScrollbarLength:40,maxScrollbarLength:300,suppressScrollX:!0};options=KTUtil.deepExtend({},pluginDefOptions,options);function init(){var ps;var height;var attrs=element.getAttributeNames();if(attrs.length>0){attrs.forEach(function(attrName){if((/^data-.*/g).test(attrName)){if(['scroll','height','mobile-height'].includes(optionName)==!1){var optionName=attrName.replace('data-','').toLowerCase().replace(/(?:[\s-])\w/g,function(match){return match.replace('-','').toUpperCase()});options[optionName]=KTUtil.filterBoolean(element.getAttribute(attrName))}}})}
if(options.height instanceof Function){height=options.height.call()}else{if(options.mobileHeight){height=parseInt(options.mobileHeight)}else{height=parseInt(options.height)}}
if(height===!1){KTUtil.scrollDestroy(element,!0);return}
height=parseInt(height);if((options.mobileNativeScroll||options.disableForMobile)&&KTUtil.isBreakpointDown('lg')){ps=KTUtil.data(element).get('ps');if(ps){if(options.resetHeightOnDestroy){KTUtil.css(element,'height','auto')}else{KTUtil.css(element,'overflow','auto');if(height>0){KTUtil.css(element,'height',height+'px')}}
ps.destroy();ps=KTUtil.data(element).remove('ps')}else if(height>0){KTUtil.css(element,'overflow','auto');KTUtil.css(element,'height',height+'px')}
return}
if(height>0){KTUtil.css(element,'height',height+'px')}
if(options.desktopNativeScroll){KTUtil.css(element,'overflow','auto');return}
if(KTUtil.attr(element,'data-window-scroll')=='true'){options.windowScroll=!0}
ps=KTUtil.data(element).get('ps');if(ps){ps.update()}else{KTUtil.css(element,'overflow','hidden');KTUtil.addClass(element,'scroll');ps=new PerfectScrollbar(element,options);KTUtil.data(element).set('ps',ps)}
var uid=KTUtil.attr(element,'id')}
init();if(options.handleWindowResize){KTUtil.addResizeHandler(function(){init()})}},scrollUpdate:function(element){var ps=KTUtil.data(element).get('ps');if(ps){ps.update()}},scrollUpdateAll:function(parent){var scrollers=KTUtil.findAll(parent,'.ps');for(var i=0,len=scrollers.length;i<len;i++){KTUtil.scrollUpdate(scrollers[i])}},scrollDestroy:function(element,resetAll){var ps=KTUtil.data(element).get('ps');if(ps){ps.destroy();ps=KTUtil.data(element).remove('ps')}
if(element&&resetAll){element.style.setProperty('overflow','');element.style.setProperty('height','')}},filterBoolean:function(val){if(val===!0||val==='true'){return!0}
if(val===!1||val==='false'){return!1}
return val},setHTML:function(el,html){el.innerHTML=html},getHTML:function(el){if(el){return el.innerHTML}},getDocumentHeight:function(){var body=document.body;var html=document.documentElement;return Math.max(body.scrollHeight,body.offsetHeight,html.clientHeight,html.scrollHeight,html.offsetHeight)},getScrollTop:function(){return(document.scrollingElement||document.documentElement).scrollTop},colorDarken:function(color,amount){var subtractLight=function(color,amount){var cc=parseInt(color,16)-amount;var c=(cc<0)?0:(cc);c=(c.toString(16).length>1)?c.toString(16):`0${c.toString(16)}`;return c}
color=(color.indexOf("#")>=0)?color.substring(1,color.length):color;amount=parseInt((255*amount)/100);return color=`#${subtractLight(color.substring(0,2), amount)}${subtractLight(color.substring(2,4), amount)}${subtractLight(color.substring(4,6), amount)}`},colorLighten:function(color,amount){var addLight=function(color,amount){var cc=parseInt(color,16)+amount;var c=(cc>255)?255:(cc);c=(c.toString(16).length>1)?c.toString(16):`0${c.toString(16)}`;return c}
color=(color.indexOf("#")>=0)?color.substring(1,color.length):color;amount=parseInt((255*amount)/100);return color=`#${addLight(color.substring(0,2), amount)}${addLight(color.substring(2,4), amount)}${addLight(color.substring(4,6), amount)}`},throttle:function(timer,func,delay){if(timer){return}
timer=setTimeout(function(){func();timer=undefined},delay)},debounce:function(timer,func,delay){clearTimeout(timer)
timer=setTimeout(func,delay)},btnWait:function(el,cls,message,disable=!0){if(!el){return}
if(disable){KTUtil.attr(el,"disabled",!0)}
if(cls){KTUtil.addClass(el,cls);KTUtil.attr(el,"wait-class",cls)}
if(message){var caption=KTUtil.find(el,'.btn-caption');if(caption){KTUtil.data(caption).set('caption',KTUtil.getHTML(caption));KTUtil.setHTML(caption,message)}else{KTUtil.data(el).set('caption',KTUtil.getHTML(el));KTUtil.setHTML(el,message)}}},btnRelease:function(el){if(!el){return}
KTUtil.removeAttr(el,"disabled");if(KTUtil.hasAttr(el,"wait-class")){KTUtil.removeClass(el,KTUtil.attr(el,"wait-class"))}
var caption=KTUtil.find(el,'.btn-caption');if(caption&&KTUtil.data(caption).has('caption')){KTUtil.setHTML(caption,KTUtil.data(caption).get('caption'))}else if(KTUtil.data(el).has('caption')){KTUtil.setHTML(el,KTUtil.data(el).get('caption'))}},isOffscreen:function(el,direction,offset=0){var windowWidth=KTUtil.getViewPort().width;var windowHeight=KTUtil.getViewPort().height;var top=KTUtil.offset(el).top;var height=KTUtil.outerHeight(el)+offset;var left=KTUtil.offset(el).left;var width=KTUtil.outerWidth(el)+offset;if(direction=='bottom'){if(windowHeight<top+height){return!0}else if(windowHeight>top+height*1.5){return!0}}
if(direction=='top'){if(top<0){return!0}else if(top>height){return!0}}
if(direction=='left'){if(left<0){return!0}else if(left*2>width){}}
if(direction=='right'){if(windowWidth<left+width){return!0}else{}}
return!1}}}();if(typeof module!=='undefined'&&typeof module.exports!=='undefined'){module.exports=KTUtil}
KTUtil.ready(function(){if(typeof KTAppSettings!=='undefined'){KTUtil.init(KTAppSettings)}else{KTUtil.init()}});window.onload=function(){var result=KTUtil.getByTagName('body');if(result&&result[0]){KTUtil.removeClass(result[0],'page-loading')}}
"use strict";var KTWizard=function(elementId,options){var the=this;var init=!1;var element=KTUtil.getById(elementId);var body=KTUtil.getBody();if(!element){return}
var defaultOptions={startStep:1,clickableSteps:!1};var Plugin={construct:function(options){if(KTUtil.data(element).has('wizard')){the=KTUtil.data(element).get('wizard')}else{Plugin.init(options);Plugin.build();KTUtil.data(element).set('wizard',the)}
return the},init:function(options){the.element=element;the.events=[];the.options=KTUtil.deepExtend({},defaultOptions,options);the.steps=KTUtil.findAll(element,'[data-wizard-type="step"]');the.btnSubmit=KTUtil.find(element,'[data-wizard-type="action-submit"]');the.btnNext=KTUtil.find(element,'[data-wizard-type="action-next"]');the.btnPrev=KTUtil.find(element,'[data-wizard-type="action-prev"]');the.btnLast=KTUtil.find(element,'[data-wizard-type="action-last"]');the.btnFirst=KTUtil.find(element,'[data-wizard-type="action-first"]');the.events=[];the.currentStep=1;the.stopped=!1;the.totalSteps=the.steps.length;if(the.options.startStep>1){Plugin.goTo(the.options.startStep)}
Plugin.updateUI()},build:function(){KTUtil.addEvent(the.btnNext,'click',function(e){e.preventDefault();Plugin.goTo(Plugin.getNextStep(),!0)});KTUtil.addEvent(the.btnPrev,'click',function(e){e.preventDefault();Plugin.goTo(Plugin.getPrevStep(),!0)});KTUtil.addEvent(the.btnFirst,'click',function(e){e.preventDefault();Plugin.goTo(Plugin.getFirstStep(),!0)});KTUtil.addEvent(the.btnLast,'click',function(e){e.preventDefault();Plugin.goTo(Plugin.getLastStep(),!0)});if(the.options.clickableSteps===!0){KTUtil.on(element,'[data-wizard-type="step"]','click',function(){var index=KTUtil.index(this)+1;if(index!==the.currentStep){Plugin.goTo(index,!0)}})}},goTo:function(number,eventHandle){if(number===the.currentStep||number>the.totalSteps||number<0){return}
if(number){number=parseInt(number)}else{number=Plugin.getNextStep()}
var callback;if(eventHandle===!0){if(number>the.currentStep){callback=Plugin.eventTrigger('beforeNext')}else{callback=Plugin.eventTrigger('beforePrev')}}
if(the.stopped===!0){the.stopped=!1;return}
if(callback!==!1){if(eventHandle===!0){Plugin.eventTrigger('beforeChange')}
the.currentStep=number;Plugin.updateUI();if(eventHandle===!0){Plugin.eventTrigger('change')}}
if(eventHandle===!0){if(number>the.startStep){Plugin.eventTrigger('afterNext')}else{Plugin.eventTrigger('afterPrev')}}
return the},stop:function(){the.stopped=!0},start:function(){the.stopped=!1},isLastStep:function(){return the.currentStep===the.totalSteps},isFirstStep:function(){return the.currentStep===1},isBetweenStep:function(){return Plugin.isLastStep()===!1&&Plugin.isFirstStep()===!1},updateUI:function(){var stepType='';var index=the.currentStep-1;if(Plugin.isLastStep()){stepType='last'}else if(Plugin.isFirstStep()){stepType='first'}else{stepType='between'}
KTUtil.attr(the.element,'data-wizard-state',stepType);var steps=KTUtil.findAll(the.element,'[data-wizard-type="step"]');if(steps&&steps.length>0){for(var i=0,len=steps.length;i<len;i++){if(i==index){KTUtil.attr(steps[i],'data-wizard-state','current')}else{if(i<index){KTUtil.attr(steps[i],'data-wizard-state','done')}else{KTUtil.attr(steps[i],'data-wizard-state','pending')}}}}
var stepsInfo=KTUtil.findAll(the.element,'[data-wizard-type="step-info"]');if(stepsInfo&&stepsInfo.length>0){for(var i=0,len=stepsInfo.length;i<len;i++){if(i==index){KTUtil.attr(stepsInfo[i],'data-wizard-state','current')}else{KTUtil.removeAttr(stepsInfo[i],'data-wizard-state')}}}
var stepsContent=KTUtil.findAll(the.element,'[data-wizard-type="step-content"]');if(stepsContent&&stepsContent.length>0){for(var i=0,len=stepsContent.length;i<len;i++){if(i==index){KTUtil.attr(stepsContent[i],'data-wizard-state','current')}else{KTUtil.removeAttr(stepsContent[i],'data-wizard-state')}}}},getNextStep:function(){if(the.totalSteps>=(the.currentStep+1)){return the.currentStep+1}else{return the.totalSteps}},getPrevStep:function(){if((the.currentStep-1)>=1){return the.currentStep-1}else{return 1}},eventTrigger:function(name,nested){for(var i=0;i<the.events.length;i++){var event=the.events[i];if(event.name==name){if(event.one==!0){if(event.fired==!1){the.events[i].fired=!0;return event.handler.call(this,the)}}else{return event.handler.call(this,the)}}}},addEvent:function(name,handler,one){the.events.push({name:name,handler:handler,one:one,fired:!1});return the}};the.setDefaults=function(options){defaultOptions=options};the.goNext=function(eventHandle){return Plugin.goTo(Plugin.getNextStep(),eventHandle)};the.goPrev=function(eventHandle){return Plugin.goTo(Plugin.getPrevStep(),eventHandle)};the.goLast=function(eventHandle){return Plugin.goTo(Plugin.getLastStep(),eventHandle)};the.goFirst=function(eventHandle){return Plugin.goTo(Plugin.getFirstStep(),eventHandle)};the.goTo=function(number,eventHandle){return Plugin.goTo(number,eventHandle)};the.stop=function(){return Plugin.stop()};the.start=function(){return Plugin.start()};the.getStep=function(){return the.currentStep};the.isLastStep=function(){return Plugin.isLastStep()};the.isFirstStep=function(){return Plugin.isFirstStep()};the.on=function(name,handler){return Plugin.addEvent(name,handler)};the.one=function(name,handler){return Plugin.addEvent(name,handler,!0)};Plugin.construct.apply(the,[options]);return the};if(typeof module!=='undefined'&&typeof module.exports!=='undefined'){module.exports=KTWizard}
'use strict';(function($){var pluginName='KTDatatable';var pfx='';var util=KTUtil;var app=KTApp;if(typeof util==='undefined')throw new Error('Util class is required and must be included before '+pluginName);$.fn[pluginName]=function(options){if($(this).length===0){console.warn('No '+pluginName+' element exist.');return}
var datatable=this;datatable.debug=!1;datatable.API={record:null,value:null,params:null,};var Plugin={isInit:!1,cellOffset:110,iconOffset:15,stateId:'meta',ajaxParams:{},pagingObject:{},init:function(options){var isHtmlTable=!1;if(options.data.source===null){Plugin.extractTable();isHtmlTable=!0}
Plugin.setupBaseDOM.call();Plugin.setupDOM(datatable.table);$(datatable).on(pfx+'datatable-on-layout-updated',Plugin.afterRender);if(datatable.debug){Plugin.stateRemove(Plugin.stateId)}
Plugin.setDataSourceQuery(Plugin.getOption('data.source.read.params.query'));$.each(Plugin.getOption('extensions'),function(extName,extOptions){if(typeof $.fn[pluginName][extName]==='function'){if(typeof extOptions!=='object'){extOptions=$.extend({},extOptions)}
new $.fn[pluginName][extName](datatable,extOptions)}});Plugin.spinnerCallback(!0);if(options.data.type==='remote'||options.data.type==='local'){if(options.data.saveState===!1){Plugin.stateRemove(Plugin.stateId)}
if(options.data.type==='local'&&typeof options.data.source==='object'){datatable.dataSet=datatable.originalDataSet=Plugin.dataMapCallback(options.data.source)}
Plugin.dataRender()}
if(isHtmlTable){$(datatable.tableHead).find('tr').remove();$(datatable.tableFoot).find('tr').remove()}
Plugin.setHeadTitle();if(Plugin.getOption('layout.footer')){Plugin.setHeadTitle(datatable.tableFoot)}
if(typeof options.layout.header!=='undefined'&&options.layout.header===!1){$(datatable.table).find('thead').remove()}
if(typeof options.layout.footer!=='undefined'&&options.layout.footer===!1){$(datatable.table).find('tfoot').remove()}
if(options.data.type===null||options.data.type==='local'){Plugin.setupCellField.call();Plugin.setupTemplateCell.call();Plugin.setupSubDatatable.call();Plugin.setupSystemColumn.call();Plugin.redraw()}
var width;var initialWidth=!1;$(window).resize(function(){if($(this).width()!==width){width=$(this).width();Plugin.fullRender()}
if(!initialWidth){width=$(this).width();initialWidth=!0}});$(datatable).height('');var prevKeyword='';$(Plugin.getOption('search.input')).on('keyup',function(e){if(Plugin.getOption('search.onEnter')&&e.which!==13)return;var keyword=$(this).val();if(prevKeyword!==keyword){Plugin.search(keyword);prevKeyword=keyword}});return datatable},extractTable:function(){var columns=[];var headers=$(datatable).find('tr:first-child th').get().map(function(cell,i){var field=$(cell).data('field');var title=$(cell).data('title');if(typeof field==='undefined'){field=$(cell).text().trim()}
if(typeof title==='undefined'){title=$(cell).text().trim()}
var column={field:field,title:title};for(var ii in options.columns){if(options.columns[ii].field===field){column=$.extend(!0,{},options.columns[ii],column)}}
columns.push(column);return field});options.columns=columns;var rowProp=[];var source=[];$(datatable).find('tr').each(function(){if($(this).find('td').length){rowProp.push($(this).prop('attributes'))}
var td={};$(this).find('td').each(function(i,cell){td[headers[i]]=cell.innerHTML.trim()});if(!util.isEmpty(td)){source.push(td)}});options.data.attr.rowProps=rowProp;options.data.source=source},layoutUpdate:function(){Plugin.setupSubDatatable.call();Plugin.setupSystemColumn.call();Plugin.setupHover.call();if(typeof options.detail==='undefined'&&Plugin.getDepth()===1){Plugin.lockTable.call()}
Plugin.resetScroll();if(!Plugin.isLocked()){Plugin.redraw.call();if(!Plugin.isSubtable()&&Plugin.getOption('rows.autoHide')===!0){Plugin.autoHide()}
$(datatable.table).find('.'+pfx+'datatable-row').css('height','')}
Plugin.columnHide.call();Plugin.rowEvenOdd.call();Plugin.sorting.call();Plugin.scrollbar.call();if(!Plugin.isInit){Plugin.dropdownFix();$(datatable).trigger(pfx+'datatable-on-init',{table:$(datatable.wrap).attr('id'),options:options});Plugin.isInit=!0}
$(datatable).trigger(pfx+'datatable-on-layout-updated',{table:$(datatable.wrap).attr('id')})},dropdownFix:function(){var dropdownMenu;$('body').on('show.bs.dropdown','.'+pfx+'datatable .'+pfx+'datatable-body',function(e){dropdownMenu=$(e.target).find('.dropdown-menu');$('body').append(dropdownMenu.detach());dropdownMenu.css('display','block');dropdownMenu.position({'my':'right top','at':'right bottom','of':$(e.relatedTarget),});if(datatable.closest('.modal').length){dropdownMenu.css('z-index','2000')}}).on('hide.bs.dropdown','.'+pfx+'datatable .'+pfx+'datatable-body',function(e){$(e.target).append(dropdownMenu.detach());dropdownMenu.hide()});$(window).on('resize',function(e){if(typeof dropdownMenu!=='undefined'){dropdownMenu.hide()}})},lockTable:function(){var lock={lockEnabled:!1,init:function(){lock.lockEnabled=Plugin.lockEnabledColumns();if(lock.lockEnabled.left.length===0&&lock.lockEnabled.right.length===0){return}
lock.enable()},enable:function(){var enableLock=function(tablePart){if($(tablePart).find('.'+pfx+'datatable-lock').length>0){Plugin.log('Locked container already exist in: ',tablePart);return}
if($(tablePart).find('.'+pfx+'datatable-row').length===0){Plugin.log('No row exist in: ',tablePart);return}
var lockLeft=$('<div/>').addClass(pfx+'datatable-lock '+pfx+'datatable-lock-left');var lockScroll=$('<div/>').addClass(pfx+'datatable-lock '+pfx+'datatable-lock-scroll');var lockRight=$('<div/>').addClass(pfx+'datatable-lock '+pfx+'datatable-lock-right');$(tablePart).find('.'+pfx+'datatable-row').each(function(){var rowLeft=$('<tr/>').addClass(pfx+'datatable-row').data('obj',$(this).data('obj')).appendTo(lockLeft);var rowScroll=$('<tr/>').addClass(pfx+'datatable-row').data('obj',$(this).data('obj')).appendTo(lockScroll);var rowRight=$('<tr/>').addClass(pfx+'datatable-row').data('obj',$(this).data('obj')).appendTo(lockRight);$(this).find('.'+pfx+'datatable-cell').each(function(){var locked=$(this).data('locked');if(typeof locked!=='undefined'){if(typeof locked.left!=='undefined'||locked===!0){$(this).appendTo(rowLeft)}
if(typeof locked.right!=='undefined'){$(this).appendTo(rowRight)}}else{$(this).appendTo(rowScroll)}});$(this).remove()});if(lock.lockEnabled.left.length>0){$(datatable.wrap).addClass(pfx+'datatable-lock');$(lockLeft).appendTo(tablePart)}
if(lock.lockEnabled.left.length>0||lock.lockEnabled.right.length>0){$(lockScroll).appendTo(tablePart)}
if(lock.lockEnabled.right.length>0){$(datatable.wrap).addClass(pfx+'datatable-lock');$(lockRight).appendTo(tablePart)}};$(datatable.table).find('thead,tbody,tfoot').each(function(){var tablePart=this;if($(this).find('.'+pfx+'datatable-lock').length===0){$(this).ready(function(){enableLock(tablePart)})}})},};lock.init();return lock},fullRender:function(){$(datatable.tableHead).empty();Plugin.setHeadTitle();if(Plugin.getOption('layout.footer')){$(datatable.tableFoot).empty();Plugin.setHeadTitle(datatable.tableFoot)}
Plugin.spinnerCallback(!0);$(datatable.wrap).removeClass(pfx+'datatable-loaded');Plugin.insertData()},lockEnabledColumns:function(){var screen=$(window).width();var columns=options.columns;var enabled={left:[],right:[]};$.each(columns,function(i,column){if(typeof column.locked!=='undefined'){if(typeof column.locked.left!=='undefined'){if(util.getBreakpoint(column.locked.left)<=screen){enabled.left.push(column.locked.left)}}
if(typeof column.locked.right!=='undefined'){if(util.getBreakpoint(column.locked.right)<=screen){enabled.right.push(column.locked.right)}}}});return enabled},afterRender:function(e,args){$(datatable).ready(function(){if(Plugin.isLocked()){Plugin.redraw()}
$(datatable.tableBody).css('visibility','');$(datatable.wrap).addClass(pfx+'datatable-loaded');Plugin.spinnerCallback(!1)})},hoverTimer:0,isScrolling:!1,setupHover:function(){$(window).scroll(function(e){clearTimeout(Plugin.hoverTimer);Plugin.isScrolling=!0});$(datatable.tableBody).find('.'+pfx+'datatable-cell').off('mouseenter','mouseleave').on('mouseenter',function(){Plugin.hoverTimer=setTimeout(function(){Plugin.isScrolling=!1},200);if(Plugin.isScrolling)return;var row=$(this).closest('.'+pfx+'datatable-row').addClass(pfx+'datatable-row-hover');var index=$(row).index()+1;$(row).closest('.'+pfx+'datatable-lock').parent().find('.'+pfx+'datatable-row:nth-child('+index+')').addClass(pfx+'datatable-row-hover')}).on('mouseleave',function(){var row=$(this).closest('.'+pfx+'datatable-row').removeClass(pfx+'datatable-row-hover');var index=$(row).index()+1;$(row).closest('.'+pfx+'datatable-lock').parent().find('.'+pfx+'datatable-row:nth-child('+index+')').removeClass(pfx+'datatable-row-hover')})},adjustLockContainer:function(){if(!Plugin.isLocked())return 0;var containerWidth=$(datatable.tableHead).width();var lockLeft=$(datatable.tableHead).find('.'+pfx+'datatable-lock-left').width();var lockRight=$(datatable.tableHead).find('.'+pfx+'datatable-lock-right').width();if(typeof lockLeft==='undefined')lockLeft=0;if(typeof lockRight==='undefined')lockRight=0;var lockScroll=Math.floor(containerWidth-lockLeft-lockRight);$(datatable.table).find('.'+pfx+'datatable-lock-scroll').css('width',lockScroll);return lockScroll},dragResize:function(){var pressed=!1;var start=undefined;var startX,startWidth;$(datatable.tableHead).find('.'+pfx+'datatable-cell').mousedown(function(e){start=$(this);pressed=!0;startX=e.pageX;startWidth=$(this).width();$(start).addClass(pfx+'datatable-cell-resizing')}).mousemove(function(e){if(pressed){var i=$(start).index();var tableBody=$(datatable.tableBody);var ifLocked=$(start).closest('.'+pfx+'datatable-lock');if(ifLocked){var lockedIndex=$(ifLocked).index();tableBody=$(datatable.tableBody).find('.'+pfx+'datatable-lock').eq(lockedIndex)}
$(tableBody).find('.'+pfx+'datatable-row').each(function(tri,tr){$(tr).find('.'+pfx+'datatable-cell').eq(i).width(startWidth+(e.pageX-startX)).children().width(startWidth+(e.pageX-startX))});$(start).children().css('width',startWidth+(e.pageX-startX))}}).mouseup(function(){$(start).removeClass(pfx+'datatable-cell-resizing');pressed=!1});$(document).mouseup(function(){$(start).removeClass(pfx+'datatable-cell-resizing');pressed=!1})},initHeight:function(){if(options.layout.height&&options.layout.scroll){var theadHeight=$(datatable.tableHead).find('.'+pfx+'datatable-row').outerHeight();var tfootHeight=$(datatable.tableFoot).find('.'+pfx+'datatable-row').outerHeight();var bodyHeight=options.layout.height;if(theadHeight>0){bodyHeight-=theadHeight}
if(tfootHeight>0){bodyHeight-=tfootHeight}
bodyHeight-=2;$(datatable.tableBody).css('max-height',Math.floor(parseFloat(bodyHeight)))}},setupBaseDOM:function(){datatable.initialDatatable=$(datatable).clone();if($(datatable).prop('tagName')==='TABLE'){datatable.table=$(datatable).removeClass(pfx+'datatable').addClass(pfx+'datatable-table');if($(datatable.table).parents('.'+pfx+'datatable').length===0){datatable.table.wrap($('<div/>').addClass(pfx+'datatable').addClass(pfx+'datatable-'+options.layout.theme));datatable.wrap=$(datatable.table).parent()}}else{datatable.wrap=$(datatable).addClass(pfx+'datatable').addClass(pfx+'datatable-'+options.layout.theme);datatable.table=$('<table/>').addClass(pfx+'datatable-table').appendTo(datatable)}
if(typeof options.layout.class!=='undefined'){$(datatable.wrap).addClass(options.layout.class)}
$(datatable.table).removeClass(pfx+'datatable-destroyed').css('display','block');if(typeof $(datatable).attr('id')==='undefined'){Plugin.setOption('data.saveState',!1);$(datatable.table).attr('id',util.getUniqueID(pfx+'datatable-'))}
if(Plugin.getOption('layout.minHeight'))
$(datatable.table).css('min-height',Plugin.getOption('layout.minHeight'));if(Plugin.getOption('layout.height'))
$(datatable.table).css('max-height',Plugin.getOption('layout.height'));if(options.data.type===null){$(datatable.table).css('width','').css('display','')}
datatable.tableHead=$(datatable.table).find('thead');if($(datatable.tableHead).length===0){datatable.tableHead=$('<thead/>').prependTo(datatable.table)}
datatable.tableBody=$(datatable.table).find('tbody');if($(datatable.tableBody).length===0){datatable.tableBody=$('<tbody/>').appendTo(datatable.table)}
if(typeof options.layout.footer!=='undefined'&&options.layout.footer){datatable.tableFoot=$(datatable.table).find('tfoot');if($(datatable.tableFoot).length===0){datatable.tableFoot=$('<tfoot/>').appendTo(datatable.table)}}},setupCellField:function(tableParts){if(typeof tableParts==='undefined')tableParts=$(datatable.table).children();var columns=options.columns;$.each(tableParts,function(part,tablePart){$(tablePart).find('.'+pfx+'datatable-row').each(function(tri,tr){$(tr).find('.'+pfx+'datatable-cell').each(function(tdi,td){if(typeof columns[tdi]!=='undefined'){$(td).data(columns[tdi])}})})})},setupTemplateCell:function(tablePart){if(typeof tablePart==='undefined')tablePart=datatable.tableBody;var columns=options.columns;$(tablePart).find('.'+pfx+'datatable-row').each(function(tri,tr){var obj=$(tr).data('obj');if(typeof obj==='undefined'){return}
var rowCallback=Plugin.getOption('rows.callback');if(typeof rowCallback==='function'){rowCallback($(tr),obj,tri)}
var beforeTemplate=Plugin.getOption('rows.beforeTemplate');if(typeof beforeTemplate==='function'){beforeTemplate($(tr),obj,tri)}
if(typeof obj==='undefined'){obj={};$(tr).find('.'+pfx+'datatable-cell').each(function(tdi,td){var column=$.grep(columns,function(n,i){return $(td).data('field')===n.field})[0];if(typeof column!=='undefined'){obj[column.field]=$(td).text()}})}
$(tr).find('.'+pfx+'datatable-cell').each(function(tdi,td){var column=$.grep(columns,function(n,i){return $(td).data('field')===n.field})[0];if(typeof column!=='undefined'){if(typeof column.template!=='undefined'){var finalValue='';if(typeof column.template==='string'){finalValue=Plugin.dataPlaceholder(column.template,obj)}
if(typeof column.template==='function'){finalValue=column.template(obj,tri,datatable)}
if(typeof DOMPurify!=='undefined'){finalValue=DOMPurify.sanitize(finalValue)}
var span=document.createElement('span');span.innerHTML=finalValue;$(td).html(span);if(typeof column.overflow!=='undefined'){$(span).css('overflow',column.overflow);$(span).css('position','relative')}}}});var afterTemplate=Plugin.getOption('rows.afterTemplate');if(typeof afterTemplate==='function'){afterTemplate($(tr),obj,tri)}})},setupSystemColumn:function(){datatable.dataSet=datatable.dataSet||[];if(datatable.dataSet.length===0)return;var columns=options.columns;$(datatable.tableBody).find('.'+pfx+'datatable-row').each(function(tri,tr){$(tr).find('.'+pfx+'datatable-cell').each(function(tdi,td){var column=$.grep(columns,function(n,i){return $(td).data('field')===n.field})[0];if(typeof column!=='undefined'){var value=$(td).text();if(typeof column.selector!=='undefined'&&column.selector!==!1){if($(td).find('.'+pfx+'checkbox [type="checkbox"]').length>0)return;$(td).addClass(pfx+'datatable-cell-check');var chk=$('<label/>').addClass(pfx+'checkbox '+pfx+'checkbox-single').append($('<input/>').attr('type','checkbox').attr('value',value).on('click',function(){if($(this).is(':checked')){Plugin.setActive(this)}else{Plugin.setInactive(this)}})).append('&nbsp;<span></span>');if(typeof column.selector.class!=='undefined'){$(chk).addClass(column.selector.class)}
$(td).children().html(chk)}
if(typeof column.subtable!=='undefined'&&column.subtable){if($(td).find('.'+pfx+'datatable-toggle-subtable').length>0)return;$(td).children().html($('<a/>').addClass(pfx+'datatable-toggle-subtable').attr('href','#').attr('data-value',value).append($('<i/>').addClass(Plugin.getOption('layout.icons.rowDetail.collapse'))))}}})});var initCheckbox=function(tr){var column=$.grep(columns,function(n,i){return typeof n.selector!=='undefined'&&n.selector!==!1})[0];if(typeof column!=='undefined'){if(typeof column.selector!=='undefined'&&column.selector!==!1){var td=$(tr).find('[data-field="'+column.field+'"]');if($(td).find('.'+pfx+'checkbox [type="checkbox"]').length>0)return;$(td).addClass(pfx+'datatable-cell-check');var chk=$('<label/>').addClass(pfx+'checkbox '+pfx+'checkbox-single '+pfx+'checkbox-all').append($('<input/>').attr('type','checkbox').on('click',function(){if($(this).is(':checked')){Plugin.setActiveAll(!0)}else{Plugin.setActiveAll(!1)}})).append('&nbsp;<span></span>');if(typeof column.selector.class!=='undefined'){$(chk).addClass(column.selector.class)}
$(td).children().html(chk)}}};if(options.layout.header){initCheckbox($(datatable.tableHead).find('.'+pfx+'datatable-row').first())}
if(options.layout.footer){initCheckbox($(datatable.tableFoot).find('.'+pfx+'datatable-row').first())}},maxWidthList:{},adjustCellsWidth:function(){var containerWidth=$(datatable.tableBody).innerWidth()-Plugin.iconOffset;var columns=$(datatable.tableBody).find('.'+pfx+'datatable-row:first-child').find('.'+pfx+'datatable-cell').not('.'+pfx+'datatable-toggle-detail').not(':hidden').length;if(columns>0){containerWidth=containerWidth-(Plugin.iconOffset*columns);var minWidth=Math.floor(containerWidth/columns);if(minWidth<=Plugin.cellOffset){minWidth=Plugin.cellOffset}
$(datatable.table).find('.'+pfx+'datatable-row').find('.'+pfx+'datatable-cell').not('.'+pfx+'datatable-toggle-detail').not(':hidden').each(function(tdi,td){var width=minWidth;var dataWidth=$(td).data('width');if(typeof dataWidth!=='undefined'){if(dataWidth==='auto'){var field=$(td).data('field');if(Plugin.maxWidthList[field]){width=Plugin.maxWidthList[field]}else{var cells=$(datatable.table).find('.'+pfx+'datatable-cell[data-field="'+field+'"]');width=Plugin.maxWidthList[field]=Math.max.apply(null,$(cells).map(function(){return $(this).outerWidth()}).get())}}else{width=dataWidth}}
$(td).children().css('width',Math.ceil(width))})}
return datatable},adjustCellsHeight:function(){$.each($(datatable.table).children(),function(part,tablePart){var totalRows=$(tablePart).find('.'+pfx+'datatable-row').first().parent().find('.'+pfx+'datatable-row').length;for(var i=1;i<=totalRows;i++){var rows=$(tablePart).find('.'+pfx+'datatable-row:nth-child('+i+')');if($(rows).length>0){var maxHeight=Math.max.apply(null,$(rows).map(function(){return $(this).outerHeight()}).get());$(rows).css('height',Math.ceil(maxHeight))}}})},setupDOM:function(table){$(table).find('> thead').addClass(pfx+'datatable-head');$(table).find('> tbody').addClass(pfx+'datatable-body');$(table).find('> tfoot').addClass(pfx+'datatable-foot');$(table).find('tr').addClass(pfx+'datatable-row');$(table).find('tr > th, tr > td').addClass(pfx+'datatable-cell');$(table).find('tr > th, tr > td').each(function(i,td){if($(td).find('span').length===0){$(td).wrapInner($('<span/>').css('width',Plugin.cellOffset))}})},scrollbar:function(){var scroll={scrollable:null,tableLocked:null,initPosition:null,init:function(){var screen=util.getViewPort().width;if(options.layout.scroll){$(datatable.wrap).addClass(pfx+'datatable-scroll');var scrollable=$(datatable.tableBody).find('.'+pfx+'datatable-lock-scroll');if($(scrollable).find('.'+pfx+'datatable-row').length>0&&$(scrollable).length>0){scroll.scrollHead=$(datatable.tableHead).find('> .'+pfx+'datatable-lock-scroll > .'+pfx+'datatable-row');scroll.scrollFoot=$(datatable.tableFoot).find('> .'+pfx+'datatable-lock-scroll > .'+pfx+'datatable-row');scroll.tableLocked=$(datatable.tableBody).find('.'+pfx+'datatable-lock:not(.'+pfx+'datatable-lock-scroll)');if(Plugin.getOption('layout.customScrollbar')&&util.detectIE()!=10&&screen>util.getBreakpoint('lg')){scroll.initCustomScrollbar(scrollable[0])}else{scroll.initDefaultScrollbar(scrollable)}}else if($(datatable.tableBody).find('.'+pfx+'datatable-row').length>0){scroll.scrollHead=$(datatable.tableHead).find('> .'+pfx+'datatable-row');scroll.scrollFoot=$(datatable.tableFoot).find('> .'+pfx+'datatable-row');if(Plugin.getOption('layout.customScrollbar')&&util.detectIE()!=10&&screen>util.getBreakpoint('lg')){scroll.initCustomScrollbar(datatable.tableBody)}else{scroll.initDefaultScrollbar(datatable.tableBody)}}}},initDefaultScrollbar:function(scrollable){scroll.initPosition=$(scrollable).scrollLeft();$(scrollable).css('overflow-y','auto').off().on('scroll',scroll.onScrolling);$(scrollable).css('overflow-x','auto')},onScrolling:function(e){var left=$(this).scrollLeft();var top=$(this).scrollTop();if(util.isRTL()){left=left-scroll.initPosition}
$(scroll.scrollHead).css('left',-left);$(scroll.scrollFoot).css('left',-left);$(scroll.tableLocked).each(function(i,table){if(Plugin.isLocked()){top-=1}
$(table).css('top',-top)})},initCustomScrollbar:function(scrollable){scroll.scrollable=scrollable;Plugin.initScrollbar(scrollable);scroll.initPosition=$(scrollable).scrollLeft();$(scrollable).off().on('scroll',scroll.onScrolling)},};scroll.init();return scroll},initScrollbar:function(element,options){if(!element||!element.nodeName){return}
$(datatable.tableBody).css('overflow','');var ps=$(element).data('ps');if(util.hasClass(element,'ps')&&typeof ps!=='undefined'){ps.update()}else{ps=new PerfectScrollbar(element,Object.assign({},{wheelSpeed:0.5,swipeEasing:!0,minScrollbarLength:40,maxScrollbarLength:300,suppressScrollX:Plugin.getOption('rows.autoHide')&&!Plugin.isLocked()},options));$(element).data('ps',ps)}
$(window).resize(function(){ps.update()})},setHeadTitle:function(tablePart){if(typeof tablePart==='undefined')tablePart=datatable.tableHead;tablePart=$(tablePart)[0];var columns=options.columns;var row=tablePart.getElementsByTagName('tr')[0];var ths=tablePart.getElementsByTagName('td');if(typeof row==='undefined'){row=document.createElement('tr');tablePart.appendChild(row)}
$.each(columns,function(i,column){var th=ths[i];if(typeof th==='undefined'){th=document.createElement('th');row.appendChild(th)}
if(typeof column.title!=='undefined'){th.innerHTML=column.title;th.setAttribute('data-field',column.field);util.addClass(th,column.class);if(typeof column.autoHide!=='undefined'){if(column.autoHide!==!0){th.setAttribute('data-autohide-disabled',column.autoHide)}else{th.setAttribute('data-autohide-enabled',column.autoHide)}}
$(th).data(column)}
if(typeof column.attr!=='undefined'){$.each(column.attr,function(key,val){th.setAttribute(key,val)})}
if(typeof column.textAlign!=='undefined'){var align=typeof datatable.textAlign[column.textAlign]!=='undefined'?datatable.textAlign[column.textAlign]:'';util.addClass(th,align)}});Plugin.setupDOM(tablePart)},dataRender:function(action){$(datatable.table).siblings('.'+pfx+'datatable-pager').removeClass(pfx+'datatable-paging-loaded');var buildMeta=function(){datatable.dataSet=datatable.dataSet||[];Plugin.localDataUpdate();var meta=Plugin.getDataSourceParam('pagination');if(meta.perpage===0){meta.perpage=options.data.pageSize||10}
meta.total=datatable.dataSet.length;var start=Math.max(meta.perpage*(meta.page-1),0);var end=Math.min(start+meta.perpage,meta.total);datatable.dataSet=$(datatable.dataSet).slice(start,end);return meta};var afterGetData=function(result){var localPagingCallback=function(ctx,meta){if(!$(ctx.pager).hasClass(pfx+'datatable-paging-loaded')){$(ctx.pager).remove();ctx.init(meta)}
$(ctx.pager).off().on(pfx+'datatable-on-goto-page',function(e){$(ctx.pager).remove();ctx.init(meta)});var start=Math.max(meta.perpage*(meta.page-1),0);var end=Math.min(start+meta.perpage,meta.total);Plugin.localDataUpdate();datatable.dataSet=$(datatable.dataSet).slice(start,end);Plugin.insertData()};$(datatable.wrap).removeClass(pfx+'datatable-error');if(options.pagination){if(options.data.serverPaging&&options.data.type!=='local'){var serverMeta=Plugin.getObject('meta',result||null);if(serverMeta!==null){Plugin.pagingObject=Plugin.paging(serverMeta)}else{Plugin.pagingObject=Plugin.paging(buildMeta(),localPagingCallback)}}else{Plugin.pagingObject=Plugin.paging(buildMeta(),localPagingCallback)}}else{Plugin.localDataUpdate()}
Plugin.insertData()};if(options.data.type==='local'||options.data.serverSorting===!1&&action==='sort'||options.data.serverFiltering===!1&&action==='search'){setTimeout(function(){afterGetData();Plugin.setAutoColumns()});return}
Plugin.getData().done(afterGetData)},insertData:function(){datatable.dataSet=datatable.dataSet||[];var params=Plugin.getDataSourceParam();var pagination=params.pagination;var start=(Math.max(pagination.page,1)-1)*pagination.perpage;var end=Math.min(pagination.page,pagination.pages)*pagination.perpage;var rowProps={};if(typeof options.data.attr.rowProps!=='undefined'&&options.data.attr.rowProps.length){rowProps=options.data.attr.rowProps.slice(start,end)}
var tableBody=document.createElement('tbody');tableBody.style.visibility='hidden';var colLength=options.columns.length;$.each(datatable.dataSet,function(rowIndex,row){var tr=document.createElement('tr');tr.setAttribute('data-row',rowIndex);$(tr).data('obj',row);if(typeof rowProps[rowIndex]!=='undefined'){$.each(rowProps[rowIndex],function(){tr.setAttribute(this.name,this.value)})}
var cellIndex=0;var tds=[];for(var a=0;a<colLength;a+=1){var column=options.columns[a];var classes=[];if(Plugin.getObject('sort.field',params)===column.field){classes.push(pfx+'datatable-cell-sorted')}
if(typeof column.textAlign!=='undefined'){var align=typeof datatable.textAlign[column.textAlign]!=='undefined'?datatable.textAlign[column.textAlign]:'';classes.push(align)}
if(typeof column.class!=='undefined'){classes.push(column.class)}
var td=document.createElement('td');util.addClass(td,classes.join(' '));td.setAttribute('data-field',column.field);if(typeof column.autoHide!=='undefined'){if(column.autoHide!==!0){td.setAttribute('data-autohide-disabled',column.autoHide)}else{td.setAttribute('data-autohide-enabled',column.autoHide)}}
td.innerHTML=Plugin.getObject(column.field,row);td.setAttribute('aria-label',Plugin.getObject(column.field,row));tr.appendChild(td)}
tableBody.appendChild(tr)});if(datatable.dataSet.length===0){var errorSpan=document.createElement('span');util.addClass(errorSpan,pfx+'datatable-error');errorSpan.innerHTML=Plugin.getOption('translate.records.noRecords');tableBody.appendChild(errorSpan);$(datatable.wrap).addClass(pfx+'datatable-error '+pfx+'datatable-loaded');Plugin.spinnerCallback(!1)}
$(datatable.tableBody).replaceWith(tableBody);datatable.tableBody=tableBody;Plugin.setupDOM(datatable.table);Plugin.setupCellField([datatable.tableBody]);Plugin.setupTemplateCell(datatable.tableBody);Plugin.layoutUpdate()},updateTableComponents:function(){datatable.tableHead=$(datatable.table).children('thead').get(0);datatable.tableBody=$(datatable.table).children('tbody').get(0);datatable.tableFoot=$(datatable.table).children('tfoot').get(0)},getData:function(){var ajaxParams={dataType:'json',method:'POST',data:{},timeout:Plugin.getOption('data.source.read.timeout')||30000,};if(options.data.type==='local'){ajaxParams.url=options.data.source}
if(options.data.type==='remote'){var data=Plugin.getDataSourceParam();if(!Plugin.getOption('data.serverPaging')){delete data.pagination}
if(!Plugin.getOption('data.serverSorting')){delete data.sort}
ajaxParams.data=$.extend({},ajaxParams.data,Plugin.getOption('data.source.read.params'),data);ajaxParams=$.extend({},ajaxParams,Plugin.getOption('data.source.read'));if(typeof ajaxParams.url!=='string')ajaxParams.url=Plugin.getOption('data.source.read');if(typeof ajaxParams.url!=='string')ajaxParams.url=Plugin.getOption('data.source')}
return $.ajax(ajaxParams).done(function(response,textStatus,jqXHR){datatable.lastResponse=response;datatable.dataSet=datatable.originalDataSet=Plugin.dataMapCallback(response);Plugin.setAutoColumns();$(datatable).trigger(pfx+'datatable-on-ajax-done',[datatable.dataSet])}).fail(function(jqXHR,textStatus,errorThrown){$(datatable).trigger(pfx+'datatable-on-ajax-fail',[jqXHR]);$(datatable.tableBody).html($('<span/>').addClass(pfx+'datatable-error').html(Plugin.getOption('translate.records.noRecords')));$(datatable.wrap).addClass(pfx+'datatable-error '+pfx+'datatable-loaded');Plugin.spinnerCallback(!1)}).always(function(){})},paging:function(meta,callback){var pg={meta:null,pager:null,paginateEvent:null,pagerLayout:{pagination:null,info:null},callback:null,init:function(meta){pg.meta=meta;pg.meta.page=parseInt(pg.meta.page);pg.meta.pages=parseInt(pg.meta.pages);pg.meta.perpage=parseInt(pg.meta.perpage);pg.meta.total=parseInt(pg.meta.total);pg.meta.pages=Math.max(Math.ceil(pg.meta.total/pg.meta.perpage),1);if(pg.meta.page>pg.meta.pages)pg.meta.page=pg.meta.pages;pg.paginateEvent=Plugin.getTablePrefix('paging');pg.pager=$(datatable.table).siblings('.'+pfx+'datatable-pager');if($(pg.pager).hasClass(pfx+'datatable-paging-loaded'))return;$(pg.pager).remove();if(pg.meta.pages===0)return;Plugin.setDataSourceParam('pagination',{page:pg.meta.page,pages:pg.meta.pages,perpage:pg.meta.perpage,total:pg.meta.total,});pg.callback=pg.serverCallback;if(typeof callback==='function')pg.callback=callback;pg.addPaginateEvent();pg.populate();pg.meta.page=Math.max(pg.meta.page||1,pg.meta.page);$(datatable).trigger(pg.paginateEvent,pg.meta);pg.pagingBreakpoint.call();$(window).resize(pg.pagingBreakpoint)},serverCallback:function(ctx,meta){Plugin.dataRender()},populate:function(){var icons=Plugin.getOption('layout.icons.pagination');var title=Plugin.getOption('translate.toolbar.pagination.items.default');pg.pager=$('<div/>').addClass(pfx+'datatable-pager '+pfx+'datatable-paging-loaded');var pagerNumber=$('<ul/>').addClass(pfx+'datatable-pager-nav mb-5 mb-sm-0');pg.pagerLayout.pagination=pagerNumber;$('<li/>').append($('<a/>').attr('title',title.first).addClass(pfx+'datatable-pager-link '+pfx+'datatable-pager-link-first').append($('<i/>').addClass(icons.first)).on('click',pg.gotoMorePage).attr('data-page',1)).appendTo(pagerNumber);$('<li/>').append($('<a/>').attr('title',title.prev).addClass(pfx+'datatable-pager-link '+pfx+'datatable-pager-link-prev').append($('<i/>').addClass(icons.prev)).on('click',pg.gotoMorePage)).appendTo(pagerNumber);$('<li/>').append($('<a/>').attr('title',title.more).addClass(pfx+'datatable-pager-link '+pfx+'datatable-pager-link-more-prev').html($('<i/>').addClass(icons.more)).on('click',pg.gotoMorePage)).appendTo(pagerNumber);$('<li/>').append($('<input/>').attr('type','text').addClass(pfx+'datatable-pager-input form-control').attr('title',title.input).on('keyup',function(){$(this).attr('data-page',Math.abs($(this).val()))}).on('keypress',function(e){if(e.which===13)pg.gotoMorePage(e)})).appendTo(pagerNumber);var pagesNumber=Plugin.getOption('toolbar.items.pagination.pages.desktop.pagesNumber');var end=Math.ceil(pg.meta.page/pagesNumber)*pagesNumber;var start=end-pagesNumber;if(end>pg.meta.pages){end=pg.meta.pages}
if(start<0){start=0}
for(var x=start;x<(end||1);x++){var pageNumber=x+1;$('<li/>').append($('<a/>').addClass(pfx+'datatable-pager-link '+pfx+'datatable-pager-link-number').text(pageNumber).attr('data-page',pageNumber).attr('title',pageNumber).on('click',pg.gotoPage)).appendTo(pagerNumber)}
$('<li/>').append($('<a/>').attr('title',title.more).addClass(pfx+'datatable-pager-link '+pfx+'datatable-pager-link-more-next').html($('<i/>').addClass(icons.more)).on('click',pg.gotoMorePage)).appendTo(pagerNumber);$('<li/>').append($('<a/>').attr('title',title.next).addClass(pfx+'datatable-pager-link '+pfx+'datatable-pager-link-next').append($('<i/>').addClass(icons.next)).on('click',pg.gotoMorePage)).appendTo(pagerNumber);$('<li/>').append($('<a/>').attr('title',title.last).addClass(pfx+'datatable-pager-link '+pfx+'datatable-pager-link-last').append($('<i/>').addClass(icons.last)).on('click',pg.gotoMorePage).attr('data-page',pg.meta.pages)).appendTo(pagerNumber);if(Plugin.getOption('toolbar.items.info')){pg.pagerLayout.info=$('<div/>').addClass(pfx+'datatable-pager-info').append($('<span/>').addClass(pfx+'datatable-pager-detail'))}
$.each(Plugin.getOption('toolbar.layout'),function(i,layout){$(pg.pagerLayout[layout]).appendTo(pg.pager)});var pageSizeSelect=$('<select/>').addClass('selectpicker '+pfx+'datatable-pager-size').attr('title',Plugin.getOption('translate.toolbar.pagination.items.default.select')).attr('data-width','60px').attr('data-container','body').val(pg.meta.perpage).on('change',pg.updatePerpage).prependTo(pg.pagerLayout.info);var pageSizes=Plugin.getOption('toolbar.items.pagination.pageSizeSelect');if(pageSizes.length==0)pageSizes=[5,10,20,30,50,100];$.each(pageSizes,function(i,size){var display=size;if(size===-1)display=Plugin.getOption('translate.toolbar.pagination.items.default.all');$('<option/>').attr('value',size).html(display).appendTo(pageSizeSelect)});$(datatable).ready(function(){$('.selectpicker').selectpicker().on('hide.bs.select',function(){$(this).closest('.bootstrap-select').removeClass('dropup')}).siblings('.dropdown-toggle').attr('title',Plugin.getOption('translate.toolbar.pagination.items.default.select'))});pg.paste()},paste:function(){$.each($.unique(Plugin.getOption('toolbar.placement')),function(i,position){if(position==='bottom'){$(pg.pager).clone(!0).insertAfter(datatable.table)}
if(position==='top'){$(pg.pager).clone(!0).addClass(pfx+'datatable-pager-top').insertBefore(datatable.table)}})},gotoMorePage:function(e){e.preventDefault();if($(this).attr('disabled')==='disabled')return!1;var page=$(this).attr('data-page');if(typeof page==='undefined'){page=$(e.target).attr('data-page')}
pg.openPage(parseInt(page));return!1},gotoPage:function(e){e.preventDefault();if($(this).hasClass(pfx+'datatable-pager-link-active'))return;pg.openPage(parseInt($(this).data('page')))},openPage:function(page){pg.meta.page=parseInt(page);$(datatable).trigger(pg.paginateEvent,pg.meta);pg.callback(pg,pg.meta);$(pg.pager).trigger(pfx+'datatable-on-goto-page',pg.meta)},updatePerpage:function(e){e.preventDefault();$(this).selectpicker('toggle');pg.pager=$(datatable.table).siblings('.'+pfx+'datatable-pager').removeClass(pfx+'datatable-paging-loaded');if(e.originalEvent){pg.meta.perpage=parseInt($(this).val())}
$(pg.pager).find('select.'+pfx+'datatable-pager-size').val(pg.meta.perpage).attr('data-selected',pg.meta.perpage);Plugin.setDataSourceParam('pagination',{page:pg.meta.page,pages:pg.meta.pages,perpage:pg.meta.perpage,total:pg.meta.total,});$(pg.pager).trigger(pfx+'datatable-on-update-perpage',pg.meta);$(datatable).trigger(pg.paginateEvent,pg.meta);pg.callback(pg,pg.meta);pg.updateInfo.call()},addPaginateEvent:function(e){$(datatable).off(pg.paginateEvent).on(pg.paginateEvent,function(e,meta){Plugin.spinnerCallback(!0);pg.pager=$(datatable.table).siblings('.'+pfx+'datatable-pager');var pagerNumber=$(pg.pager).find('.'+pfx+'datatable-pager-nav');$(pagerNumber).find('.'+pfx+'datatable-pager-link-active').removeClass(pfx+'datatable-pager-link-active');$(pagerNumber).find('.'+pfx+'datatable-pager-link-number[data-page="'+meta.page+'"]').addClass(pfx+'datatable-pager-link-active');$(pagerNumber).find('.'+pfx+'datatable-pager-link-prev').attr('data-page',Math.max(meta.page-1,1));$(pagerNumber).find('.'+pfx+'datatable-pager-link-next').attr('data-page',Math.min(meta.page+1,meta.pages));$(pg.pager).each(function(){$(this).find('.'+pfx+'datatable-pager-input[type="text"]').prop('value',meta.page)});Plugin.setDataSourceParam('pagination',{page:pg.meta.page,pages:pg.meta.pages,perpage:pg.meta.perpage,total:pg.meta.total,});$(pg.pager).find('select.'+pfx+'datatable-pager-size').val(meta.perpage).attr('data-selected',meta.perpage);$(datatable.table).find('.'+pfx+'checkbox > [type="checkbox"]').prop('checked',!1);$(datatable.table).find('.'+pfx+'datatable-row-active').removeClass(pfx+'datatable-row-active');pg.updateInfo.call();pg.pagingBreakpoint.call()})},updateInfo:function(){var start=Math.max(pg.meta.perpage*(pg.meta.page-1)+1,1);var end=Math.min(start+pg.meta.perpage-1,pg.meta.total);$(pg.pager).find('.'+pfx+'datatable-pager-info').find('.'+pfx+'datatable-pager-detail').html(Plugin.dataPlaceholder(Plugin.getOption('translate.toolbar.pagination.items.info'),{start:pg.meta.total===0?0:start,end:pg.meta.perpage===-1?pg.meta.total:end,pageSize:pg.meta.perpage===-1||pg.meta.perpage>=pg.meta.total?pg.meta.total:pg.meta.perpage,total:pg.meta.total,}))},pagingBreakpoint:function(){var pagerNumber=$(datatable.table).siblings('.'+pfx+'datatable-pager').find('.'+pfx+'datatable-pager-nav');if($(pagerNumber).length===0)return;var currentPage=Plugin.getCurrentPage();var pagerInput=$(pagerNumber).find('.'+pfx+'datatable-pager-input').closest('li');$(pagerNumber).find('li').show();$.each(Plugin.getOption('toolbar.items.pagination.pages'),function(mode,option){if(util.isInResponsiveRange(mode)){switch(mode){case 'desktop':case 'tablet':var end=Math.ceil(currentPage/option.pagesNumber)*option.pagesNumber;var start=end-option.pagesNumber;$(pagerInput).hide();pg.meta=Plugin.getDataSourceParam('pagination');pg.paginationUpdate();break;case 'mobile':$(pagerInput).show();$(pagerNumber).find('.'+pfx+'datatable-pager-link-more-prev').closest('li').hide();$(pagerNumber).find('.'+pfx+'datatable-pager-link-more-next').closest('li').hide();$(pagerNumber).find('.'+pfx+'datatable-pager-link-number').closest('li').hide();break}
return!1}})},paginationUpdate:function(){var pager=$(datatable.table).siblings('.'+pfx+'datatable-pager').find('.'+pfx+'datatable-pager-nav'),pagerMorePrev=$(pager).find('.'+pfx+'datatable-pager-link-more-prev'),pagerMoreNext=$(pager).find('.'+pfx+'datatable-pager-link-more-next'),pagerFirst=$(pager).find('.'+pfx+'datatable-pager-link-first'),pagerPrev=$(pager).find('.'+pfx+'datatable-pager-link-prev'),pagerNext=$(pager).find('.'+pfx+'datatable-pager-link-next'),pagerLast=$(pager).find('.'+pfx+'datatable-pager-link-last');var pagerNumber=$(pager).find('.'+pfx+'datatable-pager-link-number');var morePrevPage=Math.max($(pagerNumber).first().data('page')-1,1);$(pagerMorePrev).each(function(i,prev){$(prev).attr('data-page',morePrevPage)});if(morePrevPage===1){$(pagerMorePrev).parent().hide()}else{$(pagerMorePrev).parent().show()}
var moreNextPage=Math.min($(pagerNumber).last().data('page')+1,pg.meta.pages);$(pagerMoreNext).each(function(i,prev){$(pagerMoreNext).attr('data-page',moreNextPage).show()});if(moreNextPage===pg.meta.pages&&moreNextPage===$(pagerNumber).last().data('page')){$(pagerMoreNext).parent().hide()}else{$(pagerMoreNext).parent().show()}
if(pg.meta.page===1){$(pagerFirst).attr('disabled',!0).addClass(pfx+'datatable-pager-link-disabled');$(pagerPrev).attr('disabled',!0).addClass(pfx+'datatable-pager-link-disabled')}else{$(pagerFirst).removeAttr('disabled').removeClass(pfx+'datatable-pager-link-disabled');$(pagerPrev).removeAttr('disabled').removeClass(pfx+'datatable-pager-link-disabled')}
if(pg.meta.page===pg.meta.pages){$(pagerNext).attr('disabled',!0).addClass(pfx+'datatable-pager-link-disabled');$(pagerLast).attr('disabled',!0).addClass(pfx+'datatable-pager-link-disabled')}else{$(pagerNext).removeAttr('disabled').removeClass(pfx+'datatable-pager-link-disabled');$(pagerLast).removeAttr('disabled').removeClass(pfx+'datatable-pager-link-disabled')}
var nav=Plugin.getOption('toolbar.items.pagination.navigation');if(!nav.first)$(pagerFirst).remove();if(!nav.prev)$(pagerPrev).remove();if(!nav.next)$(pagerNext).remove();if(!nav.last)$(pagerLast).remove();if(!nav.more){$(pagerMorePrev).remove();$(pagerMoreNext).remove()}},};pg.init(meta);return pg},columnHide:function(){var screen=util.getViewPort().width;$.each(options.columns,function(i,column){if(typeof column.responsive!=='undefined'||typeof column.visible!=='undefined'){var field=column.field;var tds=$.grep($(datatable.table).find('.'+pfx+'datatable-cell'),function(n,i){return field===$(n).data('field')});setTimeout(function(){if(Plugin.getObject('visible',column)===!1){$(tds).hide()}else{if(util.getBreakpoint(Plugin.getObject('responsive.hidden',column))>=screen){$(tds).hide()}else{$(tds).show()}
if(util.getBreakpoint(Plugin.getObject('responsive.visible',column))<=screen){$(tds).show()}else{$(tds).hide()}}})}})},setupSubDatatable:function(){var subTableCallback=Plugin.getOption('detail.content');if(typeof subTableCallback!=='function')return;if($(datatable.table).find('.'+pfx+'datatable-subtable').length>0)return;$(datatable.wrap).addClass(pfx+'datatable-subtable');options.columns[0].subtable=!0;var toggleSubTable=function(e){e.preventDefault();var parentRow=$(this).closest('.'+pfx+'datatable-row');var subTableRow=$(parentRow).next('.'+pfx+'datatable-row-subtable');if($(subTableRow).length===0){subTableRow=$('<tr/>').addClass(pfx+'datatable-row-subtable '+pfx+'datatable-row-loading').hide().append($('<td/>').addClass(pfx+'datatable-subtable').attr('colspan',Plugin.getTotalColumns()));$(parentRow).after(subTableRow);if($(parentRow).hasClass(pfx+'datatable-row-even')){$(subTableRow).addClass(pfx+'datatable-row-subtable-even')}}
$(subTableRow).toggle();var subTable=$(subTableRow).find('.'+pfx+'datatable-subtable');var primaryKey=$(this).closest('[data-field]:first-child').find('.'+pfx+'datatable-toggle-subtable').data('value');var icon=$(this).find('i').removeAttr('class');if($(parentRow).hasClass(pfx+'datatable-row-subtable-expanded')){$(icon).addClass(Plugin.getOption('layout.icons.rowDetail.collapse'));$(parentRow).removeClass(pfx+'datatable-row-subtable-expanded');$(datatable).trigger(pfx+'datatable-on-collapse-subtable',[parentRow])}else{$(icon).addClass(Plugin.getOption('layout.icons.rowDetail.expand'));$(parentRow).addClass(pfx+'datatable-row-subtable-expanded');$(datatable).trigger(pfx+'datatable-on-expand-subtable',[parentRow])}
if($(subTable).find('.'+pfx+'datatable').length===0){$.map(datatable.dataSet,function(n,i){if(primaryKey===n[options.columns[0].field]){e.data=n;return!0}
return!1});e.detailCell=subTable;e.parentRow=parentRow;e.subTable=subTable;subTableCallback(e);$(subTable).children('.'+pfx+'datatable').on(pfx+'datatable-on-init',function(e){$(subTableRow).removeClass(pfx+'datatable-row-loading')});if(Plugin.getOption('data.type')==='local'){$(subTableRow).removeClass(pfx+'datatable-row-loading')}}};var columns=options.columns;$(datatable.tableBody).find('.'+pfx+'datatable-row').each(function(tri,tr){$(tr).find('.'+pfx+'datatable-cell').each(function(tdi,td){var column=$.grep(columns,function(n,i){return $(td).data('field')===n.field})[0];if(typeof column!=='undefined'){var value=$(td).text();if(typeof column.subtable!=='undefined'&&column.subtable){if($(td).find('.'+pfx+'datatable-toggle-subtable').length>0)return;$(td).html($('<a/>').addClass(pfx+'datatable-toggle-subtable').attr('href','#').attr('data-value',value).attr('title',Plugin.getOption('detail.title')).on('click',toggleSubTable).append($('<i/>').css('width',$(td).data('width')).addClass(Plugin.getOption('layout.icons.rowDetail.collapse'))))}}})})},dataMapCallback:function(raw){var dataSet=raw;if(typeof Plugin.getOption('data.source.read.map')==='function'){return Plugin.getOption('data.source.read.map')(raw)}else{if(typeof raw!=='undefined'&&typeof raw.data!=='undefined'){dataSet=raw.data}}
return dataSet},isSpinning:!1,spinnerCallback:function(block,target){if(typeof target==='undefined')target=datatable;var spinnerOptions=Plugin.getOption('layout.spinner');if(typeof spinnerOptions==='undefined'||!spinnerOptions){return}
if(block){if(!Plugin.isSpinning){if(typeof spinnerOptions.message!=='undefined'&&spinnerOptions.message===!0){spinnerOptions.message=Plugin.getOption('translate.records.processing')}
Plugin.isSpinning=!0;if(typeof app!=='undefined'){app.block(target,spinnerOptions)}}}else{Plugin.isSpinning=!1;if(typeof app!=='undefined'){app.unblock(target)}}},sortCallback:function(data,sort,column){var type=column.type||'string';var format=column.format||'';var field=column.field;return $(data).sort(function(a,b){var aField=a[field];var bField=b[field];switch(type){case 'date':if(typeof moment==='undefined'){throw new Error('Moment.js is required.')}
var diff=moment(aField,format).diff(moment(bField,format));if(sort==='asc'){return diff>0?1:diff<0?-1:0}else{return diff<0?1:diff>0?-1:0}
break;case 'number':if(isNaN(parseFloat(aField))&&aField!=null){aField=Number(aField.replace(/[^0-9\.-]+/g,''))}
if(isNaN(parseFloat(bField))&&bField!=null){bField=Number(bField.replace(/[^0-9\.-]+/g,''))}
aField=parseFloat(aField);bField=parseFloat(bField);if(sort==='asc'){return aField>bField?1:aField<bField?-1:0}else{return aField<bField?1:aField>bField?-1:0}
break;case 'html':return $(data).sort(function(a,b){aField=$(a[field]).text();bField=$(b[field]).text();if(sort==='asc'){return aField>bField?1:aField<bField?-1:0}else{return aField<bField?1:aField>bField?-1:0}});break;case 'string':default:if(sort==='asc'){return aField>bField?1:aField<bField?-1:0}else{return aField<bField?1:aField>bField?-1:0}
break}})},log:function(text,obj){if(typeof obj==='undefined')obj='';if(datatable.debug){console.log(text,obj)}},autoHide:function(){var hiddenExist=!1;var hidDefault=$(datatable.table).find('[data-autohide-enabled]');if(hidDefault.length){hiddenExist=!0;hidDefault.hide()}
var toggleHiddenColumns=function(e){e.preventDefault();var row=$(this).closest('.'+pfx+'datatable-row');var detailRow=$(row).next();if(!$(detailRow).hasClass(pfx+'datatable-row-detail')){$(this).find('i').removeClass(Plugin.getOption('layout.icons.rowDetail.collapse')).addClass(Plugin.getOption('layout.icons.rowDetail.expand'));var hiddenCells=$(row).find('.'+pfx+'datatable-cell:hidden');var clonedCells=hiddenCells.clone().show();detailRow=$('<tr/>').addClass(pfx+'datatable-row-detail').insertAfter(row);var detailRowTd=$('<td/>').addClass(pfx+'datatable-detail').attr('colspan',Plugin.getTotalColumns()).appendTo(detailRow);var detailSubTable=$('<table/>');$(clonedCells).each(function(){var field=$(this).data('field');var column=$.grep(options.columns,function(n,i){return field===n.field})[0];if(typeof column==='undefined'||column.visible!==!1){$(detailSubTable).append($('<tr class="'+pfx+'datatable-row"></tr>').append($('<td class="'+pfx+'datatable-cell"></td>').append($('<span/>').append(column.title))).append(this))}});$(detailRowTd).append(detailSubTable)}else{$(this).find('i').removeClass(Plugin.getOption('layout.icons.rowDetail.expand')).addClass(Plugin.getOption('layout.icons.rowDetail.collapse'));$(detailRow).remove()}};setTimeout(function(){$(datatable.table).find('.'+pfx+'datatable-cell').show();$(datatable.tableBody).each(function(){var recursive=0;while($(this)[0].offsetWidth<$(this)[0].scrollWidth&&recursive<options.columns.length){$(datatable.table).find('.'+pfx+'datatable-row').each(function(i){var cell=$(this).find('.'+pfx+'datatable-cell:not(:hidden):not([data-autohide-disabled])').last();$(cell).hide();hiddenExist=!0});recursive++}});if(hiddenExist){$(datatable.tableBody).find('.'+pfx+'datatable-row').each(function(){if($(this).find('.'+pfx+'datatable-toggle-detail').length===0){$(this).prepend($('<td/>').addClass(pfx+'datatable-cell '+pfx+'datatable-toggle-detail').append($('<a/>').addClass(pfx+'datatable-toggle-detail').attr('href','').on('click',toggleHiddenColumns).append('<i class="'+Plugin.getOption('layout.icons.rowDetail.collapse')+'"></i>')))}
if($(datatable.tableHead).find('.'+pfx+'datatable-toggle-detail').length===0){$(datatable.tableHead).find('.'+pfx+'datatable-row').first().prepend('<th class="'+pfx+'datatable-cell '+pfx+'datatable-toggle-detail"><span></span></th>');$(datatable.tableFoot).find('.'+pfx+'datatable-row').first().prepend('<th class="'+pfx+'datatable-cell '+pfx+'datatable-toggle-detail"><span></span></th>')}else{$(datatable.tableHead).find('.'+pfx+'datatable-toggle-detail').find('span')}})}});Plugin.adjustCellsWidth.call()},setAutoColumns:function(){if(Plugin.getOption('data.autoColumns')){$.each(datatable.dataSet[0],function(k,v){var found=$.grep(options.columns,function(n,i){return k===n.field});if(found.length===0){options.columns.push({field:k,title:k})}});$(datatable.tableHead).find('.'+pfx+'datatable-row').remove();Plugin.setHeadTitle();if(Plugin.getOption('layout.footer')){$(datatable.tableFoot).find('.'+pfx+'datatable-row').remove();Plugin.setHeadTitle(datatable.tableFoot)}}},isLocked:function(){var isLocked=Plugin.lockEnabledColumns();return isLocked.left.length>0||isLocked.right.length>0},isSubtable:function(){return util.hasClass(datatable.wrap[0],pfx+'datatable-subtable')||!1},getExtraSpace:function(element){var padding=parseInt($(element).css('paddingRight'))+parseInt($(element).css('paddingLeft'));var margin=parseInt($(element).css('marginRight'))+parseInt($(element).css('marginLeft'));var border=Math.ceil($(element).css('border-right-width').replace('px',''));return padding+margin+border},dataPlaceholder:function(template,data){var result=template;$.each(data,function(key,val){result=result.replace('{{'+key+'}}',val)});return result},getTableId:function(suffix){if(typeof suffix==='undefined')suffix='';var id=$(datatable).attr('id');if(typeof id==='undefined'){id=$(datatable).attr('class').split(' ')[0]}
return id+suffix},getTablePrefix:function(suffix){if(typeof suffix!=='undefined')suffix='-'+suffix;return Plugin.getTableId()+'-'+Plugin.getDepth()+suffix},getDepth:function(){var depth=0;var table=datatable.table;do{table=$(table).parents('.'+pfx+'datatable-table');depth++}while($(table).length>0);return depth},stateKeep:function(key,value){key=Plugin.getTablePrefix(key);if(Plugin.getOption('data.saveState')===!1)return;if(localStorage){localStorage.setItem(key,JSON.stringify(value))}},stateGet:function(key,defValue){key=Plugin.getTablePrefix(key);if(Plugin.getOption('data.saveState')===!1)return;var value=null;if(localStorage){value=localStorage.getItem(key)}
if(typeof value!=='undefined'&&value!==null){return JSON.parse(value)}},stateUpdate:function(key,value){var ori=Plugin.stateGet(key);if(typeof ori==='undefined'||ori===null)ori={};Plugin.stateKeep(key,$.extend({},ori,value))},stateRemove:function(key){key=Plugin.getTablePrefix(key);if(localStorage){localStorage.removeItem(key)}},getTotalColumns:function(tablePart){if(typeof tablePart==='undefined')tablePart=datatable.tableBody;return $(tablePart).find('.'+pfx+'datatable-row').first().find('.'+pfx+'datatable-cell').length},getOneRow:function(tablePart,row,tdOnly){if(typeof tdOnly==='undefined')tdOnly=!0;var result=$(tablePart).find('.'+pfx+'datatable-row:not(.'+pfx+'datatable-row-detail):nth-child('+row+')');if(tdOnly){result=result.find('.'+pfx+'datatable-cell')}
return result},sortColumn:function(header,sort,int){if(typeof sort==='undefined')sort='asc';if(typeof int==='undefined')int=!1;var column=$(header).index();var rows=$(datatable.tableBody).find('.'+pfx+'datatable-row');var hIndex=$(header).closest('.'+pfx+'datatable-lock').index();if(hIndex!==-1){rows=$(datatable.tableBody).find('.'+pfx+'datatable-lock:nth-child('+(hIndex+1)+')').find('.'+pfx+'datatable-row')}
var container=$(rows).parent();$(rows).sort(function(a,b){var tda=$(a).find('td:nth-child('+column+')').text();var tdb=$(b).find('td:nth-child('+column+')').text();if(int){tda=parseInt(tda);tdb=parseInt(tdb)}
if(sort==='asc'){return tda>tdb?1:tda<tdb?-1:0}else{return tda<tdb?1:tda>tdb?-1:0}}).appendTo(container)},sorting:function(){var sortObj={init:function(){if(options.sortable){$(datatable.tableHead).find('.'+pfx+'datatable-cell:not(.'+pfx+'datatable-cell-check)').addClass(pfx+'datatable-cell-sort').off('click').on('click',sortObj.sortClick);sortObj.setIcon()}},setIcon:function(){var meta=Plugin.getDataSourceParam('sort');if($.isEmptyObject(meta))return;var column=Plugin.getColumnByField(meta.field);if(typeof column==='undefined')return;if(typeof column.sortable!=='undefined'&&column.sortable===!1)return;if(typeof column.selector!=='undefined'&&column.selector===!0)return;var td=$(datatable.tableHead).find('.'+pfx+'datatable-cell[data-field="'+meta.field+'"]').attr('data-sort',meta.sort);var sorting=$(td).find('span');var icon=$(sorting).find('i');var icons=Plugin.getOption('layout.icons.sort');if($(icon).length>0){$(icon).removeAttr('class').addClass(icons[meta.sort])}else{$(sorting).append($('<i/>').addClass(icons[meta.sort]))}
$(td).addClass(pfx+'datatable-cell-sorted')},sortClick:function(e){var meta=Plugin.getDataSourceParam('sort');var field=$(this).data('field');var column=Plugin.getColumnByField(field);if(typeof column==='undefined')return;if(typeof column.sortable!=='undefined'&&column.sortable===!1)return;if(typeof column.selector!=='undefined'&&column.selector===!0)return;$(datatable.tableHead).find('th').removeClass(pfx+'datatable-cell-sorted');util.addClass(this,pfx+'datatable-cell-sorted');$(datatable.tableHead).find('.'+pfx+'datatable-cell > span > i').remove();if(options.sortable){Plugin.spinnerCallback(!0);var sort='desc';if(Plugin.getObject('field',meta)===field){sort=Plugin.getObject('sort',meta)}
sort=typeof sort==='undefined'||sort==='desc'?'asc':'desc';meta={field:field,sort:sort};Plugin.setDataSourceParam('sort',meta);sortObj.setIcon();setTimeout(function(){Plugin.dataRender('sort');$(datatable).trigger(pfx+'datatable-on-sort',meta)},300)}},};sortObj.init()},localDataUpdate:function(){var params=Plugin.getDataSourceParam();if(typeof datatable.originalDataSet==='undefined'){datatable.originalDataSet=datatable.dataSet}
var field=Plugin.getObject('sort.field',params);var sort=Plugin.getObject('sort.sort',params);var column=Plugin.getColumnByField(field);if(typeof column!=='undefined'&&Plugin.getOption('data.serverSorting')!==!0){if(typeof column.sortCallback==='function'){datatable.dataSet=column.sortCallback(datatable.originalDataSet,sort,column)}else{datatable.dataSet=Plugin.sortCallback(datatable.originalDataSet,sort,column)}}else{datatable.dataSet=datatable.originalDataSet}
if(typeof params.query==='object'&&!Plugin.getOption('data.serverFiltering')){params.query=params.query||{};var nestedSearch=function(obj){for(var field in obj){if(!obj.hasOwnProperty(field))continue;if(typeof obj[field]==='string'){if(obj[field].toLowerCase()==search||obj[field].toLowerCase().indexOf(search)!==-1){return!0}}else if(typeof obj[field]==='number'){if(obj[field]===search){return!0}}else if(typeof obj[field]==='object'){if(nestedSearch(obj[field])){return!0}}}
return!1};var search=$(Plugin.getOption('search.input')).val();if(typeof search!=='undefined'&&search!==''){search=search.toLowerCase();datatable.dataSet=$.grep(datatable.dataSet,nestedSearch);delete params.query[Plugin.getGeneralSearchKey()]}
$.each(params.query,function(k,v){if(v===''){delete params.query[k]}});datatable.dataSet=Plugin.filterArray(datatable.dataSet,params.query);datatable.dataSet=datatable.dataSet.filter(function(){return!0})}
return datatable.dataSet},filterArray:function(list,args,operator){if(typeof list!=='object'){return[]}
if(typeof operator==='undefined')operator='AND';if(typeof args!=='object'){return list}
operator=operator.toUpperCase();if($.inArray(operator,['AND','OR','NOT'])===-1){return[]}
var count=Object.keys(args).length;var filtered=[];$.each(list,function(key,obj){var to_match=obj;var matched=0;$.each(args,function(m_key,m_value){m_value=m_value instanceof Array?m_value:[m_value];var match_property=Plugin.getObject(m_key,to_match);if(typeof match_property!=='undefined'&&match_property){var lhs=match_property.toString().toLowerCase();m_value.forEach(function(item,index){if(item.toString().toLowerCase()==lhs||lhs.indexOf(item.toString().toLowerCase())!==-1){matched++}})}});if(('AND'==operator&&matched==count)||('OR'==operator&&matched>0)||('NOT'==operator&&0==matched)){filtered[key]=obj}});list=filtered;return list},resetScroll:function(){if(typeof options.detail==='undefined'&&Plugin.getDepth()===1){$(datatable.table).find('.'+pfx+'datatable-row').css('left',0);$(datatable.table).find('.'+pfx+'datatable-lock').css('top',0);$(datatable.tableBody).scrollTop(0)}},getColumnByField:function(field){if(typeof field==='undefined')return;var result;$.each(options.columns,function(i,column){if(field===column.field){result=column;return!1}});return result},getDefaultSortColumn:function(){var result;$.each(options.columns,function(i,column){if(typeof column.sortable!=='undefined'&&$.inArray(column.sortable,['asc','desc'])!==-1){result={sort:column.sortable,field:column.field};return!1}});return result},getHiddenDimensions:function(element,includeMargin){var props={position:'absolute',visibility:'hidden',display:'block',},dim={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0,},hiddenParents=$(element).parents().addBack().not(':visible');includeMargin=(typeof includeMargin==='boolean')?includeMargin:!1;var oldProps=[];hiddenParents.each(function(){var old={};for(var name in props){old[name]=this.style[name];this.style[name]=props[name]}
oldProps.push(old)});dim.width=$(element).width();dim.outerWidth=$(element).outerWidth(includeMargin);dim.innerWidth=$(element).innerWidth();dim.height=$(element).height();dim.innerHeight=$(element).innerHeight();dim.outerHeight=$(element).outerHeight(includeMargin);hiddenParents.each(function(i){var old=oldProps[i];for(var name in props){this.style[name]=old[name]}});return dim},getGeneralSearchKey:function(){var searchInput=$(Plugin.getOption('search.input'));return Plugin.getOption('search.key')||$(searchInput).prop('name')},getObject:function(path,object){return path.split('.').reduce(function(obj,i){return obj!==null&&typeof obj[i]!=='undefined'?obj[i]:null},object)},extendObj:function(obj,path,value){var levels=path.split('.'),i=0;function createLevel(child){var name=levels[i++];if(typeof child[name]!=='undefined'&&child[name]!==null){if(typeof child[name]!=='object'&&typeof child[name]!=='function'){child[name]={}}}else{child[name]={}}
if(i===levels.length){child[name]=value}else{createLevel(child[name])}}
createLevel(obj);return obj},rowEvenOdd:function(){$(datatable.tableBody).find('.'+pfx+'datatable-row').removeClass(pfx+'datatable-row-even');if($(datatable.wrap).hasClass(pfx+'datatable-subtable')){$(datatable.tableBody).find('.'+pfx+'datatable-row:not(.'+pfx+'datatable-row-detail):even').addClass(pfx+'datatable-row-even')}else{$(datatable.tableBody).find('.'+pfx+'datatable-row:nth-child(even)').addClass(pfx+'datatable-row-even')}},timer:0,redraw:function(){Plugin.adjustCellsWidth.call();if(Plugin.isLocked()){Plugin.scrollbar();Plugin.resetScroll();Plugin.adjustCellsHeight.call()}
Plugin.adjustLockContainer.call();Plugin.initHeight.call();return datatable},load:function(){Plugin.reload();return datatable},reload:function(){var delay=(function(){return function(callback,ms){clearTimeout(Plugin.timer);Plugin.timer=setTimeout(callback,ms)}})();delay(function(){if(!options.data.serverFiltering){Plugin.localDataUpdate()}
Plugin.dataRender();$(datatable).trigger(pfx+'datatable-on-reloaded')},Plugin.getOption('search.delay'));return datatable},getRecord:function(id){if(typeof datatable.tableBody==='undefined')datatable.tableBody=$(datatable.table).children('tbody');$(datatable.tableBody).find('.'+pfx+'datatable-cell:first-child').each(function(i,cell){if(id==$(cell).text()){var rowNumber=$(cell).closest('.'+pfx+'datatable-row').index()+1;datatable.API.record=datatable.API.value=Plugin.getOneRow(datatable.tableBody,rowNumber);return datatable}});return datatable},getColumn:function(columnName){Plugin.setSelectedRecords();datatable.API.value=$(datatable.API.record).find('[data-field="'+columnName+'"]');return datatable},destroy:function(){$(datatable).parent().find('.'+pfx+'datatable-pager').remove();var initialDatatable=$(datatable.initialDatatable).addClass(pfx+'datatable-destroyed').show();$(datatable).replaceWith(initialDatatable);datatable=initialDatatable;$(datatable).trigger(pfx+'datatable-on-destroy');Plugin.isInit=!1;initialDatatable=null;return initialDatatable},sort:function(field,sort){sort=typeof sort==='undefined'?'asc':sort;Plugin.spinnerCallback(!0);var meta={field:field,sort:sort};Plugin.setDataSourceParam('sort',meta);setTimeout(function(){Plugin.dataRender('sort');$(datatable).trigger(pfx+'datatable-on-sort',meta);$(datatable.tableHead).find('.'+pfx+'datatable-cell > span > i').remove()},300);return datatable},getValue:function(){return $(datatable.API.value).text()},setActive:function(cell){if(typeof cell==='string'){cell=$(datatable.tableBody).find('.'+pfx+'checkbox-single > [type="checkbox"][value="'+cell+'"]')}
$(cell).prop('checked',!0);var ids=[];$(cell).each(function(i,td){var row=$(td).closest('tr').addClass(pfx+'datatable-row-active');var id=$(td).attr('value');if(typeof id!=='undefined'){ids.push(id)}});$(datatable).trigger(pfx+'datatable-on-check',[ids])},setInactive:function(cell){if(typeof cell==='string'){cell=$(datatable.tableBody).find('.'+pfx+'checkbox-single > [type="checkbox"][value="'+cell+'"]')}
$(cell).prop('checked',!1);var ids=[];$(cell).each(function(i,td){var row=$(td).closest('tr').removeClass(pfx+'datatable-row-active');var id=$(td).attr('value');if(typeof id!=='undefined'){ids.push(id)}});$(datatable).trigger(pfx+'datatable-on-uncheck',[ids])},setActiveAll:function(active){var checkboxes=$(datatable.table).find('> tbody, > thead').find('tr').not('.'+pfx+'datatable-row-subtable').find('.'+pfx+'datatable-cell-check [type="checkbox"]');if(active){Plugin.setActive(checkboxes)}else{Plugin.setInactive(checkboxes)}},setSelectedRecords:function(){datatable.API.record=$(datatable.tableBody).find('.'+pfx+'datatable-row-active');return datatable},getSelectedRecords:function(){Plugin.setSelectedRecords();datatable.API.record=datatable.rows('.'+pfx+'datatable-row-active').nodes();return datatable.API.record},getOption:function(path){return Plugin.getObject(path,options)},setOption:function(path,object){options=Plugin.extendObj(options,path,object)},search:function(value,columns){if(typeof columns!=='undefined')columns=$.makeArray(columns);var delay=(function(){return function(callback,ms){clearTimeout(Plugin.timer);Plugin.timer=setTimeout(callback,ms)}})();delay(function(){var query=Plugin.getDataSourceQuery();if(typeof columns==='undefined'&&typeof value!=='undefined'){var key=Plugin.getGeneralSearchKey();query[key]=value}
if(typeof columns==='object'){$.each(columns,function(k,column){query[column]=value});$.each(query,function(k,v){if(v===''||$.isEmptyObject(v)){delete query[k]}})}
Plugin.setDataSourceQuery(query);datatable.setDataSourceParam('pagination',Object.assign({},datatable.getDataSourceParam('pagination'),{page:1}));if(!options.data.serverFiltering){Plugin.localDataUpdate()}
Plugin.dataRender('search')},Plugin.getOption('search.delay'))},setDataSourceParam:function(param,value){datatable.API.params=$.extend({},{pagination:{page:1,perpage:Plugin.getOption('data.pageSize')},sort:Plugin.getDefaultSortColumn(),query:{},},datatable.API.params,Plugin.stateGet(Plugin.stateId));datatable.API.params=Plugin.extendObj(datatable.API.params,param,value);Plugin.stateKeep(Plugin.stateId,datatable.API.params)},getDataSourceParam:function(param){datatable.API.params=$.extend({},{pagination:{page:1,perpage:Plugin.getOption('data.pageSize')},sort:Plugin.getDefaultSortColumn(),query:{},},datatable.API.params,Plugin.stateGet(Plugin.stateId));if(typeof param==='string'){return Plugin.getObject(param,datatable.API.params)}
return datatable.API.params},getDataSourceQuery:function(){return Plugin.getDataSourceParam('query')||{}},setDataSourceQuery:function(query){Plugin.setDataSourceParam('query',query)},getCurrentPage:function(){return $(datatable.table).siblings('.'+pfx+'datatable-pager').last().find('.'+pfx+'datatable-pager-nav').find('.'+pfx+'datatable-pager-link.'+pfx+'datatable-pager-link-active').data('page')||1},getPageSize:function(){return $(datatable.table).siblings('.'+pfx+'datatable-pager').last().find('select.'+pfx+'datatable-pager-size').val()||10},getTotalRows:function(){return datatable.API.params.pagination.total},getDataSet:function(){return datatable.originalDataSet},nodeTr:[],nodeTd:[],nodeCols:[],recentNode:[],table:function(){if(typeof datatable.table!=='undefined'){return datatable.table}},row:function(selector){Plugin.rows(selector);Plugin.nodeTr=Plugin.recentNode=$(Plugin.nodeTr).first();return datatable},rows:function(selector){if(Plugin.isLocked()){Plugin.nodeTr=Plugin.recentNode=$(datatable.tableBody).find(selector).filter('.'+pfx+'datatable-lock-scroll > .'+pfx+'datatable-row')}else{Plugin.nodeTr=Plugin.recentNode=$(datatable.tableBody).find(selector).filter('.'+pfx+'datatable-row')}
return datatable},column:function(index){Plugin.nodeCols=Plugin.recentNode=$(datatable.tableBody).find('.'+pfx+'datatable-cell:nth-child('+(index+1)+')');return datatable},columns:function(selector){var context=datatable.table;if(Plugin.nodeTr===Plugin.recentNode){context=Plugin.nodeTr}
var columns=$(context).find('.'+pfx+'datatable-cell[data-field="'+selector+'"]');if(columns.length>0){Plugin.nodeCols=Plugin.recentNode=columns}else{Plugin.nodeCols=Plugin.recentNode=$(context).find(selector).filter('.'+pfx+'datatable-cell')}
return datatable},cell:function(selector){Plugin.cells(selector);Plugin.nodeTd=Plugin.recentNode=$(Plugin.nodeTd).first();return datatable},cells:function(selector){var cells=$(datatable.tableBody).find('.'+pfx+'datatable-cell');if(typeof selector!=='undefined'){cells=$(cells).filter(selector)}
Plugin.nodeTd=Plugin.recentNode=cells;return datatable},remove:function(){if($(Plugin.nodeTr.length)&&Plugin.nodeTr===Plugin.recentNode){$(Plugin.nodeTr).remove()}
Plugin.layoutUpdate();return datatable},visible:function(bool){if($(Plugin.recentNode.length)){var locked=Plugin.lockEnabledColumns();if(Plugin.recentNode===Plugin.nodeCols){var index=Plugin.recentNode.index();if(Plugin.isLocked()){var scrollColumns=$(Plugin.recentNode).closest('.'+pfx+'datatable-lock-scroll').length;if(scrollColumns){index+=locked.left.length+1}else if($(Plugin.recentNode).closest('.'+pfx+'datatable-lock-right').length){index+=locked.left.length+scrollColumns+1}}}
if(bool){if(Plugin.recentNode===Plugin.nodeCols){delete options.columns[index].visible}
$(Plugin.recentNode).show()}else{if(Plugin.recentNode===Plugin.nodeCols){Plugin.setOption('columns.'+(index)+'.visible',!1)}
$(Plugin.recentNode).hide()}
Plugin.columnHide();Plugin.redraw()}},nodes:function(){return Plugin.recentNode},dataset:function(){return datatable},gotoPage:function(page){if(typeof Plugin.pagingObject!=='undefined'){Plugin.isInit=!0;Plugin.pagingObject.openPage(page)}},};$.each(Plugin,function(funcName,func){datatable[funcName]=func});if(typeof options!=='undefined'){if(typeof options==='string'){var method=options;datatable=$(this).data(pluginName);if(typeof datatable!=='undefined'){options=datatable.options;Plugin[method].apply(this,Array.prototype.slice.call(arguments,1))}}else{if(!datatable.data(pluginName)&&!$(this).hasClass(pfx+'datatable-loaded')){datatable.dataSet=null;datatable.textAlign={left:pfx+'datatable-cell-left',center:pfx+'datatable-cell-center',right:pfx+'datatable-cell-right',};options=$.extend(!0,{},$.fn[pluginName].defaults,options);datatable.options=options;Plugin.init.apply(this,[options]);$(datatable.wrap).data(pluginName,datatable)}}}else{datatable=$(this).data(pluginName);if(typeof datatable==='undefined'){$.error(pluginName+' not initialized')}
options=datatable.options}
return datatable};$.fn[pluginName].defaults={data:{type:'local',source:null,pageSize:10,saveState:!0,serverPaging:!1,serverFiltering:!1,serverSorting:!1,autoColumns:!1,attr:{rowProps:[],},},layout:{theme:'default',class:pfx+'datatable-primary',scroll:!1,height:null,minHeight:null,footer:!1,header:!0,customScrollbar:!0,spinner:{overlayColor:'#000000',opacity:0,type:'loader',state:'primary',message:!0,},icons:{sort:{asc:'flaticon2-arrow-up',desc:'flaticon2-arrow-down'},pagination:{next:'flaticon2-next',prev:'flaticon2-back',first:'flaticon2-fast-back',last:'flaticon2-fast-next',more:'flaticon-more-1',},rowDetail:{expand:'fa fa-caret-down',collapse:'fa fa-caret-right'},},},sortable:!0,resizable:!1,filterable:!1,pagination:!0,editable:!1,columns:[],search:{onEnter:!1,input:null,delay:400,key:null},rows:{callback:function(){},beforeTemplate:function(){},afterTemplate:function(){},autoHide:!0,},toolbar:{layout:['pagination','info'],placement:['bottom'],items:{pagination:{type:'default',pages:{desktop:{layout:'default',pagesNumber:5,},tablet:{layout:'default',pagesNumber:3,},mobile:{layout:'compact',},},navigation:{prev:!0,next:!0,first:!0,last:!0,more:!1},pageSizeSelect:[],},info:!0,},},translate:{records:{processing:'Please wait...',noRecords:'No records found',},toolbar:{pagination:{items:{default:{first:'First',prev:'Previous',next:'Next',last:'Last',more:'More pages',input:'Page number',select:'Select page size',all:'all',},info:'Showing {{start}} - {{end}} of {{total}}',},},},},extensions:{},}}(jQuery));"use strict";(function($){var pluginName='KTDatatable';var pfx='';$.fn[pluginName]=$.fn[pluginName]||{};$.fn[pluginName].checkbox=function(datatable,options){var Extension={selectedAllRows:!1,selectedRows:[],unselectedRows:[],init:function(){if(Extension.selectorEnabled()){datatable.setDataSourceParam(options.vars.selectedAllRows,!1);datatable.stateRemove('checkbox');if(options.vars.requestIds){datatable.setDataSourceParam(options.vars.requestIds,!0)}
$(datatable).on(pfx+'datatable-on-reloaded',function(){datatable.stateRemove('checkbox');datatable.setDataSourceParam(options.vars.selectedAllRows,!1);Extension.selectedAllRows=!1;Extension.selectedRows=[];Extension.unselectedRows=[]});Extension.selectedAllRows=datatable.getDataSourceParam(options.vars.selectedAllRows);$(datatable).on(pfx+'datatable-on-layout-updated',function(e,args){if(args.table!=$(datatable.wrap).attr('id')){return}
datatable.ready(function(){Extension.initVars();Extension.initEvent();Extension.initSelect()})});$(datatable).on(pfx+'datatable-on-check',function(e,ids){ids.forEach(function(id){Extension.selectedRows.push(id);Extension.unselectedRows=Extension.remove(Extension.unselectedRows,id)});var storage={};storage.selectedRows=$.unique(Extension.selectedRows);storage.unselectedRows=$.unique(Extension.unselectedRows);datatable.stateKeep('checkbox',storage)});$(datatable).on(pfx+'datatable-on-uncheck',function(e,ids){ids.forEach(function(id){Extension.unselectedRows.push(id);Extension.selectedRows=Extension.remove(Extension.selectedRows,id)});var storage={};storage.selectedRows=$.unique(Extension.selectedRows);storage.unselectedRows=$.unique(Extension.unselectedRows);datatable.stateKeep('checkbox',storage)})}},initEvent:function(){$(datatable.tableHead).find('.'+pfx+'checkbox-all > [type="checkbox"]').click(function(e){Extension.selectedRows=Extension.unselectedRows=[];datatable.stateRemove('checkbox');Extension.selectedAllRows=!!$(this).is(':checked');if(!options.vars.requestIds){if($(this).is(':checked')){Extension.selectedRows=$.makeArray($(datatable.tableBody).find('.'+pfx+'checkbox-single > [type="checkbox"]').map(function(i,chk){return $(chk).val()}))}
var storage={};storage.selectedRows=$.unique(Extension.selectedRows);datatable.stateKeep('checkbox',storage)}
datatable.setDataSourceParam(options.vars.selectedAllRows,Extension.selectedAllRows);$(datatable).trigger(pfx+'datatable-on-click-checkbox',[$(this)])});$(datatable.tableBody).find('.'+pfx+'checkbox-single > [type="checkbox"]').click(function(e){var id=$(this).val();if($(this).is(':checked')){Extension.selectedRows.push(id);Extension.unselectedRows=Extension.remove(Extension.unselectedRows,id)}else{Extension.unselectedRows.push(id);Extension.selectedRows=Extension.remove(Extension.selectedRows,id)}
if(!options.vars.requestIds&&Extension.selectedRows.length<1){$(datatable.tableHead).find('.'+pfx+'checkbox-all > [type="checkbox"]').prop('checked',!1)}
var storage={};storage.selectedRows=Extension.selectedRows.filter(Extension.unique);storage.unselectedRows=Extension.unselectedRows.filter(Extension.unique);datatable.stateKeep('checkbox',storage);$(datatable).trigger(pfx+'datatable-on-click-checkbox',[$(this)])})},unique:function(value,index,self){return self.indexOf(value)===index},initSelect:function(){if(Extension.selectedAllRows&&options.vars.requestIds){if(!datatable.hasClass(pfx+'datatable-error')){$(datatable.tableHead).find('.'+pfx+'checkbox-all > [type="checkbox"]').prop('checked',!0)}
datatable.setActiveAll(!0);Extension.unselectedRows.forEach(function(id){datatable.setInactive(id)})}else{Extension.selectedRows.forEach(function(id){datatable.setActive(id)});if(!datatable.hasClass(pfx+'datatable-error')&&$(datatable.tableBody).find('.'+pfx+'checkbox-single > [type="checkbox"]').not(':checked').length<1){$(datatable.tableHead).find('.'+pfx+'checkbox-all > [type="checkbox"]').prop('checked',!0)}}},selectorEnabled:function(){return $.grep(datatable.options.columns,function(n,i){return n.selector||!1})[0]},initVars:function(){var storage=datatable.stateGet('checkbox');if(typeof storage!=='undefined'){Extension.selectedRows=storage.selectedRows||[];Extension.unselectedRows=storage.unselectedRows||[]}},getSelectedId:function(path){Extension.initVars();if(Extension.selectedAllRows&&options.vars.requestIds){if(typeof path==='undefined'){path=options.vars.rowIds}
var selectedAllRows=datatable.getObject(path,datatable.lastResponse)||[];if(selectedAllRows.length>0){Extension.unselectedRows.forEach(function(id){selectedAllRows=Extension.remove(selectedAllRows,parseInt(id))})}
return $.unique(selectedAllRows)}
return Extension.selectedRows},remove:function(array,element){return array.filter(function(e){return e!==element})},};datatable.checkbox=function(){return Extension};if(typeof options==='object'){options=$.extend(!0,{},$.fn[pluginName].checkbox.default,options);Extension.init.apply(this,[options])}
return datatable};$.fn[pluginName].checkbox.default={vars:{selectedAllRows:'selectedAllRows',requestIds:'requestIds',rowIds:'meta.rowIds',},}}(jQuery));var defaults={layout:{icons:{pagination:{next:'flaticon2-next',prev:'flaticon2-back',first:'flaticon2-fast-back',last:'flaticon2-fast-next',more:'flaticon-more-1',},rowDetail:{expand:'fa fa-caret-down',collapse:'fa fa-caret-right'},}}};if(KTUtil.isRTL()){defaults={layout:{icons:{pagination:{next:'flaticon2-back',prev:'flaticon2-next',first:'flaticon2-fast-next',last:'flaticon2-fast-back',},rowDetail:{collapse:'fa fa-caret-down',expand:'fa fa-caret-right'},}}}}
$.extend(!0,$.fn.KTDatatable.defaults,defaults);"use strict";KTUtil.ready(function(){KTLayoutHeader.init('kt_header','kt_header_mobile');KTLayoutHeaderMenu.init('kt_header_menu','kt_header_menu_wrapper');KTLayoutHeaderTopbar.init('kt_header_mobile_topbar_toggle');KTLayoutBrand.init('kt_brand');KTLayoutAside.init('kt_aside');KTLayoutAsideToggle.init('kt_aside_toggle');KTLayoutAsideMenu.init('kt_aside_menu');KTLayoutSubheader.init('kt_subheader');KTLayoutContent.init('kt_content');KTLayoutFooter.init('kt_footer');KTLayoutScrolltop.init('kt_scrolltop');KTLayoutStickyCard.init('kt_page_sticky_card');KTLayoutStretchedCard.init('kt_page_stretched_card');KTLayoutExamples.init();KTLayoutDemoPanel.init('kt_demo_panel');KTLayoutChat.init();KTLayoutQuickActions.init('kt_quick_actions');KTLayoutQuickNotifications.init('kt_quick_notifications');KTLayoutQuickPanel.init('kt_quick_panel');KTLayoutQuickUser.init('kt_quick_user');KTLayoutQuickSearch.init('kt_quick_search');KTLayoutQuickCartPanel.init('kt_quick_cart');KTLayoutSearch().init('kt_quick_search_dropdown');KTLayoutSearchOffcanvas().init('kt_quick_search_offcanvas')});"use strict";var KTLayoutAsideMenu=function(){var _element;var _menuObject;var _init=function(){var menuDesktopMode=(KTUtil.attr(_element,'data-menu-dropdown')==='1'?'dropdown':'accordion');var scroll;if(KTUtil.attr(_element,'data-menu-scroll')==='1'){scroll={rememberPosition:!0,height:function(){var height=parseInt(KTUtil.getViewPort().height);if(KTUtil.isBreakpointUp('lg')){height=height-KTLayoutBrand.getHeight()}
height=height-(parseInt(KTUtil.css(_element,'marginBottom'))+parseInt(KTUtil.css(_element,'marginTop')));return height}}}
_menuObject=new KTMenu(_element,{scroll:scroll,submenu:{desktop:menuDesktopMode,tablet:'accordion',mobile:'accordion'},accordion:{expandAll:!1}});_menuObject.on('submenuToggle',function(menu){if(KTLayoutAside.isMinimized()===!0&&KTLayoutAside.isHoverable()===!1){return!1}});_menuObject.on('linkClick',function(menu){if(KTUtil.isBreakpointDown('lg')){KTLayoutAside.getOffcanvas().hide()}})}
return{init:function(id){_element=KTUtil.getById(id);if(!_element){return}
_init()},getElement:function(){return _element},getMenu:function(){return _menuObject},pauseDropdownHover:function(time){if(_menuObject){_menuObject.pauseDropdownHover(time)}},closeMobileOffcanvas:function(){if(_menuObject&&KTUtil.isMobileDevice()){_menuObject.hide()}}}}();if(typeof module!=='undefined'){module.exports=KTLayoutAsideMenu}
"use strict";var KTLayoutAsideToggle=function(){var _body;var _element;var _toggleObject;var _init=function(){_toggleObject=new KTToggle(_element,{target:_body,targetState:'aside-minimize',toggleState:'active'});_toggleObject.on('toggle',function(toggle){if(typeof KTLayoutStickyCard!=='undefined'){KTLayoutStickyCard.update()}
if(typeof KTLayoutHeaderMenu!=='undefined'){KTLayoutHeaderMenu.pauseDropdownHover(800)}
if(typeof KTLayoutAsideMenu!=='undefined'){KTLayoutAsideMenu.pauseDropdownHover(800)}
KTCookie.setCookie('kt_aside_toggle_state',toggle.getState())});_toggleObject.on('beforeToggle',function(toggle){if(KTUtil.hasClass(_body,'aside-minimize')===!1&&KTUtil.hasClass(_body,'aside-minimize-hover')){KTUtil.removeClass(_body,'aside-minimize-hover')}})}
return{init:function(id){_element=KTUtil.getById(id);_body=KTUtil.getBody();if(!_element){return}
_init()},getElement:function(){return _element},getToggle:function(){return _toggleObject},onToggle:function(handler){if(typeof _toggleObject.element!=='undefined'){_toggleObject.on('toggle',handler)}}}}();if(typeof module!=='undefined'){module.exports=KTLayoutAsideToggle}
"use strict";var KTLayoutAside=function(){var _body;var _element;var _offcanvasObject;var _init=function(){var offcanvasClass=KTUtil.hasClass(_element,'aside-offcanvas-default')?'aside-offcanvas-default':'aside';_offcanvasObject=new KTOffcanvas(_element,{baseClass:offcanvasClass,overlay:!0,closeBy:'kt_aside_close_btn',toggleBy:{target:'kt_aside_mobile_toggle',state:'mobile-toggle-active'}});if(KTUtil.hasClass(_body,'aside-fixed')&&KTUtil.hasClass(_body,'aside-minimize-hoverable')){var insideTm;var outsideTm;KTUtil.addEvent(_element,'mouseenter',function(e){e.preventDefault();if(KTUtil.isBreakpointUp('lg')===!1){return}
if(outsideTm){clearTimeout(outsideTm);outsideTm=null}
insideTm=setTimeout(function(){if(KTUtil.hasClass(_body,'aside-minimize')&&KTUtil.isBreakpointUp('lg')){KTUtil.removeClass(_body,'aside-minimize');KTUtil.addClass(_body,'aside-minimize-hover');KTLayoutAsideMenu.getMenu().scrollUpdate();KTLayoutAsideMenu.getMenu().scrollTop()}},50)});KTUtil.addEvent(_element,'mouseleave',function(e){e.preventDefault();if(KTUtil.isBreakpointUp('lg')===!1){return}
if(insideTm){clearTimeout(insideTm);insideTm=null}
outsideTm=setTimeout(function(){if(KTUtil.hasClass(_body,'aside-minimize-hover')&&KTUtil.isBreakpointUp('lg')){KTUtil.removeClass(_body,'aside-minimize-hover');KTUtil.addClass(_body,'aside-minimize');KTLayoutAsideMenu.getMenu().scrollUpdate();KTLayoutAsideMenu.getMenu().scrollTop()}},100)})}}
return{init:function(id){_element=KTUtil.getById(id);_body=KTUtil.getBody();if(!_element){return}
_init()},getElement:function(){return _element},getOffcanvas:function(){return _offcanvasObject},isFixed:function(){return KTUtil.hasClass(_body,'aside-fixed')},isMinimized:function(){return(KTUtil.hasClass(_body,'aside-fixed')&&KTUtil.hasClass(_body,'aside-minimize'))},isHoverable:function(){return(KTUtil.hasClass(_body,'aside-fixed')&&KTUtil.hasClass(_body,'aside-minimize-hoverable'))}}}();if(typeof module!=='undefined'){module.exports=KTLayoutAside}
"use strict";var KTLayoutBrand=function(){var _element;var _getHeight=function(){var height=0;if(_element){height=KTUtil.actualHeight(_element)}
return height}
return{init:function(id){_element=KTUtil.getById(id);if(!_element){return}},getElement:function(){return _element},getHeight:function(){return _getHeight()}}}();if(typeof module!=='undefined'){module.exports=KTLayoutBrand}
"use strict";var KTLayoutContent=function(){var _element;var _getHeight=function(){var height;height=KTUtil.getViewPort().height;if(_element){height=height-parseInt(KTUtil.css(_element,'paddingTop'))-parseInt(KTUtil.css(_element,'paddingBottom'))}
height=height-KTLayoutHeader.getHeight();height=height-KTLayoutSubheader.getHeight();height=height-KTLayoutFooter.getHeight();return height}
return{init:function(id){_element=KTUtil.getById(id)},getHeight:function(){return _getHeight()},getElement:function(){return _element}}}();if(typeof module!=='undefined'){module.exports=KTLayoutContent}
"use strict";var KTLayoutFooter=function(){var _element;var _getHeight=function(){var height=0;if(_element){height=KTUtil.actualHeight(_element)}
return height}
return{init:function(id){_element=KTUtil.getById(id)},getHeight:function(){return _getHeight()},getElement:function(){return _element}}}();if(typeof module!=='undefined'){module.exports=KTLayoutFooter}
"use strict";var KTLayoutHeaderMenu=function(){var _menuElement;var _menuObject;var _offcanvasElement;var _offcanvasObject;var _init=function(){_offcanvasObject=new KTOffcanvas(_offcanvasElement,{overlay:!0,baseClass:'header-menu-wrapper',closeBy:'kt_header_menu_mobile_close_btn',toggleBy:{target:'kt_header_mobile_toggle',state:'mobile-toggle-active'}});_menuObject=new KTMenu(_menuElement,{submenu:{desktop:'dropdown',tablet:'accordion',mobile:'accordion'},accordion:{slideSpeed:200,expandAll:!1}});_menuObject.on('linkClick',function(menu){if(KTUtil.isBreakpointDown('lg')){_offcanvasObject.hide()}})}
return{init:function(menuId,offcanvasId){_menuElement=KTUtil.getById(menuId);_offcanvasElement=KTUtil.getById(offcanvasId);if(!_menuElement){return}
_init()},getMenuElement:function(){return _menuElement},getOffcanvasElement:function(){return _offcanvasElement},getMenu:function(){return _menuObject},pauseDropdownHover:function(time){if(_menuObject){_menuObject.pauseDropdownHover(time)}},getOffcanvas:function(){return _offcanvasObject},closeMobileOffcanvas:function(){if(_menuObject&&KTUtil.isMobileDevice()){_offcanvasObject.hide()}}}}();if(typeof module!=='undefined'){module.exports=KTLayoutHeaderMenu}
"use strict";var KTLayoutHeaderTopbar=function(){var _toggleElement;var _toggleObject;var _init=function(){_toggleObject=new KTToggle(_toggleElement,{target:KTUtil.getBody(),targetState:'topbar-mobile-on',toggleState:'active',})}
return{init:function(id){_toggleElement=KTUtil.getById(id);if(!_toggleElement){return}
_init()},getToggleElement:function(){return _toggleElement}}}();if(typeof module!=='undefined'){module.exports=KTLayoutHeaderTopbar}
"use strict";var KTLayoutHeader=function(){var _element;var _elementForMobile;var _object;var _getHeight=function(){var height=0;if(_element){height=KTUtil.actualHeight(_element)+1}
return height}
var _getHeightForMobile=function(){var height;height=KTUtil.actualHeight(_elementForMobile);return height}
return{init:function(id,idForMobile){_element=KTUtil.getById(id);_elementForMobile=KTUtil.getById(idForMobile);if(!_element){return}},isFixed:function(){return KTUtil.hasClass(KTUtil.getBody(),'header-fixed')},isFixedForMobile:function(){return KTUtil.hasClass(KTUtil.getBody(),'header-mobile-fixed')},getElement:function(){return _element},getElementForMobile:function(){return _elementForMobile},getHeader:function(){return _object},getHeight:function(){return _getHeight()},getHeightForMobile:function(){return _getHeightForMobile()}}}();if(typeof module!=='undefined'){module.exports=KTLayoutHeader}
"use strict";var KTLayoutStickyCard=function(){var _element;var _object;var _init=function(){var offset=300;if(typeof KTLayoutHeader!=='undefined'){offset=KTLayoutHeader.getHeight()}
_object=new KTCard(_element,{sticky:{offset:offset,zIndex:90,position:{top:function(){var pos=0;var body=KTUtil.getBody();if(KTUtil.isBreakpointUp('lg')){if(typeof KTLayoutHeader!=='undefined'&&KTLayoutHeader.isFixed()){pos=pos+KTLayoutHeader.getHeight()}
if(typeof KTLayoutSubheader!=='undefined'&&KTLayoutSubheader.isFixed()){pos=pos+KTLayoutSubheader.getHeight()}}else{if(typeof KTLayoutHeader!=='undefined'&&KTLayoutHeader.isFixedForMobile()){pos=pos+KTLayoutHeader.getHeightForMobile()}}
pos=pos-1;return pos},left:function(card){return KTUtil.offset(_element).left},right:function(card){var body=KTUtil.getBody();var cardWidth=parseInt(KTUtil.css(_element,'width'));var bodyWidth=parseInt(KTUtil.css(body,'width'));var cardOffsetLeft=KTUtil.offset(_element).left;return bodyWidth-cardWidth-cardOffsetLeft}}}});_object.initSticky();KTUtil.addResizeHandler(function(){_object.updateSticky()})}
return{init:function(id){_element=KTUtil.getById(id);if(!_element){return}
_init()},update:function(){if(_object){_object.updateSticky()}}}}();if(typeof module!=='undefined'){module.exports=KTLayoutStickyCard}
"use strict";var KTLayoutStretchedCard=function(){var _element;var _init=function(){var scroll=KTUtil.find(_element,'.card-scroll');var cardBody=KTUtil.find(_element,'.card-body');var cardHeader=KTUtil.find(_element,'.card-header');var height=KTLayoutContent.getHeight();height=height-parseInt(KTUtil.actualHeight(cardHeader));height=height-parseInt(KTUtil.css(_element,'marginTop'))-parseInt(KTUtil.css(_element,'marginBottom'));height=height-parseInt(KTUtil.css(_element,'paddingTop'))-parseInt(KTUtil.css(_element,'paddingBottom'));height=height-parseInt(KTUtil.css(cardBody,'paddingTop'))-parseInt(KTUtil.css(cardBody,'paddingBottom'));height=height-parseInt(KTUtil.css(cardBody,'marginTop'))-parseInt(KTUtil.css(cardBody,'marginBottom'));height=height-3;KTUtil.css(scroll,'height',height+'px')}
return{init:function(id){_element=KTUtil.getById(id);if(!_element){return}
_init();KTUtil.addResizeHandler(function(){_init()})},update:function(){_init()}}}();if(typeof module!=='undefined'){module.exports=KTLayoutStretchedCard}
"use strict";var KTLayoutSubheader=function(){var _element;var _getHeight=function(){var height=0;if(_element){height=KTUtil.actualHeight(_element)}
return height}
return{init:function(id){_element=KTUtil.getById(id);if(!_element){return}},isFixed:function(){return KTUtil.hasClass(KTUtil.getBody(),'subheader-fixed')},getElement:function(){return _element},getHeight:function(){return _getHeight()}}}();if(typeof module!=='undefined'){module.exports=KTLayoutSubheader}
"use strict";var KTLayoutChat=function(){var _init=function(element){var scrollEl=KTUtil.find(element,'.scroll');var cardBodyEl=KTUtil.find(element,'.card-body');var cardHeaderEl=KTUtil.find(element,'.card-header');var cardFooterEl=KTUtil.find(element,'.card-footer');if(!scrollEl){return}
KTUtil.scrollInit(scrollEl,{windowScroll:!1,mobileNativeScroll:!0,desktopNativeScroll:!1,resetHeightOnDestroy:!0,handleWindowResize:!0,rememberPosition:!0,height:function(){var height;if(KTUtil.isBreakpointDown('lg')){return KTUtil.hasAttr(scrollEl,'data-mobile-height')?parseInt(KTUtil.attr(scrollEl,'data-mobile-height')):400}else if(KTUtil.isBreakpointUp('lg')&&KTUtil.hasAttr(scrollEl,'data-height')){return parseInt(KTUtil.attr(scrollEl,'data-height'))}else{height=KTLayoutContent.getHeight();if(scrollEl){height=height-parseInt(KTUtil.css(scrollEl,'margin-top'))-parseInt(KTUtil.css(scrollEl,'margin-bottom'))}
if(cardHeaderEl){height=height-parseInt(KTUtil.css(cardHeaderEl,'height'));height=height-parseInt(KTUtil.css(cardHeaderEl,'margin-top'))-parseInt(KTUtil.css(cardHeaderEl,'margin-bottom'))}
if(cardBodyEl){height=height-parseInt(KTUtil.css(cardBodyEl,'padding-top'))-parseInt(KTUtil.css(cardBodyEl,'padding-bottom'))}
if(cardFooterEl){height=height-parseInt(KTUtil.css(cardFooterEl,'height'));height=height-parseInt(KTUtil.css(cardFooterEl,'margin-top'))-parseInt(KTUtil.css(cardFooterEl,'margin-bottom'))}}
height=height-2;return height}});KTUtil.on(element,'.card-footer textarea','keydown',function(e){if(e.keyCode==13){_handeMessaging(element);e.preventDefault();return!1}});KTUtil.on(element,'.card-footer .chat-send','click',function(e){_handeMessaging(element)})}
var _handeMessaging=function(element){var messagesEl=KTUtil.find(element,'.messages');var scrollEl=KTUtil.find(element,'.scroll');var textarea=KTUtil.find(element,'textarea');if(textarea.value.length===0){return}
var node=document.createElement("DIV");KTUtil.addClass(node,'d-flex flex-column mb-5 align-items-end');var html='';html+='<div class="d-flex align-items-center">';html+='	<div>';html+='		<span class="text-muted font-size-sm">2 Hours</span>';html+='		<a href="#" class="text-dark-75 text-hover-primary font-weight-bold font-size-h6">You</a>';html+='	</div>';html+='	<div class="symbol symbol-circle symbol-40 ml-3">';html+='		<img alt="Pic" src="assets/media/users/300_12.jpg"/>';html+='	</div>';html+='</div>';html+='<div class="mt-2 rounded p-5 bg-light-primary text-dark-50 font-weight-bold font-size-lg text-right max-w-400px">'+textarea.value+'</div>';KTUtil.setHTML(node,html);messagesEl.appendChild(node);textarea.value='';scrollEl.scrollTop=parseInt(KTUtil.css(messagesEl,'height'));var ps;if(ps=KTUtil.data(scrollEl).get('ps')){ps.update()}
setTimeout(function(){var node=document.createElement("DIV");KTUtil.addClass(node,'d-flex flex-column mb-5 align-items-start');var html='';html+='<div class="d-flex align-items-center">';html+='	<div class="symbol symbol-circle symbol-40 mr-3">';html+='		<img alt="Pic" src="assets/media/users/300_12.jpg"/>';html+='	</div>';html+='	<div>';html+='		<a href="#" class="text-dark-75 text-hover-primary font-weight-bold font-size-h6">Matt Pears</a>';html+='		<span class="text-muted font-size-sm">Just now</span>';html+='	</div>';html+='</div>';html+='<div class="mt-2 rounded p-5 bg-light-success text-dark-50 font-weight-bold font-size-lg text-left max-w-400px">';html+='Right before vacation season we have the next Big Deal for you.';html+='</div>';KTUtil.setHTML(node,html);messagesEl.appendChild(node);textarea.value='';scrollEl.scrollTop=parseInt(KTUtil.css(messagesEl,'height'));var ps;if(ps=KTUtil.data(scrollEl).get('ps')){ps.update()}},2000)}
return{init:function(){_init(KTUtil.getById('kt_chat_modal'));if(encodeURI(window.location.hostname)=='keenthemes.com'||encodeURI(window.location.hostname)=='www.keenthemes.com'){setTimeout(function(){if(!KTCookie.getCookie('kt_app_chat_shown')){var expires=new Date(new Date().getTime()+60*60*1000);KTCookie.setCookie('kt_app_chat_shown',1,{expires:expires});if(KTUtil.getById('kt_app_chat_launch_btn')){KTUtil.getById('kt_app_chat_launch_btn').click()}}},2000)}},setup:function(element){_init(element)}}}();if(typeof module!=='undefined'){module.exports=KTLayoutChat}
"use strict";var KTLayoutDemoPanel=function(){var _element;var _offcanvasObject;var _init=function(){_offcanvasObject=new KTOffcanvas(_element,{overlay:!0,baseClass:'offcanvas',placement:'right',closeBy:'kt_demo_panel_close',toggleBy:'kt_demo_panel_toggle'});var header=KTUtil.find(_element,'.offcanvas-header');var content=KTUtil.find(_element,'.offcanvas-content');var wrapper=KTUtil.find(_element,'.offcanvas-wrapper');var footer=KTUtil.find(_element,'.offcanvas-footer');KTUtil.scrollInit(wrapper,{disableForMobile:!0,resetHeightOnDestroy:!0,handleWindowResize:!0,height:function(){var height=parseInt(KTUtil.getViewPort().height);if(header){height=height-parseInt(KTUtil.actualHeight(header));height=height-parseInt(KTUtil.css(header,'marginTop'));height=height-parseInt(KTUtil.css(header,'marginBottom'))}
if(content){height=height-parseInt(KTUtil.css(content,'marginTop'));height=height-parseInt(KTUtil.css(content,'marginBottom'))}
if(wrapper){height=height-parseInt(KTUtil.css(wrapper,'marginTop'));height=height-parseInt(KTUtil.css(wrapper,'marginBottom'))}
if(footer){height=height-parseInt(KTUtil.actualHeight(footer));height=height-parseInt(KTUtil.css(footer,'marginTop'));height=height-parseInt(KTUtil.css(footer,'marginBottom'))}
height=height-parseInt(KTUtil.css(_element,'paddingTop'));height=height-parseInt(KTUtil.css(_element,'paddingBottom'));height=height-2;return height}});if(typeof offcanvas!=='undefined'&&offcanvas.length===0){offcanvas.on('hide',function(){var expires=new Date(new Date().getTime()+60*60*1000);KTCookie.setCookie('kt_demo_panel_shown',1,{expires:expires})})}}
var _remind=function(){if(!(encodeURI(window.location.hostname)=='keenthemes.com'||encodeURI(window.location.hostname)=='www.keenthemes.com')){return}
setTimeout(function(){if(!KTCookie.getCookie('kt_demo_panel_shown')){var expires=new Date(new Date().getTime()+15*60*1000);KTCookie.setCookie('kt_demo_panel_shown',1,{expires:expires});if(typeof _offcanvasObject!=='undefined'){_offcanvasObject.show()}}},4000)}
return{init:function(id){_element=KTUtil.getById(id);if(!_element){return}
_init();_remind()}}}();if(typeof module!=='undefined'){module.exports=KTLayoutDemoPanel}
"use strict";var KTLayoutExamples=function(){var initDefaultMode=function(element){var elements=element;if(typeof elements==='undefined'){elements=document.querySelectorAll('.example:not(.example-compact):not(.example-hover):not(.example-basic)')}
for(var i=0;i<elements.length;++i){var example=elements[i];var copy=KTUtil.find(example,'.example-copy');var clipboard=new ClipboardJS(copy,{target:function(trigger){var example=trigger.closest('.example');var el=KTUtil.find(example,'.example-code .tab-pane.active');if(!el){el=KTUtil.find(example,'.example-code')}
return el}});clipboard.on('success',function(e){KTUtil.addClass(e.trigger,'example-copied');e.clearSelection();setTimeout(function(){KTUtil.removeClass(e.trigger,'example-copied')},2000)})}}
var initCompactMode=function(element){var example,code,toggle,copy,clipboard;var elements=element;if(typeof elements==='undefined'){var elements=document.querySelectorAll('.example.example-compact')}
for(var i=0;i<elements.length;++i){var example=elements[i];var toggle=KTUtil.find(example,'.example-toggle');var copy=KTUtil.find(example,'.example-copy');KTUtil.addEvent(toggle,'click',function(){var example=this.closest('.example');var code=KTUtil.find(example,'.example-code');var the=this;if(KTUtil.hasClass(this,'example-toggled')){KTUtil.slideUp(code,300,function(){KTUtil.removeClass(the,'example-toggled');KTUtil.removeClass(code,'example-code-on');KTUtil.hide(code)})}else{KTUtil.addClass(code,'example-code-on');KTUtil.addClass(this,'example-toggled');KTUtil.slideDown(code,300,function(){KTUtil.show(code)})}});var clipboard=new ClipboardJS(copy,{target:function(trigger){var example=trigger.closest('.example');var el=KTUtil.find(example,'.example-code .tab-pane.active');if(!el){el=KTUtil.find(example,'.example-code')}
return el}});clipboard.on('success',function(e){KTUtil.addClass(e.trigger,'example-copied');e.clearSelection();setTimeout(function(){KTUtil.removeClass(e.trigger,'example-copied')},2000)})}}
return{init:function(element,options){initDefaultMode(element);initCompactMode(element)}}}();if(typeof module!=='undefined'&&typeof module.exports!=='undefined'){module.exports=KTLayoutExamples}
"use strict";var KTLayoutQuickActions=function(){var _element;var _offcanvasObject;var _init=function(){var header=KTUtil.find(_element,'.offcanvas-header');var content=KTUtil.find(_element,'.offcanvas-content');_offcanvasObject=new KTOffcanvas(_element,{overlay:!0,baseClass:'offcanvas',placement:'right',closeBy:'kt_quick_actions_close',toggleBy:'kt_quick_actions_toggle'});KTUtil.scrollInit(content,{disableForMobile:!0,resetHeightOnDestroy:!0,handleWindowResize:!0,height:function(){var height=parseInt(KTUtil.getViewPort().height);if(header){height=height-parseInt(KTUtil.actualHeight(header));height=height-parseInt(KTUtil.css(header,'marginTop'));height=height-parseInt(KTUtil.css(header,'marginBottom'))}
if(content){height=height-parseInt(KTUtil.css(content,'marginTop'));height=height-parseInt(KTUtil.css(content,'marginBottom'))}
height=height-parseInt(KTUtil.css(_element,'paddingTop'));height=height-parseInt(KTUtil.css(_element,'paddingBottom'));height=height-2;return height}})}
return{init:function(id){_element=KTUtil.getById(id);if(!_element){return}
_init()},getElement:function(){return _element}}}();if(typeof module!=='undefined'){module.exports=KTLayoutQuickActions}
"use strict";var KTLayoutQuickCartPanel=function(){var _element;var _offcanvasObject;var _init=function(){_offcanvasObject=new KTOffcanvas(_element,{overlay:!0,baseClass:'offcanvas',placement:'right',closeBy:'kt_quick_cart_close',toggleBy:'kt_quick_cart_toggle'});var header=KTUtil.find(_element,'.offcanvas-header');var content=KTUtil.find(_element,'.offcanvas-content');var wrapper=KTUtil.find(_element,'.offcanvas-wrapper');var footer=KTUtil.find(_element,'.offcanvas-footer');KTUtil.scrollInit(wrapper,{disableForMobile:!0,resetHeightOnDestroy:!0,handleWindowResize:!0,height:function(){var height=parseInt(KTUtil.getViewPort().height);if(header){height=height-parseInt(KTUtil.actualHeight(header));height=height-parseInt(KTUtil.css(header,'marginTop'));height=height-parseInt(KTUtil.css(header,'marginBottom'))}
if(content){height=height-parseInt(KTUtil.css(content,'marginTop'));height=height-parseInt(KTUtil.css(content,'marginBottom'))}
if(wrapper){height=height-parseInt(KTUtil.css(wrapper,'marginTop'));height=height-parseInt(KTUtil.css(wrapper,'marginBottom'))}
if(footer){height=height-parseInt(KTUtil.actualHeight(footer));height=height-parseInt(KTUtil.css(footer,'marginTop'));height=height-parseInt(KTUtil.css(footer,'marginBottom'))}
height=height-parseInt(KTUtil.css(_element,'paddingTop'));height=height-parseInt(KTUtil.css(_element,'paddingBottom'));height=height-2;return height}})}
return{init:function(id){_element=KTUtil.getById(id);if(!_element){return}
_init()}}}();if(typeof module!=='undefined'){module.exports=KTLayoutQuickCartPanel}
"use strict";var KTLayoutQuickNotifications=function(){var _element;var _offcanvasObject;var _init=function(){var header=KTUtil.find(_element,'.offcanvas-header');var content=KTUtil.find(_element,'.offcanvas-content');_offcanvasObject=new KTOffcanvas(_element,{overlay:!0,baseClass:'offcanvas',placement:'right',closeBy:'kt_quick_notifications_close',toggleBy:'kt_quick_notifications_toggle'});KTUtil.scrollInit(content,{disableForMobile:!0,resetHeightOnDestroy:!0,handleWindowResize:!0,height:function(){var height=parseInt(KTUtil.getViewPort().height);if(header){height=height-parseInt(KTUtil.actualHeight(header));height=height-parseInt(KTUtil.css(header,'marginTop'));height=height-parseInt(KTUtil.css(header,'marginBottom'))}
if(content){height=height-parseInt(KTUtil.css(content,'marginTop'));height=height-parseInt(KTUtil.css(content,'marginBottom'))}
height=height-parseInt(KTUtil.css(_element,'paddingTop'));height=height-parseInt(KTUtil.css(_element,'paddingBottom'));height=height-2;return height}})}
return{init:function(id){_element=KTUtil.getById(id);if(!_element){return}
_init()},getElement:function(){return _element}}}();if(typeof module!=='undefined'){module.exports=KTLayoutQuickNotifications}
"use strict";var KTLayoutQuickPanel=function(){var _element;var _offcanvasObject;var _notificationsElement;var _logsElement;var _settingsElement;var _getContentHeight=function(){var height;var header=KTUtil.find(_element,'.offcanvas-header');var content=KTUtil.find(_element,'.offcanvas-content');var height=parseInt(KTUtil.getViewPort().height);if(header){height=height-parseInt(KTUtil.actualHeight(header));height=height-parseInt(KTUtil.css(header,'marginTop'));height=height-parseInt(KTUtil.css(header,'marginBottom'))}
if(content){height=height-parseInt(KTUtil.css(content,'marginTop'));height=height-parseInt(KTUtil.css(content,'marginBottom'))}
height=height-parseInt(KTUtil.css(_element,'paddingTop'));height=height-parseInt(KTUtil.css(_element,'paddingBottom'));height=height-2;return height}
var _init=function(){_offcanvasObject=new KTOffcanvas(_element,{overlay:!0,baseClass:'offcanvas',placement:'right',closeBy:'kt_quick_panel_close',toggleBy:'kt_quick_panel_toggle'})}
var _initNotifications=function(){KTUtil.scrollInit(_notificationsElement,{mobileNativeScroll:!0,resetHeightOnDestroy:!0,handleWindowResize:!0,height:function(){return _getContentHeight()}})}
var _initLogs=function(){KTUtil.scrollInit(_logsElement,{mobileNativeScroll:!0,resetHeightOnDestroy:!0,handleWindowResize:!0,height:function(){return _getContentHeight()}})}
var _initSettings=function(){KTUtil.scrollInit(_settingsElement,{mobileNativeScroll:!0,resetHeightOnDestroy:!0,handleWindowResize:!0,height:function(){return _getContentHeight()}})}
var _updateScrollbars=function(){$(_element).find('a[data-toggle="tab"]').on('shown.bs.tab',function(e){KTUtil.scrollUpdate(_notificationsElement);KTUtil.scrollUpdate(_logsElement);KTUtil.scrollUpdate(_settingsElement)})}
return{init:function(id){_element=KTUtil.getById(id);_notificationsElement=KTUtil.getById('kt_quick_panel_notifications');_logsElement=KTUtil.getById('kt_quick_panel_logs');_settingsElement=KTUtil.getById('kt_quick_panel_settings');_init();_initNotifications();_initLogs();_initSettings();_updateScrollbars()}}}();if(typeof module!=='undefined'){module.exports=KTLayoutQuickPanel}
"use strict";var KTLayoutQuickSearch=function(){var _element;var _offcanvasObject;var _init=function(){var header=KTUtil.find(_element,'.offcanvas-header');var content=KTUtil.find(_element,'.offcanvas-content');var form=KTUtil.find(_element,'.quick-search-form');var results=KTUtil.find(_element,'.quick-search-wrapper');_offcanvasObject=new KTOffcanvas(_element,{overlay:!0,baseClass:'offcanvas',placement:'right',closeBy:'kt_quick_search_close',toggleBy:'kt_quick_search_toggle'});KTUtil.scrollInit(results,{disableForMobile:!0,resetHeightOnDestroy:!0,handleWindowResize:!0,height:function(){var height=parseInt(KTUtil.getViewPort().height);if(header){height=height-parseInt(KTUtil.actualHeight(header));height=height-parseInt(KTUtil.css(header,'marginTop'));height=height-parseInt(KTUtil.css(header,'marginBottom'))}
if(content){height=height-parseInt(KTUtil.css(content,'marginTop'));height=height-parseInt(KTUtil.css(content,'marginBottom'))}
if(results){height=height-parseInt(KTUtil.actualHeight(form));height=height-parseInt(KTUtil.css(form,'marginTop'));height=height-parseInt(KTUtil.css(form,'marginBottom'));height=height-parseInt(KTUtil.css(results,'marginTop'));height=height-parseInt(KTUtil.css(results,'marginBottom'))}
height=height-parseInt(KTUtil.css(_element,'paddingTop'));height=height-parseInt(KTUtil.css(_element,'paddingBottom'));height=height-2;return height}})}
return{init:function(id){_element=KTUtil.getById(id);if(!_element){return}
_init()},getElement:function(){return _element}}}();if(typeof module!=='undefined'){module.exports=KTLayoutQuickSearch}
"use strict";var KTLayoutQuickUser=function(){var _element;var _offcanvasObject;var _init=function(){var header=KTUtil.find(_element,'.offcanvas-header');var content=KTUtil.find(_element,'.offcanvas-content');_offcanvasObject=new KTOffcanvas(_element,{overlay:!0,baseClass:'offcanvas',placement:'right',closeBy:'kt_quick_user_close',toggleBy:'kt_quick_user_toggle'});KTUtil.scrollInit(content,{disableForMobile:!0,resetHeightOnDestroy:!0,handleWindowResize:!0,height:function(){var height=parseInt(KTUtil.getViewPort().height);if(header){height=height-parseInt(KTUtil.actualHeight(header));height=height-parseInt(KTUtil.css(header,'marginTop'));height=height-parseInt(KTUtil.css(header,'marginBottom'))}
if(content){height=height-parseInt(KTUtil.css(content,'marginTop'));height=height-parseInt(KTUtil.css(content,'marginBottom'))}
height=height-parseInt(KTUtil.css(_element,'paddingTop'));height=height-parseInt(KTUtil.css(_element,'paddingBottom'));height=height-2;return height}})}
return{init:function(id){_element=KTUtil.getById(id);if(!_element){return}
_init()},getElement:function(){return _element}}}();if(typeof module!=='undefined'){module.exports=KTLayoutQuickUser}
"use strict";var KTLayoutScrolltop=function(){var _element;var _object;var _init=function(){_object=new KTScrolltop(_element,{offset:300,speed:600,})}
return{init:function(id){_element=KTUtil.getById(id);if(!_element){return}
_init()},getElement:function(){return _element}}}();if(typeof module!=='undefined'){module.exports=KTLayoutScrolltop}
"use strict";var KTLayoutSearch=function(){var _target;var _form;var _input;var _closeIcon;var _resultWrapper;var _resultDropdown;var _resultDropdownToggle;var _closeIconContainer;var _inputGroup;var _query='';var _hasResult=!1;var _timeout=!1;var _isProcessing=!1;var _requestTimeout=200;var _spinnerClass='spinner spinner-sm spinner-primary';var _resultClass='quick-search-has-result';var _minLength=2;var _showProgress=function(){_isProcessing=!0;KTUtil.addClass(_closeIconContainer,_spinnerClass);if(_closeIcon){KTUtil.hide(_closeIcon)}}
var _hideProgress=function(){_isProcessing=!1;KTUtil.removeClass(_closeIconContainer,_spinnerClass);if(_closeIcon){if(_input.value.length<_minLength){KTUtil.hide(_closeIcon)}else{KTUtil.show(_closeIcon,'flex')}}}
var _showDropdown=function(){if(_resultDropdownToggle&&!KTUtil.hasClass(_resultDropdown,'show')){$(_resultDropdownToggle).dropdown('toggle');$(_resultDropdownToggle).dropdown('update')}}
var _hideDropdown=function(){if(_resultDropdownToggle&&KTUtil.hasClass(_resultDropdown,'show')){$(_resultDropdownToggle).dropdown('toggle')}}
var _processSearch=function(){if(_hasResult&&_query===_input.value){_hideProgress();KTUtil.addClass(_target,_resultClass);_showDropdown();KTUtil.scrollUpdate(_resultWrapper);return}
_query=_input.value;KTUtil.removeClass(_target,_resultClass);_showProgress();_hideDropdown();setTimeout(function(){$.ajax({url:HOST_URL+'/api/quick_search.php',data:{query:_query},dataType:'html',success:function(res){_hasResult=!0;_hideProgress();KTUtil.addClass(_target,_resultClass);KTUtil.setHTML(_resultWrapper,res);_showDropdown();KTUtil.scrollUpdate(_resultWrapper)},error:function(res){_hasResult=!1;_hideProgress();KTUtil.addClass(_target,_resultClass);KTUtil.setHTML(_resultWrapper,'<span class="font-weight-bold text-muted">Connection error. Please try again later..</div>');_showDropdown();KTUtil.scrollUpdate(_resultWrapper)}})},1000)}
var _handleCancel=function(e){_input.value='';_query='';_hasResult=!1;KTUtil.hide(_closeIcon);KTUtil.removeClass(_target,_resultClass);_hideDropdown()}
var _handleSearch=function(){if(_input.value.length<_minLength){_hideProgress();_hideDropdown();return}
if(_isProcessing==!0){return}
if(_timeout){clearTimeout(_timeout)}
_timeout=setTimeout(function(){_processSearch()},_requestTimeout)}
return{init:function(id){_target=KTUtil.getById(id);if(!_target){return}
_form=KTUtil.find(_target,'.quick-search-form');_input=KTUtil.find(_target,'.form-control');_closeIcon=KTUtil.find(_target,'.quick-search-close');_resultWrapper=KTUtil.find(_target,'.quick-search-wrapper');_resultDropdown=KTUtil.find(_target,'.dropdown-menu');_resultDropdownToggle=KTUtil.find(_target,'[data-toggle="dropdown"]');_inputGroup=KTUtil.find(_target,'.input-group');_closeIconContainer=KTUtil.find(_target,'.input-group .input-group-append');KTUtil.addEvent(_input,'keyup',_handleSearch);KTUtil.addEvent(_input,'focus',_handleSearch);_form.onkeypress=function(e){var key=e.charCode||e.keyCode||0;if(key==13){e.preventDefault()}}
KTUtil.addEvent(_closeIcon,'click',_handleCancel)}}};if(typeof module!=='undefined'){module.exports=KTLayoutSearch}
var KTLayoutSearchInline=KTLayoutSearch;var KTLayoutSearchOffcanvas=KTLayoutSearch
