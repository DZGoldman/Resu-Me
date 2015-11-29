//click events:
console.log('hello dave');
$(function () {

// testing function to display the word cloud
//   $('body').click(getCloudData);
//sign up
// login

  var clickCount =1;
  $('#Experience_Button').click(addExperienceField);

  $('#Education_Button').click(addEducationField);


//new resume form button helpers:
var addExperienceField= function () {
  var $copy = $($('#experience-template').html()).clone();
$('#experience-container').append($copy)
}

var addEducationField =function () {
  var $copy = $($('#education-template').html()).clone();
  console.log($copy);
$('#education-container').append($copy)
}

//search box

// on click of search,
// send ajax request to data constroller
    // .done, get the data, visualize it, put it one the index




// write new resume
// on click, render resume view, which will have a form.
// button for form, on click, send ajax request to new resume controller
  $('#create-new-resume').on('click', function () {
    console.log('making new resume');

   $.get('/resumeform') // render ejs
  })


  //submit a new resume


 // upload a resume


})



var getCloudData = function() {
   // get the data from the cloud route
   // format it and pass it into showCloud
   $.get('/cloud').done(showCloud);
}

// append a wordcloud with the class 'wordcloud'
var showCloud = function(data) {
   $('.wordcloud').remove();
   var frequency_list = data;
   var color = d3.scale.linear()
      //maps different colors to this range of colors
      .domain([0, 1, 2, 3, 4, 5, 6, 10, 15, 20, 100])
      .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

   d3.layout.cloud().size([800, 300])
      .words(frequency_list)
      .rotate(0)
      .fontSize(function(d) {
         return d.size;
      })
      .on("end", draw)
      .start();

   function draw(words) {
      d3.select("body").append("svg")
         .attr("width", 850)
         .attr("height", 350)
         .attr("class", "wordcloud")
         .append("g")
         // without the transform, words words would get cutoff to the left and top, they would
         // appear outside of the SVG area
         .attr("transform", "translate(320,200)")
         //select the words that you want to add
         .selectAll("text")
         //use the array set by .words() to populate the fill.
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
