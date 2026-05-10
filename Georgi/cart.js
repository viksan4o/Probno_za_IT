const KEY = 'cart';
const FREE_SHIP = 50;
const SHIP_FEE = 5;

const load = () => JSON.parse(localStorage.getItem(KEY) || '[]');
const save = c => localStorage.setItem(KEY, JSON.stringify(c));
const fmt = n => n.toFixed(2) + ' лв';

const itemsEl = document.getElementById('cartItems');
const summaryEl = document.getElementById('orderSummary');
const layoutEl = document.getElementById('cartLayout');
const emptyEl = document.getElementById('emptyState');
const toastEl = document.getElementById('toast');

function update(id, qty) {
    const cart = load();
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty = Math.max(1, qty);
    save(cart);
    render();
}

function remove(id) {
    save(load().filter(i => i.id !== id));
    render();
    toast('Премахнато от количката');
}

function clear() {
    if (!confirm('Сигурни ли сте, че искате да изчистите количката?')) return;
    save([]);
    render();
}

let toastTimer;
function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2000);
}

function render() {
    const cart = load();

    if (!cart.length) {
        layoutEl.style.display = 'none';
        emptyEl.style.display = 'block';
        return;
    }

    emptyEl.style.display = 'none';
    layoutEl.style.display = 'grid';

    itemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div>
                <div class="item-name">${item.name}</div>
                <div class="item-meta">${fmt(item.price)} / бр.</div>
            </div>
            <div class="qty-wrap">
                <button class="qty-btn" onclick="update(${item.id}, ${item.qty - 1})">−</button>
                <input class="qty-val" type="number" min="1" value="${item.qty}"
                       onchange="update(${item.id}, parseInt(this.value) || 1)">
                <button class="qty-btn" onclick="update(${item.id}, ${item.qty + 1})">+</button>
            </div>
            <div class="item-price">${fmt(item.price * item.qty)}</div>
            <button class="remove-btn" onclick="remove(${item.id})" title="Премахни">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
    `).join('');

    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const ship = subtotal >= FREE_SHIP ? 0 : SHIP_FEE;
    const total = subtotal + ship;

    summaryEl.innerHTML = `
        <div class="summary-box">
            <h3>Обобщение</h3>
            <div class="summary-row"><span>Междинна сума</span><span>${fmt(subtotal)}</span></div>
            <div class="summary-row">
                <span>Доставка</span>
                <span class="${ship === 0 ? 'free-tag' : ''}">${ship === 0 ? 'Безплатна' : fmt(ship)}</span>
            </div>
            <hr class="summary-divider">
            <div class="summary-total">
                <span>Общо</span>
                <span>${fmt(total)}</span>
            </div>
            ${ship > 0
                ? `<p class="delivery-note">Добавете <span>${fmt(FREE_SHIP - subtotal)}</span> за безплатна доставка</p>`
                : `<p class="delivery-note"><span>✓ Безплатна доставка</span></p>`}
            <a href="#" class="primary-btn">Към плащане</a>
        </div>
    `;
}

document.getElementById('clearBtn').addEventListener('click', clear);
render();
