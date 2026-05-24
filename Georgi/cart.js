const KEY = 'cart';

const load = () => JSON.parse(localStorage.getItem(KEY) || '[]');
const save = c => localStorage.setItem(KEY, JSON.stringify(c));
const fmt = n => n.toFixed(2) + ' евро';

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

const esc = s => s.replace(/"/g, '&quot;');

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

    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const addr = esc(localStorage.getItem('cart_address') || '');
    const email = esc(localStorage.getItem('cart_email') || '');
    const phone = esc(localStorage.getItem('cart_phone') || '');

    summaryEl.innerHTML = `
        <div class="summary-box">
            <h3>Обобщение</h3>

            <div class="delivery-badge">
                <i class="fa-solid fa-truck"></i>
                <div>
                    <strong>Безплатна доставка</strong>
                    Получавате поръчката си до 1 седмица.
                </div>
            </div>

            <div class="field">
                <label for="addressInput">Адрес за доставка</label>
                <input id="addressInput" type="text" placeholder="ул., №, град"
                       value="${addr}"
                       oninput="localStorage.setItem('cart_address', this.value)">
            </div>

            <div class="field">
                <label for="emailInput">Имейл</label>
                <input id="emailInput" type="email" placeholder="вашият@имейл.bg"
                       value="${email}"
                       oninput="localStorage.setItem('cart_email', this.value)">
            </div>

            <div class="field">
                <label for="phoneInput">Телефон</label>
                <input id="phoneInput" type="tel" placeholder="+359 ..."
                       value="${phone}"
                       oninput="localStorage.setItem('cart_phone', this.value)">
            </div>

            <hr class="summary-divider">
            <div class="summary-total">
                <span>Общо</span>
                <span>${fmt(total)}</span>
            </div>
            <a href="#" class="primary-btn">Направи поръчка</a>
        </div>
    `;
}

document.getElementById('clearBtn').addEventListener('click', clear);
render();