/*! ramp-pcar 11-05-2015 14:05:58 : v. 5.4.0-7 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
define(["dojo/topic","dojo/Deferred","esri/tasks/PrintTemplate","esri/tasks/PrintParameters","esri/tasks/PrintTask","ramp/eventManager","ramp/map"],function(a,b,c,d,e,f,g){"use strict";function h(){l.empty&&(l.empty=!1,RAMP.config.layers.feature.forEach(function(a){var b=RAMP.layerRegistry[a.id];b.ramp.user&&b.visible&&!b.url&&(b.setVisibility(!1),l.layers.push(b))}))}function i(){l.empty||(l.layers.forEach(function(a){a.setVisibility(!0)}),l.empty=!0,l.layers=[])}function j(){var a,f,j,k,l,m=new b;try{a=g.getMap(),h(),f=new e(RAMP.config.exportMapUrl),f.on("complete",function(a){i(),m.resolve(a)}),f.on("error",function(a){i(),m.reject(a)}),l=$("#mainMap_root")[0],k=new c,k.exportOptions={width:l.clientWidth,height:l.clientHeight,dpi:96},k.format="JPG",k.layout="MAP_ONLY",k.showAttribution=!1,j=new d,j.map=a,j.template=k,f.execute(j)}catch(n){m.reject(n)}return{promise:m.promise,exportOptions:k.exportOptions}}var k=function(){function a(){var a=new TimelineLite,b=j(),l=b.exportOptions,m=Math.min(i.width()-350,l.width),n=Math.ceil(l.height/l.width*m);h&&h.cancel(),h=b.promise,a.call(function(){g.attr({disabled:!0,href:""})}).set(f,{display:"none"}).set(e,{display:"inline-block"}).set(d,{display:"none"}).call(function(){d.attr("src","")}).set(c,{clearProps:"all"}),h.then(function(b){a.call(function(){g.attr({disabled:!1,href:b.result.url})}).set(e,{display:"none"}).set(d,{display:"block"}).call(function(){d.attr("src",b.result.url)}).to(c,k,{height:n+2,width:m+2,ease:"easeOutCirc"})},function(b){a.set(e,{display:"none"}).set(f,{display:"inline-block",width:c.width()})})}var b,c,d,e,f,g,h,i,k=.4;return{init:function(){i=$(window),b=$("#map-export-toggle"),c=$(".map-export-stretcher"),d=$(".map-export-image > img"),e=c.find(".sk-spinner"),f=c.find(".map-export-notice"),g=$(".map-export-controls .download-buttons > .btn"),b.removeClass("disabled").attr("aria-disabled",!1).on("click",a)}}}(),l={empty:!0,layers:[]};return{submitServiceImageRequest:j,init:k.init}});