var tmpYOffset = 0;
var App = (function(){

  var alerts = function(index){
    var $target = $('#popup-alert');

    $target.find('[data-alert-index]').hide();
    $target.find('[data-alert-index="'+index+'"]').show();

    tmpYOffset = $(window).scrollTop();
    mui.modal.open('popup-alert');
  };

  return {
    alert: alerts
  }
}())

;(function() {

  var $productSlider = null;

  var videoID = 'EipLB_18R9I';
  
  if( !isAndroidFF )
    $('html').addClass('is-loaded');

  
  var getProduct = function($_self) {
    var $target = $_self.find('.detail-itsskin-type .is-active');
    if ($target.closest('li').next().length > 0) {
      $target.closest('li').next().find('a').trigger('click');
    } else {
      $target.closest('ul').find('li').eq(0).find('a').trigger('click');
    }
  };

  mui.common.setLandscapeMessage('./images/landscape.png', '#ffdd00');

  $(window).load(function() {
    

    setTimeout(function() {

      if ($('#intro').css('display') === 'block')
        $('#intro [data-toggle="transit"]').trigger('click');
    }, 3000);
  });

  $('#intro [data-toggle="transit"]').on('click', function(e) {
    e.preventDefault();

    $('#intro').addClass('is-clicked').fadeOut(300, function() {
      $('#viewport').fadeIn(function() {


//        var KAKAO_VER = parseInt( (UserAgent.split('KAKAOTALK')[1]).split('.').join('') );				//일반 모바일브라우져 오류나네~!
		var KAKAO_VER = 500; 
		if(UserAgent.match(/KAKAOTALK/i) !== null)
		  {
			 KAKAO_VER = parseInt( (UserAgent.split('KAKAOTALK')[1]).split('.').join('') );
		  }
        /**
         * 특정 버전에만 생기는 현상이면 아래와 같은 코드를 넣고 (KAKAO_VER  >= 585) 를 제거
         * UserAgent.match(/5.8.5/i) || UserAgent.match(/5.8.6/i) || UserAgent.match(/5.8.7/i)  !== null
         * 
         */
     //   var ISKK585 = ( (KAKAO_VER >= 585) && UserAgent.match(/KAKAOTALK/i) !== null && UserAgent.match(/iPhone|iPod|iPad|/i) !== null );
	 
		var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
		var ISKK585 = ( (KAKAO_VER >= 585) && UserAgent.match(/KAKAOTALK/i) !== null && iOS );
		
	//	alert(ISKK585);
//		ISKK585 = false; 

        Page.init();
        // 카카오톡 5.8.5 (only iOS)
        if( ISKK585 ){
          $('.navigation').css({
            'bottom': $('.navigation').innerHeight() - $('.navigation').innerHeight() * 0.23,
            'transition': 'all 0.3s ease-in-out'
          });          
        }
      });
    });
  });

  $('[data-toggle="gnb"]').on('click', function(e) {
    e.preventDefault();
    Page.goTo($(this).attr('href'));
  });

  $('[data-toggle="alert"]').on('click', function(e){
    e.preventDefault();
    var index = $(this).attr('data-index');

    App.alert(index);
  });

  $('#popup-alert [data-rel="back"]').on('click', function(){
    setTimeout(function(){
      $(window).scrollTop(tmpYOffset);
    }, 50)
  });

  // 160929 인증샷 업로드 시 자동으로 `스페셜 어데션 구매 인증` 이 선택이 되게 해야함.
  $('[href="#popup-event2-event"]').on('click', function(){
    $('[for="frm-type-purchase"]').trigger('click');
  });

  $('#instagram-file').change(function() {
    var value = this.value;
    var fileName = typeof value == 'string' ? value.match(/[^\/\\]+$/)[0] : value[0];
    $('#instagram-file').next().val(fileName);
    $('#chkfile').val(fileName);

  });

  //상단 제품 활성화
  var goodsList = $('.goods-list > li');

  goodsList.find('a').click(function(e) {
    e.preventDefault();

    goodsList.removeClass('is-active');
    $(this).parent().addClass('is-active');

    mui.util.goToPosition($('#product-list').offset().top - $('.modal-content > header').innerHeight());

    var index = $(this).closest('li').index();
    $productSlider.trigger('to.owl.carousel', [index, 350])

  });

  // @@@@@@ 0920 김소라 이벤트1 탭 2주차 수정

    // # 이벤트1 팝업 열림 + 탭
  $('[href="#popup-event1"]').on('click', function(){
    var index = 0;

    if ( typeof visibleIndex !== 'undefined' ){
      index = visibleIndex;
    }
    
    /*
    if ( isSecond ){
      index = 1;
    }
    */

    $('#event01-popup .list > a').eq(index).trigger('click');
    $('#event01-popup .list > a').eq(index).addClass('is-active');
  });

   // #이벤트 1 주간 탭
  $('#event01-popup .list a').on('click', function(e){
    e.preventDefault();

  if( $(this).is('[data-toggle="alert"]') ) {
    return true;
  }

  $('#event01-popup .list a').removeClass('is-active');
  $(this).addClass('is-active');

  var index = ( $(this).index() ) + 1;

  $('.list-date').attr('src', './images/popup/event01-date'+index+'.png');

	//0930  당첨자 발표전 링크수정.. 2,3 주차 리스트로.. 김진호
	if(index ==1)
	  {
		  $('.list-go').attr('href', 'http://m.itsskin.com/event/winner_view.asp?IDX=1972');
	  }
	else if(index ==2)
	  {
		  $('.list-go').attr('href', 'http://m.itsskin.com/event/winner_view.asp?IDX=1974');
	  }
	else if(index ==3)
	  {
		  $('.list-go').attr('href', 'http://m.itsskin.com/event/winner_view.asp?IDX=1976');
	  }
	else if(index ==4)
	  {
		  $('.list-go').attr('href', 'http://m.itsskin.com/event/winner_view.asp?IDX=1977');
	  }
	  else
	  {
		  $('.list-go').attr('href', 'http://m.itsskin.com/event/winner_list.asp');
	  }


  $('.instagram-inner').hide().eq((index) - 1).show();  

  // 0922 김소라 주간탭 당첨자발표 링크 이동 
  /*
    if($(this).hasClass('js-closed')) {
     $('.list-go').show();
     $('.list-date').attr('src', './images/popup/event01-date'+index+'.png');
    } else {
      $('.list-go').hide();
    }
  */
});

  // @@@@@@ 0920 김소라 이벤트1 탭 2주차 수정 끝 //

  // 이벤트 2 인스타 업로드 팝업 닫을 시 입력 폼 초기화
  $('#popup-event2-event [data-rel="back"]').on('click', function(){
    
    mui.validate.init($('#detail-event2-upload'));
    $('.frm-upload > span').text('이미지를 등록하세요');
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

  // OWL Carousel 때문에.. 별도로 지정 ㅡㅡㅗ
  $('.detail-itsskin-products').on('click', '.detail-itsskin-item > a', function (e) {
      var href = $(this).attr('href');

      if( href === "#"){
        e.preventDefault();
        App.alert(0);
      }
  });


  $('.detail-itsskin-products').on('click', '[href="#detail-itsskin-special-gift"]', function(e){
    e.preventDefault();
    mui.util.goToPosition($('#detail-itsskin-special-gift').offset().top - $('#event03-popup > header').innerHeight(), 500);
  })
  
  $('[href="#popup-itsskin"]').on('click', function(){
    if( $('.detail-itsskin').hasClass('is-Slide') ){
      return true;
    } else {
      setTimeout(function(){
        $('.detail-itsskin').addClass('is-Slide');
      }, 300);
    }
  });

  // 안드로이드 페이스북 인앱인경우 
  $('[target="_blank"]').on('click', function(e){
    if( !isFbApp )
      return true;
    
    e.preventDefault();
    var href = $(this).attr('href');

    window.location.href = href;
  });

  $('[href="#popup-stagram"]').on('click', function(){
    setTimeout(function(){
      $('.walkthrough').fadeOut(function(){
        $(this).remove();
      });
    }, 3000)
  });


  $productSlider = $('.detail-itsskin-products');
  $productSlider.owlCarousel({
    items: 1,
    margin: 0,
    nav: true,
    loop: true,
    onInitialized: function(e) {
      var $_self = this.$stage;

      productAutoSlide = setInterval(function() {
        var $_target = $_self.find('.owl-item.active');

        if ($_target.length < 1)
          return true;

        getProduct($_target)
      }, 3000);

      $('.goods-list li').eq(0).addClass('is-active');
    },
    onTranslated: function(e) {
      var $_self = this.$stage;
      var $_target = $_self.find('.owl-item.active');

      var index = e.page.index;

      if ($_target.find('.detail-itsskin-type').length > 0) {

        productAutoSlide = setInterval(function() {
          getProduct($_target)
        }, 3000);
      }

      // 모바일 기능 추가
      $('.goods-list li').removeClass('is-active');
      $('.goods-list li').eq(index).addClass('is-active');
    },
    onTranslate: function() {
      clearInterval(productAutoSlide);
    }
  });


 
  // #이벤트2 팝업 로그인

  $('.btn-register').on("click", function(e) {
    e.preventDefault();



  if(reserOk)
  {
    //alert("등록 진행중입니다.");
    App.alert(8);
    return false;
  }

  reserOk = true;


    if (!mui.validate.input($('.frm-text-id'))) {
      //alert("인스타그램 아이디를 입력하세요");
      App.alert(4)
    reserOk = false;
      return false;
    } else if (!mui.validate.input($('.frm-text-pw'))) {
      //alert("비밀번호를 입력하세요");
      App.alert(5)
    reserOk = false;
      return false;
    } else if (!mui.validate.input($('#chkfile'))) {
      //alert("이미지를 선택해주세요");
      App.alert(6)
    reserOk = false;
      return false;
    } else if (!mui.validate.input($('.frm-text-detail'))) {
      //alert("글을 입력해주세요");
      App.alert(7)
    reserOk = false;
      return false;
    } else if (!mui.validate.checkbox($('#event2-chkbox'))) {
      //alert("개인정보 수집에 동의해주세요");
      App.alert(9)
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

  var shareend = function(index) {
  if(index =="S"){
    mui.modal.open('popup-share-complete');
  }
    mui.validate.init($('#frm-share'));


  };

  
  $('[href="#popup-video"]').on('click', function() {
    $('#popup-video .video-container > iframe').attr('src', 'https://www.youtube.com/embed/' + videoID + '?autoplay=1&amp;rel=0');
  });

  $('#popup-video [data-rel="back"]').on('click', function(){
    $('.video-container > iframe').attr('src', '');
  });
}());

