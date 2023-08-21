document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.getElementById("add-button");
    const infoUL = document.getElementById("info-ul");
  
    // Load stored information on page load
    loadStoredInfo();
  
    addButton.addEventListener("click", function() {
      const labelInput = document.getElementById("label");
      const valueInput = document.getElementById("value");
  
      const label = labelInput.value;
      const value = valueInput.value;
  
      if (label && value) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${label}:</strong> ${value} <button class="delete-button">Delete</button>`;
        infoUL.appendChild(listItem);
  
        // Save the new information
        saveInfo(label, value);
  
        labelInput.value = "";
        valueInput.value = "";
  
        // Add event listener for delete button
        const deleteButton = listItem.querySelector(".delete-button");
        deleteButton.addEventListener("click", function() {
          deleteInfo(label, value);
          listItem.remove();
        });
      }
    });
  
    // Function to save information to local storage
    function saveInfo(label, value) {
      const storedInfo = JSON.parse(localStorage.getItem("storedInfo")) || [];
      storedInfo.push({ label, value });
      localStorage.setItem("storedInfo", JSON.stringify(storedInfo));
    }
  
    // Function to load stored information
    function loadStoredInfo() {
      const storedInfo = JSON.parse(localStorage.getItem("storedInfo")) || [];
      storedInfo.forEach(item => {
        addInfoToList(item.label, item.value);
      });
    }
  
    // Function to delete information from local storage
    function deleteInfo(label, value) {
      const storedInfo = JSON.parse(localStorage.getItem("storedInfo")) || [];
      const updatedInfo = storedInfo.filter(item => !(item.label === label && item.value === value));
      localStorage.setItem("storedInfo", JSON.stringify(updatedInfo));
    }
  
    // Function to add information to the list
    function addInfoToList(label, value) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<strong>${label}:</strong> ${value} <button class="delete-button">Delete</button>`;
      infoUL.appendChild(listItem);
  
      const deleteButton = listItem.querySelector(".delete-button");
      deleteButton.addEventListener("click", function() {
        deleteInfo(label, value);
        listItem.remove();
      });
    }
  });
  