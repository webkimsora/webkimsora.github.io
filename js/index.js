$(function(){
	$(document).ready(function(){
		$('body').on('scroll touchmove mousewheel', function(event) {
			event.preventDefault();
			event.stopPropagation();
			return false;
		});

		$('.step1').bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function (e) {
			$('.step2').addClass('active');
			setTimeout(function(){
				$('.step3').addClass('active');
				$('body').off('scroll touchmove mousewheel');
			},500)
		});
	})
	
	$(window).on('beforeunload', function(){
		$(window).scrollTop(0);
	});
	
	/*
	$('.imgSlot.no1').bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function (e) {
		$('.imgSlot.no2').addClass('on').siblings('.imgSlot').removeClass('on');
	});	
	$('.imgSlot.no2').bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function (e) {
		$('.imgSlot.no3').addClass('on').siblings('.imgSlot').removeClass('on');
	});	
	$('.imgSlot.no3').bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function (e) {
		$('.imgSlot.no1').addClass('on').siblings('.imgSlot').removeClass('on');
	});	
	*/
});