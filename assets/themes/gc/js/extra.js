$(document).ready(function () {
    $("a[href*='" + location.pathname.split("/").pop() + "']").addClass("wb-navcurr");
});