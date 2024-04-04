let container = document.getElementById("container");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
function getData(data, page) {
  let dataperPage = 10;
  let startIndex = page * dataperPage;
  let lastIndex = startIndex + dataperPage;

  container.innerHTML = `<tr>
                    <td>ID</td>
                    <td>UserId</td>
                    <td>TItle</td>
                    <td>PublishedAt</td>
                    <td>UpdatedAt</td>
                    <td>Details</td>
                </tr>`;
  for (let i = startIndex; i < lastIndex; i++) {
    container.innerHTML += `
                <tr>
                    <td>${data[i].id}</td>
                    <td>${data[i].userId}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].publishedAt}</td>
                    <td>${data[i].updatedAt}</td>
                    <td><button id="${data[i].id}" onclick="userDetails(this.id)">View</button></td>
                </tr>`;
  }
}

function pageination(data) {
  let dataperPage = 10;

  let totalpage = Math.ceil(data.length / dataperPage);
  let curPage = 0;

  if (curPage === 0) {
    prev.setAttribute("disabled", true);
  }

  if (totalpage === 1) {
    next.setAttribute("disabled", true);
  }
  const page = document.getElementById("page");

  page.innerHTML = `Page No: ${curPage + 1}`;
  getData(data, curPage);
  next.addEventListener("click", () => {
    container.innerHTML = "";
    if (curPage < totalpage - 1) {
      curPage++;
      page.innerHTML = `Page No: ${curPage + 1}`;
      if (curPage === totalpage - 1) {
        next.setAttribute("disabled", true);
      }
      getData(data, curPage);
    }

    prev.removeAttribute("disabled");
  });

  prev.addEventListener("click", () => {
    container.innerHTML = "";

    if (curPage > 0) {
      curPage--;
      getData(data, curPage);
      page.innerHTML = `Page No: ${curPage + 1}`;
    }

    next.removeAttribute("disabled");

    if (curPage === 0) {
      prev.setAttribute("disabled", true);
    }
  });
}

async function userDetails(id) {
  window.location.href =
    window.location.origin +
    `/userDetails/jsonplaceholderapi/post-details/${id}`;
}

let search = document.getElementById("search");
let form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  next.removeAttribute("disabled");

  let data = await fetch("https://jsonplaceholder.org/posts", {
    method: "get",
    headers: {
      "Content-type": "application/json;",
    },
  });

  let rdata = await data.json();
  if (search.value !== "") {
    let value = search.value.toLowerCase();
    let sdata = rdata.filter((fdata) => {
      return (
        fdata.id === Number(value) ||
        fdata.userId === Number(value) ||
        fdata.title.includes(value) ||
        fdata.content.includes(value)
      );
    });

    pageination(sdata);
  } else {
    pageination(rdata);
  }
});

async function showtable() {
  let data = await fetch("https://jsonplaceholder.org/posts", {
    method: "get",
    headers: {
      "Content-type": "application/json;",
    },
  });

  let rdata = await data.json();

  pageination(rdata);
}

showtable();
