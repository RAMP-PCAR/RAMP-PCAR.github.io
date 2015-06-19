/*! ramp-theme-canada 19-06-2015 14:42:31 : v. 5.5.0-6 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["dojo/_base/lang","dojo/text!./templates/filter_manager_template.json","utils/popupManager","ramp/dataLoader","ramp/theme","ramp/map","ramp/layerLoader","ramp/globalStorage","ramp/stepItem","utils/util","utils/tmplHelper","utils/tmplUtil","utils/array","utils/dictionary","utils/bricks"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){"use strict";function p(){H={base:{type:"error",header:"Cannot load",message:"You have IE9?"}},H.featureError=a.mixin({},H.base,{header:i18n.t("addDataset.error.headerFeature")}),H.wmsError=a.mixin({},H.base,{header:i18n.t("addDataset.error.headerWMS")}),H.fileError=a.mixin({},H.base,{header:i18n.t("addDataset.error.headerFile")}),H.geojsonError=a.mixin({},H.base,{header:i18n.t("addDataset.error.headerGeojson")}),H.csvError=a.mixin({},H.base,{header:i18n.t("addDataset.error.headerCSV")}),H.shapefileError=a.mixin({},H.base,{header:i18n.t("addDataset.error.headerShapefile")}),F={id:"sourceTypeStep",content:[{id:"sourceType",type:o.ChoiceBrick,config:{header:i18n.t("addDataset.dataSource"),instructions:i18n.t("addDataset.help.dataSource"),choices:[{key:"serviceTypeStep",value:i18n.t("addDataset.dataSourceService")},{key:"fileTypeStep",value:i18n.t("addDataset.dataSourceFile")}]},on:[{eventName:o.ChoiceBrick.event.CHANGE,callback:G.simpleAdvance}]}],children:[{id:"serviceTypeStep",content:[{id:"serviceURL",type:o.SimpleInputBrick,config:{header:i18n.t("addDataset.serviceLayerURL"),instructions:i18n.t("addDataset.help.serviceURL"),placeholder:i18n.t("addDataset.serviceLayerURLPlaceholder"),freezeStates:[o.Brick.state.SUCCESS]},on:[{eventName:o.SimpleInputBrick.event.CHANGE,callback:G.serviceTypeStepGuess}]},{id:"serviceType",type:o.ChoiceBrick,config:{header:i18n.t("addDataset.serviceType"),instructions:i18n.t("addDataset.help.serviceType"),choices:[{key:"featureServiceAttrStep",value:i18n.t("addDataset.serviceTypeFeature")},{key:"wmsServiceAttrStep",value:i18n.t("addDataset.serviceTypeWMS")}],freezeStates:[o.Brick.state.SUCCESS]}},{id:"serviceTypeOkCancel",type:o.OkCancelButtonBrick,config:{okLabel:i18n.t("addDataset.connect"),okFreezeStates:[o.Brick.state.SUCCESS,o.Brick.state.ERROR],cancelLabel:i18n.t("addDataset.cancel"),reverseOrder:!0,required:[{id:o.OkCancelButtonBrick.okButtonId,type:"all",check:["serviceType","serviceURL"]},{id:o.OkCancelButtonBrick.cancelButtonId,type:"any",check:["serviceType","serviceURL"]}]},on:[{eventName:o.OkCancelButtonBrick.event.OK_CLICK,callback:function(b){var c,e=u(b,100),g=b.getData().bricksData,h=g.serviceType.selectedChoice,i=g.serviceURL.inputValue.trim();switch(h){case"featureServiceAttrStep":c=d.getFeatureLayer(i),c.then(function(c){var h=f.layerInLODRange(c.maxScale,c.minScale);if(h){var j=d.getFeatureLayerLegend(i);j.then(function(d){var f;window.clearTimeout(e),c.legendLookup=d,f=c.fields.map(function(a){return{value:a,text:a}}),f&&0!==f.length?G.simpleAdvance(b,g.serviceType,{stepData:c,bricksData:{primaryAttribute:{options:f}}}):v(b,e,{serviceType:a.mixin(H.featureError,{message:i18n.t("addDataset.error.messageFeatureInvalid")})})},function(c){v(b,e,{serviceType:a.mixin(H.featureError,{message:i18n.t("addDataset.error.messageFeatureLegend")})})})}else v(b,e,{serviceType:a.mixin(H.featureError,{message:i18n.t("addDataset.error.messageFeatureOutsideZoomRange")})})},function(c){v(b,e,{serviceURL:a.mixin(H.featureError,{message:i18n.t("addDataset.error.messageFeatureConnect")})})});break;case"wmsServiceAttrStep":c=d.getWmsLayerList(i),c.then(function(c){var d;window.clearTimeout(e),d=c.layers.map(function(a){return{value:a.name,text:a.desc}}),d&&0!==d.length?G.simpleAdvance(b,g.serviceType,{stepData:{wmsData:c,wmsUrl:i},bricksData:{layerName:{options:d}}}):v(b,e,{serviceType:a.mixin(H.wmsError,{message:i18n.t("addDataset.error.messageWMSInvalid")})})},function(c){v(b,e,{serviceURL:a.mixin(H.wmsError,{message:i18n.t("addDataset.error.messageWMSConnect")})})})}}},{eventName:o.OkCancelButtonBrick.event.CANCEL_CLICK,callback:G.simpleCancel}]}],children:[{id:"featureServiceAttrStep",content:[{id:"primaryAttribute",type:o.DropDownBrick,config:{instructions:i18n.t("addDataset.help.featurePrimaryAttribute"),header:i18n.t("addDataset.primaryAttribute")}},{id:"addDataset",type:o.ButtonBrick,config:{label:i18n.t("addDataset.addDatasetButton"),containerClass:"button-brick-container-main",buttonClass:"btn-primary"},on:[{eventName:o.ButtonBrick.event.CLICK,callback:function(a){var b,c=a.getData(),e=c.bricksData,i=c.stepData,j={id:g.nextId(),displayName:i.layerName,nameField:e.primaryAttribute.dropDownValue,datagrid:d.createDatagridConfig(i.fields,i.aliasMap),symbology:d.createSymbologyConfig(i.renderer,i.legendLookup),url:i.layerUrl,aliasMap:i.aliasMap};j=h.applyFeatureDefaults(j),b=f.makeFeatureLayer(j,!0),RAMP.config.layers.feature.push(j),g.loadLayer(b),I.close()}}]}]},{id:"wmsServiceAttrStep",content:[{id:"layerName",type:o.DropDownBrick,config:{instructions:i18n.t("addDataset.help.wmsLayerName"),header:i18n.t("addDataset.layerName")}},{id:"addDataset",type:o.ButtonBrick,config:{label:i18n.t("addDataset.addDatasetButton"),containerClass:"button-brick-container-main",buttonClass:"btn-primary"},on:[{eventName:o.ButtonBrick.event.CLICK,callback:function(a){var b,c,d,e=a.getData(),i=e.bricksData,j=e.stepData,k=i.layerName.dropDownValue;c=m.find(j.wmsData.layers,function(a){return a.name===k}),b={id:g.nextId(),displayName:c.desc,format:"png",layerName:k,imageUrl:"assets/images/wms.png",url:j.wmsUrl,legendMimeType:"image/jpeg"},c.queryable&&(b.featureInfo={parser:"stringParse",mimeType:"text/plain"}),b=h.applyWMSDefaults(b),d=f.makeWmsLayer(b,!0),RAMP.config.layers.wms.push(b),g.loadLayer(d),I.close()}}]}]}]},{id:"fileTypeStep",content:[{id:"fileOrFileURL",type:o.FileInputBrick,config:{header:i18n.t("addDataset.fileOrURL"),instructions:i18n.t("addDataset.help.fileOrURL"),placeholder:i18n.t("addDataset.fileOrURLPlaceholder"),freezeStates:[o.Brick.state.SUCCESS]},on:[{eventName:o.FileInputBrick.event.CHANGE,callback:G.fileTypeStepGuess}]},{id:"fileType",type:o.ChoiceBrick,config:{instructions:i18n.t("addDataset.help.fileOrURLType"),header:i18n.t("addDataset.fileType"),choices:[{key:"geojsonFileAttrStep",value:i18n.t("addDataset.geojson")},{key:"csvFileAttrStep",value:i18n.t("addDataset.csv")},{key:"shapefileFileAttrStep",value:i18n.t("addDataset.shapefile")}],freezeStates:[o.Brick.state.SUCCESS]}},{id:"fileTypeOkCancel",type:o.OkCancelButtonBrick,config:{okLabel:i18n.t("addDataset.load"),okFreezeStates:[o.Brick.state.SUCCESS,o.Brick.state.ERROR],cancelLabel:i18n.t("addDataset.cancel"),reverseOrder:!0,required:[{id:o.OkCancelButtonBrick.okButtonId,type:"all",check:["fileType","fileOrFileURL"]},{id:o.OkCancelButtonBrick.cancelButtonId,type:"any",check:["fileType","fileOrFileURL"]}]},on:[{eventName:o.OkCancelButtonBrick.event.OK_CLICK,callback:function(b){var c,e=u(b,100),f=b.getData().bricksData,g=f.fileType.selectedChoice,h=f.fileOrFileURL.fileValue,i=f.fileOrFileURL.inputValue.trim(),k=f.fileOrFileURL.fileName;c=d.loadDataSet({url:h?null:i,file:h,type:"shapefileFileAttrStep"===g?"binary":"text"}),c.then(function(c){switch(g){case"geojsonFileAttrStep":var h=d.buildGeoJson(c);h.then(function(c){var d;window.clearTimeout(e),d=c.fields.map(function(a){return{value:a.name,text:a.name}}),d&&0!==d.length?G.simpleAdvance(b,f.fileType,{stepData:c,bricksData:{datasetName:{inputValue:k},primaryAttribute:{options:d}}}):v(b,e,{fileType:a.mixin(H.geojsonError,{message:i18n.t("addDataset.error.messageGeojsonInvalid")})})},function(c){v(b,e,{fileType:a.mixin(H.geojsonError,{message:i18n.t("addDataset.error.messageGeojsonBroken")})})});break;case"csvFileAttrStep":var i,l,m,n,o=j.detectDelimiter(c);window.clearTimeout(e),i=d.csvPeek(c,o),n=i[0].map(function(a){return{value:a,text:a}}),n&&0!==n.length?!i||i.length<2?v(b,e,{fileType:a.mixin(H.csvError,{message:i18n.t("addDataset.error.messageCSVShort")})}):n.length<2?v(b,e,{fileType:a.mixin(H.csvError,{message:i18n.t("addDataset.error.messageCSVThin")})}):(l=r(i),m=i[0].filter(function(a){return a!==l.lat&&a!==l["long"]})[0]||i[0][0],G.simpleAdvance(b,f.fileType,{stepData:{csvData:c,csvHeaders:i[0],csvDelimeter:o},bricksData:{datasetName:{inputValue:k},primaryAttribute:{options:n,selectedOption:m},latitude:{options:n,selectedOption:l.lat},longitude:{options:n,selectedOption:l["long"]}}})):v(b,e,{fileType:a.mixin(H.csvError,{message:i18n.t("addDataset.error.messageCSVInvalid")})});break;case"shapefileFileAttrStep":var p=d.buildShapefile(c);p.then(function(c){var d;window.clearTimeout(e),d=c.fields.map(function(a){return{value:a.name,text:a.name}}),d&&0!==d.length?G.simpleAdvance(b,f.fileType,{stepData:c,bricksData:{datasetName:{inputValue:k},primaryAttribute:{options:d}}}):v(b,e,{fileType:a.mixin(H.shapefileError,{message:i18n.t("addDataset.error.messageShapefileInvalid")})})},function(c){v(b,e,{fileType:a.mixin(H.shapefileError,{message:i18n.t("addDataset.error.messageShapefileBroken")})})})}},function(c){v(b,e,{fileOrFileURL:a.mixin(H.fileError,{message:i18n.t("addDataset.error.messageFileConnect")})})})}},{eventName:o.OkCancelButtonBrick.event.CANCEL_CLICK,expose:{as:"retreat"},callback:G.simpleCancel}]}],children:[{id:"geojsonFileAttrStep",content:[{id:"datasetName",type:o.SimpleInputBrick,config:{instructions:i18n.t("addDataset.help.geojsonDatasetName"),header:i18n.t("addDataset.datasetName")}},{id:"primaryAttribute",type:o.DropDownBrick,config:{instructions:i18n.t("addDataset.help.geojsonPrimaryAttribute"),header:i18n.t("addDataset.primaryAttribute")}},{id:"color",type:o.ColorPickerBrick,config:{instructions:i18n.t("addDataset.help.geojsonColour"),header:i18n.t("addDataset.colour")}},{id:"addDataset",type:o.ButtonBrick,config:{label:i18n.t("addDataset.addDatasetButton"),containerClass:"button-brick-container-main",buttonClass:"btn-primary"},on:[{eventName:o.ButtonBrick.event.CLICK,callback:function(a){var b=a.getData(),c=b.bricksData,e=b.stepData,f=s("a_d_icon_"+e.renderer._RAMP_rendererType,c.color.hex);d.enhanceFileFeatureLayer(e,{colour:[c.color.rgb_[0],c.color.rgb_[1],c.color.rgb_[2],255],nameField:c.primaryAttribute.dropDownValue,icon:f,datasetName:c.datasetName.inputValue,fields:e.fields.map(function(a){return a.name})}),g.loadLayer(e),I.close()}}]}]},{id:"csvFileAttrStep",content:[{id:"datasetName",type:o.SimpleInputBrick,config:{instructions:i18n.t("addDataset.help.csvDatasetName"),header:i18n.t("addDataset.datasetName")}},{id:"primaryAttribute",type:o.DropDownBrick,config:{instructions:i18n.t("addDataset.help.csvPrimaryAttribute"),header:i18n.t("addDataset.primaryAttribute")}},{id:"latLongAttribute",type:o.MultiBrick,config:{content:[{id:"latitude",type:o.DropDownBrick,config:{instructions:i18n.t("addDataset.help.csvLatitude"),header:i18n.t("addDataset.latitude")}},{id:"longitude",type:o.DropDownBrick,config:{instructions:i18n.t("addDataset.help.csvLongitude"),header:i18n.t("addDataset.longitude")}}]}},{id:"color",type:o.ColorPickerBrick,config:{instructions:i18n.t("addDataset.help.csvColour"),header:i18n.t("addDataset.colour")}},{id:"addDataset",type:o.ButtonBrick,config:{label:i18n.t("addDataset.addDatasetButton"),containerClass:"button-brick-container-main",buttonClass:"btn-primary"},on:[{eventName:o.ButtonBrick.event.CLICK,callback:function(b){var c,e,f=b.getData(),h=f.bricksData,i=f.stepData,j=i.csvData,k=i.csvHeaders,l=i.csvDelimeter,m=s("a_d_icon_circlePoint",h.color.hex);e=d.buildCsv(j,{latfield:h.latitude.dropDownValue,lonfield:h.longitude.dropDownValue,delimiter:l,fields:k}),e.then(function(a){c=a,d.enhanceFileFeatureLayer(c,{renderer:"circlePoint",colour:[h.color.rgb_[0],h.color.rgb_[1],h.color.rgb_[2],255],nameField:h.primaryAttribute.dropDownValue,icon:m,datasetName:h.datasetName.inputValue,fields:k}),g.loadLayer(c),I.close()},function(){v(b,null,{datasetName:a.mixin(H.csvError,{message:i18n.t("addDataset.error.messageCSVBroken")})})})}}]}]},{id:"shapefileFileAttrStep",content:[{id:"datasetName",type:o.SimpleInputBrick,config:{instructions:i18n.t("addDataset.help.shapefileDatasetName"),header:i18n.t("addDataset.datasetName")}},{id:"primaryAttribute",type:o.DropDownBrick,config:{instructions:i18n.t("addDataset.help.shapefilePrimaryAttribute"),header:i18n.t("addDataset.primaryAttribute")}},{id:"color",type:o.ColorPickerBrick,config:{instructions:i18n.t("addDataset.help.shapefileColour"),header:i18n.t("addDataset.colour")}},{id:"addDataset",type:o.ButtonBrick,config:{label:i18n.t("addDataset.addDatasetButton"),containerClass:"button-brick-container-main",buttonClass:"btn-primary"},on:[{eventName:o.ButtonBrick.event.CLICK,callback:function(a){var b=a.getData(),c=b.bricksData,e=b.stepData,f=s("a_d_icon_"+e.renderer._RAMP_rendererType,c.color.hex);d.enhanceFileFeatureLayer(e,{colour:[c.color.rgb_[0],c.color.rgb_[1],c.color.rgb_[2],255],nameField:c.primaryAttribute.dropDownValue,icon:f,datasetName:c.datasetName.inputValue,fields:e.fields.map(function(a){return a.name})}),g.loadLayer(e),I.close()}}]}]}]}]}}function q(){if(t.dfs(F,function(a){a.stepItem=null}),t.dfs(F,function(a,b){var c,d=b?b.level+1:1;a.level=d,c=new i(a),c.on(i.event.CURRENT_STEP_CHANGE,w),c.on(i.event.STATE_CHANGE,x),a.stepItem=c,K[a.id]=c,b&&b.stepItem.addChild(c)}),z.find(".add-dataset-content").empty().append(K.sourceTypeStep.node),K.sourceTypeStep.currentStep(1),!window.FileReader){var a=K.fileTypeStep.contentBricks.fileOrFileURL;a.fileNode.remove(),a.filePseudoNode.attr("disabled",!0),a.browseFilesContainer.attr({title:i18n.t("addDataset.error.ie9FileAPI")}).addClass("_tooltip")}j.tooltipster(B)}function r(a){var b,c,d,e,f=new RegExp(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/i),g=new RegExp(/^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/i);return b=a[0].filter(function(b,c){return a.every(function(a,b){return 0===b||f.test(a[c])})}),c=a[0].filter(function(b,c){return a.every(function(a,b){return 0===b||g.test(a[c])})}),b.length>1&&(b=b.filter(function(a){var b=a.toLowerCase();return-1!==b.indexOf("la")||-1!==b.indexOf("y")})),d=b[0]||null,c.length>1&&(m.remove(c,d),c=c.filter(function(a){var b=a.toLowerCase();return-1!==b.indexOf("lo")||-1!==b.indexOf("x")})),e=c[0]||null,{lat:d,"long":e}}function s(a,b){return"data:image/svg+xml;base64,"+j.b64EncodeUnicode(k.template.call(this,a,{colour:b},M))}function u(a,b){return window.setTimeout(function(){a._notifyStateChange(i.state.LOADING)},b)}function v(a,b,c){b&&window.clearTimeout(b),a._notifyStateChange(i.state.ERROR).displayBrickNotices(c)}function w(a){t.dfs(F,function(b){b.stepItem.currentStep(a.level,a.id)})}function x(a,b,c){b&&c&&(a={id:b.id,level:b.level,state:c}),t.dfs(F,function(b){b.stepItem.setState(a.level,a.id,a.state)})}function y(){K.sourceTypeStep.retreat()}var z,A,B,C,D,E,F,G,H,I,J={},K={},L=.5,M=JSON.parse(k.stringifyTemplate(b));return G={simpleAdvance:function(a,b,c){a.advance(b.selectedChoice,c)},simpleCancel:function(a,b){a.isCompleted()?a.retreat():a.clearStep()},serviceTypeStepGuess:function(a,b){var c=b.inputValue,d=a.contentBricks.serviceType,e="";d.isUserSelected()||(c.match(/ArcGIS\/rest\/services/gi)?e="featureServiceAttrStep":c.match(/wms/gi)&&(e="wmsServiceAttrStep"),d.setChoice(e))},fileTypeStepGuess:function(a,b){var c=b.inputValue,d=a.contentBricks.fileType,e="";d.isUserSelected()||d.isUserEntered||(c.endsWith(".csv")?e="csvFileAttrStep":c.endsWith(".json")?e="geojsonFileAttrStep":c.endsWith(".zip")&&(e="shapefileFileAttrStep"),d.setChoice(e))}},{init:function(){var a=new TimelineLite({paused:!0});z=$("#searchMapSectionBody"),A=z.find("#addDatasetToggle"),B=z.find("#add-dataset-section-container"),C=z.find("#layerList"),D=z.find(".layer-checkboxes:first"),E=z.find("#filterGlobalToggles"),p(),q(),a.set(B,{display:"block"}).set(C,{className:"+=scroll"},.01).set(E,{className:"+=scroll"},.01).to(E,L,{top:-60,ease:"easeOutCirc"}).to(C,L,{top:C.height()/3,ease:"easeOutCirc"},0).to(C,L/2,{autoAlpha:0,ease:"easeOutCirc"},L/2).set(D,{display:"none"}),I=c.registerPopup(A,"click",function(b){q(),a.eventCallback("onComplete",function(){B.find(":focusable:first").focus()}).play(),b.resolve()},{closeHandler:function(b){y(),a.eventCallback("onReverseComplete",function(){}).reverse(),b.resolve()},target:B,activeClass:"button-pressed",resetFocusOnClose:!0}),n.forEachEntry(h.DefaultRenderers,function(a){J[a]=i18n.t("presets.defaultRenderers."+a)})}}});