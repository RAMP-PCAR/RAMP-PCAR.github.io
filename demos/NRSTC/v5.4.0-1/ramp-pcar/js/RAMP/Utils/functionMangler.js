/*! ramp-pcar 30-04-2015 17:36:34 : v. 5.4.0-1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
define(["dojo/topic","dojo/_base/lang","dojo/on","utils/util"],function(a,b,c,d){"use strict";function e(){var e=c;c=function(a,c,f,g){return d.isUndefined(g)?e(a,c,f):e(a,c,b.hitch(g,f))};var f=a.subscribe;a.subscribe=function(a,b){return a?f(a,b):void 0}}return{load:function(a,b,c){e(),c()}}});