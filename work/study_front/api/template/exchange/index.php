<!DOCTYPE HTML>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<title>메큐라이크 - 환율 API</title>
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
		
		
		<div class="h2Wrap"><i class="fas fa-calculator"></i></i><h2>환율 계산기</h2></div>
		<style>
		.loading {position:fixed; left:0; top:0; width: 100%; height: 100%; z-index: 999; text-align: center; background:rgba(0,0,0,.1); display: none;}
		.loading i {position: absolute; left:50%; top:50%; margin:-100px 0 0 -100px; color:#1789cd; font-weight:bold; font-size:100px;}
		
		
		.h2Wrap .fa-cloud.green {color:#00c63c}
		.h2Wrap .fa-cloud {color:#1789cd}
		.h2Wrap .fa-calculator {color:#1789cd}
		
		.exCalWrap {position: relative;}
		.exCalWrap:after {content:''; display:block; clear:both;}
		.exCalWrap .ico {position: absolute; left:50%; top:50%; margin:-30px 0 0 -30px; }
		.exCalWrap .ico i {font-weight:bold; font-size: 60px; color:#333;}
		.exCalWrap .left {float:left; width: 450px; border:1px solid #ddd;}
		.exCalWrap .left .title .sel { background: #ecfaff; cursor:default;}
		.exCalWrap .right {float:right; width: 450px; border:1px solid #ddd;}
		.exCalWrap .title {position: relative;}
		.exCalWrap .title .sel {position: relative; padding:20px; border-bottom: 1px solid #ddd; height: 109px; background: #fafafa; cursor:pointer;  transition:.3s all;}
		.exCalWrap .title .sel .fas {font-size:50px; position: absolute; right:30px; top:30px; color:#333; transition:.3s all;}
		.exCalWrap .title .sel.active  {color:#999; background:#feffe7}
		.exCalWrap .title .sel.active .fas {transform:rotate(180deg); color:#999;}
		.exCalWrap .title .sel > img {width:100px; vertical-align: middle;}
		.exCalWrap .title .sel > span {font-size: 25px; font-weight: bold;display: inline-block; vertical-align: middle; margin-left: 20px; }
		.exCalWrap .selList {position: absolute; left:0; top:109px; width: 100%; border:1px solid #ddd; background:#fafafa; display: none;}
		.exCalWrap .selList ul:after {content:''; display:block; clear:both;}
		.exCalWrap .selList ul li {float:left; padding:10px; width: 50%; border:1px solid #ddd; color:#333; cursor:pointer;}
		.exCalWrap .selList ul li:hover {background:#fff; font-weight: bold; font-size: 20px; border:1px solid red;}
		.exCalWrap .selList ul li.active {background:#fff; font-weight: bold; font-size: 20px; border:1px solid red;}
		.exCalWrap .selList ul li:after {content:''; display:block; clear:both;}
		.exCalWrap .selList ul li .img {float:left; width: 50px;}
		.exCalWrap .selList ul li .img img {height: 34px;}
		.exCalWrap .selList ul li .tit {float:left; padding:8px 0 0 10px; font-size: 15px;}
		.exCalWrap .inputWrap {padding:20px; }
		.exCalWrap .inputWrap input {width:100%; height: 100px;  padding:10px; text-align: right; font-size:27px; border:1px solid #ccc; }
		.exCalWrap .inputWrap .money {text-align: right; font-size: 25px; padding-top: 20px;}
		.exCalWrap .inputWrap .money .num {font-weight: bold; padding-bottom: 10px; height: 27px; height: 30px;}
		.exCalWrap .inputWrap .money .word em {padding-left:5px;}
		.exCalWrap .right .inputWrap .money .word {color:red; font-weight: bold;}
		.exCalWrap .right .sel em {font-size: 25px; font-weight: bold;display: inline-block; vertical-align: middle; font-size: 13px; padding-left: 10px;}
		</style>
		
		<div class="exCalWrap">
			<div class="left">
				<div class="title">
					<div class="sel">
						<img src="./images/KRW.jpg" alt="한국">
						<span>한국</span>
					</div>
				</div>
				<div class="inputWrap">
					<input type="text" style="ime-mode:disabled;" value="0" maxlength='20'>
					<div class="money">
						<div class="word"><span>0</span><em>원</em></div>
					</div>
				</div>
			</div>
			<div class="right">
				<div class="title">
					<div class="sel">
						<img src="./images/USD.jpg" alt="미국">
						<span>미국</span><em>1,134.50</em>
						<i class="fas fa-angle-down"></i>
					</div>
				</div>
				<div class="inputWrap">
					<input type="text" value="0.00" maxlength='20'>
					<div class="money">
						<div class="word"><span>0.00</span><em>달러</em></div>
					</div>
				</div>
			</div>
			
			<div class="ico"><i class="fas fa-exchange-alt"></i></div>
			
		</div>
		
		
		
		
		
		<script>
		/* 
		양방향 실시간 환율 계산기
		한국수출입은행 환율 오픈API 정보를 이용
		22개국가 실시간 현재 매매기준율 적용
		API조회 제한 없음
		참조 : <a href="https://www.koreaexim.go.kr/site/program/openapi/openApiView?menuid=001003002002001&apino=2&viewtype=C#none" target="_blank">https://www.koreaexim.go.kr/</a>
		사용가능사이트 : 증권, 은행, 해외여행예약 사이트 등
		*/
		
		
		$(function(){
			
			var worldIndex = 21;
			var intervalCheck;
			var totalDate = '';
			var selList = '';
			
			//3자리 콤마찍기 정규식
			function numberWithCommas(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
			
			//콤마제거 정규식
			function numberDelCommas(x) {return x.toString().replace(/,/g, '');}
			
			
			
			//국가 네이밍
			//var worldName = ['아랍에미리트','호주','바레인','캐나다','스위스','중국','덴마크','유럽연합','영국','홍콩','인도네시아','일본','대한민국','쿠웨이트','말레이시아','노르웨이','뉴질랜드','사우디아라비아','스웨덴','싱가포르','태국','미국']
			
			//한국수출입 API
			$.ajax({
				url: 'ex.php', // 읽어올 문서
				type: 'GET', // 방식
				async: false, //동기식 처리
				dataType: 'json', // 문서 타입
				error: function(){ // 로딩 에러시
					alert('Error');
				},
				success: function(data){
					data[5].cur_nm = '중국 위안화';
					data[7].cur_nm = '유럽연합 유로';
					
					totalDate = data;
					
					selList += '<div class="selList"><ul>'
					
					for(var i=0; i < data.length; i++){
						if(data[i].cur_nm.split(' ')[0] == '미국'){
							selList += '<li class="active">';
						}else{
							selList += '<li>';
						}
						selList += 	'<span class="img"><img src="./images/'+data[i].cur_unit.split(' ')[0].replace('(100)','')+'.jpg" alt="'+data[i].cur_nm.split(' ')[0]+'"></span>';
						selList += 	'<span class="tit">'+data[i].cur_nm.split(' ')[0]+'</span>';
						selList += '</li>';
					};
					selList += '</ul></div>'
					
					$('.right .title').append(selList);
					
					// 일본은 100엔당, 인도네시아 100루피당
					console.log(data);
					// console.log('국가 ' + data[11].cur_nm.split(' ')[0]);
					// console.log('통화명 ' + data[11].cur_nm.split(' ')[1]);
					// console.log('송금 받을때 ' + data[11].ttb); 
					// console.log('송금 보낼때 ' + data[11].tts); //가장 기준
					// console.log('매매 기준율	' + data[11].deal_bas_r); 
					
				}
			});
			
			//계산하여 오른쪽에 반영
			function rightExChange(idx){
				
				var chMoney = numberDelCommas(totalDate[worldIndex].deal_bas_r);
				
				//일본,인도네시아 100나눔
				if(worldIndex == '10' || worldIndex == '11' ){
					chMoney = chMoney / 100;
					
					//한국은 값 그대로 
				}else if(chMoney == '1000'){
					chMoney = 1;
				}
				
				console.log(idx);
				
				var afterMoney = (numberDelCommas(idx) / chMoney).toFixed(2);
				if(afterMoney == 'NaN'){
					afterMoney = '정확한 숫자를 입력해주세요.'
				}
				$('.right input').val(numberWithCommas(afterMoney));
				$('.right .word span').text(numberWithCommas(afterMoney));
			}
			
			
			
			//왼쪽 입력값 ( 키업, 포커스아웃 );
			$('.left input').on('keyup',function(event){
				
				clearTimeout(intervalCheck);
				
				//방향키는 제외
				var key = event.which || event.keyCode;
				if(key == 37 || key == 39){
					return false;
				}
				
				var el = $(this);
				var idx = $(this).val();
				var onlyNum = idx.replace(/[^0-9\.]/g,'')
				//onlyNum = onlyNum.replace(/\./g, '');
				var chidx = numberDelCommas(onlyNum)
				

				intervalCheck = setTimeout(function(){
					el.val(chidx);
					var idxComma = numberWithCommas(chidx);
					el.val(idxComma);
					$('.left .word span').text(idxComma);
					rightExChange(onlyNum);
				},100)
				
				
			});
			
			
			//왼쪽 입력값 ( 키다운 )
			$('.left input').on('keydown',function(event){
				
				clearTimeout(intervalCheck);
				
				var el = $(this);
				var idx = $(this).val();
				var onlyNum = idx.replace(/[^0-9\.]/g,'')
				onlyNum = idx.replace(/\./g, '');
				var chidx = numberDelCommas(onlyNum);
				var idxComma = numberWithCommas(chidx);
				
				intervalCheck = setTimeout(function(){
					//el.val(idxComma);
					//$('.left .word span').text(idxComma);
					//rightExChange(onlyNum);
				},1000)
				
			});
			
			
			
			//계산하여 왼쪽에 반영
			function leftExChange(idx){
				
				var chMoney = numberDelCommas(totalDate[worldIndex].deal_bas_r);

				//일본,인도네시아 100나눔
				if(worldIndex == '10' || worldIndex == '11' ){
					chMoney = chMoney / 100;
					
					//한국은 값 그대로 
				}else if(chMoney == '1000'){
					chMoney = 1;
				}
				
				console.log(idx);
				
				var afterMoney = (chMoney * numberDelCommas(idx) ).toFixed(2);
				if(afterMoney == 'NaN'){
					afterMoney = '정확한 숫자를 입력해주세요.'
				}
				$('.left input').val(numberWithCommas(afterMoney));
				$('.left .word span').text(numberWithCommas(afterMoney));
				
			}
			
			
			
			//오른쪽 입력값 ( 키업, 포커스아웃 );
			$('.right input').on('keyup ',function(event){
				
				clearTimeout(intervalCheck);
				
				//방향키는 제외
				var key = event.which || event.keyCode;
				if(key == 37 || key == 39){
					return false;
				}
				
				var el = $(this);
				var idx = $(this).val();
				var onlyNum = idx.replace(/[^0-9\.]/g,'')
				//onlyNum = idx.replace(/\./g, '');
				var chidx = numberDelCommas(onlyNum);
				
				
				intervalCheck = setTimeout(function(){
					el.val(chidx);
					var idxComma = numberWithCommas(chidx);
					el.val(idxComma);
					$('.right .word span').text(idxComma);
					leftExChange(onlyNum);
				},100)
				
				
			});
			
			
			//오른쪽 입력값 ( 키다운 )
			$('.right input').on('keydown',function(event){
				
				clearTimeout(intervalCheck);
				
				var el = $(this);
				var idx = $(this).val();
				var onlyNum = idx.replace(/[^0-9\.]/g,'')
				//onlyNum = idx.replace(/\./g, '');
				var chidx = numberDelCommas(onlyNum);
				var idxComma = numberWithCommas(chidx);
				
				intervalCheck = setTimeout(function(){
					//el.val(idxComma);
					//$('.right .word span').text(idxComma);
					//leftExChange(onlyNum);
				},1000)
				
			});
			
			//국가열기
			$('.right .title .sel').on('click',function(){
				$(this).toggleClass('active');
				$('.selList').stop().slideToggle('fast');
			})
			
			//국가선택
			$('.right').on('click','.selList li',function(){
				worldIndex = $(this).index();
				$(this).addClass('active').siblings().removeClass('active');
				$('.selList').slideUp('fast');
				$('.right .title .sel > img').attr('src','./images/' + totalDate[worldIndex].cur_unit.split(' ')[0].replace('(100)','') + '.jpg');
				$('.right .title .sel span').text(totalDate[worldIndex].cur_nm.split(' ')[0])
				if(totalDate[worldIndex].deal_bas_r == 1){
					totalDate[worldIndex].deal_bas_r = '1,000';
				}
				$('.right .title .sel em').text(totalDate[worldIndex].deal_bas_r)
				$('.right .money .word em').text(totalDate[worldIndex].cur_nm.split(' ')[1])
				
				$('.right .title .sel').removeClass('active');
				
				
				var chidx = numberDelCommas($('.left .inputWrap input').val());
				rightExChange(chidx);
				
				
			})
			
			$(document).ready(function() {
				if(window.location.hash != ''){
					var hname = (window.location.hash).replace('#','');
					$('.selList ul li').eq(hname).trigger('click');
				}
			})
			
			
			
			// RESULT	Integer	조회 결과	1 : 성공, 2 : DATA코드 오류, 3 : 인증코드 오류, 4 : 일일제한횟수 마감
			// CUR_UNIT	String	통화코드	
			// CUR_NM	String	국가/통화명	
			// TTB	String	전신환(송금)받으실때	
			// TTS	String	전신환(송금) 보내실때	
			// DEAL_BAS_R	String	매매 기준율	
			// BKPR	String	장부가격	
			// YY_EFEE_R	String	년환가료율	
			// TEN_DD_EFEE_R	String	10일환가료율
			// KFTC_DEAL_BAS_R	String	서울외국환중계 매매기준율	
			// KFTC_BKPR	String	서울외국환중계 장부가격
			
			
			
			
			// 기본 환율
			$('.gogo').on('click',function(){
				var world = 'JPY_KRW'
				$.ajax({
					url: 'https://free.currencyconverterapi.com/api/v5/convert?q='+world+'&compact=ultra', // 읽어올 문서
					type: 'GET', // 방식
					async: false, //동기식 처리
					dataType: 'jsonp', // 문서 타입
					error: function(){ // 로딩 에러시
						alert('Error loading XML document');
					},
					success: function(data){
						
						console.log(data[Object.keys(data)[0]]) // 데이타 처음키의 value 받기
						
						
					},complete : function(){
						
					}
				})
			})
			
			
			
			
		})
		
		
		
		</script>		
		
		
	</div>
	
	
	
	
</body>
</html>



