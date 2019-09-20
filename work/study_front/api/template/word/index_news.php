<!DOCTYPE HTML>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<title>메큐라이크 - Naver 검색</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<!-- <meta name="viewport" content="user-scalable=yes, initial-scale=1.0, maximum-scale=2.0, minimum-scale=1.0, width=device-width"> -->
	<link rel="stylesheet" type="text/css" href="./css/common.css?v=01"  media="all" />
	<script type="text/javascript" src="./js/jquery-1.11.3.min.js" ></script>
	<script type="text/javascript" src="./js/common.js" ></script>
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
	<script src="./js/moment-with-locales.min.js"></script>
	<script src="./js/vue.js"></script>
</head>
<body>
	
	
	<div class="loading">
		<i class="fas fa-sync fa-spin"></i>
	</div>
	<style>
		.newsList ul {}
		.newsList ul:after {content:''; display:block; clear:both;}
		
		.newsList ul li{border:1px solid #4267b2; box-shadow:3px 3px 3px rgba(66,103,178,.4); margin-bottom: 30px; padding:30px 20px 20px 40px; transition:1s all; position: relative;}
		.newsList ul li:after {content:''; display:block; clear:both;}
		.newsList ul li .num {position: absolute; left:5px; top:5px; display: inline-block; padding:2px 5px; border-radius:5px; border:1px solid #2a623f; background:rgba(66,103,178,.7); color:#fff;}
		.newsList ul li .title {font-size: 20px; padding-bottom: 10px;}
		.newsList ul li .title a {font-weight: bold;}
		.newsList ul li .title a:hover { text-decoration: underline;}
		.newsList ul li .link {padding-bottom: 20px;}
		.newsList ul li .link div {display: inline-block; margin-right: 5px;}
		.newsList ul li .link div a {display: inline-block; padding:3px 5px; border:1px solid #aaa; border-radius:3px; background: #fafafa;}
		.newsList ul li .description {font-size: 17px; margin-bottom: 10px; line-height: 28px;}
		.newsList ul li .description b {font-size: 20px;color:#42b983}
		.newsList ul li .pubDate {font-size: 12px;}
		.noDataLi {padding:40px 0; text-align: center; font-size: 30px; min-height: 0; }
		.last {border:1px solid #ccc; padding:40px 0; text-align: center; font-size: 30px; min-height: 0; display: none;  font-weight: bold;}
		.total {text-align: right; padding-bottom: 10px; font-size: 17px;}
		.total span {font-weight:bold; color:#0086ff}
		.fakeHead {height: 45px; display:none; margin-bottom: 50px;}
		.searchInput .totalPop {display: none;}
		#app.on .searchInput {position: fixed; left:0; top:0; width: 100%; background:#fff; z-index: 10; margin:0; padding:20px 0; border-bottom:1px solid #ddd;  }
		#app.on .searchInput .inner {margin:0 auto;}
		#app.on .searchInput .inner .totalPop {position: absolute; right:-220px; top:10px; display: block;}
		#app.on .fakeHead {display: block; }
		[v-cloak] {display: none;}
		</style>
	<div class="papagoWrap">
		
		<div class="h1Wrap"><h1>& Makeulike</h1></div>
		
		<div class="h2Wrap"><i class="far fa-comment-dots"></i><h2>뉴스검색</h2></div>

			<div class="searchWrap">
				
				<form id="search" onsubmit="return false;">
					<div id="app" v-cloak>
						<div class="searchInput">
							<div class="inner">
								<div class="logo"></div>
								<input type="hidden" name="listCount" value="10"> <!-- 갯수 -->
								<input type="hidden" name="startCount" value="1"> <!-- 갯수 -->
								<input type="hidden" name="searchOption" value="news"> <!-- 뉴스 세팅 -->
								<input type="text" placeholder="검색어를 입력해주세요." class="keyword"  v-on:keyup.enter="searchGo()" name="keywordText"></textarea>
								<span class="btnSearch" v-on:click="searchGo()">검색</span>
								<div class="totalPop">
									<div class="total">검색결과개수 : <span>{{total}}</span></div>
								</div>
							</div>
							
						</div>
						<div class="fakeHead"></div>
						
						<div class="newsList" >
							
							<div v-if="arrList.length > 0 ">
								<div class="total">검색결과개수 : <span>{{total}}</span></div>
								<ul>
									<li v-for="(value,index) in arrList" class="item">
										<div class="num">{{index+1}}</div>
										<div class="title"><a v-html="value.title" v-bind:href="value.link">{{value.title}}</a></div>
										<div class="link">
											<div class="originallink"><a v-bind:href="value.originallink" target="_blank">원문링크</a></div>
											<div> <a v-bind:href="value.link" target="_blank">네이버링크</a> </div>
										</div>
										<div class="description" v-html="value.description">{{value.description}}</div>
										<div class="pubDate">{{ value.pubDate | moment }}</div>
									</li>
								</ul>
							</div>				
							<div v-else>
								<div class="noDataLi" v-if="searchStart">{{message}}</div>
							</div>
							
							<div class="last">마지막 게시물입니다.</div>
						</div>
					</div>
					
				</form>
				
			</div>
			
			<div id="paging"></div>
			
		</div>
		
		<div class="btnTop" id="topButton" v-cloak>
			<a href="javascript:;" v-on:click="gotoTop"  v-bind:class="{active : isActive }">▲</a>
		</div>
		
		<script>
		
		var page = 1; // 페이지수
		var scCheck = true; // 스크롤체크
		var last = true; // 마지막체크
		var blank_pattern = /^\s+|\s+$/g; 	//공백 체크
		list = []; // 리스트

		
		//초기세팅
		var app = new Vue({
			el: '#app',
			data: {
				arrList : list,
				message : '검색결과가 없습니다.',
				total : 0,
				searchStart : false
			},

			methods: {
				moment: function () {
					return moment();
				},
				searchGo: function () {
					if(blank()) return false;
					
					//검색시 초기화
					$('input[name="listCount"]').val(10);
					$('input[name="startCount"]').val(1);
					
					topButton.gotoTop();
					
					//초기 삭제
					page = 1;
					this.arrList.splice(this);
					ajaxGo();
					
					
				}
			},
			filters: {
				moment: function (date) {
					//날짜변환
					moment.locale('ko');
					return moment(date).format('YYYY MMMM Do, h:mm:ss a');
				}
			}
			
		});
		
		var totalCount;
		var totalItem;
		
		//3자리 콤마찍기 정규식
		function numberWithCommas(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
		
		//아작스 Go
		function ajaxGo(){
			//$('.loading').stop().fadeIn('fast');
			//console.log($("#search").serialize());
			
			$.ajax({     
				type:    'POST',
				url:     'search.php',
				data:    $("#search").serialize(),
				async:    false,
				success: function(data) 
				{
					
					var parseData = JSON.parse(data);
					
					console.log(parseData);

					totalItem = parseData.items;
					totalCount = parseData.total;
					totalDisplay = parseData.display;
					
					if(totalDisplay < 0){
						$('.newsList .last').show();
						last = false;
						return false;
					}else{
						$('.newsList .last').hide();
						last = true;
					}
					
					for(var i=0; i<totalItem.length; i++) {
						list.push(totalItem[i]);
					}
					
					
					if(totalCount == 0){
						app.searchStart = true;
					}else{
						app.searchStart = false;
					}
					
					app.total = numberWithCommas(totalCount);
					
					
				},error : function() {
					alert('통신실패!!');
				}
				
			});
		}
		
		//공백방지
		function blank(){
			
			if($('.keyword').val().replace( blank_pattern, '' ) == ""){
				$('.keyword').val('');
				alert('검색어를 입력해주세요');
				$('.keyword').focus();
				return true;
			}
			
		}
		
		
		//위로가기
		var topButton = new Vue({
			el : '#topButton',
			data : {
				defaultTop : '100',
				getTop : '0',
				isActive: false
			},
			mounted : function(){
				this.getWindow();
			},
			watch : {
				getTop : function(newActive){
					if(this.getTop > this.defaultTop){
						this.isActive = true;
						$('#app').addClass('on');
					}else{
						this.isActive = false;
						$('#app').removeClass('on');
					}
					if(this.getTop - 220 > this.defaultTop ){
						$('#app').addClass('on');
					}else{
						$('#app').removeClass('on');
					}
				}
			},
			methods : {
				gotoTop:function(){
					$('body,html').stop().animate({scrollTop:0},500)
				},
				getWindow:function(){
					$(window).on('scroll',function(){
						topButton.getTop = $(window).scrollTop();
					});
				}
			}
		})
		
		//무한스크롤
		$(window).scroll(function() {
			
			if (($(window).scrollTop()+200) >= $(document).height() - $(window).height()) {
				if(scCheck && last){
					scCheck = false;
					$('input[name="startCount"]').val((10*page)+1);
					ajaxGo();
					page++
					setTimeout(function(){
						scCheck = true;
					},100)
				}
			}
		});
		
		</script>
		

	</body>
	</html>
	
	
	
