const burguerMenu = document.getElementById("myLinks");
const iconMenu = document.querySelector(".icon");
const hideImage = document.querySelector(".show-img");
const btnShorten = document.querySelector(".btn-shorten");
const linkText = document.querySelector(".link-input");
const errorMessage = document.querySelector(".error-message");
const linkData = document.querySelector("#links");

const baseURL = "https://rel.ink/";

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
  const response = await fetch(`${baseURL}api/links/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: link }),
  });
  const data = await response.json();
  showDataIntoDom(data);
}

const showDataIntoDom = (data) => {
  if (data.hashid) {
    linkData.innerHTML += `<div class="active-links">
   <ul>
    <li>${data.url}</li>
    <li><a href="${baseURL}${data.hashid}" target="_blank" >${baseURL}${data.hashid}</a></li>
    <div><button class="btn btn-copy" data-linkId="${data.hashid}">Copy</button> </div>
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
    const urlToCopy = `${baseURL}${linkId}`;

    copyText(urlToCopy);
  }
});
