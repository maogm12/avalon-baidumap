/*
 * Very thanks to the gist:
 * https://gist.github.com/MattSurabian/7868115#file-google-maps-loader-js
 */

var baidu_maps_loaded_def = null;

define(['jquery'],function($) {
    if(!baidu_maps_loaded_def) {
        baidu_maps_loaded_def = $.Deferred();

        window.baidu_maps_loaded = function() {
            baidu_maps_loaded_def.resolve(google.maps);
        };

        // From http://api.map.baidu.com/api?v=2.0&ak=xxx
        window.BMap_loadScriptTime = (new Date()).getTime();

        var key = "the key";
        require(["http://api.map.baidu.com/getscript?v=2.0&ak=" + key + "&services=&t=20141204161725&noext"],
            function(){
                baidu_maps_loaded_def.resolve();
            },
            function(err) {
                baidu_maps_loaded_def.reject();
            }
        );
    }

    return baidu_maps_loaded_def.promise();
});
