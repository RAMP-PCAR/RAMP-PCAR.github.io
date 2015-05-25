/*! ramp-pcar 25-05-2015 18:42:19 : v. 5.4.0-8 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
define(["dojo/topic","dojo/Deferred","esri/tasks/PrintTemplate","esri/tasks/PrintParameters","esri/tasks/PrintTask","ramp/eventManager","ramp/map","utils/util","utils/popupManager"],function(a,b,c,d,e,f,g,h,i){"use strict";function j(){n.empty&&(n.empty=!1,RAMP.config.layers.feature.forEach(function(a){var b=RAMP.layerRegistry[a.id];b.ramp.user&&b.visible&&!b.url&&(b.setVisibility(!1),n.layers.push(b))}))}function k(){n.empty||(n.layers.forEach(function(a){a.setVisibility(!0)}),n.empty=!0,n.layers=[])}function l(){var a,f,h,i,l,m=new b;try{a=g.getMap(),j(),f=new e(RAMP.config.exportMapUrl),f.on("complete",function(a){k(),m.resolve(a)}),f.on("error",function(a){k(),m.reject(a)}),l=$("#mainMap_root")[0],i=new c,i.exportOptions={width:l.clientWidth,height:l.clientHeight,dpi:96},i.format="PNG32",i.layout="MAP_ONLY",i.showAttribution=!1,h=new d,h.map=a,h.template=i,f.execute(h)}catch(n){m.reject(n)}return{promise:m.promise,exportOptions:i.exportOptions}}var m=function(){function a(){var a=new TimelineLite,b=l(),g=b.exportOptions,i=Math.min(s.width()-350,g.width),j=Math.ceil(g.height/g.width*i);r&&r.cancel(),r=b.promise,a.call(function(){k.find(".btn").attr({disabled:!0}).end("a.btn-download").find(".btn").attr({href:""})}).set(f,{display:"none"}).set(e,{display:"inline-block"}).set(d,{display:"none"}).call(function(){d.attr("src","")}).set(c,{clearProps:"all"}),r.then(function(b){d.on("load",function(a){var b=h.convertImageToCanvas(a.target),c="",e="";e=h.convertCanvasToDataURL(b,"image/jpeg"),c=h.convertCanvasToDataURL(b,"image/png"),k.find(".btn").attr({disabled:!1}),o.attr({disabled:!1,href:e}),p.attr({disabled:!1,href:c}),n.attr({disabled:!1,href:c}),d.off("load")}),a.set(e,{display:"none"}).set(d,{display:"block"}).call(function(){d.attr("src",b.result.url)}).to(c,u,{height:j+2,width:i+2,ease:"easeOutCirc"})},function(b){a.set(e,{display:"none"}).set(f,{display:"inline-block",width:c.width()})})}var b,c,d,e,f,g,j,k,m,n,o,p,q,r,s,t="button-pressed",u=.4;return{init:function(){s=$(window),b=$("#map-export-toggle"),c=$(".map-export-stretcher"),d=$(".map-export-image > img"),e=c.find(".loading-simple"),f=c.find(".map-export-notice"),k=$(".map-export-controls .download-buttons .download-dropdown"),m=$(".map-export-controls .download-buttons .dropdown-menu"),j=k.find(".toggle"),p=k.find(".btn.download-png"),o=k.find(".btn.download-jpg"),n=k.find(".btn.download-default"),g=$("#map-export-modal .button-close"),b.removeClass("disabled").attr("aria-disabled",!1).on("click",a),q=i.registerPopup(j,"click",function(a){m.show(),a.resolve()},{activeClass:t,target:m,closeHandler:function(a){m.hide(),a.resolve()},timeout:500}),g.on("click",function(){k.find(".btn").attr({disabled:!0,href:""}),d.attr("src","")})}}}(),n={empty:!0,layers:[]};return{submitServiceImageRequest:l,init:m.init}});