/*! ramp-pcar Plugins 21-05-2015 18:11:35 : v. 5.3.2 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
RAMP.plugins.projectionLookup.epsgio=function(a){"use strict";var b,c,d,e=/urn:ogc:def:crs:EPSG::(\d+)/,f=/EPSG:(\d+)/,g=$.Deferred();return b=a.match(e),b?d=b[1]:(c=a.match(f),c&&(d=c[1])),d?($.get("http://epsg.io/"+d+".proj4").done(function(a){g.resolve(a)}).fail(function(a){g.reject(null)}),g.promise()):(g.reject("No EPSG code found"),g.promise())};