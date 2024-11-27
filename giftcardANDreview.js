
// Gift Card functionality
document.getElementById('purchase-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const message = document.getElementById('message').value;
    alert(`Gift card purchased for $${amount} with message: ${message}`);
    this.reset();
});

document.getElementById('redeem-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const redeemId = document.getElementById('redeem-id').value;
    alert(`Gift card ${redeemId} redeemed successfully!`);
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