const API_URL = 'http://localhost:8080/api';
let currentUser = null;
let currentMatches = []; 
let usersMap = {}; 

// --- Setup Navigation ---
document.getElementById('nav-dashboard').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('nav-dashboard').classList.add('active');
    document.getElementById('nav-exchanges').classList.remove('active');
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('exchanges').classList.add('hidden');
    if (currentUser) loadMatches();
});

document.getElementById('nav-exchanges').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('nav-dashboard').classList.remove('active');
    document.getElementById('nav-exchanges').classList.add('active');
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('exchanges').classList.remove('hidden');
    if (currentUser) loadExchanges();
});

// --- Toggle Login / Register Views ---
document.getElementById('show-login').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('onboarding').classList.add('hidden');
    document.getElementById('login-section').classList.remove('hidden');
});

document.getElementById('show-register').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('onboarding').classList.remove('hidden');
});

// --- User Login ---
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('login-name').value;
    
    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name })
        });
        
        const data = await response.text();
        if(response.ok && data) {
            currentUser = JSON.parse(data);
            document.getElementById('current-user-name').textContent = currentUser.name;
            document.getElementById('login-section').classList.add('hidden');
            document.getElementById('dashboard').classList.remove('hidden');
            loadMatches();
        } else {
            alert('User not found. Please register.');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Failed to connect to backend.');
    }
});

// --- User Registration ---
document.getElementById('profile-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value;
    const teach = document.getElementById('teach').value;
    const learn = document.getElementById('learn').value;
    
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, location, skillToTeach: teach, skillToLearn: learn })
        });
        if(response.ok) {
            currentUser = await response.json();
            document.getElementById('current-user-name').textContent = currentUser.name;
            document.getElementById('onboarding').classList.add('hidden');
            document.getElementById('dashboard').classList.remove('hidden');
            loadMatches();
        }
    } catch (error) {
        console.error('Error creating user:', error);
        alert('Failed to connect to backend. Make sure Spring Boot is running.');
    }
});

// --- Fetch User Info Helpers ---
async function fetchUserById(id) {
    if (usersMap[id]) return usersMap[id];
    const res = await fetch(`${API_URL}/users/${id}`);
    const user = await res.json();
    usersMap[id] = user;
    return user;
}

async function fetchUserRating(userId) {
    try {
        const res = await fetch(`${API_URL}/reviews/reviewee/${userId}`);
        const reviews = await res.json();
        if (reviews.length === 0) return "New";
        const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
        return avg.toFixed(1) + " ★";
    } catch {
        return "N/A";
    }
}

// --- Dashboard & Filtering ---
async function loadMatches() {
    if (!currentUser) return;
    try {
        const response = await fetch(`${API_URL}/users/location/${currentUser.location}`);
        const users = await response.json();
        
        users.forEach(u => usersMap[u.id] = u); 
        currentMatches = users.filter(u => u.id !== currentUser.id);
        
        renderMatches(currentMatches);
    } catch (error) {
        console.error('Error loading matches:', error);
    }
}

document.getElementById('search-skill').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    if (!term) {
        renderMatches(currentMatches);
    } else {
        const filtered = currentMatches.filter(u => 
            u.skillToTeach.toLowerCase().includes(term) || 
            u.skillToLearn.toLowerCase().includes(term)
        );
        renderMatches(filtered);
    }
});

async function renderMatches(matches) {
    const container = document.getElementById('matches-container');
    container.innerHTML = '';
    
    if (matches.length === 0) {
        container.innerHTML = '<p>No matches found.</p>';
        return;
    }
    
    for (const user of matches) {
        const rating = await fetchUserRating(user.id);
        const card = document.createElement('div');
        card.className = 'card animate-slide-up';
        card.innerHTML = `
            <h3>${user.name}</h3>
            <span class="rating-badge">${rating}</span><br>
            <span class="badge location">📍 ${user.location}</span>
            <div><span class="badge teach">Teaches: ${user.skillToTeach}</span></div>
            <div><span class="badge learn">Learns: ${user.skillToLearn}</span></div>
            <button class="btn-small" onclick="proposeExchange(${user.id})">Propose Barter</button>
        `;
        container.appendChild(card);
    }
}

async function proposeExchange(receiverId) {
    try {
        const response = await fetch(`${API_URL}/exchanges`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                requesterId: currentUser.id, 
                receiverId: receiverId,
                scheduledDate: new Date().toISOString()
            })
        });
        if(response.ok) alert('Exchange proposed successfully!');
    } catch(err) {
        alert('Failed to propose exchange');
    }
}

// --- Inbox & Requests Management ---
async function loadExchanges() {
    try {
        const resIn = await fetch(`${API_URL}/exchanges/receiver/${currentUser.id}`);
        const incoming = await resIn.json();
        await renderExchanges(incoming, 'incoming-requests-container', true);
        
        const resOut = await fetch(`${API_URL}/exchanges/requester/${currentUser.id}`);
        const outgoing = await resOut.json();
        await renderExchanges(outgoing, 'outgoing-requests-container', false);
    } catch (e) { console.error(e); }
}

async function renderExchanges(requests, containerId, isIncoming) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    if (requests.length === 0) {
        container.innerHTML = '<p>No requests found.</p>';
        return;
    }
    
    for (const req of requests) {
        const otherUserId = isIncoming ? req.requesterId : req.receiverId;
        const otherUser = await fetchUserById(otherUserId);
        
        let actions = '';
        if (req.status === 'PENDING' && isIncoming) {
            actions = `
                <div style="display:flex; gap:0.5rem; margin-top:1rem;">
                    <button class="btn-small" style="margin-top:0;" onclick="updateExchange(${req.id}, 'ACCEPTED')">Accept</button>
                    <button class="btn-small" style="margin-top:0; border-color:#ec4899; color:#ec4899;" onclick="updateExchange(${req.id}, 'REJECTED')">Reject</button>
                </div>
            `;
        } else if (req.status === 'ACCEPTED') {
            actions = `<button class="btn-small" style="margin-top:1rem; border-color:#10b981; color:#10b981;" onclick="openReviewModal(${otherUser.id}, '${otherUser.name}')">Leave Review</button>`;
        }
        
        const card = document.createElement('div');
        card.className = 'card animate-slide-up';
        card.innerHTML = `
            <h3>Exchange with ${otherUser.name}</h3>
            <p style="margin-bottom:0.5rem; color:var(--text-muted)">Status: <span style="font-weight:bold; color:var(--text-main)">${req.status}</span></p>
            ${actions}
        `;
        container.appendChild(card);
    }
}

async function updateExchange(reqId, status) {
    try {
        const res = await fetch(`${API_URL}/exchanges/${reqId}/status?status=${status}`, { method: 'PUT' });
        if (res.ok) {
            alert(`Exchange ${status}`);
            loadExchanges();
        }
    } catch(e) { console.error(e); }
}

// --- Review Modal Logic ---
function openReviewModal(userId, userName) {
    document.getElementById('reviewee-id').value = userId;
    document.getElementById('reviewee-name').textContent = userName;
    document.getElementById('review-modal').classList.remove('hidden');
    setRating(0);
    document.getElementById('review-comment').value = '';
}

document.getElementById('cancel-review').addEventListener('click', () => {
    document.getElementById('review-modal').classList.add('hidden');
});

const stars = document.querySelectorAll('.star');
let currentRating = 0;

stars.forEach(star => {
    star.addEventListener('mouseover', (e) => {
        const val = parseInt(e.target.dataset.value);
        stars.forEach(s => s.classList.remove('hover'));
        stars.forEach(s => {
            if(parseInt(s.dataset.value) <= val) s.classList.add('hover');
        });
    });
    star.addEventListener('mouseout', () => {
        stars.forEach(s => s.classList.remove('hover'));
    });
    star.addEventListener('click', (e) => {
        const val = parseInt(e.target.dataset.value);
        setRating(val);
    });
});

function setRating(val) {
    currentRating = val;
    document.getElementById('rating-value').value = val;
    stars.forEach(s => {
        s.classList.remove('active');
        if(parseInt(s.dataset.value) <= val) s.classList.add('active');
    });
}

document.getElementById('submit-review').addEventListener('click', async () => {
    const revieweeId = document.getElementById('reviewee-id').value;
    const rating = currentRating;
    const comment = document.getElementById('review-comment').value;
    
    if (rating === 0) {
        alert("Please select a rating.");
        return;
    }
    
    try {
        const res = await fetch(`${API_URL}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reviewerId: currentUser.id, revieweeId: revieweeId, rating, comment })
        });
        if (res.ok) {
            alert("Review submitted successfully!");
            document.getElementById('review-modal').classList.add('hidden');
            if (document.getElementById('dashboard').classList.contains('hidden') === false) {
                 loadMatches();
            }
        }
    } catch(e) { console.error(e); }
});
