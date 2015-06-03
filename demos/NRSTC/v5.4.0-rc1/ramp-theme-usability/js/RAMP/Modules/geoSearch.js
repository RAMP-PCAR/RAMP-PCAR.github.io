/*! ramp-theme-usability 03-06-2015 19:01:14 : v. 5.4.0-rc1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Usability Theme 
 **/
define(["dojo/request/script","dojo/Deferred"],function(a,b){"use strict";function c(a){var b=a.toLowerCase();return s.indexOf(b)>-1}function d(a){var b,c=a.toLowerCase();return t.every(function(a){return a.abbr.toLowerCase()===c||a.name.en.toLowerCase()===c||a.name.fr.toLowerCase()===c?(b=a.code,!1):!0}),b}function e(a,b){return a.name>b.name?1:-1}function f(){return t.map(function(a){return{name:a.name[RAMP.locale],code:a.code}}).sort(e)}function g(){return u.map(function(a){return{name:a.name[RAMP.locale],code:a.code}}).sort(e)}function h(a){if(isNaN(a))return!1;var b=Number(a);return b>=-180&&180>=b}function i(a,b){return a[0]>=b[0]&&a[0]<=b[2]&&a[1]>=b[1]&&a[1]<=b[3]}function j(a){var b={type:q.none,data:a},e=/[A-Za-z]\d[A-Za-z]/;if(a.length>2&&e.test(a.substring(0,3))&&(a.length>3&&" "===a.substring(3,4)||3===a.length))return b.type=q.fsa,b.data=a.substring(0,3),b;if(a.indexOf(",")>0){var f=a.split(",");if(2===f.length&&h(f[0])&&h(f[1]))return b.type=q.lonlat,b.data=[Number(f[1]),Number(f[0])],b;var g=f[f.length-1].trim();c(g)&&(b.type=q.prov,b.data={prov:d(g),searchVal:a.substring(0,a.lastIndexOf(","))})}return b}function k(c){var d=new b,e=a.get(RAMP.config.geolocationUrl+RAMP.locale+"/locate",{query:"q="+c,jsonp:"callback"});return e.then(function(a){var b={lonlat:void 0};a.length>0&&a.every(function(a){return"ca.gc.nrcan.geoloc.data.model.PostalCode"===a.type?(b.lonlat=a.geometry.coordinates,!1):!0}),d.resolve(b)},function(a){d.reject(a)}),d.promise}function l(c){var d,e="",f=new b,g=10;return c.lonlat&&(e+="lat="+c.lonlat[1].toString()+"&lon="+c.lonlat[0].toString()+"&",c.radius&&(e+="radius="+c.radius.toString()+"&")),c.q&&(e+="q="+escape(c.q.trim().replace("%20"," ").replace(" ","* ")+"*")+"&"),c.prov&&(e+="province="+c.prov+"&"),c.concise&&(e+="concise="+c.concise+"&"),c.showAll&&(g=1e3),e+="num="+g+"&",d=a.get(RAMP.config.geonameUrl+RAMP.locale+"/geonames.json",{query:e,jsonp:"callback"}),d.then(function(a){var b=a[0].items.map(function(a){return{name:a.name,location:a.location,province:a.province.code,lonlat:[a.longitude,a.latitude],type:a.concise.code}});c.extent?f.resolve(b.filter(function(a){return i(a.lonlat,c.extent)})):f.resolve(b)},function(a){f.reject(a)}),f.promise}function m(a,b,c){b.q=a;var d={},e=l(b);e.then(function(a){a.length>0?(d.status=r.list,d.list=a,d.defItem=a[0].lonlat):d.status=r.none,c.resolve(d)},function(a){c.reject(a)})}function n(a,b){var c={defItem:a.lonlat},d=l(a);d.then(function(a){c.status=a.length>0?r.list:r.hide,c.list=a,b.resolve(c)},function(a){b.reject(a)})}function o(a,c){var d=new b;a.length<3&&d.resolve({status:r.hide});var e=j(a);switch(e.type){case q.none:m(e.data,c,d);break;case q.fsa:var f=k(e.data);f.then(function(a){a.lonlat?n({lonlat:a.lonlat,radius:c.radius},d):d.resolve({status:r.none})},function(a){d.reject(a)});break;case q.lonlat:n({lonlat:e.data,radius:c.radius},d);break;case q.prov:c.prov=e.data.prov,m(e.data.searchVal,c,d)}return d.promise}function p(){var b="/codes/province.json",c="/codes/concise.json",d=a.get(RAMP.config.geonameUrl+"en"+b,{jsonp:"callback"});d.then(function(c){t=c[0].definitions.map(function(a){return{code:a.code,abbr:a.term,name:{en:a.description,fr:""}}});var d=a.get(RAMP.config.geonameUrl+"fr"+b,{jsonp:"callback"});d.then(function(a){a[0].definitions.forEach(function(a){t.every(function(b){return b.code===a.code?(b.name.fr=a.description,!1):!0})}),t.forEach(function(a){s.splice(0,0,a.abbr.toLowerCase(),a.name.en.toLowerCase(),a.name.fr.toLowerCase())})},function(a){})},function(a){});var e=a.get(RAMP.config.geonameUrl+"en"+c,{jsonp:"callback"});e.then(function(b){u=b[0].definitions.map(function(a){return{code:a.code,name:{en:a.term,fr:""}}});var d=a.get(RAMP.config.geonameUrl+"fr"+c,{jsonp:"callback"});d.then(function(a){a[0].definitions.forEach(function(a){u.every(function(b){return b.code===a.code?(b.name.fr=a.term,!1):!0})})},function(a){})},function(a){})}var q={none:"none",fsa:"fsa",lonlat:"lonlat",prov:"prov"},r={list:"list",none:"none",hide:"hide"},s=[],t=[],u=[];return{geoSearch:o,init:p,getProvList:f,getConciseList:g}});