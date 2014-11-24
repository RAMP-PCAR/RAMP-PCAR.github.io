/*! ramp-pcar 24-11-2014 09:52:24 : v. 4.0.0 
 * 
 * RAMP GIS viewer - Dragonfly; Sample of an implementation of RAMP 
 **/
define(["dojo/_base/lang","ramp/globalStorage","ramp/ramp","utils/tmplUtil"],function(a,b,c,d){"use strict";return{dataBuilder:function(a,b){var e={data:null,config:null,str:null,lyr:null,fn:null},f=Object.create(e);return f.data=a,f.config=RAMP.config,null!=b&&(f.lyr=c.getLayerConfig(b)),f.fn=d,f},genericDataBuilder:function(a){var b={data:null,config:null,str:null,fn:null},c=Object.create(b);return c.data=a,c.config=RAMP.config,c.fn=d,c},stringifyTemplate:function(a){return a.replace(/`(?:\\.|[^`])*`|'(?:\\.|[^'])*'|"(?:\\.|[^"])*"|\/\*[^]*?\*\/|\/\/.*\n?/g,function(a){return"/"===a.charAt(0)?"":a}).replace(/[\n\r\t]/g,"").replace(/>\s*?</g,"><")}}});