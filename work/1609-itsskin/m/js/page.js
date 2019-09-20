var Page = (function() {
  var $root = $('#viewport'),
    $container = $('#viewport > .container'),
    $navigation = $('#viewport > .navigation'),
    $bus = $(' > .bus', $root);

  var
    $pages = [],
    $_self = null,
    $_tmp = null;

  var isTransited = false;


  var index = 0;
  var tmpOffsetX = 0,
        navOffset = [];

  var ww = 0;

  var
    endTransitCallback = null,
    endTransitTiming = 5000;

  var init = function() {
    setPages();
    resizeInterface();

    goTo('#home');
  };

  var setPages = function() {
    $('> .section', $container).each(function(i, k) {
      $pages[i] = $(this);
    });
    $('> .inner a', $navigation).each(function(i, k) {
      navOffset[i] = $(this).position().left;
    });
  };

  var goTo = function(DOMId) {
    if (isTransited)
      return true;

    $_tmp = $_self; //  현재 페이지 저장
    $_self = $(DOMId); // 다음 페이지 지정

    if ($_tmp === null) {
      $_tmp = $pages[0];
    }

    tmpOffsetX = $_self.position().left * -1;
    isTransited = true;

    var timeline = new TimelineMax({pause: true});

    // 3초 후 레이어 팝업 뜨는 setTimeout 클리어!
    //clearTimeout(endTransitCallback);
    //
    // 버스 움직임 표현
    if (getPageIndex($_tmp) < getPageIndex($_self)) {
      timeline
      .to($bus, 0.8, {x:20})
      .to($bus, 0.6, {x:0})
      .play();
    } else {
      timeline
      .to($bus, 0.8, {x:-30})
      .to($bus, 0.6, {x:0})
      .play();
    }

    tmpOffsetX = $_self.position().left * -1;

    TweenLite.to($container, 0.9, {
      left: tmpOffsetX,
      onComplete: function() {
        isTransited = false;

        /*
        모바일은 사용 안함
        // HOME는 특별 관리!!
        if( $_self.attr('id') === 'home'){
          // 애니메이션이 끝나고 자동으로 다음단계로!
          endTransitCallback = setTimeout(function() {
            $('[data-toggle="gnb"][href="#event1"]').trigger('click')
          }, endTransitTiming);
        } else {
         // 애니메이션이 끝나고 자동으로 레이어 팝업이 떠야 함.
          endTransitCallback = setTimeout(function() {
            if( $_self.attr('id') === 'itsskin' || $('#popup-'+$_self.attr('id')).css('display') === 'block' )
              return true;
              
            $('[href="#popup-'+$_self.attr('id')+'"]').trigger('click');
          }, endTransitTiming);
        }
        */
        setButton();
      }
    });
    setNavigation();

  };

  // 하단 GNB 세팅
  var setNavigation = function() {
    var $target = $navigation.find('[href="#' + $_self.attr('id') + '"]');
    var tmpIndex = $('> .inner a', $navigation).index($('[href="#' + $_self.attr('id') + '"]'));

    $navigation.find('a').removeClass('is-active');
    $target.addClass('is-active');

    TweenLite.to($(' > .inner', $navigation), 0.3, {
      scrollTo:{x: navOffset[tmpIndex] - ww/2 + $target.innerWidth() / 2
      }
    });
  };

  // 좌우 페이지 전환버튼
  var setButton = function() {
    var side = getMySide($_self);

    var $buttonPrev = $('.pages-btn-prev', $root);
    var $buttonNext = $('.pages-btn-next', $root);

    var target = $_self.attr('id');

    if (!side.prev) {
      $buttonPrev.hide();
      $buttonNext.addClass('is-blink');
    } else {
      $buttonPrev.show();
      $buttonNext.removeClass('is-blink');
    }

    if (!side.next) {
      $buttonNext.hide();
      $buttonPrev.addClass('is-blink');
    } else {
      $buttonNext.show();
      $buttonPrev.removeClass('is-blink');
    }

    $buttonPrev.attr('href', '#' + side.prev);
    $buttonNext.attr('href', '#' + side.next);
  };

  var getMySide = function($target) {
    return {
      prev: ($target.prev().length === 0) ? false : $_self.prev().attr('id'),
      next: ($target.next().length === 0) ? false : $_self.next().attr('id')
    };
  };

  var getPageIndex = function($target) {
    var index = 0;
    // 페이지를 순환하면서 조건에 맞는 인덱스 값이 나올 경우 반환!
    $pages.map(function(obj, i) {
      if (($target.attr('id') === obj.attr('id')))
        index = i;
    });
    return index;
  };

  var resizeInterface = function() {
    ww = $(window).innerWidth();
    
    $container.css('width', ww * 6);
    $('> .section', $container).css('width', ww);
  };

  $(window).resize(function() {
    setTimeout(function() {
      goTo('#' + $_self.attr('id'));
    }, 500);

    resizeInterface();
  });


  $('#viewport').on('DOMMouseScroll mousewheel wheel', function(e) {
    var side = getMySide($_self);

    if (e.deltaY === -1 && side.next) {
      goTo('#' + side.next);
    } else if (e.deltaY === 1 && side.prev) {
      goTo('#' + side.prev);
    }

    return true;
  });

  return {
    init: init,
    goTo: goTo
  };
}());

// 파이어폭스 아이프레임 로딩안되는 현상 개선

// 안드로이드 파이어폭스 예외처리
$(window).load(function(){
  if( isAndroidFF ){

    $('html').addClass('is-loaded');
    
    $('#popup-event2-insta').removeAttr('style');
    $('#tag1, #tag2, #tag3, #tag4, #tag5, #tag6, #tag7').hide();
  }
});

$('[href="popup-event2-insta"]').on('click', function(){
  if (isAndroidFF){
    setTimeout(function(){
      $('#tag1, #tag2, #tag3, #tag4, #tag5, #tag6, #tag7').hide();
      $('#popup-event2-insta').removeAttr('is-opened');
    }, 1000);
  }
});

if( !isAndroidFF ){
  $('#popup-event2-insta').removeAttr('style');    
  $('#tag1, #tag2, #tag3, #tag4, #tag5, #tag6, #tag7').hide();
}
