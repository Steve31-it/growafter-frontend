# 🌱 GrowAfter - After-School Course Booking Platform

GrowAfter is a comprehensive full-stack application designed to help parents and students discover and book enriching after-school lessons across the United States. With a Vue.js frontend and an Express + MongoDB backend, GrowAfter delivers a seamless and user-friendly experience for exploring skill-building opportunities.

---

## 🌐 Live Links

- **Frontend (GitHub Pages):** [GrowAfter Frontend](https://steve31-it.github.io/growafter-frontend/)
- **Backend API (Render):** [GrowAfter API](https://growafter-server.onrender.com)

---

## 🌟 Key Features

### 🧠 Course Browsing

Discover a curated selection of after-school programs, including:

- 🎨 **Art & Creativity**
- 💻 **Junior Coding**
- 🤖 **Robotics**
- 🎭 **Theater & Speaking**

Each course provides:

- Title / Subject
- Location
- Price
- Available Spaces
- Ratings
- Thumbnail images fetched from the backend

### 🔍 Smart Sorting & Search

- Sort courses by:
  - Name
  - Location
  - Price
  - Available Spaces
  - Ratings
- Filter courses using a real-time search bar

### 🛒 Cart Management

- Add-to-cart button is enabled only if spaces are available
- Automatically updates space count in real-time
- Disables booking when no spaces are left
- Allows removing lessons to free up spaces

### 🧾 Seamless Checkout Flow

- Complete required fields:
  - Name, Email, City, State, Zip, Phone
  - Delivery method (Pickup or Home Delivery)
- Validates form fields before submission
- Updates the database and displays a success modal with a personalized message

### 📱 Responsive UI

- Built with mobile-first design principles
- Features a clean, professional blue-dark theme for an educational and engaging experience

---

## 🛠️ Tech Stack

### 🎨 Frontend

- Vue.js 2
- HTML + SCSS/CSS
- Font Awesome Icons
- Hosted on GitHub Pages

### 🧠 Backend

- Node.js + Express.js
- MongoDB Atlas (cloud database)
- Deployed on Render

---

## 📁 Directory Overview

```
project-root/
├── frontend/
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   └── images/
├── backend/
│   ├── app.js
│   ├── routes/
│   ├── controllers/
│   ├── config/db.js
│   ├── images/
│   ├── .env
```

---

## 🧪 Running Locally

### Backend Setup

```bash
cd backend
npm install
node app.js
```

### Frontend Setup

Simply open `index.html` in your browser or use a live server extension in VS Code.

---

## 📸 Screenshots

Include screenshots of:

- Home page with lessons displayed
- Filtered or sorted list
- Cart page
- Checkout form
- Order confirmation modal

---

## 🤝 Credits

Developed by **Pyae Sone Oo**

For **CST3144 - Full Stack Web Development Coursework (London Met)**

Let's grow brilliance after school, together. 🌱
