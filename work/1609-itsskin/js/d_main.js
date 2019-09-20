var App = (function() {
  var ww,
    wh;

  var videoID = '3gt6cHooI6M';

  var init = function() {
    resizeInterface();

    $("#stagram-image").mCustomScrollbar({
      theme:'stagram',
      axis:"x"
    });

    $('.detail-itsskin-list').owlCarousel({
      items:6,
      margin:43,
      nav:true
    });


    $('#instagram-file').change(function() {
      var value = this.value;
      var fileName = typeof value == 'string' ? value.match(/[^\/\\]+$/)[0] : value[0];
      $('#instagram-file').next().val(fileName);
    });
  };

  var setViewport = function() {
    var $parent = $('#viewport .container');
    
    $parent.css('width', ww * 6);
    $('> .section', $parent).css('width', ww);
  };

  var setVerticalMiddle = function() {
    var $target = $('#viewport .section > .inner, .intro-door');
    
    // wait for reflow timing
    setTimeout(function() {
      $target.each(function(i, k) {
        var tmpHeight = parseInt($(this).css('height'));
        $(this).css('margin-top', tmpHeight / 2 * -1);
      });
    }, 50);

  };

  var resizeInterface = function() {
    ww = $(window).innerWidth();
    wh = $(window).innerHeight();

    setVerticalMiddle();
    setViewport();
  };

  $(window).resize(function() {
    resizeInterface();
  });

  $(window).load(function() {
    resizeInterface();
  });

  return {
    init: init,
    setVerticalMiddle: setVerticalMiddle,
    videoID: videoID
  }
}());

;(function() {
  App.init();
  
  $('[data-toggle="gnb"]').on('click', function(e){
    e.preventDefault();
    
    Page.goTo($(this).attr('href'));
  });

  // #이벤트 1
  $('[data-toggle="event1-step"]').on('click', function(e){
    e.preventDefault();

    if( $('#detail-event1-step').css('display') === 'block' ){
      $('#detail-event1-step').hide();
      $('#detail-event1-weekly').fadeIn();
    } else {
      $('#detail-event1-weekly').hide();
      $('#detail-event1-step').fadeIn();
    };
  });

  $('[href="#popup-video"]').on('click', function(){
    $('#popup-video .movie-frame > iframe').attr('src', 'https://www.youtube.com/embed/'+App.videoID+'?autoplay=1&amp;rel=1');
  });

  $('#popup-video [data-rel="back"]').on('click', function(){
    $('#popup-video .movie-frame > iframe').attr('src', '');
  });

    // #이벤트2
  $('#detail-event2-info .btn-event').on('click', function(){
    $('#detail-event2-info').css('display','none');
    $('#detail-event2-upload').css('display','block');
  });

  $('#detail-event2-upload .btn-close').on('click', function(){
    $('#detail-event2-upload').css('display','none');
    $('#detail-event2-info').css('display','block');
  });

    // #이벤트2 스크롤바
  $('#detail-event2-insta').mCustomScrollbar();
  $("#detail-event2-insta").mCustomScrollbar({
      theme:'greeninsta',
      axis:"y"
  });
    // #이벤트2 팝업 로그인

  var reserOk = false;

  $('.btn-register').on("click", function(e){
   e.preventDefault();



	if(event02Flag)
	{
		alert("업로드 진행중입니다.\n잠시만 기다려 주십시오.");
		return false;
	}

	event02Flag = true;

    if(!mui.validate.input($('.frm-text-id'))){
      alert("인스타그램 아이디를 입력하세요");
      return false;
    } else if (!mui.validate.input($('.frm-text-pw'))){
      alert("비밀번호를 입력하세요");
      return false;
    } else if (!mui.validate.input($('.frm-text-detail'))){
      alert("글을 입력해주세요");
      return false;
    } else if (!mui.validate.checkbox($('#event2-chkbox'))){
      ("개인정보 수집에 동의해주세요");
      return false;
    }

//$('#detail-event2-upload').submit();
//	document.form1.submit();
    // alert("등록되었습니다.");

     mui.validate.init($('#detail-event2-upload'), e );

//     reserOk = true;

  });

}());
