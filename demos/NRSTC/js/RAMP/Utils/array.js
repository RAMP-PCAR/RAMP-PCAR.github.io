/*! ramp-pcar 12-11-2014 15:03:54 : v. 3.0.1 
 * 
 * RAMP GIS viewer - Canada Goose; Sample of an implementation of RAMP 
 **/
define(["dojo/_base/array","dojo/_base/lang"],function(a,b){"use strict";return{unique:function(a){return a.reverse().filter(function(a,b,c){return-1===c.indexOf(a,b+1)}).reverse()},find:function(a,b,c){var d=this.indexOf(a,b,c);return-1===d?null:a[d]},indexOf:function(a,c,d){"undefined"!=typeof d&&(c=b.hitch(d,c));var e;for(e=0;e<a.length;e++)if(c(a[e]))return e;return-1},binaryIndexOf:function(a,b){for(var c,d,e=0,f=a.length-1;f>=e;)if(c=(e+f)/2|0,d=a[c],b(d)<0)e=c+1;else{if(!(b(d)>0))return c;f=c-1}return-1},binaryFind:function(a,b){var c=this.binaryIndexOf(a,b);return a[c]}}});