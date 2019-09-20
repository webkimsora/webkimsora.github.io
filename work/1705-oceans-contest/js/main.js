(function(){
// @ 티저 배경 영상
  var App = window.App || {};
  App.movieID = "wjB35MNnGrM"

  $(document).ready(function(){
    $('#teaser-video-player').tubular({
      videoId: App.movieID,
      repeat: true
    }); // where idOfYourVideo is the YouTube ID.
  });

// @ 스크롤
  $('.gnb li > a').on('click', function(){   
    var winSc = $(window).scrollTop();
    
		var idx = $(this).parent().index();
  
    $('html, body').stop().animate({
      scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
    return false;
  });  

  $(window).scroll(function(){
    var winHeight = $(document).scrollTop()

   $.each($('.page'), function(idx, item) {
      var $target = $('.page').eq(idx),
          i = $target.index()+1,
          targetTop = $target.offset().top;

      if(targetTop <= winHeight) {        
        if(winHeight < 950) {
          $('.gnb li').removeClass('is-active');
          $('.gnb li').eq(0).addClass('is-active');   
        } else {
          $('.gnb li').removeClass('is-active');
          $('.gnb li').eq(idx-1).addClass('is-active');   
        }
      }
    })
  });


// @ 영상 소개
  var isAutoPlay = 0;
  $(document).ready(function(){
    //$('.frame-play-contents .list').find('li').eq(0).find('button').trigger('click');
    //var firstVideo = $('.frame-play-contents .list').find('li').eq(0).find('button[data-video]')
    var firstVideo = 'MSgl032Vy9s'
    $('#web-video-frame').attr('src','https://www.youtube.com/embed/'+firstVideo+'?autoplay='+isAutoPlay+'&rel=0&amp;controls=1&amp;showinfo=0')
  });

  $('.frame-play-contents [data-video]').on('click', function(){
    var videoID = $(this).data('video');
    var $_self = $(this);
    var $target ;
    var isAutoPlay = 1

    $_self.closest('ul').find('button').removeClass('is-active');
    $_self.addClass('is-active');

    if ( $_self.closest('.frame-play-contents').hasClass('frame-play-contents') ){
      $target = $('#web-video-frame');
    }

    $('#web-video-frame').attr('src', 'https://www.youtube.com/embed/'+videoID+'?autoplay='+isAutoPlay+'&rel=0&amp;controls=1&amp;showinfo=0')
  });

  // @@ 영상 리스트 슬라이더
  var slider = $('#movie .list').bxSlider({
    infiniteLoop: false,
    pager: false,
    hideControlOnEnd : true,
    slideWidth : 230,
    minSlides : 2,
    maxSlides : 3,
    slideMargin: 15
  });


  /// 셀렉트 박스 ///  
  var selectTarget = $('.languageSel select');

  selectTarget.change(function(){
      var select_name = $(this).children('option:selected').text();
      $(this).siblings('label').text(select_name);
  });

  var selectTarget2 = $('.searchSel select');

  selectTarget2.change(function(){
      var select_name = $(this).children('option:selected').text();
      $(this).siblings('label').text(select_name);
  });

  // 데코  
  $(document).ready(function(){
    // 메인 유리
    $('.glassWrap').addClass('on');
    
    // 불꽃
  var $wrapper = $("body"),
    $snow = $wrapper.find("#snow")

  function snow(){
    TweenMax.set($snow, { perspective : 600 })
    //TweenMax.set("img", { xPercent : "-50%" , yPercent : "-50%" })

    var total = 60;
    var warp = document.getElementById("snow"),
      w = $('#viewport').width(),
      h = $('#main').height()/2;

    for (i=0; i<total; i++){
      var Div = document.createElement("div");
      TweenMax.set(Div, {
        attr : { "class" : "dot" },
        scale : ran(1,0.6),
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
        scale : ran(0.5,0.6),
        opacity : ran(0.6,0.1),
        y : -h,
        repeat: -1,
        ease : Linear.easeNone
      });
      TweenMax.to(elm, ran(10,20), {
        scale : ran(0.4,0.6),
        opacity : ran(0.1,0.6),
        x : '+=400',
        rotationZ : ran(-6000,6000),
        repeat : -1,
        yoyo : true,
        ease : Linear.easeNone
      });
      TweenMax.to(elm, ran(15,30), {
        delay : 0,
        opacity : ran(0.3,0.1),
        repeat : -1,
        yoyo : true,
        ease : Linear.easeNone
      });
     };


    function ran(min,max) {return min+Math.random()*(max-min)};
      var test =  ran(10,20)
      //console.log(test)
    };
   snow();
  })

  // 인기 출품작
  $(document).ready(function(){
    var bestList = $('.best .workListWrap li')

    bestList.eq('0').addClass('grade1')
    bestList.eq('1').addClass('grade2')
    bestList.eq('2').addClass('grade3')
  })

/////////////////////// 알럿창 ////////////////////////
$('.btn-likeFig').on('click', function(){
  alert('추천 되었습니다.')
})

/////////////////////// 팝업 /////////////////////////    
  // 사용자 영상 보기
  $('.workList [data-playData]').on('click', function(){
    var videoID = $(this).attr('data-playData');
    var $_self = $(this);
    var $target ;

    console.log(videoID)

    if ( $_self.closest('.workList').hasClass('workList') ){
      $target = $('.video-movie iframe');
    }

    mui.modal.open('popup-video')
    $('.video-movie iframe').attr('src', 'https://www.youtube.com/embed/'+videoID+'?autoplay=1&rel=0&amp;controls=1&amp;showinfo=0')
  });

   $('#popup-video .modal__close').on('click', function(){
    $('#popup-video iframe').attr('src', '');
  })

  // 작품 출품하기
  $('.app-notice').hover(function(){
    $('.app-noticeImg').show();
  }, function(){    
    $('.app-noticeImg').hide();
  });

  $('.btn-app').on('click', function(e){
      e.preventDefault();
  /*
      if (!mui.validate.input($('#app-title'))){
        alert("영상 제목을 입력해주세요");        
        //alertModal(3);
        return false;
      } else if (!mui.validate.input($('#app-explain'))){
        alert("영상 설명을 입력해주세요");        
        //alertModal(5);
        return false;
      } else if (!mui.validate.input($('#app-team'))){
        alert("팀명을 입력해주세요");        
        //alertModal(5);
        return false;
      } else if (!mui.validate.input($('#app-movie'))){
        alert("유튜브 URL을 입력해주세요");        
        //alertModal(5);
        return false;
      } else if (!mui.validate.input($('#collect-name'))){
        alert("성명을 입력해주세요");        
        //alertModal(5);
        return false;
      } else if (!mui.validate.input($('#collect-tel'))){
        alert("휴대폰 번호를 입력해주세요");        
        //alertModal(5);
        return false;
      } else if (!mui.validate.input($('#collect-tel'),"tel")){
        alert("정확한 휴대폰 번호를 입력해주세요");       
        //alertModal(4);
        return false;
      } else if (!mui.validate.input($('#collect-mail'))){
        alert("이메일을 입력해주세요");        
        //alertModal(5);
        return false;
      } else if (!mui.validate.checkbox($('#reser-chkbox'))){
        alert("개인정보수집에 동의해주세요"); 
        //alertModal(7);
        return false;
      }*/
       //mui.validate.init($('#frm-app'), e );
       mui.modal.open('modal-confirm');
    
  })

  // 출품 확인 팝업
  $('.btn-complete').on('click', function(){
    mui.modal.close('modal-confirm');
    mui.modal.close('modal-app')
    mui.validate.init($('#frm-app'));
    mui.modal.open('popup-complete');
  })
  $('.btn-modific').on('click', function(){
    mui.modal.close('modal-confirm');
  })

    // 공유하기
    $('.btn-shareTxt').on('click', function(){
      mui.modal.close('popup-shareTxt');
      mui.modal.open('popup-share');
    })

}());