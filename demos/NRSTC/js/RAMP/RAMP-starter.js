/*! ramp-gis-viewer 03-07-2014 : v. 1.0.42-7 

 * RAMP GIS viewer - ArcticFox; Sample of an implementation of RAMP 
 **/
var jsFolderPath="js/",cssFolderPath="css/",state="build/",pathname=location.pathname.replace(/\/[^/]+$/,"")+"/",htmlNode=$("html"),themeName=htmlNode.attr("class").split(" ").filter(function(a){"use strict";return 0===a.indexOf("ramp-")})[0]||"ramp-base",dojoConfig;dojoConfig={parseOnLoad:!1,locale:"fr"===htmlNode.attr("lang")?"fr":"en",async:!0,packages:[{name:"ramp",location:pathname+jsFolderPath+"RAMP/Modules"},{name:"utils",location:pathname+jsFolderPath+"RAMP/Utils"},{name:"defaultTheme",location:pathname+jsFolderPath+"RAMP/Themes/ramp-base"},{name:"themes",location:pathname+jsFolderPath+"RAMP/Themes/"+themeName}],jsFolderPath:jsFolderPath,cssFolderPath:cssFolderPath,extensionPrefix:"build/"===state?".min":"",buildState:state},$(document).ready(function(){"use strict";var a=document.getElementsByTagName("head")[0],b=document.createElement("script");b.type="text/javascript",b.src=pathname+jsFolderPath+"RAMP/bootstrapper.js",a.appendChild(b)});
console.log("\n        ___               _    _        ______              \n       / _ \\             | |  (_)       |  ___|             \n      / /_\\ \\ _ __   ___ | |_  _   ___  | |_     ___  __  __\n      |  _  || '__| / __|| __|| | / __| |  _|   / _ \\ \\ \\/ /             ,-,\n      | | | || |   | (__ | |_ | || (__  | |    | (_) | >  <        _.-=;~ /_\n      \\_| |_/|_|    \\___| \\__||_| \\___| \\_|     \\___/ /_/\\_\\    _-~   '     ;.\n                                                            _.-~     '   .-~-~`-._\n                                                      _.--~~:.             --.____88\n                                    ____.........--~~~. .' .  .        _..-------~~\n                           _..--~~~~               .' .'             ,'\n                       _.-~                        .       .     ` ,'\n                     .'                                    :.    ./\n                   .:     ,/          `                   ::.   ,'\n                 .:'     ,(            ;.                ::. ,-'\n                .'     ./'.`.     . . /:::._______.... _/:.o/\n               /     ./'. . .)  . _.,'               `88;?88|\n             ,'  . .,/'._,-~ /_.o8P'                  88P ?8b\n          _,'' . .,/',-~    d888P'                    88'  88|\n       _.'~  . .,:oP'        ?88b              _..--- 88.--'8b.--..__\n      :     ...' 88o __,------.88o ...__..._.=~- .    `~~   `~~      ~-._ v0.1 _.\n      `.;;;:='    ~~            ~~~                ~-    -       -   -\n\n");