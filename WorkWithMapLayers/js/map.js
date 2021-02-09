var mapMain;

// @formatter:off
require([
        "esri/map",
        "esri/geometry/Extent",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/FeatureLayer",
        "esri/dijit/BasemapToggle",
        "esri/dijit/Scalebar",
        "esri/dijit/Legend",
        "dojo/ready",
        "dojo/parser",
        "dojo/on",
        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane"],
    function (Map, Extent, ArcGISDynamicMapServiceLayer, FeatureLayer, BasemapToggle, Scalebar, Legend, ready, parser, on, BorderContainer, ContentPane) {
// @formatter:on

// Wait until DOM is ready *and* all outstanding require() calls have been resolved
        ready(function () {
// Parse DOM nodes decorated with the data-dojo-type attribute
            parser.parse();
//Step: Specify the initial extent//
            var extentInitial = new Extent ({
                "xmin":-14780455.241960015,
                "ymin":2700660.8984639593,
                "xmax":-11742541.98979478,
                "ymax":5807061.727972696,
                "spatialReference":{
                    "wkid":102100
                }
            });
            // Create the map
            mapMain = new Map("cpCenter", {
                basemap: "satellite",
                extent: extentInitial
            });
            //Step: Add the USA map service to the map
             var lyrUSA = new ArcGISDynamicMapServiceLayer ("http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",{
                 opacity: 0.5
             });

            //Step: Add the earthquakes layer to the map
            var lyrQuakes = new FeatureLayer ("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Earthquakes_Since1970/FeatureServer/0");
            lyrQuakes.setDefinitionExpression ("magnitude>= 2.0");

            //Step: Revise code to use the addLayers() method
            mapMain.addLayer (lyrUSA);
            mapMain.addLayer (lyrQuakes);
            //mapMain.addLayer ([lyrUSA, lyrQuakes])

            //Step: Add the BaseMapToggle widget to the map
            var toggle = new BasemapToggle ({
                map: mapMain,
                basemap: "topo"},
                "BasemapToggle");
                toggle.startup();
            
            //Step: Add the scalebar widget to the map
            var dijitScalebar= new Scalebar ({
                map: mapMain,
                scalebarUnit: "dual",
                attachTo: "bottom-left"
            });
         
            //Step: Add a legend once all layers have been added to the map
            mapMain.on("layer-add-result", function() {
                var dijitLegend= new Legend ({
                map: mapMain,
                arrangement: Legend.ALIGN_RIGHT
                }, "divLegend");
            dijitLegend.startup();
            }); // stub
        });
    });
