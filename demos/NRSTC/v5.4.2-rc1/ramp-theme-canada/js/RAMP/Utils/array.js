/*! ramp-theme-canada 06-07-2015 15:29:01 : v. 5.4.2-rc1 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["dojo/_base/lang","utils/util"],function(a,b){"use strict";return{unique:function(a){return a.reverse().filter(function(a,b,c){return-1===c.indexOf(a,b+1)}).reverse()},find:function(a,b,c){var d=this.indexOf(a,b,c);return-1===d?null:a[d]},indexOf:function(a,b,c){var d;for(d=0;d<a.length;d++)if(b.call(c,a[d],d))return d;return-1},binaryIndexOf:function(a,b){for(var c,d,e=0,f=a.length-1;f>=e;)if(c=(e+f)/2|0,d=a[c],b(d)<0)e=c+1;else{if(!(b(d)>0))return c;f=c-1}return-1},binaryFind:function(a,b){var c=this.binaryIndexOf(a,b);return a[c]},remove:function(a,c,d){var e;e=b.isNumber(c)?c:d?this.indexOf(a,d):a.indexOf(c),-1!==e&&a.splice(e,1)}}});