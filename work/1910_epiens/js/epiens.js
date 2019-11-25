;(function(){
	//모바일 체크
	var UserAgent = navigator.userAgent;
	var UADevice = UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i);
	var UAVendor = UserAgent.match(/LG|SAMSUNG|Samsung/);

	//ie버전 체크
	function getInternetExplorerVersion() {
				 var rv = -1; // Return value assumes failure.
				 if (navigator.appName == 'Microsoft Internet Explorer') {
							var ua = navigator.userAgent;
							var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
							if (re.exec(ua) != null)
									rv = parseFloat(RegExp.$1);
						 }
				 return rv;
		}

	//ie인지 체크
	var trident = navigator.userAgent.match(/Trident\/(\d)/i);

	//모바일이면 실행
	if ( UADevice !== null || UAVendor !== null){
	}else if(getInternetExplorerVersion() == -1 || getInternetExplorerVersion() >= 10){
		// 웹 & ie10이상
	} else {
	}

	$(document).ready(function(){
		// header event
    var headerH = $('.header').innerHeight();
    $(".gnb li").click(function() {
			var scrollPosition = $($(this).attr("data-target")).offset().top;
			//console.log(scrollPosition);
			$('.gnb li').removeClass('on');
			$(this).addClass('on');

			$('html, body').stop().animate({
				scrollTop: scrollPosition - 140
			}, 500);

		});

		// mainpage event
		$('.btnTop').on('click', function(e) {
			e.preventDefault();
			//var goTop = $('.page').eq(0).attr('data-height');
			$('html, body').stop().animate({
				scrollTop: 0
			}, 500);
			return false;
		});

    // hls 사용
    if(Hls.isSupported()) {
        var video = document.getElementById('video');
        var hls = new Hls();
        hls.loadSource('https://d15zlun3b2gkbq.cloudfront.net/videos/20191115/heo_a.m3u8');
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function()
        {
            video.play();
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = 'https://d15zlun3b2gkbq.cloudfront.net/videos/20191115/heo_a.m3u8';
        video.addEventListener('canplay',function()
        {
            video.play();
        });
    }
	});

	// 스크롤 상단이동
	$.fn.scrollEnd = function(callback, timeout) {
			$(this).scroll(function() {
				var $this = $(this);

				if ($this.data('scrollTimeout'))
					clearTimeout($this.data('scrollTimeout'));

				$this.data('scrollTimeout', setTimeout(callback, timeout));
			});
	};

	$(window).on({
		load : function(){
			setTimeout(function(){
        $('body').addClass('loadEnd');
      },300);
		},
		scroll : function(){ // scroll 이벤트
      var sc = $(document).scrollTop();
      //console.log($(document).scrollTop())

      if($(document).scrollTop() > 0) $('.header').addClass('didScroll');
      else $('.header').removeClass('didScroll');


			if ($(this).scrollTop() > 200) {
				$('.btnTop').fadeIn();
			} else {
				$('.btnTop').fadeOut();
			}

			//스크롤에 따른 각 섹션 모션
			pageMotion(sc);
		}
	});

	function pageMotion(sc) {
    $('.page').each(function(){
      if($(this).offset().top - 500 < sc) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    })
  }

	$(window).scrollEnd(function() {
			$('.btnTop').fadeOut();
		}, 1000);

}());

// @ 팝업

//팝업오픈 스크롤방지
function scrollOff(){
	//$.fn.fullpage.setAllowScrolling(false);
	//$('html').css('overflow-y','hidden');
	$('html').addClass('popOpen');
}

//팝업오픈 스크롤해제
function scrollOn(){
	//$.fn.fullpage.setAllowScrolling(true);
	//$('html').css('overflow-y','auto')
	if(!$('.rumorPopEv001').is(':visible')&&!$('.rumorPopEv002').is(':visible')){
		$('html').removeClass('popOpen');
	}
}

//영상팝업 열기
function mainPopOpen(){
	var mainId = 'd9fJnv5v-1U';
	scrollOff();

  $('.mainPop #videoplayer').attr('src','https://www.youtube.com/embed/'+storyId+'?rel=0&amp;autoplay=1&amp;showinfo=0')

	var pop = $('.mainPop .popIn');
	setTimeout(function(){
		pop.css({
			'visibility' : 'visible',
			'marginTop' : - (pop.outerHeight()/2)
		});
	},10)

	$('.mainPop').show();
}


//영상팝업 닫기
function mainPopClose(){
	scrollOn();

	$('.mainPop #videoplayer').attr('src','');
	$('.mainPop').hide();
}
