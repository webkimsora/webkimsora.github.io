/**
* MakeULike R&D Team
*/

//사전예약하기
function reserv(){

	if (!$('[name="USER_PHONENUMBER"]').cmmAjax()) {
		contentOpen('.cont04'); //휴대폰 번호를 입력해주세요
		return false;
	}
	
	if (!$('[name="USER_PHONENUMBER"]').cmmAjax('tel')) {
		contentOpen('.cont05'); //잘못된 번호입니다. 확인 후 다시 입력해주세요
		return false;
	}
	
	if (!$('[name="USER_PHONENUMBER"]').cmmAjax(10, 11)) { //min , max 글자수 체크 
		contentOpen('.cont04'); //전화번호를 모두 입력해주세요
		return false;
	}

	if (!$('[name="USER_CHK1"]:required').cmmAjax()) {
		contentOpen('.cont06'); //개인정보 수집 및 정보 안내에 동의 하여주세요
		return false;
	}
	
	//contentOpen('.cont07'); // 이미사전등록 완료
	
	contentOpen('.cont08'); // 삼국에볼루션 사전등록이 완료되었습니다.
}

// 값 초기화
function resetFrm(frm) {
	$(frm)[0].reset();
}

//퀴즈 응모하기
function quiz(){
	var value01 = $('[name="picFind01"]:checked').val();
	var value02 = $('[name="picFind02"]:checked').val();
	var value03 = $('[name="picFind03"]:checked').val();
	if(!value01 || !value02 || !value03){
		contentOpen('.cont10'); // 캐릭터 3명의 이름을모두 체크해주세요.
	}else{
		contentOpen('.cont02'); // 사전예약 한 휴대폰 번호를 입력해주세요.
		
	}
	
	//contentOpen('.cont11'); // 퀴즈이벤트에 응모 되었습니다.
	//contentOpen('.cont09'); // 이미 이벤트 참여를 완료하셨습니다

}


// 사전예약 휴대폰 확인 팝업
function checkPhon(){
	
	if(!$('[name="USER_NUMBER_reserve"]').cmmAjax('tel')){
		popVd01(); // 잘못된 번호입니다. 확인 후 다시 입력해주세요.
		return false;
	}
	
	if(!$('[name="USER_NUMBER_reserve"]').cmmAjax(10,11)){
		popVd01(); // 잘못된 번호입니다. 확인 후 다시 입력해주세요.
		return false;
	}
	
	contentOpen('.cont11'); // 퀴즈이벤트에 응모 되었습니다.

	//contentClose(); contentOpen('.cont03');  //사전예약 후 이벤트참여가 가능합니다.
	//contentOpen('.cont11'); // 퀴즈이벤트에 응모 되었습니다.
	//contentOpen('.cont09'); // 이미 이벤트 참여를 완료하셨습니다
	
}