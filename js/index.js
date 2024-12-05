
var siteNameInput = document.getElementById("SiteName");
var siteURLInput = document.getElementById('SiteURL');
var containerInfo = [];

if (localStorage.getItem('info') !== null) {
    containerInfo = JSON.parse(localStorage.getItem("info"));
    displayInfo();
}

var nameRegex = /^.{3,}$/;
var urlRegex = /^(https?:\/\/)?[a-zA-Z0-9.-]+\.com$/;

function addInfo() {
    var siteName = siteNameInput.value;
    var siteURL = siteURLInput.value;


    if (!nameRegex.test(siteName)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Name',
            text: 'Site Name must be at least 3 characters long.',
        });
        return;
    }

    for (var i = 0; i < containerInfo.length; i++) {
        if (containerInfo[i].siteName === siteName) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Bookmark name must be unique!',
            });
            return;
        }
    }

    if (!urlRegex.test(siteURL)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid URL',
            text: 'URL must end with .com.',
        });
        return;
    }

    var information = {
        siteName: siteName,
        siteURL: siteURL,
    };
    demo(siteNameInput.value); // Validate the Website Name
    demo2(siteURLInput.value); // Validate the Website URL
    containerInfo.push(information);
    clearForm();
    localStorage.setItem('info', JSON.stringify(containerInfo));
    displayInfo();
}

function demo(pvalue) {
    if (nameRegex.test(pvalue)) {
        siteNameInput.classList.add("is-valid");
        siteNameInput.classList.remove("is-invalid");
    }
    else {
        siteNameInput.classList.add("is-invalid");
        siteNameInput.classList.remove("is-valid");
    }
}
function demo2(pvalue) {
    if (urlRegex.test(pvalue)) {
        siteURLInput.classList.add("is-valid");
        siteURLInput.classList.remove("is-invalid");
    }
    else {
        siteURLInput.classList.add("is-invalid");
        siteURLInput.classList.remove("is-valid");
    }
}

function clearForm() {
    siteNameInput.value = null;
    siteURLInput.value = null;
}

function displayInfo() {
    var container = ``;
    for (var i = 0; i < containerInfo.length; i++) {
        container += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${containerInfo[i].siteName}</td>
                        <td><button class="btn btn-success" onclick="openURL('${containerInfo[i].siteURL}')"><i class="fa-solid fa-eye"></i> Visit</button></td>
                        <td><button onclick='deleteInfo(${i})' class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
                    </tr>`
    }
    document.getElementById('table').innerHTML = container;
}

function deleteInfo(deletedIndex) {
    containerInfo.splice(deletedIndex, 1);
    displayInfo();
    localStorage.setItem('info', JSON.stringify(containerInfo));
}

function openURL(url) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url;
    }
    window.open(url, '_blank');
}