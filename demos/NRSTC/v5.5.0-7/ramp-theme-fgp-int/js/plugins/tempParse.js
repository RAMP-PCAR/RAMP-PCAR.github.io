/*! ramp-theme-fgp-int Plugins 26-06-2015 14:25:31 : v. 5.5.0-7 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Intranet Theme 
 **/
RAMP.plugins.featureInfoParser.tempParse=function(a){"use strict";var b=a.match(/value=(-?\d+\.?\d?)\d*\n/),c=a.match(/unit=(.*)\n/);return b=b?b[1]:"",c=c?c[1]:"","<p>{0} &deg;C</p>".format(b,c)};