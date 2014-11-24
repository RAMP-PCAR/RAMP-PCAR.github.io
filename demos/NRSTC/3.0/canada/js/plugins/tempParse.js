/*! ramp-theme-canada Plugins 13-11-2014 09:59:14 : v. 3.0.1 
 * 
 * RAMP GIS viewer - Canada Goose; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
RAMP.plugins.featureInfoParser.tempParse=function(a){"use strict";var b=a.match(/value=(-?\d+\.?\d?)\d*\n/),c=a.match(/unit=(.*)\n/);return b=b?b[1]:"",c=c?c[1]:"","<p>{0} &deg;C</p>".format(b,c)};