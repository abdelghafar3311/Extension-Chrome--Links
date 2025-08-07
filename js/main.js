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
const DataShowJson = document.getElementById("DataShowJson");
const Pre = document.getElementById("pre");
const btnCopy = document.getElementById("Copy");
const btnShowLinksList = document.getElementById("showLinksList");
const linksList = document.getElementById("linksList");

// json add values
const textJson = document.getElementById("textJson");
const resJsonDataLinks = document.getElementById("resJsonDataLinks");
const numDataJsonList = document.getElementById("numDataJsonList");
const contentListJson = document.getElementById("contentListJson");
const SaveListJson = document.getElementById("SaveListJson");
const RUNORSAVEJSONDATA = document.getElementById("RUNORSAVEJSONDATA");


// vals
let dataJson = [];

// const ItemLinkArray = window.onload ? Array.from(document.querySelectorAll('.item-link')) : null;
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
// fun list default
function listDefault() {
  window.onload = function () {
    const ItemLinkArray = Array.from(document.querySelectorAll('.item-link'));

    console.log(ItemLinkArray);

    for (let i = 0; i < ItemLinkArray.length; i++) {
      ItemLinkArray[i].oncontextmenu = (e) => {
        e.preventDefault();

        const rect = e.target.getBoundingClientRect();

        const W = rect.width;
        const H = rect.height;

        const left = rect.left + window.scrollX;
        const top = rect.top + window.scrollY;

        const x = e.pageX - left - W / 2;
        const y = e.pageY - top - H / 2;

        PushList(ItemLinkArray[i], i, x, y);
      };
    }
  };
}

function listDefault2(type) {

  const ItemLinkArray = Array.from(document.querySelectorAll('.item-link'));

  if (type == "search") {

    for (let i = 0; i < ItemLinkArray.length; i++) {
      ItemLinkArray[i].oncontextmenu = (e) => {
        e.preventDefault();

        const rect = e.target.getBoundingClientRect();
        const W = rect.width;
        const H = rect.height;

        const left = rect.left + window.scrollX;
        const top = rect.top + window.scrollY;

        const x = e.pageX - left - W / 2;
        const y = e.pageY - top - H / 2;

        PushList(ItemLinkArray[i], i, x, y, false);
      };
    }
  } else {

    for (let i = 0; i < ItemLinkArray.length; i++) {
      ItemLinkArray[i].oncontextmenu = (e) => {
        e.preventDefault();

        const rect = e.target.getBoundingClientRect();
        const W = rect.width;
        const H = rect.height;

        const left = rect.left + window.scrollX;
        const top = rect.top + window.scrollY;

        const x = e.pageX - left - W / 2;
        const y = e.pageY - top - H / 2;

        PushList(ItemLinkArray[i], i, x, y);
      };
    }
  }

}
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
          <span class="bbtn text-danger effect" onclick="PushDeleteItem(${i})" data-bs-toggle="modal"
            data-bs-target="#DeleteModel">
            <i class="fa-solid fa-trash"></i>
            <span>Delete</span>
          </span>
          <span
            class="bbtn text-primary effect"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onclick= "editedDataShow(${i})"
          >
            <i class="fa-solid fa-pen-to-square"></i>
            <span>Change</span>
          </span>
        </div>
      </div>
        `
  }

  content.innerHTML = element;
  getNumber();
  listDefault2();
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
    listDefault2("search");
  }
}


// function to put color to data
function syntaxHighlight(json) {
  return json
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(
      /("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(?:\s*:)?|\b(true|false|null)\b|-?\d+(\.\d*)?([eE][+\-]?\d+)?)/g,
      match => {
        let cls = 'json-number';
        if (/^"/.test(match)) {
          cls = /:$/.test(match) ? 'json-key' : 'json-string';
        } else if (/true|false/.test(match)) {
          cls = 'json-boolean';
        } else if (/null/.test(match)) {
          cls = 'json-null';
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
}

// fun push list

function PushList(ele, i, x, y, offer = true) {
  // ازالة أي قائمة قائمة
  const existing = document.querySelector('.list, .closeList');
  if (existing) existing.remove();

  const closeDiv = document.createElement('div');
  closeDiv.className = 'closeList';

  const listDiv = document.createElement('div');
  listDiv.className = 'list';
  listDiv.style.left = `${x}px`;
  listDiv.style.top = `${y}px`;

  const itemsData = [
    {
      icon: '<i class="fa-solid fa-pen-to-square"></i>',
      text: 'Edited',
      // attributes للـ modal الخاص بالتعديل
      attrs: {
        'data-bs-toggle': 'modal',
        'data-bs-target': '#exampleModal'
      },
      handler: () => { editedDataShow(i) }
    },
    {
      icon: '<i class="fa-solid fa-trash"></i>',
      text: 'Delete',
      // attributes للـ modal الخاص بالحذف
      attrs: {
        'data-bs-toggle': 'modal',
        'data-bs-target': '#DeleteModel'
      },
      handler: () => { PushDeleteItem(i) }
    }
  ];

  itemsData.forEach(item => {
    const p = document.createElement('p');
    p.className = 'item';
    Object.entries(item.attrs).forEach(([key, val]) => {
      p.setAttribute(key, val);
    });
    p.innerHTML = `<span>${item.icon}</span> <span>${item.text}</span>`;
    p.addEventListener('click', () => {
      item.handler();
      closeDiv.remove();
      listDiv.remove();
    });
    listDiv.appendChild(p);
  });

  offer != true ? listDiv.innerHTML = "Closed for here" : null;

  ele.appendChild(closeDiv);
  ele.appendChild(listDiv);

  closeDiv.addEventListener('click', () => {
    closeDiv.remove();
    listDiv.remove();
  });
}

// ============================================
// fun Add Json
// =============================================

function ProgressJSON() {
  resJsonDataLinks.classList.add("show");
  try {
    dataJson = JSON.parse(textJson.value);
    if (!Array.isArray(dataJson)) {
      throw new Error(`the inputs must be array like this: [{"title":"tile site","url":"http...}...]`);
    }
    let ele = ""
    SaveListJson.classList.add("show");
    for (let i = 0; i < dataJson.length; i++) {
      if (!dataJson[i]?.title) {
        throw new Error(`the inputs have error in item this object ${JSON.stringify(dataJson[i])} in index: ${i} it not has a title`);
      }
      if (!dataJson[i]?.url) {
        throw new Error(`the inputs have error in item this object ${JSON.stringify(dataJson[i])} in index: ${i} it not has a url`);
      }

      ele += `
       <div class="item col-1">
        <div class="cont-img">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=${dataJson[i].url}" alt="lo" width="50" height="50" onerror="this.onerror=null;this.src='logo/logo.png'" alt="">
          </div>
          <span class="info">
          <h5>${dataJson[i].title}</h5>
            <i>${dataJson[i].url}</i>
          </span>
      </div>
    `
    }
    numDataJsonList.innerHTML = dataJson.length;
    contentListJson.innerHTML = ele;
  } catch (err) {
    SaveListJson.classList.remove("show")
    resJsonDataLinks.innerHTML = `<div class="alert alert-danger">some thing error in inputs, the error: ${err}</div>`
  }

}

// save fun
function SaveJson() {
  for (let i of dataJson) {
    data.push(i);
    localStorage.LinksData = JSON.stringify(data);
    showData()
  }
}

// re work json
function reWorkJsonAdded() {
  resJsonDataLinks.classList.remove("show");
  SaveListJson.classList.remove("show");
  dataJson = [];
  textJson.value = "";
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
    Refresh.classList.remove("work");
    linksList.classList.remove("show")
  }, 5000)
};


DataShowJson.onclick = () => {
  const listHtml = data.map(obj => {
    const raw = JSON.stringify(obj, null, 2);
    const highlighted = syntaxHighlight(raw);
    const lines = highlighted.split('\n');
    const blockHtml = lines.map(line => `<p>${line}</p>`).join('');
    return `<div class="obj-block">${blockHtml}</div>`;
  }).join('');

  Pre.innerHTML = listHtml;
};

btnCopy.addEventListener('click', async () => {
  const DataString = JSON.stringify(data) || '';
  try {
    await navigator.clipboard.writeText(DataString);
    console.log('Success Copy');
    btnCopy.classList.add("done");
    btnCopy.innerHTML = `<i class="fa-solid fa-check"></i>`;
    setTimeout(() => {
      btnCopy.classList.remove("done");
      btnCopy.innerHTML = `<i class="fa-solid fa-clone"></i>`;
    }, 400)
  } catch (err) {
    console.error('Failed Copy Because: ', err);
    btnCopy.classList.add("wrong");
    btnCopy.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    setTimeout(() => {
      btnCopy.classList.remove("wrong");
      btnCopy.innerHTML = `<i class="fa-solid fa-clone"></i>`;
    }, 400)
  }
})

RUNORSAVEJSONDATA.onclick = () => {
  if (textJson.value === "") {
    return null;
  }
  ProgressJSON()
}

SaveListJson.onclick = () => {
  SaveJson();
}

btnShowLinksList.onclick = () => {
  linksList.classList.toggle("show")
}

deleteBTN.onclick = () => Delete(keyDelete); // btn in model 2 use to delete
search.onkeyup = Searching; // input search

// Work showData here when refresh site
showData();
listDefault()
// ===========================================

// list code here

// for (let i = 0; i < ItemLinkArray.length; i++) {

//   ItemLinkArray[i].oncontextmenu = (e) => {
//     e.preventDefault();

//     const rect = e.target.getBoundingClientRect();

//     const W = rect.width;    // 320
//     const H = rect.height;   // 46.89

//     const left = rect.left + window.scrollX;
//     const top = rect.top + window.scrollY;

//     const x = e.pageX - left - W / 2;
//     const y = e.pageY - top - H / 2;

//     PushList(ItemLinkArray[i], i, x, y)
//   }
// }

