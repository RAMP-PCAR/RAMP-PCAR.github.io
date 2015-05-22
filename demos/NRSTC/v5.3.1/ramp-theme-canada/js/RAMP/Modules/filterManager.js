/*! ramp-theme-canada 08-05-2015 15:41:58 : v. 5.3.1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["dojo/_base/lang","dojo/_base/array","dojo/Deferred","dojo/topic","dojo/text!./templates/filter_manager_template.json","dojo/text!./templates/filter_wms_meta_Template.json","esri/tasks/query","ramp/ramp","ramp/globalStorage","ramp/map","ramp/eventManager","ramp/theme","ramp/layerGroup","ramp/layerItem","utils/tmplHelper","utils/util","utils/dictionary","utils/popupManager","utils/checkbox","utils/checkboxGroup"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){"use strict";function u(a){var b=null;return q.forEachEntry(B,function(c,d){b||(b=d.getLayerItem(a))}),b}function v(a,b,c){var d,e=!1;a instanceof Array||(a=[a]),a.forEach(function(a){d=u(a),d&&d.setState(b,c)&&(x(a),e=!0)}),e&&C.update()}function w(){function a(a){return a=a.map(function(a){return a.ramp?a.ramp.config?a.ramp.config.id:a.id:void 0}).filter(function(a){return a})}var b=j.getVisibleLayers(),c=j.getInvisibleLayers();b=a(b),v(b,n.state.DEFAULT,!0),c=a(c),v(c,n.state.OFF_SCALE,!0)}function x(a){function b(a){return a=a.map(function(a){return a.ramp?a.ramp.config?a.ramp.config.id:a.id:void 0}).filter(function(a){return a})}var c,d=j.getVisibleLayers(),e=j.getInvisibleLayers(),f=RAMP.layerRegistry[a];d=b(d),e=b(e),d.contains(a)&&v(a,n.state.DEFAULT,!0),e.contains(a)&&(f&&j.layerInLODRange(f.maxScale,f.minScale)?v(e,n.state.OFF_SCALE,!0):(v(a,n.state.ERROR,{notices:{error:{message:i18n.t("addDataset.error.messageFeatureOutsideZoomRange")}}}),c=B[i.layerType.feature].getLayerItem(a),n.removeStateMatrixPart(c.stateMatrix,"controls",n.controls.RELOAD),c.setState(n.state.ERROR,null,!0)))}function y(){d.subscribe(k.GUI.TAB_DESELECTED,function(a){"filterManager"===a.tabName&&d.publish(k.GUI.SUBPANEL_CLOSE,{origin:"filterManager"})}),d.subscribe(k.Map.ZOOM_END,function(){w()})}var z,A="layer-id",B={},C=function(){function a(){p.adjustWidthForSrollbar($("#layerList"),[w.globalToggleSection()])}function c(){function b(a){var b=$(a),e=b.parents("legend");if(e.hasClass("selected-row"))d.publish(k.GUI.SUBPANEL_CLOSE,{origin:"filterManager"});else{var g,i=b.data("layer-id"),j=h.getLayerConfigWithId(i);if(d.publish(k.GUI.SUBPANEL_OPEN,{panelName:i18n.t("filterManager.metadata"),title:e.find(".layer-name span").text(),content:null,target:e.find(".layer-details"),origin:"filterManager",guid:i,doOnOpen:function(){e.addClass("selected-row")},doOnHide:function(){c.isOpen(null,"any")&&c.close(),e.removeClass("selected-row")}}),j.layerInfo)if(j.legend){var l;tmpl.cache={},tmpl.templates=JSON.parse(o.stringifyTemplate(f)),l=tmpl("wms_meta_main",{legendUrl:j.legend.imageUrl,getCapabilitiesUrl:j.url+"&request=GetCapabilities"}),d.publish(k.GUI.SUBPANEL_OPEN,{content:$(l),origin:"filterManager",update:!0,guid:i})}else d.publish(k.GUI.SUBPANEL_OPEN,{content:"<p>"+i18n.t("filterManager.metadataNotFound")+"</p>",origin:"filterManager",update:!0,guid:i});else{var m=function(){d.publish(k.GUI.SUBPANEL_OPEN,{content:"<p>"+i18n.t("filterManager.metadataNotFound")+"</p>",origin:"filterManager",update:!0,guid:i})};g=j.metadataUrl;var n=null;j.catalogueUrl&&(n=[{key:"catalogue_url",value:j.catalogueUrl}]),g?p.transformXML(g,"assets/metadata/xstyle_default_"+RAMP.locale+".xsl",function(a,b){a?m():d.publish(k.GUI.SUBPANEL_OPEN,{content:$(b),origin:"filterManager",update:!0,guid:i})},null,n):m()}}}var c;r.registerPopup(q,"hover, focus",function(a){a.resolve()},{handleSelector:"li.layerList1:not(.list-item-grabbed):not(.ui-sortable-helper)",targetSelector:":tabbable",activeClass:"bg-very-light",useAria:!1}),r.registerPopup(q,"click",function(b){this.target.slideToggle("fast",function(){a(),b.resolve()}),this.target.find(".nstSlider").nstSlider("refresh")},{handleSelector:".settings-button",containerSelector:"li.layerList1",targetSelector:".filter-row-settings",activeClass:"button-pressed"}),r.registerPopup(q,"click",function(b){var c=i18n.t(this.isOpen()?"filterManager.showLegend":"filterManager.hideLegend"),d=this;this.target.slideToggle("fast",function(){a(),d.handle.prop("title",c).find("> .wb-invisible").text(c),l.tooltipster(d.handle.parent(),null,"update"),b.resolve()})},{handleSelector:".renderer-button",containerSelector:"li.layerList1",targetSelector:".renderer-list",activeClass:"button-pressed"}),c=r.registerPopup(q,"click",function(a){c.isOpen(null,"any")?(a.reject(),c.close(),b(this.target)):(b(this.target),a.resolve())},{closeHandler:function(a){a.resolve()},handleSelector:".metadata-button",openOnly:!0,activeClass:"button-pressed"}),r.registerPopup(q,"click",function(a){var b=$(this.target).data("layer-id");d.publish(k.LayerLoader.RELOAD_LAYER,{layerId:b}),a.resolve()},{handleSelector:".reload-button"}),r.registerPopup(q,"click",function(a){var b=$(this.target).data("layer-id");d.publish(k.LayerLoader.REMOVE_LAYER,{layerId:b}),a.resolve()},{handleSelector:".remove-button"}),r.registerPopup(q,"click",function(a){var b=this.target.data("layer-id");j.zoomToLayerScale(b),a.resolve()},{handleSelector:".button-none.zoom",activeClass:"button-pressed"}),a()}function e(){var a=w.globalToggleSection();s.scroll(function(){var b=s.scrollTop();0===b?a.removeClass("scroll"):a.addClass("scroll")})}var g,q,s,v,w,x,y;return v=function(){function a(){c=s.find(".nstSlider._slider").removeClass("_slider").nstSlider({left_grip_selector:".leftGrip",rounding:.01,highlight:{grip_class:"gripHighlighted",panel_selector:".highlightPanel"},value_changed_callback:function(a,b){var c,e=$(this),f=e.data(A),g=Math.round(100*b)+"%";e.parent().find(".leftLabel").text(g).end().end().nstSlider("highlight_range",0,b),d.publish(k.FilterManager.LAYER_TRANSPARENCY_CHANGED,{layerId:f,value:b}),c=0===b?!1:e.hasClass("disabled")?!0:c,"undefined"!=typeof c&&a&&"refresh"!==a&&d.publish(k.FilterManager.TOGGLE_LAYER_VISIBILITY,{state:c,layerId:f})}})}function b(){d.subscribe(k.FilterManager.LAYER_VISIBILITY_TOGGLED,function(a){var b,c=s.find(".nstSlider").filter("[data-layer-id='"+a.id+"']");c.length>0&&(c.toggleClass("disabled",!a.state),b=c.nstSlider("get_current_min_value"),0===b&&a.state&&c.nstSlider("set_position",1))})}var c;return{init:function(){a(),b()},update:function(){a()}}}(),w=function(){function a(){e=new t(q.find(".checkbox-custom .box + input"),{nodeIdAttr:A,label:{check:i18n.t("filterManager.hideBounds"),uncheck:i18n.t("filterManager.showBounds")},onChange:function(){l.tooltipster(this.labelNode.parent(),null,"update")},master:{node:c.find(".checkbox-custom .box + input"),nodeIdAttr:"id",label:{check:i18n.t("filterManager.hideAllBounds"),uncheck:i18n.t("filterManager.showAllBounds")}}}),e.on(t.event.MEMBER_TOGGLE,function(a){d.publish(k.FilterManager.BOX_VISIBILITY_TOGGLED,{id:a.checkbox.id,state:a.checkbox.state})}),e.on(t.event.MASTER_TOGGLE,function(a){}),f=new t(q.find(".checkbox-custom .eye + input"),{nodeIdAttr:A,label:{check:i18n.t("filterManager.hideFeatures"),uncheck:i18n.t("filterManager.showFeatures")},onChange:function(){l.tooltipster(this.labelNode.parent(),null,"update")},master:{node:c.find(".checkbox-custom .eye + input"),nodeIdAttr:"id",label:{check:i18n.t("filterManager.hideAllFeatures"),uncheck:i18n.t("filterManager.showAllFeatures")}}}),f.on(t.event.MEMBER_TOGGLE,function(a){d.publish(k.FilterManager.LAYER_VISIBILITY_TOGGLED,{id:a.checkbox.id,state:a.checkbox.state})}),f.on(t.event.MASTER_TOGGLE,function(a){})}function b(){d.subscribe(k.FilterManager.TOGGLE_BOX_VISIBILITY,function(a){e.setState(a.state,a.layerId)}),d.subscribe(k.FilterManager.TOGGLE_LAYER_VISIBILITY,function(a){f.setState(a.state,a.layerId)})}var c,e,f;return{init:function(){c=g.find("#filterGlobalToggles"),l.tooltipster(q),a(),b()},update:function(){l.tooltipster(q),e.addCheckbox(q.find(".checkbox-custom .box + input")),f.addCheckbox(q.find(".checkbox-custom .eye + input"))},globalToggleSection:function(){return c}}}(),x=function(){var a,c,e,f=function(a,c){var e=c.item[0].id,f=s.map(function(a,b){return $(b).find("> li").toArray().reverse()}).map(function(a,b){return b.id}),g=f.filter(function(a,b){return u(b).state!==n.state.ERROR}),h=b.indexOf(g,e);0>h||(d.publish(k.GUI.SUBPANEL_CLOSE,{origin:"rampPopup,datagrid"}),d.publish(k.FilterManager.SELECTION_CHANGED,{id:e,index:h}))},g=function(){s.removeClass("sort-active").removeClass("sort-disabled"),c.removeClass("active")},h=function(a,b){s.has(b.item).addClass("sort-active").end().filter(":not(.sort-active)").addClass("sort-disabled"),b.item.removeClass("bg-very-light"),c.addClass("active")};return{init:function(){},update:function(){c=s.parent().find(".layer-group-separator"),e=s.filter(function(a,b){return $(b).find("> li").length>1}),a&&a.sortable("destroy"),a=e.sortable({axis:"y",handle:".sort-handle",placeholder:"sortable-placeholder",update:f,stop:g,start:h}),p.keyboardSortable(e,{linkLists:!0,onUpdate:f,onStart:h,onStop:g})}}}(),y=function(){return{init:function(){l.tooltipster(q),r.registerPopup(q,"hoverIntent",function(){this.target.attr("title")&&(this.target.isOverflowed()?this.target.tooltipster({theme:".tooltipster-dark"}).tooltipster("show"):this.target.removeAttr("title"))},{handleSelector:".layer-name span, .layer-details span",useAria:!1,timeout:500})}}}(),{init:function(){var a,b,f=this;g=$("#"+RAMP.config.divNames.filter),a=tmpl("filter_manager_template2",{config:RAMP.config}),g.empty().append(a),q=g.find("#layerList"),s=q.find("> li > ul"),i.layerSelectorGroups.forEach(function(a){b=new m([],{layerType:a}),B[a]=b,f.addLayerGroup(b.node)}),w.init(),y.init(),c(),e(),v.init(),d.publish(k.FilterManager.UI_COMPLETE)},update:function(){s=q.find("> li > ul"),v.update(),w.update(),x.update()},addLayerGroup:function(a){q.prepend(a)}}}();return{init:function(){z=RAMP.config,tmpl.cache={},tmpl.templates=JSON.parse(o.stringifyTemplate(e)),C.init(),y(),w()},addLayer:function(b,c,d){var e,f=B[b];d=d||{},f||(f=new m([],{layerType:b,layerState:n.state.LOADING}),B[b]=f,C.addLayerGroup(f.node)),c.user&&(d=a.mixin(d,{stateMatrix:n.getStateMatrixTemplate()}),n.addStateMatrixPart(d.stateMatrix,"notices",n.notices.USER,!0),n.removeStateMatrixPart(d.stateMatrix,"controls",n.controls.METADATA)),e=f.addLayerItem(c.config,d),w(),C.update()},removeLayer:function(a,b){var c=B[a];c&&(c.removeLayerItem(b),C.update())},getLayerState:function(a){var b=u(a);return b?b.state:null},setLayerState:function(a,b,c){v(a,b,c)},_getFeatures:function(a){var b=new g;return b.returnGeometry=!1,b.maxAllowableOffset=1e3,b.where=a.objectIdField+">0",a.queryFeatures(b)},_getField:function(a,d){var e=new c;return this._getFeatures(a).then(function(a){e.resolve(b.map(a.features,function(a){return a.attributes[d]}))}),e.promise}}});