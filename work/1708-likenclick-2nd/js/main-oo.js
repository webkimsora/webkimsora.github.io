/////////////////////// 알럿창 ////////////////////////
function alertOpen(){
    $('.alertWrap').stop().fadeIn(100);
}

function alertClose(){
    $('.alertWrap').stop().fadeOut(100);
}
var alertModal = function(t_str) {
    alertOpen();
    $('#atext').html(t_str);
};

function popBuyOpen(){
    $('.popBuy').stop().fadeIn(100);
}

function popBuyClose(){
    $('.popBuy').stop().fadeOut(100);
}

function popCouponOpen(){
    $('.popCoupon').stop().fadeIn(100);
}

function popCouponClose(){
    $('.popCoupon').stop().fadeOut(100);
}

function popBuyEndOpen(){
    $('.popBuyEnd').stop().fadeIn(100);
}

function popBuyEndClose(){
    $('.popBuyEnd').stop().fadeOut(100);
}

function popUploadOpen(){
    $('.popUpload').stop().fadeIn(100);
}

function popUploadClose(){
    $('.popUpload').stop().fadeOut(100);
}

function popBarcodeOpen(){
    $('.popBarcode').stop().fadeIn(100);
}

function popBarcodeClose(){
    $('.popBarcode').stop().fadeOut(100);
}

function popConfirmOpen(){
    $('.popConfirm').stop().fadeIn(100);
}

function popConfirmClose(){
    $('.popConfirm').stop().fadeOut(100);
}

function popManageOpen(){
    $('.popManage').stop().fadeIn(100);
}

function popManageClose(){
    $('.popManage').stop().fadeOut(100);
}
/////////////////////////

(function(){ 
  // 아이폰 폰트 크기
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if(iOS) {
  }

  /*// 가로모드 방지
  $(window).on("orientationchange",function(){
     if(window.orientation == 0) {
        $('#landscape').hide();
        $('#viewport').show();
    } else {
        $('#landscape').show();
        $('#viewport').hide();
    }
  });*/

  // @ 스크롤 이벤트
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
    var goTop = $('.page').eq(0).attr('data-height');    
    $('html, body').stop().animate({scrollTop : goTop + "px"},500);
    return false;
  });

  $(window).scroll(function(){
    if($(this).scrollTop() > 200) {
      $('.btnTop').fadeIn();
    } else {
      $('.btnTop').fadeOut();
    }   
  }); 

  

    // gnb
    $('.gnbWrap .allMenu').on('click', function(){
        $('.inGnb').addClass('open');
    })
        
    $('.inGnb .btn-menuClose').on('click', function(){
        $('.inGnb').removeClass('open');
    })

        
    var gnbSwiper = new Swiper('.menuWrap',{ 
        pagination: '.menuWrap .swiper-pagination',
        paginationClickable: true,
		preventClicks: false
    });

  // 메인
    //170816 stagePadding 수정
    $('.visual .owl-carousel').owlCarousel({
        stagePadding: 25,
        loop:true,
        margin:10,
        nav:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });
    
    // 메인 스와이퍼
    var pointSwiper = new Swiper('.listWrap .swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 20
    });

    // 꿀알바 수익내역 그래프
    if($('.chartWrap > div').hasClass('chartDiv')) {
        var chart = AmCharts.makeChart("chartdiv", {
          "type": "pie",
          "theme": "light",
          "dataProvider": [{
            "country": "설치형",
            "litres": 501.9,                
            "color": "#51c7b5"
          }, {
            "country": "좋아요",
            "litres": 301.9,
            "color": "#3162c5"
          }, {
            "country": "클릭형",
            "litres": 201.1,
            "color": "#ffa800"
          }, {
            "country": "가입형",
            "litres": 165.8,
            "color": "#ffde00"
          }],
          "valueField": "litres",
          "titleField": "country",
          "colorField": "color",
          "balloon": {
            "fixedPosition": true
          }
        });
    }

    // 말줄임표
    $(document).ready(function() {
        if($('.title span').hasClass('twoTitleWrap')){
            $(".twoTitleWrap").dotdotdot({
                //	configuration goes here
            });
        }
    });

  // 포인트샵
    var pointSwiper = new Swiper('#pointshop .swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 'auto',
        paginationClickable: true,
        spaceBetween: 2
    });

    //답글달기
    $('.reply-wrap .btn-reReply').on('click', function(){
        $(this).closest('li').find('.reply-reReply').toggle('fast');
    })

// 170817
    /* 게시글 토글 리스트 */
    //$('.toggleList > li').eq(0).children($('.toggleList-top')).addClass('is-clicked');
    //$('.toggleList > li').eq(0).children($('.toggleList-inner')).show();

    $('.toggleList-top').on('click', function(){
        var $self = $(this);
        $selfInner = $(this).siblings('div');

        $('.toggleList-top').removeClass('is-clicked');
        $self.addClass('is-clicked');

        if($selfInner.css('display') === "block") {
            $self.removeClass('is-clicked');
            $selfInner.slideUp(300);
            return true;
        }        

        $('.toggleList-inner').slideUp(300);
        $selfInner.slideDown(200);
    });

    // 출금
    $('.mypage .btn-withdraw').on('click', function(){
        $('.withdraw-write').hide();
        $('.withdraw-cancel').show();
        $('.withdraw-infor').addClass('complete');
    })
        
    $('.mypage .btn-withCancel').on('click', function(){
        $('.withdraw-write').show();
        $('.withdraw-cancel').hide();
        $('.withdraw-infor').removeClass('complete');
    })

    // 170818-2차 gnb 백그라운드
    $('.gnbWrap .allMenu').on('click', function(){
        $('#gnbBg').show();     
        
        $('#gnbBg').on('touchstart',function(e){
          e.preventDefault();
        });
        
        winTop = $(window).scrollTop();
        $('#viewport').css({'top':-winTop,position:'fixed'});
    })
    $('.btn-menuClose').on('click', function(){  
        $('.inGnb').removeClass('open');
        $('#gnbBg').hide();

        $('#viewport').css({'top':'',position:'relative'});
        $(window).scrollTop(winTop);
    });

    $('#gnbBg').on('click', function(){  
        $('.inGnb').removeClass('open');
        $('#gnbBg').hide();

        $('#viewport').css({'top':'',position:'relative'});
        $(window).scrollTop(winTop);
    });
    // 메인 유플러스컨텐츠
    $(window).load(function(){
        var mainBannerSwiper = new Swiper('.enli_slideWrap02', {
            pagination: '.mdswiper .swiper-pagination',
            paginationClickable: true,
            nextButton: '.mdswiper .enli-bx-next',
            prevButton: '.mdswiper .enli-bx-prev',
            loop: true
        });
    });
    
    // 메인 유플러스컨텐츠
    $(window).load(function(){
        var mainRankSwiper = new Swiper('.rankswiper', {
            pagination: '.rankswiper .swiper-pagination',
            paginationClickable: true,
            nextButton: '.rankswiper .enli-bx-next',
            prevButton: '.rankswiper .enli-bx-prev',
            loop: true
        });
    });

    // 0830 앱소개 - 토이 이미지 더보기
    $('.btn-toyMore').on('click', function(){
        if($('.toyListArea').is(":visible")){
            $('.toyListArea').hide();     
            $(this).html('이미지 더보기 +');      
        }  else { 
            $(this).html('이미지 접기 -');      
            $('.toyListArea').css('display','block');
        }
    });
    
    ////////// 170906 추가 //////////
    // 마이페이지 관심사
	$(document).ready(function() {
        
        $(".circleWrap").scrollLeft(100);
        
        $('.circleWrap').scroll(function(){
            var scLeft = $(this).scrollLeft() / 10;

            $('.circleWrap ul li:nth-child(2n)').css('top',-scLeft + 15);
            $('.circleWrap ul li:nth-child(2n-1)').css('top',scLeft - 15);

            //$('.circleWrap ul li').removeClass('on');
        })

        $('.circleWrap ul li').click(function(){
            //$('.circleWrap ul li').removeClass('on');
            //$(this).toggleClass('on');
        })
                
        if($('#mypage').hasClass('mypage-interest') == true ){        
            $(".circleWrap").mousewheel(function(event, delta) {
                this.scrollLeft -= (delta * 30);    
                event.preventDefault();
            });
        }
        
        var UserAgent = navigator.userAgent;
        var UADevice = UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i);
        var UAVendor = UserAgent.match(/LG|SAMSUNG|Samsung/);

        if ( UADevice !== null || UAVendor!== null){
            // 모바일
            $('.circleWrap').css('overflowX','scroll');
        } else {
            // PC
            $('.circleWrap').css('overflowX','hidden');
            $('.circleWrap .mouse').fadeIn('fast');
            setTimeout(function(){
                $('.circleWrap .mouse').fadeOut('fast');
            },3000);
        }
    });

    //토글 스위치 (마이페이지 설정)
    $(".toggle-switch input[type='checkbox']").change(function() {
        var $el = $(this);

        // 수락
        if ($(".toggle-switch input[type='checkbox']").is(":checked") == true) {     
            setTimeout(function(){        
               $el.parents('.toggle-switch').addClass('agree');                
            },250);
            setTimeout(function(){        
                $el.parents('.toggle-switch').removeClass('refuse');
            },100);
        }
        // 거부 
        else {                 
            setTimeout(function(){     
                $el.parents('.toggle-switch').addClass('refuse'); 
            },250);
            setTimeout(function(){        
               $el.parents('.toggle-switch').removeClass('agree');
            },100);
        }
    });    

}());