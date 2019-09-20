$(function(){
	$(document).ready(function(){
		$('html').addClass('firstPage');
	/*
			skrollr.init({
				render: function(data) {
					console.log(data.curTop)
				}
			});
	*/		

	});
	
	$('.main .inner a').on('click', function(){
		
		TweenMax.to('.imgWrap', 1, {
			y:500,
			opacity: 0
		})
		TweenMax.to('.inner h2', 1, {
			y: 150,
			opacity: 0
		})
		
		var tl = new TimelineLite();
		
		tl.to(".main .background > div", 1, {
  			delay: 0.5,
			y: function(index, target) {
  				//console.log(index, target);
  				return '-' + (index + 1) * 100 + '%'
  			},
			onComplete: function(){
				$('body').addClass('second');
				$('html').removeClass('firstPage');
			}
  		});
		/*
		tl.to('.maskColor', 0.45, {
			//opacity: 1,
			onComplete: function(){
				setTimeout(function(){
					$('.maskColor').addClass('is-animated');
				},1000)
			}
		})
		*/
		/*
		tl.fromTo('.maskColor', 1, {
			delay: 1,
			opacity: 1,
			xPercent: -100
		}, {
			xPercent: 100,
			clearProps: 'xPercent',
			onComplete: function(){
				$('.maskColor').addClass('is-animated');
				$('.maskImg').addClass('is-animated');
			}
		})
		*/
	})
});



var mask_anim = {
	duration: 500,
	opacity: 1,
	origin: 'left',
	distance : '100%',
	easing   : 'ease',
	viewOffset: {bottom: 150},
	scale    : 1,
	afterReveal:function(e){
		$(e).next('.mask_anim_inner').addClass("is-animated");
		setTimeout(function(){$(e).addClass("is-animated")},200)
	}
};
var mask_anim2 = {
	duration: 500,
	opacity: 1,
	origin: 'left',
	distance : '100%',
	easing   : 'ease',
	viewOffset: {bottom: -100},
	scale    : 1,
	afterReveal:function(e){
		$(e).next('.mask_anim_inner').addClass("is-animated");
		setTimeout(function(){$(e).addClass("is-animated")},200)
	}
};
window.sr = ScrollReveal();
$(window).on('load',function($) {
	scrollAnimMain();
});
function scrollAnimMain() {
	setTimeout(function() {
		sr.reveal('.mask .mask_anim', mask_anim);
	}, 1000);
	setTimeout(function() {
		sr.reveal('#mainimg-body .mask_anim', mask_anim2);
	}, 1500);	
};