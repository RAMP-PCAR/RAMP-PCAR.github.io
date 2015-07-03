/*! ramp-pcar Plugins 03-07-2015 15:43:38 : v. 5.5.0-8 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP 
 **/
RAMP.plugins.featureInfoParser.windParse=function(a){"use strict";var b=a.match(/value=(-?\d+\.?\d?)[\d \.]*\n/);return b=b?b[1]:"","<p>{0}</p>".format(b)};