​
// Gift Card functionality
let giftCards = [];

// Save gift cards to local storage
function saveGiftCards() {
    localStorage.setItem('giftCards', JSON.stringify(giftCards));
}

// Load gift cards from local storage
function loadGiftCards() {
    const storedCards = localStorage.getItem('giftCards');
    if (storedCards) {
        giftCards = JSON.parse(storedCards);
    }
}

// Load gift cards when the script runs
loadGiftCards();

function generateId() {
    return Math.random().toString(36).substring(2, 15);
}

// Gift Card Purchase
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
    saveGiftCards(); // Add this line to save the updated gift cards

    // Display purchase result
    document.getElementById('card-id').textContent = cardId;
    document.getElementById('card-amount').textContent = amount;
    document.getElementById('card-message').textContent = message;
    document.getElementById('purchase-result').classList.remove('hidden');
    this.reset();
});

// Gift Card Redemption
document.getElementById('redeem-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const cardId = document.getElementById('redeem-id').value;
    const card = giftCards.find(c => c.id === cardId);

    if (!card) {
        alert('Invalid gift card ID');
        return;
    }

    if (card.isRedeemed) {
        alert('This gift card has already been redeemed');
        return;
    }

    card.isRedeemed = true;
    saveGiftCards(); // Add this line to save the updated gift cards
    alert(`Successfully redeemed gift card worth $${card.amount}`);
    this.reset();
});

document.getElementById('balance-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const balanceId = document.getElementById('balance-id').value;
    const balance = Math.floor(Math.random() * 100) + 1; // Simulating balance check
    document.getElementById('balance-result').textContent = `Balance for gift card ${balanceId}: $${balance}`;
});

// Review functionality
let reviews = [
    { id: 1, rating: 5, comment: "Great coffee!", date: new Date('2023-05-01') },
    { id: 2, rating: 4, comment: "Nice atmosphere.", date: new Date('2023-05-05') },
    { id: 3, rating: 3, comment: "Average experience.", date: new Date('2023-05-10') }
];

function displayReviews() {
    const reviewList = document.getElementById('review-list');
    reviewList.innerHTML = '';
    const filter = document.getElementById('filter').value;
    const sort = document.getElementById('sort').value;

    let filteredReviews = reviews;
    if (filter !== 'all') {
        filteredReviews = reviews.filter(review => review.rating == filter);
    }

    filteredReviews.sort((a, b) => {
        if (sort === 'newest') return b.date - a.date;
        if (sort === 'oldest') return a.date - b.date;
        if (sort === 'highest') return b.rating - a.rating;
        if (sort === 'lowest') return a.rating - b.rating;
    });

    filteredReviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.innerHTML = `
            <p>Rating: ${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</p>
            <p>${review.comment}</p>
            <p>Date: ${review.date.toLocaleDateString()}</p>
            <hr>
        `;
        reviewList.appendChild(reviewElement);
    });
}

document.getElementById('filter').addEventListener('change', displayReviews);
document.getElementById('sort').addEventListener('change', displayReviews);

document.getElementById('review-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;
    const newReview = {
        id: reviews.length + 1,
        rating: parseInt(rating),
        comment: comment,
        date: new Date()
    };
    reviews.push(newReview);
    displayReviews();
    this.reset();
});

// Initial display of reviews
displayReviews();
