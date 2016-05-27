

$(->


  lat = 0
  lng = 0

  viewMap clat, clng ->



  canvas = document.getElementById('mapArea')


  navigator.geolocation.getCurrentPosition ((position) ->
    $(canvas).removeClass 'loading'
    lat = position.coords.latitude
    lng = position.coords.longitude
    latlng = new google.maps.LatLng(lat, lng)
    mapOptions =
      zoom: 15
      center: latlng
    map = new (google.maps.Map)(canvas, mapOptions)
    ), ( (error) ->
      console.log 'Error!'

    ),
      enableHighAccuracy: true
      timeout: 100000
      maximumAge: 100000
)

