$(document).ready(function() { 
/*
    $(window).load(function(){
      mui.modal.open('popup-auto-peed');
    });
*/

  var owl = $(".owl-carousel");
  
  owl.owlCarousel({
    autoplay:true,
    loop: true,
    slideSpeed : 3000,
    items : 1
  });

  // header Scroll
  headerHeight = $('.header').innerHeight();
  topHeight = $('.top').innerHeight();

  $(window).scroll(function(){
  var scrollWindow = $(window).scrollTop();

    if(scrollWindow > topHeight ) {
      $('.home .header').addClass('is-sticky');
    } else {
      $('.home .header').removeClass('is-sticky');
    }

    if($('.header').hasClass('is-sticky')) {
      $('.top-logo img').attr('src', './images/main/logo-sticky.png');
    } else {
      $('.top-logo img').attr('src', './images/main/logo.png');
    }
  });

  $(window).load(function(){
    headerHeight = $('.header').innerHeight();
    topHeight = $('.top').innerHeight();
  });

  //usermenu에서 출금신청 클릭시 출금신청 탭 열림
  $('.nav-menu > a').eq(1).on('click', function(){
    $(document).ready(function() { 
      $('.l-mypage').find('.faq-question').eq(1).trigger('click');
    });
  });

  //usermenu open
  $user = $('.userwrap');
  var winHeight = $(window).height() + 35;
  var userHeight = $('.user-contents').height() ;
  var st = $(this).scrollTop();
   var winTop = 0;

  $('.top-menu').on('click', function(){
    $user.addClass('open');
    $('#userBg').show();
    
    $('#userBg').on('touchstart',function(e){
      e.preventDefault();
    });

    winTop = $(window).scrollTop();
    $('#viewport').css({'top':-winTop,position:'fixed'});
  });

  $('.user-close').on('click', function(){  
    $user.removeClass('open');
    $('#userBg').hide();
    
    $('#viewport').css({'top':'',position:'relative'});
    $(window).scrollTop(winTop);
  });

  $('#userBg').on('click', function(){  
    $user.removeClass('open');
    $('#userBg').hide();
    
    $('#viewport').css({'top':'',position:'relative'});
    $(window).scrollTop(winTop);
  });


/*
  $('.top-menu').on('click', function(){
    $user.addClass('open');

	$('#viewport').bind('touchmove', function(e){e.preventDefault()});
	$('#viewport').bind('mousewheel', function(e){e.preventDefault()});

  $('.userwrap').unbind('touchmove');
  $('.userwrap').unbind('mousewheel');

  });

  $('.user-close').on('click', function(){

    $user.removeClass('open');
	
	$('#viewport').unbind('touchmove');
	$('#viewport').unbind('mousewheel');
  });
*/

  // 홈 공지사항 롤링

  var swiper = new Swiper('.home .swiper-container', {
      pagination: '.swiper-pagination',
      direction: 'vertical',
      slidesPerView: 1,
      paginationClickable: true,
      spaceBetween: 30,
      mousewheelControl: true,
      autoplay: 3000,
      autoplayDisableOnInteraction: false
    });


  // SUBPAGE - 캠페인 1102 수정
  $('#campaign .btn-participate').on('click', function(){
    $('.campaign-list').hide();
    $('.campaign-view').show();

    if($('.campaign-view').show()) {
      $('.btn-back').css('display','block');
    }
  });
  $('.sub .btn-back').on('click', function(){
    $('.campaign-list').show();
    $('.campaign-view').hide();
  });

  var campaignSwiper = new Swiper('#campaign .swiper-container', {
      paginationClickable: true,
      direction: 'vertical',
      autoplay: 2500,
      autoplayDisableOnInteraction: false
    });

   // 1107 캠페인 셀렉트박스  
   $(document).ready(function(){
      $(".width_tmp_option").html($('.resizing_select option:selected').text());
        var wid2 =$(".width_tmp_select").width() + ($(document).outerWidth() / 24);
      $('.resizing_select').width(wid2);
   });

   $('.resizing_select').change(function(){
    $(".width_tmp_option").html($('.resizing_select option:selected').text());
      var wid =$(".width_tmp_select").width() + ($(document).outerWidth() / 24);
    $(this).width(wid);  
  });


  // SUBPAGE - 이벤트 
  $('#event .btn-participate').on('click', function(){
    $('.event-list').hide();
    $('.event-view').show();

    if($('.event-view').show()) {
      $('.btn-back').css('display','block');
    }
  });
  $('.sub .btn-back').on('click', function(){
    $('.event-list').show();
    $('.event-view').hide();
  });

  // SUBPAGE - 라이크앤톡
  $('#likentalk .user-list > li').on('click', function(){
    $('.likentalk-list').hide();
    $('.likentalk-view').show();

    if($('.likentalk-view').show()) {
      $('.btn-back').css('display','block');
      $('.l-likentalk .section').css('margin-top', '0');
    }
  });
  $('.sub .btn-back').on('click', function(){
    $('.like-list').show();
    $('.like-view').hide();
  });


  //SUBPAGE - 고객센터
  var $customer = $('.faq');

  $('.faq-question').eq(0).addClass('is-clicked');
  $('.faq-answer').eq(0).show();

  $('.faq-question').on('click', function() {
    var $self = $(this),
      $selfAnswer = $(this).next();

    $('.faq-question').removeClass('is-clicked');
    $self.addClass('is-clicked');

    if ($selfAnswer.css('display') === "block") {
      $self.removeClass('is-clicked');
  		$selfAnswer.slideUp(300);
      return true;
    }

    $('.faq-answer').slideUp(300);
    $selfAnswer.slideDown(200, function() {
    });

    // 클릭
   if($(this).hasClass('is-clicked')) {
     var $clickEvent = $(this).next().find('.tab li');
     var $lookContent = $(this).next().find('.tab-content');
     
     $clickEvent.removeClass('is-active');
     $clickEvent.eq(0).addClass('is-active');
     
     $lookContent.hide();
     $lookContent.eq(0).show();
    }

  });

  // 서브 faq 
  $('.faq-inner-question').on('click', function() {
    var $self = $(this),
      $selfAnswer = $(this).next();

    $('.faq-inner-question').removeClass('is-clicked');
    $self.addClass('is-clicked');

    if ($selfAnswer.css('display') === "block"){
      $self.removeClass('is-clicked');
  		$selfAnswer.slideUp(300);
      return true;
    }

    $('.faq-inner-answer').slideUp(300);
    $selfAnswer.slideDown(200, function() {
    });

  });

  // 서브 탭
  var $subTab = $('.faq-answer .tab').find('li');

  $(".tab-content").hide();
  $(".tab-content:first").show();

  $subTab.on('click', function(){
    $subTab.removeClass('is-active');
    $(this).addClass('is-active');

    $('.faq-answer .tab-content').hide();

    if ($(this).hasClass('is-active')){
      var activeTab = $(this).attr("rel");
      $("#" + activeTab).show();
    }
  });

  $(".tab_v1").hide();
  $(".tab_v1:first").show();
  $(".tab_v2").hide();
  $(".tab_v2:first").show();
  $(".tab_v3").hide();
  $(".tab_v3:first").show();

  

  // 서브페이지 - 마이페이지
  /* 170406 수정 S -> 이전에 170203 수정된 부분 삭제함 
  var $myPageTab = $('.mypage-content .tab').find('li');

  $myPageTab.on('click', function(){
    $myPageTab.removeClass('is-active');
    $(this).addClass('is-active');

      $('.mypage-content .tab-content').hide();

      if($(this).hasClass('is-active')) {
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).show();
      }
  });
  /* 170406 수정 E */

  $('.interest-list li').on('click', function(){
    $(this).toggleClass('is-active');
  });

  /* 170406 1:1 문의 S */
/* $('.sort .swiper-slide').each(function(){
		$(this).find('.sort-listWrap').attr('id','wrap'+$(this).index())
		var id_el = $(this).find('.sort-listWrap').attr('id');
		var myScroll = new IScroll('#'+id_el, {
			mouseWheel: true,
			scrollbars: true,
		});
	}) //슬라이드에서 여러개 아이스크롤 사용하기 */

var $myPageTab = $('.mypage-content .tab').find('li');

  $myPageTab.on('click', function(){
    if($('.mypage-content').hasClass('stepCounsel')) {
      $myPageTab.removeClass('is-active');
      $(this).addClass('is-active');

      if($('.tab li').eq(0).hasClass('is-active')) {
        $('.couSection').eq(1).show();
        $('.couSection').eq(0).addClass('on').siblings('.couSection').removeClass('on');
      } else {
        $('.couSection').eq(1).hide();
        $('.couSection').eq(3).addClass('on').siblings('.couSection').removeClass('on');
        $('.oneCounsel #counsel-tab1').hide();
        $('.oneCounsel #counsel-tab2').show();

      }
    } else {
      var idx = $(this).index();

      $myPageTab.removeClass('is-active');
      $(this).addClass('is-active')
      $('.tab-container > div').eq(idx).show().siblings('div').hide();
    }
  });

  // 스텝1
  $(document).ready(function(){
    $('.couSection').eq(0).addClass('on');
  });
  // 슬라이드
  var mySwiper = new Swiper('.sort .swiper-container-h', {
        nextButton: '.sort .swiper-button-next',
        prevButton: '.sort .swiper-button-prev'
  });    
  
  // 스텝2
  $('#mypage .category-list > li').on('click', function(){
    var categoryIdx = $(this).index();
    
    $('.couSection').eq(1).addClass('on').siblings('.couSection').removeClass('on');
    $('.mypage-content .tab').hide();

    mySwiper.slideTo(categoryIdx, 10, false);

    var couHeight = $('.couSection.on').height();
    $('.layWrap').height(couHeight) ;
  });

  // 스텝3
  $('#mypage .sort-list li').on('click', function(){
    var listIdx = $(this).index();
    var listCounsel = $(this).closest('a');
    $('.couSection').eq(1).hide();
    $('.couSection').eq(2).addClass('on').siblings('.couSection').removeClass('on');
    $('.layWrap').height('auto') ;
  });

  $('#mypage .btn-backCounsel').on('click', function(){
    $('.couSection').eq(1).show();
    $('.couSection').eq(0).addClass('on').siblings('.couSection').removeClass('on');
    $('.mypage-content .tab').show();
  });
  
  $('#mypage .btn-oneCounsel').on('click', function(){
    $('.couSection').eq(1).show();
    $('.couSection').eq(3).addClass('on').siblings('.couSection').removeClass('on');
    $('.mypage-content .tab').show();
        $('.oneCounsel #counsel-tab1').show();
        $('.oneCounsel #counsel-tab2').hide();
  });

  /* 170406 1:1 문의 E */

  /* 161226 수정 S */  
    // 토글 스위치 기본값
		$("input[name='autopeed-toggle']").change(function() {
			var radioValue = $(this).val();
      $("input[id=autopeed-stay]").attr("disabled",true);      
      // 오토피드 거부
			if (radioValue == "PN") {      
        setTimeout(function(){     
          $('.list-option-autopeed .toggle-switch').addClass('refuse'); 
        },250);
        setTimeout(function(){        
          $('.list-option-autopeed .toggle-switch').removeClass('stay');
          $('.list-option-autopeed .toggle-switch').removeClass('agree');
        },100);
      } 
        //오토피드 수락
      else if (radioValue == "PY") {     
        setTimeout(function(){        
          $('.list-option-autopeed .toggle-switch').addClass('agree');
        },250);
        setTimeout(function(){        
          $('.list-option-autopeed .toggle-switch').removeClass('stay');
          $('.list-option-autopeed .toggle-switch').removeClass('refuse');
        },100);
      }
    });

/* 161228 수정 S */
    $("input[name='autodelete-toggle']").change(function() {
			var radioValue2 = $(this).val();      
      //$("input[id=autodelete-stay]").attr("disabled",true);
      // 오토삭제 거부
			if (radioValue2 == "DN") {      
        setTimeout(function(){     
          $('.list-option-autodelete .toggle-switch').addClass('refuse'); 
        },250);
        setTimeout(function(){        
          $('.list-option-autodelete .toggle-switch').removeClass('agree');
        },100);
      }
      // 오토삭제 수락 
      else if (radioValue2 == "DY") {     
        setTimeout(function(){        
          $('.list-option-autodelete .toggle-switch').addClass('agree');
        },250);
        setTimeout(function(){        
          $('.list-option-autodelete .toggle-switch').removeClass('refuse');
        },100);
      }
    });    
/* 161228 수정 E */
  
    // holding일때 라디오버튼 체크 막기
    if($('.list-option-autopeed .toggle-switch').hasClass('holding')) {
      $("input[name=autopeed-toggle]").attr("disabled",true);      
    } else {      
      $("input[name=autopeed-toggle]").attr("disabled",false);
    }

    
    if($('.list-option-autodelete .toggle-switch').hasClass('holding')) {
      $("input[name=autodelete-toggle]").attr("disabled",true);      
    } else {      
      $("input[name=autodelete-toggle]").attr("disabled",false);
    }
  /* 161226 수정 E */

  // 1104 포인트샵 서브페이지 - 포인트샵
  var pointSwiper = new Swiper('#pointshop-list .swiper-container', {
      pagination: '.swiper-pagination',
      slidesPerView: 'auto',
      paginationClickable: true,
      spaceBetween: 2
  });

  //161118 컨텐츠 높이 
/*  if($('#viewport .contents').height() < $('.userwrap').height()) {
    var userHeight = $('.userwrap').height()
    
    $('#viewport').css('height', userHeight);

    $('.footer').css({'position' : 'absolute',
        'bottom' : '0',
        'left' : '0',
        'width' : '100%'
      });
    } 

  $('.faq dt').on('click', function(){

    if($('#viewport .contents').height() > $('.userwrap').height()){
    var userHeight = $('.userwrap').height()
    
    $('#viewport').css('height', 'auto');
    }
  });
*/

  // 인센티브 링크
  $('#incentive .btn-detail').on('click', function(){
    $('#viewport').hide();
    $('#incentive-banner').show();
  });
  
  $('#incentive-banner .modal-btn-ok').on('click', function(){
    $('#viewport').show();
    $('#incentive-banner').hide();
  });

  $('#incentive-banner .modal__close').on('click', function(){
    $('#viewport').show();
    $('#incentive-banner').hide();
  });

  $('#incentive-copy [data-rel="back"]').on('click', function(){
    $('.modal-backdrop').hide();
  });
  $('#incentive-copy-ok [data-rel="back"]').on('click', function(){
    $('.modal-backdrop').hide();
  });

  // 인센티브 리포트 
  $(window).load(function(){
      $('.user-report tbody:eq(0)').show();
  });

  $('.l-incentive-year').change(function(){ 
    var idxReport = $(this).val();

    if(idxReport == "2016") {
      $('.user-report tbody:eq(0)').hide();
      $('.user-report tbody:eq(1)').show();
    } else if(idxReport == "2017") {
      $('.user-report tbody:eq(1)').hide();
      $('.user-report tbody:eq(0)').show();
    }
  });
  
  // 1706 수정 S 
    $('.userDetailWrap .likeBtnWrap a').on('click', function(){
        $(this).parent('li').addClass('on').siblings('li').removeClass('on');
    })
        
    $('.cmtWrap-list > li .likeBtnWrap a').on('click', function(){
        $(this).parent('li').addClass('on').siblings('li').removeClass('on');
    })
  // 1706 수정 E
});
 
$(window).load(function(){
//  $('#dummy').remove();
});