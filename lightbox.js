const images = Array.from(document.querySelectorAll('.gallery img'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');

let currentIndex = 0;

// Open lightbox
images.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentIndex = index;
        showImage();
        lightbox.classList.add('active');
    });
});

// Show image by index
function showImage() {
    lightboxImg.src = images[currentIndex].src;
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
}

// Button close
closeBtn.addEventListener('click', closeLightbox);

// Click outside image closes
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'ArrowRight') {
        nextImage();
    } else if (e.key === 'ArrowLeft') {
        prevImage();
    } else if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Mouse click navigation (left / right half)
lightboxImg.addEventListener('click', (e) => {
    const rect = lightboxImg.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    if (clickX < rect.width / 2) {
        prevImage();
    } else {
        nextImage();
    }
});

// Helpers
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
}
