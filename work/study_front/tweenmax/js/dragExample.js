var dial = document.getElementById("dial");
var dial2 = document.getElementById("dial2");

function dialSpin(){
	Draggable.create(dial, {type:"rotation", throwProps:true});
}

$(document).ready(function(){
	Draggable.create(dial, {
		type:"rotation", 
		//type:"top,left" | "rotation" |"scroll" | "x" | "y" | "top" | "left" | "scrollTop" | "scrollLeft"
		throwProps:true,
  		//bounds:{minRotation:0, maxRotation:360},
  		bounds:{minRotation:0, maxRotation:360},
		onDrag:function() {
			$('.rotation').html(this.rotation);
			$('.loop').html(parseInt(this.rotation/360));
		},
		onDragEnd:function() {
			TweenMax.to(".spinWrap",1,{
				alpha:0, 
				y: -100, 
				onComplete: function(){
					$(".spinWrap").hide();
					TweenMax.to("#my-section", 1, {
						top: 0,
						right: 0,
						alpha: 1,
						rotation:30, 
						scaleX:0.8,
						zIndex: 90
					})
				}
			})
		}
	});
		//liveSnap: function(value){ // spin도중
			//return Math.round(value/90) * 90;
			//console.log(value)
		//}
		/*
		- CSS Plugin
		트윈맥스 반복 구현시 타겟 위치 중심을 기점으로만 구현이 되는데,
		CSS Plugin을 이용해서 했을 경우 
		마지막 구현 기점에서 다음 트윈맥스 모션이 구현된다.
		ex) https://greensock.com/docs/Plugins/CSSPlugin
	});
	
	Draggable.create(dial2, {
		type:"top,left", 
		//type:"top,left" | "rotation" |"scroll" | "x" | "y" | "top" | "left" | "scrollTop" | "scrollLeft"
		throwProps:true,
		//bounds:{minX:0, maxX:500, minY:-300, maxY:300},
		
		liveSnap:{
	        points: function(point) {
	            //if it's within 100px, snap exactly to 500,250
	            var dx = point.x - 500;
	            var dy = point.y - 250;
	            if (Math.sqrt(dx * dx + dy * dy) < 100) {
	                return {x:500, y:250};
	            }
	            return point; //otherwise don't change anything.
	        }
	    }
	});
	
	// anime SVG 사용
	var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;}; /** Inspired by coursetro.com **/

	// Refs
	var wrapCta = document.querySelector('#wrap-cta'),
	btnCta = document.querySelector('#cta'),
	content = document.querySelector('#content'),
	btnClose = document.querySelector('#close');


	// Anime.js Commons Values for SVG Morph
	var common = {
	  targets: '.polymorph',
	  easing: 'easeOutQuad',
	  duration: 600,
	  loop: false };



	// Show content
	btnCta.addEventListener('click', function () {
	  // Elements apparence
	  wrapCta.classList.remove('active');
	  content.classList.add('active');

	  // Morph SVG
	  anime(_extends({},
	  common, {
		points: [
		{ value: '215,110 0,110 186,86 215,0' }] }));


	});


	// Hide content  
	btnClose.addEventListener('click', function () {
	  // Elements apparence
	  content.classList.remove('active');
	  wrapCta.classList.add('active');

	  // Morph SVG
	  anime(_extends({},
	  common, {
		points: [
		{ value: '215,110 0,110 0,0 215,0' }] }));


	});
	
})
