/*! ramp-theme-canada Plugins 21-11-2014 12:57:43 : v. 4.0.0 
 * 
 * RAMP GIS viewer - Dragonfly; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
RAMP.plugins.featureInfoParser.tempParse=function(a){"use strict";var b=a.match(/value=(-?\d+\.?\d?)\d*\n/),c=a.match(/unit=(.*)\n/);return b=b?b[1]:"",c=c?c[1]:"","<p>{0} &deg;C</p>".format(b,c)};