# avalon-baidumap

A Baidu map plugin for avalonjs

## Dependences

1. avalonjs
2. requirejs
3. jQuery

## Usage

Be sure to config the access key in `avalon.baidumap_loader.js` before using

```html
<div ms-controller="demo">
    <div id="map" ms-widget="baidumap"></div>div>
</div>
```

```javascript
require(['avalon', 'path/to/avalon.baidumap'], function(avalon){
    avalon.define("demo", function(vm){
        vm.baidumap = {
            container: "map"
        };
        vm.$skipArray = ["baidumap"];
    });
    avalon.scan();
});
```

More config

| item | default value | description |
| ---- | ------------- | ----------- |
| container | "" | container's id |
| markers | [] | markers you want to put on the map |
| center | [116.35842,39.986186] | initial center point of the map, can be a coordinate or a city string |
| zoomLevel | 13 | initial zoom level of the map |
| onInit | avalon.noop | onInit(vmodel, options, vmodels) callback after the widget is inited |

### Thanks

Many thanks to this gist: https://gist.github.com/MattSurabian/7868115#file-google-maps-loader-js
