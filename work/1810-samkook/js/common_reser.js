/**
* MakeULike R&D Team
*/

$(function(){
	
	//GNB
	var aniMoving = true;
	var mainMotion = true;
	$('.navList ul li a').on('click',function(e){
		e.preventDefault();

		if(!aniMoving){
		   return false;
	   };
	   
		//메뉴 활성화
		$(this).parent().addClass('active').siblings().removeClass('active');
		
		//메뉴 이동
		var idx = $(this).parent().index();
		var idxCal =  idx == 0 ? 0 : idx * 100;
	
		 TweenMax.to('.mainScroll',.8, {x:-idxCal+'%',ease:Power4.easeOut, onCompleteParams:[idx],onComplete:aniCheck});
		 aniMoving = false;

	
	})
	
	//이동 중복방지
	function aniCheck(idx){
	   aniMoving = true;
	   switch(idx){
	   	case 0 : mainStart();
		break;
	   	case 1 : $('body').addClass('step2');
		break;
	   	case 2 : $('body').addClass('step3');
		break;
	   	case 3 : $('body').addClass('step4');
		break;
	   	case 4 : $('body').addClass('step5');
		break;
	   }
   };
   
   //메뉴 높이 설정
    function gnbHeight(){
   	 var winHeight = ($(window).height() - 212) / 4;
   	 $('.navList ul li.btn a').height(winHeight)
    };
    
    $(window).on('resize',function(){
   	 gnbHeight();
    });
    
    gnbHeight();

	

	//스크롤 이동
	$('.mainScroll').mousewheel(function(event, delta) {
		
		if($(window).height() >= 970){
			if(!aniMoving){
				return false;
			};
	
			var idx = $('.navList ul li.active').index();
			if (delta > 0) { // 위로 = 이전
	
				if(idx == 0){
					idx = 0;
				}else{
					idx = idx - 1;
				}
				
			} else {  // 아래로 = 다음
				if(idx == $('.navList ul li').length){
					idx = $('.navList ul li').length;
				}else{
					idx = idx + 1;
				}
			}
	
			$('.navList ul li').eq(idx).find('a').trigger('click');
		}
		
	});
	
	$(document).ready(function(){       
        var hname = window.location.hash;
        if(hname == "#reservation") {
            setTimeout(function(){
               $('.navList ul li').eq(1).find('a').trigger('click');
            },700);
        } else if (hname == "#intro") {
            setTimeout(function(){
           		$('.navList ul li').eq(2).find('a').trigger('click');
            },700);
        } else if (hname == "#event1") {
            setTimeout(function(){
           		$('.navList ul li').eq(3).find('a').trigger('click');
            },700);
        } else if (hname == "#event2") {
            setTimeout(function(){
           		$('.navList ul li').eq(4).find('a').trigger('click');
            },700);
        }else{
			$(window).load(function(){
				mainStart();
			})
			
		}
		
		$('body').addClass('load');
		
		setTimeout(function(){
           $('body').addClass('endMotion');
	   },2300)	
		
	});
	
	 
	function mainStart(){
        $('body').addClass('active');
		
		if(!mainMotion){
			return false;
		}
        
        start = 0;
    	idxTop = 0;
    	idxLeft = 0;
    	idx = 0;
    	idx2 = 0;

    	function repeat(){
    		$('.swordBox .img').css({'left':-idxLeft,'top':-idxTop});
    		idxLeft = idxLeft + 501;
    		idx++;
    		idx2++;

    		if(idx == 7){
    			idxLeft = 0;
    			idxTop = idxTop + 934;
    			idx = 0;
    		}

    		if(idx2 == 21){
    			idxTop = 0;
    			idx2 = 0;
                clearTimeout(start)
    		}
    	};

    	function startMotion(){
    		clearTimeout(start)
    		start = setInterval(repeat,90)
    	}

        setTimeout(function(){
            startMotion();
        },1700)

	   mainMotion = false;
	}


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
	 arrows: true,
	 fade: false,
	 infinite: true,
	 draggable: false,
	 asNavFor: '.slider-nav'
   });
   $('.slider-nav').slick({
	 slidesToShow: 10,
	 slidesToScroll: 1,
	 asNavFor: '.slider-for',
	 infinite: false,
	 dots: false,
	 centerMode: false,
	 draggable: false,
	 focusOnSelect: true
   });
   
   //게임소개 슬라이드
   $('.slider01').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: true,
	fade: false,
	infinite: true,
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
   
})
 
 
//사전예약 바로가기
function moveReserv(){
	$('.navList ul li').eq(1).find('a').trigger('click');
}


//컨텐츠팝업-열기
function contentOpen(el){
	
	scrollOff();
	
	var parent = $('.contentPop');

	parent.show();
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

//팝업유지 - 사전예약 번호 잘못입력
function popVd01(){
	$('.cont02').hide();
	$('.sideBtn').hide();
	$('.cont12').show();
};

//팝업유지 - 사전예약 번호 잘못입력 되돌아가기
function popVd02(){
	$('.cont12').hide();
	$('.cont02').show();
	setTimeout(function(){
		$('.sideBtn').show();
	},50)
	
};


//컨텐츠팝업-전체닫기
function contentClose(){
	scrollOn()
	
	$('.contentPop').hide(); 
	$('.contentPop .popIn').css({ 
		'visibility' : 'hidden', 
		'marginTop' : 0
	})
};

//컨텐츠팝업-해당닫기
function onlyContentClose(el){
	$(el).hide();
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
	
	$('.youtubePop #youtubeMovie').append('<iframe width="560" height="315" src="https://www.youtube.com/embed/o4--epeL2hQ?rel=0&amp;autoplay=1&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>')
	$('.youtubePop').show();
}

//유투브팝업 iframe-닫기
function youtubeIframeClose(){
	scrollOn()
	$('.youtubePop #youtubeMovie').empty();
	$('.youtubePop').hide();
}

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
*/
/*
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var movieID = '-zabRKMQ88c';

var mainVideo;
var youtube;

function onYouTubeIframeAPIReady() {
	mainVideo = new YT.Player('mainVideo', {
		height: '525',            // <iframe> 태그 지정시 필요없음
		width: '1000',             // <iframe> 태그 지정시 필요없음
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
		height: '525',            // <iframe> 태그 지정시 필요없음
		width: '1000',             // <iframe> 태그 지정시 필요없음
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
