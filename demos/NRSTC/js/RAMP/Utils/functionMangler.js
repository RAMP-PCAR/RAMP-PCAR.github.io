/*! ramp-gis-viewer 09-09-2014 13:44:31 : v. 2.0.0 
 * 
 * RAMP GIS viewer - Bobcat; Sample of an implementation of RAMP 
 **/
define(["dojo/topic","dojo/_base/lang","dojo/on","utils/util"],function(a,b,c,d){"use strict";function e(){var e=c;c=function(a,c,f,g){return d.isUndefined(g)?e(a,c,f):e(a,c,b.hitch(g,f))};var f=a.subscribe;a.subscribe=function(a,b){return d.isUndefined(a)?void 0:f(a,b)}}return{load:function(a,b,c){e(),c()}}});