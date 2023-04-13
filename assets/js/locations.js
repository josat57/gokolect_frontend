/*
    jshint esversion: 6
 */

    $(document).ready(function() {
        //On load of the document all countries are loaded into the country select input.
        getCountries();
    
    
        const country = document.querySelectorAll("#country")[0];
        const state = document.querySelectorAll("#state")[0];
        const lga = document.querySelectorAll("#lga")[0];
    
        //Get state by the country code when a country is selected
        country.addEventListener("change", (eobjs) => {
           const countryCode = eobjs.currentTarget.value;
           getStates(countryCode);
           getCities(countryCode);
        });
    
        //Get all the local governments by the state code when a state is selected
        state.addEventListener("change", (eobjs) => {
           const stateCode = eobjs.currentTarget.value;
           getLocalGovernments(stateCode);
        });
    });
    
    //Get countries
    function getCountries(country_code = null){
        if(country_code === null) {
            $.getJSON("assets/js/json/countries.json", (data) =>{
                $("#country").html("");
                $("#country").append('<option value="">Select Country/Region</option>');
                $.each(data, function (idx, value) {
                    $("#country").append('<option value="' + value.code + '">' + value.name + '</option>');
                });
            });
        } else {
            $.getJSON("assets/js/json/countries.json", (data) =>{
                $.each(data, function (idx, value) {
                    if (country_code === value.code) {
                        // var option = $("<option selected='selected' />")
                        // $("#country").text("");
						// option.text(value.name);
                        // option.attr(value.code);
                        // $("#country").prepend(option).trigger("change");
                        $("#country").prepend(`<option selected = "selected" value="${value.code}">${value.name}</option>`).trigger('change');
                    }
                });
            });
        }
    }
    
    //get state of districts by country code
    function getStates(country_code) {
        if (country_code.length === 2) {
            $.getJSON("assets/js/json/states.json", (data) =>{
                $("#state").html("");
                $("#state").append('<option value="">Select State/Province/Region</option>');
                $.each(data, function (idx, value) {
                    if (idx === country_code) {
                        $.each(Object.values(value), function (key, val) {
                            $("#state").append('<option value="' + val.code + '">' + val.name + '</option>');
                        });
                    }
                });
            });
        } else {
            console.log("State ", country_code)
            $.getJSON("assets/js/json/states.json", (data) =>{
                $.each(data, function (idx, value) {
                    $.each(Object.values(value), function (key, val) {
                        if (val.code === country_code) {
                            // var option = $("<option selected='selected' />")
                            // option.text(value.name);
                            // option.attr(value.code);
                            // $("#state").prepend(option);
                            console.log(val, country_code);
                            $("#state").prepend(`<option selected = "selected" value="${value.code}">${value.name}</option>`).trigger('change');
                        }
                    });
                });
            });
        }
    }
    
    // Get cities by country code
    function getCities(country_code) {
        if (country_code.length === 2) {        
            $.getJSON("assets/js/json/cities.json", (data) =>{
                $("#city").html("");
                $("#city").append('<option value="">Select City/Town</option>');
                $.each(data, function (idx, value) {
                    if (idx === country_code) {
                        $.each(Object.values(value), function (key, val) {
                            $("#city").append('<option value="' + val.code + '">' + val.name + '</option>');
                        });
                    }
                });
            });
        } else {            
            $.getJSON("assets/js/json/cities.json", (data) =>{
                $.each(data, function (idx, value) {
                    $.each(Object.values(value), function (key, val) {
                        if (val.code === country_code) {
                            // var option = $("<option selected='selected' />");
                            // option.text(value.name);
                            // option.attr(value.code);
                            // $("#city").prepend(option).trigger('change');
                            console.log(val, country_code);
                            $("#city").prepend(`<option selected = "selected" value="${value.code}">${value.name}</option>`).trigger('change');
                        }
                    });
                });
            });
        }
    }
    
    function getLocalGovernments(state_code, lga_code = null) {
        if (lga_code === null) {
            $.getJSON("assets/js/json/lga.json", (data) =>{        
                $("#lga").html("");
                $("#lga").append('<option value="">Select LGA/District</option>');
                $.each(data, function (idx, value) {
                    if (idx === state_code.slice(0, 2)) {
                        $.each(value, function (inx, state_values) {
                            $.each(state_values, function (nx, lga_values) {
                                console.log(nx, lga_values);
                                if (nx === state_code) {
                                    $.each(Object.values(lga_values), function (key, val) {
                                        $("#lga").append('<option value="' + val.code + '">' + val.name + '</option>');
                                    });
                                }
                            });
                        });
                    }
                });
            });
        } else {
            $.getJSON("assets/js/json/lga.json", (data) =>{  
                $.each(data, function (idx, value) {
                    if (idx === state_code.slice(0, 2)) {
                        $.each(value, function (inx, state_values) {
                            $.each(state_values, function (nx, lga_values) {
                                if (nx === state_code) {
                                    $.each(Object.values(lga_values), function (key, val) {
                                        if (val.code === lga_code) {
                                            var option = $("<option selected='selected' />");
                                            option.text(value.name);
                                            option.attr(value.code);
                                            $("#lga").prepend(`<option selected="selected" value="${value.code}">${value.name}</option>`).trigger('change');
                                        }
                                    });
                                }
                            });
                        });
                    }
                });
            });
        }
    }
    
    