var agent = navigator.userAgent.toLowerCase();
var btype ="" ;
if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {btype ="IE";}else {if (agent.indexOf("chrome") != -1) {btype ="CR";}else if (agent.indexOf("safari") != -1) {btype ="SF";}else if (agent.indexOf("firefox") != -1) {btype ="FF";}else{btype ="-";}}


var title;
var link;



    // 사용할 앱의 Javascript 키를 설정해 주세요.
    Kakao.init('de029b358cf73a64656f202d63921c08');




function sendsns(stype)
{
		title ="잇츠스킨, 10번째 생일파티 중!";
		link ="http://10thparty.itsskin.com/t_index.html";
//http://10thparty.itsskin.com/images/itsskin_sns_img.jpg

	if (stype =="FB")
		{
			goFacebook(title, link);
		//	return;
		}
	else if(stype=="TW"){		
			goTwitter(title, link);
		//	return;			
		}

	else if(stype=="KS"){		
			goKakaoStory(title, link);
		//	return;			
		}
	else if(stype=="KT"){		
			goKakaoTalk(title, link);
		//	return;			
		}
	else if(stype=="BL"){		
			goBlog();
		//	return;			
		}
	else if(stype=="UR"){		
			goUrl();
		//	return;			
		}


}



//잇츠스킨 10th birthday party에 세서미 스트리트와 10센치가 놀러왔어요! 리미티드 스페셜 에디션과 이벤트 선물이 가득한 잇츠스킨 열번째! 생일파티에서 함께 놀아요!





function goTwitter(title, link) {
	var title2 = "잇츠스킨 10th birthday party에 세서미 스트리트와 10센치가 놀러왔어요! 리미티드 스페셜 에디션과 이벤트 선물이 가득한 잇츠스킨 열번째! 생일파티에서 함께 놀아요!"
    var w = (screen.width-450)/2;
    var h = (screen.height-450)/2;
    var href = "http://twitter.com/share?text=" + encodeURIComponent(title2) + "&url=" + encodeURIComponent(link);
//    var a = window.open(href);
    var a = window.open(href, 'tfb', 'width=650,height=450,left='+w+',top='+h+',scrollbars=0');

  //  if(a) { a.focus(); }
}


function goFacebook(title, link) {
		alert("new2");
//		title2 = "잇츠스킨 10th birthday party에 세서미 스트리트와 10센치가 놀러왔어요! 리미티드 스페셜 에디션과 이벤트 선물이 가득한 잇츠스킨 열번째! 생일파티에서 함께 놀아요!"
//    var w = (screen.width-450)/2;
//    var h = (screen.height-450)/2;
//	  var href = "https://www.facebook.com/sharer/sharer.php?u="+ encodeURIComponent(link)+"&t="+ encodeURIComponent(title2);
//    var ab = window.open(href, 'fb22', 'width=550,height=450,left='+w+',top='+h+',scrollbars=0');
//    if(ab) { ab.focus(); }
//	//documnet.location.href = href; 

FB.ui({
            method: 'share',
            href: link,
				display:iframe
        }, function(response){});


}




function goKakaoStory(title, link)
{
		title2 = ""
    var w = (screen.width-650)/2;
    var h = (screen.height-500)/2;
	  var href = "https://story.kakao.com/share?url="+ encodeURIComponent(link)+"&t="+ encodeURIComponent(title2);
    var ab = window.open(href, 'fff', 'width=600,height=650,left='+w+',top='+h+',scrollbars=0');
//    if(ab) { ab.focus(); }
}


    function goKakaoTalk(title, link) {
        Kakao.Link.sendTalkLink({
            label: '잇츠스킨 10th birthday party!\n\n심쿵게스트 세서미 스트리트와 10센치의 축하공연!\n\n리미티드 스페셜 에디션과 이벤트 선물이 가득한 잇츠스킨 열번째 생일파티에 초대합니다!\n',
            image: {
                src: 'http://10thparty.itsskin.com/images/2itsskin_sns_img_v1.jpg',
                width: '400',
                height: '210'
            },
            webButton: {
                text: '생일파티 초대수락하기',
                url: link
            }
        });
    }

    function goBlog() {
        var tmp = prompt("HTML태그를 복사한뒤 붙여넣기로 공유해주세요","<a href='http://10thparty.itsskin.com/'><img src='http://10thparty.itsskin.com/images/2itsskin_sns_img_v1.jpg' width='600'  alt='315'></a>");
        if (tmp) {
        }
    }
    function goUrl() {
        var tmp = prompt("복사한뒤  공유해주세요","http://10thparty.itsskin.com/");
        if (tmp) {
        }
    }


function goCopy(){
	var link="http://bit.ly/29LVEKf";

//  if(btype=="FF" || btype=="CR"|| ( btype == "IE" && navigator.userAgent.search('Trident') != -1) ) {
  if(btype=="FF" || btype=="CR" ) {
    
      clipboard.copy({'text/plain': link});
      alert("주소가 복사되었습니다. \n\nCtrl+V로 붙여 넣기 하세요.. ");



  }
  else{
    $('#copy_url').zclip({
      path:'js/ZeroClipboard.swf',
      copy:function(){
        return link;
      }
    });
  }
}

