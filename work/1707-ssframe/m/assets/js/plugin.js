//
var mobCheck;
var UserAgent = navigator.userAgent;
var UADevice = UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i);
var UAVendor = UserAgent.match(/LG|SAMSUNG|Samsung/);
if ( UADevice !== null || UAVendor!== null){

    // 아이폰
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if(iOS) {
        mobCheck = true;
    } else {
    
    }
}


/** 
 *{@link mui.common}
 * @namespace
 * @requires jQuery
 */
var mui = window.mui || {};
var console = window.console || {
  log: function() {}
};

try {
  /**
   * 공통적으로 사용 할 함수 모음 (추후 카테고라이징 예정)
   * @namespace
   * @param  {Object} mui        mui Objects
   * @param  {Object} $          jQuery
   * @param  {Object} undefined Undefined
   * @example
   * // Installation
   * <script src="js/common.js"></script>
   */
  mui.common = (function(mui, $, undefined) {
    "use strict";

    /**
     * 브라우저 넓이 값 리턴 (IE, FF, Chrome)
     * @function mui.common.getWindowWidth
     * @return {Int} 브라우저 넓이
     */
    var getWindowWidth = function() {
      return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    };

    /**
     * 브라우저 높이 값 리턴 (IE, FF, Chrome)
     * @function mui.common.getWindowHeight
     * @return {Int} 브라우저 높이
     */
    var getWindowHeight = function() {
      return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    };

    /**
     * 마우스 오른쪽 버튼 및 드래그 제한
     * @function mui.common.disabledDefaultMouseEvents
     * @example
     * window.attachEvent( "onload" , disabledDefaultMouseEvents );
     */
    var disabledDefaultMouseEvents = function() {
      document.body.oncontextmenu = function() {
        return false
      };
      document.body.ondragstart = function() {
        return false
      };
      document.body.onselectstart = function() {
        return false
      };
    };

    /*
     ** @method: isDomain
     ** @desc: URL 검증
     ** @param: Strong;
     ** @usage : isDomain(url)
     */
    /**
     * URL 검증
     * @function mui.common.isDomain
     * @param  {String}  url 검증 할 URL
     * @return {Boolean}     검증 결과
     */
    var isDomain = function(url) {
      var currentURL = location.href.split('//');
      currentURL = currentURL[1].substr(0, currentURL[1].indexOf('/'));
      return (currentURL.indexOf(url) > -1);
    }

    var setLandscapeMessage = function(url, bgColor){
      var elem = document.createElement('div');
            elem.id = 'is-landscape';

      elem.style.display = "none";
      elem.style.position = "fixed";

      elem.style.top = 0;
      elem.style.right = 0;
      elem.style.bottom = 0;
      elem.style.left = 0;
      elem.style.zIndex = 9999;

      (typeof bgColor === "undefined") ? elem.style.backgroundColor = "#000" : elem.style.backgroundColor = bgColor ; 
      elem.style.backgroundImage = 'url('+url+')';
      elem.style.backgroundPosition = 'center';
      elem.style.backgroundRepeat = "no-repeat";
      elem.style.backgroundSize = '400px auto';
      
      document.body.appendChild(elem);

      // Event Listening
      window.addEventListener('orientationchange', function(ev){
        if(window.orientation === 0){
          elem.style.display = "none";
        } else {
          elem.style.display = "block";
        }
      });
      
    };

    var loading = function(state, indicator){
      var elem = document.createElement('div');
            elem.id = 'indicator';

      elem.style.position = "fixed";

      elem.style.top = 0;
      elem.style.right = 0;
      elem.style.bottom = 0;
      elem.style.left = 0;
      elem.style.zIndex = 9999;

      (typeof indicator === "undefined")  
      ? elem.style.backgroundImage = "url(./images/indicator-black.gif)" 
      : elem.style.backgroundImage = 'url('+indicator+')';

      elem.style.backgroundPosition = 'center';
      elem.style.backgroundRepeat = "no-repeat";

      if( state === 'show')
        document.body.appendChild(elem);
      else if ( state === 'hide' )
        document.body.removeChild(document.getElementById(elem.id));

    };

    return {
      getWindowWidth: getWindowWidth,
      getWindowHeight: getWindowHeight,
      disabledDefaultMouseEvents: disabledDefaultMouseEvents,
      isDomain: isDomain,
      setLandscapeMessage:setLandscapeMessage,
      loading: loading
    };
  })(mui, $);
} catch (e) {
  console.log(e);
} finally {

}

if (!window.requestAnimationFrame) {
  /**
   * Vendor Prefix 없이 reuqestAnimationFrame 사용
   * @global
   */
  window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function(callback) {
      return window.setTimeout(callback, 17 /*~ 1000/60*/ );
    });
}

if (!window.cancelAnimationFrame) {
  /**
   * Vendor Prefix 없이 cancelAnimationFrame 사용
   * @global
   */
  window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
    window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
    window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
    window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
    window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
    window.clearTimeout);
}

try {
  /**
   * mui.modal Components <br/><br/>
   * `private` 키워드가 들어 가 있으면 실행 불가 <br/>
   * `static` 키워드가 들어 가 있으면 실행 가능
   * @namespace  mui.modal
   * @inner
   * @example
   * // Installation
   * <script src="js/modal.js"></script>
   */
  mui.modal = (function(mui, $, undefined) {
    "use strict";

    var
      $modal = $('[data-role="modal"]'),
      $modalBackdrop = $('<div class="modal-backdrop"></div>'),
      $el,
      $a11yFocused;

    var
      tmpPos = 0,
      openMotion = '';

    /**
     * @function mui.modal.getVerticalMiddleValue
     * @return {Float} 모달 영역이 브라우저 창 높이 기준으로 중앙에 위치하기 위한 값
     * @private
     */
    var getVerticalMiddleValue = function() {
    return -($('.modal-content', $el).innerHeight() / 2) ;
   /*     @ 170317 김소라 수정 : px작업시 스크롤생길때 이슈가 생김 
      return (mui.common.getWindowHeight() > $('.modal-content', $el).innerHeight() + getCloseButtonHeight() * 2) ?
        -($('.modal-content', $el).innerHeight() / 2) :
        ((mui.common.getWindowHeight() / 2 - getCloseButtonHeight()) - ($(window).innerHeight() * 0.04)) * -1;*/
    };

    /**    
     * @function mui.modal.getHorizontalMiddleValue
     * @return {Float} 모달 영역이 브라우저 창 넓이 기준으로 중앙에 위치하기 위한 값
     * @private
     */
    var getHorizontalMiddleValue = function() {
      return -($('.modal-content', $el).outerWidth() / 2);
    };

    /**
     * @function mui.modal.getCloseButtonHeight
     * @return {Float} getVerticalMiddleValue 에서 모달 닫기버튼이 모달영역 밖에 위치 할 경우, 그 높이 값
     * @private
     */
    var getCloseButtonHeight = function() {
      var $closeButton = $('.modal__close', $el);

      /**
       * .modal__close 가 아닌, SMACSS Style 형식인 경우.
       */
      if ($closeButton.length < 1)
        $closeButton = $('.modal-btn-close', $el);

      var height = parseInt($closeButton.css('top'));

      if (height < 0)
        return height * -1;
      return 0;
    };

    /**
     * 모달 영역이 브라우저 보다 높이값이 크면 모달 영역이 하단에 붙여서 엉성하게 나오는 것에 대한 처리를 하기 위함
     * @function mui.modal.isSmallWindow
     * @return {Boolean} 모달 영역의 높이값이 브라우저 창보다 큰지 안큰지
     * @private
     */
    var isSmallWindow = function() {
      return (mui.common.getWindowHeight() < $('.modal-content', $el).innerHeight() + getCloseButtonHeight());
    };

    var isOpenedModal = function(action){
      var $target = false;
      if( action === "open" ){
        $modal.each(function(){
          if( $(this).css('display') === "block" ){
            $target = $(this);
            return false;
          }        
        });
      } else if ( action === "close" ){
        $modal.each(function(){
          if( $(this).hasClass('is-opened') ){
            $target = $(this);
            return false;
          }        
        });
      }

      return $target;
    };

    /**
     * 모달창 오픈
     * @function mui.modal.open
     * @param  {String} id DOM ID
     */
    var openModal = function(id) {
      $el = $('#' + id);
      // 키보드 접근성
      $a11yFocused = $(document.activeElement);
      
      /**
       * 160526
       * 엔터키 입력 시 계속 실행되는 것을 방지하게 위하여 blur 처리
       */
      $('a, area, input, button').trigger("blur");

      if( isOpenedModal('open') ){
        var $_self = isOpenedModal('open');
              $_self.addClass('is-opened');
      } else if( !isOpenedModal('open') ) {
          if(mobCheck){
              tmpPos = $(window.parent).scrollTop();
          }else{
           tmpPos = $(window).scrollTop();
          }
       
        $('#viewport').css('top', tmpPos * -1);
        /*170216 김소라 수정 : 모바일 비율 맞추어 스크롤 위치값 계산
       var UserAgent = navigator.userAgent;
        var UADevice = UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i);
        var UAVendor = UserAgent.match(/LG|SAMSUNG|Samsung/);
        if ( UADevice != null || UAVendor != null){      
           var zoomS = ($(window).width() / 720).toFixed(5);
            $('#viewport').css('top', (tmpPos * -1) / zoomS);
            //console.log(11);
        } else {
          $('#viewport').css('top', tmpPos * -1);
        }
        /*170216 수정*/
      }      

      /*
       ** @desc: 팝업 오픈 시 현재 Y값을 저장, fixed position이 된 viewport에다가 fake로 페이지가 내려 온 것처럼 보이게 함 (페이스북 스타일)
       */
      $("input,select,radio,checkbox").blur();

      if (mui.modal.openMotion === '')
        mui.modal.openMotion = 'modal-scale';

      if ($modal.length && $el.length) {
        $el.css({
          'visible': 'hidden',
          'display': 'block'
        });

        if ($el.attr('data-view') == 'full') {
          //$('body').css('overflow','hidden');
          $('.modal-content', $el).css({
            'margin-top': 0,
            'margin-left': 0
          });
        } else {
          $('.modal-content', $el).delay(100).css({
            'margin-top': getVerticalMiddleValue(),
            'margin-left': getHorizontalMiddleValue()
          }).addClass(mui.modal.openMotion);

          /*
           ** @desc: 레이어팝업의 높이가 브라우저 창 보다 클 경우 어색해 보이지 않기 위하여 하단 여백을 상단과 동일하게 줌
           */
          if (isSmallWindow()) {
            setTimeout(function() {
              $('.modal-content', $el).css({
              //  'margin-bottom': $('.modal-content', $el).offset().top
              });
            }, 100);
          }
        }

        // .focus(); 제외 (아이프레임 및 IE에서 작동이 이상함)
        $el.attr('tabindex', 0);

        $modalBackdrop.height($(document).innerHeight()).show();
        $('body').append($modalBackdrop).addClass('modal-open');

        $el.removeAttr('style').fadeIn('fast');
        $el.find('.modal-content').addClass('is-opened');

          if(mobCheck){
                $(window.parent).scrollTop(0);
          }else{
                $(window).scrollTop(0);
          }
      }
    };

    /**
     * 모달창 닫기
     * @function mui.modal.close
     * @param  {String} id DOM ID
     */
    var closeModal = function(id, destroy) {
      var $el = $('#' + id);
      $el.find('.modal-content').removeClass('is-opened');
      $el.hide();
      //$el.fadeOut('fast');

      // 모달창이 열려 있으면 해당되는 레이어팝업만 닫게 하기 (160525)
      if( isOpenedModal('close') !== false ){
        var $_self = isOpenedModal('close');
              $_self.removeClass('is-opened');

        return true;
      }

      $('.modal-content').removeClass(mui.modal.openMotion);

      $('body .modal-backdrop').fadeOut(0, function() {
        $('body').removeClass('modal-open');

        $('#viewport').removeAttr('style');
          if(mobCheck){
        $(window.parent).scrollTop(tmpPos);
          }else{
        $(window).scrollTop(tmpPos);
          }
      });

      // $a11yFocused 가 AREA 이면 포커스가 이상한 곳에 갈 수 있음으로 강제 리턴 시킴 (160712 추가)
      if( $a11yFocused[0].tagName === "AREA" )
        return ;
      else 
        $a11yFocused.focus();
    };

    /*
     ** @event: 모달 오픈
     ** @anchor: 정명학
     */
    $('[data-toggle="modal"]').on('click', function(e) {
      var target = $(this).attr('href').replace("#", '');
      e.preventDefault();

      openModal(target);
    });

    /**
     * 모달 레이어 팝업 닫기
     *
     * @event [a] 모달창 닫기
     * @memberOf mui.modal
     * @property {String} href Target ID
     * @example
     * <a href="#" data-rel="back">닫기</a>
     */
    $('[data-rel="back"]').on('click', function(e) {
      e.stopPropagation();

      var target = $(this).closest($modal).attr('id');
      var refTarget = $(this).attr('data-target');

      // 이벤트 버블현상 제거 [160524]
      e.preventDefault();

      if (typeof refTarget !== "undefined") {
        if (refTarget === "false") {
          closeModal(target);

          return true;
        }

        $(this).closest('[data-role="modal"]').hide();
        $(this).removeAttr('data-target');

        openModal(refTarget);

        return true;
      }

      closeModal(target);
    });

    /**
     * @event: 레이어팝업 영역 이 외 클릭 시 액션 모달창닫기 backdrop 김소라
     
    $modal.on('click', function(e) {
    
       * 레이어 팝업에서 창 닫을 시 각각의 레이어 팝업 성향에 따라 액션이 다르기 때문에 trigger 로 대체
       
      $(this).find('[data-rel="back"]').trigger('click');
    });*/

    /**
     * @event 레이어팝업 내부 클릭 시 이벤트 버블현상 제거
     */
    $('.modal-content').on('click', function(e) {
      e.stopPropagation();
    });

    /**
     * @event [window] 브라우저 크기 변경
     * @memberOf mui.modal
     * @description 1. 현재 오픈 된 모달 영역이 창 크기가 조절 될 시에도 중앙 위치에 맞춰지게 설정 <br>
     * 2. 브라우저 높이가 문서 높이보다 작은경우 모달 암막높이를 브라우저 높이만큼 조절
     */
    $(window).resize(function() {

      var _windowWidth = mui.common.getWindowWidth(),
            _windowHeight = mui.common.getWindowHeight();

      /**
       * 현재 모달이 지정되어 있으면서 해당 모달이 block 형태라면 리사이징 진행
       */
      if (typeof $el !== "undefined" && $el.css('display') === "block") {
        if ($el.attr('data-view') === "full")
          return true;

        $('.modal-content', $el).delay(100).css({
          'margin-top': getVerticalMiddleValue(),
          'margin-left': getHorizontalMiddleValue()
            
          //,          'margin-bottom': $('.modal-content', $el).offset().top
        });

          if(mobCheck){
        $(window.parent).delay(200).scrollTop(0);
          }else{
        $(window).delay(200).scrollTop(0);
          }
      }

      $modalBackdrop.height(_windowHeight);
/*      
      if (_windowHeight > $(document).innerHeight())
        $modalBackdrop.height(_windowHeight);
*/
    });

    /**
     * @event [window] Key Events
     * @date: 160718
     */
    $modal.on('keydown', function(e){

      // ESC 키 누를 시 레이어 팝업 닫기
      if( e.keyCode === 27 ){
        $modal.each(function(){
          if($(this).css('display') === 'block'){
            closeModal($(this).attr('id').replace('#', ''));
          }
        });
      }
    });

    return {
      open: openModal,
      close: closeModal,
      openMotion: openMotion
    };

  })(mui, jQuery);
} catch (e) {
  console.log(e);
} finally {

}
try {
  /**
   * mui.util Components <br/>
   * 일부 재 사용성 있는 기능들에 대한 집합
   * @namespace mui.util
   * @inner
   * @example
   * // Installation
   * <script src="js/util.js"></script>
   */
  mui.util = (function(mui, $, undefined) {
    "use strict";
    var _doScroll = false;
    
    /**
     * 익스플로러 8 이하에서 그림자가 있는 PNG 파일 로딩 시 깨짐 현상 방지
     * @function mui.util.ie8PNGFix
     * @param  {$DOM} $DOM 이미지 태그
     */
    var ie8PNGFix = function($el) {
      var c = [];
      $(' img', $el).each(function(j) {
        c[j] = new Image();
        c[j].src = this.src;
        if ($.browser.msie) {
          this.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='image',src='" + this.src + "')";
        }
      });
    };

    /**
     * 이미지 경로에 대해 연결 시켜주는 기능\
     * @function mui.util.imageLoader
     * @param  {Array} arr 이미지 URL
     * @return {Arra} Image Array
     */
    var imageLoader = function(arr) {
      var length = arr.length;
      var imgArr = [];

      for (var i = 0; i < length; i++) {
        imgArr[i] = new Image();
        imgArr[i].src = arr[i];
      }

      return imgArr;
    };

    /**
     * 브라우저 스크롤 이벤트 차단
     * @function mui.util.disableScrolling
     */
    var disableScrolling = function() {
      $(window).on("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll", function(e) {
        e.preventDefault();
        return;
      });
      $(window).on("keydown.disableScroll", function(e) {
        var eventKeyArray = [32, 33, 34, 35, 36, 37, 38, 39, 40];
        for (var i = 0; i < eventKeyArray.length; i++) {
          if (e.keyCode === eventKeyArray[i]) {
            e.preventDefault();
            return;
          }
        }
      });
    };

    /**
     * 브라우저 스크롤 이벤트 활성화 (PC/모바일)
     * @function mui.util.enableScrolling
     */
    var enableScrolling = function() {
      $(window).off(".disableScroll");
      // 스크롤 중이지 않기 때문에 스크롤 플래그를 False로 둔다.
      _doScroll = false;
    };

    /**
     * Y값으로 위치 이동
     * @function mui.util.goToPosition
     * @param  {Int}   value    해당 위치로 이동
     * @param  {Function} callback 위치 이동 후 Callback
     */
    var goToPosition = function(value, callback) {

      if (_doScroll) return true;

      disableScrolling();
      _doScroll = true;

      $('html, body').animate({
        scrollTop: value + "px"
      }, 700, function() {
        enableScrolling();

        _doScroll = false;
        if (typeof callback === "function") callback();
      });
    };

    /**
     * 최대 / 최소 값 사이에 X가 포함되는지 확인
     * @function mui.util.getBetween
     * @param  {Int} x   비교 될 값
     * @param  {Int} min 비교 될 최소 값
     * @param  {Int} max 비교 될 최대 값
     * @return {Boolean}
     */
    var getBetween = function(x, min, max) {
      return x >= min && x <= max;
    };

    /**
     * 엘리먼트가 문서에서 위치 한 최초 지점의 Y값
     * @param  {$DOM} $el 값을 반환 할 엘리먼트
     * @return {Int} 위치 값
     */
    var getOffset = function($el) {
      return $el.offset().top;
    };

    /**
     * 엘리먼트의 높이
     * @param  {$DOM} $el 값을 반환 할 엘리먼트
     * @return {Int}     높이값
     */
    var getHeight = function($el) {
      return $el.innerHeight();
    };

    /**
     * 엘리먼트 크기에 비례 한 배경 오브젝트 비율 설정
     * @param {$DOM} $el      비율을 설정 할 엘리먼트
     * @param {Int} wOrigin  엘리먼트의 넓이
     * @param {Int} hOrigin  엘리먼트의 높이
     * @param {Int} minWidth 엘리먼트의 최소 넓이
     */
    var setBackground = function($el, wOrigin, hOrigin, minWidth) {
      /**
       * Scale 의 Horizontal & Vertical 에 대한 비율을 Window 크기가 아닌 상위 Element 의 크기로
       * @date: 160322
       */
      var
        scaleH = $el.closest('div').innerWidth() / wOrigin,
        scaleV = $el.closest('div').innerHeight() / hOrigin;
      var
        tmpW = 0,
        tmpPos = 0;

      var ratio = scaleH > scaleV ? scaleH : scaleV;

      if (ratio * wOrigin < minWidth)
        ratio = minWidth / wOrigin;

      /**
       * 가로 중앙 정렬을 위한 작업
       * @date: 160322
       */
      $el.css({
        position: 'absolute',
        width: ratio * wOrigin,
        height: ratio * hOrigin,
        left: '50%',
        marginLeft: ( ratio * wOrigin ) / 2 * -1
      });
    };

    return {
      ie8PNGFix: ie8PNGFix,
      imageLoader: imageLoader,

      disableScrolling: disableScrolling,
      enableScrolling: enableScrolling,
      goToPosition: goToPosition,

      getBetween: getBetween,
      getOffset: getOffset,
      getHeight: getHeight,

      setBackground: setBackground,

      doScroll: _doScroll
    };
  })(mui, jQuery);
} catch (e) {
  console.log(e);
} finally {
}
try {
  /**
   * mui.validate Components
   * @namespace mui.validate
   * @inner
   * @example
   * // Installation
   * <script src="js/validate.js"></script>
   */
  mui.validate = (function(mui, $, undefined) {
    "use strict";

    /**
     * 전화번호 검증
     * @function
     * @private
     * @return {Boolean}       검증 여부
     */
    var isTel = function(value) {
      var regExpPhone = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;
      if (regExpPhone.test(value)) {
        if (value.length > 9 && value.length < 12)
          return true;
      }
      return false;
    };

    /**
     * 이메일 검증
     * @function
     * @private
     * @return {Boolean}       검증 여부
     */
    var isEmail = function(value){
      var regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

      return regExpEmail.test(value)
    };

    /**
     * 폼 초기화
     * @function mui.validate.init
     * @param  {$DOM} $el 초기화 할 폼
     * @param  {Event} e   해당 폼의 이벤트 (선택사항)
     */
    var initForm = function($el, e) {
      $el.each(function() {
        if (this.className === $el.attr('class'))
          this.reset();
        else if (this.id === $el.attr('id'))
          this.reset();
      });
      $el.find('input[type="radio"]').prop('checked', false);
      $el.find('input[type="checkbox"]').prop('checked', false);
      $el.find('label').removeClass('checked, is-checked');
    };

    /**
     * 입력 폼 검증
     * @function mui.validate.input
     * @param  {$DOM} $el  검증 할 입력 폼
     * @param  {String} cond 몇몇 설정 된 조건 (tel : 전화번호)
     * @param  {Event} e    입력 폼의 이벤트
     * @return {Boolean}      검증 여부
     */
    var getInputState = function($el, cond, e) {
      var state = true;

      if ($el.val().length === 0){
        state = false;
      } else if (cond === 'tel' && isTel($el.val()) !== true){
        state = false;
      } else if (cond === 'email' && isEmail($el.val()) !== true){
        state = false;
      }

      if( !state ) $el.focus();

      return state;
    };

    /**
     * 체크박스 검증
     * @function mui.validate.checkbox
     * @param  {$DOM} $el 검증 할 체크박스
     * @param  {Event} e   체크박스 이벤트
     * @return {Boolean}     검증여부
     */
    var getCheckBoxState = function($el, e) {
      var isChecked = $el.is(":checked"); //.attr('checked');

      if (isChecked){
        return true;
      } else {
        $el.focus();
        return false;
      }
    };

    /**
     * 라디오 검증
     * @function mui.validate.radio
     * @param  {String} name 라디오 [name] 값
     * @param  {Event} e    라디오 이벤트
     * @return {String}      선택 된 라디오의 값 (없으면 false)
     */
    var getRadioValue = function(name, e) {
      var value = $('input:radio[name="' + name + '"]:checked').val();
      var $target = $('input:radio[name="' + name + '"]').eq(0);

      $target.focus();

      if (typeof value == "undefined")
        return false;

      return value;
    };

    return {
      init: initForm,
      input: getInputState,
      checkbox: getCheckBoxState,
      radio: getRadioValue
    };

  })(mui, jQuery);
} catch (e) {
  console.log(e);
} finally {

}

/**
 * ScrollSpy 기능 및 호출하는 Element 에 대한 Class Toggling!
 * @class
 * @param {$DOM} Target Selector
 * @param {json} Options
 * @param {json:} onClassName Toggle Class Name
 * @param {json:} extraHeight 여분의 높이 (기본 0)
 * @param {json:} isSticky Target 이 고정되는 영역인지 (기본 True)
 * @param {json:} scrollEndCallback ScrollSpy Callback Function
 * @param {json:onClassName} Toggle Class Name
 * @example
 * // usage (with jQuery)
 * <nav class="nav nav-gnb">
      <a href="#section1" data-toggle="scrollspy">
        <i class="uri-common gnb-elem1">section1</i>
      </a>
      <a href="#section2" data-toggle="scrollspy">
        <i class="uri-common gnb-elem2">section2</i>
      </a>
      <a href="#section3" data-toggle="scrollspy">
        <i class="uri-common gnb-elem3">section3</i>
      </a>
    </nav>
 * <script>
 *   var scrollSpy = new ScrollSpy($('.nav-gnb'), {
        isSticky: true,
        extraHeight: $(window).innerHeight() * 0.05,
        onClassName: 'is-active',
        scrollEndCallback: function(){
        }
      });
	  OR
      var scrollSpy = new ScrollSpy($('.nav-gnb'),{});

      // 초기화
      scrollSpy.init();

      // 스크롤 이벤트에 대응
      $(window).scroll(function(){
        scrollSpy.onScroll();
      });
 * </script>
 * // Installation
 * <script src="js/mui.util.js"></script>
 * <script src="js/scrollspy.js"></script>
 * @auchor: 정명학
 * @version 0.1
 * @copyright 2016 Jeong Myoung Hak
 * @license http://opensource.org/licenses/MIT MIT
 */

function ScrollSpy($target, opt) {
  this.$target = $target;
  this.$elem = this.$target.find('[data-toggle="scrollspy"]').not('.js-disabled');
  this.$pages = $.makeArray(this.$elem.map(function() {
    return $($(this).attr('href'));
  }));

  this.offsetY = 0;
  this.index = 0;

  this.isScrolling = false;

  if(typeof opt !== "undefined"){
    // 매개변수 옵션이 존재하는 경우
    this.opt = {
      onClassName: ((typeof opt.onClassName === 'undefined')? 'is-active': opt.onClassName),
      extraHeight: ((typeof opt.extraHeight === 'undefined') ? 0 : opt.extraHeight),
      isSticky: ((typeof opt.isSticky === 'undefined') ? false : opt.isSticky),
      scrollEndCallback: opt.scrollEndCallback
    };

    // isSticky 이면 해당 GNB 높이는 자동으로 extraHeight 에 추가 하기
    if( this.opt.isSticky ){
      this.opt.extraHeight += $target.innerHeight();
    }
    // 매개변수 옵션 존재 시 처리 내용 끝
  } else {
    // 매개변수 옵션이 존재하지 않는 경우
    this.opt = {
      extraHeight: 0
    }
  }

};

ScrollSpy.prototype.init = function() {
  var _self = this;

  _self.onScroll();

  // AddEventListener
  _self.$target.on('click', '[data-toggle="scrollspy"]', function(e) {
    e.preventDefault();
    _self.goToScroll($(this).attr('href'));
  });
};

ScrollSpy.prototype.onScroll = function() {
  if (this.opt === null)
    return;

  this.index = this.getCurrentPages();
  this.offsetY = $(window).scrollTop();

  if (this.opt.isSticky || this.opt.extraHeight > 0)
    this.offsetY += Math.round(this.opt.extraHeight);

  this.$elem.removeClass(this.opt.onClassName);
  if (this.index > -1)
    this.$elem.eq(this.index).addClass('is-active');
};

ScrollSpy.prototype.goToScroll = function(target) {
  var _self = this;

  if (_self.isScrolling)
    return true;

  _self.isScrolling = true;

  mui.util.disableScrolling();
  $('html, body')
    .animate({ scrollTop: Math.round($(target).offset().top - this.opt.extraHeight) + "px" }, 700)
    .promise()
    .then(function() {
      _self.isScrolling = false;
      _self.onScroll();

      mui.util.enableScrolling();

      $(window).trigger('scroll');

      // Execute Callback Functions
      if (typeof _self.opt.scrollEndCallback === "function") {
        _self.opt.scrollEndCallback();
      }
    });
};


ScrollSpy.prototype.getCurrentPages = function() {
  var idx = -1;

  for (var i = 0; i < this.$pages.length; i++) {
    var selfOffsetTop = Math.floor(this.$pages[i].offset().top);
    var selfHeight = Math.floor(this.$pages[i].innerHeight());

    if (mui.util.getBetween(this.offsetY, selfOffsetTop, selfOffsetTop + selfHeight)){
      idx = i;
    }
  }
  return idx;
};
/** @namespace  Events/form */
try {
  (function(mui, $, undefined) {
    "use strict";
    /**
     * /////////////////////////////// Disabled ////////////////////////////////
     * @memberOf Events/form
     * @event label click
     * @description 
     * - 해당 label 태그에 checked 클래스를 Toggle <br/>
     * - 체크박스 인 경우 for 가 향하는 체크박스에 checked 속성을 True <br/>
     * - 라디오 버튼 인 경우 for 가 향하는 라디오 버튼에 checked 속성을 True
     * 
     * @example 
     * // 체크박스
     * <label for='checkbox'>
     *   <i></i>
     * </label>
     * <input type="checkbox" id="checkbox" class="is-custom"/>
     * 
     * @example 
     * // 라디오 버튼
     * <label for='radio'>
     *   <i></i>
     * </label>
     * <input type="radio" id="radio" name="radio" class="is-custom"/>
     
    $('label').on('click', function(e) {
      if ($(this).attr("for") !== "") {
        var
          target = $('#' + $(this).attr("for"));

        e.preventDefault();

        if (target.attr('type') === "checkbox" && target.hasClass('is-custom')) {
          var
            isChecked = target.is(':checked'),
            isDisabled = target.attr('disabled');

          if (isChecked === false)
            target.prop('checked', true);
          else
            target.prop('checked', false);

          $(this).toggleClass('checked');

        } else if (target.attr('type') === "radio" && target.hasClass('is-custom')) {
          var
            radioName = target.attr('name'),
            radioValue = target.val();

          $('[name="' + radioName + '"] ~ label').removeClass('checked');
          $('input:radio[name="' + radioName + '"][value="' + radioValue + '"]').prop('checked', true);

          $(this).toggleClass('checked');
        }
      }
    });
    */

    var getLabel = function($this, e) {
      var $self = $this;

      return ($self.closest('label').length > 0) ? $self.closest('label') : $self.parent().find('label[for="' + $self.attr('id') + '"]');
    };

    /**
     * @memberOf Events/form
     * @event input[data-input="tel"] keypress
     * @description 
     * - 키보드로 숫자만 입력
     * 
     * @example 
     * <input type="text" data-input="tel"/>
     */
    var $targetTel = $('input[data-input="tel"]');
    $targetTel.keypress(function(e) {
      var charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    });
    $targetTel.keyup(function(e) {
      var telMaxlength = 11;
      var $this = $(this);

      $(this).val($(this).val().replace(/[^0-9]/gi, ""));

      if (!!telMaxlength) {
        var text = $this.val();

        if (text.length > telMaxlength) {
          $this.val(text.substring(0, telMaxlength));
          e.preventDefault();
        }
      }
    });

    var $targetNumber = $('input[data-input="number"]');
    $targetNumber.keypress(function(e) {
      var charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    });
    $targetNumber.keyup(function(e) {
      var $this = $(this);
      $(this).val($(this).val().replace(/[^0-9]/gi, ""));
    });
    

    /*
     ** @desc: Input 클릭 시 Placeholder 내용이 사라짐
     */
    $('input, textarea').focusin(function() {
      var input = $(this);

      input.data('place-holder-text', input.attr('placeholder'));
      input.attr('placeholder', '');
    });

    /*
     ** @desc: Input 영역 외 클릭 시 Placeholder 내용이 노출 (내용이 비어있는 경우)
     */
    $('input, textarea').focusout(function() {
      var input = $(this);
      input.attr('placeholder', input.data('place-holder-text'));
    });

    /*
     ** @desc: Input 영역에서 엔터키 입력 시 submit 이벤트 막기
     ** @date: 2016.06.13
     @@ textarea 삭제
     */
    $("input").keypress(function(event) {
      if (event.which == 13) {
        //$(this).closest("form").submit(); // Submit 실행
        event.preventDefault();
      }
    });


    /**
     * Custom Checkbox & Radio Buttons Refactoring
     * @date: 160614
     */
    // checkboxes & radio common focus event binding
    // 포커스, 혹은 해당 레이블 클릭 시 is-focused 를 추가하여 요소에 대한 시각적인 구분 제공
    $('input[type="checkbox"],input[type="radio"]').on('focus', function(e) {
      var $_self = $(this);
      if (!$_self.hasClass('is-custom')) // didn't use customize checkboxes
        return true;

      var $_selfLabel = getLabel($(this), e);

      $_selfLabel.addClass('is-focused');
    });

    // checkboxes & radio common blur event binding
    // 포커스 해지 시 is-focused 클래스를 제거
    $('input[type="checkbox"],input[type="radio"]').on('blur', function(e) {
      var $_self = $(this);
      if (!$_self.hasClass('is-custom')) // didn't use customize checkboxes
        return true;

      var $_selfLabel = getLabel($(this), e);

      if ($_selfLabel.hasClass('is-focused'))
        $_selfLabel.removeClass('is-focused');
    });

    $('input[type="checkbox"]').on('change', function(e) {
      var $_self = $(this);
      if (!$_self.hasClass('is-custom')) // didn't use customize checkboxes
        return true;

      var $_selfLabel = getLabel($(this), e);
      var isChecked = $_self.is(':checked');

      if (isChecked) {
        $_selfLabel.addClass('is-checked');
      } else {
        $_selfLabel.removeClass('is-checked');
      }
    });

    $('input[type="radio"]').on('change', function(e) {
      var $_self = $(this);
      if (!$_self.hasClass('is-custom')) // didn't use customize checkboxes
        return true;

      var $_selfLabel = getLabel($(this), e);
      var radioName = $(this).attr('name');

      $('input[name="' + radioName + '"]').each(function() {
        var $label = getLabel($(this));
        $label.removeClass('is-checked checked'); //  예전 버전 호환 (checked 클래스 사용)
      });

      $_selfLabel.addClass('is-checked');
    });

    /**
     * maxlength 지원 (IE8 ~)
     */
    $(document).on('input keyup', 'input[maxlength], textarea[maxlength]', function(e) {
      // maxlength attribute does not in IE prior to IE10
      // http://stackoverflow.com/q/4717168/740639
      var $this = $(this);
      var maxlength = $this.attr('maxlength');
      if (!!maxlength) {
        var text = $this.val();

        if (text.length > maxlength) {
          // truncate excess text (in the case of a paste)
          $this.val(text.substring(0, maxlength));
          e.preventDefault();
        }

        return text.length;
      }
    });



  })(mui, $, undefined);
} catch (e) {
  console.log(e);
} finally {

}
