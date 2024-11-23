const instance = axios.create({
    baseURL: "https://dummyjson.com/",
    timeout: 3000,
  });
  
  const userCheck = async () => {
    const token = sessionStorage.getItem("token");
    console.log(token, "Token nəzarəti üçün:");
    console.log("Cari URL:", window.location.href);
  };
  userCheck();
  
  const loginUser = async (url, payloadlogindata) => {
    try {
      const res = await instance.post(url, payloadlogindata);
      sessionStorage.setItem("token", res?.data?.token); 
      if (res.status === 200) {
        console.log("Login uğurlu oldu:", res.data);
        setTimeout(() => {
          window.location.href = "http://127.0.0.1:5500/public/admin.html";
        }, 3000); 
      }
    } catch (error) {
      console.error("Login zamanı xəta baş verdi:", error.response?.data || error.message);
      alert("Giriş zamanı problem baş verdi. Yenidən yoxlayın.");
    }
  };
  
  const loginForm = document.querySelector("#loginform");
  const loginUsername = document.getElementById("username");
  const loginPassword = document.getElementById("password");
  
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault(); 
      const payloadlogindata = {
        username: loginUsername.value,
        password: loginPassword.value,
      };
  
      loginUser("/auth/login", payloadlogindata);
    });
  }
  