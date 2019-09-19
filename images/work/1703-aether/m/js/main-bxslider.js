 /**
 * Youtube API 로드
 */   
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); 

  var mainPopVideo = null;
		
  function onYouTubeIframeAPIReady() {
    mainPopVideo = new YT.Player('mainPopframe', {
      height: '100%',           
      width: '100%',             
      videoId: 'Xm9W16DUsJ8',  
      playerVars: {             
          'autoplay': 0,
          'controls': 1,
          'showinfo': 0
      },
      events: {
          'onReady': mainPopVideoReady,               // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
          'onStateChange': mainPopVideoStateChange    // 플레이어의 상태가 변경될 때마다 실행
      }
    });
  }

  function mainPopVideoReady(event) {
    console.log('onPlayerReady 실행');    
        // 플레이어 자동실행 (주의: 모바일에서는 자동실행되지 않음)
//            event.target.playVideo();
  }

  // @ 메인 팝업 영상
  var playerState;
  function mainPopVideoStateChange(event) {
    playerState = event.data == YT.PlayerState.ENDED ? '종료됨' :
    event.data == YT.PlayerState.PLAYING ? '재생 중' :
    event.data == YT.PlayerState.PAUSED ? '일시중지 됨' :
    event.data == YT.PlayerState.BUFFERING ? '버퍼링 중' :
    event.data == YT.PlayerState.CUED ? '재생준비 완료됨' :
    event.data == -1 ? '시작되지 않음' : '예외';
    //console.log('onPlayerStateChange 실행: ' + playerState);
  }

(function(){ 
  $(document).ready(function(){
     $('.gnb a').eq(0).trigger('click');
     var hname = window.location.hash;

     if(hname  =="#main"){
      $('.gnb a').eq(0).trigger('click');
    }else if(hname  =="#event1"){
      $('.gnb a').eq(1).trigger('click');
    } else if(hname  =="#event2"){
      $('.gnb a').eq(2).trigger('click');
    }
  });  
     
  // 티저페이지 - 가로세로 css 값 부여
  $("document").ready(function() {
    $(window).trigger("orientationchange"); // 최초 페이지 로딩 시 가로, 세로를 모르기 때문에 trigger로 처리

    var winSize = ($(window).width() / 720).toFixed(5)
    winSize = 100/Number(winSize*100)    
    var winHeight = $(window).height();
    winHeight = winHeight*winSize
    //console.log(winHeight);
    $('.main').height(winHeight);
  });

  $(window).bind("orientationchange", function(e) { // 가로세로 전환 처리
    var orientation = window.orientation;

    // 메인 배경 높이
    if (orientation == 90 || orientation == -90) {
      //alert("portrait"); 
      $('html').css('min-height', '1060px');
      $('body').css('min-height', '1060px');
    } else {
      //alert("landscape");
      $('html').css('min-height', '');
      $('body').css('min-height', '');
    }

    // 아이폰 폰트 크기
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if(iOS) {
      //alert('아이폰');
      $('html').css('font-size','16px');
      $('.coupon var').css('font-size','17px');
    }
  });

  // 영상 배경 재생 및 팝업 영상 재생

  var App = window.App || {};
    App.movieID = "Xm9W16DUsJ8"

    $('.btn-play').on('click', function(){
      //$('#popup-video iframe').attr('src', 'https://www.youtube.com/embed/'+App.movieID+'?version=3&amp;amp;controls=1&amp;amp;showinfo=0&amp;amp;modestbranding=1&amp;amp;wmode=transparent&amp;amp;rel=0&amp;amp;autoplay=1&amp;amp;html5=1&amp;amp;enablejsapi=1');      
      //mainPopVideo.playVideo();    
    })

    $('#popup-video .modal__close').on('click', function(){
      //$('#popup-video iframe').attr('src', '');
	    mainPopVideo.stopVideo();    
    })

    // 메인 팝업
  var slider = $('.movie-frame ul').bxSlider({
    mode: 'vertical',
    slideWidth: 686,
    maxSlides: 1,
    moveSlides: 1,
    infiniteLoop: false,
    hideControlOnEnd : true,
    touchEnabled: true,
    pager:false,
    video: true,

    onSlideBefore:function($slideElement, oldIndex, newIndex){
      mainPopVideo.pauseVideo();  
    },
    onSlideAfter:function($slideElement, oldIndex, newIndex){
      mainPopVideo.pauseVideo();
    }
  });

  // 디바이스별 해상도에 따라 비율 맞추기  
  $('body').addClass('on');

  // gnb 클릭 이벤트  

  $('.gnb a').on('click', function(){    
    var idxGnb = $(this).index()

    $('.gnb a').removeClass();
    $(this).addClass('is-active');

    if(idxGnb == 3){
      $('.section').eq(2).fadeIn(100).siblings('.section').fadeOut(100);
      $('.section').eq(2).addClass('on').siblings('.section').removeClass('on');
    }else{
      $('.section').eq(idxGnb).fadeIn(100).siblings('.section').fadeOut(100);
      $('.section').eq(idxGnb).addClass('on').siblings('.section').removeClass('on');
    }
  });

  // @ 스크롤 이벤트
    // 상단 이동
  $.fn.scrollEnd = function(callback, timeout) {
    $(this).scroll(function() {
      var $this = $(this);

      if ($this.data('scrollTimeout'))
        clearTimeout($this.data('scrollTimeout'));

      $this.data('scrollTimeout', setTimeout(callback, timeout));
    });
  };

  $(window).scrollEnd(function() {
    $('.btnTop').fadeOut();      
  }, 1000);
    
  $('.btnTop').on('click', function(e){
		e.preventDefault();
    var goTop = $('.page').eq(0).attr('data-height');    
    $('html, body').stop().animate({scrollTop : goTop + "px"},500);
    return false;
  });

  $(window).scroll(function(){
    if($(this).scrollTop() > 200) {
      $('.btnTop').fadeIn();
    } else {
      $('.btnTop').fadeOut();
    }   
  }); 

  // @ alertModal data index 
  var alertModal = function(index) {
    $('#alert-modal [data-alert-index]').hide();
    $('#alert-modal [data-alert-index=' + index + ']').show();

    mui.modal.open('alert-modal');
  };

   // @ 사전예약
  $('.btn-reser').on('click', function(e){
    e.preventDefault();

    if (!mui.validate.input($('#reser-number'))){
      //alert("정확한 휴대폰 번호를 입력하세요");        
      alertModal(0);
      return false;
    } else if (!mui.validate.input($('#reser-number'),"tel")){
      //alert("정확한 휴대폰 번호를 입력하세요");       
      alertModal(2);
      return false;
    } else if(!mui.validate.radio("reser-os")) {
      alertModal(3);
      return false;
    }else if (!mui.validate.checkbox($('#reser-chkbox'))){
      //alert("개인정보수집에 동의해주세요"); 
      alertModal(1);
      return false;
    }
     //alert("참여완료 정보 확인");     
      alertModal(5);
  
     mui.validate.init($('#frm-reser'), e );
     reserOk = true;
  });


}());