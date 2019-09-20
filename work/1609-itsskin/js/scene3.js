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
  };

  // 인트로 페이지
  function intro() {
    var $parent = $('#intro'),
      $door = $('.intro-door', $parent),
      $doorplate = $('.intro-img-doorplate', $parent),
      $bigbird = $('.intro-img-bigbird', $parent),
      $elmo = $('.intro-img-elmo', $parent),
      $grover = $('.intro-img-grover', $parent),
      $balloon = $('.intro-img-balloon', $parent);

    var timeline = new TimelineMax({ paused: true });
    new TimelineMax({ repeat: -1, yoyo: true }).fromTo($doorplate, 1, { rotationZ: 0 }, { rotationZ: 10 });

    TweenLite.set($door, { rotationX: 90, scaleY: 0, transformPerspective: 200, transformOrigin: "center bottom" });
    TweenLite.set($doorplate, { opacity: 0, transformOrigin: 'center top' });
    TweenLite.set([$elmo, $grover, $bigbird], { opacity: 0, left: '23%' });
    TweenLite.set($balloon, { scale: 0, transformOrigin: "left 20%" });

    timeline
      .add(TweenLite.to($door, 0.4, { rotationX: 0, scaleY: 1 }))
      .add(TweenLite.to($doorplate, 0.4, { opacity: 1, delay: 0.1 }))
      .add(TweenLite.to($bigbird, 0.2, { opacity: 1, left: '1%' }))
      .add(TweenLite.to($grover, 0.2, { opacity: 1, left: 0 }))
      .add(TweenLite.to($elmo, 0.2, { opacity: 1, left: '8%' }))
      .add(TweenLite.to($balloon, 0.3, { scale: 1 }));

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

    var timeline = new TimelineMax({ paused: true, delay: 0.2 });
    var busTimeline = new TimelineMax({ paused: true });

    TweenLite.set($door, { opacity: 0 });
    TweenLite.set($title, { scale: 0, opacity:1, transformOrigin: 'center' });
    TweenLite.set($start, { opacity: 0, y: -20 });
    TweenLite.set($bus, { opacity: 0, x: -824 });

    timeline
      .add(TweenLite.to($door, 0.5, { opacity: 1 }))
      .add(TweenLite.to($title, 0.2, { scale: 1 }))
      .add(TweenLite.to($start, 0.3, { opacity: 1, y: 0, delay: 0.1 }))
      .add(TweenLite.to($bus, 1, { opacity: 1, x: 0 }));

    $parent.addClass('is-shown');

    return timeline;
  }

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
    TweenLite.set($magnifier, { x: -200, opacity: 0 });
    TweenLite.set($balloon, { height: 0 });

    timeline
      .to($building, 0.5, cssSet.overPane)
      .to($streetlight, 0.4, cssSet.overPane, 0.3)
      .to( [$grassBackRight,$grassBackLeft,$grassFront,$product], 0.2, cssSet.fadeIn)
      .to($qrCode, 0.4, cssSet.overPane)
      .to($magnifier, 0.3, { x: 0, opacity: 1 }, 1)
      .to($balloon, 0.5, { height: '100%' })
      .addCallback(function() {
        $parent.addClass('is-animated');
      });

    $parent.addClass('is-shown');

    return timeline;
  }

  function event2() {
    var $parent = $('#event2'),
      $preview = $('.event2-preview', $parent),
      $giftbox = $('.event2-img-giftbox', $parent),
      $elmo = $('.event2-img-elmo', $parent),
      $signpost = $('.event2-signpost', $parent);

    var timeline = new TimelineMax({ paused: true });

    TweenLite.set([$preview, $signpost], cssSet.underPane);
    TweenLite.set([$giftbox, $elmo], cssSet.fadeOut);
    TweenLite.set($giftbox, { x: 100 });
    TweenLite.set($elmo, { x: -100 });

    timeline
      .to($preview, 0.6, cssSet.overPane)
      .to([$giftbox, $elmo], 0.4, { x: 0, opacity: 1 })
      .to($signpost, 0.3, cssSet.overPane);

    return timeline;
  }

  function itsskin() {
    var $parent = $('#itsskin'),
      $bus = $('.itsskin-bus', $parent),
      $grassLeft = $('.itsskin-img-grass-left', $parent),
      $grassRight = $('.itsskin-img-grass-right', $parent),
      $button = $('.itsskin-btn-detail', $parent);

    TweenLite.set($bus, cssSet.underPane);
    TweenLite.set([$grassLeft, $grassRight], cssSet.fadeOut);
    TweenLite.set($button, cssSet.underPane);

    var timeline = new TimelineMax({ paused: true });

    timeline
      .to($bus, 0.6, cssSet.overPane)
      .to([$grassLeft, $grassRight], 0.4, cssSet.fadeIn)
      .to($button, 0.4, cssSet.overPane);

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
      .to($cont, 0.6, cssSet.overPane)
      .to([$grassRight, $grassLeft, $grassFront], 0.4, cssSet.fadeIn)
      .to([$grover, $elmo], 0.4, cssSet.fadeIn)
      .to( [$starLeft,$starRight] , 0.4, { opacity: 1, y: 0 })
      .to($star, 0.5, { opacity: 1, y: 0 })
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
      .to($cinema, 0.6, cssSet.overPane)
      .to([$grass, $grassFront], 0.4, cssSet.fadeIn)
      .to([$10cmLeft, $10cmRight, ], 0.5, { x: 0, opacity: 1 })
      .to([$zoe,$elmo,], 0.5, { x: 0, y: 0, opacity: 1 })
      .to($cloud, 0.4, { scale: 1 })
      .to($share, 0.4, cssSet.fadeIn, 1);

    return timeline;
  }

  function bus(type){
    var $bus = $('#viewport > .bus');
    var timeline = new TimelineMax({pause: true});

    if(type === 'visible'){
      TweenLite.fromTo($bus, 1, {left:'-50%', opacity:0, zIndex:50}, {left:'38%', opacity:1});
    } else if ( type === 'invisible' ){
      TweenLite.fromTo($bus, 1, {left:'50%', opacity:1}, {left:'-100%', opacity:0, zIndex:50});
    } else if ( type === 'next' ){      
      timeline
      //.to($bus, 0.2, {left:'49%'})
      .to($bus, 1.3, {left:'43%'})
      .to($bus, 0.9, {left:'38%'})
      .play();
    } else if ( type === 'prev' ){      
      timeline
      .to($bus, 1.3, {left:'36%'})
      .to($bus, 0.9, {left:'38%'})
      .play();
    }
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
      $('#viewport .walkthrough').fadeOut();
    } else {
      $('#viewport .walkthrough').fadeIn();
    }

    switch (page) {
      // 인트로
      case 'intro':
        $intro.addClass('is-clicked');

        TweenLite.set($('.intro-door-inner', $intro), { transformPerspective: 600, transformOrigin: 'left center' });

        timeline
          .to( $('.intro-door-inner', $intro), 0.2, { rotationY: 45 })
          .to( $('.intro-door', $intro), 0.3, { opacity: 0 })
          .addCallback(function() {
            $('.pages').hide();
            $('.pages#viewport').fadeIn(function() {              
              $(this).addClass('is-loaded');
			  $("#hash_page").attr('src','/ista/t3.php');
            });
          });
        break;

      case 'home':
        timeline
          .to( $('.home-img-door, .home-img-title, .home-started'), 0.2, { opacity: 0 })
          .to( $('.bus', $home), 1, { x: 2000 } )
          .to( $('.bus', $home), 0.1, { opacity: 0 } );
        break;

      default:
        break;
    }

    return timeline;
  }

  $('#intro [data-scene-transit]').on('click', function(e){
    e.preventDefault();
    transit('intro').play().addCallback(function(){
      Page.goTo('#home');
    });
  });

  return {
    intro: intro,
    player: player,
    bus:bus,
    transit: transit
  };
}());
