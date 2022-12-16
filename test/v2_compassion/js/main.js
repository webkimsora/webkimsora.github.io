;(function(){
	$(document).ready(function(){
		var UserAgent = navigator.userAgent;
		var UADevice = UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i);
		var UAVendor = UserAgent.match(/LG|SAMSUNG|Samsung/);
		if (UADevice !== null || UAVendor!== null){
			$('.event_compMovie').addClass('mobilebody');
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

		/* 메인영상 레이어 팝업 호출 */
		$('.popMovie').click(function() {
			var _movieId = $(this).data('movie');
			var _movieType = (_movieId.indexOf('.mp4') != -1) ? 'video' : 'iframe';

			$('.dimMovie').html('');
			if(_movieId) {
				if(_movieType == 'iframe') {
					$('.dimMovie').html('<iframe id="moviePlayer" width="560" height="315" src="https://www.youtube.com/embed/' + _movieId + '?autoplay=1&mute=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
				}

				var pop = $('.mainPop .popIn');
				setTimeout(function(){
					pop.css({
						'visibility' : 'visible'
					});
				},10);

				$('.mainPop').show();
			} else {
				alert('영상이 곧 공개됩니다! :)');
			}
		});

		// main visual slide
		var mainSlider = $('.event_compMovie .mainSlide');
		mainSlider.owlCarousel({
			items:1,
			loop:true,
			autoplay:true,
			autoplayTimeout:5000,
			smartSpeed: 500,
			nav: false,
			dots: true,
			responsiveClass:true,
			responsive:{
				768:{
					dots: false,
				}
			}
		});

		// main list slide
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
		$('.event_compMovie .listSlide a').on('click', function(){
			var idx = $(this).parents('.owl-item').index() + 1;
			var subnum = $(this).data('subnum');
			var thumb = $('.detailPop .movie .thumb').find('img');
			var movie_txt = $('.detailPop .movieWrap .txt').find('img');
			var playlist = $('.detailPop .playlist').find('ul');
			var youtubeID = playlist.eq(subnum - 1).find('li').eq(idx-1).children('a').data('videoid');

			thumb.attr('src','./img/detail_'+subnum+'/movie_thumb_'+idx+'.png');
			//movie_txt.attr('src','./img/detail_'+subnum+'/movie_txt_'+idx+'.png');
			movie_txt.attr('src','./img/detail_'+subnum+'/movie_txt_1.png');
			
			$('.movieWrap .movie .thumb').css('opacity','1');
			$('.movieWrap .movie .youtube').hide();
			
			playlist.eq(subnum - 1).show().siblings('ul').hide();
			fnChangeVideoId(youtubeID);

			setTimeout(function(){
				subDetailPopOpen('.detailPop');
			},100)
		})

		// 영상보기팝업 영상재생
		$('.detailPop .movieWrap .btn_play').on('click', function(){
			detailPopScroll();

			$('.movieWrap .movie .thumb').css('opacity','0');
			$('.movieWrap .movie .youtube').show();

			setTimeout(function(){
				playVideo();
			},700);
		});

		// 영상보기팝업 회차정보
		$('.detailPop .playlist li').on('click', function(){
			var idx = $(this).index() + 1;
			var subnum = $(this).find('a').data('subnum');
			var thumb = $('.detailPop .movie .thumb').find('img');
			var movie_txt = $('.detailPop .movieWrap .txt').find('img');
			var youtubeID = $(this).children('a').data('videoid');


			if(!$(this).hasClass('coming')){

				thumb.attr('src','./img/detail_'+subnum+'/movie_thumb_'+idx+'.png');
				movie_txt.attr('src','./img/detail_'+subnum+'/movie_txt_'+idx+'.png');
				
				$('.movieWrap .movie .thumb').css('opacity','1');
				$('.movieWrap .movie .youtube').hide();
	
				stopVideo();
				fnChangeVideoId(youtubeID);
				detailPopScroll();
			}
		});

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

	});



}());


	/* 메인 영상 레이어 팝업 닫기 */
	function _popClose() {
		$('.dimMovie').html('');
		$('.mainPop').hide();
	};
	
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
	};

	//팝업오픈 스크롤해제
	function scrollOn(){
		$('html').css('overflow-y','auto')
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
			// videoId: '9bZkp7q19f0',   // <iframe> 태그 지정시 필요없음
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
	function stopVideo() {
        youtubePlayer.stopVideo();
    }
	// 유튜브 플레이리스트 변경
	function fnChangeVideoId(videoId){
		youtubePlayer.cueVideoById(videoId);
		youtubePlayer.unMute();
   }

