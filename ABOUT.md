# Tentang Aplikasi

Aplikasi ini menjadi pusat informasi layanan bidan yang membantu calon pasien mengetahui layanan yang tersedia dan merencanakan kunjungan dengan lebih mudah. Selain informasi pemeriksaan, pengguna dapat melihat kegiatan kesehatan seperti kelas yoga dan melakukan booking.

## Informasi dan fitur

- **Layanan pemeriksaan** — informasi jenis pemeriksaan atau konsultasi yang tersedia.
- **Harga layanan** — gambaran biaya agar pengguna dapat menyiapkan kebutuhan sebelum berkunjung.
- **Jadwal praktik** — informasi hari dan jam layanan bidan.
- **Booking kegiatan** — pemesanan tempat untuk kegiatan seperti yoga, kelas persiapan persalinan, atau kegiatan kesehatan lainnya.
- **Informasi kegiatan** — detail kegiatan, termasuk jadwal dan informasi yang diperlukan sebelum mengikuti.
- **Kontak dan lokasi** — sarana untuk mencari tahu cara menghubungi bidan dan lokasi praktik.
- **Admin demo (`/admin`)** — mengatur profil usaha, URL icon dan favicon, daftar layanan, jadwal praktik, dan kegiatan; perubahan yang disimpan ditampilkan di landing page dan halaman kegiatan pada browser yang sama.
- **Pengelolaan demo** — membuat/memperbarui booking, menindaklanjuti pertanyaan, melihat laporan bulanan, serta mengekspor CSV.

## Batasan demo

Pengaturan konten dan data admin disimpan di `localStorage` browser. Perubahan tidak tersinkron ke server, browser, atau perangkat pengunjung lain; icon dan favicon berupa URL/teks, bukan unggahan file ke server. Panel admin belum memiliki autentikasi, otorisasi, database/backend, atau audit log. Jangan gunakan untuk operasional praktik dan jangan masukkan data pasien sungguhan.

Data bawaan, harga, jadwal, dan kegiatan adalah contoh yang perlu diverifikasi dan disetujui pemilik praktik sebelum publikasi. Website publik tidak memiliki formulir booking. Informasi layanan bukan pengganti konsultasi atau saran medis profesional; untuk kebutuhan pertolongan segera, hubungi layanan darurat setempat atau datangi fasilitas kesehatan terdekat.
