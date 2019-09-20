<?include "./include/header.php" ?>
<script>
$(function(){nav(2,4)})
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
                <li>동네예보(당일 ~ 3일)</li>
                <li>참조 : <a href="http://www.weather.go.kr/weather/lifenindustry/sevice_rss.jsp" target="_blank">http://www.weather.go.kr</a></li>
                <li>사용가능사이트 : 숙박 및 레저예약사이트, 여행관련사이트 등</li>
                <li style="color: red;">
                    필수데이터요소
                    <br />- "동"코드값(ex: 삼성1동 = 1168058000)<br />- 시,구 검색이 아닌 "동"에서 검색만 가능합니다.
                </li>
            </ul>
        </section>
    </div>
    
        
    <iframe class="showFrame" src="./template/weather2/" frameborder="0"></iframe>
    

</div>


<?include "./include/footer.php" ?>


