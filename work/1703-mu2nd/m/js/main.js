 /**
 * Youtube API 로드
 */   
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); 

  var mainPopVideo = null;
		
  function onYouTubeIframeAPIReady() {
    mainPopVideo = new YT.Player('movie-frame', {
      height: '100%',           
      width: '100%',             
      videoId: 'videoArr',  
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
      setTimeout(function(){
          $('#landscape').hide();
          $('#viewport').show();
          },300)
        } else {
      setTimeout(function(){
          $('#landscape').show();
          $('#viewport').hide();
          },300)
        }
      });
      
    }   
  }



(function(){ 
  //해상도 계산
  $("document").ready(function() {
    $(window).trigger("orientationchange"); // 최초 페이지 로딩 시 가로, 세로를 모르기 때문에 trigger로 처리

    var winSize = ($(window).width() / 720).toFixed(5)
    winSize = 100/Number(winSize*100)    
    var winHeight = $(window).height();
    winHeight = winHeight*winSize
    //console.log(winHeight);
    //$('.main').height(winHeight);
    
    // 디바이스별 해상도에 따라 비율 맞추기  
    $('body').addClass('on');
  });

  $(window).on('resize', function(){
		$('body').css('zoom', ($(window).width() / 720).toFixed(5));    
	});
	$(window).load(function(){

		$(window).trigger('resize');
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
    var goTop = $('.section').eq(0).attr('data-height');    
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

  // @ gnb 클릭 이벤트  
  $('.gnb-list > a').on('click', function(){
    var idxGnb = $(this).index()
    $('.gnb-list > a').removeClass();
    $(this).addClass('is-active');

    $('.section').eq(idxGnb).fadeIn(100).siblings('.section').fadeOut(100);
    $('.section').eq(idxGnb).addClass('on').siblings('.section').removeClass('on');
    $('.btnTop').trigger('click');
  });

  //
   $(document).ready(function(){
     $('.gnb-list a').eq(0).trigger('click');
     var hname = window.location.hash;

     if(hname  =="#main"){
      $('.gnb-list a').eq(0).trigger('click');
    }else if(hname  =="#update"){
      $('.gnb-list a').eq(1).trigger('click');
    } else if(hname  =="#event"){
      $('.gnb-list a').eq(2).trigger('click');
    } else if(hname  =="#trace"){
      $('.gnb-list a').eq(3).trigger('click');
    } else if(hname  =="#celebrate"){
      $('.gnb-list a').eq(4).trigger('click');
    }  

    
    // 아이폰 폰트 크기
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if(iOS) {
      $('#message').css('font-size','10px');
      $('#reser-number').css('font-size','10px');
    }
  });  

  // @ 메인 자세히보기
  $('.main-title').on('click', function(){
    mui.modal.open('popup-video');
    $('#popup-video iframe').attr('src', 'https://www.youtube.com/embed/'+videoArr[4]+'?version=3&amp;controls=1&amp;showinfo=0&amp;modestbranding=1&amp;wmode=transparent&amp;rel=0&amp;autoplay=1&amp;html5=1&amp;enablejsapi=1');
  });
  $('.main-list-update').on('click', function(){
    $('.gnb-list a').eq(1).trigger('click');
  });  
  $('.main-list-event').on('click', function(){
    $('.gnb-list a').eq(2).trigger('click');
    $('.btnTop').trigger('click');
  });  
  $('.main-list-trace').on('click', function(){
    $('.gnb-list a').eq(3).trigger('click');
  });  
  
  /*$(window).bind("orientationchange", function() { // 가로세로 전환 처리
     if(window.orientation == 0) {
        $('#landscape').hide();
        $('#viewport').show();
        $('.modal-backdrop').css('height','100'+'%');
    } else { //가로
        $('#landscape').show();
        $('#viewport').hide();
        $('.trace-list li a').removeClass('is-active');
        $('.modal-backdrop').css('height','100'+'%');
    }
  });*/
  
  // @ 업데이트 bxslider
  var slider = $('.update-shot').bxSlider({
    slideWidth: 560,
    maxSlides: 1,
    moveSlides: 1,
    infiniteLoop: false,
    hideControlOnEnd : true,
    touchEnabled: true,
    pagerCustom: '.update-tab'
  });

  // @ 발자취 동영상
    //영상 순서 123894765
  var videoArr = ['4_igat0yyok','py9cFs1djqI','z_NXu2iN3XM','L6HKxj_bUsc','FA5ZUw0Lt2g','ZnY478ojg14','i9SkMrOlsBk','B8Nzwn2oEBw','GE51fSuE7n0']
  var indexVideo;

  $('.trace-list li').on('click', function(){
    var Idx = $(this).index()
    var movieID = videoArr[Idx];
    indexVideo = Idx;

    $('.trace-list li a').removeClass('is-active');
    $(this).find('a').addClass('is-active');
    
	  mainPopVideo.loadVideoById(movieID, 0, "large"); 
    mui.modal.open('popup-video');

    //$('#popup-video iframe').attr('src', 'https://www.youtube.com/embed/'+movieID+'?version=3&amp;controls=1&amp;showinfo=0&amp;modestbranding=1&amp;wmode=transparent&amp;rel=0&amp;autoplay=1&amp;html5=1&amp;enablejsapi=1');
  
  });  
  $('#popup-video .modal__close').on('click', function(){    
      mainPopVideo.pauseVideo();
    //$('#popup-video iframe').attr('src', '');
    $('.trace-list li a').removeClass('is-active');
  })
  
  
  // @공유하기 팝업
    /*추가 S*/
  $('.btn-share').on('click', function(){
    $('#modal-share').addClass('is-visible');
    $('.popup-backdrop').show();
  });


  $('#modal-share .modal__close').on('click', function(){
    $('#modal-share').removeClass('is-visible');
    $('.popup-backdrop').hide();
  })
    /*추가 E*/
    // alertModal data index 
  var alertModal = function(index) {
    $('#alert-modal [data-alert-index]').hide();
    $('#alert-modal [data-alert-index=' + index + ']').show();
    mui.modal.open('alert-modal');
  };
  // 공유클릭먼저 (개발시 삭제)
  var $shareEvent = false;
  $('.shareWrap-list a').on('click', function(){
    $('.shareWrap-list li').removeClass('is-active');
    $(this).closest('li').addClass('is-active');
    $shareEvent = true;
  })
  // 이벤트 참여
  $('.btn-complete').on('click', function(e){
    e.preventDefault();
    if(!mui.validate.input($('#message'))){
      //alert('축하 메세지를 입력해주세요')
      alertModal(5);
      return false;
    } else if($shareEvent == false) { 
      // alert("SNS 먼저 선택 해주세요")
      alertModal(4);
      return false;      
    //} else if(document.getElementById('message').value === ''){
    } else if (!mui.validate.input($('#reser-number'))){
      //alert("정확한 휴대폰 번호를 입력하세요");        
      alertModal(0);
      return false;
    } else if (!mui.validate.input($('#reser-number'),"tel")){
      //alert("정확한 휴대폰 번호를 입력하세요");       
      alertModal(2);
      return false;
    } else if (!mui.validate.checkbox($('#reser-chkbox'))){
      //alert("개인정보수집에 동의해주세요"); 
      alertModal(1);
      return false;
    } else if (!mui.validate.checkbox($('#trust-chkbox'))){
      //alert("개인정보수집에 동의해주세요"); 
      alertModal(1);
      return false;
    }
     //alert("참여완료 정보 확인");     
     mui.modal.open('popup-complete')
  
     mui.validate.init($('#frm-reser'), e );
     reserOk = true;
  });


}());