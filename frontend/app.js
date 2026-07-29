const API_URL = 'http://localhost:8080/api';
let currentUser = null;

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
            
            // Hide onboarding, show dashboard
            document.getElementById('onboarding').classList.add('hidden');
            document.getElementById('dashboard').classList.remove('hidden');
            
            loadMatches();
        }
    } catch (error) {
        console.error('Error creating user:', error);
        alert('Failed to connect to backend. Make sure Spring Boot is running.');
    }
});

async function loadMatches() {
    if (!currentUser) return;
    
    try {
        const response = await fetch(`${API_URL}/users/location/${currentUser.location}`);
        const users = await response.json();
        
        const container = document.getElementById('matches-container');
        container.innerHTML = '';
        
        const matches = users.filter(u => u.id !== currentUser.id);
        
        if (matches.length === 0) {
            container.innerHTML = '<p>No matches found in your area yet.</p>';
            return;
        }
        
        matches.forEach(user => {
            const card = document.createElement('div');
            card.className = 'card animate-slide-up';
            card.innerHTML = `
                <h3>${user.name}</h3>
                <span class="badge location">📍 ${user.location}</span>
                <div><span class="badge teach">Teaches: ${user.skillToTeach}</span></div>
                <div><span class="badge learn">Learns: ${user.skillToLearn}</span></div>
                <button class="btn-small" onclick="proposeExchange(${user.id})">Propose Barter</button>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading matches:', error);
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
        
        if(response.ok) {
            alert('Exchange proposed successfully!');
        }
    } catch(err) {
        alert('Failed to propose exchange');
    }
}
