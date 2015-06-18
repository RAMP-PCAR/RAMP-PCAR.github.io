/*! ramp-theme-canada 18-06-2015 17:47:11 : v. 5.4.0-ckan 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["dojo/dom","dojo/_base/lang","dojo/dom-construct","dojo/number","dojo/query","dojo/topic","dojo/on","esri/map","esri/layers/FeatureLayer","esri/layers/ArcGISTiledMapServiceLayer","esri/layers/ArcGISDynamicMapServiceLayer","esri/SpatialReference","esri/dijit/Scalebar","esri/geometry/Extent","esri/layers/WMSLayer","esri/tasks/GeometryService","ramp/globalStorage","ramp/featureClickHandler","ramp/mapClickHandler","ramp/navigation","ramp/eventManager","utils/util","utils/array","utils/dictionary"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x){"use strict";function y(){$("#map-load-indicator").removeClass("hidden")}function z(){$("#map-load-indicator").addClass("hidden")}function A(a){if(a.levelChange){var b=d.format(a.lod.scale),e="1 : "+b;c.empty("scaleLabel"),$("#scaleLabel").text(e)}}function B(a){function b(b){a.on(b,function(a){f.publish(c+"/"+b,a)})}var c="map";b("update-end"),b("extent-change"),b("zoom-start"),b("zoom-end"),b("pan-start"),b("pan-end")}function C(b){f.subscribe(u.Map.CENTER_AT,function(a){b.centerAt(a.point)}),f.subscribe(u.Map.CENTER_AND_ZOOM,function(a){var c=new esri.geometry.Point(a.graphic.geometry.x,a.graphic.geometry.y,b.spatialReference),d=b.centerAndZoom(c,a.level);a.callback&&d.then(a.callback)}),f.subscribe(u.Map.SET_EXTENT,function(a){a.extent.spatialReference=b.spatialReference;var c=b.setExtent(a.extent);a.callback&&c.then(a.callback)}),f.subscribe(u.Map.PAN_END,function(){V=b.extent.getCenter()}),f.subscribe(u.Map.ZOOM_END,function(){V=b.extent.getCenter()}),f.subscribe(u.Navigation.PAN,function(a){b[a.direction](),V=b.extent.getCenter()}),f.subscribe(u.Navigation.ZOOM_STEP,function(a){b.setLevel(b.getLevel()+a.level),V=b.extent.getCenter()}),f.subscribe(u.Navigation.ZOOM,function(a){b.setLevel(a.level),V=b.extent.getCenter()}),f.subscribe(u.Navigation.FULL_EXTENT,function(){b.setExtent(S),V=b.extent.getCenter()}),f.subscribe(u.GUI.LAYOUT_CHANGE,function(){D()}),f.subscribe(u.Map.RESIZE,function(){D()}),f.subscribe(u.GUI.SUBPANEL_CHANGE,function(a){!a.visible&&a.isComplete&&"rampPopup"===a.origin&&f.publish(u.FeatureHighlighter.HIGHLIGHT_HIDE,{})}),f.subscribe(u.FilterManager.LAYER_VISIBILITY_TOGGLED,function(a){var c=a.state,d=a.id,e=b.getLayer(d);e.setVisibility(c);try{q.LayerMap[d].forEach(function(a){var d=b.getLayer(a);d.setVisibility(c)})}catch(f){}}),f.subscribe(u.FilterManager.LAYER_TRANSPARENCY_CHANGED,function(a){var c=b.getLayer(a.layerId);if(void 0!==c){c.setOpacity(a.value);try{q.LayerMap[a.layerId].forEach(function(c){var d=b.getLayer(c);d.setOpacity(a.value)})}catch(d){}}}),f.subscribe(u.FilterManager.BOX_VISIBILITY_TOGGLED,function(a){L(a.id,a.state)}),f.subscribe(u.FilterManager.SELECTION_CHANGED,function(a){var c,d=a.index;b.layerIds.contains(a.id)?(c=b.graphicsLayerIds.map(function(a){return"Feature Layer"===b.getLayer(a).type?1:0}).sum(),d+=1-c):(Q||(Q=w.indexOf(b.graphicsLayerIds,function(a){var c=b.getLayer(a);return c.type&&"Feature Layer"===c.type})),d+=Q),b.reorderLayer(b.getLayer(a.id),d),f.publish(u.Map.REORDER_END)}),f.subscribe(u.Map.ADD_LAYER,function(){var b=a.byId("addLayer-select-type").value,c=a.byId("addLayer-URL-input").value,d=a.byId("addLayer-Opacity").value;K(b,c,d)}),f.subscribe(u.Map.ADD_LAYER_READY,function(a){b.addLayer(a)})}function D(){R.resize(!0),void 0!==V?f.publish(u.Map.CENTER_AT,{point:V}):f.publish(u.Map.CENTER_AT,{point:R.extent.getCenter()})}function E(a){a.on("extent-change",function(b){A(b),a.getLayersVisibleAtScale(a.getScale())[0].id!==a.layerIds[0]?$("#mainMap_container").css("background-image",'url("assets/images/no_data.png")'):$("#mainMap_container").css("background-image","none"),g.once(a,"update-end",function(){f.publish(u.Datagrid.APPLY_EXTENT_FILTER)})}),a.on("click",function(a){r.onFeatureDeselect(a),f.publish(u.Map.CLICK,a)}),a.on("update-start",y),a.on("update-end",z),window.onresize=D}function F(a,b){function c(a,b,d){var e,f,g;return 0===d?[a,b]:(e=[(a[0]+b[0])/2,(a[1]+b[1])/2],1===d?[a,e,b]:d>1?(f=c(a,e,d-1),g=c(e,b,d-1),f.concat(g.slice(1))):void 0)}var d,e,f,g,h,i,j,k,l,m,o=[[a.xmin,a.ymin],[a.xmax,a.ymin],[a.xmax,a.ymax],[a.xmin,a.ymax],[a.xmin,a.ymin]],p=[];if([0,1,2,3].map(function(a){return c(o[a],o[a+1],3).slice(1)}).forEach(function(a){p=p.concat(a)}),a.spatialReference.wkid)m="EPSG:"+a.spatialReference.wkid;else{if(!a.spatialReference.wkt)throw new Error("No WKT or WKID specified on extent.spatialReference");m=a.spatialReference.wkt}return d=proj4(m,"EPSG:"+b.wkid),e=p.map(function(a){return d.forward(a)}),k=e.map(function(a){return a[0]}),l=e.map(function(a){return a[1]}),g=Math.min.apply(null,k),i=Math.max.apply(null,k),h=Math.min.apply(null,l),j=Math.max.apply(null,l),f=new n(g,h,i,j,b)}function G(a,b,c){var d;if(d=new n(a),v.isSpatialRefEqual(d.spatialReference,b))c([d]);else{var e=F(d,b);c([e])}}function H(a){RAMP.config.extents.defaultExtent=a[0],G(RAMP.config.extents.fullExtent,a[0].spatialReference,I)}function I(a){RAMP.config.extents.fullExtent=a[0],G(RAMP.config.extents.maximumExtent,a[0].spatialReference,J)}function J(a){RAMP.config.extents.maximumExtent=a[0],f.publish(u.Map.EXTENTS_REPROJECTED)}function K(a,b,c){c/=100;var d;switch(a){case"feature":d=new i(b,{opacity:c,mode:i.MODE_ONDEMAND});break;case"tile":d=new j(b,{opacity:c});break;case"dynamic":d=new k(b,{opacity:c})}f.publish(u.Map.ADD_LAYER_READY,d),f.publish(u.GUI.ADD_LAYER_PANEL_CHANGE,{visible:!1})}function L(a,b){var c=X[a];c.setVisibility(b)}function M(a){return a["default"]||1}function N(a){var b={id:a.id,visible:a.settings.visible,opacity:M(a.settings.opacity)};switch(a.mode){case"ondemand":b.mode=i.MODE_ONDEMAND;break;case"snapshot":b.mode=i.MODE_SNAPSHOT,b.maxAllowableOffset=a.maxAllowableOffset}return b}function O(a,c,d){a.ramp={config:c,user:"boolean"==typeof d?d:!1,load:{state:"loading",inLS:!1,inCount:!1},state:b.clone(c.settings)},a.on("load",function(a){f.publish(u.LayerLoader.LAYER_LOADED,{layer:a.layer})}),a.on("error",function(a){a.target.ramp.loadOk=!1,f.publish(u.LayerLoader.LAYER_ERROR,{layer:a.target,error:a.error})}),a.ramp.load.onUpdateStart=function(){f.publish(u.LayerLoader.LAYER_UPDATING,{layer:this})},a.on("update-start",a.ramp.load.onUpdateStart),a.on("update-end",function(a){f.publish(u.LayerLoader.LAYER_UPDATED,{layer:a.target})})}var P,Q,R,S,T,U,V,W=[],X={};return{zoomToLayerScale:function(a){var b,c,d,e,f=R.getLayer(a),g=R._params.lods,h=R.getLevel();for(e=0;e<g.length;e+=1)d=g[e],!b&&d.scale<=f.minScale&&(b=d),!c&&d.scale<=f.maxScale&&(c=g[Math.max(0,e-1)]);0===f.minScale&&(b=c),0===f.maxScale&&(c=b),Math.abs(b.level-h)<=Math.abs(c.level-h)?R.setZoom(b.level):R.setZoom(c.level)},layerInLODRange:function(a,b){var c,d,e=R._params.lods,f=-1,g=-1,h=!1;for(0===a&&(g=0),0===b&&(f=0),d=0;d<e.length;d+=1)c=e[d],-1===f&&c.scale<=b&&(f=c),-1===g&&c.scale<=a&&(g=e[Math.max(0,d-1)]);return h=0===a&&0===b?!0:0===b?-1===g?!1:!0:0===a?-1===f?!1:!0:-1!==f&&-1!==g},getMaxExtent:function(){return T},getMap:function(){return R},getVisibleFeatureLayers:function(){return R.getLayersVisibleAtScale().filter(function(a){return a.type&&"Feature Layer"===a.type&&a.visible})},getVisibleLayers:function(){return R.getLayersVisibleAtScale()},getInvisibleLayers:function(){var a,b,c;return a=this.getVisibleLayers(),b=R._layers,c=[],x.forEachEntry(b,function(b,d){var e=w.indexOf(a,function(a){return b===a.id});-1===e&&c.push(d)}),c},getBoundingBoxMapping:function(){return X},getFeatureLayer:function(a){return R.getLayer(a)},applyExtentDefaulting:function(){RAMP.config.extents.fullExtent||(RAMP.config.extents.fullExtent=JSON.parse(JSON.stringify(RAMP.config.extents.defaultExtent))),RAMP.config.extents.maximumExtent||(RAMP.config.extents.maximumExtent=JSON.parse(JSON.stringify(RAMP.config.extents.fullExtent)))},projectConfigExtents:function(){var a=new l(RAMP.config.basemaps[RAMP.config.initialBasemapIndex].spatialReference);G(RAMP.config.extents.defaultExtent,a,H)},checkBoundary:function(a,b){var c,d,e=a,f=e.width(),g=e.height(),h=e.centerX(),i=e.centerY();d=e.clone();var j=b.height();g>j&&(g=j),i>b.ymax?(d.ymax=b.ymax,d.ymin=b.ymax-g,c=!0):i<b.ymin&&(d.ymin=b.ymin,d.ymax=b.ymin+g,c=!0);var k=b.width();return f>k&&(f=k),h>b.xmax?(d.xmax=b.xmax,d.xmin=b.xmax-f,c=!0):h<b.xmin&&(d.xmin=b.xmin,d.xmax=b.xmin+f,c=!0),c?d:void 0},makeFeatureLayer:function(a,b){var c=new i(a.url,N(a));return O(c,a,b),c.ramp.type=q.layerType.feature,c},makeWmsLayer:function(a,b){var c=new o(a.url,{id:a.id,format:a.format,opacity:M(a.settings.opacity),visibleLayers:[a.layerName]});return O(c,a,b),c.ramp.type=q.layerType.wms,c.setVisibility(a.settings.visible),c},makeStaticLayer:function(a,b){var c,d=a.layerType||"feature";switch(d){case"feature":c=new i(a.url,N(a)),O(c,a,b),c.ramp.type=q.layerType.Static}return c},enhanceLayer:function(a,b,c){O(a,b,c)},localProjectExtent:F,updateDatagridUpdatingState:function(a,b){var c=RAMP.state.ui.datagridUpdating;a.ramp.type===q.layerType.feature&&(b=b?1:-1,RAMP.state.ui.datagridUpdating+=b,c+RAMP.state.ui.datagridUpdating===1&&f.publish(u.Datagrid.UPDATING,RAMP.state.ui.datagridUpdating?!0:!1))},init:function(){var a=this,b=RAMP.config.basemaps[RAMP.config.initialBasemapIndex],c=b.layers[0].url,d=new j(c,{id:"basemapLayer"}),e=d.on("update-end",function(){e.remove(),f.publish(u.Map.INITIAL_BASEMAP_LOADED)});d.on("error",function(a){window.location.href=RAMP.config.mapInitFailUrl}),U=new n(RAMP.config.extents.defaultExtent),S=new n(RAMP.config.extents.fullExtent),T=new n(RAMP.config.extents.maximumExtent),W=RAMP.config.layers.wms.map(function(b){return a.makeWmsLayer(b)}),P=RAMP.config.layers.feature.map(function(b){var c;return c=b.isStatic?a.makeStaticLayer(b):a.makeFeatureLayer(b)});var g=b.tileSchema;if(g){var i=w.find(RAMP.config.LODs,function(a){return a.tileSchema===g});R=new h(RAMP.config.divNames.map,{extent:U,logo:!1,minZoom:RAMP.config.zoomLevels.min,maxZoom:RAMP.config.zoomLevels.max,slider:!1,lods:i.lod})}else R=new h(RAMP.config.divNames.map,{extent:U,logo:!1,autoResize:!0,minZoom:RAMP.config.zoomLevels.min,maxZoom:RAMP.config.zoomLevels.max,slider:!1});RAMP.map=R,s.init(R);var k=[],l=[],o=[];RAMP.config.layers.feature.forEach(function(b){l=[],b.staticLayers&&(b.staticLayers.forEach(function(b,c){var d=a.makeStaticLayer(b);k.push(d),l[c]=b.id}),o[b.id]=l)}),RAMP.staticLayerMap=o,d.ramp={type:q.layerType.Basemap},RAMP.startupLayers=W.concat(k,P),R.addLayer(d);var p=new m({map:R,attachTo:"bottom-left",scalebarUnit:"metric"});p.show(),B(R),C(R),E(R),V=R.extent.getCenter()}}});