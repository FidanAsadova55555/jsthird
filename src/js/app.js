"use strict";

let lastScrollTop = 0;

window.addEventListener("scroll", function() {
  const header = document.querySelector(".header");
  const currentScroll = window.scrollY;

  if (currentScroll > lastScrollTop) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
    header.classList.add("scrolled"); 
  }

  if (currentScroll === 0) {
    header.classList.remove("scrolled");
  }

  lastScrollTop = currentScroll; 
});
////////////////////////////////////////////////////////////
const instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 3000,
});

const fetchData = async (url, cb) => {
  try {
    const res = await instance.get(url);
    cb(res.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const LogoData = document.getElementById("logo");
if (!LogoData) {
  console.error("Element with id 'logo' not found");
}

const renderLogos = async (data) => {
  if (data && LogoData) {
    data.forEach((blog, index) => {
      const LogoHtml = `
        <div key="${index}" class="one">
          <div class="logofigure">
            <img
              loading="lazy"
              decoding="async"
              width="378"
              height="148"
              src="${blog?.img ?? "https://outgrid.uicore.co/elearning/wp-content/uploads/sites/5/2023/06/eLearning-Logo-3.webp"}"
            >
          </div>
        </div>
      `;
      LogoData.innerHTML += LogoHtml;
    });
  } else {
    console.error("No data or target element to render");
  }
};


fetchData("/data", (data) => {
  renderLogos(data);
});

/////////////////////////////////////////////////////////////////

const contentContainer = document.getElementById("addblog");
if (!contentContainer){
  console.error("Content container not found");
}

const renderContent = async (data) => {
  if (data && contentContainer) {
    data.forEach((item) => {
      const contentHtml = `
        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
          <div class="leftside">
            <div class="iconcontainer">
              <div id="circle" style="background-color: ${item.backgroundimgcolor ?? '#f0f0f0'};">
                <img
                  loading="lazy"
                  decoding="async"
                  width="80"
                  height="80"
                  src="${item.logoimg ?? 'default-logo-url.png'}"
                  alt="Logo"
                >
              </div>
            </div>
            <h1 style="font-size: 24px;">
               ${item.header}
            </h1>
            <p style="font-size: 14px; max-width: 344px;">${item.description}.
            </p>        
          </div>
        </div>
      `;
      contentContainer.innerHTML += contentHtml;
    });
  } else {
    console.error("No data or target element to render");
  }
};

fetchData("/online", (data) => {
  renderContent(data);
});
///////////////////////////////////////////////////////////////////
const courseContainer = document.getElementById("coursesadd");
if (!courseContainer){
  console.error("Content container not found");
}

const renderCourse = async (data) => {
  if (data && courseContainer) {
    data.forEach((item) => {
      const courseHtml = `
         <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 pb-2">
<div class="course">
    <div class="leftside">
        <div class="iconcontainer">
            <div style="background-color: ${item.bgcolor ?? '#f0f0f0'};" class="square"><img loading="lazy" decoding="async" width="112" height="112" src="${item?.img ?? "https://outgrid.uicore.co/elearning/wp-content/uploads/sites/5/2023/06/eLearning-Logo-3.webp"}"></div>
        </div>
        <h1 style="font-size: 24px;margin-bottom: 12px;">${item?.header}
        </h1>
        <p style="font-size: 16px;padding-bottom:12px;">${item?.txt}
        </p>
        <span>View Lessons <i  class="ri-arrow-right-s-line dark"></i></span>
    </div>
</div>
            </div>

        
      `;
      courseContainer.innerHTML += courseHtml;
    });
  } else {
    console.error("No data or target element to render");
  }
};

fetchData("/courses", (data) => {
  renderCourse(data);
});
//////////////////////////////////////////////////////////////////////////////
const body = document.getElementsByClassName("body");
const head = document.getElementsByClassName("head");

if (body.length === 0 && head.length === 0) {
  console.error("Content containers not found");
}

const renderAcc = async (data) => {
  Array.from(body).forEach((element, index) => {
    element.innerHTML = data[index]?.description || "Description not available";
  });

  Array.from(head).forEach((element, index) => {
    element.innerHTML = data[index]?.title || "Title not available";
  });
};



fetchData("/accordionData", (data) => {
  renderAcc(data);
});

