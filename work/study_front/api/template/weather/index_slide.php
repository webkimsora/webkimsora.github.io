<!DOCTYPE HTML>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<title>메큐라이크 - Weather API</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<!-- <meta name="viewport" content="user-scalable=yes, initial-scale=1.0, maximum-scale=2.0, minimum-scale=1.0, width=device-width"> -->
	<link rel="stylesheet" type="text/css" href="./css/common.css?v=01"  media="all" />
	<script type="text/javascript" src="./js/jquery-1.11.3.min.js" ></script>
	<script type="text/javascript" src="./js/jquery.bxslider.min.js" ></script>
	<script type="text/javascript" src="./js/common.js" ></script>
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
	
</head>
<body>
	<div class="loading">
		<i class="fas fa-sync fa-spin"></i>
	</div>
	
	<div class="papagoWrap">
		
		<div class="h1Wrap"><h1>& Makeulike</h1></div>
		
		
		<div class="h2Wrap"><i class="fas fa-cloud green"></i><h2>전국 중기 예보 - 슬라이드</h2></div>
		<style>
		.loading {position:fixed; left:0; top:0; width: 100%; height: 100%; z-index: 999; text-align: center; background:rgba(0,0,0,.1);  display: none;}
		.loading i {position: absolute; left:50%; top:50%; margin:-100px 0 0 -100px; color:#1789cd; font-weight:bold; font-size:100px;}
		
		.weatherAco {margin-bottom:100px;border-bottom:1px solid #aaa; border-top:1px solid #aaa;}
		.weatherAco > ul > li {display: none;}
		.weatherAco .title {position: relative; text-align: center; font-size: 20px; padding:10px 0;background: #1789cd; color:#fff; border:1px solid #aaa; border-top:none; transition:.3s all;border-bottom:none;font-weight: bold;}
		.weatherAco .title i {position: absolute; right:20px; transition:.3s all;}
		.weatherAco .title.active { }
		.weatherAco .title.active i {transform:rotate(180deg);}
		.weatherAco .info { border:1px solid #aaa; border-bottom:none;}
		.weatherAco .thWrap  {}
		.weatherAco .thWrap ul {display:table; width: 100%;}
		.weatherAco .thWrap ul li {display:table-cell; font-size: 15px; color:#333; background:#f8ff90; padding:10px 0; text-align: center; font-weight:bold; border-bottom:1px solid #aaa;; width: 20%;}
		.weatherAco .tdWrap ul {display:table; width: 100%;}
		.weatherAco .tdWrap ul li {display:table-cell; font-size: 13px; color:#666; text-align:center; padding:10px 0 10px 0;  border-bottom:1px dashed #aaa; width: 20%;}
		.weatherAco .tdWrap ul:last-child li {border-bottom:none;}
		.weatherAco .tdWrap img {vertical-align: middle; margin-right: 5px;}
		.h2Wrap .fa-cloud.green {color:#1789cd}
		.h2Wrap .fa-cloud {color:#1789cd}
		
		.popArea {position:fixed; left:0; top:0; width: 100%; height: 100%; z-index: 100; display: none;}
		.popArea .bg{position:fixed; left:0; top:0; width: 100%; height: 100%; z-index: 1; background:rgba(255,255,255,.8);}
		.popArea .inner {position: absolute; left:50%; top:50%; width: 1000px; margin-left:-500px; margin-top:-300px; height: 600px; background: #fff; z-index: 10;}
		.popArea .inner .weatherAco { height:600px; overflow-y:scroll;}
		.popArea .inner .far {position: absolute; right:0; top:-50px; font-size: 35px; font-weight: bold; color:#1789cd; cursor:pointer;}
		
		.weatherSlide {padding:0 40px; position: relative;}
		.weatherSlide .first > li {border:2px dotted #1789cd;  position: relative; padding:15px 0; border-radius:5px;}
		.weatherSlide li:after {content:''; display:block; clear:both;}
		.weatherSlide .title {float:left; width: 80px; text-align: center; padding-top: 50px; font-size: 20px; font-weight: bold;}
		.weatherSlide .info {float:left; width:195px;}
		.weatherSlide img {position: absolute; left:10px; top:90px;}
		.weatherSlide .slideTable  {border:1px solid #eee;;}
		.weatherSlide .slideTable li {border-bottom: 1px solid #eee;; }
		.weatherSlide .slideTable li:last-child {border-bottom: none;}
		.weatherSlide .slideTable li span { display: inline-block; width:70px; text-align: center; padding:10px 0; background: #b3dbf2;border-right: 1px solid #eee;; }
		.weatherSlide .slideTable li em { display: inline-block; padding:10px 0 10px 10px;;}
		.weatherSlide .bx-pager {padding-top: 30px; text-align: center;}
		.weatherSlide .bx-pager > div {display: inline-block; margin:0 5px;}
		.weatherSlide .bx-pager > div a {display: inline-block; width: 9px; height: 9px; background:#eee; text-indent:-999em; border-radius:20px; }
		.weatherSlide .bx-pager > div a.active {background:#1789cd;}
		.weatherSlide .bx-controls-direction {display: none;}
		.weatherSlide .detail {position: absolute; left:10px; bottom:20px; text-align: center; width: 62px; border:1px solid #1789cd; border-radius:5px; background:#efefef; padding:5px; cursor:pointer;}
		.arrowWrap{ display: none;}
		.arrowWrap div{position: absolute; top:50%; margin-top:-40px;}
		.arrowWrap div i {color:#1789cd; font-weight:bold; font-size:45px; cursor:pointer;}
		.arrowWrap div.left {left:0; text-align: left;}
		.arrowWrap div.right {right:0; text-align: right;}
		</style>
		

		<div class="popArea">
			<div class="bg"></div>
			<div class="inner">
				<div class="weatherAco">
					<ul>
						
					</ul>		
				</div>
				<i class="far fa-window-close"></i>			
			</div>
		</div>
		
		<div class="weatherSlide">
			<ul class="first">
				
			</ul>
			<div class="arrowWrap">
				<div class="left"><i class="fas fa-angle-left"></i></div>
				<div class="right"><i class="fas fa-angle-right"></i></div>
			</div>
		</div>

		
		<script>
		
		
		$(function(){
			
			$('.weatherSlide').on('click','.detail',function(){
				var idx = $(this).parents('li').index();
				$('.popArea').fadeIn('fast');
				$('.weatherAco > ul > li').eq(idx-6).show().siblings().hide();
			})
			
			
			$('.popArea .far').on('click',function(){
				$('.popArea').fadeOut('fast');
			})
			
			//아코디언 그리기
			function slideGrid(){
				
				//헤더
				var tdGrid = '';
				var acCity = 0;
								
				for(var j=0; j<24; j++){

					tdGrid += '<li>';
					tdGrid += 	'<div class="title">'+cityArray[j]+'</div>';
					tdGrid += 	'<div class="info">';
					tdGrid += 		'<div class="tdWrap">';

					for(i=1; i<2; i++) {
						tdGrid += 		'<ul class="slideTable">';
						tdGrid += 		'<li><span>날짜</span><em>'+ timeArray[i*j*13] +'</em></li>';
						tdGrid += 		'<li><span>상태</span><em><image src="./images/'+ stateImg[i*j*13] +'"/>'+ wfArray[i*j*13] +'</em></li>';
						tdGrid += 		'<li><span>최저온도</span><em>'+ tmnArray[i*j*13] +'</em></li>';
						tdGrid += 		'<li><span>최고온도</span><em>'+ tmxArray[i*j*13] +'</em></li>';
						tdGrid += 		'<li><span>신뢰도</span><em>'+ reliabilityArray[i*j*13] +'</em></li>';
						tdGrid += 		'</ul>';
						acCity++;
					}
					
					
					tdGrid += 		'</div>';
					tdGrid += 	'</div>';
					tdGrid += 	'<div class="detail"><span>상세보기</span></div>';
					tdGrid += '</li>';

				}

				
				$('.weatherSlide > ul').append(tdGrid);

				var weatherSlide =	$('.weatherSlide > ul').bxSlider({
					mode:'horizontal',  // 'fade'
					//auto: true,
					//autoControls: true,
					hideControlOnEnd: false,
					infiniteLoop: true,
					speed:'400',
					minSlides:3,
					maxSlides:6,
					moveSlides:3,
					slideWidth:295,
					slideMargin:10,
					onSlideAfter: function($slideElement, oldIndex, newIndex){
						setTimeout(function(){
							$('.weatherSlide .bx-start').trigger('click');
						},1000)
					},
					onSliderLoad: function($slideElement, oldIndex, newIndex){
						$('.loading').fadeOut();
						$('.arrowWrap').fadeIn();
					}
				});
				
				$('.arrowWrap .left').on('click',function(){
					weatherSlide.goToPrevSlide();
				});
				
				$('.arrowWrap .right').on('click',function(){
					weatherSlide.goToNextSlide();
				});
				
				
			}
			
			//상세 그리기
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
					tdGrid += 	'<div class="title">'+cityArray[j]+'</div>';
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
					slideGrid()

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



