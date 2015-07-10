/*! ramp-theme-fgp-int 10-07-2015 14:25:04 : v. 5.5.0-9 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["dojo/_base/lang","dojo/topic","dojo/Deferred","dojo/text!./templates/datagrid_template.json","dojo/text!./templates/extended_datagrid_template.json","esri/tasks/query","ramp/graphicExtension","ramp/globalStorage","ramp/datagridClickHandler","ramp/map","ramp/eventManager","ramp/theme","ramp/layerLoader","ramp/filterEngine","utils/util","utils/array","utils/dictionary","utils/popupManager","utils/tmplHelper"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){"use strict";function t(){var a=C.rows().data();N={},$.each(a,function(a,b){if(b.last()){var c=b.last().layerId,d=g.getFDataOid(b.last().fData);c in N||(N[c]={}),N[c][d]=a}})}function u(a,b){("keypress"===a.type&&13===a.keyCode||"click"===a.type)&&b()}function v(a){var b,c=j.getVisibleFeatureLayers(),d=S.getDatagridMode(),e={};c=c.filter(function(a){return a.ramp.type!==h.layerType.Static}),d===H?RAMP.config.extendedDatagridExtentFilterEnabled?(e.extent=j.getMap().extent,c=c.filter(function(a){return a.id===S.getSelectedDatasetId()})):c=[RAMP.layerRegistry[S.getSelectedDatasetId()]]:e.extent=j.getMap().extent,e.gridMode=d,R=0,c.forEach(function(a){RAMP.data[a.id]&&(R+=RAMP.data[a.id].features.length)}),b=n.getFilteredData(c,e),b.then(function(b){y(b),S.initInvisibleLayerToggleCount(),S.updateNotice(),a&&a.resolve()})}function w(a){var b,c=g.getConfigForFData(a);if(S.getDatagridMode()===G)b=[g.getFDataTitle(a)];else{b=[];var d=c.datagrid.gridColumns;d.forEach(function(c){b.push(a.attributes[c.fieldName]||"")})}return b.push({layerId:c.id,layerName:c.displayName,fData:a}),b}function x(a){$(".pagination-record-number").text(String.format("{0} / {1}",a,R))}function y(a){if(void 0!==D){if(D.DataTable().clear(),Object.keys(a).isEmpty())return x(0),void D.DataTable().draw();var c,d=[],e=S.getDatagridMode();q.forEachEntry(a,function(a,b){c=b.map(function(a){return a[e]?a[e]:a[e]=w(a)}),d=d.concat(c)}),x(d.length),C.one("draw.dt",function(){b.publish(k.Datagrid.LOAD_DATA_GRID_END)}),D.dataTable().fnAddData(d)}}function z(a){var b,c=g.getFDataOid(a);return b=g.findGraphic(c,a.parent.layerId)}function A(a){var b=a.data(J),c=a.data(I),d=RAMP.data[b];return d.features[d.index[c]]}function B(){b.subscribe(k.FilterManager.LAYER_VISIBILITY_TOGGLED,function(a){if(P=!0,null!==a.id){var b=Q.indexOf(a.id);-1===b&&a.state?Q.push(a.id):-1===b||a.state||Q.splice(b,1)}}),b.subscribe(k.GUI.TAB_SELECTED,function(a){"datagrid"===a.tabName&&(P?(P=!1,v()):S.capturePanel(!0),S.adjustPanelWidth())}),b.subscribe(k.GUI.TAB_DESELECTED,function(a){"datagrid"===a.tabName&&b.publish(k.GUI.SUBPANEL_DOCK,{origin:"datagrid"})}),b.subscribe(k.Datagrid.LOAD_DATA_GRID,function(){S.getDatagridMode()!==H&&v()}),b.subscribe(k.LayerLoader.LAYER_UPDATED,function(a){a.layer.ramp.type===h.layerType.feature&&S.getDatagridMode()!==H&&v()}),b.subscribe(k.LayerLoader.REMOVE_LAYER,function(){S.updateNotice()}),b.subscribe(k.Map.ZOOM_END,function(){S.updateNotice()}),b.subscribe(k.GUI.SUBPANEL_CHANGE,function(a){"ex-datagrid"===a.origin&&a.isComplete&&S.adjustPanelWidth()})}var C,D,E,F,G="summary",H="full",I="feature-oid",J="layer-id",K=JSON.parse(s.stringifyTemplate(d)),L=JSON.parse(s.stringifyTemplate(e)),M=1,N={},O="asc",P=!0,Q=[],R=0,S=function(){function d(a){var b=-1,c=null;return{focusedButton:null,isActive:function(){return null!==c},isEqual:function(a,b){var d=c.parent.layerId,e=g.getFDataOid(c);return d===a&&e===b},navigateToRow:function(){if(-1!==b){var a=Math.floor(b/M);return C.page()!==a&&D.DataTable().page(a).draw(!1),ga.scrollTo(this.getNode(),300,{axis:"y",offset:{left:0,top:1.5*-this.getNode().height()}}),!0}return!1},setFeatureData:function(a){c=a,this.refresh()},refresh:function(){if(c){var a=c.parent.layerId,d=g.getFDataOid(c);b=a in N&&d in N[a]?N[a][d]:-1}else b=-1},getNode:function(){return $(String.format("#jqgrid tbody tr:nth-child({0})",b%M+1))},activate:function(){c&&(this.getNode().addClass(a),this.focusedButton&&(this.getNode().find(this.focusedButton).focus(),this.focusedButton=null))},deactivate:function(){c&&(this.getNode().removeClass(a),c=null)}}}function e(a,b,c,d){var e,f,h=c.last(),i=S.getDatagridMode();if(!h||!h.fData)return"";if(f=g.getConfigForFData(h.fData),i===G){if(!(i in h)){e=s.dataBuilder(h.fData,f);var j=f.templates.summary;tmpl.cache={},tmpl.templates=K,h[i]=tmpl(j,e)}return h[i]}if(!(i in h)){h[i]=[];var k=f.datagrid.gridColumns;tmpl.cache={},tmpl.templates=L,e=s.dataBuilder(h.fData,f),k.forEach(function(a,b){e.columnIdx=b;var c=tmpl(a.columnTemplate,e);"numeric"===a.sortType&&(c=Number(c)),h[i].push(c)})}return h[i][d.col]}function f(){var c,d,f={info:!1,columnDefs:[],autoWidth:!1,deferRender:!0,order:[],paging:!0,pagingType:"ramp",scrollX:!0,destroy:!0,language:i18n.t("datagrid.gridstrings",{returnObjectTrees:!0}),getTotalRecords:function(){return R}};pa===G?(M=RAMP.config.rowsPerPage,f=a.mixin(f,{columns:[{title:"Name",width:"300px",type:"string",className:"",render:e,orderable:!0}],dom:'<"jqgrid_table_wrapper summary-table"t><"status-line"p>',searching:!0,pageLength:M})):(S.getSelectedDatasetId()in RAMP.layerRegistry&&(d=RAMP.layerRegistry[S.getSelectedDatasetId()].ramp.config),d&&d.datagrid&&(M=d.datagrid.rowsPerPage),f=a.mixin(f,{columns:null===S.getSelectedDatasetId()?[{title:""}]:d.datagrid.gridColumns.map(function(a){return{title:a.title,width:a.width?a.width:"100px",type:a.sortType,className:a.alignment?"":"center",render:e,orderable:a.orderable}}),dom:'<"jqgrid_table_wrapper full-table"t><"datagrid-info-notice simple"><"status-line"p>',scrollY:"500px",searching:RAMP.config.extendedDatagridExtentFilterEnabled,pageLength:M})),D=aa.find("table");var g=!1;C=D.DataTable(f).on("page.dt",function(){b.publish(k.GUI.SUBPANEL_DOCK,{origin:"datagrid,ex-datagrid"}),g=!0}).on("order.dt",function(){b.publish(k.GUI.SUBPANEL_DOCK,{origin:"datagrid,ex-datagrid"})}).on("draw.dt",function(){t(),g?g=!1:S.activateRows(),S.adjustPanelWidth(),b.publish(k.Datagrid.DRAW_COMPLETE)}),fa=aa.find("#jqgrid_wrapper"),ga=aa.find(".jqgrid_table_wrapper"),ha=aa.find(".dataTables_scroll"),ia=ha.find(".dataTables_scrollBody"),ja=ha.find(".dataTables_scrollHead"),ea=aa.find(".datagrid-info-notice"),o.tooltipster(fa),pa!==G&&(fa.addClass("fadedOut"),ia.height(ga.height()-ja.height()),c=D.outerWidth(),S.adjustPanelWidth(),D.forceStyle({width:c+"px"}))}function l(){r.registerPopup(aa,"hoverIntent",function(){this.target.attr("title")&&(this.target.isOverflowed()?this.target.tooltipster({theme:".tooltipster-dark"}).tooltipster("show"):this.target.removeAttr("title"))},{handleSelector:".point-name, .category-name, .title-span",useAria:!1,timeout:500})}function m(){aa.on("click","button.details",function(){var a=$(this),b=a.data(J),c=a.data(I);if(ma.focusedButton="button.details",ma.isActive()&&ma.isEqual(b,c))i.onDetailDeselect(pa);else{var d=A(a),e=z(d);i.onDetailSelect(a,d,e,pa)}}),aa.on("click","button.zoomto",function(a){var b=$(this),c=A(b);na.focusedButton="button.zoomto",b.text()===i18n.t("datagrid.zoomTo")?u(a,function(){E=z(c),F=j.getMap().extent.clone(),i.onZoomTo(j.getMap().extent.clone(),c,E),o.subscribe(k.Datagrid.LOAD_DATA_GRID_END,function(){var a=$(String.format('button.zoomto[data-{0}="{1}"][data-{2}="{3}"]:eq(0)',I,g.getFDataOid(c),J,c.parent.layerId));a.text(i18n.t("datagrid.zoomBack"))})}):(i.onZoomBack(),o.subscribe(k.Datagrid.LOAD_DATA_GRID_END,function(){var a=$(String.format('button.zoomto[data-{0}="{1}"][data-{2}="{3}"]:eq(0)',I,g.getFDataOid(c),J,c.parent.layerId));a.text(i18n.t("datagrid.zoomTo")),a.focus()}),b.text(i18n.t("datagrid.zoomTo")))}),aa.on("click","button.global-button",function(){var a=$(this);"asc"===O?(a.addClass("state-expanded"),O="desc"):(a.removeClass("state-expanded"),O="asc"),D.DataTable().order([0,O]).draw()}),aa.on("click","button.expand",function(){var a=new c;pa=pa===G?H:G,a.then(function(){n()}),V(a),b.publish(k.GUI.DATAGRID_EXPAND)}),aa.on("change","#datasetSelector",function(){var a=$(this),b=a.find("option:selected"),c=b[0].value===ba;P(c,!0)}),aa.on("click","#datasetSelectorSubmitButton",function(){var a=ka.find("option:selected");ba=a.length>0?a[0].value:"",U()}),r.registerPopup(aa,"hover, focus",function(a){this.target.removeClass("wb-invisible"),a.resolve()},{handleSelector:"tr",targetSelector:".record-controls",closeHandler:function(a){this.target.addClass("wb-invisible"),a.resolve()},activeClass:"bg-very-light",useAria:!1}),r.registerPopup(aa,"hover, focus",function(a){a.resolve()},{handleSelector:".full-table #jqgrid tbody tr",activeClass:"bg-very-light",useAria:!1}),r.registerPopup(aa,"dblclick",function(a){var b=(this.handle.outerHeight()-this.target.height())/2;TweenLite.set(".expand-cell",{clearProps:"padding",className:"-=expand-cell"}),TweenLite.set(this.handle,{padding:b}),window.getSelection().removeAllRanges(),a.resolve()},{handleSelector:"td",targetSelector:".title-span",closeHandler:function(a){TweenLite.set(this.handle,{clearProps:"padding"}),TweenLite.set(this.handle,{className:"-=expand-cell"}),a.resolve()},activeClass:"expand-cell",useAria:!1}),r.registerPopup(aa,"click",function(a){this.target.toggle(),this.handle.find(".separator i").removeClass("fa-angle-down").addClass("fa-angle-up"),a.resolve()},{closeHandler:function(a){this.target.toggle(),this.handle.find(".separator i").removeClass("fa-angle-up").addClass("fa-angle-down"),a.resolve()},handleSelector:".info-notice-button",containerSelector:".datagrid-info-notice",targetSelector:".notice-details"})}function n(){var a,b;pa===G?ga.scroll(function(){a=ga.scrollTop(),b=ha.height()-ga.scrollTop()-ga.height(),0===a?(da.removeClass("scroll"),ea.removeClass("scroll")):(da.addClass("scroll"),ea.addClass("scroll")),0===b?ca.removeClass("scroll"):ca.addClass("scroll")}):ia.scroll(function(){a=ia.scrollTop(),0===a?ja.removeClass("scroll"):ja.addClass("scroll")})}function q(a){w(),ma.setFeatureData(a.fData),a.scroll&&S.activateRows()}function w(){ma.deactivate(),i.onZoomCancel()}function x(a){na.setFeatureData(a.fData)}function y(){na.deactivate()}function B(){b.subscribe(k.Datagrid.HIGHLIGHTROW_SHOW,q),b.subscribe(k.Datagrid.HIGHLIGHTROW_HIDE,w),b.subscribe(k.Datagrid.ZOOMLIGHTROW_SHOW,x),b.subscribe(k.Datagrid.ZOOMLIGHTROW_HIDE,y),b.subscribe(k.Datagrid.DRAW_COMPLETE,T)}function P(a,b){var c;b=b||!1,la.attr("disabled",a).text(a?b?i18n.t("datagrid.ex.datasetSelectorButtonLoaded"):i18n.t("datagrid.ex.datasetSelectorButtonLoading"):i18n.t("datagrid.ex.datasetSelectorButtonLoad")),c=RAMP.config.layers.feature.filter(function(a){return a.id===ba}),_&&c.length>0&&_.text(": "+c[0].displayName)}function T(){la.text(i18n.t("datagrid.ex.datasetSelectorButtonLoaded"))}function U(){var a,b=.2,d=new TimelineLite({paused:!0}),e=new TimelineLite({paused:!0}),g=new c;tmpl.cache={},tmpl.templates=K,a=tmpl("datagrid_manager_table_Template",{tableId:"jqgrid",tableCss:"display table-condensed table-simplify"}),ma.isActive()&&(b=.6,i.onDetailDeselect(pa)),d.set(fa,{className:"+=animated fadeOut"}),d.call(function(){d.pause(),fa.replaceWith(a),f(),P(!0),g.then(function(){e.set(fa,{className:"-=fadedOut"}),e.set(fa,{className:"+=animated fadeIn"}),e.set(fa,{className:"-=animated fadeIn"},"+=1"),e.play()}),v(g)},null,this,b+.05),d.play()}function V(b){var d,e,g={buttonLabel:i18n.t("datagrid.sort"),classAddition:"font-medium global-button"},j={buttons:g,tableId:"jqgrid",tableCss:"display table-condensed table-simplify"},k=.5,l=new TimelineLite({paused:!0}),m=new TimelineLite({paused:!0}),n=new c;if(tmpl.cache={},tmpl.templates=K,pa===G)e="datagrid_manager_Template",j.buttons.toggleTitle=i18n.t("datagrid.fullData"),_&&_.remove();else{e="datagrid_full_manager_Template",ba="";var o=RAMP.config.layers.feature.filter(function(a){var b=RAMP.map.getLayer(a.id);return b&&b.loaded?b.ramp.type!==h.layerType.Static&&b.visible:void 0});j.buttons=a.mixin(j.buttons,{datasets:o,toggleTitle:i18n.t("datagrid.ex.dataSummary"),txtDataset:i18n.t("datagrid.ex.dataset")}),_=$("#tabs1_2-lnk").append("<span>").find("span")}d=tmpl(e,j),i.onDetailDeselect(pa),i.onZoomCancel(),l.set(aa,{className:"+=animated fadeOut"}),D&&l.set(D,{clearProps:"width"}),l.call(function(){l.pause(),aa.empty().append(d),f(),da=aa.find("#datagridGlobalToggles"),ca=aa.find(".status-line"),ka=$("#datasetSelector"),la=$("#datasetSelectorSubmitButton"),P(!0),b.resolve(),l.resume(),n.then(function(){m.set(fa,{className:"-=fadedOut"}),m.set(fa,{className:"+=animated fadeIn"}),m.set(fa,{className:"-=animated fadeIn"},"+=1"),m.play()}),v(n)},null,this,k+.1),l.set(aa,{className:"-=fadeOut"}),l.set(aa,{className:"+=fadeIn"}),l.set(aa,{className:"-=animated fadeIn"},"+="+k),l.play()}function W(){ma.refresh(),na.refresh(),ma.navigateToRow()||na.navigateToRow(),na.activate(),ma.activate(),Y()}function X(){return"true"===oa.attr("aria-expanded")}function Y(a){var c="datagrid",d=ma.getNode().find(".record-controls");pa===H&&(c="ex-datagrid",d=ma.getNode().find(".button.details")),ma.isActive()&&(X()||a)&&b.publish(k.GUI.SUBPANEL_CAPTURE,{target:d,consumeOrigin:c,origin:c})}function Z(){pa===G?o.adjustWidthForSrollbar(ga,[da,ca,ea]):D.outerWidth()===fa.outerWidth()?ia.addClass("overflow-x-hidden"):ia.removeClass("overflow-x-hidden")}var _,aa,ba,ca,da,ea,fa,ga,ha,ia,ja,ka,la,ma=d("selected-row"),na=d("highlighted-row"),oa=$("details[data-panel-name=datagrid]"),pa=G,qa=!1;return{init:o.once(function(){var a=new c;a.then(function(){qa=!0,l(),m(),n(),B()}),aa=$("#"+RAMP.config.divNames.datagrid),V(a)}),getDatagridMode:function(){return pa},getSelectedDatasetId:function(){if(ba)ka.find('option[value="'+ba+'"]').prop("selected",!0);else if(ka.find("option:selected").length>0)ba=ka.find("option:selected")[0].value;else{var a=p.find(RAMP.config.layers.feature,function(a){var b=RAMP.map.getLayer(a.id);return b?b.visible&&b.ramp.type!==h.layerType.Static&&"error"!==b.ramp.load.state:!1});ba=null===a?null:a.id}return ba},isReady:function(){return qa},adjustPanelWidth:Z,activateRows:W,capturePanel:Y,updateNotice:function(){var a,b={layers:null},c=j.getInvisibleLayers().filter(function(a){return a.ramp&&a.ramp.type===h.layerType.feature});this.isReady()&&(tmpl.cache={},tmpl.templates=K,pa!==H&&c.length>0&&(b.layers=c.map(function(a){return a.ramp.config}),Q.length>0&&(a=tmpl("datagrid_info_notice",b))),a?(ea.empty().append(a),aa.addClass("notice")):(ea.empty(),aa.removeClass("notice")))},initInvisibleLayerToggleCount:o.once(function(){Q=j.getInvisibleLayers().filter(function(a){return a.ramp&&a.ramp.type===h.layerType.feature&&a.ramp.config.settings.visible}).map(function(a){return a.ramp.config.id})})}}();return{init:function(){B(),S.init()}}});