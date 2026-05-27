document.addEventListener('DOMContentLoaded', () => {
    const displayName = document.getElementById('display-name');
    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('user-email');
    const phoneInput = document.getElementById('user-phone');
    const profileForm = document.getElementById('profile-form');
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const saveProfileBtn = document.getElementById('save-profile-btn');
    const profileUpload = document.getElementById('profile-upload');
    const uploadOverlay = document.getElementById('upload-overlay');
    const profileImg = document.getElementById('profile-img');
    const profileIcon = document.getElementById('profile-icon');

    const savedName = localStorage.getItem('profileName');
    const savedEmail = localStorage.getItem('profileEmail');
    const savedPhone = localStorage.getItem('profilePhone');
    const savedAvatar = localStorage.getItem('profileAvatar');

    const updateDisplayName = (value) => {
        if (value) {
            displayName.textContent = `Здравей, ${value.split(' ')[0]}!`;
        } else {
            displayName.textContent = 'Здравей!';
        }
    };

    const setEditingState = (isEditing) => {
        [nameInput, emailInput, phoneInput].forEach((input) => {
            input.disabled = !isEditing;
        });
        saveProfileBtn.style.display = isEditing ? 'block' : 'none';
        uploadOverlay.style.display = isEditing ? 'flex' : 'none';
        if (isEditing) {
            editProfileBtn.style.background = '#c9856b';
            editProfileBtn.style.color = 'white';
        } else {
            editProfileBtn.style.background = '#fff';
            editProfileBtn.style.color = '#4a3528';
        }
    };

    if (savedName) {
        updateDisplayName(savedName);
        nameInput.value = savedName;
    } else {
        updateDisplayName('');
    }
    if (savedEmail) emailInput.value = savedEmail;
    if (savedPhone) phoneInput.value = savedPhone;
    if (savedAvatar) {
        profileImg.src = savedAvatar;
        profileImg.style.display = 'block';
        profileIcon.style.display = 'none';
    }

    setEditingState(false);

    editProfileBtn.addEventListener('click', () => {
        const currentlyEditing = nameInput.disabled === false;
        if (!currentlyEditing) {
            setEditingState(true);
            nameInput.focus();
        } else {
            setEditingState(false);
        }
    });

    saveProfileBtn.addEventListener('click', () => {
        profileForm.dispatchEvent(new Event('submit'));
    });

    profileUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64Image = event.target.result;
                profileImg.src = base64Image;
                profileImg.style.display = 'block';
                profileIcon.style.display = 'none';
                localStorage.setItem('profileAvatar', base64Image);
            };
            reader.readAsDataURL(file);
        }
    });

    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newName = nameInput.value.trim();
        const newEmail = emailInput.value.trim();
        const newPhone = phoneInput.value.trim();

        if (!newName) {
            alert('Моля, въведете име, за да запазите промените.');
            return;
        }

        localStorage.setItem('profileName', newName);
        localStorage.setItem('profileEmail', newEmail);
        localStorage.setItem('profilePhone', newPhone);
        updateDisplayName(newName);
        setEditingState(false);
        alert('Промените са запазени успешно!');
    });

    const logoutBtn = document.querySelector('.logout');
    logoutBtn.addEventListener('click', () => {
        if (confirm('Сигурни ли сте, че искате да изчистите данните си и да излезете?')) {
            localStorage.clear();
            window.location.reload();
        }
    });
});