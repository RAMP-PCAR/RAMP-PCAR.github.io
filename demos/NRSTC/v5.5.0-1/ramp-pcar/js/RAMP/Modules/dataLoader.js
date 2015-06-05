/*! ramp-pcar 05-06-2015 14:10:55 : v. 5.5.0-1 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP 
 **/
define(["dojo/Deferred","dojo/query","dojo/promise/first","esri/request","esri/SpatialReference","esri/layers/FeatureLayer","esri/renderers/SimpleRenderer","ramp/layerLoader","ramp/globalStorage","ramp/map","utils/util"],function(a,b,c,d,e,f,g,h,i,j,k){"use strict";function l(b){var c,e=new a;if(b.file){if(b.url)throw new Error("Either url or file should be specified, not both");c="binary"===b.type?k.readFileAsArrayBuffer(b.file):k.readFileAsText(b.file),c.then(function(a){e.resolve(a)},function(a){e.reject(a)})}else{if(!b.url)throw new Error("One of url or file should be specified");try{c=new d({url:b.url,handleAs:"text"}).promise}catch(f){e.reject(f)}c.then(function(a){function c(a){for(var b,c=new ArrayBuffer(2*a.length),d=new Uint16Array(c),e=0,f=0,g=a.length;g>e;)b=a.charCodeAt(e++),65280&b&&(d[f++]=(65280&b)>>8),d[f++]=255&b;return c.slice(0,f)}return"binary"===b.type?void e.resolve(c(a)):void e.resolve(a)},function(a){e.reject(a)})}return e.promise}function m(b){var c,e=new a;try{c=new d({url:b+"?f=json"}).promise}catch(f){e.reject(f)}return c.then(function(a){try{var c={};a.fields.forEach(function(a){c[a.name]=a.alias});var d={layerId:a.id,layerName:a.name,layerUrl:b,geometryType:a.geometryType,fields:a.fields.map(function(a){return a.name}),renderer:a.drawingInfo.renderer,aliasMap:c,maxScale:a.maxScale,minScale:a.minScale};e.resolve(d)}catch(f){e.reject(f)}},function(a){e.reject(a)}),e.promise}function n(b){var c,e,f,g,h=new a;f=b.indexOf("/",b.length-1),e=f>-1?b.substring(0,f-1):b,f=e.lastIndexOf("/"),g=parseInt(e.substring(f+1)),e=e.substring(0,f)+"/legend?f=json";try{c=new d({url:e}).promise}catch(i){h.reject(i)}return c.then(function(a){var b={};a.layers.forEach(function(a){a.layerId===g&&a.legend.forEach(function(a){b[a.label]="data:"+a.contentType+";base64,"+a.imageData})}),h.resolve(b)},function(a){h.reject(a)}),h.promise}function o(c){function e(a,b){var c;for(c=0;c<a.childNodes.length;++c)if(a.childNodes[c].nodeName===b)return a.childNodes[c];return void 0}var f,g=new a;try{f=new d({url:c+"?service=WMS&version=1.3&request=GetCapabilities",handleAs:"xml"}).promise}catch(h){g.reject(h)}return f.then(function(a){var c,d={};try{c=b("Layer > Name",a).map(function(a){return a.parentNode}),d.layers=c.map(function(a){var b=e(a,"Name"),c=b.textContent||b.text,d=e(a,"Title");return{name:c,desc:d?d.textContent||d.text:c,queryable:"1"===a.getAttribute("queryable")}}),d.queryTypes=b("GetFeatureInfo > Format",a).map(function(a){return a.textContent||a.text})}catch(f){g.reject(f)}g.resolve(d)},function(a){g.reject(a)}),g.promise}function p(a){if("FeatureCollection"!==a.type)throw new Error("Assignment can only be performed on FeatureCollections");a.features.forEach(function(a,b){"undefined"==typeof a.id&&(a.id=b)})}function q(a){if(a.features.length<1)throw new Error("Field extraction requires at least one feature");return Object.keys(a.features[0].properties).map(function(a){return{name:a,type:"esriFieldTypeString"}})}function r(a,b){function c(a,b,c,d,e,f){var g={id:a,fieldName:b,width:c,title:d,columnTemplate:e},h=["type","orderable","alignment"];return h.forEach(function(a){f&&a in f&&(g[a]=f[a])}),g}var d={rowsPerPage:50,gridColumns:[]};return d.gridColumns.push(c("iconCol","","50px","Icon","graphic_icon",{orderable:!1})),d.gridColumns.push(c("detailsCol","","60px","Details","details_button",{orderable:!1})),a&&a.length&&a.forEach(function(a,e){var f=a;"shape"!==a.toLowerCase()&&(b&&b[a]&&(f=b[a]),d.gridColumns.push(c("col"+e.toString(),a,"100px",f,"title_span")))}),d}function s(a,b){var c={type:a.type};switch(c.type){case"simple":c.label=a.label,c.imageUrl=b[a.label];break;case"uniqueValue":a.defaultLabel&&(c.defaultImageUrl=b[a.defaultLabel]),c.field1=a.field1,c.field2=a.field2,c.field3=a.field3,c.valueMaps=a.uniqueValueInfos.map(function(a){return{label:a.label,value:a.value,imageUrl:b[a.label]}});break;case"classBreaks":a.defaultLabel&&(c.defaultImageUrl=b[a.defaultLabel]),c.field=a.field,c.minValue=a.minValue,c.rangeMaps=a.classBreakInfos.map(function(a){return{label:a.label,maxValue:a.classMaxValue,imageUrl:b[a.label]}})}return c}function t(a,b){return csv2geojson.dsv(b).parseRows(a)}function u(a){if(a.crs&&"name"===a.crs.type){var b=a.crs.properties.name,d=Object.keys(RAMP.plugins.projectionLookup).map(function(a){return RAMP.plugins.projectionLookup[a](b)});c(d).then(function(a){proj4.defs(b,a)},function(a){})}}function v(a,b){var c,d,g,j,k,l,m=i.DefaultRenderers,n=h.nextId();return d={objectIdField:"OBJECTID",fields:[{name:"OBJECTID",type:"esriFieldTypeOID"}]},k=RAMP.map.spatialReference.wkid,p(a),d.drawingInfo=m[A[a.features[0].geometry.type]],u(a),b&&(b.sourceProjection&&(l=b.sourceProjection),b.targetWkid&&(k=b.targetWkid),b.fields&&(d.fields=d.fields.concat(b.fields))),1===d.fields.length&&(d.fields=d.fields.concat(q(a))),Terraformer.Proj.convert(a,"EPSG:"+k,l),c=Terraformer.ArcGIS.convert(a,{sr:k}),j={features:c,geometryType:d.drawingInfo.geometryType},g=new f({layerDefinition:d,featureSet:j},{mode:f.MODE_SNAPSHOT,id:n}),g.spatialReference=new e({wkid:k}),g.renderer._RAMP_rendererType=A[a.features[0].geometry.type],g}function w(a,b){var c={id:a.id,displayName:b.datasetName,nameField:b.nameField,symbology:{type:"simple",imageUrl:b.icon},datagrid:r(b.fields)},d=i.DefaultRenderers;if(c=i.applyFeatureDefaults(c),j.enhanceLayer(a,c,!0),a.ramp.type=i.layerType.feature,a.ramp.load.state="loaded",a.type="Feature Layer",RAMP.config.layers.feature.push(c),b.renderer&&d.hasOwnProperty(b.renderer)){var e=d[b.renderer].renderer;b.colour&&(e.symbol.color=b.colour),a.renderer=new g(e)}else b.colour&&(a.renderer.symbol.color=b.colour)}function x(b,c){var d=new a,e={latfield:"Lat",lonfield:"Long",delimiter:","};c&&(c.latfield&&(e.latfield=c.latfield),c.lonfield&&(e.lonfield=c.lonfield),c.delimiter&&(e.delimiter=c.delimiter));try{csv2geojson.csv2geojson(b,e,function(a,b){var f;return a?void d.reject(a):(b.features.map(function(a){a.properties[e.lonfield]=a.geometry.coordinates[0],a.properties[e.latfield]=a.geometry.coordinates[1]}),f=v(b,c),void d.resolve(f))})}catch(f){d.reject(f)}return d.promise}function y(b){var c=new a;try{shp.getShapefile(b).then(function(a){var b;try{b=v(a),c.resolve(b)}catch(d){c.reject(d)}},function(a){c.reject(a)})}catch(d){c.reject(d)}return c.promise}function z(b){var c=new a,d=null;try{d=v(JSON.parse(b)),c.resolve(d)}catch(e){c.reject(e)}return c.promise}var A={Point:"circlePoint",MultiPoint:"circlePoint",LineString:"solidLine",MultiLineString:"solidLine",Polygon:"outlinedPoly",MultiPolygon:"outlinedPoly"};return{loadDataSet:l,getFeatureLayer:m,getFeatureLayerLegend:n,getWmsLayerList:o,makeGeoJsonLayer:v,csvPeek:t,buildCsv:x,buildShapefile:y,buildGeoJson:z,enhanceFileFeatureLayer:w,createDatagridConfig:r,createSymbologyConfig:s}});