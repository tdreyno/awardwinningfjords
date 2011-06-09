---
title: Easy Google Maps with jQuery
slug: google-maps-with-jquery
date: 2009/07/22
---

The other day I needed a simple way to include a Google Map, so I wrote this jQuery function.

    :::JavaScript
    $.fn.googleMap = function(address, options) {
      var defaults = {
        lat: 44.081996,
        long: -123.0286928,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.HYBRID
      };

      options = $.extend(defaults, options || {});

      var center = new google.maps.LatLng(options.lat, options.long);
      var map = new google.maps.Map(this.get(0), $.extend(options, { center: center }));

      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK && results.length) {
          if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map
            });
          }
        }
      });
    };

Basically, the lat & long are default coordinates, but you pass in an address which Google focuses the map on.

This requires the latest (v3) version of the Google Map API.

Usage
-----

    :::HTML
    <script src='http://maps.google.com/maps/api/js?sensor=false' type='text/javascript'>
    </script>
    <script type='text/javascript'>
      $(document).ready(function() {
        $('#map-container').googleMap("3333 RiverBend Drive, Springfield, OR");
      });
    </script>