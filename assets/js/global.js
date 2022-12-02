/*--------------------------------------------------------*/
/* TABLE OF CONTENTS: */
/*--------------------------------------------------------*/
/* 01 - VARIABLES */
/* 02 - page calculations */
/* 03 - function on document ready */
/* 04 - function on page load */
/* 05 - function on page resize */
/* 06 - function on page scroll */
/* 07 - swiper sliders */
/* 08 - buttons, clicks, hovers */


//===Prettyphoto Lightbox===

function prettyPhoto() {
  $("a[data-rel^='prettyPhoto']").prettyPhoto({
    animation_speed: 'normal',
    slideshow: 3000,
    autoplay_slideshow: false,
    fullscreen: true,
    social_tools: false
  });
}


function customTabSingleService() {
  if ($('.tabmenu-box').length) {
    var tabWrap = $('.tab-content-box');
    var tabClicker = $('.tabmenu-box ul li');

    tabWrap.children('div').hide();
    tabWrap.children('div').eq(0).show();
    tabClicker.on('click', function() {
      var tabName = $(this).data('tab-name');
      tabClicker.removeClass('active');
      $(this).addClass('active');
      var id = '#' + tabName;
      tabWrap.children('div').not(id).hide();
      tabWrap.children('div' + id).fadeIn('500');
      return false;
    });
  }
}

// Dom Ready Function
jQuery(document).on('ready', function() {
  (function($) {
    // add your functions

    prettyPhoto();
    customTabSingleService();
  })(jQuery);
});







(function($) {

  'use strict'

  var headerFixed = function() {

    if ($('body').hasClass('header_sticky')) {

      var nav = $('#header');



      if (nav.size() !== 0) {

        var offsetTop = $('#header').offset().top,

          headerHeight = $('#header').height(),

          injectSpace = $('<div />', {
            height: headerHeight
          }).insertAfter(nav);

        injectSpace.hide();



        $(window).on('load scroll', function() {

          if ($(window).scrollTop() > offsetTop) {

            if ($('#header').hasClass('header-classic')) {

              injectSpace.show();

            }

            $('#header').addClass('downscrolled');

          } else {

            $('#header').removeClass('header-small downscrolled');

            injectSpace.hide();

          }

        })

      }

    }

  };

  var FlatFlexTestimonial = function() {

    $('.wrap-testimonial').each(function() {

      $(this).children('#testimonial-carousel').flexslider({

        animation: "slide",

        controlNav: false,

        controldot: false,

        animationLoop: true,

        slideshow: false,

        itemWidth: 194,

        drag: true,

        itemMargin: 0,

        directionNav: false,

        asNavFor: $(this).children('#testimonial-slider'),

      });



      $(this).children('#testimonial-slider').flexslider({

        animation: "slide",

        controlNav: false,

        animationLoop: false,

        slideshow: false,

        directionNav: false,

        sync: $(this).children('#testimonial-carousel'),

      });

    });

  }


  // Dom Ready

  $(function() {

    if (matchMedia('only screen and (min-width: 991px)').matches) {

      headerFixed();

    }

    FlatFlexTestimonial();

  });

})(jQuery);




var _functions = {};

$(function() {

  "use strict";

  /*================*/
  /* 01 - VARIABLES */
  /*================*/
  var swipers = [],
    winW, winH, headerH, winScr, footerTop, _isresponsive, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

  /*========================*/
  /* 02 - page calculations */
  /*========================*/
  _functions.pageCalculations = function() {
    winW = $(window).width();
    winH = $(window).height();
  };

  /*=================================*/
  /* 03 - function on document ready */
  /*=================================*/
  if (_ismobile) $('body').addClass('mobile');
  _functions.pageCalculations();

  /*============================*/
  /* 04 - function on page load */
  /*============================*/
  $(window).load(function() {
    _functions.initSwiper();
    $('body').addClass('loaded');
    $('#loader-wrapper').fadeOut();
  });

  /*==============================*/
  /* 05 - function on page resize */
  /*==============================*/
  _functions.resizeCall = function() {
    _functions.pageCalculations();
  };
  if (!_ismobile) {
    $(window).resize(function() {
      _functions.resizeCall();
    });
  } else {
    window.addEventListener("orientationchange", function() {
      _functions.resizeCall();
    }, false);
  }

  /*==============================*/
  /* 06 - function on page scroll */
  /*==============================*/

  $(window).scroll(function() {
    _functions.scrollCall();
  });

  _functions.scrollCall = function() {
    winScr = $(window).scrollTop();

    if (winScr > 130) {
      $(".tt-header").addClass("stick fadeInDown animated");
    } else {
      $(".tt-header").removeClass("stick fadeInDown animated");
    }

  };

  /*=====================*/
  /* 07 - swiper sliders */
  /*=====================*/
  var initIterator = 0;
  _functions.initSwiper = function() {
    $('.swiper-container').not('.initialized').each(function() {
      var $t = $(this);

      var index = 'swiper-unique-id-' + initIterator;

      $t.addClass('swiper-' + index + ' initialized').attr('id', index);
      $t.find('.swiper-pagination').addClass('swiper-pagination-' + index);
      $t.find('.swiper-button-prev').addClass('swiper-button-prev-' + index);
      $t.find('.swiper-button-next').addClass('swiper-button-next-' + index);

      var slidesPerViewVar = ($t.data('slides-per-view')) ? $t.data('slides-per-view') : 1;
      if (slidesPerViewVar != 'auto') slidesPerViewVar = parseInt(slidesPerViewVar, 10);

      swipers['swiper-' + index] = new Swiper('.swiper-' + index, {
        pagination: '.swiper-pagination-' + index,
        paginationClickable: true,
        nextButton: '.swiper-button-next-' + index,
        prevButton: '.swiper-button-prev-' + index,
        slidesPerView: slidesPerViewVar,
        autoHeight: ($t.is('[data-auto-height]')) ? parseInt($t.data('auto-height'), 10) : 0,
        loop: ($t.is('[data-loop]')) ? parseInt($t.data('loop'), 10) : 0,
        autoplay: ($t.is('[data-autoplay]')) ? parseInt($t.data('autoplay'), 10) : 5000,
        breakpoints: ($t.is('[data-breakpoints]')) ? {
          767: {
            slidesPerView: parseInt($t.attr('data-xs-slides'), 10)
          },
          991: {
            slidesPerView: parseInt($t.attr('data-sm-slides'), 10)
          },
          1199: {
            slidesPerView: parseInt($t.attr('data-md-slides'), 10)
          }
        } : {},
        initialSlide: ($t.is('[data-ini]')) ? parseInt($t.data('ini'), 10) : 0,
        speed: ($t.is('[data-speed]')) ? parseInt($t.data('speed'), 10) : 1500,
        keyboardControl: true,
        mousewheelControl: ($t.is('[data-mousewheel]')) ? parseInt($t.data('mousewheel'), 10) : 0,
        mousewheelReleaseOnEdges: true,
        spaceBetween: ($t.is('[data-space-between]')) ? parseInt($t.data('space-between'), 10) : 0,
        direction: ($t.is('[data-direction]')) ? $t.data('direction') : 'horizontal',
        onSlideChangeEnd: function(swiper) {
          var animationBlocks = $t.find('.swiper-slide-active .text-animation');
          for (var i = 0; i < animationBlocks.length; ++i) {
            $(animationBlocks[i]).addClass('animated ' + $(animationBlocks[i]).attr("data-animation"));
          }
        },
        onSlideChangeStart: function(swiper) {
          var animationBlocks = $t.find('.swiper-slide-active .text-animation');
          for (var i = 0; i < animationBlocks.length; ++i) {
            $(animationBlocks[i]).removeClass('animated ' + $(animationBlocks[i]).attr("data-animation"));
          }
        },
      });
      swipers['swiper-' + index].update();
      initIterator++;
    });
    $('.swiper-container.swiper-control-top').each(function() {
      swipers['swiper-' + $(this).attr('id')].params.control = swipers['swiper-' + $(this).parent().find('.swiper-control-bottom').attr('id')];
    });
    $('.swiper-container.swiper-control-bottom').each(function() {
      swipers['swiper-' + $(this).attr('id')].params.control = swipers['swiper-' + $(this).parent().find('.swiper-control-top').attr('id')];
    });
  };

  /*==============================*/
  /* 08 - buttons, clicks, hovers */
  /*==============================*/

  //menu
  $('.cmn-toggle-switch').on('click', function(e) {
    $(this).toggleClass('active');
    $(this).parents('header').find('.toggle-block').slideToggle();
    e.preventDefault();
  });
  $('.main-nav .menu-toggle').on('click', function(e) {
    $(this).closest('li').toggleClass('select').siblings('.select').removeClass('select');
    $(this).closest('li').siblings('.parent').find('ul').slideUp();
    $(this).closest('a').siblings('ul').slideToggle();
    e.preventDefault();
  });

  /*tt-load-more*/
  $('.tt-load-more').on('click', function(e) {
    var $cloneHtml = $(this).closest('.tt-block').find('.row:first-child').clone();
    $(this).parent().prev().prev().append($cloneHtml)
    e.preventDefault();
  });

  //Tabs
  var tabFinish = 0;
  $('.tt-nav-tab-item').on('click', function(e) {
    var $t = $(this);
    if (tabFinish || $t.hasClass('active')) e.preventDefault();
    tabFinish = 1;
    $t.closest('.tt-nav-tab').find('.tt-nav-tab-item').removeClass('active');
    $t.addClass('active');
    var index = $t.parent().parent().find('.tt-nav-tab-item').index(this);
    $t.parents('.tt-tab-wrapper').find('.tt-tab-select select option:eq(' + index + ')').prop('selected', true);
    $t.closest('.tt-tab-wrapper').find('.tt-tab-info:visible').fadeOut(500, function() {
      var $tabActive = $t.closest('.tt-tab-wrapper').find('.tt-tab-info').eq(index);
      $tabActive.css('display', 'block').css('opacity', '0');
      $tabActive.animate({
        opacity: 1
      });
      tabFinish = 0;
    });
  });
  $('.tt-tab-select select').on('change', function(e) {
    var $t = $(this);
    if (tabFinish) e.preventDefault();
    tabFinish = 1;
    var index = $t.find('option').index($(this).find('option:selected'));
    $t.closest('.tt-tab-wrapper').find('.tt-nav-tab-item').removeClass('active');
    $t.closest('.tt-tab-wrapper').find('.tt-nav-tab-item:eq(' + index + ')').addClass('active');
    $t.closest('.tt-tab-wrapper').find('.tt-tab-info:visible').fadeOut(500, function() {
      var $tabActive = $t.closest('.tt-tab-wrapper').find('.tt-tab-info').eq(index);
      $tabActive.css('display', 'block').css('opacity', '0');
      $tabActive.animate({
        opacity: 1
      });
      tabFinish = 0;
    });
  });

  /*tabs from hash*/
  var hash = location.hash.replace('#', '');
  if (hash) {
    hashTab();
  }

  function hashTab() {
    var $tabSel = $('.tt-nav-tab-item[data-tab="' + hash + '"]').addClass('active');
    $tabSel.closest('.tt-nav-tab').find('.tt-nav-tab-item').removeClass('active');
    $tabSel.addClass('active');
    var index = $tabSel.parent().parent().find('.tt-nav-tab-item').index($tabSel);
    $tabSel.parents('.tt-tab-wrapper').find('.tt-tab-select select option:eq(' + index + ')').prop('selected', true);
    $tabSel.closest('.tt-tab-wrapper').find('.tt-tab-info:visible').fadeOut(500, function() {
      var $tabActive = $tabSel.closest('.tt-tab-wrapper').find('.tt-tab-info').eq(index);
      $tabActive.css('display', 'block').css('opacity', '0');
      $tabActive.animate({
        opacity: 1
      });
    });
  }
  $(window).on("hashchange", function() {
    if (window.location.hash) {
      hash = location.hash.replace('#', '');
      hashTab();
    }
  });

  /* accordeon */
  $('.tt-accordeon-title').on('click', function() {
    $(this).closest('.tt-accordeon').find('.tt-accordeon-title').not(this).removeClass('active').next().slideUp();
    $(this).toggleClass('active').next().slideToggle();


  });



  /*=====================*/
  /* 12 - LIGHT-BOX */
  /*=====================*/


  /*activity indicator functions*/
  var activityIndicatorOn = function() {
    $('<div id="imagelightbox-loading"><div></div></div>').appendTo('body');
  };
  var activityIndicatorOff = function() {
    $('#imagelightbox-loading').remove();
  };

  /*close button functions*/
  var closeButtonOn = function(instance) {
    $('<button type="button" id="imagelightbox-close" title="Close"></button>').appendTo('body').on('click touchend', function() {
      $(this).remove();
      instance.quitImageLightbox();
      return false;
    });
  };
  var closeButtonOff = function() {
    $('#imagelightbox-close').remove();
  };

  /*overlay*/
  var overlayOn = function() {
    $('<div id="imagelightbox-overlay"></div>').appendTo('body');
  };
  var overlayOff = function() {
    $('#imagelightbox-overlay').remove();
  };

  /*caption*/
  var captionOff = function() {
    $('#imagelightbox-caption').remove();
  };
  var captionOn = function() {
    var description = $('a[href="' + $('#imagelightbox').attr('src') + '"]').data('title');
    if (description.length)
      $('<div id="imagelightbox-caption">' + description + '</div>').appendTo('body');
  };

  /*arrows*/
  var arrowsOn = function(instance, selector) {
    var $arrows = $('<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left"><i class="fa fa-chevron-left"></i></button><button type="button" class="imagelightbox-arrow imagelightbox-arrow-right"><i class="fa fa-chevron-right"></i></button>');
    $arrows.appendTo('body');
    $arrows.on('click touchend', function(e) {
      e.preventDefault();
      var $this = $(this);
      if ($this.hasClass('imagelightbox-arrow-left')) {
        instance.loadPreviousImage();
      } else {
        instance.loadNextImage();
      }
      return false;
    });
  };
  var arrowsOff = function() {
    $('.imagelightbox-arrow').remove();
  };

  var selectorG = '.lightbox';
  if ($(selectorG).length) {
    var instanceG = $(selectorG).imageLightbox({
      quitOnDocClick: false,
      onStart: function() {
        arrowsOn(instanceG, selectorG);
        overlayOn();
        closeButtonOn(instanceG);
      },
      onEnd: function() {
        arrowsOff();
        captionOff();
        overlayOff();
        closeButtonOff();
        activityIndicatorOff();
      },
      onLoadStart: function() {
        captionOff();
        activityIndicatorOn();
      },
      onLoadEnd: function() {
        $('.imagelightbox-arrow').css('display', 'block');
        captionOn();
        activityIndicatorOff();
      }
    });
  }



  /* homepage owl slider  */

  //project carousel

  var owl = $('.owl-carousel1');
  owl.owlCarousel({
    margin: 0,
    nav: true,
    loop: true,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      550: {
        items: 2
      },
      767: {
        items: 3
      },
      1000: {
        items: 4
      },
      1400: {
        items: 5
      }
    }
  });
  $('.play').on('click', function() {
    owl.trigger('play.owl.autoplay', [1000])
  })
  $('.stop').on('click', function() {
    owl.trigger('stop.owl.autoplay')
  })


  // client-logo carousel

  var owl = $('.owl-carousel2');
  owl.owlCarousel({
    margin: 0,
    nav: true,
    loop: true,
    autoplay: true,
    smartSpeed: 1000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      414: {
        items: 2
      },
      600: {
        items: 3
      },
      1000: {
        items: 4
      },
      1200: {
        items: 6
      }
    }
  })


  // home2 services carousel

  var owl = $('.owl-carousel4');
  owl.owlCarousel({
    margin: 30,
    nav: true,
    loop: true,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  })

  // home2 client carousel

  var owl = $('.owl-carousel5');
  owl.owlCarousel({

    nav: true,
    loop: true,
    autoplay: true,
    smartSpeed: 1500,
    autoplayHoverPause: false,
    fluidSpeed: true,

    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  });




  // home4 client carousel

  $('.owl-carousel6 ').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    loop: true,
    autoplay: true,
	smartSpeed: 1000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,

      },
      600: {
        items: 1,


      },
      1000: {
        items: 1,

      }
    }

  });
  $(".owl-prev").html('<i class="fa fa-angle-left"></i>');
  $(".owl-next").html('<i class="fa fa-angle-right"></i>');

  //owl-three

  $('.owl-three ').owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
        autoplay: true,
      },
      600: {
        items: 1,
        nav: false,
        autoplay: true,

      },
      1000: {
        items: 1,
        nav: true,
        loop: false,
        margin: 20,
        autoplay: true,
      }
    }

  })
  $(".owl-prev").html('<i class="fa fa-angle-left"></i>');
  $(".owl-next").html('<i class="fa fa-angle-right"></i>');

  // barfiller for maintenance

  $('.barfiller1').barfiller({
    barColor: '#f65245'
  });

  //home 5 vedio pop-update



  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });
  //

  // home page 5 counter
  $('.strip_05 .border-left22 h2').each(function() {
    $(this).prop('Counter', 0).animate({
      Counter: $(this).text()
    }, {
      duration: 25000,
      easing: 'swing',
      step: function(now) {
        $(this).text(Math.ceil(now));
      }
    });
  });


  // header search


  jQuery('.tz_icon_search').on('click', function() {
    jQuery(this).parent().find('.tz-header-search-form').addClass('tz-header-search-form-show');
    //jQuery('.tz-header-search-form').addClass('tz-header-search-form-show');
    jQuery(this).css('display', 'none');
    jQuery(this).parent().find('.tz_icon_close').css('display', 'block');
  });
  jQuery('.icon_close').on('click', function() {
    jQuery(this).parent().find('.tz-header-search-form').removeClass('tz-header-search-form-show');
    jQuery(this).parent().find('.tz_icon_search').css('display', 'block');
    jQuery(this).css('display', 'none');
  });
  //
// home page 5 testimonial
var owl = $('.owl-carouselh1');
owl.owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    loop: true,
    autoplay: true,
	smartSpeed: 1000,
    autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1
    },
    550: {
      items: 1
    },
    767: {
      items: 1
    },
    1000: {
      items: 1
    },
    1400: {
      items: 1
    }
  }
});
$(".owl-prev").html('<i class="fa fa-angle-left"></i>');
$(".owl-next").html('<i class="fa fa-angle-right"></i>');

});
