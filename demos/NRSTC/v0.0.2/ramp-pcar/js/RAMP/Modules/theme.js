/*! ramp-pcar 26-05-2015 13:34:15 : v. 5.4.0-8 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
define(["dojo/_base/lang"],function(a){"use strict";function b(a){n.clear().fromTo(".sub-panel-container.summary-data-details",i,{top:j.headerHeight+j.toolbarHeight,bottom:j.footerHeight},{top:j.headerHeightCollapsed+j.toolbarHeight,bottom:j.footerHeightCollapsed,ease:"easeOutCirc"},0).fromTo(".sub-panel-container.full-data-details",i,{top:j.headerHeight,bottom:j.footerHeight},{top:j.headerHeightCollapsed,bottom:j.footerHeightCollapsed,ease:"easeOutCirc"},0),l="boolean"==typeof a?a:!l,l?(TweenLite.to(".full-data-mode .dataTables_scrollBody",i,{height:"+="+k,ease:"easeOutCirc",delay:.02}),m.play()):(TweenLite.to(".full-data-mode .dataTables_scrollBody",i-.02,{height:"-="+k,ease:"easeInCirc"}),c.removeClass("full-screen"),m.reverse())}var c=$("body"),d=$("main"),e=$("footer"),f=$("#wb-sm"),g=$("#wb-bar"),h=$("body>header"),i=.5,j={headerHeight:155,headerHeightCollapsed:64,footerHeight:30,footerHeightCollapsed:5,subtitleHeight:35,toolbarHeight:32},k=j.headerHeight-j.headerHeightCollapsed+j.footerHeight-j.footerHeightCollapsed,l=!1,m=new TimelineLite({paused:!0}),n=new TimelineLite;return m.to(h,i,{top:-1*g.outerHeight(),position:"relative",ease:"easeOutCirc"},0).set([g,f],{display:"none !important"}).to(d,i,{top:j.headerHeightCollapsed,bottom:j.footerHeightCollapsed,ease:"easeOutCirc"},0).to(e,i,{height:j.footerHeightCollapsed,ease:"easeOutCirc"},0).call(function(){c.addClass("full-screen")}).add(n,0),{fullScreenCallback:function(a,b){return m.eventCallback(a,b),this},isFullScreen:function(){return l},toggleFullScreenMode:function(a){return b(a),this},tooltipster:function(b,c,d,e){var f;switch(b=b||$("body"),c){case"map":break;default:f={theme:"tooltipster-shadow",delay:500}}switch(d){case"update":b.find(".tooltipstered").each(function(a,b){var c=$(b);c.attr("data-tooltip",c.attr("title")).tooltipster("content",c.attr("title")).removeAttr("title")});break;case"destroy":b.find(".tooltipstered").each(function(a,b){var c=$(b);c.tooltipster("destroy")});break;default:b.find(".tooltip, ._tooltip").each(function(b,c){var d=$(c),g=d.attr("title");g?d.attr("data-tooltip",d.attr("title")):d.attr("title",d.data("tooltip")),d.tooltipster(a.mixin({theme:d.data("tooltip-theme")||f.theme,maxWidth:d.data("tooltip-maxwidth")||null,delay:f.delay},e))}).removeAttr("title")}return this}}});