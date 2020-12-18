;(function(){
	$(document).ready(function(){
		var UserAgent = navigator.userAgent;
		var UADevice = UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i);
		var UAVendor = UserAgent.match(/LG|SAMSUNG|Samsung/);
		if (UADevice !== null || UAVendor!== null){
			$('body').addClass('mobilebody');
		}

		if($('#viewport')) {

		}

		/*resize 반복실행 방지 : smartResize js 해석 */
		var smartresize = {
			init : function(){
				var self = this;
				$(window).on("resize", function(){
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


		// @ swiper
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


		// 상단으로 이동
		$.fn.scrollEnd = function(callback, timeout) {
			$(this).scroll(function() {
				var $this = $(this);

				if ($this.data('scrollTimeout'))
					clearTimeout($this.data('scrollTimeout'));

				$this.data('scrollTimeout', setTimeout(callback, timeout));
			});
		};

		// $(window).scrollEnd(function() {
		// 	$('.fixedRight').fadeOut();
		// }, 1000);

		$('.fixedRight .btnTop').on('click', function(e) {
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


		// cursor event
		if(!$('body').hasClass('mobilebody')) {

			var $cursor = $('.cursor');

			$(document).bind('mousemove', function (e) {
				var offset = $(window).scrollTop();

				TweenLite.to($cursor, 0.6, {
					left: e.pageX - 20,
					top: e.pageY - offset - 20
				});
			});

			$('.introWrap').on('mouseenter', function() {
				TweenLite.to($cursor, 0.3, {
				    scale: 0.4,
					opacity: 1,
				    backgroundColor: 'rgba(68, 214, 44, 0.5)'
				});
				//console.log('들어왔다');
			});

			$('.introWrap').on('mouseleave', function() {
				TweenLite.to($cursor, 0.3, {
					scale: 0,
					opacity: 0
				});
				//console.log('나갔다');
			});

			$('.placeSlide .swiper-slide').hover(function () {
				TweenLite.to($cursor, 0.6, {
				    ease: Elastic.easeOut.config(1, 0.4),
				    scale: 1,
					opacity: 1,
				    backgroundColor: 'rgba(68, 214, 44, 1)'
				});
			}, function(){
				TweenLite.to($cursor, 0.6, {
					ease: Elastic.easeOut.config(1, 0.4),
					scale: 0.4,
					opacity: 1,
					backgroundColor: 'rgba(68, 214, 44, 0.5)'
				});
			});
		};

	});

	$(window).load(function(){
		// skrollr
        var s = skrollr.init();
		if (s.isMobile()) {
			s.destroy();
		} else {
			skrollr.init({
				forceHeight: false
			});
			//$('body').height('auto');
		};
	});

	// 스크롤 애니메이션
    $(window).on('scroll',function() {
        $('.scrollAni').each( function(i){
            var elScroll = $(this).offset().top + 300;
            var nowScroll = $(window).scrollTop() + $(window).height();

            if( nowScroll > elScroll ){
                $(this).addClass('on');
            }
        });
    });


	$(window).scroll(function() {
	});


}());
