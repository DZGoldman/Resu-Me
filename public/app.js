//click events:

$(function () {

  $('#create-new-resume').click(newResume)
  $('.glyphicon-search').click(dataSearch)

})

var dataSearch = function () {
  console.log('searching');
  var search = $('.search-query').val()
  $.get('/data/'+search)
}


var newResume=  function () {
  //not yet mane
  console.log('making new resume');
 $.get('/resumeform') // render ejs

}

  //sign up
  // login
  //search box

  // on click of search,
  // send ajax request to data constroller
      // .done, get the data, visualize it, put it one the index




  // write new resume
  // on click, render resume view, which will have a form.
  // button for form, on click, send ajax request to new resume controller
