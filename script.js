// Header scroll efekti
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
        header.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent)';
    }
});

// Global değişkenler
const movieCards = document.querySelectorAll('.movie-card');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// Film kartları için hover efekti
movieCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05) translateY(-10px)';
        card.style.zIndex = '1';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1) translateY(0)';
        card.style.zIndex = '0';
    });
});

// Arama Fonksiyonu
function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let foundMovies = false;
    const movieRows = document.querySelectorAll('.movie-row');

    movieCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const genre = card.querySelector('.genre')?.textContent.toLowerCase() || '';
        const year = card.querySelector('.year')?.textContent.toLowerCase() || '';

        if (searchTerm === '' || title.includes(searchTerm) || genre.includes(searchTerm) || year.includes(searchTerm)) {
            card.style.display = 'block';
            foundMovies = true;
        } else {
            card.style.display = 'none';
        }
    });

    // Sonuç bulunamadıysa kullanıcıya bildir
    const existingMessage = document.querySelector('.no-results-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    if (!foundMovies && searchTerm !== '') {
        const message = document.createElement('div');
        message.className = 'no-results-message';
        message.style.textAlign = 'center';
        message.style.padding = '2rem';
        message.style.color = '#fff';
        message.style.fontSize = '1.2rem';
        message.innerHTML = `"${searchTerm}" ile ilgili sonuç bulunamadı.`;
        
        if (movieRows.length > 0) {
            movieRows[0].parentNode.insertBefore(message, movieRows[0]);
        }
    }

    // Film satırlarının görünürlüğünü kontrol et
    movieRows.forEach(row => {
        const visibleCards = row.querySelectorAll('.movie-card[style="display: block"]');
        row.style.display = visibleCards.length > 0 ? 'block' : 'none';
    });
}

// Enter tuşu ile arama
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Arama butonu ile arama
searchButton.addEventListener('click', performSearch);

// Arama input'u değiştiğinde ara
searchInput.addEventListener('input', performSearch);

// Profil menüsü için tıklama olayı
document.querySelector('.profile').addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('active');
    const menu = this.querySelector('.dropdown-menu');
    menu.style.opacity = menu.style.opacity === '1' ? '0' : '1';
    menu.style.visibility = menu.style.visibility === 'visible' ? 'hidden' : 'visible';
});

// Sayfa herhangi bir yerine tıklandığında menüyü kapat
document.addEventListener('click', function() {
    const profileMenu = document.querySelector('.profile');
    profileMenu.classList.remove('active');
    const menu = profileMenu.querySelector('.dropdown-menu');
    menu.style.opacity = '0';
    menu.style.visibility = 'hidden';
});

// Kategoriler menüsü için hover efekti
const categoryDropdown = document.querySelector('.nav-links .dropdown');
categoryDropdown.addEventListener('mouseenter', function() {
    this.querySelector('.dropdown-menu').style.opacity = '1';
    this.querySelector('.dropdown-menu').style.visibility = 'visible';
});

categoryDropdown.addEventListener('mouseleave', function() {
    this.querySelector('.dropdown-menu').style.opacity = '0';
    this.querySelector('.dropdown-menu').style.visibility = 'hidden';
});

// Film slider'ı için kaydırma kontrolü
const sliders = document.querySelectorAll('.movie-slider');

sliders.forEach(slider => {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
});

// Hero Slider Fonksiyonları
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    // Aktif slide'ı kaldır
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Yeni slide'ı göster
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Ok tuşları için event listener'lar
document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);

// Noktalara tıklama
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Otomatik slide değişimi
let slideInterval = setInterval(nextSlide, 5000);

// Mouse hover durumunda otomatik değişimi durdur
const slider = document.querySelector('.hero-slider');
slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

// Klavye kontrolleri
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
}); 