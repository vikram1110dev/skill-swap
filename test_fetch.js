async function testDiscover() {
  try {
    const loginRes = await fetch('http://localhost:8081/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernameOrEmail: 'nagul420', password: 'password' })
    });
    console.log(loginRes.status, loginRes.statusText);
    const loginText = await loginRes.text();
    console.log("Login response:", loginText);
  } catch (err) {
    console.error(err);
  }
}
testDiscover();
