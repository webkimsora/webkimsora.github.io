/////////////// @ 팝업

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

function completeOpen(){
    $('.complete').stop().fadeIn(100);
}

function completeClose(){
    $('.reserGnb .no2 a').trigger('click');
    $('.complete').stop().fadeOut(100);
}

function reserGoOpen(){
    $('.reserGo').stop().fadeIn(100);
}

function reserGoClose(){
    $('.reserGnb .no1 a').trigger('click');
    $('.reserGo').stop().fadeOut(100);
	popLoginClose();
}


function congAlertOpen(){
    $('.congAlert').stop().fadeIn(100);
}

function congAlertClose(){
    $('.congAlert').stop().fadeOut(100);
}

function popLoginOpen(){

//
//	 uemail =  obj.getCookie('U_mail');
//	//alert(uemail);
//
//	if(uemail ==""){   /// 로그인이 필요합니다.
//
//              alertModal("정상적으로 사전등록 등록되었습니다.");
//	}
//	else{
//		$('.popLogin').stop().fadeIn(100);
//	}


		$('.popLogin').stop().fadeIn(100);

}

function popLoginClose(){
    $('.popLogin').stop().fadeOut(100);
}


/////////////// @ 본문

var zoomUtils = function(opts){
  var defaults = {
    psdSize : 1920
  };
  var options = $.extend(defaults, opts);

  return $('#introduce .scale').css('transform', 'scale('+($(window).width() / options.psdSize).toFixed(5)+')');
};

function heightFixed(){
	$('#introduce .event').height(1080 * ($(window).width() / 1920).toFixed(5) );
}


;(function(){
    
    // 영상영역 이벤트
    $(window).bind('load resize', function(){
		heightFixed();
        
          if($(window).width() <= 1280 ) {
            $('#introduce .scale').css('transform', 'scale(0.71)');
            $('#introduce .event').height('766.8');
          } else {
            zoomUtils({psdSize: 1920})          
          }
    })
        
    $(document).ready(function(){
        if($('#introduce').hasClass('active')){
            zoomUtils({psdSize: 1920})
            setTimeout(function(){
                $('#introduce').addClass('look');
            },100);
        }
    })

    //var playEventMovie = document.getElementsByClassName("playMovie");
    // 게임소개 mp4 영상
	var vid = document.getElementById("myVideo");

    $('#introduce .eventList .btnMore').on('click', function(){
        $(this).parents('li').toggleClass('on').siblings('li').removeClass('on');
        $('#introduce .eventList').find('.eventBox').removeClass('on');


        if($(this).parents('li').hasClass('on')) {
            $(this).siblings('.eventBox').addClass('on');
            $('#' + $(this).data('video-id')).get(0).play();    
        }  else {
            $(this).siblings('.eventBox').removeClass('on');        
             $('#introduce video').each(function () {
                this.pause();
                this.currentTime = 0;
             });
        }   
    });

    $('.movieBg').on('click', function(){
        $(this).siblings('.btnMoreWrap').find('.btnMore').trigger('click');
    })
    

	// @ 영상 리사이즈   
    var resize = function() {
        var width = $(window).width(),
        pWidth, // player width, to be defined
        height = $(window).height(),
        pHeight, // player height, tbd
        $tubularPlayer = $('.bgWrap video');
        $storyPlayer = $('#movieMain');
        //$storyPlayer = $('#movieMain');

        if (width / (16/9) < height) { // if new video height < window height (gap underneath)
        pWidth = Math.ceil(height * (16/9)); // get new player width
        $tubularPlayer.width(pWidth).height(height).css({left: (width - pWidth) / 2, top: 0}); // player width is greater, offset left; reset top
        $storyPlayer.width(pWidth).height(height).css({left: (width - pWidth) / 2, top: 0}); // player width is greater, offset left; reset top
        } else { // new video width < window width (gap to right)
        pHeight = Math.ceil(width / (16/9)); // get new player height
        $tubularPlayer.width(width).height(pHeight).css({left: 0, top: (height - pHeight) / 2}); // player height is greater, offset top; reset left
        $storyPlayer.width(width).height(pHeight).css({left: 0, top: (height - pHeight) / 2}); // player height is greater, offset top; reset left
        }
    }

    $(window).on('resize', function() {
        var winHeight = $(window).height();
        
        resize();        
        $('.main').height(winHeight);
    })

    $(window).load(function(){
        resize();
    })

    resize();

    // @ 스크롤
    $('.btnBottom > a, .reserGnb > li a, .guideGnb > li a, .main .btnGoGuide > a').on('click', function(){   
        var winSc = $(window).scrollTop();
        var idx = $(this).parent().index();
        var navHeight = $('.gnb').innerHeight();

            $('html, body').stop().animate({
                scrollTop: $( $.attr(this, 'href') ).offset().top /*- navHeight*/
            }, 500);
            return false;        
    });  
//
    function gnbSubActive() {
		var $sub = $('.gnb');
		if(!$sub.length) return;

		var $bar = $('<span class="bar"></span>');
		//var subT = $sub.position().top;
		//var subL = $sub.position().left;

		var $li = $sub.find('li a');
		var $onli = $sub.find('li.active a');
		//var oriLeft = $onli.position().left
		var tween;

		var time;

		$li.on({
			'mouseover': function(e) {
				clearTimeout(time);
				var $this = $(this);
				$bar.css('left',$this.position().left);
				$bar.css('width',$this.outerWidth());
			},
			'mouseout': function() {
				// clearTimeout(time);
				resetPosition();
			}
		})
		$bar.css({
			'left': $onli.position().left,
			'width': $onli.outerWidth()
		})
		$sub.after($bar);

		resetPosition();

		function resetPosition() {
			clearTimeout(time);
			time = setTimeout(function() {
				$bar.css('left',$onli.position().left);
				$bar.css('width',$onli.outerWidth());
			}, 300);
		}
	}
    gnbSubActive();
//
    $(window).scroll(function(){
        var winHeight = $(document).scrollTop()
        var navHeight = $('.gnb').innerHeight();

        $.each($('.secWrap'), function(idx, item) {
            var $target = $('.secWrap').eq(idx),
            i = $target.index(),
            targetTop = $target.offset().top;
            /*
            if(targetTop  - navHeight <= winHeight) {        
                $('.gnb > li').removeClass('active');
                $('.gnb > li').eq(idx).addClass('active');
            }
            */
        })

        $.each($('.page'), function(idx, item) {
            var $target = $('.page').eq(idx),
            i = $target.index(),
            targetTop = $target.offset().top;

            if(targetTop  - navHeight - 500 <= winHeight) {        
                $('.lnb .reserGnb li').removeClass('on');
                $('.lnb .reserGnb li').eq(idx).addClass('on');        
            }
            
            if(targetTop - 500 <= winHeight) {            
                $target.addClass('on');
            }                
        })
            
        $.each($('.guide .page'), function(idx, item) {
            var $target = $('.page').eq(idx),
            i = $target.index(),
            targetTop = $target.offset().top;

            if(targetTop  - navHeight - 500 <= winHeight) {        
                $('.lnb .guideGnb li').removeClass('on');
                $('.lnb .guideGnb li').eq(idx+1).addClass('on');        
            }
            
            if(targetTop - 500 <= winHeight) {            
                $target.addClass('on');
            }                
        })

    });


    // @ main

    $(document).ready(function(){
        var winHeight = $(window).height();
        
        $('.main').height(winHeight);
    });

    //
    $('.header .btnPlay a').mouseover(function(){
        $(this).parents('div').addClass('on');
    });
    $('.header .btnPlay a').mouseleave(function(){
        $(this).parents('div').removeClass('on');
    });

    // 영상 배경 재생 및 팝업 영상 재생     
	
    var movieID = ['KfmIimhtIiA', 'KfmIimhtIiA', '-U7qIR9kOLA']

    var videoBg = document.getElementById("videoBg");

    $('.movieBox').on('click', function(){
        $('#popup-video iframe').attr('src', 'https://www.youtube.com/embed/'+movieID[0]+'?version=3&amp;controls=1&amp;showinfo=0&amp;modestbranding=1&amp;wmode=transparent&amp;rel=0&amp;autoplay=0&amp;html5=1&amp;enablejsapi=1');
    })
        
    $('.mainMovieL a').on('click', function(){
        $('#popup-video iframe').attr('src', 'https://www.youtube.com/embed/'+movieID[1]+'?version=3&amp;controls=1&amp;showinfo=0&amp;modestbranding=1&amp;wmode=transparent&amp;rel=0&amp;autoplay=0&amp;html5=1&amp;enablejsapi=1');
    })

    $('.mainMovieR a').on('click', function(){
        $('#popup-video iframe').attr('src', 'https://www.youtube.com/embed/'+movieID[2]+'?version=3&amp;controls=1&amp;showinfo=0&amp;modestbranding=1&amp;wmode=transparent&amp;rel=0&amp;autoplay=0&amp;html5=1&amp;enablejsapi=1');
    })

    $('#popup-video .modal-btn-close').on('click', function(){
        $('#popup-video iframe').attr('src', '');
    })

    // 게임 정보
    $('.inforList li').on('click', function(){
        var idx = $(this).index();
        
		TweenMax.to(' .inforDetailWrap',.3, {scale:1,autoAlpha:1,visibility:"visible"});

        $('.inforDetailWrap').addClass('on');

        setTimeout(function(){
            $('.inforDetail > ul > li').eq(idx).addClass('on');
        },200);
    })
        
    $('.information .btnBack').on('click', function(){
		TweenMax.to('.inforDetailWrap',.3, {scale:1.2,autoAlpha:0,visibility:'hidden'});
        $('.inforDetail > ul > li').removeClass('on');
    })

    

    // 가이드    
    var installSlide = $('#installSlide ul').bxSlider({
        auto: false,
        autoControls: true
    });        
        
    var enterSlide = $('#enterSlide ul').bxSlider({
        auto: false,
        autoControls: true
    });        

    var playSlide = $('#playSlide ul').bxSlider({
        auto: false,
        autoControls: true
    });        

    if($('.secWrap').hasClass('guide')) {    
        var scene = document.getElementById('enter');
        var parallax = new Parallax(scene);
    }

    // 팝업
    $('.lottoTabWrap > a').on('click', function(){
        var idx = $(this).index();

        $(this).addClass('on').siblings('a').removeClass('on');
        $('.lottoTabSection').eq(idx).addClass('on').siblings('div').removeClass('on')
    })

}());


///////////////////////

/**
 * Youtube API 로드
 */
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var movieID = ['hpqrF8heFBE'];

var movieMain;

function onYouTubeIframeAPIReady() {
    movieMain = new YT.Player('movieMain', {
        height: '315', // <iframe> 태그 지정시 필요없음
        width: '560', // <iframe> 태그 지정시 필요없음
        videoId: 'hpqrF8heFBE', // <iframe> 태그 지정시 필요없음
        playerVars: { // <iframe> 태그 지정시 필요없음
          controls: '0',
          showinfo: '0',
          rel: '0',
          autoplay: '0',
          iv_load_policy: '3',
          loop: '1',
          playlist: 'hpqrF8heFBE',
        },
        events: {
          'onReady': onPlayerReadyMain, // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
          'onStateChange': onPlayerStateChange // 플레이어의 상태가 변경될 때마다 실행
        }
    });
}


var playerState;

function onPlayerReady(event) {
  //console.log('onPlayerReady 실행');
}


function onPlayerReadyMain(event) { 
  //console.log('onPlayerReady 실행');
  movieMain.mute();
  movieMain.playVideo();
  
}

function onPlayerStateChange(event) {
  playerState = event.data == YT.PlayerState.ENDED ? '종료됨' :
    event.data == YT.PlayerState.PLAYING ? '재생 중' :
    event.data == YT.PlayerState.PAUSED ? '일시중지 됨' :
    event.data == YT.PlayerState.BUFFERING ? '버퍼링 중' :
    event.data == YT.PlayerState.CUED ? '재생준비 완료됨' :
    event.data == -1 ? '시작되지 않음' : '예외';

		if (event.data === YT.PlayerState.ENDED) {
           // vid.playVideo();
        }


  // 재생여부를 통계로 쌓는다.
  collectPlayCount(event.data);


  //var vid = document.getElementById("myVideo");

  if (event.data == YT.PlayerState.PLAYING) {
    //vid.pause(); 
    $('.mainBg').hide();
  }
}

var played = false;

function collectPlayCount(data) {
  if (data == YT.PlayerState.PLAYING && played == false) {
    played = true;
    //console.log('statistics');
  }
}
