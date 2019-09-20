    var aniMain = true;

    //세계관
    function goWorld(){
        if(!aniMain) return false;
        aniMain = false;

        //$('body').removeClass().addClass('worldMove');        
        $('body').removeClass('mainNow').addClass('worldMove');
        $('.page').removeClass('on');
        $('.world').addClass('on');
        $('.gnb > a').eq(1).addClass('on').siblings('a').removeClass('on');
        TweenMax.to('.mainScroll',1, {y:100+'%',ease:Power4.easeOut});

        //$('.btnPageWrap .btnPrevPage > div').eq(1).addClass('on').siblings('div').removeClass('on');
        //$('.btnPageWrap .btnNextPage > div').eq(1).addClass('on').siblings('div').removeClass('on');
        
        
        $('.world').mousewheel(function(event, delta) {
            
            if(played == true) {
                worldMovie.stopVideo();
                mediaMovie.stopVideo();
            }
            
            if(soundClick == true) {
                vid.pause();
            } else {
                $('.btnSound a').removeClass('on');
                vid.play();   
            }

             if (delta > 0) {
                 //prev
                 //$('.btnPageWrap .btnPrevPage > div').eq(1).trigger('click');        
                goMedia();
             } else {
                //next
                 //$('.btnPageWrap .btnNextPage > div').eq(1).trigger('click');        
                goIntro();
             }
         });

        aniCheck();
        /*
        $("#scroller").simplyScroll({
            customClass:'vert',
            orientation:'vertical',
            auto: true,
            manualMode: 'loop',
            speed: 1		
        });
        */
    };

    //게임소개
    function goIntro(){
        if(!aniMain) return false;
        aniMain = false;

        //$('body').removeClass().addClass('gameMove');
        $('body').removeClass('mainNow').addClass('gameMove');
        $('.page').removeClass('on');
        $('.intro').addClass('on');
        $('.gnb > a').eq(2).addClass('on').siblings('a').removeClass('on');
        
        if($('body').hasClass('worldMove')){ //세계관보이고 있을때
            TweenMax.to('.inner',0, {x:100+'%',ease:Power4.easeOut});
            TweenMax.to('.mainScroll',1, {y:0+'%',ease:Power4.easeOut,onComplete:worldOut});

        }else{
            TweenMax.to('.inner',1, {x:100+'%'});
            TweenMax.to('.mainScroll',1, {y:0+'%',ease:Power4.easeOut,onComplete:worldOut});
        }
        
            
        //$('.btnPageWrap .btnPrevPage > div').eq(0).addClass('on').siblings('div').removeClass('on');
        //$('.btnPageWrap .btnNextPage > div').eq(0).addClass('on').siblings('div').removeClass('on');
   
    
        $('.intro').mousewheel(function(event, delta) {
            
            if(played == true) {
                worldMovie.stopVideo();
                mediaMovie.stopVideo();
            }
            
            if(soundClick == true) {
                vid.pause();
            } else {
                $('.btnSound a').removeClass('on');
                vid.play();   
            }

             if (delta > 0) {
                 //prev
                 //$('.btnPageWrap .btnPrevPage > div').eq(0).trigger('click');
                goWorld();
             } else {
                //next
                //$('.btnPageWrap .btnNextPage > div').eq(0).trigger('click');
                goMedia();
             }
         });

        aniCheck();
    }

    //메인
    function goMain(){
        if(!aniMain) return false;
        aniMain = false;

        $('body').removeClass().addClass('mainNow');
        $('.page').removeClass('on');
        $('.main').addClass('on');
        $('.gnb > a').removeClass('on');
        
        if($('body').hasClass('worldMove')){ //세계관보이고 있을때
            TweenMax.to('.inner',0, {x:0+'%',ease:Power4.easeOut});
            TweenMax.to('.mainScroll',1, {y:0+'%',ease:Power4.easeOut,onComplete:worldOut});
        }else{
            TweenMax.to('.inner',1, {x:0+'%',ease:Power4.easeOut});
            TweenMax.to('.mainScroll',1, {y:0+'%',ease:Power4.easeOut,onComplete:worldOut});
            
            $('.btnPageWrap .btnPrevPage > div').removeClass('on');
            $('.btnPageWrap .btnNextPage > div').removeClass('on');
           
        }
        aniCheck();
    };

    //미디어
    function goMedia(){
        if(!aniMain) return false;
        aniMain = false;

        //$('body').removeClass().addClass('mediaMove');
        $('body').removeClass('mainNow').addClass('mediaMove');
        $('.page').removeClass('on');
        $('.media').addClass('on');
        $('.gnb > a').eq(3).addClass('on').siblings('a').removeClass('on');

        if($('body').hasClass('worldMove')){ //세계관보이고 있을때
            TweenMax.to('.inner',0, {x:-100+'%',ease:Power4.easeOut});
            TweenMax.to('.mainScroll',1, {y:0+'%',ease:Power4.easeOut,onComplete:worldOut});
        }else{
            TweenMax.to('.inner',1, {x:-100+'%',ease:Power4.easeOut});
            TweenMax.to('.mainScroll',1, {y:0+'%',ease:Power4.easeOut,onComplete:worldOut});         
        }
        
            //$('.btnPageWrap .btnPrevPage > div').eq(2).addClass('on').siblings('div').removeClass('on');
            //$('.btnPageWrap .btnNextPage > div').eq(2).addClass('on').siblings('div').removeClass('on');                    

            var myScroll = new IScroll('.media .tabImgWrap .tab1', {
                scrollX: false,
                scrollY: true,
                mouseWheel: true,
                scrollbars: true
            });

            var galleryIn = false;

            $('.gallery').mouseenter(function(){
                galleryIn = true;
            })
            $('.gallery').mouseleave(function(){
                galleryIn = false;
            });           
        
            $('.media').mousewheel(function(event, delta) {      
                if(galleryIn) return;
                //console.log('밖')

                        
                if(played == true) {
                    worldMovie.stopVideo();
                    mediaMovie.stopVideo();
                }
                
                if(soundClick == true) {
                    vid.pause();
                } else {
                    $('.btnSound a').removeClass('on');
                    vid.play();   
                }

                 if (delta > 0) {//prev
                     //$('.btnPageWrap .btnPrevPage > div').eq(2).trigger('click');
                    goIntro();
                } else {//next
                     //$('.btnPageWrap .btnNextPage > div').eq(2).trigger('click');
                    goWorld();
                 }         
             });

        aniCheck();
    }

    //세계관 진입
    function worldOut(){
        $('body').removeClass('worldMove')
    }

    //애니메이션 중복방지
    function aniCheck(){
        setTimeout(function(){
            aniMain = true;
        },1000)
    }  

///////// 팝업
function galPopOpen(){
    $('.galleryPop').stop().fadeIn(100);
}

function galPopClose(){
    $('.galleryPop').stop().fadeOut(100);
    $('.galleryPop').removeClass('on');
}

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

function cbtComOpen(){
    $('.cbtComplete').stop().fadeIn(100);
}

function cbtComClose(){
    $('.cbtComplete').stop().fadeOut(100);
}


////////
;(function() {
	// @ 영상 리사이즈

	 var resize = function() {
	  var width = $(window).width(),
	   pWidth, // player width, to be defined
	   height = $(window).height(),
	   pHeight, // player height, tbd
	   $tubularPlayer = $('.bgWrap video');
	   $storyPlayer = $('#videoBg');
	   //$storyPlayer = $('#movieMain');

	  if (width / (16/9) < height) { // if new video height < window height (gap underneath)
	   pWidth = Math.ceil(height * (16/9)); // get new player width
	   $tubularPlayer.width(pWidth).height(height).css({left: (width - pWidth) / 2, top: 0}); // player width is greater, offset left; reset top
	   $storyPlayer.width(pWidth).height(height).css({left: (width - pWidth) / 2, top: 0}); // player width is greater, offset left; reset top
	   } else { // new video width < window width (gap to right)
	   pHeight = Math.ceil(width / (16/9)); // get new player height
	   $tubularPlayer.width(width).height(pHeight).css({left: 0, top: (height - pHeight) / 2}); // player height is greater, offset top; reset left
	   $storyPlayer.width(width).height(pHeight).css({left: 0, top: (height - pHeight) / 2}); // player height is greater, offset top; reset left
	   }
	 }



	 $(window).on('resize', function() {
	  resize();
	 })

	 $(window).load(function(){
	  resize();
	 })

	 resize();
     
	//오디오    
	var vid = document.getElementById("myVideo"); 
	function playVid() { 
		vid.play(); 
	} 
	function pauseVid() { 
		vid.pause(); 
	}

	$('.btnSound a').on('click',function(e){
		e.preventDefault();
		$(this).toggleClass('on');

		if($(this).hasClass('on')){
            soundClick = true;
			vid.pause();
		}else{
            soundClick = false;
			vid.play();
		}
	});

     $(document).ready(function(){        
        vid.play();
     });

     // @@ 메인 : 마우스
    $(".container").fadeIn("fast")

    var mouseX, mouseY, mouseWinW, mouseWinH,luz;

    mouseWinH = $(window).height();
    mouseWinW = $(window).width();
    lightW = mouseWinW*2;
    lightH = mouseWinH*2; 
    $(".bgLight").css({"width":lightW,"height":lightH,"margin-left":- mouseWinW/2, "margin-top":-mouseWinH/2});
    
    //$(".container").css({"height":$(document).height()})

    var moove = function(){ 	
        mouseWinH =  $(window).height();
        mouseWinW = $(window).width(); 

        $(".bgLight").css({"left":mouseX,"top":mouseY},100,"linear");
    }

    //Recupera as cordenadas do mouse
    $(document).mousemove(function(event){
        mouseX = event.pageX 
        mouseY = event.pageY 

        $(".bgLight").css({"width":lightW, "height":lightH, "margin-left": - lightW / 2, "margin-top": - lightH / 2});

        moove(); 
    });

    //Resize
    $(window).resize(function(){
        mouseWinH = $(window).height();
        mouseWinW = $(window).width();
        mouseWinW =  mouseWinW * 2; 
        mouseWinH =  mouseWinH * 2;
        lightW = mouseWinW ;
        lightH = mouseWinH   ;
        $(".bgLight").css({"width":lightW, "height":lightH, "margin-left": - mouseWinW / 2, "margin-top": - mouseWinH / 2});
        $(".container").css({"height":$(document).height()});
    }) ;

    // @ 미디어 갤러리
    $(document).ready(function(){
        var winH = $(document).innerHeight();

        $('.media .tabImgWrap .tab1').css('height', winH);
        
        if($(document).innerWidth() <= 1600 ) {            
            $('.media .tabImgWrap .tab1').css('height', winH+150);
        }
     /*   
        var myScroll = new IScroll('.media .tabImgWrap .tab1', {
            scrollX: false,
            scrollY: true,
            mouseWheel: true,
            scrollbars: true
        });
        */
    });

    
    $(window).resize(function(){
        var winH = $(document).innerHeight();

        $('.media .tabImgWrap .tab1').css('height', winH);

        if($(document).innerWidth() <= 1600 ) {            
            $('.media .tabImgWrap .tab1').css('height', winH+150);
        }
    });

      var galleryPop = true;

     $('.galleryList li').on('click', function(){

        var idx = $(this).data('gallery')-1;

        galPopOpen();

        $('#galDetailWrap').flexslider({
            animation: "slide",
            animationSpeed: 300,
            controlNav: false,
            animationLoop: false,
            auto:false
        });

        $('#galDetailWrap').flexslider(idx);  
        
        setTimeout(function(){
            $('.galleryPop').addClass('on');
        },300);

        $('.galleryPop').mousewheel(function(event, delta) {  
            
            if(!galleryPop) return;

            galleryPop = false;

             if (delta > 0) {//prev
                 if($('.galleryPop .slides > li').eq(0).hasClass('flex-active-slide')){
                     galleryPop = true;
                 } else {
                     $('.galleryPop .flex-prev').trigger('click');                 
                    setTimeout(function(){galleryPop = true;},500)
                 }
            } else {//next
                 if($('.galleryPop .slides > li').eq(17).hasClass('flex-active-slide')){
                     galleryPop = true;
                 } else {
                     $('.galleryPop .flex-next').trigger('click');
                    setTimeout(function(){galleryPop = true;},500)
                 }
             }         
         });

     });
   
	// @@ 영상팝업
    $(document).ready(function() {
          $('.main .btnPlay img').on('click', function(){
            vid.pause();
            $('.mainMovie').show();
            player.playVideo();
        })

        $('.mainMovie .modal-btn-close').on('click', function(){
            $('.mainMovie').hide();
            player.stopVideo();           

            if(soundClick == true) {
                vid.pause();
            } else {
                $('.btnSound a').removeClass('on');
                vid.play();   
            }
            
        })        
    });

    // @ 로드시
    $(document).ready(function(){
        setTimeout(function(){
            $('.footer').addClass('on');
        },1000);
    });

    // @ 게임소개
    
    $('.intro .boxList > li').on('click', function(){
        var idx = $(this).index();

        $('.boxList > li').removeClass('on').eq(idx).addClass('on');
        $('.explainSlideWrap > div').eq(idx).addClass('on').siblings('div').removeClass('on');
        $('.intro .explainWrap > div').eq(idx).addClass('on').siblings('div').removeClass('on');

        if(idx == 0) {
            explainSlider1.reloadSlider;
            explainSlider2.destroySlider;
            explainSlider3.destroySlider;
            explainSlider4.destroySlider;            
        } else if(idx == 1) {
            explainSlider2.reloadSlider;
            explainSlider1.destroySlider;
            explainSlider3.destroySlider;
            explainSlider4.destroySlider;               
        } else if(idx == 2) {
            explainSlider3.reloadSlider;
            explainSlider1.destroySlider;
            explainSlider2.destroySlider;
            explainSlider4.destroySlider;   
            
        } else {
            explainSlider4.reloadSlider;  
            explainSlider1.destroySlider;
            explainSlider2.destroySlider;
            explainSlider3.destroySlider;         
        }
    })

    //
    
    var explainSlider1 = $('.explain-shot1').bxSlider({
        mode: 'fade',
            pager: true,
        infiniteLoop: true,
        autoControls: true,
        hideControlOnEnd: true
    });

    var explainSlider2 = $('.explain-shot2').bxSlider({
        mode: 'fade',
            pager: true,
        infiniteLoop: true,
        autoControls: true,
        hideControlOnEnd: true
    });
        
    var explainSlider3 = $('.explain-shot3').bxSlider({
        mode: 'fade',
            pager: true,
        infiniteLoop: true,
        autoControls: true,
        hideControlOnEnd: true
    });
        
    var explainSlider4 = $('.explain-shot4').bxSlider({
        mode: 'fade',
            pager: true,
        infiniteLoop: true,
        autoControls: true,
        hideControlOnEnd: true
    });

    //
    
    var storySlider = $('.story').bxSlider({
        mode: 'fade',
        pager: true,
        auto: false,
        infiniteLoop: true
    });

    //
        
    $('.tabList > li').on('click', function(){
        var idx = $(this).index();

        $(this).addClass('on').siblings('li').removeClass('on');
        $(this).parents('.page.on').find('.tabImgWrap > div').eq(idx).addClass('on').siblings('div').removeClass('on');

        if(played == true) {
            
            worldMovie.pauseVideo();
        }
    })

    //
    $(document).ready(function(){
        if($('.main.page').hasClass('on')) {
            $('body').addClass('mainNow');
        } else {
            $('body').removeClass('mainNow');
        }
    });
    
    $('.mainGnb .no1').mouseover(function(){
        $('.mainGnb .gnbBg1').addClass('on');
    });
    
    $('.mainGnb .no1').mouseleave(function(){
        $('.mainGnb .gnbBg1').removeClass('on');
    });
    
    $('.mainGnb .no2').mouseover(function(){
        $('.mainGnb .gnbBg2').addClass('on');
    });
    
    $('.mainGnb .no2').mouseleave(function(){
        $('.mainGnb .gnbBg2').removeClass('on');
    });

    $('.mainGnb .no3').mouseover(function(){
        $('.mainGnb .gnbBg3').addClass('on');
    });
    
    $('.mainGnb .no3').mouseleave(function(){
        $('.mainGnb .gnbBg3').removeClass('on');
    });

    $('.gnb > a, .mainGnb > a').on('click', function(){        
        /*
        if($('.main.page').hasClass('on')) {
            $('body').addClass('mainNow');
        } else {
            $('body').removeClass('mainNow');
        }
        */

        if(played == true) {
            worldMovie.stopVideo();
            mediaMovie.stopVideo();
        }
        
        if(soundClick == true) {
            vid.pause();
        } else {
            $('.btnSound a').removeClass('on');
            vid.play();   
        }
        
    })

    $('.world .tabList li').on('click', function(){
        var idx = $(this).index();

        if(idx == 0) {
            if(played == true) {
                worldMovie.stopVideo();
            }        
            
            if(soundClick == true) {
                vid.pause();
            } else {
                $('.btnSound a').removeClass('on');
                vid.play();   
            }       
            
            storySlider.reloadSlider;

        } else {
            worldMovie.playVideo();        
            storySlider.destroySlider;
        }
        
    })
        
    $('.media .tabList li').on('click', function(){
        
        var idx = $(this).index();

        if(idx == 0) {
            if(played == true) {
                mediaMovie.stopVideo();
            }        
            
            if(soundClick == true) {
                vid.pause();
            } else {
                $('.btnSound a').removeClass('on');
                vid.play();   
            }
            
        } else {
            $('.media .tab2 .movieTab li').eq(0).trigger('click');
        }

    })

    //
    $('#popup-close .btnClose').on('click', function(){
        mui.modal.close('popup-close');
    })

}());