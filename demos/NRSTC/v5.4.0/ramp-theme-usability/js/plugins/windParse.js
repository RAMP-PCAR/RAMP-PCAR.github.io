/*! ramp-theme-usability Plugins 05-06-2015 18:24:18 : v. 5.4.0 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Usability Theme 
 **/
RAMP.plugins.featureInfoParser.windParse=function(a){"use strict";var b=a.match(/value=(-?\d+\.?\d?)[\d \.]*\n/);return b=b?b[1]:"","<p>{0}</p>".format(b)};