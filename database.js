// Firebase configuration (paste your Firebase config here)
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase and Firestore
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to load arrest records from Firestore
function loadArrestRecords() {
    const table = document.getElementById("arrestTable");

    db.collection("arrests").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const arrest = doc.data();
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = arrest.name;
            row.appendChild(nameCell);

            const chargeCell = document.createElement("td");
            chargeCell.textContent = arrest.charge;
            row.appendChild(chargeCell);

            const dateCell = document.createElement("td");
            dateCell.textContent = arrest.date;
            row.appendChild(dateCell);

            const statusCell = document.createElement("td");
            statusCell.textContent = arrest.status;
            row.appendChild(statusCell);

            table.appendChild(row);
        });
    }).catch((error) => {
        console.error("Error fetching records: ", error);
    });
}

// Call function to load data on page load
window.onload = loadArrestRecords;
// Function to add a new record to Firestore
function addRecord() {
    const name = document.getElementById("name").value;
    const charge = document.getElementById("charge").value;
    const date = document.getElementById("date").value;
    const status = document.getElementById("status").value;

    db.collection("arrests").add({
        name: name,
        charge: charge,
        date: date,
        status: status
    })
    .then(() => {
        alert("Record added successfully!");
        document.getElementById("addRecordForm").reset();
        loadArrestRecords(); // Reload records after adding new one
    })
    .catch((error) => {
        console.error("Error adding record: ", error);
    });
}
