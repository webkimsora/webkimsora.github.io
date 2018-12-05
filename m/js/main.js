
var zoomUtils = function(opts){
  var defaults = {
	psdSize : 720
  };
  var options = $.extend(defaults, opts);

  return $('body').css('zoom', ($(window).width() / options.psdSize).toFixed(5));
};

$(function() {
	$(window).bind('load resize', function() {
		zoomUtils({
			psdSize: 720
		})
	})

	$(document).ready(function() {
		zoomUtils({
			psdSize: 720
		})
		$('body').addClass('on');
	})

	//해상도 계산
	$("document").ready(function() {
		// 최초 페이지 로딩 시 가로, 세로를 모르기 때문에 trigger로 처리
		//$(window).trigger("orientationchange"); 

		// 파이어폭스에선 확대가 되어보이므로 720 고정
		if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
			$('#meta').attr('content', 'width=720, minimal-ui,user-scalable=no');
		}

		var winSize = ($(window).width() / 720).toFixed(5)
		winSize = 100 / Number(winSize * 100)
		var winHeight = $(window).height();
		winHeight = winHeight * winSize
		//$('.main').height(winHeight);

		// 디바이스별 해상도에 따라 비율 맞추기  
		$('body').addClass('on');
		$('body').addClass('init');
		
	});

	// 가로세로 전환 처리
	$(window).bind("orientationchange", function(e) {
		var orientation = window.orientation;

		// 메인배경 : 메타720에서 가로 리사이즈 왔다갔다할 때 깨져보여서 딜레이 줌
		if (window.orientation == 0) {
			$('body').removeClass('land');
			$('body').removeClass('init');
			setTimeout(function() {
				$(window).trigger('resize')
				$('body').addClass('init');
			}, 300)
		} else {
			$('body').removeClass('init');
			setTimeout(function() {
				$('body').addClass('land');
				$('body').addClass('init');
			}, 300)
		}
	});
	
	//메인체크
	if(document.getElementById('main')){
		var playMain = document.getElementById("bgMain");
		// Playing event
		var isPlaying = function(e) {
			$('.bgVideo').hide();
		};
		$('html').addClass('onePage');
		playMain.addEventListener("playing", isPlaying, false);
		
		$('.footer').addClass('white');
	}
	
	$('.hamburger').on('click', function(){
		$('.gnb').toggleClass('open');
		$('.gnb .inner').fadeToggle(300);
	})
	
	function geSlideDataIndex(swiper){
	    var activeIndex = swiper.activeIndex;
	    var slidesLen = swiper.slides.length;
	    if(swiper.params.loop){
	        switch(swiper.activeIndex){
	            case 0:
	                activeIndex = slidesLen-3;
	                break;
	            case slidesLen-1:
	                activeIndex = 0;
	                break;
	            default:
	                --activeIndex;
	        }
	    }
	    return  activeIndex;
	}
	
	$(document).ready(function(){
		var giftSlide = new Swiper('.giftSlide', {
			loop: true,
            prevButton: '.btn-prev',
            nextButton: '.btn-next',
			onSlideChangeStart: function(swiper){
				setTimeout(function(){
					$('.giftSlideDeco > div').removeClass('on').eq(geSlideDataIndex(swiper)).addClass('on');
				},200)
			}
        });
		
		var event3Slide = new Swiper('.event3Slide', {
			loop: true,
			pagination: '.event3Page',
			paginationClickable: true
        });
	});
	
	// 미디어
	$('.media .boxCont > div.no2 li').on('click', function(){
		var idx = $(this).data('illust');
		
		mainPopOpen('illust');
		$('.mainPop .illustWrap').html('<img src="./images/media/illust'+ idx +'.jpg">')
		
	})
	
	$(window).load(function(){
		$('.media').removeClass('anime-ready');
	})
	
	// 음성파일 재생
	$('.btn-chara').on('click', function(){
		var dataValue = $(this).children('a').data('mp3');
		var playVoice = document.getElementById("chaVoice");
		$('#chaVoice').attr('src', 'http://pb.makeulike.co.kr/pb/2018/1811-priconne/images/character/'+ dataValue +'.mp3');
		playVoice.play();
	})
	
	// 캐릭터
	
});


//팝업오픈 스크롤방지
function scrollOff(){
	//$('html').addClass('popOpen');
	$('html').css('overflow-y','hidden');
}

//팝업오픈 스크롤해제
function scrollOn(){
	//$('html').removeClass('popOpen');	
	$('html').css('overflow-y','auto');
}

//영상팝업 열기
function mainPopOpen(movieId){
	scrollOff();
	if(movieId == "illust"){
		$('.mainPop .popIn').addClass('illust');
	} else {
		$('.mainPop #videoplayer').attr('src','https://www.youtube.com/embed/'+movieId+'?rel=0&amp;autoplay=1&amp;showinfo=0')
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
	scrollOn();
	$('.mainPop .popIn').removeClass('illust');
	$('.mainPop .illustWrap img').attr('src','');
	$('.mainPop #videoplayer').attr('src','');
	$('.mainPop').hide();
}
