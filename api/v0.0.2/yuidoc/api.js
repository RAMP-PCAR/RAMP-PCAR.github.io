YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "AdvancedToolbar",
        "AreaTool",
        "Array",
        "AttributeLoader",
        "BaseMapSelector",
        "BaseTool",
        "BookmarkLink",
        "Bootstrapper",
        "Brick",
        "Bricks",
        "BufferTool",
        "ButtonBrick",
        "Checkbox",
        "CheckboxBrick",
        "CheckboxGroup",
        "CheckboxfsBrick",
        "ChoiceBrick",
        "ColorPickerBrick",
        "DataLoader",
        "DataLoaderGui",
        "Datagrid",
        "DatagridClickHandler",
        "Decorator",
        "Dictionary",
        "DistanceTool",
        "DropDownBrick",
        "EventManager",
        "FeatureClickHandler",
        "FeatureHighlighter",
        "FileInputBrick",
        "FilterManager",
        "FunctionMangler",
        "GUI",
        "GlobalStorage",
        "GraphicExtension",
        "ImageExport",
        "LayerGroup",
        "LayerItem",
        "LayerLoader",
        "LayoutController",
        "Map",
        "MapClickHandler",
        "Maptips",
        "MultiBrick",
        "Navigation",
        "OkCancelButtonBrick",
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
        "SimpleInputBrick",
        "StepItem",
        "SubPanel",
        "SubPanelSettings",
        "Theme",
        "TmplHelper",
        "TmplUtil",
        "ToggleBrick",
        "Url",
        "Util"
    ],
    "modules": [
        "AttributeLoader",
        "BookmarkLink",
        "Bricks",
        "DataLoader",
        "Datagrid",
        "FilterManager",
        "GeoSearch",
        "GlobalStorage",
        "Map",
        "Navigation",
        "QuickZoom",
        "RAMP",
        "Theme",
        "Tools",
        "UI",
        "Utils"
    ],
    "allModules": [
        {
            "displayName": "AttributeLoader",
            "name": "AttributeLoader",
            "description": "Attribute Loader class.\n\nHandles the extraction of attribute data from map services, and transforms it to standard format\n\n####Imports RAMP Modules:\n{{#crossLink \"EventManager\"}}{{/crossLink}}\n{{#crossLink \"GlobalStorage\"}}{{/crossLink}}"
        },
        {
            "displayName": "BookmarkLink",
            "name": "BookmarkLink",
            "description": "BookmarkLink submodule\n\nKeeps track of the current state of the map and updates the GetLinkPanel's textbook accordingly. On page load, if any\nparameters are detected in the URL, this module will attempt to recreate the map according to the parameters. Internally,\nthis module subscribes to all events that change the state of the map (e.g. extent-change, layers toggled on/off). It contains\na dictionary that map event names to an object that contains the minimum information needed to reconstruct the map for that particular\nevent. For example, if an extent change occurred, this module will add a key \"map/extent-change\" (or update if the entry already exists)\nand put an object that contains the minimum information needed to reconstruct the map to that extent (in this case it would be\nxmin, ymin, xmax, ymax. Spatial reference is not needed since the map always has the same spatial reference)."
        },
        {
            "displayName": "Bricks",
            "name": "Bricks",
            "description": "Bricks is a static collection of form controls rolled into prototypical objects with extra functions available. The main purpose is to use them in the choice tree for adding datasets but they can be reused anywhere where form controls are required."
        },
        {
            "displayName": "Datagrid",
            "name": "Datagrid",
            "description": "Datagrid submodule."
        },
        {
            "displayName": "DataLoader",
            "name": "DataLoader",
            "description": "A module for loading from web services and local files.  Fetches data via File API (IE9 is currently not supported) or\nvia XmlHttpRequest.  Handles GeoJSON, Shapefiles and CSV currently.  Includes utilities for parsing files into GeoJSON\n(currently the selected intermediate format) and converting GeoJSON into FeatureLayers for consumption by the ESRI JS\nAPI.\n\n####Imports RAMP Modules:\n{{#crossLink \"LayerLoader\"}}{{/crossLink}}\n{{#crossLink \"GlobalStorage\"}}{{/crossLink}}\n{{#crossLink \"Map\"}}{{/crossLink}}\n{{#crossLink \"Util\"}}{{/crossLink}}"
        },
        {
            "displayName": "FilterManager",
            "name": "FilterManager",
            "description": "FilterManager submodule"
        },
        {
            "displayName": "GeoSearch",
            "name": "GeoSearch"
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
            "description": "Maptips class.\n\nThe map tip module provides functions to create a small popup window as the mouse hovers over a feature on the map (point, polygon, line, etc.).\nNOTE: This module uses global config object. featureLayers->mapTipSettings\n\n####Imports RAMP Modules:\n{{#crossLink \"EventManager\"}}{{/crossLink}}\n{{#crossLink \"TmplHelper\"}}{{/crossLink}}\n\n####Uses RAMP Templates:\n{{#crossLink \"templates/feature_hovertip_template.json\"}}{{/crossLink}}\n{{#crossLink \"templates/feature_anchortip_template.json\"}}{{/crossLink}}"
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
            "displayName": "Tools",
            "name": "Tools",
            "description": "Tools module. Contains tools accessible through Advanced Toolbar.\n\nContains the advanced tools as a popup."
        },
        {
            "displayName": "UI",
            "name": "UI",
            "description": "A class for handling most of the GUI on the page.\n\n####Imports RAMP Modules:\n{{#crossLink \"GlobalStorage\"}}{{/crossLink}}  \n{{#crossLink \"EventManager\"}}{{/crossLink}}  \n{{#crossLink \"Theme\"}}{{/crossLink}}  \n{{#crossLink \"Util\"}}{{/crossLink}}  \n{{#crossLink \"Dictionary\"}}{{/crossLink}}  \n{{#crossLink \"PopupManager\"}}{{/crossLink}}  \n{{#crossLink \"TmplHelper\"}}{{/crossLink}}  \n\n####Uses RAMP Templates:\n{{#crossLink \"templates/sub_panel_template.json\"}}{{/crossLink}}"
        },
        {
            "displayName": "Utils",
            "name": "Utils",
            "description": "Utility module containing useful static classes."
        }
    ]
} };
});