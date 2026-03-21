# ➕ RapidResQ - Instant Emergency Response & Healthcare Platform
RapidResQ is a comprehensive, centralized healthcare application designed to provide instant medical consultations, emergency SOS handling, and robust hospital management. Powered by Supabase and Vite + React, the platform offers a seamless experience for patients, doctors, hospitals, and ambulance drivers.

Built with a Vite + React + TypeScript frontend and a Supabase (Database & Auth) backend, RapidResQ delivers a highly responsive, accessible, and type-safe user experience.

## 🚀 Features
- 🚑 **Emergency SOS** – Features a direct SOS page and a floating emergency button for immediate medical assistance and rapid response.
- 🧑‍⚕️ **Instant Doctor Booking** – Connect with healthcare professionals anytime, anywhere through built-in Video Consultations and Calls.
- 🏥 **Hospital & Operator Dashboards** – Separate, comprehensive dashboards designed for Hospitals and system Operators to efficiently manage bookings and resources.
- 💊 **Medicine & Prescription Management** – Track medicines, view treatment histories, and manage digital prescriptions effortlessly.
- 💳 **ABDM Compliant** – Seamlessly integrates with the Ayushman Bharat Digital Mission (ABHA) and provides secure Health Cards management.
- 🚗 **Dedicated Driver App** – Specific application routing tailored for ambulance drivers to streamline emergency dispatch.
- 🎨 **Modern UI/UX** – Beautifully designed using Tailwind CSS and Radix UI (Shadcn UI) for accessibility and aesthetic appeal.
- 🔐 **Secure Authentication** – Seamless, secure user login and robust profile management using Supabase Authentication.

## 🏗️ Project Structure
```text
RapidResq/
│
├── src/                        # Main source code
│   ├── assets/                 # Static visual assets
│   ├── components/             # Reusable React components (UI, Forms, Alerts)
│   ├── hooks/                  # Custom React hooks for state management
│   ├── integrations/           # Third-party integrations (Supabase etc.)
│   ├── lib/                    # Core logic and utility functions
│   ├── pages/                  # Route-level components (Auth, SOS, Dashboards, etc.)
│   ├── App.tsx                 # Main application routing and providers setup
│   └── main.tsx                # Application entry point
│
├── public/                     # Public static assets
└── package.json                # Project dependencies and scripts
```

## 🛠️ Setup Instructions (Windows)

### 🔧 Prerequisites
- Node.js v18+
- npm installed
- A Supabase project configured for Authentication and Database.

### 🏃‍♂️ Running Locally
```bash
# Clone the repository
git clone https://github.com/harshit1arora/Rapidresq---EPICS.git
cd Rapidresq---EPICS

# Install dependencies
npm install

# Configure Environment Variables
# Create a .env or .env.local file in the root directory and add your Supabase config:
# VITE_SUPABASE_URL="..."
# VITE_SUPABASE_ANON_KEY="..."

# Run the development server
npm run dev
```
*The app will be available on the local port provided by Vite (e.g., http://localhost:8080).*

## 📐 Architecture Decisions
- **Fast Build Tooling:** Built on Vite for lightning-fast HMR and optimized production builds.
- **Component Architecture:** Utilizes Radix UI primitives and Tailwind CSS (via Shadcn UI) to achieve an accessible, beautifully designed, and highly customizable UI system without the bloat of traditional component libraries.
- **Supabase Integration:** Employs Supabase for its scalable PostgreSQL database and ready-to-use secure authentication, drastically reducing backend boilerplate.
- **Client-Side Routing:** Implements React Router DOM to manage the complex, multi-role navigation (Patient, Hospital, Operator, Driver) seamlessly without page reloads.

## 📜 License
This project is licensed under the MIT License.

## 📬 Contact
For questions or collaboration, please open an issue on GitHub.
