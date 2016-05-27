;( function ($) {


    var jqMiniOpt = {
    };

    $('#jqMini').jqMini(jqMiniOpt);


    var $nameForm = $('#nameForm');
    var $placeForm = $('#placeForm');
    var canvas = document.getElementById('mapResult');
    
    var $name = $('#name');
    var $place = $('#place');

    function viewMap( searchText ) {

        var lat = -33.8665433;
        var lng = 151.1956316;

        var latlng = new google.maps.LatLng( lat , lng );

        var mapOptions = {
            zoom: 15 ,				// ズーム値
            center: latlng		// 中心座標 [latlng]
        };

        var map = new google.maps.Map( canvas , mapOptions ) ;


        // 周辺検索する時のオプション
        // service.nearbySearch(request, callback);
        var nearbyRequest = {
            location: latlng,
            radius: 500,
            types: ['store']
        };

        var textRequest = {
            location: latlng,
            radius: 400,
            query: searchText
        };

        var service = new google.maps.places.PlacesService(map);
        service.textSearch(textRequest, function ( result ) {

            console.log(result);
            for ( var i = 0; i < result.length; i++ ) {
                var place = result[i];
                //createMarker(result[i]);
            }


        });


    }


    $nameForm.on( 'submit', function (e) {
        e.preventDefault();
    });

    $placeForm.on( 'submit', function (e) {
        e.preventDefault();

        var value = $place.val();
        console.log(value);
        console.log(e);
        viewMap(value);

    });


    /* ============================================= */
    /*
          map.js
     */
    /* ============================================= */


    var canvas = document.getElementById('mapArea');


    function getSuccessGeo( position ) {
        canvas.classList.remove('loading');

        var lat = position.coords.latitude;
        var lng = position.coords.longitude;


        var latlng = new google.maps.LatLng( lat , lng );

        var mapOptions = {
            zoom: 15 ,				// ズーム値
            center: latlng		// 中心座標 [latlng]
        };

        var map = new google.maps.Map( canvas , mapOptions ) ;

    }


    if( navigator.geolocation ) {

        navigator.geolocation.getCurrentPosition( function ( position ) {

            getSuccessGeo(position);

        } , function () {

        } , {
            enableHighAccuracy: true, // 精度を出来る限り高める
            timeout: 100000, // タイムアウト設定
            maximumAge: 100000 // ミリ秒間位置情報のキャッシュを保持
        } ) ;
    }






})(window.jQuery);