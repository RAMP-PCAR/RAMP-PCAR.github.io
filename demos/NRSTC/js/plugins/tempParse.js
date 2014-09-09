/*! ramp-gis-viewer Plugins 09-09-2014 13:44:32 : v. 2.0.0 
 * 
 * RAMP GIS viewer - Bobcat; Sample of an implementation of RAMP 
 **/
RAMP.plugins.featureInfoParser.tempParse=function(a){"use strict";var b=a.match(/value=(-?\d+\.?\d?)\d*\n/),c=a.match(/unit=(.*)\n/);return b=b?b[1]:"",c=c?c[1]:"","<p>{0} &deg;C</p>".format(b,c)};