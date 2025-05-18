# PARIJANA - AI-based Humanoid Agent for enhancing consumer experience in Insurance Claim

Parijana is an AI-based humanoid agent designed to enhance consumer experience in **insurance claim management**. It provides a conversational interface that guides users through the claim filing process, auto-fills documents using OCR, and offers legal and procedural support.

---

## 🚀 Features

- 🤖 Conversational AI assistant for insurance guidance
- 📄 OCR-powered automated form filling
- 📂 Claim documentation uploader
- 🔍 Legal article suggestions using AI
- 🔐 Secure login and user management
- 🛠 Admin dashboard for managing feedback and inquiries

---

## 🛠 Tech Stack

| Layer       | Technology              |
|------------|--------------------------|
| Frontend   | HTML, CSS, JavaScript, EJS |
| Backend    | Node.js, Express.js      |
| Database   | MongoDB + Mongoose       |
| AI/ML      | OpenAI API (or similar), OCR |
| Others     | Git, GitHub, Cloud Hosting (optional) |

---

## 📂 Project Structure

PARIJANA_FULLSTACK/
│
├── controller/ # Logic for routes and features
├── models/ # MongoDB models (User, Feedback, etc.)
├── views/ # EJS templates
├── public/ # CSS, JS, static assets
├── routes/ # All route handlers
├── uploads/ # OCR documents (optional)
├── .gitignore
├── app.js # Main entry point
└── package.json

---

## 🧪 How to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/Mukundh15/parijana.git
cd parijana

# 2. Install dependencies
npm install

# 3. Create .env file
touch .env
# Add MongoDB URI and other keys

# 4. Run the server
npm start
