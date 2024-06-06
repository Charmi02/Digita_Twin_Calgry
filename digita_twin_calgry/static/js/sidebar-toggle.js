function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    sidebar.style.display = (sidebar.style.display === "block") ? "none" : "block";
}

function hideSidebar() {
    var sidebar = document.getElementById("sidebar");
    sidebar.style.display = "none";
}

function toggleDropdown(event) {
    var dropdownContent = event.target.nextElementSibling;
    dropdownContent.style.display = "block";
}

function hideDropdown(event) {
    var dropdownContent = event.target.nextElementSibling;
    dropdownContent.style.display = "none";
}
