/*! ramp-pcar Plugins 18-06-2015 17:15:26 : v. 5.4.1-rc1 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP 
 **/
RAMP.plugins.featureInfoParser.windParse=function(a){"use strict";var b=a.match(/value=(-?\d+\.?\d?)[\d \.]*\n/);return b=b?b[1]:"","<p>{0}</p>".format(b)};