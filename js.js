const item = { id: 'croissant', name: 'Butter Croissant', price: 3.50, category: 'Viennoiserie' };
const cart = JSON.parse(localStorage.getItem('lafarine_cart') || '[]');
const existing = cart.find(i => i.id === item.id);
existing ? existing.qty++ : cart.push({ ...item, qty: 1 });
localStorage.setItem('lafarine_cart', JSON.stringify(cart));