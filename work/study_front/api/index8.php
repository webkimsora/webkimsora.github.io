<?include "./include/header.php" ?>
<script>
$(function(){nav(3,0)})
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
                <li>양방향 실시간 환율 계산기</li>
                <li>22개국가 실시간 현재 매매기준율 적용</li>
                <li>API조회 제한 없음</li>
                <li>참조 : <a href="https://www.koreaexim.go.kr/site/program/openapi/openApiView?menuid=001003002002001&apino=2&viewtype=C#none" target="_blank">https://www.koreaexim.go.kr/</a></li>
                <li>사용가능사이트 : 증권, 은행, 해외여행예약 사이트 등</li>
            </ul>
        </section>
    </div>

    <iframe class="showFrame" src="./template/exchange/index.php" frameborder="0"></iframe>
    

</div>


<?include "./include/footer.php" ?>


