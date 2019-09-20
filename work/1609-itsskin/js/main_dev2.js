var is_uploading ="N";


;(function() {



  var $aside = $('#main > aside');
  var $lnbAside = $('#main > .lnb-aside');

  var asideBreakPoint = 1678 + $('#sample-listen').innerHeight(); // 53 is bottom value (.aside.is-sticky)
  var lnbAsideBreakpoint = $lnbAside.offset().top;

  var wh = $(window).innerHeight();

  var reserOk = false;



  function formInit() {
    mui.validate.init($('.form'));
    $('#song-title').next().find('b').text('00');
    $('#song-describe').next().find('b').text('000');
    $('.form-path').text('응모분야_핸드폰끝자리_신청자명');
  }

  $(".btn-submit").on("click", function(e) {
    e.preventDefault();


  
      if(is_uploading =="Y")
        {
        alert("등록중입니다. 잠시만 기다려 주십시오");
        return;
        }
        else
          {
          
          }



    var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    if (!mui.validate.radio("category-song")) {
      is_uploading ="N";
      alert("본인의 응모 부문을 체크해 주십시오. ");
      return false;
    } else if (!mui.validate.input($('#song-title'))) {
      is_uploading ="N";
      alert("음원 제목을 입력해 주십시오.  ");
      return false;
    } else if (!mui.validate.input($('#song-describe'))) {
      is_uploading ="N";
      alert("작성된 글이 없습니다. ");
      return false;
    } else if (!mui.validate.input($('#song-file'))) {
      is_uploading ="N";
      alert("업로드된 파일이 존재하지 않습니다. ");
      return false;
    } else if (!mui.validate.input($('#user-name'))) {
      is_uploading ="N";
      alert("이름이 입력되지 않았습니다. ");
      return false;
    } else if (!mui.validate.input($('#user-tel'))) {
      is_uploading ="N";
      alert("핸드폰번호가 입력되지 않았습니다.('-' 제외)");
      return false;
    } else if (!mui.validate.input($('#user-tel'), "tel")) {
      is_uploading ="N";
      alert("유효한 숫자만 입력해 주십시오.('-' 제외)");
      return false;
    } else if (!mui.validate.input($('#user-email'))) {
      is_uploading ="N";
      alert("E-mail이 입력되지 않았습니다.");
      return false;
    } else if (!mui.validate.input($('#user-email'), "email")) {
      is_uploading ="N";
      alert("E-mail 형식에 맞지 않습니다.\n예) muorigin_01@muorigin.com");
      return false;
    } else if (mui.validate.radio("agreement") !== "Y") {
      alert("개인정보 수집 · 이용 동의 사항에 동의해주십시오. ");
      is_uploading ="N";
      return false;
    }

    if( confirm('뮤 로고송 & 징글 공모전에 정말 응모하시겠습니까?\n\n응모 후에는 수정 및 취소가 불가능합니다.\n입력하신 정보를 다시 한번 확인하신 후\n확인 버튼을 클릭해주세요.') ){
      $('#myform').submit();
      is_uploading ="Y";
    } else {
      return true;
    }
  
  //return true;

    //  is_uploading ="N";
//$('#myform').submit();
    //  document.myform.submit();

   // alert("등록이 완료되었습니다3333.");
//    reserOk = true;
  //  formInit();
   // mui.modal.close('popup-apply');
  });


  function chkval() {

    var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    
    if (!mui.validate.radio("category-song")) {
      alert("본인의 응모 부문을 체크해 주십시오. ");
      return false;
    } else if (!mui.validate.input($('#song-title'))) {
      alert("음원 제목을 입력해 주십시오.  ");
      return false;
    } else if (!mui.validate.input($('#song-describe'))) {
      alert("작성된 글이 없습니다. ");
      return false;
    } else if (!mui.validate.input($('#song-file'))) {
      alert("업로드된 파일이 존재하지 않습니다. ");
      return false;
    } else if (!mui.validate.input($('#user-name'))) {
      alert("이름이 입력되지 않았습니다. ");
      return false;
    } else if (!mui.validate.input($('#user-tel'))) {
      alert("핸드폰번호가 입력되지 않았습니다.('-' 제외)");
      return false;
    } else if (!mui.validate.input($('#user-tel'), "tel")) {
      alert("유효한 숫자만 입력해 주십시오.('-' 제외)");
      return false;
    } else if (!mui.validate.input($('#user-email'))) {
      alert("E-mail이 입력되지 않았습니다.");
      return false;
    } else if (!mui.validate.input($('#user-email'), "email")) {
      alert("E-mail 형식에 맞지 않습니다.\n예) muorigin_01@muorigin.com");
      return false;
    } else if (mui.validate.radio("agreement") !== "Y") {
      alert("개인정보 수집 · 이용 동의 사항에 동의해주십시오. ");
      return false;
    }
    return true;

  }

function finit()
  {
  //alert("OK~~~~~");

  is_uploading ="N";

  //  reserOk = true;
  //  formInit();
  //  mui.modal.close('popup-apply');
  }

  $(function() {



  });


  var scrollInterface = function(){
    var st = $(window).scrollTop();

    if ((st + wh > asideBreakPoint)) {
      $aside.css({
        'top': 'auto'
      }).addClass('is-sticky')
    } else {
      $aside.css({
        'top': st + wh - $('#sample-listen').innerHeight() - parseInt($('#sample-listen').css('margin-bottom'))
      }).removeClass('is-sticky');
    }

    if (st > lnbAsideBreakpoint - 100) { // 100 is real header height value
      $lnbAside.addClass('is-sticky');
    } else {
      $lnbAside.removeClass('is-sticky');
    }

  }

  $('#popup-apply .modal-btn-close').on('click', function() {
    formInit();
  });

  $(document).ready(function() {
    setTimeout(function(){
      scrollInterface();
    }, 100);
    $('#song-file').change(function() {
      var value = this.value;
      var fileName = typeof value == 'string' ? value.match(/[^\/\\]+$/)[0] : value[0];
      $('.form-path').text(fileName);
    });
  });

  $(document).on('keyup', 'input[maxlength], textarea[maxlength]', function(e) {
    var length = e.result;
    var maxLength = $(this).attr('maxlength');

    if( maxLength > 99 && length < 100 ) length = '0' + length;
    if( maxLength > 9 && length < 10 ) length = '0' + length;   

    $(this).next().find('b').text(length);
  });



  $(window).scroll(function() {
    scrollInterface();
  });

  $(window).resize(function() {
    wh = $(window).innerHeight();
    scrollInterface();
  });


  $(window).load(function(){
  });

}());


function finit2()
  {
  //alert("OK~~~~~");

  is_uploading ="N";

  //  reserOk = true;
  //  formInit();
  //  mui.modal.close('popup-apply');
  }

/**
 * Youtube Background Audio Controller
 * @type {[type]}
 */
var tmpPlayer = null;
var $tmpPlayerButton = $('[data-utube-id]')
var $tmpPlayerTarget = null;

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  tmpPlayer = new YT.Player('bg-audio', {
    width: 1,
    height: 1,
    videoId: "qZvXvMSHCQk",
    playerVars: {
      'autoplay': 0,
      'rel': 0,
      'wmode': 'transparent',
      'controls': 0,
      'showinfo': 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  $tmpPlayerButton.on('click', function(){
    var id = $(this).data('utube-id');
    $tmpPlayerTarget = $('[data-utube-id="'+id+'"');

    if( $tmpPlayerTarget.hasClass('is-played') ){
      $tmpPlayerTarget.removeClass('is-played')
      
      event.target.stopVideo();
      return true;
    }

    event.target.loadVideoById(id);
  });
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING){
    $tmpPlayerButton.removeClass('is-played');
    $tmpPlayerTarget.addClass('is-played');
  }
  if (event.data == YT.PlayerState.ENDED){
    $tmpPlayerTarget.removeClass('is-played');
  }
}
