/*! ramp-theme-canada 31-03-2015 20:10:17 : v. 5.2.0 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["ramp/ramp","utils/array","utils/dictionary","utils/util","utils/tmplHelper","dojo/text!./templates/feature_details_template.json"],function(a,b,c,d,e,f){"use strict";return{getOid:function(a){var b=a.getLayer().objectIdField;return a.attributes[b]},getTextContent:function(a){function b(a){tmpl.cache={},tmpl.templates=JSON.parse(e.stringifyTemplate(f));var b=e.dataBuilder(a,a.getLayer().ramp.config),d=tmpl(c,b);return d}var c=a.getLayer().ramp.config.templates.detail;return b(a)},getGraphicTitle:function(a){return a.attributes[a.getLayer().ramp.config.nameField]}}});