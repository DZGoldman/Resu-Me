//click events:
console.log('hello dave');

//sign up

// login

//search box

// write new resume
$(function () {
  $('#create-new-resume').on('click', function () {
    console.log('making new resume');

   $.get('/resumeform') // render partial
  })
})

  //submit a new resume


 // upload a resume
