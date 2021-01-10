const burguerMenu = document.getElementById("myLinks");
const iconMenu = document.querySelector(".icon");
const hideImage = document.querySelector(".show-img");
const btnShorten = document.querySelector(".btn-shorten");
const linkText = document.querySelector(".link-input");
const errorMessage = document.querySelector(".error-message");
const linkData = document.querySelector("#links");

// https://api.shrtco.de/v2/

const baseURL = "https://api.shrtco.de/v2/";

const openBurguerMenu = () => {
  if (burguerMenu.style.display === "block") {
    burguerMenu.style.display = "none";
    hideImage.style.display = "block";
  } else {
    burguerMenu.style.display = "block";
    hideImage.style.display = "none";
  }
};

async function createShortenLink(link) {
  linkText.disabled = true;
  const response = await fetch(`${baseURL}shorten?url=${link}`);

  const data = await response.json();
  if (data) {
    linkText.disabled = false;
  }
  showDataIntoDom(data);
}

const showDataIntoDom = (data) => {
  if (data.ok) {
    linkData.innerHTML += `<div class="active-links">
   <ul>
    <li>${data.result.full_short_link}</li>
    <li><a href="${data.result.full_short_link}" target="_blank" >${data.result.full_short_link}</a></li>
    <div><button class="btn btn-copy" data-linkId="${data.result.full_short_link}">Copy</button> </div>
    </ul>
    
  </div>`;
  } else {
    linkText.classList.add("error");
    errorMessage.classList.add("show");

    setTimeout(() => {
      errorMessage.classList.remove("show");
      linkText.classList.remove("error");
    }, 3000);
  }
};

// copy textlink
const copyText = (url) => {
  const el = document.createElement("textarea");
  el.value = url;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

// event listener
// menu hamburguer
iconMenu.addEventListener("click", openBurguerMenu);

// shorten link
btnShorten.addEventListener("click", () => {
  const link = linkText.value;

  createShortenLink(link);
  linkText.value = "";
});

// event delegation
linkData.addEventListener("click", (e) => {
  const btn = document.querySelectorAll(".btn-copy");
  btn.forEach((btn) => {
    if (
      btn.getAttribute("data-linkid") === e.target.getAttribute("data-linkid")
    ) {
      btn.classList.add("copied");
      btn.innerText = "Copied!";
      setTimeout(() => {
        btn.classList.remove("copied");
        btn.innerText = "Copy";
      }, 2000);
    }
  });

  if (e.target.className.includes("btn-copy")) {
    const linkId = e.target.getAttribute("data-linkid");
    const urlToCopy = `${linkId}`;

    copyText(urlToCopy);
  }
});
