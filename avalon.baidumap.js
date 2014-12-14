/**
 * A baidu map plugin for avalonjs
 * maogm12@gmail.com
 */

window.BMap_loadScriptTime = (new Date).getTime();

define([
    "avalon",
    "./avalon.baidumap_loader"
], function (avalon, BaiduMapLoader) {
    var widget = avalon.ui.baidumap = function(element, data, vmodels) {
        var options = data.baidumapOptions;

        var vmodel = avalon.define(data.baidumapId, function(vm) {
            avalon.mix(vm, options);
            vm.widgetElement = element;
            vm.bdmap = null;
            vm.$skipArray = ['bdmap'];

            var markerAdded = false;
            vm.$init = function() {
                // init a map
                if (vm.container !== '' && !vm.bdmap) {
                    BaiduMapLoader.done(function(){
                        vm.bdmap = new BMap.Map(vm.container);
                        // add navigator, enable scroll
                        vm.bdmap.addControl(new BMap.NavigationControl());
                        vm.bdmap.enableScrollWheelZoom(true);

                        // calc center and add marker
                        if (+vm.markers.length > 0) {
                            var totalX = 0, totalY = 0;
                            for (var i = 0; i < vm.markers.length; ++i) {
                                if (!markerAdded) {
                                    var markerPoint = new BMap.Point(vm.markers[i][0], vm.markers[i][1]);
                                    var marker = new BMap.Marker(markerPoint);
                                    vm.bdmap.addOverlay(marker);
                                }
                                totalX += vm.markers[i][0];
                                totalY += vm.markers[i][1];
                            }
                            markerAdded = true;
                            vm.center = [totalX / vm.markers.length, totalY / vm.markers.length];
                        }

                        // center
                        var theCenter = null;
                        if (+vm.center.length >= 2) { // coordinate
                            theCenter = new BMap.Point(vm.center[0], vm.center[1]);
                        } else { // string
                            theCenter = vm.center;
                        }
                        vm.bdmap.centerAndZoom(theCenter, vm.zoomLevel);
                    }).fail(function () {
                        avalon.log("fail");
                        document.getElementById(vm.container).innerText = "Baidu Map Load Error";
                    });
                }

                if (typeof options.onInit === "function") {
                    options.onInit.call(element, vmodel, options, vmodels);
                }
            };
            vm.$remove = function() {
                element.innerHTML = element.textContent = "";
            };
        });
        vmodel.$watch("$all", function() {});

        return vmodel;
    };

    widget.defaults = {
        container: "",
        markers: [],
        center: [116.35842,39.986186],  // can be a coordinate or a city string
        zoomLevel: 13,
        onInit: avalon.noop, //@optMethod onInit(vmodel, options, vmodels) 完成初始化之后的回调,call as element's method
        $author: "maogm12@gmail.com"
    };
});