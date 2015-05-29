/*! ramp-theme-intranet 29-05-2015 14:18:38 : v. 5.4.0-10 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["ramp/eventManager","esri/request","dojo/promise/all","dojo/topic"],function(a,b,c,d){"use strict";var e,f=[];return{init:function(g){var h='<header class="modal-header"><h2 class="modal-title">{0}</h2></header>'.format(i18n.t("mapClickHandler.getFiPanelTitle"));e=g,d.subscribe(a.Map.CLICK,function(g){var i=[],j=[];RAMP.config.ui.mapQueryToggle.show&&(i=f.filter(function(a){return a.visible&&a.id in RAMP.layerRegistry&&RAMP.layerRegistry[a.id]&&a.ramp.loadOk!==!1&&a.ramp.state.queryEnabled===!0}),0!==i.length&&(d.publish(a.GUI.SUBPANEL_OPEN,{panelName:i18n.t("mapClickHandler.getFiPanelName"),title:i18n.t("mapClickHandler.getFiPanelTitle"),content:null,origin:"wmsFeatureInfo",target:$("#map-div"),guid:"wms-guid"}),j=i.map(function(a){try{var c,d,f,h={};return d=a.getMap().spatialReference,f=a.spatialReferences,f&&f.length>1?c=f[0]:d.wkid&&(c=d.wkid),h="1.3"===a.version||"1.3.0"===a.version?{CRS:"EPSG:"+c,I:g.screenPoint.x,J:g.screenPoint.y}:{SRS:"EPSG:"+c,X:g.screenPoint.x,Y:g.screenPoint.y},$.extend(h,{SERVICE:"WMS",REQUEST:"GetFeatureInfo",VERSION:a.version,BBOX:e.extent.xmin+","+e.extent.ymin+","+e.extent.xmax+","+e.extent.ymax,WIDTH:e.width,HEIGHT:e.height,QUERY_LAYERS:a.ramp.config.layerName,LAYERS:a.ramp.config.layerName,INFO_FORMAT:a.ramp.config.featureInfo.mimeType}),new b({url:a.url.split("?")[0],content:h,handleAs:"text"})}catch(i){}}),d.publish(a.GUI.SUBPANEL_OPEN,{content:"",origin:"wmsFeatureInfo",update:!0,guid:"wms-guid"}),c(j).then(function(b){var c=b.map(function(a,b){var c="<h5 class='margin-top-none'>"+i[b].ramp.config.displayName+"</h5>"+RAMP.plugins.featureInfoParser[i[b].ramp.config.featureInfo.parser](a,i[b].id);return c}).join(""),e='<section id="wms-results-large" class="mfp-hide modal-dialog modal-content overlay-def">{0}<div class="modal-body">{1}</div></section>'.format(h,c);$(".sub-panel").on("click","#wms-expand",function(){$(document).trigger("open.wb-lbx",[{src:"#wms-results-large",type:"inline"}]),$("#wms-results-large").css({width:Math.round(.9*window.innerWidth)+"px","max-height":Math.round(.75*window.innerHeight)+"px"})}),d.publish(a.GUI.SUBPANEL_OPEN,{content:'{0}<a id="wms-expand" href="#wms-results-large" role="button" aria-controls="wms-results-large">{2}</a>{1}'.format(e,c,i18n.t("gui.actions.expand")),origin:"wmsFeatureInfo",update:!0,guid:"wms-guid"})},function(b){d.publish(a.GUI.SUBPANEL_OPEN,{content:String.format("<em>{0}</em>",i18n.t("mapClickHandler.getFiFailed")),origin:"wmsFeatureInfo",update:!0,guid:"wms-guid"})})))})},registerWMSClick:function(a){f.push(a)}}});