(function() {

  return {
    // Set a default stage of loading
    defaultState: 'loading',
    // Set events
    events: {
      'app.activated':'loadNasaAPOD',
      'change input#datepicker': 'onChangeDate',
    },
    requests: {
        // we fetch now the apod vial nasa api
        fetchNasaAPOD: function(strDate) {
          // Return the data
          return {
            url: "https://api.nasa.gov/planetary/apod?concept_tags=True&date=" + strDate + "&api_key=8tKXFJvk4bzxmNizdRyj62p8ouqTEIo4LCoJO7FP",
            type: 'GET',
          };
        }
    },
    // load the data
    loadNasaAPOD: function(strDate) {
        // the date always return a object on first instantiation - do we need to add the current date?
        if (_.isObject(strDate)) {
          // ovveride - get the current date
          strDate = moment().format("YYYY-MM-DD");
        }

        // Add loading on change
        this.$("#nasa-image").empty();
        this.$("#nasa-image").append("<div class='spinner dotted'></div>");

        // Make the request
        this.ajax('fetchNasaAPOD', strDate).done(
            // Handle the response
            function(objReturn) {
              // set the current or selected date
              objReturn.date = strDate;
              // set the status first
              objReturn.status = true;
              // set a media_type
              objReturn.isimage = true;

              // Do we have errors?
              if (!_.isUndefined(objReturn.error)) {
                // Set to false
                objReturn.status = false;
              }

              // Is thie video?
              if (objReturn.media_type == "video") {
                // Set to false to know that this is video
                objReturn.isimage = false;
              }
              // render the JSON data
              this.switchTo('nasaapod', objReturn);
            }
        );
    },
    // we reload once we change the datepicker - event at the top
    onChangeDate: function() {
      // Get the date
      var strDate = this.$("#datepicker").val();
      // reload by date
      this.loadNasaAPOD(strDate);
    }
  };

}());
