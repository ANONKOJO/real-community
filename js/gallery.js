// Go back to section page - SIMPLE VERSION
function goBack() {
    // Just go back in browser history
    window.history.back();
}

// Open modal with full-size image
function openModal(element) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    const img = element.querySelector ? element.querySelector('img') : element;
    
    modal.style.display = 'block';
    modalImg.src = img.tagName === 'IMG' ? img.src : img.querySelector('img').src;
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