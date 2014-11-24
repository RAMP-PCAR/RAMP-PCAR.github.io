/*! ramp-pcar 12-11-2014 15:03:54 : v. 3.0.1 
 * 
 * RAMP GIS viewer - Canada Goose; Sample of an implementation of RAMP 
 **/
define(["ramp/eventManager","esri/request","dojo/promise/all","dojo/_base/array","dojo/topic"],function(a,b,c,d,e){"use strict";var f,g=[];return{init:function(h){f=h,e.subscribe(a.Map.CLICK,function(h){var i=[],j=[];i=d.filter(g,function(a){return a.wmsLayer.visible}),0!==i.length&&(e.publish(a.GUI.SUBPANEL_OPEN,{panelName:"WMS Click Results",title:"WMS Click Results",content:null,origin:"wmsFeatureInfo",target:$("#map-div"),guid:"wms-guid"}),j=d.map(i,function(a){return new b({url:a.wmsLayer.url.split("?")[0],content:{SERVICE:"WMS",REQUEST:"GetFeatureInfo",VERSION:a.wmsLayer.version,SRS:"EPSG:"+a.wmsLayer.spatialReference.wkid,BBOX:f.extent.xmin+","+f.extent.ymin+","+f.extent.xmax+","+f.extent.ymax,WIDTH:f.width,HEIGHT:f.height,QUERY_LAYERS:a.layerConfig.layerInfo.name,INFO_FORMAT:a.layerConfig.featureInfo.mimeType,X:h.layerX,Y:h.layerY},handleAs:"text"})}),e.publish(a.GUI.SUBPANEL_OPEN,{content:"",origin:"wmsFeatureInfo",update:!0,guid:"wms-guid"}),c(j).then(function(b){var c=d.map(b,function(a,b){var c="<h5 class='margin-top-none'>"+i[b].layerConfig.displayName+"</h5>"+RAMP.plugins.featureInfoParser[i[b].layerConfig.featureInfo.parser](a);return c});e.publish(a.GUI.SUBPANEL_OPEN,{content:c.join(""),origin:"wmsFeatureInfo",update:!0,guid:"wms-guid"})},function(b){e.publish(a.GUI.SUBPANEL_OPEN,{content:":(",origin:"wmsFeatureInfo",update:!0,guid:"wms-guid"})}))})},registerWMSClick:function(a){g.push(a)}}});