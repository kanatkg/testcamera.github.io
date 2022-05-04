function ready() {
    if (document.readyState == 'complete') {
        Webcam.set({
            width: 300,
            height: 220,
            //			dest_width: 300,
            //			dest_height: 220
            image_format: 'jpeg',
            jpeg_quality: 90
        });
        try {
            Webcam.attach('#camera');
        } catch (e) {
            alert(e);
        }
    }
}

function take_snapshot() {
    // take snapshot and get image data
    var data = null;
    Webcam.snap(function (data_uri) {

        data = data_uri;
    });
    return data;
}

function change_camera() {
    // take snapshot and get image data
  
    Webcam.reset();
    Webcam.set({
        width: 300,
        height: 220,
        //			dest_width: 300,
        //			dest_height: 220
        image_format: 'jpeg',
        jpeg_quality: 90,
        facingMode: "environment"
    }
    );
    try {
        Webcam.attach('#camera');
    } catch (e) {
        alert(e);
    }
}

function webcam2() {
    if (
        !"mediaDevices" in navigator ||
        !"getUserMedia" in navigator.mediaDevices
    ) {
        alert("Camera API is not available in your browser");
        return;
    }

    // get page elements
    const video = document.querySelector("#video");
    const btnPlay = document.querySelector("#btnPlay");
    const btnPause = document.querySelector("#btnPause");
    const btnScreenshot = document.querySelector("#btnScreenshot");
    const btnChangeCamera = document.querySelector("#btnChangeCamera");
    const screenshotsContainer = document.querySelector("#screenshots");
    const canvas = document.querySelector("#canvas");
    const devicesSelect = document.querySelector("#devicesSelect");

    // video constraints
    const constraints = {
        video: {
            width: {
                min: 1280,
                ideal: 1920,
                max: 2560,
            },
            height: {
                min: 720,
                ideal: 1080,
                max: 1440,
            },
        },
    };

    // use front face camera
    let useFrontCamera = true;

    // current video stream
    let videoStream;

    // handle events
    // play
    btnPlay.addEventListener("click", function () {
        video.play();
        btnPlay.classList.add("is-hidden");
        btnPause.classList.remove("is-hidden");
    });

    // pause
    btnPause.addEventListener("click", function () {
        video.pause();
        btnPause.classList.add("is-hidden");
        btnPlay.classList.remove("is-hidden");
    });

    // take screenshot
    btnScreenshot.addEventListener("click", function () {
        const img = document.createElement("img");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);
        img.src = canvas.toDataURL("image/png");
        screenshotsContainer.prepend(img);
    });

    // switch camera
    btnChangeCamera.addEventListener("click", function () {
        useFrontCamera = !useFrontCamera;

        initializeCamera();
    });

    // stop video stream
    function stopVideoStream() {
        if (videoStream) {
            videoStream.getTracks().forEach((track) => {
                track.stop();
            });
        }
    }

    // initialize
    async function initializeCamera() {
        stopVideoStream();
        constraints.video.facingMode = useFrontCamera ? "user" : "environment";

        try {
            videoStream = await navigator.mediaDevices.getUserMedia(constraints);
            video.srcObject = videoStream;
        } catch (err) {
            alert("Could not access the camera");
        }
    }

    initializeCamera();
};
