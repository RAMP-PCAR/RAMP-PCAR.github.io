/*! ramp-theme-usability Plugins 06-07-2015 15:02:13 : v. 5.4.2-rc1 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Usability Theme 
 **/
RAMP.plugins.featureInfoParser.windParse=function(a){"use strict";var b=a.match(/value=(-?\d+\.?\d?)[\d \.]*\n/);return b=b?b[1]:"","<p>{0}</p>".format(b)};