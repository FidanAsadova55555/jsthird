"use strict";

let lastScrollTop = 0; 

window.addEventListener("scroll", function() {
  const header = document.querySelector(".header");
  const currentScroll = window.scrollY;

  if (currentScroll > lastScrollTop) {
    header.classList+=" hidden";
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

const fetchDynamicApiData = async (url, cb) => {
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

const showLogoApiData = async (data) => {
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

fetchDynamicApiData("/data", (data) => {
  showLogoApiData(data);
});
