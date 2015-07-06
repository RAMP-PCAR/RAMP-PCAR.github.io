/*! ramp-theme-canada Plugins 06-07-2015 15:29:18 : v. 5.4.2-rc1 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
RAMP.plugins.featureInfoParser.tempParse=function(a){"use strict";var b=a.match(/value=(-?\d+\.?\d?)\d*\n/),c=a.match(/unit=(.*)\n/);return b=b?b[1]:"",c=c?c[1]:"","<p>{0} &deg;C</p>".format(b,c)};