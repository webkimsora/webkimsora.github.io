//TweenMax.to(target, duration, {vars});

var $slideWrap = $('.sliderContainer')
var $btnPrev = $('.btnPrev');
var $btnNext = $('.btnNext');
var $slides = $(".slider");
var $currentSlide = $slides.first()

$btnNext.on('click', goToNextSlide);
$btnPrev.on('click', goToPrevSlide);

function goToPrevSlide() {
	if($currentSlide.prev().length){
		slideMove($currentSlide.prev())
	}
	
	
}

function goToNextSlide() {
	if($currentSlide.next().length){
		slideMove($currentSlide.next())
	}
}

function slideMove($slide) {
	$currentSlide = $slide;
	$slides.removeClass('active');
	$slide.addClass('active');
	
	if($('.slider').first().hasClass('active')){
		$btnPrev.hide();
	} else {
		$btnPrev.show();
	}
	
	if($('.slider').last().hasClass('active')){
		$btnNext.hide();
	} else {
		$btnNext.show();
	}
	
	TweenMax.to($slideWrap, .5, {
		xPercent : -100 * $slide.index(),
		onComplete : function(){
			console.log('이동끝')
		}
	})
}

/*
;(function(){
	var $sliderIdx = $('.slider.active').index();
	$(document).ready(function(){
		var sliderWidth = $('.slider').width();
		
		$('.btnPrev').on('click', function(){
			$('.slider.active').removeClass('active').prev('.slider').addClass('active');
			
			TweenMax.to(".sliderWrap .container", .8, {
				xPercent : 100,
				delay: 0.2,
				className: "+=active",
				onComplete: function(){
					console.log($sliderIdx)
				}
			})
		})
		
		$('.btnNext').on('click', function(){
			$('.slider.active').removeClass('active').next('.slider').addClass('active');
			
			TweenMax.to(".sliderWrap .container", .8, {
				xPercent : -100,
				delay: 0.2,
				className: "-=active",
				onComplete: function(){
					console.log($sliderIdx)
				}
			})
		})
	})
}());
*/