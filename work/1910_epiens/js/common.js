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
		$('html').addClass('mobileNow')
	}else if(getInternetExplorerVersion() == -1 || getInternetExplorerVersion() >= 10){
		// 웹 & ie10이상
	} else {
	}

	$(document).ready(function(){
		////////////////////
		// 카카오 지도 API S
		///////////////////
		if($('body').hasClass('epiens')) {
	    var coordXY   = document.getElementById("coordXY"); //검색 지도 경도위도 알아내기
	    var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
	    var options = {
	      center: new kakao.maps.LatLng(37.51128, 127.04232), // 위도경도
	      level: 3 //지도의 레벨(확대, 축소 정도)
	    };

	    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

	    // 지도타입 컨트롤, 줌 컨트롤 생성
	    var mapTypeControl = new kakao.maps.MapTypeControl();
	    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
	    var zoomControl = new kakao.maps.ZoomControl();
	    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

	    // 주소-좌표 변환 객체를 생성합니다
	    var geocoder = new kakao.maps.services.Geocoder();

	    // 주소로 좌표를 검색합니다
	    geocoder.addressSearch('서울 강남구 봉은사로51길 19', function(result, status) {

	        // 정상적으로 검색이 완료됐으면
	         if (status === kakao.maps.services.Status.OK) {

	            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
	            yy = result[0].x;
	            xx = result[0].y;

	            // 결과값으로 받은 위치를 마커로 표시합니다
	            var marker = new kakao.maps.Marker({
	                map: map,
	                position: coords
	            });

							var markerPosition = marker.getPosition()
	            // 인포윈도우로 장소에 대한 설명을 표시
							var iwContent = '<div class="overlay_info">';
									iwContent += '    <div class="desc">';
									iwContent += '			<a href="https://map.kakao.com/link/to/이피엔스,37.51128, 127.04232" target="_blank">';
									iwContent += '        <img src="./images/location_logo.png" alt="이피엔스">';
									iwContent += '        <div class="address">찾아오시는 길</div>';
									iwContent += '      </a>';
									iwContent += '    </div>';
									iwContent += '</div>';

							var infowindow = new kakao.maps.CustomOverlay({
									map : map,
	                content : iwContent,
									position: markerPosition,
									yAnchor: 0.8
	            });

							infowindow.setMap(map);

	            // 지도의 중심을 결과값으로 받은 위치로 이동
	            map.setCenter(coords);

	            // resize 마커 중심
	            $(window).on('resize', function(){
	              map.relayout();
	              map.setCenter(markerPosition);
	            });

	            //검색 경도위도 표시
	            //coordXY.innerHTML = "<br>X좌표 : " + xx + "<br><br>Y좌표 : " + yy;
	        } else {
	          console.log('에러');
	        }
	    });
		}

		// header event
		/*
		$(".gnb li").click(function() {
			var scrollPosition = $($(this).attr("data-target")).offset().top;
			$('.gnb li').removeClass('on');
			$(this).addClass('on');

			$('html, body').stop().animate({
				scrollTop: scrollPosition - 140
			}, 500);
		});
		*/

		// mainpage event
		if(!($('body').attr('class'))){
			var swsSwiper = new Swiper('.swsSlide', {
				slidesPerView: 'auto',
				centeredSlides: true,
				navigation: {
	        nextEl: '.swiper-button-next',
	        prevEl: '.swiper-button-prev',
	      },
				pagination: {
					el: '.swsPage',
					clickable: true,
				},
				on: {
					resize: function(){
						observer: true
						//swsSwiper.update();
					}
				}
			});

			// breakpoint where swiper will be destroyed and switches to a dual-column layout
			var breakpoint = window.matchMedia('(min-width:461px)');
			// keep track of swiper instances to destroy later
			var brandSwiper;
			var influSwiper;

			var breakpointChecker = function () {
				if (breakpoint.matches === true) {
					if (brandSwiper !== undefined) brandSwiper.destroy(true, true);
					if (influSwiper !== undefined) influSwiper.destroy(true, true);
					return;
				} else if (breakpoint.matches === false) {
						return enableSwiper();
				}
			};

			var enableSwiper = function () {
				brandSwiper = new Swiper('.brandSlide', {
						spaceBetween: 15,
						slidesPerView: 'auto',
			      centeredSlides: true,
						grabCursor: true,
						pagination: {
							el: '.brandPage',
							clickable: true,
						}
					});

					influSwiper = new Swiper('.influSlide', {
						spaceBetween: 15,
						slidesPerView: 'auto',
			      centeredSlides: true,
						grabCursor: true,
						pagination: {
							el: '.influPage',
							clickable: true,
						}
					});
				};

				breakpoint.addListener(breakpointChecker);

				breakpointChecker();
			} if($('body').hasClass('epiens')){
				var breakpoint = window.matchMedia('(min-width:769px)');
				var portSwiper;

				var breakpointChecker = function () {
					if (breakpoint.matches === true) {
						if (portSwiper !== undefined) portSwiper.destroy(true, true);
						return;
					} else if (breakpoint.matches === false) {
							return enableSwiper();
					}
				};

				var enableSwiper = function () {
					portSwiper = new Swiper('.portSlide', {
							pagination: {
								el: '.portPage',
								clickable: true,
							}
						});
					};

					breakpoint.addListener(breakpointChecker);

					breakpointChecker();
			} else {
				var placeSwiper = new Swiper('.placeSlide', {
					navigation: {
		        nextEl: '.swiper-button-next',
		        prevEl: '.swiper-button-prev',
		      },
					pagination: {
						el: '.placePage',
						clickable: true,
					}
				});

				placeSwiper.on('slideChange', function(){
					$('.placeExp li').removeClass('active').eq(placeSwiper.realIndex).addClass('active');
				})
		}

		if(window.location.hash) {
			setTimeout(function(){
				swsSwiper.update();
				if($(window).width() < 461){
					brandSwiper.update();
					influSwiper.update();
				}
			},200);
		}

		$('.btnTop').on('click', function(e) {
			e.preventDefault();
			//var goTop = $('.page').eq(0).attr('data-height');
			$('html, body').stop().animate({
				scrollTop: 0
			}, 500);
			return false;
		});

		function hexagon_motion(){
	    $('#what .detail').on('mouseenter',function(){
	      var $button = $(this).find('.hexagon_figure');
	      var duration = 0.4;
	      var delay = 0.12;
	      TweenMax.to($button, duration, {scaleY: 1.1, ease: Expo.easeOut});
	      TweenMax.to($button, duration, {scaleX: 1.1, scaleY: 1, ease: Back.easeOut, easeParams: [3], delay: delay});
	      TweenMax.to($button, duration * 1.25, {scaleX: 1, scaleY: 1, ease: Back.easeOut, easeParams: [6], delay: delay * 3});
	    });
		}

		if($('body').hasClass('epiens')) hexagon_motion();

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
      },100);
		},
		scroll : function(){ // scroll 이벤트
      var sc = $(this).scrollTop(),
					fadeStart = 100,
					fadeEnd = $('#mainCont').offset().top ,
					opacity = 0

			if(sc <= fadeStart) {
				opacity = 1;
			} else if(sc <= fadeEnd){
				opacity = 1-sc / fadeEnd
			}
			$('#main .mainText').css('opacity', opacity);
			/*
			if(!($('body').hasClass('hire'))){
				var $menu = $('.gnb li'),
						$contents = $('#mainCont .page'),
						$headH = $('.header').innerHeight()

				$.each($contents, function(idx, item){
					var $target = $contents.eq(idx),
						i = $target.index(),
						targetTop = $target.offset().top;

					if (targetTop <= sc + 150) {
						if(idx == 0){
							$menu.removeClass('on');
						} else {
							$menu.removeClass('on').eq(idx-1).addClass('on');

						}
					}
				});
			}
			*/

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
function scrollOff(){
	$('html').css('overflow-y','hidden');
	//$('body').addClass('modal-open');
}

function scrollOn(){
	$('html').css('overflow-y','auto')
	//$('body').removeClass('modal-open');
}

function popOpen(movieId){
	if($('html').hasClass('mobileNow')) scrollOff();
	//$('.mainPop #videoplayer').attr('src','https://d15zlun3b2gkbq.cloudfront.net/videos/20191115/'+storyId+'.mp4');

	$('#moviePlayer').attr('src','https://d15zlun3b2gkbq.cloudfront.net/videos/20191115/'+ movieId +'.mp4');

	var pop = $('.mainPop .popIn');
	setTimeout(function(){
		pop.css({
			'visibility' : 'visible',
			'marginTop' : - (pop.outerHeight()/2)
		});
	},10)

	$('.mainPop').show();
};

function popClose(){
	 	if($('html').hasClass('mobileNow')) scrollOn();

		$('#moviePlayer').attr('src','');
		$('.mainPop').hide();
};
