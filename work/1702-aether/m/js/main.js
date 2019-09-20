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
      videoId: '8SunQTHC2G4',  
      playerVars: {             
          'autoplay': 0,
          'controls': 1,
          'showinfo': 0,
          'rel' : 0,
          'modestbranding' : 1
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
  var playing; //event.data 값 받아오는 전역변수 -> 재생:1, 정지:0, 시작안됨:-1 
  function mainPopVideoStateChange(event) {
    playerState = event.data == YT.PlayerState.ENDED ? '종료됨' :
    event.data == YT.PlayerState.PLAYING ? '재생 중' :
    event.data == YT.PlayerState.PAUSED ? '일시중지 됨' :
    event.data == YT.PlayerState.BUFFERING ? '버퍼링 중' :
    event.data == YT.PlayerState.CUED ? '재생준비 완료됨' :
    event.data == -1 ? '시작되지 않음' : '예외';
    //console.log('onPlayerStateChange 실행: ' + playerState);

    playing = event.data; //event.data 값 받아오는 전역변수 -> 재생:1, 정지:0, 시작안됨:-1 
  
    if(event.data == YT.PlayerState.PLAYING) {// 재생중    
      $(window).on("orientationchange",function(){
         if(window.orientation == 0) {
            $('#landscape').hide();
            $('#viewport').show();
        } else {
            $('#landscape').hide();
            $('#viewport').show();
        }
      });
    } else if(event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED) {
      $(window).on("orientationchange",function(){
         if(window.orientation == 0) {
          $('#landscape').hide();
          $('#viewport').show();
        } else {
          $('#landscape').show();
          $('#viewport').hide();
        }
      });
      
    }
  
  
  }



(function(){ 


  $(document).ready(function(){
     $('.gnb a').eq(0).trigger('click');
     var hname = window.location.hash;

     if(hname  =="#main"){
      $('.gnb > a').eq(0).trigger('click');
    }else if(hname  =="#event1"){
      $('.gnb > a').eq(1).trigger('click');
    } else if(hname  =="#event2"){
      $('.gnb > a').eq(2).trigger('click');
    } else if(hname  =="#event3"){
      $('.gnb > a').eq(3).trigger('click');
    } else if(hname  =="#cbtPage"){
      $('.gnb .btn-cbt').trigger('click');
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
      $('#test-rullet .rullNum').css('font-size','19px');
      $('.bonus-list input[type="text"]').css('font-size','14px');
      $('.userName').css('font-size','14px');
      $('.totalNum').css('font-size','14px');
    }
  });

    // 가로모드 출력
    /*$(window).on("orientationchange",function(){
       if(window.orientation == 0) {
          $('#landscape').hide();
          $('#viewport').show();
      } else {
          $('#landscape').show();
          $('#viewport').hide();
      }
    });*/


  // 영상 배경 재생 및 팝업 영상 재생

  var App = window.App || {};
    App.movieID = "8SunQTHC2G4"

    $('.btn-play').on('click', function(){
      $('#popup-video iframe').attr('src', 'https://www.youtube.com/embed/'+App.movieID+'?version=3&amp;amp;controls=1&amp;amp;showinfo=0&amp;amp;modestbranding=1&amp;amp;wmode=transparent&amp;amp;rel=0&amp;amp;autoplay=1&amp;amp;html5=1&amp;amp;enablejsapi=1');      
      //mainPopVideo.playVideo();        
      //slider.goToSlide(0);
    })

    $('#popup-video .modal__close').on('click', function(){
      $('#popup-video iframe').attr('src', '');
	    //mainPopVideo.stopVideo();    
    })

    // 슬라이더 
  var slider = $('.event2-slide').bxSlider({
    slideWidth: 686,
    maxSlides: 1,
    moveSlides: 1,
    infiniteLoop: false,
    hideControlOnEnd : true,
    touchEnabled: true,
    pager: false,
    video: true,

    onSlidePrev:function($slideElement, oldIndex, newIndex){
      mainPopVideo.pauseVideo();  
    },
    onSlideNext:function($slideElement, oldIndex, newIndex){
      mainPopVideo.pauseVideo();
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

    // 디바이스별 해상도에 따라 비율 맞추기  
   
  });

  $('.event2-tab a').on('click',function(){ 
    mainPopVideo.stopVideo(); 
    var idx = $(this).index();
    if(idx == 1){
      slider.goToSlide(0);
    }else{
      slider.goToSlide(1);
    }
  });

  // gnb 클릭 이벤트  

  $('.gnb > a').on('click', function(){

    if(playing == 1){
      mainPopVideo.stopVideo(); 
    }


    var idxGnb = $(this).index()
    $('.gnb > a').removeClass();
    $(this).addClass('is-active');

    $('.section').eq(idxGnb).fadeIn(100).siblings('.section').fadeOut(100);
    $('.section').eq(idxGnb).addClass('on').siblings('.section').removeClass('on');
  });

  $('.btn-cbt').on('click', function(){  
    $('.gnb > a').removeClass('is-active');
    $('.section').eq(4).fadeIn(100).siblings('.section').fadeOut(100);
    $('.section').eq(4).addClass('on').siblings('.section').removeClass('on');
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

  //////////////////////////////////////////////// @ test ////////////////////////////////////////////
  $('.btn-start-reser').on('click', function(){
    $('.gnb > a').eq(1).trigger('click');
  });

  $('#alert-noreser .modal-btn-close').on('click', function(){
    $('.gnb > a').eq(1).trigger('click');
  });  

  $('#frm-start .btn-start').on('click', function(e){
    e.preventDefault();
/*
    if (!mui.validate.input($('#start-number'))){
      //alert("정확한 휴대폰 번호를 입력하세요");        
      alertModal(0);
      return false;
    } else if (!mui.validate.input($('#start-number'),"tel")){
      //alert("정확한 휴대폰 번호를 입력하세요");       
      alertModal(2);
      return false;
    }
    mui.validate.init($('#frm-start'), e );*/
    //mui.modal.open('test-modal');
    $('html, body').scrollTop('0');
    $('.popup-backdrop').show();
    $('#test-modal').addClass('is-visible').css('margin-top',-(($('#test-modal').innerHeight() -200) / 2));
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
			  duration: 6000,
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
    //$('.modal-backdrop').css('display','block');
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

    $('#test-modal').addClass('bonusPage');
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

      $('#test-modal').removeClass('bonusPage');
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
         
    });

  // 초기화  
  var resetFun = function(){  
    $('.PopSec01').show().siblings('.popSection').hide();
     rullCheck = true;
    user.rullPoint = 0;
    gaugeGo(user.rullPoint);
    $('.qsWrap').find('label').removeClass('is-checked');
    $('.qsWrap').find('input[type="radio"]').prop('checked', false);
    $('.qsWrap').find('input[type="text"]').val('').attr('disabled',false);
    //mui.modal.close('test-modal');
    $('#test-modal').removeClass('is-visible');
    $('.popup-backdrop').hide();
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
  $('#test-modal .popup-close').on('click', function(){
    resetFun();
  });


}());