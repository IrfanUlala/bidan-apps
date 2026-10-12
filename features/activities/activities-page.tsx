import { SiteFooter } from "../../components/layout/site-footer";
import { SiteHeader } from "../../components/layout/site-header";
import { Icon } from "../../components/ui/icon";
import { ActivityCard, type Activity } from "./activity-card";

const activities: Activity[] = [
  { title: "Yoga untuk Ibu", date: "2026-11-07", dateLabel: "Sabtu, 7 November 2026 · 09.00 WIB", category: "GERAK & RELAKSASI", description: "Ikuti gerakan ringan dan latihan pernapasan bersama instruktur. Cocok untuk pemula; sesuaikan gerakan dengan kondisi tubuh dan arahan tenaga kesehatan." },
  { title: "Kelas Persiapan Persalinan", date: "2026-11-14", dateLabel: "Sabtu, 14 November 2026 · 10.00 WIB", category: "KELAS EDUKASI", description: "Pelajari tahapan persalinan, persiapan yang bisa dilakukan, dan peran pendamping. Sesi ditutup dengan tanya jawab bersama bidan." },
  { title: "Perawatan Bayi Baru Lahir", date: "2026-11-21", dateLabel: "Sabtu, 21 November 2026 · 10.00 WIB", category: "DISKUSI & BERBAGI", description: "Diskusi santai tentang perawatan dasar bayi baru lahir dan mengenali kebutuhannya, bersama bidan dan sesama orang tua." },
];

export function ActivitiesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="activities-hero">
          <div className="container activities-hero-inner">
            <span className="eyebrow"><span className="eyebrow-dot" /> KEGIATAN RUANG BUNDA</span>
            <h1>Belajar, bergerak,<br /><em>tumbuh bersama.</em></h1>
            <p>Lihat kegiatan yang tersedia, apa yang akan dilakukan, dan kapan jadwalnya. Jika tertarik, hubungi bidan untuk bertanya atau memesan tempat.</p>
            <a className="text-link" href="#daftar-kegiatan">Lihat kegiatan <Icon name="arrow-down" size={14} /></a>
          </div>
        </section>
        <section className="activities-list-section container" id="daftar-kegiatan">
          <div className="activities-list-heading"><div><span className="eyebrow">AGENDA IBU</span><h2>Pilih kegiatan</h2></div><p>Pilih kegiatan untuk membaca jadwal dan gambaran acaranya. Tanggal, biaya, dan tempat dikonfirmasi saat booking.</p></div>
          <div className="activities-list">{activities.map((activity) => <ActivityCard key={activity.title} activity={activity} />)}</div>
          <div className="activities-note"><Icon name="heart" size={18} /><p>Kegiatan bukan pengganti pemeriksaan atau saran medis. Konsultasikan kondisi kesehatan Ibu kepada tenaga kesehatan.</p></div>
        </section>
        <section className="booking-section" id="booking"><div className="container booking-inner"><span className="booking-flower" aria-hidden="true"><Icon name="flower" size={25} /></span><span className="eyebrow">KURSI TERBATAS</span><h2>Ingin ikut kegiatan<br /><em>bersama kami?</em></h2><p>Jadwal, lokasi, biaya, dan ketersediaan tempat dapat berubah. Hubungi bidan untuk konfirmasi dan pemesanan.</p><a className="button" href="https://wa.me/" target="_blank" rel="noreferrer">Tanya & booking <Icon name="arrow-up-right" size={15} /></a></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
