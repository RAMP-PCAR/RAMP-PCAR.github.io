/*! ramp-theme-canada 19-06-2015 18:15:02 : v. 5.4.1 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["dojo/dom","dojo/_base/array","dojo/_base/Color","dojo/_base/lang","esri/config","esri/graphic","esri/tasks/GeometryService","esri/tasks/BufferParameters","esri/toolbars/draw","esri/symbols/SimpleLineSymbol","esri/symbols/SimpleFillSymbol","ramp/map","ramp/globalStorage","tools/baseTool"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){"use strict";function o(a){var b=a.geometry,d=v.map,e=new g(RAMP.config.geometryServiceUrl),i=new k(k.STYLE_NONE,new j(j.STYLE_DASHDOT,new c([255,0,0,1]),new c([0,255,0,.25]))),l=new f(b,i);w.working(!0),d.graphics.add(l);var m=new h,n=w.outputFloat.find(".distance-input").val().replace(/[^0-9\.]+/g,""),o=n.indexOf(".");n=n.substring(0,o+1).concat(n.substring(o+1).replace(/[.]+/g,"")),$("#buffer-input").val(n),""===n?w.working(!1):(m.distances=[n],m.bufferSpatialReference=v.map.spatialReference,m.outSpatialReference=v.map.spatialReference,m.unit=9036,e.simplify([b],function(a){m.geometries=a,e.buffer(m,p)}))}function p(a){var d=new k(k.STYLE_SOLID,new j(j.STYLE_SOLID,new c([255,0,0,.65]),2),new c([255,0,0,.35]));b.forEach(a,function(a){var b=new f(a,d);v.map.graphics.add(b)}),v.map.showZoomSlider(),w.working(!1)}function q(){v.toolbar.activate(i.FREEHAND_POLYGON),t()}function r(){v.toolbar.deactivate(),s()}function s(){v.map.graphics.clear()}function t(){w.displayTemplateOutput({distanceLabel:i18n.t(w.ns+":distance")})}var u,v,w;return u={init:function(){var a=l.getMap(),b=new i(a);b.on("draw-end",o),v={map:a,toolbar:b}}},d.mixin({},n,{init:function(a,b){return w=this,this.initToggle(a,b,{activate:q,deactivate:r,defaultAction:s}),u.init(),b.then(function(){w.outputFloat.on("keydown","#buffer-input",function(a){return 17===a.keyCode||18===a.keyCode||a.keyCode>47&&a.keyCode<58&&a.shiftKey===!1||110===a.keyCode||a.keyCode>95&&a.keyCode<106||8===a.keyCode||9===a.keyCode||190===a.keyCode&&a.shiftKey===!1||a.keyCode>34&&a.keyCode<40||46===a.keyCode})}),this},name:"bufferTool"})});