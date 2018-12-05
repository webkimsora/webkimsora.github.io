window.onunload = function(){};
window.onbeforeunload = function(){};

$(function(){
	var $wrapper = $("#wrapper");
	var $section = $("#wrapper section");
	var $container = $("#wrapper .container")
	var $news = $("#news");
	
	// 캐릭터 소개 페이지
	var $sideNavi = $(".side-navi");
	var $sideNaviLink = $(".side-navi-contents ul li");
	var $charaArea = $(".chara-list");
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
	
	// fullpage parallax javascript
	$(window).on("load", function(){
		TweenMax.to(window, 0.1, {
			scrollTo: 0,
			delay: 0
		});
		
		$section.addClass('anime-ready');
	
		$character.addClass('anime-ready');
		$('.btn-chara').addClass('anime-ready');
		$('.title').addClass('anime-ready');
		
		if($('body').hasClass('other')){
			setTimeout(function(){
				$section.eq(0).removeClass("anime-ready").find(".guild-name, .chara-container p, .title").removeClass("anime-ready");
			},500)
		}
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
					$section.eq(i).removeClass("anime-ready").find(".guild-name, .chara-container p, .title").removeClass("anime-ready");
				}
				
				/*
				for(var j = 0; j < charaLength; j++) { //스크롤에 따른 위치모션
					var d = j * 0.1;
					var transitionDelay = 50 * j
					$character.eq(j).css({
						//"-webkit-transform": "translate(0," + inv * d +  "px)",
						//"transform": "translate(0," + inv * d +  "px)"
						//"opacity": d
						//"transition-delay": thisDelay
						"transition-delay": transitionDelay+"ms"
					});
				}
				*/
			}
			if ($(this).scrollTop() > 200) {
				$( '.page-top' ).fadeIn();
			} else {
				$( '.page-top' ).fadeOut();
			}
		}
	});
	
	for(var i = 0; i < sectionLength; i++) {
		var $imgChara = $section.eq(i).find(".chara-container .img-chara");
		var $btnChara = $section.eq(i).find(".chara-container .btn-chara");
		var $titleChara = $section.eq(i).find(".title");
		var charaLength = $(".chara-container").length;
		for(var j = 0; j < charaLength; j++) {
			var delay = 0 + (j * 80);
			$imgChara.eq(j).css({
				"-webkit-transition-delay": delay + "ms",
				"transition-delay": delay + "ms"
			});

			delay += 300;
			$btnChara.eq(j).css({
				"-webkit-transition-delay": delay + "ms",
				"transition-delay": delay + "ms"
			});
			
			
		}
	}

	$btnScroll.find("a").on("click", function(e){
		e.preventDefault()
		scrollEvent(-1);
	});

	$(".page-top a").on("click", function(){
		//nowIndex = 0;
		//scrollAnime();
		$sideNavi.find('li').eq(0).trigger('click');
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
		//sectionOffset[sectionLength] = sectionOffset[sectionLength - 1] + $("footer").outerHeight(true) + $(".entry-area").outerHeight(true);
		sectionOffset[sectionLength] = sectionOffset[sectionLength - 1]
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
			if (!addReset) addReset = setTimeout(function(){ clearAdd(); }, 500);
			else {
				clearTimeout(addReset);
				addReset = setTimeout(function(){ clearAdd(); }, 500);
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
	        if (delta < 0) { // down
            	nowIndex++;
            	if(nowIndex >= sectionLength) {
					nowIndex = sectionLength-1;
				} else {
					scrollAnime();
				}
				
            	if(nowIndex == sectionLength-1) {
					$btnScroll.addClass("hide");
            	}
				
	        } else {// up
	        	nowIndex--;
	            if(nowIndex < 0) nowIndex = 0;
	            else scrollAnime();
	        }

			//메뉴 활성화
			if(!$('body').hasClass('other')){
				$('.side-navi-contents ul li').eq(nowIndex).addClass('on').siblings().removeClass('on');
			}
	    }
	}
	
	function scrollAnime() {
		if(tween) tween.pause();
		tween = TweenMax.to(window, 1.17, {
			scrollTo: sectionOffset[nowIndex], //
			ease: Power4.easeInOut,
			onComplete: function(){
				oldIndex = nowIndex;
				if(nowIndex == sectionLength - 2) {
					$btnScroll.removeClass("hide");
				}
			}
		});
		
		//console.log('nowIndex:'+nowIndex+'& sectionLength: '+sectionLength)
	}
	
	function charaGoHash(idx){
		//$('#chara-area .btnGoChara').trigger('click');
	
		$('#chara-area').remove();
		$('#character').addClass('on');
		$('.btn-scroll').addClass('on');
		
		$('body').addClass('enable-scroll');
			
		$(window).load(function(){
			nowIndex = idx;
			$sideNaviLink.eq(nowIndex).addClass('on').siblings().removeClass('on');
			scrollAnime();
		})
	}
	
	// 스크롤
	$(window).on("load",function(){
		$('#chara-area').removeClass("anime-ready").find("h3, h4, .btnGoChara a").removeClass("anime-ready");
	});
	
	$sideNavi.on('click', function(){
		$sideNavi.toggleClass('open');
	})
	
	$(document).on("click", function(e){
		if($sideNavi.hasClass("open")) {
			if($(e.target).closest(".side-navi").length == 0) {
				$sideNavi.removeClass("open");
			}
		}
	});
	
	//메뉴이동
	$sideNaviLink.on('click',function(){
		if(!$('#character').hasClass('on')){
			$('#chara-area .btnGoChara').trigger('click');
		}
		nowIndex = $(this).index();
		$sideNaviLink.eq(nowIndex).addClass('on').siblings().removeClass('on');
		scrollAnime();
	})
	
	// 음성파일 재생
	$('.btn-chara').on('click', function(){
		var dataValue = $(this).children('a').data('mp3');
		var playVoice = document.getElementById("chaVoice");
		$('#chaVoice').attr('src', './images/character/'+ dataValue +'.mp3');
		playVoice.play();
	})
	
	// 캐릭터버튼
	$('#chara-area .btnGoChara').on('click', function(){
		$('#chara-area').fadeOut(500);
		$('#character').addClass('on');
		$('.btn-scroll').addClass('on');
		$sideNaviLink.eq(0).addClass('on');
		$('body').addClass('enable-scroll');
		
		setTimeout(function(){
			$section.eq(0).removeClass("anime-ready").find(".guild-name, .chara-container p, .title").removeClass("anime-ready");
		},500)
	})
	
	//해쉬태그
	var youtubeNone = false; //메인 유투브 재생 여부
	var hname = window.location.hash;
	if(hname == "#gourmet") charaGoHash('0');
	if(hname == "#twinkle") charaGoHash('1');
	if(hname == "#labyrinth") charaGoHash('2');
	if(hname == "#carmina") charaGoHash('3');
	if(hname == "#little_lyrical") charaGoHash('4');
	if(hname == "#forestier") charaGoHash('5');
	if(hname == "#diabolos") charaGoHash('6');
	if(hname == "#nightmare") charaGoHash('7');
	if(hname == "#sarendia_orphanage") charaGoHash('8');
	if(hname == "#caon") charaGoHash('9');
	if(hname == "#elizabeth_park") charaGoHash('10');
	if(hname == "#mercurius_foundation") charaGoHash('11');
	if(hname == "#twilight_caravan") charaGoHash('12');
	if(hname == "#lucent_academy") charaGoHash('13');
	if(hname == "#landsol_branch") charaGoHash('14');
	if(hname == "#unknown01") charaGoHash('15');
	if(hname == "#unknown02") charaGoHash('16');
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
	var id = 'mAdK44Yg0kI';
	scrollOff();
	$('.mainPop #videoplayer').attr('src','https://www.youtube.com/embed/'+id+'?rel=0&amp;autoplay=1&amp;showinfo=0')
	$('.mainPop').show();
}


//영상팝업 닫기
function mainPopClose(){
	scrollOn();
	$('.mainPop #videoplayer').attr('src','');
	$('.mainPop').hide();
}
