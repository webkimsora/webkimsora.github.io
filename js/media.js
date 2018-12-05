$(function(){
	//
	$('.media .boxMenu li').on('click', function(){
		var idx = $(this).index();
		$(this).siblings('li').removeClass('active');
		$(this).addClass('active');
		$('.media .boxCont > div').removeClass('active').eq(idx).addClass('active');
	})
	
	//
	$('.media .boxCont > div.no2 li').on('click', function(){
		var idx = $(this).data('illust');
		
		mainPopOpen('illust');
		$('.mainPop .illustWrap').html('<img src="./images/media/illust'+ idx +'.jpg">')
		
	})
	
	$(window).load(function(){
		$('.media').removeClass('anime-ready');
	})
});


//팝업오픈 스크롤방지
function scrollOff(){
	$('html').addClass('popOpen');
}

//팝업오픈 스크롤해제
function scrollOn(){
	$('html').removeClass('popOpen');
}

//영상팝업 열기
function mainPopOpen(movieId){
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
	$('.mainPop .popIn').removeClass('illust');
	$('.mainPop .illustWrap img').attr('src','');
	$('.mainPop #videoplayer').attr('src','');
	$('.mainPop').hide();
}
