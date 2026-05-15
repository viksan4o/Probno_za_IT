const products = [
    { id: 1, name: "Тирамису", category: "klasicheski", type: "mlechno", price: 7.90,
      description: "Маскарпоне, прясно еспресо и какао – върху савоярди, накиснати в марсала.",
      image: "https://images.unsplash.com/photo-1639744211487-b27e3551b07c?w=800&auto=format&fit=crop" },
    { id: 2, name: "Крем брюле", category: "klasicheski", type: "mlechno", price: 7.50,
      description: "Кадифен ванилов крем с хрупкава карамелизирана коричка, поднесен с пресни плодове.",
      image: "https://images.unsplash.com/photo-1676300184943-09b2a08319a3?w=800&auto=format&fit=crop" },
    { id: 3, name: "Афогато", category: "klasicheski", type: "mlechno", price: 6.50,
      description: "Топка ванилов сладолед, полят с горещо еспресо – проста, но изящна италианска класика.",
      image: "https://images.unsplash.com/photo-1594631661960-34762327295a?w=800&auto=format&fit=crop" },
    { id: 4, name: "Шоколадов фондан", category: "klasicheski", type: "mlechno", price: 8.50,
      description: "Печен в момента кейк с топящо се сърце от 70% белгийски шоколад и топка сладолед.",
      image: "https://images.unsplash.com/photo-1673551490812-eaee2e9bf0ef?w=800&auto=format&fit=crop" },
    { id: 5, name: "Ябълков тарт", category: "klasicheski", type: "mlechno", price: 7.20,
      description: "Карамелизирани ябълки върху хрупкаво маслено тесто, поднесен със сладолед.",
      image: "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=800&auto=format&fit=crop" },
    { id: 6, name: "Чийзкейк с малини", category: "moderni", type: "mlechno", price: 7.50,
      description: "Гладък крем от Филаделфия върху бисквитена основа, с компот от пресни малини.",
      image: "https://images.unsplash.com/photo-1578775887804-699de7086ff9?w=800&auto=format&fit=crop" },
    { id: 7, name: "Лимонова целувка", category: "moderni", type: "mlechno", price: 6.90,
      description: "Маслена кора, крем от прясно изцеден лимон и обгорена италианска целувка отгоре.",
      image: "https://images.unsplash.com/photo-1681329142517-6daaa56d3670?w=800&auto=format&fit=crop" },
    { id: 8, name: "Наполеон", category: "moderni", type: "mlechno", price: 7.50,
      description: "Три хрупкави листа маслено тесто между слоеве лек ванилов крем и пудра захар.",
      image: "https://images.unsplash.com/photo-1593424718424-cf4d83f3def1?w=800&auto=format&fit=crop" },
    { id: 9, name: "Брауни с ванилов сладолед", category: "moderni", type: "mlechno", price: 7.50,
      description: "Топло шоколадово брауни с печени орехи, топка ванилов сладолед и карамел.",
      image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&auto=format&fit=crop" },
    { id: 10, name: "Трио сорбе „Камист“", category: "avtorski", type: "vegan", price: 6.50,
      description: "Три домашни сорбета – манго, малина и лимон-базилик. Освежаващ финал.",
      image: "https://images.unsplash.com/photo-1650553448920-9432f8086905?w=800&auto=format&fit=crop" },
    { id: 11, name: "Шамфъстъков мус с малини", category: "avtorski", type: "mlechno", price: 8.50,
      description: "Лек мус от шамфъстък със сърце от малинов кули и хрупкав бадемов крокант.",
      image: "https://images.unsplash.com/photo-1702745284678-2ae974a7f0aa?w=800&auto=format&fit=crop" },
    { id: 12, name: "Малинов тарт (веган)", category: "avtorski", type: "vegan", price: 7.50,
      description: "Бадемова основа с крем от кашу и ванилия, покрита с пресни малини.",
      image: "https://images.unsplash.com/photo-1618931443365-f914d6192a52?w=800&auto=format&fit=crop" }
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