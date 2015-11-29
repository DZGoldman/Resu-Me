//click events:
console.log('hello dave');
$(function () {

// testing function to display the word cloud
   $('#testCloud').click(getCloudData);
//sign up
// login
//search box

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
      var query = '/cloud/' + $("input#query").val();
      $.get(query).done(showCloud);
}

// append a wordcloud with the class 'wordcloud'
var showCloud = function(data) {
   console.log("got to the d3 display function ");

   //have to save as a variable in order to access.
   // data[0] is arbitrary
   var frequency_list = data[2].data;
   var color = d3.scale.linear()
      .domain([0, 1, 2, 3, 4, 5, 6, 10, 15, 20, 100])
      .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

   d3.layout.cloud()
   // .size([800, 300])
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
         .attr("width", 960)
         .attr("height", 605)
         .attr("class", "wordcloud")
         .style("border", "3px solid black")
         .append("g")
         // without the transform, words words would get cutoff to the left and top, they would
         // appear outside of the SVG area
         .attr("transform", "translate(480,300)")
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
