/*! ramp-theme-canada 31-03-2015 20:10:17 : v. 5.2.0 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["dojo/_base/array","dojo/topic","dojo/_base/lang","dojo/Deferred","ramp/globalStorage","ramp/eventManager","ramp/theme","ramp/imageExport","dojo/text!./templates/sub_panel_template.json","utils/util","utils/dictionary","utils/popupManager","utils/tmplHelper","dojo/domReady!"],function(a,b,c,d,e,f,g,h,i,j,k,l,m){"use strict";function n(a){var b=Object.create(F);return b._attr=Object.create(E),b.create(a),b}function o(a){var b,e=new d;e.then(function(){a=b.getAttributes(),b=D[a.origin],b.open(),b.getPanel().find(".sub-panel-toggle").on("click",c.hitch(this,function(){p(a),"#map-div"!==a.target.selector&&$(a.target).find(":tabbable").first().focus()}))}),a.consumeOrigin&&D[a.consumeOrigin]&&(b=D[a.consumeOrigin],b.changeOrigin(a.origin),b.shiftTarget(a.target),delete D[a.consumeOrigin],D[a.origin]=b),D[a.origin]?D[a.origin].update(a):a.update||(b=n(a),D[a.origin]=b,j.executeOnDone(D,function(b,c){b&&b.getOrigin()!==a.origin?p({origin:b.getOrigin()},200,c):c.resolve(!0)},e))}function p(a,b,c){var e=new d(function(){c&&c.cancel()});e.then(function(){delete D[a.origin],c&&c.resolve(!0)}),D[a.origin]&&D[a.origin].destroy(b,e)}function q(a){var b=a.target||w.getPanelContainer(),c=D[a.origin];c&&c.shiftTarget(b)}function r(a){var b;a.consumeOrigin===a.origin&&D[a.consumeOrigin]?(b=D[a.origin],b.shiftTarget(a.target)):a.consumeOrigin&&D[a.consumeOrigin]&&(b=D[a.consumeOrigin],b.changeOrigin(a.origin),b.shiftTarget(a.target),delete D[a.consumeOrigin],D[a.origin]=b)}function s(a){b.publish(f.FilterManager.WMS_QUERY_CHANGE,{allowed:RAMP.state.ui.wmsQuery}),a.resolve()}var t,u,v,w,x=$(window),y=$("#panel-div > .wb-tabs"),z=y.find(" > ul[role=tablist]"),A=y.find(" > .tabpanels"),B=$("#mapContent"),C=B.find("#map-load-indicator"),D={},E={panelName:"",title:"",content:null,templateKey:"summary_sub_panel_container",target:null,origin:"",guid:"",update:!1,doOnOpen:null,doAfterOpen:null,doOnHide:null,doAfterHide:null,doOnDestroy:null,doAfterUpdate:null,showChars:170},F={_closing:!1,_destroyDeferred:null,_attr:null,_visible:!1,container:null,panel:null,_subPanelContentDiv:null,_panelTitle:null,_panelContentDiv:null,_animatePanelDuration:.5,timeLine:null,parseContent:function(a){return("object"===jQuery.type(a)?a:$(a)).find(".shorten-candidate").shorten({showChars:this._attr.showChars}).removeClass("shorten-candidate").end()},getAttributes:function(){return this._attr},getContainer:function(){return this.container},getPanel:function(){return this.panel},getOrigin:function(){return this._attr.origin},getGuid:function(){return this._attr.guid},destroy:function(a,b){this._attr.doOnHide&&this._attr.doOnHide(),this._closing=!0,this._destroyDeferred=b,this._subPanelContentDiv.find(".fadeInDown").removeClass("fadeInDown"),w.getPanelContainer().before(this.container),w.subPanelChange(!1,this._attr.origin,this.container,!1),this.timeLine.eventCallback("onReverseComplete",function(){this._attr.doAfterHide&&this._attr.doAfterHide(),this._attr.doOnDestroy&&this._attr.doOnDestroy(),this._visible=!1,w.subPanelChange(!1,this._attr.origin,null,!0),this.container.remove(),b&&b.resolve(!0)},[],this),this.timeLine.reverse()},reopen:function(){this.timeLine.pause(),this._closing=!1,this._destroyDeferred&&(this._destroyDeferred.cancel(),this._destroyDeferred=null),this.open()},open:function(){this._attr.doOnOpen&&this._attr.doOnOpen(),this._visible=!0,w.subPanelChange(!0,this._attr.origin,this.container,!1),this.timeLine.play()},changeOrigin:function(a){this._attr.origin=a},shiftTarget:function(a){this._attr.target!==a&&(this._subPanelContentDiv.find(".fadeInDown").removeClass("fadeInDown"),a.after(this.container),this._attr.target=a)},create:function(a){var b,d;a.guid=a.guid||j.guid(),c.mixin(this._attr,a),tmpl.cache={},tmpl.templates=i,b=tmpl(this._attr.templateKey,c.mixin(this._attr,{closeTitle:i18n.t("gui.actions.close")})),this.container=$(b).insertAfter(this._attr.target),this.panel=this.container.find(".sub-panel"),this._subPanelContentDiv=this.panel.find(".sub-panel-content"),this._panelTitle=this.panel.find(".panel-title"),this._panelContentDiv=this.panel.find(".panel-content-div"),d=this.parseContent(this._attr.content),this._panelContentDiv.empty().append(d),this.timeLine=new TimelineLite({paused:!0,onComplete:function(){this._attr.doAfterOpen&&this._attr.doAfterOpen(),w.subPanelChange(!0,this._attr.origin,this.container,!0)},onCompleteScope:this}).to(this.panel,this._animatePanelDuration,{left:0,ease:"easeOutCirc"}).to(C,this._animatePanelDuration,{right:this.panel.width()+6,ease:"easeOutCirc"},0),g.tooltipster(this.container),this.update(this._attr)},update:function(a){var b=300,e='<ul class="loadingAnimation"><li></li><li></li><li></li><li></li><li></li><li></li></ul>',f=[new d,new d],g=function(a,d,e){d&&(a.addClass("animated fadeOutDown"),window.setTimeout(c.hitch(this,function(){a.empty().append(d).removeClass("fadeOutDown").addClass("animated fadeInDown"),e.resolve()}),b))},h=function(a,b,c,d,f,h){c=null===c?d=e:c,c&&c!==b?f?g(a,d,h):(a.empty().append(d),h.resolve()):h.resolve()},i=c.hitch(this,function(a){TweenLite.to(this._subPanelContentDiv,b/1e3,{scrollTop:0,ease:"easeOutCirc"}),h(this._panelTitle,this._attr.title,a.title,a.title,this._visible,f[0]),h(this._panelContentDiv,this._attr.content,a.content,this.parseContent(a.content),this._visible,f[1]),c.mixin(this._attr,a)});j.afterAll(f,function(){a.doAfterUpdate&&a.doAfterUpdate()}),this._closing&&!a.update?(this._attr.guid!==a.guid&&(this._attr.doOnHide&&this._attr.doOnHide(),this._attr.doAfterHide&&this._attr.doAfterHide(),a.target.after(this.container),i(a)),this.reopen()):this._closing||(a.update||this._attr.guid===a.guid||(this._attr.doOnHide&&this._attr.doOnHide(),this._attr.doAfterHide&&this._attr.doAfterHide(),a.target.after(this.container),i(a),a.doOnOpen&&a.doOnOpen(),a.doAfterOpen&&a.doAfterOpen()),this._attr.guid===a.guid&&i(a))}},G=$("#helpToggle"),H=$("#help-section-container"),I=$("#help-section"),J=$("#addLayer-toggle"),K=$("#addLayer-section-container"),L=$("#uglyGetFiToggle"),M="button-pressed",N="state-expanded",O=.5;return w=function(){function a(){I.css({"max-height":x.height()-(M?.2*x.height():F.offset().top)-90})}function c(){a(),t(),b.publish(f.GUI.FULLSCREEN_CHANGE,{visible:g.isFullScreen()})}function d(a){b.publish(f.GUI.PANEL_CHANGE,{visible:a})}function e(a){Q.eventCallback("onReverseComplete",function(){t(),d(!0),J.tooltipster("content",i18n.t("gui.actions.close")).find("span.wb-invisible").text(i18n.t("gui.actions.close")),a.resolve()},[],this),A.removeClass("no-sidepanel-mode"),Q.reverse()}function h(a){Q.eventCallback("onComplete",function(){t(),d(!1),J.tooltipster("content",i18n.t("gui.actions.open")).find("span.wb-invisible").text(i18n.t("gui.actions.open")),A.addClass("no-sidepanel-mode"),a.resolve()},[],this),Q.play()}function i(a){M=j.isUndefined(a)?!M:a,0===P.totalDuration()&&j.resetTimelines([z[0]]),M?(A.addClass("full-data-mode"),P.play()):(R.reverse(),P.reverse()),k.forEachEntry(D,function(a){p({origin:a})})}function m(){r=K>s?340:430}function n(){(K>s&&x.width()>K||s>K&&x.width()<K)&&(s=x.width(),m(),j.resetTimelines(z,!0))}var o,q,r,s,t,u,v,y,z,A=$(".viewport"),B=$("#map-div"),C=$("#mapContent"),E=$("#fullScreenToggle"),F=$("#map-toolbar"),G=$("#basemapControls"),H=$("#panel-div"),J=$("#panel-toggle"),K=1200,M=!1,P=new TimelineLite({paused:!0,onComplete:function(){a(),t(),F.find(".map-toolbar-item-button:visible").map(function(a,b){b=$(b),b.addClass("_tooltip tooltip-temp").attr("title",b.find("span").text())}),g.tooltipster(F)},onReverseComplete:function(){A.removeClass("full-data-mode"),a(),t(),g.tooltipster(F.find(".map-toolbar-item-button.tooltip-temp").parent(),null,"destroy"),F.find(".map-toolbar-item-button.tooltip-temp").removeClass("_tooltip").removeAttr("title")}}),Q=new TimelineLite({paused:!0}),R=new TimelineLite({paused:!0});return u=function(){0!==H.find(".wb-tabs > ul li").length&&P.fromTo(B,O,{width:"auto"},{width:35,ease:"easeOutCirc"},0).fromTo(C,O,{opacity:1},{opacity:0,ease:"easeOutCirc"},0).set(C,{top:"500px"}).to(J,O,{right:-13,ease:"easeOutCirc"},0).set(J,{display:"none"}).to(G,O/2,{opacity:0,ease:"easeOutCirc"},0).to(G,0,{display:"none"},O/2).fromTo(F,O/2,{width:"100%",height:"32px"},{width:"32px",height:$("#map-div").height(),ease:"easeOutCirc"},O/2).to(F.find(".map-toolbar-item-button span"),O/2,{width:0,ease:"easeOutCirc"},0).set(F.find(".map-toolbar-item-button span"),{display:"none"},O/2).fromTo(H.find(".wb-tabs > ul li:first"),O,{width:"50%"},{width:"0%",display:"none",ease:"easeOutCirc"},0).fromTo(H.find(".wb-tabs > ul li:last"),O,{width:"50%"},{width:"100%",className:"+=h5",ease:"easeOutCirc"},0).fromTo(H,O,{width:r,left:"auto"},{left:35,width:"auto",ease:"easeOutCirc"},0)},v=function(){Q.fromTo(H,O,{right:0},{right:-r,ease:"easeOutCirc"},0).set(H,{display:"none"},O).fromTo(B,O,{right:r},{right:0,ease:"easeOutCirc"},0)},y=function(){R.fromTo(H,O,{right:0},{right:r,ease:"easeOutCirc"})},z=[{timeLine:P,generator:u},{timeLine:Q,generator:v},{timeLine:R,generator:y}],t=function(){M||b.publish(f.GUI.LAYOUT_CHANGE)},{init:function(){s=x.width(),x.on("resize",n),m(),j.resetTimelines(z),g.fullScreenCallback("onComplete",c).fullScreenCallback("onReverseComplete",c),q=l.registerPopup(J,"click",e,{activeClass:N,closeHandler:h}),b.subscribe(f.GUI.PANEL_TOGGLE,function(a){q.toggle(null,a.visible)}),RAMP.config.ui.mapQueryToggle.show||(RAMP.state.ui.wmsQuery=!1,L.remove()),o=l.registerPopup(E,"click",function(a){g.toggleFullScreenMode(),a.resolve()},{activeClass:"button-pressed",setClassBefore:!0}),C.height()<.6*x.height()&&o.open(),a()},toggleFullScreenMode:function(a){o.toggle(null,a)},isFullData:function(){return M},toggleFullDataMode:function(a){i(a)},subPanelChange:function(a,c,d,e){P.isActive()||!M||e||(a?R.play():a||R.reverse()),e||(a?J.hide():J.show()),b.publish(f.GUI.SUBPANEL_CHANGE,{visible:a,origin:c,container:d,offsetLeft:d?d.width()+25+w.getPanelWidth():w.getPanelWidth(),isComplete:e})},getPanelContainer:function(){return H},getPanelWidth:function(){return H.filter(":visible").width()}}}(),{load:function(d,e,g){i=JSON.parse(m.stringifyTemplate(i)),w.init(),t=l.registerPopup(G,"click",function(a){b.publish(f.GUI.HELP_PANEL_CHANGE,{visible:!0}),b.publish(f.GUI.TOOLBAR_SECTION_OPEN,{id:"help-section"}),j.subscribeOnce(f.GUI.TOOLBAR_SECTION_OPEN,c.hitch(this,function(){this.isOpen()&&this.close()})),H.slideToggle("fast",function(){a.resolve()})},{activeClass:M,target:H,closeHandler:function(a){b.publish(f.GUI.HELP_PANEL_CHANGE,{visible:!1}),b.publish(f.GUI.TOOLBAR_SECTION_CLOSE,{id:"help-section"}),H.slideToggle("fast",function(){a.resolve()})},resetFocusOnClose:!0}),v=l.registerPopup(L,"click",function(a){RAMP.state.ui.wmsQuery=!1,s.call(this,a)},{activeClass:M,closeHandler:function(a){RAMP.state.ui.wmsQuery=!0,s.call(this,a)}}),RAMP.state.ui.wmsQuery||v.open(),u=l.registerPopup(J,"click",function(a){b.publish(f.GUI.ADD_LAYER_PANEL_CHANGE,{visible:!0}),b.publish(f.GUI.TOOLBAR_SECTION_OPEN,{id:"add-layer-section"}),j.subscribeOnce(f.GUI.TOOLBAR_SECTION_OPEN,c.hitch(this,function(){this.isOpen()&&this.close()})),K.slideToggle("fast",function(){a.resolve()})},{activeClass:M,target:K,closeHandler:function(a){b.publish(f.GUI.ADD_LAYER_PANEL_CHANGE,{visible:!1}),b.publish(f.GUI.TOOLBAR_SECTION_CLOSE,{id:"add-layer-section"}),K.slideToggle("fast",function(){a.resolve()})},resetFocusOnClose:!0}),$("#addLayer-add").on("click",function(){b.publish(f.Map.ADD_LAYER,null),u.close()}),b.subscribe(f.GUI.DATAGRID_EXPAND,function(){w.toggleFullDataMode()}),b.subscribe(f.GUI.TOGGLE_FULLSCREEN,function(a){w.toggleFullScreenMode(a.expand)}),b.subscribe(f.GUI.SUBPANEL_OPEN,function(a){o(a)}),b.subscribe(f.GUI.SUBPANEL_CLOSE,function(b){"all"===b.origin?k.forEachEntry(D,function(a){p({origin:a})}):a.forEach(b.origin.split(","),function(a){p({origin:a})})}),b.subscribe(f.GUI.SUBPANEL_DOCK,function(b){var c;"all"===b.origin?k.forEachEntry(D,function(a){c=Object.create(b),c.origin=a,q(c)}):a.forEach(b.origin.split(","),function(a){c=Object.create(b),c.origin=a,q(c)})}),b.subscribe(f.GUI.SUBPANEL_CAPTURE,function(b){var c;"all"===b.consumeOrigin?k.forEachEntry(D,function(a){c=Object.create(b),c.consumeOrigin=a,r(c)}):a.forEach(b.consumeOrigin.split(","),function(a){c=Object.create(b),c.consumeOrigin=a,r(c)})}),z.find("li a").click(function(){var a=$(this).attr("href").substr(1);A.find("details[id="+a+"]").each(function(){b.publish(f.GUI.TAB_SELECTED,{id:this.id,tabName:$(this).data("panel-name")})}),A.find("details[aria-expanded=true]").each(function(){b.publish(f.GUI.TAB_DESELECTED,{id:this.id,tabName:$(this).data("panel-name")})})});var h=[];if(RAMP.state.ui.sidePanelOpened||h.push({publishName:f.GUI.PANEL_TOGGLE,eventArg:{origin:"bootstrapper",visible:RAMP.state.ui.sidePanelOpened},subscribeName:f.GUI.PANEL_CHANGE}),RAMP.state.ui.fullscreen&&h.push({publishName:f.GUI.TOGGLE_FULLSCREEN,eventArg:{expand:!0},subscribeName:f.GUI.FULLSCREEN_CHANGE}),g(),h.isEmpty())b.publish(f.GUI.UPDATE_COMPLETE);else{var n=a.map(h,function(a){return a.subscribeName});j.subscribeAll(n,function(){b.publish(f.GUI.UPDATE_COMPLETE)}),a.forEach(h,function(a){b.publish(a.publishName,a.eventArg)})}}}});