Js 
sara
​
You
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
    return 'GC-' + Math.random().toString(36).substr(2, 9).toUpperCase();
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
    saveGiftCards();

    // Display purchase result
    document.getElementById('card-id').textContent = cardId;
    document.getElementById('card-amount').textContent = amount;
    document.getElementById('card-message').textContent = message;
    document.getElementById('purchase-result').classList.remove('hidden');
    this.reset();
});

// Proceed to Payment
document.getElementById('proceed-to-payment').addEventListener('click', function() {
    alert('Redirecting to payment gateway...');
    document.getElementById('purchase-result').classList.add('hidden');
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
    saveGiftCards();
    alert(`Successfully redeemed gift card worth $${card.amount}`);
    this.reset();
});

// Check Balance
document.getElementById('balance-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const cardId = document.getElementById('balance-id').value;
    const card = giftCards.find(c => c.id === cardId);
    const resultDiv = document.getElementById('balance-result');

    if (!card) {
        resultDiv.innerHTML = '<p class="error">Invalid gift card ID</p>';
        return;
    }

    resultDiv.innerHTML = `
        <div class="gift-card-details">
            <p>Balance: $${card.isRedeemed ? '0.00' : card.amount.toFixed(2)}</p>
            <p>Status: ${card.isRedeemed ? 'Redeemed' : 'Active'}</p>
            <p>Message: ${card.message}</p>
        </div>
    `;
    this.reset();
});

// Review functionality
let reviews = [
    { id: 1, rating: 5, comment: "Great coffee!", date: new Date('2023-05-01') },
    { id: 2, rating: 4, comment: "Nice atmosphere.", date: new Date('2023-05-05') },
    { id: 3, rating: 3, comment: "Average experience.", date: new Date('2023-05-10') }
];

// Star Rating System
const starRating = document.querySelector('.star-rating');
const stars = starRating.querySelectorAll('i');
const selectedRating = document.getElementById('selected-rating');

stars.forEach(star => {
    star.addEventListener('mouseover', function() {
        const rating = this.dataset.rating;
        updateStars(rating);
    });

    star.addEventListener('click', function() {
        const rating = this.dataset.rating;
        selectedRating.value = rating;
        updateStars(rating);
    });
});

starRating.addEventListener('mouseleave', function() {
    updateStars(selectedRating.value);
});

function updateStars(rating) {
    stars.forEach(star => {
        const starRating = star.dataset.rating;
        star.classList.toggle('active', starRating <= rating);
    });
}

// Submit Review
document.getElementById('review-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const rating = selectedRating.value;
    const comment = document.getElementById('review-text').value;

    if (!rating) {
        alert('Please select a rating');
        return;
    }

    const review = {
        id: reviews.length + 1,
        rating: parseInt(rating),
        comment: comment,
        date: new Date()
    };

    reviews.push(review);
    displayReviews();
    this.reset();
    selectedRating.value = '';
    updateStars(0);
});

// Display Reviews
function displayReviews() {
    const container = document.getElementById('reviews-list');
    const ratingFilter = document.getElementById('rating-filter').value;
    const sortFilter = document.getElementById('sort-filter').value;

    let filteredReviews = [...reviews];

    // Apply rating filter
    if (ratingFilter !== 'all') {
        filteredReviews = filteredReviews.filter(review => 
            review.rating === parseInt(ratingFilter)
        );
    }

    // Apply sorting
    filteredReviews.sort((a, b) => {
        switch(sortFilter) {
            case 'newest':
                return b.date - a.date;
            case 'oldest':
                return a.date - b.date;
            case 'highest':
                return b.rating - a.rating;
            case 'lowest':
                return a.rating - b.rating;
            default:
                return 0;
        }
    });

    container.innerHTML = filteredReviews.map(review => `
        <div class="review-item">
            <div class="review-stars">
                ${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}
            </div>
            <p>${review.comment}</p>
            <p class="review-date">${review.date.toLocaleDateString()}</p>
        </div>
    `).join('');
}

// Event listeners for filters
document.getElementById('rating-filter').addEventListener('change', displayReviews);
document.getElementById('sort-filter').addEventListener('change', displayReviews);

// Initial display of reviews
displayReviews();

// Navigation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(targetId).classList.remove('hidden');
        document.querySelectorAll('nav a').forEach(navLink => {
            navLink.classList.remove('active');
        });
        this.classList.add('active');
    });
});
