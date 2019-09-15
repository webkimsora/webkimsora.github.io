$(function(){

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
	
	$(window).on("resize", function(){
		resizeMovie();
	}).trigger("resize");

	$(document).ready(function(){
		/*
		skrollr.init({
			render: function(data) {
				//console.log(data.curTop)
			}
		});
		*/
		
		var rellax = new Rellax('.deco', {
    		speed: 7
		});
		
		window.sr = ScrollReveal();
		
		sr.reveal('.deco', {
			distance: '50px',
			origin: 'bottom',
			opacity: 1,
			duration: 2000
		});
		
		var anime = {
			distance: '100%',
			origin: 'left', 
			duration: 1000,
			easing   : 'ease',
			viewOffset: {bottom: 100},
			afterReveal: function(el){
				$(el).next('.mask_anim_inner').addClass("is-animated");
				setTimeout(function(){$(el).addClass("is-animated")},200);
			}
		};
		
		var anime2 = {
			distance: '100%',
			origin: 'left', 
			duration: 1000,
			easing   : 'ease',
			viewOffset: {bottom: -100},
			afterReveal: function(el){
				$(el).next('.mask_anim_inner').addClass("is-animated");
				setTimeout(function(){$(el).addClass("is-animated")},200);
			}
		}
		
		setTimeout(function(){
			$('.foo').addClass('on');
			sr.reveal('.background', anime);
		},1000);
		
		setTimeout(function(){
			$('.foo2').addClass('on');
			sr.reveal('.background2', anime2);
		},1500);
	})
	
	$(document).on("scroll", function () {
		if ($(document).scrollTop() > 100) {
			$("header").addClass("small");
		} else {
			$("header").removeClass("small");
		}
	});
	
	$(window).on('beforeunload', function(){
		$(window).scrollTop(0);
	});
	
});