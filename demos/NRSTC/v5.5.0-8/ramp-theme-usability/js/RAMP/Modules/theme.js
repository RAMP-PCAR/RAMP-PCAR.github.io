/*! ramp-theme-usability 03-07-2015 15:40:50 : v. 5.5.0-8 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Usability Theme 
 **/
define(["utils/util"],function(a){"use strict";function b(b){p.clear().fromTo(".sub-panel-container.summary-data-details",k,{top:l.headerHeight+l.toolbarHeight,bottom:l.footerHeight},{top:l.headerHeightCollapsed+l.toolbarHeight,bottom:l.footerHeightCollapsed,ease:"easeOutCirc"},0).fromTo(".sub-panel-container.full-data-details",k,{top:l.headerHeight,bottom:l.footerHeight},{top:l.headerHeightCollapsed,bottom:l.footerHeightCollapsed,ease:"easeOutCirc"},0),n=a.isUndefined(b)?!n:b,n?(TweenLite.to(".full-data-mode .dataTables_scrollBody",k,{height:"+="+m,ease:"easeOutCirc",delay:.02}),o.play()):(TweenLite.to(".full-data-mode .dataTables_scrollBody",k-.02,{height:"-="+m,ease:"easeInCirc"}),c.removeClass("full-screen"),o.reverse())}var c=$("body"),d=c.find(".pseudo-header"),e=$("main"),f=$("footer"),g=$("#wb-sm"),h=$("#wb-bar"),i=h.next(),j=$("body>header"),k=.5,l={headerHeight:207,headerHeightCollapsed:61,footerHeight:30,footerHeightCollapsed:5,toolbarHeight:32},m=l.headerHeight-l.headerHeightCollapsed+l.footerHeight-l.footerHeightCollapsed,n=!1,o=new TimelineLite({paused:!0}),p=new TimelineLite;return o.to(j,k,{top:-1*h.outerHeight(),position:"relative",ease:"easeOutCirc"},0).set([h,g],{display:"none !important"}).to(i,k,{top:"-22px"},0).fromTo(c,k,{backgroundPosition:"center 43px"},{backgroundPosition:"center -26px",ease:"easeOutCirc"},0).fromTo(d,k,{backgroundPosition:"center 43px"},{backgroundPosition:"center -26px",ease:"easeOutCirc"},0).to(e,k,{top:l.headerHeightCollapsed,bottom:l.footerHeightCollapsed,ease:"easeOutCirc"},0).to(f,k,{height:l.footerHeightCollapsed,ease:"easeOutCirc"},0).call(function(){c.addClass("full-screen")}).add(p,0),{fullScreenCallback:function(a,b){return o.eventCallback(a,b),this},isFullScreen:function(){return n},toggleFullScreenMode:function(a){return b(a),this}}});