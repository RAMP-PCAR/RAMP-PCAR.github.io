/*! ramp-theme-usability 28-04-2015 20:04:53 : v. 5.3.0 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Usability Theme 
 **/
define(["dojo/_base/lang","utils/util"],function(a,b){"use strict";function c(a){q.clear().fromTo(".sub-panel-container.summary-data-details",l,{top:m.headerHeight+m.toolbarHeight,bottom:m.footerHeight},{top:m.headerHeightCollapsed+m.toolbarHeight,bottom:m.footerHeightCollapsed,ease:"easeOutCirc"},0).fromTo(".sub-panel-container.full-data-details",l,{top:m.headerHeight,bottom:m.footerHeight},{top:m.headerHeightCollapsed,bottom:m.footerHeightCollapsed,ease:"easeOutCirc"},0),o=b.isUndefined(a)?!o:a,o?(TweenLite.to(".full-data-mode .dataTables_scrollBody",l,{height:"+="+n,ease:"easeOutCirc",delay:.02}),p.play()):(TweenLite.to(".full-data-mode .dataTables_scrollBody",l-.02,{height:"-="+n,ease:"easeInCirc"}),d.removeClass("full-screen"),p.reverse())}var d=$("body"),e=d.find(".pseudo-header"),f=$("main"),g=$("footer"),h=$("#wb-sm"),i=$("#wb-bar"),j=i.next(),k=$("header"),l=.5,m={headerHeight:207,headerHeightCollapsed:61,footerHeight:30,footerHeightCollapsed:5,toolbarHeight:32},n=m.headerHeight-m.headerHeightCollapsed+m.footerHeight-m.footerHeightCollapsed,o=!1,p=new TimelineLite({paused:!0}),q=new TimelineLite;return p.to(k,l,{top:-1*i.outerHeight(),position:"relative",ease:"easeOutCirc"},0).set([i,h],{display:"none !important"}).to(j,l,{top:"-22px"},0).fromTo(d,l,{backgroundPosition:"center 43px"},{backgroundPosition:"center -26px",ease:"easeOutCirc"},0).fromTo(e,l,{backgroundPosition:"center 43px"},{backgroundPosition:"center -26px",ease:"easeOutCirc"},0).to(f,l,{top:m.headerHeightCollapsed,bottom:m.footerHeightCollapsed,ease:"easeOutCirc"},0).to(g,l,{height:m.footerHeightCollapsed,ease:"easeOutCirc"},0).call(function(){d.addClass("full-screen")}).add(q,0),{fullScreenCallback:function(a,b){return p.eventCallback(a,b),this},isFullScreen:function(){return o},toggleFullScreenMode:function(a){return c(a),this},tooltipster:function(b,c,d,e){var f;switch(b=b||$("body"),c){case"map":break;default:f={theme:"tooltipster-shadow",delay:500}}switch(d){case"update":b.find(".tooltipstered").each(function(a,b){var c=$(b);c.attr("data-tooltip",c.attr("title")).tooltipster("content",c.attr("title")).removeAttr("title")});break;case"destroy":b.find(".tooltipstered").each(function(a,b){var c=$(b);c.tooltipster("destroy")});break;default:b.find(".tooltip, ._tooltip").each(function(b,c){var d=$(c),g=d.attr("title");g?d.attr("data-tooltip",d.attr("title")):d.attr("title",d.data("tooltip")),d.tooltipster(a.mixin({theme:d.data("tooltip-theme")||f.theme,maxWidth:d.data("tooltip-maxwidth")||null,delay:f.delay},e))}).removeAttr("title")}return this}}});