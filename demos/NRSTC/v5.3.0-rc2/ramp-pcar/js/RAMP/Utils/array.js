/*! ramp-pcar 28-04-2015 15:18:32 : v. 5.3.0-rc2 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
define(["dojo/_base/array","dojo/_base/lang","utils/util"],function(a,b,c){"use strict";return{unique:function(a){return a.reverse().filter(function(a,b,c){return-1===c.indexOf(a,b+1)}).reverse()},find:function(a,b,c){var d=this.indexOf(a,b,c);return-1===d?null:a[d]},indexOf:function(a,c,d){"undefined"!=typeof d&&(c=b.hitch(d,c));var e;for(e=0;e<a.length;e++)if(c(a[e],e))return e;return-1},binaryIndexOf:function(a,b){for(var c,d,e=0,f=a.length-1;f>=e;)if(c=(e+f)/2|0,d=a[c],b(d)<0)e=c+1;else{if(!(b(d)>0))return c;f=c-1}return-1},binaryFind:function(a,b){var c=this.binaryIndexOf(a,b);return a[c]},remove:function(a,b,d){var e;e=c.isNumber(b)?b:d?this.indexOf(a,d):a.indexOf(b),-1!==e&&a.splice(e,1)}}});