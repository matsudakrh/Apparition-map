
var app = angular.module( 'MainApp', []);

app.controller( 'MainController', function ( $scope ) {

    var self = this;

    self.geoPosition = '';

    console.log(self);


    var searchTypes = [
        'amusement_park',
        'cemetery',
        'church',
        'finance',
        'funeral_home',
        'hindu_temple',
        'laundry',
        'library',
        'lodging',
        'mosque',
        'museum',
        'park',
        'place_of_worship',
        'stadium',
        'storage',
        'synagogue',
        'political',
        'country'
    ];


    //self.searchList = ['shidhoi'];

    var $nameForm = document.getElementById('nameForm');
    var canvas = document.getElementById('mapResult');

    var $name = document.getElementById('name');
    var $place = document.getElementById('place');

    var geocoder = new google.maps.Geocoder();

    var virtualLink = document.createElement('a');

    var service;

    function viewMap( searchText ) {

        var lat = 35.172727;
        var lng = 136.886385;

        var latlng = new google.maps.LatLng( self.currentLat , self.currentLng );

        var mapOptions = {
            zoom: 15 ,				// ズーム値
            center: latlng		// 中心座標 [latlng]
        };

        var map = new google.maps.Map( canvas , mapOptions ) ;

        // 周辺検索する時のオプション
        // service.nearbySearch(request, callback);
        var nearbyRequest = {
            location: latlng,
            radius: 500
        };

        var textRequest = {
            location: latlng,
            radius: 50000,
            query: searchText,
            types: searchTypes
        };

        service = new google.maps.places.PlacesService(map);
        service.textSearch(textRequest,  function ( data ) {

            self.searchList = data;
            console.log(data);

            $scope.$apply();

        });

    }


    $nameForm.addEventListener( 'submit', function (e) {
        e.preventDefault();
    });


    
    
    self.searchPlace = function ( value ) {
        event.preventDefault();
        viewMap(value);
        virtualLink.href = '#resultList';
        virtualLink.click();
    };
    


    function reverseGeoCording( placeid ) {
        var geoOption = {
            placeId: placeid
        };

        geocoder.geocode( geoOption, function ( result, status ) {
            console.log(result);
        });

    }


    /* ============================================= */
    /*
     map.js
     */
    /* ============================================= */


    var canvas = document.getElementById('mapArea');


    function currentPosition() {
        function getSuccessGeo( position ) {

            canvas.classList.remove('loading');
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            self.currentLat = lat;
            self.currentLng = lng;

            var latlng = new google.maps.LatLng( lat , lng );

            self.geoPosition = latlng;
            var mapOptions = {
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: true,
                streetViewControl: true,
                rotateControl: true,
                zoom: 15 ,				// ズーム値
                center: latlng		// 中心座標 [latlng]
            };

            var map = new google.maps.Map( canvas , mapOptions ) ;

            marker = new google.maps.Marker({ // マーカーの追加
                position: latlng, // マーカーを立てる位置を指定
                map: map // マーカーを立てる地図を指定
            });
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


    }
    currentPosition();

    var $mapBtn = document.getElementById('mapBtn');

    $mapBtn.addEventListener( 'click', function () {
        currentPosition();
    });


    self.viewResult = function () {

    };

    self.geoTestFunc = function ( ) {
        event.preventDefault();

        var searchOpt = {
            address: self.geoKeyword
        };

        geocoder.geocode( searchOpt, function ( result ) {
            self.geoResultList = result;
            console.log(result);
            $scope.$apply();
        });

        virtualLink.href = '#geo';
        virtualLink.click();
    };
    
    self.viewGeoMap = function (lat, lng, pId) {
        console.log(lat, lng);


        var geoMapCanvas = document.getElementById('geoMapCanvas');
        var lat = lat;
        var lng = lng;


        var latlng = new google.maps.LatLng( lat , lng );

        var mapOptions = {
            zoomControl: true,
            scaleControl: true,
            zoom: 15 ,				// ズーム値
            center: latlng,		// 中心座標 [latlng]
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };


        var marker;


        var map = new google.maps.Map( geoMapCanvas , mapOptions );

        marker = new google.maps.Marker({ // マーカーの追加
            position: latlng, // マーカーを立てる位置を指定
            map: map // マーカーを立てる地図を指定
        });
        virtualLink.href = '#geoMap';
        virtualLink.click();

        var request={
            location: latlng,
            placeId: pId,
            radius: 2000 /* 指定した座標から半径50m以内 */
        };
        console.log(pId);

        service.getDetails( request, function ( place, status ) {
            if ( !place ) {
                return;
            }
            console.log(place);
        });

    };



});