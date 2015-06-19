/*! ramp-theme-usability 19-06-2015 18:15:37 : v. 5.4.1 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Usability Theme 
 **/
define(["dojo/topic","dojo/Deferred","esri/tasks/PrintTemplate","esri/tasks/PrintParameters","esri/tasks/PrintTask","ramp/eventManager","ramp/map","utils/util","utils/popupManager"],function(a,b,c,d,e,f,g,h,i){"use strict";function j(){n.empty&&(n.empty=!1,RAMP.config.layers.feature.forEach(function(a){var b=RAMP.layerRegistry[a.id];b.ramp.user&&b.visible&&!b.url&&(b.setVisibility(!1),n.layers.push(b))}))}function k(){n.empty||(n.layers.forEach(function(a){a.setVisibility(!0)}),n.empty=!0,n.layers=[])}function l(){var a,f,h,i,l,m=new b;try{a=g.getMap(),j(),f=new e(RAMP.config.exportMapUrl),f.on("complete",function(a){k(),m.resolve(a)}),f.on("error",function(a){k(),m.reject(a)}),l=$("#mainMap_root")[0],i=new c,i.exportOptions={width:l.clientWidth,height:l.clientHeight,dpi:96},i.format="PNG32",i.layout="MAP_ONLY",i.showAttribution=!1,h=new d,h.map=a,h.template=i,f.execute(h)}catch(n){m.reject(n)}return{promise:m.promise,exportOptions:i.exportOptions}}var m=function(){function a(){var a=new TimelineLite,b=l(),g=b.exportOptions,i=Math.min(u.width()-350,g.width),j=Math.ceil(g.height/g.width*i);s&&s.cancel(),s=b.promise,a.call(function(){m.find(".btn").attr({disabled:!0}).end("a.btn-download").find(".btn").attr({href:""})}).set(f,{display:"none"}).set(e,{display:"inline-block"}).set(d,{display:"none"}).call(function(){d.attr("src","")}).set(c,{clearProps:"all"}),s.then(function(b){d.on("load",function(a){t=h.convertImageToCanvas(a.target),m.find(".btn").attr({disabled:!1}),d.off("load")}),a.call(function(){o.attr({href:b.result.url})}).set(e,{display:"none"}).set(d,{display:"block"}).call(function(){d.attr("src",b.result.url)}).to(c,w,{height:j+2,width:i+2,ease:"easeOutCirc"})},function(b){a.set(e,{display:"none"}).set(f,{display:"inline-block",width:c.width()})})}var b,c,d,e,f,g,j,k,m,n,o,p,q,r,s,t,u,v="button-pressed",w=.4;return{init:function(){u=$(window),b=$("#map-export-toggle"),c=$(".map-export-stretcher"),d=$(".map-export-image > img"),e=c.find(".loading-simple"),f=c.find(".map-export-notice"),g=$(".map-export-controls .download-buttons > .btn"),m=$(".map-export-controls .download-buttons .download-dropdown"),n=$(".map-export-controls .download-buttons .dropdown-menu"),k=m.find(".toggle"),q=m.find(".btn.download-png"),p=m.find(".btn.download-jpg"),o=m.find(".btn.download-default"),j=$("#map-export-modal .button-close"),b.removeClass("disabled").attr("aria-disabled",!1).on("click",a),RAMP.flags.brokenWebBrowser||RAMP.flags.ie10client?(m.css("width","100%"),o.css("width","100%"),k.css("display","none")):m.find("a.btn").on("click",function(a){var b=$(a.target),c=b.hasClass("download-jpg")?"jpeg":"png";a.preventDefault(),t.toBlob(function(a){saveAs(a,"download."+c)},"image/"+c)}),r=i.registerPopup(k,"click",function(a){n.show(),a.resolve()},{activeClass:v,target:n,closeHandler:function(a){n.hide(),a.resolve()},timeout:500}),j.on("click",function(){m.find(".btn").attr({disabled:!0,href:""}),d.attr("src","")})}}}(),n={empty:!0,layers:[]};return{submitServiceImageRequest:l,init:m.init}});