/*
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
        $('#viewport').css('zoom',0.5)
        setTimeout(function(){
		   zoomUtils({psdSize: 720})
        },300)  
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


}());
*/

/**
 * Youtube API 로드
 */
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var movieID = ['8l3LiaDC1Lw', 'AvKZTddHvMg'];
var vid = document.getElementById("myVideo"); 
var soundClick = false;

var player;
var worldMovie;
var mediaMovie;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('pop-player', {
        height: '315', // <iframe> 태그 지정시 필요없음
        width: '560', // <iframe> 태그 지정시 필요없음
        videoId: movieID[0], // <iframe> 태그 지정시 필요없음
        playerVars: { // <iframe> 태그 지정시 필요없음
          controls: '1',
          showinfo: '0',
          rel: '0',
          autoplay: '0',
          iv_load_policy: '3'
        },
        events: {
          'onReady': onPlayerReady, // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
          'onStateChange': onPlayerStateChange // 플레이어의 상태가 변경될 때마다 실행
        }
    });

    worldMovie = new YT.Player('worldMovie', {
        height: '315', // <iframe> 태그 지정시 필요없음
        width: '560', // <iframe> 태그 지정시 필요없음
        videoId: movieID[1], // <iframe> 태그 지정시 필요없음
        playerVars: { // <iframe> 태그 지정시 필요없음
          controls: '1',
          showinfo: '0',
          rel: '0',
          autoplay: '0',
          iv_load_policy: '3'
        },
        events: {
          'onReady': onPlayerReady, // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
          'onStateChange': onPlayerStateChange // 플레이어의 상태가 변경될 때마다 실행
        }
    });
    
    mediaMovie = new YT.Player('mediaMovie', {
        height: '315', // <iframe> 태그 지정시 필요없음
        width: '560', // <iframe> 태그 지정시 필요없음
        videoId: '8l3LiaDC1Lw', // <iframe> 태그 지정시 필요없음
        playerVars: { // <iframe> 태그 지정시 필요없음
          controls: '1',
          showinfo: '0',
          rel: '0',
          autoplay: '0',
          iv_load_policy: '3'
        },
        events: {
          'onReady': onPlayerReady, // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
          'onStateChange': onPlayerStateChange // 플레이어의 상태가 변경될 때마다 실행
        }
    });
}

function onPlayerReady(event) {
	console.log('onPlayerReady 실행');
	// 플레이어 자동실행 (주의: 모바일에서는 자동실행되지 않음)
	//event.target.playVideo();
}

var playerState;

function onPlayerStateChange(event) {
	playerState = event.data == YT.PlayerState.ENDED ? '종료됨' :
			event.data == YT.PlayerState.PLAYING ? '재생 중' :
			event.data == YT.PlayerState.PAUSED ? '일시중지 됨' :
			event.data == YT.PlayerState.BUFFERING ? '버퍼링 중' :
			event.data == YT.PlayerState.CUED ? '재생준비 완료됨' :
			event.data == -1 ? '시작되지 않음' : '예외';

	//console.log('onPlayerStateChange 실행: ' + playerState);
	
	// 재생여부를 통계로 쌓는다.
	collectPlayCount(event.data);

	//종료시 실행
	if(event.data == YT.PlayerState.ENDED){
	}
}

var played = false;
function collectPlayCount(data) {
	if (data == YT.PlayerState.PLAYING && played == false) {
		// todo statistics
		played = true;
		console.log('statistics');        
	}
}

///////// @ 팝업
function galPopOpen(){
    $('.galleryPop').stop().fadeIn(100);
}

function galPopClose(){
    $('.galleryPop').stop().fadeOut(100);
}

function alertOpen(){
    $('.alertWrap').stop().fadeIn(100);
}

function alertClose(){
    $('.alertWrap').stop().fadeOut(100);
}

var alertModal = function(t_str) {
    alertOpen();
    $('#atext').html(t_str);
};


//////

;(function(){  
    
    var winHeight = $(window).height();
    
    $('#main .content').height(winHeight);

    $('.hamburger').click(function() {
      $(this).toggleClass('is-opened');
      $('.header').toggleClass('on')
    })

    $(document).ready(function(){
        setTimeout(function(){        
            $('body').addClass('on');
            $('.main').addClass('on');
        },800);
    });

    
    
    // @ 스크롤
    $('.gnb > a').on('click', function(){   
        var winSc = $(window).scrollTop();
        var idx = $(this).parent().index();
        var navHeight = $('.gnb').innerHeight();

            $('html, body').stop().animate({
                scrollTop: $( $.attr(this, 'href') ).offset().top - navHeight
            }, 500);
            return false;        
    });  

    $(window).scroll(function(){
        var winHeight = $(document).scrollTop()
        var navHeight = $('.gnb').innerHeight();

        $.each($('.page'), function(idx, item) {
            var $target = $('.page').eq(idx),
            i = $target.index(),
            targetTop = $target.offset().top;

            if(targetTop  - navHeight <= winHeight) {        
                $('.gnb > a').removeClass('on');
                $('.gnb > a').eq(idx).addClass('on');          
                $target.addClass('on');
            }
            
            if(targetTop - 500 <= winHeight) {            
                $target.addClass('on');
            }
                
        })
    });
        
	// @@ 영상팝업
    $(document).ready(function() {
          $('.main .btnPlay img').on('click', function(){
            $('.mainMovie').show();
            player.playVideo();
        })

        $('.mainMovie .modal-btn-close').on('click', function(){
            $('.mainMovie').hide();
            player.stopVideo();
        })        
    });

    // 세계관
    var storySlide = new Swiper('.storyWrap', {
        //effect: 'fade',
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        pagination: '.storyPage',
        paginationClickable: true
    });
    
    $('.tabList > li').on('click', function(){
        var idx = $(this).index();

        $(this).addClass('on').siblings('li').removeClass('on');
        $(this).parents('.page.on').find('.tabImgWrap > div').eq(idx).addClass('on').siblings('div').removeClass('on');

    });
        
    $('.world .tabList li').on('click', function(){
        var idx = $(this).index();

        if(idx == 0) {
            if(played == true) {
                worldMovie.stopVideo();
            }        
            storySlider.reloadSlider;
        } else {
            worldMovie.playVideo();        
            storySlider.destroySlider;
        }
        
    })

        
    // @ 미디어 갤러리
    $(document).ready(function(){     
        var point, pointStartX, pointStartY, deltaX, deltaY;

        var myScroll = new IScroll('.media .galleryWrap', {
            eventPassthrough: true,
            scrollX: true,
            scrollY: false,
                preventDefault: false 
        });
    });
    
     $('.galleryList li').on('click', function(){
         var idx = $(this).data('gallery')-1;

        galPopOpen();

        $('#galDetailWrap').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            auto:false
        });

        $('#galDetailWrap').flexslider(idx);
     });

    // @ 미디어 영상    
	$('.movieTab li').click(function(){
        var mediaID = ['8l3LiaDC1Lw', 'GMDXKhYT3P8', 'oaO8HJm9nlM'];

		var idx = $(this).data('movie');
        var moviedata = mediaID[idx];

        $('.movieTabWrap > ul').eq(idx).addClass('on').siblings('ul').removeClass('on')

        //$(this).addClass('on').siblings('li').removeClass('on');

		mediaMovie.loadVideoById(moviedata,0,"large");
		//$('.contentsMovie').show();
	})

}());