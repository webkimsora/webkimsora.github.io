;(function(){
    var inveTeam = (function(){
        var teamInit;
        var teamSet;
        var memLen;
        var marginChk;
        var showSub;
        var windowSize;
        var scrollTeam;
        var sHeight;
        var scrolling;
        var teamTop = [];
        var resetMember;
        var checked = false;
        var arr_memLen = []; // 리스트총갯수
        var $activeViewer; // 클릭시 상세내용
        var activeItem = {}; 
    
        scrollTeam = function(){
            sHeight = $(window).height()*0.8;
            scrolling = ( $(window).scrollTop() + ($(window).height() + sHeight) /2);
            for(var r = 0 ; r < memLen; r++){
                if (scrolling > teamTop[r]) {
                var nowItem = $('.inveTeam .item:visible').eq(r);
                new TweenMax.to(nowItem, 0.4, {y: 0, opacity: 1});
                }
            }
        }
    
        marginChk = function(){
            //init
            var teamW = $(window).width();
            var teamMem = $('.itemList .item:visible');
            memLen = teamMem.length;
            // 리사이즈 TweenMax.to('.itemViewer',0, {height:'auto'});
            TweenMax.to('.itemViewer',0, {height:'0'});
        
            //  :: start
            $('.itemList').each(function(_listNum){
                arr_memLen[_listNum] = $(this).find('.item').length;
            });
            //  :: end
        
            teamMem.css('margin-right','2%');
            teamMem.removeClass('here');
        
            if( teamW > 1024){
                teamMem.css('width', '23.5%');
                for(var i1= 0; i1 < memLen; i1++){
                    var t1 = i1 + 1;
                    
                    if(teamMem.data('size') != undefined){ //team page
                        $('[data-size="big"').css('width', '32%');
                        if(i1==6 || i1==10 || i1==14 || i1==18) {
                            teamMem.eq(i1).css('margin-right','0%');
                        }
                    } else {
                        if(parseInt( t1 % 4) == 0){
                            teamMem.eq(i1).css('margin-right','0%');
                        }
                    }
                }

                windowSize = 'desk';
        
            }else if( teamW > 768){
                teamMem.css('width', '32%');
                for(var i2= 0; i2 < memLen; i2++){
                    var t2 = i2 + 1;
                    if(parseInt( t2 % 3) == 0){
                        teamMem.eq(i2).css('margin-right', '0%');
                    }
                }
                windowSize = 'tablet';
            }else if( teamW > 480){
                teamMem.css('width', '49%');
                for(var i3= 0; i3 < memLen; i3++){
                    var t3 = i3 + 1;
                    if(parseInt( t3 % 2) == 0){
                        teamMem.eq(i3).css('margin-right', '0%');
                    }
                }
                windowSize = 'mob';
            }
            else{
                teamMem.css('margin-right', '0%');
                teamMem.css('width', '100%');
                windowSize = 'mobile';
            }
        
            setTimeout(function(){
                checked = true;
                scrollTeam();
            }, 500);
            teamTop = [];
        
            for(var t = 0; t< memLen; t++){
                var memTop = teamMem.eq(t).offset().top;
                teamTop.push(memTop);
            }
            scrollTeam();
        }
    
    
        resetMember = function (_$itemList, _$itemViewer){
            if(_$itemList && _$itemViewer){
                _$itemViewer.appendTo(_$itemList);
                checked = true;
            }else{
                $('.itemViewer').appendTo('.itemList');
            }
        }
    
        // 뷰어 보여주기 :: start
        showSub = function(){        
            $('.itemList').each(function(_listNum){
                var $itemList = $(this),
                    $itemViewer = $(this).find('.itemViewer'),
                    $itemViewer_cont = $(this).find('.itemViewer dl'),
                    s = $(this).closest('.item:visible').index();
                arr_memLen[_listNum] = $(this).find('.item').length;
                TweenMax.to($(this).find('.itemViewer'), 0, {height:'0'});

                $(this).find('.item').each(function(_itemNum){
                    $(this).find('.position').bind({
                        'click': function(){
                            var $item = $(this).parents('.item'),
                                col = 0;

                            if($activeViewer && ($activeViewer != $itemViewer)) $activeViewer.find('.closeBtn').trigger('click');
                            $activeViewer = $itemViewer;
                            asTeamData(this);

                            $itemViewer.appendTo($itemList);

                            if(windowSize == 'desk'){

                                if($item.data('size') != undefined){ //team page
                                    if($item.data('size') == 'big') {//상단 임원진
                                        col = 3;
                                        p = (( parseInt(_itemNum/col) + 1) * col )- 1;
                                        limit = parseInt(arr_memLen[_listNum]/col);

                                        if( parseInt(_itemNum/col) < limit ){
                                            after = $itemList.find('.item:visible').eq(p);
                                            $itemViewer.insertAfter(after);
                                        }
                                    } else {//하단
                                        col = 7 || 11 || 15 || 19;
                                        p = (( parseInt(_itemNum/col) + 1) * col )- 1;
                                        limit = parseInt(arr_memLen[_listNum]/col);

                                        if( parseInt(_itemNum/col) < limit ){
                                            after = $itemList.find('.item:visible').eq(p);
                                            $itemViewer.insertAfter(after);
                                        }
                                    }
                                } else {
                                    col = 4;
                                    p = (( parseInt(_itemNum/col) + 1) * col )- 1;
                                    limit = parseInt(arr_memLen[_listNum]/col);

                                    if( parseInt(_itemNum/col) < limit ){
                                        after = $itemList.find('.item:visible').eq(p);
                                        $itemViewer.insertAfter(after);
                                    } else{
                                        last = arr_memLen[_listNum] - 1;
                                        after = $itemList.find('.item:visible').eq(last);
                                        $itemViewer.insertAfter(after);
                                    }
                                }
                        
                            }else if(windowSize == 'tablet'){
                                col = 3;
                                p = (( parseInt(_itemNum/col) + 1) * col )- 1;
                                limit = parseInt(arr_memLen[_listNum]/col);
                        
                                if( parseInt(_itemNum/col) < limit ){
                                    after = $itemList.find('.item:visible').eq(p);
                                    $itemViewer.insertAfter(after);
                                } else{
                                    last = arr_memLen[_listNum]-1
                                    after = $itemList.find('.item:visible').eq(last);
                                    $itemViewer.insertAfter(after);
                                }
                            }else if(windowSize == 'mob'){
                                col = 2;
                                p = (( parseInt(_itemNum/col) + 1) * col )- 1;
                                limit = parseInt(arr_memLen[_listNum]/col);
                        
                                if( parseInt(_itemNum/col) < limit ){
                                    after = $itemList.find('.item:visible').eq(p);
                                    $itemViewer.insertAfter(after);
                                } else{
                                    last = arr_memLen[_listNum]-1
                                    after = $itemList.find('.item:visible').eq(last);
                                    $itemViewer.insertAfter(after);
                                }
                            }else{
                                col = 1;
                                $itemViewer.insertAfter($item);
                            }
                        
                        
                        $('.item').removeClass('here');
                        $item.addClass('here');
                        
                        if(activeItem.listNum !== _listNum){
                            TweenMax.set($itemViewer, {
                            height: "auto"
                            });
                            TweenMax.from($itemViewer, 1, {
                            height: "auto"
                            // height: 0,
                            // ease: Back.easeOut
                            });
                        }else{
                            if(activeItem.line === parseInt(_itemNum/col)){               
                                TweenMax.set($itemViewer, {
                                    height: 'auto',
                                    onComplete: function(){
                                        activeItem.height = $itemViewer.outerHeight();
                                    }
                                });
                                TweenMax.from($itemViewer, 1, {
                                    height: activeItem.height - 50 + 'px',
                                    ease: Back.easeOut
                                });
                            }else{
                                TweenMax.set($itemViewer, {
                                    height: 'auto'
                                });
                                TweenMax.from($itemViewer, 1, {
                                    height: 0 + 'px',
                                    ease: Back.easeOut
                                });
                            }
                        }
                        
                        TweenMax.from($itemViewer_cont, .5, {opacity: 1});
                        TweenMax.from($itemViewer_cont, .5, {opacity: 0});
                        setTimeout(function(){
                            $('html, body').stop().animate({
                                scrollTop: $item.offset().top
                            }, 'slow');
                            return false;
                        }, 400);
                        activeItem.line = parseInt(_itemNum/col);
                        activeItem.listNum = _listNum; 
                        return false;
                        }
                    });
                });
                $itemViewer.find('.closeBtn').bind({
                    'click': function(){
                        var $itemViewer = $(this).parents('.itemViewer');
                        //resetTeamData(); // add by developer
                        TweenMax.to($itemViewer, 0.7, {height:'0',ease:Power4.easeOut, onComplete:wrap_resetMember});
                        function wrap_resetMember(){
                        resetMember($itemList, $itemViewer);
                        }  
                        $('.inveTeam .item').removeClass('here');
                        activeItem.line = undefined;
                        activeItem.listNum = undefined;          
                        return false;
                    }
                });
            });
        }
        // 뷰어 보여주기 :: end
    
        teamSet = function(){        
            new TweenMax.to('.item', 0, {y:50})
            // 리사이즈 new TweenMax.to('.itemViewer', 0, {height:0, minHeight:0});
            new TweenMax.to('.itemViewer', 0, {height:0, minHeight:0});

            $('.here').hide();
        
            //profileList
            $(window).resize(function(){
                marginChk(false);
            });
            marginChk(false);

            $('.inveTeam .toTop').on('click', function(){
                console.log('test');
                $(window).scrollTo('.inveTeam',500)
            });

            // 포트폴리오 탭
            $('#portfolio .tab > li').on('click', function(){
                var idx = $(this).index();

                $(this).addClass('on').siblings('li').removeClass('on');
                $('#portfolio .tabCnt > li').removeClass('on').eq(idx).addClass('on');
                $('#portfolio .tabCnt > li').css('opacity','0');

                setTimeout(function(){
                    $('#portfolio .tabCnt > li.on').css('opacity','1');
                    showSub();
                    marginChk();
                },80);
            });
        }   
    
    
    
        $(window).scroll(function(){
            scrollTeam();
        })
    
        teamInit = function(){
            teamSet();
            showSub();
            scrollTeam();
        }
        return {
            teamInit : teamInit
        }
    }());
    
    function asTeamData(tThis) {
        var descas=$(tThis).parent('a').find('.desc_as').html();
        $('.itemViewer').find('dd').html(descas);
    }
    
    //
    $(document).ready(function(){
      inveTeam.teamInit();
    });
	
}());