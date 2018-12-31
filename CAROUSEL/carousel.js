const images = ["pics/sloth01.jpg",
                "pics/sloth02.jpg",
                "pics/sloth03.jpg",
                "pics/sloth04.jpg",
                "pics/sloth05.jpg"];

let imagesIndex = 1;
let started = false;
let interval;
let width = 600;

const playIconElement = document.getElementsByClassName("play-icon")[0];
document.getElementsByClassName("play-icon")[0].style.transition = "all 0.5s";
playIconElement.addEventListener("click", startCarousel);

function setResponsiveSize() {
    if (window.innerWidth < 620) {
        width = window.innerWidth - 20;
    } else {
        width = 600;
    }
    
    Array.from(document.getElementsByClassName("image")).forEach((element) => {
        element.style.width = width;
    });
    Array.from(document.getElementsByClassName("image-hide")).forEach((element) => {
        element.style.width = width;
    });
    document.getElementById("leftID").style.left = width;
    document.getElementById("rightID").style.left = -width;
    playIconElement.style.left = -(width/2+30);
}
setResponsiveSize();

function nextImage() {
    if (imagesIndex == images.length-1) {
        imagesIndex = 0;
    } else {
        imagesIndex++;
    }
    const imageElements = document.querySelectorAll("img.image");
    for (let i=0; i<imageElements.length; i++) {
        imageElements[i].style.transition = "all 1s";
        imageElements[i].style.left = parseInt(imageElements[i].style.left, 10) - width;
    }
    setTimeout(replaceElement, 1000);
    if (started) {
        restartInterval();
    }
}

function prevImage() {
    if (imagesIndex == 0) {
        imagesIndex = images.length-1;
    } else {
        imagesIndex--;
    }
    const imageElements = document.querySelectorAll("img.image");
    for (let i=0; i<imageElements.length; i++) {
        imageElements[i].style.transition = "all 1s";
        imageElements[i].style.left = parseInt(imageElements[i].style.left, 10) + width;
    }
    setTimeout(replaceElement, 1000);
    if (started) {
        restartInterval();
    }
}

function replaceElement() {
    const nextIndex = imagesIndex == images.length - 1 ? 0 : imagesIndex + 1;
    const prevIndex = imagesIndex - 1 < 0 ? images.length -1 : imagesIndex - 1;
    
    const newVisibleElement = `<img src="${images[imagesIndex]}" class="image" style="left: 0; width: ${width}" id="middleID">`;
    const newRightElement = `<img src="${images[nextIndex]}" class="image" style="left: ${-width}; width: ${width}" id="rightID">`;
    const newLeftElement = `<img src="${images[prevIndex]}" class="image" style="left: ${width}; width: ${width}" id="leftID">`;
    
    const leftHideElement = document.getElementById('leftImageContainer');
    const rightHideElement = document.getElementById('rightImageContainer');
    const visibleElement = document.getElementById('visibleImage');
    
    leftHideElement.parentElement.removeChild(document.getElementById('leftID'));
    rightHideElement.parentElement.removeChild(document.getElementById('rightID'));
    visibleElement.removeChild(document.getElementById('middleID'));
    
    leftHideElement.insertAdjacentHTML('beforebegin', newLeftElement);
    rightHideElement.insertAdjacentHTML('afterend', newRightElement);
    visibleElement.insertAdjacentHTML('beforeend', newVisibleElement);
}

function startCarousel() {
    started = true;
    document.getElementById("playIcon").src = "icons/iconmonstr-pause.svg"
    
    playIconElement.removeEventListener("click", startCarousel);
    playIconElement.addEventListener("click", stopCarousel);
    
    interval = setInterval(nextImage, 2500)
}

function stopCarousel() {
    started = false;
    document.getElementById("playIcon").src = "icons/iconmonstr-play.svg";
    playIconElement.removeEventListener("click", stopCarousel);
    playIconElement.addEventListener("click", startCarousel);
    clearInterval(interval);
}

function restartInterval() {
    stopCarousel();
    startCarousel();
}

document.getElementById("visibleImage").addEventListener("mouseover", setIconVisible);
document.getElementsByClassName("play-icon")[0].addEventListener("mouseover", setIconVisible);
document.getElementsByClassName("left-icon")[0].addEventListener("mouseover", setIconVisible);
document.getElementsByClassName("right-icon")[0].addEventListener("mouseover", setIconVisible);

function setIconVisible() {
    document.getElementsByClassName("play-icon")[0].style.opacity = 0.5;
}

document.getElementById("visibleImage").addEventListener("mouseout", () => {
    document.getElementsByClassName("play-icon")[0].style.opacity = 0;
})

window.onkeyup = function(e) {
    let key = e.keyCode ? e.keyCode : e.which;
    switch (key) {
        case 37: {
            prevImage();
            break;
        }
        case 39: {
            nextImage();
            break;
        }
        case 32: {
            if (started) {
                stopCarousel();
            } else {
                startCarousel();
            }
        }
    }
}

window.onresize = function(e) {
    setResponsiveSize();
}