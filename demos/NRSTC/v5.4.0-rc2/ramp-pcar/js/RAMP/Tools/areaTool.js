/*! ramp-pcar 04-06-2015 15:44:00 : v. 5.4.0-rc2 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
define(["dojo/dom","dojo/string","dojo/_base/lang","esri/config","esri/graphic","esri/tasks/GeometryService","esri/tasks/AreasAndLengthsParameters","esri/toolbars/draw","esri/symbols/SimpleFillSymbol","ramp/map","ramp/globalStorage","tools/baseTool"],function(a,b,c,d,e,f,g,h,i,j,k,l){"use strict";function m(a){v.working(!0),t=new f(RAMP.config.geometryServiceUrl),t.on("areas-and-lengths-complete",n);var b=a.geometry;u.map.graphics.clear(),u.map.graphics.add(new e(b,new i));var c=new g;c.lengthUnit=f.UNIT_KILOMETER,c.areaUnit=f.UNIT_SQUARE_KILOMETERS,c.calculationType="geodesic",t.simplify([b],function(a){c.polygons=a,t.areasAndLengths(c)})}function n(a){var c=a.result,d=c.areas[0].toFixed(3),e=c.lengths[0].toFixed(3);v.working(!1),e=b.substitute("${number:dojo.number.format}",{number:e}),d=b.substitute("${number:dojo.number.format}",{number:d}),r(e,d,"km","km")}function o(){u.toolbar.activate(h.FREEHAND_POLYGON),r(i18n.t(v.ns+":na"),i18n.t(v.ns+":na"))}function p(){u.toolbar.deactivate(),q()}function q(){u.map.graphics.clear(),r(i18n.t(v.ns+":na"),i18n.t(v.ns+":na"))}function r(a,b,c,d){v.displayTemplateOutput({lengthLabel:i18n.t(v.ns+":length"),areaLabel:i18n.t(v.ns+":area"),lengthOutput:a,areaOutput:b,lengthUnits:c,areaUnits:d})}var s,t,u,v;return s={init:function(){var a=j.getMap(),b=new h(a);b.on("draw-end",m),u={map:a,toolbar:b}}},c.mixin({},l,{init:function(a,b){return v=this,this.initToggle(a,b,{activate:o,deactivate:p,defaultAction:q}),s.init(),this},name:"areaTool"})});