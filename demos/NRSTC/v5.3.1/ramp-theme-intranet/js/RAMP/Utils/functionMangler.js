/*! ramp-theme-intranet 08-05-2015 15:36:17 : v. 5.3.1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["dojo/topic","dojo/_base/lang","dojo/on","utils/util"],function(a,b,c,d){"use strict";function e(){var e=c;c=function(a,c,f,g){return d.isUndefined(g)?e(a,c,f):e(a,c,b.hitch(g,f))};var f=a.subscribe;a.subscribe=function(a,b){return a?f(a,b):void 0}}return{load:function(a,b,c){e(),c()}}});