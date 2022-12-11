;(function(){
	$(document).ready(function(){
		var UserAgent = navigator.userAgent;
		var UADevice = UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i);
		var UAVendor = UserAgent.match(/LG|SAMSUNG|Samsung/);
		if (UADevice !== null || UAVendor!== null){
			$('body').addClass('mobilebody');
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
				var self = this;
				if(self.timeOut) clearTimeout(self.timeOut)
					//setTimeOut 이 걸려있다면 클리어
				self.timeOut = setTimeout(self.action, 150);
					// 150ms 동안 이벤트가 반복 실행 되지 않으면 action() 함수를 실행
			},
			action : function(){
				console.log("Smart Resize Event");
			}
		};

		smartresize.init();

		/* 영상 레이어 팝업 호출 */
		$('.popMovie').click(function() {
			var _movieId = $(this).data('movie');
			var _movieType = (_movieId.indexOf('.mp4') != -1) ? 'video' : 'iframe';

			$('.dimMovie').html('');
			if(_movieId) {
				if(_movieType == 'iframe') {
					$('.dimMovie').html('<iframe id="moviePlayer" width="560" height="315" src="https://www.youtube.com/embed/' + _movieId + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
				}

				var pop = $('.mainPop .popIn');
				setTimeout(function(){
					pop.css({
						'visibility' : 'visible',
						'marginTop' : - (pop.outerHeight()/2)
					});
				},10);

				$('.mainPop').show();
			} else {
				alert('영상이 곧 공개됩니다! :)');
			}
		});

		// main visual slide
		$('.mainSlide').owlCarousel({
			items:1,
			loop:true,
			mouseDrag: true,
     		touchDrag: true,
			autoplay:true,
			autoplayTimeout:4000,
			dots: false
		});

		// main list slide
		$('.listSlide').each(function() {
			var $this = $(this);
			$this.owlCarousel({
				items:3.5,
				margin: 20,
				loop:false,
				mouseDrag: true,
				touchDrag: true,
				dots: false
			});
		});

		// subpage 영상재생
		$('.subPage .movieWrap .btn_play').on('click', function(){
			
			playVideo();

			$('.movieWrap .movie .thumb').css('opacity','0');
			$('.movieWrap .movie .youtube').show();
		})


/*
		// @ swiper : 인테리어
        if($('body').hasClass('mobilebody')){
            $('.changeWrap .cntImg').attr('src','web/images/change_mo_cnt0.png');
        }

		var changeSlider = new Swiper('.changeSlide', {
			autoplay: {
				delay: 5000,
				disableOnInteraction: false
			},
			loop: true,
			effect: 'fade',
			on: {
				slideChange: function(){
					$('.changeWrap .cntImg').attr('src','web/images/change_cnt'+changeSlider.realIndex+'.png');
                    if($('body').hasClass('mobilebody')){
                    	$('.changeWrap .cntImg').attr('src','web/images/change_mo_cnt'+changeSlider.realIndex+'.png');
                    }
				}
			}
		});

		// @ swiper : 공간디자인
		var placeSlider = new Swiper(".placeSlide", {
			autoplay: {
				delay: 2000,
				disableOnInteraction: false
			},
            slidesPerView: 1.5,
            spaceBetween: 10,
            loop: true,
			breakpoints: {
				320: {
					slidesPerView: 1.5,
				},
				768: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 4.5,
				}
			}
        });
*/
		// 상단으로 이동
		$.fn.scrollEnd = function(callback, timeout) {
			$(this).scroll(function() {
				var $this = $(this);

				if ($this.data('scrollTimeout'))
					clearTimeout($this.data('scrollTimeout'));

				$this.data('scrollTimeout', setTimeout(callback, timeout));
			});
		};

		/*
		$(window).scrollEnd(function() {
			$('.fixedRight').fadeOut();
		}, 1000);
        */
		$('.fixedRight .btnTop').click(function(e) {
			e.preventDefault();
			//var goTop = $('.page').eq(0).attr('data-height');
			$('html, body').stop().animate({
				scrollTop: 0
			}, 500);
			return false;
		});

		$(window).scroll(function() {
			if ($(this).scrollTop() > 200) {
				$('.fixedRight').fadeIn();
			} else {
				$('.fixedRight').fadeOut();
			}
		});


		// PC버전일때만
		if(!$('body').hasClass('mobilebody')) {

		};

	});

	// 스크롤 애니메이션
    $(window).scroll(function() {
        $('.scrollAni').each( function(i){
            var elScroll = $(this).offset().top + 300;
            var nowScroll = $(window).scrollTop() + $(window).height();

            if( nowScroll > elScroll ){
                $(this).addClass('on');
            }
        });
    });



}());

/* 영상 레이어 팝업 닫기 */
function _popClose() {
	$('.dimMovie').html('');
	$('.mainPop').hide();
};



/**
 * Youtube API 로드
 */
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	/**
	 * onYouTubeIframeAPIReady 함수는 필수로 구현해야 한다.
	 * 플레이어 API에 대한 JavaScript 다운로드 완료 시 API가 이 함수 호출한다.
	 * 페이지 로드 시 표시할 플레이어 개체를 만들어야 한다.
	 */
	var youtubePlayer;
	function onYouTubeIframeAPIReady () {
	youtubePlayer = new YT.Player('compIframe', {
		// height: '315',            // <iframe> 태그 지정시 필요없음
		// width: '560',             // <iframe> 태그 지정시 필요없음
		// videoId: '9bZkp7q19f0',   // <iframe> 태그 지정시 필요없음
		// playerVars: {             // <iframe> 태그 지정시 필요없음
		//   controls: '2'
		// },
		events: {
		'onReady': onPlayerReady,               // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
		'onStateChange': onPlayerStateChange    // 플레이어의 상태가 변경될 때마다 실행
		}
	});
	}
	function onPlayerReady (event) {
	console.log('onPlayerReady 실행');
	$('#result').val($('#result').val() + 'onPlayerReady 실행\n')

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
	$('#result').val($('#result').val() + 'onPlayerStateChange 실행: ' + playerState + '\n')
	}

	function playVideo() {
        youtubePlayer.playVideo();//재생
    }