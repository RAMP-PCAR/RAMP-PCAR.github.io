/*! ramp-theme-usability Plugins 28-04-2015 20:05:12 : v. 5.3.0 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Usability Theme 
 **/
RAMP.plugins.projectionLookup.epsgio=function(a){"use strict";var b,c,d,e=/urn:ogc:def:crs:EPSG::(\d+)/,f=/EPSG:(\d+)/,g=$.Deferred();return b=a.match(e),b?d=b[1]:(c=a.match(f),c&&(d=c[1])),d?($.get("http://epsg.io/"+d+".proj4").done(function(a){g.resolve(a)}).fail(function(a){g.reject(null)}),g.promise()):(g.reject("No EPSG code found"),g.promise())};