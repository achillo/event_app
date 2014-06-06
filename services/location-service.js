/**
 * Created with WebStorm.
 * User: Mike Gray
 * Date: 6/5/14
 */

angular.module('eventApp').factory('EventService', function($q) {
    /*
     * If the device can use geolocation services,
     * calculate the users location and use that info
     * to look up the closest venues
     */
    /*
    function getLocaleFromPosition(pos){
        if(pos == null){
            return;
        }

        //Get the accuracy (in meters)
        var accuracy = pos.coords.accuracy;
        //If greater than 400 km, ask user for manual address.
        if(accuracy > 400000){
            //alert ("Location was not specific enough\nPlease enter an address, or zip code");
            return;
        }

        try{
            // fetch coordinates and store into a Google Maps LatLng object
            var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            //var for looping declared outside of loop
            var f=0;

            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({'latLng': latlng}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        //Try to get the zip code for the users location
                        $.each(results, function(key, val) {
                            if(val != null){
                                //Loop through the address components and search for zip code
                                for(f=0; f < val.address_components.length; f++)
                                {
                                    if(!isNaN(val.address_components[f].short_name) && val.address_components[f].short_name.length == 5){
                                        //Use this to get venues close to user

                                        //Break out of the inner loop by returning false.
                                        return( false );
                                    }
                                }

                            }
                        });
                    }
                } else {
                    //If we are in this block, the status is not google.maps.GeocoderStatus.OK.
                    // This most likely means we are over the limit for requests (happened during heavy testing)
                    //Do a defer.reject() and handle the error gracefully
                }
            });

        }catch(error){
            //Do a defer.reject() and handle the error gracefully
        }
    }


      */

    /*
     * Geolocation lookup error handler.
     * If anything goes wrong, ask the user to manually enter their location
     * Makes subsequent call to open a input control for manual input.
     * Give them useful feedback as well.
     */
    /*
    function geocodeErrorHandler(err) {

        if(err.code == err.POSITION_UNAVAILABLE){
            deferred.reject("That location was not found");
        }
        else if(err.code == err.PERMISSION_DENIED){
            deferred.reject("Geolocation services disabled.");
        }
        else{
            deferred.reject("Your location cannot be determined");
        }
    }
    */

     /*
     * (NOTE: This function is declared at the bottom of the script block to
     *  make sure any functions it requires have previously been declared
     *  This is just a good practice with javascript)
     *
     *  Do any pre-checks and startup boilerplate work in the init() function
     */
    /*

    var getCurrentLocation = function ()
    {
     var deferred = $q.defer();

    //function init() {

        if(navigator.geolocation){
            //Get the users location
            var opts = {
                enableHighAccuracy: true,
                timeout: 60000,
                maximumAge: 10000
            };
            navigator.geolocation.getCurrentPosition(getLocaleFromPosition, geocodeErrorHandler, opts);
        }
        else{
            alert ("Please enter an address or zip code to search for your local 411");
        }

        return deferred.promise;
    }
    */

    /**
     * Service to get location from device geolocation
     */
    /*
    this.getNavigatorLocation = function(params) {
        var httpRequest =  navigator.geolocation.getCurrentPosition(locationsSuccess, locationsFailure, opts);
        //var httpRequest = locations.cities(params.state_code);
        return httpRequest(null);
    };
    */

    /**
     * Get the team/club info that is closest to my current position
     */
    var loadClubDistances = function (fromLatLng, venues) {

        distanceArray = [];

        //var geocoder = new google.maps.Geocoder();
        var leastDistance = 0;
        var leastDistanceObject = 0;
        var dist = 0;
        var toLatLng;

        //40.7127° N, 74.0059° W New York
        //42.1022° N, 75.9117° W Binghamton
        //37.8136° S, 144.9631° E Melbourne
        //41.7633° N, 88.2900° W Aurora, IL
        //41.8819° N, 87.6278° W Chicago, IL
        //36.1215° N, 115.1739° W Las Vegas, NV




        for (var key in venues) {
            //if(key != 'mlb' && key != 'wbc'){

                toLatLng = new google.maps.LatLng(clubLocationsArray[key][0], clubLocationsArray[key][1]);
                dist = google.maps.geometry.spherical.computeDistanceBetween(fromLatLng, toLatLng);

                if(leastDistance == 0 && dist > 0){
                    leastDistance = dist;
                    leastDistanceObject = clubArray[key];
                }

                if(dist <  leastDistance){
                    leastDistance = dist;
                    leastDistanceObject = clubArray[key];
                }
            //}
        }

            //Found the closest team and have it's data object
            //Now load the closest team data and display
            loadClosestTeam(leastDistanceObject);
        //}
    }

    /*
     * The user can manually enter an address
     * to search for news and weather.
     * This function will take a free form address and try to look up info
     */
    var getLocaleFromAddess = function (address) {
        if(address == null){
            return;
        }

        try{
            var f=0; //var for looping declared outside of loop for effeciency
            var geocoder = new google.maps.Geocoder();

            geocoder.geocode({'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {

                        var latlng = new google.maps.LatLng(results[0].geometry.location.Ia, results[0].geometry.location.Ja);
                        loadClubDistances(latlng);

                        //Try to get the zip code for the users location
                        $.each(results, function(key, val) {
                            if(val != null){
                                //Loop through the address components and search for zip code
                                for(f=0; f < val.address_components.length; f++)
                                {
                                    if(!isNaN(val.address_components[f].short_name) && val.address_components[f].short_name.length == 5){
                                        //Use this to lookup local news and weather
                                        lookupLocalInfo(val.address_components[f].short_name);
                                        saveLocalesToStorage(val.address_components[f].short_name, val.formatted_address);
                                        //Break out of the inner loop by returning false.
                                        return( false );
                                    }
                                    //If all else fails, just go with the full address
                                    if(val.formatted_address != null){
                                        lookupLocalInfo(val.formatted_address);
                                    }
                                }
                            }
                        });


                        return;
                    }
                }
                else {
                    //If we are in this block, the status is not google.maps.GeocoderStatus.OK.
                    // This most likely means we are over the limit for requests (happened during heavy testing)
                    // Don't show an alert. User may get too many of these
                    // alert("There was a problem finding the location entered\nPlease try again");
                }
            });
        }catch(error){
            //Gracefully handle problem and give feedback to user so they know something happened to their request
            alert("There was a problem finding the location entered\nPlease try again");
        }
    }


    /**
     * Try to get user's location using device location service
     */
    this.getCurrentLocation = function() {

        var deferred = $q.defer();

        var locationsSuccess = function(data) {
            deferred.resolve(data);
        };
        var locationsFailure = function(err) {
            if(err.code == err.POSITION_UNAVAILABLE){
                deferred.reject("That location was not found");
            }
            else if(err.code == err.PERMISSION_DENIED){
                deferred.reject("Geolocation services disabled.");
            }
            else{
                deferred.reject("Your location cannot be determined");
            }
        };

        if(navigator.geolocation){
            //Get the users location
            var opts = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 10000
            };
            navigator.geolocation.getCurrentPosition(locationsSuccess, locationsFailure, opts);
        }
        else{
            deferred.reject("Could not determine your location");
        }

        /*this.getNavigatorLocation({
            state_code: opts
        }).then(locationsSuccess, locationsFailure);
        */

        return deferred.promise;
    };

});
