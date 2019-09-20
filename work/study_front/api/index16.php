<?include "./include/header.php" ?>
<script>
$(function(){nav(4,0)})
</script>

<div class="container">
    
    <div class="explain">
        <section class="cont">
            <div class="h2Wrap">
                <h2>Description</h2>            
            </div>
            
            <ul class="textInfo">
                <li>네이버 검색 API - 뉴스</li>
                <li>vue.js로 구현</li>
                <li>무한스크롤링</li>
                <li>1일 25,000건 조회가능</li>
                <li>참조 : <a href="https://developers.naver.com/docs/search/news/" target="_blank">https://developers.naver.com/</a></li>
                <li>사용가능사이트 : 뉴스,영화,이미지,쇼핑등 검색기능이 필요한 사이트</li>
            </ul>
        </section>
    </div>

    <iframe class="showFrame" src="./template/search/index_news.php" frameborder="0"></iframe>
    
    
    
    
</div>


<?include "./include/footer.php" ?>


