import { SiteFooter } from "../../components/layout/site-footer";
import { SiteHeader } from "../../components/layout/site-header";
import { Icon } from "../../components/ui/icon";
import { MotherChildIllustration } from "../../components/ui/mother-child-illustration";

const services = [
  { number: "01", icon: "heart" as const, title: "Pemeriksaan kehamilan", text: "Pantau kesehatan Ibu dan tumbuh kembang janin melalui pemeriksaan serta konsultasi bidan." },
  { number: "02", icon: "users" as const, title: "Layanan ibu & anak", text: "Dapatkan informasi perawatan ibu dan bayi, termasuk konsultasi kesehatan setelah persalinan." },
  { number: "03", icon: "sparkle" as const, title: "Kelas & kegiatan", text: "Cari tahu kegiatan seperti yoga ibu, kelas persiapan persalinan, dan sesi edukasi." },
];

export function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero container">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> SAHABAT PERJALANAN IBU</span>
            <h1>Merawat dengan hati,<br /><em>menemani</em> sepenuh arti.</h1>
            <p className="hero-description">Temukan informasi harga pemeriksaan, layanan, dan jadwal praktik bidan. Tanyakan kebutuhan Ibu atau booking tempat untuk kelas yoga dan kegiatan kesehatan.</p>
            <div className="hero-actions"><a className="button" href="#layanan">Lihat layanan <Icon name="arrow-up-right" size={15} /></a><a className="text-link" href="#jadwal">Lihat jadwal <Icon name="arrow-down" size={14} /></a></div>
            <div className="hero-note"><span className="note-icon"><Icon name="heart" size={17} /></span><span>Informasi layanan bidan dalam satu tempat<br /><strong>Tanyakan detail dan konfirmasi sebelum berkunjung</strong></span></div>
          </div>
          <div className="hero-visual">
            <div className="visual-sun" /><div className="visual-arch"><MotherChildIllustration /></div>
            <div className="floating-card"><span className="floating-icon"><Icon name="sparkle" size={21} /></span><span>Informasi untuk Ibu<br /><strong>Layanan · jadwal · kegiatan</strong></span></div>
            <span className="visual-caption">PERAWATAN IBU & ANAK BERSAMA BIDAN</span>
          </div>
        </section>

        <section className="trust-strip"><div className="container trust-inner"><span>HANGAT & PERSONAL</span><i /> <span>INFORMASI YANG JELAS</span><i /> <span>SELALU ADA UNTUK IBU</span></div></section>

        <section className="section container" id="layanan">
          <div className="section-heading"><div><span className="eyebrow">DUKUNGAN UNTUK IBU</span><h2>Menemani setiap<br />fase <em>perjalananmu.</em></h2></div><p>Dari konsultasi hingga kelas persiapan, temukan dukungan yang sesuai dengan kebutuhan Ibu.</p></div>
          <div className="service-grid">{services.map((service) => <article className="service-card" key={service.number}><div className="service-top"><span className="service-icon"><Icon name={service.icon} size={20} /></span><span>{service.number}</span></div><h3>{service.title}</h3><p>{service.text}</p><a href="#booking" aria-label={`Tanya tentang ${service.title}`}>Tanya layanan <Icon name="arrow-up-right" size={13} /></a></article>)}</div>
        </section>

        <section className="appointment-section" id="jadwal"><div className="container appointment-inner"><div><span className="eyebrow">LANGKAH KECIL, HATI LEBIH TENANG</span><h2>Waktu untuk<br /><em>dirimu dan si kecil.</em></h2><p>Cek jam layanan sebelum berkunjung. Hubungi bidan untuk menanyakan slot pemeriksaan, biaya terbaru, dan membuat janji.</p><a className="button button-light" href="#booking">Tanya jadwal <span aria-hidden="true">↗</span></a></div><div className="schedule-card"><div className="schedule-heading"><span>JADWAL PRAKTIK</span><span className="open-pill"><i /> Dengan janji</span></div><div className="schedule-row"><span>Senin – Jumat</span><strong>08.00 – 16.00</strong></div><div className="schedule-row"><span>Sabtu</span><strong>08.00 – 12.00</strong></div><div className="schedule-row"><span>Minggu & hari libur</span><strong>Dengan janji</strong></div><p>* Jadwal dapat berubah. Silakan konfirmasi sebelum berkunjung.</p></div></div></section>

        <section className="section container activity-section" id="kegiatan"><div className="section-heading"><div><span className="eyebrow">TUMBUH BERSAMA</span><h2>Ruang untuk bergerak,<br /><em>belajar, dan berbagi.</em></h2></div><p>Kegiatan ringan dan menyenangkan untuk menemani Ibu menjaga kesehatan tubuh dan pikiran.</p></div><article className="activity-card"><div className="activity-art"><span className="activity-sun" /><span className="activity-leaf">✿</span><span className="activity-label">BERNAPAS · BERGERAK · BERSAMA</span></div><div className="activity-copy"><span className="activity-tag">KELAS IBU</span><h3>Yoga untuk Ibu</h3><p>Luangkan waktu untuk bernapas, bergerak lembut, dan terhubung dengan tubuh. Terbuka untuk pemula.</p><div className="activity-meta"><span><Icon name="clock" size={14} /> Jadwal menyesuaikan</span><span><Icon name="users" size={14} /> Tempat terbatas</span></div><a className="button" href="#booking">Tanya & booking <span aria-hidden="true">↗</span></a></div></article></section>

        <section className="booking-section" id="booking"><div className="container booking-inner"><span className="booking-flower" aria-hidden="true">✿</span><span className="eyebrow">KAMI SIAP MENEMANI</span><h2>Ada yang ingin Ibu<br /><em>tanyakan?</em></h2><p>Hubungi kami untuk informasi layanan, harga pemeriksaan, jadwal praktik, atau booking kegiatan.</p><a className="button" href="https://wa.me/" target="_blank" rel="noreferrer">Tanya layanan & booking <Icon name="arrow-up-right" size={15} /></a><small>Konfirmasi harga, jadwal, dan ketersediaan melalui kontak resmi bidan.</small></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
