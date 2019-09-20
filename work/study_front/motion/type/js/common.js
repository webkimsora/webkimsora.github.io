
$(function(){
	
	//full Page
	$('.sectionWrap').fullpage({
		anchors: ['section01', 'section02', 'section03', 'section04', 'section05', 'section06'],
		menu: '.gnb',
		responsiveHeight: 900
	});
	
	
	/*  bxSlider 기본세팅
	$('.mainSubSlideBox ul').bxSlider({
	auto: true,
	autoControls: true,
	onSlideAfter: function(){
	setTimeout(function(){
	$('.mainSubSlideBox .bx-start').trigger('click');
},1000);
}
});
*/

});

/*

document.querySelector('.toggle').addEventListener('click', function() {
	typed.toggle();
});
document.querySelector('.stop').addEventListener('click', function() {
	typed.stop();
});
document.querySelector('.start').addEventListener('click', function() {
	typed.start();
});
document.querySelector('.reset').addEventListener('click', function() {
	typed.reset();
});
document.querySelector('.destroy').addEventListener('click', function() {
	typed.destroy();
});
document.querySelector('.loop').addEventListener('click', function() {
	toggleLoop(typed);
});

*/

$(window).load(function(){
	var typed2 = new Typed('#typed2', {
		strings: ['기본 한글자씩 타이핑 입니다. Nice!'],
		typeSpeed: 50,
	    backSpeed: 0,
	    backDelay: 500,
	    startDelay: 1000,
	});
	
	$('.re01').on('click',function(){
		typed2.reset();
		typed2.start();
	})

	new Typed('#typed3', {
		strings: ['타이핑을 반복해서 보여줍니다. Good!'],
		typeSpeed: 50,
		backSpeed: 50,
		smartBackspace: true,
		loop: true
	});
	
	new Typed('#typed4', {
		strings: ['여러문장을 보여줍니다','2번째 문장을 타이핑합니다.','WOW 3번째 문장입니다.'],
		typeSpeed: 50,
		backSpeed: 50,
		smartBackspace: true,
		loop: true
	});
	

	
	new Typed('#typed5', {
		strings: ['1. 문장을 랜덤으로 출력합니다.', '2. 문장입니다.', '3번 문장이 나옵니다. '],
		typeSpeed: 0,
		backSpeed: 30,
		shuffle: true,
		cursorChar: '_',
		smartBackspace: false,
		loop: true
	});
	
	new Typed('#typed6', {
		strings: ['`문장별로 출력합니다.`\n`한번에 문장이 나옵니다.`\n`바로바로 문장이 나옵니다.`'],
		typeSpeed: 200,
		backSpeed: 10,
		loop: true
	});
	

	function prettyLog(str) {
		console.log('%c ' + str, 'color: green; font-weight: bold;');
	}
	
	function toggleLoop(typed) {
		if (typed.loop) {
			typed.loop = false;
		} else {
			typed.loop = true;
		}
	}
})


