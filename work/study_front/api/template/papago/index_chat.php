<!DOCTYPE HTML>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<title>메큐라이크 - Papago 번역</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<!-- <meta name="viewport" content="user-scalable=yes, initial-scale=1.0, maximum-scale=2.0, minimum-scale=1.0, width=device-width"> -->
	<link rel="stylesheet" type="text/css" href="./css/common.css?v=01"  media="all" />
	<script type="text/javascript" src="./js/jquery-1.11.3.min.js" ></script>
	<script type="text/javascript" src="./js/common.js" ></script>
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
	
</head>
<body>
	
	
	<div class="papagoWrap">
		
		<div class="h1Wrap"><h1>Papago</h1></div>
	
	<div class="h2Wrap"><i class="far fa-comment-dots"></i><h2>자동번역 채팅</h2></div>

	<div class="mqChat">
		<form id="papagoChat">
			<div class="in">
				<div class="chatArea">
					<div class="bgTop"><img src="./images/bgKa01.jpg" alt=""></div>
					<div class="chatContet">
						<ul>

						</ul>
					</div>
					
					<div class="bgBottom">
						<div class="chLang">
							<p class="tit">번역해서 보내고 싶은 언어를 선택하세요.</p>
							<ul>
								<li><input type="radio" id="chat01" value="ko" checked name="chat"><label for="chat01">한국어</label></li>
								<li><input type="radio" id="chat02" value="en"  name="chat"><label for="chat02">영어</label></li>
								<li><input type="radio" id="chat03" value="ja" name="chat"><label for="chat03">일본어</label></li>
								<li><input type="radio" id="chat04" value="zh-CN" name="chat"><label for="chat04">중국어</label></li>
							</ul>
						</div>
						<div class="inputZone">
							<textarea class="chatCont" name="chatText"></textarea>
							<a class="goChat" href="javascript:;"><img src="./images/bgKa04.jpg" alt="전송"></a>
						</div>
						<div class="img"><img src="./images/bgKa03.jpg" alt=""></div>
					</div>		
				</div>		
				
			</div>
		</form>
	</div>
	
	
	
	
</div>

<script>
//공백 체크
var blank_pattern = /^\s+|\s+$/g;

$(function(){
	
	//파파고 채팅!
	$('.goChat').on('click',function(){
		
		
		//시간계산
		var time = new Date();
		var timeHours = time.getHours();
		var timeMinutes = time.getMinutes();
		
		if(timeHours >= 12){
			timeHours = timeHours - 12;
		}
		if(timeMinutes < 10){
			timeMinutes = '0' + timeMinutes;
		}
		
		if($('.chatCont').val().replace(blank_pattern, '' ) == ""){
			//$('.chatCont').val('')
			return false;
		}
		
		//한국어일때
		if($('.chLang input:checked').val() == 'ko'){
			
			var htmlMake = '<li><div class="name">' + 'Papago' + '</div>' +
			'<div class="text">' +
			'<span class="word">' + $('.chatCont').val() +
			'</span>'+
			'<span class="time">'+ timeHours + ':' + timeMinutes +'</span>' + 
			'</div>' +
			'</li>';

			$('.chatContet ul').append(htmlMake);
			$('.chatContet').scrollTop(2000);
			
		}else{ //다국어일때
			$.ajax({     
				type:    'POST',
				url:     'papago_chat.php',
				data:    $("#papagoChat").serialize(),
				success: function(data) 
				{
					try{
						var contact = JSON.parse(data); //json 파싱
						//$('.testBox').text(data);
		
						var htmlMake = '<li><div class="name">' + 'Papago' + '</div>' +
						'<div class="text">' +
						'<span class="word">' + contact.message.result.translatedText +
						'</span>'+
						'<span class="time">'+ timeHours + ':' + timeMinutes +'</span>' + 
						'</div>' +
						'</li>';
						
						$('.chatContet ul').append(htmlMake);
						$('.chatContet').scrollTop(2000);
						
					}catch(e){
						alert('하루사용량을 초과하였습니다');
					}

							
			
				},error : function() {
					alert('통신실패!!');
				}
			
			});
		}
		
		$('.chatCont').val('').focus();

	});
	
	$('.chatCont').keydown(function(e){
		if(e.keyCode == 13){
			$('.goChat').trigger('click');
			$('.chatCont').val('');
			return false;
		}
	})
	
	
})



</script>



</body>
</html>



