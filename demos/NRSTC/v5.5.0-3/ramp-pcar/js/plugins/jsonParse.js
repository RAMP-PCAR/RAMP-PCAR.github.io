/*! ramp-pcar Plugins 11-06-2015 22:18:30 : v. 5.5.0-3 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP 
 **/
RAMP.plugins.featureInfoParser.jsonParse=function(a){"use strict";var b,c;return"string"==typeof a&&(a=JSON.parse(a)),b=Object.keys(a).filter(function(b){return"object"!=typeof a[b]&&"undefined"!=typeof a[b]}).map(function(b){return'<tr><th>{0}</th><td style="padding-left: 1em">{1}</td></tr>'.format(b,a[b])}).join(""),c='<textarea class="json-details" style="display: none">{0}</textarea>'.format(JSON.stringify(a)),"<table>{0}</table>{1}".format(b,c)};