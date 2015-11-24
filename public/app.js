//click events:
console.log('hello dave');
$(function () {

//sign up
// login
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
