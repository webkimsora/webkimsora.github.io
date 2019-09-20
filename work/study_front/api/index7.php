<?include "./include/header.php" ?>
<script>
$(function(){nav(2,2)})
</script>

<div class="container">
    
    <div class="explain">
        <section class="cont">
            <div class="h2Wrap">
                <h2>Description</h2>            
            </div>
            
            <ul class="textInfo">
                <li>기상청 날씨누리 오픈 API</li>
                <li>XML 파싱</li>
                <li>전국 중기예보(3일후 ~ 1주일)</li>
                <li>슬라이드UI</li>
                <li>상세보기클릭시 상세정보 팝업</li>
                <li>참조 : <a href="http://www.weather.go.kr/weather/lifenindustry/sevice_rss.jsp" target="_blank">http://www.weather.go.kr</a></li>
                <li>사용가능사이트 : 숙박 및 레저예약사이트, 여행관련사이트 등</li>
            </ul>
        </section>
    </div>
    
        
    <iframe class="showFrame" src="./template/weather/index_slide.php" frameborder="0"></iframe>
    

</div>


<?include "./include/footer.php" ?>


