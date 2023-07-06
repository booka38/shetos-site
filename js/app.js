
// Arrow color
const svgElement = document.querySelector(".arrow-down");
svgElement.style.fill = "#ffffff";
svgElement.style.stroke = "#ffffff";

// Navigation
const navbar = document.getElementById("navbar");
const navbarItems = document.querySelectorAll(".navbar-nav li");

function setActiveNavItem(navItem) {
  navbarItems.forEach((item) => item.classList.remove("active"));
  navItem.classList.add("active");
}

navbarItems.forEach((item) => {
  item.addEventListener("click", () => {
    setActiveNavItem(item);
  });
});

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop === 0) {
    navbar.classList.add("transparent-bg");
  } else {
    navbar.classList.remove("transparent-bg");
  }
});

let previousScroll = window.pageYOffset || document.documentElement.scrollTop;
window.addEventListener("scroll", () => {
  const currentScroll =
    window.pageYOffset || document.documentElement.scrollTop;
  if (currentScroll > previousScroll) {
    navbar.classList.add("hidden");
  } else if (currentScroll < previousScroll) {
    navbar.classList.remove("hidden");
  }
  if (currentScroll === 0) {
    navbar.classList.remove("hidden");
  }
  previousScroll = currentScroll;
});

// Handle scroll event
function handleScroll() {
  const scrollPosition = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const header = document.querySelector("header");

  if (
    scrollPosition >= header.offsetTop &&
    scrollPosition < header.offsetTop + header.offsetHeight
  ) {
    navbarItems.forEach((item) => item.classList.remove("active"));
  } else if (scrollPosition + windowHeight >= scrollHeight - 150) {
    navbarItems.forEach((item) => {
      const href = item.querySelector("a").getAttribute("href");
      if (href === "#contact") {
        setActiveNavItem(item);
      } else {
        item.classList.remove("active");
      }
    });
  } else {
    navbarItems.forEach((item) => {
      const href = item.querySelector("a").getAttribute("href");
      const section = document.querySelector(href);
      if (
        section.offsetTop - 150 < scrollPosition &&
        section.offsetTop + section.offsetHeight > scrollPosition
      ) {
        navbarItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
          }
        });
        setActiveNavItem(item);
      } else {
        item.classList.remove("active");
      }
    });
  }
}

window.addEventListener("scroll", handleScroll);

document.addEventListener("DOMContentLoaded", () => {
  const hireMeLink = document.querySelector(".hire-me");
  const showCVLink = document.querySelector(".show-cv");

  hireMeLink.addEventListener("click", (event) => {
    event.preventDefault();
    const targetElement = document.getElementById("get-touch");
    if (targetElement) {
      targetElement.scrollIntoView();
    }
  });

  const imageContainer = document.querySelector(".img-overlay");
  const icons = document.querySelector("#about-me .icons");

  imageContainer.addEventListener("mouseenter", () => {
    icons.classList.add("about-me-active");
  });

  imageContainer.addEventListener("mouseleave", () => {
    icons.classList.remove("about-me-active");
  });

  showCVLink.addEventListener("click", (event) => {
    event.preventDefault();
    const targetURL =
      "https://drive.google.com/file/d/1oGcHj8OxaJp7gOGS6Qg7pyf2_byUv3Tm/view?usp=drivesdk";
    window.open(targetURL, "_blank");
  });
});

// Hover on SVG icons
const cards = document.querySelectorAll("#services .card-hover");
cards.forEach((card) => {
  const svgHover = card.querySelector(".svg-hover");
  const svg = card.querySelector(".svg");

  card.addEventListener("mouseenter", () => {
    svgHover.style.display = "block";
    svg.style.display = "none";
  });

  card.addEventListener("mouseleave", () => {
    svgHover.style.display = "none";
    svg.style.display = "block";
  });
});

// Get all the buttons
const buttons = document.querySelectorAll("#portfolio .btns button");

// Add hover event listener to each button
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const hoverBtnBg = document.querySelector("#portfolio .btns .hover-btn-bg");
    const width = button.dataset.width;
    const transform = button.dataset.transform;

    hoverBtnBg.style.width = width;
    hoverBtnBg.style.transform = transform;
  });
});


// Add click event listener to each button
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    buttons.forEach((btn) => btn.classList.remove("active-btn"));
    // Add active class to the clicked button
    button.classList.add("active-btn");

    const buttonId = button.getAttribute("id"); // Get the id of the clicked button
    const projects = document.querySelectorAll(".project"); // Get all project elements

    // Toggle the visibility of projects based on the button clicked
    projects.forEach((project) => {
      if (project.classList.contains(buttonId)) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }
    });
  });
});

// Set the initial display for each project
const projects = document.querySelectorAll(".project");
projects.forEach((project) => {
  project.style.display = project.classList.contains("selected-works")
    ? "block"
    : "none";
});

//on submit form
let form = document.querySelector("#contact form");
let sendingDiv = document.querySelector("#contact #sending"); // Assuming the div has the class 'sending'

form.addEventListener("submit", (e) => {
  // Prevent default
  e.preventDefault();
  // Script URL
  let scriptURL =
    "https://script.google.com/macros/s/AKfycbwWTNKmx17KuuBrhRM20aPgGmzwSPkmfEiCdSc4wMrwNIsjLkHLxOBDzoln-UOHu0vh/exec";

  // Set opacity of sending div to 1
  sendingDiv.style.opacity = 1;

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      // Set opacity of output_message div to 1
      document.querySelector("#contact  #message-sent").style.opacity = 1;
      //get name and email and message from form
      let name = document.querySelector("#contact form #name").value;
      let email = document.querySelector("#contact form #email").value;
      let message = document.querySelector("#contact form #message").value;
      // Reset form
      form.reset();
      //sending notification message by email
      Email.send({
        SecureToken: "0fc08a2d-c796-445c-ab95-7dfdb0d5a546",
        To: "ahmed.shehata.360@gmail.com",
        From: "mohamedaboukaram39@gmail.com",
        Subject: "🚨📊 You have a new message from your website..",
        Body: `Name: ${name} <br/> Email: ${email} <br/> Message: ${message}`,
      });
      // After 4 seconds, set opacity of output_message div to 0
      setTimeout(() => {
        document.querySelector("#contact #message-sent").style.opacity = 0;
      }, 4000);
      // Reset opacity of sending div to 0
      sendingDiv.style.opacity = 0;
    })
    .catch((error) => console.error("Error!", error.message));
});

//.back-top button on click scroll to top
let backTop = document.querySelector(".back-top");
backTop.addEventListener("click", () => {
  window.scrollTo(0, 0);
});

//light effect
function handleScrollInView(sectionId) {
  let sectionElement = document.getElementById(sectionId);
  let lightEl = sectionElement.querySelector(".light");
  let sectionRect = sectionElement.getBoundingClientRect();
  let windowHeight = window.innerHeight;

  // Calculate the scroll position within the section
  let scrollPosition = sectionRect.top - windowHeight * 0.3;

  // Check if the scroll position is within the section
  if (scrollPosition < 0 && sectionRect.bottom > 0) {
    lightEl.classList.add("scroll-in-view");
  } else {
    lightEl.classList.remove("scroll-in-view");
  }
}

window.addEventListener("scroll", function () {
  handleScrollInView("services");
  handleScrollInView("portfolio");
  handleScrollInView("contact"); // Add scroll behavior for #contact section
});

// Fetch the SVG file
fetch('/pics/logos/DBT.svg')
  .then(response => response.text())
  .then(svgData => {
    // Process the SVG data
    const parser = new DOMParser();
    const svgElement = parser.parseFromString(svgData, 'image/svg+xml').documentElement;
    svgElement.classList.add('img-fluid','dbt');
    
    // Display the SVG in the HTML container
    const container = document.querySelector('.dbt-holder');
    container.appendChild(svgElement);
  })
  .catch(error => {
    console.error('Error loading SVG file:', error);
  });
  
  // Fetch the SVG file
fetch('/pics/logos/GA4.svg')
.then(response => response.text())
.then(svgData => {
  // Process the SVG data
  const parser = new DOMParser();
  const svgElement = parser.parseFromString(svgData, 'image/svg+xml').documentElement;
  svgElement.classList.add('img-fluid','google-analytics');
  
  // Display the SVG in the HTML container
  const container = document.querySelector('.google-analytics-holder');
  container.appendChild(svgElement);
})
.catch(error => {
  console.error('Error loading SVG file:', error);
});

// Fetch the SVG file
fetch('/pics/logos/google-big-query.svg')
  .then(response => response.text())
  .then(svgData => {
    // Process the SVG data
    const parser = new DOMParser();
    const svgElement = parser.parseFromString(svgData, 'image/svg+xml').documentElement;
    svgElement.classList.add('img-fluid','google-query');
    
    // Display the SVG in the HTML container
    const container = document.querySelector('.google-query-holder');
    container.appendChild(svgElement);
  })
  .catch(error => {
    console.error('Error loading SVG file:', error);
  });

  // Fetch the SVG file
fetch('/pics/logos/informatica.svg')
.then(response => response.text())
.then(svgData => {
  // Process the SVG data
  const parser = new DOMParser();
  const svgElement = parser.parseFromString(svgData, 'image/svg+xml').documentElement;
  svgElement.classList.add('img-fluid','informatica');
  
  // Display the SVG in the HTML container
  const container = document.querySelector('.informatica-holder');
  container.appendChild(svgElement);
})
.catch(error => {
  console.error('Error loading SVG file:', error);
});

// Fetch the SVG file
fetch('/pics/logos/microsoft-sql-server.svg')
  .then(response => response.text())
  .then(svgData => {
    // Process the SVG data
    const parser = new DOMParser();
    const svgElement = parser.parseFromString(svgData, 'image/svg+xml').documentElement;
    svgElement.classList.add('img-fluid','microsoft-sql');
    
    // Display the SVG in the HTML container
    const container = document.querySelector('.microsoft-sql-holder');
    container.appendChild(svgElement);
  })
  .catch(error => {
    console.error('Error loading SVG file:', error);
  });

  // Fetch the SVG file
fetch('/pics/logos/python.svg')
.then(response => response.text())
.then(svgData => {
  // Process the SVG data
  const parser = new DOMParser();
  const svgElement = parser.parseFromString(svgData, 'image/svg+xml').documentElement;
  svgElement.classList.add('img-fluid','python');
  
  // Display the SVG in the HTML container
  const container = document.querySelector('.python-holder');
  container.appendChild(svgElement);
})
.catch(error => {
  console.error('Error loading SVG file:', error);
});

// Fetch the SVG file
fetch('/pics/logos/snowflake.svg')
  .then(response => response.text())
  .then(svgData => {
    // Process the SVG data
    const parser = new DOMParser();
    const svgElement = parser.parseFromString(svgData, 'image/svg+xml').documentElement;
    svgElement.classList.add('img-fluid','snowflake');
    
    // Display the SVG in the HTML container
    const container = document.querySelector('.snowflake-holder');
    container.appendChild(svgElement);
  })
  .catch(error => {
    console.error('Error loading SVG file:', error);
  });

  // Fetch the SVG file
fetch('/pics/logos/tableau.svg')
.then(response => response.text())
.then(svgData => {
  // Process the SVG data
  const parser = new DOMParser();
  const svgElement = parser.parseFromString(svgData, 'image/svg+xml').documentElement;
  svgElement.classList.add('img-fluid','tableau');
  
  // Display the SVG in the HTML container
  const container = document.querySelector('.tableau-holder');
  container.appendChild(svgElement);
})
.catch(error => {
  console.error('Error loading SVG file:', error);
});


