/*! ramp-theme-intranet 11-02-2015 19:05:31 : v. 5.0.0 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["dojo/Deferred","dojo/query","dojo/_base/array","esri/request","esri/SpatialReference","esri/layers/FeatureLayer","esri/renderers/SimpleRenderer","ramp/layerLoader","ramp/globalStorage","ramp/map","utils/util"],function(a,b,c,d,e,f,g,h,i,j,k){"use strict";function l(b){var c,e=new a;if(b.file){if(b.url)throw new Error("Either url or file should be specified, not both");c="binary"===b.type?k.readFileAsArrayBuffer(b.file):k.readFileAsText(b.file),c.then(function(a){e.resolve(a)},function(a){e.reject(a)})}else{if(!b.url)throw new Error("One of url or file should be specified");try{c=new d({url:b.url,handleAs:"text"}).promise}catch(f){e.reject(f)}c.then(function(a){function c(a){for(var b,c=new ArrayBuffer(2*a.length),d=new Uint16Array(c),e=0,f=0,g=a.length;g>e;)b=a.charCodeAt(e++),65280&b&&(d[f++]=(65280&b)>>8),d[f++]=255&b;return c.slice(0,f)}return"binary"===b.type?void e.resolve(c(a)):void e.resolve(a)},function(a){e.reject(a)})}return e.promise}function m(b){var e,f=new a;try{e=new d({url:b+"?f=json"}).promise}catch(g){f.reject(g)}return e.then(function(a){var d={layerId:a.id,layerName:a.name,layerUrl:b,geometryType:a.geometryType,fields:c.map(a.fields,function(a){return a.name}),renderer:a.drawingInfo.renderer};f.resolve(d)},function(a){f.reject(a)}),f.promise}function n(b){var e,f,g,h,i=new a;g=b.indexOf("/",b.length-1),f=g>-1?b.substring(0,g-1):b,g=f.lastIndexOf("/"),h=parseInt(f.substring(g+1)),f=f.substring(0,g)+"/legend?f=json";try{e=new d({url:f}).promise}catch(j){i.reject(j)}return e.then(function(a){var b={};c.forEach(a.layers,function(a){a.layerId===h&&c.forEach(a.legend,function(a){b[a.label]="data:"+a.contentType+";base64,"+a.imageData})}),i.resolve(b)},function(a){i.reject(a)}),i.promise}function o(e){function f(a,b){var c;for(c=0;c<a.childNodes.length;++c)if(a.childNodes[c].nodeName===b)return a.childNodes[c];return void 0}var g,h=new a;try{g=new d({url:e+"?service=WMS&version=1.3&request=GetCapabilities",handleAs:"xml"}).promise}catch(i){h.reject(i)}return g.then(function(a){var d,e={};try{d=c.map(b("Layer > Name",a),function(a){return a.parentNode}),e.layers=c.map(d,function(a){var b=f(a,"Name").textContent,c=f(a,"Title");return{name:b,desc:c?c.textContent:b,queryable:"1"===a.getAttribute("queryable")}}),e.queryTypes=c.map(b("GetFeatureInfo > Format",a),function(a){return a.textContent})}catch(g){h.reject(g)}h.resolve(e)},function(a){h.reject(a)}),h.promise}function p(a){if("FeatureCollection"!==a.type)throw new Error("Assignment can only be performed on FeatureCollections");c.forEach(a.features,function(a,b){"undefined"==typeof a.id&&(a.id=b)})}function q(a){if(a.features.length<1)throw new Error("Field extraction requires at least one feature");return c.map(Object.keys(a.features[0].properties),function(a){return{name:a,type:"esriFieldTypeString"}})}function r(a){function b(a,b,c,d,e){return{id:a,fieldName:b,width:c,orderable:!1,type:"string",alignment:0,title:d,columnTemplate:e}}var d={rowsPerPage:50,gridColumns:[]};return d.gridColumns.push(b("iconCol","","50px","Icon","graphic_icon")),d.gridColumns.push(b("detailsCol","","60px","Details","details_button")),c.forEach(a,function(a,c){d.gridColumns.push(b("col"+c.toString(),a,"100px",a,"title_span"))}),d}function s(a,b){var d={type:a.type};switch(d.type){case"simple":d.label=a.label,d.imageUrl=b[a.label];break;case"uniqueValue":a.defaultLabel&&(d.defaultImageUrl=b[a.defaultLabel]),d.field1=a.field1,d.field2=a.field2,d.field3=a.field3,d.valueMaps=c.map(a.uniqueValueInfos,function(a){return{label:a.label,value:a.value,imageUrl:b[a.label]}});break;case"classBreaks":a.defaultLabel&&(d.defaultImageUrl=b[a.defaultLabel]),d.field=a.field,d.minValue=a.minValue,d.rangeMaps=c.map(a.classBreakInfos,function(a){return{label:a.label,maxValue:a.classMaxValue,imageUrl:b[a.label]}})}return d}function t(a,b){return csv2geojson.dsv(b).parseRows(a)}function u(a,b){var c,d,g,j,k,l,m=i.DefaultRenderers,n=h.nextId();return d={objectIdField:"OBJECTID",fields:[{name:"OBJECTID",type:"esriFieldTypeOID"}]},k=RAMP.map.spatialReference.wkid,p(a),d.drawingInfo=m[z[a.features[0].geometry.type]],b&&(b.sourceProjection&&(l=b.sourceProjection),b.targetWkid&&(k=b.targetWkid),b.fields&&(d.fields=d.fields.concat(b.fields))),1===d.fields.length&&(d.fields=d.fields.concat(q(a))),Terraformer.Proj.convert(a,"EPSG:"+k,l),c=Terraformer.ArcGIS.convert(a,{sr:k}),j={features:c,geometryType:d.drawingInfo.geometryType},g=new f({layerDefinition:d,featureSet:j},{mode:f.MODE_SNAPSHOT,id:n}),g.spatialReference=new e({wkid:k}),g.renderer._RAMP_rendererType=z[a.features[0].geometry.type],g}function v(a,b){var c={id:a.id,displayName:b.datasetName,nameField:b.nameField,symbology:{type:"simple",imageUrl:b.icon},datagrid:r(b.fields)},d=i.DefaultRenderers;if(c=i.applyFeatureDefaults(c),j.enhanceLayer(a,c,!0),a.ramp.type=i.layerType.feature,a.ramp.load.state="loaded",a.type="Feature Layer",RAMP.config.layers.feature.push(c),b.renderer&&d.hasOwnProperty(b.renderer)){var e=d[b.renderer].renderer;b.colour&&(e.symbol.color=b.colour),a.renderer=new g(e)}else b.colour&&(a.renderer.symbol.color=b.colour)}function w(b,c){var d=new a,e={latfield:"Lat",lonfield:"Long",delimiter:","};c&&(c.latfield&&(e.latfield=c.latfield),c.lonfield&&(e.lonfield=c.lonfield),c.delimiter&&(e.delimiter=c.delimiter));try{csv2geojson.csv2geojson(b,e,function(a,b){var e;return a?void d.reject(a):(e=u(b,c),void d.resolve(e))})}catch(f){d.reject(f)}return d.promise}function x(b){var c=new a;try{shp.getShapefile(b).then(function(a){var b;try{b=u(a),c.resolve(b)}catch(d){c.reject(d)}},function(a){c.reject(a)})}catch(d){c.reject(d)}return c.promise}function y(b){var c=new a,d=null;try{d=u(JSON.parse(b)),c.resolve(d)}catch(e){c.reject(e)}return c.promise}var z={Point:"circlePoint",MultiPoint:"circlePoint",LineString:"solidLine",MultiLineString:"solidLine",Polygon:"outlinedPoly",MultiPolygon:"outlinedPoly"};return{loadDataSet:l,getFeatureLayer:m,getFeatureLayerLegend:n,getWmsLayerList:o,makeGeoJsonLayer:u,csvPeek:t,buildCsv:w,buildShapefile:x,buildGeoJson:y,enhanceFileFeatureLayer:v,createDatagridConfig:r,createSymbologyConfig:s}});