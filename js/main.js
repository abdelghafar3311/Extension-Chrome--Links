// Elements
const content = document.getElementById("content");
const title = document.getElementById("title");
const url = document.getElementById("url");
const save = document.getElementById("btn");
const search = document.getElementById("search");
const num = document.getElementById("num");
const TitleMod = document.getElementById("modelTitle");
const Refresh = document.getElementById("reload");
const deleteItemName = document.getElementById("deleteItemName");
const deleteBTN = document.getElementById("delete");
// ===================================================================
// Setting
let data = [];
if (localStorage.getItem('LinksData') && localStorage.LinksData !== null) {
  data = JSON.parse(localStorage.LinksData);
}

let isEdited = false;
let indexEdited = 0;
let isDelete = false;
let keyDelete = 0;
// =============================================================================
// Number of data value => [array{objs}]
function getNumber() {
  num.innerHTML = data.length;
}
// ================================================
// control Edited Mode
function ChangeMod() {
  if (isEdited) {
    TitleMod.innerHTML = "Edited"
  } else {
    TitleMod.innerHTML = "Add New Link"
  }
}
// ====================================================
// Push Id to keyDelete:number
function PushDeleteItem(id) {
  keyDelete = id;
  deleteItemName.innerHTML = data[id].title
}
// ==============================================
// Offer/Show Data
function showData() {
  let element = "";

  for (let i = 0; i < data.length; i++) {
    element += `
          <div class="item-link col-lg-3 col-xl-3 col-md-2 col-sm-1">
        <a
          href="${data[i].url}"
          class="d-flex justify-content-start align-items-center gap-2"
          target="_blank"
        >
          <div class="cont-img">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=${data[i].url}" alt="lo" width="50" height="50" onerror="this.onerror=null;this.src='logo/logo.png'"/>
          </div>
          <span>${data[i].title}</span>
        </a>
        <div class="d-flex justify-content-center align-items-center gap-1">
          <span class="bbtn text-danger" onclick="PushDeleteItem(${i})" data-bs-toggle="modal"
            data-bs-target="#DeleteModel">
            <i class="fa-solid fa-trash"></i>
          </span>
          <span
            class="bbtn text-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onclick= "editedDataShow(${i})"
          >
            <i class="fa-solid fa-pen-to-square"></i>
          </span>
        </div>
      </div>
        `
  }

  content.innerHTML = element;
  getNumber()
}
// ==================================================================================================
// Clear Mode Edited
function Clear() {
  isEdited = false;
  title.value = "";
  url.value = "";
}
// ========================
// Edited Function
function editedDataShow(id) {
  title.value = data[id].title;
  url.value = data[id].url;
  indexEdited = id;
  isEdited = true;
  ChangeMod()
}
// ==============================
// Delete Function
function Delete(id) {
  data.splice(id, 1);
  localStorage.LinksData = JSON.stringify(data);
  showData();
}
// ================================================
// hight light text use when search, make to see result.
function highlighttext(v, search) {
  const keywordArray = search.split("").map((k => k.toLowerCase()));

  return v.split("").map(item => {
    let lowerItem = item.toLowerCase();
    return keywordArray.includes(lowerItem) ? `<b class='highlighttext'>${item}</b>` : item
  }).join("")


}
// =================================================================================================
// Search Function:: -note-  use in highlighttext
function Searching() {
  if (search.value === "") {
    showData();
  } else {
    let element = "";
    let found = false;

    for (let i = 0; i < data.length; i++) {
      if (data[i].title.toLowerCase().includes(search.value.toLowerCase())) {
        found = true;
        element += `
          <div class="col-12 col-sm-6 col-md-6 col-lg-3 item-link">
            <a
              target="_blank"
              href="${data[i].url}"
              class="d-flex justify-content-start align-items-center gap-2"
            >
              <div class="cont-img">
                <img src="https://www.google.com/s2/favicons?sz=64&domain=${data[i].url}" alt="lo" width="50" height="50" onerror="this.onerror=null;this.src='logo/logo.png'" />
              </div>
              <span>${highlighttext(data[i].title, search.value)}</span>
            </a>
            <div class="d-flex justify-content-center align-items-center gap-1">
              <span class="bbtn text-danger" onclick="PushDeleteItem(${i})" data-bs-toggle="modal"
            data-bs-target="#DeleteModel">
                <i class="fa-solid fa-trash"></i>
              </span>
              <span
                class="bbtn text-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onclick= "editedDataShow(${i})"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </span>
            </div>
          </div>
        `;
      }
    }

    if (!found) {
      element = `
        <div class="alert alert-danger w-100">
          Sorry, no link found with the name: ${search.value}
        </div>
      `;
    }

    content.innerHTML = element;
  }
}
// =============================================================================================================
// Evens
save.onclick = () => { // this save btn to add or edited link
  if (isEdited) {
    if (!title.value && !url.value) {
    } else {
      data[indexEdited].title = title.value;
      data[indexEdited].url = url.value;
      localStorage.LinksData = JSON.stringify(data)
      showData()
      isEdited = false;
      title.value = '';
      url.value = '';
    }
  } else {
    if (!title.value && !url.value) {
      console.error("please enter data")
    } else {
      data.push({ title: title.value, url: url.value })
      localStorage.LinksData = JSON.stringify(data)
      showData()

      title.value = '';
      url.value = '';
    }
  }

}

Refresh.onclick = () => { // this refresh btn in header
  Refresh.classList.add("work");
  showData();
  setTimeout(() => {
    Refresh.classList.remove("work")
  }, 5000)
};

deleteBTN.onclick = () => Delete(keyDelete); // btn in model 2 use to delete
search.onkeyup = Searching; // input search

// Work showData here when refresh site
showData();
// ===========================================