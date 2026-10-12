"use client";

import { SiteFooter } from "../../components/layout/site-footer";
import { SiteHeader } from "../../components/layout/site-header";
import { Icon } from "../../components/ui/icon";
import { MotherChildIllustration } from "../../components/ui/mother-child-illustration";
import { ContactLink } from "../../components/ui/contact-link";
import { usePublicSiteContent } from "../../components/layout/public-site-content-provider";

export function HomePage() {
  const content = usePublicSiteContent();
  const activeServices = content.services.filter((service) => service.isActive);
  const activeActivities = content.activities.filter(
    (activity) => activity.isActive,
  );
  const featuredActivity = activeActivities[0];
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
            <div className="hero-note"><span className="note-icon"><Icon name="heart" size={17} /></span><span>{content.profile.name} · {content.profile.title}<br /><strong>{content.profile.description}</strong></span></div>
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
          <div className="service-grid">
            {activeServices.map((service, index) => (
              <article className="service-card" key={service.id}>
                <div className="service-top">
                  <span className="service-icon"><Icon name="heart" size={20} /></span>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description} {service.price ? `· ${service.price}` : ""}{service.duration ? ` · ${service.duration}` : ""}</p>
                <a href="#booking" aria-label={`Tanya tentang ${service.title}`}>Tanya layanan <Icon name="arrow-up-right" size={13} /></a>
              </article>
            ))}
            {!activeServices.length && <p className="admin-empty-content">Informasi layanan akan segera diperbarui.</p>}
          </div>
        </section>

        <section className="appointment-section" id="jadwal"><div className="container appointment-inner"><div><span className="eyebrow">LANGKAH KECIL, HATI LEBIH TENANG</span><h2>Waktu untuk<br /><em>dirimu dan si kecil.</em></h2><p>Cek jam layanan sebelum berkunjung. Hubungi bidan untuk menanyakan slot pemeriksaan, biaya terbaru, dan membuat janji.</p><a className="button button-light" href="#booking">Tanya jadwal <span aria-hidden="true">↗</span></a></div><div className="schedule-card"><div className="schedule-heading"><span>JADWAL PRAKTIK</span><span className="open-pill"><i /> Dengan janji</span></div>{content.schedule.map((item) => <div className="schedule-row" key={item.id}><span>{item.day}</span><div className="schedule-hours"><strong>{item.hours}</strong><small>{item.practitionerName || content.profile.name}</small></div></div>)}<p>* Jadwal dapat berubah. Silakan konfirmasi sebelum berkunjung.</p></div></div></section>

        {featuredActivity && <section className="section container activity-section" id="kegiatan"><div className="section-heading"><div><span className="eyebrow">TUMBUH BERSAMA</span><h2>Ruang untuk bergerak,<br /><em>belajar, dan berbagi.</em></h2></div><p>Kegiatan ringan dan menyenangkan untuk menemani Ibu menjaga kesehatan tubuh dan pikiran.</p></div><article className="activity-card"><div className="activity-art"><span className="activity-sun" /><span className="activity-leaf">✿</span><span className="activity-label">{featuredActivity.category}</span></div><div className="activity-copy"><span className="activity-tag">{featuredActivity.category}</span><h3>{featuredActivity.title}</h3><p>{featuredActivity.description}</p><div className="activity-meta"><span><Icon name="clock" size={14} /> {featuredActivity.date} · {featuredActivity.time}</span><span><Icon name="users" size={14} /> {featuredActivity.location}</span></div><a className="button" href="/kegiatan">Lihat kegiatan <Icon name="arrow-up-right" size={15} /></a></div></article></section>}

        <section className="booking-section" id="booking"><div className="container booking-inner"><span className="booking-flower" aria-hidden="true">✿</span><span className="eyebrow">KAMI SIAP MENEMANI</span><h2>Ada yang ingin Ibu<br /><em>tanyakan?</em></h2><p>Hubungi kami untuk informasi layanan, harga pemeriksaan, jadwal praktik, atau booking kegiatan.</p><ContactLink className="button" message="Halo, saya ingin bertanya tentang layanan dan booking.">Tanya layanan & booking <Icon name="arrow-up-right" size={15} /></ContactLink><small>Konfirmasi harga, jadwal, dan ketersediaan melalui kontak resmi bidan.</small></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
