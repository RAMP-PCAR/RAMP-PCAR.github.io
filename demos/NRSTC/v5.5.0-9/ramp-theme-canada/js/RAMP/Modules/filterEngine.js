/*! ramp-theme-canada 10-07-2015 14:09:09 : v. 5.5.0-9 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["dojo/request/script","dojo/Deferred","ramp/graphicExtension","esri/tasks/query","utils/util","utils/dictionary","utils/array"],function(a,b,c,d,e,f,g){"use strict";function h(a,c){var f,g={},h=new b,i=new d;return i.outFields=["*"],i.geometry=c,f=a.map(function(a){return a.queryFeatures(i).then(function(a){if(a.features.length>0){var b=a.features[0].getLayer();g[b.id]={type:"features",features:a.features}}})}),e.afterAll(f,function(){h.resolve(g)}),h.promise}function i(a){var b={};return f.forEachEntry(a,function(a,d){if(RAMP.data[a])switch(d.type){case"features":b[a]=d.features.map(function(a){return c.getFDataForGraphic(a)});break;case"raw":b[a]=RAMP.data[a].features.slice()}}),b}function j(a,b,c,d){var e="",f=[],g=RAMP.layerRegistry[a.parent.layerId].ramp.config;return c?f=Object.keys(a.attributes):"summary"===d?f=[g.nameField]:"full"===d&&(f=g.datagrid.gridColumns.map(function(a){return a.fieldName}),f=f.splice(0,2)),f.forEach(function(a){e+="match((attributes,"+a+"),"+b+"),"}),"or("+e.substring(0,e.length-1)+")"}function k(a,b,c,d){var e={};return f.forEachEntry(a,function(a,f){f&&f.length>0&&(e[a]=j(f[0],b,c,d))}),e}function l(a,b){var d,e,h,i,j=new RqlArray;f.forEachEntry(a,function(a,f){switch(f.type){case"features":b[a]&&b[a].length>0?(e=b[a][0].parent.idField,i="values(attributes),sort(+"+e+"),values("+e+")",h=j.executeQuery(i,{},b[a])):h=[],f.features.forEach(function(a){d=h.length>0?g.binaryIndexOf(h,function(b){var d=c.getGraphicOid(a);return d===b?0:d>b?-1:1}):-1,d>-1?a.show():a.hide()});break;case"raw":}})}function m(a,c){var d,e=new b,g=c.extent?!0:!1;if(g)d=h(a,c.extent);else{var j={},m=new b;a.forEach(function(a){j[a.id]={type:"raw",layerId:a.id}}),d=m.promise,m.resolve(j)}return d.then(function(a){var b=i(a),d=[],g=new RqlArray;c.textSearch&&c.textSearch.length>0&&d.push(k(b,c.textSearch,c.visibleAttribsOnly?!1:!0,c.gridMode)),d.forEach(function(a){f.forEachEntry(a,function(a,c){b[a]=g.executeQuery(c,{},b[a])})}),"summary"===c.gridMode&&l(a,b),e.resolve(b)}),e.promise}return{getFilteredData:m}});