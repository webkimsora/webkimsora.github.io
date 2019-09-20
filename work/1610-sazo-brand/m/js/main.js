
  var sel_img ="./images/cnt-introduce/introduce1.png";

;(function(){
  
  var ww;
  var wh;

  var ratio = 1;

  var pageIndex = 2;
  var isSlide = false;

  var $anchor = $('#page-prev, #page-next');

  var init = function(){
    var scene = document.getElementById('viewport');
    var parallax = new Parallax(scene);

    resizeInterface();
  };

    // @ gnb click 이동
    var setPage = function(p){
     pageIndex =p;
      goToPages();
    };


//슬라이드
  var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    initialSlide: 2
  });

  /* 161226 수정 S */    
  // @ 영상보기
  $(document).ready(function(){
    $('#frame-play [data-video]').eq(0).trigger('click');
  });

    $('.frame-play-contents li  [data-video]').on('click', function(){
    var videoID = $(this).attr('data-video');

    $('#frame-play .list a').removeClass('is-active');
    $(this).addClass('is-active');

    $('#main-video').attr('src', 'https://www.youtube.com/embed/' + videoID);

    $('#popup-video [data-rel="back"]').on('click', function(){
      $('#main-video').attr('src', '');
    });

    // index 찾기
    var index = ($(this).parent().index('.frame-play-contents li')) + 1;

    $('#frame-play .detail img').attr('src', './images/cnt-play/text-play' +index+ '.png');
    $('.frame-play-contents-video .sample').attr('src', './images/cnt-play/play' +index+ '.jpg');
  });
  /* 161226 수정 E */

  // @ 게임소개 이미지 클릭
  /* 161114 게임소개 클릭 수정 S */
  var introFirstSrc = $('#introduce .list li:first img').attr('src');

  $('.introduce-contents-img img').attr('src', introFirstSrc);

  $('#introduce .list a').on('click', function(){

    $('#introduce .list a').removeClass('is-active');
    $(this).addClass('is-active');

    var Src = $(this).children('img').attr('src');

    sel_img =Src;

    $(this).addClass('active').siblings().removeClass();

    $('.introduce-contents-img img').attr('src', Src);

    // index 찾기
    var index = ( $(this).closest('li').index() ) + 1;

    $('#introduce .detail img').attr('src', './images/cnt-introduce/text-introduce' +index+ '.png');
  });
  /* 161114 영상보기 클릭 수정 E */

  // @ 화살표
  if($('.swiper-slide.main').hasClass('swiper-slide-active')) {
    $('.swiper-button-next').show();
    $('.swiper-button-prev').show();
  } else {
    $('.swiper-button-next').hide();
    $('.swiper-button-prev').hide();    
  }

}());