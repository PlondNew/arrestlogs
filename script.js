function checkPassword() {
    const password = document.getElementById("password").value;
    const correctPassword = "808";

    if (password === correctPassword) {
        window.location.href = "database.html";
    } else {
        alert("Incorrect Password");
    }
}
