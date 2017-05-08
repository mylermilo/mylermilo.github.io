/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		factory(require('jquery'));
	} else {
		factory(jQuery); }
}(function ($) {
	var pluses = /\+/g;
	function encode(s) {
		return config.raw ? s : encodeURIComponent(s); }
	function decode(s) {
		return config.raw ? s : decodeURIComponent(s); }
	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value)); }
	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\'); }
		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {} }
	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value; }
	var config = $.cookie = function (key, value, options) {
		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);
			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5); }
			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join('')); }
		var result = key ? undefined : {};
		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');
			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break; }
			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie; } }
		return result; };
	config.defaults = {};
	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false; }
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};
}));









// author: The Barn Agency
// description: 4 homepage section animation for desktops

$ = jQuery.noConflict();
jQuery(function(){

	// console.log($('.u-loading').length);

	var Elements = {
		headercontainer: $('.Header'),
		headerwrapper: $('.Headerwrapper'),
		burger: $('.Header-burger'),
		headernav: $('.Header-navigation'),
		headerSearchicon: $('.Header-Searchicon'),
		headerSearchform: $('.Searchform'),
		main: $('main'),
		footer: $('footer'),
		footerSubscribeDesktop: $('.u-hideOnTablet .Footer-subscribe'),
		footerSubscribeMobile: $('.u-showOnTablet .Footer-subscribe'),
		movableBySidebar: $('.Footer-wrapper, body > div > main, .Header-navigation, .Header-burger'),
		backToTop: $('.Footer-copyBacktop, .u-backtotop'),
		toEqualWinHeightHome: $('.Home, .Bodywrapper, .Header-navigation').add($('body.home').parent()),
		toEqualWinHeight: $('.Searchform-wrapper, .Searchform-overlay, .Home-splitter'),
		toMinWinHeight: $('.Bodywrapper'),
		toGiveFooterPadding: $('.Bodywrapper'),

		// brands page
		brandFilterContainer: $('.Page-headerFilters'),
		brandFilterToggleTrigger: $('.Page-headerFiltershow'),
		brandFilters: $('.Page-headerFiltersFilter'),
		brandSearch: $('.Page-headerBrandsearchText > input'),
		brandLists: $('.Page-brandListsList'),
		brandFilterLetterList: $('.Page-headerBrandsearchList'), 
		brandFilterLetter: $('.Page-headerBrandsearchListLetter'),
		brandFilterTextInput: $('.Page-headerBrandsearchTextInput'),
		brandFilterTextClear: $('.Page-headerBrandsearchTextClose'),

		sectionsPage: $('.Page--sections'),
		paralaxElements: $('.Page-sectionColumnLinks, .u-childParalaxImage > a, .Post-sectionTextLink'), //.u-childParalaxImage > img
		paralaxElementsWaitForPageLoad: $('.Page-sectionColumn--overtheimage'),
	}

	var BarnGeneral = {
		// general settings
		showFooterSpeed: 500, //ms
		showFooterEasing: 'swing',
		win: {X: $(window).width(), Y: $(window).height()}, 
		footerHeight: Elements.footer.outerHeight(),
		footerSubscribeCurrentUsed: 'desktop',
		pageIsHome: $('body.home').length > 0,
		backToTopTime: 1000,
		backToTopEasing: 'swing',
		// it is important that BarnGeneral.subnavOpenSpeed below is roughly equal to searchform opacity transition in CSS
		subnavOpenSpeed: 500,
		subnavOpenEasing: 'swing',
		tabletX: 1024,
		// tablet: false,
		supportTouch: false,
		isMobile: false,
		searchShown: false,
		staticHome: false,
		searchShownByTap: false,
		searchShownByClick: false,
		stickyHeader: false,
		menuShown: false,

		popupEl: $('.Popup'),

		// subscribeError: $('.Footer-subscribeResponses--error').eq(0),
		// subscribeSuccess: $'.Footer-subscribeResponses--success').eq(0),
		// subscribeForm: $('.Footer-subscribe').eq(0),

		// hook up all events, prepare layouts, etc
		initialize: function(){
			// detect supportTouch
			if(BarnGeneral.win.X > BarnGeneral.tabletX || !Modernizr.touch){ 
				BarnGeneral.supportTouch = false;
			}else if(Modernizr.touch){ 
				BarnGeneral.supportTouch = true;
			}
			if(navigator.userAgent.match(/iPad/i) != null || BarnGeneral.win.X <= BarnGeneral.tabletX){
				$('body').addClass('ipad');
				BarnGeneral.staticHome = true;
			}

			BarnGeneral.prepareStickyHeader();

			// homepage prep
			if(BarnGeneral.pageIsHome && !BarnGeneral.staticHome){
				Elements.footer.addClass('u-absolute');
				BarnGeneral.toggleFooter(false);

				$(window).resize(function(){
					Elements.toEqualWinHeightHome.css('height', BarnGeneral.win.Y+'px');
					Elements.toEqualWinHeight.css('height', BarnGeneral.win.Y+'px');
				}).resize();
				$(window).on('orientationchange', function(){
					Elements.toEqualWinHeightHome.css('height', BarnGeneral.win.Y+'px');
					Elements.toEqualWinHeight.css('height', BarnGeneral.win.Y+'px');
				});

				// $('html').css('overflow', 'hidden');
				if(BarnGeneral.win.X > BarnGeneral.tabletX || !BarnGeneral.supportTouch){ // big screen OR no touch - assuming standard desktop
					$(window).mousemove(function(e){
						if((BarnGeneral.win.Y - 50) < e.pageY){
							BarnGeneral.toggleFooter(true);
						}else if((BarnGeneral.win.Y - BarnGeneral.footerHeight) > e.pageY) {
							BarnGeneral.toggleFooter(false);
						}
					});
				}else if(BarnGeneral.win.X <= BarnGeneral.tabletX && BarnGeneral.supportTouch){ // small screen AND no touch - assuming standard MOBILE
					BarnGeneral.initMobileTouchEtc();
				}				
			}else {
				$(window).resize(function(){
					Elements.toEqualWinHeight.css('height', BarnGeneral.win.Y+'px');
				}).resize();
				$(window).on('orientationchange', function(){
					Elements.toEqualWinHeight.css('height', BarnGeneral.win.Y+'px');
				});

				if(BarnGeneral.win.X <= BarnGeneral.tabletX && BarnGeneral.supportTouch){ // small screen AND no touch - assuming standard MOBILE
					BarnGeneral.initMobileTouchEtc();
				}

				// Elements.toGiveFooterPadding.css('padding-bottom', (BarnGeneral.footerHeight+100)+'px');
				// Elements.toMinWinHeight.css('min-height', BarnGeneral.win.Y+'px');
			}
			var navH = $('body').outerHeight() - $('body > footer').outerHeight(); 
			Elements.headernav.css('height', navH);

			BarnGeneral.prepareBurgerMenu();

			// hide sidebar on main or footer click
			Elements.main.add(Elements.footer).click(function(){
				Elements.movableBySidebar.removeClass('u-active');
			});

			// back to top in the footer
			Elements.backToTop.click(function(){
				if(BarnGeneral.pageIsHome && !BarnGeneral.staticHome){
					HomeSlideshow.backToFirst();
				}else {
					$("html, body").animate({ scrollTop: "0px" },  {duration: BarnGeneral.backToTopTime, easing: BarnGeneral.backToTopEasing});
				}
			});


			// prepare sidenav
			$('> ul > li', Elements.headernav).each(function(){
				var listEl = $(this);
				var link = $('> a', this);

				// remove dummy links to avoid confusing visitors
				if(link.prop('href').indexOf('google') > -1){
					link.prop('href', '#subnavigation');
				}

				// submenu prep and click opens
				var submenu = $('+ ul', link);
				if(submenu.length > 0){
					submenu.data('height', submenu.outerHeight()).css({'height': '0px'});
					listEl.addClass('u-hasSubmenu').click(function(e){
						if(listEl.hasClass('u-active')){
							listEl.removeClass('u-active');
							submenu.animate({'height': '0px'}, {duration: BarnGeneral.subnavOpenSpeed, easing: BarnGeneral.subnavOpenEasing, queue: false});
						}else {
							listEl.addClass('u-active');
							submenu.animate({'height': submenu.data('height')+'px'}, {duration: BarnGeneral.subnavOpenSpeed, easing: BarnGeneral.subnavOpenEasing, queue: false});
						}
						e.stopPropagation();
					});
					link.click(function(e){
						e.preventDefault();
					});
				}else { // pass li clicks to the first link inside
					link.click(function(e){
						e.stopPropagation();
					});
					listEl.click(function(e){
						link.get(0).click();
						e.stopPropagation();
					});
				}
			});
		
			BarnGeneral.initFooterSubscribe(Elements.footerSubscribeDesktop, 'desktop');
			BarnGeneral.initFooterSubscribe(Elements.footerSubscribeMobile, 'mobile');

			$(window).resize(function(){
				BarnGeneral.win.X = $(window).width();
				BarnGeneral.win.Y = $(window).height();
				BarnGeneral.footerHeight = Elements.footer.outerHeight();
			});

			BarnGeneral.prepareSearchFormOverlay();

			$('.Searchform-wrapper > *', Elements.headerSearchform).click(function(e){
				e.stopPropagation();
			});
			$('body').click(function(){
				// Elements.headerSearchform.removeClass('u-active');
				BarnGeneral.toggleSearchFormOverlay(false);
				BarnGeneral.toggleBurgerMenu(false);
				BarnGeneral.toggleStickyHeader();
				// BarnGeneral.searchShown = false;
				// BarnGeneral.searchShownByClick = false;
				// BarnGeneral.shownByTap = false;
			});

			// BarnGeneral.initPopup();

		},
		initMobileTouchEtc: function(){
			var swipablePlaces = Elements.main.add(Elements.footer).add(Elements.headercontainer);
			$('body').on('swiperight', swipablePlaces, function(e){ 
				if(!BarnGeneral.searchShown){
					Elements.movableBySidebar.addClass('u-active');
					// var scrollTo = 0;
					// $("html, body").animate({ scrollTop: scrollTo },  {duration: BarnGeneral.backToTopTime, easing: BarnGeneral.backToTopEasing});
					e.preventDefault();
				}
			});


			$('body').on('swipeleft', swipablePlaces, function(e){ 
				if(!BarnGeneral.searchShown){
					Elements.movableBySidebar.removeClass('u-active');
					e.preventDefault();
				}
			});

			if(!BarnGeneral.staticHome){
				$('body.home footer').css('display', 'none');
			}

			BarnGeneral.isMobile = true;
		},
		// shows or hides the footer on mousehove, set to 100px from bottom to show, hides when mouse is moved above footer
		toggleFooter: function(show){
			if(BarnGeneral.pageIsHome && Elements.footer.data('shownBySlideshow') != 'true'){
				show = typeof show == 'undefined' ? true : show;
				if(show){
					if(Elements.footer.data('shown') != 'true'){
						Elements.footer.data('shown', 'true');
						Elements.footer.data('shownByHover', 'true');
						Elements.footer.animate({'bottom': '0'}, {duration: BarnGeneral.showFooterSpeed, easing: BarnGeneral.showFooterEasing, queue: false});
					}
				}else {
					if(Elements.footer.data('shown') != 'false'){
						Elements.footer.data('shown', 'false');
						Elements.footer.animate({'bottom': '-'+(Elements.footer.outerHeight()+100)}, {duration: BarnGeneral.showFooterSpeed, easing: BarnGeneral.showFooterEasing, queue: false, complete: function(){
							Elements.footer.data('shownByHover', 'false');
						}});
					}
				}
			}
		},
		validateEmailFormat: function(emailAddress) {
			var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
			return pattern.test(emailAddress);
		},
		initFooterSubscribe: function(form, mode){
			mode = mode == 'undefined' ? 'desktop' : mode;
			if (form.length > 0 ) {
				$('.Footer-subscribeResponse--error', form).hide();
				$('.Footer-subscribeResponse--success', form).hide();

				form.bind('submit', function ( event ) {
					if ( event ) event.preventDefault();
					if ( BarnGeneral.validateEmailFormat($('input[type=email]', form).val()) ) { 
						BarnGeneral.submitFooterSubscribe(form, mode); 
					}else {
						$('.Footer-subscribeResponse--error', form).show().text('Please provide a valid email address');
					}
				});
			}
		},
		submitFooterSubscribe: function(form, mode){
			$('.Footer-subscribeResponse--error', form).hide();
			$('.Footer-subscribeResponse--success', form).hide();

			BarnGeneral.footerSubscribeCurrentUsed = mode;

			$.ajax({
				type: form.attr('method'),
				url: form.attr('action'),
				data: form.serialize(),
				cache : false,
				dataType : 'json',
				contentType: "application/json; charset=utf-8",
				error : function(err) { 
					if(BarnGeneral.footerSubscribeCurrentUsed == 'desktop'){
						$('.Footer-subscribeResponse--error', Elements.footerSubscribeDesktop).show(0).text("Could not connect to the registration server. Please try again later."); 
					}else {
						$('.Footer-subscribeResponse--error', Elements.footerSubscribeMobile).show(0).text("Could not connect to the registration server. Please try again later.");
					}
				},
				success : function(data) {
					if(BarnGeneral.footerSubscribeCurrentUsed == 'desktop'){
						form = Elements.footerSubscribeDesktop;
					}else {
						form = Elements.footerSubscribeMobile;
					};
					if (data.result != "success") {
						$('.Footer-subscribeResponse--error', form).show(0).html(data.msg);
						$('.Footer-subscribeResponse--success', form).hide(0);
					}else {
						$(form).attr('disabled', true);
						$('input[type=email]', form).attr('readonly', 'readonly');
						$('.Footer-subscribeResponse--success', form).show(0).text('Thank you for subscribing');
					}
				}
			});
		},
		prepareStickyHeader: function(){
			$(window).scroll(function(){
				if(!BarnGeneral.searchShown && !BarnGeneral.menuShown){
					BarnGeneral.toggleStickyHeader();
				}
			});
		},
		toggleStickyHeader: function(state){
			var headHeight = 100;
			var winTop = $(window).scrollTop();
			if(typeof state == 'undefined'){
				if(!BarnGeneral.stickyHeader){
					// console.log()
					if(winTop > headHeight){
						Elements.headerwrapper.addClass('u-active');
						BarnGeneral.stickyHeader = true;
					}
				}else {
					if(winTop < headHeight){
						Elements.headerwrapper.removeClass('u-active');
						BarnGeneral.stickyHeader = false;
					}
				}
			}else {
				if(state == true){
					Elements.headerwrapper.addClass('u-active');
					BarnGeneral.stickyHeader = true;
				}else if(state == false) {
					Elements.headerwrapper.removeClass('u-active');
					BarnGeneral.stickyHeader = false;
				}
			}
		},
		prepareBurgerMenu: function(){
			Elements.burger.click(function(e){
				if(Elements.movableBySidebar.hasClass('u-active')){
					BarnGeneral.toggleBurgerMenu(false);
				}else {
					BarnGeneral.toggleBurgerMenu(true);
				}
				e.stopPropagation();
			});
		},
		toggleBurgerMenu: function(state){
			state = typeof state == 'undefined' ? false : state;
			if(state){
				// console.log('burger', state);
				Elements.movableBySidebar.addClass('u-active');
				BarnGeneral.toggleStickyHeader(false);
				BarnGeneral.menuShown = true;
			}else {
				Elements.movableBySidebar.removeClass('u-active');
				BarnGeneral.toggleStickyHeader();
				BarnGeneral.menuShown = false;
			}
			BarnGeneral.toggleSearchFormOverlay(undefined,false);
		},
		prepareSearchFormOverlay: function(){
			Elements.headerSearchicon.click(function(e){
				if(!BarnGeneral.shownByTap){
					BarnGeneral.toggleSearchFormOverlay('click');
				}
				e.stopPropagation();
			});
			Elements.headerSearchicon.on('tap', function(e){
				if(!BarnGeneral.searchShownByClick){
					BarnGeneral.toggleSearchFormOverlay('tap');
				}
				e.stopPropagation();
			});
		},
		toggleSearchFormOverlay: function(type, state){
			state = typeof state == 'undefined' ? '' : state;
			type = typeof type == 'undefined' ? '' : type;

			if(Elements.headerSearchform.hasClass('u-active') && state !== true){
				Elements.headerSearchform.removeClass('u-active');
					// console.log('will remove');
				setTimeout(function(){
					// console.log('removing!');
					Elements.headerSearchform.removeClass('u-prepare');
					BarnGeneral.searchShown = false;
				},BarnGeneral.subnavOpenSpeed);
				BarnGeneral.toggleStickyHeader();

				BarnGeneral.searchShownByClick = false;
				BarnGeneral.shownByTap = false;
			}else if(state !== false){
					// console.log('blah');
				// Elements.headerSearchform.removeClass('u-prepare');
				Elements.headerSearchform.addClass('u-prepare');
				Elements.headerSearchform.addClass('u-active');
				BarnGeneral.searchShown = true;
				BarnGeneral.searchShownByClick = true;
				BarnGeneral.toggleStickyHeader(false);

				if(type.length){
					if(type == 'tap'){
						BarnGeneral.searchShownByClick = false;
						BarnGeneral.shownByTap = true;
					}else if(type == 'click'){
						BarnGeneral.searchShownByClick = true;
						BarnGeneral.shownByTap = false;
					}
				}
				Elements.movableBySidebar.removeClass('u-active');
			}

		},
		initPopup: function(){
			var popupshown = $.cookie('popupshown');
			if(popupshown != 'yes'){
				BarnGeneral.popupEl.addClass('u-preparetoshow');
				setTimeout(function(){
					BarnGeneral.popupEl.addClass('u-show');
					$.cookie('popupshown', 'yes');
				}, 100);

				$('.Popup-contents').click(function(e){
					e.stopPropagation();
				});
				$('.Popup').click(function(e){
					BarnGeneral.popupEl.removeClass('u-show');
					setTimeout(function(){
						BarnGeneral.popupEl.removeClass('u-preparetoshow');
					}, 500);
				});
			}

		},
	}

	var BarnBrands = {
		brandFiltersOpenTime: 500,
		brandFiltersOpenEasing: 'swing',
		visibleBrandLists: Elements.brandLists,
		lettersOfShownBrandlists: [],

		// hook up all events, prepare layouts, etc
		initialize: function(){

			// brandlist prep
			Elements.brandFilterContainer.data('height', Elements.brandFilterContainer.outerHeight()); // save the open height
			BarnBrands.toggleFilters(false, 0);
			Elements.brandFilterToggleTrigger.click(function(){
				BarnBrands.toggleFilters();
			});
			setTimeout(function(){
				Elements.brandFilterContainer.css('opacity', 1);
			},BarnBrands.brandFiltersOpenTime);

			BarnBrands.updateFiltersLetters(false); // save available brand letters

			// brandlist filtering - tags
			Elements.brandFilters.click(function(){
				var hasActive = $(this).hasClass('u-active');
				var hasInactive = $(this).hasClass('u-inactive');
				var filter = $(this).data('filter');
				var tag;

				BarnBrands.resetBrandFilters(true,true,false); // dont reset the tag filters

				// hide / show brandlist li elements with tags, or show all
				if(hasActive){
					Elements.brandFilters.removeClass('u-active');
				}else if(!hasActive && !hasInactive){
					Elements.brandFilters.removeClass('u-active');
					$(this).addClass('u-active');
					if(BarnGeneral.isMobile){
						var scrollTo = $('.Page-brandLists').position().top;
						$("html, body").animate({ scrollTop: scrollTo },  {duration: BarnGeneral.backToTopTime, easing: BarnGeneral.backToTopEasing});
					}
					Elements.brandLists.each(function(i,list){
						$('li',list).each(function(i2,listEl){
							tag = $(listEl).data('tags');
							if(tag.indexOf(filter) == -1){
								$(this).hide(0);
							}else {
								$(this).show(0);
							}
						});
					});
				};

				BarnBrands.hideEmptyBrandLists();
				BarnBrands.updateFiltersLetters();
			});

			// brandlist filtering - letters
			Elements.brandFilterLetter.click(function(){
				var hasActive = $(this).hasClass('u-active');
				var hasInactive = $(this).hasClass('u-inactive');

				BarnBrands.resetBrandFilters(true,false); // dont reset the letter filters

				if(hasActive){
					BarnBrands.filterBrandsByLetter();
					Elements.brandFilterLetter.removeClass('u-active');
				}else if(!hasActive){ //&& !hasInactive
					Elements.brandFilterLetter.removeClass('u-active');
					$(this).addClass('u-active');
					BarnBrands.filterBrandsByLetter($(this).text().trim());
				}
			});

			// adjust brandlist letter container based on number of letters inside - for mobile - special case
			if(BarnGeneral.win.X <= 480){
				if(Elements.brandFilterLetter.length > 20){
					Elements.brandFilterLetterList.css('height', '90px');
				}
			}

			// search text
			Elements.brandFilterTextInput.keyup(function(e){
				var search = $(this).val().toLowerCase();
				BarnBrands.resetBrandFilters(false);
				if(search.length > 0){
					Elements.brandLists.each(function(i, brandlist){
						var compareText = '';
						$('li',brandlist).each(function(){
							compareText = $(this).text().toLowerCase();
							if(compareText.indexOf(search) > -1){ // search match
								$(this).show();
							}else { // no search match
								$(this).hide();
							}
						});	
					});
					BarnBrands.hideEmptyBrandLists();
					BarnBrands.updateFiltersLetters();
				}
			});
			// clear search input
			Elements.brandFilterTextClear.click(function(){
				BarnBrands.resetBrandFilters(); // reset all filters, including search
			});
		},
		resetBrandFilters: function(clearSearch, clearLetters, clearTags, showLists){
			clearSearch = typeof clearSearch == 'undefined' ? true : clearSearch;
			clearLetters = typeof clearLetters == 'undefined' ? true : clearLetters;
			clearTags = typeof clearTags == 'undefined' ? true : clearTags;
			showLists = typeof showLists == 'undefined' ? true : showLists;

			if(clearSearch){
				Elements.brandFilterTextInput.val('');
			}
			if(clearLetters){
				Elements.brandFilterLetter.removeClass('u-active').removeClass('u-inactive');
			}
			if(clearTags){
				Elements.brandFilters.removeClass('u-active');
			}
			if(showLists){
				$(Elements.brandLists).show().find('li').show();
			}
			
			BarnBrands.visibleBrandLists = Elements.brandLists;
			BarnBrands.updateFiltersLetters(false);
		},
		updateFiltersLetters: function(checkForInactiveLetters){
			checkForInactiveLetters = typeof checkForInactiveLetters == 'undefined' ? true : checkForInactiveLetters;
			// update shown brandlist letter data
			var shownBrandlists = BarnBrands.visibleBrandLists;
			var lettersOfShownBrandlists = [];
			shownBrandlists.each(function(){
				var letter = $(this).data('letter');
				if($.inArray(letter,lettersOfShownBrandlists) == -1){
					lettersOfShownBrandlists.push(letter);
				}
			});
			BarnBrands.lettersOfShownBrandlists = lettersOfShownBrandlists;

			if(checkForInactiveLetters){
				// disable letters which have no brands shown
				Elements.brandFilterLetter.each(function(i,filter){
					filterletter = $(filter).data('letter');
					if($.inArray(filterletter,lettersOfShownBrandlists) != -1){
						$(filter).removeClass('u-inactive');
					}else {
						$(filter).addClass('u-inactive');
					}
				});
			}
		},
		hideEmptyBrandLists: function(){
			Elements.brandLists.each(function(i, brandlist){
				if($('li:visible',brandlist).length == 0){
					$(brandlist).hide();
					BarnBrands.visibleBrandLists = BarnBrands.visibleBrandLists.not($(brandlist));
				}else {
					$(brandlist).show();
					BarnBrands.visibleBrandLists = BarnBrands.visibleBrandLists.add($(brandlist));
				}
			});
		},
		// fired by clicking the letters, filters the lists by the first letter
		filterBrandsByLetter: function(letter){
			if(typeof letter != 'undefined' && letter.length > 0){
				Elements.brandLists.filter(function(){
					return $(this).data('letter') != letter; 
				}).hide();
				var shownBrandlists = Elements.brandLists.filter(function(){
					return $(this).data('letter') == letter; 
				}).show();
				BarnBrands.visibleBrandLists = shownBrandlists;
			}else {
				Elements.brandLists.show();
				BarnBrands.visibleBrandLists = Elements.brandLists;
			}
			BarnBrands.updateFiltersLetters();
		},
		
		// show/hide brand top filters - by tags
		toggleFilters: function(show, time){
			time = typeof time == 'undefined' ? BarnBrands.brandFiltersOpenTime : time;
			var heightToSet = Elements.brandFilterContainer.data('height');
			if(typeof show == 'undefined'){
				if(Elements.brandFilterContainer.hasClass('u-active')){
					show = false;
				}else {
					show = true;
				}
			}
			if(Elements.brandFilterContainer.hasClass('u-active') || show === false){
				Elements.brandFilterToggleTrigger.removeClass('u-active');
				Elements.brandFilterContainer.animate({'height': 0}, {duration: time, easing: BarnBrands.brandFiltersOpenEasing, queue: false});
				Elements.brandFilterContainer.removeClass('u-active');
			}else if(show === true){
				Elements.brandFilterToggleTrigger.addClass('u-active');
				Elements.brandFilterContainer.animate({'height': heightToSet+'px'}, {duration: time, easing: BarnBrands.brandFiltersOpenEasing, queue: false});
				Elements.brandFilterContainer.addClass('u-active');
			}
		},
	}

	var BarnPages = {
		paralaxDistance: BarnGeneral.win.Y * 0.25,
		paralaxDistanceLinks: BarnGeneral.win.Y * 0.15,
		paralaxScreenEndpoint: 0.45, // or 50%, meaning vertical screen center, 0.4 would be above it, 0 top of screen   
		initialize: function(){
			
			$(window).resize(function(){
				BarnPages.updateParalaxElementsData();
				BarnPages.animateParalaxElements(Elements.paralaxElements);
				BarnPages.animateParalaxElements(Elements.paralaxElementsWaitForPageLoad);
			});
			

			Elements.paralaxElements.each(function(i,el){
				if($(this).is('img')){
					$(this).imagesLoaded(function(){
						BarnPages.updateParalaxElementsData(true, el);
						BarnPages.animateParalaxElements(el);
					});
				}else {
					BarnPages.updateParalaxElementsData(true, el);
					BarnPages.animateParalaxElements(el);
				}
			});
			if(Elements.paralaxElementsWaitForPageLoad.length > 0){
				Elements.paralaxElementsWaitForPageLoad.parents('main').imagesLoaded(function(){
					BarnPages.updateParalaxElementsData(true, Elements.paralaxElementsWaitForPageLoad);
					BarnPages.animateParalaxElements(Elements.paralaxElementsWaitForPageLoad);
				});
			}


			var savedWindowScrollTop = 0;
			(function paralaxAnimationLoop(){
				requestAnimFrame(paralaxAnimationLoop);
				if(savedWindowScrollTop != $(window).scrollTop()){
					savedWindowScrollTop = $(window).scrollTop();
					BarnPages.animateParalaxElements(Elements.paralaxElements);
					BarnPages.animateParalaxElements(Elements.paralaxElementsWaitForPageLoad);
				}
			})();




			// $(window).scroll(function(){
			// });
		},
		updateParalaxElementsData: function(firstRun,elements){
			elements = typeof elements == 'undefined' ? Elements.paralaxElements : elements;
			firstRun = typeof firstRun == 'undefined' ? false : firstRun;

			$(elements).each(function(i,paralaxElement){
				// if(typeof $(paralaxElement).offset() == 'undefined'){
					// console.log(paralaxElement);
				// }
				var animationStartPoint = $(paralaxElement).offset().top - (BarnPages.paralaxScreenEndpoint * BarnGeneral.win.Y);
				if(animationStartPoint < 0){
					animationStartPoint = 0;
				}
				if($(this).is('img')){
					var elementMoveDistance = (BarnPages.paralaxScreenEndpoint * BarnGeneral.win.Y) + $(this).outerHeight() + BarnPages.paralaxDistance;
				}else if($(this).is('a')){
					var elementMoveDistance = (BarnPages.paralaxScreenEndpoint * BarnGeneral.win.Y) + $(this).outerHeight() + BarnPages.paralaxDistanceLinks;
				}else {
					var elementMoveDistance = (BarnPages.paralaxScreenEndpoint * BarnGeneral.win.Y) + $(this).outerHeight() + BarnPages.paralaxDistance;
				}

				$(paralaxElement).data('animationStartPoint', animationStartPoint);
				$(paralaxElement).data('elementMoveDistance', elementMoveDistance);

				if(firstRun){
					var hasMarginTop = $(paralaxElement).css('margin-top') != '0px' && $(paralaxElement).css('margin-top') != 'auto';
					var hasTop = $(paralaxElement).css('top') != '0px' && $(paralaxElement).css('top') != 'auto';
					var hasBottom = $(paralaxElement).css('bottom') != '0px' && $(paralaxElement).css('bottom') != 'auto';
					var hasPosAbs = $(paralaxElement).css('position') == 'absolute';

					if(!hasBottom){
						$(paralaxElement).data('attributeToMoveBy', 'top');
						valueToSave = parseInt($(paralaxElement).css('top'));
					}else if(hasBottom && !hasTop){
						$(paralaxElement).data('attributeToMoveBy', 'bottom');
						valueToSave = parseInt($(paralaxElement).css('bottom'));
					}else if(hasMarginTop && !hasPosAbs){
						$(paralaxElement).data('attributeToMoveBy', 'margin-top');
						valueToSave = parseInt($(paralaxElement).css('margin-top'));
					}else {
						$(paralaxElement).data('attributeToMoveBy', 'top');
						valueToSave = parseInt($(paralaxElement).css('top'));
					}
					if(isNaN(valueToSave)) valueToSave = 0;
					$(paralaxElement).data('attributeToMoveByStartval', valueToSave );
				}
			});
		},
		animateParalaxElements: function(elements){
			// console.log(BarnGeneral.win.X > BarnGeneral.tabletX, !BarnGeneral.supportTouch);
			if(BarnGeneral.win.X > BarnGeneral.tabletX){
				var winTop = $(window).scrollTop();
				var animationStage;
				$(elements).each(function(i,element){

					var animationStartPoint = $(element).data('animationStartPoint');
					var elementMoveDistance = $(element).data('elementMoveDistance');

					
					if($(this).is('img')){
						var paralaxDistance = BarnPages.paralaxDistance;
						// return;
					}else if($(this).is('a')){
						var paralaxDistance = BarnPages.paralaxDistanceLinks;
					}else {
						var paralaxDistance = BarnPages.paralaxDistance;
					}

					var attributeToMoveBy = $(element).data('attributeToMoveBy');
					var attributeToMoveByStartval = $(element).data('attributeToMoveByStartval');

					// console.log($(element).attr('class'),attributeToMoveBy,attributeToMoveByStartval, animationStartPoint, elementMoveDistance);

					if(typeof attributeToMoveBy != 'undefined'){
						if(winTop > animationStartPoint){ 
							if(winTop <= (animationStartPoint + elementMoveDistance)){ // animate down
								animationStage = (winTop - animationStartPoint)/elementMoveDistance;
								
								
								if(attributeToMoveBy != 'bottom'){
									$(element).css(attributeToMoveBy, (paralaxDistance * animationStage)+attributeToMoveByStartval+'px');
								}else {
									$(element).css(attributeToMoveBy, ((paralaxDistance * animationStage)*(-1)+attributeToMoveByStartval)+'px');
								}
							} else { // keep down
								if(attributeToMoveBy != 'bottom'){
									$(element).css(attributeToMoveBy, paralaxDistance+attributeToMoveByStartval+'px');
								}else {
									$(element).css(attributeToMoveBy, paralaxDistance*(-1)+attributeToMoveByStartval+'px');
								}
							}
						}else { // screen above - keep at normal position
							$(element).css(attributeToMoveBy, attributeToMoveByStartval);
						}
					}

				});
			}else {
				// $(elements).css(attributeToMoveBy, attributeToMoveByStartval);
			}
		},

	}

	// run all the default actions
	BarnGeneral.initialize(); 
	BarnBrands.initialize(); 
	BarnPages.initialize();




	// home page fancy section navigation
	var HomeSlideshow = {
		sectionsSelector: 'section.Home-splitter:not(.u-nomove)',
		sectionsContainer: $('main.Home'),
		sections: $('main > section.Home-splitter:not(.u-nomove)'),
		// animationTypes: ['.split','.nocontent'],
		mousePosition: $(window).scrollTop(), // starting mouse Y scroll position
		windowHeight: $(window).height(),
		stepSize: $(window).height()*3, // adjust to change the mousewheel distance required to move sections - the more the slower
		endingSpeed: 0, // speed of clearing up the layout when switching sections
		animationFactor: 0, // factors in the section animation speed 
		currentStep: 0,
		currentStepPercent: 0,
		mouseEventsGatherInterval: 16, //ms between runing the animations - gathering mouse data in the meantime
		easingFunction: 'easeInOutQuad',
		fadeTresholds: { fadeInUntil: 0.35, fadeOutAbove: 0.7 },
		splitTresholds: { startHidingAt: 0.5 },
		showFullSectionStepPercent: 0.5, // used for mobile
		mobileTimeout: false,
		scrollSensitivity: 10000, //100 means a scroll can move the sections a minimum of 1%, 1000 means a minimum of 0.1%
		footerIsAnimating: false,
		/* Home-splitterImage - background images to behave in default way - slide out on scroll-down
		* fadeout - background images to fade out on scroll-out
		* Home-splitterContent - content boxes to move up and fade in on scroll-in & move up and fade out on scroll-up
		* Home-splitterLink - floating link-boxes */
		animationGroups: ['Home-splitterImage', 'Home-splitterContent', 'Home-splitterLink'], // basically classes of elements in sections
		animationValues: {'--center': {'left': -100, 'right': 100}, '--left': {'left': -100, 'right': -120}, '--right': {'left': -120, 'right': -100}, '--none': {'full': -100}, '--fadeout': {'opacity': 1}, /* content box */ 'splitterLink': {'left': 125, 'right': 80}, }, // those include classes found on sections and their elements

		prepare: function(){
			HomeSlideshow.sectionsLength = HomeSlideshow.sections.length;
			HomeSlideshow.maxMousePosition = HomeSlideshow.stepSize * HomeSlideshow.sectionsLength; // calculate maximum mouse position (bottom page Y value)


			// HomeSlideshow.
			$(HomeSlideshow.sections).each(function(index){
				$(this).css('z-index', HomeSlideshow.sectionsLength+1-index); // put higher sections above the ones lower on the page in the animations
				if(HomeSlideshow.animationFactor > 0) $(this).data('animating', false); // set animating state to false, but dont bother if animation time is 0
				$(this).data('state', 0); // set section state to beginning
				$(this).data('animatedTo', 0); // used to check if the section was animated to a certain step already

				// prepare children selectors
				var section = $(this);
				$.each(HomeSlideshow.animationGroups, function(i,group){
					section.data(group+'Elements', $('> .'+group, section));
				});

				// set end animation state data to elements for easy retrieval
				// prepare children animation behaviour data
				var thisClass = $(this).prop('class');
				for (var classCheck in HomeSlideshow.animationValues) {
				   if (HomeSlideshow.animationValues.hasOwnProperty(classCheck)) {
						var values = HomeSlideshow.animationValues[classCheck];
						if(thisClass.indexOf(classCheck) > -1){  // classes found on sections
							if(classCheck == '--center' || classCheck == '--left' || classCheck == '--right'){
								$(section.data('Home-splitterImageElements')).eq(0).data('endState', HomeSlideshow.animationValues[classCheck].left); //assuming the --left is first and --right is second
								$(section.data('Home-splitterImageElements')).eq(1).data('endState', HomeSlideshow.animationValues[classCheck].right);
							}else if(classCheck == '--none'){
								$(section.data('Home-splitterImageElements')).eq(0).data('endState', HomeSlideshow.animationValues[classCheck].full);
							}

						}
						if(classCheck == 'splitterLink'){
							$(section.data('Home-splitterLinkElements')).eq(0).data('endState', HomeSlideshow.animationValues[classCheck].left); //assuming the --left is first and --right is second
							$(section.data('Home-splitterLinkElements')).eq(1).data('endState', HomeSlideshow.animationValues[classCheck].right);
						};
						if(classCheck == '--fadeout'){
							if(thisClass.indexOf(classCheck) > -1){
								$(section.data('Home-splitterImageElements')).eq(0).data('endState', HomeSlideshow.animationValues[classCheck].opacity);
								$(section.data('Home-splitterImageElements')).eq(1).data('endState', HomeSlideshow.animationValues[classCheck].opacity);
							}
							$(section.data('Home-splitterContentElements')).data('endState', HomeSlideshow.animationValues[classCheck].opacity);
							// console.log(section.data('Home-splitterContentElements'));
						};
				    }
				}
			});

			$(window).resize(function(){
				HomeSlideshow.prepareSectionHeights();
			}).resize();

			Elements.backToTop.click(function(e){
				HomeSlideshow.backToFirst();
				e.preventDefault();
			});

			HomeSlideshow.run();
		},
		prepareSectionHeights: function(){
			HomeSlideshow.windowHeight = $(window).height();
			$('main > section.splitter').each(function(){
				$(this).outerHeight(HomeSlideshow.windowHeight);
			});
		},
		run: function(){
			var accumulatedDistance = 0;
			var accumulatedDeltaY = 0;
			var timesRun = 0;
			var averageDeltaY = 1;
			var tOut;

			// wait mouseEventsGatherInterval miliseconds after scrolling to run animations, or NOT
			$(window).mousewheel(function(event){
				// if(typeof tOut != 'undefined'){
					// clearTimeout(tOut);
				// };

				// timesRun ++;
				// accumulatedDeltaY += event.deltaY;
				// accumulatedDistance += Math.round(event.deltaY*event.deltaFactor); // update current position
				// tOut = setTimeout(function(){
					// if(accumulatedDistance != 0){
						// if(timesRun > 0){
							// averageDeltaY = Math.round(accumulatedDeltaY / timesRun);
							// averageDeltaY = accumulatedDeltaY;
						// }
						// HomeSlideshow.animate(accumulatedDistance, averageDeltaY);
						HomeSlideshow.animate(event.deltaY*event.deltaFactor, event.deltaY);
						// accumulatedDistance = 0;
					// }
					// accumulatedDeltaY = 0;
					// timesRun = 0;
				// }, HomeSlideshow.mouseEventsGatherInterval);
			});

			//  mobile events
			$('body.home').on('swipeup', HomeSlideshow.sectionsContainer, function(e){ 
				HomeSlideshow.goForward();
				e.preventDefault();
			});
	
			$('body.home').on('swipedown', HomeSlideshow.sectionsContainer, function(e){ 
				HomeSlideshow.goBack();
				e.preventDefault();
			});
		},
		animate: function(distance, deltaY){
			HomeSlideshow.mousePosition -= distance; // update current position
			HomeSlideshow.mousePosition = HomeSlideshow.mousePosition <= 0 ? 0 : HomeSlideshow.mousePosition; // prevent Math.ceil lower from returning 0
			
			if(HomeSlideshow.mousePosition >= HomeSlideshow.maxMousePosition){ // if current Y position is below max, set all values to max
				HomeSlideshow.mousePosition = HomeSlideshow.maxMousePosition;
				HomeSlideshow.currentStepPercent = 1;
				HomeSlideshow.currentStep = HomeSlideshow.sectionsLength;
			}else { // otherwise just calculate normally
				HomeSlideshow.currentStep = Math.ceil(HomeSlideshow.mousePosition/HomeSlideshow.stepSize); // get current step
				HomeSlideshow.currentStep = HomeSlideshow.currentStep < 1 ? 1 : HomeSlideshow.currentStep;
				HomeSlideshow.currentStepPercent = Math.round((HomeSlideshow.mousePosition%HomeSlideshow.stepSize)/HomeSlideshow.stepSize*HomeSlideshow.scrollSensitivity)/HomeSlideshow.scrollSensitivity; // get current step progress
				HomeSlideshow.currentStepPercent = HomeSlideshow.currentStepPercent > 1 ? 1 : HomeSlideshow.currentStepPercent; // keep it below or at 100%
			}


			// $('p.stats').text(HomeSlideshow.currentStep); // temp

			/* new code for PromoBox */
            if (HomeSlideshow.currentStep == 1){
                if (HomeSlideshow.currentStepPercent > 0.22){
                    promo_hide();
                }else{
                    promo_show();
                }
            }
			HomeSlideshow.animateSections(HomeSlideshow.currentStep-1, HomeSlideshow.currentStepPercent) //deltaY, run section animation based on currentStep, currentStepPercent and deltaY - scroll speed
		},
		checkWhosAnimating: function(){
			var returnVal = false;
			if(HomeSlideshow.animationFactor > 0){
				$(HomeSlideshow.sections).each(function(){
					if($(this).data('animating')){
						returnVal = $(this).index();
						return;
					}
				});
			}
			return returnVal;
		},
		animateSections: function(sectionNo, stepPercent){
			// bring all sections above to end State (cleanup, so they won't stick out)
			if((sectionNo - 1) >= 0){
				HomeSlideshow.animateSection(sectionNo-1,1);
			} 
			//sections below to start state (for scrolling up)
			if(sectionNo + 1 <= HomeSlideshow.sectionsLength - 1){ 
				HomeSlideshow.animateSection(sectionNo+1,0);
			}

			//and the current section to it's appropriate animation stage
			var animatingSectionNo = HomeSlideshow.checkWhosAnimating();
			if(animatingSectionNo === false || animatingSectionNo == sectionNo){ // only animate next section if the others are in safe state
				HomeSlideshow.animateSection(sectionNo,stepPercent);
			}else if(typeof animatingSectionNo === 'number'){ 
				if(animatingSectionNo < sectionNo){
					HomeSlideshow.mousePosition = (HomeSlideshow.stepSize * (HomeSlideshow.currentStep - 1) + 1); // if other animations are still in progress keep the mousePosition at the start of this section
				}else if(animatingSectionNo > sectionNo){
					HomeSlideshow.mousePosition = ((HomeSlideshow.stepSize * HomeSlideshow.currentStep)-1); // if other animations are still in progress keep the mousePosition at the start of this section
				}
			};

			// show footer if we reached the end
			if(HomeSlideshow.currentStep == HomeSlideshow.sectionsLength && stepPercent == 1){ // when reached the end show the footer
				HomeSlideshow.toggleFooter(true);
			}else {
				HomeSlideshow.toggleFooter(false);
			};
		},
		animateSection: function(sectionNo, stepPercent){
			var section = $(HomeSlideshow.sections).eq(sectionNo);

			if($(section).data('animatedTo') != stepPercent){
				$(section).data('animatedTo', stepPercent);
				if(HomeSlideshow.animationFactor > 0) $(section).data('animating', true);

				// animationGroups: ['split', 'fade', 'fadeout', 'link'],
				// animationGroups: ['split', 'scrollfade', 'fadeout', 'splitterLink'], // basically classes of elements in sections
				if(stepPercent<1) $(section).show(0);
				if(section.hasClass('Home-splitter--fadeout')){
					$(section.data('Home-splitterImageElements')).each(function(){
						var animateTo = 0;
						if(stepPercent <= HomeSlideshow.fadeTresholds.fadeInUntil){
							animateTo = $(this).data('endState'); 
						}else if(stepPercent > HomeSlideshow.fadeTresholds.fadeOutAbove){
							animateTo = (1-stepPercent)/(1-HomeSlideshow.fadeTresholds.fadeOutAbove) * $(this).data('endState');
						}else {
							animateTo = $(this).data('endState');
						}
						$(this).animate({'opacity': animateTo},{duration: HomeSlideshow.animationFactor, queue: false, easing: HomeSlideshow.easingFunction, complete: function(){
							if(HomeSlideshow.animationFactor > 0) $(section).data('animating', false);
							if(stepPercent >= 1) $(section).hide(0);
						}});
					});
					$(section.data('Home-splitterContentElements')).each(function(){
						var fadeTopPosition = 0;
						var animateTo = 0;
						if(stepPercent <= HomeSlideshow.fadeTresholds.fadeInUntil){
							animateTo = stepPercent/HomeSlideshow.fadeTresholds.fadeInUntil * $(this).data('endState'); //stepPercent is 0-100 with 0-50 being the content fadein
							fadeTopPosition = (1-(stepPercent/HomeSlideshow.fadeTresholds.fadeInUntil)) * 100;
						}else if(stepPercent > HomeSlideshow.fadeTresholds.fadeOutAbove){
							animateTo = (1-stepPercent)/(1-HomeSlideshow.fadeTresholds.fadeOutAbove) * $(this).data('endState') * (1-stepPercent);
							if(stepPercent < 1){
								animateTo = animateTo / ((1-HomeSlideshow.fadeTresholds.fadeOutAbove)/(1-stepPercent));
							}else {
								animateTo = 0;
							}
							fadeTopPosition = (stepPercent - HomeSlideshow.fadeTresholds.fadeOutAbove)*(-100);
						}else {
							animateTo = $(this).data('endState');
							fadeTopPosition = 0;
						}
						$(this).animate({'opacity': animateTo, 'margin-top': fadeTopPosition+'%'},{duration: HomeSlideshow.animationFactor, queue: false, easing: HomeSlideshow.easingFunction, complete: function(){
							if(HomeSlideshow.animationFactor > 0) $(section).data('animating', false);
							if(stepPercent >= 1) $(section).hide(0);
						}});
					});

					$(section.data('Home-splitterLinkElements')).each(function(){
						var fadeTopPosition = 0;

						if(stepPercent <= HomeSlideshow.splitTresholds.startHidingAt){
							fadeTopPosition = (1-(stepPercent/HomeSlideshow.splitTresholds.startHidingAt)) * $(this).data('endState');
						}else if(stepPercent > HomeSlideshow.splitTresholds.startHidingAt){
							fadeTopPosition = (stepPercent - HomeSlideshow.splitTresholds.startHidingAt)*(-1.5*$(this).data('endState'));
						}else {
							fadeTopPosition = 0;
						}
						$(this).animate({'margin-top': fadeTopPosition+'%'},{duration: HomeSlideshow.animationFactor, queue: false, easing: HomeSlideshow.easingFunction, complete: function(){
							if(HomeSlideshow.animationFactor > 0) $(section).data('animating', false);
							if(stepPercent >= 1) $(section).hide(0);
						}});
					});

				}else {
					$.each(HomeSlideshow.animationGroups, function(i,group){
						if(group == 'Home-splitterImage'){
							$(section.data(group+'Elements')).each(function(){
								var fadeTopPosition = 0;
								var animateTo = 0;
								if(stepPercent >= HomeSlideshow.splitTresholds.startHidingAt){
									animateTo = ((stepPercent/HomeSlideshow.splitTresholds.startHidingAt) - 1) * $(this).data('endState');
								}else {
									animateTo = 0;
								}
								$(this).animate({'top': animateTo+'%'},{duration: HomeSlideshow.animationFactor, queue: false, easing: HomeSlideshow.easingFunction, complete: function(){
									if(HomeSlideshow.animationFactor > 0) $(section).data('animating', false);
									if(stepPercent >= 1) $(section).hide(0);
								}});
							});
						}
						if(group == 'Home-splitterContent'){
							$(section.data(group+'Elements')).each(function(){
								var fadeTopPosition = 0;
								var animateTo = 0;
								if(stepPercent <= HomeSlideshow.fadeTresholds.fadeInUntil){
									animateTo = stepPercent/HomeSlideshow.fadeTresholds.fadeInUntil * $(this).data('endState'); //stepPercent is 0-100 with 0-50 being the content fadein
									fadeTopPosition = (1-(stepPercent/HomeSlideshow.fadeTresholds.fadeInUntil)) * 100;
								}else if(stepPercent > HomeSlideshow.fadeTresholds.fadeOutAbove){
									animateTo = (1-stepPercent)/(1-HomeSlideshow.fadeTresholds.fadeOutAbove) * $(this).data('endState');
									if(stepPercent < 1){
										animateTo = animateTo / ((1-HomeSlideshow.fadeTresholds.fadeOutAbove)/(1-stepPercent));
									}else {
										animateTo = 0;
									}
									fadeTopPosition = (stepPercent - HomeSlideshow.fadeTresholds.fadeOutAbove)*(-100);
								}else {
									animateTo = $(this).data('endState');
									fadeTopPosition = 0;
								}
								$(this).animate({'opacity': animateTo, 'margin-top': fadeTopPosition+'%'},{duration: HomeSlideshow.animationFactor, queue: false, easing: HomeSlideshow.easingFunction, complete: function(){
									if(HomeSlideshow.animationFactor > 0) $(section).data('animating', false);
									if(stepPercent >= 1) $(section).hide(0);
								}});
							});
						}
						if(group == 'Home-splitterLink'){
							$(section.data(group+'Elements')).each(function(i){
								var fadeTopPosition = 0;

								// $(this).addClass('ISEEYOU'+i);


								if(stepPercent <= HomeSlideshow.splitTresholds.startHidingAt){
									fadeTopPosition = (1-(stepPercent/HomeSlideshow.splitTresholds.startHidingAt)) * $(this).data('endState');
								}else if(stepPercent > HomeSlideshow.splitTresholds.startHidingAt){
									fadeTopPosition = (stepPercent - HomeSlideshow.splitTresholds.startHidingAt)*(-1.5*$(this).data('endState'));
								}else {
									fadeTopPosition = 0;
								}
								$(this).animate({'margin-top': fadeTopPosition+'%'},{duration: HomeSlideshow.animationFactor, queue: false, easing: HomeSlideshow.easingFunction, complete: function(){
									if(HomeSlideshow.animationFactor > 0) $(section).data('animating', false);
									if(stepPercent >= 1) $(section).hide(0);
								}});
							});
						}
					});
				}
			}
		},
		goForward: function(){
			// show footer if we reached the end
			if(HomeSlideshow.currentStep == HomeSlideshow.sectionsLength ){ // when reached the end show the footer
				HomeSlideshow.toggleFooter(true, true);
			}else {
				HomeSlideshow.toggleFooter(false, true);
			};

			if(HomeSlideshow.currentStep < HomeSlideshow.sectionsLength && HomeSlideshow.mobileTimeout === false){
				HomeSlideshow.currentStep = HomeSlideshow.currentStep + 1;
				HomeSlideshow.animateSection(HomeSlideshow.currentStep-1,1,HomeSlideshow.endingSpeed);
				HomeSlideshow.mobileTimeout = setTimeout(function(){
					// $('.homenav .counter').html(HomeSlideshow.currentStep+1); // temp
					HomeSlideshow.animateSection((HomeSlideshow.currentStep),HomeSlideshow.showFullSectionStepPercent,HomeSlideshow.animationFactor/2);
					HomeSlideshow.mobileTimeout = false;
				}, HomeSlideshow.endingSpeed + 50);
				HomeSlideshow.toggleLinks(HomeSlideshow.currentStep, true);
				HomeSlideshow.toggleLinks(HomeSlideshow.currentStep+1, false);
			}else if(HomeSlideshow.currentStep < HomeSlideshow.sectionsLength){
				// $('.homenav .counter').html(HomeSlideshow.currentStep+1); // temp
				clearTimeout(HomeSlideshow.mobileTimeout);
				HomeSlideshow.animateSection((HomeSlideshow.currentStep),HomeSlideshow.showFullSectionStepPercent,HomeSlideshow.animationFactor/2);
				HomeSlideshow.mobileTimeout = false;	
				HomeSlideshow.toggleLinks(HomeSlideshow.currentStep, true);
				HomeSlideshow.toggleLinks(HomeSlideshow.currentStep+1, false);
			}
		},
		goBack: function(){
			if(Elements.footer.data('shownBySwipe') == 'true'){ // if footer is shown by swiping, let swiping up only hide the footer 
				HomeSlideshow.toggleFooter(false, true);
			}else {
				if(HomeSlideshow.currentStep >= 1 && HomeSlideshow.mobileTimeout === false){
					HomeSlideshow.animateSection(HomeSlideshow.currentStep,0,HomeSlideshow.endingSpeed);
					HomeSlideshow.mobileTimeout = setTimeout(function(){
						HomeSlideshow.animateSection((HomeSlideshow.currentStep-1),HomeSlideshow.showFullSectionStepPercent,HomeSlideshow.animationFactor/2);
						HomeSlideshow.currentStep = HomeSlideshow.currentStep - 1;
						HomeSlideshow.mobileTimeout = false;
						HomeSlideshow.toggleLinks(HomeSlideshow.currentStep, true);
						HomeSlideshow.toggleLinks(HomeSlideshow.currentStep+1, false);

						// $('.homenav .counter').html(HomeSlideshow.currentStep+1); // temp
					}, HomeSlideshow.endingSpeed + 50);
				}else if(HomeSlideshow.currentStep >= 1){
					HomeSlideshow.animateSection((HomeSlideshow.currentStep-1),HomeSlideshow.showFullSectionStepPercent,HomeSlideshow.animationFactor/2);
					HomeSlideshow.currentStep = HomeSlideshow.currentStep - 1;
					HomeSlideshow.mobileTimeout = false;
					HomeSlideshow.toggleLinks(HomeSlideshow.currentStep, true);
					HomeSlideshow.toggleLinks(HomeSlideshow.currentStep+1, false);
					// $('.homenav .counter').html(HomeSlideshow.currentStep+1); // temp
				}
			}
		},
		toggleLinks: function(step, toggleState){
			toggleState = typeof toggleState == 'undefined' ? true : toggleState;
			step = typeof step == 'undefined' ? null : step;

			if(toggleState && step !== null){
				$(HomeSlideshow.sections).eq(step).find('.Home-splitterLink').show(0);
				$(HomeSlideshow.sections).eq(step).find('.Home-splitterContent').show(0);
			}else if(step !== null){
				$(HomeSlideshow.sections).eq(step).find('.Home-splitterLink').hide(0);
				$(HomeSlideshow.sections).eq(step).find('.Home-splitterContent').hide(0);
			}
		},
		toggleFooter: function(show, mobile){
			show = typeof show == 'undefined' ? true : show;
			mobile = typeof mobile == 'undefined' ? false : mobile;
			if(HomeSlideshow.footerIsAnimating !== false){
				clearTimeout(HomeSlideshow.footerIsAnimating);
			}
			if(Elements.footer.data('animating') == 'true'){
				HomeSlideshow.footerIsAnimating = setTimeout(function(){
					HomeSlideshow.toggleFooter(show, mobile);
				}, BarnGeneral.showFooterSpeed);
			}else if(Elements.footer.data('shownByHover') != 'true'){
				if(show){
					if(Elements.footer.data('shown') != show.toString()){
						Elements.footer.data('shownBySlideshow', 'true');
						Elements.footer.data('shown', 'true');
						Elements.footer.data('animating', 'true');
						if(mobile){
							Elements.footer.data('shownBySwipe', 'true').css('display', 'block');
						}
						Elements.footer.animate({'bottom': '0'}, {duration: BarnGeneral.showFooterSpeed, easing: BarnGeneral.showFooterEasing, queue: false, complete: function(){
							Elements.footer.data('animating', 'false');
						}});
					}
				}else {
					if(Elements.footer.data('shown') != show.toString()){
						Elements.footer.data('shown', 'false');
						Elements.footer.data('animating', 'true');
						if(mobile){
							Elements.footer.data('shownBySwipe', 'false');
						}
						Elements.footer.animate({'bottom': '-'+(Elements.footer.outerHeight()+100)}, {duration: BarnGeneral.showFooterSpeed, easing: BarnGeneral.showFooterEasing, queue: false, complete: function(){
							Elements.footer.data('animating', 'false');
							
							if(mobile) Elements.footer.css('display', 'none');

							Elements.footer.data('shownBySlideshow', 'false');
						}});
					}
				}
			}
		},
		backToFirst: function(){
			HomeSlideshow.currentStep = 0;
			HomeSlideshow.currentStepPercent = 0.5;
			HomeSlideshow.animateSections(HomeSlideshow.currentStep,HomeSlideshow.currentStepPercent);
			HomeSlideshow.mousePosition = HomeSlideshow.stepSize * HomeSlideshow.currentStepPercent;
		},
	}

	if($('body.home').length > 0 && $('body.ipad').length == 0){
		HomeSlideshow.prepare();
	}


    var BarnPopup = {
    	subscribe: $('.Popup'),
    	subscribeForm: $('.Popup form').eq(0),
    	subscribeError: $('.Popup-contentsSubscribeMsg--error'),
    	subscribeSuccess: $('.Popup-contentsSubscribeMsg--success'),
    	subscribeClose: $('.Popup-contentsClose'),
    	subscribeShown: false,
    	fadeoutTime: 1000,

    	subscribeFormPrep: function(){
			if (BarnPopup.subscribeForm.length > 0 ) {
				BarnPopup.subscribeError.hide();
				BarnPopup.subscribeSuccess.hide();

				BarnPopup.subscribeForm.bind('submit', function ( event ) {
					if ( event ) event.preventDefault();
					if ( BarnGeneral.validateEmailFormat($('input[type=email]',BarnPopup.subscribeForm).val()) ) { 
						BarnPopup.submitSubscribeForm(BarnPopup.subscribeForm); 
					}else {
						BarnPopup.subscribeError.show().text('Please provide a valid email address');
					}
				});

				BarnPopup.subscribeClose.bind('click', function ( event ) {
					if ( event ) event.preventDefault();
					BarnPopup.togglePopup(false);
				});

				$('>div', BarnPopup.subscribe).click(function(e){
					e.stopPropagation();
				});

				$(BarnPopup.subscribe).click(function(e){
					BarnPopup.togglePopup(false);
				});
			}
		},
		togglePopup: function(state){
			state = state != 'undefined' ? state : false; 

			if(!state){
				BarnPopup.subscribe.removeClass('u-show');
				setTimeout(function(){
					BarnPopup.subscribe.hide(0);
					BarnPopup.subscribeShown = false;
				}, 250);
			}else {
				BarnPopup.subscribe.show(0);
				setTimeout(function(){
					BarnPopup.subscribe.addClass('u-show');
					BarnPopup.subscribeShown = true;
				}, 50);
			}
		},
		submitSubscribeForm: function(form){
			BarnPopup.subscribeError.hide();
			BarnPopup.subscribeSuccess.hide();

			$.ajax({
				type: form.attr('method'),
				url: form.attr('action'),
				data: form.serialize(),
				cache : false,
				dataType : 'json',
				contentType: "application/json; charset=utf-8",
				error : function(err) { BarnPopup.subscribeError.show(0).text("Could not connect to the registration server. Please try again later."); },
				success : function(data) {
					if (data.result != "success") {
						BarnPopup.subscribeError.show(0).html(data.msg);
						BarnPopup.subscribeSuccess.hide(0);
					}else {
						BarnPopup.subscribeForm.attr('disabled', true);
						BarnPopup.subscribeSuccess.show(0).text('Thank you for subscribing');
						setTimeout(function(){
							BarnPopup.subscribe.animate({'opacity': 0}, {duration: BarnPopup.fadeoutTime, complete: function(){
								BarnPopup.togglePopup(false);
							}});
						},2500);
					}
				}
			});

		},
		
    };

    if(BarnPopup.subscribe.length > 0){
	    BarnPopup.subscribeFormPrep();

	    var shownPopup = $.cookie('shownNewsletterPopup'); 
	    if(shownPopup != 'yes'){
		    $.cookie('shownNewsletterPopup', 'yes');
		    BarnPopup.togglePopup(true);
	    }
    }




    // quick n dirty
    $('.page-id-34 .Post-main p, .Page--about p').each(function(){
    	if($('> strong', this).length > 0){
    		$(this).addClass('u-strong');

    	}
    });
});


// support swipeUP and swipeDOWN
(function() {
    var supportTouch = $.support.touch,
            scrollEvent = "touchmove scroll",
            touchStartEvent = supportTouch ? "touchstart" : "mousedown",
            touchStopEvent = supportTouch ? "touchend" : "mouseup",
            touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
    $.event.special.swipeupdown = {
        setup: function() {
            var thisObject = this;
            var $this = $(thisObject);
            $this.bind(touchStartEvent, function(event) {
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event,
                        start = {
                            time: (new Date).getTime(),
                            coords: [ data.pageX, data.pageY ],
                            origin: $(event.target)
                        },
                        stop;

                function moveHandler(event) {
                    if (!start) {
                        return;
                    }
                    var data = event.originalEvent.touches ?
                            event.originalEvent.touches[ 0 ] :
                            event;
                    stop = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ]
                    };

                    // prevent scrolling
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                        event.preventDefault();
                    }
                }
                $this
                        .bind(touchMoveEvent, moveHandler)
                        .one(touchStopEvent, function(event) {
                    $this.unbind(touchMoveEvent, moveHandler);
                    if (start && stop) {
                        if (stop.time - start.time < 1000 &&
                                Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                            start.origin
                                    .trigger("swipeupdown")
                                    .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                        }
                    }
                    start = stop = undefined;
                });
            });
        }
    };
    $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function(event, sourceEvent){
        $.event.special[event] = {
            setup: function(){
                $(this).bind(sourceEvent, $.noop);
            }
        };
    });

})();













// REQUEST ANIMATION FRAME POLYFILL FROM Paul Irish BY Erik Möller
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

// TEMP just some code that could be useful - remove for production

// $(window).load(function(){
	// $(window).scrollTop(500);
// });

// subscribeFormPrep: function(){
// 	if (Elements.subscribeForm.length > 0 ) {
// 		// Elements.subscribeError.text('');
// 		// Elements.subscribeSuccess.text('');
// 		// MCsuccess.removeClass('show');

// 		Elements.subscribeForm.bind('submit', function ( event ) {
// 			if ( event ) event.preventDefault();
// 			if ( BarnGeneral.validateSubscribeForm(Elements.subscribeForm) ) { BarnGeneral.submitSubscribeForm(Elements.subscribeForm); }
// 		});
// 	}
// },
// submitSubscribeForm: function(form){
// 	// console.log(form.attr('method')+' '+ form.attr('action') + ' ' + form.serialize());
// 	form.submit();
// 	// jq.ajax({
// 	// 	type: form.attr('method'),
// 	// 	url: form.attr('action'),
// 	// 	data: form.serialize(),
// 	// 	cache : false,
// 	// 	dataType : 'json',
// 	// 	contentType: "application/json; charset=utf-8",
// 	// 	error : function(err) { Elements.subscribeError.removeClass('u-hidden').text("Could not connect to the registration server. Please try again later."); },
// 	// 	success : function(data) {
// 	// 		if (data.result != "success") {
// 	// 			MCerror.addClass('show').html(data.msg);
// 	// 			MCsuccess.removeClass('show');
// 	// 		}else {
// 	// 			jq('#mc_embed_signup_scroll').addClass('hide');
// 	// 			MCsuccess.addClass('show').text('Thank you for your subscription. Enjoy the website!');
// 	// 		}
// 	// 	}
// 	// });
// },
// function validateSubscribeForm(form){
// 	return true;

// 	var allFine = true;
// 	jq('input[type=text], input[type=email]', form).not('.dummy').each(function(){
// 		if(jq(this).val().length < 1){
// 			allFine = false;
// 			MCerror.text('Please fill out all the fields');
// 			jq(this).addClass('validation-failed');
// 		}else if(jq(this).attr('class').indexOf('email') > -1){
// 			if(!BarnGeneral.validateEmailFormat(jq(this).val())){
// 				allFine = false;
// 				jq(this).addClass('validation-failed');
// 			}else {
// 				jq(this).removeClass('validation-failed');
// 			}
// 		}else {
// 			jq(this).removeClass('validation-failed');
// 		}
// 	});
// 	if(allFine){
// 		MCerror.removeClass('show');
// 	}else{
// 		MCerror.addClass('show');
// 	}
// 	return allFine;
// },
// function validateEmailFormat(emailAddress) {
// 	var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
// 	return pattern.test(emailAddress);
// },
