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
			var scrollPosition = $($(this).attr("data-target")).offset().top;
			console.log(scrollPosition)
			gnbClose();

			$('html, body').stop().animate({
				scrollTop: scrollPosition - headerH
			}, 500);
		});


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
                    //$('.changeWrap .list > li').removeClass('on').eq(changeSlider.activeIndex).addClass('on');
				}
			}

		});

		$('.changeWrap .list > li').hover(function(){
			var idx = $(this).index();

			changeSlider.slideTo(idx+1);
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

		// @ swiper : PROJECT
		var proSlider = new Swiper(".proSlide", {
			// autoplay: {
			// 	delay: 2000,
			// 	disableOnInteraction: false
			// },
            slidesPerView: 'auto',
			effect: "slide",
            spaceBetween: 30,
			speed: 500,
			grabCursor: true,
			freeMode: true,
            loop: false,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
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


		// cursor event
		if(!$('body').hasClass('mobilebody')) {

			var $cursor = $('.cursor');
			var moveTimer;

			$(document).bind('mousemove', function (e) {
				var offset = $(window).scrollTop();
				if($('.gnbWrap').hasClass('open')){
					$('.cursor').hide();
				} else {
					$('.cursor').show();

					TweenLite.to($cursor, 0.1, {
						opacity: 1,
					    //backgroundColor: '#0b6fe8',
						left: e.pageX - 13,
						top: e.pageY - offset - 13
					});
				}


				clearTimeout(moveTimer);
			    moveTimer = setTimeout(function(){
					  $('.cursor').addClass('stop');
				  },3000);
				$('.cursor').removeClass('stop');
			});

		    // $(document).bind('mousemove', function (e) {
		    //     var mouseX = e.clientX;
		    //     var mouseY = e.clientY;
			// 	$cursor.css('left',mouseX + 'px') ;
		    //     $cursor.css('top',mouseY + 'px') ;
		    // });

			$('a').mouseover(function(){
				$('.cursor').addClass('hover');
			}).mouseout(function(){
				$('.cursor').removeClass('hover');

			})

			$('.placeSlide .swiper-slide , .proSlide .swiper-slide').hover(function () {
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

			$("#viewport").mousemove(function(e) {
			  parallaxIt(e, ".mainBgPal", -100);
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

		setTimeout(function(){
			$('#loader-wrapper').addClass('fadeout');
		},2000);

		setTimeout(function(){
			$('body').addClass('loaded');
		},2100);

		setTimeout(function(){
			$('body').addClass('on');
		},3000);

		setTimeout(function(){
			$('body').addClass('finish');
		},28000);

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
