YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "AdvancedToolbar",
        "Array",
        "BaseMapSelector",
        "BaseTool",
        "BookmarkLink",
        "Bootstrapper",
        "BufferTool",
        "Checkbox",
        "CheckboxGroup",
        "Datagrid",
        "DatagridClickHandler",
        "Decorator",
        "Dictionary",
        "EventManager",
        "FeatureClickHandler",
        "FeatureHighlighter",
        "FilterManager",
        "FunctionMangler",
        "GUI",
        "GlobalStorage",
        "GraphicExtension",
        "Map",
        "MapClickHandler",
        "Maptips",
        "MeasureTool",
        "Navigation",
        "PopulationTool",
        "Popup",
        "PopupBase",
        "PopupBaseSettings",
        "PopupManager",
        "Prototype",
        "QuickZoom",
        "RAMP",
        "RAMPStarter",
        "RampMap",
        "SidePanel",
        "SubPanel",
        "SubPanelSettings",
        "Theme",
        "TmplHelper",
        "TmplUtil",
        "Url",
        "Util"
    ],
    "modules": [
        "BookmarkLink",
        "Datagrid",
        "FilterManager",
        "GlobalStorage",
        "Map",
        "MeasureTool",
        "Navigation",
        "QuickZoom",
        "RAMP",
        "Theme",
        "TmplUtil",
        "Tools",
        "UI",
        "Utils"
    ],
    "allModules": [
        {
            "displayName": "BookmarkLink",
            "name": "BookmarkLink",
            "description": "BookmarkLink submodule\n\nKeeps track of the current state of the map and updates the GetLinkPanel's textbook accordingly. On page load, if any\nparameters are detected in the URL, this module will attempt to recreate the map according to the parameters. Internally,\nthis module subscribes to all events that change the state of the map (e.g. extent-change, layers toggled on/off). It contains\na dictionary that map event names to an object that contains the minimum information needed to reconstruct the map for that particular\nevent. For example, if an extent change occurred, this module will add a key \"map/extent-change\" (or update if the entry already exists)\nand put an object that contains the minimum information needed to reconstruct the map to that extent (in this case it would be\nxmin, ymin, xmax, ymax. Spatial reference is not needed since the map always has the same spatial reference)."
        },
        {
            "displayName": "Datagrid",
            "name": "Datagrid",
            "description": "Datagrid submodule."
        },
        {
            "displayName": "FilterManager",
            "name": "FilterManager",
            "description": "FilterManager submodule"
        },
        {
            "displayName": "GlobalStorage",
            "name": "GlobalStorage",
            "description": "GlobalStorage class is used to store variables and exchange them between different modules. Each module has the ability to add variables to the global storage and retrieve them as needed."
        },
        {
            "displayName": "Map",
            "name": "Map",
            "description": "A RAMP Map module with ESRI and Dojo AMD Modules\n This module provides function to create an ESRI web map control. A global config object is\n required to initialize the map."
        },
        {
            "displayName": "Maptips",
            "name": "Maptips",
            "description": "Maptips class.\n\nThe map tip module provides functions to create a small popup window as the mouse hovers over a feature on the map (point, polygon, line, etc.).\nNOTE: This module uses global config object. featureLayers->mapTipSettings"
        },
        {
            "displayName": "MeasureTool",
            "name": "MeasureTool",
            "description": "MeasureTool submodule.\n\nComputes the area and perimeter length of a selected area. When the user draws a polygon, the area\nand length will be displayed in the bottom right corner."
        },
        {
            "displayName": "Navigation",
            "name": "Navigation",
            "description": "Navigation submodule"
        },
        {
            "displayName": "QuickZoom",
            "name": "QuickZoom",
            "description": "QuickZoom submodule"
        },
        {
            "displayName": "RAMP",
            "name": "RAMP",
            "description": "Ramp module"
        },
        {
            "displayName": "Theme",
            "name": "Theme",
            "description": "This submodule contains theme-specific classes with animation sequences such as Full Screen transition or tooltip setter helper method."
        },
        {
            "displayName": "TmplUtil",
            "name": "TmplUtil",
            "description": "Utility module containing useful static classes."
        },
        {
            "displayName": "Tools",
            "name": "Tools",
            "description": "Tools module. Contains tools accessible through Advanced Toolbar.\n\nContains the advanced tools as a popup."
        },
        {
            "displayName": "UI",
            "name": "UI",
            "description": "A class for handling most of the GUI on the page."
        },
        {
            "displayName": "Utils",
            "name": "Utils",
            "description": "Utility module containing useful static classes."
        }
    ]
} };
});