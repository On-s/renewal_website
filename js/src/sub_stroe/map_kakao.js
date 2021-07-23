// https://apis.map.kakao.com/web/guide/



const REST_API_KEY = '4ac0100e2dd3015d00795ce6c881021c';
 $.ajax({
        url: 'https://dapi.kakao.com//v2/local/search/address.json?query=제주 bhc',
        headers: {'Authorization' : 'KakaoAK' + REST_API_KEY},
        type : 'GET'
    }).done(function (data) {

        console.log(data);
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(126.498229141199, 33.4889179032603), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };
        
        var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        

});
