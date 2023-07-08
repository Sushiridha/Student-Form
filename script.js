var sname,dept,email, mobile,year;

function readFom() {
    sname = document.getElementById("name").value;
    dept= document.getElementById("department").value;
    email= document.getElementById("email").value;
    mobile = document.getElementById("mobile").value;
    year = document.getElementById("year").value;
    console.log(sname,dept,email, mobile,year);
}

document.getElementById("insert").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("student/" + sname)
    .set({
      name: sname,
      department: dept,
      emailId: email,
      mobileNo: mobile,
      yearp: year,
      graduationStatus: "unknown",
    });
  alert("Data Inserted");
  document.getElementById("studentForm").reset();
};

// Fetch data from the database and display it in the table
firebase.database().ref("student").on("value", function(snapshot) {
  var studentTable = document.getElementById("studentTable").getElementsByTagName("tbody")[0];
  studentTable.innerHTML = "";

  snapshot.forEach(function(childSnapshot) {
    var studentData = childSnapshot.val();
    var studentKey = childSnapshot.key;

    var row = studentTable.insertRow();
    var nameCell = row.insertCell(0);
    var departmentCell = row.insertCell(1);
    var emailCell = row.insertCell(2);
    var mobileCell = row.insertCell(3);
    var yearCell = row.insertCell(4);
    var graduationCell = row.insertCell(5);
    var actionCell = row.insertCell(6);

    nameCell.innerHTML = studentData.name;
    departmentCell.innerHTML = studentData.department;
    emailCell.innerHTML = studentData.emailId;
    mobileCell.innerHTML = studentData.mobileNo;
    yearCell.innerHTML = studentData.yearp;
    graduationCell.innerHTML = studentData.graduationStatus;
    actionCell.innerHTML = `<button onclick="editStudent('${studentKey}')">Edit</button>`;

  });
});

// Add search functionality
document.getElementById("searchInput").addEventListener("keypress", function() {
  var input = this.value.toLowerCase();
  var rows = document.getElementById("studentTable").getElementsByTagName("tbody")[0].rows;

  for (var i = 0; i < rows.length; i++) {
    var name = rows[i].cells[0].innerHTML.toLowerCase();

    if (name.includes(input)) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
});

// Edit student details
function editStudent(studentKey) {
  var graduationStatus = prompt("Enter graduation status (completed, pursuing, unknown):");

  if (graduationStatus !== null) {
    graduationStatus = graduationStatus.trim().toLowerCase();

    if (graduationStatus === "completed" || graduationStatus === "pursuing" || graduationStatus === "unknown") {
      firebase.database().ref("student/" + studentKey + "/graduationStatus").set(graduationStatus);
    } else {
      alert("Invalid graduation status. Please enter either 'completed', 'pursuing', or 'unknown'.");
    }
  }
}


document.getElementById("update").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("student/" + sname)
    .update({
      // name: sname,
      department: dept,
      emailId: email,
      mobileNo: mobile,
      yearp: year,
    });
  alert("Data Updated");
  document.getElementById("studentForm").reset();
};

document.getElementById("delete").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("student/" + sname)
    .remove();
  alert("Data Deleted");
  document.getElementById("studentForm").reset();
};