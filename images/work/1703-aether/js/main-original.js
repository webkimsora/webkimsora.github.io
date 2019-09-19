
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
      height: '315',           
      width: '560',             
      videoId: 'Xm9W16DUsJ8',  
      playerVars: {             
          'autoplay': 1,
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

    // 메인 팝업 영상
    var playerState;
    function mainPopVideoStateChange(event) {
        playerState = event.data == YT.PlayerState.ENDED ? '종료됨' :
        event.data == YT.PlayerState.PLAYING ? '재생 중' :
        event.data == YT.PlayerState.PAUSED ? '일시중지 됨' :
        event.data == YT.PlayerState.BUFFERING ? '버퍼링 중' :
        event.data == YT.PlayerState.CUED ? '재생준비 완료됨' :
        event.data == -1 ? '시작되지 않음' : '예외';

        console.log('onPlayerStateChange 실행: ' + playerState);
  
        // 재생여부를 통계로 쌓는다.
        //collectPlayCount(event.data);

      //종료시 실행
      if(event.data == YT.PlayerState.ENDED){
        end();
      }
    }


(function(){
// 영상 배경 재생 및 팝업 영상 재생
  var App = window.App || {};
  App.movieID = "Xm9W16DUsJ8"

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

    $('#main-video-player').tubular({
      videoId: App.movieID,
      repeat: true
    }); // where idOfYourVideo is the YouTube ID.
  });

  $('.main-btn-play').on('click', function(){
    player.pauseVideo();
	  mainPopVideo.playVideo();
    //$('#popup-video iframe').attr('src', 'https://www.youtube.com/embed/'+App.movieID+'?version=3&amp;controls=1&amp;showinfo=0&amp;modestbranding=1&amp;wmode=transparent&amp;rel=0&amp;autoplay=1&amp;html5=1&amp;enablejsapi=1');
  })

  $('#popup-video .modal__close').on('click', function(){
    //$('#popup-video iframe').attr('src', '');
    $('#mainPopframe iframe').attr('src', '');
    player.playVideo();
  })

  // 메인 팝업
  var slider = $('.movie-frame ul').bxSlider({
      slideWidth: 852,
			maxSlides: 1,
			moveSlides: 1,
      infiniteLoop: false,
      hideControlOnEnd : false,
      video: true,


      onSlideBefore:function($slideElement, oldIndex, newIndex){
      //player.pauseVideo();
      //$('#popup-video iframe').attr('src', 'https://www.youtube.com/embed/'+App.movieID+'?version=3&amp;controls=1&amp;showinfo=0&amp;modestbranding=1&amp;wmode=transparent&amp;rel=0&amp;autoplay=1&amp;html5=1&amp;enablejsapi=1');
    },
    onSlideAfter:function($slideElement, oldIndex, newIndex){
      player.pauseVideo();

    }
  });

  // gnb 클릭 이벤트  

  $('.gnb a').on('click', function(){    
    var idxGnb = $(this).index()

    $('.gnb a').removeClass();
    $(this).addClass('is-active');

    if(idxGnb == 3){
      $('.section').eq(2).fadeIn(100).siblings('.section').fadeOut(100);
      setTimeout(function(){
       $('.section').eq(2).addClass('on').siblings('.section').removeClass('on');
      },10)
    }else{
      $('.section').eq(idxGnb).fadeIn(100).siblings('.section').fadeOut(100);
      setTimeout(function(){
       $('.section').eq(idxGnb).addClass('on').siblings('.section').removeClass('on');
      },10)     
    }
  });

  
  //마우스 휠 스크롤
  var win_h = $(window).height();

  $('.section').mousewheel(function(event, delta) {
    var idx = $('.gnb a.is-active').index();
    var sct =$(window).scrollTop();
    var docHeight  =$(document).innerHeight();
    var scb = 	$(window).scrollTop() == $(document).height() - $(window).height()

    if(docHeight > 962) {
      if(delta >= 0 ) { // UP       
        $('.gnb a.is-active').prev().trigger('click');
      } else if(delta < 0 ) { // DOWN     
        $('.gnb a.is-active').next().trigger('click');
      }
    } else if(docHeight<=962){ // 최소높이 이하 스크롤 생성시 스크롤 이동 후 페이지 이동
      if(delta >= 0 && sct < 2 ) { // UP       
        $('.gnb a.is-active').prev().trigger('click');
      } else if(delta < 0 && scb ) { // DOWN     
        $('.gnb a.is-active').next().trigger('click');
        if(!$('.gnb a').eq(3).hasClass('is-active')){
          $('body,html').stop().animate({'scrollTop':0},300)
        }
      }
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