<?include "./include/header.php" ?>
<script>
$(function(){nav(0,0)})
</script>

<div class="container">
    
    <div class="explain">
        <section class="cont">
            <div class="h2Wrap">
                <h2>Description</h2>            
            </div>
            
            <ul class="textInfo">
                <li>Papago SMT 번역이란 파파고의 통계 기반 기계 번역 기술로 텍스트를 번역한 결과를 반환하는 RESTful API</li>
                <li>비로그인 방식 오픈 API</li>
                <li>Java,PHP,Node.js,Python,C# 지원 (예제는 php사용)</li>
                <li>한 번에 번역할 수 있는 분량은 최대 5,000자</li>
                <li>무료 1일 10,000자</li>
                <li>제휴신청시 1,000,000글자 -> 10,000원</li>
                <li>한국어 <-> 영어,한국어 <-> 일본어,한국어 <-> 중국어 </li>
                <li>참조 : <a href="https://developers.naver.com/docs/papago/" target="_blank">https://developers.naver.com/docs/papago/</a></li>
                <li>사용가능사이트 : 어학원,실시간상담,신문사,글로벌사이트 등등</li>
                <li class="red">하루사용량 초과시 번역안됨</li>
            </ul>
        </section>
    </div>
    
        
    <iframe class="showFrame" src="./template/papago/index_smt.php" frameborder="0"></iframe>
    

</div>


<?include "./include/footer.php" ?>


