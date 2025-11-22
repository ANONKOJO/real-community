class FloatingProfile {
    constructor(element) {
        this.element = element;
        this.isDragging = false;
        this.currentX = 0;
        this.currentY = 0;
        this.velocityX = (Math.random() - 0.5) * 1.5;
        this.velocityY = (Math.random() - 0.5) * 1.5;
        
        // Random starting position
        this.currentX = Math.random() * (window.innerWidth - element.offsetWidth);
        this.currentY = Math.random() * (window.innerHeight - element.offsetHeight - 200) + 100;
        
        this.updatePosition();
        this.setupEvents();
    }

    setupEvents() {
        // Mouse events
        this.element.addEventListener('mousedown', this.startDrag.bind(this));
        document.addEventListener('mousemove', this.drag.bind(this));
        document.addEventListener('mouseup', this.endDrag.bind(this));

        // Touch events
        this.element.addEventListener('touchstart', this.startDrag.bind(this), { passive: false });
        document.addEventListener('touchmove', this.drag.bind(this), { passive: false });
        document.addEventListener('touchend', this.endDrag.bind(this));
    }

    startDrag(e) {
        // Don't drag if clicking a button
        if (e.target.closest('button') || e.target.closest('a')) {
            return;
        }
        
        e.preventDefault();
        this.isDragging = true;
        const point = e.touches ? e.touches[0] : e;
        this.offsetX = point.clientX - this.currentX;
        this.offsetY = point.clientY - this.currentY;
        this.velocityX = 0;
        this.velocityY = 0;
    }

    drag(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        const point = e.touches ? e.touches[0] : e;
        this.currentX = point.clientX - this.offsetX;
        this.currentY = point.clientY - this.offsetY;
        this.updatePosition();
    }

    endDrag() {
        if (this.isDragging) {
            this.isDragging = false;
            // Resume floating with random velocity
            this.velocityX = (Math.random() - 0.5) * 1.5;
            this.velocityY = (Math.random() - 0.5) * 1.5;
        }
    }

    float() {
        if (this.isDragging) return;

        this.currentX += this.velocityX;
        this.currentY += this.velocityY;

        // Bounce off edges
        const maxX = window.innerWidth - this.element.offsetWidth;
        const maxY = window.innerHeight - this.element.offsetHeight;

        if (this.currentX <= 0 || this.currentX >= maxX) {
            this.velocityX *= -1;
            this.currentX = Math.max(0, Math.min(this.currentX, maxX));
        }

        if (this.currentY <= 100 || this.currentY >= maxY) {
            this.velocityY *= -1;
            this.currentY = Math.max(100, Math.min(this.currentY, maxY));
        }

        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = this.currentX + 'px';
        this.element.style.top = this.currentY + 'px';
    }
}

// Initialize floating profiles
const profiles = document.querySelectorAll('.profile-card');
const floatingProfiles = Array.from(profiles).map(profile => new FloatingProfile(profile));

// Animation loop
function animate() {
    floatingProfiles.forEach(profile => profile.float());
    requestAnimationFrame(animate);
}
animate();

// Navigation functions
function goBack() {
    window.location.href = '../index.html';
}

function goToGallery(personId) {
    // Get the current section from the page title
    const sectionTitle = document.querySelector('.section-title').textContent.toLowerCase();
    
    // Map section titles to folder names
    let sectionFolder = '';
    if (sectionTitle.includes('artist')) {
        sectionFolder = 'artists';
    } else if (sectionTitle.includes('developer')) {
        sectionFolder = 'developers';
    } else if (sectionTitle.includes('meme')) {
        sectionFolder = 'memes';
    } else if (sectionTitle.includes('creator')) {
        sectionFolder = 'creators';
    }
    
    window.location.href = `../galleries/${sectionFolder}/${personId}/${personId}.html`;
}

// Responsive handling
window.addEventListener('resize', () => {
    floatingProfiles.forEach(profile => {
        profile.currentX = Math.min(profile.currentX, window.innerWidth - profile.element.offsetWidth);
        profile.currentY = Math.min(profile.currentY, window.innerHeight - profile.element.offsetHeight);
        profile.updatePosition();
    });
});