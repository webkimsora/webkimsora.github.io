/**
 * Youtube API 로드
 */



	var playVideoID =  $('.event-movie [data-playData]').data('playData');

	var ranCount = Math.floor(Math.random() * 3);
	//랜덤 = 소수점으로 나옴 -> 정수로 만들어줌 -> 곱하기경우 3 이상은 안나오고 0,1,2만 카운트됨 
	/*var last = ['TBd0A0Z-fe4','Ki6f_kdjLgA','UfzzsbimWRY']
	console.log(last[ranCount]);*/
/*170706 수정 S*/
	var resultSrc = ['Mi2p4S6V_oM','RiPyw-LLBp4','ERfIGqKRRhQ']
/*170706 수정 E*/

  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  var fullScreen = null;
		
  function onYouTubeIframeAPIReady() {
      fullScreen = new YT.Player('fullscreen-player', {
		  videoId: resultSrc[ranCount],
          playerVars: {                   
              'autoplay': 0,
            'modestbranding' : 1,
              'controls': 0,
              'loop' : 1,
              'showinfo': 0,
              'rel' : 0
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
        //event.target.playVideo();
        //event.target.mute();
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
            //fullScreen.playVideo();
            //fullScreen.mute();
        }
        //종료시 실행
        if(event.data == YT.PlayerState.ENDED){
            mui.modal.close('popup-mainVideo');            
        }
    }
      // @ 이벤트 영상      
    function onPlayerReady(event) {

            //mui.modal.open('popup-video')
            //event.target.playVideo();
            player.stopVideo();
    }  

    function onPlayerStateChange(event) {
        //종료시 실행
        if(event.data == YT.PlayerState.ENDED){
            end();
        }
    }

    
/* 170629 수정 S */
    function end(){
        mui.modal.close('popup-video');
        mui.modal.open('popup-share');
    }
/* 170629 수정 E */

/////////////////////////////////////////////////////////////

(function(){ 

/* 1707052 수정 S
    // @ 삼성닷컴 GNB 높이 체크 후 적용 필요
    $('.main').height($(window).height()- $('.thumbGnb').height()) 
*/
	//메인 비쥬얼 랜덤 노출
	$('.main').addClass('movie'+ranCount);



	//이벤트영상 재생시 팝업닫음
	$('#popup-video .modal__close').on('click',function(){
		player.stopVideo();
	})

	//이벤트영상 재생시 팝업닫음
	$('#popup-mainVideo .modal__close').on('click',function(){
		fullScreen.stopVideo();
	})




    // @ 스크롤
    $('.gnb li > a').on('click', function(){   
        var winSc = $(window).scrollTop();
        var idx = $(this).parent().index();

        $('html, body').stop().animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
            }, 500);
        return false;
    });  

    $(window).scroll(function(){
        var winHeight = $(document).scrollTop()
        
        if(winHeight > 240) {
          $('.square').addClass('on');
        }  
    })

    $(window).bind("orientationchange", function(e) { // 가로세로 전환 처리
        var orientation = window.orientation;
          $('.square').removeClass('on');
    });
        
    // 아래 버튼 클릭 
    $('.btnSpec > a').on('click', function(){
        $('html, body').stop().animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 500);
        return false;    
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



    // 메인
    $('.btnPlay > a').on('click', function(){        
        $.getScript('//www.youtube.com/iframe_api');
        mui.modal.open('popup-mainVideo');
        setTimeout(function() {
            fullScreen.playVideo();
        },100);
    })

    // 이벤트 영상 보기
    /*170706 수정 S*/
  var videoArr = ['Mi2p4S6V_oM','RiPyw-LLBp4','ERfIGqKRRhQ']
    /*170706 수정 E*/
  var indexVideo;

    $('.event-movie li').on('click', function(){
        var idx = $(this).index();
        var videoTag = videoArr[idx];
        indexVideo = idx;
        var $self = $(this)

        mui.modal.open('popup-video');    
        player.loadVideoById(videoTag, 0, "large");
        
        $('.popSec02 .thumb').attr('src','./images/popup/shareImg'+ idx+'.jpg')
    })


    // @ 공유 팝업
        // @@ 인스타
    var insta = false;

    $('.btn-share').on('click', function(){
        mui.modal.close('popup-video');
        var popVideo = $('#popup-video').attr('class');
        $('#popup-share').removeClass().addClass(popVideo);
    })

    $('.btn-sharePop02').on('click', function(){
          mui.modal.close('popup-share');
          $('.shareWrap').addClass('active');
    })

/*1707052 수정 S */
	//sns클릭시 영상 봤는지 체크
	$('.shareWrap > li').click(function(){
//		if($('.shareWrap').hasClass('active')){
//			 //mui.modal.open('popup-share');  
//             
//              if($(this).index() == 1) {
//                mui.modal.open('popup-share');  
//                $('.popSec02').show().siblings('.popSection').hide();
//              } else {                
//                // @ 당첨팝업 (개발시 삭제)
                mui.modal.open('popup-cong');
//                //mui.modal.open('popup-fail'); 꽝    
//              }
//        }

	})
/*1707052 수정 E */

/* 170629 수정 E */

	/*
    $('#popup-share .modal__close').on('click', function(){
        $('.shareWrap li').removeClass('is-active');
		$('.popSec01').show().siblings('.popSection').hide();    
    })
	*/



    // 인스타그램 계정 등록
    $('.btn-write').on('click', function(){
        // @ 당첨팝업 (개발시 삭제)
        mui.modal.open('popup-cong');
        //mui.modal.open('popup-fail'); 꽝
    })

    // 당첨팝업 클릭시 팝업닫기
    $('.resultPop .modal__close').on('click', function(){
        //$('.shareWrap li').removeClass('is-active');
		//$('.popSec01').show().siblings('.popSection').hide();    
        mui.modal.close('popup-share');
    });
        
        
    /* 170628 추가 S */          
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

    $(document).ready(function(){
        var exSwiper = new Swiper('.explain-slide',{ 
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay: 8000,
            autoplayDisableOnInteraction: false,            
            effect: 'fade',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            loop: true,
            onSlideChangeStart : function(exSwiper){
                var idx = exSwiper.activeIndex;
                var test = $('.explain-shot .swiper-slide').eq(idx).attr('data-name')
                var $figure = $('.explain .figure')

                if(test=='explain1') {
                    $('.explain-title dl').fadeOut(200).eq(0).fadeIn(200);
                    $figure.removeClass().addClass('figure no1');
                } else if(test=='explain2') {
                    $('.explain-title dl').fadeOut(200).eq(1).fadeIn(200);
                    $figure.removeClass().addClass('figure no2');
                }
            },
                onInit:function(){
                //$('.explain-slide').removeClass('on');                    
            }
        });         
      
        var swiper = new Swiper('.spec-slide',{ 
            pagination: '.spec-pagination',
            paginationClickable: true,
            autoplay: 5000,
            autoplayDisableOnInteraction: false,            
            effect: 'fade',
            nextButton: '.spec-button-next',
            prevButton: '.spec-button-prev',
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
            }, 
                onInit:function(){
                //$('.spec-slide').removeClass('on');                    
            }
        });    

        $('.color li').on('click', function(){
            var idx = $(this).index();

            swiper.slideTo(idx+1);
        })

        /* 170718 */
            
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
            //$('#viewport').append("<div id='noticePop'><div class='noticePop-content'><img src='./images/popup/noticePop.png' alt='기프티콘 발송 일정 변경 안내'><a class='btn-todayNone' href='javascript:;'><i class='sp-todayNone'></i></a><a class='btn-noticePop' href='javascript:;'><img src='./images/popup/btn-noticePop.png' alt='닫기'></a></div></div>")
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