;(function(){
	$(document).ready(function(){
		var UserAgent = navigator.userAgent;
		var UADevice = UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i);
		var UAVendor = UserAgent.match(/LG|SAMSUNG|Samsung/);
		if (UADevice !== null || UAVendor!== null){
			$('body').addClass('mobilebody');
			$('#bgMain').remove();
			var wh = $(window).height();
			$('.main').height(wh);
		}
	

		$('.workList').isotope({
			itemSelector: '.thumb',
			masonry: {
			columnWidth: 300,
			isFitWidth: true,
			gutter: 20
			}
		});
		

		/*resize 반복실행 방지 : smartResize js 해석*/
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
			$('body').height('auto');
			// if($(window).width() >= 1500){
			// 	$('.workList').css('width','1200');
			// }
		}
		};

		smartresize.init();

		/* work 타임라인 */
		$.js = function(el) {
		return $("[data-js=" + el + "]");
		};

		function carousel() {
		$.js("timeline-carousel").slick({
			infinite: false,
			arrows: false,
			//dots: true,
			autoplay: false,
			speed: 1100,
			slidesToShow: 2,
			slidesToScroll: 2,
			responsive: [{
			    breakpoint: 800,
			    settings: {
			       slidesToShow: 1,
			       slidesToScroll: 1
			    }
			}]
		});
		}

		carousel();
		
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
	})

	$(window).load(function(){
		
		
			
		var s = skrollr.init();
		if (s.isMobile()) {
			s.destroy();
		} else {
			skrollr.init({
				forceHeight: false
			});
			$('body').height('auto');
		}
	
		setTimeout(function(){
			$('#loader-wrapper').addClass('fadeout');
		},700);
		
		setTimeout(function(){
			$('body').addClass('loaded');
		},1000);
		
		setTimeout(function(){
			$('#main .lineWrap').addClass('active');
		},1800);
		setTimeout(function(){
			$('body').addClass('on');
		},2000);
		
	})
	
	
	$(window).scroll(function() {
		var height = $(document).scrollTop();
		console.log(height);
	});
	
}());