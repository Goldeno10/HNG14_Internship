# HNG Stage 0 - Name Classifier API
A simple, high-performance API built for the HNG Internship Backend Track (Stage 0). This service integrates with the Genderize.io API to classify names by gender, providing confidence scores and metadata.
## 🚀 Live Demo- **API Base URL:** [https://vercel.app](https://vercel.app)
- **Endpoint:** `/api/classify?name=john`
## 🛠️ Tech Stack- **Framework:** [Next.js](https://nextjs.org) (App Router)- **Language:** TypeScript
- **Deployment:** [Vercel](https://vercel.com)
- **External API:** [Genderize.io](https://genderize.io)
## 📖 API Documentation### 1. Classify NameReturns gender prediction and confidence metrics for a given name.

**Endpoint:** `GET /api/classify?name={name}`

**Query Parameters:**

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `name`    | string | Yes      | The name to classify |

**Success Response (200 OK):**
```json
 {
   "status": "success",
   "data": {
     "name": "john",
     "gender": "male",
     "probability": 0.99,
     "sample_size": 1234,
     "is_confident": true,
     "processed_at": "2026-04-01T12:00:00Z"
   }
 }

Error Responses:

* 400 Bad Request: Missing or empty name parameter.
* 422 Unprocessable Entity: Name is not a valid string.
* 200 OK (Logic Error): No prediction available for the provided name.

## ⚙️ Features

* CORS Enabled: Supports Access-Control-Allow-Origin: * for cross-origin grading scripts.
* Strict Validation: Handles missing, empty, or invalid name parameters.
* Confidence Logic: Determines is_confident based on a probability ≥ 0.7 AND a sample size ≥ 100.
* Fast Response: Optimized for sub-500ms processing.

## 💻 Local Setup

   1. Clone the repo:
   
   git clone https://github.com
   cd hng-stage-0
   
   2. Install dependencies:
   
   npm install
   
   3. Run development server:
   
   npm run dev
   
   The API will be available at http://localhost:3000/api/classify?name=peter.

## 📄 License
MIT



