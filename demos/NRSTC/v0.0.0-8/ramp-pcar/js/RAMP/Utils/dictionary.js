/*! ramp-pcar 20-03-2015 16:06:06 : v. 5.2.0-1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
define(["dojo/_base/array","dojo/_base/lang","utils/util"],function(a,b,c){"use strict";return{forEachEntry:function(d,e,f,g){c.isUndefined(g)||(e=b.hitch(g,e));var h=[];for(var i in d)d.hasOwnProperty(i)&&h.push(i);f&&h.sort(f),a.forEach(h,function(a){e(a,d[a])})},find:function(b,c,d){var e=[];for(var f in b)b.hasOwnProperty(f)&&e.push(f);d&&e.sort(d);var g=-1;return a.some(e,function(a,d){return c(a,b[a])?(g=d,!0):void 0}),g},filter:function(a,b){var c={};return this.forEachEntry(a,function(a,d){b(a,d)&&(c[a]=d)}),c},length:function(a){return Object.keys(a).length},isEmpty:function(a){return 0===this.length(a)},clone:function(a){var b={};return this.forEachEntry(a,function(a,c){b[a]=c}),b},arrayToMap:function(b,c){var d={};return a.forEach(b,function(a){d[c(b)]=a}),d},zip:function(b,c){if(b.length!==c.length)throw"Array lengths differ";var d={};return a.forEach(b,function(a,b){d[a]=c[b]}),d}}});