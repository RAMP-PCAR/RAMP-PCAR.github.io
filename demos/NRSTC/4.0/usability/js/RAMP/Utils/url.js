/*! ramp-theme-usability 21-11-2014 12:38:14 : v. 4.0.0 
 * 
 * RAMP GIS viewer - Dragonfly; Sample of an implementation of RAMP with Usability Theme 
 **/
define(["dojo/_base/declare","dojo/io-query"],function(a,b){"use strict";return a(null,{constructor:function(a){var c=a.indexOf("?");-1===c?(this.uri=a,this.query=""):(this.uri=a.substring(0,c),this.query=a.substring(c+1)),this.queryObject=b.queryToObject(this.query)}})});