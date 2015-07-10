/*! ramp-theme-intranet 10-07-2015 15:01:17 : v. 5.4.2 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["dojo/dom","dojo/string","dojo/_base/lang","esri/config","esri/graphic","esri/tasks/GeometryService","esri/tasks/LengthsParameters","esri/toolbars/draw","esri/symbols/SimpleFillSymbol","ramp/map","ramp/globalStorage","tools/baseTool"],function(a,b,c,d,e,f,g,h,i,j,k,l){"use strict";function m(a){v.working(!0),t=new f(RAMP.config.geometryServiceUrl),t.on("lengths-complete",n);var b=a.geometry;u.map.graphics.clear(),u.map.graphics.add(new e(b,new i));var c=new g;c.lengthUnit=f.UNIT_KILOMETER,c.calculationType="geodesic",t.simplify([b],function(a){c.polylines=a,t.lengths(c)})}function n(a){var c=a.result,d=c.lengths[0].toFixed(3);v.working(!1),d=b.substitute("${number:dojo.number.format}",{number:d}),r(d,"km")}function o(){u.toolbar.activate(h.LINE),r(i18n.t(v.ns+":na"))}function p(){u.toolbar.deactivate(),q()}function q(){u.map.graphics.clear(),r(i18n.t(v.ns+":na"))}function r(a,b){v.displayTemplateOutput({lengthLabel:i18n.t(v.ns+":length"),lengthOutput:a,lengthUnits:b})}var s,t,u,v;return s={init:function(){var a=j.getMap(),b=new h(a);b.on("draw-end",m),u={map:a,toolbar:b}}},c.mixin({},l,{init:function(a,b){return v=this,this.initToggle(a,b,{activate:o,deactivate:p,defaultAction:q}),s.init(),this},name:"distanceTool"})});