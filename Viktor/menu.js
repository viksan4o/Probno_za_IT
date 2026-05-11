const products = [
    { id: 1, name: "Тирамису", category: "klasicheski", type: "mlechno", price: 8,
      description: "Ръчно приготвен по семейна рецепта от 2010-та с италианско маскарпоне, прясно сварено еспресо и какао.",
      image: "https://upload.wikimedia.org/wikipedia/commons/5/58/Tiramisu_-_Raffaele_Diomede.jpg" },
    { id: 2, name: "Крем брюле", category: "klasicheski", type: "mlechno", price: 9,
      description: "Кадифен ванилов крем от прясно мляко на местна ферма, с карамелизирана захарна коричка.",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/17/2014_0531_Cr%C3%A8me_br%C3%BBl%C3%A9e_Doi_Mae_Salong_%28cropped%29.jpg" },
    { id: 3, name: "Еклер с ванилия", category: "klasicheski", type: "mlechno", price: 5,
      description: "Печен на ръка чу-пуф с домашен ванилов крем и тъмношоколадова глазура.",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Two_Safeway_Chocolate_Eclairs_%2819043880936%29.jpg" },
    { id: 4, name: "Тарт с лимон", category: "klasicheski", type: "mlechno", price: 8,
      description: "Хрупкава маслена кора с крем от пресни лимони и щипка ванилия.",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Lemon_tart_-_star5112.jpg" },
    { id: 5, name: "Профитероли", category: "klasicheski", type: "mlechno", price: 10,
      description: "Малки чу-пуф топчета пълнени с домашен крем шантили и поляти с топъл белгийски шоколад.",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/75/Paris_2e_-_Rue_Vivienne_-_Restaurant_Le_Vaudeville_-_Profiteroles_au_chocolat.jpg" },
    { id: 6, name: "Макарони асорти", category: "moderni", type: "mlechno", price: 12,
      description: "Шест ръчно изпечени френски макарона – ванилия, малина, шамфъстък, шоколад, лимон и карамел.",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/11/VanillaMacaron.jpg" },
    { id: 7, name: "Шоколадов мус с малини", category: "moderni", type: "mlechno", price: 9,
      description: "Лек мус от 70% черен шоколад със свежи български малини и какаов крамбъл.",
      image: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Cocola_Bakery_Baccara_raspberry_dark_chocolate_mousse_%2837865131355%29.jpg" },
    { id: 8, name: "Веган брауни с тахан", category: "moderni", type: "vegan", price: 7,
      description: "Богато какаово брауни с тахан, фурми и стопен черен шоколад – без животински продукти.",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Vegan_Chocolate_Dream_Brownies.jpg" },
    { id: 9, name: "Чия пудинг с манго", category: "moderni", type: "vegan", price: 6,
      description: "Кокосов чия пудинг с пюре от прясно манго и гранола топинг – без рафинирана захар.",
      image: "https://images.pexels.com/photos/6544226/pexels-photo-6544226.jpeg" }
];
const BGN_PER_EUR = 1.95583;
const typeLabels = { mlechno: "С мляко", vegan: "Веган" };
const catSelect = document.getElementById('catSelect');
const typeSelect = document.getElementById('typeSelect');
const searchBox = document.getElementById('searchBox');
const grid = document.getElementById('menuGrid');
const emptyState = document.getElementById('emptyState');
function render() {
    const cat = catSelect.value;
    const type = typeSelect.value;
    const search = searchBox.value.trim().toLowerCase();
    const filtered = products.filter(p =>
        (cat === 'all' || p.category === cat) &&
        (type === 'all' || p.type === type) &&
        p.name.toLowerCase().includes(search)
    );
    emptyState.style.display = filtered.length ? 'none' : 'block';
    grid.innerHTML = filtered.map(p => `
        <article class="card">
            <img src="${p.image}" alt="${p.name}">
            <div class="card-body">
                <span class="tag">${typeLabels[p.type] || p.type}</span>
                <h3>${p.name}</h3>
                <p>${p.description}</p>
                <div class="card-foot">
                    <span class="price">${p.price.toFixed(2)} лв / ${(p.price / BGN_PER_EUR).toFixed(2)} €</span>
                    <button class="buy-btn" data-id="${p.id}">Добави</button>
                </div>
            </div>
        </article>
    `).join('');
}
grid.addEventListener('click', e => {
    const btn = e.target.closest('.buy-btn');
    if (!btn) return;
    const id = +btn.dataset.id;
    const product = products.find(p => p.id === id);
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item.id === id);
    if (existing) existing.qty += 1;
    else cart.push({ id, name: product.name, price: product.price, image: product.image, qty: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    btn.textContent = 'Добавено ✓';
    setTimeout(() => btn.textContent = 'Добави', 1000);
});
[catSelect, typeSelect, searchBox].forEach(el =>
    el.addEventListener('input', render));
render();
const topBtn = document.getElementById('to-top');
window.addEventListener('scroll', () =>
    topBtn.classList.toggle('show', window.scrollY > 300));
topBtn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' }));