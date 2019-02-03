(function ($) {
  var wow = new WOW({
    mobile: false
  });
  wow.init();

  jQuery(window).load(function () {
    jQuery("#preloader").delay(100).fadeOut("slow");
    jQuery("#load").delay(100).fadeOut("slow");
  });

  function easeOutQuad(t) {
    return t * (2 - t)
  }

  // jQuery to collapse the navbar on scroll
  $(window).scroll(function () {
    var navbar = $(".navbar-fixed-top");
    var introOverlay = $("#intro .heading-overlay");
    var introOverlayBottom = $("#about").offset().top;
    var maxOpacityThreshold = introOverlayBottom;
    var currentScroll = $(window).scrollTop();

    if ($(".navbar").offset().top > 50) {
      navbar.addClass("top-nav-collapse");
    } else {
      navbar.removeClass("top-nav-collapse");
    }

    if (currentScroll <= introOverlayBottom) {
      var opacity = currentScroll / maxOpacityThreshold;
      introOverlay.css('opacity', easeOutQuad(opacity));
    }
  });


  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $(function () {
    function smoothScroll(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
    }
    $('.navbar-nav li a').bind('click', smoothScroll);
    $('.page-scroll a').bind('click', smoothScroll);
    $('.smooth-scroll').bind('click', smoothScroll);
  });


  // jQuery for pulse animation on mouseHover on brands
  var brandElement = $(".brnd");
  brandElement.mouseenter(function () {
    $(this).addClass("animated pulse");
  });

  brandElement.on("webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd", function () {
    $(this).removeClass("animated pulse");
  });


  $(document).ready(function () {
    var emailLineBreak = '%0D%0A';
    $('#copyright-year').text(new Date().getFullYear());

    // jQuery for Contact Form
    $('#contact-form').on('submit', function (e) {
      var emailTo = 'geral@chamalusa.pt';
      var emailSubject = 'ChamaLusa - ' + $('#subject').val();
      var senderName = $('#name').val();
      var senderEmail = $('#email').val();
      var senderPhone = $('#tel').val();
      var message = $('#message').val();
      var emailBody = 'De: ' + senderName + emailLineBreak + 'Telefone: ' + senderPhone + emailLineBreak + 'E-Mail: ' + senderEmail + emailLineBreak + emailLineBreak + 'Mensagem:' + emailLineBreak + message;
      location.href = 'mailto:' + emailTo + '?subject=' + emailSubject +'&body=' + emailBody;
      e.preventDefault();
    });
  });

})(jQuery);
