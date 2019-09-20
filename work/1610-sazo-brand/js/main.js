
  var sel_img ="./images/cnt-introduce/introduce1.png";
  
  
  var App = (function(){
  var dSize = [7440, 1080];
  var breakPoint = [1266, 2550, 3880, 5120, 6440];

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


  var goToPages = function(){

    ( pageIndex === 0 )? $('#page-prev').fadeOut() : $('#page-prev').show();
    ( pageIndex === breakPoint.length - 1 )? $('#page-next').fadeOut() : $('#page-next').show();


  // @ 페이지 opacity 지정
    if(pageIndex != 0) { $('.cont0').animate({opacity:'0.2'},10);}
    if(pageIndex != 1) {$('.cont1').animate({opacity:'0.2'},10);}
    if(pageIndex != 2) {$('.cont2').animate({opacity:'0.2'},10);}
    if(pageIndex != 3) {$('.cont3').animate({opacity:'0.2'},10);}
    if(pageIndex != 4) { $('.cont4').animate({opacity:'0.2'},10);}

    $('.cont' + pageIndex).animate({opacity:'1'},50);

  // @ gnb active 활성화
    var $gnbElem = $('.gnb li');
    
    $gnbElem.find('a').removeClass('is-active');
    $gnbElem.eq(pageIndex).find('a').addClass('is-active');



  // @ nav 페이지 버튼 수정

  var $navPrev = $('#page-prev').find('i');
  var $navNext = $('#page-next').find('i');
    
  if(pageIndex === 0) {        
      $navNext.removeClass().addClass('sp-common nav-play-next');
    }

  if(pageIndex === 1) {
    $navPrev.removeClass().addClass('sp-common nav-cos-prev');    
    $navNext.removeClass().addClass('sp-common nav-main-next');
  }

  if(pageIndex === 2) {
    $navPrev.removeClass().addClass('sp-common nav-play-prev');    
    $navNext.removeClass().addClass('sp-common nav-introduce-next');
    $('.bi-icon').hide();
  } else {
    $('.bi-icon').show();
  }

  if(pageIndex === 3) {
    $navPrev.removeClass().addClass('sp-common nav-main-prev');    
    $navNext.removeClass().addClass('sp-common nav-relation-next');
  }

  if(pageIndex === 4) {
    $navPrev.removeClass().addClass('sp-common nav-introduce-prev');
  }


//
    $anchor.addClass('is-moved');

    TweenMax.to($('#viewport > .inner' ), 0.8, {left: getMiddlePoint(breakPoint[pageIndex]), onComplete:function(){
      isSlide = false;
      $anchor.removeClass('is-moved');
    }});
  };

  var getMiddlePoint = function(d){    
    var ww = $(window).innerWidth();
    var tmp = ww/2 - d * ratio;

    var min = 260 * ratio * -1;
    var max = (dSize[0]  * ratio - ww) * -1;

    // underflow
    tmp = (tmp > min)? min: tmp;
    tmp = (tmp < max)? max: tmp;

    return tmp;
  };

  var setViewport = function(){
    $('#viewport > .inner').css('transform', 'scale('+ratio+')');
  };

  var resizeInterface = function(){
    ww = $(window).innerWidth();
    wh = $(window).innerHeight();

    ratio = (wh / dSize[1]).toFixed(2);

    if( wh < 650 ) return true;

    setViewport();    
    goToPages();
  };

  $(window).on('resize', function(){
    resizeInterface();
  });

  $('#page-prev').on('click', function(){    
    if( isSlide ) return true;    

    pageIndex--;

    if (pageIndex < 0){
      pageIndex = 0;
      return true;
    }

    isSlide = true;
    goToPages();
  });

  $('#page-next').on('click', function(){ 
    if( isSlide ) return true;    

    pageIndex++;

    if (pageIndex > breakPoint.length - 1){
      pageIndex = breakPoint.length - 1;
      return true;
    }

    isSlide = true;
    goToPages();
  });


  // @ gnb 이동

$('.gnb [data-page-index]').on('click', function() { 
  var dataIndex = parseInt($(this).attr('data-page-index')) ;
  
  setPage(dataIndex);

});




// @ 영상보기

  /* 161114 영상보기 수정 S */

  $(document).ready(function(){
    $('#frame-play [data-video]').eq(0).trigger('click');
  });

    $('#frame-play [data-video]').on('click', function(){
    var videoID = $(this).attr('data-video');

    $('#frame-play .list a').removeClass('is-active');
    $(this).addClass('is-active');

    $('#main-video').attr('src', 'https://www.youtube.com/embed/' + videoID);

    $('#popup-video [data-rel="back"]').on('click', function(){
      $('#main-video').attr('src', '');
    });

    // index 찾기
    var index = ( $(this).closest('li').index() ) + 1;

    $('#frame-play .detail img').attr('src', './images/cnt-play/text-play' +index+ '.png');
    $('.frame-play-contents-video .sample').attr('src', './images/cnt-play/play' +index+ '.jpg');
  });


  $('.frame-play-contents-video a').on('click', function(){
    var getVideoID = $('#frame-play .list a.is-active').attr('data-video');

    $('#main-video').attr('src', 'https://www.youtube.com/embed/' + getVideoID);
  });

   /* 161114 영상보기 수정 E */

// @ 게임소개 이미지 클릭
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


// @ 마우스 휠
  
  $(window).on('mousewheel', function(e) {
    (e.deltaY === -1) ? $('#page-next').trigger('click') : $('#page-prev').trigger('click');
  });
  
  return {
    init: init,
    goToPages: goToPages
  };


// @ 코스프레 스크롤
if ($('.jbox-container').css('display', 'block')){
  $(document).on("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll", function(e) {
        e.preventDefault();
        return;
    });
    $(document).on("keydown.disableScroll", function(e) {
        var eventKeyArray = [32, 33, 34, 35, 36, 37, 38, 39, 40];
        for (var i = 0; i < eventKeyArray.length; i++) {
            if (e.keyCode === eventKeyArray [i]) {
                e.preventDefault();
                return;
            }
        }
    });  
} else {
  $(document).off(".disableScroll");
}


}());

;(function(){
  App.init();
}());