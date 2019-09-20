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
		
		<div class="h1Wrap"><h1>&nbsp;</h1></div>

		<style>
		.wetherTable {width: 100%; border-top:1px solid #a1cde9;}
		.wetherTable th {  font-size: 15px; color:#fff; background:#1789cd; padding:10px 0; text-align: center; font-weight:bold; border-bottom:1px solid #d3d3d3;;}
		.wetherTable td {font-size: 13px; color:#666666; text-align:center; padding:10px 0 10px 0;  border-bottom:1px solid #d3d3d3;}
		.wetherTable td img {vertical-align: middle; margin-right: 5px;}

		.h2Wrap .fa-cloud {color:#1789cd}
		
		.loading {position:fixed; left:0; top:0; width: 100%; height: 100%; z-index: 999; text-align: center; background:rgba(0,0,0,.1);  display: none;}
		.loading i {position: absolute; left:50%; top:50%; margin:-100px 0 0 -100px; color:#1789cd; font-weight:bold; font-size:100px;}
		
		
		</style>
		

		<script>
		
		
		$(function(){
					
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
					tableGrid();
					//ligrid();
				}
			})
			
			//테이블로 그리기
			function tableGrid(){
				
				var cityNum = 0;
				var $table = $('.wetherTable table');
				var strTable;
				
				for(i=0; i<312; i++) {
					
					for(kan=0; kan<6; kan++) {
						if(i%13 == 0 && kan == 0){
							strTable += "<tr>";
							strTable += "<th rowspan='13'>" + cityArray[cityNum] + "</th>";
							cityNum++;
						}
						if(kan == 0){
							strTable += "<td>" + timeArray[i] + "</td>";
							strTable += "<td><image src='./images/"+ stateImg[i] +"'/>" + wfArray[i] + "</td>";
							strTable += "<td>" + tmnArray[i] + "</td>";
							strTable += "<td>" + tmxArray[i] + "</td>";
							strTable += "<td>" + reliabilityArray[i] + "</td>";
							strTable += "</tr>";
						}
						
					}
					
				}
				
				$('.wetherTable tbody').append(strTable);
				$('.loading').fadeOut();
				
			}
			
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
		
		<div class="h2Wrap"><i class="fas fa-cloud"></i><h2>전국 중기 예보 - 테이블</h2></div>
		
		<!-- wetherTable -->
		<table class="wetherTable">
			<colgroup>
				<col style="width:100px;">				
				<col>				
				<col style="width:150px;">				
				<col style="width:150px;">				
				<col style="width:150px;">				
				<col style="width:150px;">				
			</colgroup>
			<thead>
				<tr>
					<th>지역</th>
					<th>날짜</th>
					<th>상태</th>
					<th>최저온도</th>
					<th>최고온도</th>
					<th>신뢰도</th>
				</tr>
			</thead>
			<tbody>
				
			</tbody>			
		</table>
		<!-- //wetherTable -->

	</div>



</body>
</html>



