// ========================================
// SCROLL PROGRESS "MEASURING TAPE"
// ========================================

const fill = document.getElementById("tapeFill");

window.addEventListener("scroll", () => {
  const h = document.documentElement;

  const scrollableHeight =
    h.scrollHeight - h.clientHeight;

  const scrolled =
    (h.scrollTop / scrollableHeight) * 100;

  fill.style.width = scrolled + "%";
});


// ========================================
// MOBILE NAVIGATION
// ========================================

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});


// ========================================
// HUBSPOT BOOKING FORM
// ========================================

// Replace these with your actual HubSpot values.

const HUBSPOT_PORTAL_ID = "YOUR_PORTAL_ID";
const HUBSPOT_FORM_GUID = "YOUR_FORM_GUID";


const form = document.getElementById("bookingForm");
const success = document.getElementById("formSuccess");
const submitBtn = form.querySelector(".form-submit");


form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const data = new FormData(form);


  // These "name" values must match the internal
  // names of your HubSpot contact properties.

  const fields = [
    {
      name: "firstname",
      value: data.get("fname")
    },

    {
      name: "phone",
      value: data.get("fphone")
    },

    {
      name: "email",
      value: data.get("femail")
    },

    {
      name: "service_needed",
      value: data.get("fservice")
    },

    {
      name: "preferred_date",
      value: data.get("fdate")
    },

    {
      name: "message",
      value: data.get("fmessage")
    }
  ];


  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";


  try {

    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          fields,

          context: {
            pageUri: window.location.href,
            pageName: document.title
          }
        })
      }
    );


    if (!res.ok) {
      throw new Error(
        "HubSpot rejected the submission"
      );
    }


    // Show success message
    success.style.display = "block";

    // Clear form
    form.reset();

    // Scroll to success message
    success.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });


  } catch (err) {

    alert(
      "Something went wrong sending your request. " +
      "Please call or WhatsApp us directly at " +
      "+234 901 472 7264."
    );

  } finally {

    submitBtn.disabled = false;
    submitBtn.textContent = "Send Booking Request";

  }

});
