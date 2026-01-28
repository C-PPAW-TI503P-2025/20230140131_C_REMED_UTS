<img width="1920" height="1080" alt="Screenshot 2026-01-28 145144" src="https://github.com/user-attachments/assets/4d646f60-ce37-47de-bff8-0c8948b62af8" />Sistem Manajemen Perpustakaan

Sistem Manajemen Perpustakaan modern yang dibangun dengan **React** (Frontend) dan **Node.js/Express** (Backend). Aplikasi ini memungkinkan pengguna untuk menelusuri buku, meminjamnya dengan verifikasi geolokasi, dan melihat riwayat peminjaman mereka. Administrator dapat mengelola inventaris buku dan melihat semua log peminjaman.

## 🚀 Fitur

*   **Autentikasi Pengguna**: Login dan Registrasi yang aman untuk Pengguna dan Admin.
*   **Manajemen Buku**: Admin dapat Menambah, Mengedit, dan Menghapus buku.
*   **Sistem Peminjaman**: Pengguna dapat meminjam buku jika masih tersedia stoknya.
*   **Verifikasi Geolokasi**: Peminjaman memerlukan akses lokasi untuk memverifikasi keberadaan pengguna.
*   **Desain Responsif**: UI modern yang dibangun dengan Tailwind CSS, sepenuhnya responsif untuk mobile dan desktop.
*   **Dashboard**: Dashboard khusus untuk Pengguna dan Admin.

## 🛠️ Stack Teknologi

### Frontend
*   **React** (Vite)
*   **Tailwind CSS** (Styling)
*   **Lucide React** (Ikon)
*   **Axios** (Permintaan API)
*   **React Router DOM** (Navigasi)

### Backend
*   **Node.js & Express**
*   **MySQL** (Database)
*   **Sequelize** (ORM)
*   **JWT** (Autentikasi)

## 📦 Panduan Instalasi

Ikuti langkah-langkah berikut untuk mengatur proyek secara lokal.

### Prasyarat
*   Node.js terinstall
*   MySQL terinstall dan berjalan

### 1. Clone Repository
```bash
git clone <url-repository>
cd <folder-repository>
```

### 2. Setup Backend
Navigasi ke folder backend:
```bash
cd library-backend
```

Install dependencies:
```bash
npm install
```

Buat file `.env` di direktori `library-backend`:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=library_db
DB_PORT=3306
JWT_SECRET=kunci_rahasia_jwt_anda
```

Jalankan Database Migrations (Pastikan MySQL berjalan):
```bash
npm run db:migrate
```

Jalankan Backend Server:
```bash
npm run dev
```
Server akan berjalan di `http://localhost:5000`.

### 3. Setup Frontend
Buka terminal baru dan navigasi ke folder frontend:
```bash
cd library-frontend
```

Install dependencies:
```bash
npm install
```

Jalankan Frontend Server:
```bash
npm run dev
```
Aplikasi akan berjalan di `http://localhost:5173`.

## 🔑 Akun Default (Jika Sudah Di-seed)
*   **Admin**: `admin@library.com` / `admin123` (Contoh)
*   **User**: `user@library.com` / `user123` (Contoh)

## 📝 Endpoint API

### Autentikasi
*   `POST /api/auth/register` - Registrasi pengguna baru
*   `POST /api/auth/login` - Login pengguna

### Buku
*   `GET /api/books` - Mendapatkan semua buku
*   `POST /api/books` - Menambah buku baru (Admin)
*   `PUT /api/books/:id` - Update buku (Admin)
*   `DELETE /api/books/:id` - Hapus buku (Admin)

### Peminjaman
*   `POST /api/borrow` - Meminjam buku
*   `GET /api/borrow` - Mendapatkan semua log peminjaman (Admin)
*   `GET /api/borrow/my-logs` - Mendapatkan log peminjaman pengguna


## 💡 Catatan Tambahan (Opsional - bisa ditambahkan di README):
## 📊 Struktur Proyek

```
library-system/
├── library-backend/          # Backend API (Node.js + Express)
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── validations/
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── library-frontend/         # Frontend UI (React + Vite)
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── package.json
```



Tampilan home
<img width="1920" height="1080" alt="Screenshot 2026-01-28 145529" src="https://github.com/user-attachments/assets/802ee89e-828a-44c4-b2a3-909e580090f8" />
<img width="1920" height="1080" alt="Screenshot 2026-01-28 144239" src="https://github.com/user-attachments/assets/17834b7c-f6b7-413c-95bd-768398791026" />
<img width="1920" height="1080" alt="Screenshot 2026-01-28 144346" src="https://github.com/user-attachments/assets/799f80ba-eb9d-4862-bba2-14fed2786b9e" />

User 
<img width="1920" height="1080" alt="Screenshot 2026-01-28 144733" src="https://github.com/user-attachments/assets/6d814012-55dc-42a1-8c66-a4f402d1ce62" />
<img width="1920" height="1080" alt="Screenshot 2026-01-28 144506" src="https://github.com/user-attachments/assets/58af000b-5118-40ac-a8f3-adde394a3944" />


Admin
<img width="1920" height="1080" alt="Screenshot 2026-01-28 145127" src="https://github.com/user-attachments/assets/4ce8134b-573a-4f8f-94f1-18b138162cae" />
<img width="1920" height="1080" alt="Screenshot 2026-01-28 145133" src="https://github.com/user-attachments/assets/18c96ad8-2d20-449b-9b2c-10a56d49f479" />

My sql
<img width="1920" height="1080" alt="Screenshot 2026-01-28 125129" src="https://github.com/user-attachments/assets/1ee4c50a-9726-4e7a-9895-79b6648b0f51" />
<img width="1920" height="1080" alt="Screenshot 2026-01-28 125122" src="https://github.com/user-attachments/assets/a5017754-26a3-475d-8857-6fc6034302a7" />
<img width="1920" height="1080" alt="Screenshot 2026-01-28 125136" src="https://github.com/user-attachments/assets/f042207c-1279-44a1-867e-a665a067ca9e" />

Postman
<img width="1920" height="1080" alt="Screenshot 2026-01-28 001322" src="https://github.com/user-attachments/assets/c5715850-6c23-4b99-b674-c3ba02f21cfe" />
<img width="1920" height="1080" alt="Screenshot 2026-01-28 001251" src="https://github.com/user-attachments/assets/58ecc8c6-cd3d-415f-9017-d3138416c1fe" />
<img width="1920" height="1080" alt="Screenshot 2026-01-28 001212" src="https://github.com/user-attachments/assets/f47ca88f-ccb0-468e-8fec-a2d745e5d713" />
<img width="1920" height="1080" alt="Screenshot 2026-01-28 001136" src="https://github.com/user-attachments/assets/ea9a388a-4d27-4669-ad91-852753390577" />
<img width="1920" height="1080" alt="Screenshot 2026-01-28 001019" src="https://github.com/user-attachments/assets/dffe8eb7-4705-48f9-bd4e-90bf53ffc732" />
<img width="1920" height="1080" alt="Screenshot 2026-01-28 001013" src="https://github.com/user-attachments/assets/a4a49509-935d-4d22-8847-9d5788810629" />
<img width="1920" height="1080" alt="Screenshot 2026-01-28 001006" src="https://github.com/user-attachments/assets/bf92b952-d729-4aed-a4fc-6db40db08442" />
<img width="1920" height="1080" alt="Screenshot 2026-01-28 000956" src="https://github.com/user-attachments/assets/dddab5a1-6746-44d1-837d-70b4d23d8b54" />
<img width="1920" height="1080" alt="Screenshot 2026-01-28 000948" src="https://github.com/user-attachments/assets/171c7e63-2bf9-497c-82af-722959ec9791" />
<img width="1920" height="1080" alt="Screenshot 2026-01-28 001416" src="https://github.com/user-attachments/assets/d204b816-dbc5-40b3-8586-49930eae870b" />

Validasi 
<img width="1920" height="1080" alt="Screenshot 2026-01-28 145619" src="https://github.com/user-attachments/assets/546450dd-84ff-4e9c-9b19-5272245e6ff5" />

Tampilan add di admin
<img width="1920" height="1080" alt="Screenshot 2026-01-28 145144" src="https://github.com/user-attachments/assets/8bc689d0-a6ff-4b57-b5ac-0525a1f04fe4" />



