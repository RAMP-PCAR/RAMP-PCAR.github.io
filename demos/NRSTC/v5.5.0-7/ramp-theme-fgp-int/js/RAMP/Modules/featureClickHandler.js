/*! ramp-theme-fgp-int 26-06-2015 14:25:19 : v. 5.5.0-7 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["ramp/graphicExtension","ramp/eventManager","dojo/topic","dojo/dom-construct","utils/util"],function(a,b,c,d,e){"use strict";return{onFeatureSelect:function(d){var f=d.graphic,g=a.getFDataForGraphic(f);g&&c.publish(b.GUI.SUBPANEL_OPEN,{panelName:i18n.t("datagrid.details"),title:a.getFDataTitle(g),content:a.getFDataTextContent(g),target:$("#map-div"),origin:"rampPopup",consumeOrigin:"datagrid",guid:e.guid(),showChars:70,doOnOpen:function(){e.subscribeOnce(b.Maptips.EXTENT_CHANGE,function(a){var d=a.scroll;c.publish(b.Datagrid.HIGHLIGHTROW_SHOW,{fData:g,scroll:d})}),RAMP.state.hilite.click.objId=a.getFDataOid(g),RAMP.state.hilite.click.layerId=g.parent.layerId,c.publish(b.FeatureHighlighter.HIGHLIGHT_SHOW,{graphic:f})},doOnHide:function(){c.publish(b.Datagrid.HIGHLIGHTROW_HIDE)},doOnDestroy:function(){f=null}})},onFeatureDeselect:function(){c.publish(b.GUI.SUBPANEL_CLOSE,{origin:"rampPopup,datagrid"})},onFeatureMouseOver:function(a){c.publish(b.Maptips.SHOW,a),c.publish(b.FeatureHighlighter.HOVERLIGHT_SHOW,a)},onFeatureMouseOut:function(a){c.publish(b.FeatureHighlighter.HOVERLIGHT_HIDE,a)}}});