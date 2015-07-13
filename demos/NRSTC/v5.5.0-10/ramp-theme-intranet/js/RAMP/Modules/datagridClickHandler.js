/*! ramp-theme-intranet 13-07-2015 12:14:26 : v. 5.5.0-10 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["ramp/graphicExtension","ramp/eventManager","dojo/topic","dojo/dom-construct","utils/util"],function(a,b,c,d,e){"use strict";function f(){c.publish(b.FeatureHighlighter.ZOOMLIGHT_HIDE),c.publish("datagrid/zoomlightrow-hide")}var g;return{onDetailSelect:function(d,f,g,h){var i=d.data("guid")||d.data("guid",e.guid()).data("guid"),j=a.getFDataTextContent(f),k=a.getFDataTitle(f),l=d.parents(".record-row").parent();"summary"===h?c.publish(b.GUI.SUBPANEL_OPEN,{panelName:i18n.t("datagrid.details"),title:k,content:j,target:l.find(".record-controls"),origin:"datagrid",consumeOrigin:"rampPopup",guid:i,doOnOpen:function(){e.subscribeOnce(b.Maptips.EXTENT_CHANGE,function(a){var d=a.scroll;c.publish(b.Datagrid.HIGHLIGHTROW_SHOW,{fData:f,scroll:d})}),RAMP.state.hilite.click.objId=a.getFDataOid(f),RAMP.state.hilite.click.layerId=f.parent.layerId,c.publish(b.FeatureHighlighter.HIGHLIGHT_SHOW,{graphic:g})},doOnHide:function(){c.publish(b.Datagrid.HIGHLIGHTROW_HIDE)},doOnDestroy:function(){g=null,c.publish(b.FeatureHighlighter.HIGHLIGHT_HIDE)}}):(l=d,c.publish(b.GUI.SUBPANEL_OPEN,{panelName:i18n.t("datagrid.details"),title:k,content:j,target:l,origin:"ex-datagrid",templateKey:"full_sub_panel_container",guid:i,doAfterUpdate:function(){c.publish(b.Datagrid.HIGHLIGHTROW_SHOW,{fData:f,scroll:!0})},doOnHide:function(){c.publish(b.Datagrid.HIGHLIGHTROW_HIDE)},doOnDestroy:function(){g=null,c.publish(b.FeatureHighlighter.HIGHLIGHT_HIDE)}}))},onDetailDeselect:function(a){"summary"===a?c.publish(b.GUI.SUBPANEL_CLOSE,{origin:"rampPopup,datagrid"}):c.publish(b.GUI.SUBPANEL_CLOSE,{origin:"ex-datagrid"})},onZoomTo:function(d,h,i){function j(){RAMP.state.hilite.zoom.objId=a.getFDataOid(h),RAMP.state.hilite.zoom.layerId=h.parent.layerId,c.publish(b.FeatureHighlighter.ZOOMLIGHT_SHOW,{graphic:i}),e.subscribeOnceAny(["map/pan-start","map/zoom-start"],f)}var k,l,m;switch(g=d,k=i._layer.maxScale,l=RAMP.map._layers.layer0.maxScale,m=Math.min(e.getZoomInLimit(k),e.getZoomInLimit(l),9),i.geometry.type){case"point":c.publish(b.Map.CENTER_AND_ZOOM,{graphic:i,level:m,callback:j});break;case"polygon":c.publish(b.Map.SET_EXTENT,{extent:i._extent.expand(1.5),callback:j});break;default:c.publish(b.Map.SET_EXTENT,{extent:i._extent.expand(1.5),callback:j})}c.publish(b.Datagrid.ZOOMLIGHTROW_SHOW,{fData:h})},onZoomBack:function(){c.publish(b.Map.SET_EXTENT,{extent:g}),c.publish(b.FeatureHighlighter.ZOOMLIGHT_HIDE),c.publish(b.Datagrid.ZOOMLIGHTROW_HIDE)},onZoomCancel:function(){f()}}});