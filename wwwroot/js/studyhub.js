// Function to show/hide the "New Folder" name field
function toggleNewFolderInput() {
    var dropdown = document.getElementById("folderDropdown");
    var container = document.getElementById("newFolderContainer");

    // Check if "Create New Folder" (value="NEW") is selected
    if (dropdown.value === "NEW") {
        container.style.display = "block";
    } else {
        container.style.display = "none";
    }
}

function showSuccess() {
    // 1. Hide the Upload Modal (using Bootstrap's API)
    var uploadModalEl = document.getElementById('uploadModal');
    var uploadModal = bootstrap.Modal.getInstance(uploadModalEl);
    uploadModal.hide();

    // 2. Show the Success Modal after a tiny delay for smoothness
    setTimeout(function () {
        var successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();
    }, 400);
}