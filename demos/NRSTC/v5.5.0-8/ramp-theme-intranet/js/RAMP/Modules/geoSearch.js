/*! ramp-theme-intranet 03-07-2015 15:52:13 : v. 5.5.0-8 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["dojo/request/script","dojo/Deferred","dojo/topic","ramp/map","ramp/eventManager","utils/util"],function(a,b,c,d,e,f){"use strict";function g(a){var b=a.toLowerCase();return x.indexOf(b)>-1}function h(a){var b,c=a.toLowerCase();return y.every(function(a){return a.abbr.toLowerCase()===c||a.name.en.toLowerCase()===c||a.name.fr.toLowerCase()===c?(b=a.code,!1):!0}),b}function i(a,b){return a.name>b.name?1:-1}function j(){return y.map(function(a){return{name:a.name,code:a.code}}).sort(i)}function k(){return z.map(function(a){return{name:a.name,code:a.code}}).sort(i)}function l(a){if(isNaN(a))return!1;var b=Number(a);return b>=-180&&180>=b}function m(a,b){return a[0]>=b[0]&&a[0]<=b[2]&&a[1]>=b[1]&&a[1]<=b[3]}function n(a){var b={type:v.none,data:a},c=/[A-Za-z]\d[A-Za-z]/;if(a.length>2&&c.test(a.substring(0,3))&&(a.length>3&&" "===a.substring(3,4)||3===a.length))return b.type=v.fsa,b.data=a.substring(0,3),b;if(a.indexOf(",")>0){var d=a.split(",");if(2===d.length&&l(d[0])&&l(d[1]))return b.type=v.lonlat,b.data=[Number(d[1]),Number(d[0])],b;var e=d[d.length-1].trim();g(e)&&(b.type=v.prov,b.data={prov:h(e),searchVal:a.substring(0,a.lastIndexOf(","))})}return b}function o(c){var d=new b,e=a.get(RAMP.config.geolocationUrl+RAMP.locale+"/locate",{query:"q="+c,jsonp:"callback"});return e.then(function(a){var b={lonlat:void 0};a.length>0&&a.every(function(a){return"ca.gc.nrcan.geoloc.data.model.PostalCode"===a.type?(b.lonlat=a.geometry.coordinates,!1):!0}),d.resolve(b)},function(a){d.reject(a)}),d.promise}function p(c){var d,e="",f=new b,g=10;return c.lonlat&&(e+="lat="+c.lonlat[1].toString()+"&lon="+c.lonlat[0].toString()+"&",c.radius&&(e+="radius="+c.radius.toString()+"&")),c.q&&(e+="q="+escape(c.q.trim().replace("%20"," ").replace(" ","* ")+"*")+"&"),c.prov&&(e+="province="+c.prov+"&"),c.concise&&(e+="concise="+c.concise+"&"),c.showAll&&(g=1e3),e+="num="+g+"&",d=a.get(RAMP.config.geonameUrl+RAMP.locale+"/geonames.json",{query:e,jsonp:"callback"}),d.then(function(a){var b=a[0].items.map(function(a){return{name:a.name,location:a.location,province:a.province.code,lonlat:[a.longitude,a.latitude],type:a.concise.code}});c.extent?f.resolve(b.filter(function(a){return m(a.lonlat,c.extent)})):f.resolve(b)},function(a){f.reject(a)}),f.promise}function q(a,b,c){b.q=a;var d={},e=p(b);e.then(function(a){a.length>0?(d.status=w.list,d.list=a,d.defItem=a[0].lonlat):d.status=w.none,c.resolve(d)},function(a){c.reject(a)})}function r(a,b){var c={defItem:a.lonlat},d=p(a);d.then(function(a){c.status=a.length>0?w.list:w.hide,c.list=a,b.resolve(c)},function(a){b.reject(a)})}function s(a,c){var d=new b;a.length<3&&d.resolve({status:w.hide});var e=n(a);switch(e.type){case v.none:q(e.data,c,d);break;case v.fsa:var f=o(e.data);f.then(function(a){a.lonlat?r({lonlat:a.lonlat,radius:c.radius,concise:c.concise},d):d.resolve({status:w.none})},function(a){d.reject(a)});break;case v.lonlat:r({lonlat:e.data,radius:c.radius},d);break;case v.prov:c.prov=e.data.prov,q(e.data.searchVal,c,d)}return d.promise}function t(){u=RAMP.map,angular.module("gs.service",[]).factory("geoService",["$q","filterService",function(a,b){function c(a){var b=/[A-Za-z]\d[A-Za-z]/,c={type:f.parseType.none,data:a};if(a.length>2&&b.test(a.substring(0,3))&&(a.length>3&&" "===a.substring(3,4)||3===a.length))return c.type=v.fsa,c.data=a.substring(0,3),c;if(a.indexOf(",")>0){var d=a.split(",");if(2===d.length&&l(d[0])&&l(d[1]))return c.type=v.lonlat,c.data=[Number(d[1]),Number(d[0])],c;var e=d[d.length-1].trim();g(e)&&(c.type=v.prov,c.data={prov:h(e),searchVal:a.substring(0,a.lastIndexOf(","))})}return c}function d(c){var d=a.defer(),f=b.getFilters();return e=c,s(c,f).then(function(a){a.searchTerm=c,c!==e?d.reject({reason:"old"}):"list"===a.status?d.resolve(a):d.reject({reason:"no results"})},function(a){d.reject(a)}),d.promise}var e,f;return f={parseType:{none:"none",fsa:"fsa",lonlat:"lonlat",prov:"prov"}},{data:f,search:d,parseInput:c}}]).factory("filterService",["$q","$http","extents",function(a,b,c){function d(a,b){return a.term<b.term?-1:a.term>b.term?1:0}var e,f="/codes/province.json",g="/codes/concise.json";return e={provinceList:[],typeList:[],extentList:c.data,distanceList:[{code:"-1",name:i18n.t("geosearch.filters.distance.default")},{code:"5",name:i18n.t("geosearch.filters.distance.5km")},{code:"10",name:i18n.t("geosearch.filters.distance.10km")},{code:"15",name:i18n.t("geosearch.filters.distance.15km")},{code:"30",name:i18n.t("geosearch.filters.distance.30km")},{code:"50",name:i18n.t("geosearch.filters.distance.50km")},{code:"75",name:i18n.t("geosearch.filters.distance.75km")},{code:"100",name:i18n.t("geosearch.filters.distance.100km")}],currentProvince:{},currentType:{},currentExtent:{},currentDistance:{}},a.all([b.get(RAMP.config.geonameUrl+"en"+f),b.get(RAMP.config.geonameUrl+"fr"+f),b.get(RAMP.config.geonameUrl+RAMP.locale+g)]).then(function(a){var b="en"===RAMP.locale?0:1,c="fr"===RAMP.locale?0:1,f=a[b].data.definitions.sort(d),g=a[c].data.definitions.sort(d),h=a[2].data.definitions.sort(d);e.provinceList=f.map(function(a,b){return x.push(a.term.toLowerCase(),a.description.toLowerCase(),g[b].description.toLowerCase()),{code:a.code,abbr:a.term,name:a.description}}),angular.copy(e.provinceList,y),e.provinceList.unshift({code:"-1",abbr:"",name:i18n.t("geosearch.filters.province.default")}),e.currentProvince=e.provinceList[0],e.typeList=h.map(function(a){return{code:a.code,name:a.term}}),angular.copy(e.typeList,z),e.typeList.unshift({code:"-1",name:i18n.t("geosearch.filters.type.default")}),e.currentType=e.typeList[0],e.currentExtent=e.extentList[0],e.currentDistance=e.distanceList[0]},function(b,c){return a.reject("Fail to load province or concise codes",b,c)}),{data:e,clearFilters:function(){e.currentProvince=e.provinceList[0],e.currentType=e.typeList[0],e.currentExtent=e.extentList[0],e.currentDistance=e.distanceList[0]},getFilters:function(){return{prov:"-1"!==e.currentProvince.code?e.currentProvince.code:void 0,concise:"-1"!==e.currentType.code?e.currentType.code:void 0,extent:e.currentExtent.extent,radius:"-1"!==e.currentDistance.code?e.currentDistance.code:void 0}}}}]).factory("lookupService",["filterService",function(a){function b(a,b){return a.filter(function(a){return a.code===b})[0].name}var c=a.data;return{provinceName:function(a){return b(c.provinceList,a)},typeName:function(a){return b(c.typeList,a)}}}]).factory("extents",["$rootScope",function(a){function b(a){var b,c;return a=d.localProjectExtent(a,{wkid:4326}),b=f.mapPointToLatLong({x:a.xmin,y:a.ymin,spatialReference:{wkid:a.spatialReference.wkid}}),c=f.mapPointToLatLong({x:a.xmax,y:a.ymax,spatialReference:{wkid:a.spatialReference.wkid}}),[b[0],b[1],c[0],c[1]]}var g;return g=[{code:"-1",name:i18n.t("geosearch.filters.extent.default"),extent:void 0},{code:"0",name:i18n.t("geosearch.filters.extent.canada"),extent:b(RAMP.config.extents.fullExtent)},{code:"1",name:i18n.t("geosearch.filters.extent.visible"),extent:void 0}],c.subscribe(e.Map.EXTENT_CHANGE,function(c){a.$apply(function(){g[2].extent=b(c.extent)})}),{data:g}}]),angular.module("gs.directive",["gs.service"]).directive("rpGeosearchFilter",function(){return{restrict:"E",scope:{filterChange:"&",searchType:"="},templateUrl:"js/RAMP/Modules/partials/rp-geosearch-filter.html",controller:["$scope","filterService","geoService",function(a,b,c){function d(){b.clearFilters(),f.onChange()}function e(){return f.searchType.type===c.data.parseType.none||f.searchType.type===c.data.parseType.prov?f.filterTypes.name:f.filterTypes.coordinates}var f=this;f.filterData=b.data,f.getFilterType=e,f.onChange=f.filterChange,f.clearFilters=d,f.clearText=i18n.t("geosearch.filters.clear"),f.filterTypes={name:"name",coordinates:"coordinates"},a.$watch("gsf.filterData.currentExtent.extent",function(a,b){f.onChange()})}],controllerAs:"gsf",bindToController:!0}}).directive("rpGeosearchResults",function(){return{restrict:"E",scope:{results:"=",state:"=",parentSelect:"&select"},templateUrl:"js/RAMP/Modules/partials/rp-geosearch-results.html",controller:["$scope","lookupService",function(a,b){function c(a){d.parentSelect({result:a})}var d=this;d.lookup=b,d.select=c}],controllerAs:"gsr",bindToController:!0}}),angular.module("gs",["gs.service","gs.directive","ui.router"]).controller("GeosearchController",["$scope","$timeout","geoService",function(a,b,c){function d(){a.geosearchForm&&(a.geosearchForm.$setPristine(),a.geosearchForm.$setUntouched()),l.name="",k.searchType=c.parseInput(""),k.selectedResult=l,k.results=[],h(k.states.hide)}function e(){b.cancel(m),a.geosearchForm.$valid?(k.selectedResult.placeholder||(k.selectedResult.selected=!1,l.name=k.selectedResult.name,k.selectedResult=l),m=b(function(){h(k.states.loading)},250),k.searchType=c.parseInput(k.selectedResult.name),c.search(k.selectedResult.name).then(function(a){b.cancel(m),k.results=a.list,h(k.states.show)})["catch"](function(a){"old"!==a.reason&&(b.cancel(m),k.results=[],h(k.states.noresults))})):k.results=[]}function g(a){var b;a?k.selectedResult=a:k.selectedResult.placeholder&&k.results.length>0&&(k.selectedResult=k.results[0]),k.searchType=c.parseInput(k.selectedResult.name),k.selectedResult.lonlat&&(k.results.forEach(function(a){a.selected=!1}),k.selectedResult.selected=!0,h(k.states.hide),b=f.latLongToMapPoint(k.selectedResult.lonlat[1],k.selectedResult.lonlat[0],u.extent.spatialReference),u.centerAndZoom(b,12))}function h(a){k.state=a}function i(){""===k.selectedResult.name&&h(k.states.hide)}function j(){h(k.states.show)}var k=this,l={name:"",placeholder:!0},m=b(angular.noop,0);k.states={hide:"hide",show:"show",loading:"loading",noresults:"no-results"},k.selectedResult={},k.results=[],k.state=k.states.hide,k.searchType={},k.clear=d,k.search=e,k.select=g,k.onBlur=i,k.onFocus=j,k.clear()}]).config(["$stateProvider",function(a){a.state("default",{url:"*path",templateUrl:"js/RAMP/Modules/partials/rm-geosearch-state.html",controller:"GeosearchController",controllerAs:"gsc"})}]),angular.element(document).ready(function(){angular.bootstrap(document,["gs"],{strictDi:!0})})}var u,v={none:"none",fsa:"fsa",lonlat:"lonlat",prov:"prov"},w={list:"list",none:"none",hide:"hide"},x=[],y=[],z=[];return{geoSearch:s,init:t,getProvList:j,getConciseList:k}});