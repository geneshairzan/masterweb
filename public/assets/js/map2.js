function initMap() {
    $(document).ready(function() {
        // The location of Uluru
        var uluru = {
            lat: $("#map_lat").val() * 1,
            lng: $("#map_lan").val() * 1,
        };
        // The map, centered at Uluru
        var map = new google.maps.Map(document.getElementById("map"), {
            disableDefaultUI: true,
            zoom: 15,
            center: uluru,
        });

        var custom_marker2 = {
            url: js_base_url + "/public/assets/img/mtr-pin-black.svg",
            scaledSize: new google.maps.Size(30, 30),
        };
        // The marker, positioned at Uluru
        var marker = new google.maps.Marker({
            icon: custom_marker2,
            position: uluru,
            map: map,
        });
    });
}