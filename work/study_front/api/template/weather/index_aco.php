<!DOCTYPE HTML>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<title>메큐라이크 - Weather API</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<!-- <meta name="viewport" content="user-scalable=yes, initial-scale=1.0, maximum-scale=2.0, minimum-scale=1.0, width=device-width"> -->
	<link rel="stylesheet" type="text/css" href="./css/common.css?v=01"  media="all" />
	<script type="text/javascript" src="./js/jquery-1.11.3.min.js" ></script>
	<script type="text/javascript" src="./js/common.js" ></script>
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
	
</head>
<body>
	<div class="loading">
		<i class="fas fa-sync fa-spin"></i>
	</div>
	
	<div class="papagoWrap">
		
		<div class="h1Wrap"><h1>& Makeulike</h1></div>
		
		
		<div class="h2Wrap"><i class="fas fa-cloud "></i><h2>전국 중기 예보 - 아코디언</h2></div>
		<style>
		body { min-height:1000px;}
		.loading {position:fixed; left:0; top:0; width: 100%; height: 100%; z-index: 999; text-align: center; background:rgba(0,0,0,.1); display: none;}
		.loading i {position: absolute; left:50%; top:50%; margin:-100px 0 0 -100px; color:#1789cd; font-weight:bold; font-size:100px;}
		
		.weatherAco {margin-bottom:100px;border-bottom:1px solid #aaa; min-height:1000px;}
		.weatherAco .title {position: relative; text-align: center; font-size: 20px; padding:10px 0; background: #eee; border:1px solid #aaa; transition:.3s all;border-bottom:none; color:#333; font-weight: bold; cursor:pointer;}
		.weatherAco .title i {position: absolute; right:20px; transition:.3s all;}
		.weatherAco .title.active { background: #1789cd; color:#fff;}
		.weatherAco .title.active i {transform:rotate(180deg);}
		.weatherAco .info { border:1px solid #aaa; border-bottom:none; display: none;}
		.weatherAco .thWrap  {}
		.weatherAco .thWrap ul {display:table; width: 100%;}
		.weatherAco .thWrap ul li {display:table-cell; font-size: 15px; color:#333; background:#f8ff90; padding:10px 0; text-align: center; font-weight:bold; border-bottom:1px solid #aaa;; width: 20%;}
		.weatherAco .tdWrap ul {display:table; width: 100%;}
		.weatherAco .tdWrap ul li {display:table-cell; font-size: 13px; color:#666; text-align:center; padding:10px 0 10px 0;  border-bottom:1px dashed #aaa; width: 20%;}
		.weatherAco .tdWrap ul:last-child li {border-bottom:none;}
		.weatherAco .tdWrap img {vertical-align: middle; margin-right: 5px;}
		.h2Wrap .fa-cloud.green {color:#00c63c}
		.h2Wrap .fa-cloud {color:#1789cd}
		</style>
		
		<div class="weatherAco">
			<ul>
				
			</ul>			
		</div>
		
		
		<script>
		
		
		$(function(){
			
			
			
			//아코디언 온오프
			$('.weatherAco').on('click','.title',function(){
				var idx = $(this).offset().top;
				var min = $('.weatherAco .title.active').siblings('.info').height();
				$('bod,html').stop().animate({scrollTop:idx-min},500);
				$(this).toggleClass('active');
				$(this).parents('li').siblings().find('.title').removeClass('active');
								
				$(this).siblings('.info').stop().slideToggle('fast');
				$(this).parents('li').siblings().find('.info').stop().slideUp('fast');
			})
			
			//아코디언 그리기
			function acGrid(){
				
				//헤더
				var thWrap = '';
				var tdGrid = '';
				thWrap += '<div class="thWrap">';
				thWrap += '<ul>';
				thWrap += '<li>날짜</li>';
				thWrap += '<li>상태</li>';
				thWrap += '<li>최저온도</li>';
				thWrap += '<li>최고온도</li>';
				thWrap += '<li>신뢰도</li>';
				thWrap += '</ul>';
				thWrap += '</div>';
				
				var city = '';
				var time = '';
				var state = '';
				var min = '';
				var max = '';
				var rel = '';
				var acCity = 0;
								
				for(var j=0; j<24; j++){

					tdGrid += '<li>';
					tdGrid += 	'<div class="title">'+cityArray[j]+'<i class="fas fa-angle-down"></i></div>';
					tdGrid += 	'<div class="info">';
					tdGrid += 		thWrap;
					tdGrid += 		'<div class="tdWrap">';
										
					for(i=0; i<13; i++) {
						tdGrid += 		'<ul>';
						tdGrid += 		'<li>'+ timeArray[acCity] +'</li>';
						tdGrid += 		'<li><image src="./images/'+ stateImg[acCity] +'"/>'+ wfArray[acCity] +'</li>';
						tdGrid += 		'<li>'+ tmnArray[acCity] +'</li>';
						tdGrid += 		'<li>'+ tmxArray[acCity] +'</li>';
						tdGrid += 		'<li>'+ reliabilityArray[acCity] +'</li>';
						tdGrid += 		'</ul>';
						acCity++;
					}
					
					tdGrid += 		'</div>';
					tdGrid += 	'</div>';
					tdGrid += '</li>';

				}

				
				$('.weatherAco > ul').append(tdGrid);
				$('.loading').fadeOut();
				
			}
			
			
			var cityArray = []; // 도시 24개
			var timeArray = []; // 시간 13개씩 총 312개 
			var wfArray = []; // 상태 13개씩 총 312개
			var tmnArray = []; // 최저온도  13개씩 312개
			var tmxArray = []; // 최고온도 13개씩 312개
			var reliabilityArray = []; // 신뢰도 13개씩 312개
			var stateImg = []; // 상태이미 13개씩 312개
			
			// 맑음 w_l1.gif
			// 구름조금 w_l3.gif
			// 구름많음 w_l11.gif
			// 구름많고 비 w_l13.gif
			// 구름많고 비/눈 w_l15.gif
			// 구름많고 눈/비 w_l15.gif
			// 구름많고 눈 w_l14.gif
			// 흐림 w_l9.gif
			// 흐리고 비 w_l7.gif
			// 흐리고 비/눈 w_l13.gif
			// 흐리고 눈/비 w_l13.gif
			// 흐리고 눈 w_l14.gif
			
			
			$.ajax({
				url: 'weather.php', // 읽어올 문서
				type: 'GET', // 방식
				dataType: 'xml', // 문서 타입
				error: function(){ // 로딩 에러시
					alert('Error loading XML document');
				},
				success: function(xml){
					
					var $xml = $(xml);
					var cityLength = $xml.find('city').length;
					
					
					//상태
					$xml.find('wf').each(function(i){
						if(i > 0){
							wfArray.push([$(this).text()])
							var state = '';
							switch($(this).text()){
								case '맑음' : state = 'w_l1.gif';
								break;
								case '구름조금' : state = 'w_l3.gif';
								break;
								case '구름많음' : state = 'w_l11.gif';
								break;
								case '구름많고 비' : state = 'w_l13.gif';
								break;
								case '구름많고 비/눈' : state = 'w_l15.gif';
								break;
								case '구름많고 눈/비' : state = 'w_l15.gif';
								break;
								case '구름많고 눈' : state = 'w_l14.gif';
								break;
								case '흐림' : state = 'w_l9.gif';
								break;
								case '흐리고 비' : state = 'w_l7.gif';
								break;
								case '흐리고 비/눈' : state = 'w_l13.gif';
								break;
								case '흐리고 눈/비' : state = 'w_l13.gif';
								break;
								case '흐리고 눈' : state = 'w_l14.gif';
								break;
							}
							stateImg.push([state])
						}

					})
					
					
					//신뢰도
					$xml.find('reliability').each(function(i){
						reliabilityArray.push([$(this).text()])
					})
					
					
					
					//도시
					$xml.find('city').each(function(i){
						cityArray.push([$(this).text()])
					})
					
					//시간
					$xml.find('tmEf').each(function(i){
						timeArray.push([$(this).text()])
					})

					
					//최저온도
					$xml.find('tmn').each(function(i){
						tmnArray.push([$(this).text()])
					})
					
					//최고온도
					$xml.find('tmx').each(function(i){
						tmxArray.push([$(this).text()])
					})
					

					//console.log(timeArray)
					
				},complete : function(){
					acGrid();
					

				}
			})

		});
		
		/*
		신뢰도
		일 2회 발표(06시, 18시)하는	중기예보
		(모레부터9일간)가 계속 유지될 가능성에 대한 신뢰도 정 보를 3단계로 구분하여 제공(육상)
		① 높음: 다음날 발표 중기예보가 계속 유지될 가 능성이 높음
		② 보통: 다음날 발표 중기예보가 계속 유지될 가 능성이 있음
		③ 낮음: 다음날 발표 중기예보가 계속 유지될 가 능성이 낮음
		
		
		상태
		○ 맑음
		○ 구름조금
		○ 구름많음, 구름많고 비, 구름많고 비/눈, 구름많고 눈/비,	구름많고 눈 
		○ 흐림, 흐리고 비, 흐리고 비/눈, 흐리고 눈/비, 흐리고 눈
		
		맑음 w_l1.gif
		구름조금 w_l3.gif
		구름많음 w_l11.gif
		구름많고 비 w_l13.gif
		구름많고 비/눈 w_l15.gif
		구름많고 눈/비 w_l15.gif
		구름많고 눈 w_l14.gif
		흐림 w_l9.gif
		흐리고 비 w_l7.gif
		흐리고 비/눈 w_l13.gif
		흐리고 눈/비 w_l13.gif
		흐리고 눈 w_l14.gif
		
		*/		
		
		</script>		
	
		
	</div>




</body>
</html>



