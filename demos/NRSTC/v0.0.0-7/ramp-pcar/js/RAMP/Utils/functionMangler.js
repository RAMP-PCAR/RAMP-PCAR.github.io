/*! ramp-pcar 20-03-2015 15:55:07 : v. 5.2.0-1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
define(["dojo/topic","dojo/_base/lang","dojo/on","utils/util"],function(a,b,c,d){"use strict";function e(){var e=c;c=function(a,c,f,g){return d.isUndefined(g)?e(a,c,f):e(a,c,b.hitch(g,f))};var f=a.subscribe;a.subscribe=function(a,b){return d.isUndefined(a)?void 0:f(a,b)}}return{load:function(a,b,c){e(),c()}}});