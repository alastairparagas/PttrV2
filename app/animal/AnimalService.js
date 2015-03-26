(function (window) {
    'use strict';

    var angular = window.angular,
        google = window.google,
        $ = window.$;

    angular.module('pttr.animal').service('AnimalService', ['$http', '$q', function ($http, $q) {

        var cityName,
            animalList,
            speciesList = [],   // Array of Species Objects representing species found in animalList
            breedList = [],     // Array of Breed Objects representing breeds found in animalList
            uniqueList = [];    // Array of Species Objects with categorized breeds in them

        function processCoordinates(position) {
            var lat = position.coords.latitude,
                long = position.coords.longitude,
                geocoder = new google.maps.Geocoder(),
                latlong = new google.maps.LatLng(lat, long);

            geocoder.geocode({'latLng': latlong}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        $.each(results, function (index, address_component) {
                            if (address_component.types[0] === "locality") {
                                cityName = address_component.address_components[0].long_name;
                            }
                        });
                    }
                }
            });
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(processCoordinates);
        }


        /**
            Gets a random list of animals using HTML5 Geolocation or server fallback
        */
        this.getAnimals = function () {
            var defer = $q.defer();
            if (cityName === undefined) {
                cityName = "Miami,FL";
            }
            $http.get("http://pttrapp.com/api/v1/animals?limit=100&city=" + cityName)
                .success(function (data) {
                    if (data.status === "ok") {
                        animalList = data.results;
                        defer.resolve(data.results);
                    } else {
                        defer.reject(data);
                    }
                })
                .error(function (data) {
                    defer.reject(data);
                });
            return defer.promise;
        };

        /**
            Gets a specific animal
        */
        this.getAnimal = function (animalId) {
            var defer = $q.defer();
            $http.get("http://pttrapp.com/api/v1/animals?city=Miami,FL")
                .success(function (data) {
                    if (data.status === "ok") {
                        defer.resolve(data.results);
                    } else {
                        defer.reject(data);
                    }
                })
                .error(function (data) {
                    defer.reject(data);
                });
        };

        /**
            Generates a list of species given a list of animals
        */
        this.getSpeciesList = function () {
            var used = "",          // Constructed string of species that were found in animalList
                o,
                i;
            // Iterate to get each animal in animalList
            for (o = 0; o < animalList.length; o += 1) {
                if (animalList[o].species !== undefined) {
                    // If animal has a specie but not in speciesList, construct Specie Object and add to speciesList!
                    if (used.search(animalList[o].species) === -1) {
                        used += " " + animalList[o].species;
                        speciesList.push({
                            type: animalList[o].species,
                            count: 1
                        });
                    } else {
                        // If animal has a species and is in speciesList, increment already-constructed Specie Object!
                        for (i = 0; i < speciesList.length; i += 1) {
                            if (animalList[o].species === speciesList[i].type) {
                                speciesList[i].count += 1;
                                break;
                            }
                        }
                    }
                }
            }
            return speciesList;
        };

        /**
            Generates a list of breeds given a list of animals
        */
        this.getBreedList = function () {
            if (speciesList.length === 0) {
                this.getSpeciesList();
            }
            var used = "",
                animalIterator,
                breedIterator,
                speciesIterator;
            for (animalIterator = 0; animalIterator < animalList.length; animalIterator += 1) {
                // Animal has a breed
                if (animalList[animalIterator].breed !== undefined) {
                    // Iterate through every species to see if the animal falls to one
                    for (speciesIterator = 0; speciesIterator < speciesList.length; speciesIterator += 1) {
                        // Animal is listed in species
                        if (speciesList[speciesIterator].type === animalList[animalIterator].species) {
                            if (used.search(animalList[animalIterator].breed) === -1) {
                                used += " " + animalList[animalIterator].breed;
                                breedList.push({
                                    type: animalList[animalIterator].breed,
                                    count: 1
                                });
                            } else {
                                // Animal is a wanted specie but breed is already added? Increment (breed is subtype of specie)
                                for (breedIterator = 0; breedList < breedList.length; breedList += 1) {
                                    if (speciesIterator[speciesIterator].type === animalList[animalIterator].species
                                            && breedList[breedIterator].type === animalList[animalIterator].breed) {
                                        breedList[breedIterator].count += 1;
                                    }
                                }
                            }
                            break;
                        }
                    }
                }
            }
            return breedList;
        };
        
        /**
            Generates a list correlating breeds with species
        */
        this.getAnimalsUnique = function () {
            if (speciesList.length === 0) {
                this.getSpeciesList();
            }
            var speciesIterator,
                animalIterator,
                uniqueIterator,
                used = "";
            for (speciesIterator = 0; speciesIterator < speciesList.length; speciesIterator += 1) {
                uniqueList.push({
                    type: speciesList[speciesIterator].type,
                    breeds: [],
                    count: speciesList[speciesIterator].count
                });
                for (animalIterator = 0; animalIterator < animalList.length; animalIterator += 1) {
                    if (speciesList[speciesIterator].type === animalList[animalIterator].species
                            && animalList[animalIterator].breed !== undefined) {
                        // If Animal's breed does not already exist
                        if (used.search(animalList[animalIterator].breed) === -1) {
                            used += " " + animalList[animalIterator].breed;
                            uniqueList[speciesIterator].breeds.push({
                                breed: animalList[animalIterator].breed,
                                count: 1
                            });
                        } else {
                            // If Animal's breed already existed
                            for (uniqueIterator = 0;
                                    uniqueIterator < uniqueList[speciesIterator].breeds.length;
                                    uniqueIterator += 1) {
                                if (speciesList[speciesIterator].type === animalList[animalIterator].species
                                        && uniqueList[speciesIterator].breeds[uniqueIterator].breed === animalList[animalIterator].breed) {
                                    uniqueList[speciesIterator].breeds[uniqueIterator].count += 1;
                                }
                            }
                        }
                    }
                }
            }
            return uniqueList;
        };

    }]);

}(window));