/**
 * Youtube API 로드
 */

 function progress(percent, $element) {
  var progressBarWidth = percent * $element.width() / 100;

// $element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "%&nbsp;");

  $element.find('div').animate({ width: progressBarWidth });
}

var playVideoID =  $('.event-movie [data-playData]').data('playData');

var ranCount = Math.floor(Math.random() * 3);
//랜덤 = 소수점으로 나옴 -> 정수로 만들어줌 -> 곱하기경우 3 이상은 안나오고 0,1,2만 카운트됨 
/*var last = ['TBd0A0Z-fe4','Ki6f_kdjLgA','UfzzsbimWRY']
console.log(last[ranCount]);*/

var youSrc01 = '7oaup9p_FT8,Gn24wOMV-t8,5RBtxcaHAwA';
var youSrc02 = 'Gn24wOMV-t8,7oaup9p_FT8,5RBtxcaHAwA';
var youSrc03 = '5RBtxcaHAwA,7oaup9p_FT8,Gn24wOMV-t8';
var resultSrc;

if(ranCount == 0){
    resultSrc = youSrc01;
}else if(ranCount == 1){
    resultSrc = youSrc02;
}else{
    resultSrc = youSrc03;
}


   
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  var fullScreen = null;
		
  function onYouTubeIframeAPIReady() {
      fullScreen = new YT.Player('fullscreen-player', {
          playerVars: {                   
              'autoplay': 1,
              'controls': 0,
              'loop' : 1,
              'showinfo': 0,
              'rel' : 0,
              /*listType:'playlist',
              list: 'UUPW9TMt0le6orPKdDwLR93w'*/
              'playlist' : resultSrc
          },
          events: {
              'onReady': fullScreenReady,               // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
              'onStateChange': fullScreenStateChange    // 플레이어의 상태가 변경될 때마다 실행
          }
      });

      // 이벤트 영상
      player = new YT.Player('ytplayer', {
          height: '540',
          width: '960',
          videoId: playVideoID,
            playerVars: {
            'controls' : 0,
            'modestbranding' : 1,
            'rel' : 0,
            'showinfo' : 0
          },
            events: {
                'onReady': onPlayerReady,
                 'onStateChange': onPlayerStateChange
            }
        });


  }

    function fullScreenReady(event) {
        event.target.playVideo();
        event.target.mute();
    }  

    function fullScreenStateChange(event) {
        playerState = event.data == YT.PlayerState.ENDED ? '종료됨' :
        event.data == YT.PlayerState.PLAYING ? '재생 중' :
        event.data == YT.PlayerState.PAUSED ? '일시중지 됨' :
        event.data == YT.PlayerState.BUFFERING ? '버퍼링 중' :
        event.data == YT.PlayerState.CUED ? '재생준비 완료됨' :
        event.data == -1 ? '시작되지 않음' : '예외';

        console.log('fullScreenChange 실행: ' + playerState);

        if(event.data == YT.PlayerState.CUED){
            fullScreen.playVideo();
            //fullScreen.mute();
        }
        if(event.data == YT.PlayerState.PLAYING) {
        }
    }
      // @ 이벤트 영상      
    function onPlayerReady(event) {

            //mui.modal.open('popup-video')
            //event.target.playVideo();
            player.stopVideo();
    }  

var mytimer = function(){};


    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {

          var playerTotalTime = player.getDuration();

          mytimer = setInterval(function() {
            var playerCurrentTime = player.getCurrentTime();

            var playerTimeDifference = (playerCurrentTime / playerTotalTime) * 105;


            progress(playerTimeDifference, $('#progressBar'));
          }, 1000);        
        } else {          
          clearTimeout(mytimer);
        }
        //종료시 실행
        if(event.data == YT.PlayerState.ENDED){
            end();
        }
    }

    
    function end(){
        $('.btn-share').attr('href','#popup-share');
    }

/////////////////////////////////////////////////////////////

(function(){ 

    /* 1707052 수정 S 
    // @ 삼성닷컴 GNB 높이 체크 후 적용 필요
    var ssGNB = $('.dummy').height();
    $('.main').height($(window).height()- ssGNB) 

  // @ 메인 영상 리사이즈
	var resize = function() {
		var width = $(window).width(),
			pWidth, // player width, to be defined
			height = $(window).height(),
			pHeight, // player height, tbd
			$tubularPlayer = $('#fullscreen-player');

		if (width / (16/9) < height) { // if new video height < window height (gap underneath)
			pWidth = Math.ceil(height * (16/9)); // get new player width
			$tubularPlayer.width(pWidth).height(height).css({left: (width - pWidth) / 2, top: 0}); // player width is greater, offset left; reset top
		} else { // new video width < window width (gap to right)
			pHeight = Math.ceil(width / (16/9)); // get new player height
			$tubularPlayer.width(width).height(pHeight).css({left: 0, top: (height - pHeight) / 2}); // player height is greater, offset top; reset left
		}
	}

	$(window).on('resize', function() {
        $('.main').height($(window).height()-ssGNB) 
		resize();        
	})

	resize();
1707052 수정 E */
/**/

    // @ 스크롤
    $('.gnb li > a').on('click', function(){   
        var winSc = $(window).scrollTop();
        var idx = $(this).parent().index();

        $('html, body').stop().animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
            }, 500);
        return false;
    });  
    
    $('.subGnb li > a').on('click', function(){   
        var winSc = $(window).scrollTop();
        var idx = $(this).parent().index();

        $('html, body').stop().animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
            }, 500);
        return false;
    });  

    $(window).scroll(function(){
        var winHeight = $(document).scrollTop()

        $.each($('.section'), function(idx, item) {
          var $target = $('.section').eq(idx),              
              i = $target.index(),
              targetTop = $target.offset().top - 400 ;
              thirdTarget =  $('.section').eq(2).offset().top - 400;
          var $subGnb = $('.subGnb li')
 
          if(targetTop <= winHeight) {                  
              if(winHeight < thirdTarget) {
                $('.subGnb').fadeOut(300);
                $('.gnb li').removeClass('is-active');
                $('.gnb li').eq(idx).addClass('is-active');
                $('.section').removeClass('on').eq(idx).addClass('on');
              } else {
                $('.subGnb').fadeIn(300);
                $('.gnb li').removeClass('is-active');
                $('.gnb li').eq(2).addClass('is-active');
                $subGnb.removeClass('is-active').eq(idx-2).addClass('is-active')
                $('.section').removeClass('on').eq(idx).addClass('on');
              }
          }
        })
            
        if(winHeight > $('.section').eq(1).offset().top - 600) {
          $('#event .square').addClass('on');
        }  else if(winHeight > $('.section').eq(0).offset().top + 200) {
          $('#event .square').removeClass('on');        
        }
        if (winHeight > $('.section').eq(4).offset().top - 600) {
          $('#spec .square').addClass('on');
        } else if (winHeight < $('.section').eq(3).offset().top + 200){        
          $('#spec .square').removeClass('on');
        }
    });
        
    // 아래 버튼 클릭 
    $('.mouse > a').on('click', function(){
        $('html, body').stop().animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 500);
        return false;    
    });
    
    $('.btn-go-share').on('click', function(){
        $('html, body').stop().animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 500);
        return false;    
    });
    
    $('.main-gift > a').on('click', function(){
        $('html, body').stop().animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 500);
        return false;    
    });

    // 이벤트 영상 보기    
    
  var videoArr = ['Mi2p4S6V_oM','RiPyw-LLBp4','ERfIGqKRRhQ']    
    
  var indexVideo;

    $('.event-movie li').mouseover(function() {
        $(this).addClass('is-active');
    }).mouseout(function(){
        $(this).removeClass('is-active');
    })

    $('.event-movie li').on('click', function(){
        var idx = $(this).index();
        var videoTag = videoArr[idx];
        indexVideo = idx;
        var $self = $(this)

        mui.modal.open('popup-video');    
        player.loadVideoById(videoTag, 0, "large");

        console.log(idx)      
        if(idx == 0) {
            $('#popup-video').removeClass().addClass('modal no1');
        } else if (idx == 1) {
            $('#popup-video').removeClass().addClass('modal no2');
        } else {            
            $('#popup-video').removeClass().addClass('modal no3');
        }
        
        $('.popSec03 .thumb').attr('src','./images/popup/shareImg'+ idx+'.jpg')
    })

    $('.btn-next').on('click', function(){
        indexVideo++;
        console.log(indexVideo);
        if(indexVideo > 2){
            indexVideo = 0;
        }

         if(indexVideo == 0) {
            $('#popup-video').removeClass().addClass('modal no1');
        } else if (indexVideo == 1) {
            $('#popup-video').removeClass().addClass('modal no2');
        } else {            
            $('#popup-video').removeClass().addClass('modal no3');
        }
        player.loadVideoById(videoArr[indexVideo], 0, "large"); 
    }); 

    $('.btn-prev').on('click', function(){
        indexVideo--;
        if(indexVideo < 0){
            indexVideo = 2;
        }
        //console.log(indexVideo);

        if(indexVideo == 0) {
            $('#popup-video').removeClass().addClass('modal no1');
        } else if (indexVideo == 1) {
            $('#popup-video').removeClass().addClass('modal no2');
        } else {            
            $('#popup-video').removeClass().addClass('modal no3');
        }

        player.loadVideoById(videoArr[indexVideo], 0, "large"); 
    });

    $('#popup-video .modal__close').on('click', function(){
        player.stopVideo();
    })

    // @ 공유 팝업

        // @@ 인스타
    var insta = false;

        /* 1707052 수정 S*/
    $('.btn-share').on('click', function(){
        mui.modal.close('popup-video');
        var popVideo = $('#popup-video').attr('class');
        $('#popup-share').removeClass().addClass(popVideo);
        $('.popup-backdrop').show();
    })
        /* 1707052 수정 E*/
/*1707052 인스타그램 복구 S */
//    $('.shareWrap li').on('click', function(){
//        $(this).addClass('is-active');
//        $('.shareWrap li').removeClass('is-active');
//        
//        // @ 인스타그램 클릭시 스텝3으로 넘어감
//        if($(this).index() == 1) {
//            //insta = true;
//            $('.popSec03').show().siblings('.popSection').hide();
//        } else {
//            mui.modal.open('popup-cong');
//            //mui.modal.open('popup-fail'); 꽝            
//        }
//    }) 
/*1707052 인스타그램 복구 E */
        
    $('.btn-sharePop02').on('click', function(){
        $('.popSec02').show().siblings('.popSection').hide();    
//        // @ 인스타그램 클릭시 스텝3으로 넘어감
//        if (insta == true) {
//		    $('.popSec03').show().siblings('.popSection').hide();    
//        } else {      
//        }
            // @ 당첨팝업 (개발시 삭제)
            //mui.modal.open('popup-cong');
            //mui.modal.open('popup-fail'); 꽝   
    })

    $('#popup-share .modal__close').on('click', function(){
        $('.shareWrap li').removeClass('is-active');
		$('.popSec01').show().siblings('.popSection').hide();    
    })

    // 인스타그램 계정 등록
    $('.btn-write').on('click', function(){
        // @ 당첨팝업 (개발시 삭제)
        mui.modal.open('popup-cong');
        //mui.modal.open('popup-fail'); 꽝
    })

    // 당첨팝업 클릭시 팝업닫기
    $('.resultPop .modal__close').on('click', function(){
        $('.shareWrap li').removeClass('is-active');
		$('.popSec01').show().siblings('.popSection').hide();    
        mui.modal.close('popup-share');
    });
    

  
  $(document).ready(function(){
        var swiper = new Swiper('.spec-slide',{ 
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay: 5000,
            autoplayDisableOnInteraction: false,            
            effect: 'fade',
            loop: true,
            onSlideChangeStart : function(swiper){
                var idx = swiper.activeIndex;
                var test = $('.spec-shot .swiper-slide').eq(idx).attr('data-name')
                var $figure = $('.spec .figure')
                    $frCol = $('.frameColor')
                    
                if(test=='figure1') {
                    $figure.removeClass().addClass('figure no1');
                    $frCol.removeClass().addClass('frameColor no1');
                    $('.spec-explain .color li').removeClass('on').eq(0).addClass('on');
                } else if(test=='figure2') {
                    $figure.removeClass().addClass('figure no2');
                    $frCol.removeClass().addClass('frameColor no2');
                    $('.spec-explain .color li').removeClass('on').eq(1).addClass('on');
                } else {
                    $figure.removeClass().addClass('figure no3');
                    $frCol.removeClass().addClass('frameColor no3');
                    $('.spec-explain .color li').removeClass('on').eq(2).addClass('on');                
                }
            }
        });    
        /* 1707062 수정 S */
        $('.color li').on('click', function(){
            var idx = $(this).index();

            swiper.swipeTo(idx);
        })
        /* 1707062 수정 E */

    });
    

   
    /* 170718 */
   $(document).ready(function(){
        // 1일 팝업창
        function setCookie( name, value, expirehours ) { 
            var todayDate = new Date(); 
            todayDate.setHours( todayDate.getHours() + expirehours ); 
            document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";" 
        }

        function cooKieGo() { 
          setCookie( "ncookie", "done" , 24 ); //쿠키굽기
        }
        function cooKieDel() { 
          setCookie( "ncookie", "" , -1 ); //쿠키삭제
        }

         cookiedata = document.cookie;
         //console.log(cookiedata)

        // 팝업창
        function noticePop(){ 
            //$('#viewport').append("<div id='noticePop'><div class='noticePop-content'><img src='./images/popup/noticePop_0816.png' alt='기프티콘 발송 일정 변경 안내'><a class='btn-todayNone' href='javascript:;'><i class='sp-todayNone'></i></a><a class='btn-noticePop' href='javascript:;'><img src='./images/popup/btn-noticePop.png' alt='닫기'></a></div></div>")
            $('#viewport').append("<div id='noticePop'><div class='noticePop-content'><img src='./images/popup/noticePop_0816.png' alt='기프티콘 발송 일정 변경 안내'><a class='btn-noticePop' href='javascript:;'><img src='./images/popup/btn-noticePop.png' alt='닫기'></a></div></div>")
        }

         if (cookiedata.indexOf("ncookie=done") < 0){ 
             noticePop();
            $('#noticePop').show();
         } else{
           // console.log('쿠키있다');
         }   

        $('#viewport').on('click','#noticePop .btn-noticePop', function(){
            $('#noticePop').hide();
        })

        $('#viewport').on('click','#noticePop .btn-todayNone', function(){
             cooKieGo(); //쿠키굽기
             $(this).addClass('is-checked');
             setTimeout(function(){
                $('#noticePop').hide();
             },400);
        })

   });

}());