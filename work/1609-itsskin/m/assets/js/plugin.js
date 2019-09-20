/**
 * Owl Carousel v2.1.6
 * Copyright 2013-2016 David Deutsch
 * Licensed under MIT (https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE)
 */
!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},a.each(["onResize","onThrottledResize"],a.proxy(function(b,c){this._handlers[c]=a.proxy(this[c],this)},this)),a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a.charAt(0).toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Workers,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}e.Defaults={items:3,loop:!1,center:!1,rewind:!1,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,fallbackEasing:"swing",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Type={Event:"event",State:"state"},e.Plugins={},e.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(a){var b=this.settings.margin||"",c=!this.settings.autoWidth,d=this.settings.rtl,e={width:"auto","margin-left":d?b:"","margin-right":d?"":b};!c&&this.$stage.children().css(e),a.css=e}},{filter:["width","items","settings"],run:function(a){var b=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,c=null,d=this._items.length,e=!this.settings.autoWidth,f=[];for(a.items={merge:!1,width:b};d--;)c=this._mergers[d],c=this.settings.mergeFit&&Math.min(c,this.settings.items)||c,a.items.merge=c>1||a.items.merge,f[d]=e?b*c:this._items[d].width();this._widths=f}},{filter:["items","settings"],run:function(){var b=[],c=this._items,d=this.settings,e=Math.max(2*d.items,4),f=2*Math.ceil(c.length/2),g=d.loop&&c.length?d.rewind?e:Math.max(e,f):0,h="",i="";for(g/=2;g--;)b.push(this.normalize(b.length/2,!0)),h+=c[b[b.length-1]][0].outerHTML,b.push(this.normalize(c.length-1-(b.length-1)/2,!0)),i=c[b[b.length-1]][0].outerHTML+i;this._clones=b,a(h).addClass("cloned").appendTo(this.$stage),a(i).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var a=this.settings.rtl?1:-1,b=this._clones.length+this._items.length,c=-1,d=0,e=0,f=[];++c<b;)d=f[c-1]||0,e=this._widths[this.relative(c)]+this.settings.margin,f.push(d+e*a);this._coordinates=f}},{filter:["width","items","settings"],run:function(){var a=this.settings.stagePadding,b=this._coordinates,c={width:Math.ceil(Math.abs(b[b.length-1]))+2*a,"padding-left":a||"","padding-right":a||""};this.$stage.css(c)}},{filter:["width","items","settings"],run:function(a){var b=this._coordinates.length,c=!this.settings.autoWidth,d=this.$stage.children();if(c&&a.items.merge)for(;b--;)a.css.width=this._widths[this.relative(b)],d.eq(b).css(a.css);else c&&(a.css.width=a.items.width,d.css(a.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(a){a.current=a.current?this.$stage.children().index(a.current):0,a.current=Math.max(this.minimum(),Math.min(this.maximum(),a.current)),this.reset(a.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;d>c;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass("active"),this.settings.center&&(this.$stage.children(".center").removeClass("center"),this.$stage.children().eq(this.current()).addClass("center"))}}],e.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var b,c,e;b=this.$element.find("img"),c=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,e=this.$element.children(c).width(),b.length&&0>=e&&this.preloadAutoWidthImages(b)}this.$element.addClass(this.options.loadingClass),this.$stage=a("<"+this.settings.stageElement+' class="'+this.settings.stageClass+'"/>').wrap('<div class="'+this.settings.stageOuterClass+'"/>'),this.$element.append(this.$stage.parent()),this.replace(this.$element.children().not(this.$stage.parent())),this.$element.is(":visible")?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){b>=a&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),"function"==typeof e.stagePadding&&(e.stagePadding=e.stagePadding()),delete e.responsive,e.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+d))):e=a.extend({},this.options),this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}})},e.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};c>b;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={},!this.is("valid")&&this.enter("valid")},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return this._items.length?this._width===this.$element.width()?!1:this.$element.is(":visible")?(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized"))):!1:!1},e.prototype.registerEventHandlers=function(){a.support.transition&&this.$stage.on(a.support.transition.end+".owl.core",a.proxy(this.onTransitionEnd,this)),this.settings.responsive!==!1&&this.on(b,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",a.proxy(this.onDragEnd,this)))},e.prototype.onDragStart=function(b){var d=null;3!==b.which&&(a.support.transform?(d=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),d={x:d[16===d.length?12:4],y:d[16===d.length?13:5]}):(d=this.$stage.position(),d={x:this.settings.rtl?d.left+this.$stage.width()-this.width()+this.settings.margin:d.left,y:d.top}),this.is("animating")&&(a.support.transform?this.animate(d.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===b.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=a(b.target),this._drag.stage.start=d,this._drag.stage.current=d,this._drag.pointer=this.pointer(b),a(c).on("mouseup.owl.core touchend.owl.core",a.proxy(this.onDragEnd,this)),a(c).one("mousemove.owl.core touchmove.owl.core",a.proxy(function(b){var d=this.difference(this._drag.pointer,this.pointer(b));a(c).on("mousemove.owl.core touchmove.owl.core",a.proxy(this.onDragMove,this)),Math.abs(d.x)<Math.abs(d.y)&&this.is("valid")||(b.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},e.prototype.onDragMove=function(a){var b=null,c=null,d=null,e=this.difference(this._drag.pointer,this.pointer(a)),f=this.difference(this._drag.stage.start,e);this.is("dragging")&&(a.preventDefault(),this.settings.loop?(b=this.coordinates(this.minimum()),c=this.coordinates(this.maximum()+1)-b,f.x=((f.x-b)%c+c)%c+b):(b=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum()),c=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum()),d=this.settings.pullDrag?-1*e.x/5:0,f.x=Math.max(Math.min(f.x,b+d),c+d)),this._drag.stage.current=f,this.animate(f.x))},e.prototype.onDragEnd=function(b){var d=this.difference(this._drag.pointer,this.pointer(b)),e=this._drag.stage.current,f=d.x>0^this.settings.rtl?"left":"right";a(c).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==d.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(e.x,0!==d.x?f:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=f,(Math.abs(d.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},e.prototype.closest=function(b,c){var d=-1,e=30,f=this.width(),g=this.coordinates();return this.settings.freeDrag||a.each(g,a.proxy(function(a,h){return"left"===c&&b>h-e&&h+e>b?d=a:"right"===c&&b>h-f-e&&h-f+e>b?d=a+1:this.op(b,"<",h)&&this.op(b,">",g[a+1]||h-f)&&(d="left"===c?a+1:a),-1===d},this)),this.settings.loop||(this.op(b,">",g[this.minimum()])?d=b=this.minimum():this.op(b,"<",g[this.maximum()])&&(d=b=this.maximum())),d},e.prototype.animate=function(b){var c=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),c&&(this.enter("animating"),this.trigger("translate")),a.support.transform3d&&a.support.transition?this.$stage.css({transform:"translate3d("+b+"px,0px,0px)",transition:this.speed()/1e3+"s"}):c?this.$stage.animate({left:b+"px"},this.speed(),this.settings.fallbackEasing,a.proxy(this.onTransitionEnd,this)):this.$stage.css({left:b+"px"})},e.prototype.is=function(a){return this._states.current[a]&&this._states.current[a]>0},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(b){return"string"===a.type(b)&&(this._invalidated[b]=!0,this.is("valid")&&this.leave("valid")),a.map(this._invalidated,function(a,b){return b})},e.prototype.reset=function(a){a=this.normalize(a),a!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(a,b){var c=this._items.length,e=b?0:this._clones.length;return!this.isNumeric(a)||1>c?a=d:(0>a||a>=c+e)&&(a=((a-e/2)%c+c)%c+e/2),a},e.prototype.relative=function(a){return a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=this.settings,f=this._coordinates.length;if(e.loop)f=this._clones.length/2+this._items.length-1;else if(e.autoWidth||e.merge){for(b=this._items.length,c=this._items[--b].width(),d=this.$element.width();b--&&(c+=this._items[b].width()+this.settings.margin,!(c>d)););f=b+1}else f=e.center?this._items.length-1:this._items.length-e.items;return a&&(f-=this._clones.length/2),Math.max(f,0)},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2===0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c,e=1,f=b-1;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(this.settings.rtl&&(e=-1,f=b+1),c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[f]||0))/2*e):c=this._coordinates[f]||0,c=Math.ceil(c))},e.prototype.duration=function(a,b,c){return 0===c?0:Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(a,b){var c=this.current(),d=null,e=a-this.relative(c),f=(e>0)-(0>e),g=this._items.length,h=this.minimum(),i=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(e)>g/2&&(e+=-1*f*g),a=c+e,d=((a-h)%g+g)%g+h,d!==a&&i>=d-e&&d-e>0&&(c=d-e,a=d,this.reset(c))):this.settings.rewind?(i+=1,a=(a%i+i)%i):a=Math.max(h,Math.min(i,a)),this.speed(this.duration(c,a,b)),this.current(a),this.$element.is(":visible")&&this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.onTransitionEnd=function(a){return a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0))?!1:(this.leave("animating"),void this.trigger("translated"))},e.prototype.viewport=function(){var d;if(this.options.responsiveBaseElement!==b)d=a(this.options.responsiveBaseElement).width();else if(b.innerWidth)d=b.innerWidth;else{if(!c.documentElement||!c.documentElement.clientWidth)throw"Can not detect viewport width.";d=c.documentElement.clientWidth}return d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)},this)),this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(b,c){var e=this.relative(this._current);c=c===d?this._items.length:this.normalize(c,!0),b=b instanceof jQuery?b:a(b),this.trigger("add",{content:b,position:c}),b=this.prepare(b),0===this._items.length||c===this._items.length?(0===this._items.length&&this.$stage.append(b),0!==this._items.length&&this._items[c-1].after(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)):(this._items[c].before(b),this._items.splice(c,0,b),this._mergers.splice(c,0,1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)),this._items[e]&&this.reset(this._items[e].index()),this.invalidate("items"),this.trigger("added",{content:b,position:c})},e.prototype.remove=function(a){a=this.normalize(a,!0),a!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.preloadAutoWidthImages=function(b){b.each(a.proxy(function(b,c){this.enter("pre-loading"),c=a(c),a(new Image).one("load",a.proxy(function(a){c.attr("src",a.target.src),c.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",c.attr("src")||c.attr("data-src")||c.attr("data-src-retina"))},this))},e.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),a(c).off(".owl.core"),this.settings.responsive!==!1&&(b.clearTimeout(this.resizeTimer),this.off(b,"resize",this._handlers.onThrottledResize));for(var d in this._plugins)this._plugins[d].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:c>a;case">":return d?c>a:a>c;case">=":return d?c>=a:a>=c;case"<=":return d?a>=c:c>=a}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d,f,g){var h={item:{count:this._items.length,index:this.current()}},i=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),j=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},h,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(j)}),this.register({type:e.Type.Event,name:b}),this.$element.trigger(j),this.settings&&"function"==typeof this.settings[i]&&this.settings[i].call(this,j)),j},e.prototype.enter=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]===d&&(this._states.current[b]=0),this._states.current[b]++},this))},e.prototype.leave=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]--},this))},e.prototype.register=function(b){if(b.type===e.Type.Event){if(a.event.special[b.name]||(a.event.special[b.name]={}),!a.event.special[b.name].owl){var c=a.event.special[b.name]._default;a.event.special[b.name]._default=function(a){return!c||!c.apply||a.namespace&&-1!==a.namespace.indexOf("owl")?a.namespace&&a.namespace.indexOf("owl")>-1:c.apply(this,arguments)},a.event.special[b.name].owl=!0}}else b.type===e.Type.State&&(this._states.tags[b.name]?this._states.tags[b.name]=this._states.tags[b.name].concat(b.tags):this._states.tags[b.name]=b.tags,this._states.tags[b.name]=a.grep(this._states.tags[b.name],a.proxy(function(c,d){return a.inArray(c,this._states.tags[b.name])===d},this)))},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.pointer=function(a){var c={x:null,y:null};return a=a.originalEvent||a||b.event,a=a.touches&&a.touches.length?a.touches[0]:a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:a,a.pageX?(c.x=a.pageX,c.y=a.pageY):(c.x=a.clientX,c.y=a.clientY),c},e.prototype.isNumeric=function(a){return!isNaN(parseFloat(a))},e.prototype.difference=function(a,b){return{x:a.x-b.x,y:a.y-b.y}},a.fn.owlCarousel=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),f=d.data("owl.carousel");f||(f=new e(this,"object"==typeof b&&b),d.data("owl.carousel",f),a.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(b,c){f.register({type:e.Type.Event,name:c}),f.$element.on(c+".owl.carousel.core",a.proxy(function(a){a.namespace&&a.relatedTarget!==this&&(this.suppress([c]),f[c].apply(this,[].slice.call(arguments,1)),this.release([c]))},f))})),"string"==typeof b&&"_"!==b.charAt(0)&&f[b].apply(f,c)})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoRefresh:!0,autoRefreshInterval:500},e.prototype.watch=function(){this._interval||(this._visible=this._core.$element.is(":visible"),this._interval=b.setInterval(a.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},e.prototype.refresh=function(){this._core.$element.is(":visible")!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},e.prototype.destroy=function(){var a,c;b.clearInterval(this._interval);for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoRefresh=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel resized.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type))for(var c=this._core.settings,e=c.center&&Math.ceil(c.items/2)||c.items,f=c.center&&-1*e||0,g=(b.property&&b.property.value!==d?b.property.value:this._core.current())+f,h=this._core.clones().length,i=a.proxy(function(a,b){this.load(b)},this);f++<e;)this.load(h/2+this._core.relative(g)),h&&a.each(this._core.clones(this._core.relative(g)),i),g++},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={lazyLoad:!1},e.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":"url("+g+")",opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&"position"==a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},e.prototype.update=function(){var b=this._core._current,c=b+this._core.settings.items,d=this._core.$stage.children().toArray().slice(b,c),e=[],f=0;a.each(d,function(b,c){e.push(a(c).height())}),f=Math.max.apply(null,e),this._core.$stage.parent().height(f).addClass(this._core.settings.autoHeightClass)},e.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.video&&this.isInFullScreen()&&a.preventDefault()},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .owl-video-frame").remove()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"===a.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};e.Defaults={video:!1,videoHeight:!1,videoWidth:!1},e.prototype.fetch=function(a,b){var c=function(){return a.attr("data-vimeo-id")?"vimeo":a.attr("data-vzaar-id")?"vzaar":"youtube"}(),d=a.attr("data-vimeo-id")||a.attr("data-youtube-id")||a.attr("data-vzaar-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else if(d[3].indexOf("vimeo")>-1)c="vimeo";else{if(!(d[3].indexOf("vzaar")>-1))throw new Error("Video URL not supported.");c="vzaar"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},e.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?'style="width:'+c.width+"px;height:"+c.height+'px;"':"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(a){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?'<div class="owl-video-tn '+j+'" '+i+'="'+a+'"></div>':'<div class="owl-video-tn" style="opacity:1;background-image:url('+a+')"></div>',b.after(d),b.after(e)};return b.wrap('<div class="owl-video-wrapper"'+g+"></div>"),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length?(l(h.attr(i)),h.remove(),!1):void("youtube"===c.type?(f="//img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type?a.ajax({type:"GET",url:"//vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}):"vzaar"===c.type&&a.ajax({type:"GET",url:"//vzaar.com/api/videos/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a.framegrab_url,l(f)}}))},e.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},e.prototype.play=function(b){var c,d=a(b.target),e=d.closest("."+this._core.settings.itemClass),f=this._videos[e.attr("data-video")],g=f.width||"100%",h=f.height||this._core.$stage.height();this._playing||(this._core.enter("playing"),this._core.trigger("play",null,"video"),e=this._core.items(this._core.relative(e.index())),this._core.reset(e.index()),"youtube"===f.type?c='<iframe width="'+g+'" height="'+h+'" src="//www.youtube.com/embed/'+f.id+"?autoplay=1&v="+f.id+'" frameborder="0" allowfullscreen></iframe>':"vimeo"===f.type?c='<iframe src="//player.vimeo.com/video/'+f.id+'?autoplay=1" width="'+g+'" height="'+h+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>':"vzaar"===f.type&&(c='<iframe frameborder="0"height="'+h+'"width="'+g+'" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/'+f.id+'/player?autoplay=true"></iframe>'),a('<div class="owl-video-frame">'+c+"</div>").insertAfter(e.find(".owl-video")),this._playing=e.addClass("owl-video-playing"))},e.prototype.isInFullScreen=function(){var b=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return b&&a(b).parent().hasClass("owl-video-frame")},e.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){a.namespace&&(this.swapping="translated"==a.type)},this),"translate.owl.carousel":a.proxy(function(a){a.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&a.support.animation&&a.support.transition){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.one(a.support.animation.end,c).css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g)),f&&e.one(a.support.animation.end,c).addClass("animated owl-animated-in").addClass(f))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null);
},a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._timeout=null,this._paused=!1,this._handlers={"changed.owl.carousel":a.proxy(function(a){a.namespace&&"settings"===a.property.name?this._core.settings.autoplay?this.play():this.stop():a.namespace&&"position"===a.property.name&&this._core.settings.autoplay&&this._setAutoPlayInterval()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":a.proxy(function(a,b,c){a.namespace&&this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(a){a.namespace&&this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this),"touchstart.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"touchend.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=a.extend({},e.Defaults,this._core.options)};e.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},e.prototype.play=function(a,b){this._paused=!1,this._core.is("rotating")||(this._core.enter("rotating"),this._setAutoPlayInterval())},e.prototype._getNextTimeout=function(d,e){return this._timeout&&b.clearTimeout(this._timeout),b.setTimeout(a.proxy(function(){this._paused||this._core.is("busy")||this._core.is("interacting")||c.hidden||this._core.next(e||this._core.settings.autoplaySpeed)},this),d||this._core.settings.autoplayTimeout)},e.prototype._setAutoPlayInterval=function(){this._timeout=this._getNextTimeout()},e.prototype.stop=function(){this._core.is("rotating")&&(b.clearTimeout(this._timeout),this._core.leave("rotating"))},e.prototype.pause=function(){this._core.is("rotating")&&(this._paused=!0)},e.prototype.destroy=function(){var a,b;this.stop();for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(b){this._core=b,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){b.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,0,this._templates.pop())},this),"remove.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&this.draw()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers)};e.Defaults={nav:!1,navText:["prev","next"],navSpeed:!1,navElement:"div",navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},e.prototype.initialize=function(){var b,c=this._core.settings;this._controls.$relative=(c.navContainer?a(c.navContainer):a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=a("<"+c.navElement+">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click",a.proxy(function(a){this.prev(c.navSpeed)},this)),this._controls.$next=a("<"+c.navElement+">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click",a.proxy(function(a){this.next(c.navSpeed)},this)),c.dotsData||(this._templates=[a("<div>").addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),this._controls.$absolute=(c.dotsContainer?a(c.dotsContainer):a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","div",a.proxy(function(b){var d=a(b.target).parent().is(this._controls.$absolute)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(d,c.dotsSpeed)},this));for(b in this._overrides)this._core[b]=a.proxy(this[b],this)},e.prototype.destroy=function(){var a,b,c,d;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},e.prototype.update=function(){var a,b,c,d=this._core.clones().length/2,e=d+this._core.items().length,f=this._core.maximum(!0),g=this._core.settings,h=g.center||g.autoWidth||g.dotsData?1:g.dotsEach||g.items;if("page"!==g.slideBy&&(g.slideBy=Math.min(g.slideBy,g.items)),g.dots||"page"==g.slideBy)for(this._pages=[],a=d,b=0,c=0;e>a;a++){if(b>=h||0===b){if(this._pages.push({start:Math.min(f,a-d),end:a-d+h-1}),Math.min(f,a-d)===f)break;b=0,++c}b+=this._core.mergers(this._core.relative(a))}},e.prototype.draw=function(){var b,c=this._core.settings,d=this._core.items().length<=c.items,e=this._core.relative(this._core.current()),f=c.loop||c.rewind;this._controls.$relative.toggleClass("disabled",!c.nav||d),c.nav&&(this._controls.$previous.toggleClass("disabled",!f&&e<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!f&&e>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!c.dots||d),c.dots&&(b=this._pages.length-this._controls.$absolute.children().length,c.dotsData&&0!==b?this._controls.$absolute.html(this._templates.join("")):b>0?this._controls.$absolute.append(new Array(b+1).join(this._templates[0])):0>b&&this._controls.$absolute.children().slice(b).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(a.inArray(this.current(),this._pages)).addClass("active"))},e.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotsData?1:c.dotsEach||c.items)}},e.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,a.proxy(function(a,c){return a.start<=b&&a.end>=b},this)).pop()},e.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},e.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},e.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},e.prototype.to=function(b,c,d){var e;!d&&this._pages.length?(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c)):a.proxy(this._overrides.to,this._core)(b,c)},a.fn.owlCarousel.Constructor.Plugins.Navigation=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(c){this._core=c,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(c){c.namespace&&"URLHash"===this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");if(!c)return;this._hashes[c]=b.content}},this),"changed.owl.carousel":a.proxy(function(c){if(c.namespace&&"position"===c.property.name){var d=this._core.items(this._core.relative(this._core.current())),e=a.map(this._hashes,function(a,b){return a===d?b:null}).join();if(!e||b.location.hash.slice(1)===e)return;b.location.hash=e}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(a){var c=b.location.hash.substring(1),e=this._core.$stage.children(),f=this._hashes[c]&&e.index(this._hashes[c]);f!==d&&f!==this._core.current()&&this._core.to(this._core.relative(f),!1,!0)},this))};e.Defaults={URLhashListener:!1},e.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){function e(b,c){var e=!1,f=b.charAt(0).toUpperCase()+b.slice(1);return a.each((b+" "+h.join(f+" ")+f).split(" "),function(a,b){return g[b]!==d?(e=c?b:!0,!1):void 0}),e}function f(a){return e(a,!0)}var g=a("<support>").get(0).style,h="Webkit Moz O ms".split(" "),i={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},j={csstransforms:function(){return!!e("transform")},csstransforms3d:function(){return!!e("perspective")},csstransitions:function(){return!!e("transition")},cssanimations:function(){return!!e("animation")}};j.csstransitions()&&(a.support.transition=new String(f("transition")),a.support.transition.end=i.transition.end[a.support.transition]),j.cssanimations()&&(a.support.animation=new String(f("animation")),a.support.animation.end=i.animation.end[a.support.animation]),j.csstransforms()&&(a.support.transform=new String(f("transform")),a.support.transform3d=j.csstransforms3d())}(window.Zepto||window.jQuery,window,document);
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
     */
    $("input, textarea").keypress(function(event) {
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
      return (mui.common.getWindowHeight() > $('.modal-content', $el).innerHeight() + getCloseButtonHeight() * 2) ?
        -($('.modal-content', $el).innerHeight() / 2) :
        ((mui.common.getWindowHeight() / 2 - getCloseButtonHeight()) - ($(window).innerHeight() * 0.02)) * -1;
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
        tmpPos = $(window).scrollTop();
        $('#viewport').css('top', tmpPos * -1);
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
                'margin-bottom': $('.modal-content', $el).offset().top
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
        
        $(window).scrollTop(0);
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
      $el.fadeOut('fast');

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
        $(window).scrollTop(tmpPos);
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
     * @event: 레이어팝업 영역 이 외 클릭 시 액션
     */
    $modal.on('click', function(e) {
      /**
       * 레이어 팝업에서 창 닫을 시 각각의 레이어 팝업 성향에 따라 액션이 다르기 때문에 trigger 로 대체
       */
      $(this).find('[data-rel="back"]').trigger('click');
    });

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
          'margin-left': getHorizontalMiddleValue(),
          'margin-bottom': $('.modal-content', $el).offset().top
        });

        $(window).delay(200).scrollTop(0);
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