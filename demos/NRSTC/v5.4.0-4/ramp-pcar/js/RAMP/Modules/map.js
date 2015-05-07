/*! ramp-pcar 07-05-2015 18:15:47 : v. 5.4.0-4 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
define(["dojo/dom","dojo/dom-construct","dojo/number","dojo/query","dojo/topic","dojo/on","esri/map","esri/layers/FeatureLayer","esri/layers/ArcGISTiledMapServiceLayer","esri/layers/ArcGISDynamicMapServiceLayer","esri/SpatialReference","esri/dijit/Scalebar","esri/geometry/Extent","esri/layers/WMSLayer","esri/tasks/GeometryService","ramp/globalStorage","ramp/featureClickHandler","ramp/mapClickHandler","ramp/navigation","ramp/eventManager","utils/util","utils/array","utils/dictionary"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w){"use strict";function x(){$("#map-load-indicator").removeClass("hidden")}function y(){$("#map-load-indicator").addClass("hidden")}function z(a){if(a.levelChange){var d=c.format(a.lod.scale),e="1 : "+d;b.empty("scaleLabel"),$("#scaleLabel").text(e)}}function A(a){var f,g,h=a.map,i=b.create("div",{id:"scaleDiv","class":"esriScalebarLabel"});$(i).html("<span>"+i18n.t("map.scale")+"</span><br><span id='scaleLabel'><span/>"),f=c.format(h.getScale()),g="1 : "+f,b.place(i,d(".esriScalebarRuler")[0],"before"),b.empty("scaleLabel"),$("#scaleLabel").text(g),e.subscribe(t.BasemapSelector.BASEMAP_CHANGED,function(a){$(".esriScalebar > div").removeClass().addClass(a.cssStyle)})}function B(a){function b(b){a.on(b,function(a){e.publish(c+"/"+b,a)})}var c="map";b("update-end"),b("extent-change"),b("zoom-start"),b("zoom-end"),b("pan-start"),b("pan-end")}function C(b){e.subscribe(t.Map.CENTER_AT,function(a){b.centerAt(a.point)}),e.subscribe(t.Map.CENTER_AND_ZOOM,function(a){var c=new esri.geometry.Point(a.graphic.geometry.x,a.graphic.geometry.y,b.spatialReference),d=b.centerAndZoom(c,a.level);a.callback&&d.then(a.callback)}),e.subscribe(t.Map.SET_EXTENT,function(a){a.extent.spatialReference=b.spatialReference;var c=b.setExtent(a.extent);a.callback&&c.then(a.callback)}),e.subscribe(t.Navigation.PAN,function(a){b[a.direction]()}),e.subscribe(t.Navigation.ZOOM_STEP,function(a){b.setLevel(b.getLevel()+a.level)}),e.subscribe(t.Navigation.ZOOM,function(a){b.setLevel(a.level)}),e.subscribe(t.Navigation.FULL_EXTENT,function(){b.setExtent(R)}),e.subscribe(t.GUI.LAYOUT_CHANGE,function(){b.resize(!0)}),e.subscribe(t.GUI.SUBPANEL_CHANGE,function(a){!a.visible&&a.isComplete&&"rampPopup"===a.origin&&e.publish(t.FeatureHighlighter.HIGHLIGHT_HIDE,{})}),e.subscribe(t.FilterManager.LAYER_VISIBILITY_TOGGLED,function(a){var c=a.state,d=a.id,e=b.getLayer(d);e.setVisibility(c);try{p.LayerMap[d].forEach(function(a){var d=b.getLayer(a);d.setVisibility(c)})}catch(f){}}),e.subscribe(t.FilterManager.LAYER_TRANSPARENCY_CHANGED,function(a){var c=b.getLayer(a.layerId);if(void 0!==c){c.setOpacity(a.value);try{p.LayerMap[a.layerId].forEach(function(c){var d=b.getLayer(c);d.setOpacity(a.value)})}catch(d){}}}),e.subscribe(t.FilterManager.BOX_VISIBILITY_TOGGLED,function(a){K(a.id,a.state)}),e.subscribe(t.FilterManager.SELECTION_CHANGED,function(a){var c,d=a.index;b.layerIds.contains(a.id)?(c=b.graphicsLayerIds.map(function(a){return"Feature Layer"===b.getLayer(a).type?1:0}).sum(),d+=1-c):(P||(P=v.indexOf(b.graphicsLayerIds,function(a){var c=b.getLayer(a);return c.type&&"Feature Layer"===c.type})),d+=P),b.reorderLayer(b.getLayer(a.id),d),e.publish(t.Map.REORDER_END)}),e.subscribe(t.Map.ADD_LAYER,function(){var b=a.byId("addLayer-select-type").value,c=a.byId("addLayer-URL-input").value,d=a.byId("addLayer-Opacity").value;J(b,c,d)}),e.subscribe(t.Map.ADD_LAYER_READY,function(a){b.addLayer(a)})}function D(a){a.on("load",A),a.on("extent-change",function(b){z(b),f.once(a,"update-end",function(){e.publish(t.Datagrid.APPLY_EXTENT_FILTER)})}),a.on("click",function(a){q.onFeatureDeselect(a),e.publish(t.Map.CLICK,a)}),a.on("update-start",x),a.on("update-end",y)}function E(a,b){function c(a,b,d){var e,f,g;return 0===d?[a,b]:(e=[(a[0]+b[0])/2,(a[1]+b[1])/2],1===d?[a,e,b]:d>1?(f=c(a,e,d-1),g=c(e,b,d-1),f.concat(g.slice(1))):void 0)}var d,e,f,g,h,i,j,k,l,n,o=[[a.xmin,a.ymin],[a.xmax,a.ymin],[a.xmax,a.ymax],[a.xmin,a.ymax],[a.xmin,a.ymin]],p=[];if([0,1,2,3].map(function(a){return c(o[a],o[a+1],3).slice(1)}).forEach(function(a){p=p.concat(a)}),a.spatialReference.wkid)n="EPSG:"+a.spatialReference.wkid;else{if(!a.spatialReference.wkt)throw new Error("No WKT or WKID specified on extent.spatialReference");n=a.spatialReference.wkt}return d=proj4(n,"EPSG:"+b.wkid),e=p.map(function(a){return d.forward(a)}),k=e.map(function(a){return a[0]}),l=e.map(function(a){return a[1]}),g=Math.min.apply(null,k),i=Math.max.apply(null,k),h=Math.min.apply(null,l),j=Math.max.apply(null,l),f=new m(g,h,i,j,b)}function F(a,b,c){var d;if(d=new m(a),u.isSpatialRefEqual(d.spatialReference,b))c([d]);else{var e=E(d,b);c([e])}}function G(a){RAMP.config.extents.defaultExtent=a[0],F(RAMP.config.extents.fullExtent,a[0].spatialReference,H)}function H(a){RAMP.config.extents.fullExtent=a[0],F(RAMP.config.extents.maximumExtent,a[0].spatialReference,I)}function I(a){RAMP.config.extents.maximumExtent=a[0],e.publish(t.Map.EXTENTS_REPROJECTED)}function J(a,b,c){c/=100;var d;switch(a){case"feature":d=new h(b,{opacity:c,mode:h.MODE_ONDEMAND});break;case"tile":d=new i(b,{opacity:c});break;case"dynamic":d=new j(b,{opacity:c})}e.publish(t.Map.ADD_LAYER_READY,d),e.publish(t.GUI.ADD_LAYER_PANEL_CHANGE,{visible:!1})}function K(a,b){var c=V[a];c.setVisibility(b)}function L(a){return a["default"]||1}function M(a){var b={id:a.id,visible:a.settings.visible,opacity:L(a.settings.opacity)};switch(a.mode){case"ondemand":b.mode=h.MODE_ONDEMAND;break;case"snapshot":b.mode=h.MODE_SNAPSHOT,b.maxAllowableOffset=a.maxAllowableOffset}return b}function N(a,b,c){a.ramp={config:b,user:"boolean"==typeof c?c:!1,load:{state:"loading",inLS:!1,inCount:!1}},a.on("load",function(a){e.publish(t.LayerLoader.LAYER_LOADED,{layer:a.layer})}),a.on("error",function(a){a.target.ramp.loadOk=!1,e.publish(t.LayerLoader.LAYER_ERROR,{layer:a.target,error:a.error})}),a.ramp.load.onUpdateStart=function(){e.publish(t.LayerLoader.LAYER_UPDATING,{layer:this})},a.on("update-start",a.ramp.load.onUpdateStart),a.on("update-end",function(a){e.publish(t.LayerLoader.LAYER_UPDATED,{layer:a.target})})}var O,P,Q,R,S,T,U=[],V={};return{zoomToLayerScale:function(a){var b,c,d,e,f=Q.getLayer(a),g=Q._params.lods,h=Q.getLevel();for(e=0;e<g.length;e+=1)d=g[e],!b&&d.scale<=f.minScale&&(b=d),!c&&d.scale<=f.maxScale&&(c=g[Math.max(0,e-1)]);0===f.minScale&&(b=c),0===f.maxScale&&(c=b),Q.setZoom(Math.abs(b.level-h)<=Math.abs(c.level-h)?b.level:c.level)},layerInLODRange:function(a,b){var c,d,e=Q._params.lods,f=-1,g=-1,h=!1;for(0===a&&(g=0),0===b&&(f=0),d=0;d<e.length;d+=1)c=e[d],-1===f&&c.scale<=b&&(f=c),-1===g&&c.scale<=a&&(g=e[Math.max(0,d-1)]);return h=0===a&&0===b?!0:0===b?-1===g?!1:!0:0===a?-1===f?!1:!0:-1!==f&&-1!==g},getMaxExtent:function(){return S},getMap:function(){return Q},getVisibleFeatureLayers:function(){return Q.getLayersVisibleAtScale().filter(function(a){return a.type&&"Feature Layer"===a.type&&a.visible})},getVisibleLayers:function(){return Q.getLayersVisibleAtScale()},getInvisibleLayers:function(){var a,b,c;return a=this.getVisibleLayers(),b=Q._layers,c=[],w.forEachEntry(b,function(b,d){var e=v.indexOf(a,function(a){return b===a.id});-1===e&&c.push(d)}),c},getBoundingBoxMapping:function(){return V},getFeatureLayer:function(a){return Q.getLayer(a)},applyExtentDefaulting:function(){RAMP.config.extents.fullExtent||(RAMP.config.extents.fullExtent=JSON.parse(JSON.stringify(RAMP.config.extents.defaultExtent))),RAMP.config.extents.maximumExtent||(RAMP.config.extents.maximumExtent=JSON.parse(JSON.stringify(RAMP.config.extents.fullExtent)))},projectConfigExtents:function(){var a=new k(RAMP.config.basemaps[RAMP.config.initialBasemapIndex].spatialReference);F(RAMP.config.extents.defaultExtent,a,G)},checkBoundary:function(a,b){var c,d,e=a,f=e.width(),g=e.height(),h=e.centerX(),i=e.centerY();d=e.clone();var j=b.height();g>j&&(g=j),i>b.ymax?(d.ymax=b.ymax,d.ymin=b.ymax-g,c=!0):i<b.ymin&&(d.ymin=b.ymin,d.ymax=b.ymin+g,c=!0);var k=b.width();return f>k&&(f=k),h>b.xmax?(d.xmax=b.xmax,d.xmin=b.xmax-f,c=!0):h<b.xmin&&(d.xmin=b.xmin,d.xmax=b.xmin+f,c=!0),c?d:void 0},makeFeatureLayer:function(a,b){var c=new h(a.url,M(a));return N(c,a,b),c.ramp.type=p.layerType.feature,c},makeWmsLayer:function(a,b){var c=new n(a.url,{id:a.id,format:a.format,opacity:L(a.settings.opacity),visibleLayers:[a.layerName]});return N(c,a,b),c.ramp.type=p.layerType.wms,c.setVisibility(a.settings.visible),c},makeStaticLayer:function(a,b){var c,d=a.layerType||"feature";switch(d){case"feature":c=new h(a.url,M(a)),N(c,a,b),c.ramp.type=p.layerType.Static}return c},enhanceLayer:function(a,b,c){N(a,b,c)},localProjectExtent:E,updateDatagridUpdatingState:function(a,b){var c=RAMP.state.ui.datagridUpdating;a.ramp.type===p.layerType.feature&&(b=b?1:-1,RAMP.state.ui.datagridUpdating+=b,c+RAMP.state.ui.datagridUpdating===1&&e.publish(t.Datagrid.UPDATING,RAMP.state.ui.datagridUpdating?!0:!1))},init:function(){var a=this,b=RAMP.config.basemaps[RAMP.config.initialBasemapIndex],c=b.layers[0].url,d=new i(c,{id:"basemapLayer"}),f=d.on("update-end",function(){f.remove(),e.publish(t.Map.INITIAL_BASEMAP_LOADED)});d.on("error",function(a){window.location.href=RAMP.config.mapInitFailUrl}),T=new m(RAMP.config.extents.defaultExtent),R=new m(RAMP.config.extents.fullExtent),S=new m(RAMP.config.extents.maximumExtent),U=RAMP.config.layers.wms.map(function(b){return a.makeWmsLayer(b)}),O=RAMP.config.layers.feature.map(function(b){var c;return c=b.isStatic?a.makeStaticLayer(b):a.makeFeatureLayer(b)});var h=b.tileSchema;if(h){var j=v.find(RAMP.config.LODs,function(a){return a.tileSchema===h});Q=new g(RAMP.config.divNames.map,{extent:T,logo:!1,minZoom:RAMP.config.zoomLevels.min,maxZoom:RAMP.config.zoomLevels.max,slider:!1,lods:j.lod})}else Q=new g(RAMP.config.divNames.map,{extent:T,logo:!1,minZoom:RAMP.config.zoomLevels.min,maxZoom:RAMP.config.zoomLevels.max,slider:!1});RAMP.map=Q,r.init(Q);var k=[],n=[],o=[];RAMP.config.layers.feature.forEach(function(b){n=[],b.staticLayers&&(b.staticLayers.forEach(function(b,c){var d=a.makeStaticLayer(b);k.push(d),n[c]=b.id}),o[b.id]=n)}),RAMP.staticLayerMap=o,d.ramp={type:p.layerType.Basemap},RAMP.startupLayers=U.concat(k,O),Q.addLayer(d);var q=new l({map:Q,attachTo:"bottom-left",scalebarUnit:"metric"});q.show(),B(Q),C(Q),D(Q)}}});