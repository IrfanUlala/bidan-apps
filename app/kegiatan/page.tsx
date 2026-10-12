import type { Metadata } from "next";
import { ActivitiesPage } from "../../features/activities/activities-page";

export const metadata: Metadata = {
  title: "Kegiatan | Ruang Bunda",
  description: "Lihat jadwal kelas yoga ibu, persiapan persalinan, dan kegiatan kesehatan ibu lainnya.",
};

export default function KegiatanRoute() {
  return <ActivitiesPage />;
}
