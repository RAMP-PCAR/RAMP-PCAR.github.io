/*! ramp-theme-intranet 08-05-2015 15:36:17 : v. 5.3.1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["dojo/_base/declare","dojo/io-query"],function(a,b){"use strict";return a(null,{constructor:function(a){var c=a.indexOf("?");-1===c?(this.uri=a,this.query=""):(this.uri=a.substring(0,c),this.query=a.substring(c+1)),this.queryObject=b.queryToObject(this.query)}})});