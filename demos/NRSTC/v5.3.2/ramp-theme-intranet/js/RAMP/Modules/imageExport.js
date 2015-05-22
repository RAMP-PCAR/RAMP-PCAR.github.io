/*! ramp-theme-intranet 21-05-2015 18:16:21 : v. 5.3.2 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["dojo/topic","dojo/_base/array","dojo/Deferred","esri/tasks/PrintTemplate","esri/tasks/PrintParameters","esri/tasks/PrintTask","ramp/eventManager","ramp/map"],function(a,b,c,d,e,f,g,h){"use strict";function i(){m.empty&&(m.empty=!1,b.forEach(RAMP.config.layers.feature,function(a){var b=RAMP.layerRegistry[a.id];b.ramp.user&&b.visible&&!b.url&&(b.setVisibility(!1),m.layers.push(b))}))}function j(){m.empty||(b.forEach(m.layers,function(a){a.setVisibility(!0)}),m.empty=!0,m.layers=[])}function k(){var a,b,g,k,l,m=new c;try{a=h.getMap(),i(),b=new f(RAMP.config.exportMapUrl),b.on("complete",function(a){j(),m.resolve(a)}),b.on("error",function(a){j(),m.reject(a)}),l=$("#mainMap_root")[0],k=new d,k.exportOptions={width:l.clientWidth,height:l.clientHeight,dpi:96},k.format="JPG",k.layout="MAP_ONLY",k.showAttribution=!1,g=new e,g.map=a,g.template=k,b.execute(g)}catch(n){m.reject(n)}return{promise:m.promise,exportOptions:k.exportOptions}}var l=function(){function a(){var a=new TimelineLite,b=k(),l=b.exportOptions,m=Math.min(i.width()-350,l.width),n=Math.ceil(l.height/l.width*m);h&&h.cancel(),h=b.promise,a.call(function(){g.attr({disabled:!0,href:""})}).set(f,{display:"none"}).set(e,{display:"inline-block"}).set(d,{display:"none"}).call(function(){d.attr("src","")}).set(c,{clearProps:"all"}),h.then(function(b){a.call(function(){g.attr({disabled:!1,href:b.result.url})}).set(e,{display:"none"}).set(d,{display:"block"}).call(function(){d.attr("src",b.result.url)}).to(c,j,{height:n+2,width:m+2,ease:"easeOutCirc"})},function(b){a.set(e,{display:"none"}).set(f,{display:"inline-block",width:c.width()})})}var b,c,d,e,f,g,h,i,j=.4;return{init:function(){i=$(window),b=$("#map-export-toggle"),c=$(".map-export-stretcher"),d=$(".map-export-image > img"),e=c.find(".loading-simple"),f=c.find(".map-export-notice"),g=$(".map-export-controls .download-buttons > .btn"),b.removeClass("disabled").attr("aria-disabled",!1).on("click",a)}}}(),m={empty:!0,layers:[]};return{submitServiceImageRequest:k,init:l.init}});