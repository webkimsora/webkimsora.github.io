
  var reserOk = false;
var jq_shareend = null;

var App = (function() {
  var ww,
    wh;

  var videoID = 'EipLB_18R9I';
  var productAutoSlide = null;

  var init = function() {
    resizeInterface();

    $("#stagram-image").mCustomScrollbar({
      theme: 'stagram',
      axis: "x"
    });

    $('.detail-itsskin-products').owlCarousel({
      items: 1,
      margin: 0,
      nav: true,
      loop: true,
      onInitialized: function(e) {
        var $_self = this.$stage;

        productAutoSlide = setInterval(function() { 
          var $_target = $_self.find('.owl-item.active');

          if($_target.length < 1)
            return true;

          getProduct($_target) 
        }, 3000);
        
      },
      onTranslated: function(e) {
        var $_self = this.$stage;
        var $_target = $_self.find('.owl-item.active');

        if ($_target.find('.detail-itsskin-type').length > 0) {

          productAutoSlide = setInterval(function() { 
            getProduct($_target) 
          }, 3000);

        }

      },
      onTranslate: function() {
        clearInterval(productAutoSlide);
      }
    });


    $('#instagram-file').change(function() {
      var value = this.value;
      var fileName = typeof value == 'string' ? value.match(/[^\/\\]+$/)[0] : value[0];
      $('#instagram-file').next().text(fileName);
    $('#chkfile').val(fileName);
  //  alert(fileName);
    
    });
/*
    $('[for="instagram-file"]').on('click', function(e){
      e.preventDefault();
      $('#instagram-file').trigger('click');
    })
*/
    // OWL Carousel 때문에.. 별도로 지정 ㅡㅡㅗ
    $('.detail-itsskin-products').on('click', '.detail-itsskin-item > a', function (e) {
      var href = $(this).attr('href');

      if( href === "#"){
        e.preventDefault();
        alerts(0);
      }
    });

    // 슬라이드 잔상때문에 레이어 팝업 클릭 시 슬라이드 영역 보이게 함
    $('[href="#popup-itsskin"]').on('click', function(){
      isDetailOpened = true;

      if( $('.detail-itsskin').hasClass('is-Slide') ){
        return true;
      } else {
        setTimeout(function(){
          $('.detail-itsskin').addClass('is-Slide');
        }, 500);
      }
    });
    
    $('[href="#popup-stagram"]').on('click', function(){
      isDetailOpened = true;

      $("#stagram-image").mCustomScrollbar("update");
      $("#stagram-image").mCustomScrollbar("scrollTo", 0);

      setTimeout(function(){
        $('.walkthrough, .walkthrough-backdrop').fadeOut(function(){
          $(this).remove();
        });
      }, 3000)
    })

    $('[data-toggle="alert"]').on('click', function(e){
      e.preventDefault();
      var index = $(this).attr('data-index');

      alerts(index);
    });
  };

  var alerts = function(index){
    var $target = $('#popup-alert');

    $target.find('[data-alert-index]').hide();
    $target.find('[data-alert-index="'+index+'"]').show();

    mui.modal.open('popup-alert');
  };

  var getProduct = function($_self) {
    var $target = $_self.find('.detail-itsskin-type .is-active');

    if ($target.closest('li').next().length > 0) {
      $target.closest('li').next().find('a').trigger('click');
    } else {
      $target.closest('ul').find('li').eq(0).find('a').trigger('click');
    };

  }

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
    alert:alerts,
    setVerticalMiddle: setVerticalMiddle,
    videoID: videoID
  };
}());

;
(function() {
  App.init();



  $('[data-toggle="gnb"]').on('click', function(e) {
    e.preventDefault();

    Page.goTo($(this).attr('href'));
  });

  // #이벤트 1
  $('[data-toggle="event1-step"]').on('click', function(e) {
    e.preventDefault();

    if ($('#detail-event1-step').css('display') === 'block') {
      $('#detail-event1-step').hide();
      $('#detail-event1-weekly').fadeIn();
    } else {
      $('#detail-event1-weekly').hide();
      $('#detail-event1-step').fadeIn();
    }
  });

  // # 이벤트1 팝업 열림 + 탭
  $('[href="#popup-event1"]').on('click', function(){
    isDetailOpened = true;
    var index = 0;
    
    if ( typeof visibleIndex !== 'undefined' ){
      index = visibleIndex;
    }
    
    $('#detail-event1-weekly button').eq(index).trigger('click');
  });

  // #이벤트 1 주간 탭
  $('#detail-event1-weekly button').on('click', function(e){
    e.preventDefault();

    if( $(this).hasClass('is-disabled') )
      return true;

    /**
    *
    1. 현재 클릭한 녀석을 찾는다.
    2. 1번의 부모중 li 를 찾는다.
    3. li 는 ul 밑에 있는 녀석이니 찾은 li 가 ul 자식 중 몇번째인지 알아낸다.
    4. 자바스크립트의 숫자 시작은 0부터 시작하기때문에 +1을 해준다.
    */
    var index = ( $(this).closest('li').index() ) + 1;
    var indexImg = $('.list-cont-img').index();

    $('#detail-event1-weekly .list-collapse button > img').each(function(){
      $(this).attr('src', $(this).attr('src').replace('-on.png', '.png'));
    });

    $(this).find('img').attr('src', $(this).find('img').attr('src').replace('.png', '-on.png'));

    $('.list-date').attr('src', './images/event1/popup/cont-date'+index+'.png');

	//0930  당첨자 발표전 링크수정.. 2,3 주차 리스트로.. 김진호
	if(index ==1)
	  {
		  $('.list-go').attr('href', 'http://www.itsskin.com/event/winner_view.asp?IDX=1972');
	  }
	else if(index ==2)
	  {
		  $('.list-go').attr('href', 'http://www.itsskin.com/event/winner_view.asp?IDX=1974');
	  }
	else if(index ==3)
	  {
		  $('.list-go').attr('href', 'http://www.itsskin.com/event/winner_view.asp?IDX=1976');
	  }
	else if(index ==4)
	  {
		  $('.list-go').attr('href', 'http://www.itsskin.com/event/winner_view.asp?IDX=1977');
	  }
	  else
	  {
		  $('.list-go').attr('href', 'http://www.itsskin.com/event/winner_list.asp');
	  }

    $('.list-cont-img').hide().eq((index) - 1).show();  

    // 0922 김소라 주간탭 당첨자발표 링크 이동 
    if($(this).closest('li').hasClass('js-closed')) {
     //$('.list-go').show();
     //$('.list-date').attr('src', './images/event1/popup/cont-date'+index+'-is-opend.png');
    } else {
      //$('.list-go').hide();
    }
  });

  // #이벤트 2
  $('[data-toggle="event2-present"]').on('click', function(e) {
    e.preventDefault();

    if ($('#detail-event2-present').css('display') === 'none') {
      //$('#detail-event2-insta').hide();
      $('#detail-event2-present').show();
    } else {
      $('#detail-event2-present').hide();
      //$('#detail-event2-insta').show();
    }
  });

  // 이벤트 3 제품 상세보기
  $('.detail-itsskin-type li > a').on('click', function(e) {
    e.preventDefault();

    
    var $target = $(this).closest('.detail-itsskin-type').next();
    var index = ($(this).closest('li').index() + 1);

    var src = $target.attr('src');
    var newSrc = src.substring(0, src.length - 5);

    $(this).closest('.detail-itsskin-type').find('a').removeClass('is-active');
    $(this).addClass('is-active');

    $target.attr('src', newSrc + index + '.png');
  });

  $('[href="#popup-video"]').on('click', function() {
    isDetailOpened = true;

    $('#popup-video .movie-frame > iframe').attr('src', 'https://www.youtube.com/embed/' + App.videoID + '?autoplay=1&amp;rel=1');
    if( tmpPlayer !== null){
      tmpPlayer.stopVideo();
    }
  });

  $('#popup-video [data-rel="back"]').on('click', function() {
    $('#popup-video .movie-frame > iframe').attr('src', '');
  });

  // #이벤트2
  $('#detail-event2-info .btn-event').on('click', function(e) {
    e.preventDefault();
    $('#detail-event2-info').css('display', 'none');
    $('#detail-event2-upload').css('display', 'block');
  });

  $('#detail-event2-upload .btn-close').on('click', function(e) {
    e.preventDefault();
    $('#detail-event2-upload').css('display', 'none');
    $('#detail-event2-info').css('display', 'block');

    mui.validate.init($('#detail-event2-upload'));
    $('.frm-upload > span').text('이미지를 등록하세요');
  });

  // #이벤트2 스크롤바
//  $('#detail-event2-insta').mCustomScrollbar();
//  $("#detail-event2-insta").mCustomScrollbar({
//    theme: 'greeninsta',
//    axis: "y"
//  });
  $('#tag_v0').mCustomScrollbar();
  $("#tag_v0").mCustomScrollbar({
    theme: 'greeninsta',
    axis: "y"
  });




  // #이벤트2 팝업 로그인


  $('.btn-register').on("click", function(e) {
    e.preventDefault();



  if(reserOk)
  {
    App.alert(2);
    return false;
  }

  reserOk = true;


    if (!mui.validate.input($('.frm-text-id'))) {
      //alert("인스타그램 아이디를 입력하세요");
      App.alert(4);
    reserOk = false;
      return false;
    } else if (!mui.validate.input($('.frm-text-pw'))) {
      //alert("비밀번호를 입력하세요");
      App.alert(5);
    reserOk = false;
      return false;
    } else if (!mui.validate.input($('#chkfile'))) {
      //alert("이미지를 선택해주세요");
      App.alert(6);
    reserOk = false;
      return false;
    }/* else if (!mui.validate.input($('.frm-text-img'))) {
      alert("이미지를 선택해주세요");
      return false;
    } */else if (!mui.validate.input($('.frm-text-detail'))) {
      //alert("글을 입력해주세요");
      App.alert(7);
    reserOk = false;
      return false;
    } else if (!mui.validate.checkbox($('#event2-chkbox'))) {
      //falert("개인정보 수집에 동의해주세요");
      App.alert(9);
    reserOk = false;
      return false;
    }
   // alert("등록되었습니다.");
    $('#detail-event2-upload').submit();


//    
//  setTimeout(function(){ 
//  
// mui.validate.init($('#detail-event2-upload'), e);
//
//  }, 9000);

  //  mui.validate.init($('#detail-event2-upload'), e);

   // reserOk = true;

  });

  

  /**
   * 160929
   * 엘모 인증샷 추가*/   
  $('[href="#popup-event2"], [href="#popup-event2-surprise"]').on('click', function(){
    isDetailOpened = true;
  });


}());




;(function() {
  var shareend = function(index) {
  if(index =="S"){
    //alert("등록되었습니다.");
    App.alert(1);
    //mui.modal.open('popup-share-complete');
  }
    mui.validate.init($('#detail-event2-upload'), e);
  };

  jq_shareend = shareend;

  });
