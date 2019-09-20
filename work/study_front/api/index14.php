<?include "./include/header.php" ?>
<script>
$(function(){nav(2,3)})
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
                <li>전국 중기예보(3일후 ~ 10일후)</li>
                <li>지도/아이콘 형태</li>
                <li>참조 : <a href="http://www.weather.go.kr/weather/lifenindustry/sevice_rss.jsp" target="_blank">http://www.weather.go.kr</a></li>
                <li>사용가능사이트 : 숙박 및 레저예약사이트, 여행관련사이트 등</li>
            </ul>
        </section>
    </div>
    
        
    <iframe class="showFrame" src="./template/weather3/index.html" frameborder="0"></iframe>
    

</div>


<?include "./include/footer.php" ?>


