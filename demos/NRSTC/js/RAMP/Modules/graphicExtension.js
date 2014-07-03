/*! ramp-gis-viewer 03-07-2014 : v. 1.0.42-7 

 * RAMP GIS viewer - ArcticFox; Sample of an implementation of RAMP 
 **/
define(["ramp/ramp","utils/array","utils/dictionary","utils/util","utils/tmplHelper","dojo/text!./templates/feature_details_template.json"],function(a,b,c,d,e,f){"use strict";return{getLayerConfig:function(b){return a.getLayerConfig(b.getLayer().url)},getOid:function(a){var b=a.getLayer().objectIdField;return a.attributes[b]},getTextContent:function(b){function c(a){tmpl.cache={},tmpl.templates=JSON.parse(e.stringifyTemplate(f));var b=e.dataBuilder(a,a.getLayer().url),c=tmpl(d,b);return c}var d=a.getLayerConfig(b.getLayer().url).detailTemplate;return c(b)},getGraphicTitle:function(a){return a.attributes[this.getLayerConfig(a).nameField]}}});