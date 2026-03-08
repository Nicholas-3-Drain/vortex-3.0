const mobileMenu = document.querySelector('#mobileMenu');
const navCenter = document.querySelector('#navCenter');
const searchIcon = document.querySelector('#searchIcon');
const searchInput = document.querySelector('#searchInput');

mobileMenu.addEventListener('click', () => {
    navCenter.classList.toggle('active');
});

searchIcon.addEventListener('click', () => {
    searchInput.classList.toggle('active');
    if (searchInput.classList.contains('active')) {
        searchInput.focus();
    }
});

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

let cartTotal = 0;

function handlePurchase(btn) {
    const card = btn.closest('.product-card');
    
    if (typeof card.dataset.cartCount === 'undefined') {
        card.dataset.cartCount = 0;
    }

    btn.style.display = 'none';

    const actionContainer = document.createElement('div');
    actionContainer.className = 'buy-actions';

    const confirmBtn = document.createElement('button');
    confirmBtn.innerText = 'Add';
    confirmBtn.className = 'action-btn confirm-btn';

    const cancelBtn = document.createElement('button');
    cancelBtn.innerText = 'Cancel';
    cancelBtn.className = 'action-btn cancel-btn';

    confirmBtn.onclick = () => {
        cartTotal++;
        card.dataset.cartCount = parseInt(card.dataset.cartCount) + 1;
        updateCartDisplay();
    };

    cancelBtn.onclick = () => {
        if (cartTotal > 0 && parseInt(card.dataset.cartCount) > 0) {
            cartTotal--;
            card.dataset.cartCount = parseInt(card.dataset.cartCount) - 1;
        }
        updateCartDisplay();
        
        if (parseInt(card.dataset.cartCount) === 0) {
            resetToBuy(btn, actionContainer);
        }
    };

    actionContainer.appendChild(confirmBtn);
    actionContainer.appendChild(cancelBtn);
    card.appendChild(actionContainer);
}

function resetToBuy(btn, container) {
    btn.style.display = 'block';
    container.remove();
}

function updateCartDisplay() {
    document.getElementById('cartCount').innerText = cartTotal;
    document.getElementById('cartCountDesktop').innerText = cartTotal;
}