var Scene = (function() {

  var cssSet = {
    underPane: {
      rotationX: 90,
      scaleY: 0,
      transformPerspective: 100,
      transformOrigin: "center bottom"
    },
    overPane: {
      rotationX: 0,
      scaleY: 1
    },
    fadeOut: {
      opacity: 0
    },
    fadeIn: {
      opacity: 1
    }
  }

  // 인트로 페이지
  function intro() {
    var $parent = $('#intro'),
      $door = $('.intro-door', $parent),
      $doorplate = $('.intro-img-doorplate', $parent),
      $bigbird = $('.intro-img-bigbird', $parent),
      $elmo = $('.intro-img-elmo', $parent),
      $balloon = $('.intro-img-balloon', $parent);

    var timeline = new TimelineMax({ paused: true });
    new TimelineMax({ repeat: -1, yoyo: true }).fromTo($doorplate, 1, { rotationZ: 0 }, { rotationZ: 10 });

    TweenLite.set($door, { rotationX: 90, scaleY: 0, transformPerspective: 200, transformOrigin: "center bottom" });
    TweenLite.set($doorplate, { opacity: 0, transformOrigin: 'center top' });
    TweenLite.set($bigbird, { opacity: 0, left: '23%' });
    TweenLite.set($elmo, { opacity: 0, left: '23%' });
    TweenLite.set($balloon, { scale: 0, transformOrigin: "left 20%" });

    timeline
      .add(TweenLite.to($door, .4, { rotationX: 0, scaleY: 1 }))
      .add(TweenLite.to($doorplate, .4, { opacity: 1, delay: 0.1 }))
      .add(TweenLite.to($bigbird, .3, { opacity: 1, left: '1%' }))
      .add(TweenLite.to($elmo, .3, { opacity: 1, left: '8%' }))
      .add(TweenLite.to($balloon, .3, { scale: 1 }));

    $parent.addClass('is-shown');

    return timeline;
  }

  function home() {
    App.setVerticalMiddle();
    
    var $parent = $('#home'),
      $door = $('.home-img-door', $parent),
      $title = $('.home-img-title', $parent),
      $start = $('.home-started', $parent),
      $bus = $('.bus', $parent);

    var timeline = new TimelineMax({ paused: true });
    var busTimeline = new TimelineMax({ paused: true });

    TweenLite.set($door, { opacity: 0 });
    TweenLite.set($title, { scale: 0, transformOrigin: 'center' });
    TweenLite.set($start, { opacity: 0, y: -20 });
    TweenLite.set($bus, { opacity: 0, x: -20 });

    timeline
      .add(TweenLite.to($door, 0.5, { opacity: 1 }))
      .add(TweenLite.to($title, 0.2, { scale: 1 }))
      .add(TweenLite.to($start, 0.3, { opacity: 1, y: 0, delay: 0.1 }))
      .add(TweenLite.to($bus, 0.4, { opacity: 1, x: 0 }));

    $parent.addClass('is-shown');

    return timeline;
  };

  function event1() {
    var $parent = $('#event1'),
      $building = $('.event1-building', $parent),
      $streetlight = $('.event1-img-streetlight', $parent),
      $magnifier = $('.event1-img-magnifier', $parent),
      $product = $('.event1-img-product', $parent),
      $grassBackRight = $('.event1-img-grass-back-right', $parent),
      $grassBackLeft = $('.event1-img-grass-back-left', $parent),
      $grassFront = $('.event1-img-grass-front', $parent),
      $qrCode = $('.event1-qrcode', $parent),
      $balloon = $('.event1-balloon', $parent);

    var timeline = new TimelineMax({ paused: true });

    TweenLite.set([$building, $streetlight, $qrCode], cssSet.underPane);
    TweenLite.set([$grassFront, $grassBackLeft, $grassBackRight, $product], cssSet.fadeOut);
    TweenLite.set($magnifier, { x: -200, opacity: 0 })
    TweenLite.set($balloon, { height: 0 })

    timeline
      .to($building, 0.3, cssSet.overPane)
      .to($streetlight, 0.3, cssSet.overPane)
      .to($grassBackRight, 0.2, cssSet.fadeIn)
      .to($grassBackLeft, 0.2, cssSet.fadeIn)
      .to($product, 0.2, cssSet.fadeIn)
      .to($grassFront, 0.2, cssSet.fadeIn)
      .to($qrCode, 0.3, cssSet.overPane)
      .to($magnifier, 0.2, { x: 0, opacity: 1 })
      .to($balloon, 0.5, { height: '100%' })
      .addCallback(function() {
        $parent.addClass('is-animated');
      });

    $parent.addClass('is-shown');

    return timeline;
  };

  function event2() {
    var $parent = $('#event2'),
      $preview = $('.event2-preview', $parent),
      $oscar = $('.event2-img-oscar', $parent),
      $elmo = $('.event2-img-elmo', $parent),
      $signpost = $('.event2-signpost', $parent);

    var timeline = new TimelineMax({ paused: true });

    TweenLite.set([$preview, $signpost], cssSet.underPane);
    TweenLite.set([$oscar, $elmo], cssSet.fadeOut);
    TweenLite.set($oscar, { x: 100 });
    TweenLite.set($elmo, { x: -100 });

    timeline
      .to($preview, 0.4, cssSet.overPane)
      .to([$oscar, $elmo], 0.4, { x: 0, opacity: 1 })
      .to($signpost, 0.2, cssSet.overPane);

    return timeline
  };

  function itsskin() {
    var $parent = $('#itsskin'),
      $shelf = $('.itsskin-shelf', $parent),
      $bigbird = $('.itsskin-img-bigbird', $parent),
      $cookie = $('.itsskin-img-cookie', $parent),
      $elmo = $('.itsskin-img-elmo', $parent),
      $pot = $('.itsskin-img-pot', $parent),
      $shelfCircle = $('.itsskin-shelf-circle');

    TweenLite.set($shelf, cssSet.underPane);
    TweenLite.set([$pot, $bigbird, $cookie, $elmo], cssSet.fadeOut);
    TweenLite.set($shelfCircle, { scale: 0, transformOrigin: 'right top' });

    var timeline = new TimelineMax({ paused: true });

    timeline
      .to($shelf, 0.3, cssSet.overPane)
      .to($pot, 0.3, cssSet.fadeIn)
      .to([$bigbird, $cookie], 0.3, cssSet.fadeIn)
      .to($elmo, 0.3, cssSet.fadeIn)
      .to($shelfCircle, 0.1, { scale: 1 });

    return timeline;
  }

  function stagram() {
    var $parent = $('#stagram'),
      $cont = $('.stagram-cont', $parent),
      $grassRight = $('.stagram-img-grass-right', $parent),
      $grassLeft = $('.stagram-img-grass-left', $parent),
      $grassFront = $('.stagram-img-grass-front', $parent),
      $elmo = $('.stagram-img-elmo', $parent),
      $grover = $('.stagram-img-grover', $parent),
      $starLeft = $('.stagram-img-star-small-left', $parent),
      $starRight = $('.stagram-img-star-small-right', $parent),
      $star = $('.stagram-star', $parent);

    var timeline = new TimelineMax({ pause: true });

    TweenLite.set($cont, cssSet.underPane);
    TweenLite.set([$grassRight, $grassLeft, $grassFront, $grover, $elmo], cssSet.fadeOut);
    TweenLite.set([$star, $starLeft, $starRight], { opacity: 0, y: 20 });

    timeline
      .to($cont, 0.3, cssSet.overPane)
      .to([$grassRight, $grassLeft, $grassFront], 0.2, cssSet.fadeIn)
      .to($elmo, 0.2, cssSet.fadeIn)
      .to($grover, 0.2, cssSet.fadeIn)
      .to($starLeft, 0.2, { opacity: 1, y: 0 })
      .to($starRight, 0.2, { opacity: 1, y: 0 })
      .to($star, 0.2, { opacity: 1, y: 0 })
      .addCallback(function() {
        $parent.addClass('is-animated');
      });

    return timeline;
  }

  function video() {
    var $parent = $('#video'),
      $cinema = $('.video-cinema', $parent),
      $grass = $('.video-img-grass', $parent),
      $10cmLeft = $('.video-img-10cm-left', $parent),
      $10cmRight = $('.video-img-10cm-right', $parent),
      $cloud = $('.video-img-cloud', $parent),
      $zoe = $('.video-img-zoe', $parent),
      $elmo = $('.video-img-elmo', $parent),
      $grassFront = $('.video-img-grass-front'),
      $share = $('.video-share');

    var timeline = new TimelineMax({ pause: true });

    TweenLite.set($cinema, cssSet.underPane);
    TweenLite.set([$grass, $grassFront, $elmo, $share], cssSet.fadeOut);
    TweenLite.set($zoe, { x: 10, y: -10, opacity: 0 });
    TweenLite.set($10cmLeft, { x: 50, opacity: 0 });
    TweenLite.set($cloud, { scale: 0, transformOrigin: 'left bottom' });
    TweenLite.set($10cmRight, { x: -50, opacity: 0 });

    timeline
      .to($cinema, 0.3, cssSet.overPane)
      .to([$grass], 0.2, cssSet.fadeIn)
      .to([$10cmLeft, $10cmRight, ], 0.3, { x: 0, opacity: 1 })
      .to($grassFront, 0.2, cssSet.fadeIn)
      .to($zoe, 0.3, { x: 0, y: 0, opacity: 1 })
      .to($elmo, 0.3, cssSet.fadeIn)
      .to($cloud, 0.2, { scale: 1 })
      .to($share, 0.3, cssSet.fadeIn);

    return timeline;
  }

  function player(next){
    var timeline = null;
    switch (next){
      case 'intro':
        timeline = intro();
      break;
      case 'home':
        timeline = home();
      break;
      case 'event1':
        timeline = event1();
      break;
      case 'event2':
        timeline = event2();
      break;
      case 'itsskin':
        timeline = itsskin();
      break;
      case 'stagram':
        timeline = stagram();
      break;
      case 'video':
        timeline = video();
      break;

      default:
      break;
    }

    return timeline;
  }

  function transit(page) {
    var $intro = $('#intro');
    var $home = $('#home');

    var timeline = new TimelineMax({ paused: true });

    if (page === 'home') {
      $('.walkthrough').fadeOut();
    } else {
      $('.walkthrough').fadeIn();
    }

    switch (page) {
      // 인트로
      case 'intro':
        $intro.addClass('is-clicked');

        TweenLite.set($('.intro-door-inner', $intro), { transformPerspective: 600, transformOrigin: 'left center' });

        timeline
          .add(TweenLite.to($('.intro-door-inner', $intro), 0.2, { rotationY: 45 }))
          .add(TweenLite.to($('.intro-door', $intro), 0.3, { opacity: 0 }))
          .addCallback(function() {
            $('.pages').hide();
            $('.pages#viewport').fadeIn(function() {
              $(this).addClass('is-loaded');
            });
          });
        break;
      case 'home':
        timeline
          .add(TweenLite.to($('.home-img-door, .home-img-title, .home-started'), 0.2, { opacity: 0 }))
          .add(TweenLite.to($('.bus', $home), 2, { x: 2000 }));

        break;

      default:
        break;
    }

    return timeline;
  }

  return {
    intro: intro,
    player: player,
    transit: transit
  }
}());

var Page = (function(){
  var $root = $('#viewport'),
    $container = $('#viewport > .container'),
    $navigation = $('#viewport > .navigation');

  var 
    $pages = [],
    $_self = null;

  var isTransited = false;

  var index = 0;
  var tmpOffsetX = 0;

  var init = function() {
    setPages();
    goTo('#home');
  }

  var setPages = function() {
    $('> .section', $container).each(function(i, k) {
      $pages[i] = $(this);
      $pages[i].css('visibility','hidden');
    });
  };

  var goTo = function(DOMId) {
    if (isTransited)
      return true;

    $_self = $(DOMId);
    tmpOffsetX = $_self.position().left * -1;
    
    isTransited = true;

    setButton();
    setNavigation();

    TweenLite.to($container, .8, {
      left: tmpOffsetX,
      onComplete: function() {
        isTransited = false;

        // HOME는 특별 관리!!
        if( $_self.attr('id') === "home" ){
          $_self.css('visibility', 'visible');
          Scene.player('home').play();
        } else {
          $pages[0].css('visibility', 'hidden');
        }

        if( $_self.css('visibility') === 'hidden' && $_self.attr('id') !== "home" ){
          $_self.css('visibility', 'visible');
          Scene.player($_self.attr('id')).play();
        }

      }
    });
  };

  // 하단 GNB 세팅
  var setNavigation = function(){
    $navigation.find('a').removeClass('is-active');
    $navigation.find('[href="#'+$_self.attr('id')+'"]').addClass('is-active');
  };

  // 좌우 페이지 전환버튼
  var setButton = function() {
    var side = getMySide();

    var $buttonPrev = $('.pages-btn-prev', $root);
    var $buttonNext = $('.pages-btn-next', $root);

    var target = $_self.attr('id')

    if( !side.prev ){
      $buttonPrev.hide();
    } else {
      $buttonPrev.show();
    }

    if( !side.next ){
      $buttonNext.hide();
    } else {
      $buttonNext.show();
    }

    $buttonPrev
    .attr('href', '#'+side.prev)
    .find('i')
    .removeAttr('class')
    .addClass('sp-common nav-'+side.prev+'-prev');
    $buttonNext
    .attr('href', '#'+side.next)
    .find('i')
    .removeAttr('class')
    .addClass('sp-common nav-'+side.next+'-next');

  };

  var getMySide = function(){
    return{
      prev: ($_self.prev().length === 0)? false : $_self.prev().attr('id'),
      next: ($_self.next().length === 0)? false : $_self.next().attr('id')
    }
  }

  return {
    init: init,
    goTo: goTo
  }
}());
var App = (function() {
  var ww,
    wh;

  var init = function() {
    resizeInterface();

  };

  var setViewport = function() {
    var $parent = $('#viewport .container');

    $parent.css('width', ww * 6);
    $('> .section', $parent).css('width', ww);
  };

  var setVerticalMiddle = function() {
    var $target = $('#viewport .section > .inner');

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
    setVerticalMiddle: setVerticalMiddle
  }
}());

;(function() {
  App.init();
  
  $('[data-toggle="gnb"]').on('click', function(e){
    e.preventDefault();
    
    Page.goTo($(this).attr('href'));
  })

}());
