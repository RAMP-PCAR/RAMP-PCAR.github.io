/*! ramp-pcar 31-03-2015 19:53:59 : v. 5.2.0 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
var RAMP,jsFolderPath="js/",pathname=location.pathname.replace(/\/[^/]+$/,"")+"/",jsPrefix=pathname+jsFolderPath,htmlNode=$("html"),dojoConfig;RAMP={configServiceURL:"http://localhost:5000/",config:{},plugins:{featureInfoParser:{}},state:{ui:{sidePanelOpened:!0,fullscreen:!1,wmsQuery:!0}},flags:{},scripts:["http://js.arcgis.com/3.13/",jsPrefix+"lib/wet-boew/js/wet-boew.js",jsPrefix+"RAMP/bootstrapper.js"]};var importScript=function(a){"use strict";function b(a){throw new URIError("The script "+a.target.src+" is not accessible.")}return function(c,d){var e=document.createElement("script");e.type="text/javascript",e.onerror=b,d&&(e.onload=d),a.appendChild(e),e.src=c}}(document.head||document.getElementsByTagName("head")[0]);dojoConfig={parseOnLoad:!1,locale:htmlNode.attr("lang"),async:!0,packages:[{name:"ramp",location:jsPrefix+"RAMP/Modules"},{name:"utils",location:jsPrefix+"RAMP/Utils"},{name:"tools",location:jsPrefix+"RAMP/Tools/"}],fullPluginPath:jsPrefix+"plugins/"},function a(b){"use strict";0!==b.length&&importScript(b[0],function(){a(b.slice(1))})}(RAMP.scripts);