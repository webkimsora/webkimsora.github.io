(function(){

  var scrollSpy = new ScrollSpy($('.gnb-menu'), {
    isSticky:true
  });

  scrollSpy.init();

  $(window).scroll(function() {
    scrollSpy.onScroll();
  });

  // GNB
  $gnb = $('.gnb');

  $('.gnb-btn').on('click', function(){
    $gnb.toggleClass('open');
  });

  $('.gnb04-sub01').on('click', function(){
    $('.pages-wing').hide();
    $('.pages-class').show();    
  });

  $('.gnb04-sub02').on('click', function(){
    $('.pages-class').hide();    
    $('.pages-wing').show();
  });

  // 영상 배경 재생 및 팝업 영상 재생

  var App = window.App || {};
  App.movieID = "OEsKcb0VllA"

  $(document).ready(function(){
    $('#main-video-player').tubular({videoId: App.movieID}); // where idOfYourVideo is the YouTube ID.
  });


  $('.main-contents-btn-play').on('click', function(){
    player.pauseVideo();
    $('#popup-video iframe').attr('src', 'https://www.youtube.com/embed/'+App.movieID+'?version=3&amp;amp;controls=1&amp;amp;showinfo=0&amp;amp;modestbranding=1&amp;amp;wmode=transparent&amp;amp;rel=0&amp;amp;autoplay=1&amp;amp;html5=1&amp;amp;enablejsapi=1');
  })

  $('#popup-video .modal-btn-close').on('click', function(){
    $('#popup-video iframe').attr('src', '');
    player.playVideo();
  })

  //예약 검증

    // alertModal data index 
  var alertModal = function(index) {
    $('#popup-alert [data-alert-index]').hide();
    $('#popup-alert [data-alert-index=' + index + ']').show();

    mui.modal.open('popup-alert');
  };

    // alertModal data index 
  $('.frm-btn-reser').on('click', function(e){
    e.preventDefault();

    if(!mui.validate.radio("reser-os")){
      //alert("스토어를 선택해주세요");
      alertModal(0);
      return false;
    } else if (!mui.validate.input($('#frm-phone'))){
      //alert("정확한 휴대폰 번호를 입력하세요");     
      alertModal(1);
      return false;
    } else if (!mui.validate.input($('#frm-phone'),"tel")){
      //alert("정확한 휴대폰 번호를 입력하세요");  
      alertModal(9);
      return false;
    } else if (!mui.validate.checkbox($('#frm-chkbox'))){
      //alert("개인정보수집에 동의해주세요");
      alertModal(2);
      return false;
    }
     //alert("참여해주셔서 감사합니다");     
      alertModal(3);

    $('#alert-popup .btn-alert').on('click', function(){         
     mui.validate.init($('#reserFrm'), e );
    });    
     reserOk = true;

  });

  // 공유하기 팝업 검증

  $('.frm-btn-event').on('click', function(e){
    e.preventDefault();

    if (!mui.validate.input($('.form__textarea'))){
      //alert("SNS에 공유할 댓글을 입력해주세요");
      alertModal(11);
      return false;
    } else if(!mui.validate.radio("event-os")){
      //alert("스토어를 선택해주세요");
      alertModal(4);
      return false;
    } else if (!mui.validate.input($('#frm-event-phone'))){
      //alert("정확한 휴대폰 번호를 입력하세요");     
      alertModal(5);
      return false;
    } else if (!mui.validate.input($('#frm-event-phone'),"tel")){
      //alert("정확한 휴대폰 번호를 입력하세요");  
      alertModal(8);
      return false;
    } else if (!mui.validate.checkbox($('#frm-event-chkbox'))){
      //alert("개인정보수집에 동의해주세요");
      alertModal(6);
      return false;
    }
     //alert("참여해주셔서 감사합니다"); 
      alertModal(10);
    
     mui.validate.init($('#eventFrm'), e );
     reserOk = true;
  });


  // 웹드라마 시청

    var isAutoPlay = 0;

  $(document).ready(function(){
    $('.frame-play-contents .list').find('li').eq(0).find('button').trigger('click');
    isAutoPlay = 0;
  });

  $('.frame-play-contents [data-video]').on('click', function(){
    var videoID = $(this).data('video');
    var $_self = $(this);
    var $target ;

    $_self.closest('ul').find('button').removeClass('is-active');
    $_self.addClass('is-active');

    if ( $_self.closest('.frame-play-contents').hasClass('frame-play-contents') ){
      $target = $('#web-video-frame');
    }

    $('#web-video-frame').attr('src', 'https://www.youtube.com/embed/'+videoID+'?autoplay='+isAutoPlay+'&rel=0&amp;controls=1&amp;showinfo=0')
  });

  // event4 소개 페이지

   if ($('.pages-tab-class').hasClass('is-active')) {
      $('pages-wing').css('display', 'none');
    } else if($('.pages-tab-wing').hasClass('is-active')) {
      $('pages-tab').css('display', 'none');
    }

    // 탭전환
  $('.pages-class .pages-tab-wing').on('click', function(){
    $('.pages-class').hide();
    $('.pages-wing').show();
  });

  $('.pages-wing .pages-tab-class').on('click', function(){
    $('.pages-wing').hide();
    $('.pages-class').show();
  });


  // @ 클래스 이미지 클릭

  $('.class-tab a').on('click', function(){

    $('.class-tab a').removeClass('is-active');
    $(this).addClass('is-active');

    var index = ( $(this).closest('li').index() ) + 1;

    $('.class-text').attr('src', './images/class-text' +index+ '.png');
    $('.class-img').attr('src', './images/class-img' +index+ '.png');
  });

/*
  // 날개 owl 리스트
   $("#wing-list").owlCarousel({
    nav:true,
    items : 4
  });
 
  $('.link').on('click', function(event){
    var $this = $(this);
    if($this.hasClass('clicked')){
      $this.removeAttr('style').removeClass('clicked');
    } else{
      $this.css('background','#7fc242').addClass('clicked');
    }
  });
*/

  //날개 bxslider

  $('.bxslider').bxSlider({
    minSlides: 4,
    maxSlides: 4,
    slideWidth: 170,
    slideMargin: 10
  });

  // 날개 시청

  $(document).ready(function(){
    $('#wing-list').find('a').eq(0).trigger('click');
    isAutoPlay = 0;
  });

  $('#wing-list [data-video]').on('click', function(){
    var videoID = $(this).data('video');
    var $_self = $(this);
    var $target ;

    $_self.closest('div').find('a').removeClass('clicked');
    $_self.addClass('clicked');

    if ( $_self.closest('.pages-layout').hasClass('pages-layout') ){
      $target = $('#wing-video-frame');
    }

    $('#wing-video-frame').attr('src', 'https://www.youtube.com/embed/'+videoID+'?autoplay='+isAutoPlay+'&rel=0&amp;controls=1&amp;showinfo=0')
  });



}());