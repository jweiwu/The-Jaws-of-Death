var map, heatmap, cityCircle;
var initPos = {lat: 37.775, lng: -122.434}
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
// $.ajax({
//     method: "GET",
//     url: "/sample_test.json",
// })
// .done(function( msg ) {
//     for (  )
//     console.log(msg.latitude.length)
// });
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: initPos,
        zoom: 17,
        styles: styles,
    });
    google.maps.event.addListener(map, 'click', function(event){
        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();
        console.log('latitude', latitude);
        console.log('longitude', longitude);
    })
    cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: initPos,
        radius: 150
    });
    heatmap = new google.maps.visualization.HeatmapLayer({
        radius: 80,
        data: [
            {location: new google.maps.LatLng(37.782, -122.447), weight: 10},
            new google.maps.LatLng(37.782, -122.445),
            {location: new google.maps.LatLng(37.782, -122.443), weight: 1},
            {location: new google.maps.LatLng(37.782, -122.441), weight: 1},
            {location: new google.maps.LatLng(37.782, -122.439), weight: 1},
            new google.maps.LatLng(37.782, -122.437),
            {location: new google.maps.LatLng(37.782, -122.435), weight: 1},
          
            {location: new google.maps.LatLng(37.785, -122.447), weight: 1},
            {location: new google.maps.LatLng(37.785, -122.445), weight: 1},
            new google.maps.LatLng(37.785, -122.443),
            {location: new google.maps.LatLng(37.785, -122.441), weight: 1},
            new google.maps.LatLng(37.785, -122.439),
            {location: new google.maps.LatLng(37.785, -122.437), weight: 1},
            {location: new google.maps.LatLng(37.785, -122.435), weight: 1}
        ],
        map: map
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