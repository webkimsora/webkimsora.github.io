
		
	// 게임상태
	var gameState = '';
	
	// 열린 카드 src
	var openCardId = ''; //첫번째 열린 카드
	var openCardId2 = ''; //두번째 열린 카드
	
	// 난수 함수 생성 -> 난수란 정의된 범위내에 무작위로 추출된 수 (RANDOM)
		// min (포함) 과 max (포함) 사이의 임의 정수를 반환 (+1이 없을경우 max(불포함))
		// Math.round() 를 사용하면 고르지 않은 분포를 얻게된다!
	function generateRandom(min, max){
		var ranNum = Math.floor(Math.random() * (max - min + 1)) + min; //Math.floor(number) 나머지수 버림
		return ranNum;
	}
	
	
	var cards; // 카드 목록
	var score = 0; // 점수
	var collectCard = 0; // 맞춘 카드 갯수
	var startState = false;
	var SetTime = 30;
	var timer;
	

	// 시간제한
	function msg_time() {	// 1초씩 카운트
		timer = SetTime;	// 남은 시간 계산
		
		var msg = SetTime;
		//document.all.ViewTimer.innerHTML = msg;		// div 영역에 보여줌 
		$('#ViewTimer').html(SetTime);
		
		if(startState == true){
			SetTime--; // 1초씩 감소
		}
			
		if (SetTime < 0) {
			startState = false;
			SetTime = 0;
			alert('GAME OVER');
			clearInterval(tid);
		}
	}

	function TimerStart(){ tid = setInterval('msg_time()',1000) };
	
	
	// 카드 배치
	function setTable(){
		cards = [
			'1.jpg', '1.jpg', //거북왕
			'2.png', '2.png', //잉어킹
			'3.png', '3.png', //푸린
			'4.png', '4.png', //별가사리
			'5.png', '5.png', //어니부기
			'6.jpg', '6.jpg', //이상해씨
			'7.png', '7.png', //꼬부기
			'8.png', '8.png', //피카츄
			'9.jpg', '9.jpg', //파이리
			'10.jpg', '10.jpg' //고라파덕
		];
		
		var cardTableCode = '<tr>';
		
		for(var i = 0; i < 20; i++) {
			if(i > 0 && i % 5 == 0){ // 나누기로 행 지정
				cardTableCode += '</tr><tr>';
			}
			
			var idx = generateRandom(0, 19-i);
			var img = cards.splice(idx,1); // 배열삭제
			//console.log(idx);
			
			cardTableCode += '<td id="card' + i +'"><div class="front"><img src="./images/' + img + '"></div><div class="back"><span></span></div></td>';
		}
		cardTableCode += '</tr>'; // for문 조건 끝나서 위 함수 실행안됨-> 태그 닫아줌
		$('#cardTable').html(cardTableCode);
	}
	
	// 카드 가리기
	function hiddenCards() {
		$('#cardTable td img').hide();
		$('#cardTable td span').show();
	}
	
	// 게임 시작
	function gameStart(){
		var sec = 6; // start 대기 시간
		
		if(gameState == ''){
			gameState = 'already';
		}
		
		gameReset();
		setTable();
		$('.back').hide();
		$('.btnStart').css('visibility','hidden');
		//hiddenCards(); 카운트다운 후에 적용
		
		function setText(){
			$('#state').text(--sec);
		}
		
		//카운트 다운
	   var intervalID = setInterval(setText, 1000);
	   
	   setTimeout(function(){
		   clearInterval(intervalID);
		   $('#state').text('start');
		   $('.back').show();
		   hiddenCards();
		   gameState = '';
		   startState = true;
		   TimerStart();
		   //console.log(gameState);
	   }, 6000);
	}
	
	// 카드 뒤집기       
	$(document).on('click', '#cardTable td', function(){
		if(startState == true) {
			if(gameState == 'already') return; // 게임 카운트다운중일때 return
			if($(this).hasClass('opened')) return; // open된 카드 클릭했을때 return
			if(openCardId2 != '') return; // 2개 열려있는데 또 누른 경우 return
			$(this).addClass('opened');
			
			if(openCardId == '') {
				$(this).find('img').show();
				$(this).find('span').hide();
				openCardId = this.id; //첫번째 클릭한 td의 ID값 가져오기
				//console.log(openCardId)
			} else {
				if(openCardId == openCardId2) return; //같은 카드 누른 경우 return

				$(this).find('img').show();
				$(this).find('span').hide();
				
				var openCardSrc = $('#'+openCardId).find('img').attr('src'); // 첫번째 카드 src값
				var openCardSrc2 = $(this).find('img').attr('src'); //두번째 클릭한 td의 이미지 src값 가져오기
				openCardId2 = this.id; // 두번째 클릭한 td의 ID값
				//console.log(openCardId2);
				
				if(openCardSrc == openCardSrc2) {
					//console.log('맞았다');
					scorePlus();
					openCardId = '';
					openCardId2 = '';
					
					console.log(collectCard);
					
					if(collectCard == 10){ // 다 맞췄을때
						setTimeout(function(){
							alert(score + '점을 획득하였습니다!')
						},1000)
					}
				} else {
					//console.log('틀렸다');
					scoreDiscount();
					setTimeout(cardUpdown, 1000);
				}
			}
			
			// 틀렸을 때 카드 뒤집기
			function cardUpdown(){
				$('#' + openCardId).find('img').hide();
				$('#' + openCardId).find('span').show();
				$('#' + openCardId2).find('img').hide();
				$('#' + openCardId2).find('span').show();
				$('#' + openCardId).removeClass('opened');
				$('#' + openCardId2).removeClass('opened');
				openCardId = '';
				openCardId2 = '';
			}
			
			// 맞췄을때 점수
			function scorePlus() {
				score += 10;
				$('#scoreVar').text(score);
				collectCard++;
			}
			// 틀렸을때 점수
			function scoreDiscount() {
				if(score <= 0) {
					score == 0;
				} else {
					score -= 5;
				}
				$('#scoreVar').text(score);
				
			}
		}      
	})      
	
	// 게임 리셋
	function gameReset(){
		if(gameState == 'already') return;
		
		SetTime = 10;
		startState = false;
		$('#state').text('READY');
		hiddenCards();
		score = 0;
		$('#cardTable td').removeClass('opened');
		$('#scoreVar').text(score);
		$('.btnStart').css('visibility','visible');
		
		clearInterval(msg_time());
	}
	
	// 초반 실행
	$(document).ready(function(){
		setTable();
	})
	
	