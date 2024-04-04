let user = document.getElementById("userDetails");
async function showDetail() {
  let id = window.location.pathname.split("/").pop();

  let userData = await fetch(`https://jsonplaceholder.org/posts/${id}`, {
    method: "get",
    headers: {
      "Content-type": "application/json;",
    },
  });

  let details = [];
  details.push(await userData.json());

  details.forEach((d) => {
    user.innerHTML = `<div class="first">
                                    <p>ID: ${d.id}</p>
                                    <p>UserId: ${d.userId}</p>
                                    <p>PublishedAt: ${d.publishedAt}</p>
                                    <p>UpdatedAt: ${d.updatedAt}</p>
                                </div>
                                <div class="second">
                                    <img src="${d.image}">
                                    <p class="title">Title: ${d.title}</p>
                                </div>
                                <div class="third">
                                    <p>Content: ${d.content}</p>
                                </div>
                                <div class="btn">
                                    <button id="${d.id}" onclick="showComments(this.id) ">Show Comments</button>
                                </div>`;
  });
}

async function showComments(id) {
  let commentData = await fetch(`https://jsonplaceholder.org/comments/${id}`, {
    method: "get",
    headers: {
      "Content-type": "application/json;",
    },
  });

  let comments = await commentData.json();

  let commentArr = comments["comment"].split(".");
  let commentsDiv = document.getElementById("commentsDiv");
  let btn = document.getElementById(id);

  if (btn.innerHTML === "Show Comments") {
    btn.innerHTML = "Hide Comments";
    for (let i = 0; i < commentArr.length - 1; i++) {
      commentsDiv.innerHTML += `<p class="comment">${i + 1}. ${
        commentArr[i]
      }.</p>`;
    }
  } else {
    btn.innerHTML = "Show Comments";
    commentsDiv.innerHTML = "";
  }
}

showDetail();
