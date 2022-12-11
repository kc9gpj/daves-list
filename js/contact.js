$(document).ready(function() {

   
    var contactForm = $("#contactForm");
    var contactName = $("#contactName");
    var contactEmail = $("#contactEmail");
    var contactMessage= $("#contactMessage");
  
    $(contactForm).on("submit", function handleFormSubmit(event) {
      event.preventDefault();
     
      var newEmail = {
        Name: contactName.val(),
        Email: contactEmail.val(),
        Message: contactEmail.val(),
      };
      console.log(newEmail);
      submitEmail(newEmail);
    });
  
    // Submits a new post and brings user to home page upon completion
    function submitEmail(newEmail) {
      $.post("/contactSend", newEmail, function() {
          alert("Email has been sent!")
        window.location.href = "/home";
      });
    }
  });