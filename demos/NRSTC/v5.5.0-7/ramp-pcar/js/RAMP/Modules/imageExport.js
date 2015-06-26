/*! ramp-pcar 26-06-2015 14:04:08 : v. 5.5.0-7 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP 
 **/
define(["dojo/topic","dojo/Deferred","esri/tasks/PrintTemplate","esri/tasks/PrintParameters","esri/tasks/PrintTask","ramp/eventManager","ramp/map","utils/util","utils/popupManager"],function(a,b,c,d,e,f,g,h,i){"use strict";function j(){if(n.empty){n.empty=!1;var a=RAMP.flags.brokenWebBrowser||RAMP.flags.ie10client;RAMP.config.layers.feature.forEach(function(b){var c=RAMP.layerRegistry[b.id];c.visible&&(a&&c.ramp.user&&!c.url||!a)&&(c.setVisibility(!1),n.layers.push(c))}),Object.keys(g.getBoundingBoxMapping()).forEach(function(b){var c=g.getBoundingBoxMapping()[b],d=RAMP.layerRegistry[b];c.visible&&(a&&c.ramp.user&&!d.url||!a)&&(c.setVisibility(!1),n.layers.push(c))})}}function k(){n.empty||(n.layers.forEach(function(a){a.setVisibility(!0)}),n.empty=!0,n.layers=[])}function l(){var a,f,h,i,l,m=new b;try{a=g.getMap(),j(),f=new e(RAMP.config.exportMapUrl),f.on("complete",function(a){m.resolve({event:a,exportOptions:i.exportOptions})}),f.on("error",function(a){m.reject(a)}),l=$("#mainMap_root")[0],i=new c,i.exportOptions={width:l.clientWidth,height:l.clientHeight,dpi:96},i.format="PNG32",i.layout="MAP_ONLY",i.showAttribution=!1,h=new d,h.map=a,h.template=i,f.execute(h)}catch(n){m.reject(n)}return k(),m.promise}var m=function(){function a(){var a=new b;if(RAMP.flags.brokenWebBrowser||RAMP.flags.ie10client)a.resolve();else{var c,d=new XMLSerializer;c=d.serializeToString($("#mainMap_gc")[0]),canvg(f[0],c,{renderCallback:function(){f.css({display:"block"}),z=f[0],a.resolve()}})}return a.promise}function c(){var b,c,d,i=new TimelineLite;i.call(function(){s.find(".btn").attr({disabled:!0}).end("a.btn-download").find(".btn").attr({href:""})}).set(m,{display:"none"}).set(j,{display:"block"}).set(g,{display:"none"}).set(f,{display:"none"}).call(function(){g.attr("src",""),f.attr("src","")}).set(e,{clearProps:"all"}),k.css({width:e.width()-2}),a().then(function(){return l()}).then(function(a){var l=a.event;b=a.exportOptions,c=Math.min(A.width()-350,b.width),d=Math.ceil(b.height/b.width*c),g.on("load",function(a){if(RAMP.flags.brokenWebBrowser||RAMP.flags.ie10client)g.attr({"class":"remote"}),j.css({display:"none"}),s.find(".btn").attr({disabled:!1});else{y=h.convertImageToCanvas(a.target);var b=y.getContext("2d");b.drawImage(z,0,0),y=b.canvas,g.attr({"class":"remote"}),f.attr({"class":"local"}),j.css({display:"none"}),s.find(".btn").attr({disabled:!1})}g.off("load")}),i.call(function(){u.attr({href:l.result.url})}).set(g,{display:"block"}).call(function(){g.attr("src",l.result.url)}).to(e,C,{height:d+2,width:c+2,ease:"easeOutCirc"},0).to(k,C,{width:c},0)},function(a){j.css({display:"none"}),m.css({display:"block"})})}var d,e,f,g,j,k,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B="button-pressed",C=.4;return{init:function(){A=$(window),d=$("#map-export-toggle"),e=$(".map-export-stretcher"),f=$(".map-export-image > canvas.local"),g=$(".map-export-image > img.remote"),j=$(".map-export-preview .loading-simple"),k=e.find(".map-export-notice-container"),m=e.find(".map-export-notice.notice-error"),n=e.find(".map-export-notice.notice-ie"),o=e.find(".map-export-notice.notice-timeout"),p=$(".map-export-controls .download-buttons > .btn"),s=$(".map-export-controls .download-buttons .download-dropdown"),t=$(".map-export-controls .download-buttons .dropdown-menu"),r=s.find(".toggle"),w=s.find(".btn.download-png"),v=s.find(".btn.download-jpg"),u=s.find(".btn.download-default"),q=$("#map-export-modal .button-close"),d.removeClass("disabled").attr("aria-disabled",!1).on("click",c),RAMP.flags.brokenWebBrowser||RAMP.flags.ie10client?(s.css("width","100%"),u.css("width","100%"),r.css("display","none"),n.css({display:"block"})):s.find("a.btn").on("click",function(a){var b=$(a.target),c=b.hasClass("download-jpg")?"jpeg":"png";a.preventDefault(),y.toBlob(function(a){saveAs(a,"download."+c)},"image/"+c)}),x=i.registerPopup(r,"click",function(a){t.show(),a.resolve()},{activeClass:B,target:t,closeHandler:function(a){t.hide(),a.resolve()},timeout:500}),q.on("click",function(){s.find(".btn").attr({disabled:!0,href:""}),g.attr({src:"","class":"blurred-5 remote"}),f.attr({src:"","class":"blurred-5 local"})})}}}(),n={empty:!0,layers:[]};return{submitServiceImageRequest:l,init:m.init}});