//click events:
console.log('hello dave');
$(function () {

//sign up

// login

//search box


// write new resume

  $('#create-new-resume').on('click', function () {
    console.log('making new resume');

   $.get('/resumeform') // render ejs
  })


  //submit a new resume


 // upload a resume


})
