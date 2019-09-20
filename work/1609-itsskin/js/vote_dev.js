

var _nPage = 1;
var _snsLoginFlag = false;
//var _snsLoginFlag2 = false;
	
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

	
}

		//		getEventList(1);




	var snsFlag = $("input[name=snsLoginFlag]").val();
	if(snsFlag == "Y"){
	//	alert("ss");
		loadSnsSet();
	}//end if 
	
	//SNS 버튼 클릭 이벤트(로그인) 


 // $('#popup-play .btn-vote').on('click', function(){
 //   alertModal(1);
 // });

// 이벤트 2
//	$(".vote_run").bind("click",function(e){
	$('#popup-play .btn-vote').on('click', function(){ 
	//	e.preventDefault();
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

	//	console.log("sFlag"+sFlag+"sf_"+sf+"tf_"+tf+"kf_"+kf);
		if(sf != "" && sFlag =="fb")
		{
			

			setCookie("SNS_DEFAULT", "FB", "1");

	$("#icon_"+sFlag).addClass("is-active");
	$("#icon_ks").removeClass("is-active");
	$("#icon_tw").removeClass("is-active");
		//	alert("FBBBBBB");
	//	sendEventReg2();
		//	alert("FB 로그인 되어 있음");
			return;
		//	logout("FB",""); 
		}
		if(tf != "" && sFlag =="tw")
		{
			
	$("#icon_"+sFlag).addClass("is-active");
	$("#icon_fb").removeClass("is-active");
	$("#icon_ks").removeClass("is-active");
		//	alert("T_W");
			setCookie("SNS_DEFAULT", "TW", "1");
		//sendEventReg2();
		//	alert("FB 로그인 되어 있음");
			return;
		//	logout("FB",""); 
		}


		if(kf != "" && sFlag =="ks")
		{
	$("#icon_"+sFlag).addClass("is-active");
	$("#icon_fb").removeClass("is-active");
	$("#icon_tw").removeClass("is-active");
			
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
	$("#social_btn2__").bind("click",function(e){
		e.preventDefault();
		if(!_snsLoginFlag2) alert("원하시는 소셜 계정으로 로그인 후 작성 가능합니다!");


		sendEventReg2();
		//phonePopup();
	});
	
	

	$(".onlyNum").keyup(function(){
		$(this).val( $(this).val().replace(/[^0-9]/gi,"") );
	});
	
	$("#sendSocial").bind("click",function(e){
		e.preventDefault();
		var userPhoneNum = $("input[name=userPhoneNum]").val();
		sendEventReg(userPhoneNum);
	});




});




function loadSnsSet(){
	var sns_user_name = $("input[name=sns_user_name]").val();
	var sns_user_profile = $("input[name=sns_user_profile]").val();
	var snsDefault = $("input[name=sns_default]").val();
	
	loginCallback2(sns_user_name,sns_user_profile,snsDefault);
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
				
		//	setCookie("SNS_FB_accessToken", "", "1");
	    //		logout("FB","");
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


	//$("#icon_"+sFlag).addClass("is-active");
	//$("#icon_"+sns).addClass("is-checked");

	$("#contents").val(""); //입력창 비우기 

// 로그인 트래킹 B15. 페이스북 로그인



		sendEventReg();

}//end fnc 





function loginCallback2(userName,userProfile,sns){
	_snsLoginFlag2 = true;
	//var snsDefault = $("input[name=sns_default]").val();
	$("input[name=sns_default]").val(sns);

//	alert("loginCallback2"+sns+"__"+userName);

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

	$("#icon_fb").removeClass("is-active");
	$("#icon_tw").removeClass("is-active");
	$("#icon_ks").removeClass("is-active");

	sFlag = sns.toLowerCase();
	$("#icon_"+sFlag).addClass("is-active");
//	$("#icon_"+sns).addClass("is-active");





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





	 //	url : '/_interface/oevent_proc_post.php',
	$.ajax({
		type : "post",
	 	url : '/_interface/vote_proc_post.php',
	 	datatype : 'text',
	 	data : 'contents=ss&vidx='+_nVidx,
	 	error : function(e) { alert('Error #'+e.data); },
	    success: function(data) {
	//		alert(data +"<<_socialCmmPost_");

	    	var oJson = eval("("+data+")");
	    	if(oJson.code == "1"){
			//	alert("공유성공"+ oJson.parent_id+"_nCnt_"+ oJson.nCnt);
				_nSidx = oJson.parent_id;

	
				var t_vcnt =".vcnt_"+_nVidx;
				$(t_vcnt).html(oJson.nCnt);
			//	$(".vcnt_"+_nVidx).html(oJson.nCnt);
				//phonePopup2(oJson.parent_id);
				//mui.modal.open('popup-reg')


				 mui.modal.close('popup-play');   
				 jq_alertModal(1);
			//	alertModal(1); 

			event01Flag = false;
			}
			else
			{
				alert("[투표실패] "+ oJson.msg);
				
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



	var phone = $("#phone").val();





	$.ajax({
		type : "post",
	 	url : '/_interface/vote2_proc_share.php',
	 	datatype : 'text',
	 	data : 'phone='+phone+'&vidx='+_nVidx,
	 	error : function(e) { alert('Error #'+e.data); },
	    success: function(data) {
	//		alert(data +"<<_socialCmmPost_");

	    	var oJson = eval("("+data+")");
	    	if(oJson.code == "1"){
			//	alert("공유성공"+ oJson.parent_id);
				_nSidx = oJson.parent_id;
				//phonePopup2(oJson.parent_id);
				//mui.modal.open('popup-reg')

				jq_shareend("S");

			event02Flag = false;
			}
			else
			{
				alert("[공유실패] "+ oJson.msg);
				jq_shareend("F");

				
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

