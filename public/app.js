//click events:
console.log('hello dave');
$(function () {

  var clickCount =1;
  $('#Experience_Button').click(addExperienceField);

  $('#Education_Button').click(addEducationField);
})

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
