/*! ramp-theme-canada 31-03-2015 20:10:17 : v. 5.2.0 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["ramp/graphicExtension","ramp/eventManager","dojo/topic","dojo/dom-construct","utils/util"],function(a,b,c,d,e){"use strict";return{onFeatureSelect:function(d){var f=d.graphic;c.publish(b.GUI.SUBPANEL_OPEN,{panelName:i18n.t("datagrid.details"),title:a.getGraphicTitle(f),content:a.getTextContent(f),target:$("#map-div"),origin:"rampPopup",consumeOrigin:"datagrid",guid:e.guid(),showChars:70,doOnOpen:function(){e.subscribeOnce(b.Maptips.EXTENT_CHANGE,function(a){var d=a.scroll;c.publish(b.Datagrid.HIGHLIGHTROW_SHOW,{graphic:f,scroll:d})}),c.publish(b.FeatureHighlighter.HIGHLIGHT_SHOW,{graphic:f})},doOnHide:function(){c.publish(b.Datagrid.HIGHLIGHTROW_HIDE)},doOnDestroy:function(){f=null}})},onFeatureDeselect:function(){c.publish(b.GUI.SUBPANEL_CLOSE,{origin:"rampPopup,datagrid"})},onFeatureMouseOver:function(a){c.publish(b.Maptips.SHOW,a),c.publish(b.FeatureHighlighter.HOVERLIGHT_SHOW,a)},onFeatureMouseOut:function(a){c.publish(b.FeatureHighlighter.HOVERLIGHT_HIDE,a)}}});