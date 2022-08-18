async function blogPostFormHandler() {
  const title = document.querySelector("#post-title").value.trim();
  const post_body = document.querySelector("#post-body").value.trim();

  if (title && post_body) {
    const respose = await fetch("api/post/", {
      method: "POST",
      body: JSON.stringify({
        title,
        post_body,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if(respose.ok) {
        console.log("Blog post created...");
        document.location.reload();
    } else {
        alert("Blog post failed...");
    }
  }
}

document
  .querySelector(".blog-form")
  .addEventListener("submit", blogPostFormHandler);
