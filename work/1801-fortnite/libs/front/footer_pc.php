
    
            <!-- @ footer -->			

            <footer class="footer">
                <div class="inner">
                    <img src="./libs/front/images/copyright.png?v=01"  alt="">
                    <div class="a11y">
                        (유)에픽게임즈 코리아 서울특별시 강남구 논현로 127길 13-11 (우)06112<br>
                        Tel: 02.568.3742 Fax: 02.568.3706 (유)에픽게임즈 코리아 대표이사:박성철<br>
                        사업자등록번호 101-86-46206 통신판매업 신고번호 제2017-서울강남-04271호<br>
                        ⓒ EPIC GAMES, Inc. All Rights Reserved.                                
                    </div>            
					<img class="copyright" src="./libs/front/images/footer-copyright.png"  alt="">
                </div>
            </footer>
            <!-- //@ footer -->
        </main>

        
    <!-- @@ 영상화면 -->
    <div id="popup-video" class="modal" data-role="modal">
        <section class="modal-content">
            <div class="movie-frame">
                <iframe src="" frameborder="0"></iframe>
            </div>
            <a href="javascript:void(0)" data-rel="back" class="modal-btn-close">
                <img src="./libs/front/images/btnClose.png" alt="닫기">
            </a>
        </section>
    </div>
	
        <!-- @ 팝업 - 가입참여 유의사항 -->
        <div id="popReser" class="modal" data-role="modal">
            <section class="modal-content">
                <img src="./libs/front/images/popReser.png?v=01"  alt="">
                <a href="javascript:void(0)" data-rel="back" class="modal-btn-close">
                    <img src="./libs/front/images/btnClose.png"  alt="확인">
                </a>
            </section>
        </div>

        <!-- @ 팝업 - 가입참여 유의사항 -->
        <div id="popJoin" class="modal" data-role="modal">
            <section class="modal-content">
                <img src="./libs/front/images/popJoin.png?v=01"  alt="">
                <a href="javascript:void(0)" data-rel="back" class="modal-btn-close">
                    <img src="./libs/front/images/btnClose.png"  alt="확인">
                </a>
            </section>
        </div>
        
        <!-- @ 팝업 - 추가이벤트 유의사항 -->
        <div id="popAddevent" class="modal" data-role="modal">
            <section class="modal-content">
                <img src="./libs/front/images/popAddevent.png"  alt="">
                <a href="javascript:void(0)" data-rel="back" class="modal-btn-close">
                    <img src="./libs/front/images/btnClose.png"  alt="확인">
                </a>
            </section>
        </div>
        
        <!-- @ 팝업 - 사전예약 자세히보기 -->
        <div id="popReservation" class="modal" data-role="modal">
            <section class="modal-content">
                <img src="./libs/front/images/popReservation.png"  alt="">
                <a class="btnOk" href="javascript:void(0)" data-rel="back">
                    확인
                </a>            
                <a href="javascript:void(0)" data-rel="back" class="modal-btn-close">
                    <img src="./libs/front/images/btnClose.png"  alt="확인">
                </a>
            </section>
        </div>

        
        <!---------------
        @ 로그인창 본인인증
        ----------------->
        <div class="popLogin popup" >
            <div class="bg"></div>
            <div class="popIn">
                <div class="content">
                    <img src="./libs/front/images/popLogin.png"  alt="">
                    <div class="inner">
                        <form method="post" action="" >
                            <input type="email"   name="uemail2" id="uemail2" maxlength="30">
                            <input type="tel"  name="uphone2" id="uphone2" maxlength="11">
                            <a class="btnLogin" href="javascript:;"  onclick="check_Join();save_gtag('click','reservation','로그인');"><img src="./libs/front/images/spacer.png"  alt=""></a>
                        </form>
                    </div>
                </div>
                <div class="modal-btn-close" onclick="popLoginClose();">
                    <img src="./libs/front/images/btnClose.png"  alt="확인">
                </div>
            </div>
        </div>

        <!---------------
        @ 알럿창
        알럿 사용시 필요한 스크립트 소스 안에
        alertModal('문구내용적기'); 로 사용
        ----------------->
        <div class="alertWrap popup" >
            <div class="bg"></div>
            <div class="popIn">
                <div class="content">
                    <div id="atext">알럿문구<br>두줄사용</div>                    
                    <div class="btnOk" onclick="alertClose();">
                        확인
                    </div>                    
                </div>
                <div class="modal-btn-close" onclick="alertClose();">
                    <img src="./libs/front/images/btnClose.png"  alt="확인">
                </div>
            </div>
        </div>
        <!-- @ // 알럿창 -->


		<!---------------
        @ 당첨자 팝업
        ----------------->
        <div class="congAlert popup" >
            <div class="bg"></div>
            <div class="popIn">
                <div class="content">
                    <div class="text">
					에픽게임즈코리아(유)는 귀하가 제공한 개인정보를 페이스북 이벤트<br>
					경품 발송의 목적으로 (주)메큐라이크에 그 처리를 위탁하는 바,<br>
					(주)메큐라이크는 행사 관련기간인 2018년 2월 9일 ~ 2월 25일까지 보유하고<br>
					그 이후 귀하의 개인정보를 즉시 폐기할 것입니다.<br>
					<div class="up">※ 개인정보처리방침 바로가기 ▶ <a href="https://www.epicgames.com/ko/privacypolicy" target="_blank">https://www.epicgames.com/ko/privacypolicy</a></div>
					</div>         
                </div>
                <div class="modal-btn-close" onclick="congAlertClose();">
                    <img src="./libs/front/images/btnClose.png"  alt="확인">
                </div>
            </div>
        </div>
        <!-- @ // 알럿창 -->
		
        <!---------------
        @ 참여완료
        ----------------->
        <div class="complete popup" >
            <div class="bg"></div>
            <div class="popIn">
                <div class="content">
                    <div class="text">참여완료 되었습니다.</div>                    
                    <div class="btnOk" onclick="completeClose();">
                        확인
                    </div>                    
                </div>
                <div class="modal-btn-close" onclick="completeClose();">
                    <img src="./libs/front/images/btnClose.png"  alt="확인">
                </div>
            </div>
        </div>
        <!-- @ // 알럿창 -->
		
        <!---------------
        @ 사전예약필요
        ----------------->
        <div class="reserGo popup" >
            <div class="bg"></div>
            <div class="popIn">
                <div class="content">
                    <div class="text">사전예약이 필요합니다.</div>                    
                    <div class="btnOk" onclick="reserGoClose();">
                        확인
                    </div>                    
                </div>
                <div class="modal-btn-close" onclick="completeClose();">
                    <img src="./libs/front/images/btnClose.png"  alt="확인">
                </div>
            </div>
        </div>
        <!-- @ // 사전예약필요 -->

		
        <!-- @ 팝업 - 당첨자팝업 -->
        <div id="popLottoWrap" class="lotto modal" data-role="modal">
            <section class="modal-content">
                <img src="./libs/front/images/popLotto.png"  alt="">
				<div class="popContent">
					<div class="lottoSnsWrap">
						<a href="https://www.facebook.com/notes/%ED%8F%AC%ED%8A%B8%EB%82%98%EC%9D%B4%ED%8A%B8-fortnite-korea/%EB%8B%B9%EC%B2%A8%EC%9E%90-%EB%B0%9C%ED%91%9C-%EC%82%AC%EC%A0%84%EC%98%88%EC%95%BD-%EC%98%81%EC%83%81-%EA%B0%90%EC%83%81%ED%8F%89-%EC%9D%B4%EB%B2%A4%ED%8A%B8/255063588364253/"  target="_blank"><i class="sp-lottoSns elem1">페이스북</i></a>
						<a href="http://cafe.naver.com/fortnitekr/1629" target="_blank"><i class="sp-lottoSns elem2">카페</i></a>
					</div>
					<div class="lottoTabWrap">
						<a class="on" href="javascript:;"><i class="sp-lottoTab elem1">1차</i></a>
						<a href="javascript:;"><i class="sp-lottoTab elem2">2차</i></a>
						<a href="javascript:;"><i class="sp-lottoTab elem3">3차</i></a>
					</div>
					<div class="lottoTabSection on">						
						<h3 class="title"><img src="./libs/front/images/popLotto1-title.png"  alt=""></h3>
						<ul class="box">
							<li>
								<h3><img src="./libs/front/images/popLotto1-subTitle1.png"  alt=""></h3>
								<p>ceril***@gmail.com</p>
							</li>
							<li>
								<h3><img src="./libs/front/images/popLotto1-subTitle2.png"  alt=""></h3>
								<p>leesh1***@empal.com</p>
								<p>khan3***@naver.com</p>
							</li>
							<li>
								<h3><img src="./libs/front/images/popLotto1-subTitle3.png"  alt=""></h3>
								<p>13333***@naver.com</p>
								<p>2000tpg***@naver.com</p>
								<p>6812***@naver.com</p>
							</li>
						</ul>
						<div class="giftcard">
							<h3><img src="./libs/front/images/popLotto-subTitle4.png"  alt=""></h3>
							<ul class="list">
								<li>kevin9***@naver.com</li>
								<li>shgusdn1***@naver.com</li>
								<li>azit1***@naver.com</li>
								<li>s26626***@gmail.com</li>
								<li>eu***@nate.com</li>
								<li>osubin0***@naver.com</li>
								<li>ikik***@naver.com</li>
								<li>rkdgkrt***@naver.com</li>
								<li>fnvlwk***@naver.com</li>
								<li>hde2***@naver.com</li>
								<li>jaemin0***@gmail.com</li>
								<li>ssongbir***@naver.com</li>
								<li>kimsehun***@naver.com</li>
								<li>goyoungsu0***@gmail.com</li>
								<li>gyul***@naver.com</li>
								<li>jumilovi***@naver.com</li>
								<li>sinjy***@naver.com</li>
								<li>a2230***@gmail.com</li>
								<li>kjh19***@nate.com</li>
								<li>smk2***@naver.com</li>
								<li>exr2***@nate.com</li>
								<li>rudtn3***@naver.com</li>
								<li>gille***@naver.com</li>
								<li>oread7***@naver.com</li>
								<li>cham***@naver.com</li>
								<li>jomg4***@naver.com</li>
								<li>delete0***@naver.com</li>
								<li>gost***@naver.com</li>
								<li>sjw2***@naver.com</li>
								<li>kms563***@gmail.com</li>
								<li>caren***@naver.com</li>
								<li>honmi0***@naver.com</li>
								<li>sh1348***@gmail.com</li>
								<li>cardist1***@gmail.com</li>
								<li>psj02***@gmail.com</li>
								<li>pjy1105e***@gmail.com</li>
								<li>da***@nate.com</li>
								<li>cjh9***@gmail.com</li>
								<li>kyw9***@gmail.com</li>
								<li>rlaxotnxo***@naver.com</li>
								<li>pc0***@naver.com</li>
								<li>he***@naver.com</li>
								<li>kkim***@gmail.com</li>
								<li>h990***@naver.com</li>
								<li>yjook***@gmail.com</li>
								<li>star***@naver.com</li>
								<li>harugl***@naver.com</li>
								<li>dhgmlsk***@naver.com</li>
								<li>kc***@naver.com</li>
								<li>invento***@naver.com</li>
								<li>byu***@gmail.com</li>
								<li>vgk1***@gmail.com</li>
								<li>gu***@nate.com</li>
								<li>thsqud***@naver.com</li>
								<li>jman***@naver.com</li>
								<li>apollo***@naver.com</li>
								<li>yos***@hanmail.net</li>
								<li>idc***@gmail.com</li>
								<li>mavl***@gmail.com</li>
								<li>saem***@gmail.com</li>
								<li>vbvb6***@daum.net</li>
								<li>quit***@msn.com</li>
								<li>jjcosmo***@gmail.com</li>
								<li>kimminseo0***@gmail.com</li>
								<li>botta.y***@gmail.com</li>
								<li>mus***@naver.com</li>
								<li>tjemsdjxp***@naver.com</li>
								<li>seankim.***@gmail.com</li>
								<li>yackchoch***@gmail.com</li>
								<li>visualwiz***@gmail.com</li>
								<li>sdh***@naver.com</li>
								<li>tei***@naver.com</li>
								<li>wjdgus***@naver.com</li>
								<li>limci***@hanmail.net</li>
								<li>yeeun***@gmail.com</li>
								<li>lesong***@naver.com</li>
								<li>aasamsu***@gmail.com</li>
								<li>zm12123***@naver.com</li>
								<li>jdg***@naver.com</li>
								<li>blueme***@naver.com</li>
								<li>sepe***@naver.com</li>
								<li>dinos***@naver.com</li>
								<li>lims***@naver.com</li>
								<li>vuv***@naver.com</li>
								<li>rocke***@hanmail.net</li>
								<li>jaehoon4***@gmail.com</li>
								<li>hms0***@naver.com</li>
								<li>exolosi***@gmail.com</li>
								<li>hue***@naver.com</li>
								<li>kimbs***@naver.com</li>
								<li>naa1***@naver.com</li>
								<li>kamin3***@gmail.com</li>
								<li>ghkvud1***@naver.com</li>
								<li>kimjhr***@gmail.com</li>
								<li>mingyu***@naver.com</li>
								<li>hto0***@naver.com</li>
								<li>kl2456***@gmail.com</li>
								<li>jhj486***@naver.com</li>
								<li>taehj***@naver.com</li>
								<li>umsang***@gmail.com</li>
								<li>ohjihong0***@gmail.com</li>
								<li>hh1004***@gmail.com</li>
								<li>angelofs***@naver.com</li>
								<li>lsh040***@gmail.com</li>
								<li>sk040***@gmail.com</li>
								<li>wcc***@naver.com</li>
								<li>hoeun0***@gmail.com</li>
								<li>herloc***@gmail.com</li>
								<li>zo0bi***@gmail.com</li>
								<li>91bottlen***@naver.com</li>
								<li>chlqudrnr***@naver.com</li>
								<li>sdfg0***@naver.com</li>
								<li>gooda***@naver.com</li>
								<li>dbwn***@gmail.com</li>
								<li>Kakajy***@gmail.com</li>
								<li>jeonai***@gmail.com</li>
								<li>a01095899***@gmail.com</li>
								<li>airtr***@naver.com</li>
								<li>anghell7***@gmail.com</li>
								<li>saena***@hanmail.net</li>
								<li>h_ck***@naver.com</li>
								<li>myc1***@naver.com</li>
								<li>sleeping-de***@hanmail.net</li>
							</ul>
						</div>
					</div>
					<!-- -->
					<div class="lottoTabSection">
						<h3 class="title"><img src="./libs/front/images/popLotto2-title.png"  alt=""></h3>
						<ul class="box">
							<li>
								<h3><img src="./libs/front/images/popLotto2-subTitle1.png"  alt=""></h3>
								<p>zzzzzz***@gmail.com</p>
							</li>
							<li>
								<h3><img src="./libs/front/images/popLotto2-subTitle2.png"  alt=""></h3>
								<p>point-cl***@hanmail.net</p>
								<p>qldirdl8***@gmail.com</p>
							</li>
							<li>
								<h3><img src="./libs/front/images/popLotto2-subTitle3.png"  alt=""></h3>
								<p>kkj9***@naver.com</p>
								<p>2003t***@naver.com</p>
								<p>gingis***@gmail.com</p>
							</li>
						</ul>
						<div class="giftcard">
							<h3><img src="./libs/front/images/popLotto-subTitle4.png"  alt=""></h3>
							<ul class="list">
								<li>withmel***@gmail.com</li>
								<li>areum_0***@naver.com</li>
								<li>jee***@naver.com</li>
								<li>tlsrnjs_1***@naver.com</li>
								<li>tank7***@naver.com</li>
								<li>yee727***@gmail.com</li>
								<li>dlstjd9***@naver.com</li>
								<li>khk3***@naver.com</li>
								<li>baeminseong***@gmail.com</li>
								<li>ehddu***@naver.com</li>
								<li>jinseok5***@naver.com</li>
								<li>hgim76***@gmail.com</li>
								<li>rien332***@naver.com</li>
								<li>Sangseg2***@gmail.com</li>
								<li>ods0900***@gmail.com</li>
								<li>ssean***@gmail.com</li>
								<li>doyeo***@icloud.com</li>
								<li>vdrma01189***@gmail.com</li>
								<li>wow041***@gmail.com</li>
								<li>jeje2***@naver.com</li>
								<li>jun031***@gmail.com</li>
								<li>kjy010***@gmail.com</li>
								<li>guea0***@nate.com</li>
								<li>soobin***@gmail.com</li>
								<li>kangms0***@daum.net</li>
								<li>leejun5***@gmail.com</li>
								<li>meean4***@gmail.com</li>
								<li>junseop7***@daum.net</li>
								<li>rlaehgus1***@naver.com</li>
								<li>pshpul***@gmail.com</li>
								<li>gobge***@gmail.com</li>
								<li>sjek***@naver.com</li>
								<li>rlatjdah1***@naver.com</li>
								<li>jrdevil0***@gmail.com</li>
								<li>tkdlemfha1***@gmail.com</li>
								<li>gun9***@gmail.com</li>
								<li>sso06***@naver.com</li>
								<li>grenn***@gmail.com</li>
								<li>euijun1***@gmail.com</li>
								<li>adam001***@gmail.com</li>
								<li>g.ganesx***@gmail.com</li>
								<li>ghdrhk***@naver.com</li>
								<li>Geonmin***@gmail.com</li>
								<li>luholic4***@naver.com</li>
								<li>so32***@naver.com</li>
								<li>ksh050***@naver.com</li>
								<li>hw_***@naver.com</li>
								<li>sty***@naver.com</li>
								<li>poowar0***@gmail.com</li>
								<li>pjh***@icloud.com</li>
								<li>enac3***@gmail.com</li>
								<li>nataku80***@gmail.com</li>
								<li>tankji***@gmail.com</li>
								<li>taehoon1***@naver.com</li>
								<li>gogohh1***@naver.com</li>
								<li>corando***@naver.com</li>
								<li>tlsrna1***@gmail.com</li>
								<li>trequa***@gmail.com</li>
								<li>lightto***@gmail.com</li>
								<li>kleehjii***@naver.com</li>
								<li>chilee***@gmail.com</li>
								<li>donghyeonse***@gmail.com</li>
								<li>kbs0***@naver.com</li>
								<li>hszzoa***@daum.net</li>
								<li>mingun***@naver.com</li>
								<li>kshapple8***@naver.com</li>
								<li>mar***@naver.com</li>
								<li>swsz9***@naver.com</li>
								<li>jaeduck.***@gmail.com</li>
								<li>osr8***@gmail.com</li>
								<li>inturn2***@naver.com</li>
								<li>sp***@naver.com</li>
								<li>bbang***@naver.com</li>
								<li>8893***@naver.com</li>
								<li>gla0***@naver.com</li>
								<li>sadmen***@naver.com</li>
								<li>dntlr***@naver.com</li>
								<li>sbjk1***@naver.com</li>
								<li>jil789***@naver.com</li>
								<li>junseo6***@gmail.com</li>
								<li>khsh1***@naver.com</li>
								<li>et***@hanmail.net</li>
								<li>kojoh***@gmail.com</li>
								<li>ab69350***@naver.com</li>
								<li>cwj051***@naver.com</li>
								<li>qnpqnp***@naver.com</li>
								<li>junha6***@naver.com</li>
								<li>junmom***@naver.com</li>
								<li>qkrtjwls0***@naver.com</li>
								<li>asm1***@naver.com</li>
								<li>kjh222***@gmail.com</li>
								<li>tjdwoal***@naver.com</li>
								<li>202v***@naver.com</li>
								<li>sung7***@naver.com</li>
								<li>lineagem***@gmail.com</li>
								<li>hys3***@naver.com</li>
								<li>hw97***@gmail.com</li>
								<li>dbcks0***@gmail.com</li>
								<li>yuns655***@gmail.com</li>
								<li>1208***@naver.com</li>
								<li>ohoon9***@naver.com</li>
								<li>leejaewook9***@gmail.com</li>
								<li>chooh***@naver.com</li>
								<li>kingkong0***@gmail.com</li>
								<li>cleo***@naver.com</li>
								<li>arrest1***@gmail.com</li>
								<li>123ck***@naver.com</li>
								<li>k7j***@naver.com</li>
								<li>astrog***@gmail.com</li>
								<li>dnsdyd7***@gmail.com</li>
								<li>lsw021***@naver.com</li>
								<li>cby0***@naver.com</li>
								<li>ryanzzz***@naver.com</li>
								<li>wels***@nate.com</li>
								<li>ty021***@naver.com</li>
								<li>windelf1***@naver.com</li>
								<li>u***@naver.com</li>
								<li>kr27***@naver.com</li>
								<li>xlz***@naver.com</li>
								<li>snfn6***@naver.com</li>
								<li>jjas***@naver.com</li>
								<li>yjh247***@gmail.com</li>
								<li>jungjun0***@naver.com</li>
							</ul>
						</div>
					</div>
					<!-- -->
					<div class="lottoTabSection">
						<h3 class="title"><img src="./libs/front/images/popLotto3-title.png"  alt=""></h3>
						<ul class="box">
							<li>
								<h3><img src="./libs/front/images/popLotto3-subTitle1.png"  alt=""></h3>
								<p>kaj1***@naver.com</p>
							</li>
							<li>
								<h3><img src="./libs/front/images/popLotto3-subTitle2.png"  alt=""></h3>
								<p>010649104***@gmail.com</p>
								<p>leek***@gmail.com</p>
							</li>
							<li>
								<h3><img src="./libs/front/images/popLotto3-subTitle3.png"  alt=""></h3>
								<p>ma***@naver.com</p>
								<p>dbal6***@naver.com</p>
								<p>wjdgp***@gmail.com</p>
							</li>
						</ul>
						<div class="giftcard">
							<h3><img src="./libs/front/images/popLotto-subTitle4.png"  alt=""></h3>
							<ul class="list">
								<li>sora1***@naver.com</li>
								<li>woong9***@naver.com</li>
								<li>tnals2***@naver.com</li>
								<li>moonj***@naver.com</li>
								<li>kkan0***@hanmail.com</li>
								<li>y2k1***@naver.com</li>
								<li>dew123***@nate.com</li>
								<li>nerver1***@daum.net</li>
								<li>Kse74***@naver.com</li>
								<li>gpwo***@naver.com</li>
								<li>jjone0***@gmail.com</li>
								<li>myip***@naver.com</li>
								<li>jangie***@naver.com</li>
								<li>audgh5***@naver.com</li>
								<li>kyh20060***@gmail.com</li>
								<li>limmin***@naver.com</li>
								<li>Glosser***@gmail.com</li>
								<li>aune***@naver.com</li>
								<li>greatbria***@gmail.com</li>
								<li>dnfl7***@naver.com</li>
								<li>White387***@gmail.com</li>
								<li>wkdehdaud***@gmail.com</li>
								<li>j01089106***@gmail.com</li>
								<li>Dnjswo***@daum.net</li>
								<li>c1***@hanmail.net</li>
								<li>youngik8***@hanmail.net</li>
								<li>sso***@naver.com</li>
								<li>hyeongseo***@naver.com</li>
								<li>khm***@naver.com</li>
								<li>kjw0***@hanmail.net</li>
								<li>yhj0***@naver.com</li>
								<li>kyc7***@gmail.com</li>
								<li>xmonoman***@gmail.com</li>
								<li>coc***@naver.com</li>
								<li>damnh***@naver.com</li>
								<li>bdom***@gmail.com</li>
								<li>shfnehdn***@gmail.com</li>
								<li>fhqhtrkw***@naver.com</li>
								<li>batspide***@gmail.com</li>
								<li>min001***@naver.com</li>
								<li>sang52***@naver.com</li>
								<li>krlaqja***@naver.com</li>
								<li>yw633***@naver.com</li>
								<li>jooni1***@gmail.com</li>
								<li>jsh960***@naver.com</li>
								<li>do1***@naver.com</li>
								<li>hyojun9***@hanmail.net</li>
								<li>bag453***@gmail.com</li>
								<li>injunb***@nate.com</li>
								<li>zzfjscu***@naver.com</li>
								<li>hs1***@naver.com</li>
								<li>tod***@naver.com</li>
								<li>sigma***@naver.com</li>
								<li>jeongminh***@naver.com</li>
								<li>dfcsx1***@gmail.com</li>
								<li>ssdd4***@naver.com</li>
								<li>only***@naver.com</li>
								<li>kchwan***@gmail.com</li>
								<li>sangyeop***@gmail.com</li>
								<li>arsi***@naver.com</li>
								<li>wkdj***@gmail.com</li>
								<li>k99***@naver.com</li>
								<li>ikmujn2***@naver.com</li>
								<li>wowown***@naver.com</li>
								<li>1999***@hanmail.net</li>
								<li>kp5***@naver.com</li>
								<li>cooper7***@gmail.com</li>
								<li>king***@naver.com</li>
								<li>bum***@nate.com</li>
								<li>dudsk***@naver.com</li>
								<li>zxsa***@gmail.com</li>
								<li>magnus4***@naver.com</li>
								<li>yuyu9***@naver.com</li>
								<li>kyo***@naver.com</li>
								<li>seotyoung1***@gmail.com</li>
								<li>elah***@nate.com</li>
								<li>wogns1***@naver.com</li>
								<li>net***@naver.com</li>
								<li>yejunb***@gmail.com</li>
								<li>yuongtaejj***@gmail.com</li>
								<li>ans9***@gmail.com</li>
								<li>ohshlove1***@naver.com</li>
								<li>wwhaa7***@naver.com</li>
								<li>kth***@naver.com</li>
								<li>bluetear***@naver.com</li>
								<li>dlckddn5***@naver.com</li>
								<li>yjy***@nate.com</li>
								<li>wewe0***@naver.com</li>
								<li>ikh2***@naver.com</li>
								<li>rla***@naver.com</li>
								<li>juram***@gmail.com</li>
								<li>1226tmxpv***@naver.com</li>
								<li>kissme***@gmail.com</li>
								<li>dhfma0***@naver.com</li>
								<li>a3212***@gmail.com</li>
								<li>jyoon***@naver.com</li>
								<li>seongwonseo***@gmail.com</li>
								<li>daesungg***@gmail.com</li>
								<li>qkekrjqn***@naver.com</li>
								<li>zicl2***@naver.com</li>
								<li>hyen6***@naver.com</li>
								<li>rudwo5***@naver.com</li>
								<li>sh07***@naver.com</li>
								<li>gushs***@gmail.com</li>
								<li>star4l***@gmail.com</li>
								<li>jaewon092***@naver.com</li>
								<li>dw8***@gmail.com</li>
								<li>yongjo***@gmail.com</li>
								<li>hall***@naver.com</li>
								<li>hojuns1***@naver.com</li>
								<li>good71109***@gmail.com</li>
								<li>atd***@daum.net</li>
								<li>app***@naver.com</li>
								<li>hm***@daum.net</li>
								<li>bearjuy***@gmail.com</li>
								<li>pepc***@gmail.com</li>
								<li>len***@naver.com</li>
								<li>ettest***@naver.com</li>
								<li>kingh***@naver.com</li>
								<li>ohseung***@naver.com</li>
								<li>cyriste***@naver.com</li>
								<li>k20002***@naver.com</li>
								<li>jyo16***@gmail.com</li>
							</ul>
						</div>
					</div>
					<!-- -->
				</div>
                <a href="javascript:void(0)" data-rel="back" class="modal-btn-close">
                    <img src="./libs/front/images/btnClose.png"  alt="확인">
                </a>
            </section>
        </div>


		<!-- @ 팝업 - 당첨자팝업 이벤트2 -->
        <div id="popLotto2nd" class="lotto eventLotto modal" data-role="modal">
            <section class="modal-content">
                <img src="./libs/front/images/popLottoEvent.png"  alt="">
				<div class="popContent">
					<h3 class="title"><img src="./libs/front/images/popLotto2nd-title.png"  alt=""></h3>
					<a class="goLotto" href="https://www.facebook.com/FortniteKO/" target="_blank"><img src="./libs/front/images/goLotto.png"  alt=""></a>
					<div class="boxWrap">
						<ul class="box">
							<li>
								<h3><img src="./libs/front/images/popLotto2nd-subTitle1.png"  alt=""></h3>
								<p>hyunrid***@naver.com</p>
							</li>
							<li>
								<h3><img src="./libs/front/images/popLotto2nd-subTitle2.png"  alt=""></h3>
								<p>mingyu0***@gmail.com</p>
							</li>
							<li>
								<h3><img src="./libs/front/images/popLotto2nd-subTitle3.png"  alt=""></h3>
								<p>kknn***@naver.com</p>
								<p>hoon***@nate.com</p>
							</li>
						</ul>
						<div class="pt30">
							<h3><img src="./libs/front/images/popLotto2nd-subTitle4.png"  alt=""></h3>
							<ul class="list">
								<li>dygks2***@gmail.com</li>
								<li>askatob***@gmail.com</li>
								<li>ljhjj***@gmail.com</li>
								<li>dbdlstj***@naver.com</li>
								<li>ss102***@nate.com</li>
								<li>ann82***@gmail.com</li>
								<li>dksqudgu***@gmail.com</li>
								<li>zxcvsd***@naver.com</li>
								<li>poo6***@naver.com</li>
								<li>dudgnsl1***@naver.com</li>
							</ul>
						</div>
						<div class="pt30">
							<h3><img src="./libs/front/images/popLotto2nd-subTitle5.png"  alt=""></h3>
							<ul class="list">
								<li>da***@naver.com</li>
								<li>bl4k***@naver.com</li>
								<li>inseon***@naver.com</li>
								<li>hw1***@naver.com</li>
								<li>reenac***@naver.com</li>
								<li>pes50***@gmail.com</li>
								<li>dorom***@gmail.com</li>
								<li>lwng5***@naver.com</li>
								<li>aje20***@naver.com</li>
								<li>saimo***@naver.com</li>
								<li>seo84***@gmail.com</li>
								<li>clan_t***@naver.com</li>
								<li>nucleotid***@gmail.com</li>
								<li>mos***@lycos.co.kr</li>
								<li>dmzoo***@gmail.com</li>
								<li>qufk***@naver.com</li>
								<li>cksdnd4***@naver.com</li>
								<li>dkdlq***@naver.com</li>
								<li>kwc***@gmail.com</li>
								<li>osnm***@naver.com</li>
								<li>yoodokr1***@nate.com</li>
								<li>sally8398***@gmail.com</li>
								<li>sinne***@naver.com</li>
								<li>fast159***@naver.com</li>
								<li>00heo***@gmail.com</li>
								<li>tree8***@nate.com</li>
								<li>sunba***@gmail.com</li>
								<li>lahan.m***@gmail.com</li>
								<li>kimminsu***@gmail.com</li>
								<li>heeg***@gmail.com</li>
							</ul>
						</div>
						<div class="pt30">
							<h3><img src="./libs/front/images/popLotto2nd-subTitle6.png"  alt=""></h3>
							<ul class="list">
								<li>iambigbr***@gmail.com</li>
								<li>ysb0***@daum.net</li>
								<li>vesperi0***@gmail.com</li>
								<li>kingb***@gmail.com</li>
								<li>wih0***@gmail.com</li>
								<li>rlagur***@gmail.com</li>
								<li>202vmv***@gmail.com</li>
								<li>panda***@naver.com</li>
								<li>cracke***@naver.com</li>
								<li>rudgh758***@gmail.com</li>
								<li>sunn***@naver.com</li>
								<li>bsh110***@naver.com</li>
								<li>yc717***@gmail.com</li>
								<li>ndchul***@gmail.com</li>
								<li>dutjt***@naver.com</li>
								<li>otgoo_1***@naver.com</li>
								<li>cwq***@naver.com</li>
								<li>dmsthf***@naver.com</li>
								<li>dhela***@naver.com</li>
								<li>zz302***@naver.com</li>
								<li>a77559***@gmail.com</li>
								<li>hifj***@naver.com</li>
								<li>pck4***@nate.com</li>
								<li>wnguswkd1***@naver.com</li>
								<li>sshwang0***@gmail.com</li>
								<li>tnaks0***@naver.com</li>
								<li>mellon***@naver.com</li>
								<li>newing***@gmail.com</li>
								<li>northbl***@hanmail.net</li>
								<li>max***@naver.com</li>
								<li>dhwlghd***@naver.com</li>
								<li>yoohs1***@naver.com</li>
								<li>mirezz***@nate.com</li>
								<li>dorco***@gmail.com</li>
								<li>tjsdn9***@naver.com</li>
								<li>tiyon***@naver.com</li>
								<li>zzipme***@gmail.com</li>
								<li>dk7***@nate.com</li>
								<li>minki3***@daum.net</li>
								<li>a01056073***@gmail.com</li>
								<li>kumumom***@naver.com</li>
								<li>ltld***@naver.com</li>
								<li>luke06***@naver.com</li>
								<li>bkik***@naver.com</li>
								<li>kf***@naver.com</li>
								<li>akar***@naver.com</li>
								<li>seongwonseo***@gmail.com</li>
								<li>jaehyuk0***@naver.com</li>
								<li>kim2972***@gmail.com</li>
								<li>kyu59***@gmail.com</li>
								<li>les***@naver.com</li>
								<li>wingcutter.***@gmail.com</li>
								<li>sha***@paran.com</li>
								<li>sineru2***@gmail.com</li>
								<li>guswns01***@naver.com</li>
								<li>sforever22***@gmail.com</li>
								<li>xicar***@naver.com</li>
								<li>injajy***@gmail.com</li>
								<li>dosestecasti***@gmail.com</li>
								<li>moratorium0***@gmail.com</li>
								<li>alkkeo***@naver.com</li>
								<li>tmdaus9***@naver.com</li>
								<li>tytekfl4***@gmail.com</li>
								<li>zzoon1***@naver.com</li>
								<li>namsung3***@naver.com</li>
								<li>jbg4***@naver.com</li>
								<li>sdh1***@gmail.com</li>
								<li>nagong***@gmail.com</li>
								<li>qkdalswo505***@gmail.com</li>
								<li>gksdudbs1***@naver.com</li>
								<li>gse06***@naver.com</li>
								<li>solchi3***@gmail.com</li>
								<li>q312***@naver.com</li>
								<li>arqar***@gmail.com</li>
								<li>asus10312***@gmail.com</li>
								<li>0725lee***@gmail.com</li>
								<li>jhong8***@naver.com</li>
								<li>pmu***@naver.com</li>
								<li>aeke1***@naver.com</li>
								<li>ung2u***@naver.com</li>
								<li>cbs010***@gmail.com</li>
								<li>kimseongy***@gmail.com</li>
								<li>egan950***@gmail.com</li>
								<li>kjsk14***@gmail.com</li>
								<li>ktse***@gmail.com</li>
								<li>leehun***@naver.com</li>
								<li>na0***@hanmail.net</li>
								<li>newcamp2***@naver.com</li>
								<li>boona***@naver.com</li>
								<li>melon9***@naver.com</li>
								<li>bancol2***@nate.com</li>
								<li>ckwns***@gmail.com</li>
								<li>inthoul***@gmail.com</li>
								<li>ljhdiak***@naver.com</li>
								<li>gunisk***@gmail.com</li>
								<li>ruleal***@gmail.com</li>
								<li>klj1***@naver.com</li>
								<li>sbreg***@gmail.com</li>
								<li>lcri***@naver.com</li>
								<li>qotpdu***@gmail.com</li>
							</ul>
						</div>
					</div>
				</div>
                <a href="javascript:void(0)" data-rel="back" class="modal-btn-close">
                    <img src="./libs/front/images/btnClose.png"  alt="확인">
                </a>
			</section>
		</div>
		
		<!-- @ 팝업 - 당첨자팝업 이벤트3 -->
        <div id="popLotto3th" class="lotto eventLotto modal" data-role="modal">
            <section class="modal-content">
                <img src="./libs/front/images/popLottoEvent3.png"  alt="">
				<div class="popContent">
					<a class="goLotto" href="https://www.facebook.com/FortniteKO/" target="_blank"><img src="./libs/front/images/goLotto.png"  alt=""></a>
					<div class="boxWrap">
						<ul>
							<li>
								<h3><img src="./libs/front/images/popLotto3th-subTitle1.png"  alt=""></h3>
								<p style="padding-top: 25px;">rlaehddn9***@gmail.com</p>
							</li>
							<li style="margin-top: 50px;">
								<h3><img src="./libs/front/images/popLotto3th-subTitle2.png"  alt=""></h3>
								<p style="padding-top: 25px;">a01039973***@gmail.com</p>
								<p style="padding-top: 25px;">anfck***@naver.com</p>
							</li>
						</ul>
					</div>
				</div>
                <a href="javascript:void(0)" data-rel="back" class="modal-btn-close">
                    <img src="./libs/front/images/btnClose.png"  alt="확인">
                </a>
			</section>
		</div>

		<!-- @ 팝업 - 당첨자팝업 이벤트4 -->
        <div id="popLotto4th" class="lotto eventLotto modal" data-role="modal">
            <section class="modal-content">
                <img src="./libs/front/images/popLottoEvent.png"  alt="">
				<div class="popContent">
					<h3 class="title"><img src="./libs/front/images/popLotto4th-title.png"  alt=""></h3>
					<div class="boxWrap">
						<div class="pt30">
							<h3><img src="./libs/front/images/popLotto4th-subTitle1.png"  alt=""></h3>
							<ul class="list">
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
							</ul>
						</div>
						<div class="pt30">
							<h3><img src="./libs/front/images/popLotto4th-subTitle2.png"  alt=""></h3>
							<ul class="list">
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
							</ul>
						</div>
					</div>
				</div>
                <a href="javascript:void(0)" data-rel="back" class="modal-btn-close">
                    <img src="./libs/front/images/btnClose.png"  alt="확인">
                </a>
			</section>
		</div>
		
		<!-- @ 팝업 - 당첨자팝업 이벤트5 -->
        <div id="popLotto5th" class="lotto eventLotto modal" data-role="modal">
            <section class="modal-content">
                <img src="./libs/front/images/popLottoEvent.png"  alt="">
				<div class="popContent">
					<h3 class="title"><img src="./libs/front/images/popLotto5th-title.png"  alt=""></h3>
					<div class="boxWrap">
						<ul class="pt30">
							<li>
								<h3><img src="./libs/front/images/popLotto5th-subTitle1.png"  alt=""></h3>
								<p style="padding-top: 25px;">kaj1***@naver.com</p>
							</li>
						</ul>
						<div class="pt30">
							<h3><img src="./libs/front/images/popLotto5th-subTitle2.png"  alt=""></h3>
							<ul class="list">
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
								<li>sora1***@naver.com</li>
							</ul>
						</div>
						<div class="pt30">
							<h3><img src="./libs/front/images/popLotto5th-subTitle3.png"  alt=""></h3>
							<ul class="list">
								<li>sora1***@naver.com</li>
							</ul>
						</div>
					</div>
				</div>
                <a href="javascript:void(0)" data-rel="back" class="modal-btn-close">
                    <img src="./libs/front/images/btnClose.png"  alt="확인">
                </a>
			</section>
		</div>


        <script src="./libs/front/assets/js/vendor.js"></script>
        <script src="./libs/front/assets/js/plugin.js"></script>
        <script src="./libs/front/js/jquery.easing.1.3.js?v=01"></script>
        <script src="./libs/front/js/jquery.mousewheel.min.js?v=01"></script>
        <script src="./libs/front/js/TweenMax.min.js?v=01"></script>
        <script src="./libs/front/js/parallax.min.js?v=01"></script>
        <script src="./libs/front/js/jquery.bxslider.min.js?v=01"></script>
        <script src="./libs/front/js/main.js?v=11"></script>

        <script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
        <script src="./libs/dev/share_sns.js" type="text/javascript"></script>
        <script src="./libs/dev/deploy.js" type="text/javascript"></script>


    </body>
</html>