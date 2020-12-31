function initialize() {
    $(document).ready(function() {
        const geocoder = new google.maps.Geocoder();
        var myLatLng = {
            lat: $("#host_pickup_lat").val() * 1,
            lng: $("#host_pickup_lan").val() * 1,
        };

        var custom_marker = {
            url: "public/assets/img/map_ico.svg",
            scaledSize: new google.maps.Size(30, 30),
        };

        var custom_marker2 = {
            url: "public/assets/img/mtr-pin-black.svg",
            scaledSize: new google.maps.Size(30, 30),
        };

        var map = new google.maps.Map(document.getElementById("address-map"), {
            center: {
                lat: $("#host_pickup_lat").val() * 1,
                lng: $("#host_pickup_lan").val() * 1,
            },

            zoom: 15,
        });

        var host_marker = new google.maps.Marker({
            icon: custom_marker,
            draggable: false,
            map: map,
            position: {
                lat: $("#host_pickup_lat").val() * 1,
                lng: $("#host_pickup_lan").val() * 1,
            },
        });

        var user_marker = new google.maps.Marker({
            icon: custom_marker2,
            draggable: false,
            map: map,
            position: myLatLng,
        });

        var circle = new google.maps.Circle({
            map: map,
            radius: $("#host_pickup_radius").val() * 1000,
            fillColor: "#05cbe5",
            strokeWeight: 0,
            clickable: false,
        });
        circle.bindTo("center", host_marker, "position");

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

        // Add dragging event listeners.
        // google.maps.event.addListener(user_marker, "dragend", function() {
        //     update_maps_data();
        // });

        // google.maps.event.addListener(map, 'click', function(event) {
        //     placeMarker(event.latLng);
        // });

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

            // var address = '';
            // if (place.address_components) {
            //     address = [
            //         (place.address_components[0] && place.address_components[0].short_name || ''),
            //         (place.address_components[1] && place.address_components[1].short_name || ''),
            //         (place.address_components[2] && place.address_components[2].short_name || '')
            //     ].join(' ');
            // }

            // infowindowContent.children['place-icon'].src = place.icon;
            // infowindowContent.children['place-name'].textContent = place.name;
            // infowindowContent.children['place-address'].textContent = address;
            // infowindow.open(map, user_marker);
        });

        $(document).on("click", ".get_pos_button", function() {
            $("#map_is_selected").val(1);

            $("#exp_booking_confirmation_maps").hide();
            $("#maps_modal").show();
            $(".set_pickup_loc_btn").addClass("gen_dnone");

            set_as_dev_loc();

            // window.setTimeout(function() {
            //     update_maps_data();
            // }, 1000);
        });

        //setting host map

        var map4 = new google.maps.Map(
            document.getElementById("host_loc_maps"), {
                center: myLatLng,
                zoom: 15,
                draggable: false,
                disableDefaultUI: true,
            }
        );

        new google.maps.Marker({
            icon: custom_marker2,
            draggable: false,
            map: map4,
            position: myLatLng,
        });

        function update_maps_data() {
            var distancePotential = google.maps.geometry.spherical.computeDistanceBetween(
                host_marker.getPosition(),
                user_marker.getPosition()
            );

            geocoder.geocode({
                    latLng: user_marker.getPosition(),
                },
                function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            // console.log(distancePotential > $("#host_pickup_radius").val() * 1000);
                            // console.log(distancePotential);

                            // console.log(host_marker.getPosition());

                            // console.log(user_marker.getPosition());

                            if (
                                distancePotential >
                                $("#host_pickup_radius").val() * 1000
                            ) {
                                $("#map_error_flag").val(1);

                                // custom_alert("Selected Pickup location too far");
                                $(".map_error_msg").html(
                                    "Your pickup location is too far"
                                );

                                $("#pickup_address").val("");
                                $(".maps_address_preview").html(
                                    "Your pickup location is too far"
                                );
                            } else {
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
                            }
                        } else {
                            custom_alert("No results found");
                        }
                    } else {
                        alert("Geocoder failed due to: " + status);
                    }
                }
            );
        }

        // function placeMarker(location) {
        //     if (user_marker == undefined) {
        //         alert('new marker');
        //         user_marker = new google.maps.Marker({
        //             position: location,
        //             map: map,
        //             animation: google.maps.Animation.DROP,
        //         });
        //     } else {
        //         user_marker.setPosition(location);
        //     }
        //     map.setCenter(location);

        // }

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
                        // console.log(user_marker.getPosition().lat());
                        // console.log(user_marker.getPosition().lng());
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