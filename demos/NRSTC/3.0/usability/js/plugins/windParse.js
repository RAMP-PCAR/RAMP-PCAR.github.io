/*! ramp-theme-usability Plugins 13-11-2014 10:46:05 : v. 3.0.1 
 * 
 * RAMP GIS viewer - Canada Goose; Sample of an implementation of RAMP with Usability Theme 
 **/
RAMP.plugins.featureInfoParser.windParse=function(a){"use strict";var b=a.match(/value=(-?\d+\.?\d?)[\d \.]*\n/);return b=b?b[1]:"","<p>{0}</p>".format(b)};