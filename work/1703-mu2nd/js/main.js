(function(){
  var i = 0;
  // @ 화면
  $(document).ready(function(){
    $('.section').eq(0).addClass('on');
    $('.gnb-list a').eq(0).addClass('is-active');
    $('input, textarea').placeholder();
    
    
  window.onhashchange = function(){
    // 해시태그
     var hname = window.location.hash;
     hLocation = hname.replace("#", "$(#viewport).html(hanme)")

     if(hname  =="#main"){
      $('.gnb-list a').eq(0).trigger('click');
    }else if(hname  =="#update"){
      $('.gnb-list a').eq(1).trigger('click');
    } else if(hname  =="#event"){
      $('.gnb-list a').eq(2).trigger('click');
    } else if(hname  =="#trace"){
      $('.gnb-list a').eq(3).trigger('click');
    } else if(hname  =="#celebrate"){
      $('.gnb-list a').eq(4).trigger('click');
    }  
  }

  });

  // @ GNB
  $('.gnb-list a').on('click', function(){
    var idxGnb = $(this).index()

    $('.gnb-list a').removeClass();
    $(this).addClass('is-active');
    $('.section').eq(idxGnb).fadeIn(0).siblings('.section').fadeOut(0);
    setTimeout(function(){
     $('.section').eq(idxGnb).addClass('on').siblings('.section').removeClass('on');
    },10)    
  });    
    
/*  //마우스 휠 스크롤
  var win_h = $(window).height();

  $('body').mousewheel(function(event, delta) {
    var idx = $('.section.on').index('.section')
      nowHeight = $('.section').eq(idx).outerHeight()
      nowScroll = $('#viewport').scrollTop()
    var sct =$(window).scrollTop();
    var docHeight  = $(document).innerHeight(); //962문서값 
     scbBig = 	docHeight == nowHeight - nowScroll
    var scbSmall = 	$(window).scrollTop() == $(document).height() - $(window).height()

    if(delta >= 0 && sct < 2 ) { // UP 
      $('.gnb-list a.is-active').prev().trigger('click');
    } else if(delta < 0 && scbSmall ) { // DOWN     
      $('.gnb-list a.is-active').next().trigger('click');
    }
  });  */

  // 상단 이동
  $.fn.scrollEnd = function(callback, timeout) {
    $(this).scroll(function() {
      var $this = $(this);

      if ($this.data('scrollTimeout'))
        clearTimeout($this.data('scrollTimeout'));

      $this.data('scrollTimeout', setTimeout(callback, timeout));
    });
  };

  $(window).scrollEnd(function() {
    $('.btnTop').fadeOut();      
  }, 1000);
    
  $('.btnTop').on('click', function(e){
    e.preventDefault();
    //var goTop = $('#viewport').scrollTop(0);    
    $('html, body').stop().animate({scrollTop : "0"},500);
    return false;
  });

  $(window).scroll(function(){
    if($(this).scrollTop() > 100) {
      $('.btnTop').fadeIn();
    } else {
      $('.btnTop').fadeOut();
    }
  });
   
  // 메인 자세히보기
  $('.main-title').on('click', function(){
    mui.modal.open('popup-video');
    $('#popup-video iframe').attr('src', 'https://www.youtube.com/embed/'+videoArr[4]+'?version=3&amp;controls=1&amp;showinfo=0&amp;modestbranding=1&amp;wmode=transparent&amp;rel=0&amp;autoplay=1&amp;html5=1&amp;enablejsapi=1');
  });
  $('.main-list-update').on('click', function(){
    $('.gnb-list a').eq(1).trigger('click');
  });  
  $('.main-list-event').on('click', function(){
    $('.gnb-list a').eq(2).trigger('click');
  });  
  $('.main-list-trace').on('click', function(){
    $('.gnb-list a').eq(3).trigger('click');
  });

  // @ 업데이트 bxslider
  var slider = $('.update-shot').bxSlider({
    infiniteLoop: false,
    hideControlOnEnd : true,
    pagerCustom: '.update-tab'
  });

  // @ 발자취 동영상
    //영상 순서 123894765
  var videoArr = ['4_igat0yyok','py9cFs1djqI','z_NXu2iN3XM','L6HKxj_bUsc','FA5ZUw0Lt2g','ZnY478ojg14','i9SkMrOlsBk','B8Nzwn2oEBw','GE51fSuE7n0']
  //var indexVideo;

  $('.trace-list li').on('click', function(){
    var Idx = $(this).index()
    var movieID = videoArr[Idx];
    //indexVideo = Idx;
    
    $('.gnb').css('top','0');
    mui.modal.open('popup-video');
    $('#popup-video iframe').attr('src', 'https://www.youtube.com/embed/'+movieID+'?version=3&amp;controls=1&amp;showinfo=0&amp;modestbranding=1&amp;wmode=transparent&amp;rel=0&amp;autoplay=1&amp;html5=1&amp;enablejsapi=1');
  });  
  $('#popup-video .modal__close').on('click', function(){
    $('#popup-video iframe').attr('src', '');
  })
    // 마지막 영상 (2주년 기념 군단 업데이트)
  $('.trace-list li').bind("mouseenter mouseleave", function(){
    $(this).find('a').toggleClass('is-active') 
  });
  $('.btn-trace5').bind("mouseenter mouseleave", function(){
    $('.trace-list li').eq(4).find('a').toggleClass('is-active')      
  });
  /*$('.btn-trace5').mouseover(function() {
    $('.trace-list li').eq(4).find('a').addClass('is-active')
  }).mouseout(function(){
    $('.trace-list li').eq(4).find('a').removeClass('is-active')    
  });*/

  $('.btn-trace5').on('click', function(){
    mui.modal.open('popup-video');
    $('#popup-video iframe').attr('src', 'https://www.youtube.com/embed/'+videoArr[4]+'?version=3&amp;controls=1&amp;showinfo=0&amp;modestbranding=1&amp;wmode=transparent&amp;rel=0&amp;autoplay=1&amp;html5=1&amp;enablejsapi=1');
  });

  // @공유하기 팝업
  $('.btn-share').on('click', function(){
    $('.gnb').css('top','0');
  })
    // alertModal data index 
  var alertModal = function(index) {
    $('#alert-modal [data-alert-index]').hide();
    $('#alert-modal [data-alert-index=' + index + ']').show();
    mui.modal.open('alert-modal');
  };
  // 공유클릭먼저 (개발시 삭제)
  var $shareEvent = false;
  $('.shareWrap-list a').on('click', function(){
    $('.shareWrap-list li').removeClass('is-active');
    $(this).closest('li').addClass('is-active');
    $shareEvent = true;
  })
  // 이벤트 참여
  $('.btn-complete').on('click', function(e){
    e.preventDefault();
    if(document.getElementById('message').value === ''){
      //alert('축하 메세지를 입력해주세요')
      alertModal(5);
      return false;
    } else if($shareEvent == false) { 
      // alert("SNS 선택 해주세요")
      alertModal(4);
      return false;      
    } else if (!mui.validate.input($('#reser-number'))){
      //alert("정확한 휴대폰 번호를 입력하세요");        
      alertModal(0);
      return false;
    } else if (!mui.validate.input($('#reser-number'),"tel")){
      //alert("정확한 휴대폰 번호를 입력하세요");       
      alertModal(2);
      return false;
    } else if (!mui.validate.checkbox($('#reser-chkbox'))){
      //alert("개인정보수집에 동의해주세요"); 
      alertModal(1);
      return false;
    } else if (!mui.validate.checkbox($('#trust-chkbox'))){
      //alert("개인정보수집에 동의해주세요"); 
      alertModal(1);
      return false;
    }
     //alert("참여완료 정보 확인");     
     mui.modal.open('popup-complete')
  
     mui.validate.init($('#frm-reser'), e );
     reserOk = true;
  });


  $(window).load(function(){

  
  // 폭죽  
  var $wrapper = $("body"),
    $snow = $wrapper.find("#snow")

  function snow(){
    // 변수 지정 필요할때 여기에 넣고 하단 TweenMax에 지정한 변수 입력
    TweenMax.set($snow, { perspective : 600 })
    //TweenMax.set("img", { xPercent : "-50%" , yPercent : "-50%" })

    var total = 60;
    var warp = document.getElementById("snow"),
      w = $('#viewport').width(),
      h = $('.container.on').height();

    for (i=0; i<total; i++){
      var Div = document.createElement("div");
      TweenMax.set(Div, {
        attr : { "class" : "dot" },
        scale : ran(0.8,0.9),
        rotation : 0,
        x : ran(0,w),
        y : -176,
        z : ran(0,100)
      });
      warp.appendChild(Div);
      animm(Div);       
    };

    function animm(elm){
      TweenMax.to(elm, ran(5,15), {
        delay : ran(-4,8),
        scale : ran(1,0.9),
        opacity : ran(0.6,0.1),
        y : h,
        repeat: -1,
        ease : Linear.easeNone
      });
      TweenMax.to(elm, ran(10,20), {
        scale : ran(0.9,0.9),
        opacity : ran(0.1,0.6),
        x : '+=400',
        rotationZ : ran(-6000,6000),
        repeat : -1,
        yoyo : true,
        ease : Linear.easeNone
      });
      TweenMax.to(elm, ran(15,30), {
        delay : 0,
        opacity : ran(0.1,0.6),
        repeat : -1,
        yoyo : true,
        ease : Linear.easeNone
      });
     };

    function ran(min,max) {return min+Math.random()*(max-min)};
      var test =  ran(10,20)
      console.log(test)
    };
   snow();

  })

    

}());
