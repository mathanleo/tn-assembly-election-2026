function buildDisclaimer() {
  const disclaimer = document.getElementById("disclaimer-container");
  //   disclaimer.classList.add("disclaimer");
  disclaimer.innerHTML = `
    <div class="consent" id="consent">
      <p class="consentText">
        Data on this website is sourced from Election Commission of India pages and other publicly available sources, and may contain errors or delays.<br/>
        This platform is for educational purposes only and should not be treated as official election data. Please exercise discretion
        <br /><a class="disclaimerLink" href="../../pages/disclaimer.html"
          >Read Complete Disclaimer.</a
        >
      </p>
      <div class="decisionButtons">
        <button id="rejectConsent">Reject</button>
        <button id="acceptConsent">Agree</button>
      </div>
    </div>
    <div id="rejectConfirmation">
      <div class="confirmationCard">
        <img
          class="alertTriangle"
          src="./images/imgs/alert-triangle.svg"
          alt=""
        />
        <p class="consentHeading">Are you sure you want to reject?</p>
        <p style="margin-right: 1rem" class="consentDescription">
          You can't access the webpage unless you agree to the disclaimer.
        </p>
        <a href="../../pages/disclaimer.html" class="consentDisclaimer"
          >Read Complete Disclaimer</a
        >
        <div class="buttonContainer">
          <button class="declineButton" id="cancelRejectModal">Cancel</button>
          <button class="acceptButton" id="confirmRejectModal">Confirm</button>
        </div>
      </div>
    </div>
    `;
  return disclaimer;
}

document.addEventListener("DOMContentLoaded", function () {
  buildDisclaimer();
  var consent = document.getElementById("consent");
  console.log(consent);
  var mainContent = document.querySelector(".main-content");
  var navbar = document.querySelector(".navbarHead");
  var acceptConsent = document.getElementById("acceptConsent");
  var rejectConsent = document.getElementById("rejectConsent");
  var rejectConfirmation = document.getElementById("rejectConfirmation");
  var cancelRejectModal = document.getElementById("cancelRejectModal");
  var confirmRejectModal = document.getElementById("confirmRejectModal");

  let consentValue = localStorage.getItem("consent");
  if (consentValue === "accepted") {
    consent.style.display = "none";
    mainContent.classList.remove("blur");
    navbar.classList.remove("blur");
  } else {
    // mainContent.classList.add("blur");
    // navbar.classList.add("blur");
    setTimeout(function () {
      consent.style.display = "flex";
    }, 1000);
    mainContent.removeEventListener("click", function () {
     return false;
    });
  }

  acceptConsent.addEventListener("click", function () {
    localStorage.setItem("consent", "accepted");
    consent.style.display = "none";
    mainContent.classList.remove("blur");
    navbar.classList.remove("blur");
  });

  rejectConsent.addEventListener("click", function () {
    rejectConfirmation.style.display = "block";
  });

  cancelRejectModal.addEventListener("click", function () {
    rejectConfirmation.style.display = "none";
  });

  confirmRejectModal.addEventListener("click", function () {
    localStorage.setItem("consent", "rejected");
    rejectConfirmation.style.display = "none";
  });
});
