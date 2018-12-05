window.onunload = function(){};
window.onbeforeunload = function(){};

$(function(){
	var $wrapper = $("#wrapper");
	var $section = $("#wrapper section");
	var $container = $("#wrapper .container")
	var $news = $("#news");
	
	// 캐릭터 소개 페이지
	var $sideNavi = $(".side-navi");
	var $sideNaviLink = $(".side-navi-contents a");
	var $charaArea = $("#chara-area");
	var $character = $charaArea.find("[class^='chara_'] "); // 캐릭터개인영역
	var $btnScroll = $(".btn-scroll");
	var sectionLength = $section.length;
	var charaLength = $character.length;
	
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
	playMain.play();
	
	// fullpage parallax javascript
	$(window).on("load", function(){
		TweenMax.to(window, 0.1, {
			scrollTo: 0,
			delay: 0
		});
	});

	$(document).bind('cbox_complete', function(){
		isCboxOpen = true;
		scrollpos = $(window).scrollTop();
	});
	$(document).bind('cbox_closed', function(){
		isCboxOpen = false;
		w_height = $(window).height();
		TweenMax.to(window, 0, {
			scrollTo: nowIndex * w_height
		});
	});

	$(window).on("resize", function(){
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function(){
			getSectionOffset();
			resizeSection();
		}, 10);
		resizeMovie();
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
					$section.eq(i).removeClass("anime-ready").find("*").removeClass("anime-ready");;
				}
				for(var j = 0; j < charaLength; j++) {
					var d = j * 0.1;
					$character.eq(j).css({
						"-webkit-transform": "translate(0," + inv * d +  "px)",
						"transform": "translate(0," + inv * d +  "px)"
					});
				}
			}
		}
	});

	$btnScroll.find("a").on("click", function(e){
		e.preventDefault()
		scrollEvent(-1);
	});

	$(".page-top a").on("click", function(){
		nowIndex = 0;
		$btnScroll.removeClass("hide");
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
            	if(nowIndex > sectionLength) nowIndex = sectionLength;
            	else scrollAnime();
            	if(nowIndex == sectionLength) {
            		$btnScroll.addClass("hide");
            	}
	        }
	        // up
	        else if(delta > 0) {
	        	nowIndex--;
	            if(nowIndex < 0) nowIndex = 0;
	            else scrollAnime();
	        }

			//메뉴 활성화
			$('.gnb ul li').eq(nowIndex).addClass('on').siblings().removeClass('on');
	    }
	}

	//메뉴이동
	$('.gnb ul li').on('click',function(){
		nowIndex = $(this).index();
		$('.gnb ul li').eq(nowIndex).addClass('on').siblings().removeClass('on');
		scrollAnime();
	})
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
	}
	
	// 스크롤
	$(window).on("load",function(){
		$(".system").mCustomScrollbar({
			theme: "dark"
		});
		$('.giftSlide').slick({
			infinite: true
		});
	});
});