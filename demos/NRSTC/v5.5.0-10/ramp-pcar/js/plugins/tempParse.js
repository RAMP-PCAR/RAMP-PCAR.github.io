/*! ramp-pcar Plugins 13-07-2015 12:03:56 : v. 5.5.0-10 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP 
 **/
RAMP.plugins.featureInfoParser.tempParse=function(a){"use strict";var b=a.match(/value=(-?\d+\.?\d?)\d*\n/),c=a.match(/unit=(.*)\n/);return b=b?b[1]:"",c=c?c[1]:"","<p>{0} &deg;C</p>".format(b,c)};