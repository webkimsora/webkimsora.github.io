/////////////// @ 팝업

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

function completeOpen(){
    $('.complete').stop().fadeIn(100);
}

function completeClose(){
    //$('.reserGnb .no2 a').trigger('click');
    $('.gnb .no2 a').trigger('click');
    $('.complete').stop().fadeOut(100);
}


function reserGoOpen(){
    $('.reserGo').stop().fadeIn(100);
}

function reserGoClose(){
    $('.gnb li').eq(1).find('a').trigger('click');
    $('.reserGo').stop().fadeOut(100);
	popLoginClose();
}


function congAlertOpen(){
    $('.congAlert').stop().fadeIn(100);
}

function congAlertClose(){
    $('.congAlert').stop().fadeOut(100);
}



function popLoginOpen(){

//
//	 uemail =  obj.getCookie('U_mail');
//	//alert(uemail);
//
//	if(uemail ==""){   /// 로그인이 필요합니다.
//
//              alertModal("정상적으로 사전등록 등록되었습니다.");
//	}
//	else{
//		$('.popLogin').stop().fadeIn(100);
//	}


		$('.popLogin').stop().fadeIn(100);

}

function popLoginClose(){
    $('.popLogin').stop().fadeOut(100);
}


//////

;(function(){  
    
    var winHeight = $(window).height();
    
    $('#main .content').height(winHeight);

    $(document).ready(function(){
        setTimeout(function(){        
            $('body').addClass('on');
            $('.main').addClass('on');
        },800);
    });

    // @ gnb 메뉴창
    $user = $('.userwrap');
    var winHeight = $(window).height();
    var userHeight = $('.user-contents').height() ;
    var st = $(document).scrollTop();
    //var zoomS = ($(window).width() / 720).toFixed(5);

    $('.hamburger').on('click', function(){
        $user.addClass('open');
        $user.addClass('upindex');
        $('#userBg').show();

        $('#userBg').on('touchstart',function(e){
          e.preventDefault();
        });

        winTop = $(window).scrollTop()
        //$('#viewport').css({'top':winTop, position:'fixed'});
    });

    var menuClose = function(){
        setTimeout(function(){
            $user.removeClass('upindex');
        },500);
        $user.removeClass('open');
        $('#userBg').hide();

        winTop = $(window).scrollTop()
        $('#viewport').css({'top':'',position:'relative'});
        $(window).scrollTop(winTop);
    }

    $('.user-close').on('click', function(){  
        menuClose();
    });

    $('#userBg').on('click', function(){  
        menuClose();
    });
    
    // @ 스크롤
    $('.gnb li > a').on('click', function(){   
        var winSc = $(window).scrollTop();
        var idx = $(this).parent().index();
        var navHeight = $('.header').innerHeight();
        
        menuClose();

        if($(this).parents('li').index() == 3) {
            $('html, body').stop().animate({
                scrollTop: $( $.attr(this, 'href') ).offset().top - navHeight
            }, 500);
            return false;        
        }
        
        if($(this).parents('li').index() == 2) {
            $('html, body').stop().animate({
                scrollTop: $( $.attr(this, 'href') ).offset().top - navHeight
            }, 500);
            return false;        
        } else {
            $('html, body').stop().animate({
                scrollTop: $( $.attr(this, 'href') ).offset().top
            }, 500);
            return false;        
        }
    });  

    
    $('.btnGoReser > a, .btnBottom > a, .goMain, .guideNavi > a, .btnGoReser > a').on('click', function(){   
        var winSc = $(window).scrollTop();
        var idx = $(this).parent().index();
        var navHeight = $('.header').innerHeight();

        $('html, body').stop().animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 500);
        return false;        
    });  

    var scrolling = false; 

    $(window).scroll(function(){
        var winHeight = $(document).scrollTop()
        var navHeight = $('.header').innerHeight();

        if(winHeight > 0) { 
            $('.header').addClass('on');
        } else {
            $('.header').removeClass('on');        
        }
        

        $.each($('.page'), function(idx, item) {
            var $target = $('.page').eq(idx),
            i = $target.index(),
            targetTop = $target.offset().top;

            if(targetTop  - navHeight <= winHeight) {        
                $('.gnb li > a').removeClass('on');
                $('.gnb li > a').eq(idx).addClass('on');          
                $target.addClass('on');
            }
            
            if(targetTop - 500 <= winHeight) {            
                $target.addClass('on');
            }
        });

        $.each($('.guideSection'), function(idx, item) {
            var $target = $('.guideSection').eq(idx),
            i = $target.index(),
            targetTop = $target.offset().top;

            if(targetTop  - navHeight <= winHeight) {        
                $('.guideNavi > a').removeClass('on');
                $('.guideNavi > a').eq(idx).addClass('on');          
                $target.addClass('on');
            }
            
            if(targetTop - 500 <= winHeight) {            
                $target.addClass('on');
            }
        });
        
        /*
        if($('.sp-gnb.gnb-elem4').parent('a').hasClass('on')) {
            $('.guideNavi').show();
        } else {
            $('.guideNavi').hide();
        }
        */
        
        if($(document).scrollTop() > $('#guide').offset().top -500) {
            $('.guideNavi').show();        
        } else {
            $('.guideNavi').hide();
        }

        if($(document).scrollTop() > $('#movie').offset().top - 1000) {
            $('.guideNavi').hide();
        }

        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();
        if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
            //console.log('끝');
        } else {
            //console.log('도중임');
        }
        
    });
        

    var movieID = ['KfmIimhtIiA', 'KfmIimhtIiA', '-U7qIR9kOLA', 'hpqrF8heFBE']

    $('.movieBox').on('click', function(){
        $('#popup-video iframe').attr('src', 'https://www.youtube.com/embed/'+movieID[0]+'?version=3&amp;controls=1&amp;showinfo=0&amp;modestbranding=1&amp;wmode=transparent&amp;rel=0&amp;autoplay=0&amp;html5=1&amp;enablejsapi=1');
    })
        
    $('.mainMovieL a').on('click', function(){
        $('#popup-video iframe').attr('src', 'https://www.youtube.com/embed/'+movieID[1]+'?version=3&amp;controls=1&amp;showinfo=0&amp;modestbranding=1&amp;wmode=transparent&amp;rel=0&amp;autoplay=0&amp;html5=1&amp;enablejsapi=1');
    })

    $('.mainMovieR a').on('click', function(){
        $('#popup-video iframe').attr('src', 'https://www.youtube.com/embed/'+movieID[2]+'?version=3&amp;controls=1&amp;showinfo=0&amp;modestbranding=1&amp;wmode=transparent&amp;rel=0&amp;autoplay=0&amp;html5=1&amp;enablejsapi=1');
    })
        
    $('.main .btnPlay img').on('click', function(){
        $('#popup-video iframe').attr('src', 'https://www.youtube.com/embed/'+movieID[3]+'?version=3&amp;controls=1&amp;showinfo=0&amp;modestbranding=1&amp;wmode=transparent&amp;rel=0&amp;autoplay=0&amp;html5=1&amp;enablejsapi=1');
    })

    $('#popup-video .modal-btn-close').on('click', function(){
        $('#popup-video iframe').attr('src', '');
    })


    // 카운트다운
    var countGiftSlide = new Swiper('.countGiftWrap', {
        //effect: 'fade',
        prevButton: '.btn-prev',
        nextButton: '.btn-next',
        onSlideChangeStart:function(index,idx2){
            //countSlide.slideTo(index.activeIndex);
            $('.count ul').eq(index.activeIndex).addClass('on').siblings('ul').removeClass('on');
        }
    });

    // 게임소개 mp4 영상
    $('#introduce .btnMore').on('click', function(){

         $('video').each(function () {
            this.pause();
            this.currentTime = 0;
        });

        $('#' + $(this).data('video-id')).get(0).play();        
    })
    

    var eventMovieSlide = new Swiper('.eventMovieWrap', {
        prevButton: '.btn-eventPrev',
        nextButton: '.btn-eventNext',
        onSlideChangeEnd:function(index,idx2){                            
             $('video').each(function () {
                this.pause();
                this.currentTime = 0;
            });
            
            //$('#' + $('.eventMovieWrap .swiper-slide-active').data('video-id')).get(0).play();        
        }
    });

    // 게임 정보
    $('.inforList li .inforBtn').on('click', function(){
        var idx = $(this).parents('li').index();
        
		TweenMax.to(' .inforDetailWrap',.2, {scale:1,autoAlpha:1,visibility:"visible"});

        $('.inforDetailWrap').addClass('on');

        setTimeout(function(){
            $('.inforDetail > ul > li').eq(idx).addClass('on');
        },200);
    })
        
    $('.information .btnBack').on('click', function(){
		TweenMax.to('.inforDetailWrap',.2, {scale:1.2,autoAlpha:0,visibility:'hidden'});
        $('.inforDetail > ul > li').removeClass('on');
    })

    // 가이드

    var guideSlide1 = new Swiper('.install .guideSlideWrap', {
        //effect: 'fade',
        pagination: '.guidePage.elem1',
        prevButton: '.install .btn-guidePrev',
        nextButton: '.install .btn-guideNext',
        onSlideChangeStart:function(index,idx2){
        }
    });
    
    var guideSlide2 = new Swiper('.enter .guideSlideWrap', {
        //effect: 'fade',
        pagination: '.guidePage.elem2',
        prevButton: '.enter .btn-guidePrev',
        nextButton: '.enter .btn-guideNext',
        onSlideChangeStart:function(index,idx2){
        }
    });
    
    var guideSlide3 = new Swiper('.play .guideSlideWrap', {
        //effect: 'fade',
        pagination: '.guidePage.elem3',
        prevButton: '.play .btn-guidePrev',
        nextButton: '.play .btn-guideNext',
        onSlideChangeStart:function(index,idx2){
        }
    });
    
    
    // 팝업
    $('.lottoTabWrap > a').on('click', function(){
        var idx = $(this).index();
        
        if(idx == 0 || idx == 1){
        } else {
            $(this).addClass('on').siblings('a').removeClass('on');
            $('.lottoTabSection').eq(idx-2).addClass('on').siblings('div').removeClass('on')
        }
    })


}());