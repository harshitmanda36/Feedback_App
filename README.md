# Simple Feedback App (React + Spring Boot + MySQL)

A minimal full‑stack app where users can submit feedback and view the list. No Docker required.

## Prereqs
- Java 17 (recommended). Spring Boot 3.3 targets Java 17+. If you have Java 24 installed, switch JAVA_HOME to 17 for best compatibility.
- Maven 3.9+
- Node.js 18+
- MySQL 8+ running locally

## 1) MySQL setup
Run the SQL in `sql/setup.sql` (or create your own user/db and update `backend/src/main/resources/application.properties`):
```sql
CREATE DATABASE IF NOT EXISTS feedbackdb;
CREATE USER IF NOT EXISTS 'appuser'@'localhost' IDENTIFIED BY 'apppass';
GRANT ALL PRIVILEGES ON feedbackdb.* TO 'appuser'@'localhost';
FLUSH PRIVILEGES;
```

## 2) Backend
```bash
cd backend
mvn spring-boot:run
```
The API will be on `http://localhost:8080`.

## 3) Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
The app will be on `http://localhost:5173`.

> If your backend port/origin differs, create a `.env` file in `frontend/`:
```
VITE_API_BASE=http://localhost:8080
```

## API
- `GET /api/feedback` – list feedback (newest first)
- `POST /api/feedback` – create feedback
  ```json
  { "name": "Alice", "email": "a@b.com", "rating": 5, "comment": "Great!" }
  ```

## Notes
- CORS allows `http://localhost:5173` by default (set via `app.cors.allowedOrigin` in `application.properties`).
- JPA `ddl-auto=update` will create/update the schema automatically.
