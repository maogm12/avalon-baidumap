require.config({
    paths: {
        avalon: "../bower_components/avalon/avalon",
        jquery: "../bower_components/jquery/dist/jquery"
    },
    shim: {
        avalon: {
            exports: "avalon"
        },
        jquery: {
            exports: "jQuery"
        }
    }
});

require(['avalon', '../avalon.baidumap'], function(avalon){
    avalon.define("demo", function(vm){
        vm.baidumap = {
            container: "map",
            markers: [[116.35832,39.986186],[116.35852,39.986186],[116.35862,39.986186],[116.35842,39.986186]]
        };
        vm.$skipArray = ["baidumap"];
    });
    avalon.scan();
});