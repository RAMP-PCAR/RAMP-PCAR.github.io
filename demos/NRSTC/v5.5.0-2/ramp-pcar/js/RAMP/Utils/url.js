/*! ramp-pcar 05-06-2015 14:38:35 : v. 5.5.0-2 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP 
 **/
define(["dojo/_base/declare","dojo/io-query"],function(a,b){"use strict";return a(null,{constructor:function(a){var c=a.indexOf("?");-1===c?(this.uri=a,this.query=""):(this.uri=a.substring(0,c),this.query=a.substring(c+1)),this.queryObject=b.queryToObject(this.query)}})});