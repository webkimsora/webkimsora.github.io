var App = (function(){
  var dSize = [5800, 1080];
  var breakPoint = [1500, 2892, 4458];
  //var breakPoint = [1470, 2972, 4398, 5874];

  var ww;
  var wh;

  var ratio = 1;

  var pageIndex = 0;
  var isSlide = false;

  var $anchor = $('#page-prev, #page-next');

  var init = function(){
    var scene = document.getElementById('viewport');
    var parallax = new Parallax(scene);

    resizeInterface();
  };

  var goToPages = function(){
    ( pageIndex === 0 )? $('#page-prev').fadeOut() : $('#page-prev').show();
    ( pageIndex === breakPoint.length - 1 )? $('#page-next').fadeOut() : $('#page-next').show();

    $anchor.addClass('is-moved');

    TweenMax.to($('#viewport > .inner' ), 0.8, {left: getMiddlePoint(breakPoint[pageIndex]), onComplete:function(){
      isSlide = false;
      $anchor.removeClass('is-moved');
    }});
  };

  var getMiddlePoint = function(d){    
    var ww = $(window).innerWidth();
    var tmp = ww/2 - d * ratio;

    var min = 430 * ratio * -1;
    var max = (dSize[0]  * ratio - ww) * -1;

    // underflow
    tmp = (tmp > min)? min: tmp;
    tmp = (tmp < max)? max: tmp;

    return tmp;
  };

  var setViewport = function(){
    $('#viewport > .inner, .copyright').css('transform', 'scale('+ratio+')');
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

  $('#header > .btn-play').on('click', function(){
    $('#popup-video [data-video]').eq(0).trigger('click');
  });

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

  $('#popup-video [data-rel="back"]').on('click', function(){
    $('#main-video').attr('src', '');
  });

  $(window).on('mousewheel', function(e) {
    (e.deltaY === -1) ? $('#page-next').trigger('click') : $('#page-prev').trigger('click');
  });

  $(window).load(function(){
    $('html').addClass('is-loaded');
    //mui.modal.open('popup-video');
    //if($('#popup-video').css('display', 'block')) {
    //  $('#popup-video [data-video]').eq(0).trigger('click');
    //}
  });

  return {
    init: init,
    goToPages: goToPages
  };

}());

;(function(){
  App.init();
}());