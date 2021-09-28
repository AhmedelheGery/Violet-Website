!(function($) {
  "use strict";

    // LOCALAZTION
    $.i18n()
    .load({
      en: "i18n/languages/en.json",
      ar: "i18n/languages/ar.json",
    })
    .done(function () {
      $(".switch-locale").on("click", ".locale", function (e) {
        e.preventDefault();
        $.i18n().locale = $(this).data("locale");
        $("body").i18n();
      });
    });

    $("#handleRTL").click(function () {
      $('.en-btn-wrapper').show();
      $('.ar-btn-wrapper').hide();
      $(".redirect-right").css("text-align", "right");
      $(".redirect-rtl").css("direction", "rtl");
      // handle form rtl
      $('input[name="name"]').attr("placeholder", "الاسم");
      $('textarea[name="message"]').attr("placeholder", "الرسالة");
      $('textarea[name="descripe_project"]').attr("placeholder", "وصف المشروع");
      $('textarea[name="reference-website"]').attr("placeholder", "الموقع المرجعي");
      $('input[name="email"]').attr("placeholder", "الايميل");
      $('input[name="company_name"]').attr("placeholder", "اسم الشركة");
      $('input[name="phone_number"]').attr("placeholder", "رقم الهاتف");
    });
    $("#handleLTR").click(function () {
    $('.ar-btn-wrapper').show();
    $('.en-btn-wrapper').hide();
      $(".redirect-right").css("text-align", "left");
      $(".redirect-rtl").css("direction", "ltr");
    });

  // Preloader
  $(window).on('load', function() {
    $('.ar-btn-wrapper').hide();
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top;
        var scrolled = 20;

        if ($('#header').length) {
          scrollto -= $('#header').outerHeight()

          if (!$('#header').hasClass('header-scrolled')) {
            scrollto += scrolled;
          }
        }

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox({
        'share': false
      });
    });
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

    // Portfolio details carousel
    $(".products-carousel").owlCarousel({
      center:true,
      autoplay: true,
      dots: true,
      nav:true,
      navText: ["<i class='bx bx-left-arrow carousel-arrow'></i>","<i class='bx bx-right-arrow carousel-arrow'></i>"],
      loop: true,
      items: 1
    });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  });

})(jQuery);