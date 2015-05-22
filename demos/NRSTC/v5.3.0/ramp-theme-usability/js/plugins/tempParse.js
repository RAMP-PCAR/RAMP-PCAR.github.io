/*! ramp-theme-usability Plugins 28-04-2015 20:05:12 : v. 5.3.0 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Usability Theme 
 **/
RAMP.plugins.featureInfoParser.tempParse=function(a){"use strict";var b=a.match(/value=(-?\d+\.?\d?)\d*\n/),c=a.match(/unit=(.*)\n/);return b=b?b[1]:"",c=c?c[1]:"","<p>{0} &deg;C</p>".format(b,c)};