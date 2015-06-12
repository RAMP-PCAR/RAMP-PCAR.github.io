/*! ramp-theme-canada Plugins 12-06-2015 14:13:18 : v. 5.5.0-4 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
RAMP.plugins.featureInfoParser.tempParse=function(a){"use strict";var b=a.match(/value=(-?\d+\.?\d?)\d*\n/),c=a.match(/unit=(.*)\n/);return b=b?b[1]:"",c=c?c[1]:"","<p>{0} &deg;C</p>".format(b,c)};