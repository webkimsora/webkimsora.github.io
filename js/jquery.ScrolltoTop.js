$(document).ready(function(){

var ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf("android") == -1 && ua.indexOf("iphone") == -1 && ua.indexOf("ipad") == -1) {
  $(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 50) {
        $('.page-top').fadeIn();
      } else {
        $('.page-top').fadeOut();
      }
    });

    $('.page-top a').click(function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800,
      "easeOutExpo");
      return false;
    });
  });
  } else {
    $(".page-top").hide();
  }
});