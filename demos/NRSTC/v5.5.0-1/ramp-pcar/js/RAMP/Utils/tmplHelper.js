/*! ramp-pcar 05-06-2015 14:10:55 : v. 5.5.0-1 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP 
 **/
define(["dojo/_base/lang","utils/tmplUtil"],function(a,b){"use strict";return{dataBuilder:function(a,c){var d={data:null,config:null,str:null,lyr:null,fn:null},e=Object.create(d);return e.data=a,e.config=RAMP.config,null!=c&&(e.lyr=c),e.fn=b,e},genericDataBuilder:function(a){var c={data:null,config:null,str:null,fn:null},d=Object.create(c);return d.data=a,d.config=RAMP.config,d.fn=b,d},stringifyTemplate:function(a){return a.replace(/`(?:\\.|[^`])*`|'(?:\\.|[^'])*'|"(?:\\.|[^"])*"|\/\*[^]*?\*\/|\/\/.*\n?/g,function(a){return"/"===a.charAt(0)?"":a}).replace(/[\n\r\t]/g,"").replace(/>\s*?</g,"><").replace(/%}\s*?</g,"%}<").replace(/>\s*?{%/g,">{%").replace(/"\s*?</g,'"<').replace(/>\s*?"/g,'>"')},template:function(c,d,e){var f=a.clone(d)||{};return tmpl.cache={},tmpl.templates=e,f.fn=b,tmpl(c,f)}}});