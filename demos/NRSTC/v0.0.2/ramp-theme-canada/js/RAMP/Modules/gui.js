/*! ramp-theme-canada 26-05-2015 16:06:39 : v. 5.4.0-8 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["dojo/topic","dojo/_base/lang","dojo/Deferred","ramp/globalStorage","ramp/eventManager","ramp/theme","ramp/imageExport","dojo/text!./templates/sub_panel_template.json","dojo/text!./templates/datagrid_template.json","utils/util","utils/dictionary","utils/popupManager","utils/tmplHelper","dojo/domReady!"],function(a,b,c,d,e,f,g,h,i,j,k,l,m){"use strict";function n(a){var b=Object.create(G);return b._attr=Object.create(F),b.create(a),b}function o(a){var d,e=new c;e.then(function(){a=d.getAttributes(),d=E[a.origin],d.open(),d.getPanel().find(".sub-panel-toggle").on("click",b.hitch(this,function(){p(a),"#map-div"!==a.target.selector&&$(a.target).find(":tabbable").first().focus()}))}),a.consumeOrigin&&E[a.consumeOrigin]&&(d=E[a.consumeOrigin],d.changeOrigin(a.origin),d.shiftTarget(a.target),delete E[a.consumeOrigin],E[a.origin]=d),E[a.origin]?E[a.origin].update(a):a.update||(d=n(a),E[a.origin]=d,j.executeOnDone(E,function(b,c){b&&b.getOrigin()!==a.origin?p({origin:b.getOrigin()},200,c):c.resolve(!0)},e))}function p(a,b,d){var e=new c(function(){d&&d.cancel()});e.then(function(){delete E[a.origin],d&&d.resolve(!0)}),E[a.origin]&&E[a.origin].destroy(b,e)}function q(a){var b=a.target||x.getPanelContainer(),c=E[a.origin];c&&c.shiftTarget(b)}function r(a){var b;a.consumeOrigin===a.origin&&E[a.consumeOrigin]?(b=E[a.origin],b.shiftTarget(a.target)):a.consumeOrigin&&E[a.consumeOrigin]&&(b=E[a.consumeOrigin],b.changeOrigin(a.origin),b.shiftTarget(a.target),delete E[a.consumeOrigin],E[a.origin]=b)}function s(a){a.stopPropagation()}function t(){RAMP.layerCounts&&0===RAMP.layerCounts.feature&&x.toggleDataTab(),a.subscribe(e.LayerLoader.LAYER_ADDED,function(a){x.toggleDataTab(a.layerCounts.feature>0)}),a.subscribe(e.LayerLoader.LAYER_REMOVED,function(a){x.toggleDataTab(a.layerCounts.feature>0)})}var u,v,w,x,y=$(window),z=$("#panel-div > .wb-tabs"),A=z.find(" > ul[role=tablist]"),B=z.find(" > .tabpanels"),C=$("#mapContent"),D=C.find("#map-load-indicator"),E={},F={panelName:"",title:"",content:null,templateKey:"summary_sub_panel_container",target:null,origin:"",guid:"",update:!1,doOnOpen:null,doAfterOpen:null,doOnHide:null,doAfterHide:null,doOnDestroy:null,doAfterUpdate:null,showChars:170},G={_closing:!1,_destroyDeferred:null,_attr:null,_visible:!1,container:null,panel:null,_subPanelContentDiv:null,_panelTitle:null,_panelContentDiv:null,_animatePanelDuration:.5,timeLine:null,parseContent:function(a){return("object"===jQuery.type(a)?a:$(a)).find(".shorten-candidate").shorten({showChars:this._attr.showChars}).removeClass("shorten-candidate").end()},getAttributes:function(){return this._attr},getContainer:function(){return this.container},getPanel:function(){return this.panel},getOrigin:function(){return this._attr.origin},getGuid:function(){return this._attr.guid},destroy:function(a,b){this._attr.doOnHide&&this._attr.doOnHide(),this._closing=!0,this._destroyDeferred=b,this._subPanelContentDiv.find(".fadeInDown").removeClass("fadeInDown"),x.getPanelContainer().before(this.container),x.subPanelChange(!1,this._attr.origin,this.container,!1),this.timeLine.eventCallback("onReverseComplete",function(){this._attr.doAfterHide&&this._attr.doAfterHide(),this._attr.doOnDestroy&&this._attr.doOnDestroy(),this._visible=!1,x.subPanelChange(!1,this._attr.origin,null,!0),this.container.remove(),b&&b.resolve(!0)},[],this),this.timeLine.reverse()},reopen:function(){this.timeLine.pause(),this._closing=!1,this._destroyDeferred&&(this._destroyDeferred.cancel(),this._destroyDeferred=null),this.open()},open:function(){this._attr.doOnOpen&&this._attr.doOnOpen(),this._visible=!0,x.subPanelChange(!0,this._attr.origin,this.container,!1),this.timeLine.play()},changeOrigin:function(a){this._attr.origin=a},shiftTarget:function(a){this._attr.target!==a&&(this._subPanelContentDiv.find(".fadeInDown").removeClass("fadeInDown"),a.after(this.container),this._attr.target=a)},create:function(a){var c,d;a.guid=a.guid||j.guid(),b.mixin(this._attr,a),c=m.template(this._attr.templateKey,b.mixin(this._attr,{closeTitle:i18n.t("gui.actions.close")}),h),this.container=$(c).insertAfter(this._attr.target),this.panel=this.container.find(".sub-panel"),this._subPanelContentDiv=this.panel.find(".sub-panel-content"),this._panelTitle=this.panel.find(".panel-title"),this._panelContentDiv=this.panel.find(".panel-content-div"),d=this.parseContent(this._attr.content),this._panelContentDiv.empty().append(d),this.timeLine=new TimelineLite({paused:!0,onComplete:function(){this._attr.doAfterOpen&&this._attr.doAfterOpen(),x.subPanelChange(!0,this._attr.origin,this.container,!0)},onCompleteScope:this}).to(this.panel,this._animatePanelDuration,{left:0,ease:"easeOutCirc"}).to(D,this._animatePanelDuration,{right:this.panel.width()+6,ease:"easeOutCirc"},0),f.tooltipster(this.container),this.update(this._attr)},update:function(a){var d=300,e=[new c,new c],f=function(a,c,e){c&&(a.addClass("animated fadeOutDown"),window.setTimeout(b.hitch(this,function(){a.empty().append(c).removeClass("fadeOutDown").addClass("animated fadeInDown"),e.resolve()}),d))},g=function(a,b,c,d,e,g){c=null===c?d=u:c,c&&c!==b?e?f(a,d,g):(a.empty().append(d),g.resolve()):g.resolve()},h=b.hitch(this,function(a){TweenLite.to(this._subPanelContentDiv,d/1e3,{scrollTop:0,ease:"easeOutCirc"}),g(this._panelTitle,this._attr.title,a.title,a.title,this._visible,e[0]),g(this._panelContentDiv,this._attr.content,a.content,this.parseContent(a.content),this._visible,e[1]),b.mixin(this._attr,a)});j.afterAll(e,function(){a.doAfterUpdate&&a.doAfterUpdate()}),this._closing&&!a.update?(this._attr.guid!==a.guid&&(this._attr.doOnHide&&this._attr.doOnHide(),this._attr.doAfterHide&&this._attr.doAfterHide(),a.target.after(this.container),h(a)),this.reopen()):this._closing||(a.update||this._attr.guid===a.guid||(this._attr.doOnHide&&this._attr.doOnHide(),this._attr.doAfterHide&&this._attr.doAfterHide(),a.target.after(this.container),h(a),a.doOnOpen&&a.doOnOpen(),a.doAfterOpen&&a.doAfterOpen()),this._attr.guid===a.guid&&h(a))}},H=$("#helpToggle"),I=$("#help-section-container"),J=$("#help-section"),K="button-pressed",L="state-expanded",M=.5;return w=function(){function a(){x.isFullData()||(h=e.width(),k||(i=g.map(function(a,b){return $(b).outerWidth()}).get().reduce(function(a,b){return a+b})),b()?d():c())}function b(){return h>i}function c(){j.invalidate(),k||(e.addClass("compact"),g.filter(":not(.tooltipstered)").map(function(a,b){b=$(b),b.addClass("_tooltip tooltip-temp").attr("title",b.find("span").text())}),f.tooltipster(e),k=!0)}function d(){k&&b()&&(f.tooltipster(g.filter(".tooltip-temp").parent(),null,"destroy"),e.removeClass("compact"),g.filter(".tooltip-temp").removeClass("_tooltip").removeAttr("title"),k=!1)}var e,g,h,i,j=new TimelineLite,k=!1;return{init:function(){return e=$("#map-toolbar"),g=e.find("> .map-toolbar-item > .map-toolbar-item-button"),a(),y.on("resize",a),this},mapTools:function(){return g},toolsTimeline:function(){return j},update:function(){return a(),this},setTooltips:function(){return c(),this},removeTooltips:function(){return d(),this}}}(),x=function(){function b(){J.css({"max-height":y.height()-(U?.2*y.height():P.offset().top)-90})}function c(){b(),C(),a.publish(e.GUI.FULLSCREEN_CHANGE,{visible:f.isFullScreen()})}function d(b){a.publish(e.GUI.PANEL_CHANGE,{visible:b})}function g(a){W.eventCallback("onReverseComplete",function(){C(),d(!0),w.update(),S.tooltipster("content",i18n.t("gui.actions.close")).find("span.wb-invisible").text(i18n.t("gui.actions.close")),a.resolve()},[],this),I.removeClass("no-sidepanel-mode"),W.reverse()}function h(a){W.eventCallback("onComplete",function(){C(),d(!1),w.update(),S.tooltipster("content",i18n.t("gui.actions.open")).find("span.wb-invisible").text(i18n.t("gui.actions.open")),I.addClass("no-sidepanel-mode"),a.resolve()},[],this),W.play()}function n(a){U="boolean"==typeof a?a:!U,0===V.totalDuration()&&j.resetTimelines([H[0]]),U?(I.addClass("full-data-mode"),V.play()):(X.reverse(),V.reverse()),k.forEachEntry(E,function(a){p({origin:a})})}function o(){v=T>B?340:430}function q(){(T>B&&y.width()>T||B>T&&y.width()<T)&&(B=y.width(),o(),j.resetTimelines(H,!0))}function r(){Y.fromTo(R.find(".wb-tabs > ul li:first"),M,{width:"50%"},{width:"100%",className:"+=h5",ease:"easeOutCirc"},0).to(R.find(".wb-tabs > ul li:first"),M,{lineHeight:"20px"},0).fromTo(R.find(".wb-tabs > ul li:last"),M,{width:"50%"},{width:"0%",display:"none",ease:"easeOutCirc"},0)}var t,u,v,z,A,B,C,D,F,G,H,I=$(".viewport"),K=$("#map-div"),N=$("#mapContent"),O=$("#fullScreenToggle"),P=$("#map-toolbar"),Q=$("#basemapControls"),R=$("#panel-div"),S=$("#panel-toggle"),T=1200,U=!1,V=new TimelineLite({paused:!0,onComplete:function(){b(),C(),w.setTooltips(),R.on("keydown",".wb-tabs > ul > li > a",s)},onReverseComplete:function(){I.removeClass("full-data-mode"),b(),C(),w.update().removeTooltips(),R.off("keydown",".wb-tabs > ul > li > a",s)}}),W=new TimelineLite({paused:!0}),X=new TimelineLite({paused:!0}),Y=new TimelineLite({paused:!0,onComplete:function(){R.on("keydown",".wb-tabs > ul > li > a",s)},onReverseComplete:function(){R.off("keydown",".wb-tabs > ul > li > a",s)}});return D=function(){0!==R.find(".wb-tabs > ul li").length&&V.fromTo(K,M,{width:"auto"},{width:35,ease:"easeOutCirc"},0).fromTo(N,M,{opacity:1},{opacity:0,ease:"easeOutCirc"},0).set(N,{top:"500px"}).to(S,M,{right:-13,ease:"easeOutCirc"},0).set(S,{display:"none"}).to(Q,M/2,{opacity:0,ease:"easeOutCirc"},0).to(Q,0,{display:"none"},M/2).fromTo(P,M/2,{width:"100%",height:"32px"},{width:"32px",height:$("#map-div").height(),ease:"easeOutCirc"},M/2).add(w.toolsTimeline(),0).fromTo(R.find(".wb-tabs > ul li:first"),M,{width:"50%"},{width:"0%",display:"none",ease:"easeOutCirc"},0).fromTo(R.find(".wb-tabs > ul li:last"),M,{width:"50%"},{width:"100%",className:"+=h5",ease:"easeOutCirc"},0).fromTo(R,M,{width:v,left:"auto"},{left:35,width:"auto",ease:"easeOutCirc"},0)},F=function(){W.fromTo(R,M,{right:0},{right:-v,ease:"easeOutCirc"},0).set(R,{display:"none"},M).fromTo(K,M,{right:v},{right:0,ease:"easeOutCirc"},0)},G=function(){X.fromTo(R,M,{right:0},{right:v,ease:"easeOutCirc"})},H=[{timeLine:V,generator:D},{timeLine:W,generator:F},{timeLine:X,generator:G}],C=function(){U||a.publish(e.GUI.LAYOUT_CHANGE)},{init:function(){B=y.width(),y.on("resize",q),o(),w.init(),j.resetTimelines(H),f.fullScreenCallback("onComplete",c).fullScreenCallback("onReverseComplete",c),u=l.registerPopup(S,"click",g,{activeClass:L,closeHandler:h}),a.subscribe(e.GUI.PANEL_TOGGLE,function(a){u.toggle(null,a.visible)}),t=l.registerPopup(O,"click",function(a){f.toggleFullScreenMode(),a.resolve()},{activeClass:"button-pressed",setClassBefore:!0}),N.height()<.6*y.height()&&t.open(),A=$(m.template("datagrid_notice_update",{},i)),z=R.find(".wb-tabs > ul li:last"),z.append(A),a.subscribe(e.Datagrid.UPDATING,function(a){A.toggle(a)}),b(),r()},toggleFullScreenMode:function(a){t.toggle(null,a)},toggleDataTab:function(a){a?Y.reverse():Y.play()},isFullData:function(){return U},toggleFullDataMode:function(a){n(a)},subPanelChange:function(b,c,d,f){V.isActive()||!U||f||(b?X.play():b||X.reverse()),f||(b?S.hide():S.show()),a.publish(e.GUI.SUBPANEL_CHANGE,{visible:b,origin:c,container:d,offsetLeft:d?d.width()+25+x.getPanelWidth():x.getPanelWidth(),isComplete:f})},getPanelContainer:function(){return R},getPanelWidth:function(){return R.filter(":visible").width()}}}(),{load:function(c,d,f){h=JSON.parse(m.stringifyTemplate(h)),u=m.template("loading_simple",null,h),i=JSON.parse(m.stringifyTemplate(i)),x.init(),v=l.registerPopup(H,"click",function(c){a.publish(e.GUI.HELP_PANEL_CHANGE,{visible:!0}),a.publish(e.GUI.TOOLBAR_SECTION_OPEN,{id:"help-section"}),j.subscribeOnce(e.GUI.TOOLBAR_SECTION_OPEN,b.hitch(this,function(){this.isOpen()&&this.close()})),I.slideToggle("fast",function(){c.resolve()})},{activeClass:K,target:I,closeHandler:function(b){a.publish(e.GUI.HELP_PANEL_CHANGE,{visible:!1}),a.publish(e.GUI.TOOLBAR_SECTION_CLOSE,{id:"help-section"}),I.slideToggle("fast",function(){b.resolve()})},resetFocusOnClose:!0}),t(),a.subscribe(e.GUI.DATAGRID_EXPAND,function(){x.toggleFullDataMode()}),a.subscribe(e.GUI.TOGGLE_FULLSCREEN,function(a){x.toggleFullScreenMode(a.expand)}),a.subscribe(e.GUI.SUBPANEL_OPEN,function(a){o(a)}),a.subscribe(e.GUI.SUBPANEL_CLOSE,function(a){"all"===a.origin?k.forEachEntry(E,function(a){p({origin:a})}):a.origin.split(",").forEach(function(a){p({origin:a})})}),a.subscribe(e.GUI.SUBPANEL_DOCK,function(a){var b;"all"===a.origin?k.forEachEntry(E,function(c){b=Object.create(a),b.origin=c,q(b)}):a.origin.split(",").forEach(function(c){b=Object.create(a),b.origin=c,q(b)})}),a.subscribe(e.GUI.SUBPANEL_CAPTURE,function(a){var b;"all"===a.consumeOrigin?k.forEachEntry(E,function(c){b=Object.create(a),b.consumeOrigin=c,r(b)}):a.consumeOrigin.split(",").forEach(function(c){b=Object.create(a),b.consumeOrigin=c,r(b)})}),a.subscribe(e.BasemapSelector.UI_COMPLETE,function(){w.update()}),a.subscribe(e.BasemapSelector.BASEMAP_CHANGED,function(){w.update()}),A.find("li a").click(function(){var b=$(this).attr("href").substr(1);B.find("details[id="+b+"]").each(function(){a.publish(e.GUI.TAB_SELECTED,{id:this.id,tabName:$(this).data("panel-name")})}),B.find("details[aria-expanded=true]").each(function(){a.publish(e.GUI.TAB_DESELECTED,{id:this.id,tabName:$(this).data("panel-name")})})});var g=[];if(RAMP.state.ui.sidePanelOpened||g.push({publishName:e.GUI.PANEL_TOGGLE,eventArg:{origin:"bootstrapper",visible:RAMP.state.ui.sidePanelOpened},subscribeName:e.GUI.PANEL_CHANGE}),RAMP.state.ui.fullscreen&&g.push({publishName:e.GUI.TOGGLE_FULLSCREEN,eventArg:{expand:!0},subscribeName:e.GUI.FULLSCREEN_CHANGE}),f(),g.isEmpty())a.publish(e.GUI.UPDATE_COMPLETE);else{var n=g.map(function(a){return a.subscribeName});j.subscribeAll(n,function(){a.publish(e.GUI.UPDATE_COMPLETE)}),g.forEach(function(b){a.publish(b.publishName,b.eventArg)})}}}});