
// Gift Card functionality
function generateId() {
    return Math.random().toString(36).substring(2, 15);
}

let giftCards = [];

document.getElementById('purchase-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const message = document.getElementById('message').value;
    const cardId = generateId();

    const giftCard = {
        id: cardId,
        amount: parseFloat(amount),
        message: message,
        isRedeemed: false
    };

    giftCards.push(giftCard);
    console.log('Gift card created:', giftCard); 

    document.getElementById('card-id').textContent = cardId;
    document.getElementById('card-amount').textContent = amount;
    document.getElementById('card-message').textContent = message;
    document.getElementById('purchase-result').classList.remove('hidden');
    this.reset();
});

document.getElementById('redeem-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const redeemId = document.getElementById('redeem-id').value;
    const cardToRedeem = giftCards.find(card => card.id === redeemId);
    if (cardToRedeem) {
        cardToRedeem.isRedeemed = true;
        alert(`Gift card ${redeemId} redeemed successfully!`);
    } else {
        alert(`Invalid gift card ID: ${redeemId}`);
    }
    this.reset();
});

document.getElementById('balance-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const cardId = document.getElementById('balance-id').value;
    console.log('Checking balance for card ID:', cardId);
    const card = giftCards.find(c => c.id === cardId);
    console.log('Found card:', card);
    const resultDiv = document.getElementById('balance-result');

    if (!card) {
        resultDiv.innerHTML = '<p class="error">Invalid gift card ID</p>';
        return;
    }

    resultDiv.innerHTML = `
        <div class="gift-card-details">
            <p>Balance: $${card.isRedeemed ? '0.00' : card.amount}</p>
            <p>Status: ${card.isRedeemed ? 'Redeemed' : 'Active'}</p>
            <p>Message: ${card.message}</p>
        </div>
    `;
    this.reset();
});
