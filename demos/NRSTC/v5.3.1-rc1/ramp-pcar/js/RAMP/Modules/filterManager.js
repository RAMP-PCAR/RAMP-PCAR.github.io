/*! ramp-pcar 05-05-2015 19:24:30 : v. 5.3.1-rc1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
define(["dojo/_base/lang","dojo/Deferred","dojo/topic","dojo/text!./templates/filter_manager_template.json","dojo/text!./templates/filter_wms_meta_Template.json","esri/tasks/query","ramp/globalStorage","ramp/map","ramp/eventManager","ramp/theme","ramp/layerGroup","ramp/layerItem","ramp/layerLoader","utils/tmplHelper","utils/util","utils/dictionary","utils/popupManager","utils/checkboxGroup"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){"use strict";function s(a){var b=null;return p.forEachEntry(z,function(c,d){b||(b=d.getLayerItem(a))}),b}function t(a,b,c){var d,e=!1;a instanceof Array||(a=[a]),a.forEach(function(a){d=s(a),d&&d.setState(b,c)&&(v(a),e=!0)}),e&&A.update()}function u(){function a(a){return a=a.map(function(a){return a.ramp?a.ramp.config?a.ramp.config.id:a.id:void 0}).filter(function(a){return a})}var b=h.getVisibleLayers(),c=h.getInvisibleLayers();b=a(b),t(b,l.state.DEFAULT,!0),c=a(c),t(c,l.state.OFF_SCALE,!0)}function v(a){function b(a){return a=a.map(function(a){return a.ramp?a.ramp.config?a.ramp.config.id:a.id:void 0}).filter(function(a){return a})}var c=h.getVisibleLayers(),d=h.getInvisibleLayers();c=b(c),d=b(d),c.contains(a)&&t(a,l.state.DEFAULT,!0),d.contains(a)&&t(d,l.state.OFF_SCALE,!0)}function w(){c.subscribe(i.GUI.TAB_DESELECTED,function(a){"filterManager"===a.tabName&&c.publish(i.GUI.SUBPANEL_CLOSE,{origin:"filterManager"})}),c.subscribe(i.Map.ZOOM_END,function(){u()})}var x,y="layer-id",z={},A=function(){function a(){o.adjustWidthForSrollbar($("#layerList"),[v.globalToggleSection()])}function b(){function b(a){var b=$(a),f=b.parents("legend");if(f.hasClass("selected-row"))c.publish(i.GUI.SUBPANEL_CLOSE,{origin:"filterManager"});else{var g,h=b.data("layer-id"),j=m.getLayerConfig(h);if(c.publish(i.GUI.SUBPANEL_OPEN,{panelName:i18n.t("filterManager.metadata"),title:f.find(".layer-name span").text(),content:null,target:f.find(".layer-details"),origin:"filterManager",guid:h,doOnOpen:function(){f.addClass("selected-row")},doOnHide:function(){d.isOpen(null,"any")&&d.close(),f.removeClass("selected-row")}}),j.layerInfo)if(j.legend){var k;tmpl.cache={},tmpl.templates=JSON.parse(n.stringifyTemplate(e)),k=tmpl("wms_meta_main",{legendUrl:j.legend.imageUrl,getCapabilitiesUrl:j.url+"&request=GetCapabilities"}),c.publish(i.GUI.SUBPANEL_OPEN,{content:$(k),origin:"filterManager",update:!0,guid:h})}else c.publish(i.GUI.SUBPANEL_OPEN,{content:"<p>"+i18n.t("filterManager.metadataNotFound")+"</p>",origin:"filterManager",update:!0,guid:h});else{var l=function(){c.publish(i.GUI.SUBPANEL_OPEN,{content:"<p>"+i18n.t("filterManager.metadataNotFound")+"</p>",origin:"filterManager",update:!0,guid:h})};g=j.metadataUrl;var p=null;j.catalogueUrl&&(p=[{key:"catalogue_url",value:j.catalogueUrl}]),g?o.transformXML(g,"assets/metadata/xstyle_default_"+RAMP.locale+".xsl",function(a,b){a?l():c.publish(i.GUI.SUBPANEL_OPEN,{content:$(b),origin:"filterManager",update:!0,guid:h})},null,p):l()}}}var d;q.registerPopup(p,"hover, focus",function(a){a.resolve()},{handleSelector:"li.layerList1:not(.list-item-grabbed):not(.ui-sortable-helper)",targetSelector:":tabbable",activeClass:"bg-very-light",useAria:!1}),q.registerPopup(p,"click",function(b){this.target.slideToggle("fast",function(){a(),b.resolve()}),this.target.find(".nstSlider").nstSlider("refresh")},{handleSelector:".settings-button",containerSelector:"li.layerList1",targetSelector:".filter-row-settings",activeClass:"button-pressed"}),q.registerPopup(p,"click",function(b){var c=i18n.t(this.isOpen()?"filterManager.showLegend":"filterManager.hideLegend"),d=this;this.target.slideToggle("fast",function(){a(),d.handle.prop("title",c).find("> .wb-invisible").text(c),j.tooltipster(d.handle.parent(),null,"update"),b.resolve()})},{handleSelector:".renderer-button",containerSelector:"li.layerList1",targetSelector:".renderer-list",activeClass:"button-pressed"}),d=q.registerPopup(p,"click",function(a){d.isOpen(null,"any")?(a.reject(),d.close(),b(this.target)):(b(this.target),a.resolve())},{closeHandler:function(a){a.resolve()},handleSelector:".metadata-button",openOnly:!0,activeClass:"button-pressed"}),q.registerPopup(p,"click",function(a){var b=$(this.target).data("layer-id");c.publish(i.LayerLoader.RELOAD_LAYER,{layerId:b}),a.resolve()},{handleSelector:".reload-button"}),q.registerPopup(p,"click",function(a){var b=$(this.target).data("layer-id");c.publish(i.LayerLoader.REMOVE_LAYER,{layerId:b}),a.resolve()},{handleSelector:".remove-button"}),q.registerPopup(p,"click",function(a){var b=this.target.data("layer-id");h.zoomToLayerScale(b),a.resolve()},{handleSelector:".button-none.zoom",activeClass:"button-pressed"}),a()}function d(){var a=v.globalToggleSection();t.scroll(function(){var b=t.scrollTop();0===b?a.removeClass("scroll"):a.addClass("scroll")})}var f,p,t,u,v,w,x;return u=function(){function a(){d=t.find(".nstSlider._slider").removeClass("_slider").nstSlider({left_grip_selector:".leftGrip",rounding:.01,highlight:{grip_class:"gripHighlighted",panel_selector:".highlightPanel"},value_changed_callback:function(a,b){var d,e=$(this),f=e.data(y),g=Math.round(100*b)+"%";e.parent().find(".leftLabel").text(g).end().end().nstSlider("highlight_range",0,b),c.publish(i.FilterManager.LAYER_TRANSPARENCY_CHANGED,{layerId:f,value:b}),d=0===b?!1:e.hasClass("disabled")?!0:d,"undefined"!=typeof d&&a&&"refresh"!==a&&c.publish(i.FilterManager.TOGGLE_LAYER_VISIBILITY,{state:d,layerId:f})}})}function b(){c.subscribe(i.FilterManager.LAYER_VISIBILITY_TOGGLED,function(a){var b,c=t.find(".nstSlider").filter("[data-layer-id='"+a.id+"']");c.length>0&&(c.toggleClass("disabled",!a.state),b=c.nstSlider("get_current_min_value"),0===b&&a.state&&c.nstSlider("set_position",1))})}var d;return{init:function(){a(),b()},update:function(){a()}}}(),v=function(){function a(){e=new r(p.find(".checkbox-custom .box + input"),{nodeIdAttr:y,label:{check:i18n.t("filterManager.hideBounds"),uncheck:i18n.t("filterManager.showBounds")},onChange:function(){j.tooltipster(this.labelNode.parent(),null,"update")},master:{node:d.find(".checkbox-custom .box + input"),nodeIdAttr:"id",label:{check:i18n.t("filterManager.hideAllBounds"),uncheck:i18n.t("filterManager.showAllBounds")}}}),e.on(r.event.MEMBER_TOGGLE,function(a){c.publish(i.FilterManager.BOX_VISIBILITY_TOGGLED,{id:a.checkbox.id,state:a.checkbox.state})}),e.on(r.event.MASTER_TOGGLE,function(a){}),g=new r(p.find(".checkbox-custom .eye + input"),{nodeIdAttr:y,label:{check:i18n.t("filterManager.hideFeatures"),uncheck:i18n.t("filterManager.showFeatures")},onChange:function(){j.tooltipster(this.labelNode.parent(),null,"update")},master:{node:d.find(".checkbox-custom .eye + input"),nodeIdAttr:"id",label:{check:i18n.t("filterManager.hideAllFeatures"),uncheck:i18n.t("filterManager.showAllFeatures")}}}),g.on(r.event.MEMBER_TOGGLE,function(a){c.publish(i.FilterManager.LAYER_VISIBILITY_TOGGLED,{id:a.checkbox.id,state:a.checkbox.state})}),g.on(r.event.MASTER_TOGGLE,function(a){})}function b(){c.subscribe(i.FilterManager.TOGGLE_BOX_VISIBILITY,function(a){e.setState(a.state,a.layerId)}),c.subscribe(i.FilterManager.TOGGLE_LAYER_VISIBILITY,function(a){g.setState(a.state,a.layerId)})}var d,e,g;return{init:function(){d=f.find("#filterGlobalToggles"),j.tooltipster(p),a(),b()},update:function(){j.tooltipster(p),e.addCheckbox(p.find(".checkbox-custom .box + input")),g.addCheckbox(p.find(".checkbox-custom .eye + input"))},globalToggleSection:function(){return d}}}(),w=function(){var a,b,d,e=function(a,b){var d,e=b.item[0].id,f=t.map(function(a,b){return $(b).find("> li").toArray().reverse()}).map(function(a,b){return b.id}),g=f.filter(function(a,b){return s(b).state!==l.state.ERROR});d=g.toArray().indexOf(e),0>d||(c.publish(i.GUI.SUBPANEL_CLOSE,{origin:"rampPopup,datagrid"}),c.publish(i.FilterManager.SELECTION_CHANGED,{id:e,index:d}))},f=function(){t.removeClass("sort-active").removeClass("sort-disabled"),b.removeClass("active")},g=function(a,c){t.has(c.item).addClass("sort-active").end().filter(":not(.sort-active)").addClass("sort-disabled"),c.item.removeClass("bg-very-light"),b.addClass("active")};return{init:function(){},update:function(){b=t.parent().find(".layer-group-separator"),d=t.filter(function(a,b){return $(b).find("> li").length>1}),a&&a.sortable("destroy"),a=d.sortable({axis:"y",handle:".sort-handle",placeholder:"sortable-placeholder",update:e,stop:f,start:g}),o.keyboardSortable(d,{linkLists:!0,onUpdate:e,onStart:g,onStop:f})}}}(),x=function(){return{init:function(){j.tooltipster(p),q.registerPopup(p,"hoverIntent",function(){this.target.attr("title")&&(this.target.isOverflowed()?this.target.tooltipster({theme:".tooltipster-dark"}).tooltipster("show"):this.target.removeAttr("title"))},{handleSelector:".layer-name span, .layer-details span",useAria:!1,timeout:500})}}}(),{init:function(){var a,e,h=this;f=$("#"+RAMP.config.divNames.filter),a=tmpl("filter_manager_template2",{config:RAMP.config}),f.empty().append(a),p=f.find("#layerList"),t=p.find("> li > ul"),g.layerSelectorGroups.forEach(function(a){e=new k([],{layerType:a}),z[a]=e,h.addLayerGroup(e.node)}),v.init(),x.init(),b(),d(),u.init(),c.publish(i.FilterManager.UI_COMPLETE)},update:function(){t=p.find("> li > ul"),u.update(),v.update(),w.update()},addLayerGroup:function(a){p.prepend(a)}}}();return{init:function(){x=RAMP.config,tmpl.cache={},tmpl.templates=JSON.parse(n.stringifyTemplate(d)),A.init(),w(),u()},addLayer:function(b,c,d){var e,f=z[b];d=d||{},f||(f=new k([],{layerType:b,layerState:l.state.LOADING}),z[b]=f,A.addLayerGroup(f.node)),c.user&&(d=a.mixin(d,{stateMatrix:l.getStateMatrixTemplate()}),l.addStateMatrixPart(d.stateMatrix,"notices",l.notices.USER,!0),l.removeStateMatrixPart(d.stateMatrix,"controls",l.controls.METADATA)),e=f.addLayerItem(c.config,d),u(),A.update()},removeLayer:function(a,b){var c=z[a];c&&(c.removeLayerItem(b),A.update())},getLayerState:function(a){var b=s(a);return b?b.state:null},setLayerState:function(a,b,c){t(a,b,c)},_getFeatures:function(a){var b=new f;return b.returnGeometry=!1,b.maxAllowableOffset=1e3,b.where=a.objectIdField+">0",a.queryFeatures(b)},_getField:function(a,c){var d=new b;return this._getFeatures(a).then(function(a){d.resolve(a.features.map(function(a){return a.attributes[c]}))}),d.promise}}});