/*! ramp-theme-usability 10-06-2015 17:14:46 : v. 5.4.0-ckan 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Usability Theme 
 **/
define(["dojo/topic","dojo/_base/lang","dojo/on","utils/util"],function(a,b,c,d){"use strict";function e(){var b=c;c=function(a,c,e,f){return d.isUndefined(f)?b(a,c,e):b(a,c,e.call(f))};var e=a.subscribe;a.subscribe=function(a,b){return a?e(a,b):void 0}}return{load:function(a,b,c){e(),c()}}});