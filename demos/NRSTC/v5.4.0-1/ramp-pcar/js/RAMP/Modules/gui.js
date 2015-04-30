/*! ramp-pcar 30-04-2015 17:36:34 : v. 5.4.0-1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
define(["dojo/_base/array","dojo/topic","dojo/_base/lang","dojo/Deferred","ramp/globalStorage","ramp/eventManager","ramp/theme","ramp/imageExport","dojo/text!./templates/sub_panel_template.json","utils/util","utils/dictionary","utils/popupManager","utils/tmplHelper","dojo/domReady!"],function(a,b,c,d,e,f,g,h,i,j,k,l,m){"use strict";function n(a){var b=Object.create(I);return b._attr=Object.create(H),b.create(a),b}function o(a){var b,e=new d;e.then(function(){a=b.getAttributes(),b=G[a.origin],b.open(),b.getPanel().find(".sub-panel-toggle").on("click",c.hitch(this,function(){p(a),"#map-div"!==a.target.selector&&$(a.target).find(":tabbable").first().focus()}))}),a.consumeOrigin&&G[a.consumeOrigin]&&(b=G[a.consumeOrigin],b.changeOrigin(a.origin),b.shiftTarget(a.target),delete G[a.consumeOrigin],G[a.origin]=b),G[a.origin]?G[a.origin].update(a):a.update||(b=n(a),G[a.origin]=b,j.executeOnDone(G,function(b,c){b&&b.getOrigin()!==a.origin?p({origin:b.getOrigin()},200,c):c.resolve(!0)},e))}function p(a,b,c){var e=new d(function(){c&&c.cancel()});e.then(function(){delete G[a.origin],c&&c.resolve(!0)}),G[a.origin]&&G[a.origin].destroy(b,e)}function q(a){var b=a.target||z.getPanelContainer(),c=G[a.origin];c&&c.shiftTarget(b)}function r(a){var b;a.consumeOrigin===a.origin&&G[a.consumeOrigin]?(b=G[a.origin],b.shiftTarget(a.target)):a.consumeOrigin&&G[a.consumeOrigin]&&(b=G[a.consumeOrigin],b.changeOrigin(a.origin),b.shiftTarget(a.target),delete G[a.consumeOrigin],G[a.origin]=b)}function s(a){b.publish(f.FilterManager.WMS_QUERY_CHANGE,{allowed:RAMP.state.ui.wmsQuery}),a.resolve()}function t(a){a.stopPropagation()}function u(){if(RAMP.layerRegistry){var a=Object.keys(RAMP.layerRegistry).some(function(a){return RAMP.layerRegistry[a].ramp.type===e.layerType.feature});a&&z.toggleDataTab()}b.subscribe(f.LayerLoader.LAYER_ADDED,function(a){a.layer.ramp.type===e.layerType.feature&&z.toggleDataTab(!0)}),b.subscribe(f.LayerLoader.REMOVE_LAYER,function(){var a=Object.keys(RAMP.layerRegistry).filter(function(a){var b=RAMP.layerRegistry[a];return b?b.ramp.type===e.layerType.feature:!1});1===a.length&&z.toggleDataTab()})}var v,w,x,y,z,A=$(window),B=$("#panel-div > .wb-tabs"),C=B.find(" > ul[role=tablist]"),D=B.find(" > .tabpanels"),E=$("#mapContent"),F=E.find("#map-load-indicator"),G={},H={panelName:"",title:"",content:null,templateKey:"summary_sub_panel_container",target:null,origin:"",guid:"",update:!1,doOnOpen:null,doAfterOpen:null,doOnHide:null,doAfterHide:null,doOnDestroy:null,doAfterUpdate:null,showChars:170},I={_closing:!1,_destroyDeferred:null,_attr:null,_visible:!1,container:null,panel:null,_subPanelContentDiv:null,_panelTitle:null,_panelContentDiv:null,_animatePanelDuration:.5,timeLine:null,parseContent:function(a){return("object"===jQuery.type(a)?a:$(a)).find(".shorten-candidate").shorten({showChars:this._attr.showChars}).removeClass("shorten-candidate").end()},getAttributes:function(){return this._attr},getContainer:function(){return this.container},getPanel:function(){return this.panel},getOrigin:function(){return this._attr.origin},getGuid:function(){return this._attr.guid},destroy:function(a,b){this._attr.doOnHide&&this._attr.doOnHide(),this._closing=!0,this._destroyDeferred=b,this._subPanelContentDiv.find(".fadeInDown").removeClass("fadeInDown"),z.getPanelContainer().before(this.container),z.subPanelChange(!1,this._attr.origin,this.container,!1),this.timeLine.eventCallback("onReverseComplete",function(){this._attr.doAfterHide&&this._attr.doAfterHide(),this._attr.doOnDestroy&&this._attr.doOnDestroy(),this._visible=!1,z.subPanelChange(!1,this._attr.origin,null,!0),this.container.remove(),b&&b.resolve(!0)},[],this),this.timeLine.reverse()},reopen:function(){this.timeLine.pause(),this._closing=!1,this._destroyDeferred&&(this._destroyDeferred.cancel(),this._destroyDeferred=null),this.open()},open:function(){this._attr.doOnOpen&&this._attr.doOnOpen(),this._visible=!0,z.subPanelChange(!0,this._attr.origin,this.container,!1),this.timeLine.play()},changeOrigin:function(a){this._attr.origin=a},shiftTarget:function(a){this._attr.target!==a&&(this._subPanelContentDiv.find(".fadeInDown").removeClass("fadeInDown"),a.after(this.container),this._attr.target=a)},create:function(a){var b,d;a.guid=a.guid||j.guid(),c.mixin(this._attr,a),b=m.template(this._attr.templateKey,c.mixin(this._attr,{closeTitle:i18n.t("gui.actions.close")}),i),this.container=$(b).insertAfter(this._attr.target),this.panel=this.container.find(".sub-panel"),this._subPanelContentDiv=this.panel.find(".sub-panel-content"),this._panelTitle=this.panel.find(".panel-title"),this._panelContentDiv=this.panel.find(".panel-content-div"),d=this.parseContent(this._attr.content),this._panelContentDiv.empty().append(d),this.timeLine=new TimelineLite({paused:!0,onComplete:function(){this._attr.doAfterOpen&&this._attr.doAfterOpen(),z.subPanelChange(!0,this._attr.origin,this.container,!0)},onCompleteScope:this}).to(this.panel,this._animatePanelDuration,{left:0,ease:"easeOutCirc"}).to(F,this._animatePanelDuration,{right:this.panel.width()+6,ease:"easeOutCirc"},0),g.tooltipster(this.container),this.update(this._attr)},update:function(a){var b=300,e=[new d,new d],f=function(a,d,e){d&&(a.addClass("animated fadeOutDown"),window.setTimeout(c.hitch(this,function(){a.empty().append(d).removeClass("fadeOutDown").addClass("animated fadeInDown"),e.resolve()}),b))},g=function(a,b,c,d,e,g){c=null===c?d=v:c,c&&c!==b?e?f(a,d,g):(a.empty().append(d),g.resolve()):g.resolve()},h=c.hitch(this,function(a){TweenLite.to(this._subPanelContentDiv,b/1e3,{scrollTop:0,ease:"easeOutCirc"}),g(this._panelTitle,this._attr.title,a.title,a.title,this._visible,e[0]),g(this._panelContentDiv,this._attr.content,a.content,this.parseContent(a.content),this._visible,e[1]),c.mixin(this._attr,a)});j.afterAll(e,function(){a.doAfterUpdate&&a.doAfterUpdate()}),this._closing&&!a.update?(this._attr.guid!==a.guid&&(this._attr.doOnHide&&this._attr.doOnHide(),this._attr.doAfterHide&&this._attr.doAfterHide(),a.target.after(this.container),h(a)),this.reopen()):this._closing||(a.update||this._attr.guid===a.guid||(this._attr.doOnHide&&this._attr.doOnHide(),this._attr.doAfterHide&&this._attr.doAfterHide(),a.target.after(this.container),h(a),a.doOnOpen&&a.doOnOpen(),a.doAfterOpen&&a.doAfterOpen()),this._attr.guid===a.guid&&h(a))}},J=$("#helpToggle"),K=$("#help-section-container"),L=$("#help-section"),M=$("#addLayer-toggle"),N=$("#addLayer-section-container"),O=$("#uglyGetFiToggle"),P="button-pressed",Q="state-expanded",R=.5;return z=function(){function a(){L.css({"max-height":A.height()-(M?.2*A.height():F.offset().top)-90})}function c(){a(),u(),b.publish(f.GUI.FULLSCREEN_CHANGE,{visible:g.isFullScreen()})}function d(a){b.publish(f.GUI.PANEL_CHANGE,{visible:a})}function e(a){P.eventCallback("onReverseComplete",function(){u(),d(!0),J.tooltipster("content",i18n.t("gui.actions.close")).find("span.wb-invisible").text(i18n.t("gui.actions.close")),a.resolve()},[],this),B.removeClass("no-sidepanel-mode"),P.reverse()}function h(a){P.eventCallback("onComplete",function(){u(),d(!1),J.tooltipster("content",i18n.t("gui.actions.open")).find("span.wb-invisible").text(i18n.t("gui.actions.open")),B.addClass("no-sidepanel-mode"),a.resolve()},[],this),P.play()}function i(a){M="boolean"==typeof a?a:!M,0===N.totalDuration()&&j.resetTimelines([y[0]]),M?(B.addClass("full-data-mode"),N.play()):(S.reverse(),N.reverse()),k.forEachEntry(G,function(a){p({origin:a})})}function m(){r=K>s?340:430}function n(){(K>s&&A.width()>K||s>K&&A.width()<K)&&(s=A.width(),m(),j.resetTimelines(y,!0))}var o,q,r,s,u,v,w,x,y,B=$(".viewport"),C=$("#map-div"),D=$("#mapContent"),E=$("#fullScreenToggle"),F=$("#map-toolbar"),H=$("#basemapControls"),I=$("#panel-div"),J=$("#panel-toggle"),K=1200,M=!1,N=new TimelineLite({paused:!0,onComplete:function(){a(),u(),F.find(".map-toolbar-item-button:visible").map(function(a,b){b=$(b),b.addClass("_tooltip tooltip-temp").attr("title",b.find("span").text())}),g.tooltipster(F),I.on("keydown",".wb-tabs > ul > li > a",t)},onReverseComplete:function(){B.removeClass("full-data-mode"),a(),u(),g.tooltipster(F.find(".map-toolbar-item-button.tooltip-temp").parent(),null,"destroy"),F.find(".map-toolbar-item-button.tooltip-temp").removeClass("_tooltip").removeAttr("title"),I.off("keydown",".wb-tabs > ul > li > a",t)}}),P=new TimelineLite({paused:!0}),S=new TimelineLite({paused:!0}),T=new TimelineLite({paused:!0,onComplete:function(){I.on("keydown",".wb-tabs > ul > li > a",t)},onReverseComplete:function(){I.off("keydown",".wb-tabs > ul > li > a",t)}});return v=function(){0!==I.find(".wb-tabs > ul li").length&&N.fromTo(C,R,{width:"auto"},{width:35,ease:"easeOutCirc"},0).fromTo(D,R,{opacity:1},{opacity:0,ease:"easeOutCirc"},0).set(D,{top:"500px"}).to(J,R,{right:-13,ease:"easeOutCirc"},0).set(J,{display:"none"}).to(H,R/2,{opacity:0,ease:"easeOutCirc"},0).to(H,0,{display:"none"},R/2).fromTo(F,R/2,{width:"100%",height:"32px"},{width:"32px",height:$("#map-div").height(),ease:"easeOutCirc"},R/2).to(F.find(".map-toolbar-item-button span"),R/2,{width:0,ease:"easeOutCirc"},0).set(F.find(".map-toolbar-item-button span"),{display:"none"},R/2).fromTo(I.find(".wb-tabs > ul li:first"),R,{width:"50%"},{width:"0%",display:"none",ease:"easeOutCirc"},0).fromTo(I.find(".wb-tabs > ul li:last"),R,{width:"50%"},{width:"100%",className:"+=h5",ease:"easeOutCirc"},0).fromTo(I,R,{width:r,left:"auto"},{left:35,width:"auto",ease:"easeOutCirc"},0)},w=function(){P.fromTo(I,R,{right:0},{right:-r,ease:"easeOutCirc"},0).set(I,{display:"none"},R).fromTo(C,R,{right:r},{right:0,ease:"easeOutCirc"},0)},x=function(){S.fromTo(I,R,{right:0},{right:r,ease:"easeOutCirc"})},y=[{timeLine:N,generator:v},{timeLine:P,generator:w},{timeLine:S,generator:x}],T.fromTo(I.find(".wb-tabs > ul li:first"),R,{width:"50%"},{width:"100%",className:"+=h5",ease:"easeOutCirc"},0).to(I.find(".wb-tabs > ul li:first"),R,{lineHeight:"20px"},0).fromTo(I.find(".wb-tabs > ul li:last"),R,{width:"50%"},{width:"0%",display:"none",ease:"easeOutCirc"},0),u=function(){M||b.publish(f.GUI.LAYOUT_CHANGE)},{init:function(){s=A.width(),A.on("resize",n),m(),j.resetTimelines(y),g.fullScreenCallback("onComplete",c).fullScreenCallback("onReverseComplete",c),q=l.registerPopup(J,"click",e,{activeClass:Q,closeHandler:h}),b.subscribe(f.GUI.PANEL_TOGGLE,function(a){q.toggle(null,a.visible)}),RAMP.config.ui.mapQueryToggle.show||(RAMP.state.ui.wmsQuery=!1,O.remove()),o=l.registerPopup(E,"click",function(a){g.toggleFullScreenMode(),a.resolve()},{activeClass:"button-pressed",setClassBefore:!0}),D.height()<.6*A.height()&&o.open(),a()},toggleFullScreenMode:function(a){o.toggle(null,a)},toggleDataTab:function(a){a?T.reverse():T.play()},isFullData:function(){return M},toggleFullDataMode:function(a){i(a)},subPanelChange:function(a,c,d,e){N.isActive()||!M||e||(a?S.play():a||S.reverse()),e||(a?J.hide():J.show()),b.publish(f.GUI.SUBPANEL_CHANGE,{visible:a,origin:c,container:d,offsetLeft:d?d.width()+25+z.getPanelWidth():z.getPanelWidth(),isComplete:e})},getPanelContainer:function(){return I},getPanelWidth:function(){return I.filter(":visible").width()}}}(),{load:function(d,g,h){if(i=JSON.parse(m.stringifyTemplate(i)),v=m.template("loading_simple",null,i),z.init(),w=l.registerPopup(J,"click",function(a){b.publish(f.GUI.HELP_PANEL_CHANGE,{visible:!0}),b.publish(f.GUI.TOOLBAR_SECTION_OPEN,{id:"help-section"}),j.subscribeOnce(f.GUI.TOOLBAR_SECTION_OPEN,c.hitch(this,function(){this.isOpen()&&this.close()})),K.slideToggle("fast",function(){a.resolve()})},{activeClass:P,target:K,closeHandler:function(a){b.publish(f.GUI.HELP_PANEL_CHANGE,{visible:!1}),b.publish(f.GUI.TOOLBAR_SECTION_CLOSE,{id:"help-section"}),K.slideToggle("fast",function(){a.resolve()})},resetFocusOnClose:!0}),y=l.registerPopup(O,"click",function(a){RAMP.state.ui.wmsQuery=!1,s.call(this,a)},{activeClass:P,closeHandler:function(a){RAMP.state.ui.wmsQuery=!0,s.call(this,a)}}),RAMP.config.ui.mapQueryToggle.autoHide){if(RAMP.layerRegistry){var n=Object.keys(RAMP.layerRegistry).filter(function(a){return RAMP.layerRegistry[a].ramp.type===e.layerType.wms});0===n.length?O.hide():O.show()}b.subscribe(f.LayerLoader.LAYER_LOADED,function(a){a.layer.ramp.type===e.layerType.wms&&O.show()}),b.subscribe(f.LayerLoader.REMOVE_LAYER,function(){if(!O.is(":hidden")){var a=Object.keys(RAMP.layerRegistry).filter(function(a){var b=RAMP.layerRegistry[a];return b?b.ramp.type===e.layerType.wms:!1});1===a.length&&O.hide()}})}RAMP.state.ui.wmsQuery||y.open(),u(),x=l.registerPopup(M,"click",function(a){b.publish(f.GUI.ADD_LAYER_PANEL_CHANGE,{visible:!0}),b.publish(f.GUI.TOOLBAR_SECTION_OPEN,{id:"add-layer-section"}),j.subscribeOnce(f.GUI.TOOLBAR_SECTION_OPEN,c.hitch(this,function(){this.isOpen()&&this.close()})),N.slideToggle("fast",function(){a.resolve()})},{activeClass:P,target:N,closeHandler:function(a){b.publish(f.GUI.ADD_LAYER_PANEL_CHANGE,{visible:!1}),b.publish(f.GUI.TOOLBAR_SECTION_CLOSE,{id:"add-layer-section"}),N.slideToggle("fast",function(){a.resolve()})},resetFocusOnClose:!0}),$("#addLayer-add").on("click",function(){b.publish(f.Map.ADD_LAYER,null),x.close()}),b.subscribe(f.GUI.DATAGRID_EXPAND,function(){z.toggleFullDataMode()}),b.subscribe(f.GUI.TOGGLE_FULLSCREEN,function(a){z.toggleFullScreenMode(a.expand)}),b.subscribe(f.GUI.SUBPANEL_OPEN,function(a){o(a)}),b.subscribe(f.GUI.SUBPANEL_CLOSE,function(b){"all"===b.origin?k.forEachEntry(G,function(a){p({origin:a})}):a.forEach(b.origin.split(","),function(a){p({origin:a})})}),b.subscribe(f.GUI.SUBPANEL_DOCK,function(b){var c;"all"===b.origin?k.forEachEntry(G,function(a){c=Object.create(b),c.origin=a,q(c)}):a.forEach(b.origin.split(","),function(a){c=Object.create(b),c.origin=a,q(c)})}),b.subscribe(f.GUI.SUBPANEL_CAPTURE,function(b){var c;"all"===b.consumeOrigin?k.forEachEntry(G,function(a){c=Object.create(b),c.consumeOrigin=a,r(c)}):a.forEach(b.consumeOrigin.split(","),function(a){c=Object.create(b),c.consumeOrigin=a,r(c)})}),C.find("li a").click(function(){var a=$(this).attr("href").substr(1);D.find("details[id="+a+"]").each(function(){b.publish(f.GUI.TAB_SELECTED,{id:this.id,tabName:$(this).data("panel-name")})}),D.find("details[aria-expanded=true]").each(function(){b.publish(f.GUI.TAB_DESELECTED,{id:this.id,tabName:$(this).data("panel-name")})})});var t=[];if(RAMP.state.ui.sidePanelOpened||t.push({publishName:f.GUI.PANEL_TOGGLE,eventArg:{origin:"bootstrapper",visible:RAMP.state.ui.sidePanelOpened},subscribeName:f.GUI.PANEL_CHANGE}),RAMP.state.ui.fullscreen&&t.push({publishName:f.GUI.TOGGLE_FULLSCREEN,eventArg:{expand:!0},subscribeName:f.GUI.FULLSCREEN_CHANGE}),h(),t.isEmpty())b.publish(f.GUI.UPDATE_COMPLETE);else{var A=a.map(t,function(a){return a.subscribeName});j.subscribeAll(A,function(){b.publish(f.GUI.UPDATE_COMPLETE)}),a.forEach(t,function(a){b.publish(a.publishName,a.eventArg)})}}}});