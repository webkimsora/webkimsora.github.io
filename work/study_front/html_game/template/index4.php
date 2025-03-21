
        <?include "./include/header.php" ?>

        <div class="content-page">
            <div class="content">
                <div class="container-fluid">
                    
                    <div class="row">
                        <div class="col-md-9">
                            <div class="card-box">
                                <h4 class="header-title m-t-0 m-b-30">게임화면</h4>
                                <iframe src="../HTMLGAME_WRONG_FIND/index.html" id="htmlGameFrame" style="width: 100%; height: 790px; background: #fff; border: none;"></iframe>
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
                                                        <li>게임 이미지</li>
                                                        <li>기회</li>
                                                        <li>틀린 그림 개수</li>
                                                        <li>시간제한</li>
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
                                                <li>IE 9++, 크롬, 파이어폭스, 오페라, 사파리</li>
                                                <li>모바일 지원가능<br />* 디자인별로 반응형 또는 모바일화 하여 사용가능</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-left m-t-30">
                                    <!-- <a href="#" class="btn btn-default btn-custom waves-effect w-md m-b-5 getGameSrc">LIVE VIEW</a> -->
                                    <a href="../HTMLGAME_WRONG_FIND/HTMLGAME_WRONG_FIND.zip" target="_blank" class="btn btn-block btn-info btn-custom waves-effect w-md waves-light m-b-5">DOWNLOAD</a>
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