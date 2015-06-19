/*! ramp-theme-usability 19-06-2015 18:15:37 : v. 5.4.1 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Usability Theme 
 **/
define([],function(){"use strict";return{FilterManager:{LAYER_VISIBILITY_TOGGLED:"filterManager/layer-visibility-toggled",LAYER_TRANSPARENCY_CHANGED:"filterManager/layer-transparency-changed",BOX_VISIBILITY_TOGGLED:"filterManager/box-visibility-toggled",SELECTION_CHANGED:"filtermanager/selection-changed",UI_COMPLETE:"filterManager/UIComplete",TOGGLE_LAYER_VISIBILITY:"filterManager/toggle-layer-visibility",TOGGLE_BOX_VISIBILITY:"filterManager/toggle-box-visibility",WMS_QUERY_CHANGE:"filterManager/wms-query-change"},GUI:{DATAGRID_EXPAND:"gui/datagrid-expand",TAB_DESELECTED:"gui/tab-deselected",TAB_SELECTED:"gui/tab-selected",SUBPANEL_CHANGE:"gui/subpanel-change",PANEL_CHANGE:"gui/panel-change",HELP_PANEL_CHANGE:"gui/help-panel-change",FULLSCREEN_CHANGE:"gui/fullscreen-change",LAYOUT_CHANGE:"gui/layout-change",PANEL_TOGGLE:"gui/panel-toggle",SUBPANEL_OPEN:"gui/subpanel-open",SUBPANEL_CLOSE:"gui/subpanel-close",SUBPANEL_DOCK:"gui/subpanel-dock",SUBPANEL_CAPTURE:"gui/subpanel-capture",TOGGLE_FULLSCREEN:"gui/toggle-fullscreen",ADD_LAYER_PANEL_CHANGE:"gui/add-layer-panel-change",TOOLBAR_SECTION_OPEN:"gui/toolbar-section-open",TOOLBAR_SECTION_CLOSE:"gui/toolbar-section-close",UPDATE_COMPLETE:"gui/update-complete"},FeatureHighlighter:{HIGHLIGHT_SHOW:"highlighter/highlight-show",HIGHLIGHT_HIDE:"highlighter/highlight-hide",HOVERLIGHT_SHOW:"highlighter/hoverlight-show",HOVERLIGHT_HIDE:"highlighter/hoverlight-hide",ZOOMLIGHT_SHOW:"highlighter/zoomlight-show",ZOOMLIGHT_HIDE:"highlighter/zoomlight-hide"},Maptips:{SHOW:"maptips/show",SHOW_INTERACTIVE:"maptips/showInteractive",EXTENT_CHANGE:"maptip/extent-change",REPOSITION_INTERACTIVE:"maptips/repositionInteractive"},LayerLoader:{LAYER_LOADED:"layerLoader/layer-loaded",LAYER_ADDED:"layerLoader/layer-added",LAYER_REMOVED:"layerLoader/layer-removed",LAYER_UPDATED:"layerLoader/layer-updated",LAYER_UPDATING:"layerLoader/layer-updating",REMOVE_LAYER:"layerLoader/remove-layer",RELOAD_LAYER:"layerLoader/reload-layer",LAYER_ERROR:"layerLoader/layer-error"},Map:{ALL_LAYERS_LOADED:"rampMap/all-layers-loaded",INITIAL_BASEMAP_LOADED:"rampMap/initial-basemap-loaded",CENTER_AT:"rampMap/center-at",CENTER_AND_ZOOM:"rampMap/center-and-zoom",SET_EXTENT:"rampMap/set-extent",EXTENTS_REPROJECTED:"rampMap/extents-reprojected",CLICK:"map/click",REORDER_END:"map/reorder-end",UPDATE_END:"map/update-end",EXTENT_CHANGE:"map/extent-change",ZOOM_START:"map/zoom-start",ZOOM_END:"map/zoom-end",PAN_START:"map/pan-start",PAN_END:"map/pan-end",ADD_LAYER:"map/add-layer",ADD_LAYER_READY:"map/add-layer-ready",RESIZE:"map/resize"},BasemapSelector:{BASEMAP_CHANGED:"basemapSelector/basemap-changed",UI_COMPLETE:"basemapSelector/UIComplete",TOGGLE:"basemapSelector/toggle"},Datagrid:{APPLY_EXTENT_FILTER:"datagrid/applyExtentFilter",DRAW_COMPLETE:"datagrid/draw-complete",EXTENT_FILTER_END:"datagrid/extent-filter-end",HIGHLIGHTROW_SHOW:"datagrid/highlightrow-show",HIGHLIGHTROW_HIDE:"datagrid/highlightrow-hide",ZOOMLIGHTROW_SHOW:"datagrid/zoomlightrow-show",ZOOMLIGHTROW_HIDE:"datagrid/zoomlightrow-hide",UPDATING:"datagrid/updating"},Navigation:{PAN:"navigation/pan",ZOOM_STEP:"navigation/zoom-step",ZOOM:"navigation/zoom",FULL_EXTENT:"navigation/full-extent"},BookmarkLink:{GETLINK_PANEL_CHANGED:"bookmark/getlinkpanel-changed",BOOKMARK_GENERATED:"bookmark/bookmark-generated"},AdvancedToolbar:{ADVANCED_PANEL_CHANGED:"advanced/advancedpanel-changed"}}});