/*global */
import React, { useEffect } from 'react';


var {  } = window;

var MapApi = () => {

    useEffect(() => {
        var container = document.getElementById('map');
		var options = {
            
			center: new .maps.LatLng(37.55387536257194, 126.9367147903572),
			level: 4
		};
        var map = new .maps.Map(container, options);
  
        // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
        if (navigator.geolocation) {
    
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function(position) {
        
                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도
        
             var locPosition = new .maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                 message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
        
               // 마커와 인포윈도우를 표시합니다
              displayMarker(locPosition, message);
            
            });
    
        } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
    
         var locPosition = new .maps.LatLng(33.450701, 126.570667),    
                message = 'geolocation을 사용할수 없어요..'
        
         displayMarker(locPosition, message);
        }

        // 지도에 마커와 인포윈도우를 표시하는 함수입니다
        function displayMarker(locPosition, message) {

         // 마커를 생성합니다
         var marker = new .maps.Marker({  
             map: map, 
                position: locPosition
         }); 
             var iwContent = message,
             iwRemoveable = true;

         // 인포윈도우를 생성합니다
          var infowindow = new .maps.InfoWindow({
                content : '<div style="width:150px;text-align:center;">내 위치</div>',
               removable : iwRemoveable
          });
    
          // 인포윈도우를 마커위에 표시합니다 
         infowindow.open(map, marker);
    
         // 지도 중심좌표를 접속위치로 변경합니다
         map.setCenter(locPosition);      
        }    
        
       // 주소로 좌표를 검색합니다

     /*  var geocoder = new .maps.services.Geocoder();
        geocoder.addressSearch('서울특별시 마포구 백범로 8', function(result, status) {
        
            // 정상적으로 검색이 완료됐으면 
             if (status === .maps.services.Status.OK) {
        
                var coords = new .maps.LatLng(result[0].y, result[0].x);
        
                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new .maps.Marker({
                    map: map,
                    position: coords
                });
        
                // 인포윈도우로 장소에 대한 설명을 표시합니다
                var infowindow = new .maps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;">내 위치</div>'
                });
                infowindow.open(map, marker);
        
                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            } 
        });    */
        var positions = [
            {
                content: '<div>코인워시24</div>', 
                latlng: new .maps.LatLng(37.55498, 126.93323),
                id : '5fb9b57a793d993238ea023f',
        /*      polyline : new .maps.polyline({
                    path : [
                        new .maps.LatLng(37.55387536257194,126.9367147903572),
                        new .maps.LatLng(37.55498,126.93323)
                        ],
                }),
                distance : positions.polyline.getLength()*/
            },
            {
                content: '<div>크린에이드이대역점</div>', 
                latlng: new .maps.LatLng(37.55632, 126.94337),
                id : '5fb9b608793d993238ea0240'
            },
            {
                content: '<div>크린토피아크린워시365신촌그랑자이점</div>', 
                latlng: new .maps.LatLng(37.55583, 126.94341),
                id : '5fb9b700793d993238ea0242'
            },
            {
                content: '<div>24시빨래방 이대역점</div>', 
                latlng: new .maps.LatLng(37.55331,126.94541),
                id : '5fb9b772793d993238ea0243'
            },
            {
                content: '<div>크린토피아코인워시대흥역점</div>', 
                latlng: new .maps.LatLng(37.54565,126.94109),
                id : '5fb9b818793d993238ea0244'
            },
            {
                content: '<div>셀빨래방 염리점</div>', 
                latlng: new .maps.LatLng(37.54893,126.94912),
                id : '5fb9b89f793d993238ea0245'
            },
            {
                content: '<div>코인워시 24 공덕점</div>', 
                latlng: new .maps.LatLng(37.54765,126.95318),
                id : '5fb9b954793d993238ea0246'
            },
            {
                content: '<div>아쿠아워시 셀프빨래방 아현점</div>', 
                latlng: new .maps.LatLng(37.55340,126.95380),
                id : '5fb9b9d0793d993238ea0247'
            },
            {
                content: '<div>크린토피아 코인워시 북아현이편한세상 신촌점</div>', 
                latlng: new .maps.LatLng(37.55767,126.95300),
                id : '5fb9b608793d993238ea024a'
            },
            {
                content: '<div>펭귄하우스 아현점</div>', 
                latlng: new .maps.LatLng(37.55800,126.95141),
                id : '5fb9bab3793d993238ea024a'
            },
            {
                content: '<div>펭귄하우스 이대 1호점</div>', 
                latlng: new .maps.LatLng(37.55821,126.94388),
                id : '5fb9b608793d993238ea024b'
            },
            {
                content: '<div>화이트365 신촌점</div>', 
                latlng: new .maps.LatLng(37.55830,126.93947),
                id : '5fb9bb2f793d993238ea024b'
            },
            {
                content: '<div>런드리데이 신촌점</div>', 
                latlng: new .maps.LatLng(37.55840,126.93384),
                id : '5fb9b608793d993238ea024e'
            }

        ];
        for (var i = 0; i < positions.length; i ++) {
            // 마커를 생성합니다
            var marker = new .maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng // 마커의 위치
            });
            var infowindow = new .maps.InfoWindow({
                content: positions[i].content // 인포윈도우에 표시할 내용
            });
                // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
                // 이벤트 리스너로는 클로저를 만들어 등록합니다 
                // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
            .maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
            .maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
            .maps.event.addListener(marker, 'click', clickListener(positions[i].id));

            
        }
        function clickListener(id) {
            return function(){
            window.location.href = "/product/"+id;
            };
        }
        function makeOverListener(map, marker, infowindow) {
            return function() {
                infowindow.open(map, marker);
            };
        }
        
        // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
        function makeOutListener(infowindow) {
            return function() {
                infowindow.close();
            };
        }

    }, []);
 


    return (
      <div id='map' style={{width:'85%',height:'100%',float:'left', position:'fixed',top:'330'}} ></div>
        
    );
}

export default MapApi; 