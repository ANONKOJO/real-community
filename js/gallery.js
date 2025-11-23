// Go back to section page - SIMPLE VERSION
function goBack() {
    // Just go back in browser history
    window.history.back();
}

// Open modal with full-size image
function openModal(element) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    
    // If element is an img, use it directly; otherwise find img inside
    const img = element.tagName === 'IMG' ? element : element.querySelector('img');
    
    if (img && img.src) {
        modal.style.display = 'block';
        modalImg.src = img.src;
    } else {
        console.error('No image found to display in modal');
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});