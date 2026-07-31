const axios = require('axios');

async function testDiscover() {
  try {
    const loginRes = await axios.post('http://localhost:8081/api/auth/login', {
      usernameOrEmail: 'nagul420',
      password: 'password'
    });
    const token = loginRes.data.token;
    
    const discRes = await axios.get('http://localhost:8081/api/discover', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(JSON.stringify(discRes.data, null, 2));
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}
testDiscover();
