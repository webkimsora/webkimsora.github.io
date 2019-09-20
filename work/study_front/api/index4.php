<?include "./include/header.php" ?>
<script>
$(function(){nav(1,1)})
</script>

<div class="container">
    
    <div class="explain">
        <section class="cont">
            <div class="h2Wrap">
                <h2>Description</h2>            
            </div>
            
            <ul class="textInfo">
                <li>JSON방식 데이타파싱</li>
                <li>로드시 데이터 뿌려줌</li>
                <li>지역, 휴게소명 검색</li>
                <li>네이버맵 클래스터화 기능 추가</li>
                <li>참조문서1 : 네이버맵API <a href="https://navermaps.github.io/maps.js/" target="_blank">https://navermaps.github.io/maps.js/</a></li>
                <li>참조문서2 : 데이터포탈 <a href="https://www.data.go.kr/dataset/15021139/standard.do" target="_blank">https://www.data.go.kr/dataset/15021139/standard.do</a></li>
                <li style="color: red;">
                    필수데이터요소
                    <br />- 위도(lat)<br />- 경도(lng)<br />- 명칭(이름)<br />- 주소(도로명 또는 지번)
                </li>
            </ul>
        </section>
    </div>
    
        
    <iframe class="showFrame" src="./template/naver_map2/" frameborder="0"></iframe>
    

</div>


<?include "./include/footer.php" ?>


