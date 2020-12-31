function initialize() {
    $(document).ready(function() {
        const geocoder = new google.maps.Geocoder();
        var myLatLng = {
            lat: $("#address-latitude").val() * 1,
            lng: $("#address-longitude").val() * 1,
        };

        var map = new google.maps.Map(document.getElementById("address-map"), {
            zoom: 15,
            center: myLatLng,
        });

        var map2 = new google.maps.Map(
            document.getElementsByClassName("pickup_maps_preview")[0], {
                center: myLatLng,
                zoom: 15,
                draggable: false,
                disableDefaultUI: true,
            }
        );

        var custom_marker2 = {
            url: "../public/assets/img/mtr-pin-black.svg",
            scaledSize: new google.maps.Size(30, 30),
        };

        var user_marker = new google.maps.Marker({
            icon: custom_marker2,
            draggable: false,
            map: map,
            position: myLatLng,
        });

        var input = document.getElementById("address_input");
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo("bounds", map);
        // Set the data fields to return when the user selects a place.
        autocomplete.setFields([
            "address_components",
            "geometry",
            "icon",
            "name",
        ]);

        //keep user marker center
        google.maps.event.addListener(map, "center_changed", function() {
            // 0.1 seconds after the center of the map has changed,
            // set back the marker position.
            window.setTimeout(function() {
                user_marker.setPosition(map.getCenter());
            }, 100);
        });

        google.maps.event.addListener(map, "dragend", function() {
            update_maps_data();
        });

        autocomplete.addListener("place_changed", function() {
            // infowindow.close();
            user_marker.setVisible(false);
            $("#map_is_selected").val(1);
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                window.alert(
                    "No details available for input: '" + place.name + "'"
                );
                return;
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
                map.setZoom(15); // Why 17? Because it looks good.
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(15); // Why 17? Because it looks good.
            }

            user_marker.setPosition(place.geometry.location);
            user_marker.setVisible(true);

            $("#exp_booking_confirmation_maps").hide();
            $("#maps_modal").show();
            $(".set_pickup_loc_btn").addClass("gen_dnone");
            update_maps_data();
        });

        $(document).on("click", ".get_pos_button", function() {
            $("#map_is_selected").val(1);

            $("#exp_booking_confirmation_maps").hide();
            $("#maps_modal").show();
            $(".set_pickup_loc_btn").addClass("gen_dnone");

            set_as_dev_loc();
        });

        function update_maps_data() {
            geocoder.geocode({
                    latLng: user_marker.getPosition(),
                },
                function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            $("#map_error_flag").val(0);
                            custom_alert("Pickup location selected");

                            setLocationCoordinates2(
                                user_marker.getPosition().lng(),
                                user_marker.getPosition().lat()
                            );

                            // here assign the data to asp lables
                            $("#address-input").val(
                                results[1].formatted_address
                            );
                            $("#pickup_address").val(
                                results[1].formatted_address
                            );
                            $(".maps_address_preview").html(
                                results[1].formatted_address
                            );
                        } else {
                            custom_alert("No results found");
                        }
                    } else {
                        alert("Geocoder failed due to: " + status);
                    }
                }
            );
        }

        function setLocationCoordinates2(a, b) {
            $("#address-longitude").val(a);
            $("#address-latitude").val(b);
        }

        function set_as_dev_loc() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        var pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        map.setCenter(pos);
                        user_marker.setPosition(pos);
                        update_maps_data();
                    },
                    function() {
                        handleLocationError(true, infoWindow, map.getCenter());
                    }
                );
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }
        }
    });
}

$(document).on("click", ".map_confirm", function() {
    if ($("#map_error_flag").val() == 1) {
        //
        $(".set_pickup_loc_btn").removeClass("gen_dnone");
        $(".map_error_msg").show();
    } else {
        $("#address-map-container2").show();
        $(".set_pickup_loc_btn").hide();
        $(".map_error_msg").hide();

        var custom_marker2 = {
            url: "../public/assets/img/mtr-pin-black.svg",
            scaledSize: new google.maps.Size(30, 30),
        };

        var myLatLng2 = {
            lat: $("#address-latitude").val() * 1,
            lng: $("#address-longitude").val() * 1,
        };
        map2 = new google.maps.Map(
            document.getElementsByClassName("pickup_maps_preview")[0], {
                center: myLatLng2,
                zoom: 15,
                draggable: false,
                disableDefaultUI: true,
            }
        );
        new google.maps.Marker({
            icon: custom_marker2,
            draggable: false,
            map: map2,
            position: myLatLng2,
        });
    }
});