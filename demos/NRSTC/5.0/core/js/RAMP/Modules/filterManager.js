/*! ramp-pcar 11-02-2015 18:40:06 : v. 5.0.0 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
define(["dojo/_base/declare","dojo/_base/lang","dojo/query","dojo/_base/array","dojo/on","dojo/dom","dojo/dom-class","dojo/dom-style","dojo/dom-construct","dojo/_base/connect","dojo/Deferred","dojo/topic","dojo/aspect","dojo/promise/all","dojo/text!./templates/filter_manager_template.json","dojo/text!./templates/filter_wms_meta_Template.json","esri/tasks/query","esri/layers/FeatureLayer","esri/layers/WMSLayer","ramp/ramp","ramp/globalStorage","ramp/map","ramp/eventManager","ramp/theme","ramp/layerGroup","ramp/layerItem","utils/tmplHelper","utils/util","utils/array","utils/dictionary","utils/popupManager","utils/checkbox","utils/checkboxGroup"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G){"use strict";function H(a){var b=null;return D.forEachEntry(O,function(c,d){b||(b=d.getLayerItem(a))}),b}function I(a,b,c){var d,e=!1;a instanceof Array||(a=[a]),a.forEach(function(a){d=H(a),d&&d.setState(b,c)&&(K(a),e=!0)}),e&&P.update()}function J(){function a(a){return a=a.map(function(a){return a.ramp?a.ramp.config?a.ramp.config.id:a.id:void 0}).filter(function(a){return a})}var b=v.getVisibleLayers(),c=v.getInvisibleLayers();b=a(b),I(b,z.state.DEFAULT,!0),c=a(c),I(c,z.state.OFF_SCALE,!0)}function K(a){function b(a){return a=a.map(function(a){return a.ramp?a.ramp.config?a.ramp.config.id:a.id:void 0}).filter(function(a){return a})}var c=v.getVisibleLayers(),d=v.getInvisibleLayers();c=b(c),d=b(d),c.contains(a)&&I(a,z.state.DEFAULT,!0),d.contains(a)&&I(d,z.state.OFF_SCALE,!0)}function L(){l.subscribe(w.GUI.TAB_DESELECTED,function(a){"filterManager"===a.tabName&&l.publish(w.GUI.SUBPANEL_CLOSE,{origin:"filterManager"})}),l.subscribe(w.Map.ZOOM_END,function(){J()})}var M,N="layer-id",O={},P=function(){function a(){B.adjustWidthForSrollbar($("#layerList"),[i.globalToggleSection()])}function b(){function b(a){var b=$(a),c=b.parents("legend");if(c.hasClass("selected-row"))l.publish(w.GUI.SUBPANEL_CLOSE,{origin:"filterManager"});else{var d,e=b.data("layer-id"),f=t.getLayerConfigWithId(e);if(l.publish(w.GUI.SUBPANEL_OPEN,{panelName:i18n.t("filterManager.metadata"),title:c.find(".layer-name span").text(),content:null,target:c.find(".layer-details"),origin:"filterManager",guid:e,doOnOpen:function(){c.addClass("selected-row")},doOnHide:function(){b.removeClass("button-pressed"),c.removeClass("selected-row")}}),f.layerInfo)if(f.legend){var g;tmpl.cache={},tmpl.templates=JSON.parse(A.stringifyTemplate(p)),g=tmpl("wms_meta_main",{legendUrl:f.legend.imageUrl,getCapabilitiesUrl:f.url+"&request=GetCapabilities"}),l.publish(w.GUI.SUBPANEL_OPEN,{content:$(g),origin:"filterManager",update:!0,guid:e})}else l.publish(w.GUI.SUBPANEL_OPEN,{content:"<p>"+i18n.t("filterManager.metadataNotFound")+"</p>",origin:"filterManager",update:!0,guid:e});else{var h=function(){l.publish(w.GUI.SUBPANEL_OPEN,{content:"<p>"+i18n.t("filterManager.metadataNotFound")+"</p>",origin:"filterManager",update:!0,guid:e})};d=f.metadataUrl,d?B.transformXML(d,"assets/metadata/xstyle_default_"+RAMP.locale+".xsl",function(a,b){a?h():l.publish(w.GUI.SUBPANEL_OPEN,{content:$(b),origin:"filterManager",update:!0,guid:e})},null,[{key:"catalogue_url",value:f.catalogueUrl}]):h()}}}E.registerPopup(f,"hover, focus",function(a){a.resolve()},{handleSelector:"li.layerList1:not(.list-item-grabbed):not(.ui-sortable-helper)",targetSelector:":tabbable",activeClass:"bg-very-light",useAria:!1}),E.registerPopup(f,"click",function(b){this.target.slideToggle("fast",function(){a(),b.resolve()}),this.target.find(".nstSlider").nstSlider("refresh")},{handleSelector:".settings-button",containerSelector:"li.layerList1",targetSelector:".filter-row-settings",activeClass:"button-pressed"}),E.registerPopup(f,"click",function(b){this.target.slideToggle("fast",function(){a(),b.resolve()})},{handleSelector:".renderer-button",containerSelector:"li.layerList1",targetSelector:".renderer-list",activeClass:"button-pressed"}),E.registerPopup(f,"click",function(a){b(this.target),a.resolve()},{handleSelector:".metadata-button",activeClass:"button-pressed"}),E.registerPopup(f,"click",function(a){var b=$(this.target).data("layer-id");l.publish(w.LayerLoader.RELOAD_LAYER,{layerId:b}),a.resolve()},{handleSelector:".reload-button"}),E.registerPopup(f,"click",function(a){var b=$(this.target).data("layer-id");l.publish(w.LayerLoader.REMOVE_LAYER,{layerId:b}),a.resolve()},{handleSelector:".remove-button"}),E.registerPopup(f,"click",function(a){var b=this.target.data("layer-id");v.zoomToLayerScale(b),a.resolve()},{handleSelector:".button-none.zoom",activeClass:"button-pressed"}),a()}function c(){var a=i.globalToggleSection();g.scroll(function(){var b=g.scrollTop();0===b?a.removeClass("scroll"):a.addClass("scroll")})}var e,f,g,h,i,j,k;return h=function(){function a(){c=g.find(".nstSlider._slider").removeClass("_slider").nstSlider({left_grip_selector:".leftGrip",rounding:.01,highlight:{grip_class:"gripHighlighted",panel_selector:".highlightPanel"},value_changed_callback:function(a,b){var c,d=$(this),e=d.data(N),f=Math.round(100*b)+"%";d.parent().find(".leftLabel").text(f).end().end().nstSlider("highlight_range",0,b),l.publish(w.FilterManager.LAYER_TRANSPARENCY_CHANGED,{layerId:e,value:b}),c=0===b?!1:d.hasClass("disabled")?!0:c,B.isUndefined(c)||B.isUndefined(a)||"refresh"===a||l.publish(w.FilterManager.TOGGLE_LAYER_VISIBILITY,{state:c,layerId:e})}})}function b(){l.subscribe(w.FilterManager.LAYER_VISIBILITY_TOGGLED,function(a){var b,c=g.find(".nstSlider").filter("[data-layer-id='"+a.id+"']");c.length>0&&(c.toggleClass("disabled",!a.state),b=c.nstSlider("get_current_min_value"),0===b&&a.state&&c.nstSlider("set_position",1))})}var c;return{init:function(){a(),b()},update:function(){a()}}}(),i=function(){function a(){d=new G(f.find(".checkbox-custom .box + input"),{nodeIdAttr:N,label:{check:i18n.t("filterManager.hideBounds"),uncheck:i18n.t("filterManager.showBounds")},onChange:function(){x.tooltipster(this.labelNode.parent(),null,"update")},master:{node:c.find(".checkbox-custom .box + input"),nodeIdAttr:"id",label:{check:i18n.t("filterManager.hideAllBounds"),uncheck:i18n.t("filterManager.showAllBounds")}}}),d.on(G.event.MEMBER_TOGGLE,function(a){l.publish(w.FilterManager.BOX_VISIBILITY_TOGGLED,{id:a.checkbox.id,state:a.checkbox.state})}),d.on(G.event.MASTER_TOGGLE,function(a){}),g=new G(f.find(".checkbox-custom .eye + input"),{nodeIdAttr:N,label:{check:i18n.t("filterManager.hideFeatures"),uncheck:i18n.t("filterManager.showFeatures")},onChange:function(){x.tooltipster(this.labelNode.parent(),null,"update")},master:{node:c.find(".checkbox-custom .eye + input"),nodeIdAttr:"id",label:{check:i18n.t("filterManager.hideAllFeatures"),uncheck:i18n.t("filterManager.showAllFeatures")}}}),g.on(G.event.MEMBER_TOGGLE,function(a){l.publish(w.FilterManager.LAYER_VISIBILITY_TOGGLED,{id:a.checkbox.id,state:a.checkbox.state})}),g.on(G.event.MASTER_TOGGLE,function(a){})}function b(){l.subscribe(w.FilterManager.TOGGLE_BOX_VISIBILITY,function(a){d.setState(a.state,a.layerId)}),l.subscribe(w.FilterManager.TOGGLE_LAYER_VISIBILITY,function(a){g.setState(a.state,a.layerId)})}var c,d,g;return{init:function(){c=e.find("#filterGlobalToggles"),x.tooltipster(f),a(),b()},update:function(){x.tooltipster(f),d.addCheckbox(f.find(".checkbox-custom .box + input")),g.addCheckbox(f.find(".checkbox-custom .eye + input"))},globalToggleSection:function(){return c}}}(),j=function(){var a,b,c,e=function(a,b){var c=b.item[0].id,e=g.map(function(a,b){return $(b).find("> li").toArray().reverse()}).map(function(a,b){return b.id}),f=e.filter(function(a,b){return H(b).state!==z.state.ERROR}),h=d.indexOf(f,c);0>h||(l.publish(w.GUI.SUBPANEL_CLOSE,{origin:"rampPopup,datagrid"}),l.publish(w.FilterManager.SELECTION_CHANGED,{id:c,index:h}))},f=function(){g.removeClass("sort-active").removeClass("sort-disabled"),b.removeClass("active")},h=function(a,c){g.has(c.item).addClass("sort-active").end().filter(":not(.sort-active)").addClass("sort-disabled"),c.item.removeClass("bg-very-light"),b.addClass("active")};return{init:function(){},update:function(){b=g.parent().find(".layer-group-separator"),c=g.filter(function(a,b){return $(b).find("> li").length>1}),a&&a.sortable("destroy"),a=c.sortable({axis:"y",handle:".sort-handle",placeholder:"sortable-placeholder",update:e,stop:f,start:h}),B.keyboardSortable(c,{linkLists:!0,onUpdate:e,onStart:h,onStop:f})}}}(),k=function(){return{init:function(){x.tooltipster(f),E.registerPopup(f,"hoverIntent",function(){this.target.attr("title")&&(this.target.isOverflowed()?this.target.tooltipster({theme:".tooltipster-dark"}).tooltipster("show"):this.target.removeAttr("title"))},{handleSelector:".layer-name span, .layer-details span",useAria:!1,timeout:500})}}}(),{init:function(){var a,d,j=this;e=$("#"+RAMP.config.divNames.filter),a=tmpl("filter_manager_template2",{config:RAMP.config}),e.empty().append(a),f=e.find("#layerList"),g=f.find("> li > ul"),u.layerSelectorGroups.forEach(function(a){d=new y([],{layerType:a}),O[a]=d,j.addLayerGroup(d.node)}),i.init(),k.init(),b(),c(),h.init(),l.publish(w.FilterManager.UI_COMPLETE)},update:function(){g=f.find("> li > ul"),h.update(),i.update(),j.update()},addLayerGroup:function(a){f.prepend(a)}}}();return{init:function(){M=RAMP.config,tmpl.cache={},tmpl.templates=JSON.parse(A.stringifyTemplate(o)),P.init(),L(),J()},addLayer:function(a,b,c){var d,e=O[a];e||(e=new y([],{layerType:a,layerState:z.state.LOADING}),O[a]=e,P.addLayerGroup(e.node)),d=e.addLayerItem(b),B.isUndefined(c)||d.setState(c,null,!0),J(),P.update()},removeLayer:function(a,b){var c=O[a];c&&(c.removeLayerItem(b),P.update())},getLayerState:function(a){var b=H(a);return b?b.state:null},setLayerState:function(a,b,c){I(a,b,c)},_getFeatures:function(a){var b=new q;return b.returnGeometry=!1,b.maxAllowableOffset=1e3,b.where=a.objectIdField+">0",a.queryFeatures(b)},_getField:function(a,b){var c=new k;return this._getFeatures(a).then(function(a){c.resolve(d.map(a.features,function(a){return a.attributes[b]}))}),c.promise}}});