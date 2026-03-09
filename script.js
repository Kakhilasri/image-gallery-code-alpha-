// Sample image data. Could be fetched from a server in a real app.
const images = [
    {src: 'https://picsum.photos/id/1018/400/300', title: 'Mountain View', category: 'nature'},
    {src: 'https://picsum.photos/id/1025/400/300', title: 'Cute Puppy', category: 'animals'},
    {src: 'https://picsum.photos/id/1035/400/300', title: 'Forest Path', category: 'nature'},
    {src: 'https://picsum.photos/id/1050/400/300', title: 'beach view', category: 'nature'},
    {src: 'https://picsum.photos/id/1062/400/300', title: 'Bird in Flight', category: 'animals'},
    {src: 'https://picsum.photos/id/1074/400/300', title: 'Lion', category: 'animals'},
    {src: 'https://picsum.photos/id/1084/400/300', title: 'Snowy Mountain', category: 'animals'},
    {src: 'https://picsum.photos/id/109/400/300', title: 'Beach Sunset', category: 'nature'},
    {src: 'https://picsum.photos/id/110/400/300', title: 'Desert Dunes', category: 'nature'},
    {src: 'https://picsum.photos/id/111/400/300', title: 'Robotics', category: 'tech'},
    {src: 'https://picsum.photos/id/112/400/300', title: 'rice crop', category: 'nature'},
    {src: 'https://picsum.photos/id/113/400/300', title: 'cup of nature', category: 'nature'},
    {src: 'https://picsum.photos/id/114/400/300', title: 'sky', category: 'nature'},
    {src: 'https://picsum.photos/id/115/400/300', title: 'view the dark', category: 'nature'},
    {src: 'https://picsum.photos/id/116/400/300', title: 'Golden Gate', category: 'nature'},
    {src: 'https://picsum.photos/id/117/400/300', title: 'Abstract Colors', category: 'art'},
    {src: 'https://picsum.photos/id/118/400/300', title: 'Mystery Object', category: 'uncategorized'}
];

const galleryEl = document.getElementById('gallery');
const filterButtons = document.querySelectorAll('#filter-buttons button');
let currentIndex = 0; // index within displayedIndices
let displayedIndices = []; // list of real indexes currently visible

function buildGallery(filter = 'all') {
    galleryEl.innerHTML = '';
    displayedIndices = [];
    images.forEach((img, index) => {
        const cat = img.category ? img.category : 'uncategorized';
        if (filter === 'all' || cat === filter) {
            displayedIndices.push(index);
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.dataset.index = displayedIndices.length - 1; // index within displayedIndices

            const imageEl = document.createElement('img');
            imageEl.src = img.src;
            imageEl.alt = img.title;
            imageEl.classList.add('loading');
            imageEl.addEventListener('load', () => {
                imageEl.classList.add('loaded');
            });

            const titleOverlay = document.createElement('div');
            titleOverlay.className = 'title-overlay';
            titleOverlay.textContent = img.title;

            item.appendChild(imageEl);
            item.appendChild(titleOverlay);
            galleryEl.appendChild(item);
        }
    });
}

function showLightbox(displayIdx) {
    currentIndex = displayIdx;
    const realIndex = displayedIndices[displayIdx];
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const caption = lightbox.querySelector('.caption');
    lightboxImg.style.opacity = 0;
    lightboxImg.src = images[realIndex].src;
    caption.textContent = images[realIndex].title;
    lightbox.style.display = 'flex';
    // fade in
    setTimeout(() => { lightboxImg.style.opacity = 1; }, 50);
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function prevImage() {
    if (displayedIndices.length === 0) return;
    currentIndex = (currentIndex - 1 + displayedIndices.length) % displayedIndices.length;
    showLightbox(currentIndex);
}

function nextImage() {
    if (displayedIndices.length === 0) return;
    currentIndex = (currentIndex + 1) % displayedIndices.length;
    showLightbox(currentIndex);
}

// Event listeners
galleryEl.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    showLightbox(parseInt(item.dataset.index, 10));
});

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        buildGallery(btn.dataset.filter);
    });
});

// lightbox navigation
const lightbox = document.getElementById('lightbox');
lightbox.querySelector('.close').addEventListener('click', closeLightbox);
lightbox.querySelector('.prev').addEventListener('click', prevImage);
lightbox.querySelector('.next').addEventListener('click', nextImage);

// close on click outside image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// initial build
buildGallery();
