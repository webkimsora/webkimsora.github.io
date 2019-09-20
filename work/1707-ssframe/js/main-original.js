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

var youSrc01 = 'TBd0A0Z-fe4,Ki6f_kdjLgA,UfzzsbimWRY';
var youSrc02 = 'Ki6f_kdjLgA,TBd0A0Z-fe4,UfzzsbimWRY';
var youSrc03 = 'UfzzsbimWRY,TBd0A0Z-fe4,Ki6f_kdjLgA';
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

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {

          var playerTotalTime = player.getDuration();

          mytimer = setInterval(function() {
            var playerCurrentTime = player.getCurrentTime();

            var playerTimeDifference = (playerCurrentTime / playerTotalTime) * 100;


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


(function(){
    

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
		resize();
	})

	resize();

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

        $.each($('.section'), function(idx, item) {
          var $target = $('.section').eq(idx),
              i = $target.index(),
              targetTop = $target.offset().top;

          if(targetTop <= winHeight) {        
                $('.gnb li').removeClass('is-active');
                $('.gnb li').eq(idx).addClass('is-active');   
            }    
        })
            
        if(winHeight > 500) {
          $('.square').addClass('on');
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
    $('.event-movie li').mouseover(function() {
        $(this).addClass('is-active');
    }).mouseout(function(){
        $(this).removeClass('is-active');
    })

    $('.event-movie [data-playData]').on('click', function(){
        var videoID = $(this).attr('data-playData');
        var $_self = $(this);
        var $target ;

        var idxFrame = $(this).parent('li').index()+1

            console.log(idxFrame)
        
        $('.btn-share').removeAttr('href');
            
        player.loadVideoById(videoID, 0, "large");

        if ( $_self.closest('.event-movie').hasClass('event-movie') ){
          $target = $('.video-movie iframe');
        }

        mui.modal.open('popup-video')
        player.playVideo();
    });

    $('#popup-video .modal__close').on('click', function(){
        player.stopVideo();
    })

    // @ 공유 팝업

        // @@ 인스타
    var insta = false;

    $('.btn-share').on('click', function(){
        mui.modal.close('popup-video');
    })

    $('.shareWrap li').on('click', function(){
        $(this).addClass('is-active');
		$('.popSec02').show().siblings('.popSection').hide();
        $('.shareWrap li').removeClass('is-active');

        if($(this).index() == 1) {
            insta = true;
        }
    }) 

    $('.btn-sharePop02').on('click', function(){
        // @ 인스타그램 클릭시 스텝3으로 넘어감
        if (insta == true) {
		    $('.popSec03').show().siblings('.popSection').hide();    
        } else {
            // @ 당첨팝업 (개발시 삭제)
            mui.modal.open('popup-cong');
            //mui.modal.open('popup-fail'); 꽝         
        }
    })

        // @@ 
    //$('.event-movie li').


    $('.modal__close').on('click', function(){
        $('.shareWrap li').removeClass('is-active');
		$('.popSec01').show().siblings('.popSection').hide();    
    })

    // 인스타그램 계정 등록
    $('.btn-write').on('click', function(){
        mui.modal.close('popup-share');
        $('.shareWrap li').removeClass('is-active');
		$('.popSec01').show().siblings('.popSection').hide();    
        // @ 당첨팝업 (개발시 삭제)
        mui.modal.open('popup-cong');
        //mui.modal.open('popup-fail'); 꽝
    })
        
        
}());