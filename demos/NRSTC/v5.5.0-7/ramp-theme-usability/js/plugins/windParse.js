/*! ramp-theme-usability Plugins 26-06-2015 14:21:07 : v. 5.5.0-7 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Usability Theme 
 **/
RAMP.plugins.featureInfoParser.windParse=function(a){"use strict";var b=a.match(/value=(-?\d+\.?\d?)[\d \.]*\n/);return b=b?b[1]:"","<p>{0}</p>".format(b)};