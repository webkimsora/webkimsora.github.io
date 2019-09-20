
  var reserOk = false;
 var epage =0;

var isFbApp = false;

	function isFacebookApp() {
		var ua = navigator.userAgent || navigator.vendor || window.opera;
		return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
	}

	isFbApp = isFacebookApp();



	function ss(vno)
	{
		$(".all").removeClass("is-active");
		$(".itsskin").removeClass("is-active");
		$(".sesermi").removeClass("is-active");
		$(".itssesermi").removeClass("is-active");
		$(".collabo").removeClass("is-active");
		$(".gangnam").removeClass("is-active");
		$(".garosu").removeClass("is-active");
		$(".silmul").removeClass("is-active");


	//alert(vno);
		
		if(vno=="0")
		{
			$(".all").addClass("is-active");
			selectTag('');
		}
		else if(vno=="1")
		{
			$(".itsskin").addClass("is-active");
			selectTag('1');
		}
		else if(vno=="2")
		{
			$(".sesermi").addClass("is-active");
			selectTag('2');
		}
		else if(vno=="3")
		{
			$(".itssesermi").addClass("is-active");
			selectTag('3');
		}
		else if(vno=="4")
		{
			$(".collabo").addClass("is-active");
			selectTag('4');
		}
		else if(vno=="5")
		{
			$(".gangnam").addClass("is-active");
			selectTag('5');
		}
		else if(vno=="6")
		{
			$(".garosu").addClass("is-active");
			selectTag('6');
		}
		else if(vno=="7")
		{
			$(".silmul").addClass("is-active");
			selectTag('7');
		}




////////// 트래킹
if(vno == "0")
{
	filterStr = '전체';
}
else if(vno == "1")
{
	filterStr = '잇츠스킨_세서미스트리트';
}
else if(vno == "2")
{
	filterStr = '세서미스트리트';
}
else if(vno == "3")
{
	filterStr = '잇츠세서미';
}
else if(vno == "4")
{
	filterStr = '잇츠스킨콜라보';
}
else if(vno == "5")
{
	filterStr = '잇츠스킨강남';
}
else if(vno == "6")
{
	filterStr = '잇츠스킨가로수길';
}
else if(vno == "7")
{
	filterStr = '세서미실물영접';
}
else{
	filterStr = '전체';
}

 _trackga("Event2","인스타그램리스트2-"+filterStr);




	}



//form 체크
function form1_check(){
//	if(/[^\s]/g.test(document.form1.mid.value) == false) {
//		alert("제목을 입력해 주십시오.");
//		document.form1.title.focus();
//		return false;
//	}
//
//	if(/[^\s]/g.test(document.form1.mpw.value) == false) {
//		alert("제목을 입력해 주십시오.");
//		document.form1.subject.focus();
//		return false;
//	}

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
		 //alert("포함 안됐네");
					 if (memo.match("#잇츠세서미")){
				//	 alert("포함됐네2");
					}
					else {
				 //alert("포함 안됐네");
							 if (memo.match("#잇츠스킨콜라보")){
						//	 alert("포함됐네2");
							}
							else {
							 alert("해시태그를 하나 이상 입력 하세요!");
						return false;
							}
					}
			}
		}

//	return false;
	

	return true;				
}


function finit2(rmsg)
  {


var res = rmsg.substring(0,1);
//  alert(res+" "+rmsg);
//
if (res =="Y")
{
	//alert("등록되었습니다.");
	App.alert(1)
}
else
{
	//alert("등록 실패했습니다.\n등록 정보를 다시 한번 확인해주세요.\n"+rmsg);
	App.alert(3)
}

    mui.validate.init($('#detail-event2-upload'));
    $('.frm-upload > span').text('이미지를 등록하세요');

  reserOk = false;
								//	jq_shareend("S");
 // alert(" "+rmsg);
 // alert("OK~~~~~"+rmsg+"reserOk~~~~~"+reserOk);
//event02Flag = false;

  //  reserOk = true;
  //  formInit();
  //  mui.modal.close('popup-apply');
  }




function _trackga(gtype,glabel)
{
	_gaq.push(['_trackEvent',"M_"+ gtype , 'Click', "M_"+ glabel]);
	//console.log("gtype " + gtype + "_" + glabel);
}