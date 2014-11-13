/*! ramp-theme-canada 13-11-2014 09:59:09 : v. 3.0.1 
 * 
 * RAMP GIS viewer - Canada Goose; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["ramp/globalStorage"],function(a){"use strict";return{getGraphicIcon:function(a,b){var c=b.symbology;switch(c.renderer.type){case"unique":var d=a.attributes[c.renderer.key1];return c.icons[d].imageUrl;case"simple":return c.icons["default"].imageUrl;default:return c.icons["default"].imageUrl}},getFeatureName:function(a,b){return a.attributes[b.nameField]},getObjectId:function(a){return a.attributes[a.getLayer().objectIdField]},getAttributeValueByName:function(a,b){return a.attributes[b]},generateVisibilityLegend:function(a){var b="",c={"for":"filterGroup_"+a.data[a.idx].id,attr:b,value:a.data[a.idx].id,checked:"checked",label:a.data[a.idx].layerConfig.displayName,"class":"eye checked",layerId:a.data[a.idx].id};return c},generateBoundingBoxLegend:function(b){var c,d=!1,e="";return d=Boolean(b.data[b.idx].ramp.type===a.layerType.Static||b.data[b.idx].ramp.type===a.layerType.WMS),c={"for":"filterGroup_"+b.data[b.idx].id+"1",attr:e+"1",value:b.data[b.idx].id,checked:"checked",label:b.data[b.idx].layerConfig.displayName,"class":"box checked",disabled:d,layerId:b.data[b.idx].id}},generateSettingsToggle:function(a){var b={str:a.str,layerId:a.data[a.idx].id,settings:a.data[a.idx].layerConfig.settings};return b}}});