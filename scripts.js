const WHATSAPP_NUMBER = "34605026578";
const gallery = document.getElementById('gallery');
const tallasModal = document.getElementById('tallasModal');
const preciosModal = document.getElementById('preciosModal');
const tallasGallery = document.getElementById('tallasGallery');
const modal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const modalCategory = document.getElementById('modalCategory');
const whatsappLink = document.getElementById('whatsappLink');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

let currentFilter = 'all';

function toggleSidebar() {
    sidebar.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => openModal(product);
    
    card.innerHTML = `
        <div class="product-image-container shimmer">
            <img src="${product.image}" alt="${product.category}" loading="lazy" onload="this.parentElement.classList.remove('shimmer')">
        </div>
        <div class="product-info">
            <p class="product-category">${product.category}</p>
        </div>
    `;
    return card;
}

function renderProducts(filter = 'all') {
    gallery.innerHTML = '';
    
    let filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);

    const toRender = filteredProducts.slice(0, 200); 

    toRender.forEach(product => {
        gallery.appendChild(createProductCard(product));
    });

    if (filteredProducts.length > 200) {
        addLoadMore(filteredProducts, 200);
    }
}

function renderMore(allProducts, startIndex) {
    const toRender = allProducts.slice(startIndex, startIndex + 200);
    toRender.forEach(product => {
        gallery.appendChild(createProductCard(product));
    });

    if (allProducts.length > startIndex + 200) {
        addLoadMore(allProducts, startIndex + 200);
    }
}

function addLoadMore(allProducts, nextIndex) {
    const loadMore = document.createElement('button');
    loadMore.className = 'side-btn'; // Use sidebar button style
    loadMore.style.gridColumn = '1 / -1';
    loadMore.style.margin = '2rem auto';
    loadMore.style.textAlign = 'center';
    loadMore.innerText = 'Cargar más camisetas...';
    loadMore.onclick = () => {
        loadMore.remove();
        renderMore(allProducts, nextIndex);
    };
    gallery.appendChild(loadMore);
}

function filterCategory(category) {
    currentFilter = category;
    
    // Update active button in sidebar
    document.querySelectorAll('.side-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick') === `filterCategory('${category}')`) {
            btn.classList.add('active');
        }
    });

    renderProducts(category);
    
    // Close sidebar on mobile/desktop after selection
    if (sidebar.classList.contains('active')) {
        toggleSidebar();
    }
    
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function openModal(product) {
    modalImage.src = product.image;
    modalCategory.innerText = `Sección: ${product.category}`;
    
    const message = encodeURIComponent(`Hola ViboCamisetas! Estoy interesado en este artículo de la sección: ${product.category}. ¿Está disponible?`);
    whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; 
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openTallasModal() {
    if (tallasGallery.innerHTML === '') {
        const tallaImages = [
            'MEDIDAS/046f47a5.png', 'MEDIDAS/11bb34a0.png', 'MEDIDAS/40adcec2.jpg',
            'MEDIDAS/56048784.jpg', 'MEDIDAS/9b465fb5.png', 'MEDIDAS/9e1408ff.png',
            'MEDIDAS/d81399a0.png', 'MEDIDAS/f5a22778.jpg', 'MEDIDAS/fc52fcc7.jpg'
        ];
        tallaImages.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            tallasGallery.appendChild(img);
        });
    }
    tallasModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeTallasModal() {
    tallasModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openPreciosModal() {
    preciosModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closePreciosModal() {
    preciosModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(q => {
    q.onclick = () => {
        const item = q.parentElement;
        item.classList.toggle('active');
    };
});

// Activity Notifications
const notifications = [
    "Alguien en Madrid acaba de preguntar por la colección Retro.",
    "Un cliente de Barcelona está consultando la Guía de Tallas.",
    "¡Nuevo interés! Pregunta desde Valencia por los Chándales.",
    "Un usuario de Sevilla está mirando las novedades de LaLiga.",
    "Alguien en Bilbao ha consultado disponibilidad para Parkas.",
    "¡Mucha actividad! Alguien de Málaga está revisando los Conjuntos."
];

function showNotification() {
    const notifyDiv = document.getElementById('activityNotify');
    const notifyText = document.getElementById('notifyText');
    if (!notifyDiv) return;
    
    const randomMsg = notifications[Math.floor(Math.random() * notifications.length)];
    notifyText.innerText = randomMsg;
    notifyDiv.classList.add('show');
    
    setTimeout(() => {
        notifyDiv.classList.remove('show');
    }, 5000);
}

setInterval(showNotification, 15000);
setTimeout(showNotification, 3000);

// Global click handler for modals
window.onclick = (event) => {
    if (event.target == modal) closeModal();
    if (event.target == tallasModal) closeTallasModal();
    if (event.target == preciosModal) closePreciosModal();
};

// Back to Top visibility
const backToTopBtn = document.getElementById('backToTop');
window.onscroll = () => {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
};

// Initial Render
window.onload = () => {
    renderProducts();
};
