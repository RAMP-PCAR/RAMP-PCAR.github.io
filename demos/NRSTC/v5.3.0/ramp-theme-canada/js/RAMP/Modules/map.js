/*! ramp-theme-canada 28-04-2015 20:03:05 : v. 5.3.0 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["dojo/_base/declare","dojo/_base/array","dojo/dom","dojo/dom-construct","dojo/number","dojo/query","dojo/topic","dojo/on","esri/map","esri/layers/FeatureLayer","esri/layers/ArcGISTiledMapServiceLayer","esri/layers/ArcGISDynamicMapServiceLayer","esri/SpatialReference","esri/dijit/Scalebar","esri/geometry/Extent","esri/layers/WMSLayer","esri/tasks/GeometryService","esri/tasks/ProjectParameters","ramp/globalStorage","ramp/ramp","ramp/featureClickHandler","ramp/mapClickHandler","ramp/navigation","ramp/eventManager","utils/util","utils/array","utils/dictionary"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A){"use strict";function B(){$("#map-load-indicator").removeClass("hidden")}function C(){$("#map-load-indicator").addClass("hidden")}function D(a){if(a.levelChange){var b=e.format(a.lod.scale),c="1 : "+b;d.empty("scaleLabel"),$("#scaleLabel").text(c)}}function E(a){var b,c,h=a.map,i=d.create("div",{id:"scaleDiv","class":"esriScalebarLabel"});$(i).html("<span>"+i18n.t("map.scale")+"</span><br><span id='scaleLabel'><span/>"),b=e.format(h.getScale()),c="1 : "+b,d.place(i,f(".esriScalebarRuler")[0],"before"),d.empty("scaleLabel"),$("#scaleLabel").text(c),g.subscribe(x.BasemapSelector.BASEMAP_CHANGED,function(a){$(".esriScalebar > div").removeClass().addClass(a.cssStyle)})}function F(a){function b(b){a.on(b,function(a){g.publish(c+"/"+b,a)})}var c="map";b("update-end"),b("extent-change"),b("zoom-start"),b("zoom-end"),b("pan-start"),b("pan-end")}function G(a){g.subscribe(x.Map.CENTER_AT,function(b){a.centerAt(b.point)}),g.subscribe(x.Map.CENTER_AND_ZOOM,function(b){var c=new esri.geometry.Point(b.graphic.geometry.x,b.graphic.geometry.y,a.spatialReference),d=a.centerAndZoom(c,b.level);b.callback&&d.then(b.callback)}),g.subscribe(x.Map.SET_EXTENT,function(b){b.extent.spatialReference=a.spatialReference;var c=a.setExtent(b.extent);b.callback&&c.then(b.callback)}),g.subscribe(x.Navigation.PAN,function(b){a[b.direction]()}),g.subscribe(x.Navigation.ZOOM_STEP,function(b){a.setLevel(a.getLevel()+b.level)}),g.subscribe(x.Navigation.ZOOM,function(b){a.setLevel(b.level)}),g.subscribe(x.Navigation.FULL_EXTENT,function(){a.setExtent(U)}),g.subscribe(x.GUI.LAYOUT_CHANGE,function(){a.resize(!0)}),g.subscribe(x.GUI.SUBPANEL_CHANGE,function(a){!a.visible&&a.isComplete&&"rampPopup"===a.origin&&g.publish(x.FeatureHighlighter.HIGHLIGHT_HIDE,{})}),g.subscribe(x.FilterManager.LAYER_VISIBILITY_TOGGLED,function(c){var d=c.state,e=c.id,f=a.getLayer(e);f.setVisibility(d);try{b.forEach(s.LayerMap[e],function(b){var c=a.getLayer(b);c.setVisibility(d)})}catch(g){}}),g.subscribe(x.FilterManager.LAYER_TRANSPARENCY_CHANGED,function(c){var d=a.getLayer(c.layerId);if(void 0!==d){d.setOpacity(c.value);try{b.forEach(s.LayerMap[c.layerId],function(b){var d=a.getLayer(b);d.setOpacity(c.value)})}catch(e){}}}),g.subscribe(x.FilterManager.BOX_VISIBILITY_TOGGLED,function(a){O(a.id,a.state)}),g.subscribe(x.FilterManager.SELECTION_CHANGED,function(c){var d,e=c.index;a.layerIds.contains(c.id)?(d=b.map(a.graphicsLayerIds,function(b){return"Feature Layer"===a.getLayer(b).type?1:0}).sum(),e+=1-d):(S||(S=z.indexOf(a.graphicsLayerIds,function(b){var c=a.getLayer(b);return c.type&&"Feature Layer"===c.type})),e+=S),a.reorderLayer(a.getLayer(c.id),e),g.publish(x.Map.REORDER_END)}),g.subscribe(x.Map.ADD_LAYER,function(){var a=c.byId("addLayer-select-type").value,b=c.byId("addLayer-URL-input").value,d=c.byId("addLayer-Opacity").value;N(a,b,d)}),g.subscribe(x.Map.ADD_LAYER_READY,function(b){a.addLayer(b)})}function H(a){a.on("load",E),a.on("extent-change",function(b){D(b),h.once(a,"update-end",function(){g.publish(x.Datagrid.APPLY_EXTENT_FILTER)})}),a.on("click",function(a){u.onFeatureDeselect(a),g.publish(x.Map.CLICK,a)}),a.on("update-start",B),a.on("update-end",C)}function I(a,b){function c(a,b,d){var e,f,g;return 0===d?[a,b]:(e=[(a[0]+b[0])/2,(a[1]+b[1])/2],1===d?[a,e,b]:d>1?(f=c(a,e,d-1),g=c(e,b,d-1),f.concat(g.slice(1))):void 0)}var d,e,f,g,h,i,j,k,l,m,n=[[a.xmin,a.ymin],[a.xmax,a.ymin],[a.xmax,a.ymax],[a.xmin,a.ymax],[a.xmin,a.ymin]],p=[];if([0,1,2,3].map(function(a){return c(n[a],n[a+1],3).slice(1)}).forEach(function(a){p=p.concat(a)}),a.spatialReference.wkid)m="EPSG:"+a.spatialReference.wkid;else{if(!a.spatialReference.wkt)throw new Error("No WKT or WKID specified on extent.spatialReference");m=a.spatialReference.wkt}return d=proj4(m,"EPSG:"+b.wkid),e=p.map(function(a){return d.forward(a)}),k=e.map(function(a){return a[0]}),l=e.map(function(a){return a[1]}),g=Math.min.apply(null,k),i=Math.max.apply(null,k),h=Math.min.apply(null,l),j=Math.max.apply(null,l),f=new o(g,h,i,j,b)}function J(a,b,c){var d;if(d=new o(a),y.isSpatialRefEqual(d.spatialReference,b))c([d]);else{var e=I(d,b);c([e])}}function K(a){RAMP.config.extents.defaultExtent=a[0],J(RAMP.config.extents.fullExtent,a[0].spatialReference,L)}function L(a){RAMP.config.extents.fullExtent=a[0],J(RAMP.config.extents.maximumExtent,a[0].spatialReference,M)}function M(a){RAMP.config.extents.maximumExtent=a[0],g.publish(x.Map.EXTENTS_REPROJECTED)}function N(a,b,c){c/=100;var d;switch(a){case"feature":d=new j(b,{opacity:c,mode:j.MODE_SNAPSHOT});break;case"tile":d=new k(b,{opacity:c});break;case"dynamic":d=new l(b,{opacity:c})}g.publish(x.Map.ADD_LAYER_READY,d),g.publish(x.GUI.ADD_LAYER_PANEL_CHANGE,{visible:!1})}function O(a,b){var c=Y[a];c.setVisibility(b)}function P(a){return a["default"]||1}function Q(a,b,c){a.ramp={config:b,user:"boolean"==typeof c?c:!1,load:{state:"loading",inLS:!1,inCount:!1}},a.on("load",function(a){g.publish(x.LayerLoader.LAYER_LOADED,{layer:a.layer})}),a.on("error",function(a){a.target.ramp.loadOk=!1,g.publish(x.LayerLoader.LAYER_ERROR,{layer:a.target,error:a.error})}),a.ramp.load.onUpdateStart=function(){g.publish(x.LayerLoader.LAYER_UPDATING,{layer:this})},a.on("update-start",a.ramp.load.onUpdateStart),a.on("update-end",function(a){g.publish(x.LayerLoader.LAYER_UPDATED,{layer:a.target})})}var R,S,T,U,V,W,X=[],Y={};return{zoomToLayerScale:function(a){var b,c,d,e,f=T.getLayer(a),g=T._params.lods,h=T.getLevel();for(e=0;e<g.length;e+=1)d=g[e],!b&&d.scale<=f.minScale&&(b=d),!c&&d.scale<=f.maxScale&&(c=g[Math.max(0,e-1)]);0===f.minScale&&(b=c),0===f.maxScale&&(c=b),T.setZoom(Math.abs(b.level-h)<=Math.abs(c.level-h)?b.level:c.level)},layerInLODRange:function(a,b){var c,d,e=T._params.lods,f=-1,g=-1,h=!1;for(0===a&&(g=0),0===b&&(f=0),d=0;d<e.length;d+=1)c=e[d],-1===f&&c.scale<=b&&(f=c),-1===g&&c.scale<=a&&(g=e[Math.max(0,d-1)]);return h=0===a&&0===b?!0:0===b?-1===g?!1:!0:0===a?-1===f?!1:!0:-1!==f&&-1!==g},getMaxExtent:function(){return V},getMap:function(){return T},getVisibleFeatureLayers:function(){return b.filter(T.getLayersVisibleAtScale(),function(a){return a.type&&"Feature Layer"===a.type&&a.visible})},getVisibleLayers:function(){return T.getLayersVisibleAtScale()},getInvisibleLayers:function(){var a,b,c;return a=this.getVisibleLayers(),b=T._layers,c=[],A.forEachEntry(b,function(b,d){var e=z.indexOf(a,function(a){return b===a.id});-1===e&&c.push(d)}),c},getBoundingBoxMapping:function(){return Y},getFeatureLayer:function(a){return T.getLayer(a)},applyExtentDefaulting:function(){RAMP.config.extents.fullExtent||(RAMP.config.extents.fullExtent=JSON.parse(JSON.stringify(RAMP.config.extents.defaultExtent))),RAMP.config.extents.maximumExtent||(RAMP.config.extents.maximumExtent=JSON.parse(JSON.stringify(RAMP.config.extents.fullExtent)))},projectConfigExtents:function(){var a=new m(RAMP.config.basemaps[RAMP.config.initialBasemapIndex].spatialReference);J(RAMP.config.extents.defaultExtent,a,K)},checkBoundary:function(a,b){var c,d,e=a,f=e.width(),g=e.height(),h=e.centerX(),i=e.centerY();d=e.clone();var j=b.height();g>j&&(g=j),i>b.ymax?(d.ymax=b.ymax,d.ymin=b.ymax-g,c=!0):i<b.ymin&&(d.ymin=b.ymin,d.ymax=b.ymin+g,c=!0);var k=b.width();return f>k&&(f=k),h>b.xmax?(d.xmax=b.xmax,d.xmin=b.xmax-f,c=!0):h<b.xmin&&(d.xmin=b.xmin,d.xmax=b.xmin+f,c=!0),c?d:void 0},makeFeatureLayer:function(a,b){var c=new j(a.url,{id:a.id,mode:j.MODE_SNAPSHOT,outFields:[a.layerAttributes],visible:a.settings.visible,opacity:P(a.settings.opacity),maxAllowableOffset:a.maxAllowableOffset});return Q(c,a,b),c.ramp.type=s.layerType.feature,c},makeWmsLayer:function(a,b){var c=new p(a.url,{id:a.id,format:a.format,opacity:P(a.settings.opacity),visibleLayers:[a.layerName]});return Q(c,a,b),c.ramp.type=s.layerType.wms,c.setVisibility(a.settings.visible),c},makeStaticLayer:function(a,b){var c,d=a.layerType||"feature";switch(d){case"feature":c=new j(a.url,{opacity:P(a.settings.opacity),mode:j.MODE_SNAPSHOT,visible:a.settings.visible,id:a.id,maxAllowableOffset:a.maxAllowableOffset}),Q(c,a,b),c.ramp.type=s.layerType.Static}return c},enhanceLayer:function(a,b,c){Q(a,b,c)},localProjectExtent:I,init:function(){var a=this,c=RAMP.config.basemaps[RAMP.config.initialBasemapIndex],d=c.layers[0].url,e=new k(d,{id:"basemapLayer"}),f=e.on("update-end",function(){f.remove(),g.publish(x.Map.INITIAL_BASEMAP_LOADED)});e.on("error",function(a){window.location.href=RAMP.config.mapInitFailUrl}),W=new o(RAMP.config.extents.defaultExtent),U=new o(RAMP.config.extents.fullExtent),V=new o(RAMP.config.extents.maximumExtent),X=b.map(RAMP.config.layers.wms,function(b){return a.makeWmsLayer(b)}),R=b.map(RAMP.config.layers.feature,function(b){var c;return c=b.isStatic?a.makeStaticLayer(b):a.makeFeatureLayer(b)});var h=c.tileSchema;if(h){var j=z.find(RAMP.config.LODs,function(a){return a.tileSchema===h});T=new i(RAMP.config.divNames.map,{extent:W,logo:!1,minZoom:RAMP.config.zoomLevels.min,maxZoom:RAMP.config.zoomLevels.max,slider:!1,lods:j.lod})}else T=new i(RAMP.config.divNames.map,{extent:W,logo:!1,minZoom:RAMP.config.zoomLevels.min,maxZoom:RAMP.config.zoomLevels.max,slider:!1});RAMP.map=T,v.init(T);var l=[],m=[],p=[];b.forEach(RAMP.config.layers.feature,function(c){m=[],b.forEach(c.staticLayers,function(b,c){var d=a.makeStaticLayer(b);l.push(d),m[c]=b.id}),p[c.id]=m}),RAMP.staticLayerMap=p,e.ramp={type:s.layerType.Basemap},RAMP.startupLayers=X.concat(l,R),T.addLayer(e);var q=new n({map:T,attachTo:"bottom-left",scalebarUnit:"metric"});q.show(),F(T),G(T),H(T)}}});