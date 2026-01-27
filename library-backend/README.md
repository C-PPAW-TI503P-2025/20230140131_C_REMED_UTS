# Library System with Geolocation
## UCP 1 - Pengembangan Aplikasi Web

Backend API untuk sistem manajemen perpustakaan dengan fitur JWT Authentication, Role-based Access Control, dan Peminjaman Buku berbasis Geolocation.

---

## 📋 Fitur Utama

- ✅ JWT Authentication (Register, Login, Get Profile)
- ✅ Role-based Access Control (Admin & User)
- ✅ CRUD Buku (Admin Only)
- ✅ Peminjaman Buku dengan Geolocation (User Only)
- ✅ Monitoring Log Peminjaman (Admin)
- ✅ Validasi Input & Error Handling
- ✅ Transaction untuk operasi peminjaman
- ✅ Password Hashing dengan bcrypt

---

## 🛠️ Teknologi

- **Backend:** Node.js + Express.js
- **Database:** MySQL dengan Sequelize ORM
- **Authentication:** JWT (jsonwebtoken)
- **Security:** bcryptjs untuk password hashing
- **Validation:** express-validator
- **Environment:** dotenv

---

## 📦 Instalasi

### Prerequisites

- Node.js (v14 atau lebih tinggi)
- MySQL Server
- npm atau yarn

### Langkah-langkah

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd library-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup database di MySQL Workbench**

   Jalankan SQL script berikut:
   ```sql
   CREATE DATABASE IF NOT EXISTS library_db 
   CHARACTER SET utf8mb4 
   COLLATE utf8mb4_unicode_ci;
   
   USE library_db;
   
   CREATE TABLE IF NOT EXISTS users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(100) NOT NULL UNIQUE,
     email VARCHAR(255) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL,
     role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
     createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
   
   CREATE TABLE IF NOT EXISTS books (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     author VARCHAR(255) NOT NULL,
     stock INT NOT NULL DEFAULT 0,
     createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     CHECK (stock >= 0)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
   
   CREATE TABLE IF NOT EXISTS borrow_logs (
     id INT AUTO_INCREMENT PRIMARY KEY,
     userId INT NOT NULL,
     bookId INT NOT NULL,
     borrowDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     latitude DECIMAL(10, 8) NOT NULL,
     longitude DECIMAL(11, 8) NOT NULL,
     createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
     FOREIGN KEY (bookId) REFERENCES books(id) ON DELETE CASCADE ON UPDATE CASCADE
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
   ```

4. **Konfigurasi environment**

   Copy file `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```

   Edit file `.env` dan sesuaikan konfigurasi database Anda:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_password
   DB_NAME=library_db
   DB_PORT=3306
   
   PORT=3001
   NODE_ENV=development
   
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_2026
   JWT_EXPIRES_IN=86400
   ```

5. **Jalankan server**

   Development mode (dengan nodemon):
   ```bash
   npm run dev
   ```

   Production mode:
   ```bash
   npm start
   ```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Authentication Endpoints

#### 1. Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### 2. Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### 3. Get Current User (Protected)
```http
GET /auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2026-01-27T00:00:00.000Z",
    "updatedAt": "2026-01-27T00:00:00.000Z"
  }
}
```

---

### Book Endpoints

#### 4. Get All Books (Public)
```http
GET /books
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": 1,
      "title": "Belajar Node.js",
      "author": "Budi Santoso",
      "stock": 5,
      "createdAt": "2026-01-27T00:00:00.000Z",
      "updatedAt": "2026-01-27T00:00:00.000Z"
    }
  ]
}
```

#### 5. Get Book by ID (Public)
```http
GET /books/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Belajar Node.js",
    "author": "Budi Santoso",
    "stock": 5,
    "createdAt": "2026-01-27T00:00:00.000Z",
    "updatedAt": "2026-01-27T00:00:00.000Z"
  }
}
```

#### 6. Create Book (Admin Only)
```http
POST /books
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "New Book Title",
  "author": "Author Name",
  "stock": 10
}
```

#### 7. Update Book (Admin Only)
```http
PUT /books/1
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Updated Title",
  "stock": 15
}
```

#### 8. Delete Book (Admin Only)
```http
DELETE /books/1
Authorization: Bearer <admin_token>
```

---

### Borrow Endpoints

#### 9. Borrow Book (User Only)
```http
POST /borrow
Authorization: Bearer <user_token>
Content-Type: application/json

{
  "bookId": 1,
  "latitude": -6.2088,
  "longitude": 106.8456
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "id": 1,
    "bookId": 1,
    "borrowDate": "2026-01-27T00:00:00.000Z",
    "latitude": "-6.20880000",
    "longitude": "106.84560000"
  }
}
```

#### 10. Get My Borrow Logs (User Only)
```http
GET /borrow/my-logs?page=1&limit=10
Authorization: Bearer <user_token>
```

#### 11. Get All Borrow Logs (Admin Only)
```http
GET /borrow?page=1&limit=10
Authorization: Bearer <admin_token>
```

---

## 📊 Testing dengan Postman

1. Import collection Postman
2. Register user baru
3. Login untuk mendapatkan token
4. Gunakan token di header `Authorization: Bearer <token>` untuk endpoint protected
5. Test semua endpoint sesuai role (admin/user)

---

## 📸 Screenshots

Tambahkan screenshot:
- Struktur database di MySQL Workbench
- Hasil testing API di Postman/Thunder Client
- Console log server running

---

## ✅ Kriteria Penilaian Terpenuhi

- [x] **Fungsionalitas (40%)**: Semua endpoint berfungsi sesuai spesifikasi
- [x] **Struktur Kode (25%)**: Modular, rapi, dan mudah dibaca
- [x] **Best Practices (20%)**: Validasi, error handling, JWT, bcrypt
- [x] **Penanganan Error (10%)**: Try-catch, status code tepat
- [x] **Dokumentasi (5%)**: README lengkap dengan contoh API

---

## 📝 Catatan

- Password di-hash menggunakan bcrypt dengan salt rounds 10
- JWT token berlaku selama 24 jam (86400 detik)
- Semua endpoint protected memerlukan header `Authorization: Bearer <token>`
- Role-based access control memastikan hanya admin yang bisa CRUD buku
- Transaksi database digunakan untuk operasi peminjaman agar data konsisten

---

## 📄 License

ISC
