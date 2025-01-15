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
5. pakai package morgan (untuk mendapatkan output middleware tanpa console.log)
6. panggil middleware: logging (thirdy party package) app.use(morgan());
   saat send menghasilkan http metod dan kapan di hit (sesuai dengan console.log yag dibuat manual)
