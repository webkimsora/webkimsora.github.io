/** 
 *{@link mui.common}
 * @namespace
 * @requires jQuery
 */
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
function ScrollSpy(e,t){this.$target=e,this.$elem=this.$target.find('[data-toggle="scrollspy"]').not(".js-disabled"),this.$pages=$.makeArray(this.$elem.map(function(){return $($(this).attr("href"))})),this.offsetY=0,this.index=0,this.isScrolling=!1,"undefined"!=typeof t?(this.opt={onClassName:"undefined"==typeof t.onClassName?"is-active":t.onClassName,extraHeight:"undefined"==typeof t.extraHeight?0:t.extraHeight,isSticky:"undefined"!=typeof t.isSticky&&t.isSticky,scrollEndCallback:t.scrollEndCallback},this.opt.isSticky&&(this.opt.extraHeight+=e.innerHeight())):this.opt={extraHeight:0}}var mui=window.mui||{},console=window.console||{log:function(){}};try{mui.common=function(e,t,n){"use strict";var i=function(){return window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth},o=function(){return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight},a=function(){document.body.oncontextmenu=function(){return!1},document.body.ondragstart=function(){return!1},document.body.onselectstart=function(){return!1}},r=function(e){var t=location.href.split("//");return t=t[1].substr(0,t[1].indexOf("/")),t.indexOf(e)>-1},s=function(e,t){var n=document.createElement("div");n.id="is-landscape",n.style.display="none",n.style.position="fixed",n.style.top=0,n.style.right=0,n.style.bottom=0,n.style.left=0,n.style.zIndex=9999,"undefined"==typeof t?n.style.backgroundColor="#000":n.style.backgroundColor=t,n.style.backgroundImage="url("+e+")",n.style.backgroundPosition="center",n.style.backgroundRepeat="no-repeat",n.style.backgroundSize="400px auto",document.body.appendChild(n),window.addEventListener("orientationchange",function(e){0===window.orientation?n.style.display="none":n.style.display="block"})},l=function(e,t){var n=document.createElement("div");n.id="indicator",n.style.position="fixed",n.style.top=0,n.style.right=0,n.style.bottom=0,n.style.left=0,n.style.zIndex=9999,"undefined"==typeof t?n.style.backgroundImage="url(./images/indicator-black.gif)":n.style.backgroundImage="url("+t+")",n.style.backgroundPosition="center",n.style.backgroundRepeat="no-repeat","show"===e?document.body.appendChild(n):"hide"===e&&document.body.removeChild(document.getElementById(n.id))};return{getWindowWidth:i,getWindowHeight:o,disabledDefaultMouseEvents:a,isDomain:r,setLandscapeMessage:s,loading:l}}(mui,$)}catch(e){console.log(e)}finally{}window.requestAnimationFrame||(window.requestAnimationFrame=window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(e){return window.setTimeout(e,17)}),window.cancelAnimationFrame||(window.cancelAnimationFrame=window.cancelRequestAnimationFrame||window.webkitCancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelAnimationFrame||window.mozCancelRequestAnimationFrame||window.msCancelAnimationFrame||window.msCancelRequestAnimationFrame||window.oCancelAnimationFrame||window.oCancelRequestAnimationFrame||window.clearTimeout);try{mui.modal=function(e,t,n){"use strict";var i,o,a=t('[data-role="modal"]'),r=t('<div class="modal-backdrop"></div>'),s=0,l="",c=function(){return-(t(".modal-content",i).innerHeight()/2)},d=function(){return-(t(".modal-content",i).outerWidth()/2)},u=function(){var e=t(".modal__close",i);e.length<1&&(e=t(".modal-btn-close",i));var n=parseInt(e.css("top"));return n<0?n*-1:0},h=function(){return e.common.getWindowHeight()<t(".modal-content",i).innerHeight()+u()},f=function(e){var n=!1;return"open"===e?a.each(function(){if("block"===t(this).css("display"))return n=t(this),!1}):"close"===e&&a.each(function(){if(t(this).hasClass("is-opened"))return n=t(this),!1}),n},m=function(n){if(i=t("#"+n),o=t(document.activeElement),t("a, area, input, button").trigger("blur"),f("open")){var l=f("open");l.addClass("is-opened")}else if(!f("open")){s=t(window).scrollTop();var u=navigator.userAgent,m=u.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i),p=u.match(/LG|SAMSUNG|Samsung/);if(null!=m||null!=p){var g=(t(window).width()/720).toFixed(5);t("#viewport").css("top",s*-1/g)}else t("#viewport").css("top",s*-1)}t("input,select,radio,checkbox").blur(),""===e.modal.openMotion&&(e.modal.openMotion="modal-scale"),a.length&&i.length&&(i.css({visible:"hidden",display:"block"}),"full"==i.attr("data-view")?t(".modal-content",i).css({"margin-top":0,"margin-left":0}):(t(".modal-content",i).delay(100).css({"margin-top":c(),"margin-left":d()}).addClass(e.modal.openMotion),h()&&setTimeout(function(){t(".modal-content",i).css({})},100)),i.attr("tabindex",0),r.height(t(document).innerHeight()).show(),t("body").append(r).addClass("modal-open"),i.removeAttr("style").fadeIn("fast"),i.find(".modal-content").addClass("is-opened"),t(window).scrollTop(0))},p=function(n,i){var a=t("#"+n);if(a.find(".modal-content").removeClass("is-opened"),a.hide(),f("close")!==!1){var r=f("close");return r.removeClass("is-opened"),!0}t(".modal-content").removeClass(e.modal.openMotion),t("body .modal-backdrop").fadeOut(0,function(){t("body").removeClass("modal-open"),t("#viewport").removeAttr("style"),t(window).scrollTop(s)}),"AREA"!==o[0].tagName&&o.focus()};return t('[data-toggle="modal"]').on("click",function(e){var n=t(this).attr("href").replace("#","");e.preventDefault(),m(n)}),t('[data-rel="back"]').on("click",function(e){e.stopPropagation();var n=t(this).closest(a).attr("id"),i=t(this).attr("data-target");return e.preventDefault(),"undefined"!=typeof i?"false"===i?(p(n),!0):(t(this).closest('[data-role="modal"]').hide(),t(this).removeAttr("data-target"),m(i),!0):void p(n)}),a.on("click",function(e){t(this).find('[data-rel="back"]').trigger("click")}),t(".modal-content").on("click",function(e){e.stopPropagation()}),t(window).resize(function(){var n=(e.common.getWindowWidth(),e.common.getWindowHeight());if("undefined"!=typeof i&&"block"===i.css("display")){if("full"===i.attr("data-view"))return!0;t(".modal-content",i).delay(100).css({"margin-top":c(),"margin-left":d()}),t(window).delay(200).scrollTop(0)}r.height(n)}),a.on("keydown",function(e){27===e.keyCode&&a.each(function(){"block"===t(this).css("display")&&p(t(this).attr("id").replace("#",""))})}),{open:m,close:p,openMotion:l}}(mui,jQuery)}catch(e){console.log(e)}finally{}try{mui.util=function(e,t,n){"use strict";var i=!1,o=function(e){var n=[];t(" img",e).each(function(e){n[e]=new Image,n[e].src=this.src,t.browser.msie&&(this.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='image',src='"+this.src+"')")})},a=function(e){for(var t=e.length,n=[],i=0;i<t;i++)n[i]=new Image,n[i].src=e[i];return n},r=function(){t(window).on("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll",function(e){e.preventDefault()}),t(window).on("keydown.disableScroll",function(e){for(var t=[32,33,34,35,36,37,38,39,40],n=0;n<t.length;n++)if(e.keyCode===t[n])return void e.preventDefault()})},s=function(){t(window).off(".disableScroll"),i=!1},l=function(e,n){return!!i||(r(),i=!0,void t("html, body").animate({scrollTop:e+"px"},700,function(){s(),i=!1,"function"==typeof n&&n()}))},c=function(e,t,n){return e>=t&&e<=n},d=function(e){return e.offset().top},u=function(e){return e.innerHeight()},h=function(e,t,n,i){var o=e.closest("div").innerWidth()/t,a=e.closest("div").innerHeight()/n,r=o>a?o:a;r*t<i&&(r=i/t),e.css({position:"absolute",width:r*t,height:r*n,left:"50%",marginLeft:r*t/2*-1})};return{ie8PNGFix:o,imageLoader:a,disableScrolling:r,enableScrolling:s,goToPosition:l,getBetween:c,getOffset:d,getHeight:u,setBackground:h,doScroll:i}}(mui,jQuery)}catch(e){console.log(e)}finally{}try{mui.validate=function(e,t,n){"use strict";var i=function(e){var t=/^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;return!!(t.test(e)&&e.length>9&&e.length<12)},o=function(e){var t=/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;return t.test(e)},a=function(e,t){e.each(function(){this.className===e.attr("class")?this.reset():this.id===e.attr("id")&&this.reset()}),e.find('input[type="radio"]').prop("checked",!1),e.find('input[type="checkbox"]').prop("checked",!1),e.find("label").removeClass("checked, is-checked")},r=function(e,t,n){var a=!0;return 0===e.val().length?a=!1:"tel"===t&&i(e.val())!==!0?a=!1:"email"===t&&o(e.val())!==!0&&(a=!1),a||e.focus(),a},s=function(e,t){var n=e.is(":checked");return!!n||(e.focus(),!1)},l=function(e,n){var i=t('input:radio[name="'+e+'"]:checked').val(),o=t('input:radio[name="'+e+'"]').eq(0);return o.focus(),"undefined"!=typeof i&&i};return{init:a,input:r,checkbox:s,radio:l}}(mui,jQuery)}catch(e){console.log(e)}finally{}ScrollSpy.prototype.init=function(){var e=this;e.onScroll(),e.$target.on("click",'[data-toggle="scrollspy"]',function(t){t.preventDefault(),e.goToScroll($(this).attr("href"))})},ScrollSpy.prototype.onScroll=function(){null!==this.opt&&(this.index=this.getCurrentPages(),this.offsetY=$(window).scrollTop(),(this.opt.isSticky||this.opt.extraHeight>0)&&(this.offsetY+=Math.round(this.opt.extraHeight)),this.$elem.removeClass(this.opt.onClassName),this.index>-1&&this.$elem.eq(this.index).addClass("is-active"))},ScrollSpy.prototype.goToScroll=function(e){var t=this;return!!t.isScrolling||(t.isScrolling=!0,mui.util.disableScrolling(),void $("html, body").animate({scrollTop:Math.round($(e).offset().top-this.opt.extraHeight)+"px"},700).promise().then(function(){t.isScrolling=!1,t.onScroll(),mui.util.enableScrolling(),$(window).trigger("scroll"),"function"==typeof t.opt.scrollEndCallback&&t.opt.scrollEndCallback()}))},ScrollSpy.prototype.getCurrentPages=function(){for(var e=-1,t=0;t<this.$pages.length;t++){var n=Math.floor(this.$pages[t].offset().top),i=Math.floor(this.$pages[t].innerHeight());mui.util.getBetween(this.offsetY,n,n+i)&&(e=t)}return e};try{!function(e,t,n){"use strict";var i=function(e,t){var n=e;return n.closest("label").length>0?n.closest("label"):n.parent().find('label[for="'+n.attr("id")+'"]')},o=t('input[data-input="tel"]');o.keypress(function(e){var t=event.which?event.which:event.keyCode;if(t>31&&(t<48||t>57))return!1}),o.keyup(function(e){var n=11,i=t(this);if(t(this).val(t(this).val().replace(/[^0-9]/gi,"")),n){var o=i.val();o.length>n&&(i.val(o.substring(0,n)),e.preventDefault())}});var a=t('input[data-input="number"]');a.keypress(function(e){var t=event.which?event.which:event.keyCode;if(t>31&&(t<48||t>57))return!1}),a.keyup(function(e){t(this);t(this).val(t(this).val().replace(/[^0-9]/gi,""))}),t("input, textarea").focusin(function(){var e=t(this);e.data("place-holder-text",e.attr("placeholder")),e.attr("placeholder","")}),t("input, textarea").focusout(function(){var e=t(this);e.attr("placeholder",e.data("place-holder-text"))}),t("input, textarea").keypress(function(e){13==e.which&&e.preventDefault()}),t('input[type="checkbox"],input[type="radio"]').on("focus",function(e){var n=t(this);if(!n.hasClass("is-custom"))return!0;var o=i(t(this),e);o.addClass("is-focused")}),t('input[type="checkbox"],input[type="radio"]').on("blur",function(e){var n=t(this);if(!n.hasClass("is-custom"))return!0;var o=i(t(this),e);o.hasClass("is-focused")&&o.removeClass("is-focused")}),t('input[type="checkbox"]').on("change",function(e){var n=t(this);if(!n.hasClass("is-custom"))return!0;var o=i(t(this),e),a=n.is(":checked");a?o.addClass("is-checked"):o.removeClass("is-checked")}),t('input[type="radio"]').on("change",function(e){var n=t(this);if(!n.hasClass("is-custom"))return!0;var o=i(t(this),e),a=t(this).attr("name");t('input[name="'+a+'"]').each(function(){var e=i(t(this));e.removeClass("is-checked checked")}),o.addClass("is-checked")}),t(document).on("input keyup","input[maxlength], textarea[maxlength]",function(e){var n=t(this),i=n.attr("maxlength");if(i){var o=n.val();return o.length>i&&(n.val(o.substring(0,i)),e.preventDefault()),o.length}})}(mui,$,void 0)}catch(e){console.log(e)}finally{}