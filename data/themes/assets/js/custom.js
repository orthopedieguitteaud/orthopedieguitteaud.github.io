jQuery(document).ready(function($) {

/*
	$.browser.chrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());

	if(!$.browser.chrome){

		$("html").niceScroll({mousescrollstep: 40,  hwacceleration: true, cursorwidth: "10px", cursorborderradius: "0px"});

	}
	*/

	/* ------------------------------------------------------------------------ */
	/* 	vertical align text */
	/* ------------------------------------------------------------------------ */
	jQuery.fn.center = function () {
		this.css("padding-top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2)) + "px");
		return this;
	}


	$( window ).resize(function() {
		$(".center-it").center();
	});

	$(".center-it").center();




	/*
	function resize_voile(){
		var ratioW = 2096;
		var ratioH = 1572;
		var eyes = 540;
		var ratio = eyes / ratioH;
		var wHeight = $(window).height();
		var fHeight = wHeight * ratio;
		$("#levez-voile").height(wHeight/2 - 160+"px");
	}

	$( window ).resize(function() {
		resize_voile();
	});

	resize_voile();*/


	/* ------------------------------------------------------------------------ */
	/* HOME PAGE */
	/* ------------------------------------------------------------------------ */

	$(window).scroll(function() {
			var wWidth = $(window).width();

			if(wWidth <= 768) return;

			var scrollTop = $(window).scrollTop();
			var wHeight = $(window).height();

            var yPos = -(scrollTop * 1.5);
			var yPosSlow = -(scrollTop * 0.3);
            var coords = yPos + 'px';
			var opac = scrollTop / (wHeight / 3);

            // Move text
            $(".scroll_text").css({ "top": coords, "opacity": opac });

			//home cta
			if(Math.abs(yPos) >= wHeight/2){
				$("#home-cta").css({ "bottom": yPos+"px"});
			}else{
				$("#home-cta").css({ "bottom": yPos+"px" });
			}

	});


	/* ------------------------------------------------------------------------ */
	/* MENU */
	/* ------------------------------------------------------------------------ */

	//main menu close
	$("#navigation-pop span.close_menu").click(function(){
		close_main_nav();
		close_submenu_nav();
	});

	//submenu close
	$("span.close_menu.show-on-submenu").click(function(){
		close_submenu_nav();
	});

	function close_main_nav(){

		$("#sub-navigation-pop").fadeOut(300,function(){
			//$("#sub-navigation-pop").animate({width:"0"},function(){
				$("#navigation-pop-content").fadeOut(function(){
					$("#navigation-pop").animate({width:"0"},function(){
						$("#navigation-pop-overlay").fadeOut();
						$("html,body").removeClass("oHidden");
						$("#sub-navigation-pop").hide();
					});
				});
		//	});
		});

		$("#navigation-pop li.menu-item-has-children a").removeClass("active");

	}

	function close_submenu_nav(){
		$(".side-navigation ul li,#masthead").removeClass("zindex");
		$("html,body").removeClass("oHidden");
		$("#submenu-overlay").fadeOut();
		$(".the_line_1,.the_line_2,.the_line_3").remove();
		$(".hide-on-submenu").show();
		$(".show-on-submenu").hide();
	}

	$(".mobileMenu_tool .opener, span.open_menu").click(function(){
		$("#navigation-pop-overlay").fadeIn(function(){
			$("#navigation-pop").animate({width:"50%"},function(){
				$("#navigation-pop-content").fadeIn();
			});
		});
		$("html,body").addClass("oHidden");
	});

	//CLOSE ON ESC
	$('body').keydown(function(e){
		if (e.which==27){
			close_main_nav();
			close_submenu_nav();
		}
	});


	//MAKE SUBMENU OPEN ON RIGHT PANE
	$(document).on("click","#navigation-pop li.menu-item-has-children a", function(event){

		var wWidth = $( window ).width();

		//hide if mobile menu
		if(wWidth > 992){
			event.preventDefault();
			var links = $(this).parent().find("ul.sub-menu").html();

			$("#navigation-pop li.menu-item-has-children a").removeClass("active");
			$(this).addClass("active");
			$("#sub-navigation-pop-menu").html(links);
			$("#sub-navigation-pop").hide().fadeIn(600);
		}
	});

	var isSticky = false;

	//sticky
	$(window).scroll(function(){

		if($(window).scrollTop() > 60){

			if(!isSticky){

				if(!$("body").hasClass("sticky-menu")){
					$("body").addClass("sticky-menu");

					$(".original_logo").fadeOut(0,function(){
						$(".sticky_logo").fadeIn(300);
					});
					$("#main_header .side-navigation").animate({"padding-top" : "30px"},200);
				}
			}

			isSticky = true;

		} else{

			if(isSticky){

				if($("body").hasClass("sticky-menu")){
					$("body").removeClass("sticky-menu");
					$(".sticky_logo").fadeOut(0,function(){
						$(".original_logo").fadeIn(300);
					});

					$("#main_header .side-navigation").animate({"padding-top" : "70px"},200);
				}

			}

			isSticky = false;

		}
	});

	/* ------------------------------------------------------------------------ */
	/* LOADING */
	/* ------------------------------------------------------------------------ */

	$(".animsition").animsition({

		inClass               :   'fade-in-up',
		outClass              :   'fade-out-up',
		inDuration            :    1000,
		outDuration           :    800,
		linkElement           :   '#menu-menu-popup li:not(".menu-item-has-children") a',
		//linkElement   :   'a:not([target="_blank"]):not([href^=#])',
		loading               :    true,
		loadingParentElement  :   'body', //animsition wrapper element
		loadingClass          :   'animsition-loading',
		unSupportCss          : [ 'animation-duration',
								  '-webkit-animation-duration',
								  '-o-animation-duration'
								],
		overlay               :   false,
		overlayClass          :   'animsition-overlay-slide',
		overlayParentElement  :   'body'
	});

	/* ------------------------------------------------------------------------ */
	/* FULL HEIGHT */
	/* ------------------------------------------------------------------------ */

	set_fullHeight();

	//fix dr image scaling bug
	$(window).load(function(){
		$("#sog .sog").removeClass("h100");
		$("#sog .sog").addClass("h100");
		$("#sog .sog").addClass("bgcover");
	});

	$( window ).resize(function() {
		set_fullHeight();
	});

	function set_fullHeight(){
		var wHeight = $( window ).height();
		$(".fullheight").height(wHeight);
	}


	/* ------------------------------------------------------------------------ */
	/* HALF HEIGHT */
	/* ------------------------------------------------------------------------ */

	set_halfHeight();

	$( window ).resize(function() {
		set_halfHeight();
	});

	function set_halfHeight(){
		var wHeight = $( window ).height() / 2;
		$(".halfheight").css('min-height', wHeight+'px');
	}

	/* ------------------------------------------------------------------------ */
	/* SCROLL BLOCK */
	/* ------------------------------------------------------------------------ */

	$(window).scroll(function(){

		var wWidth = $(window).width();
		if(wWidth <= 768) return;

		var wHeight = $(window).height();
		var contentHeight = $(".scroll-content").height();
		var menuSpacer = $(".menu-spacer").height();
		var scrollY = $(window).scrollTop();

		if((scrollY + wHeight) <= (contentHeight + menuSpacer)){
			$(".scroll-spacer").height(scrollY);
		}else{
			$(".scroll-spacer").height((contentHeight - wHeight) + menuSpacer);
		}

	});



    /* ********** Toggle FAQ ********** */
    var valueToggleFaq;
    $(document).on("click",".over-toggle-faq h6", function(){
        valueToggleFaq = $(this).parent().find(".content-toggle-faq");

        valueToggleFaq.stop();
        valueToggleFaq.slideToggle();
        $(this).toggleClass('active');
    });


	/*
	$(window).scroll(function(){

		var wHeight = $(window).height();
		var contentHeight = 500;
		var scrollY = $(window).scrollTop();

		if($(".home-scroller").height() <= (contentHeight)){
			$(".home-scroller").height(scrollY);
		}else{
			return;
		}

	});*/

	/* ------------------------------------------------------------------------ */
	/* SUMENU */
	/* ------------------------------------------------------------------------ */

	/*
	$("#main_footer .side-navigation a").click(function(event){
		event.preventDefault();
		var $parentLI = $(this).parent();
		var $parentUL = $parentLI.parent();
		var index = $parentLI.index()+1;

		if($parentUL.hasClass("left-navigation")){
			$("#left-navigation li:eq("+index+") a").trigger("click");

				//make logo pop
				$("#masthead").addClass("zindex");
				$("#left-navigation li:eq("+index+")").addClass("zindex");

		}else{
			$("#right-navigation li:eq("+index+") a").trigger("click");

				//make logo pop
				$("#masthead").addClass("zindex");
				$("#right-navigation li:eq("+index+")").addClass("zindex");

		}

	});*/

	$("#main_header .side-navigation a").click(function(event){

		var $this = $(this);

		if(!$this.hasClass("dontpop")){

			event.preventDefault();

			$("#main_header .side-navigation li").removeClass("zindex");

			var links = $(this).parent().find("ul.sub-menu").html();

			$("#submenu-menu").html(links);
			$("#submenu-overlay").fadeIn(function(){
				//make logo pop
				$("#masthead").addClass("zindex");
				$this.parent().addClass("zindex");
				$("html,body").addClass("oHidden");

				//line try
				$(".the_line_1,.the_line_2,.the_line_3").remove();
				$this.after('<div class="the_line_1"><div class="the_line_2"><div class="the_line_3"></div></div></div>');
				resize_lines();

				$(".hide-on-submenu").hide();
				$(".show-on-submenu").css("display", "inline-block");
			});

		}

	});

	var doit;

	$( window ).resize(function() {
		  clearTimeout(doit);
		  doit = setTimeout(resize_lines, 100);
	});

	function resize_lines(){

		if($(".the_line_1").length < 1) return false;

		var wWidth = $( window ).width();
		var halfWidth = wWidth / 2;
		var position = $(".the_line_1").offset();
		var line1_x = position.left;
		var linePos = 0;

		if(line1_x > halfWidth){
			//right side
			linePos = halfWidth - (wWidth - line1_x);
		}else{
			//left side
			linePos = halfWidth - line1_x;
		}


		//ANIMATE THE LINE
		$(".the_line_1").animate({
			"height": "80px",
			"bottom": "-80px"
		}, "normal", function() {
			$(".the_line_2").animate({
			"width": linePos+"px"
			}, "normal", function() {

				$('.the_line_3').animate({height:"50px", bottom: "-50px"});

			});
		});


	}




	/* ------------------------------------------------------------------------ */
	/* FX */
	/* ------------------------------------------------------------------------ */


	$.fn.is_on_screen = function(){
    var win = $(window);
    var viewport = {
        top : win.scrollTop()-200,
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
	};



	$(window).scroll(function(){
		var wWidth = $(window).width();
		if(wWidth <= 768) return;
		lubie_animation();
	});

	lubie_animation();

	function lubie_animation(){

		//FADE IN
		$(".fadefx").each(function(){
			if( $(this).is_on_screen() ) {
				$(this).addClass("fade-in");
			}
		});

		//LINES
		$(".thick-line").each(function(){
			if($(this).is_on_screen()){
				$(this).animate({
					width: "100%"
				}, 1500 );
			}
		});

	}


	/* ------------------------------------------------------------------------ */
	/* Blog */
	/* ------------------------------------------------------------------------ */

    $(window).load(function(){
        $('.blogSection').masonry({
        	itemSelector: '.blog_item'
        });
    });

	$(".goto").click(function(event){
		event.preventDefault();
		goTo($(this).data("goto"),130,600);
	});

});

function goTo(hash, offset, delay){

	if (typeof offset == 'undefined') var offset = 0;
	if (typeof delay == 'undefined') var delay = 2000;

	jQuery('html, body').animate({
		scrollTop: jQuery(hash).offset().top - offset
	}, delay,"easeOutQuint");
	return false;
}