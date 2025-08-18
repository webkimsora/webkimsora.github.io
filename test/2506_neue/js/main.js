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

		//IE 브라우저 체크
		function BrowserVersionCheck() {
			var word;
		    var versionOrType = "another";
		    var ieName = navigator.appName;
		    var agent = navigator.userAgent.toLowerCase();
			/*** 1. IE 버전 체크 ***/
			// IE old version ( IE 10 or Lower )
			if ( ieName == "Microsoft Internet Explorer" ){
			  word = "msie ";
			  alert("이 브라우저는 지원하지 않습니다. \n(지원 브라우저: Chrome, Opera, Firefox, Safari, Edge 그 외 Chrome 기반 브라우저)");
			  window.location.href = "https://www.google.co.kr/chrome/index.html";
			}else{
			  // IE 11
			  if( agent.search("trident") > -1 ) {
				  $('body').addClass('ie11');
			  }
			}
		};
		BrowserVersionCheck();

        /* resize 반복실행 방지 : smartResize js 해석*/
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
            }
        };

        // @ header :: hamberger menu click 
        $('.hamburger').on('click', function(event){
            event.preventDefault();
            
            $(this).toggleClass("is-active");
            $('#header .overlay').toggleClass('visible');
            $('#header').toggleClass('menuOpen');
        });

		// @@@@@ 메인 슬라이드
		var swiper = new Swiper('.main .main_slide', {
			slidesPerView: 1,
			spaceBetween: 20,
			autoplay: {
				delay: 3000,
			},
			speed: 800,
			//loop: true,
			effect: 'fade',
			fadeEffect: { crossFade: true },

		});

		// @@@@@ 배경
		if(!$('body').hasClass('mobilebody')) {
			$("#viewport").mousemove(function(e) {
			  parallaxIt(e, ".mainBgPal.no1", -100);
			  parallaxIt(e, ".mainBgPal.no2", 200);
			});

			function parallaxIt(e, target, movement) {
			  var $this = $("#viewport");
			  var relX = e.pageX - $this.offset().left;
			  var relY = e.pageY - $this.offset().top;

			  TweenMax.to(target, 1, {
			    x: (relX - $this.width() / 2) / $this.width() * movement,
			    y: (relY - $this.height() / 2) / $this.height() * movement
			  });
			}
		}

		// @@@@@ 스크롤애니메이션
		var sections = $('.target'),
			nav = $('.rightNavi'),
			nav_height = $('#header').outerHeight();
			countChk = true;

		$(window).on('scroll', function() {
			var nowScroll = $(window).scrollTop() + $(window).height();
			var nowScroll2 = $(window).scrollTop();

			$('.scrollAni').each( function(i){
				if(!$('body').hasClass('mobilebody')) {
					var elScroll = $(this).offset().top + 300;
				} else {
					var elScroll = $(this).offset().top + 100;
				}

	            if( nowScroll > elScroll ){ 
	                $(this).addClass('on');

	            } else if (nowScroll +600 < elScroll){
					$(this).removeClass('on');
				}
	        });

			// 스크롤 header
			if ($(this).scrollTop() > 200) {
				$('.hamburger').addClass('scroll');
			} else {
				$('.hamburger').removeClass('scroll');
			}
		});

		// 상단으로 이동
		// $.fn.scrollEnd = function(callback, timeout) {
		// 	$(this).scroll(function() {
		// 		var $this = $(this);

		// 		if ($this.data('scrollTimeout'))
		// 			clearTimeout($this.data('scrollTimeout'));

		// 		$this.data('scrollTimeout', setTimeout(callback, timeout));
		// 	});
		// };

		// $('.fixedRight .btnTop').click(function(e) {
		// 	e.preventDefault();
		// 	//var goTop = $('.page').eq(0).attr('data-height');
		// 	$('html, body').stop().animate({
		// 		scrollTop: 0
		// 	}, 500);
		// 	return false;
		// });

	});


}());
