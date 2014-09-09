/*! ramp-gis-viewer 09-09-2014 13:44:31 : v. 2.0.0 
 * 
 * RAMP GIS viewer - Bobcat; Sample of an implementation of RAMP 
 **/
define(["dojo/_base/declare","dojo/_base/lang","dojo/query","dojo/_base/array","dojo/dom-class","dojo/dom-attr","dojo/dom-construct","dojo/topic","dojo/on","dojo/Deferred","dojo/text!./templates/datagrid_template.json","dojo/text!./templates/extended_datagrid_template.json","esri/layers/FeatureLayer","esri/tasks/query","ramp/ramp","ramp/graphicExtension","ramp/globalStorage","ramp/datagridClickHandler","ramp/map","ramp/eventManager","themes/theme","utils/util","utils/array","utils/dictionary","utils/popupManager","utils/tmplHelper"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z){"use strict";function A(){var a=L.rows().data();V={},$.each(a,function(a,b){var c=b.last().featureUrl,d=p.getOid(b.last().feature);c in V||(V[c]={}),V[c][d]=a})}function B(a){return o.getLayerConfig(a).datagrid}function C(a,b){("keypress"===a.type&&13===a.keyCode||"click"===a.type)&&b()}function D(a){var b={},c=s.getVisibleFeatureLayers(),e=Z.getDatagridMode(),f=new n;c=d.filter(c,function(a){return a.ramp.type!==q.layerType.Static}),e===Q?(c=d.filter(c,function(a){return a.url===Z.getSelectedDatasetUrl()}),J.datagrid.extendedExtentFilterEnabled?f.geometry=s.getMap().extent:f.where="1 = 1"):f.geometry=s.getMap().extent,f.outFields=["*"],Y=0,d.forEach(c,function(a){Y+=a.graphics.length});var g=d.map(c,function(a){return a.queryFeatures(f).then(function(a){if(a.features.length>0){var c=a.features[0].getLayer();b[c.url]=a.features}})});v.afterAll(g,function(){G(b),a&&a.resolve()})}function E(a){var b,c=a.getLayer().url;if(Z.getDatagridMode()===P)b=[a.attributes[o.getLayerConfig(c).nameField]];else{b=[];var e=B(c).gridColumns;d.forEach(e,function(c){b.push(a.attributes[c.fieldName]||"")})}return b.push({featureUrl:c,layerName:o.getLayerConfig(c).displayName,feature:a}),b}function F(a){$(".pagination-record-number").text(String.format("{0}/{1} {2}",a,Y,i18n.t("datagrid.gridstrings.oPaginate.sRecords")))}function G(a){if(void 0!==M){if(M.DataTable().clear(),Object.keys(a).isEmpty())return F(0),void M.DataTable().draw();var b=[];x.forEachEntry(a,function(a,c){b=b.concat(d.map(c,function(a){return a[Z.getDatagridMode()]?a[Z.getDatagridMode()]:a[Z.getDatagridMode()]=E(a)}))}),F(b.length),L.one("draw.dt",function(){h.publish(t.Datagrid.EXTENT_FILTER_END)}),M.dataTable().fnAddData(b)}}function H(a){var b=a.data(S),c=parseInt(a.data(R)),d=s.getFeatureLayer(b),e=w.binaryFind(d.graphics,function(a){return p.getOid(a)-c});return e}function I(){h.subscribe(t.FilterManager.LAYER_VISIBILITY_TOGGLED,function(){X=!0}),h.subscribe(t.GUI.TAB_SELECTED,function(a){"datagrid"===a.tabName&&(X?(X=!1,D()):Z.capturePanel(),Z.adjustPanelWidth())}),h.subscribe(t.GUI.TAB_DESELECTED,function(a){"datagrid"===a.tabName&&h.publish(t.GUI.SUBPANEL_DOCK,{origin:"datagrid"})}),h.subscribe(t.Datagrid.APPLY_EXTENT_FILTER,function(){Z.getDatagridMode()!==Q&&D()}),h.subscribe(t.GUI.SUBPANEL_CHANGE,function(a){"ex-datagrid"===a.origin&&a.isComplete&&Z.adjustPanelWidth()})}var J,K,L,M,N,O,P="summary",Q="full",R="feature-oid",S="feature-url",T=JSON.parse(z.stringifyTemplate(k)),U=JSON.parse(z.stringifyTemplate(l)),V={},W="asc",X=!0,Y=0,Z=function(){function a(a){var b=-1,c=null;return{focusedButton:null,isActive:function(){return null!==c},isEqual:function(a,b){var d=c.getLayer().url,e=p.getOid(c);return d===a&&e===b},navigateToRow:function(){if(-1!==b){var a=Math.floor(b/K.rowsPerPage);return L.page()!==a&&M.DataTable().page(a).draw(!1),gb.scrollTo(this.getNode(),300,{axis:"y",offset:{left:0,top:1.5*-this.getNode().height()}}),!0}return!1},setGraphic:function(a){c=a,this.refresh()},refresh:function(){if(c){var a=c.getLayer().url,d=p.getOid(c);b=a in V&&d in V[a]?V[a][d]:-1}else b=-1},getNode:function(){return $(String.format("#jqgrid tbody tr:nth-child({0})",b%K.rowsPerPage+1))},activate:function(){c&&(this.getNode().addClass(a),this.focusedButton&&(this.getNode().find(this.focusedButton).focus(),this.focusedButton=null))},deactivate:function(){c&&(this.getNode().removeClass(a),c=null)}}}function c(){var a={buttonLabel:i18n.t("datagrid.sort"),classAddition:"font-medium global-button",someAttribute:""};return a}function e(a,b,c,e){var f,g=c.last(),h=Z.getDatagridMode();if(h===P){if(v.isUndefined(g[h])){var i=B(g.featureUrl).summaryRowTemplate;tmpl.cache={},tmpl.templates=T,f=z.dataBuilder(g.feature,g.featureUrl),g[h]=tmpl(i,f)}return g[h]}if(v.isUndefined(g[h])){g[h]=[];var j=B(g.featureUrl).gridColumns;tmpl.cache={},tmpl.templates=U,f=z.dataBuilder(g.feature,g.featureUrl),d.forEach(j,function(a,b){f.columnIdx=b;var c=tmpl(a.columnTemplate,f);"numeric"===a.sortType&&(c=Number(c)),g[h].push(c)})}return g[h][e.col]}function f(){var a,c={info:!1,columnDefs:[],autoWidth:!1,deferRender:!0,paging:!0,pagingType:"ramp",scrollX:!0,destroy:!0,pageLength:K.rowsPerPage,language:i18n.t("datagrid.gridstrings",{returnObjectTrees:!0}),getTotalRecords:function(){return Y}};c=ob===P?b.mixin(c,{columns:[{title:"Name",width:"300px",type:"string",className:"",render:e,orderable:!0}],dom:'<"jqgrid_table_wrapper summary-table"t><"status-line"p>',searching:!0}):b.mixin(c,{columns:null===Z.getSelectedDatasetUrl()?[{title:""}]:d.map(B(Z.getSelectedDatasetUrl()).gridColumns,function(a){return{title:a.title,width:a.width?a.width:"100px",type:a.sortType,className:a.alignment?"":"center",render:e}}),dom:'<"jqgrid_table_wrapper full-table"t><"status-line"p>',scrollY:"500px",searching:J.datagrid.extendedExtentFilterEnabled}),M=bb.find("table");var f=!1;L=M.DataTable(c).on("page.dt",function(){h.publish(t.GUI.SUBPANEL_DOCK,{origin:"datagrid,ex-datagrid"}),f=!0}).on("order.dt",function(){h.publish(t.GUI.SUBPANEL_DOCK,{origin:"datagrid,ex-datagrid"})}).on("draw.dt",function(){A(),f?f=!1:Z.activateRows(),Z.adjustPanelWidth(),h.publish(t.Datagrid.DRAW_COMPLETE)}),fb=bb.find("#jqgrid_wrapper"),gb=bb.find(".jqgrid_table_wrapper"),hb=bb.find(".dataTables_scroll"),ib=hb.find(".dataTables_scrollBody"),jb=hb.find(".dataTables_scrollHead"),u.tooltipster(fb),ob!==P&&(ib.height(gb.height()-jb.height()),a=M.outerWidth(),Z.adjustPanelWidth(),M.forceStyle({width:a+"px"}))}function g(){y.registerPopup(bb,"hoverIntent",function(){this.target.attr("title")&&(this.target.isOverflowed()?this.target.tooltipster({theme:".tooltipster-dark"}).tooltipster("show"):this.target.removeAttr("title"))},{handleSelector:".point-name, .category-name, .title-span",useAria:!1,timeout:500})}function i(){bb.on("click","button.details",function(){var a=$(this),b=a.data(S),c=a.data(R);if(mb.focusedButton="button.details",mb.isActive()&&mb.isEqual(b,c))r.onDetailDeselect(ob);else{var d=H(a);r.onDetailSelect(a,d,ob)}}),bb.on("click","button.zoomto",function(a){var b=$(this);nb.focusedButton="button.zoomto",b.text()===i18n.t("datagrid.zoomTo")?C(a,function(){N=H(b),O=s.getMap().extent.clone(),r.onZoomTo(s.getMap().extent.clone(),N),v.subscribeOnce(t.Datagrid.EXTENT_FILTER_END,function(){var a=$(String.format("button.zoomto[data-{0}='{1}'][data-{2}='{3}']:eq(0)",R,p.getOid(N),S,N.getLayer().url));a.text(i18n.t("datagrid.zoomBack"))})}):(r.onZoomBack(N),b.text(i18n.t("datagrid.zoomTo")),v.subscribeOnce(t.Datagrid.EXTENT_FILTER_END,function(){var a=$(String.format("button.zoomto[data-{0}='{1}'][data-{2}='{3}']:eq(0)",R,p.getOid(N),S,N.getLayer().url));a.focus()}))}),bb.on("click","button.global-button",function(){var a=$(this);"asc"===W?(a.addClass("state-expanded"),W="desc"):(a.removeClass("state-expanded"),W="asc"),M.DataTable().order([0,W]).draw()}),bb.on("click","button.expand",function(){var a=new j;ob=ob===P?Q:P,a.then(function(){k()}),G(a),h.publish(t.GUI.DATAGRID_EXPAND)}),bb.on("change","#datasetSelector",function(){var a=$(this),b=a.find("option:selected"),c=b[0].value===cb;E(c)}),bb.on("click","#datasetSelectorSubmitButton",function(){var a=kb.find("option:selected");cb=a.length>0?a[0].value:"",F()}),y.registerPopup(bb,"hover, focus",function(a){this.target.removeClass("wb-invisible"),a.resolve()},{handleSelector:"tr",targetSelector:".record-controls",closeHandler:function(a){this.target.addClass("wb-invisible"),a.resolve()},activeClass:"background-light",useAria:!1}),y.registerPopup(bb,"hover, focus",function(a){a.resolve()},{handleSelector:".full-table tr",activeClass:"background-light",useAria:!1}),y.registerPopup(bb,"dblclick",function(a){var b=(this.handle.outerHeight()-this.target.height())/2;TweenLite.set(".expand-cell",{clearProps:"padding",className:"-=expand-cell"}),TweenLite.set(this.handle,{padding:b}),window.getSelection().removeAllRanges(),a.resolve()},{handleSelector:"td",targetSelector:".title-span",closeHandler:function(a){TweenLite.set(this.handle,{clearProps:"padding"}),TweenLite.set(this.handle,{className:"-=expand-cell"}),a.resolve()},activeClass:"expand-cell",useAria:!1})}function k(){var a,b;ob===P?gb.scroll(function(){a=gb.scrollTop(),b=hb.height()-gb.scrollTop()-gb.height(),0===a?eb.removeClass("scroll"):eb.addClass("scroll"),0===b?db.removeClass("scroll"):db.addClass("scroll")}):ib.scroll(function(){a=ib.scrollTop(),0===a?jb.removeClass("scroll"):jb.addClass("scroll")})}function l(a){m(),mb.setGraphic(a.graphic),a.scroll&&Z.activateRows()}function m(){mb.deactivate(),r.onZoomCancel()}function n(a){nb.setGraphic(a.graphic)}function o(){nb.deactivate()}function x(){h.subscribe(t.Datagrid.HIGHLIGHTROW_SHOW,l),h.subscribe(t.Datagrid.HIGHLIGHTROW_HIDE,m),h.subscribe(t.Datagrid.ZOOMLIGHTROW_SHOW,n),h.subscribe(t.Datagrid.ZOOMLIGHTROW_HIDE,o)}function E(a){var b;lb.attr("disabled",a).text(i18n.t(a?"datagrid.ex.datasetSelectorButtonLoaded":"datagrid.ex.datasetSelectorButtonLoad")),b=d.filter(q.config.featureLayers,function(a){return a.url===cb}),ab&&b.length>0&&ab.text(": "+b[0].displayName)}function F(){var a,b=.2,c=new TimelineLite({paused:!0}),d=new j;tmpl.cache={},tmpl.templates=T,a=tmpl("datagrid_manager_table_Template",{tableId:"jqgrid",tableCss:"display table-condensed table-simplify animated fadeIn"}),mb.isActive()&&(b=.6,r.onDetailDeselect(ob)),c.set(fb,{className:"+=animated fadeOut"}),c.call(function(){c.pause(),fb.replaceWith(a),f(),E(!0),d.then(function(){c.set(M,{className:"-=animated fadeIn"},"+="+b),c.resume()}),D(d)},null,this,b+.05),c.set(fb,{className:"-=fadeOut"}),c.set(fb,{className:"+=fadeIn"}),c.set(fb,{className:"-=animated fadeIn"},"+="+b),c.play()}function G(a){var e,g,h=c(),i={buttons:h,tableId:"jqgrid",tableCss:"display table-condensed table-simplify"},k=.5,l=new TimelineLite({paused:!0}),m=new j;if(tmpl.cache={},tmpl.templates=T,ob===P)g="datagrid_manager_Template",i.buttons.toggleTitle=i18n.t("datagrid.fullData"),ab&&ab.remove();else{g="datagrid_full_manager_Template";var n=d.filter(q.config.featureLayers,function(a){var b=q.map.getLayer(a.id);return b.ramp.type!==q.layerType.Static&&b.visible});i.buttons=b.mixin(i.buttons,{datasets:n,toggleTitle:i18n.t("datagrid.ex.dataSummary"),txtDataset:i18n.t("datagrid.ex.dataset")}),ab=$("#tabs1_2-link").append("<span>").find("span")}e=tmpl(g,i),r.onDetailDeselect(ob),l.set(bb,{className:"+=animated fadeOut"}),M&&l.set(M,{clearProps:"width"}),l.call(function(){l.pause(),bb.empty().append(e),f(),eb=bb.find("#datagridGlobalToggles"),db=bb.find(".status-line"),kb=$("#datasetSelector"),lb=$("#datasetSelectorSubmitButton"),E(!0),a.resolve(),m.then(function(){l.resume()}),D(m)},null,this,k+.1),l.set(bb,{className:"-=fadeOut"}),l.set(bb,{className:"+=fadeIn"}),l.set(bb,{className:"-=animated fadeIn"},"+="+k),l.play()}function I(){mb.refresh(),nb.refresh(),mb.navigateToRow()||nb.navigateToRow(),nb.activate(),mb.activate(),X()}function X(){var a="datagrid",b=mb.getNode().find(".record-controls");ob===Q&&(a="ex-datagrid",b=mb.getNode().find(".button.details")),mb.isActive()&&h.publish(t.GUI.SUBPANEL_CAPTURE,{target:b,consumeOrigin:a,origin:a})}function _(){ob===P?v.adjustWidthForSrollbar(gb,[eb,db]):M.outerWidth()===fb.outerWidth()?ib.addClass("overflow-x-hidden"):ib.removeClass("overflow-x-hidden")}var ab,bb,cb,db,eb,fb,gb,hb,ib,jb,kb,lb,mb=a("selected-row"),nb=a("highlighted-row"),ob=P,pb=!1;return{init:v.once(function(){var a=new j;a.then(function(){pb=!0,g(),i(),k(),x()}),bb=$("#"+q.config.divNames.datagrid),G(a)}),getDatagridMode:function(){return ob},getSelectedDatasetUrl:function(){if(cb)kb.find("option[value='"+cb+"']").prop("selected",!0);else if(kb.find("option:selected").length>0)cb=kb.find("option:selected")[0].value;else{var a=w.find(q.config.featureLayers,function(a){var b=q.map.getLayer(a.id);return b.visible&&b.ramp.type!==q.layerType.Static});cb=null===a?null:a.url}return cb},isReady:function(){return pb},adjustPanelWidth:_,activateRows:I,capturePanel:X}}();return{init:function(){J=q.config;var a=d.filter(J.featureLayers,function(a){return!a.isStatic});K=a[0].datagrid,I(),Z.init()}}});