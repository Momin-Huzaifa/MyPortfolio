// function validateForm() {
//   // Clear previous error messages
//   document.getElementById('nameError').innerText = '';
//   document.getElementById('emailError').innerText = '';
//   document.getElementById('messageError').innerText = '';

//   // Get values from form inputs
//   const name = document.getElementById('firstname').value.trim();
//   const email = document.getElementById('email').value.trim();
//   const message = document.getElementById('message').value.trim();

//   let isValid = true;

//   // Name validation
//   if (name === "") {
//     document.getElementById('nameError').innerText = "Name is required";
//     isValid = false;
//   } else if (!/^[a-zA-Z\s]+$/.test(name)) {
//     document.getElementById('nameError').innerText = "Invalid name format";
//     isValid = false;
//   }

//   // Email validation
//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (email === "") {
//     document.getElementById('emailError').innerText = "Email is required";
//     isValid = false;
//   } else if (!emailPattern.test(email)) {
//     document.getElementById('emailError').innerText = "Invalid email format";
//     isValid = false;
//   }

//   // Message validation
//   if (message === "") {
//     document.getElementById('messageError').innerText = "Message is required";
//     isValid = false;
//   } else if (message.length < 10) {
//     document.getElementById('messageError').innerText = "Message must be at least 10 characters";
//     isValid = false;
//   }

//   // If the form is valid, clear the input fields after submission
//   if (isValid) {
//     alert('Form submitted successfully!');  // Optionally show success message
//     document.getElementById('firstname').value = '';
//     document.getElementById('email').value = '';
//     document.getElementById('message').value = '';
//   }

//   return isValid; // Submit form only if valid
// }

function validateForm(event) {
  // Clear previous error messages
  document.getElementById("nameError").innerText = "";
  document.getElementById("emailError").innerText = "";
  document.getElementById("messageError").innerText = "";

  // Get values from form inputs
  const name = document.getElementById("firstname").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  let isValid = true;

  // Name validation
  if (name === "") {
    document.getElementById("nameError").innerText = "Name is required";
    isValid = false;
  } else if (!/^[a-zA-Z\s]+$/.test(name)) {
    document.getElementById("nameError").innerText = "Invalid name format";
    isValid = false;
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    document.getElementById("emailError").innerText = "Email is required";
    isValid = false;
  } else if (!emailPattern.test(email)) {
    document.getElementById("emailError").innerText = "Invalid email format";
    isValid = false;
  }

  // Message validation
  if (message === "") {
    document.getElementById("messageError").innerText = "Message is required";
    isValid = false;
  } else if (message.length < 10) {
    document.getElementById("messageError").innerText =
      "Message must be at least 10 characters";
    isValid = false;
  }

  // Prevent form submission if the form is invalid
  if (!isValid) {
    event.preventDefault(); // Prevent the form from submitting
  } else {
    alert("Form submitted successfully!"); // Optionally show success message
  }

  return isValid; // Return the validation result
}

// Wrap in DOMContentLoaded to ensure the DOM is fully loaded before running the scripts

document.addEventListener("DOMContentLoaded", function () {
  // Skill data fetching
  const allcardskill = document.querySelector(".allskillouterinner");
  const apiEndpoint = "http://localhost:3000/skills";

  if (allcardskill) {
    function Skill() {
      fetch(apiEndpoint)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          data.forEach((item) => {
            const { id, name, icon, level } = item;
            allcardskill.innerHTML += `
              <div class="col-lg-2 col-6 col-md-4 d-flex justify-content-center" id="${id}">
                <div class="html allskillicon">
                  <span><a href="#"><img src="${icon}" alt="${name}"/></a></span>
                  <h4>${name}</h4>
                  <span>${level}</span>
                </div>
              </div>
            `;
          });
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
    Skill(); // Call the Skill function only if allcardskill exists
  }

  // Service data fetching
  const allservicecard = document.querySelector(".allservicecard");
  if (allservicecard) {
    async function ServiceData() {
      const ServiceEndpoint = "http://localhost:3000/services";
      try {
        const response = await fetch(ServiceEndpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const servicerecords = await response.json();
        servicerecords.forEach((element) => {
          const { serviceicon, servicename, servicenamesec, servicepara } =
            element;
          allservicecard.innerHTML += `
          <div class="col-lg-3 col-md-6 d-flex justify-content-center">
                <div class="servicecard">
                    <div class="servicecardinner">
                        <i class="${serviceicon}"></i>
                        <h4>${servicename}<br />${servicenamesec}</h4>
                        <p>${servicepara}</p>
                    </div>
                </div>
          </div>
          `;
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    ServiceData();
  }

  const Qualification = document.querySelector(".Educationcard");

  if (Qualification) {
    // Check if the container exists
    const apiEndpointQualification = "http://localhost:3000/Educationcard";

    // Fetch the Educationcard data
    function Qualificationshow() {
      fetch(apiEndpointQualification)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json(); // Parse JSON data
        })
        .then((data) => {
          data.forEach((card) => {
            // Add each card's HTML
            Qualification.insertAdjacentHTML(
              "beforeend",
              `
                <div class="row ${card.Educationclass}">
                  <div class="col-lg-3 p-0">
                    <div class="Educationcardimg" id="${card.id}">
                      <img src="${card.Educationcardimage}" alt="${card.Educationcardh3}" />
                    </div>
                  </div>
                  <div class="col-lg-9 py-3">
                    <div class="Educationcardtext">
                      <h3>${card.Educationcardh3}</h3>
                      <p>${card.Educationcardpara}</p>
                      <h4>${card.Educationcardh4}</h4>
                    </div>
                  </div>
                </div>
              `
            );
          });
          reapplyScrollReveal();
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
    Qualificationshow(); // Call the function to show qualifications
  } else {
    console.error("Qualification element not found in the DOM.");
  }

  // Typed text js
  // Typed.js initialization
  if (document.querySelector(".typingtexteffect")) {
    let typing = new Typed(".typingtexteffect", {
      strings: ["frontend development", "web designing", "web development"],
      loop: true,
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 1000,
    });
  }

  if (document.querySelector(".Myname")) {
    let Myname = new Typed(".Myname", {
      strings: ["Huzaifa"],
      loop: true,
      typeSpeed: 100,
      backSpeed: 75,
      backDelay: 3000,
    });
  }
});
// Typed text js

// ================== SCROLLREVEAL JS LINK ==================

const scrollrev = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
});

scrollrev.reveal(`.Nametitle, .Footer-section`);
scrollrev.reveal(`.allmain`);
scrollrev.reveal(`.Boigraphyside , .Experience`, {
  // delay: 600,
  origin: "bottom",
  // interval: 100,
});
scrollrev.reveal(`.allSkill`, { origin: "top" });
scrollrev.reveal(`.down_skill`, { origin: "right" });
scrollrev.reveal(`.Contact-leftside`, {
  origin: "top",
});
scrollrev.reveal(`.Contact-rightside`, {
  origin: "bottom",
});
scrollrev.reveal(".allservicecard", { origin: "top" });
scrollrev.reveal(`.allservicecard`, { origin: "top" });
scrollrev.reveal(`.Projectslider`, { origin: "top" });
scrollrev.reveal(`#Testimonialslider`, { origin: "top" });
function reapplyScrollReveal() {
  scrollrev.reveal(".Educationcardinner1", { origin: "top" });
  scrollrev.reveal(".Educationcardinner2", { origin: "bottom" });
}
window.addEventListener("load", reapplyScrollReveal);

// navbar sticky
window.addEventListener("scroll", function () {
  let navbar = document.querySelector(".navbar");
  if (window.scrollY >= 10) {
    navbar.classList.add("fixed-top");
  } else {
    navbar.classList.remove("fixed-top");
  }
});

//Owl Carousel 1
$("#Projectslider .owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  autoplay: false,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 2,
    },
  },
});

$("#Testimonialslider .owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
});

let moonicon = document.querySelector(".ri-sun-line");
let footerlink = document.querySelectorAll(".allFooterlink");
let inputfield2 = document.querySelectorAll(".contact-formlabelinput");
let InputLabel = document.querySelectorAll(".contact-formlabelinput label");
let FullBody = document.querySelector("body");
let Submitbtn = document.querySelector(".Submitbutton");
let Profilelink = document.querySelectorAll(".Mainimageicon");

function Moonclick() {
  if (moonicon.classList.contains("ri-sun-line")) {
    moonicon.classList.replace("ri-sun-line", "ri-moon-line");
  } else {
    moonicon.classList.replace("ri-moon-line", "ri-sun-line");
  }

  FullBody.classList.toggle("dark_mode");

  // Toggle classes for footer links
  footerlink.forEach((item) => {
    item.classList.toggle("allFooterlink2");
    item.classList.toggle("Sociallink1");
  });

  // Toggle classes for input fields
  inputfield2.forEach((item) => {
    item.classList.toggle("contact-formlabelinput2");
  });

  // Toggle class for the submit button
  Submitbtn.classList.toggle("Submitbutton2");

  // Toggle classes for profile links
  Profilelink.forEach((item) => {
    item.classList.toggle("Mainimageicon2");
  });
}

moonicon.addEventListener("click", Moonclick);
