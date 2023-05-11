var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1;
var day = now.getDate();

// Format the date and time as a string
var formattedDate = year + "-" + month + "-" + day;

function generateGroups() {
  // Get the names and number of groups from the form
  var names = document.getElementById("names").value.trim().split("\n");
  var numGroups = document.getElementById("num-groups").value;

  // Remove empty names
  names = names.filter(function (name) {
    return name.trim().length > 0;
  });

  // Shuffle the names randomly
  shuffle(names);

  // Divide the names into groups
  var groups = [];
  for (var i = 0; i < names.length; i++) {
    var groupIndex = i % numGroups;
    if (!groups[groupIndex]) {
      groups[groupIndex] = [];
    }
    groups[groupIndex].push(names[i]);
  }

  // Display the groups on the page
  var groupList = document.getElementById("group-list");
  groupList.innerHTML = "";
  for (var i = 0; i < groups.length; i++) {
    var groupTitle = "Group " + (i + 1);
    var groupMembers = groups[i].join(", ");
    var groupHTML = "<h2>" + groupTitle + "</h2><p>" + groupMembers + "</p>";
    groupList.innerHTML += groupHTML;
  }
}

function shuffle(array) {
  // Randomly shuffle the elements of an array
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function downloadExcel() {
    // Get the data to export from the page
    var tournamentName = document.getElementById("tournament-name").value;
    var groups = document.querySelectorAll("#group-list h2");
    var members = document.querySelectorAll("#group-list p");
  
    // Create a new workbook
    var workbook = XLSX.utils.book_new();
  
    // Add the worksheets to the workbook
    var allWorksheetData = [];
    for (var i = 0; i < groups.length; i++) {
      var groupName = groups[i].textContent;
      var groupMembers = members[i].textContent.split(", ");
  
      // Create the worksheet data
      var worksheetData = [
        ["groupnumber", "member"],
        [groupName, groupMembers.join(", ")],
      ];
      allWorksheetData.push(worksheetData);
    }
  
    // Create a worksheet for each set of data in the array
    for (var i = 0; i < allWorksheetData.length; i++) {
      var worksheet = XLSX.utils.aoa_to_sheet(allWorksheetData[i]);
      var groupName = groups[i].textContent;
  
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, groupName);
    }
  
    // Combine all worksheets into one
    var combinedData = [];
    workbook.SheetNames.forEach(function (sheetName) {
      var worksheet = workbook.Sheets[sheetName];
      var data = XLSX.utils.sheet_to_json(worksheet);
      combinedData = combinedData.concat(data);
    });
  
    // Create a new worksheet with the combined data
    var worksheet = XLSX.utils.json_to_sheet(combinedData);
  
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "all group");

    // Save the workbook as an Excel file
    var filename = tournamentName + "_" + formattedDate + ".xlsx";
  
    // Write the workbook to a file
    XLSX.writeFile(workbook, filename);
  }
     
  function generateTable(data) {
    var tbody = document.querySelector('#group-table tbody');
    tbody.innerHTML = '';
    
    data.forEach(function(row) {
      var tr = document.createElement('tr');
      
      var idTd = document.createElement('td');
      idTd.textContent = row.id;
      tr.appendChild(idTd);
      
      var tournamentNameTd = document.createElement('td');
      tournamentNameTd.textContent = row.tourname;
      tr.appendChild(tournamentNameTd);
      
      var hostNameTd = document.createElement('td');
      hostNameTd.textContent = row.hostname;
      tr.appendChild(hostNameTd);
      
      var prizePoolTd = document.createElement('td');
      prizePoolTd.textContent = row.prizepool;
      tr.appendChild(prizePoolTd);
      
      var dateTd = document.createElement('td');
      dateTd.textContent = row.file_name;
      tr.appendChild(dateTd);
      
      tbody.appendChild(tr);
    });
  }
  function showTable() {
    // Get the table body element
    var tableBody = document.getElementById("table-body");
  
    // Make a GET request to the server to fetch the data
    fetch("http://localhost:3000/tourd")
      .then(response => response.json())
      .then(data => {
        // Loop through the data and create a new row for each record
        data.forEach(record => {
          // Create a new table row and cells for the data
          var row = document.createElement("tr");
          var idCell = document.createElement("td");
          var tournamentNameCell = document.createElement("td");
          var hostNameCell = document.createElement("td");
          var prizePoolCell = document.createElement("td");
          var dateCell = document.createElement("td");
  
          // Set the cell values to the record values
          idCell.textContent = record.id;
          tournamentNameCell.textContent = record.tournament_name;
          hostNameCell.textContent = record.host_name;
          prizePoolCell.textContent = record.prize_pool;
          dateCell.textContent = new Date(record.date).toLocaleDateString();
  
          // Add the cells to the row and the row to the table body
          row.appendChild(idCell);
          row.appendChild(tournamentNameCell);
          row.appendChild(hostNameCell);
          row.appendChild(prizePoolCell);
          row.appendChild(dateCell);
          tableBody.appendChild(row);
        });
      })
      .catch(error => console.error(error));
  }
  
  
  
  