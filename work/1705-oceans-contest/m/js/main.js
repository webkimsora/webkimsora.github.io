var zoomUtils = function(opts){
  var defaults = {
    psdSize : 720
  };
  var options = $.extend(defaults, opts);

  return $('body').css('zoom', ($(window).width() / options.psdSize).toFixed(5));
};

;(function(){
  $(window).bind('load resize', function(){
    zoomUtils({psdSize: 720})
  })

  $(document).ready(function(){
     zoomUtils({psdSize: 720})
     $('body').addClass('on');
  })
})();

(function(){ 
  //해상도 계산
  $("document").ready(function() {
    // 최초 페이지 로딩 시 가로, 세로를 모르기 때문에 trigger로 처리 (PC로 보는 모바일에선 계속 가로 처리됨)
    //$(window).trigger("orientationchange"); 
    
    // 파폭 체크 (document에 넣어야함)
    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
      $('#meta').attr('content', 'width=720, minimal-ui,user-scalable=no');
    }

    var winSize = ($(window).width() / 720).toFixed(5)
    winSize = 100/Number(winSize*100)    
    var winHeight = $(window).height();
    winHeight = winHeight*winSize
    //$('.main').height(winHeight);
    
    // 디바이스별 해상도에 따라 비율 맞추기  
    $('body').addClass('on');
  });

  // 아이폰 폰트 크기
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if(iOS) {
  }

  // 가로세로 전환 처리
  $(window).bind("orientationchange", function(e) { 
    var orientation = window.orientation;

    // 메인배경 : 메타720에서 가로 리사이즈 왔다갔다할 때 깨져보여서 딜레이 줌
     if(window.orientation == 0) {
      setTimeout(function(){
        $('#viewport').css('zoom',1).show();
			zoomUtils({psdSize: 720})
          },300)			  
      } else {
        $('#viewport').css('zoom',1)
        setTimeout(function(){
		   zoomUtils({psdSize: 720})
        },300)  
    }
  });
  
  /*// 가로모드 방지
  $(window).on("orientationchange",function(){
     if(window.orientation == 0) {
        $('#landscape').hide();
        $('#viewport').show();
    } else {
        $('#landscape').show();
        $('#viewport').hide();
    }
  });*/

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
  

    // @ gnb 메뉴창
  $user = $('.userwrap');
  var winHeight = $(window).height();
  var userHeight = $('.user-contents').height() ;
  var st = $(this).scrollTop();
   var winTop = 0;
    var zoomS = ($(window).width() / 720).toFixed(5);

  $('.top-menu').on('click', function(){
    $user.addClass('open');
    $('#userBg').show();
    
    $('#userBg').on('touchstart',function(e){
      e.preventDefault();
    });
    
    winTop = $(window).scrollTop()
    $('#viewport').css({'top':(winTop * -1) / zoomS,position:'fixed'});
  });

  $('.user-close').on('click', function(){  
    $user.removeClass('open');
    $('#userBg').hide();

    $('#viewport').css({'top':'',position:'relative'});
    $(window).scrollTop(winTop);
  });

  $('#userBg').on('click', function(){  
    $user.removeClass('open');
    $('#userBg').hide();
    
    $('#viewport').css({'top':'',position:'relative'});
  });

  // GNB  
  var zoomSize = ($(window).width() / 720)

  $('.nav-menu li').on('click',function(e){
		e.preventDefault();
    
    $user.removeClass('open');
    $('#userBg').hide();
    $('#viewport').css({'top':'',position:'relative'});
    $(window).scrollTop(winTop);

		var idx = $(this).index()+1;
		var position = $('.page').eq(idx).attr('data-height');
		position = position.replace("px","");
		position = (position) * (($(window).width() / 720));
		var positionPar = position;
/*
    if(idx == 3){
      $('html,body').stop().animate({scrollTop:positionPar},500);
      return false;
    } else {*/
      $('html,body').stop().animate({scrollTop:positionPar},500);
      return false;
	})    

  
  // 영상 배경 재생 및 팝업 영상 재생

  var App = window.App || {};
    App.movieID = "wjB35MNnGrM"

    $('.btn-teaser-play').on('click', function(){
      $('#popup-video iframe').attr('src', 'https://www.youtube.com/embed/'+App.movieID+'?version=3&amp;amp;controls=1&amp;amp;showinfo=0&amp;amp;modestbranding=1&amp;amp;wmode=transparent&amp;amp;rel=0&amp;amp;autoplay=1&amp;amp;html5=1&amp;amp;enablejsapi=1');
    })

    $('#popup-video .modal-btn-close').on('click', function(){
      $('#popup-video iframe').attr('src', '');
    })

  // @@ 영상 리스트 슬라이더
  var slider = $('#movie .list').bxSlider({
    infiniteLoop: false,
    hideControlOnEnd : true,
    pager: false,
    slideWidth : 152,
    minSlides : 2,
    maxSlides : 3,
    slideMargin: 8
  });


    // @ 모집안내 bxslider
  var slider2 = $('.guide-shot').bxSlider({
    infiniteLoop: false,
    hideControlOnEnd: true,
    touchEnabled: true,
    pager: true,
    controls: true
  });

        // @ 베스트 인기출품작 bxslider
  var slider3 = $('.best .workListWrap').bxSlider({
    infiniteLoop: false,
    hideControlOnEnd : true,
    touchEnabled: true,
    pager: true,
    controls: true
  });

  // @ 영상 소개
  var isAutoPlay = 0;
  $(document).ready(function(){
    //$('.frame-play-contents .list').find('li').eq(0).find('button').trigger('click');
    //var firstVideo = $('.frame-play-contents .list').find('li').eq(0).find('button[data-video]')
    var firstVideo = 'MSgl032Vy9s'
    $('#web-video-frame').attr('src','https://www.youtube.com/embed/'+firstVideo+'?autoplay='+isAutoPlay+'&rel=0&amp;controls=1&amp;showinfo=0')
  });

  $('.frame-play-contents [data-video]').on('click', function(){
    var videoID = $(this).data('video');
    var $_self = $(this);
    var $target ;
    var isAutoPlay = 1

    $_self.closest('ul').find('button').removeClass('is-active');
    $_self.addClass('is-active');

    if ( $_self.closest('.frame-play-contents').hasClass('frame-play-contents') ){
      $target = $('#web-video-frame');
    }

    $('#web-video-frame').attr('src', 'https://www.youtube.com/embed/'+videoID+'?autoplay='+isAutoPlay+'&rel=0&amp;controls=1&amp;showinfo=0')
  });

     /// 셀렉트 박스 ///  
  var selectTarget = $('.languageSel select');

  selectTarget.change(function(){
      var select_name = $(this).children('option:selected').text();
      $(this).siblings('label').text(select_name);
  });

  var selectTarget2 = $('.searchSel select');

  selectTarget2.change(function(){
      var select_name = $(this).children('option:selected').text();
      $(this).siblings('label').text(select_name);
  });

   // 인기 출품작
  $(document).ready(function(){
    var bestList = $('.best .workListWrap li')

    bestList.eq('0').addClass('grade1')
    bestList.eq('1').addClass('grade2')
    bestList.eq('2').addClass('grade3')
  })

/////////////////////// 알럿창 ////////////////////////
$('.btn-likeFig').on('click', function(){
  alert('추천 되었습니다.')
})

/////////////////////// 팝업 /////////////////////////    
  // 사용자 영상 보기
  $('.workList [data-playData]').on('click', function(){
    var videoID = $(this).attr('data-playData');
    var $_self = $(this);
    var $target ;

    console.log(videoID)

    if ( $_self.closest('.workList').hasClass('workList') ){
      $target = $('.popup-video-frame iframe');
    }

    mui.modal.open('popup-video')
    $('.popup-video-frame iframe').attr('src', 'https://www.youtube.com/embed/'+videoID+'?autoplay=1&rel=0&amp;controls=1&amp;showinfo=0')
  });

   $('#popup-video .modal__close').on('click', function(){
    $('#popup-video iframe').attr('src', '');
  })

  // 작품 출품하기
  $('.app-notice').hover(function(){
    $('.app-noticeImg').show();
  }, function(){    
    $('.app-noticeImg').hide();
  });

  $('.btn-app').on('click', function(e){
      e.preventDefault();
  /*
      if (!mui.validate.input($('#app-title'))){
        alert("영상 제목을 입력해주세요");        
        //alertModal(3);
        return false;
      } else if (!mui.validate.input($('#app-explain'))){
        alert("영상 설명을 입력해주세요");        
        //alertModal(5);
        return false;
      } else if (!mui.validate.input($('#app-team'))){
        alert("팀명을 입력해주세요");        
        //alertModal(5);
        return false;
      } else if (!mui.validate.input($('#app-movie'))){
        alert("유튜브 URL을 입력해주세요");        
        //alertModal(5);
        return false;
      } else if (!mui.validate.input($('#collect-name'))){
        alert("성명을 입력해주세요");        
        //alertModal(5);
        return false;
      } else if (!mui.validate.input($('#collect-tel'))){
        alert("휴대폰 번호를 입력해주세요");        
        //alertModal(5);
        return false;
      } else if (!mui.validate.input($('#collect-tel'),"tel")){
        alert("정확한 휴대폰 번호를 입력해주세요");       
        //alertModal(4);
        return false;
      } else if (!mui.validate.input($('#collect-mail'))){
        alert("이메일을 입력해주세요");        
        //alertModal(5);
        return false;
      } else if (!mui.validate.checkbox($('#reser-chkbox'))){
        alert("개인정보수집에 동의해주세요"); 
        //alertModal(7);
        return false;
      }*/
       //mui.validate.init($('#frm-app'), e );
       mui.modal.open('modal-confirm');
    
  })

  // 출품 확인 팝업
  $('.btn-complete').on('click', function(){
    mui.modal.close('modal-confirm');
    mui.modal.close('modal-app')
    mui.validate.init($('#frm-app'));
    mui.modal.open('popup-complete');
  })
  $('.btn-modific').on('click', function(){
    mui.modal.close('modal-confirm');
  })



    // 공유하기
    $('.btn-shareTxt').on('click', function(){
      mui.modal.close('popup-shareTxt');
      mui.modal.open('popup-share');
    })




}());