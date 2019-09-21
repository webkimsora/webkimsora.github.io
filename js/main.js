
;(function(){
	$(document).ready(function(){
		var headerH = $('.header').height();
		
		var UserAgent = navigator.userAgent;
		var UADevice = UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i);
		var UAVendor = UserAgent.match(/LG|SAMSUNG|Samsung/);
		if (UADevice !== null || UAVendor!== null){
			$('body').addClass('mobilebody');
			$('body.sub .hamburger').addClass('is-active');
			$('#bgMain').remove();
			var wh = $(window).height();
			$('.main').height(wh);
		}
	

		var $thumb = $('.workList').isotope({
			itemSelector: '.thumb',
			masonry: {
			columnWidth: 300,
			isFitWidth: true,
			gutter: 20
			}
		});
		
		$thumb.isotope({ filter: '.game, .brand, *' });
		
		// filter functions
		var filterFns = {
		  // show if number is greater than 50
		  numberGreaterThan50: function() {
		    var number = $(this).find('.number').text();
		    return parseInt( number, 10 ) > 50;
		  },
		  // show if name ends with -ium
		  ium: function() {
		    var name = $(this).find('.name').text();
		    return name.match( /ium$/ );
		  }
		};
		// bind filter button click
		$('.filterWrap').on( 'click', 'button', function() {
		  var filterValue = $( this ).attr('data-filter');
		  // use filterFn if matches value
		  filterValue = filterFns[ filterValue ] || filterValue;
		  $thumb.isotope({ filter: filterValue });
		});
		// change is-checked class on buttons
		$('.btnWrap').each( function( i, buttonGroup ) {
		  var $buttonGroup = $( buttonGroup );
		  $buttonGroup.on( 'click', 'button', function() {
		    $buttonGroup.find('.is-checked').removeClass('is-checked');
		    $( this ).addClass('is-checked');
		  });
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
				$('#menuBg').hide();
				gnbClose();
				
				if($('body').hasClass('mobilebody')){
	                $('#viewport').css({'top':'',position:'relative'})
	                $(window).scrollTop(winTop)        
	            }
			} else {
				$(this).addClass("is-active");
				
				$('#menuBg').on('touchstart',function(e){
	                e.preventDefault()
	            });
	
	            if($('body').hasClass('mobilebody')){
	                winTop = $(window).scrollTop();
	                $('#viewport').css({'top':-winTop,position:'fixed'})
	            }
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
		
	  
		/* work 타임라인 */
		$.js = function(el) {
		return $("[data-js=" + el + "]");
		};

		function carousel() {
		$.js("timeline-carousel").slick({
			infinite: false,
			arrows: true,
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
		
		// 서브페이지
  		if($('body').hasClass('sub')){
  			$('.detailSlide').slick({
  				draggable: true,
  				dots: true,
  		        infinite: true,
  		        slidesToShow: 1,
  		        slidesToScroll: 1,
  				autoplay: true,
  				autoplaySpeed: 2000
  		  });
  		}
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
		
		
		if($('body').hasClass('sub')){
			setTimeout(function(){
				$('body').addClass('on');
			},500);
			setTimeout(function(){
				$('.hamburger.back').addClass('is-active');
			},2800);
		} else {
			if($(document).scrollTop() > 300){
				setTimeout(function(){
					$('body').addClass('on');
				},500);
			} else {
				setTimeout(function(){
					$('body').addClass('on');
				},2000);
			}
		}
		
		
	})
	
	
	$(window).scroll(function() {
		//console.log(winHeight);
		
		var winHeight= $(document).scrollTop();
		
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
	   
	});
}());