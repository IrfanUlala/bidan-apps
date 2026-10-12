export type BookingStatus =
  | "Menunggu"
  | "Dikonfirmasi"
  | "Selesai"
  | "Dibatalkan";

export type Booking = {
  id: string;
  customerName: string;
  phone: string;
  serviceId: string;
  date: string;
  time: string;
  status: BookingStatus;
  createdAt: string;
  note: string;
};

export type InquiryStatus = "Baru" | "Ditindaklanjuti" | "Selesai";

export type CustomerInquiry = {
  id: string;
  customerName: string;
  topic: string;
  message: string;
  receivedAt: string;
  status: InquiryStatus;
  followUpNote: string;
};

export type AdminDemoData = {
  bookings: Booking[];
  inquiries: CustomerInquiry[];
};

function dateOffset(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dateTimeOffset(days: number, hours: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hours, 0, 0, 0);
  return date.toISOString();
}

export function createDemoData(): AdminDemoData {
  return {
    bookings: [
      {
        id: "BK-26001",
        customerName: "Ayu Lestari",
        phone: "0812-0000-0011 (contoh)",
        serviceId: "antenatal",
        date: dateOffset(0),
        time: "09:00",
        status: "Dikonfirmasi",
        createdAt: dateTimeOffset(-2, 9),
        note: "Booking contoh. Jangan gunakan sebagai data pasien.",
      },
      {
        id: "BK-26002",
        customerName: "Dina Permata",
        phone: "0812-0000-0022 (contoh)",
        serviceId: "postpartum",
        date: dateOffset(0),
        time: "11:00",
        status: "Menunggu",
        createdAt: dateTimeOffset(-1, 11),
        note: "Booking contoh. Jangan gunakan sebagai data pasien.",
      },
      {
        id: "BK-26003",
        customerName: "Siti Rahma",
        phone: "0812-0000-0033 (contoh)",
        serviceId: "classes",
        date: dateOffset(1),
        time: "10:00",
        status: "Menunggu",
        createdAt: dateTimeOffset(-1, 14),
        note: "Booking contoh. Jangan gunakan sebagai data pasien.",
      },
      {
        id: "BK-26004",
        customerName: "Maya Anggraini",
        phone: "0812-0000-0044 (contoh)",
        serviceId: "antenatal",
        date: dateOffset(-3),
        time: "13:00",
        status: "Selesai",
        createdAt: dateTimeOffset(-7, 10),
        note: "Booking contoh. Jangan gunakan sebagai data pasien.",
      },
    ],
    inquiries: [
      {
        id: "TNY-26001",
        customerName: "Nadia Putri",
        topic: "Jadwal praktik",
        message: "Halo, apakah tersedia jadwal konsultasi minggu ini? (contoh)",
        receivedAt: dateTimeOffset(-1, 9),
        status: "Baru",
        followUpNote: "",
      },
      {
        id: "TNY-26002",
        customerName: "Rani Puspita",
        topic: "Biaya layanan",
        message: "Boleh tahu biaya pemeriksaan kehamilan? (contoh)",
        receivedAt: dateTimeOffset(-2, 13),
        status: "Ditindaklanjuti",
        followUpNote: "Contoh tindak lanjut internal — belum dikirim.",
      },
      {
        id: "TNY-26003",
        customerName: "Lala Safitri",
        topic: "Kegiatan",
        message: "Bagaimana cara ikut kelas persiapan persalinan? (contoh)",
        receivedAt: dateTimeOffset(-3, 15),
        status: "Baru",
        followUpNote: "",
      },
    ],
  };
}

export function isAdminDemoData(value: unknown): value is AdminDemoData {
  if (!value || typeof value !== "object") {
    return false;
  }

  const data = value as Partial<AdminDemoData>;
  return (
    Array.isArray(data.bookings) &&
    data.bookings.every(
      (item) =>
        item !== null &&
        typeof item === "object" &&
        typeof item.id === "string" &&
        typeof item.customerName === "string" &&
        typeof item.phone === "string" &&
        typeof item.serviceId === "string" &&
        typeof item.date === "string" &&
        typeof item.time === "string" &&
        ["Menunggu", "Dikonfirmasi", "Selesai", "Dibatalkan"].includes(
          item.status,
        ) &&
        typeof item.createdAt === "string" &&
        typeof item.note === "string",
    ) &&
    Array.isArray(data.inquiries) &&
    data.inquiries.every(
      (item) =>
        item !== null &&
        typeof item === "object" &&
        typeof item.id === "string" &&
        typeof item.customerName === "string" &&
        typeof item.topic === "string" &&
        typeof item.message === "string" &&
        typeof item.receivedAt === "string" &&
        ["Baru", "Ditindaklanjuti", "Selesai"].includes(item.status) &&
        typeof item.followUpNote === "string",
    )
  );
}
