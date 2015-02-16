/*! ramp-pcar Plugins 13-02-2015 19:04:24 : v. 5.0.1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
RAMP.plugins.featureInfoParser.windParse=function(a){"use strict";var b=a.match(/value=(-?\d+\.?\d?)[\d \.]*\n/);return b=b?b[1]:"","<p>{0}</p>".format(b)};