//click events:
console.log('hello dave');
$(function () {
  $('#Experience_Button').click(function () {
    console.log( 'clicked');
    console.log($('#experience-template').html());

    var $copy = $($('#experience-template').html()).clone();

  $('#experience-container').append($copy)
  });
//sign up
// login
//search box

// on click of search,
// send ajax request to data constroller
    // .done, get the data, visualize it, put it one the index




// write new resume
// on click, render resume view, which will have a form.
// button for form, on click, send ajax request to new resume controller



  //submit a new resume


 // upload a resume


})
