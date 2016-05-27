;( function ($) {

    $( function () {

        var HTML_WIDTH = "640";

        $(function() {
            $(window).resize(function(){ setZoom() });
            setZoom();
        });

        function setZoom(){
            var scale = $(window).width() / HTML_WIDTH * 100 + "%";
            $('html').css({'zoom' : scale });
        }


        var canvas = document.getElementById('mapArea');


        function getSuccessGeo( position ) {
            $(canvas).removeClass('loading');

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


    });


})(window.jQuery);