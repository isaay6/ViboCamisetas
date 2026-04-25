const WHATSAPP_NUMBER = "34605026578";
const gallery = document.getElementById('gallery');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const backToTop = document.getElementById('backToTop');

function toggleSidebar() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function filterCategory(cat) {
    // Render
    renderProducts(cat);
    
    // UI Update links
    document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('onclick') === `filterCategory('${cat}')`) l.classList.add('active');
    });

    // Close menu
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    
    // Top
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function createCard(p) {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.onclick = () => openProduct(p);
    div.innerHTML = `
        <img src="${p.image}" loading="lazy">
        <div class="product-info">${p.category}</div>
    `;
    return div;
}

function renderProducts(filter = 'all') {
    gallery.innerHTML = '';
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    
    // Initial 100 to be fast
    filtered.slice(0, 100).forEach(p => gallery.appendChild(createCard(p)));
    
    // Load more on scroll or button could be here, but for now let's show 100
}

function openProduct(p) {
    document.getElementById('modalImg').src = p.image;
    document.getElementById('modalInfo').innerText = `Sección: ${p.category}`;
    const msg = encodeURIComponent(`¡Hola! Estoy interesado en esta camiseta de la sección ${p.category}: ${p.image}`);
    document.getElementById('modalWa').href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    document.getElementById('productModal').style.display = 'flex';
}

function closeModal() { document.getElementById('productModal').style.display = 'none'; }

function openPreciosModal() { document.getElementById('preciosModal').style.display = 'flex'; }
function closePreciosModal() { document.getElementById('preciosModal').style.display = 'none'; }

function openTallasModal() {
    const g = document.getElementById('tallasGallery');
    if (g.innerHTML === '') {
        const imgs = ['MEDIDAS/046f47a5.png', 'MEDIDAS/11bb34a0.png', 'MEDIDAS/40adcec2.jpg', 'MEDIDAS/56048784.jpg', 'MEDIDAS/9b465fb5.png', 'MEDIDAS/9e1408ff.png', 'MEDIDAS/d81399a0.png', 'MEDIDAS/f5a22778.jpg', 'MEDIDAS/fc52fcc7.jpg'];
        imgs.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            g.appendChild(img);
        });
    }
    document.getElementById('tallasModal').style.display = 'flex';
}
function closeTallasModal() { document.getElementById('tallasModal').style.display = 'none'; }

// Scroll Logic
window.onscroll = () => {
    if (window.scrollY > 400) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
};

// Activity Notify
const msgs = ["Alguien en Madrid pregunta por Retro", "Un cliente mira la Guía de Tallas", "Interés en Chándales desde Valencia", "Viendo novedades en Sevilla"];
function notify() {
    const n = document.getElementById('activityNotify');
    if (!n) return;
    n.innerText = msgs[Math.floor(Math.random() * msgs.length)];
    n.classList.add('show');
    setTimeout(() => n.classList.remove('show'), 4000);
}
setInterval(notify, 12000);

// Start
window.onload = () => renderProducts();
