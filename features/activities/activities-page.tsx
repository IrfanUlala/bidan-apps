"use client";

import { SiteFooter } from "../../components/layout/site-footer";
import { SiteHeader } from "../../components/layout/site-header";
import { Icon } from "../../components/ui/icon";
import { ActivityCard } from "./activity-card";
import { usePublicSiteContent } from "../../components/layout/public-site-content-provider";
import { ContactLink } from "../../components/ui/contact-link";

export function ActivitiesPage() {
  const content = usePublicSiteContent();
  const activities = content.activities.filter((activity) => activity.isActive);
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
          <div className="activities-list">{activities.map((activity) => <ActivityCard key={activity.id} activity={activity} />)}</div>
          <div className="activities-note"><Icon name="heart" size={18} /><p>Kegiatan bukan pengganti pemeriksaan atau saran medis. Konsultasikan kondisi kesehatan Ibu kepada tenaga kesehatan.</p></div>
        </section>
        <section className="booking-section" id="booking"><div className="container booking-inner"><span className="booking-flower" aria-hidden="true"><Icon name="flower" size={25} /></span><span className="eyebrow">KURSI TERBATAS</span><h2>Ingin ikut kegiatan<br /><em>bersama kami?</em></h2><p>Jadwal, lokasi, biaya, dan ketersediaan tempat dapat berubah. Hubungi bidan untuk konfirmasi dan pemesanan.</p><ContactLink className="button" message="Halo, saya ingin bertanya tentang kegiatan.">Tanya & booking <Icon name="arrow-up-right" size={15} /></ContactLink></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
