/*! ramp-theme-canada 08-05-2015 15:41:58 : v. 5.3.1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["dojo/topic","dojo/_base/array","esri/layers/GraphicsLayer","esri/tasks/GeometryService","esri/tasks/ProjectParameters","esri/geometry/Extent","ramp/eventManager","ramp/map","ramp/globalStorage","ramp/featureClickHandler","ramp/mapClickHandler","ramp/ramp","ramp/filterManager","ramp/layerItem","utils/util"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){"use strict";function p(){return t+=1,"rampAutoId_"+t}function q(a,b,c,d){if(c){var e;if(e=m.getLayerState(a),e===n.state.ERROR)return}m.setLayerState(a,b,d)}function r(a){var b=h.getMap(),c=h.getBoundingBoxMapping()[a],d=b._layers[a];if(d?b.removeLayer(d):d=RAMP.layerRegistry[a],c&&b._layers[c.id]&&(b.removeLayer(c),RAMP.layerCounts.bb-=1),d)switch(d.ramp.type){case i.layerType.wms:d.ramp.load.inCount&&(RAMP.layerCounts.wms-=1,d.ramp.load.inCount=!1);break;case i.layerType.feature:case i.layerType.Static:d.ramp.load.inCount&&(RAMP.layerCounts.feature-=1,d.ramp.load.inCount=!1)}}function s(b,d){var e,l,p,r=h.getMap(),s=b.ramp.config,t={},u="undefined"==typeof d;switch(!b.ramp,b.ramp.type){case i.layerType.wms:l=i.layerType.wms,u?(e=RAMP.layerCounts.base+RAMP.layerCounts.wms,s.legendMimeType&&(b.ramp.config.legend={type:"wms",imageUrl:String.format("{0}?SERVICE=WMS&REQUEST=GetLegendGraphic&TRANSPARENT=true&VERSION=1.1.1&FORMAT={2}&LAYER={3}",s.url,b.version,s.legendMimeType,s.layerName)})):e=d,RAMP.layerCounts.wms+=1,b.ramp.load.inCount=!0;break;case i.layerType.feature:case i.layerType.Static:l=i.layerType.feature,e=u?RAMP.layerCounts.feature:d,RAMP.layerCounts.feature+=1,b.ramp.load.inCount=!0}switch(r.addLayer(b,e),RAMP.layerRegistry[b.id]=b,a.publish(g.LayerLoader.LAYER_ADDED,{layer:b}),b.ramp.load.state){case"loaded":p=n.state.LOADED;break;case"loading":p=b.loaded?n.state.LOADED:n.state.LOADING;break;case"error":t.notices={error:{message:i18n.t("filterManager.notices.error.connect")}},p=n.state.ERROR}switch(u?(t.state=p,m.addLayer(l,b.ramp,t)):q(s.id,p,!1,t),b.ramp.load.inLS=!0,a.publish(g.Map.REORDER_END),b.ramp.type){case i.layerType.wms:s.featureInfo&&k.registerWMSClick(b);break;case i.layerType.feature:if(b.on("click",function(a){a.stopImmediatePropagation(),j.onFeatureSelect(a)}),b.on("mouse-over",function(a){j.onFeatureMouseOver(a)}),b.on("mouse-out",function(a){j.onFeatureMouseOut(a)}),u){var v,w=new c({id:String.format("boundingBoxLayer_{0}",b.id),visible:s.settings.boundingBoxVisible});if(w.ramp={type:i.layerType.BoundingBox},s.layerExtent)if(v=new f(s.layerExtent),o.isSpatialRefEqual(v.spatialReference,r.spatialReference))w.add(o.createGraphic(v));else{var x=h.localProjectExtent(v,r.spatialReference);w.add(o.createGraphic(x))}h.getBoundingBoxMapping()[b.id]=w,e=RAMP.layerCounts.feature+RAMP.layerCounts.bb,RAMP.layerCounts.bb+=1,r.addLayer(w,e)}}}var t=0;return{init:function(){RAMP.layerCounts={feature:0,bb:0,wms:0,base:1},RAMP.layerRegistry={},a.subscribe(g.LayerLoader.LAYER_LOADED,this.onLayerLoaded),a.subscribe(g.LayerLoader.LAYER_UPDATED,this.onLayerUpdateEnd),a.subscribe(g.LayerLoader.LAYER_UPDATING,this.onLayerUpdateStart),a.subscribe(g.LayerLoader.LAYER_ERROR,this.onLayerError),a.subscribe(g.LayerLoader.REMOVE_LAYER,this.onLayerRemove),a.subscribe(g.LayerLoader.RELOAD_LAYER,this.onLayerReload)},onLayerError:function(a){a.layer.ramp.load.state="error";var b,c=a.layer.id,d=i18n.t("filterManager.notices.error.load");r(c),400===a.error.code&&(d=i18n.t("filterManager.notices.error.draw")),b={notices:{error:{message:d}}},a.layer.ramp.load.inLS&&q(a.layer.ramp.config.id,n.state.ERROR,!1,b)},onLayerUpdateStart:function(a){q(a.layer.ramp.config.id,n.state.UPDATING,!0)},onLayerUpdateEnd:function(a){"error"!==a.layer.ramp.load.state&&(a.layer.ramp.load.state="loaded"),q(a.layer.ramp.config.id,n.state.LOADED,!0)},onLayerLoaded:function(a){a.layer.ramp.load.state="loaded",a.layer.ramp.load.inLS&&q(a.layer.ramp.config.id,n.state.LOADED,!0)},onLayerRemove:function(a){var b,c,d,e,f=h.getMap();switch(b=f._layers[a.layerId],b||(b=RAMP.layerRegistry[a.layerId]),b.ramp.type){case i.layerType.wms:d=i.layerType.wms,e=RAMP.config.layers.wms;break;case i.layerType.feature:case i.layerType.Static:d=i.layerType.feature,e=RAMP.config.layers.feature}m.removeLayer(d,a.layerId),r(a.layerId),c=e.indexOf(b.ramp.config),e.splice(c,1),RAMP.layerRegistry[a.layerId]=void 0},onLayerReload:function(a){var c,d,e,f,g,j,k,l,o,p=h.getMap();switch(r(a.layerId),c=p._layers[a.layerId],c?j=!0:(j=!1,c=RAMP.layerRegistry[a.layerId]),d=c.ramp.config,e=c.ramp.user,k=$("#"+RAMP.config.divNames.filter).find("#layerList").find("> li > ul"),l=k.map(function(a,b){return $(b).find("> li").toArray().reverse()}).map(function(a,b){return b.id}),o=l.filter(function(b,c){return m.getLayerState(c)!==n.state.ERROR||c===a.layerId}),g=b.indexOf(o,a.layerId),c.ramp.type===i.layerType.wms&&(g=g+RAMP.layerCounts.base-RAMP.layerCounts.feature),j&&p.removeLayer(c),c.ramp.type){case i.layerType.wms:f=h.makeWmsLayer(d,e);break;case i.layerType.feature:f=h.makeFeatureLayer(d,e);break;case i.layerType.Static:f=h.makeStaticLayer(d,e)}s(f,g)},loadLayer:function(a,b){s(a,b)},nextId:p}});