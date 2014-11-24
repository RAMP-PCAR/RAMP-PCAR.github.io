/*! ramp-theme-intranet Plugins 21-11-2014 12:49:17 : v. 4.0.0 
 * 
 * RAMP GIS viewer - Dragonfly; Sample of an implementation of RAMP with Intranet Theme 
 **/
RAMP.plugins.featureInfoParser.windParse=function(a){"use strict";var b=a.match(/value=(-?\d+\.?\d?)[\d \.]*\n/);return b=b?b[1]:"","<p>{0}</p>".format(b)};