/*! ramp-gis-viewer 03-07-2014 : v. 1.0.42-7 

 * RAMP GIS viewer - ArcticFox; Sample of an implementation of RAMP 
 **/
define(["dojo/_base/array","dojo/_base/lang","utils/util"],function(a,b,c){"use strict";return{forEachEntry:function(d,e,f,g){c.isUndefined(g)||(e=b.hitch(g,e));var h=[];for(var i in d)d.hasOwnProperty(i)&&h.push(i);f&&h.sort(f),a.forEach(h,function(a){e(a,d[a])})},find:function(b,c,d){var e=[];for(var f in b)b.hasOwnProperty(f)&&e.push(f);d&&e.sort(d);var g=-1;return a.some(e,function(a,d){return c(a,b[a])?(g=d,!0):void 0}),g},length:function(a){return Object.keys(a).length},isEmpty:function(a){return 0===this.length(a)},clone:function(a){var b={};return this.forEachEntry(a,function(a,c){b[a]=c}),b}}});