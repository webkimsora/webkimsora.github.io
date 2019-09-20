

var _nPage = 1;
var _snsLoginFlag = false;
var _snsLoginFlag2 = false;
var _DelIdx = 0;
var _tempDelLayer = "";
var _isListGet = true;
//캐릭터 이벤트
var event02Flag = false; 
var event01Flag = false; 


var _nSidx = 0;


$(document).ready(function(){

	try{
	Kakao.init('05257e9e1cda44baf8de264ac76d0e5b');
}catch(e){

//	console.log(e);
	
}

		//		getEventList(1);




	var snsFlag = $("input[name=snsLoginFlag]").val();
	if(snsFlag == "Y"){
	//	alert("ss");
	//	loadSnsSet();
	}//end if 
	
	//SNS 버튼 클릭 이벤트(로그인) 





// 이벤트 2
	$(".vote").bind("click",function(e){
		e.preventDefault();
	//	alert("SSSSSSSSSSS");
		var sFlag = "fb";
		var sf = getCookie("SNS_FB_accessToken");
		if(sf != "" && sFlag =="fb")
		{
			
		sendEventReg();
		//	alert("FB 로그인 되어 있음");
			return;
		//	logout("FB",""); 
		}

//
//		if(kf != "" && sFlag =="ks")
//		{
//		//	alert("KS 로그인 되어 있음");
//			return;
//		//	logout("FB",""); 
//		}
		
		snsLogin(sFlag, "");
	});
	

// 이벤트 2
	$(".sns_choose .icon").bind("click",function(e){
		e.preventDefault();
	//	alert("SSSSSSSSSSS");
		var sFlag = $(this).attr("sFlag");
		var sf = getCookie("SNS_FB_accessToken");
		var tf = getCookie("SNS_TW_accessToken");
		var kf = getCookie("SNS_KS_accessToken");

		console.log("sFlag"+sFlag+"sf_"+sf+"tf_"+tf+"kf_"+kf);
		if(sf != "" && sFlag =="fb")
		{
			

			setCookie("SNS_DEFAULT", "FB", "1");

		//	alert("FBBBBBB");
	//	sendEventReg2();
		//	alert("FB 로그인 되어 있음");
			return;
		//	logout("FB",""); 
		}
		if(tf != "" && sFlag =="tw")
		{
			
		//	alert("T_W");
			setCookie("SNS_DEFAULT", "TW", "1");
		//sendEventReg2();
		//	alert("FB 로그인 되어 있음");
			return;
		//	logout("FB",""); 
		}


		if(kf != "" && sFlag =="ks")
		{
			
			setCookie("SNS_DEFAULT", "KS", "1");
		//	alert("KSSSSSSSS");
		//sendEventReg2();
		//	alert("KS 로그인 되어 있음");
			return;
		//	logout("FB",""); 
		}
		
		snsLogin(sFlag, "Evt2");
	});
	


	
	$("#contents").bind("click",function(e){
		e.preventDefault();
		if(!_snsLoginFlag) alert("원하시는 소셜 계정으로 로그인 후 작성 가능합니다!");
		
	});
	

	//소셜 댓글 입력222222 
	$("#social_btn2").bind("click",function(e){
		e.preventDefault();
		if(!_snsLoginFlag2) alert("원하시는 소셜 계정으로 로그인 후 작성 가능합니다!");


		sendEventReg2();
		//phonePopup();
	});
	
	
	//입력 글자 체크
//	$("#contents").keyup(function(){
//		if(!_snsLoginFlag){
//			//alert("원하시는 소셜 계정으로 로그인 후 작성 가능합니다.");
//			$("#contents").val("원하시는 소셜 계정으로 로그인 후 작성 가능합니다.");
//			return;
//		}
//		
//		fnSetMaxLen();
//	});
	
	$(".onlyNum").keyup(function(){
		$(this).val( $(this).val().replace(/[^0-9]/gi,"") );
	});
	
	$("#sendSocial").bind("click",function(e){
		e.preventDefault();
		var userPhoneNum = $("input[name=userPhoneNum]").val();
		sendEventReg(userPhoneNum);
	});


	$("#sendSocial3").bind("click",function(e){
		e.preventDefault();
	//	var userPhoneNum = $("input[name=userPhoneNum]").val();
	//	alert(userPhoneNum);
		sendEventReg3();
	});


});




function loadSnsSet(){
	var sns_user_name = $("input[name=sns_user_name]").val();
	var sns_user_profile = $("input[name=sns_user_profile]").val();
	var snsDefault = $("input[name=sns_default]").val();
	
	loginCallback(sns_user_name,sns_user_profile,snsDefault);
}//end fnc 

function kakaoLogin(){
	Kakao.Auth.login({
        success: function(authObj) {
          	//alert(JSON.stringify(authObj));
          	accessToken = Kakao.Auth.getAccessToken();
        	refreshToken = Kakao.Auth.getRefreshToken();

        	setKakaoToken(accessToken,refreshToken);
        },
        fail: function(err) {
          alert(JSON.stringify(err))
        }
    });	
}//end fnc 

function setKakaoToken(access,refresh)
{
	$.ajax({
		type : "post",
	 	url : '/_sns/callback/callback.ks.php',
	 	datatype : 'text',
	 	data : 'access='+access+'&refresh='+refresh, 
	 	error : function(e) { alert('Error #'+e.data); },
	    success: function(data) {
	    	var oJson = eval("("+data+")");

		//	console.log(oJson);

	    	if(oJson.code == "1"){
				//alert("로그인되었습니다.");
				
			setCookie("SNS_FB_accessToken", "", "1");
	    		logout("FB","");
				loginCallback2(oJson.name,oJson.profile,oJson.sns);
	    	}else if(oJson.code == "2"){
				//	alert("KS 로그아웃.")
	    		logout("KS",oJson.pass);
	    	}else{
	    		alert(oJson.msg);
	    	}
	    }
	});
}//end fnc

function snsLogin(sFlag,sEvent)
{
	
	var pOptions = "width=500px,height=300px";
	var pModule = "proc";
	switch(sFlag){
		case "fb" :
		case "tw" :
			break;
		case "nb" :
			pOptions = "";
			break;
		case "ks" : 
			kakaoLogin();
			pModule = "script";
			break;
	}//end switch
	

//	alert(sFlag);

	if(pModule != "script"){
		var pResult = window.open("/_sns/get_login_url.php?kind="+sFlag+"&callback="+sEvent,"pSnsLogin",pOptions);
		if(!pResult){
			//$("#pop_wrap_13").modal(smodalOption);
			//	alert("alert__snsLogin");
		}
	}//end if
}//end fnc


function loginCallback(userName,userProfile,sns){
	_snsLoginFlag = true;
	//var snsDefault = $("input[name=sns_default]").val();
	$("input[name=sns_default]").val(sns);

	var colorId = "social_id";
	var iconNum = "";
	switch(sns){
		case "FB" : 
			colorId = "social_id_01";
			iconNum = "01";
			break;
		case "TW" : 
			colorId = "social_id_02";
			iconNum = "02";
			break;
		case "KS" : 
			colorId = "social_id_03";
			iconNum = "03";
			break;
		default : colorId = "social_id"; break;
	}
	
//	//이미지 세팅
//	var snsProfile = "";
//	if(userProfile != ""){
//		snsProfile = "<img src='"+userProfile+"' alt='RAVEN' />";
//	}
//	var iconHTML = "<span><img src='/resources/images/common/icon_social_"+iconNum+".png' alt='Social' /></span>";
//	$("#social_profile").html(snsProfile+""+iconHTML);
//	//이름 영역 세팅 
//	$(".social_id").attr("id",colorId);
//	$(".social_id").html(userName);
	
//	
//		if (sns=="KS")
//		{
//		//	$("#icon_FB").removeClass("is-checked");
//			setCookie("SNS_FB_accessToken", "", "1");
//		}
//		else
//			{
//		//	$("#icon_KS").removeClass("is-checked");
//			setCookie("SNS_KS_accessToken", "", "1");
//		}


	$("#icon_"+sns).addClass("is-checked");

	$("#contents").val(""); //입력창 비우기 

// 로그인 트래킹 B15. 페이스북 로그인



		sendEventReg();

}//end fnc 





function loginCallback2(userName,userProfile,sns){
	_snsLoginFlag2 = true;
	//var snsDefault = $("input[name=sns_default]").val();
	$("input[name=sns_default]").val(sns);

	alert("loginCallback2"+sns+"__"+userName);

	var colorId = "social_id";
	var iconNum = "";
	switch(sns){
		case "FB" : 
			colorId = "social_id_01";
			iconNum = "01";
			break;
		case "TW" : 
			colorId = "social_id_02";
			iconNum = "02";
			break;
		case "KS" : 
			colorId = "social_id_03";
			iconNum = "03";
			break;
		default : colorId = "social_id"; break;
	}
	
//	//이미지 세팅
//	var snsProfile = "";
//	if(userProfile != ""){
//		snsProfile = "<img src='"+userProfile+"' alt='RAVEN' />";
//	}
//	var iconHTML = "<span><img src='/resources/images/common/icon_social_"+iconNum+".png' alt='Social' /></span>";
//	$("#social_profile").html(snsProfile+""+iconHTML);
//	//이름 영역 세팅 
//	$(".social_id").attr("id",colorId);
//	$(".social_id").html(userName);
	
//	
//		if (sns=="KS")
//		{
//		//	$("#icon_FB").removeClass("is-checked");
//			setCookie("SNS_FB_accessToken", "", "1");
//		}
//		else
//			{
//		//	$("#icon_KS").removeClass("is-checked");
//			setCookie("SNS_KS_accessToken", "", "1");
//		}


	$("#icon_"+sns).addClass("is-checked");

	$("#contents").val(""); //입력창 비우기 

// 로그인 트래킹 B15. 페이스북 로그인



}//end fnc 




// 투표
function sendEventReg(){


	if(event01Flag)
	{
		alert("투표 진행중입니다.\n잠시만 기다려 주십시오.");
		return;
	}

	event01Flag = true;

//	var contents = $("#contents").val();
//	var mkt1= $("#usr_mktype").val();
//	
//	if(contents =="")
//	{
//		alert("댓글을 입력하세요");
//			event01Flag = false;
//			return;
//
//	}





	$.ajax({
		type : "post",
	 	url : '/_interface/oevent_proc_post.php',
	 	datatype : 'text',
	 	data : 'contents=ss&mkt=1',
	 	error : function(e) { alert('Error #'+e.data); },
	    success: function(data) {
	//		alert(data +"<<_socialCmmPost_");

	    	var oJson = eval("("+data+")");
	    	if(oJson.code == "1"){
				alert("공유성공"+ oJson.parent_id);
				_nSidx = oJson.parent_id;
				//phonePopup2(oJson.parent_id);
				//mui.modal.open('popup-reg')

			event01Flag = false;
			}
			else
			{
				alert("공유실패 "+ oJson.msg);
				
			event01Flag = false;
			}

	    	
	    }
	});



}//end fnc




// SNS 공유
function sendEventReg2(){


	if(event02Flag)
	{
		alert("SNS에 등록중입니다.\n잠시만 기다려 주십시오.");
		return;
	}

	event02Flag = true;

//	var contents = $("#contents").val();
//	var mkt1= $("#usr_mktype").val();
//	
//	if(contents =="")
//	{
//		alert("댓글을 입력하세요");
//			event01Flag = false;
//			return;
//
//	}





	$.ajax({
		type : "post",
	 	url : '/_interface/oevent2_proc_post.php',
	 	datatype : 'text',
	 	data : 'contents=ss&mkt=1',
	 	error : function(e) { alert('Error #'+e.data); },
	    success: function(data) {
	//		alert(data +"<<_socialCmmPost_");

	    	var oJson = eval("("+data+")");
	    	if(oJson.code == "1"){
				alert("공유성공"+ oJson.parent_id);
				_nSidx = oJson.parent_id;
				//phonePopup2(oJson.parent_id);
				//mui.modal.open('popup-reg')

			event02Flag = false;
			}
			else
			{
				alert("공유실패 "+ oJson.msg);
				
			event02Flag = false;
			}

	    	
	    }
	});



}//end fnc




/// 개인정보 저장
function sendEventReg3(){

		var reg_tel = $("input[name=reg-tel]").val();
		var reg_tel2 = $("input[name=reg-tel2]").val();
		var reg_tel3 = $("input[name=reg-tel3]").val();

		var userPhoneNum = reg_tel + reg_tel2 +reg_tel3;

		var mkid = $("input[name=reg-mkid]").val();
		var uname = $("input[name=reg-name]").val();
		var usr_postcode = $("input[name=reg-postcode]").val();
		var usr_address = $("input[name=reg-addr]").val();
		var usr_address2 = $("input[name=reg-addr2]").val();
		var mk_type = $("input[name=usr_mktype]").val();

	var nullPhone = parseInt(userPhoneNum,10);
	var agree1 = $("input[name=reg-agree-collect]").is(":checked");
	var agree2 = $("input[name=reg-agree-trust]").is(":checked");
	
	
	if(mkid == ""){
		alert("마켓 아이디를 입력하세요");
		return;
	}
	if(uname == ""){
		alert("이름을 입력하세요");
		return;
	}

	
	if(isNaN(nullPhone)){
		alert("올바른 휴대폰 번호가 아닙니다.");
		return;
	}
	
	if(!phoneCheck(userPhoneNum)){
        // @ 올바른 핸드폰 번호가 아닙니다.
		alert("올바른 휴대폰 번호가 아닙니다.");
		return;
	}

	if(usr_postcode == ""){
		alert("주소를 입력하세요");
		return;
	}
	if(usr_address2 == ""){
		alert("상세 주소를 입력하세요");
		return;
	}
	
	if(agree1 == false){
        // @ 약관에 동의해주세요.
		alert("개인정보 수집에 동의 해주세요.");
		return;
	}
	if(agree2 == false){
        // @ 약관에 동의해주세요.
		alert("개인정보 취급 위탁에 동의 해주세요.");
		return;
	}

//_nSidx =1;
	
	$.ajax({
		type : "post",
	 	url : '/_interface/oevent_proc.php',
	 	datatype : 'text',
	 	data : 'pidx='+_nSidx+"&PHONE="+userPhoneNum+"&mkid="+mkid+"&uname="+encodeURIComponent(uname)+"&usr_postcode="+usr_postcode+"&usr_address="+encodeURIComponent(usr_address)+"&usr_address2="+encodeURIComponent(usr_address2)+"&mk_type="+mk_type, 
	 	error : function(e) { alert('Error #'+e.data); },
	    success: function(data) {
	    	var oJson = eval("("+data+")");
	    	if(oJson.code == "1"){
	    		
                // @ 작성되었습니다

				alert("응모 완료 되었습니다.");
					mui.modal.close('popup-reg');
                
                //$("#pop_wrap_07").modal(smodalOption);
            //    $('#pop_wrap_172').fadeOut(wrComplete);

				 mui.validate.init($("#form-reg"));
				$("input[name=usr_mktype]").val(mk_type);
				 
	    		$("#contents").val("");
	    		$(".form-cmt-message").find('b').text("0");
				
	    	//	$("#snsEventList").empty();
	    	//	$(".count").html("0/250");
	    		getEventList(1);
	    	///	socialCmmPost(oJson.parent_id);




////////////  트래킹  참여완료
	
				if (mk_type=="A")
				{
						RMtrkButton('http://c1.247realmedia.co.kr/RealMedia/ads/adstream.imp/Oral-B/POC_1607@x19,MediaCom/RTRK_OB_POC_1607_TRK,x19_POC_view.html');
				}
				if (mk_type=="G")
				{
						RMtrkButton('http://c1.247realmedia.co.kr/RealMedia/ads/adstream.imp/Oral-B/POC_1607_b@x38,MediaCom/RTRK_OB_POC_1607_TRK_b,x38_POC_view.html');
				}

				if (mk_type=="S")
				{
						RMtrkButton('http://c1.247realmedia.co.kr/RealMedia/ads/adstream.imp/Oral-B/POC_1607_b@x57,MediaCom/RTRK_OB_POC_1607_TRK_b,x57_POC_view.html');
				}




	    	}else{
	    		alert(oJson.msg);
	    	}
	    }
	});

	//번호유지
//	phoneNum(userPhoneNum);
	//플래시에 번호전달
//	returnCheck("phone_"+userPhoneNum);

}//end fnc 







function getEventList(page){
//	alert(page);
	$.ajax({
		type : "post",
	 	url : '/_interface/oevent_list.php',
	 	datatype : 'text',
	 	data : 'page='+page, 
	 	error : function(e) { alert('Error #'+e.data); },
	    success: function(data) {
	    	var oJson = eval("("+data+")");
	    	if(oJson.list != ""){
	    		_nPage = page;
	    	//	$(".total").html(oJson.total);
		    	setEventList(oJson.list,oJson.tpage,oJson.cpage);
	    	}else{
	    		//alert("마지막 페이지 입니다.");
	    	//	$('#pop_wrap_19').modal(smodalOption);
	    	}
	    }
	});
}//end fnc 

function setEventList(data, tpage, cpage){
//	$(".del_btn > a").unbind('click');
//	$("#snsEventList").html(data);
	$(".cmt-list").html(data);

//	tpstr ="<a href='javascript:getEventList(1);'> 처음 </a>";
	tpage = Number(tpage) ;
	cpage = Number(cpage) ;
	cpages = (Math.floor((cpage-1)/5) *5)+1;

	var tpage2 =tpage;
//	alert(cpages);

	tpage1  =cpages -1;

	if (tpage1< 1)
	{
		tpage1 =1;
	}


    
	cpstr ="";
	if (cpage ==1)
	{
		cpstr ="<li class='cmt-pagination-prev' style='visibility:hidden;z-index: -1;'><button type='button' onclick='getEventList("+tpage1+");'><i class='sp-cmt ico-prev'>이전</i></button></li>";
	}
	else
	{
		cpstr ="<li class='cmt-pagination-prev'><button type='button' onclick='getEventList("+tpage1+");'><i class='sp-cmt ico-prev'>이전</i></button></li>";
	}

	for(sp=cpages; sp <(cpages+5); sp++)
	{
			if(sp <= tpage){

				if (sp == cpage)
				{
					cpstr +="<li class='is-active'><button type='button' onclick='getEventList("+sp+");'>"+sp+"</button></li>";          
				}
				else
				{
					cpstr +="<li ><button type='button' onclick='getEventList("+sp+");'>"+sp+"</button></li>";  
				}
				tpage2 = sp;

			}
	}

	if (tpage2< tpage)
	{
		tpage2 +=1;
	}
	
	if (cpage ==tpage)
	{    
		cpstr +=" <li class='cmt-pagination-next' style='visibility:hidden;z-index: -1;'> <button type='button' onclick='getEventList("+tpage2+");'> <i class='sp-cmt ico-next'>다음</i> </button></li>";
	}
	else
	{			//cpstr =" <a href='javascript:getEventList("+tpage+");'>마지막</a>";
          cpstr +=" <li class='cmt-pagination-next'> <button type='button' onclick='getEventList("+tpage2+");'> <i class='sp-cmt ico-next'>다음</i> </button></li>";
	}

	$(".cmt-pagination").html(cpstr);


}//end fnc

function phoneCheck(nVal){
	var regExp = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;
	if(regExp.test(nVal)) return true;
	return false;
}//end fnc 

/** 핸드폰번호 유효성 체크*/
function phoneExp(pnum, type, name) {
	if (pnum.length < 10) {
		$('#pop_wrap_04').modal(smodalOption);
		return false;
	}
	if (type == "rev") {
		var regExp = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;

		if ( !regExp.test(pnum) ) {
			$('#pop_wrap_04').modal(smodalOption);
			//$("input[type="+name+"]").focus();
			return false;
		} else {
			return true;
		}
	}
}



function listMore(){
	_nPage = _nPage + 1;
	getEventList(_nPage);
}//end fnc 


//입력 글자제한 
function fnSetMaxLen()
{
	var nMax = 250;
	var nLen = $("#contents").val().length;
	var target = $(".count");
	var strMaxHTML = nLen+"/"+nMax;
	
	if(nLen > nMax){
		$('#pop_wrap_18').modal(smodalOption);
		$("#contents").val($("#contents").val().substring(0,nMax));
		target.html($("#contents").val().length +"/"+ nMax);
		return;
	}
	
	target.html(strMaxHTML);
}//end fnc


//로그아웃
function logout(sns,pass){
	var defaultSns = $("input[name=sns_default]").val();
	if(defaultSns == sns){

		//초기화 
		_snsLoginFlag = false;
		$("input[name=sns_default]").val("");
		$("#social_profile").html("");
		$(".social_id").attr("id","social_id");
		$(".social_id").html("소셜계정으로 작성하세요");
		$("#contents").val("댓글을 입력해주세요!");
	}

	switch(sns){
		case "FB" : iconNum = "01"; break;
		case "TW" : iconNum = "02"; break;
		case "KS" : iconNum = "03"; break;
	}
//	var iconDir = "/resources/images/common/btn_social_"+iconNum+".gif";
	
//	$("#icon_"+sns).children("img").attr("src",iconDir);

	$("#icon_"+sns).removeClass("is-checked");
	
	if(pass != ""){
		var arPass = pass.split("||");
		loginCallback(arPass[0],arPass[1],arPass[2]);
	} 
}//end fnc 

function setLoading(isBol){
	if(isBol){
		$("#popup_layer .content").html($(".popup_01_loading").html());
		$("#popup_layer").bPopup({
			speed: 550, modalClose: false,
			transition: 'fixed'
		});
	}else{
		$("#popup_layer").bPopup().close();
	}
}//end fnc


function setCookie(cName, cValue, cDay){
    var expire = new Date();
    expire.setDate(expire.getDate() + cDay);
    cookies = cName + '=' + escape(cValue) + '; path=/;'; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
    //if(typeof cDay != 'undefined' ) cookies += ';expires=' + expire.toGMTString() + ';';
    document.cookie = cookies;
}

//쿠키 가져오기
function getCookie(cName) {
    cName = cName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if(start != -1){
         start += cName.length;
         var end = cookieData.indexOf(';', start);
         if(end == -1)end = cookieData.length;
         cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
}

function Left(str, n){
	if (n <= 0)
		return "";
	else if (n > String(str).length)
		return str;
	else
		return String(str).substring(0,n);
}

//번호 전역변수할당
function phoneNum(num) {
	// -> 사전이벤트
	$("input[name=rev_number]").val(num);
	// ->플래시
	setPhoneNum(num);
	// -> 기대평작성 입력시 팝업
	$("input[name=userPhoneNum]").val(num);
}
/** 플래시 연동 스크립트 (e) */

//### 스크롤 쇼셜댓글 컨텐츠 넣기.
$(window).scroll(function(){
//	var experiencePosition = $("#experience"); //직업체험 섹션 위치 
	var experiencePosition = $(".cmt"); //직업체험 섹션 위치 
	if(experiencePosition.length > 0) {

		var docTop = $(document).scrollTop();	//현재 스크롤 위치

			//	console.log(experiencePosition.position().top+"__"+docTop);

		if(docTop > experiencePosition.position().top-1000){
			if(_isListGet){
			//	console.log("CMT~~~~~~");
				_isListGet = false;
				getEventList(1);
			}
		}
	}
});



function phonePopup2(pidx){

	$("#pop_wrap_172").modal(phone_modalOption);
}




    function execDaumPostcode() {
        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var fullAddr = ''; // 최종 주소 변수
                var extraAddr = ''; // 조합형 주소 변수

                // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    fullAddr = data.roadAddress;

                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    fullAddr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
                if(data.userSelectedType === 'R'){
                    //법정동명이 있을 경우 추가한다.
                    if(data.bname !== ''){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있을 경우 추가한다.
                    if(data.buildingName !== ''){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                    fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('reg-postcode').value = data.zonecode; //5자리 새우편번호 사용
                document.getElementById('reg-addr').value = fullAddr;

                // 커서를 상세주소 필드로 이동한다.
                document.getElementById('reg-addr2').focus();
            }
        }).open();
    }