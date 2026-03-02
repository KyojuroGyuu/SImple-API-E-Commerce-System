#  E-Commerce REST API

Proyek ini merupakan backend **E-Commerce REST API** yang dibangun
menggunakan **Node.js**, **Express.js**, dan **MySQL**.\
Aplikasi ini menyediakan fitur manajemen user, produk, dan pemesanan
(order) dengan sistem autentikasi.

Project ini dibuat sebagai bagian dari portofolio untuk menunjukkan
kemampuan dalam membangun RESTful API, pengelolaan database, serta
implementasi authentication dan middleware.

------------------------------------------------------------------------

##  Fitur Utama

-   ✅ Registrasi & Login User
-   ✅ Authentication Middleware (JWT)
-   ✅ CRUD Produk (Shop)
-   ✅ Create & Manage Order
-   ✅ Validasi Input
-   ✅ Koneksi Database MySQL
-   ✅ Struktur MVC (Controller, Routes, Middleware)

------------------------------------------------------------------------

##  Struktur Project

    E-Commerce/
    │
    ├── schema/
    │   └── dump-e_commerce.sql
    │
    ├── src/
    │   ├── controller/
    │   │   ├── users.js
    │   │   ├── shop.js
    │   │   └── order.js
    │   │
    │   ├── middleware/
    │   │   └── authentication.js
    │   │
    │   ├── mysql/
    │   │   └── mysql.js
    │   │
    │   ├── routes/
    │   │   ├── userRoutes.js
    │   │   ├── shopRoutes.js
    │   │   └── orderRoutes.js
    │   │
    │   ├── utils/
    │   │   └── validation.js
    │   │
    │   └── server.js
    │
    └── package.json

------------------------------------------------------------------------

##  Teknologi yang Digunakan

-   Node.js
-   Express.js
-   MySQL
-   JSON Web Token (JWT)
-   REST API Architecture

------------------------------------------------------------------------

##  Cara Menjalankan Project

### 1 Clone Repository

``` bash
git clone <repository-url>
cd E-Commerce
```

### 2 Install Dependencies

``` bash
npm install
```

### 3 Setup Database

-   Buat database di MySQL
-   Import file berikut:

```{=html}
<!-- -->
```
    schema/dump-e_commerce.sql

### 4 Konfigurasi Database

Edit file:

    src/mysql/mysql.js

Sesuaikan konfigurasi:

``` js
host
user
password
database
```

### Jalankan Server

``` bash
npm start
```

atau

``` bash
node src/server.js
```

Server akan berjalan di:

    http://localhost:3000

------------------------------------------------------------------------

## Endpoint API (Contoh)

### User

-   POST /register
-   POST /login

### Shop

-   GET /products
-   POST /products
-   PUT /products/:id
-   DELETE /products/:id

### Order

-   POST /orders
-   GET /orders

------------------------------------------------------------------------

## Authentication

Beberapa endpoint memerlukan JWT Token melalui header:

    Authorization: Bearer <token>

------------------------------------------------------------------------

## Tujuan Pembuatan Project

Project ini dibuat untuk:

-   Melatih pembuatan REST API
-   Mengimplementasikan authentication & middleware
-   Mengelola relasi database MySQL
-   Menunjukkan struktur backend yang clean dan terorganisir
-   Menjadi bagian dari portofolio backend developer

------------------------------------------------------------------------

## Author

Dibuat untuk kebutuhan portofolio dan pembelajaran backend development.
