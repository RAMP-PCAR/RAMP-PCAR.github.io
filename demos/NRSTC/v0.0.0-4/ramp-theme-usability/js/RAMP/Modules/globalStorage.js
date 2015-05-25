/*! ramp-theme-usability 25-05-2015 18:27:41 : v. 5.4.0-8 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Usability Theme 
 **/
define(["utils/util"],function(a){"use strict";function b(b,c){var d=$.extend(!0,{},b);return a.mergeRecursive(d,c)}function c(a){a.defs("EPSG:3978","+proj=lcc +lat_1=49 +lat_2=77 +lat_0=49 +lon_0=-95 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"),a.defs("EPSG:3979","+proj=lcc +lat_1=49 +lat_2=77 +lat_0=49 +lon_0=-95 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"),a.defs("EPSG:102100",a.defs("EPSG:3857")),a.defs("EPSG:54004","+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs")}function d(a){var c;return c=b(k,a),c.layers.wms=c.layers.wms.map(function(a){return b(h,a)}),c.basemaps=c.basemaps.map(function(a){return b(j,a)}),c.layers.feature=c.layers.feature.map(e),c}function e(a){var c=b(g,a);return c.datagrid.gridColumns&&(c.datagrid.gridColumns=c.datagrid.gridColumns.map(function(a){return b(i,a)})),c}function f(a){var c=b(h,a);return c}var g={layerAttributes:"*",minScale:0,maxScale:0,settings:{panelEnabled:!0,opacity:{enabled:!0,"default":1},visible:!0,boundingBoxVisible:!1},mode:"ondemand",datagrid:{rowsPerPage:50},templates:{detail:"default_feature_details",hover:"feature_hover_maptip_template",anchor:"anchored_map_tip",summary:"default_grid_summary_row"},maxAllowableOffset:0},h={settings:{panelEnabled:!0,opacity:{enabled:!0,"default":1},visible:!0,boundingBoxVisible:!0,queryEnabled:!0}},i={orderable:!0,type:"string",alignment:1},j={scaleCssClass:"map-scale-dark",type:"Topographic"},k={initialBasemapIndex:0,extendedDatagridExtentFilterEnabled:!1,rowsPerPage:50,navWidget:{sliderMinVal:3,sliderMaxVal:15,debug:!1,animate:"fast",cssPath:"ramp-theme/navigation",skin:"white"},zoomLevels:{min:1,max:17},templates:{basemap:"default_basemap",globalSelectorToggles:"default_selector_toggles"},layers:{feature:[],wms:[]},divNames:{map:"mainMap",navigation:"map-navigation",filter:"searchMapSectionBody",datagrid:"gridpane"},advancedToolbar:{enabled:!1,tools:[]},ui:{mapQueryToggle:{show:!0,autoHide:!0}}},l={circlePoint:{geometryType:"esriGeometryPoint",renderer:{type:"simple",symbol:{type:"esriSMS",style:"esriSMSCircle",color:[67,100,255,200],size:7}}},solidLine:{geometryType:"esriGeometryPolyline",renderer:{type:"simple",symbol:{type:"esriSLS",style:"esriSLSSolid",color:[90,90,90,200],width:2}}},outlinedPoly:{geometryType:"esriGeometryPolygon",renderer:{type:"simple",symbol:{type:"esriSFS",style:"esriSFSSolid",color:[76,76,125,200],outline:{type:"esriSLS",style:"esriSLSSolid",color:[110,110,110,255],width:1}}}}};return{init:function(a){var b=d(a);RAMP.config=b,this.layerSelectorGroups=[this.layerType.wms,this.layerType.feature]},defineProjections:c,DefaultRenderers:l,applyFeatureDefaults:e,applyWMSDefaults:f,layerType:{Basemap:"basemap",wms:"wms_layer",BoundingBox:"bounding_box",feature:"feature_layer",Static:"static_layer",Highlight:"highlight_layer",Hoverlight:"hoverlight_layer",Zoomlight:"zoomlight_layer"},layerSelectorGroups:[]}});