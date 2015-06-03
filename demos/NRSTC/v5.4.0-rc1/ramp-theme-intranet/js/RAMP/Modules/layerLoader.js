/*! ramp-theme-intranet 03-06-2015 18:55:44 : v. 5.4.0-rc1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["dojo/topic","esri/layers/GraphicsLayer","esri/tasks/GeometryService","esri/tasks/ProjectParameters","esri/geometry/Extent","ramp/eventManager","ramp/map","ramp/globalStorage","ramp/featureClickHandler","ramp/mapClickHandler","ramp/filterManager","ramp/layerItem","ramp/attributeLoader","ramp/graphicExtension","utils/util"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){"use strict";function p(){return v+=1,"rampAutoId_"+v}function q(a){var b=RAMP.layerRegistry[a];return b?b.ramp.config:null}function r(a,b,c,d){if(c){var e;if(e=k.getLayerState(a),e===l.state.ERROR)return}k.setLayerState(a,b,d)}function s(a,b){var c=!1;return b.objId>=0&&a.id===b.layerId&&(c=!0),c}function t(a){var b=g.getMap(),c=g.getBoundingBoxMapping()[a],d=b._layers[a];if(d?b.removeLayer(d):d=RAMP.layerRegistry[a],c&&(b._layers[c.id]&&(b.removeLayer(c),RAMP.layerCounts.bb-=1),delete g.getBoundingBoxMapping()[d.id]),RAMP.data[a]&&delete RAMP.data[a],d)switch(d.ramp.type){case h.layerType.wms:d.ramp.load.inCount&&(RAMP.layerCounts.wms-=1,d.ramp.load.inCount=!1);break;case h.layerType.feature:case h.layerType.Static:d.ramp.load.inCount&&(RAMP.layerCounts.feature-=1,d.ramp.load.inCount=!1)}}function u(c,d){var n,p,q,s=g.getMap(),t=c.ramp.config,u={},v="undefined"==typeof d;switch(!c.ramp,c.ramp.type){case h.layerType.wms:p=h.layerType.wms,v?(n=RAMP.layerCounts.base+RAMP.layerCounts.wms,t.legendMimeType&&(c.ramp.config.legend={type:"wms",imageUrl:String.format("{0}?SERVICE=WMS&REQUEST=GetLegendGraphic&TRANSPARENT=true&VERSION=1.1.1&FORMAT={2}&LAYER={3}",t.url,c.version,t.legendMimeType,t.layerName)})):n=d,RAMP.layerCounts.wms+=1,c.ramp.load.inCount=!0;break;case h.layerType.feature:case h.layerType.Static:p=h.layerType.feature,n=v?RAMP.layerCounts.feature:d,RAMP.layerCounts.feature+=1,c.ramp.load.inCount=!0}switch(s.addLayer(c,n),RAMP.layerRegistry[c.id]=c,c.ramp.load.state){case"loaded":q=l.state.LOADED;break;case"loading":q=c.loaded?l.state.LOADED:l.state.LOADING;break;case"error":u.notices={error:{message:i18n.t("filterManager.notices.error.connect")}},q=l.state.ERROR}switch(v?(u.state=q,k.addLayer(p,c.ramp,u)):r(t.id,q,!1,u),c.ramp.load.inLS=!0,a.publish(f.Map.REORDER_END),c.ramp.type){case h.layerType.wms:t.featureInfo&&j.registerWMSClick(c);break;case h.layerType.feature:if(c.url?m.loadAttributeData(c.id,c.url,c.ramp.type):m.extractAttributeData(c),c.on("click",function(a){a.stopImmediatePropagation(),i.onFeatureSelect(a)}),c.on("mouse-over",function(a){i.onFeatureMouseOver(a)}),c.on("mouse-out",function(a){i.onFeatureMouseOut(a)}),t.layerExtent){var w,x=new b({id:String.format("boundingBoxLayer_{0}",c.id),visible:t.settings.boundingBoxVisible});if(w=new e(t.layerExtent),x.ramp={type:h.layerType.BoundingBox},o.isSpatialRefEqual(w.spatialReference,s.spatialReference))x.add(o.createGraphic(w));else{var y=g.localProjectExtent(w,s.spatialReference);x.add(o.createGraphic(y))}g.getBoundingBoxMapping()[c.id]=x,n=RAMP.layerCounts.feature+RAMP.layerCounts.bb,RAMP.layerCounts.bb+=1,s.addLayer(x,n);break}}a.publish(f.LayerLoader.LAYER_ADDED,{layer:c,layerCounts:RAMP.layerCounts})}var v=0;return{init:function(){a.subscribe(f.LayerLoader.LAYER_LOADED,this.onLayerLoaded),a.subscribe(f.LayerLoader.LAYER_UPDATED,this.onLayerUpdateEnd),a.subscribe(f.LayerLoader.LAYER_UPDATING,this.onLayerUpdateStart),a.subscribe(f.LayerLoader.LAYER_ERROR,this.onLayerError),a.subscribe(f.LayerLoader.REMOVE_LAYER,this.onLayerRemove),a.subscribe(f.LayerLoader.RELOAD_LAYER,this.onLayerReload)},onLayerError:function(a){a.layer.ramp.load.state="error";var b,c=a.layer.id,d=i18n.t("filterManager.notices.error.load");t(c),400===a.error.code&&(d=i18n.t("filterManager.notices.error.draw")),b={notices:{error:{message:d}}},a.layer.ramp.load.inLS&&r(a.layer.ramp.config.id,l.state.ERROR,!1,b)},onLayerUpdateStart:function(a){g.updateDatagridUpdatingState(a.layer,!0),r(a.layer.ramp.config.id,l.state.UPDATING,!0)},onLayerUpdateEnd:function(b){var c;s(b.layer,RAMP.state.hilite.click)&&(c=n.findGraphic(RAMP.state.hilite.click.objId,b.layer.id),c&&a.publish(f.FeatureHighlighter.HIGHLIGHT_SHOW,{graphic:c})),s(b.layer,RAMP.state.hilite.zoom)&&(c=n.findGraphic(RAMP.state.hilite.zoom.objId,b.layer.id),c&&a.publish(f.FeatureHighlighter.ZOOMLIGHT_SHOW,{graphic:c})),"error"!==b.layer.ramp.load.state&&(b.layer.ramp.load.state="loaded"),g.updateDatagridUpdatingState(b.layer),r(b.layer.ramp.config.id,l.state.LOADED,!0)},onLayerLoaded:function(a){a.layer.ramp.load.state="loaded",a.layer.ramp.load.inLS&&r(a.layer.ramp.config.id,l.state.LOADED,!0)},onLayerRemove:function(b){var c,d,e,g;switch(c=RAMP.layerRegistry[b.layerId],c.ramp.type){case h.layerType.wms:e=h.layerType.wms,g=RAMP.config.layers.wms;break;case h.layerType.feature:case h.layerType.Static:e=h.layerType.feature,g=RAMP.config.layers.feature}k.removeLayer(e,b.layerId),t(b.layerId),d=g.indexOf(c.ramp.config),g.splice(d,1),delete RAMP.layerRegistry[b.layerId],a.publish(f.LayerLoader.LAYER_REMOVED,{layer:c,layerCounts:RAMP.layerCounts})},onLayerReload:function(a){var b,c,d,e,f,i,j,m;switch(t(a.layerId),b=RAMP.layerRegistry[a.layerId],c=b.ramp.config,d=b.ramp.user,i=$("#"+RAMP.config.divNames.filter).find("#layerList").find("> li > ul"),j=i.map(function(a,b){return $(b).find("> li").toArray().reverse()}).map(function(a,b){return b.id}),m=j.toArray().filter(function(b,c){return k.getLayerState(c)!==l.state.ERROR||c===a.layerId}),f=m.indexOf(a.layerId),b.ramp.type===h.layerType.wms&&(f=f+RAMP.layerCounts.base-RAMP.layerCounts.feature),a.mode&&(c.mode=a.mode),b.ramp.type){case h.layerType.wms:e=g.makeWmsLayer(c,d);break;case h.layerType.feature:e=g.makeFeatureLayer(c,d);break;case h.layerType.Static:e=g.makeStaticLayer(c,d)}u(e,f)},loadLayer:function(a,b){u(a,b)},getLayerConfig:q,nextId:p}});