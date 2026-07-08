// Watched Button Toggle
const watchedBtn = document.getElementById('watched-btn');
watchedBtn.addEventListener('click', () => {
    watchedBtn.classList.toggle('active');
    if (watchedBtn.classList.contains('active')) {
        watchedBtn.innerHTML = '<i class="fas fa-heart"></i> Watched';
    } else {
        watchedBtn.innerHTML = '<i class="fas fa-heart"></i> Watched';
    }
});

// Wishlist Button Toggle
const wishlistBtn = document.getElementById('wishlist-btn');
wishlistBtn.addEventListener('click', () => {
    wishlistBtn.classList.toggle('active');
    if (wishlistBtn.classList.contains('active')) {
        wishlistBtn.innerHTML = '<i class="fas fa-plus"></i> Added to Wishlist';
    } else {
        wishlistBtn.innerHTML = '<i class="fas fa-plus"></i> Wishlist';
    }
});

// Next Button (Placeholder for cycling movies)
const nextBtn = document.getElementById('next-btn');
nextBtn.addEventListener('click', () => {
    alert('Next movie functionality coming soon!');
    // In a real app, this would cycle to the next movie (e.g., update poster and review).
});