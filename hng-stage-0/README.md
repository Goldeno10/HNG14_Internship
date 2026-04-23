# HNG14 Internship - Backend Track 🚀

This repository contains the graduation of tasks from Stage 0 to Stage 2 of the HNG14 Backend Internship. It features a high-performance Demographic Intelligence API.

---

## 📂 Project Structure
- **/hng-stage-0**: The core Next.js application containing all API stages.
  - `GET /api/classify`: Stage 0 - Name Classification.
  - `/api/profiles`: Stage 1 & 2 - Data Persistence & Advanced Query Engine.
  - `/api/profiles/search`: Stage 2 - Natural Language Query Engine.

---

## 🛠️ Tech Stack & Tools
- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Language:** TypeScript
- **Database:** [PostgreSQL](https://neon.tech) via Vercel/Neon
- **ORM:** [Prisma v7](https://prisma.io)
- **Deployment:** [Vercel](https://vercel.com)
- **External APIs:** Genderize.io, Agify.io, Nationalize.io

---

## 📖 API Documentation

### 1. Name Classifier (Stage 0)
`GET /api/classify?name={name}`
Classifies a name by gender with confidence metrics.

### 2. Advanced Query Engine (Stage 2)
`GET /api/profiles`
Supports multi-parameter filtering, sorting, and pagination.
- **Filters:** `gender`, `age_group`, `country_id`, `min_age`, `max_age`, `min_gender_probability`, `min_country_probability`.
- **Sorting:** `sort_by` (age, created_at, gender_probability) | `order` (asc, desc).
- **Pagination:** `page` and `limit` (max 50).

### 3. Natural Language Search (Stage 2 Core)
`GET /api/profiles/search?q={query}`
**Example:** `/api/profiles/search?q=young males from nigeria`

---

## 🧠 Intelligence Query Engine (NLP)

### Approach
The search endpoint uses a **Rule-Based Tokenization** approach. It parses the natural language string using optimized Regular Expressions (Regex) to map plain English keywords into structured database filters.

### Supported Keywords & Mappings

| Keyword | Mapping |
| :--- | :--- |
| `male` / `female` | Maps to `gender` |
| `young` | Maps to age range `16 - 24` |
| `above {X}` / `older than {X}` | Maps to `min_age = X` |
| `adult` / `teenager` etc. | Maps to `age_group` |
| `from {country_name}` | Maps to `country_id` (e.g., Nigeria → NG) |

### Limitations
- **Boolean Logic:** Does not currently support complex "OR" logic (e.g., "Nigeria or Kenya").
- **Synonyms:** Only supports exact keyword matches (e.g., "males" is supported, but "guys" is not).
- **Language:** Currently optimized for English queries only.

---

## ⚙️ Features
- **Data Seeding:** Pre-seeded with 2,026 unique intelligence profiles.
- **UUID v7:** All record IDs follow the time-sortable version 7 UUID standard.
- **CORS Enabled:** `Access-Control-Allow-Origin: *` for grading compatibility.
- **High Performance:** Optimized Prisma queries with specific indexing to prevent full-table scans.

---

## 💻 Local Setup
1. **Clone the repo:**
   ```bash
   git clone https://https://github.com/Goldeno10/HNG14_Internship
   cd hng-stage-0
   ```
2. **Environment Variables:**
   Create a `.env.local` file:
   ```env
   DATABASE_URL="your_prisma_pooling_url"
   DATABASE_URL_UNPOOLED="your_direct_connection_url"
   ```
3. **Database Sync & Seed:**
   ```bash
   npm install
   npx prisma generate
   npx prisma db seed
   ```
4. **Run Server:**
   ```bash
   npm run dev
   ```

---

## 👤 Author
- **GitHub:** [@Goldeno10](https://github.com/Goldeno10)

---
*Updated regularly as I progress through the HNG Internship.*
