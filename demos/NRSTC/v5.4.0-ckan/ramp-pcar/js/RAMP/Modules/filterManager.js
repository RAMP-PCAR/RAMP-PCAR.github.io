/*! ramp-pcar 10-06-2015 18:04:13 : v. 5.4.0-ckan 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP 
 **/
define(["dojo/_base/lang","dojo/Deferred","dojo/topic","dojo/text!./templates/filter_manager_template.json","dojo/text!./templates/filter_wms_meta_Template.json","esri/tasks/query","ramp/globalStorage","ramp/map","ramp/eventManager","ramp/theme","ramp/layerGroup","ramp/layerItem","utils/tmplHelper","utils/util","utils/dictionary","utils/popupManager","utils/checkboxGroup"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){"use strict";function r(a){var b=null;return o.forEachEntry(C,function(c,d){b||(b=d.getLayerItem(a))}),b}function s(a,b,c){var d,e=!1;a instanceof Array||(a=[a]),a.forEach(function(a){d=r(a),d&&d.setState(b,c)&&(u(a),e=!0)}),e&&E.update()}function t(){function a(a){return a=a.map(function(a){return a.ramp?a.ramp.config?a.ramp.config.id:a.id:void 0}).filter(function(a){return a})}var b=h.getVisibleLayers(),c=h.getInvisibleLayers();b=a(b),s(b,l.state.DEFAULT,!0),c=a(c),s(c,l.state.OFF_SCALE,!0)}function u(a){function b(a){return a=a.map(function(a){return a.ramp?a.ramp.config?a.ramp.config.id:a.id:void 0}).filter(function(a){return a})}var c,d=h.getVisibleLayers(),e=h.getInvisibleLayers(),f=RAMP.layerRegistry[a];d=b(d),e=b(e),d.contains(a)&&s(a,l.state.DEFAULT,!0),e.contains(a)&&(f&&h.layerInLODRange(f.maxScale,f.minScale)?s(e,l.state.OFF_SCALE,!0):(s(a,l.state.ERROR,{notices:{error:{message:i18n.t("addDataset.error.messageFeatureOutsideZoomRange")}}}),c=C[g.layerType.feature].getLayerItem(a),l.removeStateMatrixPart(c.stateMatrix,"controls",l.controls.RELOAD),c.setState(l.state.ERROR,null,!0)))}function v(){c.subscribe(i.GUI.TAB_DESELECTED,function(a){"filterManager"===a.tabName&&c.publish(i.GUI.SUBPANEL_CLOSE,{origin:"filterManager"})}),c.subscribe(i.Map.ZOOM_END,function(){t()}),c.subscribe(i.LayerLoader.LAYER_UPDATING,function(a){D.push(a.layer),$(".sort-handle").hide()}),c.subscribe(i.LayerLoader.LAYER_UPDATED,function(a){D.splice(D.indexOf(a.layer),1),0===D.length&&$(".sort-handle").show()}),c.subscribe(i.LayerLoader.LAYER_REMOVED,function(a){var b=D.indexOf(a.layer);b>-1&&(D.splice(b,1),0===D.length&&$(".sort-handle").show())}),c.subscribe(i.LayerLoader.LAYER_ADDED,function(a){y(a.layerCounts,!0)}),c.subscribe(i.LayerLoader.LAYER_REMOVED,function(a){y(a.layerCounts,!1)})}function w(){return Object.keys(RAMP.layerRegistry).filter(function(a){var b=RAMP.layerRegistry[a];return b.ramp.type===g.layerType.wms&&b.ramp.config.featureInfo})}function x(){return w().length>0}function y(a,b){var c=C[g.layerType.feature],d=C[g.layerType.wms],e=[l.state.DEFAULT,l.state.UPDATING,l.state.OFF_SCALE];1===w().length&&b?(c.layerItems.forEach(function(a){l.addStateMatrixParts(a.stateMatrix,l.partTypes.TOGGLES,[l.toggles.PLACEHOLDER],e),a.refresh()}),d.layerItems.forEach(function(a){l.addStateMatrixParts(a.stateMatrix,l.partTypes.TOGGLES,[RAMP.layerRegistry[a.id].ramp.config.featureInfo?l.toggles.QUERY:l.toggles.PLACEHOLDER],e),a.refresh()}),E.hideQueryToggles(!1)):0!==w().length||b||(c.layerItems.forEach(function(a){l.removeStateMatrixParts(a.stateMatrix,l.partTypes.TOGGLES,[l.toggles.PLACEHOLDER],e),a.refresh()}),d.layerItems.forEach(function(a){l.removeStateMatrixParts(a.stateMatrix,l.partTypes.TOGGLES,[l.toggles.PLACEHOLDER],e),a.refresh()}),E.hideQueryToggles(!0))}function z(a,b){var c=l.getStateMatrixTemplate(),d=[l.toggles.EYE,l.toggles.PLACEHOLDER],e=[l.toggles.EYE,l.toggles.PLACEHOLDER],f=[l.state.DEFAULT,l.state.UPDATING,l.state.OFF_SCALE];switch(a){case g.layerType.feature:x()||d.pop(),l.addStateMatrixParts(c,l.partTypes.TOGGLES,d,f),!b.config.isStatic&&b.config.layerExtent&&l.addStateMatrixParts(c,l.partTypes.SETTINGS,[l.settings.BOUNDING_BOX],f),b.config.url&&l.addStateMatrixParts(c,l.partTypes.SETTINGS,["snapshot"===b.config.mode?l.settings.ALL_DATA_CHECKED:l.settings.ALL_DATA],f);break;case g.layerType.wms:b.config.featureInfo?(e.pop(),e.push(l.toggles.QUERY)):x()||e.pop(),l.addStateMatrixParts(c,l.partTypes.TOGGLES,e,f)}return c}var A,B="layer-id",C={},D=[],E=function(){function a(){n.adjustWidthForSrollbar($("#layerList"),[u.globalToggleSection()])}function b(){p.registerPopup(o,"hover, focus",function(a){a.resolve()},{handleSelector:"li.layerList1:not(.list-item-grabbed):not(.ui-sortable-helper)",targetSelector:":tabbable",activeClass:"bg-very-light",useAria:!1}),p.registerPopup(o,"click",function(b){this.target.slideToggle("fast",function(){a(),b.resolve()}),this.target.find(".nstSlider").nstSlider("refresh")},{handleSelector:".settings-button",containerSelector:"li.layerList1",targetSelector:".filter-row-settings",activeClass:"button-pressed"}),p.registerPopup(o,"click",function(a){var b=$(this.target).data("layer-id");this.target.addClass("disabled").attr("aria-disabled",!0),c.publish(i.LayerLoader.RELOAD_LAYER,{layerId:b,mode:"snapshot"}),a.resolve()},{handleSelector:".brick.all-data .btn-choice"}),p.registerPopup(o,"click",function(b){var c=this.isOpen()?i18n.t("filterManager.showLegend"):i18n.t("filterManager.hideLegend"),d=this;this.target.slideToggle("fast",function(){a(),d.handle.prop("title",c).find("> .wb-invisible").text(c),j.tooltipster(d.handle.parent(),null,"update"),b.resolve()})},{handleSelector:".renderer-button",containerSelector:"li.layerList1",targetSelector:".renderer-list",activeClass:"button-pressed"}),p.registerPopup(o,"click",function(a){var b=$(this.target).data("layer-id");c.publish(i.LayerLoader.RELOAD_LAYER,{layerId:b}),a.resolve()},{handleSelector:".reload-button"}),p.registerPopup(o,"click",function(a){var b=$(this.target).data("layer-id");c.publish(i.LayerLoader.REMOVE_LAYER,{layerId:b}),a.resolve()},{handleSelector:".remove-button"}),p.registerPopup(o,"click",function(a){var b=this.target.data("layer-id");h.zoomToLayerScale(b),a.resolve()},{handleSelector:".button-none.zoom",activeClass:"button-pressed"}),a()}function e(){var a=u.globalToggleSection();o.scroll(function(){var b=o.scrollTop();0===b?a.removeClass("scroll"):a.addClass("scroll")})}var f,o,s,t,u,v,w;return t=function(){function a(){d=s.find(".nstSlider._slider").removeClass("_slider").nstSlider({left_grip_selector:".leftGrip",rounding:.01,highlight:{grip_class:"gripHighlighted",panel_selector:".highlightPanel"},value_changed_callback:function(a,b){var d,e=$(this),f=e.data(B),g=Math.round(100*b)+"%";e.parent().find(".leftLabel").text(g).end().end().nstSlider("highlight_range",0,b),c.publish(i.FilterManager.LAYER_TRANSPARENCY_CHANGED,{layerId:f,value:b}),d=0===b?!1:e.hasClass("disabled")?!0:d,"undefined"!=typeof d&&a&&"refresh"!==a&&c.publish(i.FilterManager.TOGGLE_LAYER_VISIBILITY,{state:d,layerId:f})}})}function b(){c.subscribe(i.FilterManager.LAYER_VISIBILITY_TOGGLED,function(a){var b,c=s.find(".nstSlider").filter("[data-layer-id='"+a.id+"']");c.length>0&&(c.toggleClass("disabled",!a.state),b=c.nstSlider("get_current_min_value"),0===b&&a.state&&c.nstSlider("set_position",1))})}var d;return{init:function(){a(),b()},update:function(){a()}}}(),u=function(){function a(){e=new q(o.find(".checkbox-brick-container.bbox input:first"),{nodeIdAttr:B,label:{check:i18n.t("filterManager.hideBounds"),uncheck:i18n.t("filterManager.showBounds")},onChange:function(){j.tooltipster(this.labelNode.parent(),null,"update")}}),e.on(q.event.MEMBER_TOGGLE,function(a){c.publish(i.FilterManager.BOX_VISIBILITY_TOGGLED,{id:a.checkbox.id,state:a.checkbox.state})}),g=new q(o.find(".checkbox-custom .eye + input"),{nodeIdAttr:B,label:{check:i18n.t("filterManager.hideFeatures"),uncheck:i18n.t("filterManager.showFeatures")},onChange:function(){j.tooltipster(this.labelNode.parent(),null,"update")},master:{node:d.find(".checkbox-custom .eye + input"),nodeIdAttr:"id",label:{check:i18n.t("filterManager.hideAllFeatures"),uncheck:i18n.t("filterManager.showAllFeatures")}}}),g.on(q.event.MEMBER_TOGGLE,function(a){c.publish(i.FilterManager.LAYER_VISIBILITY_TOGGLED,{id:a.checkbox.id,state:a.checkbox.state})}),g.on(q.event.MASTER_TOGGLE,function(a){}),h=new q(o.find(".checkbox-custom .query + input"),{nodeIdAttr:B,label:{check:i18n.t("filterManager.WMSQueryDisable"),uncheck:i18n.t("filterManager.WMSQueryEnable")},onChange:function(){j.tooltipster(this.labelNode.parent(),null,"update")},master:{node:d.find(".checkbox-custom .query + input"),nodeIdAttr:"id",label:{check:i18n.t("filterManager.WMSAllQueryDisable"),uncheck:i18n.t("filterManager.WMSAllQueryEnable")}}}),h.on(q.event.MEMBER_TOGGLE,function(a){var b=RAMP.layerRegistry[a.checkbox.id];b.ramp.config.featureInfo&&(b.ramp.state.queryEnabled=a.checkbox.state)}),h.on(q.event.MASTER_TOGGLE,function(a){})}function b(){c.subscribe(i.FilterManager.TOGGLE_BOX_VISIBILITY,function(a){e.setState(a.state,a.layerId)}),c.subscribe(i.FilterManager.TOGGLE_LAYER_VISIBILITY,function(a){g.setState(a.state,a.layerId)})}var d,e,g,h;return{init:function(){d=f.find("#filterGlobalToggles"),j.tooltipster(o),a(),b(),this.hideQueryToggles(!0)},update:function(){j.tooltipster(o),e.addCheckbox(o.find(".checkbox-brick-container.bbox input:first")),g.addCheckbox(o.find(".checkbox-custom .eye + input")),h.addCheckbox(o.find(".checkbox-custom .query + input"))},globalToggleSection:function(){return d},hideQueryToggles:function(a){d.find(".checkbox-custom .query").parent().toggle(!a)}}}(),v=function(){var a,b,d,e=function(a,b){var d,e=b.item[0].id,f=s.map(function(a,b){return $(b).find("> li").toArray().reverse()}).map(function(a,b){return b.id}),g=f.filter(function(a,b){return r(b).state!==l.state.ERROR});d=g.toArray().indexOf(e),0>d||(c.publish(i.GUI.SUBPANEL_CLOSE,{origin:"rampPopup,datagrid"}),c.publish(i.FilterManager.SELECTION_CHANGED,{id:e,index:d}))},f=function(){s.removeClass("sort-active").removeClass("sort-disabled"),b.removeClass("active")},g=function(a,c){s.has(c.item).addClass("sort-active").end().filter(":not(.sort-active)").addClass("sort-disabled"),c.item.removeClass("bg-very-light"),b.addClass("active")};return{init:function(){},update:function(){b=s.parent().find(".layer-group-separator"),d=s.filter(function(a,b){return $(b).find("> li").length>1}),a&&a.sortable("destroy"),a=d.sortable({axis:"y",handle:".sort-handle",placeholder:"sortable-placeholder",update:e,stop:f,start:g}),n.keyboardSortable(d,{linkLists:!0,onUpdate:e,onStart:g,onStop:f})}}}(),w=function(){return{init:function(){j.tooltipster(o),p.registerPopup(o,"hoverIntent",function(){this.target.attr("title")&&(this.target.isOverflowed()?this.target.tooltipster({theme:".tooltipster-dark"}).tooltipster("show"):this.target.removeAttr("title"))},{handleSelector:".layer-name span, .layer-details span",useAria:!1,timeout:500})}}}(),{init:function(){var a,h,j=this;f=$("#"+RAMP.config.divNames.filter),a=m.template("filter_manager_template2",{config:RAMP.config},JSON.parse(m.stringifyTemplate(d))),f.empty().append(a),o=f.find("#layerList"),s=o.find("> li > ul"),g.layerSelectorGroups.forEach(function(a){h=new k([],{layerType:a}),C[a]=h,j.addLayerGroup(h.node)}),u.init(),w.init(),b(),e(),t.init(),c.publish(i.FilterManager.UI_COMPLETE)},update:function(){s=o.find("> li > ul"),t.update(),u.update(),v.update()},addLayerGroup:function(a){o.prepend(a)},hideQueryToggles:function(a){u.hideQueryToggles(a)}}}();return{init:function(){A=RAMP.config,tmpl.cache={},tmpl.templates=JSON.parse(m.stringifyTemplate(d)),E.init(),v(),t()},addLayer:function(a,b,c){var d,e=C[a];c=c||{},e||(e=new k([],{layerType:a,layerState:l.state.LOADING}),C[a]=e,E.addLayerGroup(e.node)),c.stateMatrix=z(a,b),b.user&&(l.addStateMatrixPart(c.stateMatrix,l.partTypes.NOTICES,l.notices.USER,[],!0),l.removeStateMatrixPart(c.stateMatrix,l.partTypes.CONTROLS,l.controls.METADATA)),d=e.addLayerItem(b.config,c),t(),E.update()},removeLayer:function(a,b){var c=C[a];c&&(c.removeLayerItem(b),E.update())},getLayerState:function(a){var b=r(a);return b?b.state:null},setLayerState:function(a,b,c){s(a,b,c)},_getFeatures:function(a){var b=new f;return b.returnGeometry=!1,b.maxAllowableOffset=1e3,b.where=a.objectIdField+">0",a.queryFeatures(b)},_getField:function(a,c){var d=new b;return this._getFeatures(a).then(function(a){d.resolve(a.features.map(function(a){return a.attributes[c]}))}),d.promise}}});