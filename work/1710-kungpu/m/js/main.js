;(function(){
  // 비디오 팝업
  $('#popup-video [data-video]').on('click', function(){
    var videoID = $(this).attr('data-video');
    
    if( videoID === "#" ){
      $('#popup-video .cont-coming').css('display', 'block');
    } else {
      $('#popup-video .cont-coming').css('display', 'none');
    }

    $('.video-list a').removeClass('is-active');
    $(this).addClass('is-active');

    $('#main-video').attr('src', 'https://www.youtube.com/embed/' + videoID);
  });

  $('#popup-video .modal-btn-close').on('click', function(){
    $('#main-video').attr('src', 'https://www.youtube.com/embed/' + ' ');
  });

  //윈도우 높이 지정
 var hgt = $(window).height();
  $("#viewport").css("height", hgt);

  //스크롤스파이
  
  var scrollSpy = new ScrollSpy($('.gnb'), {
    isSticky:true
  });

  scrollSpy.init();

  $(window).scroll(function() {
    scrollSpy.onScroll();
  });

  //
  
  $('.btn-scroll-top').on('click', function(){ 
    mui.util.goToPosition(0);
  });

  $(window).load(function(){
    mui.modal.open('popup-video');
    if($('#popup-video').css('display', 'block')) {
      $('#popup-video [data-video]').eq(0).trigger('click');
    }
  });

}());