/*! ramp-theme-canada 10-07-2015 14:54:58 : v. 5.4.2 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["dojo/topic","dojo/request/script","dojo/Deferred","esri/request","ramp/eventManager","ramp/globalStorage","ramp/map"],function(a,b,c,d,e,f,g){"use strict";function h(a,b){var c=a.features.length;a.features=a.features.concat(b),b.forEach(function(b,d){a.index[b.attributes[a.idField].toString()]=d+c,b.parent=a})}function i(){return{layerId:"",idField:"",features:[],index:{}}}function j(a,d,e,f,g,h){var i=b.get(e+"/query",{query:"where="+f+">"+a+"&outFields="+RAMP.layerRegistry[g].ramp.config.layerAttributes+"&returnGeometry=false&f=json",jsonp:"callback"});i.then(function(a){if(a.features){var b=a.features.length;if(b>0)if(-1===d&&(d=b),d>b)h.resolve(a.features);else{var i=new c;j(a.features[b-1].attributes[f],d,e,f,g,i),i.then(function(b){h.resolve(a.features.concat(b))},function(a){h.reject(a)})}else h.resolve([])}else h.reject(a.error)},function(a){h.reject(a)})}function k(b,k,l){switch(l){case f.layerType.feature:var m=d({url:k,content:{f:"json"},callbackParamName:"callback",handleAs:"json"});m.then(function(d){if(d&&"undefined"==typeof d.error){g.updateDatagridUpdatingState(RAMP.layerRegistry[b],!0);var f=d.maxRecordCount||-1,l=new c,m=i();m.layerId=b,d.fields.every(function(a){return"esriFieldTypeOID"===a.type?(m.idField=a.name,!1):!0}),j(-1,f,k,m.idField,b,l),l.promise.then(function(c){h(m,c),RAMP.data[b]=m,a.publish(e.Datagrid.APPLY_EXTENT_FILTER),g.updateDatagridUpdatingState(RAMP.layerRegistry[b],!1)},function(c){g.updateDatagridUpdatingState(RAMP.layerRegistry[b],!1),a.publish(e.LayerLoader.LAYER_ERROR,{layer:RAMP.layerRegistry[b],error:c})})}else d&&d.error},function(a){})}}function l(b){switch(b.ramp.type){case f.layerType.feature:var c=i();c.layerId=b.id,c.idField=b.objectIdField,h(c,b.graphics.map(function(a){return{attributes:a.attributes}})),RAMP.data[b.id]=c,a.publish(e.Datagrid.APPLY_EXTENT_FILTER)}}return{loadAttributeData:k,extractAttributeData:l}});