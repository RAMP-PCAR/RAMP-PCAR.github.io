/*! ramp-theme-usability Plugins 03-06-2015 19:01:32 : v. 5.4.0-rc1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Usability Theme 
 **/
RAMP.plugins.featureInfoParser.windParse=function(a){"use strict";var b=a.match(/value=(-?\d+\.?\d?)[\d \.]*\n/);return b=b?b[1]:"","<p>{0}</p>".format(b)};