/*! ramp-theme-fgp-int 06-07-2015 15:06:38 : v. 5.4.2-rc1 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["dojo/_base/lang"],function(){"use strict";return{forEachEntry:function(a,b,c,d){d&&(b=b.call(d));var e=Object.keys(a);c&&e.sort(c),e.forEach(function(c){b(c,a[c])})},find:function(a,b,c){var d=[];for(var e in a)a.hasOwnProperty(e)&&d.push(e);c&&d.sort(c);var f=-1;return d.forEach(function(c,d){-1===f&&b(c,a[c])&&(f=d)}),f},filter:function(a,b){var c={};return this.forEachEntry(a,function(a,d){b(a,d)&&(c[a]=d)}),c},length:function(a){return Object.keys(a).length},isEmpty:function(a){return 0===this.length(a)},clone:function(a){var b={};return this.forEachEntry(a,function(a,c){b[a]=c}),b},arrayToMap:function(a,b){var c={};return a.forEach(function(d){c[b(a)]=d}),c},zip:function(a,b){if(a.length!==b.length)throw"Array lengths differ";var c={};return a.forEach(function(a,d){c[a]=b[d]}),c}}});