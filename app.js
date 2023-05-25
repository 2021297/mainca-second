'use strict';

// Get the video element from the HTML file
const video = document.getElementById('video');

// Get the canvas element from the HTML file
const canvas = document.getElementById('canvas');

// Get the "Take Picture" button element from the HTML file
const takePictureButton = document.getElementById('take-picture');

// Get the "Save Picture" button element from the HTML file
const savePictureButton = document.getElementById('save-picture');

// provides methods for capturing audio and video streams from the user's device.
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(error => {
            console.error(error);
        });
} else {
    console.error("getUserMedia is not supported");
}

//method used to attach an event listener to an HTML element. 
takePictureButton.addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.getContext('2d').drawImage(video, 0, 0);

    const img = new Image();
    img.src = canvas.toDataURL();

    document.body.appendChild(img);

    savePictureButton.style.display = 'block';

})

//save pic that user clicked
savePictureButton.addEventListener('click', () => {
    const dataURL = canvas.toDataURL();

    const link = document.createElement('a');
    link.href = dataURL;

    link.download = 'picture.png';
    link.click();
})

//create notes that user can write
function initialize() {
    let notes = window.localStorage.notes;
    if (!notes) notes = '';
    window.document.querySelector('input').value = notes;
}

//save the notes
function saveNotes() {
    let notes = window.document.querySelector('input').value;
    window.localStorage.setItem('notes', notes);
}

function quit() {
    app.quit();
}

//called to stop the default behavior of the event.
function stopDefaultEvent(event) {
    event.preventDefault();
    return false;
}

window.ondragover = stopDefaultEvent;
window.ondrop = stopDefaultEvent;

//used to display an image in a set of icons.  represents the path or URL of the image file to be displayed.
function displayImageInIconSet(filePath) {
    var images = window.document.querySelectorAll('#icons img');
    for (var i = 0; i < images.length; i++) {
        images[i].src = filePath;
    }
}

//used to display a set of icons. 
function displayIconsSet() {
    var iconsArea = window.document.querySelector('#icons');
    iconsArea.style.display = 'block';
}

// used to intercept a dropped file during a drag and drop operation
function interceptDroppedFile() {
    var interceptArea = window.document.querySelector('#load-icon-holder');
    interceptArea.ondrop = function (event) {
        event.preventDefault();
        interceptArea.style.display = '';
        displayIconsSet();
        var file = event.dataTransfer.files[0];
        displayImageInIconSet(file.path);
        return false;
    };
}

//triggered when the whole page and its dependencies
window.onload = function () {
    interceptDroppedFile();
}

// assigned the elements
function calculateBMI() {
    var weightInput = document.getElementById("weight");
    var heightInput = document.getElementById("height");
    var resultDiv = document.getElementById("result");

    var weight = weightInput.value;
    var height = heightInput.value;

    // Validate input
    if (weight === "" || height === "") {
        resultDiv.innerHTML = "Please enter both weight and height.";
        return;
    }

    // Convert height to meters
    var heightInMeters = height / 100;

    // Calculate BMI
    var bmi = weight / (heightInMeters * heightInMeters);

    // Display the result
    var resultText = "Your BMI is: " + bmi.toFixed(2);
    resultDiv.innerHTML = resultText;
}