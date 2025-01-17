# Langkah - Langkah

## Middleware

|| app.js

1. Middleware Reading json from body (client)

2. buat Middleware yang dibuat sendiri
   noted buat middleware diatas routes agar kepanggi untuk semua API
   ini dipakai di proses upload file

3. Middleware Logging
   noted semua bahasa pemrog BE wajib ada logging
   cek output middleware dengan console.log requestTime, username di carController dan handel page note found (app.js)

4. Middleware to handle page not found

5. pakai package morgan (untuk mendapatkan output middleware tanpa console.log) || npm i morgan

6. panggil middleware: logging (thirdy party package) app.use(morgan());
   saat send menghasilkan http metod dan kapan di hit (sesuai dengan console.log yag dibuat manual)

## Middleware untuk Upload file

### Upload di lokal (multer)

- npm i multer

  jika project sudah jalan dan akan menambah kolom potoProfile (jangan hapus file lalu generate) tapi lakukakn langkah ini

7. menambah kolom potoProfile di migration/user
   jika mmasih dilokal lakukan

   - npx sequelize db:migrate:undo:all
   - npx sequelize db:migrate
     hanya migrations file yang berubah karena models hanya dibaca oleh sistem

8. Tambahkan kolom potoProfile di models/user

   - npx sequelize db:seed:all
   - coba hit ulang/get API di postman (ada potoProfile)

9. implementasi multer di userRoute
10. deklarasikan multernya di userRoute
11. panggil/selipin middleware multer || single foto di userRoute
12. panggil hasil proses multer di userController(createUser)

    - coba post di postman (body/form-data) bagian key (photo) dan value (upload file)

13. panggil data user baru dan potoProfile agar muncul/masuk ke database (tidak null) saat di hit di postman || lakukan di proses creatnya dan respon

- ...newUser, photoProfile: req.file.path

noted: file potoProfile yang sudah masuk lokal berbentuk file yang tidak tahu apa bentuknya

### Multer untuk file filtering dan prosesing

- buat file Middlewares untuk menyimpan middleware nodejs express
- buat file uploader.js (buat file sesuai fungsinya)

14. upload file yang ada di userRoute pidah ke uploader

#### Filtering file

15. membuat Filtering (membuat pengaman jika file yang diupload user sesuai) || uploader.js
16. nambah opsion baru untuk filtering
17. buat module.export = upload || uploader.js
18. Panggil upload lewat middleware || userRoute.js

#### Processing file

- npm install imagekit
- imagekit => server untuk simpan file image png jpeg
- package yang menghubungkan dengan sebuah server harus ada penghubung/buat modul sendiri karena ada data kredensialnya
- buat folder baru lib/imagekit.js
- buat dan modul.export imagekit

19. import modul imagekit di userController
20. membuat processing file nya || userController
21. upload image ke server
22. buat validasi
    req.file.path diganti uploadedImage.url (13)

## Dashboard Admin

(menggunakan template engine in express js ejs)

- npm i ejs
- buat folder views
  a. panggil view engine di app.js
  b. buat url/API dashboard (buat file di views/index.ejs)
  c. middleware : bisa express aplication kita membaca static file || app.js (agar bisa membaca file di public)
  d. buat Dashboard Route di routes/dashboardRoute.js || panggil di app.js
  dan buat dashbordController

### get user

e. buat get user di dashboarRoute dan dashboardController
f. buat di view users/index.ejs (seting isinya agar menarik saat tampil data usernya)

### create user

g. buat create user di dashboardController dan dashboardRoute
h. buat file users/create.ejs
i. setting create user di dshboardCntroller
j. tambah route post di dashbordRoute
k. Middleware : agar dari view engine form kebaca (request body) nya
http://localhost:3002/dashboard/admin/

output:

<p align="center">
  <img src="public/images/output/Screenshot (1319).png" alt="alt text" width="300" />
  <img src="public/images/output/Screenshot (1320).png" alt="alt text" width="300" />
  <img src="public/images/output/Screenshot (1321).png" alt="alt text" width="300" />
</p>
