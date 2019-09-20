;(function() {

var is_uploading ="N";

  var $aside = $('#main > aside');
  var $lnbAside = $('#main > .lnb-aside');

  var asideBreakPoint = 1578 + $('#process').innerHeight(); // 53 is bottom value (.aside.is-sticky)
  var lnbAsideBreakpoint = $lnbAside.offset().top;

  var wh = $(window).innerHeight();

  var reserOk = false;



  function formInit() {
    mui.validate.init($('.form'));
    $('#song-title').next().find('b').text('00');
    $('#song-describe').next().find('b').text('000');
    $('.form-path').text('응모분야_핸드폰끝자리_신청자명');
  }

  $(".btn-submit__").on("click", function(e) {
    e.preventDefault();
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



    alert("등록이 완료되었습니다.");
    reserOk = true;
    formInit();
    mui.modal.close('popup-apply');
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


  $(function() {


    $('#myform').ajaxForm({
      dataType: 'text',
      beforeSend: function(xhr, opts) {
        //  $('#result').append( "beforeSend...\n" );

			if(is_uploading =="Y")
			  {
				alert("등록중입니다. 잠시만 기다려 주십시오");
				xhr.abort();
				return;
			  }
			  else
				  {
					is_uploading ="Y";
				  }


        // 값체크... 들어갈것..
        var chkv = chkval();
        //  alert(chkv);
        if (!chkv) {
			is_uploading ="N";
          xhr.abort();
          //return false;
        }

      },
      success: function(data) {
        var oJson = eval("(" + data + ")");

        if (oJson.status == "OK") {

			is_uploading ="N";
          alert("등록이 완료되었습니다.");
          reserOk = true;
          formInit();
          mui.modal.close('popup-apply');
        } else {
          alert(oJson.message);
        }

        //$('#result')
        //  .append( "업로드 성공...\n" )
        //  .append(  oJson.status  + "\n" )
        //  .append(  oJson.mesage  + "\n" );
      },
      complete: function(data) {

			is_uploading ="N";
        //  $('#result')
        //    .append( "전송완료...\n" );
      }
    });
  });


  var scrollInterface = function(){
    var st = $(window).scrollTop();

    if ((st + wh > asideBreakPoint)) {
      $aside.css({
        'top': 'auto'
      }).addClass('is-sticky')
    } else {
      $aside.css({
        'top': st + wh - $('#process').innerHeight() - parseInt($('#process').css('margin-bottom'))
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

}());
