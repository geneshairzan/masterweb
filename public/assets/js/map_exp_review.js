function initMap() {
    $(document).ready(function() {
        // The location of Uluru
        const geocoder = new google.maps.Geocoder();
        if ($("#booking_is_pickup").val() == 0) {
            var host_loc = {
                lat: $("#map_lat").val() * 1,
                lng: $("#map_lan").val() * 1,
            };
        } else {
            var host_loc = {
                lat: $("#map_lat").val() * 1,
                lng: $("#map_lan").val() * 1,
            };
        }

        var custom_marker2 = {
            url: "public/assets/img/mtr-pin-black.svg",
            scaledSize: new google.maps.Size(30, 30),
        };

        var map = new google.maps.Map(document.getElementById("map"), {
            disableDefaultUI: true,
            zoom: 15,
            center: host_loc,
        });
        var marker = new google.maps.Marker({
            icon: custom_marker2,

            position: host_loc,
            map: map,
        });

        geocoder.geocode({
                latLng: host_loc,
            },
            function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        // custom_alert(results[1].formatted_address);
                        $(".geocode_address").html(
                            results[1].formatted_address
                        );
                    } else {
                        custom_alert("No results found");
                    }
                } else {
                    custom_alert("Geocoder failed due to: " + status);
                }
            }
        );
    });
}