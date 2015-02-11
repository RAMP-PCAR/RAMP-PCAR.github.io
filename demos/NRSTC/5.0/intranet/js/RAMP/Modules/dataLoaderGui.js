/*! ramp-theme-intranet 11-02-2015 19:05:31 : v. 5.0.0 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["dojo/_base/lang","dojo/Deferred","dojo/text!./templates/filter_manager_template.json","utils/PopupManager","ramp/dataLoader","ramp/theme","ramp/map","ramp/layerLoader","ramp/globalStorage","utils/util","utils/tmplHelper","utils/tmplUtil","utils/array","utils/dictionary"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){"use strict";function o(a,b){a.empty(),n.forEachEntry(b,function(b,c){a.append($("<option></option>").attr("value",b).text(c))})}function p(a){var b,c={id:h.nextId(),displayName:a.data.layerName,nameField:a.data.fields[parseInt(a.primary)],datagrid:e.createDatagridConfig(a.data.fields),symbology:e.createSymbologyConfig(a.data.renderer,a.data.legendLookup),url:a.data.layerUrl};c=i.applyFeatureDefaults(c),b=g.makeFeatureLayer(c,!0),RAMP.config.layers.feature.push(c),h.loadLayer(b),w.close()}function q(a){var b,c,d;d=m.find(a.data.layers,function(b){return b.name===a.layerName}),b={id:h.nextId(),displayName:d.desc,format:"png",layerName:a.layerName,imageUrl:"assets/images/wms.png",url:a.url,legendMimeType:"image/jpeg"},d.queryable&&(b.featureInfo={parser:"stringParse",mimeType:"text/plain"}),b=i.applyWMSDefaults(b),c=g.makeWmsLayer(b,!0),RAMP.config.layers.wms.push(b),h.loadLayer(c),w.close()}function r(a,b){return tmpl.cache={},tmpl.templates=c,b=b||{},b.fn=l,tmpl(a,b)}function s(a){var b,c=j.hexToRgb(a.colour),d=r("a_d_icon_circlePoint",a);b=e.buildCsv(a.data,{latfield:a.lat,lonfield:a.lon,delimiter:a.delimiter,fields:a.fields}),b.then(function(b){var f=b;e.enhanceFileFeatureLayer(f,{renderer:"circlePoint",colour:[c.r,c.g,c.b,255],nameField:a.primary,icon:d,datasetName:a.datasetName,fields:a.fields}),h.loadLayer(f),w.close()})}function t(a){var b=j.hexToRgb(a.colour),c=r("a_d_icon_"+a.featureLayer.renderer._RAMP_rendererType,a);e.enhanceFileFeatureLayer(a.featureLayer,{colour:[b.r,b.g,b.b,255],nameField:a.primary,icon:c,datasetName:a.datasetName}),h.loadLayer(a.featureLayer),w.close()}function u(a){var b=j.hexToRgb(a.colour),c=r("a_d_icon_"+a.featureLayer.renderer._RAMP_rendererType,a);e.enhanceFileFeatureLayer(a.featureLayer,{colour:[b.r,b.g,b.b,255],nameField:a.primary,icon:c,datasetName:a.datasetName}),h.loadLayer(a.featureLayer),w.close()}function v(){var a;tmpl.cache={},tmpl.templates=c,a=tmpl("add_dataset_content_template",{}),x.find(".add-dataset-content").replaceWith(a),x.find("input.color").each(function(a,b){var c=$(b),d=c.parents(".color-picker-container:first").find("> .color-picker-swatch");b=new jscolor.color(b,{pickerPosition:"top",styleElement:c.attr("id")+"Swatch"}),b.fromString((new RColor).get(!0).slice(1)),d.on("click",function(){b.showPicker()})}),j.styleBrowseFilesButton(x.find(".browse-files")),y.loadServiceStep=function(){function a(){""===i||h||g||(i.match(/ArcGIS\/rest\/services/gi)?(d.removeClass("button-pressed").filter("button[data-option='option-feature']").addClass("button-pressed"),h="option-feature"):i.match(/wms/gi)),f.toggleClass("disabled",!h||""===i),f.attr("disabled",!h||""===i),""!==i||g||(h=null,d.removeClass("button-pressed"))}var b=x.find("#loadServiceStep"),c=b.find(".step-content"),d=c.find(".choice-group .btn-option"),e=c.find("#serviceURLinput"),f=c.find("#serviceURLinputSubmit"),g=!1,h=null,i="";return e.on("input",function(b){i=$(b.target).val(),a()}),{setChoice:function(b){h=b,g=!0,a()},getServiceType:function(){return h},getUrl:function(){return i}}}(),y.loadFileStep=function(){function a(){var a=o||(n?n.name:null)||"";l||(a.endsWith(".csv")?(m="option-csv",e.removeClass("button-pressed").filter("button[data-option='option-csv']").addClass("button-pressed")):a.endsWith(".json")?(m="option-geojson",e.removeClass("button-pressed").filter("button[data-option='option-geojson']").addClass("button-pressed")):(m=null,e.removeClass("button-pressed"))),h.toggleClass("disabled",!m||!n&&""===o),h.attr("disabled",!m||!n&&""===o),""!==o||n||l||(m=null,e.removeClass("button-pressed"))}function b(a){a.wrap("<form>").closest("form").get(0).reset(),a.unwrap()}var c=x.find("#loadFileStep"),d=c.find(".step-content"),e=d.find(".choice-group .btn-option"),g=d.find("#fileOrURLinput"),h=d.find("#fileOrURLinputSubmit"),i=d.find(".browse-files"),j=d.find(".browse-files input[type='file']"),k=d.find("#fileOrURLpseudoBrowse"),l=!1,m=null,n=null,o="";return g.on("input",function(c){o=$(c.target).val(),n=null,b(j),k.removeClass("selected"),a()}),j.on("change",function(b){n=b.target.files[0],g.val(n.name),o="",k.addClass("selected"),a()}),window.FileReader||(j.remove(),k.attr("disabled",!0),i.attr({title:"You have IE9"}).addClass("_tooltip"),f.tooltipster(i.parent())),{setChoice:function(b){m=b,l=!0,a()},getFileType:function(){return m},getFileUrl:function(){return o},getFile:function(){return n}}}()}var w,x=$("#searchMapSectionBody"),y={loadServiceStep:{typeUserSelected:!1,serviceType:null,url:""},loadFileStep:{typeUserSelected:!1,fileType:null,url:"",file:null}},z={},A=.4;return c=JSON.parse(k.stringifyTemplate(c)),d.registerPopup(x,"click",function(a){var b=this.handle.parents(".step:first"),c=b.attr("id"),d=this.handle.parents(".choice-group:first");d.find(".button-pressed").removeClass("button-pressed"),y[c].setChoice(this.handle.data("option")),a.resolve()},{containerSelector:".choice-group:first",handleSelector:".btn-option:not(.button-pressed):not(.btn-action)",activeClass:"button-pressed",openOnly:!0,useAria:!1}),d.registerPopup(x,"click",function(a){function b(){var a;for(k=B.find("> .step-content"),a=B;a.length;)I.push(a.parents(".step-options-container:first")),a=a.find("> .step-options-container > .step-options > .active-option:first");H=H.concat(r.find(".step-options-container:visible").toArray())}function c(){var a=A/2/I.length;B.addClass("active-option"),K.addLabel("advanceStart"),I.forEach(function(b,c){var d,e,f;b=$(b),d=b.find("> .options-bg"),e=b.find("> .step-options"),f=e.find("> .active-option:first > .step-content"),TweenLite.set(b,{display:"block"}),l=f.position().left,K.to(d,0,{height:f.outerHeight()},"advanceStart+="+a*c).set(e,{left:0},"advanceStart+="+a*c).set(e.find("> .active-option"),{display:"inline-block"},"advanceStart+="+a*c).set(e.find("> .step:not(.active-option)"),{display:"none"},"advanceStart+="+a*c).to(b,0,{height:f.outerHeight(),ease:"easeOutCirc"},"advanceStart+="+a*c).fromTo(b,A,{top:-b.height()},{top:0,ease:"easeOutCirc"},"advanceStart+="+a*c).set(b,{height:"auto"},"advanceStart+="+a*c),J=b})}function d(){var a=A/2/H.length;n=H.length>0?"-=0.1":"",H.forEach(function(b,c){var d,e;b=$(b),d=b.find("> .step-options > .step.active-option"),e=d.find("> .step-content"),K.to(b,A,{top:-e.outerHeight(),ease:"easeOutCirc"},a*(H.length-c-1)).set(b,{display:"none"})})}function f(){var a;TweenLite.set(w.find("> .step"),{display:"inline-block"}),TweenLite.set(w,{left:-w.find("> .active-option").position().left}),a=k.length>0?k.position().left:-1,-1!==a&&a!==w.position().left&&K.addLabel("leftShiftStart").to(v,A,{height:k.outerHeight(),ease:"easeOutCirc"},"leftShiftStart"+n).to(w,A,{left:-a,ease:"easeOutCirc"},"leftShiftStart"+n).set(w.find("> .step"),{className:"-=active-option"}).set(B,{className:"+=active-option"}).set(w,{left:0}).set(w.find("> .step").not(B),{display:"none"})}function g(){b(),r.is(":hidden")?c():(d(),f(),m.remove(I,0),c()),K.set(E,{height:"auto",className:"-=current-step"},0).set(J,{className:"+=current-step"},0)}function h(){K.set(C,{className:"-=button-pressed"},0).play(),a.resolve()}function i(a){var b;switch(a){case"serviceURLcancel":L.init(),L.cancelLoadUrlStep();break;case"serviceURL":var c,d,f=y[G].getServiceType();switch(B=w.find("> ."+f+":first"),c=B.find("> .step-content"),L.init(),L.beforeLoadUrlStep(),f){case"option-feature":b=e.getFeatureLayer(y[G].getUrl()),b.then(function(a){d=a;var b=e.getFeatureLayerLegend(y[G].getUrl());b.then(function(a){d.legendLookup=a,o(c.find("#featurePrimaryAttrlist"),d.fields),c.find(".btn-add-dataset").on("click",function(){p({data:d,primary:c.find("#featurePrimaryAttrlist").val()})}),L.successLoadUrlStep()},function(){L.errorLoadUrlStep()})},function(){L.errorLoadUrlStep()});break;case"option-wms":b=e.getWmsLayerList(y[G].getUrl()),b.then(function(a){var b={};d=a,a.layers.forEach(function(a){b[a.name]=a.desc}),o(c.find("#wmsLayerNameAttrlist"),b),c.find(".btn-add-dataset").on("click",function(){q({data:d,url:y[G].getUrl(),layerName:c.find("#wmsLayerNameAttrlist").val()})}),L.successLoadUrlStep()},function(){L.errorLoadUrlStep()})}break;case"fileOrURLcancel":L.init(),L.cancelLoadUrlStep();break;case"fileOrURL":var g=y[G].getFile()?y[G].getFile().name:y[G].getFileUrl().split("/").pop();L.init(),L.beforeLoadUrlStep(),b=e.loadDataSet({url:y[G].getFileUrl(),file:y[G].getFile(),type:"option-shapefile"===y[G].getFileType()?"binary":"text"}),b.then(function(a){var b,c,d,f=y[G].getFileType(),h={},i=a;switch(B=w.find("> ."+f+":first"),b=B.find("> .step-content"),f){case"option-geojson":c=e.buildGeoJson(i),c.then(function(a){d=a,d.fields.forEach(function(a){h[a.name]=a.name}),b.find("#geojsonDatasetNameAttrtextField").val(g),o(b.find("#geojsonPrimaryAttrlist"),h),b.find(".btn-add-dataset").on("click",function(){t({data:i,featureLayer:d,datasetName:b.find("#geojsonDatasetNameAttrtextField").val(),primary:b.find("#geojsonPrimaryAttrlist").val(),colour:b.find("#geojsonColourAttrpicker").val()})})});break;case"option-csv":var k,l=j.detectDelimiter(i),m={};k=e.csvPeek(i,l),k[0].forEach(function(a){m[a]=a}),b.find("#csvDatasetNameAttrtextField").val(g),o(b.find("#csvPrimaryAttrlist"),m),o(b.find("#csvLatitudeAttrlist"),m),o(b.find("#csvLongitudeAttrlist"),m),o(b.find("#csvStyleAttrlist"),z),b.find(".btn-add-dataset").on("click",function(){s({data:i,fields:k[0],delimiter:l,datasetName:b.find("#csvDatasetNameAttrtextField").val(),primary:b.find("#csvPrimaryAttrlist").val(),lat:b.find("#csvLatitudeAttrlist").val(),lon:b.find("#csvLongitudeAttrlist").val(),colour:b.find("#csvColourAttrpicker").val()})});break;case"option-shapefile":c=e.buildShapefile(i),c.then(function(a){d=a,d.fields.forEach(function(a){h[a.name]=a.name}),b.find("#shapefileDatasetNameAttrtextField").val(g),o(b.find("#shapefilePrimaryAttrlist"),h),b.find(".btn-add-dataset").on("click",function(){u({data:i,featureLayer:d,datasetName:b.find("#shapefileDatasetNameAttrtextField").val(),primary:b.find("#shapefilePrimaryAttrlist").val(),colour:b.find("#shapefileColourAttrpicker").val()})})})}L.successLoadUrlStep()},function(){L.errorLoadUrlStep()})}}var k,l,n,r=this.target,v=r.find("> .options-bg"),w=r.find("> .step-options"),B=w.find("> ."+this.handle.data("option")),C=this.handle.parent().find(".button-pressed"),D=r.prev(),E=x.find(".current-step"),F=this.handle.parents(".step:first"),G=F.attr("id"),H=[],I=[],J=r,K=new TimelineLite({paused:!0}),L=function(){function a(){E.removeClass("error"),D.removeClass("loaded error"),b.removeClass("has-feedback has-success has-error"),D.find(".btn-action").removeClass("button-pressed")}var b,c,d;return{init:function(){b=D.find(".input-group"),c=b.find(".load-url-control"),d=b.find(".input-group-btn:not(.browse-files)")},beforeLoadUrlStep:function(){E.removeClass("error").addClass("loading"),D.removeClass("error"),b.removeClass("has-feedback has-success has-error")},successLoadUrlStep:function(){K.call(function(){c.attr("readonly",!0),E.removeClass("loading"),D.addClass("loaded"),b.addClass("has-feedback has-success"),D.find(".btn-option:not(.btn-action), .browse-button").attr("disabled",!0).end().find("input[type='file']").attr("disabled",!0),D.find(".glyphicon").css({right:d.width()})},[],null),g(),h()},errorLoadUrlStep:function(){K.call(function(){E.addClass("error").removeClass("loading"),D.addClass("error"),b.addClass("has-feedback has-error"),D.find(".glyphicon").css({right:d.width()})},[],null),h(),D.on("click",".btn-option:not(.btn-action)",function(){D.off("click",".btn-option:not(.btn-action)"),a()}),c.on("input",function(){c.off("input"),a()}),D.on("click","input[type='file']",function(){D.off("click","input[type='file']"),a()})},cancelLoadUrlStep:function(){H.push(r),J=r.parents(".step-options-container:first"),g(),K.call(function(){c.attr("readonly",!1),a(),D.find(".btn-option:not(.btn-action), .browse-button").attr("disabled",!1).end().find("input[type='file']").attr("disabled",!1),r.find(".active-option").removeClass("active-option").end().find(".button-pressed").removeClass("button-pressed")},[],null,0),h()}}}();this.handle.data("action")?i(this.handle.data("action")):(g(),h())},{containerSelector:".step:first",handleSelector:".btn-action:not(.button-pressed)",targetSelector:"> .step-options-container",activeClass:"button-pressed",openOnly:!0}),{init:function(){v(),w=d.registerPopup(x.find("#addDatasetToggle"),"click",function(a){TweenLite.to(this.target,A/2,{autoAlpha:1,ease:"easeOutCirc",onComplete:function(){this.target.focus()}}),a.resolve()},{closeHandler:function(a){TweenLite.to(this.target,A/2,{autoAlpha:0,ease:"easeInCirc"}),v(),a.resolve()},target:x.find("#add-dataset-section-container"),activeClass:"button-pressed",resetFocusOnClose:!0}),n.forEachEntry(i.DefaultRenderers,function(a){z[a]=i18n.t("presets.defaultRenderers."+a)})}}});