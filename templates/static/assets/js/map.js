var map, heatmap, cityCircle;
var initPos = {lat: 24.7311410025, lng: 121.3397078012}
var heatmapList = []
var markers = []
var res
var styles = [
    {
        featureType: 'poi.business',
        stylers: [{visibility: 'off'}]
      },
    {
        featureType: 'transit',
        elementType: 'labels.icon',
        stylers: [{visibility: 'off'}]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 13
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#144b53"
            },
            {
                "lightness": 14
            },
            {
                "weight": 1.4
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#08304b"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0c4152"
            },
            {
                "lightness": 5
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#0b434f"
            },
            {
                "lightness": 25
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#0b3d51"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "color": "#146474"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#021019"
            }
        ]
    }
]
$.ajax({
    method: "GET",
    url: "/static/assets/js/sample_test.json",
})
.done(function( msg ) {
    res = msg
    for( key in msg ) {
        heatmapList.push({
            location: new google.maps.LatLng(msg[key].longitude, msg[key].latitude), weight: msg[key].value*1000
        })
    }
    var gradient = [
        'rgba(255, 232, 89, 0)',
        'rgba(255, 250, 228, 0.6)',
        'rgba(255, 232, 89, 0.7)',
        'rgba(255, 200, 50, 0.8)',
        'rgba(255, 180, 30, 0.9)',
        'rgba(243, 211, 15, 1)',
        'rgba(243, 150, 7, 1)',
        'rgba(240, 80, 3, 1)',
        'rgba(240, 50, 2, 1)',
        'rgba(240, 0, 0, 1)'
    ];
    heatmap = new google.maps.visualization.HeatmapLayer({
        radius: 20,
        opacity:0.8,
        data: heatmapList,
        map: map,
        gradient: gradient,
    });
    heatmap.setMap(map);
});
function closeHeatmap() {
    heatmap.setMap(null);
}
function setHeatmap() {
    heatmap.setMap(map);
}
function initMap() {
    $("#markermap").click(function(){
        closeHeatmap()
        setMarkers()
    })
    $("#heatmap").click(function(){
        clearMarkers()
        setHeatmap()
    })
    map = new google.maps.Map(document.getElementById('map'), {
        center: initPos,
        zoom: 11,
        maxZoom: 12,
        styles: styles,
        fullscreenControl: false,
    });
    google.maps.event.addListener(map, 'click', function(event){
        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();
        console.log('latitude:', latitude, 'longitude:', longitude);
    })
    google.maps.event.addListener(map, 'zoom_changed', function() {
        zoomLevel = map.getZoom();
        console.log('zoomLevel', zoomLevel);
        
        if(zoomLevel <= 16) {
            heatmap.set('radius', heatmap.get('radius') ? null : 20);
        } 
        else if(zoomLevel <= 14) {
            heatmap.set('radius', heatmap.get('radius') ? null : 15);
        } 
        else if(zoomLevel <= 10) {
            heatmap.set('radius', heatmap.get('radius') ? null : 10);
        }
        else if(zoomLevel <= 5) {
            heatmap.set('radius', heatmap.get('radius') ? null : 5);
        }
    });
    cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: initPos,
        radius: 15000
    });
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //         var pos = {
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude
    //         };
    //         var marker = new google.maps.Marker({
    //             position: pos,
    //             // icon:'marker.png',
    //             map: map
    //         });
    //         var cityCircle = new google.maps.Circle({
    //             strokeColor: '#FF0000',
    //             strokeOpacity: 0.8,
    //             strokeWeight: 2,
    //             fillColor: '#FF0000',
    //             fillOpacity: 0.35,
    //             map: map,
    //             center: pos,
    //             radius: 150
    //         });
    //         map.setZoom(17);
    //         map.setCenter(pos);
    //     });
    // } else {
    //     // Browser doesn't support Geolocation
    //     alert("未允許或遭遇錯誤！");
    // }
}
function clearMarkers() {
    setMapOnAll(null);
}
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}
function setMarkers () {
    var image = {
        url: '../static/assets/images/if_101_Warning_183416.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 20),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
    };
    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly'
    };
    
    for( key in res ) {
        var marker = new google.maps.Marker({
            position: {lat: res[key].longitude, lng: res[key].latitude},
            map: map,
            icon: image,
            shape: shape,
            zIndex: res[key].value
        });
        markers.push(marker)
    }
}