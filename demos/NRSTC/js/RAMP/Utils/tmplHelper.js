/*! ramp-pcar 12-11-2014 15:03:54 : v. 3.0.1 
 * 
 * RAMP GIS viewer - Canada Goose; Sample of an implementation of RAMP 
 **/
define(["dojo/_base/lang","ramp/globalStorage","ramp/ramp","utils/tmplUtil"],function(a,b,c,d){"use strict";return{dataBuilder:function(a,e){var f={data:null,config:null,str:null,lyr:null,fn:null},g=Object.create(f);return g.data=a,g.config=b.config,null!=e&&(g.lyr=c.getLayerConfig(e)),g.fn=d,g},genericDataBuilder:function(a){var c={data:null,config:null,str:null,fn:null},e=Object.create(c);return e.data=a,e.config=b.config,e.fn=d,e},stringifyTemplate:function(a){return a.replace(/`(?:\\.|[^`])*`|'(?:\\.|[^'])*'|"(?:\\.|[^"])*"|\/\*[^]*?\*\/|\/\/.*\n?/g,function(a){return"/"===a.charAt(0)?"":a}).replace(/[\n\r\t]/g,"").replace(/>\s*?</g,"><")}}});