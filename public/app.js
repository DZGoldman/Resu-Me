$(function() {
   /*********  Visualization  *************/
   // create a wordcloud when the button is hit
   $('button#cloudQuery').click(function() {
      getCloudData();
   });
   // testing function to display the word cloud
   $('button#search-query').click(getCloudData);
   $('#analyze-resume').click(function() {
      $('#analyze-resume').css("background-color", "red");
      getClassify();
   });

   //sign up
   // login

   /*******  Resume Form *********/
   var clickCount = 1;
   $('#Experience_Button').click(addExperienceField);
   $('#Education_Button').click(addEducationField);


   $('#create-new-resume').on('click', function() {
      console.log('making new resume');
      $.get('/resumeform') // render ejs
   });

});

var fullText = function(resume) {
   var result = [];
   result.push(resume.summary);
   resume.experiences.forEach(function(value, index) {
      result.push(value.description);
   });
   return result.join(' ');
};


var testQuery = 'computer programmer/';

/*******  Resume Form *********/
var addExperienceField = function() {
   var $copy = $($('#experience-template').html()).clone();
   $('#experience-container').append($copy)
}

var addEducationField = function() {
   var $copy = $($('#education-template').html()).clone();
   console.log($copy);
   $('#education-container').append($copy)
}



/*******  Viaualization *********/

var getCloudData = function() {
   var query = '/cloud/' + $("input#search-query").val();
   console.log(query);
   $.get(query).done(showCloud);
}

var showCloud = function(data) {
   console.log("got to the d3 display function ");
   $('.wordcloud').remove();
   //have to save as a variable in order to access.
   // data[0] is arbitrary
   var frequency_list = data[0].data;
   var color = d3.scale.linear()
      .domain([0, 1, 2, 3, 4, 5, 6, 10, 15, 20, 100])
      .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

   //create a function for scaling the size values

   d3.layout.cloud().size([600, 600])
      .words(frequency_list)
      .padding(5)
      .rotate(0)
      .font("Impact")
      .fontSize(function(d) {
         return d.size * 3;
      })
      .on("end", draw)
      .start();

   function draw(words) {
      d3.select("#cloudy").append("svg")
         .attr("width", "100%")
         .attr("height", 605)
         .attr("class", "wordcloud")
         .append("g")
         .attr("transform", "translate(300,300)")
         .selectAll("text")
         .data(words)
         .enter().append("text")
         .style("font-size", function(d) {
            return d.size + "px";
         })
         .style("fill", function(d, i) {
            return color(i);
         })
         .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
         })
         .text(function(d) {
            return d.text;
         });
   }
}


// comparing user resumes
var getClassify = function() {
   $('#analyze-resume').css("background-color", "blue");
   $.get('/compareResume').done(classifyAndCompare);
   // take the current resume of the current user
   // send ajax request to the classifiction route
}

var classifyAndCompare = function(user) {
   $('#analyze-resume').css("background-color", "yellow");
   var currentResume = user.resumes[user.resumes.length - 1];
   var full = fullText(currentResume);
   var q = $("#cloud-vis").val() + '/';
   // FIXME change this and the route in server.js to ensure
   $.get('/analyzeResume/' + q + full).done(showClassification);
}

// this will just be a d3 function that will take all of the data and display it
var showClassification = function(classification) {
   $(".graphic").remove();
   $('#analyze-resume').css("background-color", "green");
   //classifications is an array of hashes with the label and the value
   // it is returned sorted by likeess

   /* NOTE test functions
   console.log(classification);
   classification.forEach(function(val, index){
      var add = $('<p>').text(val.label + ": " + val.value);
      $('.container').append( add );
   })
   NOTE end of test functions*/

   // Setup the D3 svg
   var w = 800;
   var h = 200;
   var m = 1000000;
   var pad = 3;
   var len = classification.length;

   // normalize all of the values.
   var min = d3.min(classification, function(d) {
      return d.value;
   });

   var max = d3.max(classification, function(d) {
      return d.value;
   });
   var yScale = d3.scale.log()
      .domain([min, max])
      .range([0, h]);

   var svg = d3.select("div#graph")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("class", "graphic");


   svg.selectAll("rect")
      .data(classification)
      .enter()
      .append("rect")
      .attr("x", function(d, i) {
         return i * (w / classification.length);
      })
      .attr("y", function(d) {
         return h - yScale(d.value);
      })
      .attr('width', (w / classification.length - pad))
      .attr('height', function(d) {
         // console.log(d.value)
         return yScale(d.value);
      })
      .style("fill", "blue")
      .on("hover", function(){
         d3.select(this).style("fill", "orange");
      })
      .on("mouseover", function(d) {
         $('#job-description').text(d.label);
      })
      .on("mouseout", function() {
         $('#job-description').text('___________________');
      });
   // // create the
   // debugger;
}
