/*! ramp-pcar 13-07-2015 12:03:35 : v. 5.5.0-10 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP 
 **/
define([],function(){"use strict";function a(a){m.clear().fromTo(".sub-panel-container.summary-data-details",h,{top:i.headerHeight+i.toolbarHeight,bottom:i.footerHeight},{top:i.headerHeightCollapsed+i.toolbarHeight,bottom:i.footerHeightCollapsed,ease:"easeOutCirc"},0).fromTo(".sub-panel-container.full-data-details",h,{top:i.headerHeight,bottom:i.footerHeight},{top:i.headerHeightCollapsed,bottom:i.footerHeightCollapsed,ease:"easeOutCirc"},0),k="boolean"==typeof a?a:!k,k?(TweenLite.to(".full-data-mode .dataTables_scrollBody",h,{height:"+="+j,ease:"easeOutCirc",delay:.02}),l.play()):(TweenLite.to(".full-data-mode .dataTables_scrollBody",h-.02,{height:"-="+j,ease:"easeInCirc"}),b.removeClass("full-screen"),l.reverse())}var b=$("body"),c=$("main"),d=$("footer"),e=$("#wb-sm"),f=$("#wb-bar"),g=$("body>header"),h=.5,i={headerHeight:155,headerHeightCollapsed:64,footerHeight:30,footerHeightCollapsed:5,subtitleHeight:35,toolbarHeight:32},j=i.headerHeight-i.headerHeightCollapsed+i.footerHeight-i.footerHeightCollapsed,k=!1,l=new TimelineLite({paused:!0}),m=new TimelineLite;return l.to(g,h,{top:-1*f.outerHeight(),position:"relative",ease:"easeOutCirc"},0).set([f,e],{display:"none !important"}).to(c,h,{top:i.headerHeightCollapsed,bottom:i.footerHeightCollapsed,ease:"easeOutCirc"},0).to(d,h,{height:i.footerHeightCollapsed,ease:"easeOutCirc"},0).call(function(){b.addClass("full-screen")}).add(m,0),{fullScreenCallback:function(a,b){return l.eventCallback(a,b),this},isFullScreen:function(){return k},toggleFullScreenMode:function(b){return a(b),this}}});