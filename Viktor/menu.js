const products = [
    { id: 1, name: "Шоколадова торта", category: "torti", type: "sladko", price: 28,
      description: "Класическа торта с белгийски шоколад.",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=85&auto=format&fit=crop" },
    { id: 2, name: "Чийзкейк с горски плодове", category: "torti", type: "sladko", price: 9,
      description: "Свеж чийзкейк с домашен сос от горски плодове.",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=85&auto=format&fit=crop" },
    { id: 3, name: "Веган брауни", category: "deserti", type: "vegan", price: 7,
      description: "Богато брауни без животински продукти.",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=85&auto=format&fit=crop" },
    { id: 4, name: "Тарт с лимон", category: "deserti", type: "sladko", price: 8,
      description: "Хрупкава кора с лимонов крем.",
      image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&q=85&auto=format&fit=crop" },
    { id: 5, name: "Капучино", category: "napitki", type: "sladko", price: 4,
      description: "Прясно изпечени зърна и млечна пяна.",
      image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=85&auto=format&fit=crop" },
    { id: 6, name: "Лимонада с мента", category: "napitki", type: "vegan", price: 5,
      description: "Свежа домашна лимонада с прясна мента.",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=85&auto=format&fit=crop" },
    { id: 7, name: "Еклер с ванилия", category: "deserti", type: "sladko", price: 5,
      description: "Класически еклер с ванилов крем и шоколадова глазура.",
      image: "https://images.unsplash.com/photo-1612203985729-70726954388c?w=600&q=85&auto=format&fit=crop" },
    { id: 8, name: "Веган чийзкейк", category: "torti", type: "vegan", price: 10,
      description: "Кашуо-кокосова основа с пресни плодове.",
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=85&auto=format&fit=crop" },
    { id: 9, name: "Горещ шоколад", category: "napitki", type: "sladko", price: 6,
      description: "Гъст горещ шоколад с разтопен белгийски шоколад.",
      image: "https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=600&q=85&auto=format&fit=crop" }
];
const typeLabels = { sladko: "Сладко", vegan: "Веган" };
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
                    <span class="price">${p.price.toFixed(2)} лв</span>
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