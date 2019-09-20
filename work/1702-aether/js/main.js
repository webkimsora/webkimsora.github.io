var playVideoID = $('.event2-title [data-video]').data('video')

  /**
 * Youtube API 로드
 */   
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); 

  var eventVideo = null;
		
  function onYouTubeIframeAPIReady() {
     fullscreen = new YT.Player('main-video-player', {
      videoId: '8SunQTHC2G4',   
      playerVars: {                   
          'autoplay': 1,
          'controls': 0,
          'showinfo': 0,
          'loop': 1,
          'rel': 0,
          'playlist' : '8SunQTHC2G4'
      },
      events: {
          'onReady': fullscreenReady,               // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
          'onStateChange': fullscreenStateChange    // 플레이어의 상태가 변경될 때마다 실행
      }
    });

    eventVideo = new YT.Player('mainPopframe', {
      height: '315',           
      width: '560',             
      videoId: '8SunQTHC2G4',  
      playerVars: {             
          'autoplay': 0,
          'controls': 2,
          'showinfo': 0,
          'rel': 0
      },
      events: {
          'onReady': eventVideoReady,               // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
          'onStateChange': eventVideoStateChange    // 플레이어의 상태가 변경될 때마다 실행
      }
    });
  }

  
  function fullscreenReady(event) {
    fullscreen.mute();
        // 플레이어 자동실행 (주의: 모바일에서는 자동실행되지 않음)
  }  


  function eventVideoReady(event) {
    console.log('onPlayerReady 실행');    
        // 플레이어 자동실행 (주의: 모바일에서는 자동실행되지 않음)
//            event.target.playVideo();
  }


  function fullscreenStateChange(event) {
    playerState = event.data == YT.PlayerState.ENDED ? '종료됨' :
    event.data == YT.PlayerState.PLAYING ? '재생 중' :
    event.data == YT.PlayerState.PAUSED ? '일시중지 됨' :
    event.data == YT.PlayerState.BUFFERING ? '버퍼링 중' :
    event.data == YT.PlayerState.CUED ? '재생준비 완료됨' :
    event.data == -1 ? '시작되지 않음' : '예외';

    //console.log('fullScreenChange 실행: ' + playerState);
  }

  // @ 메인 팝업 영상
  var playerState;
  var playing; //event.data 값 받아오는 전역변수 -> 재생:1, 정지:0, 시작안됨:-1 
  function eventVideoStateChange(event) {
    playerState = event.data == YT.PlayerState.ENDED ? '종료됨' :
    event.data == YT.PlayerState.PLAYING ? '재생 중' :
    event.data == YT.PlayerState.PAUSED ? '일시중지 됨' :
    event.data == YT.PlayerState.BUFFERING ? '버퍼링 중' :
    event.data == YT.PlayerState.CUED ? '재생준비 완료됨' :
    event.data == -1 ? '시작되지 않음' : '예외';
    //console.log('onPlayerStateChange 실행: ' + playerState);
        
   playing = event.data; //event.data 값 받아오는 전역변수 -> 재생:1, 정지:0, 시작안됨:-1 
  }


(function(){
// 영상 배경 재생 및 팝업 영상 재생
  var App = window.App || {};
  App.movieID = "8SunQTHC2G4"

  $(document).ready(function(){
     $('.gnb a').eq(0).trigger('click');
     var hname = window.location.hash;

     if(hname  =="#main"){
      $('.gnb a').eq(0).trigger('click');
    }else if(hname  =="#event1"){
      $('.gnb a').eq(1).trigger('click');
    } else if(hname  =="#event2"){
      $('.gnb a').eq(2).trigger('click');
    } else if(hname  =="#cbtPage"){
      $('.gnb a').eq(4).trigger('click');
    }  
  });

  // @ tubular 리사이즈
	var resize = function() {
		var width = $(window).width(),
			pWidth, // player width, to be defined
			height = $(window).height(),
			pHeight, // player height, tbd
			$tubularPlayer = $('#main-video-player');

		if (width / (16/9) < height) { // if new video height < window height (gap underneath)
			pWidth = Math.ceil(height * (16/9)); // get new player width
			$tubularPlayer.width(pWidth).height(height).css({left: (width - pWidth) / 2, top: 0}); // player width is greater, offset left; reset top
		} else { // new video width < window width (gap to right)
			pHeight = Math.ceil(width / (16/9)); // get new player height
			$tubularPlayer.width(width).height(pHeight).css({left: 0, top: (height - pHeight) / 2}); // player height is greater, offset top; reset left
		}
	}

	$(window).on('resize', function() {
		resize();
	})

	resize();

  
  // 이벤트2 2악장 영상탭
  $('.event2-tab [data-video]').on('click', function(){    
    var videoID = $(this).data('video');
    var $_self = $(this);
    var $target ;
    var isAutoPlay = 0;

    eventVideo.loadVideoById(videoID, 0, "large");

    $_self.closest('div').find('a').removeClass('is-active');
    $_self.addClass('is-active');

    if ( $_self.closest('.event2-slide').hasClass('event2-slide') ){
      $target = $('#mainPopframe');
    }
   eventVideo.playVideo();
  });


  // 이벤트2 슬라이드 팝업 0315 수정
  var slider = $('.event2-slide').bxSlider({
    infiniteLoop: false,
    hideControlOnEnd : true,
    pager: false,
    //video: true,
   // pagerCustom: '.event2-tab',

    onSlidePrev:function($slideElement, oldIndex, newIndex){      
        eventVideo.stopVideo(); 
    },
    onSlideNext:function($slideElement, oldIndex, newIndex){
      eventVideo.stopVideo();
    },
    onSlideAfter:function($slideElement, oldIndex, newIndex){
      if(newIndex == 0){
        $('.event2-tab .tab2').addClass('active').siblings().removeClass('active');
      }else{
        $('.event2-tab .tab1').addClass('active').siblings().removeClass('active');
      }
    }
  });

  $(document).ready(function(){
    $('.event2-tab .tab2').addClass('active');
  });

  $('.event2-tab a').on('click',function(){ 
    eventVideo.stopVideo(); 
    var idx = $(this).index();
    if(idx == 1){
      slider.goToSlide(0);
    }else{
      slider.goToSlide(1);
    }
  });

  // @ 메인 버튼 클릭
  $('.main-btn-play').on('click', function(){
    fullscreen.pauseVideo();    
    $('#popup-video iframe').attr('src', 'https://www.youtube.com/embed/'+App.movieID+'?version=3&amp;controls=1&amp;showinfo=0&amp;modestbranding=1&amp;wmode=transparent&amp;rel=0&amp;autoplay=1&amp;html5=1&amp;enablejsapi=1');
  })

  $('#popup-video .modal__close').on('click', function(){
    $('#popup-video iframe').attr('src', '');
    fullscreen.playVideo();    
  })

  // gnb 클릭 이벤트  0310 수정 
  $('.gnb a').on('click', function(){    
    if(playing == 1){
      eventVideo.stopVideo(); 
    }

    var idxGnb = $(this).index()

    $('.gnb a').removeClass();
    $(this).addClass('is-active');

    $('.section').eq(idxGnb).fadeIn(100).siblings('.section').fadeOut(100);
    setTimeout(function(){
     $('.section').eq(idxGnb).addClass('on').siblings('.section').removeClass('on');
    },10)     
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
        eventVideo.pauseVideo();
      } else if(delta < 0 ) { // DOWN     
        $('.gnb a.is-active').next().trigger('click');
        eventVideo.pauseVideo();
      }
    } else if(docHeight<=962){ // 최소높이 이하 스크롤 생성시 스크롤 이동 후 페이지 이동
      if(delta >= 0 && sct < 2 ) { // UP       
        $('.gnb a.is-active').prev().trigger('click');
        eventVideo.pauseVideo();
      } else if(delta < 0 && scb ) { // DOWN     
        $('.gnb a.is-active').next().trigger('click');
        eventVideo.pauseVideo();
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

  //////////////////////////////////////////////// @ test ////////////////////////////////////////////
  $('.btn-start-reser').on('click', function(){
    $('.gnb a').eq(1).trigger('click');
  });

  $('#alert-noreser .modal-btn-close').on('click', function(){
    $('.gnb a').eq(1).trigger('click');
  });

  $('#frm-start .btn-start').on('click', function(e){
    e.preventDefault();

    if (!mui.validate.input($('#start-number'))){
      //alert("정확한 휴대폰 번호를 입력하세요");        
      alertModal(0);
      return false;
    } else if (!mui.validate.input($('#start-number'),"tel")){
      //alert("정확한 휴대폰 번호를 입력하세요");       
      alertModal(2);
      return false;
    }
    mui.validate.init($('#frm-start'), e );
    mui.modal.open('test-modal')
  });

  // @@ 룰렛 다음스테이지
	$('.btnRullNext').on('click',function(){
		$('.PopSec02').show().siblings('.popSection').hide();
		//mui.modal.close('test-modal');
  	})

 //사용자 도전횟수 , 전체점수 , 점수별 등급
	var user = {
		Challenge : 3,
		rullPoint : 0,
		resultText : ['RPG연습생','RPG비기너','RPG마스터','RPG마에스트로']
	}


	//게이지 증가
	function gaugeGo(el){
		if (el >= 100 ){
			$('.gaugeWrap .bar .fill').css('width','100%');
			//$('.switch').text('100%') 
		}else{
			$('.gaugeWrap .bar .fill').css('width',el+'%');
			//$('.switch').text(el+'%') 
		}
	}

	//문제풀었는지 체크 , 다음스테이지로 이동
	function qusState(qustion,stage){
		if (!mui.validate.radio(qustion)){
			//alert('문제를 풀어주세요')
			alertModal(6);
      return false;
		}
		$('.PopSec0'+stage).show().siblings('.popSection').hide();
	}


	//룰렛 다음스테이지
	$('.btnRullNext').on('click',function(){
		$('.PopSec02').show().siblings('.popSection').hide();
		//mui.modal.close('test-modal');
  	})


	//룰렛 실행
	function rotateGo(idx,level){
		var num = 3600 + parseInt(idx)  // 기본 10바퀴 지정 + 사용자 지정
		$("#pan").rotate({
			  angle: 0,
			  animateTo:num,
			  duration: 4000,
			  easing: $.easing.easeInOutElastic,
			  callback:function(){
          $('.rullNum').text(level) 
          user.rullPoint += level; //점수합산
          gaugeGo(user.rullPoint) //게이지 증가
          mui.modal.open('test-rullet');
			  }
		});
	}

	//룰렛 확률
	var rullCheck = true;

	$('.rullStart').on('click',function(){		
		if(rullCheck == true){
			rullCheck = false;
			var idx = Math.random();
			if(idx <= 0.3){
				rotateGo(27,15)
			}else if(idx > 0.3 && idx <= 0.45){
				rotateGo(302,10)
			}else if(idx > 0.45 && idx <= 0.55){
				rotateGo(261,0)
			}else if(idx > 0.55 && idx <= 0.75){
				rotateGo(216,30)
			}else if(idx > 0.75 && idx <= 1){
				rotateGo(130,20)
			}
		}
		$('#test-modal').unbind('click'); //배경클릭시 닫힘 방지
    $('.modal-backdrop').css('display','block');
	})

  
	//1번문제 넥스트
	$('.qsBtn01').on('click',function(){
		qusState('qustion01',3);
		var answer = $('input:radio[name="qustion01"]:checked').parent().index() + 1;
		if(answer == 3){
			user.rullPoint += 20;
			gaugeGo(user.rullPoint);
		}
	})

	//2번문제 넥스트
	$('.qsBtn02').on('click',function(){
		qusState('qustion02',4);
		var answer = $('input:radio[name="qustion02"]:checked').parent().index() + 1;
		if(answer == 2){
			user.rullPoint += 20;
			gaugeGo(user.rullPoint);
		}
	})
  
	//3번문제 넥스트
	$('.qsBtn03').on('click',function(){
		qusState('qustion03',5);
		var answer = $('input:radio[name="qustion03"]:checked').parent().index() + 1;
		if(answer == 2){
			user.rullPoint += 20;
			gaugeGo(user.rullPoint);
		}
	})


	//닉네임 확인
	$('.bonus .btnNickCheck').on('click',function(){
		var idx = $(this).parent().index() + 1;
		var nickInput = $('#nick0'+idx);

		 if (!mui.validate.input(nickInput)){
			//alert('닉네임을 입력해주세요.')      
			alertModal(7);
			return false;
		 }else if($(this).siblings('input').attr('disabled')){
			 //alert('이미 입력하셨습니다.')			 
			alertModal(8);
       return false;
		 }else{
			 $(this).siblings('input').attr('disabled',true);
				user.rullPoint += 10;
				gaugeGo(user.rullPoint);
		 }
	
	}) 


	//응모완료
	$('.btn-enter').on('click',function(){
    var count = 0;
    
     $('.bonus-list li').each(function(){
       var $input =  $(this).find('input');
       var textLength =  $input.val().length ;
         if(textLength > 0 && $input.attr('disabled') != 'disabled'){
          //alert('확인을 눌러주세요');
          alertModal(10);
          count++
          return false;
         } 
      })              
      
      
      if(count > 0 ){
        return false;
      }else {
        $('.totalNum').text(user.rullPoint); // 총점

        if(user.rullPoint <= 30){   // 등급
          $('.userName').text(user.resultText[0])
        }else if(user.rullPoint <= 60){
          $('.userName').text(user.resultText[1])
        }else if(user.rullPoint <= 80){
          $('.userName').text(user.resultText[2])
        }else{
          $('.userName').text(user.resultText[3])
        }
        mui.modal.open('test-perpect');  // 결과 팝업    
		
      }


	})

  // 초기화  
  var resetFun = function(){  
    $('.PopSec01').show().siblings('.popSection').hide();
     rullCheck = true;
    user.rullPoint = 0;
    gaugeGo(user.rullPoint);
    $('.qsWrap').find('label').removeClass('is-checked');
    $('.qsWrap').find('input[type="radio"]').prop('checked', false);
    $('.qsWrap').find('input[type="text"]').val('').attr('disabled',false);
    mui.modal.close('test-modal');
  }
    
  //100점 미만 확인버튼 클릭시
  $('#test-score .btn-complete').on('click', function(){
    mui.modal.open('test-confirm');
  });

  $('#test-confirm .btn-yes').on('click', function(){
    resetFun();
    mui.modal.close('test-score');
    mui.modal.close('test-confirm');
  });

  // 100점 팝업 확인버튼 클릭시
  $('#test-perpect .btn-complete').on('click', function() {
    resetFun();
    mui.modal.close('test-perpect');
    alertModal(9);
  });

    // 팝업닫으면 다시 처음으로 돌아가기
  $('#test-modal .modal__close').on('click', function(){
    resetFun();
  });

}());