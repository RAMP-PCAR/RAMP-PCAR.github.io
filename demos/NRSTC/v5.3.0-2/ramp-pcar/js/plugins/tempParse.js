/*! ramp-pcar Plugins 07-04-2015 11:52:56 : v. 5.3.0-2 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
RAMP.plugins.featureInfoParser.tempParse=function(a){"use strict";var b=a.match(/value=(-?\d+\.?\d?)\d*\n/),c=a.match(/unit=(.*)\n/);return b=b?b[1]:"",c=c?c[1]:"","<p>{0} &deg;C</p>".format(b,c)};