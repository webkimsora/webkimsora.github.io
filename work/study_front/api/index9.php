<?include "./include/header.php" ?>
<script>
$(function(){nav(3,1)})
</script>

<div class="container">
    
    <div class="explain">
        <section class="cont">
            <div class="h2Wrap">
                <h2>Description</h2>            
            </div>
            
            <ul class="textInfo">
                <li>한국수출입은행 환율 오픈 API</li>
                <li>자바스크립트 배열사용</li>
                <li>국가 마우스오버시 환율 표시</li>
                <li>줌&드래그로 지도이동가능</li>
                <li>국가 클릭시 환율계산기로 이동</li>
                <li>22개국가 실시간 현재 매매기준율 적용</li>
                <li>API조회 제한 없음</li>
                <li>참조 : <a href="https://www.koreaexim.go.kr/site/program/openapi/openApiView?menuid=001003002002001&apino=2&viewtype=C#none" target="_blank">https://www.koreaexim.go.kr/</a></li>
                <li>사용가능사이트 : 증권, 은행, 해외여행예약 사이트 등</li>
            </ul>
        </section>
    </div>

    <iframe class="showFrame" src="./template/exchange/index_world.php" frameborder="0"></iframe>
    
    
    
    
</div>


<?include "./include/footer.php" ?>


