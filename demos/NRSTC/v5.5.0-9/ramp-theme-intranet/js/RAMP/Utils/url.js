/*! ramp-theme-intranet 10-07-2015 14:15:19 : v. 5.5.0-9 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["dojo/_base/declare","dojo/io-query"],function(a,b){"use strict";return a(null,{constructor:function(a){var c=a.indexOf("?");-1===c?(this.uri=a,this.query=""):(this.uri=a.substring(0,c),this.query=a.substring(c+1)),this.queryObject=b.queryToObject(this.query)}})});