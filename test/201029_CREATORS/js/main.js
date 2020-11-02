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
			//$('body').height('auto');
			// if($(window).width() >= 1500){
			// 	$('.workList').css('width','1200');
			// }
		}
		};

		smartresize.init();


		// @ swiper
		var placeSlider = new Swiper(".placeSlide", {
            slidesPerView: 1.5,
            spaceBetween: 20,
            //centeredSlides: false,
            loop: true,
            //loopFillGroupWithBlank: false,
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

		$(window).scrollEnd(function() {
			$('.btnTop').fadeOut();
		}, 1000);

		$('.btnTop').on('click', function(e) {
			e.preventDefault();
			//var goTop = $('.page').eq(0).attr('data-height');
			$('html, body').stop().animate({
				scrollTop: 0
			}, 500);
			return false;
		});

		$(window).scroll(function() {
			if ($(this).scrollTop() > 200) {
				$('.btnTop').fadeIn();
			} else {
				$('.btnTop').fadeOut();
			}
		});

	});

	$(window).load(function(){
		// skrollr 사용
		// var s = skrollr.init();
		// if (s.isMobile()) {
		// 	s.destroy();
		// } else {
		// 	skrollr.init({
		// 		forceHeight: false
		// 	});
		// 	//$('body').height('auto');
		// }

		// if($(document).scrollTop() > 300){
		// 	setTimeout(function(){
		// 		$('body').addClass('on');
		// 	},500);
		// } else {
		// 	setTimeout(function(){
		// 		$('body').addClass('on');
		// 	},2000);
		// }

		// 메인 스크롤 애니메이션
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
		//console.log(winHeight);

		/*
		var winHeight= $(document).scrollTop();
		if(!($('body').hasClass('sub'))) {
			$.each($('.page'), function(idx, item) {
			 var position = ($('.page').eq(idx).offset().top)
			 var positionPar = position;
			 var gnbH = $('.header').height()

			 if(winHeight < ($('.page').eq(0).offset().top) - 300 ) {
			   $('.page').removeClass('active');
			 } else {
			   if(positionPar - 300 <= winHeight) {
					$('.page').removeClass('active');
					$('.page').eq(idx).addClass('active');
			   }
			 }
			});

			if($('#who').offset().top - 500 <= winHeight) $('#who').addClass('onT');
			if($('#work').offset().top - 500 <= winHeight) $('#work').addClass('onT');
		}
		*/
	});

	grabCursor();

	function grabCursor() {
	    document.getElementById("placeSlide").style.cursor = url('../images/cursor.png');
	}

}());
