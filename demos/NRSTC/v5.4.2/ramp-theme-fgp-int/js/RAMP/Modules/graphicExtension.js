/*! ramp-theme-fgp-int 10-07-2015 15:06:09 : v. 5.4.2 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["utils/array","utils/dictionary","utils/util","utils/tmplHelper","dojo/text!./templates/feature_details_template.json"],function(a,b,c,d,e){"use strict";return{getGraphicOid:function(a){var b=a.getLayer().objectIdField;return a.attributes[b]},getFDataOid:function(a){return a.attributes[a.parent.idField]},getFDataForGraphic:function(a){var b,c,d=RAMP.data[a.getLayer().id];return d&&(b=d.index[this.getGraphicOid(a).toString()],void 0!==typeof b&&(c=d.features[b])),c},getConfigForFData:function(b){return a.find(RAMP.config.layers.wms.concat(RAMP.config.layers.feature),function(a){return a.id===b.parent.layerId})},getGraphicTextContent:function(a){var b=a.getLayer().ramp.config.templates.detail;tmpl.cache={},tmpl.templates=JSON.parse(d.stringifyTemplate(e));var c=this.getFDataForGraphic(a);if(c){var f=d.dataBuilder(c,a.getLayer().ramp.config);return tmpl(b,f)}return""},getFDataTextContent:function(a){var b=this.getConfigForFData(a),c=b.templates.detail;tmpl.cache={},tmpl.templates=JSON.parse(d.stringifyTemplate(e));var f=d.dataBuilder(a,b);return tmpl(c,f)},getGraphicTitle:function(a){var b=this.getFDataForGraphic(a);return b?b.attributes[a.getLayer().ramp.config.nameField]:""},getFDataTitle:function(a){return a.attributes[this.getConfigForFData(a).nameField]},findGraphic:function(b,c){var d=RAMP.layerRegistry[c];return a.find(d.graphics,function(a){return this.getGraphicOid(a)===b},this)}}});