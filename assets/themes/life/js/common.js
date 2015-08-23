/* ! Backstretch - v2.0.4 - 2013-06-19
* http://srobbin.com/jquery-plugins/backstretch/
* Copyright (c) 2013 Scott Robbin; Licensed MIT */
(function(a,d,p){a.fn.backstretch=function(c,b){(c===p||0===c.length)&&a.error("No images were supplied for Backstretch");0===a(d).scrollTop()&&d.scrollTo(0,0);return this.each(function(){var d=a(this),g=d.data("backstretch");if(g){if("string"==typeof c&&"function"==typeof g[c]){g[c](b);return;}
b=a.extend(g.options,b);g.destroy(!0);}
g=new q(this,c,b);d.data("backstretch",g);});};a.backstretch=function(c,b){return a("body").backstretch(c,b).data("backstretch");};a.expr[":"].backstretch=function(c){return a(c).data("backstretch")!==p;};a.fn.backstretch.defaults={centeredX:!0,centeredY:!0,duration:5e3,fade:0};var r={left:0,top:0,overflow:"hidden",margin:0,padding:0,height:"100%",width:"100%",zIndex:-999999},s={position:"absolute",display:"none",margin:0,padding:0,border:"none",width:"auto",height:"auto",maxHeight:"none",maxWidth:"none",zIndex:-999999},q=function(c,b,e){this.options=a.extend({},a.fn.backstretch.defaults,e||{});this.images=a.isArray(b)?b:[b];a.each(this.images,function(){a("<img />")[0].src=this;});this.isBody=c===document.body;this.$container=a(c);this.$root=this.isBody?l?a(d):a(document):this.$container;c=this.$container.children(".backstretch").first();this.$wrap=c.length?c:a('<div class="backstretch"></div>').css(r).appendTo(this.$container);this.isBody||(c=this.$container.css("position"),b=this.$container.css("zIndex"),this.$container.css({position:"static"===c?"relative":c,zIndex:"auto"===b?0:b,background:"none"}),this.$wrap.css({zIndex:-999998}));this.$wrap.css({position:this.isBody&&l?"fixed":"absolute"});this.index=0;this.show(this.index);a(d).on("resize.backstretch",a.proxy(this.resize,this)).on("orientationchange.backstretch",a.proxy(function(){this.isBody&&0===d.pageYOffset&&(d.scrollTo(0,1),this.resize());},this));};q.prototype={resize:function(){try{var a={left:0,top:0},b=this.isBody?this.$root.width():this.$root.innerWidth(),e=b,g=this.isBody?d.innerHeight?d.innerHeight:this.$root.height():this.$root.innerHeight(),j=e/this.$img.data("ratio"),f;j>=g?(f=(j-g)/2,this.options.centeredY&&(a.top="-"+f+"px")):(j=g,e=j*this.$img.data("ratio"),f=(e-b)/2,this.options.centeredX&&(a.left="-"+f+"px"));this.$wrap.css({width:b,height:g}).find("img:not(.deleteable)").css({width:e,height:j}).css(a);}catch(h){}
return this;},show:function(c){if(!(Math.abs(c)>this.images.length-1)){var b=this,e=b.$wrap.find("img").addClass("deleteable"),d={relatedTarget:b.$container[0]};b.$container.trigger(a.Event("backstretch.before",d),[b,c]);this.index=c;clearInterval(b.interval);b.$img=a("<img />").css(s).bind("load",function(f){var h=this.width||a(f.target).width();f=this.height||a(f.target).height();a(this).data("ratio",h/f);a(this).fadeIn(b.options.speed||b.options.fade,function(){e.remove();b.paused||b.cycle();a(["after","show"]).each(function(){b.$container.trigger(a.Event("backstretch."+this,d),[b,c]);});});b.resize();}).appendTo(b.$wrap);b.$img.attr("src",b.images[c]);return b;}},next:function(){return this.show(this.index<this.images.length-1?this.index+1:0);},prev:function(){return this.show(0===this.index?this.images.length-1:this.index-1);},pause:function(){this.paused=!0;return this;},resume:function(){this.paused=!1;this.next();return this;},cycle:function(){1<this.images.length&&(clearInterval(this.interval),this.interval=setInterval(a.proxy(function(){this.paused||this.next();},this),this.options.duration));return this;},destroy:function(c){a(d).off("resize.backstretch orientationchange.backstretch");clearInterval(this.interval);c||this.$wrap.remove();this.$container.removeData("backstretch");}};var l,f=navigator.userAgent,m=navigator.platform,e=f.match(/AppleWebKit\/([0-9]+)/),e=!!e&&e[1],h=f.match(/Fennec\/([0-9]+)/),h=!!h&&h[1],n=f.match(/Opera Mobi\/([0-9]+)/),t=!!n&&n[1],k=f.match(/MSIE ([0-9]+)/),k=!!k&&k[1];l=!((-1<m.indexOf("iPhone")||-1<m.indexOf("iPad")||-1<m.indexOf("iPod"))&&e&&534>e||d.operamini&&"[object OperaMini]"==={}.toString.call(d.operamini)||n&&7458>t||-1<f.indexOf("Android")&&e&&533>e||h&&6>h||"palmGetResource"in d&&e&&534>e||-1<f.indexOf("MeeGo")&&-1<f.indexOf("NokiaBrowser/8.5.0")||k&&6>=k);})(jQuery,window);

/* ! fancyBox v2.1.1 fancyapps.com | fancyapps.com/fancybox/#license */
(function(v,q,f,r){var p=f(v),n=f(q),b=f.fancybox=function(){b.open.apply(this,arguments)},A=null,m=q.createTouch!==r,y=function(a){return a&&a.hasOwnProperty&&a instanceof f},t=function(a){return a&&"string"===f.type(a)},D=function(a){return t(a)&&0<a.indexOf("%")},k=function(a,d){var e=parseInt(a,10)||0;d&&D(a)&&(e*=b.getViewport()[d]/100);return Math.ceil(e)},w=function(a,b){return k(a,b)+"px"};f.extend(b,{version:"2.1.1",defaults:{padding:0,margin:20,width:800,height:600,minWidth:100,minHeight:100,
maxWidth:9999,maxHeight:9999,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!m,autoCenter:!m,fitToView:!0,aspectRatio:!1,topRatio:0.5,leftRatio:0.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3E3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},keys:{next:{13:"left",34:"up",39:"left",40:"up"},
prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0"'+
(f.browser.msie?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",
openOpacity:!0,openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:f.noop,beforeLoad:f.noop,afterLoad:f.noop,beforeShow:f.noop,afterShow:f.noop,beforeChange:f.noop,beforeClose:f.noop,afterClose:f.noop},group:{},opts:{},previous:null,coming:null,current:null,
isActive:!1,isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(a,d){if(a&&(f.isPlainObject(d)||(d={}),!1!==b.close(!0)))return f.isArray(a)||(a=y(a)?f(a).get():[a]),f.each(a,function(e,c){var j={},g,h,i,l,k;"object"===f.type(c)&&(c.nodeType&&(c=f(c)),y(c)?(j={href:c.data("fancybox-href")||c.attr("href"),title:c.data("fancybox-title")||c.attr("title"),isDom:!0,element:c},f.metadata&&f.extend(!0,
j,c.metadata())):j=c);g=d.href||j.href||(t(c)?c:null);h=d.title!==r?d.title:j.title||"";l=(i=d.content||j.content)?"html":d.type||j.type;!l&&j.isDom&&(l=c.data("fancybox-type"),l||(l=(l=c.prop("class").match(/fancybox\.(\w+)/))?l[1]:null));t(g)&&(l||(b.isImage(g)?l="image":b.isSWF(g)?l="swf":"#"===g.charAt(0)?l="inline":t(c)&&(l="html",i=c)),"ajax"===l&&(k=g.split(/\s+/,2),g=k.shift(),k=k.shift()));i||("inline"===l?g?i=f(t(g)?g.replace(/.*(?=#[^\s]+$)/,""):g):j.isDom&&(i=c):"html"===l?i=g:!l&&(!g&&
j.isDom)&&(l="inline",i=c));f.extend(j,{href:g,type:l,content:i,title:h,selector:k});a[e]=j}),b.opts=f.extend(!0,{},b.defaults,d),d.keys!==r&&(b.opts.keys=d.keys?f.extend({},b.defaults.keys,d.keys):!1),b.group=a,b._start(b.opts.index)},cancel:function(){var a=b.coming;a&&!1!==b.trigger("onCancel")&&(b.hideLoading(),b.ajaxLoad&&b.ajaxLoad.abort(),b.ajaxLoad=null,b.imgPreload&&(b.imgPreload.onload=b.imgPreload.onerror=null),a.wrap&&a.wrap.stop(!0).trigger("onReset").remove(),b.current||b.trigger("afterClose"),
b.coming=null)},close:function(a){b.cancel();!1!==b.trigger("beforeClose")&&(b.unbindEvents(),!b.isOpen||!0===a?(f(".fancybox-wrap").stop(!0).trigger("onReset").remove(),b._afterZoomOut()):(b.isOpen=b.isOpened=!1,b.isClosing=!0,f(".fancybox-item, .fancybox-nav").remove(),b.wrap.stop(!0,!0).removeClass("fancybox-opened"),"fixed"===b.wrap.css("position")&&b.wrap.css(b._getPosition(!0)),b.transitions[b.current.closeMethod]()))},play:function(a){var d=function(){clearTimeout(b.player.timer)},e=function(){d();
b.current&&b.player.isActive&&(b.player.timer=setTimeout(b.next,b.current.playSpeed))},c=function(){d();f("body").unbind(".player");b.player.isActive=!1;b.trigger("onPlayEnd")};if(!0===a||!b.player.isActive&&!1!==a){if(b.current&&(b.current.loop||b.current.index<b.group.length-1))b.player.isActive=!0,f("body").bind({"afterShow.player onUpdate.player":e,"onCancel.player beforeClose.player":c,"beforeLoad.player":d}),e(),b.trigger("onPlayStart")}else c()},next:function(a){var d=b.current;d&&(t(a)||(a=
d.direction.next),b.jumpto(d.index+1,a,"next"))},prev:function(a){var d=b.current;d&&(t(a)||(a=d.direction.prev),b.jumpto(d.index-1,a,"prev"))},jumpto:function(a,d,e){var c=b.current;c&&(a=k(a),b.direction=d||c.direction[a>=c.index?"next":"prev"],b.router=e||"jumpto",c.loop&&(0>a&&(a=c.group.length+a%c.group.length),a%=c.group.length),c.group[a]!==r&&(b.cancel(),b._start(a)))},reposition:function(a,d){var e;b.isOpen&&(e=b._getPosition(d),a&&"scroll"===a.type?(delete e.position,b.wrap.stop(!0,!0).animate(e,
200)):b.wrap.css(e))},update:function(a){var d=a&&a.type,e=!d||"orientationchange"===d;e&&(clearTimeout(A),A=null);if(b.isOpen&&!A){if(e||m)b.wrap.removeAttr("style").addClass("fancybox-tmp"),b.trigger("onUpdate");A=setTimeout(function(){var c=b.current;c&&(b.wrap.removeClass("fancybox-tmp"),"scroll"!==d&&b._setDimension(),"scroll"===d&&c.canShrink||b.reposition(a),b.trigger("onUpdate"),A=null)},m?500:e?20:300)}},toggle:function(a){b.isOpen&&(b.current.fitToView="boolean"===f.type(a)?a:!b.current.fitToView,
b.update())},hideLoading:function(){n.unbind("keypress.fb");f("#fancybox-loading").remove()},showLoading:function(){var a,d;b.hideLoading();n.bind("keypress.fb",function(a){if(27===(a.which||a.keyCode))a.preventDefault(),b.cancel()});a=f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");b.defaults.fixed||(d=b.getViewport(),a.css({position:"absolute",top:0.5*d.h+d.y,left:0.5*d.w+d.x}))},getViewport:function(){var a=b.current&&b.current.locked||!1,d={x:p.scrollLeft(),
y:p.scrollTop()};a?(d.w=a[0].clientWidth,d.h=a[0].clientHeight):(d.w=m&&v.innerWidth?v.innerWidth:p.width(),d.h=m&&v.innerHeight?v.innerHeight:p.height());return d},unbindEvents:function(){b.wrap&&y(b.wrap)&&b.wrap.unbind(".fb");n.unbind(".fb");p.unbind(".fb")},bindEvents:function(){var a=b.current,d;a&&(p.bind("orientationchange.fb"+(a.autoResize?" resize.fb":"")+(a.autoCenter&&!a.locked?" scroll.fb":""),b.update),(d=a.keys)&&n.bind("keydown.fb",function(e){var c=e.which||e.keyCode,j=e.target||e.srcElement;
!e.ctrlKey&&(!e.altKey&&!e.shiftKey&&!e.metaKey&&(!j||!j.type&&!f(j).is("[contenteditable]")))&&f.each(d,function(d,j){if(1<a.group.length&&j[c]!==r)return b[d](j[c]),e.preventDefault(),!1;if(-1<f.inArray(c,j))return b[d](),e.preventDefault(),!1})}),f.fn.mousewheel&&a.mouseWheel&&b.wrap.bind("mousewheel.fb",function(d,c,j,g){for(var h=f(d.target||null),i=!1;h.length&&!i&&!h.is(".fancybox-skin")&&!h.is(".fancybox-wrap");)i=h[0]&&!(h[0].style.overflow&&"hidden"===h[0].style.overflow)&&(h[0].clientWidth&&
h[0].scrollWidth>h[0].clientWidth||h[0].clientHeight&&h[0].scrollHeight>h[0].clientHeight),h=f(h).parent();if(0!==c&&!i&&1<b.group.length&&!a.canShrink){if(0<g||0<j)b.prev(0<g?"down":"left");else if(0>g||0>j)b.next(0>g?"up":"right");d.preventDefault()}}))},trigger:function(a,d){var e,c=d||b.coming||b.current;if(c){f.isFunction(c[a])&&(e=c[a].apply(c,Array.prototype.slice.call(arguments,1)));if(!1===e)return!1;"onCancel"===a&&!b.isOpened&&(b.isActive=!1);c.helpers&&f.each(c.helpers,function(d,e){e&&
(b.helpers[d]&&f.isFunction(b.helpers[d][a]))&&(e=f.extend(!0,{},b.helpers[d].defaults,e),b.helpers[d][a](e,c))});f.event.trigger(a+".fb")}},isImage:function(a){return t(a)&&a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp)((\?|#).*)?$)/i)},isSWF:function(a){return t(a)&&a.match(/\.(swf)((\?|#).*)?$/i)},_start:function(a){var d={},e,c,a=k(a);e=b.group[a]||null;if(!e)return!1;d=f.extend(!0,{},b.opts,e);e=d.margin;c=d.padding;"number"===f.type(e)&&(d.margin=[e,e,e,e]);"number"===f.type(c)&&
(d.padding=[c,c,c,c]);d.modal&&f.extend(!0,d,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}});d.autoSize&&(d.autoWidth=d.autoHeight=!0);"auto"===d.width&&(d.autoWidth=!0);"auto"===d.height&&(d.autoHeight=!0);d.group=b.group;d.index=a;b.coming=d;if(!1===b.trigger("beforeLoad"))b.coming=null;else{c=d.type;e=d.href;if(!c)return b.coming=null,b.current&&b.router&&"jumpto"!==b.router?(b.current.index=a,b[b.router](b.direction)):!1;b.isActive=
!0;if("image"===c||"swf"===c)d.autoHeight=d.autoWidth=!1,d.scrolling="visible";"image"===c&&(d.aspectRatio=!0);"iframe"===c&&m&&(d.scrolling="scroll");d.wrap=f(d.tpl.wrap).addClass("fancybox-"+(m?"mobile":"desktop")+" fancybox-type-"+c+" fancybox-tmp "+d.wrapCSS).appendTo(d.parent||"body");f.extend(d,{skin:f(".fancybox-skin",d.wrap),outer:f(".fancybox-outer",d.wrap),inner:f(".fancybox-inner",d.wrap)});f.each(["Top","Right","Bottom","Left"],function(a,b){d.skin.css("padding"+b,w(d.padding[a]))});b.trigger("onReady");
if("inline"===c||"html"===c){if(!d.content||!d.content.length)return b._error("content")}else if(!e)return b._error("href");"image"===c?b._loadImage():"ajax"===c?b._loadAjax():"iframe"===c?b._loadIframe():b._afterLoad()}},_error:function(a){f.extend(b.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:a,content:b.coming.tpl.error});b._afterLoad()},_loadImage:function(){var a=b.imgPreload=new Image;a.onload=function(){this.onload=this.onerror=null;b.coming.width=
this.width;b.coming.height=this.height;b._afterLoad()};a.onerror=function(){this.onload=this.onerror=null;b._error("image")};a.src=b.coming.href;(a.complete===r||!a.complete)&&b.showLoading()},_loadAjax:function(){var a=b.coming;b.showLoading();b.ajaxLoad=f.ajax(f.extend({},a.ajax,{url:a.href,error:function(a,e){b.coming&&"abort"!==e?b._error("ajax",a):b.hideLoading()},success:function(d,e){"success"===e&&(a.content=d,b._afterLoad())}}))},_loadIframe:function(){var a=b.coming,d=f(a.tpl.iframe.replace(/\{rnd\}/g,
(new Date).getTime())).attr("scrolling",m?"auto":a.iframe.scrolling).attr("src",a.href);f(a.wrap).bind("onReset",function(){try{f(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(a){}});a.iframe.preload&&(b.showLoading(),d.one("load",function(){f(this).data("ready",1);m||f(this).bind("load.fb",b.update);f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();b._afterLoad()}));a.content=d.appendTo(a.inner);a.iframe.preload||b._afterLoad()},_preloadImages:function(){var a=
b.group,d=b.current,e=a.length,c=d.preload?Math.min(d.preload,e-1):0,f,g;for(g=1;g<=c;g+=1)f=a[(d.index+g)%e],"image"===f.type&&f.href&&((new Image).src=f.href)},_afterLoad:function(){var a=b.coming,d=b.current,e,c,j,g,h;b.hideLoading();if(a&&!1!==b.isActive)if(!1===b.trigger("afterLoad",a,d))a.wrap.stop(!0).trigger("onReset").remove(),b.coming=null;else{d&&(b.trigger("beforeChange",d),d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove(),"fixed"===d.wrap.css("position")&&
d.wrap.css(b._getPosition(!0)));b.unbindEvents();e=a.content;c=a.type;j=a.scrolling;f.extend(b,{wrap:a.wrap,skin:a.skin,outer:a.outer,inner:a.inner,current:a,previous:d});g=a.href;switch(c){case "inline":case "ajax":case "html":a.selector?e=f("<div>").html(e).find(a.selector):y(e)&&(e.data("fancybox-placeholder")||e.data("fancybox-placeholder",f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()),e=e.show().detach(),a.wrap.bind("onReset",function(){f(this).find(e).length&&e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder",
!1)}));break;case "image":e=a.tpl.image.replace("{href}",g);break;case "swf":e='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+g+'"></param>',h="",f.each(a.swf,function(a,b){e+='<param name="'+a+'" value="'+b+'"></param>';h+=" "+a+'="'+b+'"'}),e+='<embed src="'+g+'" type="application/x-shockwave-flash" width="100%" height="100%"'+h+"></embed></object>"}(!y(e)||!e.parent().is(a.inner))&&a.inner.append(e);b.trigger("beforeShow");
a.inner.css("overflow","yes"===j?"scroll":"no"===j?"hidden":j);b._setDimension();a.wrap.removeClass("fancybox-tmp");a.pos=f.extend({},a.dim,b._getPosition(!0));b.isOpen=!1;b.coming=null;b.bindEvents();if(b.isOpened){if(d.prevMethod)b.transitions[d.prevMethod]()}else f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();b.transitions[b.isOpened?a.nextMethod:a.openMethod]();b._preloadImages()}},_setDimension:function(){var a=b.getViewport(),d=0,e=!1,c=!1,e=b.wrap,j=b.skin,g=b.inner,h=
b.current,c=h.width,i=h.height,l=h.minWidth,u=h.minHeight,m=h.maxWidth,n=h.maxHeight,t=h.scrolling,r=h.scrollOutside?h.scrollbarWidth:0,x=h.margin,p=x[1]+x[3],q=x[0]+x[2],y,s,v,B,z,E,A,C,F;e.add(j).add(g).width("auto").height("auto");x=j.outerWidth(!0)-j.width();y=j.outerHeight(!0)-j.height();s=p+x;v=q+y;B=D(c)?(a.w-s)*k(c)/100:c;z=D(i)?(a.h-v)*k(i)/100:i;if("iframe"===h.type){if(F=h.content,h.autoHeight&&1===F.data("ready"))try{F[0].contentWindow.document.location&&(g.width(B).height(9999),E=F.contents().find("body"),
r&&E.css("overflow-x","hidden"),z=E.height())}catch(G){}}else if(h.autoWidth||h.autoHeight)g.addClass("fancybox-tmp"),h.autoWidth||g.width(B),h.autoHeight||g.height(z),h.autoWidth&&(B=g.width()),h.autoHeight&&(z=g.height()),g.removeClass("fancybox-tmp");c=k(B);i=k(z);C=B/z;l=k(D(l)?k(l,"w")-s:l);m=k(D(m)?k(m,"w")-s:m);u=k(D(u)?k(u,"h")-v:u);n=k(D(n)?k(n,"h")-v:n);E=m;A=n;p=a.w-p;q=a.h-q;h.aspectRatio?(c>m&&(c=m,i=c/C),i>n&&(i=n,c=i*C),c<l&&(c=l,i=c/C),i<u&&(i=u,c=i*C)):(c=Math.max(l,Math.min(c,m)),
i=Math.max(u,Math.min(i,n)));if(h.fitToView)if(m=Math.min(a.w-s,m),n=Math.min(a.h-v,n),g.width(k(c)).height(k(i)),e.width(k(c+x)),a=e.width(),s=e.height(),h.aspectRatio)for(;(a>p||s>q)&&(c>l&&i>u)&&!(19<d++);)i=Math.max(u,Math.min(n,i-10)),c=i*C,c<l&&(c=l,i=c/C),c>m&&(c=m,i=c/C),g.width(k(c)).height(k(i)),e.width(k(c+x)),a=e.width(),s=e.height();else c=Math.max(l,Math.min(c,c-(a-p))),i=Math.max(u,Math.min(i,i-(s-q)));r&&("auto"===t&&i<z&&c+x+r<p)&&(c+=r);g.width(k(c)).height(k(i));e.width(k(c+x));
a=e.width();s=e.height();e=(a>p||s>q)&&c>l&&i>u;c=h.aspectRatio?c<E&&i<A&&c<B&&i<z:(c<E||i<A)&&(c<B||i<z);f.extend(h,{dim:{width:w(a),height:w(s)},origWidth:B,origHeight:z,canShrink:e,canExpand:c,wPadding:x,hPadding:y,wrapSpace:s-j.outerHeight(!0),skinSpace:j.height()-i});!F&&(h.autoHeight&&i>u&&i<n&&!c)&&g.height("auto")},_getPosition:function(a){var d=b.current,e=b.getViewport(),c=d.margin,f=b.wrap.width()+c[1]+c[3],g=b.wrap.height()+c[0]+c[2],c={position:"absolute",top:c[0],left:c[3]};d.autoCenter&&
d.fixed&&!a&&g<=e.h&&f<=e.w?c.position="fixed":d.locked||(c.top+=e.y,c.left+=e.x);c.top=w(Math.max(c.top,c.top+(e.h-g)*d.topRatio));c.left=w(Math.max(c.left,c.left+(e.w-f)*d.leftRatio));return c},_afterZoomIn:function(){var a=b.current;a&&(b.isOpen=b.isOpened=!0,b.wrap.addClass("fancybox-opened").css("overflow","visible"),b.reposition(),(a.closeClick||a.nextClick)&&b.inner.css("cursor","pointer").bind("click.fb",function(d){if(!f(d.target).is("a")&&!f(d.target).parent().is("a"))b[a.closeClick?"close":
"next"]()}),a.closeBtn&&f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb",b.close),a.arrows&&1<b.group.length&&((a.loop||0<a.index)&&f(a.tpl.prev).appendTo(b.outer).bind("click.fb",b.prev),(a.loop||a.index<b.group.length-1)&&f(a.tpl.next).appendTo(b.outer).bind("click.fb",b.next)),b.trigger("afterShow"),!a.loop&&a.index===a.group.length-1?b.play(!1):b.opts.autoPlay&&!b.player.isActive&&(b.opts.autoPlay=!1,b.play()))},_afterZoomOut:function(){var a=b.current;f(".fancybox-wrap").stop(!0).trigger("onReset").remove();
f.extend(b,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null});b.trigger("afterClose",a)}});b.transitions={getOrigPosition:function(){var a=b.current,d=a.element,e=a.orig,c={},f=50,g=50,h=a.hPadding,i=a.wPadding,l=b.getViewport();!e&&(a.isDom&&d.is(":visible"))&&(e=d.find("img:first"),e.length||(e=d));y(e)?(c=e.offset(),e.is("img")&&(f=e.outerWidth(),g=e.outerHeight())):(c.top=l.y+(l.h-g)*a.topRatio,c.left=l.x+(l.w-f)*
a.leftRatio);a.locked&&(c.top-=l.y,c.left-=l.x);return c={top:w(c.top-h*a.topRatio),left:w(c.left-i*a.leftRatio),width:w(f+i),height:w(g+h)}},step:function(a,d){var e,c,f=d.prop;c=b.current;var g=c.wrapSpace,h=c.skinSpace;if("width"===f||"height"===f)e=d.end===d.start?1:(a-d.start)/(d.end-d.start),b.isClosing&&(e=1-e),c="width"===f?c.wPadding:c.hPadding,c=a-c,b.skin[f](k("width"===f?c:c-g*e)),b.inner[f](k("width"===f?c:c-g*e-h*e))},zoomIn:function(){var a=b.current,d=a.pos,e=a.openEffect,c="elastic"===
e,j=f.extend({opacity:1},d);delete j.position;c?(d=this.getOrigPosition(),a.openOpacity&&(d.opacity=0.1)):"fade"===e&&(d.opacity=0.1);b.wrap.css(d).animate(j,{duration:"none"===e?0:a.openSpeed,easing:a.openEasing,step:c?this.step:null,complete:b._afterZoomIn})},zoomOut:function(){var a=b.current,d=a.closeEffect,e="elastic"===d,c={opacity:0.1};e&&(c=this.getOrigPosition(),a.closeOpacity&&(c.opacity=0.1));b.wrap.animate(c,{duration:"none"===d?0:a.closeSpeed,easing:a.closeEasing,step:e?this.step:null,
complete:b._afterZoomOut})},changeIn:function(){var a=b.current,d=a.nextEffect,e=a.pos,c={opacity:1},f=b.direction,g;e.opacity=0.1;"elastic"===d&&(g="down"===f||"up"===f?"top":"left","down"===f||"right"===f?(e[g]=w(k(e[g])-200),c[g]="+=200px"):(e[g]=w(k(e[g])+200),c[g]="-=200px"));"none"===d?b._afterZoomIn():b.wrap.css(e).animate(c,{duration:a.nextSpeed,easing:a.nextEasing,complete:b._afterZoomIn})},changeOut:function(){var a=b.previous,d=a.prevEffect,e={opacity:0.1},c=b.direction;"elastic"===d&&
(e["down"===c||"up"===c?"top":"left"]=("up"===c||"left"===c?"-":"+")+"=200px");a.wrap.animate(e,{duration:"none"===d?0:a.prevSpeed,easing:a.prevEasing,complete:function(){f(this).trigger("onReset").remove()}})}};b.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!0},overlay:null,update:function(){var a="100%",b;this.overlay.width(a).height("100%");f.browser.msie?(b=Math.max(q.documentElement.offsetWidth,q.body.offsetWidth),n.width()>b&&(a=n.width())):n.width()>p.width()&&
(a=n.width());this.overlay.width(a).height(n.height())},onReady:function(a,b){f(".fancybox-overlay").stop(!0,!0);this.overlay||f.extend(this,{overlay:f('<div class="fancybox-overlay"></div>').appendTo(b.parent||"body"),margin:n.height()>p.height()||"scroll"===f("body").css("overflow-y")?f("body").css("margin-right"):!1,el:q.all&&!q.querySelector?f("html"):f("body")});b.fixed&&!m&&(this.overlay.addClass("fancybox-overlay-fixed"),b.autoCenter&&a.locked&&(b.locked=this.overlay.append(b.wrap)));!0===
a.showEarly&&this.beforeShow.apply(this,arguments)},beforeShow:function(a,d){var e=this.overlay.unbind(".fb").width("auto").height("auto").css(a.css);a.closeClick&&e.bind("click.fb",function(a){f(a.target).hasClass("fancybox-overlay")&&b.close()});d.fixed&&!m?d.locked&&(this.el.addClass("fancybox-lock"),!1!==this.margin&&f("body").css("margin-right",k(this.margin)+d.scrollbarWidth)):this.update();e.show()},onUpdate:function(a,b){(!b.fixed||m)&&this.update()},afterClose:function(a){var d=this,a=a.speedOut||
0;d.overlay&&!b.isActive&&d.overlay.fadeOut(a||0,function(){f("body").css("margin-right",d.margin);d.el.removeClass("fancybox-lock");d.overlay.remove();d.overlay=null})}};b.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(a){var d=b.current,e=d.title,c=a.type;f.isFunction(e)&&(e=e.call(d.element,d));if(t(e)&&""!==f.trim(e)){d=f('<div class="fancybox-title fancybox-title-'+c+'-wrap">'+e+"</div>");switch(c){case "inside":c=b.skin;break;case "outside":c=b.wrap;break;case "over":c=
b.inner;break;default:c=b.skin,d.appendTo("body"),f.browser.msie&&d.width(d.width()),d.wrapInner('<span class="child"></span>'),b.current.margin[2]+=Math.abs(k(d.css("margin-bottom")))}d["top"===a.position?"prependTo":"appendTo"](c)}}};f.fn.fancybox=function(a){var d,e=f(this),c=this.selector||"",j=function(g){var h=f(this).blur(),i=d,j,k;!g.ctrlKey&&(!g.altKey&&!g.shiftKey&&!g.metaKey)&&!h.is(".fancybox-wrap")&&(j=a.groupAttr||"data-fancybox-group",k=h.attr(j),k||(j="rel",k=h.get(0)[j]),k&&(""!==
k&&"nofollow"!==k)&&(h=c.length?f(c):e,h=h.filter("["+j+'="'+k+'"]'),i=h.index(this)),a.index=i,!1!==b.open(h,a)&&g.preventDefault())},a=a||{};d=a.index||0;!c||!1===a.live?e.unbind("click.fb-start").bind("click.fb-start",j):n.undelegate(c,"click.fb-start").delegate(c+":not('.fancybox-item, .fancybox-nav')","click.fb-start",j);return this};n.ready(function(){f.scrollbarWidth===r&&(f.scrollbarWidth=function(){var a=f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
b=a.children(),b=b.innerWidth()-b.height(99).innerWidth();a.remove();return b});if(f.support.fixedPosition===r){var a=f.support,d=f('<div style="position:fixed;top:20px;"></div>').appendTo("body"),e=20===d[0].offsetTop||15===d[0].offsetTop;d.remove();a.fixedPosition=e}f.extend(b.defaults,{scrollbarWidth:f.scrollbarWidth(),fixed:f.support.fixedPosition,parent:f("body")})})})(window,document,jQuery);

/* ! infinite-scroll */
(function(e,t,n){"use strict";t.infinitescroll=function(n,r,i){this.element=t(i);if(!this._create(n,r)){this.failed=true;}};t.infinitescroll.defaults={loading:{finished:n,finishedMsg:"<em>Congratulations, you've reached the end of the internet.</em>",msg:null,msgText:"<em>Loading the next set of posts...</em>",img:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAgMAAABieywaAAAADFBMVEXd3d0AAAClpaWQkJBuIHrzAAAACklEQVQImWM4AAAAwgDB7oCXhgAAAABJRU5ErkJggg==",selector:null,speed:"fast",start:n},state:{isDuringAjax:false,isInvalidPage:false,isDestroyed:false,isDone:false,isPaused:false,isBeyondMaxPage:false,currPage:1},debug:false,behavior:n,binder:t(e),nextSelector:"div.navigation a:first",navSelector:"div.navigation",contentSelector:null,extraScrollPx:150,itemSelector:"div.post",animate:false,pathParse:n,dataType:"html",appendCallback:true,bufferPx:40,errorCallback:function(){},infid:0,pixelsFromNavToBottom:n,path:n,prefill:false,maxPage:n};t.infinitescroll.prototype={_binding:function(t){var r=this,i=r.options;i.v="2.0b2.120520";if(!!i.behavior&&this["_binding_"+i.behavior]!==n){this["_binding_"+i.behavior].call(this);return;}
if(t!=="bind"&&t!=="unbind"){this._debug("Binding value  "+t+" not valid");return false;}
if(t==="unbind"){this.options.binder.unbind("smartscroll.infscr."+r.options.infid);}else{this.options.binder[t]("smartscroll.infscr."+r.options.infid,function(){r.scroll();});}
this._debug("Binding",t);},_create:function(i,s){var o=t.extend(true,{},t.infinitescroll.defaults,i);this.options=o;var u=t(e);var a=this;if(!a._validate(i)){return false;}
var f=t(o.nextSelector).attr("href");if(!f){this._debug("Navigation selector not found");return false;}
o.path=o.path||this._determinepath(f);o.contentSelector=o.contentSelector||this.element;o.loading.selector=o.loading.selector||o.contentSelector;o.loading.msg=o.loading.msg||t('<div id="infscr-loading" class="align-center">'+o.loading.msgText+"</div>");new Image().src=o.loading.img;if(o.pixelsFromNavToBottom===n){o.pixelsFromNavToBottom=t(document).height()-t(o.navSelector).offset().top;this._debug("pixelsFromNavToBottom: "+o.pixelsFromNavToBottom);}
var l=this;o.loading.start=o.loading.start||function(){t(o.navSelector).hide();o.loading.msg.appendTo(o.loading.selector).show(o.loading.speed,t.proxy(function(){this.beginAjax(o);},l));};o.loading.finished=o.loading.finished||function(){if(!o.state.isBeyondMaxPage)o.loading.msg.fadeOut(o.loading.speed);};o.callback=function(e,r,i){if(!!o.behavior&&e["_callback_"+o.behavior]!==n){e["_callback_"+o.behavior].call(t(o.contentSelector)[0],r,i);}
if(s){s.call(t(o.contentSelector)[0],r,o,i);}
if(o.prefill){u.bind("resize.infinite-scroll",e._prefill);}};if(i.debug){if(Function.prototype.bind&&(typeof console==="object"||typeof console==="function")&&typeof console.log==="object"){["log","info","warn","error","assert","dir","clear","profile","profileEnd"].forEach(function(e){console[e]=this.call(console[e],console);},Function.prototype.bind);}}
this._setup();if(o.prefill){this._prefill();}
return true;},_prefill:function(){function s(){return r.options.contentSelector.height()<=i.height();}
var r=this;var i=t(e);this._prefill=function(){if(s()){r.scroll();}
i.bind("resize.infinite-scroll",function(){if(s()){i.unbind("resize.infinite-scroll");r.scroll();}});};this._prefill();},_debug:function(){if(true!==this.options.debug){return;}
if(typeof console!=="undefined"&&typeof console.log==="function"){if(Array.prototype.slice.call(arguments).length===1&&typeof Array.prototype.slice.call(arguments)[0]==="string"){console.log(Array.prototype.slice.call(arguments).toString());}else{console.log(Array.prototype.slice.call(arguments));}}else if(!Function.prototype.bind&&typeof console!=="undefined"&&typeof console.log==="object"){Function.prototype.call.call(console.log,console,Array.prototype.slice.call(arguments));}},_determinepath:function(t){var r=this.options;if(!!r.behavior&&this["_determinepath_"+r.behavior]!==n){return this["_determinepath_"+r.behavior].call(this,t);}
if(!!r.pathParse){this._debug("pathParse manual");return r.pathParse(t,this.options.state.currPage+1);}else if(t.match(/^(.*?)\b2\b(.*?$)/)){t=t.match(/^(.*?)\b2\b(.*?$)/).slice(1);}else if(t.match(/^(.*?)2(.*?$)/)){if(t.match(/^(.*?page=)2(\/.*|$)/)){t=t.match(/^(.*?page=)2(\/.*|$)/).slice(1);return t;}
t=t.match(/^(.*?)2(.*?$)/).slice(1);}else{if(t.match(/^(.*?page=)1(\/.*|$)/)){t=t.match(/^(.*?page=)1(\/.*|$)/).slice(1);return t;}else{this._debug("Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com.");r.state.isInvalidPage=true;}}
this._debug("determinePath",t);return t;},_error:function(t){var r=this.options;if(!!r.behavior&&this["_error_"+r.behavior]!==n){this["_error_"+r.behavior].call(this,t);return;}
if(t!=="destroy"&&t!=="end"){t="unknown";}
this._debug("Error",t);if(t==="end"||r.state.isBeyondMaxPage){this._showdonemsg();}
r.state.isDone=true;r.state.currPage=1;r.state.isPaused=false;r.state.isBeyondMaxPage=false;this._binding("unbind");},_loadcallback:function(i,s,o){var u=this.options,a=this.options.callback,f=u.state.isDone?"done":!u.appendCallback?"no-append":"append",l;if(!!u.behavior&&this["_loadcallback_"+u.behavior]!==n){this["_loadcallback_"+u.behavior].call(this,i,s);return;}
switch(f){case"done":this._showdonemsg();return false;case"no-append":if(u.dataType==="html"){s="<div>"+s+"</div>";s=t(s).find(u.itemSelector);}
break;case"append":var c=i.children();if(c.length===0){return this._error("end");}
l=document.createDocumentFragment();while(i[0].firstChild){l.appendChild(i[0].firstChild);}
this._debug("contentSelector",t(u.contentSelector)[0]);t(u.contentSelector)[0].appendChild(l);s=c.get();break;}
u.loading.finished.call(t(u.contentSelector)[0],u);if(u.animate){var h=t(e).scrollTop()+t(u.loading.msg).height()+u.extraScrollPx+"px";t("html,body").animate({scrollTop:h},800,function(){u.state.isDuringAjax=false;});}
if(!u.animate){u.state.isDuringAjax=false;}
a(this,s,o);if(u.prefill){this._prefill();}},_nearbottom:function(){var i=this.options,s=0+t(document).height()-i.binder.scrollTop()-t(e).height();if(!!i.behavior&&this["_nearbottom_"+i.behavior]!==n){return this["_nearbottom_"+i.behavior].call(this);}
this._debug("math:",s,i.pixelsFromNavToBottom);return s-i.bufferPx<i.pixelsFromNavToBottom;},_pausing:function(t){var r=this.options;if(!!r.behavior&&this["_pausing_"+r.behavior]!==n){this["_pausing_"+r.behavior].call(this,t);return;}
if(t!=="pause"&&t!=="resume"&&t!==null){this._debug("Invalid argument. Toggling pause value instead");}
t=t&&(t==="pause"||t==="resume")?t:"toggle";switch(t){case"pause":r.state.isPaused=true;break;case"resume":r.state.isPaused=false;break;case"toggle":r.state.isPaused=!r.state.isPaused;break;}
this._debug("Paused",r.state.isPaused);return false;},_setup:function(){var t=this.options;if(!!t.behavior&&this["_setup_"+t.behavior]!==n){this["_setup_"+t.behavior].call(this);return;}
this._binding("bind");return false;},_showdonemsg:function(){var r=this.options;if(!!r.behavior&&this["_showdonemsg_"+r.behavior]!==n){this["_showdonemsg_"+r.behavior].call(this);return;}
r.loading.msg.find("img").hide().parent().find("div").html(r.loading.finishedMsg).animate({opacity:1},2e3,function(){t(this).parent().fadeOut(r.loading.speed);});r.errorCallback.call(t(r.contentSelector)[0],"done");},_validate:function(n){for(var r in n){if(r.indexOf&&r.indexOf("Selector")>-1&&t(n[r]).length===0){this._debug("Your "+r+" found no elements.");return false;}}
return true;},bind:function(){this._binding("bind");},destroy:function(){this.options.state.isDestroyed=true;this.options.loading.finished();return this._error("destroy");},pause:function(){this._pausing("pause");},resume:function(){this._pausing("resume");},beginAjax:function(r){var i=this,s=r.path,o,u,a,f;r.state.currPage++;if(r.maxPage!=n&&r.state.currPage>r.maxPage){r.state.isBeyondMaxPage=true;this.destroy();return;}
o=t(r.contentSelector).is("table, tbody")?t("<tbody/>"):t("<div/>");u=typeof s==="function"?s(r.state.currPage):s.join(r.state.currPage);i._debug("heading into ajax",u);a=r.dataType==="html"||r.dataType==="json"?r.dataType:"html+callback";if(r.appendCallback&&r.dataType==="html"){a+="+callback";}
switch(a){case"html+callback":i._debug("Using HTML via .load() method");o.load(u+" "+r.itemSelector,n,function(t){i._loadcallback(o,t,u);});break;case"html":i._debug("Using "+a.toUpperCase()+" via $.ajax() method");t.ajax({url:u,dataType:r.dataType,complete:function(t,n){f=typeof t.isResolved!=="undefined"?t.isResolved():n==="success"||n==="notmodified";if(f){i._loadcallback(o,t.responseText,u);}else{i._error("end");}}});break;case"json":i._debug("Using "+a.toUpperCase()+" via $.ajax() method");t.ajax({dataType:"json",type:"GET",url:u,success:function(e,t,s){f=typeof s.isResolved!=="undefined"?s.isResolved():t==="success"||t==="notmodified";if(r.appendCallback){if(r.template!==n){var a=r.template(e);o.append(a);if(f){i._loadcallback(o,a);}else{i._error("end");}}else{i._debug("template must be defined.");i._error("end");}}else{if(f){i._loadcallback(o,e,u);}else{i._error("end");}}},error:function(){i._debug("JSON ajax request failed.");i._error("end");}});break;}},retrieve:function(r){r=r||null;var i=this,s=i.options;if(!!s.behavior&&this["retrieve_"+s.behavior]!==n){this["retrieve_"+s.behavior].call(this,r);return;}
if(s.state.isDestroyed){this._debug("Instance is destroyed");return false;}
s.state.isDuringAjax=true;s.loading.start.call(t(s.contentSelector)[0],s);},scroll:function(){var t=this.options,r=t.state;if(!!t.behavior&&this["scroll_"+t.behavior]!==n){this["scroll_"+t.behavior].call(this);return;}
if(r.isDuringAjax||r.isInvalidPage||r.isDone||r.isDestroyed||r.isPaused){return;}
if(!this._nearbottom()){return;}
this.retrieve();},toggle:function(){this._pausing();},unbind:function(){this._binding("unbind");},update:function(n){if(t.isPlainObject(n)){this.options=t.extend(true,this.options,n);}}};t.fn.infinitescroll=function(n,r){var i=typeof n;switch(i){case"string":var s=Array.prototype.slice.call(arguments,1);this.each(function(){var e=t.data(this,"infinitescroll");if(!e){return false;}
if(!t.isFunction(e[n])||n.charAt(0)==="_"){return false;}
e[n].apply(e,s);});break;case"object":this.each(function(){var e=t.data(this,"infinitescroll");if(e){e.update(n);}else{e=new t.infinitescroll(n,r,this);if(!e.failed){t.data(this,"infinitescroll",e);}}});break;}
return this;};var r=t.event,i;r.special.smartscroll={setup:function(){t(this).bind("scroll",r.special.smartscroll.handler);},teardown:function(){t(this).unbind("scroll",r.special.smartscroll.handler);},handler:function(e,n){var r=this,s=arguments;e.type="smartscroll";if(i){clearTimeout(i);}
i=setTimeout(function(){t(r).trigger("smartscroll",s);},n==="execAsap"?0:100);}};t.fn.smartscroll=function(e){return e?this.bind("smartscroll",e):this.trigger("smartscroll",["execAsap"]);};})(window,jQuery);

/* NProgress */
;(function(factory){if(typeof module==='function'){module.exports=factory(this.jQuery||require('jquery'));}else if(typeof define==='function'&&define.amd){define(['jquery'],function($){return factory($);});}else{this.NProgress=factory(this.jQuery);}})(function($){var NProgress={};NProgress.version='0.1.2';var Settings=NProgress.settings={minimum:0.08,easing:'ease',positionUsing:'',speed:200,trickle:true,trickleRate:0.02,trickleSpeed:800,showSpinner:true,template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'};NProgress.configure=function(options){$.extend(Settings,options);return this;};NProgress.status=null;NProgress.set=function(n){var started=NProgress.isStarted();n=clamp(n,Settings.minimum,1);NProgress.status=(n===1?null:n);var $progress=NProgress.render(!started),$bar=$progress.find('[role="bar"]'),speed=Settings.speed,ease=Settings.easing;$progress[0].offsetWidth;$progress.queue(function(next){if(Settings.positionUsing==='')Settings.positionUsing=NProgress.getPositioningCSS();$bar.css(barPositionCSS(n,speed,ease));if(n===1){$progress.css({transition:'none',opacity:1});$progress[0].offsetWidth;setTimeout(function(){$progress.css({transition:'all '+speed+'ms linear',opacity:0});setTimeout(function(){NProgress.remove();next();},speed);},speed);}else{setTimeout(next,speed);}});return this;};NProgress.isStarted=function(){return typeof NProgress.status==='number';};NProgress.start=function(){if(!NProgress.status)NProgress.set(0);var work=function(){setTimeout(function(){if(!NProgress.status)return;NProgress.trickle();work();},Settings.trickleSpeed);};if(Settings.trickle)work();return this;};NProgress.done=function(force){if(!force&&!NProgress.status)return this;return NProgress.inc(0.3+0.5*Math.random()).set(1);};NProgress.inc=function(amount){var n=NProgress.status;if(!n){return NProgress.start();}else{if(typeof amount!=='number'){amount=(1-n)*clamp(Math.random()*n,0.1,0.95);}
n=clamp(n+amount,0,0.994);return NProgress.set(n);}};NProgress.trickle=function(){return NProgress.inc(Math.random()*Settings.trickleRate);};(function(){var initial=0,current=0;NProgress.promise=function($promise){if(!$promise||$promise.state()=="resolved"){return this;}
if(current==0){NProgress.start();}
initial++;current++;$promise.always(function(){current--;if(current==0){initial=0;NProgress.done();}else{NProgress.set((initial-current)/initial);}});return this;};})();NProgress.render=function(fromStart){if(NProgress.isRendered())return $("#nprogress");$('html').addClass('nprogress-busy');var $el=$("<div id='nprogress'>").html(Settings.template);var perc=fromStart?'-100':toBarPerc(NProgress.status||0);$el.find('[role="bar"]').css({transition:'all 0 linear',transform:'translate3d('+perc+'%,0,0)'});if(!Settings.showSpinner)
$el.find('[role="spinner"]').remove();$el.appendTo(document.body);return $el;};NProgress.remove=function(){$('html').removeClass('nprogress-busy');$('#nprogress').remove();};NProgress.isRendered=function(){return($("#nprogress").length>0);};NProgress.getPositioningCSS=function(){var bodyStyle=document.body.style;var vendorPrefix=('WebkitTransform'in bodyStyle)?'Webkit':('MozTransform'in bodyStyle)?'Moz':('msTransform'in bodyStyle)?'ms':('OTransform'in bodyStyle)?'O':'';if(vendorPrefix+'Perspective'in bodyStyle){return'translate3d';}else if(vendorPrefix+'Transform'in bodyStyle){return'translate';}else{return'margin';}};function clamp(n,min,max){if(n<min)return min;if(n>max)return max;return n;}
function toBarPerc(n){return(-1+n)*100;}
function barPositionCSS(n,speed,ease){var barCSS;if(Settings.positionUsing==='translate3d'){barCSS={transform:'translate3d('+toBarPerc(n)+'%,0,0)'};}else if(Settings.positionUsing==='translate'){barCSS={transform:'translate('+toBarPerc(n)+'%,0)'};}else{barCSS={'margin-left':toBarPerc(n)+'%'};}
barCSS.transition='all '+speed+'ms '+ease;return barCSS;}
return NProgress;});



/* hig */
function hig(){(function(){function c(){var e=document.createElement("link");e.setAttribute("type","text/css");e.setAttribute("rel","stylesheet");e.setAttribute("href",f);e.setAttribute("class",l);document.body.appendChild(e)}
function h(){var e=document.getElementsByClassName(l);for(var t=0;t<e.length;t++){document.body.removeChild(e[t])}}
function p(){var e=document.createElement("div");e.setAttribute("class",a);document.body.appendChild(e);setTimeout(function(){document.body.removeChild(e)},100)}
function d(e){return{height:e.offsetHeight,width:e.offsetWidth}}
function v(i){var s=d(i);return s.height>e&&s.height<n&&s.width>t&&s.width<r}
function m(e){var t=e;var n=0;while(!!t){n+=t.offsetTop;t=t.offsetParent}
return n}
function g(){var e=document.documentElement;if(!!window.innerWidth){return window.innerHeight}else if(e&&!isNaN(e.clientHeight)){return e.clientHeight}
return 0}
function y(){if(window.pageYOffset){return window.pageYOffset}
return Math.max(document.documentElement.scrollTop,document.body.scrollTop)}
function E(e){var t=m(e);return t>=w&&t<=b+w}
function S(){var e=document.createElement("audio");e.setAttribute("class",l);e.src=i;e.loop=false;e.addEventListener("canplay",function(){setTimeout(function(){x(k)},500);setTimeout(function(){N();p();for(var e=0;e<O.length;e++){T(O[e])}},11000)},true);e.addEventListener("ended",function(){N();h()},true);e.innerHTML=" <p>If you are reading this, it is because your browser does not support the audio element. We recommend that you get a new browser.</p> <p>";document.body.appendChild(e);e.play()}
function x(e){e.className+=" "+s+" "+o}
function T(e){e.className+=" "+s+" "+u[Math.floor(Math.random()*u.length)]}
function N(){var e=document.getElementsByClassName(s);var t=new RegExp("\\b"+s+"\\b");for(var n=0;n<e.length;){e[n].className=e[n].className.replace(t,"")}}
var e=1;var t=1;var n=1100;var r=1100;var i="http://theimg.qiniudn.com/love.mp3";var s="mw-harlem_shake_me";var o="im_first";var u=["im_drunk","im_baked","im_trippin","im_blown"];var a="mw-strobe_light";var f="assets/themes/life/css/hi.css";var l="mw_added_css";var b=g();var w=y();var C=document.getElementsByTagName("*");var k=null;for(var L=0;L<C.length;L++){var A=C[L];if(v(A)){if(E(A)){k=A;break}}}
if(A===null){console.warn("Could not find a node of the right size. Please try a different page.");return}
c();S();var O=[];for(var L=0;L<C.length;L++){var A=C[L];if(v(A)){O.push(A)}}})()}

(function(window,undefined){"use strict";var EMPTY="",UNKNOWN="?",FUNC_TYPE="function",UNDEF_TYPE="undefined",OBJ_TYPE="object",MAJOR="major",MODEL="model",NAME="name",TYPE="type",VENDOR="vendor",VERSION="version",ARCHITECTURE="architecture",CONSOLE="console",MOBILE="mobile",TABLET="tablet";var util={has:function(str1,str2){return str2.toLowerCase().indexOf(str1.toLowerCase())!==-1},lowerize:function(str){return str.toLowerCase()}};var mapper={rgx:function(){for(var result,i=0,j,k,p,q,matches,match,args=arguments;i<args.length;i+=2){var regex=args[i],props=args[i+1];if(typeof result===UNDEF_TYPE){result={};for(p in props){q=props[p];if(typeof q===OBJ_TYPE){result[q[0]]=undefined}else{result[q]=undefined}}}for(j=k=0;j<regex.length;j++){matches=regex[j].exec(this.getUA());if(!!matches){for(p=0;p<props.length;p++){match=matches[++k];q=props[p];if(typeof q===OBJ_TYPE&&q.length>0){if(q.length==2){if(typeof q[1]==FUNC_TYPE){result[q[0]]=q[1].call(this,match)}else{result[q[0]]=q[1]}}else if(q.length==3){if(typeof q[1]===FUNC_TYPE&&!(q[1].exec&&q[1].test)){result[q[0]]=match?q[1].call(this,match,q[2]):undefined}else{result[q[0]]=match?match.replace(q[1],q[2]):undefined}}else if(q.length==4){result[q[0]]=match?q[3].call(this,match.replace(q[1],q[2])):undefined}}else{result[q]=match?match:undefined}}break}}if(!!matches)break}return result},str:function(str,map){for(var i in map){if(typeof map[i]===OBJ_TYPE&&map[i].length>0){for(var j=0;j<map[i].length;j++){if(util.has(map[i][j],str)){return i===UNKNOWN?undefined:i}}}else if(util.has(map[i],str)){return i===UNKNOWN?undefined:i}}return str}};var maps={browser:{oldsafari:{major:{1:["/8","/1","/3"],2:"/4","?":"/"},version:{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}}},device:{sprint:{model:{"Evo Shift 4G":"7373KT"},vendor:{HTC:"APA",Sprint:"Sprint"}}},os:{windows:{version:{ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2000:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",RT:"ARM"}}}};var regexes={browser:[[/(opera\smini)\/((\d+)?[\w\.-]+)/i,/(opera\s[mobiletab]+).+version\/((\d+)?[\w\.-]+)/i,/(opera).+version\/((\d+)?[\w\.]+)/i,/(opera)[\/\s]+((\d+)?[\w\.]+)/i],[NAME,VERSION,MAJOR],[/\s(opr)\/((\d+)?[\w\.]+)/i],[[NAME,"Opera"],VERSION,MAJOR],[/(kindle)\/((\d+)?[\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?((\d+)?[\w\.]+)*/i,/(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?((\d+)?[\w\.]*)/i,/(?:ms|\()(ie)\s((\d+)?[\w\.]+)/i,/(rekonq)((?:\/)[\w\.]+)*/i,/(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron)\/((\d+)?[\w\.-]+)/i],[NAME,VERSION,MAJOR],[/(trident).+rv[:\s]((\d+)?[\w\.]+).+like\sgecko/i],[[NAME,"IE"],VERSION,MAJOR],[/(yabrowser)\/((\d+)?[\w\.]+)/i],[[NAME,"Yandex"],VERSION,MAJOR],[/(comodo_dragon)\/((\d+)?[\w\.]+)/i],[[NAME,/_/g," "],VERSION,MAJOR],[/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?((\d+)?[\w\.]+)/i],[NAME,VERSION,MAJOR],[/(dolfin)\/((\d+)?[\w\.]+)/i],[[NAME,"Dolphin"],VERSION,MAJOR],[/((?:android.+)crmo|crios)\/((\d+)?[\w\.]+)/i],[[NAME,"Chrome"],VERSION,MAJOR],[/version\/((\d+)?[\w\.]+).+?mobile\/\w+\s(safari)/i],[VERSION,MAJOR,[NAME,"Mobile Safari"]],[/version\/((\d+)?[\w\.]+).+?(mobile\s?safari|safari)/i],[VERSION,MAJOR,NAME],[/webkit.+?(mobile\s?safari|safari)((\/[\w\.]+))/i],[NAME,[MAJOR,mapper.str,maps.browser.oldsafari.major],[VERSION,mapper.str,maps.browser.oldsafari.version]],[/(konqueror)\/((\d+)?[\w\.]+)/i,/(webkit|khtml)\/((\d+)?[\w\.]+)/i],[NAME,VERSION,MAJOR],[/(navigator|netscape)\/((\d+)?[\w\.-]+)/i],[[NAME,"Netscape"],VERSION,MAJOR],[/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?((\d+)?[\w\.\+]+)/i,/(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/((\d+)?[\w\.-]+)/i,/(mozilla)\/((\d+)?[\w\.]+).+rv\:.+gecko\/\d+/i,/(uc\s?browser|polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|qqbrowser)[\/\s]?((\d+)?[\w\.]+)/i,/(links)\s\(((\d+)?[\w\.]+)/i,/(gobrowser)\/?((\d+)?[\w\.]+)*/i,/(ice\s?browser)\/v?((\d+)?[\w\._]+)/i,/(mosaic)[\/\s]((\d+)?[\w\.]+)/i],[NAME,VERSION,MAJOR]],cpu:[[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],[[ARCHITECTURE,"amd64"]],[/((?:i[346]|x)86)[;\)]/i],[[ARCHITECTURE,"ia32"]],[/windows\s(ce|mobile);\sppc;/i],[[ARCHITECTURE,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],[[ARCHITECTURE,/ower/,"",util.lowerize]],[/(sun4\w)[;\)]/i],[[ARCHITECTURE,"sparc"]],[/(ia64(?=;)|68k(?=\))|arm(?=v\d+;)|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],[ARCHITECTURE,util.lowerize]],device:[[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],[MODEL,VENDOR,[TYPE,TABLET]],[/(hp).+(touchpad)/i,/(kindle)\/([\w\.]+)/i,/\s(nook)[\w\s]+build\/(\w+)/i,/(dell)\s(strea[kpr\s\d]*[\dko])/i],[VENDOR,MODEL,[TYPE,TABLET]],[/\((ip[honed|\s\w*]+);.+(apple)/i],[MODEL,VENDOR,[TYPE,MOBILE]],[/(blackberry)[\s-]?(\w+)/i,/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola)[\s_-]?([\w-]+)*/i,/(hp)\s([\w\s]+\w)/i,/(asus)-?(\w+)/i],[VENDOR,MODEL,[TYPE,MOBILE]],[/\((bb10);\s(\w+)/i],[[VENDOR,"BlackBerry"],MODEL,[TYPE,MOBILE]],[/android.+((transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+))/i],[[VENDOR,"Asus"],MODEL,[TYPE,TABLET]],[/(sony)\s(tablet\s[ps])/i],[VENDOR,MODEL,[TYPE,TABLET]],[/(nintendo)\s([wids3u]+)/i],[VENDOR,MODEL,[TYPE,CONSOLE]],[/((playstation)\s[3portablevi]+)/i],[[VENDOR,"Sony"],MODEL,[TYPE,CONSOLE]],[/(sprint\s(\w+))/i],[[VENDOR,mapper.str,maps.device.sprint.vendor],[MODEL,mapper.str,maps.device.sprint.model],[TYPE,MOBILE]],[/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,/(zte)-(\w+)*/i,/(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i],[VENDOR,[MODEL,/_/g," "],[TYPE,MOBILE]],[/\s((milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?))[\w\s]+build\//i,/(mot)[\s-]?(\w+)*/i],[[VENDOR,"Motorola"],MODEL,[TYPE,MOBILE]],[/android.+\s((mz60\d|xoom[\s2]{0,2}))\sbuild\//i],[[VENDOR,"Motorola"],MODEL,[TYPE,TABLET]],[/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9))/i],[[VENDOR,"Samsung"],MODEL,[TYPE,TABLET]],[/((s[cgp]h-\w+|gt-\w+|galaxy\snexus))/i,/(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i,/sec-((sgh\w+))/i],[[VENDOR,"Samsung"],MODEL,[TYPE,MOBILE]],[/(sie)-(\w+)*/i],[[VENDOR,"Siemens"],MODEL,[TYPE,MOBILE]],[/(maemo|nokia).*(n900|lumia\s\d+)/i,/(nokia)[\s_-]?([\w-]+)*/i],[[VENDOR,"Nokia"],MODEL,[TYPE,MOBILE]],[/android\s3\.[\s\w-;]{10}((a\d{3}))/i],[[VENDOR,"Acer"],MODEL,[TYPE,TABLET]],[/android\s3\.[\s\w-;]{10}(lg?)-([06cv9]{3,4})/i],[[VENDOR,"LG"],MODEL,[TYPE,TABLET]],[/((nexus\s4))/i,/((nexus\s5))/i,/(lg)[e;\s-\/]+(\w+)*/i],[[VENDOR,"LG"],MODEL,[TYPE,MOBILE]],[/(mobile|tablet);.+rv\:.+gecko\//i],[TYPE,VENDOR,MODEL]],engine:[[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,/(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,/(icab)[\/\s]([23]\.[\d\.]+)/i],[NAME,VERSION],[/rv\:([\w\.]+).*(gecko)/i],[VERSION,NAME]],os:[[/(windows)\snt\s6\.2;\s(arm)/i,/(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],[NAME,[VERSION,mapper.str,maps.os.windows.version]],[/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],[[NAME,"Windows"],[VERSION,mapper.str,maps.os.windows.version]],[/\((bb)(10);/i],[[NAME,"BlackBerry"],VERSION],[/(blackberry)\w*\/?([\w\.]+)*/i,/(tizen)\/([\w\.]+)/i,/(android|webos|palm\os|qnx|bada|rim\stablet\sos|meego)[\/\s-]?([\w\.]+)*/i],[NAME,VERSION],[/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],[[NAME,"Symbian"],VERSION],[/mozilla.+\(mobile;.+gecko.+firefox/i],[[NAME,"Firefox OS"],VERSION],[/(nintendo|playstation)\s([wids3portablevu]+)/i,/(mint)[\/\s\(]?(\w+)*/i,/(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk)[\/\s-]?([\w\.-]+)*/i,/(hurd|linux)\s?([\w\.]+)*/i,/(gnu)\s?([\w\.]+)*/i],[NAME,VERSION],[/(cros)\s[\w]+\s([\w\.]+\w)/i],[[NAME,"Chromium OS"],VERSION],[/(sunos)\s?([\w\.]+\d)*/i],[[NAME,"Solaris"],VERSION],[/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],[NAME,VERSION],[/(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i],[[NAME,"iOS"],[VERSION,/_/g,"."]],[/(mac\sos\sx)\s?([\w\s\.]+\w)*/i],[NAME,[VERSION,/_/g,"."]],[/(haiku)\s(\w+)/i,/(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,/(macintosh|mac(?=_powerpc)|plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos)/i,/(unix)\s?([\w\.]+)*/i],[NAME,VERSION]]};var UAParser=function(uastring){var ua=uastring||(window&&window.navigator&&window.navigator.userAgent?window.navigator.userAgent:EMPTY);if(!(this instanceof UAParser)){return new UAParser(uastring).getResult()}this.getBrowser=function(){return mapper.rgx.apply(this,regexes.browser)};this.getCPU=function(){return mapper.rgx.apply(this,regexes.cpu)};this.getDevice=function(){return mapper.rgx.apply(this,regexes.device)};this.getEngine=function(){return mapper.rgx.apply(this,regexes.engine)};this.getOS=function(){return mapper.rgx.apply(this,regexes.os)};this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}};this.getUA=function(){return ua};this.setUA=function(uastring){ua=uastring;return this};this.setUA(ua)};if(typeof exports!==UNDEF_TYPE){if(typeof module!==UNDEF_TYPE&&module.exports){exports=module.exports=UAParser}exports.UAParser=UAParser}else{window.UAParser=UAParser;if(typeof define===FUNC_TYPE&&define.amd){define(function(){return UAParser})}if(typeof window.jQuery!==UNDEF_TYPE){var $=window.jQuery;var parser=new UAParser;$.ua=parser.getResult();$.ua.get=function(){return parser.getUA()};$.ua.set=function(uastring){parser.setUA(uastring);var result=parser.getResult();for(var prop in result){$.ua[prop]=result[prop]}}}}})(this);

NProgress.start();



/* 
(function(){function k(a,b,c){if(a.addEventListener)a.addEventListener(b,c,false);else a.attachEvent&&a.attachEvent("on"+b,c)}function g(a){if(typeof window.onload!="function")window.onload=a;else{var b=window.onload;window.onload=function(){b();a()}}}function h(){var a={};for(type in{Top:"",Left:""}){var b=type=="Top"?"Y":"X";if(typeof window["page"+b+"Offset"]!="undefined")a[type.toLowerCase()]=window["page"+b+"Offset"];else{b=document.documentElement.clientHeight?document.documentElement:document.body; a[type.toLowerCase()]=b["scroll"+type]}}return a}function l(){var a=document.body,b;if(window.innerHeight)b=window.innerHeight;else if(a.parentElement.clientHeight)b=a.parentElement.clientHeight;else if(a&&a.clientHeight)b=a.clientHeight;return b}function i(a){this.parent=document.body;this.createEl(this.parent,a);this.size=Math.random()*5+5;this.el.style.width=Math.round(this.size)+"px";this.el.style.height=Math.round(this.size)+"px";this.maxLeft=document.body.offsetWidth-this.size;this.maxTop=document.body.offsetHeight- this.size;this.left=Math.random()*this.maxLeft;this.top=h().top+1;this.angle=1.4+0.2*Math.random();this.minAngle=1.4;this.maxAngle=1.6;this.angleDelta=0.01*Math.random();this.speed=2+Math.random()}var j=false;g(function(){j=true});var f=true;window.createSnow=function(a,b){if(j){var c=[],m=setInterval(function(){f&&b>c.length&&Math.random()<b*0.0025&&c.push(new i(a));!f&&!c.length&&clearInterval(m);for(var e=h().top,n=l(),d=c.length-1;d>=0;d--)if(c[d])if(c[d].top<e||c[d].top+c[d].size+1>e+n){c[d].remove(); c[d]=null;c.splice(d,1)}else{c[d].move();c[d].draw()}},40);k(window,"scroll",function(){for(var e=c.length-1;e>=0;e--)c[e].draw()})}else g(function(){createSnow(a,b)})};window.removeSnow=function(){f=false};i.prototype={createEl:function(a,b){this.el=document.createElement("img");this.el.setAttribute("src",b+"http://www.chengchengbin.cn/content/templates/bowen-em/images/snow/snow.gif");this.el.style.position="absolute";this.el.style.display="block";this.el.style.zIndex="99999";this.parent.appendChild(this.el)},move:function(){if(this.angle< this.minAngle||this.angle>this.maxAngle)this.angleDelta=-this.angleDelta;this.angle+=this.angleDelta;this.left+=this.speed*Math.cos(this.angle*Math.PI);this.top-=this.speed*Math.sin(this.angle*Math.PI);if(this.left<0)this.left=this.maxLeft;else if(this.left>this.maxLeft)this.left=0},draw:function(){this.el.style.top=Math.round(this.top)+"px";this.el.style.left=Math.round(this.left)+"px"},remove:function(){this.parent.removeChild(this.el);this.parent=this.el=null}}})();

createSnow("", 50); */





var duoshuoQuery = {
    short_name: "itxuye"
};

function duoshuo(postid, posturl,posttitle) {
    var el = document.createElement('div');
    el.setAttribute('data-thread-key', postid);
    el.setAttribute('data-title', posttitle);
    el.setAttribute('data-url', posturl);
    el.setAttribute('data-author-key', '9cdcfa86c40237d4f8b66c8c7e57857e');
    DUOSHUO.EmbedThread(el);
    $("#comments").append(el);
    var cl = document.createElement('span');
    cl.setAttribute('class', "ds-thread-count num");
    cl.setAttribute('data-thread-key', postid);
    cl.setAttribute('data-count-type', "comments");
    DUOSHUO.ThreadCount(cl);
    $("#dsnum").prepend(cl);
}
var hookDUOSHUO_bl = false;

function hookDUOSHUO_tp() {
    if (hookDUOSHUO_bl) return;
    else hookDUOSHUO_bl = true;
    var _D_post = DUOSHUO.templates.post;
    DUOSHUO.templates.post = function(e, t) {
        var rs = _D_post(e, t);
        if (e.agent && /^Mozilla/.test(e.agent)) rs = rs.replace(/<\/div><p>/, show_ua(e.agent) + '</div><p>');
        return rs;
    }
}

function show_ua(string) {
    $.ua.set(string);
    var sua = $.ua;
    var os = sua.os.name;
    var browser = sua.browser.name;
    var linux = ["Arch", "CentOS", "Fedora" ,"Debian", "Gentoo", "PCLinuxOS", "Mint","RedHat", "Slackware", "SUSE", "Ubuntu"]
    var desktop = ["AIX", "Amiga OS",  "Bada", "BeOS", "BlackBerry", "Chromium OS", "Firefox OS", "FreeBSD", "DragonFly", "GNU", "Haiku", "Hurd", "Joli", "Mandriva", "MeeGo", "Minix", "Morph OS", "NetBSD", "Nintendo", "OpenBSD", "OS/2", "Palm", "Plan9", "Playstation", "QNX", "RIM Tablet OS", "RISC OS", "Solaris", "Tizen", "UNIX", "WebOS", "Windows [Phone/Mobile]", "Zenwalk"];
    var browsers = ["Safari", "Amaya", "Arora", "Avant", "Baidu", "Blazer", "Bolt", "Camino", "Chromium", "Comodo Dragon", "Conkeror", "Dillo", "Dolphin", "Doris", "Epiphany", "Fennec", "Firebird", "Flock", "iCab", "ICE Browser", "IceApe", "IceCat", "IceDragon", "Iceweasel", "IE [Mobile]", "Iron", "Jasmine", "K-Meleon", "Konqueror", "Kindle", "Links", "Lunascape", "Lynx", "Maemo", "Maxthon", "Midori", "Minimo", "[Mobile] Safari", "Mosaic", "Mozilla", "Netfront", "Netscape", "NetSurf", "OmniWeb", "Opera [Mini/Mobi/Tablet]", "Phoenix", "Polaris", "RockMelt", "Silk", "Skyfire", "SeaMonkey", "SlimBrowser", "Swiftfox", "Tizen", "w3m", "Yandex"]
    var mobile = ["GoBrowser", "IE Mobile", "Mobile Safari", "Nokia","NokiaBrowser", "Opera Mini", "Opera Mobi", "Opera Tablet", "QQBrowser", "UCBrowser"]
    if (jQuery.inArray(os, linux) != -1 ) os = "linux";
    if (jQuery.inArray(os, desktop) != -1 || typeof os == 'undefined' ) os = "desktop";
    if (jQuery.inArray(browser, browsers ) != -1 || typeof browser == 'undefined' ) browser = "desktop";
    if (jQuery.inArray(browser, mobile) != -1) browser = "mobile";
    if (os == "Mac OS X" || os == "Mac OS" || os == "iOS") os = "apple";
    return '<i class="icon-' + os.toLowerCase() + '"></i><i class="icon-' + browser.toLowerCase() + '"></i>';
}

var ajaxBinded = false;

function Ajaxopt() {
    $('a.pjax[target!=_blank]').live('click', function(event) {
        var link = event.currentTarget;
        var url = link.href;
        var title = link.title;
        if (event.which > 1 || event.metaKey || event.ctrlKey)
            return
        if (link.hash && link.href.replace(link.hash, '') === location.href.replace(location.hash, ''))
            return
        loadData(url, title, true);
        event.preventDefault();
    });

    function loadData(url, title, toPush) {
        $.ajax({
            url: url,
            dataType: "html",
            type: "get",
            beforeSend: function() {
                NProgress.start();
            },
            success: function(message) {
                $("html, body").animate({
                    scrollTop: 0
                }, 1000);
                var articles = $(message).find("#articles").html();
                window.document.title = title;
                $("#articles").html(articles);
                var more = $(message).find("#more").html();
                if ( typeof more !== 'undefined') {
					if (!$(document).has("#more").length ){
						moreid = "<div id=\"more\" class=\"align-center mt-2\"></div>";
						$("#articles").after(moreid);
					};
                    $("#more").html(more);
                };
                addfancy();
                pagehover();
                linkout();
                if (url.indexOf(".html") > 0) {
                    $("#articles").infinitescroll("pause");
                    $("#more").fadeOut();
                    $(".scroll-resume,.scroll-pause").fadeOut();
                    baidupjax();
                };
                if (url.indexOf("guestbook.html") > 0) {
                    var tl = document.createElement('ul');
    				tl.setAttribute('data-num-items', '99');
    				tl.setAttribute('data-avatar-size', '48');
   				    tl.setAttribute('class', "ds-recent-visitors mg-2 pd-1");
  				    DUOSHUO.RecentVisitors(tl);
    				$(".recent-visitors").html(tl);
                };
                if (url.indexOf(".html") <= 0) {
					$("#articles").infinitescroll({
						state:{currPage: 1}
					});
					$("#articles").infinitescroll("resume");
                    $("#more").fadeIn();
                    $(".scroll-resume,.scroll-pause").fadeIn();
                };
                if (typeof $("#duoshuo") !== 'undefined') {
                    var posturl = $("#duoshuo").data("url");
                    var posttitle = $("#duoshuo").data("title");
                    var postid = $("#duoshuo").data("thread-key");
                    duoshuo(postid, posturl,posttitle);
                    hookDUOSHUO_tp();
                };
                if (toPush) {
					var state = {url:url,title:title};
                    window.history.pushState(state, title, url);
                }
                NProgress.done();
                if (!ajaxBinded) {
                    ajaxBinded = true;
                    window.addEventListener('popstate', function(e){
						if (history.state){
						var state = e.state;
                        loadData(state.url, state.title, false);
						}
                        return false;
                    });
                }
                _hmt.push(['_trackPageview', url.replace(window.location.origin,'')]);
            },
            error: function() {
                window.location = url;
            },
        });
    }
}

function pagehover() {
    $("#btn_page_prev,#btn_page_next").hover(function() {
        $(this).find("span").show();
    }, function() {
        $(this).find("span").hide();
    });
}

function linkout() {
    $(".content a[href*='http://']:not([href='" + location.hostname + "'],.nolinkout,.fancybox),.content a[href*='https://']:not([href='" + location.hostname + "'],.nolinkout,.fancybox)").append("<i class=\"icon-link-ext\"></i>").attr("target", "_blank");
}

function baidupjax(){
	$('.hm-t-img').addClass('pjax');
}

var bgimg = ["http://itxuye.qiniudn.com/1.jpg", "http://itxuye.qiniudn.com/2.jpg", "http://itxuye.qiniudn.com/3.jpg", "http://itxuye.qiniudn.com/5.jpg", "http://itxuye.qiniudn.com/7.jpg", "http://itxuye.qiniudn.com/8.jpg"];

bgimg.sort(function() {
    return Math.random() > .5 ? -1 : 1;
});

$("#head").backstretch(bgimg, {
    fade: 3000,
    duration: 10000
});

function addfancy() {
    var fb_IMG_select = 'a[href$=".jpg"]:not(.nofancybox),a[href$=".JPG"]:not(.nofancybox),a[href$=".bmp"]:not(.nofancybox),a[href$=".BMP"]:not(.nofancybox),a[href$=".gif"]:not(.nofancybox),a[href$=".GIF"]:not(.nofancybox),a[href$=".png"]:not(.nofancybox),a[href$=".PNG"]:not(.nofancybox)';
    $(fb_IMG_select).addClass("fancybox").attr("rel", "gallery");
}

$(document).ready(function() {
    $("#head").dblclick(function() {
        hig();
    });
    addfancy();
    pagehover();
    linkout();
    $(".fancybox").fancybox({
        openEffect: "elastic",
        closeEffect: "elastic",
        preload: 10
    });
    $("#articles").infinitescroll({
        navSelector: "#more",
        nextSelector: "#more a",
        itemSelector: "#articles div.post",
        loading: {
            msgText: "<div class='loading'><div class='bar'><div class='qiu'></div><p>Loading</p></div></div>",
            finishedMsg: "<span class='button button-orange w-30p mt-2'>啥 都 没 了</span>"
        },
        animate: true
    }, function(newElements) {
        addfancy();
        var $newElems = $(newElements);
        $newElems.find(".content a[href*='http://']:not([href='" + location.hostname + "'],.fancybox),.content a[href*='https://']:not([href='" + location.hostname + "'],.fancybox)").append("<i class=\"icon-link-ext\"></i>").attr("target", "_blank");
        $(".scroll-pause").addClass("show");
    });
    $(document).ajaxError(function(e, xhr, opt) {
        if (xhr.status == 404) $("#more").remove();
    });
    var $friends_list = $("#friends_list"),
        $gc_close = $("#gc_close");
    $("#friends").click(function() {
        $gc_close.show();
        $friends_list.show();
        return false;
    });
    $gc_close.click(function() {
        $friends_list.hide();
        $(this).hide();
        return false;
    });

    $(".scroll-pause").click(function() {
        $("#articles").infinitescroll("pause");
        $(".scroll-pause").removeClass("show");
        $(".scroll-resume").addClass("show");
        return false;
    });
    $(".scroll-resume").click(function() {
        $(document).trigger("retrieve.infscr");
        $("#articles").infinitescroll("resume");
        $(".scroll-resume").removeClass("show");
        $(".scroll-pause").addClass("show");
        return false;
    });
    var insloaded = false;
    $("#ins").click(function() {
        $("#ins").hide();
        $(".instagram").fadeIn();
        if (insloaded == false) {
            insloaded = true;
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                cache: true,
                url: "http://www.itxuye.com/instagramjson/",
                success: function(data) {
                    for (var i = 0; i < 10; i++) {
                        $(".instagram").append("<a target='_blank' class='fancybox' rel='instagram' href='" + data.items[i].images.standard_resolution.url.replace(/scontent-\w.cdninstagram.com/, 'dn-miantiao.qbox.me') + "' title='" + data.items[i].caption.text + " " + data.items[i].link + "'><img class='instagram-image' src='" + data.items[i].images.thumbnail.url.replace(/scontent-\w.cdninstagram.com/, 'dn-miantiao.qbox.me') + "' /></a>");
                    }
                    $(".instagram").append("<a id=\"ins-close\" href=\"#\"><i class=\"icon-cancel\"></i></a><a target=\"_blank\" id=\"ins-herf\" href=\"http://instagram.com/\"><i class=\"icon-instagram\"></i></a>");
                    $(".ins-loading").hide();
                    $("#ins-close").click(function() {
                        $(".instagram").fadeOut();
                        $("#ins").show();
                        return false;
                    });
                }
            });
        }
        return false;
    });
    $(window).scroll(function() {
        $(window).scrollTop() > 500 ? $("#rocket").addClass("show") : $("#rocket").removeClass("show");
    });
    $("#rocket").click(function() {
        $("#rocket").addClass("launch");
        $("html, body").animate({
            scrollTop: 0
        }, 600, function() {
            $("#rocket").removeClass("show launch");
        });
        return false;
    });
    if (typeof $("#duoshuo") !== 'undefined') {
        var posturl = $("#duoshuo").data("url");
        var posttitle = $("#duoshuo").data("title");
        var postid = $("#duoshuo").data("thread-key");
        duoshuo(postid, posturl,posttitle);
        hookDUOSHUO_tp();
    };
    $(".friends_list a").each(function(e) {
        $(this).prepend("<img src=http://www.itxuye.com/favicon?domain=" + this.href.replace(/^(http:\/\/[^\/]+).*$/, "$1").replace("http://", "") + " style='margin:0 2px 0;width:12px;height:12px;'>");
    });
    if (history && history.pushState) {
        Ajaxopt();
    }
	
    NProgress.done();
});


 var Swiftype = window.Swiftype || {};
	Swiftype.key = 'TBNf6zuGci7Uy_As3JK6';
	(function() {
		/** DO NOT EDIT BELOW THIS LINE **/
	    var script = document.createElement('script');
		script.type = 'text/javascript';
		script.async = true;
		script.src = "//s.swiftypecdn.com/embed.js";
		var entry = document.getElementsByTagName('script')[0];
		entry.parentNode.insertBefore(script, entry);
	}()); 
	

if (window.console && window.console.log) {
    console.log("ST 11 XY 0101 05 22 test shit");
}
