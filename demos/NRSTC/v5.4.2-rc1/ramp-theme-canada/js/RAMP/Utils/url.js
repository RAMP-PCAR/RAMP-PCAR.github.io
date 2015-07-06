/*! ramp-theme-canada 06-07-2015 15:29:01 : v. 5.4.2-rc1 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["dojo/_base/declare","dojo/io-query"],function(a,b){"use strict";return a(null,{constructor:function(a){var c=a.indexOf("?");-1===c?(this.uri=a,this.query=""):(this.uri=a.substring(0,c),this.query=a.substring(c+1)),this.queryObject=b.queryToObject(this.query)}})});