/*! ramp-pcar 05-05-2015 19:34:55 : v. 5.3.1-rc1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
define(["dojo/_base/array","dojo/_base/lang"],function(a,b){"use strict";return{forEachEntry:function(c,d,e,f){f&&(d=b.hitch(f,d));var g=[];for(var h in c)c.hasOwnProperty(h)&&g.push(h);e&&g.sort(e),a.forEach(g,function(a){d(a,c[a])})},find:function(b,c,d){var e=[];for(var f in b)b.hasOwnProperty(f)&&e.push(f);d&&e.sort(d);var g=-1;return a.some(e,function(a,d){return c(a,b[a])?(g=d,!0):void 0}),g},filter:function(a,b){var c={};return this.forEachEntry(a,function(a,d){b(a,d)&&(c[a]=d)}),c},length:function(a){return Object.keys(a).length},isEmpty:function(a){return 0===this.length(a)},clone:function(a){var b={};return this.forEachEntry(a,function(a,c){b[a]=c}),b},arrayToMap:function(b,c){var d={};return a.forEach(b,function(a){d[c(b)]=a}),d},zip:function(b,c){if(b.length!==c.length)throw"Array lengths differ";var d={};return a.forEach(b,function(a,b){d[a]=c[b]}),d}}});