
	var gameState = ''; // 게임상태

	var SetTime; // 최초 설정 시간(기본 : 초)
	var life; // 가능 횟수
	var rightVar; // 해당판 정답 갯수
	var score; // Score
	var totalColVar; // 총 정답 갯수 

	var timer;
	
	
	function gameOption(){ // 게임옵션
		SetTime = 90; 
		life = 5;
		rightVar = 0;
		score = 0;
		totalColVar = 0;
	}


	function lifeView() {document.all.lifeVar.innerHTML = life;}; //생명 view
	function scoreView() {document.all.score.innerHTML = score;}; //score view
	function nowCollectView() {document.all.nowCollect.innerHTML = totalColVar;}; //총 맞춘 개수 view

	// 게임 시작
	function gameStart(){
		if(gameState == ''){
			gameState = 'start';
		} else {
			gameReset();
		}
		
		gameOption();
		
		TimerStart();
		lifeView();
		
		$('.gameWrap').addClass('start');
		$('.btnStart').css('visibility','hidden');
	}

	// 게임 종료
	function gameOver(){
		gameState = '';
		alert('GAME OVER');
		clearInterval(tid);
	}

	// 게임 reset
	function gameReset(){
		gameOption();
		
		lifeView();
		scoreView();
		nowCollectView();
		
		$('.imgWrap li').removeClass('on').eq(0).addClass('on');
		$('.colImg').removeClass('active');
		$('.nowCollect li').removeClass();
		$('.btnStart').css('visibility','visible');
		clearTimeout(tid);
	}

	// 시간제한
	function msg_time() {	// 1초씩 카운트
		timer = SetTime;	// 남은 시간 계산
		
		var msg = SetTime;
		document.all.ViewTimer.innerHTML = msg;		// div 영역에 보여줌 
		
		if (SetTime > 0) {// 시간이 종료 되었으면..
			SetTime--; // 1초씩 감소
		} else {
			gameOver();
		}
	}
	function TimerStart(){ tid = setInterval('msg_time()',1000) };

	// LIFE 횟수
	function lifeChance() {
		life--;
		score -= 5;
		
		if(life <= 0){
			life = 0;
			gameOver();
		}
		
		if(score <=0){
			score = 0;
		}
		
		lifeView();
		scoreView();
	}

	// 정답 클릭시
	function collectCount() {
		if(gameState == '') return;
		
		$('.nowCollect li').eq(rightVar).addClass('active');
		
		rightVar++;
		totalColVar++;
		
		score += 10;
		scoreView();
		nowCollectView();
		
		//console.log(rightVar);
		
		if(rightVar == 3){
			setTimeout(function(){
				nextGame();
			},500);
			//alert('다 맞췄습니다!')
		}
	}

	// 다음 게임으로 넘어가기 (NEXT)
	function nextGame(){
		rightVar = 0;
		nowCollectView();
		$('.nowCollect li').removeClass();
		
		var $onImg = $('.imgWrap > li.on');
		var idx = $onImg.index();

		if(idx == 2) { // 다 깼다!
			alert('Congraturation!');
			clearInterval(tid);
		} else {
			$onImg.removeClass('on').next().addClass('on');
		}
	}

	
;(function(){
	// 클릭 이벤트
	$(document).ready(function(){
		$('.colImg').on('click', function(){
			
			if(gameState == '') return;
			
			var $this = $(this);
			var collect = $this.data('collect');
			
			if($this.hasClass('active')) return; // 맞춘거 클릭시 return
			
			$this.addClass('active');
			$this.parents('.collectWrap').find($('[data-collect='+ collect +']')).addClass('active');
			
			collectCount();
		})
		
		$('.imgWrap > li').click(function(e) {
			if($(e.target).hasClass('colImg')){
				
			} else {
				
				if(gameState == '') return;
				
				x = e.pageX;
				y = e.pageY;
				//alert('x좌표 :'+ x +', y좌표 :'+ y);
				
				$('.wrong').css({'top':y, 'left':x});
				$('.wrong').addClass('on');
				
				//$(e.target).addClass('click');
				lifeChance();
			}
		}).mouseup(function(e){
			setTimeout(function(){
				$('.wrong').removeClass('on');
				//$(e.target).removeClass('click');
			},100);
		})
		
	})
}());