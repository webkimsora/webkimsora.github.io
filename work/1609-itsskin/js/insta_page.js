
var chk1 ="N";
var chk2 ="N";
var chk3 ="N";
var event02Flag = false;


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

//	if(document.form1.myfile.value == "이미지를 등록하세요") {
//		alert("이미지를 선택해 주십시오.");
//		document.form1.myfile.focus();
//		return false;
//	}
//
//	if(/[^\s]/g.test(document.form1.myfile.value) == false) {
//		alert("이미지를 선택해 주십시오.");
//		document.form1.myfile.focus();
//		return false;
//	}

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
  App.alert(1);
}
else
{
	//alert("등록 실패했습니다.\n등록 정보를 다시 한번 확인해주세요.\n"+rmsg);
  App.alert(3);
}


// res 가 Y 정상등록   N 이면  등록 오류..

 //alert("OK~~~~~"+rmsg+"reserOk~~~~~"+reserOk);

//									jq_shareend("S");
 // alert(" "+rmsg);
//event02Flag = false;
  reserOk =false;

    mui.validate.init($('#detail-event2-upload'));
    $('.frm-upload > span').text('이미지를 등록하세요');

  //  reserOk = true;
  //  formInit();
  //  mui.modal.close('popup-apply');
  }


	function chg_insta(vno)
	{

		$(".insta-list-tag a").removeClass("is-active");
		$(".insta-list-tag a").eq(vno).addClass("is-active");

		chk_i9 = chk_ieu9();
		if(chk_i9 =="Y")	{
			$('#tag_v02').attr('src', './ista/t_ifr0.php?q='+vno);
		}
		else{
			$('#tag_v02').attr('src', './ista/t_ifr1.php?q='+vno);
			
		//	$('#tag_v02').attr('src', './ista/t_ifr0.php?q='+vno);
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
else{
	filterStr = '전체';
}

 _trackga("Event2","인스타그램리스트2-"+filterStr);




	}



	function chg_insta_(vno)
	{

		$(".insta-list-tag a").removeClass("is-active");
		$(".insta-list-tag a").eq(vno).addClass("is-active");

		chk_i9 = chk_ieu9();
		if(chk_i9 =="Y")	{
			$('#tag_v02').attr('src', './ista/t_ifr0.php?q='+vno);
		}
		else{
		//	$('#tag_v02').attr('src', './ista/t_ifr0.php?q='+vno);
			$('#tag_v02').attr('src', './ista/t_ifr1.php?q='+vno);
		}






	}

function chg_insta2(vno)
{

		$(".insta-list-tag a").removeClass("is-active");
		$(".insta-list-tag a").eq(vno).addClass("is-active");

	
			//$('#tag_v02').attr('src', './ista/t_ifr1.php?q='+vno);



				if(vno=="0")
				{
					$("#tag_vp0").show();
					$("#tag_vp1").hide();
					$("#tag_vp2").hide();
					$("#tag_vp3").hide();
					$("#tag_vp4").hide();
				}
				else if(vno=="1")
				{
					$("#tag_vp0").hide();
					$("#tag_vp1").show();
					$("#tag_vp2").hide();
					$("#tag_vp3").hide();
					$("#tag_vp4").hide();
				}
				else if(vno=="2")
				{
					$("#tag_vp0").hide();
					$("#tag_vp1").hide();
					$("#tag_vp2").show();
					$("#tag_vp3").hide();
					$("#tag_vp4").hide();
				}
				else if(vno=="3")
				{
					$("#tag_vp0").hide();
					$("#tag_vp1").hide();
					$("#tag_vp2").hide();
					$("#tag_vp3").show();
					$("#tag_vp4").hide();
				}
				else if(vno=="4")
				{
					$("#tag_vp0").hide();
					$("#tag_vp1").hide();
					$("#tag_vp2").hide();
					$("#tag_vp3").hide();
					$("#tag_vp4").show();
				}

}


	
function chk_ieu9()
{
    var agent = navigator.userAgent.toLowerCase(),
        name = navigator.appName,
        browser,  ie_u9 ="N";
    
    // MS 계열 브라우저를 구분하기 위함.
    if(name === 'Microsoft Internet Explorer' || agent.indexOf('trident') > -1 || agent.indexOf('edge/') > -1) {
        browser = 'ie';
        if(name === 'Microsoft Internet Explorer') { // IE old version (IE 10 or Lower)
            agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(agent);
            browser += parseInt(agent[1]);
			if(parseInt(agent[1]) < 10)  ie_u9 ="Y";
        } else { // IE 11+
            if(agent.indexOf('trident') > -1) { // IE 11 
                browser += 11;
            } else if(agent.indexOf('edge/') > -1) { // Edge
                browser = 'edge';
            }
        }
    } else if(agent.indexOf('safari') > -1) { // Chrome or Safari
        if(agent.indexOf('opr') > -1) { // Opera
            browser = 'opera';
        } else if(agent.indexOf('chrome') > -1) { // Chrome
            browser = 'chrome';
        } else { // Safari
            browser = 'safari';
        }
    } else if(agent.indexOf('firefox') > -1) { // Firefox
        browser = 'firefox';
    }

	return ie_u9; 
//alert(browser +"_" + ie_u9);
}


function chkevt2()
{
//	alert("AA");
	document.getElementById("tag_v02").contentDocument.location.reload(true);
}
function viewevt2()
{
	//alert("why~!");

	$(".event2-signpost").trigger( "click" );
}
$(window).load(function(){
	//chg_insta(0);
	chg_insta_(0);
//	$("#hash_page").attr('src','/ista/t1.php');
})



function _trackga(gtype,glabel)
{
	_gaq.push(['_trackEvent', gtype , 'Click', glabel]);
	//console.log("gtype " + gtype + "_" + glabel);
}