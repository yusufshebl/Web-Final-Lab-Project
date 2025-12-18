
const loginForm = document.getElementById("loginForm");
const messageDiv = document.getElementById("message");
const loader = document.getElementById("loader");
const submitBtn = document.getElementById("submitBtn");
const userInfo = document.getElementById("userInfo");
const debugInfo = document.getElementById("debugInfo");

function fillLogin(username, password) {
     document.getElementById("username").value = username;
     document.getElementById("password").value = password;
     showMessage("✅ Credentials filled - Click Login", "success");
}

function showMessage(text, type) {
     messageDiv.textContent = text;
     messageDiv.className = `message ${type}`;
     messageDiv.style.display = 'block';
}

function addDebug(text) {
     const time = new Date().toLocaleTimeString('en-US');
     debugInfo.innerHTML = `[${time}] ${text}<br>` + debugInfo.innerHTML;
     debugInfo.style.display = 'block';
}

function displayUserInfo(data) {
     userInfo.innerHTML = `
                <h3>Welcome ${data.firstName}!</h3>
                ${data.image ? `<img src="${data.image}" alt="User">` : ''}
                <p><strong>Full Name:</strong> ${data.firstName} ${data.lastName}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Gender:</strong> ${data.gender}</p>
                <p><strong>User ID:</strong> ${data.id}</p>
                <p><strong>Username:</strong> ${data.username}</p>
                
                <button onclick="logout()" style="margin-top: 15px; background: #dc3545;">Logout</button>
            `;
     userInfo.style.display = 'block';
     loginForm.style.display = 'none';
}

function logout() {
     localStorage.removeItem('userData');
     localStorage.removeItem('authToken');
     addDebug(`User logged out`);
     location.reload();
}

// Check if user is already logged in on page load
window.addEventListener('DOMContentLoaded', function () {
     const savedUserData = localStorage.getItem('userData');
     if (savedUserData) {
          const userData = JSON.parse(savedUserData);
          addDebug(`✅ User already logged in: ${userData.username}`);
          displayUserInfo(userData);
     } else {
          addDebug(`🚀 Page ready - Click any test account to start`);
     }
});

loginForm.addEventListener("submit", async function (e) {
     e.preventDefault();

     const username = document.getElementById("username").value.trim();
     const password = document.getElementById("password").value.trim();

     addDebug(`🔄 Login attempt: ${username}`);

     loader.style.display = 'block';
     submitBtn.disabled = true;
     messageDiv.style.display = 'none';

     try {
          addDebug(`📤 Sending request to API...`);

          const response = await fetch("https://dummyjson.com/auth/login", {
               method: "POST",
               headers: {
                    "Content-Type": "application/json"
               },
               body: JSON.stringify({
                    username: username,
                    password: password
               })
          });

          addDebug(`📥 Response received from API - Status: ${response.status}`);

          const data = await response.json();
          console.log("📊 Full Response:", data);

          addDebug(`📋 Data received: ${JSON.stringify(data).substring(0, 100)}...`);

          loader.style.display = 'none';
          submitBtn.disabled = false;

          if (response.ok) {
               showMessage("✅ Login successful!", "success");
               addDebug(`✅ Login successful - Token: ${data.token?.substring(0, 20)}...`);

               // Save user data to localStorage
               localStorage.setItem('userData', JSON.stringify(data));
               localStorage.setItem('authToken', data.token);
               addDebug(`💾 User data saved to storage`);

               displayUserInfo(data);
          } else {
               const errorMsg = data.message || "Invalid username or password";
               showMessage(`❌ ${errorMsg}`, "error");
               addDebug(`❌ Failed: ${errorMsg}`);
          }

     } catch (error) {
          loader.style.display = 'none';
          submitBtn.disabled = false;
          showMessage("⚠️ Connection error occurred", "error");
          addDebug(`⚠️ Error: ${error.message}`);
          console.error("❌ Error:", error);
     }
});
