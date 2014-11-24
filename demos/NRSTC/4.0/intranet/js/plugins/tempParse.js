/*! ramp-theme-intranet Plugins 21-11-2014 12:49:17 : v. 4.0.0 
 * 
 * RAMP GIS viewer - Dragonfly; Sample of an implementation of RAMP with Intranet Theme 
 **/
RAMP.plugins.featureInfoParser.tempParse=function(a){"use strict";var b=a.match(/value=(-?\d+\.?\d?)\d*\n/),c=a.match(/unit=(.*)\n/);return b=b?b[1]:"",c=c?c[1]:"","<p>{0} &deg;C</p>".format(b,c)};