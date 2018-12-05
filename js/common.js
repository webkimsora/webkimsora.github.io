window.onunload = function(){};
window.onbeforeunload = function(){};

var soundClick= true;

$(function(){
	var $wrapper = $("#wrapper");
	var $section = $("#wrapper section");
	var $container = $("#wrapper .container")
	var $news = $("#news");
	
	var $btnScroll = $(".btn-scroll");
	var sectionLength = $section.length;
	
	var sectionOffset = [];
	var nowIndex = 0;
	var oldIndex = 0;
	var isCboxOpen = false;
	var w_height = $(window).height();
	var resizeTimer;
	var threshold = 10;
	var addReset;
	var addScroll = 0;
	var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
	var tween;

	// @ 영상 리사이즈
	var playMain = document.getElementById("bgMain");
	
	var resizeMovie = function() {
		var width = $(window).width(),
			pWidth, // player width, to be defined
			height = $(window).height(),
			pHeight, // player height, tbd
			$tubularPlayer = $('.videoBg');

		if (width / (16 / 9) < height) { // if new video height < window height (gap underneath)
			pWidth = Math.ceil(height * (16 / 9)); // get new player width
			$tubularPlayer.width(pWidth).height(height+5).css({
				left: (width - pWidth) / 2,
				top: 0
			}); // player width is greater, offset left; reset top
		} else { // new video width < window width (gap to right)
			pHeight = Math.ceil(width / (16 / 9)); // get new player height
			$tubularPlayer.width(width).height(pHeight).css({
				left: 0,
				top: (height - pHeight+5) / 2
			}); // player height is greater, offset top; reset left
		}
	}
	
	resizeMovie();
	
	if(document.getElementById('main')) {
		playMain.play();
		
		var agent = navigator.userAgent.toLowerCase(); 

		if (agent.indexOf("chrome") != -1) {
			var weaList = '<iframe style="width:1px; height:1px;" src="./images/silence.mp3" allow="autoplay">' 
        	$('#viewport').append(weaList) 
		}

	}
	
	// fullpage parallax javascript
	$(window).on("load", function(){
		TweenMax.to(window, 0.1, {
			scrollTo: 0,
			delay: 0
		});
		
		$section.addClass('anime-ready');
	});

	$(window).on("resize", function(){
		if($('body').hasClass('onePage')) {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function(){
				getSectionOffset();
				resizeSection();
			}, 10);
			resizeMovie();
		}
	}).trigger("resize");

	$(window).on("scroll", function(e){
		if($("body").hasClass("enable-scroll")) {
			var scrollTop = $(window).scrollTop();
			for(var i = 0; i < sectionLength; i++) {
				var imageTop = $(window).scrollTop() - (i * $(window).height());
				var posTop = "center " + imageTop * -0.1 + "px";
				$section.eq(i).css({"background-position": posTop });

				var sectionScrollTop = $section.eq(i).offset().top;
				var inv = (sectionScrollTop - scrollTop);
				if(scrollTop >= sectionScrollTop) {
					$section.eq(i).removeClass("anime-ready").find("*").removeClass("anime-ready");
				}
				
				if ($(this).scrollTop() > 200) {
					$( '.page-top' ).fadeIn();
				} else {
					$( '.page-top' ).fadeOut();
				}
			}
		}
	});

	$('.btnScroll').find("a").on("click", function(e){
		e.preventDefault()
		scrollEvent(-1);
	});
	
	$(".page-top a").on("click", function(){
		nowIndex = 0;
		scrollAnime();
	});
	
	try {
	  document.addEventListener(mousewheelevent, onWheel, false);
	} catch (e) {
	  document.attachEvent("onmousewheel", onWheel);
	}
	
	function resizeSection () {
		w_height = $(window).height();
		$section.css({ height: w_height });
		$container.css({ height: w_height });

		var resizeTarget = nowIndex;
		if(nowIndex > sectionLength) resizeTarget--;
		if(!TweenMax.isTweening(window) && tween) tween.pause();
		TweenMax.to(window, 0, { scrollTo: nowIndex * w_height });
	}
	
	function getSectionOffset() {
		for(var i = 0; i < sectionLength; i++) {
			sectionOffset[i] = $(window).height() * i;
		}
		sectionOffset[sectionLength] = sectionOffset[sectionLength - 1] + $("footer").outerHeight(true) + $(".entry-area").outerHeight(true);
	}
	
	function clearAdd() {
	  addScroll = 0;
	  clearTimeout(addReset);
	  addReset = null;
	}
	
	function onWheel(e) {
		if(!$("body").hasClass("enable-scroll")) return false;
		if (!e) e = window.event;
		var delta = e.deltaY ? -(e.deltaY) : e.wheelDelta ? e.wheelDelta : -(e.detail);

		e.preventDefault();
		if(!isCboxOpen) {
			addScroll += delta;
			if (!addReset) addReset = setTimeout(function(){ clearAdd(); }, 300);
			else {
				clearTimeout(addReset);
				addReset = setTimeout(function(){ clearAdd(); }, 300);
			}
			if (Math.abs(addScroll) > threshold) {
				scrollEvent(addScroll);
				addScroll = 0;
			}
		}
	}
	
	function scrollEvent(delta) {
	    var target = 0;
	    if(!TweenMax.isTweening(window)) {
			// down
	        if (delta < 0) {
            	nowIndex++;
            	if(nowIndex >= sectionLength) {
					nowIndex = sectionLength-1;
				} else scrollAnime();
	        } else { // up
	        	nowIndex--;
	            if(nowIndex < 0) nowIndex = 0;
	            else scrollAnime();
	        }

			//메뉴 활성화
			$('.side-navi-contents ul li').eq(nowIndex).addClass('on').siblings().removeClass('on');
	    }
	}
	
	function scrollAnime() {
		if(tween) tween.pause();
		tween = TweenMax.to(window, 1.17, {
			scrollTo: sectionOffset[nowIndex], //
			ease: Power4.easeInOut,
			onComplete: function(){
				oldIndex = nowIndex;
				if(nowIndex == sectionLength - 1) {
					$btnScroll.removeClass("hide");
				}
			}
		});
		
		//console.log('nowIndex:'+nowIndex+'& sectionLength: '+sectionLength)
	}
	
	$(document).ready(function(){
		$('.chara-list').each(function(){
			$(this).find('.img-chara').each(function(index){
				var thisDelay = 80 * index
				thisDelay = thisDelay + 'ms';
				$(this).css({
					"transition-delay" : thisDelay
					//"opacity" : "1"
				});
				
			})
			
		})
	})
	
	$(window).on("load", function(){
		if(document.getElementById('media')){
			$('body').removeClass('onePage')
		}
		$('#story').removeClass('anime-ready');
		
		$(".story").mCustomScrollbar({
			theme: "dark"
		});
	});
	
	// 스크롤
	if($.fn.slick){
		$('.giftSlide').slick({
			dots: true,
			infinite: true
		});
		
		$('.giftSlide').on('beforeChange', function(event, slick, currentSlide, nextSlide){
			setTimeout(function(){
				$('.giftSlideDeco > div').removeClass('on').eq(nextSlide).addClass('on');
			},200)
			
		});
	}
	
	//메뉴이동
	$('.side-navi-contents ul li').on('click',function(){
		nowIndex = $(this).index();
		$('.side-navi-contents ul li').eq(nowIndex).addClass('on').siblings().removeClass('on');
		scrollAnime();
	})
	
	var playBgm = document.getElementById("bgmAudio");
	var playingBgm = true;
	
	$('.btnSound').on('click', function(e){
		e.preventDefault();
		$('.btnSound .playing').toggleClass('animated');
		if($('.btnSound .playing').hasClass('animated')){
            soundClick = true;
			playBgm.play();
		} else {
            soundClick = false;
			playBgm.pause();
    		playBgm.currentTime = 0;
		}
	})	
});


//팝업오픈 스크롤방지
function scrollOff(){
	//$.fn.fullpage.setAllowScrolling(false);
	//$('html').css('overflow-y','hidden');
	$('html').addClass('popOpen');
}

//팝업오픈 스크롤해제
function scrollOn(){
	//$.fn.fullpage.setAllowScrolling(true);
	//$('html').css('overflow-y','auto')
	if(!$('.rumorPopEv001').is(':visible')&&!$('.rumorPopEv002').is(':visible')){
		$('html').removeClass('popOpen');
	}
}

//영상팝업 열기
function mainPopOpen(){
	var mainId = 'xG_k5JGymSQ';
	var storyId = 'FhJrpzQvSNY';
	var playBgm = document.getElementById("bgmAudio");
	var playMain = document.getElementById("bgMain");
	scrollOff();
	if(document.getElementById('main')) {
		playMain.pause();
		if(soundClick == true) {
			$('.btnSound .playing').removeClass('animated')
            playBgm.pause();
        }
		$('.mainPop #videoplayer').attr('src','https://www.youtube.com/embed/'+mainId+'?rel=0&amp;autoplay=1&amp;showinfo=0')
	} else {
		$('.mainPop #videoplayer').attr('src','https://www.youtube.com/embed/'+storyId+'?rel=0&amp;autoplay=1&amp;showinfo=0')
	}
	
	var pop = $('.mainPop .popIn');
	setTimeout(function(){
		pop.css({ 
			'visibility' : 'visible', 
			'marginTop' : - (pop.outerHeight()/2)
		});
	},10)
	
	$('.mainPop').show();
}


//영상팝업 닫기
function mainPopClose(){
	var playBgm = document.getElementById("bgmAudio");
	var playMain = document.getElementById("bgMain");
	scrollOn();
	if(document.getElementById('main')) {
		playMain.play();
		
		if(soundClick == true) {
			$('.btnSound .playing').addClass('animated')
            playBgm.play();
        }
	}
	
	$('.mainPop #videoplayer').attr('src','');
	$('.mainPop').hide();
}
