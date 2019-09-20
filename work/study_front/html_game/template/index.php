        <?include "./include/header.php" ?>
        
        <div class="content-page">
            <div class="content">
                <div class="container-fluid">
                    
                    <div class="row">
                        <div class="col-md-9">
                            <div class="card-box">
                                <h4 class="header-title m-t-0 m-b-30">게임화면</h4>
                                <iframe src="../HTMLGAME_ROCK_PAPER_SCISS/index.html" id="htmlGameFrame" style="width: 100%; height: 700px; background: #fff; border: none;"></iframe>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card-box">
                                <h4 class="header-title m-t-0 m-b-30">게임정보</h4>
                                <div class="game_info">
                                    <div class="panel-collapse collapse show">
                                        <div class="portlet-body">
                                            <ol>
                                                <li class="m-b-15">커스텀 가능요소
                                                    <ul>
                                                        <li>버튼 텍스트&모양</li>
                                                        <li>키코드 변경 가능</li>
                                                        <li>스피드조절</li>
                                                        <li>라이프 횟수</li>
                                                        <li>스플릿이미지</li>
                                                        <li>스코어</li>
                                                        <li>콜백레이어팝</li>
                                                        <li>등등 모든요소</li>
                                                    </ul>
                                                </li>
                                                <li class="m-b-15">
                                                    매칭조건 변경가능
                                                    <ul>
                                                        <li>가위바위보 게임 뿐만아닌, <br />match : true, <br />leng : 1~ <br />적용하면 단순 매칭게임가능<br />(1:1매칭게임 등등)</li>
                                                    </ul>
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-box">
                                <h4 class="header-title m-t-0 m-b-30">게임스펙</h4>
                                <div class="game_info">
                                    <div class="panel-collapse collapse show">
                                        <div class="portlet-body">
                                            <ol>
                                                <li>익스8++, 크롬, 파이어폭스, 오페라, 사파리</li>
                                                <li>모바일 지원가능<br />* 디자인별로 반응형 또는 모바일화 하여 사용가능</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-left m-t-30">
                                    <!-- <a href="#" class="btn btn-default btn-custom waves-effect w-md m-b-5 getGameSrc">LIVE VIEW</a> -->
                                    <a href="../HTMLGAME_ROCK_PAPER_SCISS/HTMLGAME_ROCK_PAPER_SCISS.zip" class="btn btn-block btn-info btn-custom waves-effect w-md waves-light m-b-5">DOWNLOAD</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    
                    
                </div>
                <!-- end row -->
            </div>
            <!-- end container -->
        </div>
        <!-- end content -->
        
        
    </div>
</div>
<!-- END wrapper -->




<script src="./js/jquery.min.js"></script>
<script>
$(document).ready(function() {
    var $frame = $('#htmlGameFrame');
    /*$('.getGameSrc').click(function(){
    $frame.attr('src' , '../HTMLGAME_ROCK_PAPER_SCISS/index.html');
    return false;
});*/
});
</script>

</body>

</html>