async function logoutHandler() {
    const response = await fetch("/api/user/logout", {
        method: "POST"
    });

    if(response.ok) {
        console.log("You are logged out...");
        document.location.replace("/");
    } else {
        alert("Error logging out...");
    }
}

document.querySelector("#logout").addEventListener("click", logoutHandler);