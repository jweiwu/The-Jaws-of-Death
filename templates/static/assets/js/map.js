var map, heatmap, cityCircle;
var initPos = {lat: 24.994538, lng: 121.450769}
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
function fetchData (pos){
    var url = '/api/nasa/get_wind/'+ pos.lng +'/'+ pos.lat
    $.ajax({
        method: "GET",
        url: url,
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
            radius: 45,
            opacity:0.8,
            data: heatmapList,
            map: map,
            gradient: gradient,
        });
        cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: pos,
            radius: 15000
        });
        google.maps.event.trigger(map, 'resize');
        heatmap.setMap(map);
        map.setCenter(pos);
    });
}
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
        mapTypeControl: true
    });
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);

    google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();
        var pos = {
            lat: places[0].geometry.location.lat(),
            lng: places[0].geometry.location.lng()
        };
        console.log('places', places[0].geometry.location.lat());
        console.log('places', places[0].geometry.location.lng());
        fetchData(pos)
    })


    google.maps.event.addListener(map, 'click', function(event){
        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();
        console.log('latitude:', latitude, 'longitude:', longitude);
    })
    google.maps.event.addListener(map, 'zoom_changed', function() {
        zoomLevel = map.getZoom();
        console.log('zoomLevel', zoomLevel);
        if(heatmap) {
            if(zoomLevel <= 16) {
                heatmap.set('radius', heatmap.get('radius') ? null : 60);
            } 
            else if(zoomLevel <= 14) {
                heatmap.set('radius', heatmap.get('radius') ? null : 50);
            } 
            else if(zoomLevel <= 10) {
                heatmap.set('radius', heatmap.get('radius') ? null : 40);
            }
            else if(zoomLevel <= 5) {
                heatmap.set('radius', heatmap.get('radius') ? null : 30);
            }
        }
    });
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            fetchData(pos)
            var marker = new google.maps.Marker({
                position: pos,
                map: map
            });
            map.setZoom(17);
        });
    } else {
        // Browser doesn't support Geolocation
        alert("未允許或遭遇錯誤！");
    }
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
        var contentString = '<div id="content"><p>雨量: 大雨</p><p>體感溫度: 很冷</p><p>風速: 暴風</p><p>回饋: 這邊風雨很大不要來，小心不要來</p></div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        var marker = new google.maps.Marker({
            position: {lat: res[key].longitude, lng: res[key].latitude},
            map: map,
            icon: image,
            shape: shape,
            zIndex: res[key].value,
            // label: { text: 'A123' },
        });
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
        markers.push(marker)
    }
}