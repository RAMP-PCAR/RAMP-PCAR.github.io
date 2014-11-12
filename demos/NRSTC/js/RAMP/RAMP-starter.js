/*global location, $, document */

/**
*
*
* @module RAMP
*/

/**
* RAMPStarter class.
* Performs initial configuration of the dojo config object specifying path to the RAMP modules, detecting locale, and loading the {{#crossLink "Bootstrapper"}}{{/crossLink}} module.
* pipe the locale to dojo.
*
* @class RAMPStarter
* @static
*/

//required to get draw bar to show in French
var RAMP,
    jsFolderPath = "js/",
    pathname = location.pathname.replace(/\/[^/]+$/, "") + "/",
    htmlNode = $("html"),
    dojoConfig;

/**
* RAMP global class.
* A general globally available class to hold any RAMP global data. Currently houses any plugins which are not loaded via AMD.
*
* @class RAMP
*/
RAMP = {
    plugins: {
        featureInfoParser: {}
    }
};

dojoConfig = {
    parseOnLoad: false,
    locale: htmlNode.attr("lang"),
    async: true,
    packages: [
        {
            name: "ramp",
            location: pathname + jsFolderPath + "RAMP/Modules"
        },
        {
            name: "utils",
            location: pathname + jsFolderPath + "RAMP/Utils"
        },
        {
            name: "tools",
            location: pathname + jsFolderPath + "RAMP/Tools/"
        }
    ],
    fullPluginPath: pathname + jsFolderPath + 'plugins/'
};

$(document).ready(function () {
    "use strict";
    // when loading js file this way, it will NOT show up in the debug panel in Firebug
    /*$.getScript(pathname + jsFolderPath + state + "RAMP/bootstrapper.js",
        function( data, textStatus, jqxhr ) {
            console.log( jqxhr.status ); // 200
    });*/

    // when loading js file this way, it will show up in the debug panel in Firebug
    var head = document.getElementsByTagName('head')[0],
        script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = pathname + jsFolderPath + "RAMP/bootstrapper.js";
    head.appendChild(script);
});
console.log("  _____                       _         _____                      \n /  __ \\                     | |       |  __ \\                                           ___\n | /  \\/ __ _ _ __   __ _  __| | __ _  | |  \\/ ___   ___  ___  ___                   ,-\"\"   `.\n | |    / _` | '_ \\ / _` |/ _` |/ _` | | | __ / _ \\ / _ \\/ __|/ _ \\                ,'  _   e )`-._\n | \\__/\\ (_| | | | | (_| | (_| | (_| | | |_\\ \\ (_) | (_) \\__ \\  __/               /  ,' `-._<.===-'\n  \\____/\\__,_|_| |_|\\__,_|\\__,_|\\__,_|  \\____/\\___/ \\___/|___/\\___|              /  /\n                                                                                /  /\n        ._ v3 _.                                                               /  /\n                                                                              /   ;     \n                                                                  _          /    ;\n                                                     (`._    _.-\"\" \"\"--..__,'     |\n                                                     <_  `-\"\"                      \\\n                                                      <`-                           :\n                                                       (__   <__.                   ;\n                                                         `-.   '-.__.      _.'     /\n                                                            \\      `-.__,-'    _,''\n                                                             `._    ,    /__,-'\n                                                                \"\"._\\__,'< <____\n                                                                     | |  `----.`.\n                                                                     | |        \\ `.\n                                                                     ; |___      \\-``\n                                                                     \\   --<\n                                                                      `.`.<\n                                                                 hjw    `-'");