;(function(){
	$(document).ready(function(){
		var agent = navigator.userAgent.toLowerCase();
		var UserAgent = navigator.userAgent;
		var UADevice = UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i);
		var UAVendor = UserAgent.match(/LG|SAMSUNG|Samsung/);
		if (UADevice !== null || UAVendor!== null){
			$('.event_compMovie').addClass('mobilebody'); // 모바일경우 클래스 추가
		}

		/*resize 반복실행 방지 : smartResize js 해석 */
		var smartresize = {
			init : function(){
				var self = this;
				$(window).resize(function(){
					self.handler(); // 윈도우의 사이즈가 변하면 handler() 함수를 실행
				});
			},
			timeOut : '',
			handler : function(){
				mainSlider.trigger('refresh.owl.carousel');
				listSlider.trigger('refresh.owl.carousel');
			},
			action : function(){
				//console.log("Smart Resize Event");
			}
		};

		smartresize.init();

		// main visual slide
		var mainSlider = $('.event_compMovie .mainSlide');
		mainSlider.owlCarousel({
			items:1,
			loop:true,
			autoplay:true,
			autoplayTimeout:5000,
			smartSpeed: 500,
			nav: true,
			dots: true,
			responsiveClass:true,
			responsive:{
				768:{
					dots: false,
				}
			}
		});

		// main contents slide
		var listSlider = $('.event_compMovie .listSlide');
		listSlider.each(function() {
			var $this = $(this);
			$this.owlCarousel({
				//center: true,
				items: 4,
				autoWidth:true,
				margin: 20,
				loop:false,
				mouseDrag: true,
				touchDrag: true,
				dots: false,
				responsiveClass:true
			});
		});		

		// 메인 컨텐츠 클릭 영상정보 띄우기
		$('.event_compMovie .listSlide a, .event_compMovie .mainSlide a').on('click', function(){
			// ie11이하 알럿
			if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
				if(confirm("해당 브라우저는 호환되지 않는 브라우저 입니다.\nMicrosoft 권장 브라우저인 Microsoft Edge 브라우저를 이용해주세요.")) document.location = 'https://www.microsoft.com/ko-kr/edge/home';
			} else {
				var idx = $(this).parents('.owl-item').index() + 1;
				var subnum = $(this).data('subnum');
				var thumb = $('.detailPop .movie .thumb').find('img');
				var movie_tit = $('.detailPop .movieWrap .tit').find('img');
				var movie_txt = $('.detailPop .movieWrap .txt').find('img');
				var playlist = $('.detailPop .playlist').find('ul');
				var youtubeID = playlist.eq(subnum - 1).find('li').eq(idx-1).children('a').data('videoid');

				if($(this).hasClass('coming')){
					alert('Coming soon! 추후 영상이 공개됩니다.');
				} else {
					if($(this).parents('.listSlide').length > 0) {
						thumb.attr('src','./img/detail_'+subnum+'/movie_thumb_'+idx+'.jpg');
						movie_tit.attr('src','./img/detail_'+subnum+'/movie_tit_'+idx+'.png');
						fnChangeVideoId(youtubeID);
					} else {
						thumb.attr('src','./img/detail_'+subnum+'/movie_thumb_1.jpg');
						movie_tit.attr('src','./img/detail_'+subnum+'/movie_tit_1.png');
						fnChangeVideoId(playlist.eq(subnum - 1).find('li').eq(0).children('a').data('videoid'));
					}
					movie_txt.attr('src','./img/detail_'+subnum+'/movie_txt.png');
					
					$('.movieWrap .movie .thumb').css('opacity','1');
					$('.movieWrap .movie .youtube').hide();
					
					playlist.eq(subnum - 1).show().siblings('ul').hide();
	
					setTimeout(function(){
						subDetailPopOpen('.detailPop');
					},100)
				}
			}
		})

		// 영상보기팝업 영상재생
		$('.detailPop .movieWrap .btn_play').on('click', function(){
			detailPopScroll();

			$('.movieWrap .movie .thumb').css('opacity','0');

			setTimeout(function(){
				playVideo();
			},100);

			setTimeout(function(){
				$('.movieWrap .movie .youtube').show();
			},300);
		});

		// 영상보기팝업 회차정보
		$('.detailPop .playlist li').on('click', function(){
			var idx = $(this).index() + 1;
			var subnum = $(this).find('a').data('subnum');
			var thumb = $('.detailPop .movie .thumb').find('img');
			var movie_tit = $('.detailPop .movieWrap .tit').find('img');
			var movie_txt = $('.detailPop .movieWrap .txt').find('img');
			var youtubeID = $(this).children('a').data('videoid');


			if(!$(this).hasClass('coming')){

				thumb.attr('src','./img/detail_'+subnum+'/movie_thumb_'+idx+'.jpg');
				movie_tit.attr('src','./img/detail_'+subnum+'/movie_tit_'+idx+'.png');
				movie_txt.attr('src','./img/detail_'+subnum+'/movie_txt.png');
				
				$('.movieWrap .movie .thumb').css('opacity','1');
				$('.movieWrap .movie .youtube').hide();
	
				stopVideo();
				fnChangeVideoId(youtubeID);
				detailPopScroll();
			}
		});

		// 상단으로 이동
		function detailPopScroll() {
			$('.subDetailPop').stop().animate({
				scrollTop: 0
			}, 'slow');
		};

		// PC버전일때만
		if(!$('.event_compMovie').hasClass('mobilebody')) {
			$(window).scroll(function() {
				if ($(this).scrollTop() > 200) {
					$('.fixedRight').fadeIn();
				} else {
					$('.fixedRight').fadeOut();
				}
			});
		}

		// footer
		$('.family-site').on('click', function(){
			$(this).toggleClass('js-dropdown-opened');
		})

	});

}());

	// @ popup open
	function subDetailPopOpen(el){
		scrollOff();

		var parent = $('.subDetailPop')

		parent.show();
		parent.find(el).show().siblings().hide();

		var pop = parent.find('.popIn');

		setTimeout(function(){
			pop.css({
				'visibility' : 'visible'
			});
		},10);
	};

	// @ popup close
	function _subDetailPopClose() {
		scrollOn();

		$('.subDetailPop').hide();
		$('.subDetailPop .popIn').css({
			'visibility' : 'hidden'
		});

		stopVideo();

	};

	//팝업오픈 스크롤방지
	function scrollOff(){
		$('html').css('overflow-y','hidden');
		$('html').css('padding-right',getScrollBarWidth());
	};

	//팝업오픈 스크롤해제
	function scrollOn(){
		$('html').css('overflow-y','auto')
		$('html').css('padding-right','0');
	};

	// 스크롤바 넓이 구하기
	function getScrollBarWidth() {
		var inner = document.createElement('p');
		inner.style.width = "100%";
		inner.style.height = "200px";
	  
		var outer = document.createElement('div');
		outer.style.position = "absolute";
		outer.style.top = "0px";
		outer.style.left = "0px";
		outer.style.visibility = "hidden";
		outer.style.width = "200px";
		outer.style.height = "150px";
		outer.style.overflow = "hidden";
		outer.appendChild (inner);
	  
		document.body.appendChild (outer);
		var w1 = inner.offsetWidth;
		outer.style.overflow = 'scroll';
		var w2 = inner.offsetWidth;
		if (w1 == w2) w2 = outer.clientWidth;
	  
		document.body.removeChild (outer);
	  
		return (w1 - w2);
	  };

/**
 * Youtube API 로드
 */
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	var youtubePlayer;
	function onYouTubeIframeAPIReady () {
		youtubePlayer = new YT.Player('compIframe', {
			// videoId: '9bZkp7q19f0',
			events: {
				'onReady': onPlayerReady,               // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
				'onStateChange': onPlayerStateChange    // 플레이어의 상태가 변경될 때마다 실행
			}
		});
	}

	function onPlayerReady (event) {
		//$('#result').val($('#result').val() + 'onPlayerReady 실행\n')
		// 플레이어 자동실행 (주의: 모바일에서는 자동실행되지 않음)
		event.target.playVideo();
	}
	
	var playerState;
	function onPlayerStateChange (event) {
	playerState = event.data == YT.PlayerState.ENDED ? '종료됨' :
		event.data == YT.PlayerState.PLAYING ? '재생 중' :
		event.data == YT.PlayerState.PAUSED ? '일시중지 됨' :
		event.data == YT.PlayerState.BUFFERING ? '버퍼링 중' :
		event.data == YT.PlayerState.CUED ? '재생준비 완료됨' :
		event.data == -1 ? '시작되지 않음' : '예외';

		console.log('onPlayerStateChange 실행: ' + playerState);
	}

	//유튜브 재생
	function playVideo() {
        youtubePlayer.playVideo();
    }
	//유튜브 멈춤
	function stopVideo() {
        youtubePlayer.stopVideo();
    }
	// 유튜브 플레이리스트 변경
	function fnChangeVideoId(videoId){
		youtubePlayer.cueVideoById(videoId);
		youtubePlayer.unMute();
   }

