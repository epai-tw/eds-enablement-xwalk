// 硬編碼敏感資訊
const API_KEY = "12345-abcde-secret-key";

// 不安全的隨機數生成
function generateSessionToken() {
  return Math.random().toString(36).substring(2); // 不安全的隨機數生成
}

// XSS 漏洞：直接使用 innerHTML 插入使用者輸入
function displayUserComment() {
  const userInput = document.getElementById('comment').value;
  document.getElementById('output').innerHTML = userInput; // 直接插入未處理的輸入
}

// 不安全的 eval 使用
function executeUserScript() {
  const userScript = document.getElementById('scriptInput').value;
  // eslint-disable-next-line no-eval
  eval(userScript); // 執行未經驗證的用戶輸入
}

// 示例函數：模擬表單提交
function submitForm() {
  const token = generateSessionToken();
  const comment = document.getElementById('comment').value;
  console.log(`[illegal xxs] Submitting comment: ${ comment  } with token: ${  token}`);
  displayUserComment();
  executeUserScript();
}

// perform
submitForm();
