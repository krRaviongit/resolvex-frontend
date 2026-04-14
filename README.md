![ResolveX
Banner](https://github.com/user-attachments/assets/0ba9a1ff-4159-4616-97dc-0adc1c670016)

# ⚡ ResolveX --- Frontend

::: {align="center"}
![ResolveX](https://img.shields.io/badge/ResolveX-Smart%20Complaint%20Management-f5c518?style=for-the-badge&logo=lightning&logoColor=black)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-4.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Deployed](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**A professional, dark-themed complaint management portal built with
React + Vite.**\
Submit complaints, track status updates, and receive real-time email
notifications.

[🌐 Live Demo](https://resolvex-frontend.vercel.app) • [🔧 Backend
Repo](https://github.com/krRaviongit/resolvex-backend)
:::

------------------------------------------------------------------------

## 📸 Screenshots

### 🏠 Home Page

```{=html}
<p align="center">
```
`<img src="https://github.com/user-attachments/assets/f647a4ee-6320-4e45-9dc6-54e1b0792ef8" width="45%" />`{=html}
`<img src="https://github.com/user-attachments/assets/1c552ede-fb80-4280-86a1-90585cb2b085" width="45%" />`{=html}
```{=html}
</p>
```
### 👤 User Dashboard

```{=html}
<p align="center">
```
`<img src="https://github.com/user-attachments/assets/d91f0ce0-56a0-4a43-919c-258a7adc8a23" width="30%" />`{=html}
`<img src="https://github.com/user-attachments/assets/a98f3c93-69da-4f95-a07d-ba6350ce5cc7" width="30%" />`{=html}
`<img src="https://github.com/user-attachments/assets/539c2b37-5039-4cba-b186-c5ade2933c70" width="30%" />`{=html}
```{=html}
</p>
```
### 🛠️ Admin Dashboard

```{=html}
<p align="center">
```
`<img src="https://github.com/user-attachments/assets/866edf47-a499-4abe-9599-9a355291dbb8" width="45%" />`{=html}
`<img src="https://github.com/user-attachments/assets/4012a9cd-a330-42fd-87b7-40db7056f746" width="45%" />`{=html}
```{=html}
</p>
```

------------------------------------------------------------------------

## ✨ Features

### 👤 User Features

-   🔐 Authentication (JWT-based login/register)
-   📝 Submit complaints with detailed fields
-   📎 Image upload (Cloudinary CDN)
-   📊 Dashboard with filters & search
-   ⭐ Rate resolved complaints
-   📧 Email notifications
-   👤 Profile management

### 🛡️ Admin Features

-   📋 Full complaints table with user info
-   🥧 Interactive pie charts (status & department)
-   🔍 Advanced filters & search
-   ✏️ Update status + resolution notes
-   📈 Stats dashboard (real-time insights)

------------------------------------------------------------------------

## 🗂️ Project Structure

    frontend/
    ├── public/
    ├── src/
    │   ├── App.jsx
    │   └── services/
    ├── .env
    ├── vite.config.js
    ├── vercel.json
    └── package.json

------------------------------------------------------------------------

## 🚀 Getting Started

### Prerequisites

-   Node.js v18+
-   Backend running

### Installation

``` bash
git clone https://github.com/krRaviongit/resolvex-frontend.git
cd resolvex-frontend
npm install
```

### Run Locally

``` bash
npm run dev
```

------------------------------------------------------------------------

## ☁️ Deployment

Deployed on **Vercel**

``` env
VITE_API_URL=https://resolvex-backend-8846.onrender.com/api
```

------------------------------------------------------------------------

## 🔐 Authentication Flow

Login → JWT Token → Stored in localStorage → API Requests → Verified
Backend

------------------------------------------------------------------------

## 📄 License

MIT License

------------------------------------------------------------------------

::: {align="center"}
Built with ❤️ by **Kumar Ravi**

⚡ ResolveX --- Resolve every issue. Faster than ever.
:::
