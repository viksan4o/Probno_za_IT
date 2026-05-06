// Функция за смяна на табовете
function showTab(tabName) {
    // Скриване на всички табове
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Премахване на активен клас от бутоните
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Показване на избрания таб
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // Маркиране на бутона като активен
    event.currentTarget.classList.add('active');
}

// Форма за обновяване на профила
document.getElementById('profile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newName = document.getElementById('user-name').value;
    
    // Визуална обратна връзка
    document.getElementById('display-name').innerText = "Здравей, " + newName.split(' ')[0] + "!";
    
    alert('Промените бяха запазени успешно!');
});

// Бутон за изход
document.querySelector('.logout').addEventListener('click', function() {
    if(confirm('Сигурни ли сте, че искате да излезете?')) {
        window.location.href = 'index.html';
    }
});