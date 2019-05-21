// general setup
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const streamActive = {active: null};

const startView = $('.start-view');
const captureView = $('.capture-view');
const snapView = $('.snap-view');
const returnView = $('.return-img');

$('#openCapBtn').on('click', () => enterCapturePhase())
$('#snapBtn').on('click', () => makeSnapshot());
$('#resetBtn').on('click', () => resetSystem());

//
// TODO: check for mediaDevices first:
//          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {}
//
// TODO: save strip to disk
//

// system control
function enterCapturePhase() {
    startView.removeClass('show');
    connectVideoStream();
    captureView.addClass('show');
}

function makeSnapshot() {
    context.drawImage(video, 0, 0, 320, 240);
    captureView.removeClass('show');
    snapView.addClass('show');
    dissableStream();
}

function resetSystem() {
    convertCanvasToImage();
    snapView.removeClass('show');
    startView.addClass('show');
}

// media control
function connectVideoStream() {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        streamActive.active = stream;
        video.srcObject = stream;
        video.play();
    });
}

function dissableStream() {
    let track = streamActive.active.getTracks()[0];
    track.stop();
    video.pause();
    streamActive.active = null;
}

function convertCanvasToImage() {
	let image = new Image();
	image.src = canvas.toDataURL(Image);
	returnView.append(image);
    if (!returnView.hasClass('show')) {
        returnView.addClass('show');
    }
}
