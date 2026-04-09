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

// Function to show success (Called by the Save button onclick)
//function showSuccess() {
//    const uploadModalEl = document.getElementById('uploadModal');
//    if (uploadModalEl) {
//        const modalInstance = bootstrap.Modal.getInstance(uploadModalEl);
//        if (modalInstance) {
//            modalInstance.hide();
//        }
//    }

//    // Small delay to let the backdrop fade out before showing the next modal
//    setTimeout(function () {
//        const successModalEl = document.getElementById('successModal');
//        if (successModalEl) {
//            const successModal = new bootstrap.Modal(successModalEl);
//            successModal.show();
//        }
//    }, 400);
//}

//// Function to handle the Folder Locking when the modal opens
//document.addEventListener('show.bs.modal', function (event) {
//    if (event.target.id === 'uploadModal') {
//        const button = event.relatedTarget;
//        const folderName = button.getAttribute('data-folder-name');
//        const dropdown = document.getElementById('folderDropdown');

//        if (dropdown) {
//            if (folderName) {
//                // Set the dropdown to match the folder name and disable it
//                for (let i = 0; i < dropdown.options.length; i++) {
//                    if (dropdown.options[i].text.trim() === folderName.trim()) {
//                        dropdown.selectedIndex = i;
//                        break;
//                    }
//                }
//                dropdown.disabled = true;
//            } else {
//                // Reset for the general Hub upload
//                dropdown.disabled = false;
//                dropdown.value = "unfiled";
//            }
//        }
//    }
//});

function showSuccess() {
    const uploadModalEl = document.getElementById('uploadModal');
    bootstrap.Modal.getInstance(uploadModalEl).hide();

    setTimeout(() => {
        // KEEP THIS: Specific to file uploads
        showStatusModal(
            "Upload Successful!", 
            "Your document has been categorized and added to the Study Hub.", 
            "fa-check-circle", 
            "text-success"
        );
    }, 400);
}

document.addEventListener('show.bs.modal', function (event) {
    if (event.target.id === 'uploadModal') {
        // Use event.relatedTarget but also check its parent in case the icon was clicked
        let button = event.relatedTarget;
        if (button && button.tagName === 'I') {
            button = button.parentElement;
        }

        const folderName = button ? button.getAttribute('data-folder-name') : null;
        const dropdown = document.getElementById('folderDropdown');

        if (dropdown) {
            if (folderName) {
                const targetName = folderName.trim().toLowerCase();
                let matchFound = false;

                for (let i = 0; i < dropdown.options.length; i++) {
                    const optionText = dropdown.options[i].text.trim().toLowerCase();
                    if (optionText === targetName || optionText.includes(targetName)) {
                        dropdown.selectedIndex = i;
                        matchFound = true;
                        break;
                    }
                }
                dropdown.disabled = true;
            } else {
                dropdown.disabled = false;
                dropdown.selectedIndex = 0; // Default to Unfiled
            }
        }
    }
});

let elementToDelete = "";

// 1. Dynamic Success Message Logic
function showStatusModal(title, message, iconClass = "fa-check-circle", iconColor = "text-success") {
    document.getElementById('successTitle').innerText = title;
    document.getElementById('successMessage').innerText = message;
    document.getElementById('successIcon').className = `fas ${iconClass} fa-4x ${iconColor}`;

    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
}

// 2. Updated Delete Logic
function confirmDelete(name) {
    elementToDelete = name;
    document.getElementById('deleteTargetName').innerText = name;
    const delModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    delModal.show();
}

function executeDelete() {
    const delModalEl = document.getElementById('deleteModal');
    bootstrap.Modal.getInstance(delModalEl).hide();

    setTimeout(() => {
        // UPDATE THIS: Custom message for deletion
        showStatusModal(
            "Item Deleted",
            `${elementToDelete} has been successfully removed.`,
            "fa-trash-alt",
            "text-danger"
        );
    }, 400);
}

// 3. Color Change Logic
function changeFolderColor(cardId, colorName) {
    const card = document.getElementById(cardId);
    if (!card) return;

    // Mapping custom colors to hex values for the 10% opacity background
    const colorMap = {
        'primary': '#0d6efd',
        'success': '#198754',
        'danger': '#dc3545',
        'warning': '#ffc107',
        'info': '#0dcaf0',
        'secondary': '#6c757d',
        'orange': '#fd7e14',
        'purple': '#6f42c1',
        'pink': '#d63384'
    };

    const hexColor = colorMap[colorName];

    // Reset classes and apply new styles
    card.className = 'card h-100 shadow-sm';
    card.style.borderColor = hexColor;
    card.style.backgroundColor = hexToRgba(hexColor, 0.1);

    // Update the icon inside the card
    const icon = card.querySelector('.display-4 i');
    if (icon) {
        icon.style.color = hexColor;
    }
}

// Helper to convert hex to RGBA for the background
function hexToRgba(hex, opacity) {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

let currentFolderToRename = "";

function openRenameModal(currentName) {
    // Store the old name so we know what we are changing
    window.itemToRename = currentName;

    const input = document.getElementById('folderRenameInput');
    if (input) {
        input.value = currentName;
    }

    const modal = new bootstrap.Modal(document.getElementById('renameFolderModal'));
    modal.show();
}

function executeRename() {
    const newName = document.getElementById('folderRenameInput').value;
    const modalEl = document.getElementById('renameFolderModal');
    bootstrap.Modal.getInstance(modalEl).hide();

    setTimeout(() => {
        // UPDATE THIS: Custom message for renaming
        showStatusModal(
            "Changes Saved",
            `Successfully renamed to "${newName}".`,
            "fa-edit",
            "text-warning"
        );
    }, 400);
}

let originalFileName = "";

function openEditDocModal(fullFileName, currentStatus) {
    originalFileName = fullFileName;

    // Split name and extension
    const lastDotIndex = fullFileName.lastIndexOf('.');
    const namePart = fullFileName.substring(0, lastDotIndex);
    const extPart = fullFileName.substring(lastDotIndex);

    document.getElementById('editDocNameInput').value = namePart;
    document.getElementById('fileExtensionLabel').innerText = extPart;
    document.getElementById('editDocStatus').value = currentStatus;

    const modal = new bootstrap.Modal(document.getElementById('editDocumentModal'));
    modal.show();
}

function executeDocEdit() {
    const newName = document.getElementById('editDocNameInput').value;
    const extension = document.getElementById('fileExtensionLabel').innerText;
    const newStatus = document.getElementById('editDocStatus').value;

    const modalEl = document.getElementById('editDocumentModal');
    bootstrap.Modal.getInstance(modalEl).hide();

    setTimeout(() => {
        showStatusModal(
            "Document Updated",
            `"${originalFileName}" is now "${newName}${extension}" with status "${newStatus}".`,
            "fa-file-signature",
            "text-primary"
        );
    }, 400);
}