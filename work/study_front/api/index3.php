<?include "./include/header.php" ?>
<script>
$(function(){nav(1,0)})
</script>

<div class="container">
    
    <div class="explain">
        <section class="cont">
            <div class="h2Wrap">
                <h2>Description</h2>            
            </div>
            
            <ul class="textInfo">
                <li>JSON방식 데이타파싱</li>
                <li>네이버맵API 호출 후 검색조건에 맞게 데이타위도경도 표시</li>
                <li>레이어팝업은 별도의 UI 함수 호출(맵 기능X)</li>
                <li>현재는 캠핑장명, 지역 검색</li>
                <li>네이버맵 클래스터화 기능 추가시 객체추가<br />init({<br /><span style="margin-right: 30px;"></span>cluster: true<br />});<br />(./js/lib/MarkerClustering.js &lt;-- 해당 js 추가해야함)</li>
                <li>참조문서1 : 네이버맵API <a href="https://navermaps.github.io/maps.js/" target="_blank">https://navermaps.github.io/maps.js/</a></li>
                <li>참조문서2 : 데이터포탈 <a href="https://www.data.go.kr/dataset/15021139/standard.do" target="_blank">https://www.data.go.kr/dataset/15021139/standard.do</a></li>
                <li style="color: red;">
                    필수데이터요소
                    <br />- 위도(lat)<br />- 경도(lng)<br />- 명칭(이름)<br />- 주소(도로명 또는 지번)
                </li>
            </ul>
        </section>
    </div>
    
        
    <iframe class="showFrame" src="./template/naver_map/" frameborder="0"></iframe>
    

</div>


<?include "./include/footer.php" ?>


