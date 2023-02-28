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

		// @ gnb
		$user = $('.gnbWrap');
		var winHeight = $(window).height();
		var userHeight = $('.gnb .inner').height() ;
		var st = $(this).scrollTop();
		var winTop = 0;

		$('.hamburger.surface').on('click', function(){
		$user.addClass('open');
		winTop = $(window).scrollTop()
		//$('#viewport').css({'top':winTop,position:'fixed'});
		});

		function gnbClose(){
			$user.removeClass('open');

			//$('#viewport').css({'top':'',position:'relative'});
			$(window).scrollTop(winTop);
			$(".hamburger").removeClass('is-active');
		};

		$(".hamburger").on('click', function(){
			if($(this).hasClass('is-active')){
				$(this).removeClass("is-active");
				gnbClose();
			} else {
				$(this).addClass("is-active");
			}
		});

		$(".gnbMenu li").click(function() {
			// var scrollPosition = $($(this).attr("data-target")).offset().top;
			// console.log(scrollPosition)
			// gnbClose();

			// $('html, body').stop().animate({
			// 	scrollTop: scrollPosition - headerH
			// }, 500);
		});

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

		// 상단으로 이동
		$.fn.scrollEnd = function(callback, timeout) {
			$(this).scroll(function() {
				var $this = $(this);

				if ($this.data('scrollTimeout'))
					clearTimeout($this.data('scrollTimeout'));

				$this.data('scrollTimeout', setTimeout(callback, timeout));
			});
		};

		$('.fixedRight .btnTop').click(function(e) {
			e.preventDefault();
			//var goTop = $('.page').eq(0).attr('data-height');
			$('html, body').stop().animate({
				scrollTop: 0
			}, 500);
			return false;
		});

		// window loading
		setTimeout(function(){
			$('body').addClass('loaded');
		},100);

		setTimeout(function(){
			$('body').addClass('on');
		},700);

		setTimeout(function(){
			$('.typingAni').addClass('on');
			typingAni($('.typingAni'),800,'1');
		},200);


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
					typingAni($(this),400,'1'); // subpage 타이틀 타이핑애니메이션

	            } else if (nowScroll +600 < elScroll){
					$(this).removeClass('on');
					typingAni($(this),400,'0');
				}
	        });

            // count animation
			if ($('#about')[0]) {
				if(countChk == true) {
					if (nowScroll > $('#about .profileWrap').offset().top) {
						$('.count').each(function () {
							var count_val = $(this).data('count');
							countAni($(this),count_val);
						});
						countChk = false;
					}
				}
			}

			// subpage HEADER
			if (nowScroll2 > $('.subPage .all_contents').offset().top) {
				//console.log('왔다');
				$('.header').addClass('black');
				if($('#about')[0]) {
					$('.rightNavi').fadeIn();
				}
			} else {
				//console.log('위로감')
				$('.header').removeClass('black');
				if($('#about')[0]) {
					$('.rightNavi').fadeOut();
				}
			}

			// 스크롤 header
			if ($(this).scrollTop() > 200) {
				$('.header').addClass('scrollOn');
				$('.fixedRight').fadeIn();
			} else {
				$('.header').removeClass('scrollOn');
				$('.fixedRight').fadeOut();
			}

			// about navi
			sections.each(function() {
				var top = $(this).offset().top ,
					bottom = top + $(this).outerHeight();
	
				if (nowScroll2 >= top && nowScroll2 <= bottom) {
					nav.find('a').parent().removeClass('on');
					sections.removeClass('active');
	
					$(this).parent().addClass('on');
					nav.find('a[href="#' + $(this).attr('id') + '"]').parent().addClass('on');
				}
			});
		});
		// @@@@@ 스크롤애니메이션 end

		nav.find('a').on('click', function() {
			var $el = $(this),
				id = $el.attr('href');
	
			$('html, body').animate({
				scrollTop: $(id).offset().top + 5
			}, 500);
	
			return false;
		});


		// subpage 타이틀 타이핑애니메이션
		function typingAni(el,timeCount,opacity){
			var txt = el.find('.typewriter-effect').find('.text');

			txt.each(function (index) {
				TweenMax.to(this, 0.2, {
					opacity: opacity,
					delay: .04 * index
				});
			});
		}
		
		// ABOUT : count animation
		function countAni(el, num) {
			$({ val : 0 }).animate({ val : num }, {
				duration: 2000,
				step: function() {
					$(el).text(Math.ceil(this.val));
				},
				complete: function() {
					$(el).text(Math.ceil(this.val));
				}
			});
		}

	});


}());
