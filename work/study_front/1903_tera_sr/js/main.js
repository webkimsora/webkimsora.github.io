$(function(){
	
	$('.background').addClass('on');
	setTimeout(function(){
		$('.chaWrap').addClass('on');
		$('.chaWrap .item.no1').addClass('active');
		$('.chaName').addClass('on');
	}, 300)
	
	var chaWrapSlick = $('.chaWrap').slick({
		fade: true,
		dots: false,
		infinite: false
	});
		
	$('.chaWrap').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$('.chaWrap .item').removeClass('active').eq(nextSlide).addClass('active');
		setTimeout(function(){
			$('.chaName li').removeClass('on').eq(nextSlide).addClass('on');
		},200)
	});
	
	$('.chaName li').on('click', function(){
		var idx = $(this).index();
		$('.chaWrap').slick('slickGoTo', idx);
	})		
		
	
	//마우스휠
	$('.character').mousewheel(function(event, delta) {
		var idx = $('.chaName ul li.on').index();
		if (delta > 0) { // 위로 = 이전
			if(idx == 0){
				idx = 0;
			}else{
				idx = idx - 1;
			}
		} else {
			if(idx == $('.chaName ul li').length){
				idx = $('.chaName ul li').length;
			}else{
				idx = idx + 1;
			}
		}
		$('.chaName ul li').eq(idx).find('a').trigger('click');
	})
	
		
	
});