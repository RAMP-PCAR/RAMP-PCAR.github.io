/*! ramp-theme-intranet 05-06-2015 11:57:33 : v. 5.4.0-rc3 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["dojo/topic","dojo/_base/lang","dojo/on","utils/util"],function(a,b,c,d){"use strict";function e(){var b=c;c=function(a,c,e,f){return d.isUndefined(f)?b(a,c,e):b(a,c,e.call(f))};var e=a.subscribe;a.subscribe=function(a,b){return a?e(a,b):void 0}}return{load:function(a,b,c){e(),c()}}});