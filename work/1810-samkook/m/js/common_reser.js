/**
* MakeULike R&D Team
*/

// 디바이스별 해상도에 따라 비율 맞추기 
//사이즈별 확대 
var zoomUtils = function(opts){
	var defaults = {
		psdSize : 720
	};
	var options = $.extend(defaults, opts);

	return $('body').css('zoom', ($(window).width() / options.psdSize).toFixed(5));
};

;(function(){
	$(window).bind('load resize', function(){
		zoomUtils({psdSize: 720})
	})

	$(document).ready(function(){
		zoomUtils({psdSize: 720})
		 $('body').addClass('on init');

	})
})();


// 파이어폭스시 720으로 고정
if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
	setTimeout(function(){
		$('#meta').attr('content', 'width=720, minimal-ui,user-scalable=no');
	},300)
}


// 화면회전 방지
$(window).on("orientationchange",function(){
	if(window.orientation == 0) {
		$('body').removeClass('land init');
		setTimeout(function(){
			$(window).trigger('resize')
		},300)
	} else {
		setTimeout(function(){
			$('body').addClass('land init');
		},300)
	}
});



$(function(){
	/* 
	Validator
	*/
	
	$(this).find('.form').cmmValidator();
	$('.formClearBtn').click(function() {
		$('.form').cmmAjax('clear');
	});
	
	//게임소개 탭
	$('.gameTab ul li a').on('click',function(){
		var idx = $(this).parent().index();
		if(idx != 0){
			$('.introArea').addClass('no2');
		}else{
			$('.introArea').removeClass('no2');
		}
		
		$('.tabSection > div').eq(idx).css({'opacity':1,'visibility':'visible','position':'relative'}).siblings().css({'opacity':0,'visibility':'hidden','position':'absolute'})
	})
	
	
	//캐릭터소개 슬라이드
	$('.slider-for').slick({
	 slidesToShow: 1,
	 slidesToScroll: 1,
	 arrows: false,
	 fade: false,
	 infinite: true,
	 asNavFor: '.slider-nav'
   });
   $('.slider-nav').slick({
	 slidesToShow: 10,
	 slidesToScroll: 1,
	 asNavFor: '.slider-for',
	 dots: false,
	 focusOnSelect: true
   });
   
   //게임소개 슬라이드
   $('.slider01').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: true,
	fade: false,
	infinite: true,
	vertical: true,
	asNavFor: '.sliderNav01'
   });
   $('.sliderNav01').slick({
	slidesToShow: 4,
	slidesToScroll: 1,
	asNavFor: '.slider01',
	arrows: false,
	infinite: true,
	dots: false,
	centerMode: false,
	draggable: false,
	focusOnSelect: true
   });
   
   /*
   $('.slider02').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	fade: false,
	infinite: false,
	asNavFor: '.sliderNav02'
   });
   $('.sliderNav02').slick({
	slidesToShow: 3,
	slidesToScroll: 1,
	asNavFor: '.slider02',
	infinite: false,
	dots: false,
	centerMode: false,
	draggable: false,
	focusOnSelect: true
   });
   
	  
   $('.slider03').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	fade: false,
	infinite: false,
	asNavFor: '.sliderNav03'
   });
   $('.sliderNav03').slick({
	slidesToShow: 3,
	slidesToScroll: 1,
	asNavFor: '.slider03',
	infinite: false,
	dots: false,
	centerMode: false,
	draggable: false,
	focusOnSelect: true
   });
	  
   $('.slider04').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	fade: false,
	infinite: false,
	asNavFor: '.sliderNav04'
   });
   $('.sliderNav04').slick({
	slidesToShow: 3,
	slidesToScroll: 1,
	asNavFor: '.slider04',
	infinite: false,
	dots: false,
	centerMode: false,
	draggable: false,
	focusOnSelect: true
   });
   
   var activeSlide = 0;
   $('.arrowSlide > div.left').on('click',function(){
	   if(activeSlide == 0){
		   activeSlide = 3;
		   slideShow(activeSlide)

	   }else{
		   activeSlide = activeSlide -1;
		   slideShow(activeSlide)
	   }
   })
   $('.arrowSlide > div.right').on('click',function(){
	   if(activeSlide == 3){
		   activeSlide = 0;
		   slideShow(activeSlide)
	   }else{
		   activeSlide = activeSlide + 1;
		   slideShow(activeSlide);
	   }
   })
   */
   $('.gameIntro ul li').on('click',function(){
	   var idx = $(this).index();
	   $('.slider01').slick('slickGoTo', idx, true);
	   $('.popSlide').css({'opacity':1,'visibility':'visible','zIndex':500});
   })
   
   $('.popSlide .popIn .closeBtn').on('click',function(){
	   $('.popSlide').css({'opacity':0,'visibility':'hidden','zIndex':0});
	   
   })
   
   function slideShow(idx){
		$('.tabSlideWrap .box').eq(idx).css({'opacity':1,'visibility':'visible','position':'relative'}).siblings().css({'opacity':0,'visibility':'hidden','position':'absolute'});
   }
	
	// @ 스크롤

	$('.hamburger').click(function() {
		$(this).toggleClass('is-opened');
		$('.header').toggleClass('on')
	})
	
    $(window).scroll(function(){    
        var winSize = ($(window).width() / 720).toFixed(5)
        winSize = 100/Number(winSize*100)    
        var winScroll = $(window).scrollTop();
        winScroll = winScroll*winSize

        var winHeight= $(document).scrollTop()  

        $.each($('.page'), function(idx, item) {            
            var position = $('.page').eq(idx).attr('data-height');
            //position = position.replace("px","");
            position = (position) * (($(window).width() / 720).toFixed(5));
            var positionPar = position;
			
            if(positionPar  <= winHeight + 50) {
				if(idx == 0){
		        	$('.navList li').removeClass('active');
				} else {
	                $('.navList li').removeClass('active');
	                $('.navList li').eq(idx-1).addClass('active');
				}
            }
        });
    }); 

    $('.navList li').on('click',function(e){
        var idx = $(this).index();
        var position = $('.page').eq(idx+1).attr('data-height');
        e.preventDefault();
		
		$('.hamburger').trigger('click');

        $('#viewport').css({'top':'','position':'relative'});        
        
        position = position.replace("px","");
        position = (position) * (($(window).width() / 720).toFixed(5));
        var positionPar = position;
		console.log(positionPar)
        
		$('.navList li').removeClass('active');
        $(this).addClass('active');

        $('html,body').stop().animate({scrollTop:positionPar},500,function(){
        });
        return false;    
    })    

	var iframe = document.getElementById('youtubeIframe');
	console.log(iframe);
	
	function contr(s){
		switch (s) {
			case 'play':
				iframe.contentWindow.postMessage('{"event" : "command","func" : "playVideo","args":""}', '*');
				break;
			case 'stop':
				iframe.contentWindow.postMessage('{"event" : "command","func" : "stopVideo","args":""}', '*');
				break;
			case 'pause':
				iframe.contentWindow.postMessage('{"event" : "command","func" : "pauseVideo","args":""}', '*');
				break;
			default:
				
		}
	}
	
	$(document).ready(function(){       
	   var hname = window.location.hash;
	   if(hname == "#reservation") {
		   setTimeout(function(){
			  $('.navList ul li').eq(0).trigger('click');
			   menuClose();
		   },700);
	   } else if (hname == "#intro") {
		   setTimeout(function(){
			   $('.navList ul li').eq(1).trigger('click');
				menuClose();
		   },700);
	   } else if (hname == "#event1") {
		   setTimeout(function(){
			   $('.navList ul li').eq(2).trigger('click');
				menuClose();
		   },700);
	   } else if (hname == "#event2") {
		   setTimeout(function(){
			   $('.navList ul li').eq(3).trigger('click');
				menuClose();
		   },700);
	   }
	});


})

//사전예약 바로가기
function moveReserv(){
	$('.navList ul li').eq(0).trigger('click');
	$('.hamburger').trigger('click');
}

//컨텐츠팝업-열기
function contentOpen(el){
	
	scrollOff();
	
	var parent = $('.contentPop')
	
	parent.show();
	parent.find(el).show().siblings().hide();
	
	var pop = parent.find('.popIn');
	
	setTimeout(function(){
		pop.css({ 
			'visibility' : 'visible', 
			'marginTop' : - (pop.outerHeight()/2)
		});
	},10)
};

//컨텐츠팝업-닫기
function contentClose(){
	scrollOn()
	
	$('.contentPop').hide(); 
	$('.contentPop .popIn').css({ 
		'visibility' : 'hidden', 
		'marginTop' : 0
	})
};


//경고팝업-열기
function alertOpen(el,popClass,width,height){
	scrollOff();
	
	$('.alertText').html(el);
	$('.alertText').css({
		'width':width,
		'height':height
	})
	$('#popupAlert').addClass(popClass).show()
	
	var pop = $('#popupAlert .popIn');
	
	setTimeout(function(){
		pop.css({ 
			'visibility' : 'visible', 
			'marginTop' : - (pop.outerHeight()/2)
		});
	},10)
};

//경고팝업-닫기
function alertClose(){
	scrollOn()
	
	$('#popupAlert').hide().removeClass();
	
	$('.alertText').css({
		'width':'auto',
		'height':'auto'
	})
	
	$('#popupAlert .popIn').css({ 
		'visibility' : 'hidden', 
		'marginTop' : 0
	})
};

//유투브팝업 iframe-열기
function youtubeIframeOpen(id){
	scrollOff();
	
	//$('.youtubePop #youtubeMovie').append('<iframe width="560" height="315" src="https://www.youtube.com/embed/o4--epeL2hQ?rel=0&amp;autoplay=1&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>')
	$('.youtubePop').show();
	
	setTimeout(function(){
		contr('play');
	},2000);
}

//유투브팝업 iframe-닫기
function youtubeIframeClose(){
	scrollOn()
	//$('.youtubePop #youtubeMovie').empty();
	$('.youtubePop').hide();
}

/*
var iframe;

$(document).ready(function(){
	iframe = $('.youtubePop #youtubeMovie iframe')[0]
})
*/

//유투브팝업-열기
function youtubeOpen(id){
	scrollOff();
	youtube.loadVideoById(id, 0, "hd720")
	$('.youtubePop').show();
}

//유투브팝업-닫기
function youtubeClose(){
	scrollOn()
	youtube.stopVideo();
	$('.youtubePop').hide();
}

//팝업오픈 스크롤방지
function scrollOff(){
	$('html').css('overflow-y','hidden');
}

//팝업오픈 스크롤해제
function scrollOn(){
	$('html').css('overflow-y','auto')
}


/*
Youtube API

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var movieID = 'o4--epeL2hQ';

var mainVideo;
var youtube;

function onYouTubeIframeAPIReady() {
	mainVideo = new YT.Player('mainVideo', {
		height: '325',            // <iframe> 태그 지정시 필요없음
		width: '720',             // <iframe> 태그 지정시 필요없음
		videoId: movieID,   // <iframe> 태그 지정시 필요없음
		playerVars: {             // <iframe> 태그 지정시 필요없음
			controls: '0',
			showinfo: '0',
			rel:'0'
		},
		events: {
			'onReady': onPlayerReady,               // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
			'onStateChange': onPlayerStateChange    // 플레이어의 상태가 변경될 때마다 실행
		}
	});
	youtube = new YT.Player('youtubeMovie', {
		height: '325',            // <iframe> 태그 지정시 필요없음
		width: '720',             // <iframe> 태그 지정시 필요없음
		videoId: movieID,   // <iframe> 태그 지정시 필요없음
		playerVars: {             // <iframe> 태그 지정시 필요없음
			controls: '0',
			showinfo: '0',
			rel:'0'
		},
		events: {
			'onReady': onPlayerReady,               // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
			'onStateChange': onPlayerStateChange    // 플레이어의 상태가 변경될 때마다 실행
		}
	});
}


function onPlayerReady(event) {
	console.log('onPlayerReady 실행');
	//event.target.playVideo();
}
var playerState;
function onPlayerStateChange(event) {
	playerState = event.data == YT.PlayerState.ENDED ? '종료됨' :
	event.data == YT.PlayerState.PLAYING ? '재생 중' :
	event.data == YT.PlayerState.PAUSED ? '일시중지 됨' :
	event.data == YT.PlayerState.BUFFERING ? '버퍼링 중' :
	event.data == YT.PlayerState.CUED ? '재생준비 완료됨' :
	event.data == -1 ? '시작되지 않음' : '예외';
	
	//console.log('onPlayerStateChange 실행: ' + playerState);
	
	//종료시 실행
	if(event.data == YT.PlayerState.ENDED){
		//end();
	}
}
*/
