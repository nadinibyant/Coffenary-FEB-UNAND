# Coffenary-FEB-UNAND

# Instalasi

1. Pastikan Anda memiliki Node.js terinstal di sistem Anda. Unduh dari https://nodejs.org  dan ikuti petunjuk instalasinya.
2. Salin repositori ini ke dalam folder lokal Anda.
3. Buka terminal dan arahkan ke direktori proyek.
4. Jalankan perintah berikut untuk menginstal depedensi :
   <h4>npm install</h4>
5. Penginstalan berhasil ketika folder node_modules sudah muncul pada direktori Anda.

# Konfigurasi
1. Buat file `.env` di direktori utama proyek Anda. Isi file tersebut dengan konfigurasi lingkungan yang diperlukan dalam format
  <h6>ACCESS_TOKEN_SECRET = </h6>
  <h6>DB_HOST = </h6>
  <h6>DB_USER = </h6>
  <h6>DB_PASSWORD = </h6>
  <h6>DB_NAME = </h6>
  
2. Isi entri `ACCESS_TOKEN_SECRET` dengan nilai kunci rahasia JWT yang Anda inginkan
3. Isi entri `DB_HOST` , `DB_USER`, `DB_PASSWORD`, dan `DB_NAME` dengan nilai pengkonfigurasian database yang Anda miliki

CONTOH:
<p>ACCESS_TOKEN_SECRET = hadgfafbsdjfeyg</p>
<p>DB_HOST = localhost</p>
<p>DB_USER = iniNamaUsernameDatabase</p>
<p>DB_PASSWORD = iniPassword</p>
<p>DB_NAME = iniNamaDatabase</p>

(Catatan : Untuk data dan table yang ada pada database, bisa diimport menggunakan file sql yang tersedia)

# Penggunaan
1. Jalankan perintah berikut untuk menjalankan proyek pada terminal direktori:
   <h4>npm run start</h4>
   Proyek akan dijalankan dan dapat diakses melalui `http://localhost:3000`
