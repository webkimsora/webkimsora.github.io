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
	
</head>
<body>
	

	<div class="loading">
		<i class="fas fa-sync fa-spin"></i>
	</div>
	
	<div class="papagoWrap">
		
		<div class="h1Wrap"><h1>&nbsp;</h1></div>
		
		<div class="h2Wrap"><i class="far fa-comment-dots"></i><h2>영화검색</h2></div>
		
		<div class="searchWrap">
			
			<form id="search">
				
				<div class="searchInput">
					<div class="inner">
						<div class="logo"></div>
						<input type="hidden" name="listCount" value="6"> <!-- 갯수 -->
						<input type="hidden" name="startCount" value="1"> <!-- 갯수 -->
						<input type="hidden" name="searchOption" value="movie"> <!-- 영화 세팅 -->
						<input type="text" placeholder="영화명을 입력해주세요." class="keyword" name="keywordText"></textarea>
						<span class="btnSearch">검색</span>
					</div>
				</div>
				
				<div class="jenreSel">
					<div class="tit">장르<br />선택</div>
					<div class="jenreList">
						<ul>
							<li><input type="radio" name="genre" id="genre1" value="" checked><label for="genre1">전체</label></li>
							<li><input type="radio" name="genre" id="genre2" value="1"><label for="genre2">드라마</label></li>
							<li><input type="radio" name="genre" id="genre3" value="2"><label for="genre3"> 판타지</label></li>
							<li><input type="radio" name="genre" id="genre4" value="3"><label for="genre4"> 서부</label></li>
							<li><input type="radio" name="genre" id="genre5" value="4"><label for="genre5"> 공포</label></li>
							<li><input type="radio" name="genre" id="genre6" value="5"><label for="genre6"> 로맨스</label></li>
							<li><input type="radio" name="genre" id="genre7" value="6"><label for="genre7"> 모험</label></li>
							<li><input type="radio" name="genre" id="genre8" value="7"><label for="genre8">스릴러</label></li>
							<li><input type="radio" name="genre" id="genre9" value="8"><label for="genre9"> 느와르</label></li>
							<li><input type="radio" name="genre" id="genre10" value="9"><label for="genre10">컬트</label></li>
							<li><input type="radio" name="genre" id="genre11" value="10"><label for="genre11">다큐멘터리</label></li>
							<li><input type="radio" name="genre" id="genre12" value="11"><label for="genre12">코미디</label></li>
							<li><input type="radio" name="genre" id="genre13" value="12"><label for="genre13">가족</label></li>
							<li><input type="radio" name="genre" id="genre14" value="13"><label for="genre14">미스터리</label></li>
							<li><input type="radio" name="genre" id="genre15" value="14"><label for="genre15">전쟁</label></li>
							<li><input type="radio" name="genre" id="genre16" value="15"><label for="genre16">애니메이션</label></li>
							<li><input type="radio" name="genre" id="genre17" value="16"><label for="genre17">범죄</label></li>
							<li><input type="radio" name="genre" id="genre18" value="17"><label for="genre18">뮤지컬</label></li>
							<li><input type="radio" name="genre" id="genre19" value="18"><label for="genre19">SF</label></li>
							<li><input type="radio" name="genre" id="genre20" value="19"><label for="genre20">액션</label></li>
							<li><input type="radio" name="genre" id="genre21" value="20"><label for="genre21">무협</label></li>
							<li><input type="radio" name="genre" id="genre22" value="21"><label for="genre22">에로</label></li>
							<li><input type="radio" name="genre" id="genre23" value="22"><label for="genre23">서스펜스</label></li>
							<li><input type="radio" name="genre" id="genre24" value="23"><label for="genre24">서사</label></li>
							<li><input type="radio" name="genre" id="genre25" value="24"><label for="genre25">블랙코미디</label></li>
							<li><input type="radio" name="genre" id="genre26" value="25"><label for="genre26">실험</label></li>
							<li><input type="radio" name="genre" id="genre27" value="26"><label for="genre27">영화카툰</label></li>
							<li><input type="radio" name="genre" id="genre28" value="27"><label for="genre28">영화음악</label></li>
							<li><input type="radio" name="genre" id="genre29" value="28"><label for="genre29">영화패러디포스터</label></li>
						</ul>
					</div>
				</div>
				
				<div class="movieList">
					<ul>
					</ul>					
				</div>
				
				
			</form>
			
		</div>
		
		
	</div>
	<script>
	
	var blank_pattern = /^\s+|\s+$/g; 	//공백 체크
	var totalCount;
	var forCount;
	var totalItem;
	var htmlList = '';
	var totalData;
	var dataPerPage = 6;    // 한 페이지에 나타낼 데이터 수
	var pageCount = 5;        // 한 화면에 나타낼 페이지 수
	var pagingCount;        // 한 화면에 나타낼 페이지 수
	var pagingShow = true;        // 한 화면에 나타낼 페이지 수
	
	function ajaxGo(){
		$('.loading').stop().fadeIn('fast');
		console.log($("#search").serialize());
		
		$.ajax({     
			type:    'POST',
			url:     'search.php',
			data:    $("#search").serialize(),
			async:    true,
			success: function(data) 
			{
				
				var parseData = JSON.parse(data);
				
				console.log(parseData)
				
				totalItem = parseData.items;
				totalCount = parseData.total;
				forCount = totalItem.length;
				
				//페이징처리
				totalData = totalCount;    // 총 데이터 수
				
				if(pagingShow){
					paging(totalData, dataPerPage, pageCount, 1);
				}
				
				
				gridList()
				
				$('.loading').fadeOut('fast');
				
			},error : function() {
				alert('통신실패!!');
			}
			
		});
	}
	
	//리스트 제작
	function gridList(){
		htmlList = '';
		if(totalCount == 0){
			htmlList += '<li class="noDataLi">';
			htmlList += '<div class="noData">검색결과가 없습니다.</div>';
			htmlList += '</li>';
			$('.movieList ul').empty();
			$('.movieList ul').append(htmlList);
		}else{
			for(var i=0; i<forCount; i++){
				htmlList += '<li>';
				htmlList += '<div class="img"><img onerror="this.remove()" src="'+totalItem[i].image+'"></div>';
				htmlList += '<div class="info">';
				htmlList += '<div class="title"><a href="'+totalItem[i].link+'" target="_blank" class="link"><span>' + totalItem[i].title +'</span></a></div>';
				htmlList += '<div class="enTitle">'+totalItem[i].subtitle+'</div>';
				htmlList += '<div class="pubDate">제작년도 : '+totalItem[i].pubDate+'</div>';
				htmlList += '<div class="director">감독 : '+totalItem[i].director+'</div>';
				htmlList += '<div class="actor">배우 : '+totalItem[i].actor+'</div>';
				htmlList += '<div class="userRating">관람객 : '+totalItem[i].userRating+'</div>';
				htmlList += '</div>';
				htmlList += '</li>';
			}
			$('.movieList ul').empty();
			$('.movieList ul').append(htmlList);
		}
	}
	
	$(function(){
		
		//장르선택
		$('.jenreSel .jenreList ul li label').click(function(e){
			
			setTimeout(function(){
				if(pagingShow) return false;
				$('.btnSearch').trigger('click');
			},100)
		})
		
		//검색엔터
		$('.keyword').keydown(function(e){
			if(e.keyCode == 13){
				if(blank()) return false;
				$('.btnSearch').trigger('click');
				return false;
			}
		})
		
		$('.btnSearch').on('click',function(){
			if(blank()) return false;
			pagingShow = true;
			
			//검색시 초기화
			$('input[name="listCount"]').val(6);
			$('input[name="startCount"]').val(1);
			ajaxGo();
		})
		
		
	})
	
	function blank(){
		
		if($('.keyword').val().replace( blank_pattern, '' ) == ""){
			$('.keyword').val('');
			alert('검색어를 입력해주세요');
			$('.keyword').focus();
			return true;
		}
		
	}
	
	
	function paging(totalData, dataPerPage, pageCount, currentPage){
		pagingShow = false;
		
		console.log("currentPage : " + currentPage);
		
		var totalPage = Math.ceil(totalData/dataPerPage);    // 총 페이지 수
		var pageGroup = Math.ceil(currentPage/pageCount);    // 페이지 그룹
		
		console.log("pageGroup : " + pageGroup);
		
		var last = pageGroup * pageCount;    // 화면에 보여질 마지막 페이지 번호
		if(last > totalPage)
		last = totalPage;
		var first = last - (pageCount-1);    // 화면에 보여질 첫번째 페이지 번호
		var next = last+1;
		var prev = first-1;
		
		console.log("last : " + last);
		console.log("first : " + first);
		console.log("next : " + next);
		console.log("prev : " + prev);
		
		var $pingingView = $("#paging");
		
		var html = "";
		
		if(prev > 0){
			html += "<a href='javascript:;' id='prev'><</a> ";
		}
		if(first < 0){
			first = 1;
		}
		
		for(var i=first; i <= last; i++){
			html += "<a href='javascript:;' id=" + i + ">" + i + "</a> ";
		}
		
		if(last < totalPage){
			html += "<a href='javascript:;' id='next'>></a>";
		}
		$("#paging").html(html);    // 페이지 목록 생성
		$("#paging a#" + currentPage).addClass('on')// 현재 페이지 표시
		
		$("#paging a").click(function(){
			var $item = $(this);
			var $id = $item.attr("id");
			var selectedPage = $item.text();
			
			var countVal = $('input[name="listCount"]').val();
			var startVal = $('input[name="startCount"]').val();
			
			if($id == "next"){
				selectedPage = next;
				pagingCount = ((next-1) * countVal)+1;
			}else if($id == "prev"){
				
				selectedPage = prev;
				pagingCount = ((prev-1) * countVal)+1;
				
			}else{
				var agoNum = $("#paging a.on").text();
				var elIndex = $(this).index();
				var elIndexNum = $(this).text();
				
				if(elIndexNum == 1){
					pagingCount = 1;
				}else if(agoNum < elIndexNum){
					pagingCount = ((elIndexNum-1) * countVal) + 1;
				}else{
					pagingCount = parseInt(startVal) - parseInt(countVal);
				}
				
			}
			
			$('input[name="startCount"]').val(pagingCount );
			
			
			ajaxGo();
			paging(totalData, dataPerPage, pageCount, selectedPage);
		});
		
	}
	
	</script>
	
	<div id="paging"></div>
	
	
</body>
</html>



