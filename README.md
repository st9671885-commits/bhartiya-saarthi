# 🇮🇳 Bhartiya Saarthi

### Digital Government Companion for Every Citizen

**Bhartiya Saarthi** is an AI-powered citizen portal designed to simplify access to government services, schemes, documents, and applications through a single, user-friendly platform.

Instead of navigating multiple complicated government portals, citizens can use Saarthi to **discover services, check eligibility, understand required documents, get AI assistance, and track applications** from one dashboard.

---

## 🚀 Why Bhartiya Saarthi?

Government services can often be difficult to access because citizens have to:

* Search through multiple portals
* Understand complex eligibility criteria
* Find the correct documents
* Fill out complicated applications
* Track applications across different platforms
* Understand government terminology

**Bhartiya Saarthi brings these processes together into one simple digital experience.**

---

## ✨ Key Features

### 🤖 Saarthi AI

An AI-powered government service assistant that helps citizens with questions related to:

* Government schemes
* Eligibility
* Required documents
* Application procedures
* Government services
* Scholarships and benefits

Citizens can simply ask questions in natural language and receive guidance from Saarthi AI.

---

### 👤 Citizen Profile

Users can create and manage their citizen profile with information such as:

* Full Name
* Email
* Phone Number
* Age
* Occupation
* Student Status

The profile information is used to provide more relevant government service recommendations.

---

### 🎯 Smart Eligibility

The platform evaluates a citizen's profile and provides personalized eligibility results.

Each service can display:

* Eligibility score
* Category
* Description
* Eligibility status
* Additional information requirements

This helps citizens identify services that are most relevant to them.

---

### 📄 Document Readiness

Bhartiya Saarthi provides a document-readiness overview so users can understand whether they are prepared for an application.

The dashboard can display:

* Documents verified
* Documents pending
* Expired documents
* Overall readiness percentage

---

### 📋 Application Tracking

Citizens can monitor their government applications from one place.

Application statuses include:

* Under Review
* Action Required
* Approved
* Completed

Users can also open individual application details.

---

### 🏛️ Government Services

The platform organizes services into categories such as:

* 🎓 Education
* 📄 Documents
* 💳 Finance
* ❤️ Healthcare
* 🚗 Transport
* 💼 Employment

Users can discover services and check their eligibility.

---

### 📊 Citizen Dashboard

The personalized dashboard provides an overview of:

* Available services
* Documents ready
* Active applications
* Completed applications
* Recommended services
* Document readiness
* Saarthi AI assistance

---

### 📱 Responsive Interface

The application is designed to work across:

* Desktop
* Tablet
* Mobile

The navigation includes a responsive mobile menu for smaller screens.

---

## 🛠️ Technology Stack

### Frontend

* React.js
* React Router
* Framer Motion
* Lucide React
* JavaScript
* CSS

### Backend

* FastAPI
* Python
* REST APIs

### AI

* AI-powered Saarthi Assistant
* Natural-language interaction
* Government-service guidance

### Data & APIs

* REST API architecture
* Citizen profile APIs
* Dashboard APIs
* Eligibility APIs
* AI APIs
* Application APIs
* Document APIs

---

## 🏗️ Project Architecture

```text
Bhartiya Saarthi
│
├── Frontend
│   ├── React.js
│   ├── React Router
│   ├── Framer Motion
│   └── Lucide React
│
├── Backend
│   ├── FastAPI
│   ├── Authentication
│   ├── Citizen APIs
│   ├── Eligibility APIs
│   ├── Application APIs
│   ├── Document APIs
│   └── AI API
│
└── Saarthi AI
    ├── User Question
    ↓
    ├── Backend AI Endpoint
    ↓
    └── AI Generated Response
```

---

## 📂 Frontend Structure

```text
src/
│
├── assets/
│   └── image.png
│
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Services.jsx
│   ├── HowItWorks.jsx
│   ├── Footer.jsx
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Profile.jsx
│   ├── Eligibility.jsx
│   ├── ApplicationForm.jsx
│   ├── Applications.jsx
│   └── Documents.jsx
│
├── pages/
│   └── SaarthiAI.jsx
│
├── api/
│   ├── profileApi.js
│   ├── dashboardApi.js
│   └── ...
│
├── App.jsx
└── main.jsx
```

---

## 🔄 Application Flow

```text
              ┌──────────────────┐
              │   Landing Page   │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │      Login       │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │    Dashboard     │
              └────────┬─────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
   ┌─────────┐   ┌────────────┐  ┌────────────┐
   │ Profile │   │ Eligibility│  │ Documents  │
   └────┬────┘   └─────┬──────┘  └────────────┘
        │              │
        └──────┬───────┘
               ▼
       ┌─────────────────┐
       │ Apply for Service│
       └────────┬────────┘
                │
                ▼
       ┌─────────────────┐
       │ Track Application│
       └─────────────────┘

               +
               
       ┌─────────────────┐
       │   Saarthi AI 🤖 │
       └─────────────────┘
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/bhartiya-saarthi.git
```

Move into the project directory:

```bash
cd bhartiya-saarthi
```

---

### 2. Install Frontend Dependencies

```bash
npm install
```

---

### 3. Start the Frontend

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 🔌 Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The backend will normally run at:

```text
http://127.0.0.1:8000
```

---

## 🔐 Environment Variables

Create a `.env` file for sensitive configuration.

Example:

```env
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
AI_API_KEY=your_ai_api_key
```

**Do not commit `.env` files or API keys to GitHub.**

Add this to `.gitignore`:

```text
.env
venv/
node_modules/
__pycache__/
```

---

## 🔗 Main Routes

| Route           | Description         |
| --------------- | ------------------- |
| `/`             | Landing Page        |
| `/login`        | User Login          |
| `/dashboard`    | Citizen Dashboard   |
| `/profile`      | Citizen Profile     |
| `/eligibility`  | Eligibility Results |
| `/apply`        | Application Form    |
| `/applications` | Application History |
| `/documents`    | Document Centre     |
| `/ai`           | Saarthi AI          |
| `/saarthi-ai`   | Saarthi AI          |

---

## 🧠 How Saarthi AI Works

The user enters a question such as:

```text
Am I eligible for a government scholarship?
```

The frontend sends the question to:

```text
POST /api/ai/ask
```

The request contains:

```json
{
  "question": "Am I eligible for a government scholarship?"
}
```

The backend processes the request and returns an AI-generated response.

The frontend then displays the response inside the Saarthi AI chat interface.

---

## 🎯 Example Use Cases

### Student

> "What scholarships can I apply for?"

Saarthi can guide the student toward relevant education services.

### Citizen

> "What documents do I need for an income certificate?"

Saarthi can explain the required documentation.

### Applicant

> "What is the status of my application?"

The platform can help users navigate their application information.

### New User

> "Which government services am I eligible for?"

The eligibility system can analyze the user's profile and return relevant results.

---

## 🔮 Future Scope

The project can be expanded with:

* 🌐 Multilingual AI support
* 🎙️ Voice-based Saarthi
* 📱 Progressive Web App
* 📄 AI document verification
* 🧾 Automatic form filling
* 🔔 Application status notifications
* 🗺️ Location-based government services
* 🏛️ Integration with official government APIs
* 🔐 DigiLocker integration
* 📱 WhatsApp-based Saarthi
* 🧠 More advanced personalized recommendations
* 📊 Government service analytics
* ♿ Accessibility improvements

---

## 🔒 Security Considerations

The application should follow secure development practices including:

* JWT-based authentication
* Password hashing
* Protected API endpoints
* Input validation
* Secure environment variables
* CORS configuration
* API authorization
* No API keys in frontend code

---

## 🌟 Vision

> **"One Saarthi for every citizen."**

Bhartiya Saarthi aims to make government services easier to discover, understand, prepare for, and track — especially for citizens who may find traditional government portals difficult to navigate.

---

## 🇮🇳 Built for Bharat

Bhartiya Saarthi is designed with a simple goal:

**Make government services more accessible, understandable, and citizen-friendly.**

---

## 👨‍💻 Project

**Bhartiya Saarthi — Digital Government Companion**

Built using **React + FastAPI + AI**

```text
Discover → Understand → Prepare → Apply → Track
```

---

## 📜 License

This project is developed for educational, demonstration, and hackathon purposes.

Add an appropriate open-source license if you decide to publish the project for public reuse.

```
```
