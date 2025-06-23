function isMobile(){
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getScrollbarWidth(){
    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);
  
    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);
    
    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
  
    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);
  
    return scrollbarWidth;
  }

(function($){
    $activeClass = 'active';
    $.fn.cnTab = function(options={}) {
        let main_nav;
        this.each(function(){
            const {tab, tabParent=null, width, spaceTab, startIndex=null, mouseover=false, onClick=function(){}, activeClass=$activeClass, onInit=function(){}, useConts, tabReset=true} = options;
            const This = $(this);
            const navs = This.addClass('cn-nav').find('> *');
            const max = navs.length;
            main_nav = navs;

			//console.log('useConts' , useConts);
            let opTab;
            if(tab && tabParent){
                opTab = This.closest(tabParent).find(tab);
            }else{
                opTab = tab ? $(tab) : This.next();
            }

            main_tab = opTab;

            if(startIndex != null){
                This.addClass('cn-auto-index')
            }
            
			const _useConts = useConts != 'N' ? 'Y' : 'N';
            let _startIndex;
            if(startIndex == 'auto'){
                _startIndex = rand(0, navs.length);
            }else if(startIndex == 'custom'){
                _startIndex = 'custom'
            }else{
                _startIndex = ((startIndex > 0) ? startIndex : 0 );
            }
            
			let tabs;
			if(_useConts != 'N'){
				tabs = opTab.addClass('cn-tab').find('> *');
			}
                    
			(function() {
				if(width !== 'css'){
					//( (!width || width == 'auto') ?  ( width == 'auto' ? navs.attr('style', 'flex-grow: 1 !important') : navs.css('flex-grow', 1)) : navs.css('width', width) );

					( (!width || width == 'auto') ? '' : navs.css('width', width) );

					if(spaceTab > 0) This.css('column-gap', `${spaceTab}px`);
				}

                if(_startIndex != 'custom'){
                    // 네비게이션
                    navs.removeClass(activeClass).eq(_startIndex).addClass(activeClass);

                    // 탭
                    if(_useConts != 'N'){
                        tabs.removeClass(activeClass).eq( (tabs.length > 1 ? _startIndex : 0 ) ).addClass(activeClass);
                    }
                }

				

				onInit(This, _startIndex, tabs); // (탭버튼, 현재 활성화 탭 index, 탭 컨텐츠)
			}());
            
            let target = This.hasClass('swiper') ? '> * > *:not(.active):not(.disabled)' : '> *:not(.active):not(.disabled)';
            
            if(mouseover){
                This.on('mouseover', target, function(e){
                    let index = $(this).index();
                    navs.removeClass(activeClass).eq(index).addClass(activeClass);
    
                    if(_useConts != 'N'){
                        if(tabs.length > 1){ // 탭이 1 이상일때 작동함
                            tabs.removeClass(activeClass).eq(index).addClass(activeClass);
    
                            //console.log(navs.length, tabs.length);
    
                            opTab.find('video').each(function(){
                                $(this).get(0).pause();
                                $(this).get(0).currentTime = 0;
                                $(this).get(0).load();
                            });
    
                            if(tabReset){
                                // 시작 인덱스값 없을 경우에만 하위 탭 리셋
                                // 클릭한 탭의 내용만 첫번째 탭으로 리셋됨
                                opTab.find(`> *:nth-child(${index + 1}) .cn-nav:not(.cn-auto-index) > *:first-child`).trigger('click');
                            }
                        }
                    }
    
                    // onClick($(this), index, tabs);
                });
            }else{
                This.on('click', target, function(e){
                    let index = $(this).index();
                    navs.removeClass(activeClass).eq(index).addClass(activeClass);
    
                    if(_useConts != 'N'){
                        if(tabs.length > 1){ // 탭이 1 이상일때 작동함
                            tabs.removeClass(activeClass).eq(index).addClass(activeClass);
    
                            //console.log(navs.length, tabs.length);
    
                            opTab.find('video').each(function(){
                                $(this).get(0).pause();
                                $(this).get(0).currentTime = 0;
                                $(this).get(0).load();
                            });

                            if(tabReset){
                                // 시작 인덱스값 없을 경우에만 하위 탭 리셋
                                // 클릭한 탭의 내용만 첫번째 탭으로 리셋됨
                                opTab.find(`> *:nth-child(${index + 1}) .cn-nav:not(.cn-auto-index) > *:first-child`).trigger('click');
                            }
                        }
                    }

                    if(onClick.toString().trim().replace(/\s/g,"") != 'function(){}'){
                        onClick($(this), index, tabs);
                    }
    
                });
            }
        });

        this.goTo = function(index){
            if(index > -1 && main_nav){
                main_nav.eq(index).trigger('click');
            }
            return false;
        }

        return this;
    }

    $.fn.cnTabSwiper = function(options={}){
        if (this.length === 0) {
            return this;
        }
        const { tab, swiperOptions } = options;

        el = this;
        target = tab ? $(tab) : el;

        return target.cnSlider({
            nav: tab ? '.'+el.attr('class').split(' ').join('.') : null,
            swiperOptions: {
                slidesPerView: 'auto',
                freeMode: true,
                observer: true,
                observeParents: true,
                on:{
                    init: function (pSwiper) {
                        setTimeout(() => {
                            pSwiper.update();
                        }, 100);
                        let _f_menu = $(pSwiper.el);
                        let _index = $(_f_menu).find('.swiper-wrapper').data('index');

                        $(pSwiper.el)
                        .on('click', '.swiper-slide', function(e){
                            let _f_this = $(this);

                            // console.log('index',  _f_this.parents('.swiper-wrapper').find('.swiper-slide').index( _f_this ) );

                            _f_this.addClass($activeClass).siblings('.swiper-slide').removeClass($activeClass);
                            pSwiper.slideTo( _f_this.parents('.swiper-wrapper').find('.swiper-slide').index( _f_this ) );
                        });

                        if( _index >= 0){
                            $(_f_menu).find('.swiper-slide').eq( _index ).addClass($activeClass).siblings('.swiper-slide').removeClass($activeClass);
                        }
                        else{
                            let _pathname = window.location.href;
                            _f_menu.find('.swiper-slide[href="'+_pathname+'"]').addClass($activeClass);
                        }

                        //console.log( 'index = ',  $(_f_menu).find(`.swiper-slide.${$activeClass}`).index() );
                        try{
                            if(pSwiper !== undefined ){
                                let _tab_index = $(_f_menu).find(`.swiper-slide.${$activeClass}`).index();

                                if(_tab_index > -1 ){
                                    pSwiper.slideTo( _tab_index );
                                }
                                else{
                                    pSwiper.slideTo( 0 );
                                }
                            }
                        } catch(error) {}				
                    }
                },
                ...swiperOptions,
            }
        });
    }

    $.fn.cnStickyBar = function(options={}) {
        return this.each(function(){
            const {mode='top', target, progress=false, onScroll=function(){}, activeClass=$activeClass, offset=true} = options;
            const This = $(this);
            const Height = This.outerHeight() + 1
            This.addClass('cn-stickybar')

            const scrollEl = target ? $(target) : $(window);
            const scrollClickEl = target ? $(target) : $('html, body');

            This.find('*[data-target]').on('click', function(){
                const scrollTop = scrollClickEl.scrollTop();
                const navTarget = $($(this).data('target'));
                if(navTarget.length > 0){
                    let scrollOffset = Height;

                    if(offset === false || mode == 'bottom'){
                        scrollOffset = 0;
                    }else if(Number.isInteger(offset)){
                        scrollOffset = (offset * -1);
                    }

                    const navTargetTop = target ? (navTarget.position().top + scrollTop) - scrollOffset : navTarget.offset().top - scrollOffset;

                    scrollClickEl.stop().animate({
                        scrollTop: navTargetTop + 1
                    }, 300);
                }               
            });

            scrollEl.on('scroll', function(){
                const barTop = target ? This.position().top : This.offset().top;
                const scrollTop = scrollEl.scrollTop();
                let match = false;

                if(mode === 'top'){
                    if(scrollTop >= barTop){
                        match = true;
                        This.addClass(activeClass)
                    }else{
                        match = false;
                        This.removeClass(activeClass)
                    }
                }
                
                This.find('*[data-target]').each(function(){
                    const navTarget = $($(this).data('target'));
                    const first = $(this).data('first');
                    if(navTarget.length > 0){
                        const navTargetTop = target ? (navTarget.position().top + scrollTop) - Height : navTarget.offset().top - Height;
                        const navTargetHeight = Math.max(navTarget.height() || 0, navTarget.innerHeight() || 0)
                        const and = progress ? true : scrollTop < navTargetTop + navTargetHeight;
                        if(first && scrollTop <= navTargetTop){
                            // empty
                        }else if(scrollTop >= navTargetTop && and){
                            $(this).addClass(activeClass)
                        }else{
                            $(this).removeClass(activeClass)
                        }
                    }
                });

                onScroll(This, match);
            });
        })
    }

	$.fn.cnSlider = function(options={}) {
        if (this.length === 0) {
            return this;
        }
        
        el = this;
		let slides_class = [];
		const {pager=false, controls=false, controlsClassName=null, pagerClassName=null, swiperOptions={}, nav, navOptions={}, thumbOptions={}, returnAll=false} = options;

        const prevControlClassName = controlsClassName ? ' ' + controlsClassName.trim() + '-prev' + ' ' + controlsClassName : ''
        const nextControlClassName = controlsClassName ? ' ' + controlsClassName.trim() + '-next' + ' ' + controlsClassName : ''
        const controlEl = controls || swiperOptions?.pagination ? `<div class="swiper-button-prev${prevControlClassName}"></div><div class="swiper-button-next${nextControlClassName}"></div>` : '';
        const pagerEl = pager || swiperOptions?.navigation ? `<div class="swiper-pagination ${pagerClassName}"></div>` : '';
        this.each(function(pIndex){
            const This = $(this);
            const className = $(this).attr('class') || $(this).attr('id');
            const classNames = className ? className.split(' ') : [];

			//console.log( className, classNames );

			slides_class.push(classNames);
        

            let sliderEl = This.wrap(`<div class="swiper instance-${pIndex} ${className || ''}">`).attr('class', 'swiper-wrapper').find('> *').addClass('swiper-slide');  
            sliderEl.parent().parent().append(controlEl).append(pagerEl)
		});

		const _newArray2 = [].concat(...slides_class);
		const _duplicates = [...new Set(_newArray2.filter((item, index) => _newArray2.indexOf(item) !== index))];

        //console.log(_duplicates)

		if(_duplicates.length < 1){ // 단일
			//console.log('단일 : ', _newArray2.join(' '));
			_slide_class = _newArray2.join('.');
		}
		else{
			//console.log('중복 : ', _duplicates.join(' '), _duplicates.length); 
			_slide_class = _duplicates.join('.');
		}

		let slide_nav;
		if(nav){
			const navEl = $(nav);
			const navLength = navEl.find('> *').length;
			const navClassName = navEl.attr('class') || navEl.attr('id')
			navEl.wrap(`<div class="swiper ${navClassName}">`).attr('class', 'swiper-wrapper').find('> *').addClass('swiper-slide')
			slide_nav = new Swiper(nav, {
				loop: false,
				slidesPerView: navLength,
				...navOptions
			});      
		}

		//console.log('_slide_class = ', _slide_class, $(`.${_slide_class}`).length, $.type( _slide_class));

		let slide = new Swiper('.'+_slide_class , {
			thumbs: slide_nav ? {
				swiper: slide_nav,
				slideThumbActiveClass: $activeClass,
				autoScrollOffset: 2,
                ...thumbOptions
			} : {},
			allowTouchMove: slide_nav ? false : true,
            pagination: pager ? {
                el: '.swiper-pagination',
                clickable: true,
            } : {},
            navigation: (swiperOptions?.pagination || controls) ? {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',

            } : false,
            ...swiperOptions,
            on: {
                observerUpdate: function(swiper){
                    if(swiper.el.closest('.cn-tab .active')){
                        swiper.slideTo(0, 0);
                    }
                },
                ...swiperOptions.on
            }
			
		});

        if(returnAll){
            return {'slide': slide, 'nav': slide_nav};
        }else{
            return slide;
        }
    }

    $.fn.cnModal = function(options={}) {
        const optionMode = ['default', 'fade', 'scale'];
        let {mode="scale", modalTarget, modalType, head=true, close=true, isBeforeAllClose=false, closeOutside=true, responsive=false, verticalCenter=true, bodyColor, onBeforeOpen=function(){}, onOpen=function(){}, onClose=function(){}, pcOnly=false} = options;
        let closeBtn;

        if (this.length === 0) {
            return this;
        }

        el = this;

        function modalClose(modal){
            if(modal.hasClass('active')){
                const modalLength = $('.cn-modal.active').length;
                modal.removeClass($activeClass);
                modal.css('z-index', '');
    
                if(modalLength === 1){
                    $('body').removeClass('cn-scroll-block').removeClass('cn-scroll-block-2').removeClass('cn-scroll-block-3');
                }
    
                if(modal.hasClass('cn-movie-modal') || modal.attr('id') == 'cn-movie-modal'){
                    setTimeout(function(){
                        $('.cn-movie-modal .cn-modal-body, #cn-movie-modal .cn-modal-body').html('');
                    }, 200);
                }

                onClose(el);
            }
        }

        function modalOpen(This, modal, responsive, responsive, modelNext){
            if(isMobile() && !responsive && !responsive && !pcOnly){
                modal.addClass('cn-modal-mobile');
            }
            if(responsive) {
                modal.addClass('cn-modal-responsive');
            }

            if(isBeforeAllClose){ // 현재 모달 열기 전에 다른 모달 전체 닫기
                $('.cn-modal').trigger('click');
            }

            let opMode = optionMode.includes(mode) ? mode : undefined;
            let movie = This.data('movie');
            let image = This.data('image');
            if(modal.length > 0){
                const modalLength = $('.cn-modal.active').length
                if(modalLength > 0){
                    modal.css('z-index', modalLength + 101);
                }

                let next = true
                if(modelNext != false){
                    next = onBeforeOpen(This, modal);
                }

                if(next !== false || modelNext === true){
                    if(movie || image){
                        let _movieData;
                        let _movieId = This.data('movie');
                        let _movieTitle = This.data('title');
                        if(_movieId || image){
                            if(image){
                                _movieData = `<div class="cn-modal-image"><img src="${image}" alt="팝업 이미지" /></div>`
                            }else{
                                _movieId = _movieId.replace('http://pmp.st-company.net/', 'https://d2j2rcmrtco9nl.cloudfront.net/');
                                const _autoplay = This.data('autoplay') && This.data('autoplay') == true ? 'autoplay' : '';
                                const _movieType = (_movieId.indexOf('.mp4') != -1) ? 'video' : 'iframe';

                                // console.log( This.data('muted') );

                                const _muted = !(This.data('muted')) && This.data('muted') == false ? '' : ' muted="muted"';
                
                                if(_movieType == 'iframe') {
                                    if(isMobile()){
                                        _movieData = '<iframe id="moviePlayer" width="100%" height="250" src="' + _movieId + '" clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
                                    } else {
                                        _movieData = '<iframe id="moviePlayer" width="750" height="450" src="' + _movieId + '" clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
                                    }
                                } else {
                                    _movieData = '<video width="750" height="450" controls controlsList="nodownload" playsinline loop '+_autoplay+_muted+'>' +
                                    '   <source src="' + _movieId + '" type="video/mp4" id="moviePlayer" />' +
                                    '</video>';
                                }
                            }

                            //console.log('modal == ', modal);
                            //console.log('el == ', el);
                            //modal.modalTitle(_movieTitle);
                            //modal.html('<div style="background: #000;">' + _movieData + '</div>');
                            
                            //modal.find('.cn-modal-head > strong').text(_movieTitle);
                            
                            
                            modal.find('.cn-modal-body').append('<div style="background: #000;">' + _movieData + '</div>');

                            if(!head && close && !isMobile()){
                                if(modal.find('.cn-modal-body .cn-modal-close').length < 1){
                                    modal.find('.cn-modal-body').prepend(closeBtn);
                                    modal.find('.cn-modal-body .cn-modal-close').on('click', function(e){
                                        modalClose(modal);
                                    });
                                }
                                modal.find('.cn-modal-body .cn-modal-close').css({width:'24px', height:'24px', 'line-height':'24px', top:'-30px'});
                            }
                        }
                    }

                    let _val_tit = This.data('title');
                    if(_val_tit){
                        //console.log("This.data('title')", This.data('title'), typeof(_val_tit));
                        modal.find('.cn-modal-head > strong').text(_val_tit);
                    }
                    else{
                        if(head && typeof(head) !== 'boolean'){
                            modal.find('.cn-modal-head > strong').text(head);
                        }
                    }

                    const userAgent = window.navigator.userAgent.toLowerCase();
                    const platform = (navigator.userAgentData?.platform || navigator.platform)?.toLowerCase();
                    const scrollbarWidth = getScrollbarWidth();
                    let addedBodyClassName = 'cn-scroll-block';
                    if(document.documentElement.clientHeight >= document.documentElement.scrollHeight || isMobile()){
                        addedBodyClassName = 'cn-scroll-block';
                    }else if((platform === 'windows' && userAgent.indexOf('chrome') > -1 && userAgent.indexOf('whale') === -1) || scrollbarWidth > 0){
                        addedBodyClassName = 'cn-scroll-block-2'
                    }

                    $('body').addClass(addedBodyClassName)
                    modal.addClass(opMode ? 'cn-modal-'+mode : '');

                    setTimeout(() => {
                        modal.addClass($activeClass);
                        onOpen(This, modal)
                    }, 50);
                }

            }else{
                console.warn('지정된 모달이 없습니다 아래 문서를 확인해주세요.',  '\n', 'https://mgong.conects.com/pub/document/modal')
            }
        }

		if(modalType === 'video'){
			//console.log('동영상', modalTarget, modalTarget.indexOf('.'), modalTarget.substr(1) );
		
			$('body').append( '<div '+ (modalTarget.indexOf('.') > -1 ? 'class' : 'id') +'="'+ modalTarget.substr(1) +'"><div class="modal_content"></div></div>' );
		}

        this.each(function(){
            const This = $(this);

            let modal = $('.'+This.data('target')).length > 0 ? $('.'+This.data('target')) : $('#'+This.data('target'));
			closeBtn = close ? `<a href="javascript:;" class="cn-modal-close"><i class="ico ico_close"></i></a>` : '';

            if(modalTarget){
                modal = $(modalTarget);
            }
            if(!modal.hasClass('cn-modal')){
                if(verticalCenter){
                    modal.addClass('cn-modal').append('<span class="cn-modal-span"></span>').find('> div').wrap('<div class="cn-modal-main"></div>').addClass('cn-modal-body');
                }else{
                    modal.addClass('cn-modal').find('> div').wrap('<div class="cn-modal-main"></div>').addClass('cn-modal-body');
                }
                if (bodyColor) {
                    modal.css({'background': bodyColor});
                }
                if(head && (!isMobile() || responsive)){
                    modal.find('.cn-modal-main').prepend('<div class="cn-modal-head"><strong class="txt_hide">'+ (typeof(head) === 'boolean' ? '' : head) +'</strong>' + closeBtn + '</div>');
                }else{
                    if(isMobile()){
                        // modal.addClass('.cn-modal-')
                        let mobileHead = head ? `<div class="cn-modal-head cn-modal-head-mobile"><strong>${head}</strong><a href="javascript:;" class="cn-modal-close"><i class="ico ico_close"></i></a></div>` : '';
                        modal.prepend(head ? mobileHead : closeBtn);
                    }else{
                        modal.find('.cn-modal-body').prepend(closeBtn);
                    }
                }
            }
            modal.appendTo('body');

            $(document).keyup(function(e) {
                if (e.key === "Escape" && modal && modal.hasClass($activeClass)) {
                    modalClose(modal);
                }
            });
                
            // 모달 오픈
            This.unbind('click').bind('click', function(){
                modalOpen(This, modal, responsive, responsive, ); 
            });

            modal.on('click', function(){
                if(closeOutside && (!isMobile() || pcOnly)){
                    modalClose(modal)
                }
            }).children().click(function(e) {
                // return false;

                // 활성화된 드롭다운 닫기
                let dropdown = $('.cn-dropdown.active').attr('data-cn-dropdown');
                $(`.cn-dropdown-btn[data-dropdown=${dropdown}]`).removeClass('active').removeClass('hover');
                $(".cn-dropdown:not(.cn-not-close)").removeClass($activeClass);
                e.stopPropagation();
            });

            modal.find('.cn-modal-close').on('click', function(){
                modalClose(modal)
            });

        });

        let modal = $('.'+el.data('target')).length > 0 ? $('.'+el.data('target')) : $('#'+el.data('target'));
        if(modalTarget){
            modal = $(modalTarget);
        }
        this.html = function(html){
            if(modal){
                modal.find('.cn-modal-body').html(html);
            }

            return false;
        }

        this.close = function(){
            if(modal){
                if(modalTarget){
                    modal = $(modalTarget);
                }

                modalClose(modal)
            }

            return false;
        }

        this.open = function(beforeOpen=false){
            if(modal){
                if(modalTarget){
                    modal = $(modalTarget);
                }
                
                modalOpen($(this), modal, responsive, responsive, beforeOpen); 
            }

            return false;
        }

        this.modalMode = function(opMode){
            if(!opMode){
                return mode;
            }else{

                if(modal){
                    for(mo of optionMode){
                        modal.removeClass('cn-modal-'+mo);
                    }
                    modal.addClass('cn-modal-'+opMode);
                    mode = opMode
                }

                return false;
            }
        }

        this.modalTitle = function(title){
            if(title === false){
                modal.find('.cn-modal-head').hide();
                return false;
            }else if(modal){
                modal.find('.cn-modal-head').show();
                modal.find('.cn-modal-head > strong').text(title);
                head = title;
            }

            return false;
        }

        return this;
    }

    $.fn.cnDropdown = function(options={}) {
        
        if (this.length === 0) {
            return this;
        }
        
        el = this;
        const dropdownBtn = this
        
        this.each(function(){
            let {mode='click', width=94, align='right', visible=false, autoMenuClose=true, offset={x: 2, y: 4}, closeOutside=true, onMenuClick=function(){}, menuEvent=true} = options;
            let dropdownOffset = {
                x: offset.x || mode == 'hover' ? 0 : 2,
                y: offset.y || 4,
            }
            const body = $('body');
            const This = $(this);

            const dropdownClassName = This.data('dropdown');

            let dropdown, dropdownClone;

            if($(`.${dropdownClassName}.cn-dropdown`).length > 0){
                dropdownClone = $(`.${dropdownClassName}.cn-dropdown`);
            }else{
                dropdown = $('.'+dropdownClassName).length > 0 ? $('.'+dropdownClassName) : $('#'+dropdownClassName);
                dropdownClone = dropdown.addClass(dropdownClassName).addClass('cn-dropdown').attr('data-cn-dropdown', dropdownClassName).clone();
                if(width != 'auto'){
                    dropdownClone.css({ width });
                }
                dropdown.remove();
            }
            
            body.append(dropdownClone);

            function dropdownClose(){
                dropdownClone.removeClass($activeClass);
                This.removeClass($activeClass).removeClass('hover');
            }

            dropdownClone.addClass('cn-dropdown');
            if(closeOutside===false){
                dropdownClone.addClass('cn-not-close');
            }

            This.addClass('cn-dropdown-btn'); 


            This.on(mode == 'hover' ? 'mouseover' : 'click', function(e){
                e.stopPropagation();
                
                if(!This.hasClass($activeClass)){
                    $(".cn-dropdown:not(.cn-not-close)").removeClass($activeClass);
                    $(".cn-dropdown-btn").removeClass($activeClass);
                }
                // $(".cn-dropdown:not(.cn-not-close)").removeClass($activeClass);

                const btnOffset = This.offset();
                const btnWidth = This.outerWidth();
                const btnHeight = This.outerHeight();
                const dropdownHeight = dropdownClone.outerHeight();
                const dropdownBottom = btnOffset.top + btnHeight + dropdownHeight + dropdownOffset.y;
                const scrollBottom = $(window).scrollTop() + window.innerHeight;
                const overflow = scrollBottom < dropdownBottom;

                dropdownClone.css({
                    top: overflow ? btnOffset.top - dropdownHeight - dropdownOffset.y : btnOffset.top + btnHeight + dropdownOffset.y,
                    // left: align == 'right' ? btnOffset.left + btnWidth - dropdownOffset.x - width : (btnOffset.left + dropdownOffset.x),
                    left: align == 'right' ? btnOffset.left + btnWidth - dropdownOffset.x - dropdownClone.outerWidth() : (btnOffset.left + dropdownOffset.x),
                    width: width == 'auto' ? This.outerWidth() : width
                });

                if(mode == 'hover'){
                    dropdownClone.addClass($activeClass);
                    This.addClass($activeClass);
                    This.addClass('hover');
                }else{
                    dropdownClone.toggleClass($activeClass);
                    This.toggleClass($activeClass);
                }

				if( This.hasClass($activeClass) ){
					dropdownClone.one('click', 'li', function(e){
                        if(menuEvent != false){
                            e.stopPropagation();
                            //console.log('This', This);						
                            const _index = $(this).index() + 1;
                            onMenuClick($(this), _index, This);
                            
                            This.addClass('cn-dropdown-selected');
                            if(autoMenuClose){
                                dropdownClose();
                                return false;
                            }
                        }
					});
				}
            })

            // hover
            if(mode == 'hover'){
                const btnOffset = This.offset();
                const btnHeight = This.outerHeight();
                const dropdownHeight = dropdownClone.outerHeight();
                const dropdownBottom = btnOffset.top + btnHeight + dropdownHeight + dropdownOffset.y;
                const scrollBottom = $(window).scrollTop() + window.innerHeight;
                const overflow = scrollBottom < dropdownBottom;

                if(el.length > 1){
                    console.error('[cnDropdown] Hover 모드 사용시 버튼은 하나만 지정해야합니다.', el)
                }else{
                    $(document).on('mousemove', function(e){
                        if(dropdownClone.hasClass('active')){
                            const min = {x: This.offset().left, y: Math.floor((This.offset().top) - $(window).scrollTop() - (overflow ? 30 : 0))};
                            const max = {x: This.offset().left + This.width(), y: (This.offset().top + This.height()) - $(window).scrollTop()};
                            const min2 = {x: dropdownClone.offset().left, y: Math.floor((dropdownClone.offset().top) - $(window).scrollTop() - dropdownOffset.y)};
                            const max2 = {x: dropdownClone.offset().left + dropdownClone.width(), y: (dropdownClone.offset().top + dropdownClone.height()) - $(window).scrollTop()};
        
                            if((e.clientX >= min.x && e.clientY >= min.y) && (e.clientX < max.x && e.clientY < max.y) || (e.clientX >= min2.x && e.clientY >= min2.y) && (e.clientX < max2.x && e.clientY < max2.y)){
                                This.addClass('hover');
                            }else{
                                dropdownClose();
                            }
                        }
                    })
                }
            }
        });

        $(document).click(function(){
            $(".cn-dropdown:not(.cn-not-close)").removeClass($activeClass);
            $(el).removeClass($activeClass).removeClass('hover');
            $(dropdownBtn).removeClass($activeClass);
        });

        return this;
    }

    $.fn.cnQuick = function(options={}) {
        
        if (this.length === 0) {
            return this;
        }
        
        el = this;
        
        // 스크롤 배너
        $(window).on("scroll",function(){
            var scTop=$(this).scrollTop();
            var cont_h = $('.cont_top').offset();
            var ban_sky = $(".cont_ban");
            if(scTop >= cont_h.top){
                ban_sky.stop().animate({top:scTop+"px"},400);
            }else{
                ban_sky.stop().animate({top:'242px'});
            }
            
        });

        this.each(function(){
            let {visible=false, autoMenuClose=true, offset={x: 2, y: 7}, onMenuClick=function(){}} = options;
            const body = $('body');
            const This = $(this);
            const dropdown = $('.'+This.data('dropdown')).length > 0 ? $('.'+This.data('dropdown')) : $('#'+This.data('dropdown'));
            const dropdownClone = dropdown.addClass('cn-dropdown').clone();
            dropdown.remove()
            
            body.append(dropdownClone)
            function dropdownClose(){
                dropdownClone.removeClass($activeClass);
                body.removeClass('cn-dropdown-opened')
            }

            function dropdownOpen(){
                dropdownClone.addClass($activeClass);
            }

            dropdown.addClass('cn-dropdown')

            This.on('click', function(e){
                e.stopPropagation();
                const btnOffset = This.offset();
                const btnWidth = This.width();
                const btnHeight = This.outerHeight();

                dropdownClone.css({
                    top: btnOffset.top + btnHeight + offset.y,
                    left: btnOffset.left + btnWidth - offset.x - 94,
                })

                body.toggleClass('cn-dropdown-opened')
                dropdownClone.toggleClass($activeClass);
            })

            dropdownClone.find('li').on('click', function(e){
                e.stopPropagation();
                if(autoMenuClose){
                    dropdownClose()
                }
                
                const index = $(this).index() + 1;
                onMenuClick(index)
            })

        });

        // const modal = $('.'+el.data('target')).length > 0 ? $('.'+el.data('target')) : $('#'+el.data('target'));
        return this;
    }

    $.fn.cnScroll = function(options={}) {
        if (this.length === 0) {
            return this;
        }
        
        el = this;
        this.each(function(){
            let {once=false, targetClass, activeClass=$activeClass, delay=2, onScroll=function(){}} = options;
            
            $(this).addClass('cn-scroll-box').on('scroll', function(e){
                const scrollTop = $(this).scrollTop();
                const target = $(this).prop('tagName') ? true : false;
                const scrollEl = target ? $(this) : $(document)
                const targetHeight = target ? (scrollEl.height() || scrollEl.innerHeight()) : document.documentElement.clientHeight
                const top = scrollTop + (targetHeight / delay)
                scrollEl.find('.'+targetClass).each(function(){
                    const This = $(this)
                    var offsetTop = target ? This.position().top + scrollTop : This.offset().top;

                    if(top > offsetTop){
                        This.addClass(activeClass);
                        onScroll(This, 1);
                    }else if(!This.data('once') && once === false){
                        This.removeClass(activeClass);
                        onScroll(This, 0);
                    }
                })
            })

        });
        
        return this;
    }

	$.fn.cnAniCounter = function(options={}) {
		const { countClass, speed, exclude } = options;
		const _this = $(this);
		const _count_class = (countClass ? countClass : '.ani_count');
		const _count_speed = (speed > 0 ? speed : 1000);
		const _exclude = (exclude > 0 ? 1*exclude : 1);

		_this.find(_count_class).each(function () {
			let _count_num = $(this).data('num');
			let _start_num = $(this).data('start');
			_count_num = ( !(_count_num % 1 === 0) ? Math.min(_count_num).toFixed(_exclude) : _count_num )
			//console.log( _count_num, Math.min(_count_num).toFixed(1));

			$(this).prop('Counter', _start_num ? Number(_start_num) : 0).stop().animate({
				Counter: _count_num
			}, {
				duration: _count_speed,
				easing: 'swing',
				step: function (pNow) {
					if(!(_count_num % 1 === 0) ){
						$(this).text(Math.min(pNow).toFixed(_exclude).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
					}else{
						$(this).text(Math.floor(pNow).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
					}
				}
			});
		});
	}

    $.fn.cnStickyMsg = function(options={}) {
        const {strMsg=null, strBtnTxt=null, onClickClose=function(){}, intHideTime='2000', strShowType='', strBottom=null} = options;
        let setHideMsg, setHideMsg02;

        //const settings = $.extend({}, defaults, options);
        let _$parent = this;
        if(_$parent.is('body')){
            _$parent = $('.footer-sticky .sticky-conts');
        }

        function _fnClose(pMsg){
            setHideMsg = setTimeout(() => {
                pMsg.toggleClass('active hide');

                setHideMsg02 = setTimeout(() => {
                    $('.sticky-bottom-msg').remove();

                    clearTimeout(setHideMsg);
                    clearTimeout(setHideMsg02);
                }, 10);
            }, intHideTime);
        }

        return this.each(function() {
            $('.sticky-bottom-msg').remove();
            
            let _html = `<div class="sticky-bottom-msg${strBtnTxt != null ? ' _btn' : ''}">${strMsg}${strBtnTxt != null ? '<button type="button" class="sticky-msg-btn">'+strBtnTxt+'</button>' : ''}</div>`;

            let _$msg = null;

            _$parent.append(_html);
            _$msg = _$parent.find('.sticky-bottom-msg');

            if(strBottom != null){
                // console.log('strBottom', strBottom);
                _$msg.css('margin-bottom', strBottom);
            }

            _$msg.addClass('active');

            if(strShowType != ''){
                _$msg.addClass('_ani');
            }

            _fnClose(_$msg);


            if(strBtnTxt != null){
                // 닫기 버튼 클릭 이벤트 처리
                _$msg.on('click', '.sticky-msg-btn', function(e) {
                    e.stopPropagation();
                    onClickClose(this, _$parent);

                    _fnClose(_$msg);
                });
            }
        });
    }

    $.fn.cnBottomModal = function(options={}) {
        const {strModalTit='타이틀', customModalClass="", strBtnTxt='적용', modalBody, customBtnClass, position='bottom', headVisible=true, btnVisible=true, onClickBtn=function(){}, onBeforeOpen=function(){}, onOpenEvent=function(){}, onCloseEvent=function(){}, toggleMode=false, onResetBtn=function(){}} = options;

        el = this;
        let _click_btn = this;

        //console.log('_click_btn', _click_btn );
        
        // 페이지 로드 및 창 크기 변경 이벤트 리스너 등록
        function controlScroll(modal) {
            function _fnRemToPx(pRen){
                const _rootFontSize = parseFloat($('html').css('font-size'));
                return (pRen * _rootFontSize);
            }
        
            let windowHeight = $(window).height(); // 윈도우 높이
            let maxModalBodyHeight = ( windowHeight - _fnRemToPx(8) ); // 흰색 박스가 생길 수 있는 최대 높이
            let scrollContsHeight = modal.find('.modal-conts-area .modal-scroll > .scroll-height').outerHeight();// 스크롤바 안에 실질 내용 높이
            let bodyHeight = modal.find('.modal-body').height();
            let bodyHeightMax = modal.find('.modal-body').outerHeight();
            let bodyPadding = bodyHeightMax - bodyHeight;
            let modalHeadHeight = modal.find('.modal-head-area').height();
            let modalBtnHeight = modal.find('.modal-conts-area .modal-btn-area').outerHeight();
            let nowModalContsheight = bodyHeight - modalHeadHeight - modalBtnHeight; //현재 계산된 높이
            let maxModalContsHeight = maxModalBodyHeight - bodyPadding - modalHeadHeight - modalBtnHeight;// 흰색 박스가 생길 수 있는 최대 높이 안에서 스크롤바가 생길 수 있는 최대 높이
        
            if(scrollContsHeight >= maxModalContsHeight){ // 스크롤이 최대 높이 보다 높으면 최대로 맞춤
                modal.find('.modal-conts-area .modal-scroll').height(maxModalContsHeight);
            }
            else{
                if(scrollContsHeight > nowModalContsheight){ // 계산된 높이가 실질적인 높이보다 작을 때
                    modal.find('.modal-conts-area .modal-scroll').height(scrollContsHeight);
                }
            }
        }

        function modalClose(modal){
            // if(e.target.tagName.toLowerCase() === 'a'){
            //     e.preventDefault();
            // }

            $(window).off('resize.modalResize');
            $('body').removeClass('modal-bottom-no-scroll');
            
            // modal.removeClass('action');
            modal.find('.modal-body').removeClass('show').addClass('hide');
            setTimeout(function() { modal.removeClass('action'); }, 300);

            onCloseEvent();
        }

        function modalOpen(e, modal){
            $(window).on('resize.modalResize', function() {
                controlScroll(modal);
            });

            $('body').addClass('modal-bottom-no-scroll');
            
            //modal.addClass('action');
            modal.addClass('action').find('.modal-body').removeClass('hide').addClass('show');
    
            controlScroll(modal);
            onOpenEvent(modal, _click_btn);
        }

        let _modalHtml;
        if($(`${modalBody}.modal-bottom-wrap`).length){
            _modalHtml = $(`${modalBody}.modal-bottom-wrap`);
        }else{
            let _modalBody = $(`${modalBody}:not(.modal-bottom-wrap)`);
            const _modalHead = headVisible ? `
                <div class="modal-head-area">
                    <h1 class="tit txt_hide">${el.data('tit') || strModalTit}</h1>
                    <a href="javascript:;" class="ico ico_close cn-modal-close">닫기</a>
                </div>
            ` : '';

            let _modalBottom = '';
            let _customBtn = '';
            if(btnVisible){
                _modalBottom = $(`
                    <div class="modal-btn-area">
                        <button type="button" class="btn-l _color_blue _fill cn-modal-submit">${strBtnTxt}</button>
                    </div>
                `)

                _customBtn = $(customBtnClass);
                if(customBtnClass && _customBtn.length){
                    _modalBottom = _customBtn.wrap('<div class="modal-btn-area"></div>').parent();
                }

                _modalBottom = _modalBottom.prop('outerHTML');
            }

            if(_modalBody.length){
                // 기존 모달 숨김
                _modalBody.css('display', 'block')

                // 모달 HTML 생성
                _modalHtml = $(`
                    <div class="${position == 'bottom' ? 'modal-bottom-wrap' : 'modal-bottom-wrap __type_top'} ${_modalBody.attr('class')}" >
                        <div class="modal-body ${customModalClass}">
                            ${_modalHead}
                            <div class="modal-conts-area">
                                <div class="modal-scroll"><div class="scroll-height">${_modalBody.prop('outerHTML')}</div></div>
                                ${_modalBottom}
                            </div>
                        </div>
                    </div>
                `);
                _modalHtml.appendTo('body');
                _modalBody.remove();
                if(customBtnClass && _customBtn.length && btnVisible){
                    _customBtn?.parent().remove();
                }
            }
        }

        
        let visible = false;
        
        el.click(function(e){
            const next = onBeforeOpen($(el), _modalHtml);
            
            if(next !== false){
                if(toggleMode){
                    if(visible){
                        modalClose(_modalHtml);
                        visible = false;
                    }else{
                        modalOpen(e, _modalHtml);
                        visible = true;
                    }
                }else{
                    modalOpen(e, _modalHtml)
                }
            }
            
        });       

        _modalHtml.on('click', function(){
            modalClose(_modalHtml)
        }).children().click(function(e) {
            // return false;
            e.stopPropagation();
        });

        _modalHtml.find('.cn-modal-close').click(function(e){
            modalClose(_modalHtml);
            onCloseEvent();
        });

        //if(!customBtnClass){
        if(_modalHtml.find('.cn-modal-submit').length > 0){
            _modalHtml.find('.cn-modal-submit').click(() => onClickBtn(_modalHtml, _click_btn, _modalHtml.find('.modal-btn-area') ));
        }

        //if(!customBtnClass){
        if(_modalHtml.find('.cn-modal-reset').length > 0){
            _modalHtml.find('.cn-modal-reset').click(() => onResetBtn(_modalHtml, _click_btn, _modalHtml.find('.modal-btn-area') ));
        }

        el.open = function(){
            modalOpen(el, _modalHtml);
        }

        el.close = function(){
            modalClose(_modalHtml);
        }

        return this;
    }    
})(jQuery);

// 영역 이동
function goPage(el, parent, offset=0) {
    const scrollEl = $(parent ? parent : 'html, body');
    const _el = $(el ? el : 'body');
    scrollEl.stop().animate({
        scrollTop: parent ? ($(_el).position().top + $(parent).scrollTop()) - offset : $(_el).offset().top - offset
    }, 300);
    return false;
};

/* 전체 클릭 체크 */
function fnFilterAllClick(pModal){
    if( pModal.find('[data-type="all"]').length > 0 ){
        pModal.find('[data-type="all"]').each(function(pIndex, pEl){
            //console.log( $(pEl).closest('.label-box').find('input:not([data-type="all"]):checked').length )
            if( $(pEl).closest('.label-box').find('input:not([data-type="all"]):checked').length < 1){ 
                $(pEl).closest('.label-box').find('input').prop('checked', $(pEl).prop('checked'));
            }

            $(pEl).on('change', function() {
                $(pEl).closest('.label-box').find('input').prop('checked', $(pEl).prop('checked'));
            });
            
            $(pEl).closest('.label-box').find('input').on('change', function() {
                if (!$(this).prop('checked')) {
                    $(pEl).prop('checked', false);
                }

                $(pEl).prop('checked', $(pEl).closest('.label-box').find('input:not([data-type="all"]):checked').length === $(pEl).closest('.label-box').find('input:not([data-type="all"])').length);
            });
        });
    }
}
//필터 설정 초기화
function fnInitFilter(pModal, pClickBtn){
    // 에러 메시지 초기화
    pModal.find('.label-group-box :input').on('change', function(){
        $(this).closest('.label-group-box').removeClass('_error');
    });

    let _tab_obj = null;

    // 탭 적용
    if(pModal.find('.tab-nav._bar').length > 0){
        pModal.find('.tab-nav._bar').cnTab({
            useConts:'N',
            onClick: function(pEl, pIndex, tabs){
                _tab_obj = $(pEl).closest('.tab-nav-group');
                _tab_obj.find('.tab-nav-wrap').eq(pIndex).addClass('active').siblings('.tab-nav-wrap').removeClass('active');
            }
        });
    }

    pClickBtn.filter(`[data-dim-filter]`).each(function(){
        //console.log( '이것은 바뀐거', $(this).data('change') );

        let _filter_var = $(this).data('dim-filter');
        let _change_arr = (($(this).data('change') !== '') ? $(this).data('change').split('||') : $(this).data('default').split('||') );
        let _filter_obj = pModal.find(`.modal_col [data-dim-filter="${_filter_var}"]`); // 모달 옵션 섹션 (.label-group-box)

        if( _filter_obj.length > 0 ){
            _filter_obj.find('input').prop('checked', false);

            //console.log('_filter_obj',  _filter_obj );
            let _tab_index = -1;

            $(_change_arr).each(function(_pIndex, _pEl){
                _filter_obj.find('.label-check').filter(function() {
                    if( $(this).text().trim() === _pEl.trim() ){
                        $(this).find('input').prop('checked', true);
                    }
                });
            });

            let _label_box = _filter_obj.find('.label-box');

            if(_filter_obj.find('.tab-nav').length > 0 && _filter_obj.find('input:not([data-type="all"]):checked').length > 0){ //탭 이면서 클릭된 옵션 있음

                let _tab_index = _filter_obj.find('.tab-nav-wrap').index( _filter_obj.find('input:not([data-type="all"]):checked').closest('.tab-nav-wrap') );
                //console.log ('index ',   _tab_index);
                _filter_obj.find('.tab-nav-wrap').removeClass('active').eq(_tab_index).addClass('active');
                _filter_obj.find('.tab-nav > *').removeClass('active').eq(_tab_index).addClass('active');
            }

            $(_label_box).find('[data-type="all"]').prop('checked', $(_label_box).find('input:not([data-type="all"]):checked').length === $(_label_box).find('input:not([data-type="all"])').length);
        }
    });

    fnFilterAllClick(pModal);
}
//필터 설정 적용
function fnSetFilter(pModal, pClickBtn){
    let _is_checked = true;
    let _is_changed = false;
    pModal.find('.label-group-box:is([data-required="Y"])').each(function(_pIndex, _pEl){
        /* 필수 옵션 선택 안한거 체크 후 에러 메세지 */
        if ( $(_pEl).find(':input:checked').length <= 0){
            _is_checked = false;
            $(_pEl).addClass('_error');
            return false;
        }
    });

    if(_is_checked){ // 필수옵션 선택여부 체크 되었음
        pModal.find('.label-group-box').each(function(_pIndex, _pEl){
            let _label_txt = _change_txt = '';

            let _filter_var = $(_pEl).data('dim-filter');
            let _filter_obj = pClickBtn.filter(`button[data-dim-filter="${_filter_var}"]`);

            if($(_pEl).find(':input:not([data-type="all"]):checked').length > 0){ //선택된 옵션이 있음

                if($(_pEl).find(':input:not([data-type="all"]):checked').length == 1){
                    let _input = $(_pEl).find(':input:checked');
                    _label_txt = _change_txt = _input.next().text();
                }
                else{
                    let _input = $(_pEl).find(':input:not([data-type="all"]):checked').eq(0);
                    if($(_pEl).find('input[data-type="all"]:checked').length){ // 전체 선택했을 경우
                        _label_txt = '전체';
                    }else{
                        _label_txt = _input.next().text() + ' 외' + ( $(_pEl).find(':input:not([data-type="all"]):checked').length -1 );
                    }

                    let _text_array = $(_pEl).find(':input:not([data-type="all"]):checked + div').map(function() {
                        return $(this).text();
                    }).get();

                    _change_txt = _text_array.join('||');
                }

                if( _filter_obj.data('change') !== '' ){ // 이미 바뀜
                    _filter_obj.addClass('selected').find('span').text(_label_txt);
                    _filter_obj.data('change', _change_txt);
                    _is_changed = true;

                } else { // 처음 선택
                    if( _filter_obj.data('default') !== _label_txt ){ // 기본 값하고 같지 않음
                        _filter_obj.addClass('selected').find('span').text(_label_txt);
                        _filter_obj.data('change', _change_txt);
                        _is_changed = true;
                    }
                }
            }
            else{ //선택된 옵션이 없음 (리셋)
                _filter_obj.removeClass('selected').find('span').text(_filter_obj.data('default'));
                _filter_obj.data('change', '');
                _is_changed = true;
            }
        });

        //console.log(  pModal.find(':input:not([data-type="all"]):checked').length );
                            
        // 리셋 버튼 추가
        if(_is_changed && pModal.find(':input:not([data-type="all"]):checked').length > 0){
            if(!pClickBtn.closest('.tab-nav-wrap').find('button.reset').length){
                pClickBtn.closest('.tab-nav-wrap').prepend('<button type="button" class="reset"><i class="ico ico_reload"></i></button>').find('button').first()
                .on('click', function(){
                    let _tab_wrap = $(this).closest('.tab-nav-wrap');
                    fnResetFilter($( '.modal-bottom-wrap.modal_' + _tab_wrap.find('.filter-nav nav').attr('id') ), _tab_wrap, 'all');

                    $(this).remove();
                });
            }
        }

        pClickBtn.close();
    }
}

function fnResetFilter(pModal, pClickBtn, pType){
    //console.log('pType', pType, pClickBtn );
        //let _tab_wrap = pClickBtn;

    let _msg_parent = null;

    if(pType == 'all'){ // 부모창 리셋 버튼
        pClickBtn.find('[data-dim-filter]').each(function(){
            $(this).removeClass('selected').find('span').text( $(this).data('default') );
            $(this).data('change', '');

            $(this).prop('disabled', $(this).data('disabled'));
        });

        _msg_parent = $(document.body);
    }
    else{ // 모달창 리셋 버튼
        pModal.find('form')[0].reset();
        _msg_parent = pModal.find('.cn-modal-reset');

        pModal.find('.modal_col [data-dim-filter]').each(function(){
            let _filter_obj = $(this);
            if(_filter_obj.find('.tab-nav').length > 0 ){ //탭 이면서 클릭된 옵션 있음
                let _tab_index = 0;
                if(_filter_obj.find('input:not([data-type="all"]):checked').length > 0) {
                    _tab_index = _filter_obj.find('.tab-nav-wrap').index( _filter_obj.find('input:not([data-type="all"]):checked').closest('.tab-nav-wrap') );
                    //console.log ('index ',   _tab_index);
                }

                _filter_obj.find('.tab-nav-wrap').removeClass('active').eq(_tab_index).addClass('active');
                _filter_obj.find('.tab-nav > *').removeClass('active').eq(_tab_index).addClass('active');
            }
        });
    }

    // 메세지 출력
    if( _msg_parent!= null ){
        _msg_parent.cnStickyMsg({
            strShowType:'ani',
            strMsg: '초기화 되었습니다.',
        });
    }
}

// 검색 함수
function fnSearchActive(pObj){
    let _parent = pObj.closest('.tab-search-box');
    pObj.closest('._search_position, .tab-nav-wrap').css('position', 'relative');
    _parent.addClass('active');
    _parent.find('.search-input').focus();

    _parent.on('click', '.search-cancle', function(e){
        $(this).closest('.tab-search-box').find('.search-input').val('');
        $(this).closest('.tab-search-box').removeClass('active');
    });
}

//필터 설정 적용
function fnSetFilter_withfnreset(pModal, pClickBtn, rfn){
    let _is_checked = true;
    let _is_changed = false;
    pModal.find('.label-group-box:is([data-required="Y"])').each(function(_pIndex, _pEl){
        /* 필수 옵션 선택 안한거 체크 후 에러 메세지 */
        if ( $(_pEl).find(':input:checked').length <= 0){
            _is_checked = false;
            $(_pEl).addClass('_error');
            return false;
        }
    });

    if(_is_checked){ // 필수옵션 선택여부 체크 되었음
        pModal.find('.label-group-box').each(function(_pIndex, _pEl){
            let _label_txt = _change_txt = '';

            let _filter_var = $(_pEl).data('dim-filter');
            let _filter_obj = pClickBtn.filter(`button[data-dim-filter="${_filter_var}"]`);

            if($(_pEl).find(':input:not([data-type="all"]):checked').length > 0){ //선택된 옵션이 있음

                if($(_pEl).find(':input:not([data-type="all"]):checked').length == 1){
                    let _input = $(_pEl).find(':input:checked');
                    _label_txt = _change_txt = _input.next().text();
                }
                else{
                    let _input = $(_pEl).find(':input:not([data-type="all"]):checked').eq(0);
                    _label_txt = _input.next().text() + ' 외' + ( $(_pEl).find(':input:not([data-type="all"]):checked').length -1 );

                    let _text_array = $(_pEl).find(':input:not([data-type="all"]):checked + div').map(function() {
                        return $(this).text();
                    }).get();

                    _change_txt = _text_array.join('||');
                }

                if( _filter_obj.data('change') !== '' ){ // 이미 바뀜
                    _filter_obj.addClass('selected').find('span').text(_label_txt);
                    _filter_obj.data('change', _change_txt);
                    _is_changed = true;

                } else { // 처음 선택
                    if( _filter_obj.data('default') !== _label_txt ){ // 기본 값하고 같지 않음
                        _filter_obj.addClass('selected').find('span').text(_label_txt);
                        _filter_obj.data('change', _change_txt);
                        _is_changed = true;
                    }
                }
            }
            else{ //선택된 옵션이 없음 (리셋)
                _filter_obj.removeClass('selected').find('span').text(_filter_obj.data('default'));
                _filter_obj.data('change', '');
                _is_changed = true;
            }
        });

        //console.log(  pModal.find(':input:not([data-type="all"]):checked').length );
                            
        // 리셋 버튼 추가
        if(_is_changed && pModal.find(':input:not([data-type="all"]):checked').length > 0){
            if(!pClickBtn.closest('.tab-nav-wrap').find('button.reset').length){
                pClickBtn.closest('.tab-nav-wrap').prepend('<button type="button" class="reset"><i class="ico ico_reload"></i></button>').find('button').first()
                .on('click', function(){
                    rfn();
                });
            }
        }

        pClickBtn.close();
    }
}

// 스크롤바 숨김 노출
function cnBodyOverflow(type){
    if(type == 'hidden'){
        const userAgent = window.navigator.userAgent.toLowerCase();
        const platform = (navigator.userAgentData?.platform || navigator.platform)?.toLowerCase();
        const scrollbarWidth = getScrollbarWidth();
        let addedBodyClassName = 'cn-scroll-block';
        if(document.documentElement.clientHeight >= document.documentElement.scrollHeight || isMobile()){
            addedBodyClassName = 'cn-scroll-block';
        }else if((platform === 'windows' && userAgent.indexOf('chrome') > -1 && userAgent.indexOf('whale') === -1) || scrollbarWidth > 0){
            addedBodyClassName = 'cn-scroll-block-2'
        }
    
        $('body').addClass(addedBodyClassName)
    }else{
        $('body').removeClass('cn-scroll-block').removeClass('cn-scroll-block-2');
    }
}

$(document).ready(function() {
    // 토글 박스(신규)
    $(document).on('click', '.toggle-box-async .toggle-btn', function(e){
        if(e.target.tagName.toLowerCase() === 'a'){
            e.preventDefault();
        }

        // 형제가 있으면
        if($(this).closest('.toggle-box-async').siblings('.toggle-box-async').length > 0){
            let _class_remove = 'active'; // 기본 숨김
            let _class_add = 'hide'; // 기본 숨김
            let _arrow_remove = ''; // 기본 숨김
            let _arrow_add = '_down'; // 기본 숨김

            //$(this).data('before-state') 처음이 보여주기 인지... 
            if($(this).data('before-state') == 'show'){
                _class_remove = 'hide';
                _class_add = 'active';
                _arrow_remove = '_down';
                _arrow_add = '';
            }

            /* 나 빼고 다 없애기 */
            $(this).closest('.toggle-box-async').siblings('.toggle-box-async').each(function(index, element) {
                $(element).find('.toggle-conts').removeClass(_class_remove).addClass(_class_add);
                $(element).find('.toggle-btn').removeClass(_arrow_remove).addClass(_arrow_add);
                if($(element).find('.toggle-btn').find('.ico').length > 0){
                    $(element).find('.toggle-btn').find('.ico').removeClass(_arrow_remove).addClass(_arrow_add);
                }
            });
        }

        let _$conts = $(this).closest('.toggle-box-async').find('.toggle-conts').eq(0);

        $(this).toggleClass('_down').find('.ico').toggleClass('_down');
        _$conts.toggleClass('active hide');
    });

    // 토글 박스
    $('.toggle-box .toggle-btn').on('click', function(e){
    // $(document).on('click', '.toggle-box .toggle-btn', function(e){
        if(e.target.tagName.toLowerCase() === 'a'){
            e.preventDefault();
        }

        // 형제가 있으면
        if($(this).closest('.toggle-box').siblings('.toggle-box').length > 0){
            let _class_remove = 'active'; // 기본 숨김
            let _class_add = 'hide'; // 기본 숨김
            let _arrow_remove = ''; // 기본 숨김
            let _arrow_add = '_down'; // 기본 숨김

            //$(this).data('before-state') 처음이 보여주기 인지... 
            if($(this).data('before-state') == 'show'){
                _class_remove = 'hide';
                _class_add = 'active';
                _arrow_remove = '_down';
                _arrow_add = '';
            }

            /* 나 빼고 다 없애기 */
            $(this).closest('.toggle-box').siblings('.toggle-box').each(function(index, element) {
                $(element).find('.toggle-conts').removeClass(_class_remove).addClass(_class_add);
                $(element).find('.toggle-btn').removeClass(_arrow_remove).addClass(_arrow_add);
                if($(element).find('.toggle-btn').find('.ico').length > 0){
                    $(element).find('.toggle-btn').find('.ico').removeClass(_arrow_remove).addClass(_arrow_add);
                }
            });
        }

        let _$conts = $(this).closest('.toggle-box').find('.toggle-conts').eq(0);

        $(this).toggleClass('_down').find('.ico').toggleClass('_down');
        _$conts.toggleClass('active hide');
    });


    // S:모바일에서만 header, footer 이벤트 사용
    if ($("html").attr("data-mode") === "mo") {
        /* S:header 및 footer 스크롤 애니 */
        /*
        let g_prevScrollY = $(window).scrollTop();
        $(window).on('scroll', () => {
            const _currentScrollY = $(window).scrollTop();

            if(_currentScrollY  === g_prevScrollY){ return false; }

            console.log( $(document).outerHeight(), 'g_prevScrollY = ', g_prevScrollY );

            if (_currentScrollY > g_prevScrollY && g_prevScrollY > 0) {
                // 아래로 스크롤하는 경우: 상단 메뉴 숨김
                $('body, .scroll_ani').removeClass('_show').addClass('_hide');
            } else {
                // 위로 스크롤하는 경우: 상단 메뉴 노출
                $('body, .scroll_ani').removeClass('_hide').addClass('_show');
            }

            g_prevScrollY = _currentScrollY;
        });
        */

        let lastScrollTop = 0;
        const delta = 15;

        let _scrollHeight = $(document).height();
        let _scrollPosition = $(window).height() + $(window).scrollTop();

        $(window).scroll(function(event){
            const _nowScrollTop = $(this).scrollTop();
            if(Math.abs(lastScrollTop - _nowScrollTop) <= delta) return;

            //console.log( _nowScrollTop );

            _scrollHeight = $(document).height();
            _scrollPosition = $(window).height() + $(window).scrollTop();

            if (( _nowScrollTop > lastScrollTop) && (lastScrollTop > 0) || (_scrollPosition === _scrollHeight) ) {
                // 아래로 스크롤하는 경우: 상단 메뉴 숨김
                $('body, .scroll_ani, .footer-sticky').removeClass('_show').addClass('_hide');
            } else {
                if(_nowScrollTop < delta){ // 젤 상단일때
                    $('body, .scroll_ani, .footer-sticky').removeClass('_hide').addClass('_show');
                }
                    // 위로 스크롤하는 경우: 상단 메뉴 노출
            };
            lastScrollTop = _nowScrollTop;
        });

        $(window).trigger('scroll');
        /* E:header 및 footer 스크롤 애니 */
    }
    // E:모바일에서만 header, footer 이벤트 사용
});