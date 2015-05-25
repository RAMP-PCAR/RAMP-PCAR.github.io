/*! ramp-pcar 25-05-2015 16:30:33 : v. 5.4.0-8 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
define(["dojo/_base/declare","dojo/_base/lang","dojo/dom","dojo/dom-construct","dijit/form/Form","dijit/form/TextBox","dijit/form/Select","dijit/form/Button","esri/tasks/QueryTask","esri/tasks/query","ramp/map","utils/util"],function(a,b,c,d,e,f,g,h,i,j,k,l){"use strict";return a(null,{constructor:function(){function a(a){i.form.domNode.appendChild(a)}function b(b){var e=d.create("label",{"class":c,innerHTML:b});return a(e),e}this.config=RAMP.config,this.form=new e({style:"overflow:hidden; clear:none;"});var c="quickZoom";this.provinceSelect=new g({id:"quickZoomProvince","class":c,options:[]}),this.citySelect=new g({id:"quickZoomCity","class":c,options:[]}),this.postalCodeTextbox=new f({id:"quickZoomPostalCode","class":c,style:"width : 30%"}),this.button=new h({label:"Find",id:"quickZoomButton","class":c});var i=this;b("Choose province:"),a(this.provinceSelect.domNode),b("City:"),a(this.citySelect.domNode),b("or enter postal code (e.g. A1A):"),a(this.postalCodeTextbox.domNode),a(this.button.domNode),this.errorText=b("")},_setError:function(a){$(this.errorText).text(a)},init:function(a){function e(a,b){b.returnGeometry=!0;var c=new i(a);c.execute(b,function(a){if(a.features.isEmpty())return void p._setError("invalid query");var b=a.features[0].geometry.getExtent();k.getMaxExtent().contains(b)?(k.getMap().setExtent(b),p._setError("")):p._setError("beyond max extent")},function(a){})}function f(a,b,c,d){b.removeOption(b.getOptions());var e=new i(a);e.execute(c,function(a){b.addOption(a.features.map(d))},function(a){})}function g(a){var b=o.quickzoom.city,c=new j;c.where=l.getWhereClause(b.province,a),c.outFields=[b.name,b.id],f(b.url,n,c,function(a){return{label:a.attributes[b.name],value:a.attributes[b.id],selected:!1}})}function h(a){var c=/[abcdefghijklmnopqrstuvwxyz]\d[abcdefghijklmnopqrstuvwxyz]/i;if(a=b.trim(a)){var d=a.match(c);return d&&1===d.length}return!1}var m=this.provinceSelect,n=this.citySelect,o=this.config,p=this;m.loadDropDown(function(){var a=o.quickzoom.province,b=new j;b.where="OBJECTID>0",b.outFields=[a.shortName,a.name],f(a.url,m,b,function(b){var c=b.attributes[a.shortName];return{label:b.attributes[a.name],value:c,selected:c===a.selectedProv}})}),n.loadDropDown(function(){g(o.quickzoom.province.selectedProv)}),m.on("change",function(){var a=o.quickzoom.province,b=m.get("value"),c=new j;c.where=l.getWhereClause(a.shortName,b),e(a.url,c),g(b)}),n.on("change",function(){var a=o.quickzoom.city,b=n.get("value"),c=new j;c.where=l.getWhereClause(a.id,b),e(a.url,c)}),this.button.on("click",b.hitch(this,function(){var a=this.postalCodeTextbox.get("value");if(h(a)){var b=o.quickzoom.postalCode,c=new j;c.where=l.getWhereClause(b.id,a),e(b.url,c)}else p._setError("invalid postal code")}));var q=c.byId(a);d.place(this.form.domNode,q,"replace")}})});