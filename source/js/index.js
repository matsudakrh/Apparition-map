
var app = angular.module( 'MainApp', []);

app.controller( 'MainController', function ( $scope ) {

    var self = this;
    console.log(self);


    //self.searchList = ['shidhoi'];

    var $nameForm = document.getElementById('nameForm');
    var $placeForm = document.getElementById('placeForm');
    var canvas = document.getElementById('mapResult');

    var $name = document.getElementById('name');
    var $place = document.getElementById('place');


    var virtualLink = document.createElement('a');

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
            radius: 2000,
            query: searchText
        };

        var service = new google.maps.places.PlacesService(map);
        service.textSearch(textRequest, function ( data ) {

            self.searchList = data;
            console.log(data);
            for ( var i = 0; i < data.length; i++ ) {
                //self.searchList.push(data[i].name);
                //createMarker(result[i]);
            }
            //console.log(Array.isArray(data));
            //self.searchList = data;
            // console.log(self);
            // console.log(self.searchList);
            // console.log(self.searchList[0]);
            // console.log(self.searchList[0].name);
            $scope.$apply();

        });

    }


    $nameForm.addEventListener( 'submit', function (e) {
        e.preventDefault();
    });

    $placeForm.addEventListener( 'submit', function (e) {
        e.preventDefault();

        var value = $place.value;
        console.log(value);
        virtualLink.href = '#resultList';
        virtualLink.click();
        viewMap(value);

    });


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


    }
    currentPosition();


    var $mapBtn = document.getElementById('mapBtn');

    $mapBtn.addEventListener( 'click', function () {
        currentPosition();
    });




});

;( function () {







})();