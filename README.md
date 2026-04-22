Here is your cleaned-up root README.md. I’ve merged the overlapping sections and ensured the tech stack correctly reflects your move to Upstash Redis.

# HNG14 Internship - Backend Track 🚀
This repository contains all the tasks and projects completed during my **HNG14 Backend Internship**. Each directory represents a specific stage of the program.
---## 📂 Project Structure- **/hng-stage-0**: The main Next.js application containing:
  - `GET /api/classify`: Stage 0 - Basic Name Classification.
  - `/api/profiles`: Stage 1 - Data Persistence & API Design.
---## 🚀 Active Endpoints### Stage 0: Name Classifier- `GET /api/classify?name={name}` - Returns gender and confidence metrics.
### Stage 1: Data Persistence (Upstash Redis)- `POST /api/profiles` - Create profile (Genderize + Agify + Nationalize integration).
- `GET /api/profiles` - List all profiles (Supports filters: `gender`, `age_group`, `country_id`).
- `GET /api/profiles/{id}` - Fetch a single profile by UUID.
- `DELETE /api/profiles/{id}` - Remove a profile from the database.
---## 🛠️ Tech Stack & Tools- **Framework:** Next.js (App Router)- **Language:** TypeScript
- **Database:** [Upstash Redis](https://upstash.com)
- **Libraries:** `@upstash/redis`, `uuid` (v7)
- **Deployment:** [Vercel](https://vercel.app)
---## ⚙️ Features- **Data Persistence:** Stores profile data using Redis Key-Value pairs and Lists for efficiency.- **UUID v7:** All profile IDs are generated using the time-sortable UUID v7 standard.- **External API Integration:** Merges and processes data from three concurrent API calls.
- **CORS Enabled:** Mandatory `Access-Control-Allow-Origin: *` header for grading compatibility.
---## 💻 Local Setup1. **Clone the repo:**
   ```bash
   git clone https://https://github.com/Goldeno10/HNG14_Internship
   cd hng-stage-0


   1. Install dependencies:
   
   npm install
   
   2. Environment Variables:
   Create a .env.local file with your Upstash credentials:
   
   UPSTASH_REDIS_REST_URL="your_url"
   UPSTASH_REDIS_REST_TOKEN="your_token"
   
   3. Run development server:
   
   npm run dev
   
   
------------------------------
## 👤 Author

* GitHub: @Goldeno10

------------------------------
This repository is updated regularly as I progress through the HNG Internship tracks.



