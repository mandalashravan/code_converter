

# 🧠 Code Converter - AI-Powered Code Translator

An advanced AI-powered **Code Converter** that allows users to translate code from one programming language to another using OpenAI. Built with **React + Tailwind CSS** for the frontend and **Django + DRF** for the backend. The project includes authentication, usage limits, history tracking, an admin dashboard, and more.

## 🚀 Features

✅ Convert code between languages using OpenAI  
✅ 3 free conversions for guests (tracked per session)  
✅ Unlimited conversions for logged-in users  
✅ Smart language selector with search and swap support  
✅ Monaco Editor with syntax highlighting  
✅ Drag & Drop or paste code  
✅ Copy & download output with correct file extension  
✅ Beautiful responsive UI with Tailwind CSS  
✅ Code conversion history (localStorage-based)  
✅ Custom Admin Dashboard to manage user status  
✅ Auth state updates Navbar live (using custom event)

---

## 🖼️ Screenshots

Coming soon...

---

## 🏗️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Monaco Editor

### Backend
- Django
- Django REST Framework
- JWT Authentication

### AI Integration
- OpenAI API (GPT-based)

---

## 🔧 Setup Instructions

### 1. Clone the repository


```bash
git clone https://github.com/mandalashravan/code_converter.git
cd code_converter
````

### 2. Backend Setup (Django)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate      # For Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

* Create `.env` file and add:

```
OPENAI_API_KEY=your_openai_key
SECRET_KEY=your_django_secret
DEBUG=True
```

### 3. Frontend Setup (React)

```bash
cd ../frontend
npm install
npm start
```

---

## 🔐 Authentication

* Guests: 3 code conversions/session
* Login/Signup required for unlimited use
* JWT-based authentication
* Admin Dashboard with user activation toggle

---

## 📂 Project Structure

```
code_converter/
│
├── backend/             # Django project
│   ├── api/             # Conversion logic, JWT auth
│   ├── admin_panel/     # Admin user management
│   └── ...
│
├── frontend/            # React app
│   ├── src/
│   │   ├── components/  # Navbar, Editors, etc.
│   │   ├── pages/       # Converter, History, Landing
│   │   └── ...
```

---

## 👤 Admin Access

* Admin users can:

  * View all registered users
  * Toggle active/inactive status
  * Unauthorized access redirects with popup + countdown

---

## 🛠️ Coming Soon

* Model training for custom code translation
* Database-based history tracking
* Language-specific syntax checks
* Dark mode & UI themes

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

**Mandala Shravan**
🔗 [GitHub](https://github.com/mandalashravan)
📧 Reach out for collaboration or feedback!


