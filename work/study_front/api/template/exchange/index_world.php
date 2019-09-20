<!DOCTYPE HTML>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<title>메큐라이크 - 환율 API</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<!-- <meta name="viewport" content="user-scalable=yes, initial-scale=1.0, maximum-scale=2.0, minimum-scale=1.0, width=device-width"> -->
	<link rel="stylesheet" type="text/css" href="./css/common.css?v=01"  media="all" />
	<script type="text/javascript" src="./js/jquery-1.11.3.min.js" ></script>
	<script type="text/javascript" src="./js/iscroll-zoom.js" ></script>
	<script type="text/javascript" src="./js/common.js" ></script>
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
	
</head>
<body>
	<div class="loading">
		<i class="fas fa-sync fa-spin"></i>
	</div>
	
	<script type="text/javascript">

	var myScroll;

	function loaded () {
		myScroll = new IScroll('#wrapper', {
			zoom: true,
			scrollX: true,
			scrollY: true,
			mouseWheel: true,
			wheelAction: 'zoom'
		});
	}

	$(window).load(function(){
		loaded()
	})

	</script>
	
	
	<div class="papagoWrap">
		
		<div class="h1Wrap"><h1>& Makeulike</h1></div>
		
		
		<div class="h2Wrap"><i class="fas fa-map"></i><h2>세계 환율 지도</h2></div>
		<style>
		.loading {position:fixed; left:0; top:0; width: 100%; height: 100%; z-index: 999; text-align: center; background:rgba(0,0,0,.1); display: none;}
		.loading i {position: absolute; left:50%; top:50%; margin:-100px 0 0 -100px; color:#1789cd; font-weight:bold; font-size:100px;}
		
		
		.h2Wrap .fa-cloud.green {color:#00c63c}
		.h2Wrap .fa-cloud {color:#1789cd}
		.h2Wrap .fa-map {color:#1789cd}
		
		.exCalWrap {position: relative; height: 600px; margin-bottom: 100px;}
		.worldImg img {width: 100%;}
		/* .worldList {background:url('./images/world4.png') center top no-repeat; width:1280px; height: 2945px; background-size:1280px auto;} */
		.worldList ul li{ position: absolute; top:0; left:0; text-align: center; display: inline-block;width:30px; }

		.worldList ul li .img {display:inline-block; border-radius:100px; width: 25px; height:15px; overflow:hidden; border:1px solid #ccc; cursor:pointer;}
		.worldList ul li .img img {width: 100%; position: relative; top:-1px;}
		.worldList ul li .tit {display: block; text-align: center; font-size:15px; color:#fafafa; padding-bottom: 10px; font-weight: bold; padding-top: 5px;}
		.worldList ul li .tit img {vertical-align: middle; width:30px; margin-right: 3px;}
		.worldList ul li .base {display: block; font-size: 13px;  color:#fafafa;  margin-bottom: 5px;}
		.worldList ul li .state {display: block; font-size: 13px;  color:#fafafa; padding-bottom: 5px;}
		.worldList ul li .state em {color:#fff600; font-size: 13px; font-weight: bold;}
		.worldList ul li .pop {position:absolute; left:50%; top:-95px; white-space:nowrap;  display: none; padding:5px; width: 140px; margin-left:-70px; border:1px solid #fff; background:rgba(0,72,169,.95);}
		.worldList ul li .img:hover  {border:2px dashed #62b5ff}

		.worldList ul li.no0 {left:605px; top:250px;}
		.worldList ul li.no1 {left:815px; top:405px;}
		.worldList ul li.no2 {left:592px; top:238px;}
		.worldList ul li.no3 {left:161px; top:125px;}
		.worldList ul li.no4 {left:475px; top:161px;}
		.worldList ul li.no5 {left:728px; top:200px;}
		.worldList ul li.no6 {left:480px; top:130px;}
		.worldList ul li.no7 {left:508px; top:210px;}
		.worldList ul li.no8 {left:450px; top:130px;}
		.worldList ul li.no9 {left:760px; top:247px;}
		.worldList ul li.no10 {left:770px; top:325px;}
		.worldList ul li.no11 {left:826px; top:203px;}
		.worldList ul li.no12 {left:797px; top:203px;}
		.worldList ul li.no13 {left:577px; top:221px;}
		.worldList ul li.no14 {left:732px; top:313px;}
		.worldList ul li.no15 {left:482px; top:105px;}
		.worldList ul li.no16 {left:925px; top:460px;}
		.worldList ul li.no17 {left:577px; top:254px;}
		.worldList ul li.no18 {left:509px; top:111px;}
		.worldList ul li.no19 {left:740px; top:334px;}
		.worldList ul li.no20 {left:730px; top:278px;}
		.worldList ul li.no21 {left:190px; top:197px;}
		#wrapper {
			position: absolute;
			z-index: 1;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			overflow: hidden;
		}

		#scroller {
			position: absolute;
			z-index: 1;
			width: 100%;
			transition-duration:1000ms;
			-webkit-transform: translateZ(0);
			-moz-transform: translateZ(0);
			-ms-transform: translateZ(0);
			-o-transform: translateZ(0);
			transform: translateZ(0);
			-webkit-touch-callout: none;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			-webkit-text-size-adjust: none;
			-moz-text-size-adjust: none;
			-ms-text-size-adjust: none;
			-o-text-size-adjust: none;
			text-size-adjust: none;
			opacity:0;
		}
		</style>
		
		<div class="exCalWrap">
			<div id="wrapper">
				<div id="scroller">
					<div class="worldList">
						<div class="worldImg"><img src="./images/world4.png" alt=""></div>
					</div>
				</div>
			</div>
			
			
		</div>
		
		<script>
		/* 
		국가 마우스오버시 환율 표시
		줌&드래그로 지도이동가능
		국가 클릭시 환율계산기로 이동
		한국수출입은행 환율 오픈API 정보를 이용
		22개국가 실시간 현재 매매기준율 정보표시
		API조회 제한 없음
		참조 : <a href="https://www.koreaexim.go.kr/site/program/openapi/openApiView?menuid=001003002002001&apino=2&viewtype=C#none" target="_blank">https://www.koreaexim.go.kr/</a>
		사용가능사이트 : 증권, 은행, 해외여행예약 사이트 등
		*/
		
		
		$(window).load(function(){
			$('#scroller').animate({'opacity':1},1000);
		})
		
		$(function(){
			
			$('.worldList').on('mouseenter','ul li',function(){
				$(this).find('.pop').show();
				$(this).css('zIndex',10).siblings().css('zIndex',1);
			})
			$('.worldList').on('mouseleave','ul li',function(){
				$('.worldList ul li').css('zIndex',1);
				$('.worldList ul li .pop').hide();
			})
			
			$('.worldList').on('click','ul li',function(){
				var idx = $(this).index();
				window.location.href ='./index.php#'+idx;
			})
			
			var worldIndex = 21;
			var intervalCheck;
			var totalDate = '';
			var selList = '';
			
			
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
					baseMoney = 1;
					selList += '<div class="selList"><ul>'
					
					
					for(var i=0; i < data.length; i++){
						if(data[i].deal_bas_r == 1){
							data[i].deal_bas_r = '1,000';
						}
						if(i == 10 || i == 11){
							baseMoney = 100;
						}else if(i == 12){
							baseMoney = '1,000';
						}else{
							baseMoney = 1;
						}
						selList += '<li class="no'+i+'">';
						selList += 	'<span class="img"><img src="./images/'+data[i].cur_unit.split(' ')[0].replace('(100)','')+'.jpg" alt="'+data[i].cur_nm.split(' ')[0]+'"></span>';
						selList += 	'<div class="pop">';
						selList += 	'<span class="tit"><img src="./images/'+data[i].cur_unit.split(' ')[0].replace('(100)','')+'.jpg" alt="'+data[i].cur_nm.split(' ')[0]+'">'+data[i].cur_nm.split(' ')[0]+'</span>';
						selList += 	'<span class="base">기준 : <em>'+baseMoney+data[i].cur_nm.split(' ')[1]+'</em></span>';
						selList += 	'<span class="state">환율 : <em>'+data[i].deal_bas_r+'원</em></span>';
						selList += 	'</div>';
						selList += '</li>';
					};
					selList += '</ul></div>'
					
					$('.worldList').append(selList);
					
					// 일본은 100엔당, 인도네시아 100루피당
					console.log(data);
					// console.log('국가 ' + data[11].cur_nm.split(' ')[0]);
					// console.log('통화명 ' + data[11].cur_nm.split(' ')[1]);
					// console.log('송금 받을때 ' + data[11].ttb); 
					// console.log('송금 보낼때 ' + data[11].tts); //가장 기준
					// console.log('매매 기준율	' + data[11].deal_bas_r); 
					
				}
			});
			

			
			
			
			
			
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
			
			
			
			
		})
		
		
		</script>		
		
		
	</div>
	
	
	
	
</body>
</html>



