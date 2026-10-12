export type Activity = {
  id: string;
  title: string;
  date: string;
  time: string;
  category: string;
  description: string;
  price: string;
  location: string;
  isActive: boolean;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  isActive: boolean;
};

export type SiteContent = {
  isDemo: boolean;
  demoNotice: string;
  practice: {
    businessName: string;
    whatsappNumber: string | null;
    whatsappDisplay: string;
    address: string;
    mapsUrl: string | null;
    contactHours: string;
    iconUrl: string;
    faviconUrl: string;
  };
  profile: {
    name: string;
    title: string;
    description: string;
    phone: string;
  };
  services: Service[];
  schedule: {
    id: string;
    day: string;
    hours: string;
    practitionerName?: string;
  }[];
  activities: Activity[];
  faqs: { question: string; answer: string }[];
};

export const siteContent: SiteContent = {
  isDemo: true,
  demoNotice:
    "Semua nama, harga, jadwal, alamat, dan kegiatan di situs ini adalah data simulasi, bukan informasi praktik sebenarnya.",
  practice: {
    businessName: "Ruang Bunda",
    whatsappNumber: null,
    whatsappDisplay: "08XX-XXXX-XXXX (contoh, tidak aktif)",
    address: "Jl. Contoh No. 00, Kota Contoh",
    mapsUrl: null,
    contactHours: "Senin–Jumat, 08.00–16.00 (contoh)",
    iconUrl: "",
    faviconUrl: "",
  },
  profile: {
    name: "Bidan Contoh",
    title: "Profil tenaga kesehatan · data simulasi",
    description:
      "Nama, pendidikan, pengalaman, dan kredensial bidan akan diisi serta diverifikasi sebelum situs dipublikasikan. Ilustrasi ini bukan foto bidan.",
    phone: "",
  },
  services: [
    {
      id: "antenatal",
      title: "Pemeriksaan kehamilan",
      description:
        "Contoh informasi pemeriksaan kehamilan. Rincian layanan sebenarnya perlu dikonfirmasi kepada bidan.",
      price: "Rp150.000 (contoh)",
      duration: "45 menit (contoh)",
      isActive: true,
    },
    {
      id: "postpartum",
      title: "Konsultasi ibu & anak",
      description:
        "Contoh konsultasi untuk ibu dan anak. Jenis layanan dan cakupannya harus diverifikasi sebelum ditayangkan sebagai informasi resmi.",
      price: "Rp100.000 (contoh)",
      duration: "30 menit (contoh)",
      isActive: true,
    },
    {
      id: "classes",
      title: "Kelas & kegiatan",
      description:
        "Contoh kegiatan edukasi ibu. Tanyakan ketersediaan, persyaratan, dan informasi kegiatan kepada bidan.",
      price: "Rp75.000 (contoh)",
      duration: "60 menit (contoh)",
      isActive: true,
    },
  ],
  schedule: [
    { id: "senin", day: "Senin", hours: "08.00–16.00 (contoh)", practitionerName: "Bidan Contoh" },
    { id: "selasa", day: "Selasa", hours: "08.00–16.00 (contoh)", practitionerName: "Bidan Contoh" },
    { id: "rabu", day: "Rabu", hours: "08.00–16.00 (contoh)", practitionerName: "Bidan Contoh" },
    { id: "kamis", day: "Kamis", hours: "08.00–16.00 (contoh)", practitionerName: "Bidan Contoh" },
    { id: "jumat", day: "Jumat", hours: "08.00–16.00 (contoh)", practitionerName: "Bidan Contoh" },
    { id: "sabtu", day: "Sabtu", hours: "08.00–12.00 (contoh)", practitionerName: "Bidan Contoh" },
    { id: "minggu", day: "Minggu & hari libur", hours: "Dengan janji (contoh)", practitionerName: "Bidan Contoh" },
  ],
  activities: [
    {
      id: "yoga-ibu",
      title: "Yoga untuk Ibu",
      date: "2026-11-07",
      time: "09:00",
      category: "GERAK & RELAKSASI",
      description:
        "Jadwal dan ketersediaan kelas ini adalah data simulasi. Konfirmasikan kegiatan dan kondisi keikutsertaan kepada bidan.",
      price: "Rp50.000 (contoh)",
      location: "Lokasi contoh — belum dikonfirmasi",
      isActive: true,
    },
    {
      id: "kelas-persalinan",
      title: "Kelas Persiapan Persalinan",
      date: "2026-11-14",
      time: "10:00",
      category: "KELAS EDUKASI",
      description:
        "Contoh kegiatan edukasi. Jadwal, materi, dan ketersediaan belum merupakan informasi praktik sebenarnya.",
      price: "Rp75.000 (contoh)",
      location: "Lokasi contoh — belum dikonfirmasi",
      isActive: true,
    },
    {
      id: "perawatan-bayi",
      title: "Perawatan Bayi Baru Lahir",
      date: "2026-11-21",
      time: "10:00",
      category: "DISKUSI & BERBAGI",
      description:
        "Contoh sesi edukasi. Informasi kegiatan harus dikonfirmasi dan tidak menggantikan konsultasi kesehatan.",
      price: "Rp50.000 (contoh)",
      location: "Lokasi contoh — belum dikonfirmasi",
      isActive: true,
    },
  ],
  faqs: [
    {
      question: "Bagaimana cara memastikan jadwal praktik?",
      answer:
        "Jadwal yang tampil adalah data simulasi. Hubungi bidan melalui kontak resmi setelah nomor sebenarnya tersedia, dan konfirmasikan jadwal sebelum datang.",
    },
    {
      question: "Berapa biaya layanan?",
      answer:
        "Semua tarif yang tampil saat ini hanya contoh. Tanyakan biaya resmi dan layanan yang tersedia sebelum membuat janji.",
    },
    {
      question: "Bagaimana cara mendaftar kegiatan?",
      answer:
        "Jadwal, lokasi, dan biaya kegiatan merupakan data simulasi. Pendaftaran sebenarnya belum aktif; booking baru terkonfirmasi setelah mendapat balasan dari bidan.",
    },
    {
      question: "Apakah website atau WhatsApp ini melayani kondisi darurat?",
      answer:
        "Tidak. Website dan pesan bukan layanan darurat atau pengganti pemeriksaan. Jika membutuhkan pertolongan segera, hubungi layanan darurat setempat atau datangi fasilitas kesehatan terdekat tanpa menunggu balasan.",
    },
  ],
};

export function getWhatsAppUrl(message: string): string | null {
  if (siteContent.isDemo) {
    return null;
  }

  const number = siteContent.practice.whatsappNumber;
  if (!number || !/^[1-9]\d{7,14}$/.test(number)) {
    return null;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
