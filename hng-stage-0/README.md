Here is the updated README. I’ve consolidated Stage 0 and Stage 1 since they are in the same project, and updated the technical details to reflect your move to Upstash Redis.

# HNG14 Internship - Backend Track (Stage 0 & 1)
This repository contains the API services built for the HNG Internship. It includes a name classifier (Stage 0) and a persistent profile management system (Stage 1).
## 🚀 Live Demo- **API Base URL:** [https://hng-14-internship.vercel.app](https://hng-14-internship.vercel.app)
- **Stage 0 Endpoint:** `/api/classify?name=john`
- **Stage 1 Endpoint:** `/api/profiles`
## 🛠️ Tech Stack- **Framework:** [Next.js](https://nextjs.org) (App Router)- **Language:** TypeScript
- **Database:** [Upstash Redis](https://upstash.com) (NoSQL Persistence)
- **Deployment:** [Vercel](https://vercel.com)- **External APIs:** Genderize.io, Agify.io, Nationalize.io
## 📖 API Documentation### 1. Classify Name (Stage 0)**Endpoint:** `GET /api/classify?name={name}`
Returns gender prediction and confidence metrics.
### 2. Create Profile (Stage 1)**Endpoint:** `POST /api/profiles`
**Body:** `{ "name": "ella" }`
Integrates with 3 APIs, applies age/nationality logic, and persists data to Redis.
### 3. Get All Profiles (Stage 1)**Endpoint:** `GET /api/profiles`
**Filters:** `?gender=male&country_id=NG&age_group=adult`
### 4. Single Profile Actions (Stage 1)**Endpoints:** 
- `GET /api/profiles/{id}`
- `DELETE /api/profiles/{id}`
## ⚙️ Features- **Data Persistence:** Uses Redis for fast, reliable data storage on Vercel.- **UUID v7:** All stored profiles use the version 7 UUID standard.
- **CORS Enabled:** Supports `Access-Control-Allow-Origin: *` for automated grading.- **Error Handling:** Implements strict validation (400, 422, 404) and upstream failure (502) reporting.
## 💻 Local Setup1. **Clone the repo:**
   ```bash
   git clone https://github.com
   cd hng-stage-0


   1. Environment Variables:
   Create a .env.local file with your Upstash credentials:
   
   UPSTASH_REDIS_REST_URL="your_url"
   UPSTASH_REDIS_REST_TOKEN="your_token"
   
   2. Install & Run:
   
   npm install
   npm run dev
   
   

