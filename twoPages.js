
let giftCards = [];

document.getElementById('purchase-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const message = document.getElementById('message').value;
    const id = Math.random().toString(36).substr(2, 9);

    const giftCard = { id, amount, message };
    giftCards.push(giftCard);

    document.getElementById('confirm-id').textContent = `Gift Card ID: ${id}`;
    document.getElementById('confirm-amount').textContent = `Amount: $${amount}`;
    document.getElementById('confirm-message').textContent = `Message: ${message}`;
    document.getElementById('confirmation').style.display = 'block';
});

document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('confirmation').style.display = 'none';
});

document.getElementById('checkout').addEventListener('click', function() {
    alert('Proceeding to checkout...');
    document.getElementById('confirmation').style.display = 'none';
});

document.getElementById('redeem-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const redeemId = document.getElementById('redeem-id').value;
    const giftCard = giftCards.find(card => card.id === redeemId);

    if (giftCard) {
        alert(`Redeemed gift card: ID ${giftCard.id}, Amount: $${giftCard.amount}, Message: ${giftCard.message}`);
        giftCards = giftCards.filter(card => card.id !== redeemId);
    } else {
        alert('Invalid gift card ID');
    }
});

document.getElementById('check-balance-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const checkId = document.getElementById('check-id').value;
    const giftCard = giftCards.find(card => card.id === checkId);

    if (giftCard) {
        alert(`Gift card balance: ID ${giftCard.id}, Amount: $${giftCard.amount}, Message: ${giftCard.message}`);
    } else {
        alert('Invalid gift card ID');
    }
});