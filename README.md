![ResolveX Banner](https://github.com/user-attachments/assets/0ba9a1ff-4159-4616-97dc-0adc1c670016)

# ⚡ ResolveX — Frontend

<div align="center">

![ResolveX](https://img.shields.io/badge/ResolveX-Smart%20Complaint%20Management-f5c518?style=for-the-badge&logo=lightning&logoColor=black)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-4.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Deployed](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**A professional, dark-themed complaint management portal built with React + Vite.**  
Submit complaints, track status updates, and receive real-time email notifications.

[🌐 Live Demo](https://resolvex-frontend.vercel.app) • [🔧 Backend Repo](https://github.com/krRaviongit/resolvex-backend) • [📬 Report Bug](#)

</div>

---

## 📸 Screenshots

| Home Page | User Dashboard | Admin Dashboard |
|-----------|---------------|-----------------|
| ![Image 1](https://github.com/user-attachments/assets/f647a4ee-6320-4e45-9dc6-54e1b0792ef8)

![Image 2](https://github.com/user-attachments/assets/1c552ede-fb80-4280-86a1-90585cb2b085)| Complaint list with filters | Pie charts + complaint table |

---

## ✨ Features

### 👤 User Features
- 🔐 **Authentication** — Register, login, JWT-based sessions
- 📝 **Submit Complaints** — Title, description, department, priority, room number, block, contact
- 📎 **Image Upload** — Drag & drop or click to upload (Cloudinary CDN)
- 📊 **Dashboard** — View all complaints with status filters and search
- ⭐ **Rate Resolutions** — Star rating system for resolved complaints
- 📧 **Email Notifications** — Auto email when admin updates complaint status
- 👤 **Profile Management** — Update name, phone, organization

### 🛡️ Admin Features
- 📋 **All Complaints Table** — See every complaint with submitter name, email, room number, contact
- 🥧 **Interactive Pie Charts** — Status & department breakdown with hover effects
- 🔍 **Filters** — Filter by department, status, priority, search by title
- ✏️ **Manage Complaints** — Update status, add resolution notes, view attached images
- 📈 **Stats Dashboard** — Total, New, In Progress, Resolved counts

### 🎨 Design System
- Pure black dark theme (`#060606` background)
- Yellow brand accent (`#f5c518`)
- Department color coding (8 unique colors)
- Status-aware badge colors
- No emoji — clean SVG icons throughout
- Inter font, tight letter spacing, professional typography

---

## 🗂️ Project Structure

```
frontend/
├── public/
│   └── logo.svg              # Thunder bolt logo
├── src/
│   ├── App.jsx               # Entire application (single-file architecture)
│   └── services/             # API service helpers
├── .env                      # Local environment variables
├── .env.production           # Production environment variables
├── .gitignore
├── vite.config.js            # Vite configuration
├── vercel.json               # Vercel SPA routing config
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- Backend running (see [Backend README](https://github.com/krRaviongit/resolvex-backend))

### Installation

```bash
# Clone the repository
git clone https://github.com/krRaviongit/resolvex-frontend.git
cd resolvex-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and set your backend URL
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, set this in Vercel dashboard:

```env
VITE_API_URL=https://resolvex-backend-8846.onrender.com/api
```

### Run Locally

```bash
npm run dev
# Opens at http://localhost:5173
```

### Build for Production

```bash
npm run build
# Output in /dist folder
```

---

## 🧩 Pages & Components

| Page | Route Key | Description |
|------|-----------|-------------|
| **Home** | `home` | Hero, stats row, department grid |
| **Login** | `login` | JWT authentication |
| **Register** | `register` | New user signup |
| **Submit Complaint** | `submit` | Full complaint form with image upload |
| **My Complaints** | `dashboard` | User's complaint list with filters |
| **Admin Dashboard** | `admin` | Full admin panel with charts and table |
| **Profile** | `profile` | User profile management |

---

## 🏗️ Architecture

```
App.jsx (Single File)
│
├── Design Tokens (C object)
├── Department Config (DEPARTMENTS array)
├── Icon System (Ico component - inline SVG)
├── Primitive Components
│   ├── Badge         — Status & priority badges
│   ├── Btn           — Button variants (primary, ghost, danger, subtle)
│   ├── Field         — Input, select, textarea
│   ├── Modal         — Overlay modal
│   └── Toast         — Success/error notifications
│
├── Layout
│   └── Navbar        — Sticky top nav with user dropdown
│
└── Pages
    ├── HomePage
    ├── AuthPage
    ├── SubmitComplaintPage
    ├── UserDashboard
    ├── AdminDashboard
    └── ProfilePage
```

---

## 🎨 Color System

```js
const C = {
  bg:          "#060606",   // Page background
  bgCard:      "#111",      // Card background
  bgCardHover: "#161616",   // Card hover
  text:        "#ffffff",   // Primary text
  textSub:     "#aaa",      // Secondary text
  textDim:     "#666",      // Dim/metadata text
  logo:        "#f5c518",   // Brand yellow
  danger:      "#ff4444",   // Error/High priority
  success:     "#22c55e",   // Success/Resolved
  warning:     "#f59e0b",   // Warning/Pending
}
```

### Department Colors
| Department | Color |
|-----------|-------|
| IT Support | `#60a5fa` Blue |
| Electrical | `#facc15` Yellow |
| Plumbing | `#38bdf8` Sky |
| Maintenance | `#4ade80` Green |
| Cleaning | `#f472b6` Pink |
| Network | `#a78bfa` Purple |
| Security | `#fb923c` Orange |
| Mess/Cafeteria | `#f87171` Red |

---

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.14.2",
  "axios": "^1.4.0"
}
```

**Dev Dependencies:**
```json
{
  "vite": "^4.4.9",
  "@vitejs/plugin-react": "^4.0.3"
}
```

---

## ☁️ Deployment (Vercel)

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/resolvex-frontend.git
git push -u origin main
```

### Step 2 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. Set **Framework Preset** → `Vite`
4. Add **Environment Variable**:
   ```
   VITE_API_URL = https://resolvex-backend-8846.onrender.com/api
   ```
5. Click **Deploy**

### Step 3 — Configure vercel.json
The `vercel.json` handles SPA routing (already included):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 🔐 Authentication Flow

```
User enters credentials
        ↓
POST /api/auth/login
        ↓
Backend returns JWT token
        ↓
Token stored in localStorage as "resolvex_token"
        ↓
Every API request includes: Authorization: Bearer <token>
        ↓
Backend verifies token → returns data
```

---

## 📱 Key User Flows

### Submit a Complaint
1. Login → Click **New Complaint**
2. Fill title, description
3. Select department & priority
4. Enter room number (required), block, contact
5. Optionally drag & drop an image
6. Click **Submit** → Saved to MongoDB, admin notified

### Admin Resolves a Complaint
1. Login as admin → Go to **Dashboard**
2. Find complaint in table → Click **Edit**
3. See submitter name, email, room number, contact
4. Change status → Add resolution notes
5. Click **Save** → User receives email notification automatically

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m "Add amazing feature"`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

Built with ❤️ by **Kumar Ravi**

⚡ **ResolveX** — Resolve every issue. Faster than ever.

</div>

