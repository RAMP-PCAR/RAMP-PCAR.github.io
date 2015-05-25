/*! ramp-pcar 25-05-2015 18:42:19 : v. 5.4.0-8 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
define(["dojo/_base/declare","dojo/io-query"],function(a,b){"use strict";return a(null,{constructor:function(a){var c=a.indexOf("?");-1===c?(this.uri=a,this.query=""):(this.uri=a.substring(0,c),this.query=a.substring(c+1)),this.queryObject=b.queryToObject(this.query)}})});