var Page = (function() {
  var $root = $('#viewport'),
    $container = $('#viewport > .container'),
    $navigation = $('#viewport > .navigation');

  var
    $pages = [],
    $_self = null,
    $_tmp = null;

  var isTransited = false;
  var isLocked = false;

  var index = 0;
  var tmpOffsetX = 0;

  var
    endTransitCallback = null,
    endTransitTiming = 8000;

  var init = function() {
    setPages();
    Scene.intro().play().addCallback(function(){
        setTimeout(function(){
          if( !$('#intro').hasClass('is-clicked') ){
            $('.intro-door-bell').trigger('click');
          }
        }, 3000);
    
    });
  };

  var setPages = function() {
    $('> .section', $container).each(function(i, k) {
      $pages[i] = $(this);
      $pages[i].css('visibility', 'hidden');
    });
  };

  var goTo = function(DOMId) {
    isDetailOpened = false;
    if (isTransited || isLocked)
      return true;

    var goToDelayTime;

    $_tmp = $_self; //  현재 페이지 저장
    $_self = $(DOMId); // 다음 페이지 지정

    // goTo 이전 페이지가 null 이면 #home 을 향하게 해야한다.
    if ($_tmp === null) {
      $_tmp = $pages[0];
    }

    // 홈에서 페이지 이동할 때 애니메이션 깨짐 방지
    if ($_self.attr('id') === 'home')
      isLocked = true;

    // 홈에서 서브 페이지로 이동 할 때
    if ($_tmp.attr('id') === 'home' && $_self.attr('id') !== 'home') {
      goToDelayTime = 1.2;

      Scene.transit('home').play().addCallback(function() {
        Scene.bus('visible');
      });

      $('#viewport .walkthrough').hide();
    }
    // 서브에서 홈 페이지로 이동 할 때
    if ($_tmp.attr('id') !== 'home' && $_self.attr('id') === 'home') {
      var $everyPages = $('> .section', $container);

      goToDelayTime = 0.5;

      TweenLite.to($everyPages, goToDelayTime, {
        opacity: 0,
        onComplete: function() {
          $everyPages.css({
            opacity: 1,
            visibility: 'hidden'
          });

        }
      });

      setTimeout(function() {
        Scene.bus('invisible');
        $('#viewport .walkthrough').show();
      }, 200);
    }

    tmpOffsetX = $_self.position().left * -1;
    isTransited = true;

    // 5초 후 레이어 팝업 뜨는 setTimeout 클리어!
    clearTimeout(endTransitCallback);

    // 버스 움직임 표현
    if (getPageIndex($_tmp) < getPageIndex($_self)) {
      Scene.bus('next');
    } else {
      Scene.bus('prev');
    }
    
    TweenLite.to($container, 1.3, {
      left: tmpOffsetX,
      delay: goToDelayTime,
      onComplete: function() {
        isTransited = false;

        // HOME는 특별 관리!!
        if ($_self.attr('id') === "home") {
          setPages(); // 서브 페이지 초기화
          Scene.player('home').play().addCallback(function() {
            isLocked = false;
              // 애나메이션이 끝나고 자동으로 레이어 팝업이 떠야 함.
            if( isDetailOpened )
              return true;
            endTransitCallback = setTimeout(function() {
              $('#home [href="#event1"]').trigger('click');
            }, endTransitTiming);
          });

          $_self.css('visibility', 'visible');
        } else {
          $pages[0].css('visibility', 'hidden');
        }

        if ($_self.css('visibility') === 'hidden' && $_self.attr('id') !== "home") {
          $_self.css('visibility', 'visible');

          Scene.player($_self.attr('id')).play().addCallback(function() {
            // 애나메이션이 끝나고 자동으로 레이어 팝업이 떠야 함.
            endTransitCallback = setTimeout(function() {

              if( $_self.attr('id') === 'video' || $('#popup-'+$_self.attr('id')).css('display') === 'block' || isDetailOpened )
                return true;

              $('[href="#popup-'+$_self.attr('id')+'"]').trigger('click');
            }, endTransitTiming);
          });
        }

        // 10CM 축하공연 자동 재생 및 페이지 벗어날 시 재생 중지
        if ($_self.attr('id') === 'video' ) {
          isReadyPlayer = true;

          if(isReadyPlayer){
            // IE 텀 때문에 시간좀 줌!
            setTimeout(function(){tmpPlayer.playVideo();}, 500);
          }

        } else {

          if(isReadyPlayer){
            tmpPlayer.pauseVideo();
          }

        }
      }
    });

    setTimeout(function() {
      setNavigation();
      setButton();
    }, goToDelayTime * 1000);

  };

  // 하단 GNB 세팅
  var setNavigation = function() {
    $navigation.find('a').removeClass('is-active');
    $navigation.find('[href="#' + $_self.attr('id') + '"]').addClass('is-active');
  };

  // 좌우 페이지 전환버튼
  var setButton = function() {
    var side = getMySide($_self);

    var $buttonPrev = $('.pages-btn-prev', $root);
    var $buttonNext = $('.pages-btn-next', $root);

    var target = $_self.attr('id');

    if (!side.prev) {
      $buttonPrev.hide();
    } else {
      $buttonPrev.show();
    }

    if (!side.next) {
      $buttonNext.hide();
    } else {
      $buttonNext.show();
    }

    $buttonPrev
      .attr('href', '#' + side.prev)
      .find('i')
      .removeAttr('class')
      .addClass('sp-common nav-' + side.prev + '-prev');

    $buttonNext
      .attr('href', '#' + side.next)
      .find('i')
      .removeAttr('class')
      .addClass('sp-common nav-' + side.next + '-next');

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
    $.map($pages,function(obj, i) {
      if (($target.attr('id') === obj.attr('id')))
        index = i;
    });
    return index;
  };

  $(window).resize(function() {
    setTimeout(function() {
      goTo('#' + $_self.attr('id'));
    }, 500);
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
    isLocked: isLocked,
    setPages:setPages,
    goTo: goTo
  };
}());


var tmpPlayer = null;
var isReadyPlayer = false;

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  tmpPlayer = new YT.Player('video-10cm', {
    width: 523,
    height: 294,
    videoId: App.videoID,
    playerVars: {
      'autoplay': 0,
      'rel': 0,
      'wmode': 'transparent',
      'controls': 1,
      'showinfo': 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  isReadyPlayer = true;
  console.log(isReadyPlayer)
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED)
    event.target.playVideo();
  if (event.data == YT.PlayerState.PLAYING) {
    event.target.setPlaybackQuality('hd720');
  }
  if (event.data == YT.PlayerState.PAUSED){
    console.log('paused!!')
    event.target.seekTo(0, true);
  }
  

}


// 아이프레임 내부 클릭 시 자동 레이어 팝업이 뜨지 않도록 하기 위한 조치
var isDetailOpened = false;
function stop_pop(type){
  isDetailOpened = true;
}