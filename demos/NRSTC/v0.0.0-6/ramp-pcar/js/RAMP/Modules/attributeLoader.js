/*! ramp-pcar 25-05-2015 18:54:31 : v. 5.4.0-8 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
define(["dojo/topic","dojo/request/script","dojo/Deferred","ramp/eventManager","ramp/globalStorage","ramp/map"],function(a,b,c,d,e,f){"use strict";function g(a,b){var c=a.features.length;a.features=a.features.concat(b),b.forEach(function(b,d){a.index[b.attributes[a.idField].toString()]=d+c,b.parent=a})}function h(){return{layerId:"",idField:"",features:[],index:{}}}function i(a,c,d,e,f,g){var h=b.get(e+"/query",{query:"where="+f+">"+a+"&outFields=*&returnGeometry=false&f=json",jsonp:"callback"});h.then(function(a){if(a.features){var b=a.features.length;b>0?(-1===c&&(c=b),c>b?g.resolve(d.concat(a.features)):i(a.features[b-1].attributes[f],c,d.concat(a.features),e,f,g)):g.resolve(d)}else g.reject(a.error)},function(a){g.reject(a)})}function j(j,k,l){switch(l){case e.layerType.feature:var m=b.get(k,{query:"f=json",jsonp:"callback"});m.then(function(b){f.updateDatagridUpdatingState(RAMP.layerRegistry[j],!0);var e=b.maxRecordCount||-1,l=new c,m=h();m.layerId=j,b.fields.every(function(a){return"esriFieldTypeOID"===a.type?(m.idField=a.name,!1):!0}),i(-1,e,[],k,m.idField,l),l.promise.then(function(b){g(m,b),RAMP.data[j]=m,a.publish(d.Datagrid.APPLY_EXTENT_FILTER),f.updateDatagridUpdatingState(RAMP.layerRegistry[j],!1)},function(b){f.updateDatagridUpdatingState(RAMP.layerRegistry[j],!1),a.publish(d.LayerLoader.LAYER_ERROR,{layer:RAMP.layerRegistry[j],error:b})})},function(a){})}}function k(b){switch(b.ramp.type){case e.layerType.feature:var c=h();c.layerId=b.id,c.idField=b.objectIdField,g(c,b.graphics.map(function(a){return{attributes:a.attributes}})),RAMP.data[b.id]=c,a.publish(d.Datagrid.APPLY_EXTENT_FILTER)}}return{loadAttributeData:j,extractAttributeData:k}});