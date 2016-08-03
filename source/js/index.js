
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

    // _geoMap.jadeのマップ用要素
    var geoMapCanvas = document.getElementById('geoMapCanvas');

    // _map.jade 現在地のマップを見るで表示されるマップ用要素
    self.currentCanvas = document.getElementById('mapArea');

    // 住所検索用
    var geocoder = new google.maps.Geocoder();

    // ルート案内などを行う
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;


    // aタグ無しでページ内リンクを踏みたい時用
    var virtualLink = document.createElement('a');


    // new google.maps.places.PlacesService(map);
    // mapに対象としたいmapの要素を渡してapiを呼び出す
    var service;

    function viewMap( searchText ) {

        var mapOptions = {
            zoom: 15 ,				// ズーム値
            center: self.currentLatLng		// 中心座標 [latlng]
        };

        var map = new google.maps.Map( self.currentCanvas , mapOptions ) ;

        // 周辺検索する時のオプション
        // service.nearbySearch(request, callback);
        var nearbyRequest = {
            location: latlng,
            radius: 500
        };

        var textRequest = {
            location: latlng,
            radius: 50000,
            query: searchText//,
            //types: searchTypes
        };

        service = new google.maps.places.PlacesService(map);
        service.textSearch(textRequest,  function ( data ) {
            self.searchList = data;
            $scope.$apply();
        });

    }

    // 検索時などでフォームからフォーカスを外す
    self.unFocus = function () {
        document.activeElement.blur();
    };

    // キーワードで検索のフォームとひも付け
    self.searchKeyword = function ( value ) {
        event.preventDefault();
        self.unFocus();
        // プレイス検索を実行する為の関数
        viewMap(value);
        virtualLink.href = '#resultList';
        virtualLink.click();
    };

    function currentPosition() {
        function getSuccessGeo( position ) {

            self.currentCanvas.classList.remove('loading');

            self.geoPosition = latlng;
            var mapOptions = {
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: true,
                streetViewControl: true,
                rotateControl: true,
                zoom: 17 ,				// ズーム値
                center: self.currentLatLng		// 中心座標 [latlng]
            };

            var map = new google.maps.Map( self.currentCanvas , mapOptions ) ;

            marker = new google.maps.Marker({ // マーカーの追加
                position: latlng, // マーカーを立てる位置を指定
                map: map // マーカーを立てる地図を指定
            });
        }


        if( navigator.geolocation ) {

            navigator.geolocation.getCurrentPosition( function ( position ) {

                self.currentLat = position.coords.latitude;
                self.currentLng = position.coords.longitude;
                self.currentLatLng = latlng = new google.maps.LatLng( self.currentLat , self.currentLng );

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
    // 現在地のマップを見るボタンをクリックで実行
    self.mapBtnFunc = function () {
        currentPosition();
        self.unFocus();
    };

    // 住所で検索用の関数

    self.searchGeo = function ( value ) {
        event.preventDefault();
        self.unFocus();
        console.log(value);

        var searchOpt = {
            address: value
        };

        geocoder.geocode( searchOpt, function ( result ) {
            self.geoResultList = result;
            $scope.$apply();
        });

        virtualLink.href = '#geo';
        virtualLink.click();
    };
    
    self.viewGeoMap = function (lat, lng, pId, index) {

        var lat = lat;
        var lng = lng;
        self.geoIndex = index;
        self.geoPid = pId;

        var latlng = new google.maps.LatLng( lat , lng );
        self.geoLatLng = latlng;

        var mapOptions = {
            zoomControl: true,
            scaleControl: true,
            zoom: 15 ,				// ズーム値
            center: latlng,		// 中心座標 [latlng]
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var marker;

        var map = new google.maps.Map( geoMapCanvas , mapOptions );
        self.geoMapCanvas = map;
        directionsDisplay.setMap(map);

        marker = new google.maps.Marker({ // マーカーの追加
            position: latlng, // マーカーを立てる位置を指定
            map: map // マーカーを立てる地図を指定
        });

        self.geoMarker = marker;

        virtualLink.href = '#geoMap';
        virtualLink.click();

        var request = {
            location: latlng,
            placeId: pId,
            radius: 2000 /* 指定した座標から半径50m以内 */
        };

    };


    self.isNav = false;
    self.navStart = function ( ) {

        self.geoMarker.setVisible(false);

        self.isNav = true;

        navigator.geolocation.watchPosition( function ( position ) {
            calculateAndDisplayRoute();

        }, function ( error ) {

        }, {
            enableHighAccuracy: true, // 精度を出来る限り高める
            timeout: 100000, // タイムアウト設定
            maximumAge: 100000 // ミリ秒間位置情報のキャッシュを保持
        });


    };
    function calculateAndDisplayRoute() {
        directionsService.route({
            origin: self.currentLatLng,
            destination: self.geoLatLng,
            travelMode: google.maps.TravelMode.DRIVING
        }, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                console.log(response.routes[0]);
                var navtext = response.routes[0].legs[0].steps[0].instructions;
                self.navText = navtext.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
                console.log(self.navText);
                $scope.$apply();
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    self.backClick = function () {
        self.isNav = false;
    };

});