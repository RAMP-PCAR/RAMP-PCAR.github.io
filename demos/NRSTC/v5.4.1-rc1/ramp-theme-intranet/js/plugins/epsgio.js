/*! ramp-theme-intranet Plugins 18-06-2015 17:24:10 : v. 5.4.1-rc1 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Intranet Theme 
 **/
RAMP.plugins.projectionLookup.epsgio=function(a){"use strict";var b,c,d,e=/urn:ogc:def:crs:EPSG::(\d+)/,f=/EPSG:(\d+)/,g=$.Deferred();return b=a.match(e),b?d=b[1]:(c=a.match(f),c&&(d=c[1])),d?($.get("http://epsg.io/"+d+".proj4").done(function(a){g.resolve(a)}).fail(function(a){g.reject(null)}),g.promise()):(g.reject("No EPSG code found"),g.promise())};