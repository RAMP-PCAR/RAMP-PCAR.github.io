/*! ramp-theme-fgp-int 19-06-2015 14:27:14 : v. 5.5.0-5 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["dojo/dom","dojo/string","dojo/_base/lang","esri/config","esri/graphic","esri/tasks/Geoprocessor","esri/tasks/FeatureSet","esri/toolbars/draw","esri/symbols/SimpleLineSymbol","esri/symbols/SimpleFillSymbol","ramp/map","ramp/globalStorage","tools/baseTool"],function(a,b,c,d,e,f,g,h,i,j,k,l,m){"use strict";function n(a){var b,c,d,f,h=a.geometry;w.working(!0),v.map.graphics.clear(),b=v.map.graphics.add(new e(h,new j)),v.map.graphics.add(b),c=[],c.push(b),d=new g,d.features=c,f={inputPoly:d},u.execute(f)}function o(a){var c=a.results,d=Math.floor(c[0].value.features[0].attributes.SUM);w.working(!1),d=b.substitute("${number:dojo.number.format}",{number:d}),s(d)}function p(){v.toolbar.activate(h.FREEHAND_POLYGON),s(i18n.t(w.ns+":na"))}function q(){v.toolbar.deactivate(),r()}function r(){v.map.graphics.clear(),s(i18n.t(w.ns+":na"))}function s(a){w.displayTemplateOutput({totalPopulationLabel:i18n.t(w.ns+":population"),populationOutput:a})}var t,u,v,w;return t={init:function(){var a=k.getMap(),b=new h(a);u=new f("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/GPServer/PopulationSummary"),u.setOutputSpatialReference(a.spatialReference),u.on("execute-complete",o),b.on("draw-end",n),v={map:a,toolbar:b}}},c.mixin({},m,{init:function(a,b){return w=this,this.initToggle(a,b,{activate:p,deactivate:q,defaultAction:r}),t.init(),this},name:"populationTool"})});