document.addEventListener('DOMContentLoaded', function() {
  var consent = document.getElementById('consent');
  var mainContent = document.querySelector('.main-content');
  var navbar = document.querySelector('.navbarHead');
  var acceptConsent = document.getElementById('acceptConsent');
  var rejectConsent = document.getElementById('rejectConsent');
  var rejectConfirmation = document.getElementById('rejectConfirmation');
  var cancelRejectModal = document.getElementById('cancelRejectModal');
  var confirmRejectModal = document.getElementById('confirmRejectModal');

    let consentValue = localStorage.getItem('consent');
    if(consentValue==='accepted'){
      consent.style.display = 'none';
      mainContent.classList.remove('blur');
      navbar.classList.remove('blur');
    } else {
      setTimeout(function() {
      consent.style.display = 'flex';
      }, 2000);
    }
 

  acceptConsent.addEventListener('click', function() {
    localStorage.setItem('consent', 'accepted');
    consent.style.display = 'none';
    mainContent.classList.remove('blur');
    navbar.classList.remove('blur');
  });

  rejectConsent.addEventListener('click', function() {
    rejectConfirmation.style.display = 'block';
  });

  cancelRejectModal.addEventListener('click', function() {
    rejectConfirmation.style.display = 'none';
  });

  confirmRejectModal.addEventListener('click', function(){
    localStorage.setItem('consent', 'rejected');
    rejectConfirmation.style.display="none";
  });
});
