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
		
		
		<div class="h2Wrap"><i class="fas fa-arrows-alt-h"></i><h2>실시간 양방향 번역</h2></div>
		
		
		<form id="trans">
			
			<div class="transWrap">
				
				<div class="box left">
					<div class="titleWrap">
						<span class="tit"><em>한국어</em><i class="fas fa-angle-down"></i></span>
						<div class="langList">
							<ul>
								<li name="korean"><input type="radio" name="langFirst" checked value="ko" id="lang01"><label for="lang01">한국어</label></li>
								<li class="check"><input type="radio" name="langFirst" value="en" id="lang02"><label for="lang02">영어</label></li>
								<li><input type="radio" name="langFirst" value="ja" id="lang03"><label for="lang03">일본어</label></li>
								<li><input type="radio" name="langFirst" value="zh-CN" id="lang04"><label for="lang04">중국어</label></li>
							</ul>
						</div>	
					</div>
					<div class="text">
						<textarea id="papagoTextLeft" onkeyup="papago()" name="papagoTextLeft" ></textarea>
					</div>
					
				</div>
				
				
				<div class="box right">
					<div class="titleWrap">
						<span class="tit"><em>영어</em><i class="fas fa-angle-down"></i></span>
						<div class="langList">
							<ul>
								<li class="check" name="korean"><input type="radio" name="langLast" value="ko" id="lang05"><label for="lang05">한국어</label></li>
								<li><input type="radio" name="langLast" checked  value="en" id="lang06"><label for="lang06">영어</label></li>
								<li><input type="radio" name="langLast" value="ja" id="lang07"><label for="lang07">일본어</label></li>
								<li><input type="radio" name="langLast" value="zh-CN" id="lang08"><label for="lang08">중국어</label></li>
							</ul>
						</div>				
					</div>
					<div class="text">
						<textarea id="papagoTextRight" onkeyup="papago2()" name="papagoTextRight" ></textarea>
					</div>
				</div>
				<!--
				<input type="button" class="btnPapago left" onclick="papago()" value="번역하기">
				<input type="button" class="btnPapago right" onclick="papago2()" value="번역하기">
			-->
			
		</div>
		
	</form>
	
	
	
	
</div>

<script>
/*
JSON 형태
{"message":{"@type":"response","@service":"naverservice.labs.api","@version":"1.0.0","result":{"translatedText":"Are you kidding me","srcLangType":"ko"}}}.
*/



//공백 체크
var blank_pattern = /^\s+|\s+$/g;

$(function(){
	
	//메뉴열림
	$('.titleWrap .tit').on('click',function(){
		$(this).toggleClass('on');
		$(this).siblings('.langList').stop().slideToggle('fast');
	});
	
	//언어선택
	$('.langList label').on('click',function(){
		var $el = $(this);
		var elParentIdx = $el.parent().index();
		var elParentBox = $el.parents('.box');
		var elParentBoxIdx = $el.parents('.box').index();
		var elValue = $el.siblings().val();
		var elText = $el.text();
		
		//한국어 중복 방지
		if(elValue != 'ko'){
			elParentBox.siblings().find('[name*="korean"] input').prop('checked',true);
			elParentBox.siblings().find('.tit em').text('한국어');
			elParentBox.siblings().find('[name*="korean"]').addClass('check').siblings().removeClass('check');
			elParentBox.find('[name*="korean"]').addClass('check').siblings().removeClass('check');
		}
		
		//반대쪽 같은언어 막음
		elParentBox.siblings().find('.langList ul li').eq(elParentIdx).addClass('check').siblings().removeClass('check');
		
		//메뉴닫힘
		$el.parents('.langList').siblings('.tit').find('em').text(elText);
		$el.parents('.langList').slideUp('fast');
		
		//언어 선택후 번역
		setTimeout(function(){
			
			if(elParentBoxIdx == 0){
				if($(this).siblings().val() != 'ko'){
					papago2();
				}else{
					papago();
				}
			}else{
				if($(this).siblings().val() != 'ko'){
					papago();
				}else{
					papago2();
				}
					
			}
		},200)
	});
	
})



//파파고 언어번역(왼쪽에서 오른쪽)
function papago(){
	
	if($('#papagoTextLeft').val().replace( blank_pattern, '' ) == ""){
		$('#papagoTextRight').val('')
		return false;
	}
	
	$.ajax({     
		type:    'POST',
		url:     'papago_smt_left.php',
		data:    $("#trans").serialize(),
		success: function(data) 
		{
			try{
				var contact = JSON.parse(data); //json 파싱
				$('#papagoTextRight').val(contact.message.result.translatedText);
				}catch{
					alert('하루사용량을 초과하였습니다');
			}

			
		},error : function() {
			alert('통신실패!!');
		}
		
	});
}

//파파고 언어번역(오른쪽에서 왼쪽)
function papago2(){
	if($('#papagoTextRight').val() == ''){
		$('#papagoTextLeft').val('')
		return false;
	}
	
	$.ajax({     
		type:    'POST',
		url:     'papago_smt_right.php',
		data:    $("#trans").serialize(),
		success: function(data) 
		{
			try{
				var contact = JSON.parse(data); //json 파싱
				$('#papagoTextLeft').val(contact.message.result.translatedText);
				}catch{
					alert('하루사용량을 초과하였습니다');
			}

			
		},error : function() {
			alert('통신실패!!');
		}
		
	});
}

</script>



</body>
</html>



