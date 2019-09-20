var event02Flag = false;


//form 체크
function form1_check(){
	if(/[^\s]/g.test(document.form1.mid.value) == false) {
		alert("제목을 입력해 주십시오.");
		document.form1.title.focus();
		return false;
	}

	if(/[^\s]/g.test(document.form1.mpw.value) == false) {
		alert("제목을 입력해 주십시오.");
		document.form1.subject.focus();
		return false;
	}

//잇츠스킨_세서미스트리트
//세서미스트리트

	var memo =document.form1.memo.value;
	//alert(memo);
		if (memo.match("#잇츠스킨_세서미스트리트")){
		// alert("포함됐네1");
		}
		else {
		 //alert("포함 안됐네");
			 if (memo.match("#세서미스트리트")){
		//	 alert("포함됐네2");
			}
			else {
			 alert("해시태그를 하나 이상 입력 하세요!");
		return false;
			}
		}

//	return false;
	

	return true;				
}


function finit2(rmsg)
  {
  alert("OK~~~~~"+rmsg+"reserOk~~~~~"+event02Flag);
//event02Flag = false;
  is_uploading ="N";

  //  reserOk = true;
  //  formInit();
  //  mui.modal.close('popup-apply');
  }
