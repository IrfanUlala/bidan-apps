"use client";

import {
  ArrowDownToLine,
  ArrowUpRight,
  CalendarCheck,
  CalendarPlus,
  Check,
  ChevronRight,
  ClipboardList,
  FilePlus2,
  Heart,
  LayoutDashboard,
  MessageCircleMore,
  Plus,
  RotateCcw,
  Search,
  ShieldAlert,
  Trash2,
  Users,
  Wallet,
  X,
} from "lucide-react";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import {
  createDemoData,
  isAdminDemoData,
  type AdminDemoData,
  type Booking,
  type BookingStatus,
  type CustomerInquiry,
  type InquiryStatus,
} from "./admin-data";
import { siteContent } from "../content/site-content";

type AdminSection = "overview" | "bookings" | "inquiries" | "reports";

const storageKey = "ruangbunda-admin-demo-v1";

const navItems: {
  id: AdminSection;
  label: string;
  icon: typeof LayoutDashboard;
}[] = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "bookings", label: "Booking", icon: CalendarCheck },
  { id: "inquiries", label: "Pertanyaan", icon: MessageCircleMore },
  { id: "reports", label: "Laporan", icon: ClipboardList },
];

const bookingStatuses: BookingStatus[] = [
  "Menunggu",
  "Dikonfirmasi",
  "Selesai",
  "Dibatalkan",
];
const inquiryStatuses: InquiryStatus[] = [
  "Baru",
  "Ditindaklanjuti",
  "Selesai",
];

function localDateValue(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function currentMonthValue(): string {
  return localDateValue().slice(0, 7);
}

function formatDate(date: string): string {
  if (!date) return "—";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date.slice(0, 10)}T00:00:00`));
}

function formatTime(date: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function serviceTitle(serviceId: string): string {
  return (
    siteContent.services.find((service) => service.id === serviceId)?.title ??
    "Layanan lain"
  );
}

function servicePrice(serviceId: string): number {
  const price = siteContent.services.find(
    (service) => service.id === serviceId,
  )?.price;
  return price ? Number(price.replace(/\D/g, "")) || 0 : 0;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function escapeCsv(value: string): string {
  return `"${value.replaceAll('"', '""')}"`;
}

function downloadCsv(filename: string, rows: string[][]): void {
  const content = `\uFEFF${rows.map((row) => row.map(escapeCsv).join(",")).join("\r\n")}`;
  const file = new Blob([content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function greetingName(date = new Date()): string {
  const hour = date.getHours();
  if (hour < 11) return "Selamat pagi";
  if (hour < 15) return "Selamat siang";
  if (hour < 19) return "Selamat sore";
  return "Selamat malam";
}

export function AdminDashboard() {
  const [section, setSection] = useState<AdminSection>("overview");
  const [data, setData] = useState<AdminDemoData>({ bookings: [], inquiries: [] });
  const [hydrated, setHydrated] = useState(false);
  const [storageMessage, setStorageMessage] = useState("");
  const [today, setToday] = useState("");
  const [greeting, setGreeting] = useState("");
  const [bookingSearch, setBookingSearch] = useState("");
  const [bookingFilter, setBookingFilter] = useState("Semua status");
  const [inquirySearch, setInquirySearch] = useState("");
  const [inquiryFilter, setInquiryFilter] = useState("Semua status");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [reportMonth, setReportMonth] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) {
          const parsed: unknown = JSON.parse(saved);
          if (!isAdminDemoData(parsed)) {
            throw new Error("Format data admin demo tidak valid.");
          }
          setData(parsed);
        } else {
          setData(createDemoData());
        }
      } catch {
        setData(createDemoData());
        setStorageMessage(
          "Data browser tidak bisa dibaca. Data contoh dimuat kembali; penyimpanan perubahan mungkin tidak tersedia.",
        );
      } finally {
        const now = new Date();
        setToday(localDateValue(now));
        setGreeting(greetingName(now));
        setReportMonth(currentMonthValue());
        setHydrated(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(data));
      } catch {
        setStorageMessage(
          "Perubahan hanya tersedia selama halaman terbuka karena penyimpanan browser tidak tersedia.",
        );
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [data, hydrated]);

  const pendingBookings = data.bookings.filter(
    (booking) => booking.status === "Menunggu",
  );
  const todayBookings = data.bookings.filter(
    (booking) => booking.date === today && booking.status !== "Dibatalkan",
  );
  const newInquiries = data.inquiries.filter(
    (inquiry) => inquiry.status === "Baru",
  );
  const completedBookings = data.bookings.filter(
    (booking) => booking.status === "Selesai",
  );
  const estimatedRevenue = completedBookings.reduce(
    (total, booking) => total + servicePrice(booking.serviceId),
    0,
  );

  const filteredBookings = useMemo(() => {
    const query = bookingSearch.trim().toLocaleLowerCase("id-ID");
    return [...data.bookings]
      .filter(
        (booking) =>
          bookingFilter === "Semua status" || booking.status === bookingFilter,
      )
      .filter((booking) =>
        [booking.id, booking.customerName, booking.phone, serviceTitle(booking.serviceId)]
          .join(" ")
          .toLocaleLowerCase("id-ID")
          .includes(query),
      )
      .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
  }, [bookingFilter, bookingSearch, data.bookings]);

  const filteredInquiries = useMemo(() => {
    const query = inquirySearch.trim().toLocaleLowerCase("id-ID");
    return [...data.inquiries]
      .filter(
        (inquiry) =>
          inquiryFilter === "Semua status" || inquiry.status === inquiryFilter,
      )
      .filter((inquiry) =>
        [inquiry.id, inquiry.customerName, inquiry.topic, inquiry.message]
          .join(" ")
          .toLocaleLowerCase("id-ID")
          .includes(query),
      )
      .sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
  }, [data.inquiries, inquiryFilter, inquirySearch]);

  const selectedMonthBookings = data.bookings.filter(
    (booking) => booking.date.slice(0, 7) === reportMonth,
  );
  const monthlyCompleted = selectedMonthBookings.filter(
    (booking) => booking.status === "Selesai",
  );
  const monthlyRevenue = monthlyCompleted.reduce(
    (total, booking) => total + servicePrice(booking.serviceId),
    0,
  );
  const maxServiceCount = Math.max(
    1,
    ...siteContent.services.map(
      (service) =>
        monthlyCompleted.filter((booking) => booking.serviceId === service.id)
          .length,
    ),
  );

  function updateBookingStatus(id: string, status: BookingStatus) {
    setData((current) => ({
      ...current,
      bookings: current.bookings.map((booking) =>
        booking.id === id ? { ...booking, status } : booking,
      ),
    }));
    setStorageMessage("");
  }

  function deleteBooking(id: string) {
    if (!window.confirm("Hapus booking demo ini? Tindakan ini tidak bisa dibatalkan.")) {
      return;
    }
    setData((current) => ({
      ...current,
      bookings: current.bookings.filter((booking) => booking.id !== id),
    }));
    setStorageMessage("");
  }

  function updateInquiry(id: string, patch: Partial<CustomerInquiry>) {
    setData((current) => ({
      ...current,
      inquiries: current.inquiries.map((inquiry) =>
        inquiry.id === id ? { ...inquiry, ...patch } : inquiry,
      ),
    }));
    setStorageMessage("");
  }

  function deleteInquiry(id: string) {
    if (!window.confirm("Hapus pertanyaan demo ini? Tindakan ini tidak bisa dibatalkan.")) {
      return;
    }
    setData((current) => ({
      ...current,
      inquiries: current.inquiries.filter((inquiry) => inquiry.id !== id),
    }));
    setStorageMessage("");
  }

  function createBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const customerName = String(form.get("customerName") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const serviceId = String(form.get("serviceId") ?? "");
    const date = String(form.get("date") ?? "");
    const time = String(form.get("time") ?? "");
    const note = String(form.get("note") ?? "").trim();

    if (
      !customerName ||
      !phone ||
      !siteContent.services.some((service) => service.id === serviceId) ||
      !date ||
      !time
    ) {
      setStorageMessage("Lengkapi data wajib sebelum membuat booking.");
      return;
    }

    const booking: Booking = {
      id: `BK-${Date.now().toString().slice(-7)}`,
      customerName,
      phone,
      serviceId,
      date,
      time,
      status: "Menunggu",
      createdAt: new Date().toISOString(),
      note: note || "Booking dibuat melalui admin demo.",
    };
    setData((current) => ({
      ...current,
      bookings: [booking, ...current.bookings],
    }));
    setStorageMessage("");
    setShowBookingForm(false);
    event.currentTarget.reset();
  }

  function resetDemoData() {
    if (
      !window.confirm(
        "Kembalikan seluruh booking dan pertanyaan ke data awal demo? Perubahan saat ini akan dihapus.",
      )
    ) {
      return;
    }
    setData(createDemoData());
    setStorageMessage("");
  }

  function exportBookings(bookings: Booking[], filename: string) {
    downloadCsv(filename, [
      [
        "ID booking",
        "Nama (demo)",
        "Kontak (demo)",
        "Layanan",
        "Tanggal",
        "Jam",
        "Status",
        "Catatan",
      ],
      ...bookings.map((booking) => [
        booking.id,
        booking.customerName,
        booking.phone,
        serviceTitle(booking.serviceId),
        booking.date,
        booking.time,
        booking.status,
        booking.note,
      ]),
    ]);
  }

  function exportInquiries(inquiries: CustomerInquiry[]) {
    downloadCsv("ruang-bunda-pertanyaan-demo.csv", [
      ["ID pertanyaan", "Nama (demo)", "Topik", "Pesan", "Diterima", "Status", "Catatan"],
      ...inquiries.map((inquiry) => [
        inquiry.id,
        inquiry.customerName,
        inquiry.topic,
        inquiry.message,
        inquiry.receivedAt,
        inquiry.status,
        inquiry.followUpNote,
      ]),
    ]);
  }

  const titleBySection: Record<AdminSection, string> = {
    overview: "Dashboard",
    bookings: "Kelola booking",
    inquiries: "Pertanyaan pelanggan",
    reports: "Laporan praktik",
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar" aria-label="Navigasi admin">
        <div className="admin-profile">
          <div className="admin-avatar"><Heart size={19} aria-hidden="true" /></div>
          <div><strong>Ruang Bunda</strong><span>Admin praktik · DEMO</span></div>
        </div>
        <span className="admin-nav-label">MENU UTAMA</span>
        <nav className="admin-nav">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              className={section === id ? "admin-nav-item active" : "admin-nav-item"}
              key={id}
              type="button"
              aria-current={section === id ? "page" : undefined}
              onClick={() => setSection(id)}
            >
              <Icon size={17} aria-hidden="true" />
              <span>{label}</span>
              {id === "inquiries" && newInquiries.length > 0 && (
                <span className="admin-nav-count">{newInquiries.length}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <div className="admin-demo-side-note"><ShieldAlert size={16} aria-hidden="true" /><span>Data simulasi. Jangan masukkan data pasien nyata.</span></div>
          <button className="admin-reset-button" type="button" onClick={resetDemoData}>
            <RotateCcw size={15} aria-hidden="true" /> Reset data demo
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-page-header">
          <div>
            <p className="admin-breadcrumb"><Link href="/">Website</Link><ChevronRight size={13} aria-hidden="true" /> Admin</p>
            <h1>{titleBySection[section]}</h1>
          </div>
          <div className="admin-header-actions">
            <span className="admin-current-date">{today ? new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(new Date(`${today}T00:00:00`)) : ""}</span>
            <button className="admin-add-button" type="button" onClick={() => { setSection("bookings"); setShowBookingForm(true); }}>
              <Plus size={16} aria-hidden="true" /> Buat booking
            </button>
          </div>
        </header>

        <div className="admin-warning" role="note">
          <ShieldAlert size={18} aria-hidden="true" />
          <p><strong>ADMIN DEMO — tidak untuk operasional pasien.</strong> Data tersimpan hanya di browser perangkat ini (localStorage), tidak tersinkron ke server, belum memiliki login, dan tidak boleh diisi data pasien sungguhan.</p>
        </div>
        {storageMessage && <p className="admin-storage-message" role="status">{storageMessage}</p>}

        {!hydrated ? (
          <div className="admin-loading" role="status">Memuat dashboard demo…</div>
        ) : (
          <>
            {section === "overview" && (
              <DashboardSection
                bookings={data.bookings}
                inquiries={data.inquiries}
                todayBookings={todayBookings}
                pendingBookings={pendingBookings}
                newInquiries={newInquiries}
                estimatedRevenue={estimatedRevenue}
                today={today}
                greeting={greeting}
                onNavigate={setSection}
              />
            )}
            {section === "bookings" && (
              <BookingsSection
                bookings={filteredBookings}
                query={bookingSearch}
                filter={bookingFilter}
                showForm={showBookingForm}
                onQuery={setBookingSearch}
                onFilter={setBookingFilter}
                onShowForm={() => setShowBookingForm(true)}
                onCloseForm={() => setShowBookingForm(false)}
                onCreate={createBooking}
                onStatus={updateBookingStatus}
                onDelete={deleteBooking}
                onExport={() => exportBookings(filteredBookings, "ruang-bunda-booking-demo.csv")}
              />
            )}
            {section === "inquiries" && (
              <InquiriesSection
                inquiries={filteredInquiries}
                query={inquirySearch}
                filter={inquiryFilter}
                onQuery={setInquirySearch}
                onFilter={setInquiryFilter}
                onUpdate={updateInquiry}
                onDelete={deleteInquiry}
                onExport={() => exportInquiries(filteredInquiries)}
              />
            )}
            {section === "reports" && (
              <ReportsSection
                month={reportMonth}
                bookings={selectedMonthBookings}
                completed={monthlyCompleted}
                revenue={monthlyRevenue}
                maxServiceCount={maxServiceCount}
                onMonth={setReportMonth}
                onExport={() => exportBookings(selectedMonthBookings, `ruang-bunda-laporan-${reportMonth}-demo.csv`)}
              />
            )}
          </>
        )}

        <footer className="admin-footer">
          <span>© Ruang Bunda · Panel admin demo</span>
          <span>Konten situs publik dikelola terpisah di tahap integrasi admin.</span>
        </footer>
      </main>
    </div>
  );
}

function DashboardSection({
  bookings,
  inquiries,
  todayBookings,
  pendingBookings,
  newInquiries,
  estimatedRevenue,
  today,
  greeting,
  onNavigate,
}: {
  bookings: Booking[];
  inquiries: CustomerInquiry[];
  todayBookings: Booking[];
  pendingBookings: Booking[];
  newInquiries: CustomerInquiry[];
  estimatedRevenue: number;
  today: string;
  greeting: string;
  onNavigate: (section: AdminSection) => void;
}) {
  const sortedToday = [...todayBookings].sort((a, b) => a.time.localeCompare(b.time));
  const recentInquiries = [...inquiries]
    .sort((a, b) => b.receivedAt.localeCompare(a.receivedAt))
    .slice(0, 3);
  const completed = bookings.filter((booking) => booking.status === "Selesai").length;
  const confirmed = bookings.filter((booking) => booking.status === "Dikonfirmasi").length;

  return (
    <section className="admin-section-content" aria-label="Ringkasan praktik">
      <div className="admin-welcome">
        <div><p className="admin-eyebrow">RINGKASAN PRAKTIK</p><h2>{greeting}, Bidan Contoh <span aria-hidden="true">✿</span></h2><p>Berikut ringkasan aktivitas Ruang Bunda. Seluruh nama dan angka adalah simulasi.</p></div>
        <button type="button" className="admin-secondary-button" onClick={() => onNavigate("reports")}><ClipboardList size={15} aria-hidden="true" /> Lihat laporan</button>
      </div>
      <div className="admin-stats-grid">
        <StatCard icon={CalendarCheck} label="Booking hari ini" value={String(todayBookings.length)} detail="Termasuk status menunggu" tone="sage" />
        <StatCard icon={CalendarPlus} label="Perlu konfirmasi" value={String(pendingBookings.length)} detail="Booking menunggu tindak lanjut" tone="amber" />
        <StatCard icon={MessageCircleMore} label="Pertanyaan baru" value={String(newInquiries.length)} detail="Belum ditindaklanjuti" tone="rose" />
        <StatCard icon={Wallet} label="Estimasi pendapatan" value={formatCurrency(estimatedRevenue)} detail={`${completed} booking selesai · tarif demo`} tone="blue" />
      </div>
      <div className="admin-overview-grid">
        <section className="admin-panel">
          <div className="admin-panel-heading"><div><h3>Jadwal hari ini</h3><p>{formatDate(today)} · {todayBookings.length} booking</p></div><button type="button" className="admin-text-button" onClick={() => onNavigate("bookings")}>Semua booking <ArrowUpRight size={14} aria-hidden="true" /></button></div>
          {sortedToday.length ? (
            <div className="admin-agenda">{sortedToday.map((booking) => (
              <div className="admin-agenda-row" key={booking.id}><time>{booking.time}</time><span className="admin-agenda-mark" /><div className="admin-agenda-main"><strong>{booking.customerName}</strong><span>{serviceTitle(booking.serviceId)} · {booking.phone}</span></div><StatusBadge status={booking.status} /></div>
            ))}</div>
          ) : <EmptyState title="Belum ada booking hari ini" text="Booking baru akan muncul di agenda ini." />}
          {confirmed > 0 && <p className="admin-inline-note"><Check size={14} aria-hidden="true" /> {confirmed} jadwal sudah dikonfirmasi.</p>}
        </section>
        <section className="admin-panel">
          <div className="admin-panel-heading"><div><h3>Pertanyaan terbaru</h3><p>{newInquiries.length} pertanyaan belum dibaca</p></div><button type="button" className="admin-text-button" onClick={() => onNavigate("inquiries")}>Lihat inbox <ArrowUpRight size={14} aria-hidden="true" /></button></div>
          {recentInquiries.length ? <div className="admin-recent-inquiries">{recentInquiries.map((inquiry) => (
            <button className="admin-inquiry-preview" type="button" key={inquiry.id} onClick={() => onNavigate("inquiries")}><span className="admin-inquiry-avatar">{inquiry.customerName.charAt(0)}</span><span className="admin-inquiry-preview-copy"><strong>{inquiry.customerName}<small>{inquiry.topic}</small></strong><span>{inquiry.message}</span></span><time>{formatTime(inquiry.receivedAt)}</time></button>
          ))}</div> : <EmptyState title="Inbox sudah rapi" text="Pertanyaan pelanggan akan muncul di sini." />}
        </section>
      </div>
      <section className="admin-panel admin-quick-panel">
        <div className="admin-panel-heading"><div><h3>Ringkasan booking</h3><p>Status keseluruhan data demo</p></div><button type="button" className="admin-text-button" onClick={() => onNavigate("bookings")}>Kelola booking <ArrowUpRight size={14} aria-hidden="true" /></button></div>
        <div className="admin-status-summary">{bookingStatuses.map((status) => {
          const count = bookings.filter((booking) => booking.status === status).length;
          return <div key={status}><StatusBadge status={status} /><strong>{count}</strong></div>;
        })}</div>
      </section>
    </section>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: typeof LayoutDashboard;
  label: string;
  value: string;
  detail: string;
  tone: string;
}) {
  return <article className="admin-stat-card"><span className={`admin-stat-icon ${tone}`}><Icon size={18} aria-hidden="true" /></span><span className="admin-stat-label">{label}</span><strong>{value}</strong><span className="admin-stat-detail">{detail}</span></article>;
}

function BookingsSection({
  bookings,
  query,
  filter,
  showForm,
  onQuery,
  onFilter,
  onShowForm,
  onCloseForm,
  onCreate,
  onStatus,
  onDelete,
  onExport,
}: {
  bookings: Booking[];
  query: string;
  filter: string;
  showForm: boolean;
  onQuery: (value: string) => void;
  onFilter: (value: string) => void;
  onShowForm: () => void;
  onCloseForm: () => void;
  onCreate: (event: FormEvent<HTMLFormElement>) => void;
  onStatus: (id: string, status: BookingStatus) => void;
  onDelete: (id: string) => void;
  onExport: () => void;
}) {
  return (
    <section className="admin-section-content">
      <div className="admin-page-intro"><div><h2>Daftar booking</h2><p>Atur jadwal, status, dan informasi booking. Jangan catat detail kesehatan pelanggan.</p></div><div className="admin-action-group"><button className="admin-secondary-button" type="button" onClick={onExport}><ArrowDownToLine size={15} aria-hidden="true" /> Ekspor CSV</button><button className="admin-add-button" type="button" onClick={onShowForm}><Plus size={16} aria-hidden="true" /> Buat booking</button></div></div>
      {showForm && <BookingForm onClose={onCloseForm} onSubmit={onCreate} />}
      <div className="admin-panel admin-table-panel">
        <div className="admin-table-toolbar"><div className="admin-search"><Search size={16} aria-hidden="true" /><label className="sr-only" htmlFor="booking-search">Cari booking</label><input id="booking-search" value={query} onChange={(event) => onQuery(event.target.value)} placeholder="Cari nama, ID, nomor, layanan…" /></div><label className="admin-select-label">Status<select value={filter} onChange={(event) => onFilter(event.target.value)}><option>Semua status</option>{bookingStatuses.map((status) => <option key={status}>{status}</option>)}</select></label><span className="admin-result-count">{bookings.length} booking</span></div>
        <div className="admin-table-scroll"><table className="admin-table"><thead><tr><th>PELANGGAN</th><th>LAYANAN</th><th>JADWAL</th><th>STATUS</th><th>AKSI</th></tr></thead><tbody>
          {bookings.map((booking) => <tr key={booking.id}><td><div className="admin-customer-cell"><span className="admin-table-avatar">{booking.customerName.charAt(0)}</span><span><strong>{booking.customerName}</strong><small>{booking.id} · {booking.phone}</small></span></div></td><td><span className="admin-service-name">{serviceTitle(booking.serviceId)}</span><small className="admin-cell-muted">{formatCurrency(servicePrice(booking.serviceId))} (demo)</small></td><td><strong>{formatDate(booking.date)}</strong><small className="admin-cell-muted">{booking.time} WIB</small></td><td><label className="sr-only" htmlFor={`booking-status-${booking.id}`}>Status booking {booking.customerName}</label><select id={`booking-status-${booking.id}`} className={`admin-status-select ${statusClass(booking.status)}`} value={booking.status} onChange={(event) => onStatus(booking.id, event.target.value as BookingStatus)}>{bookingStatuses.map((status) => <option key={status}>{status}</option>)}</select></td><td><button className="admin-icon-button danger" type="button" aria-label={`Hapus booking ${booking.customerName}`} onClick={() => onDelete(booking.id)}><Trash2 size={15} aria-hidden="true" /></button></td></tr>)}
          {!bookings.length && <tr><td colSpan={5}><EmptyState title="Booking tidak ditemukan" text="Ubah pencarian/filter atau buat booking baru." /></td></tr>}
        </tbody></table></div>
        <p className="admin-table-footnote">Semua pelanggan, nomor, harga, dan booking pada tabel ini adalah data contoh.</p>
      </div>
    </section>
  );
}

function BookingForm({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <section className="admin-panel admin-form-panel" aria-labelledby="new-booking-title">
      <div className="admin-panel-heading"><div><h3 id="new-booking-title"><FilePlus2 size={17} aria-hidden="true" /> Buat booking baru</h3><p>Form demo ini tidak mengirim data ke server.</p></div><button className="admin-icon-button" type="button" aria-label="Tutup form booking" onClick={onClose}><X size={17} aria-hidden="true" /></button></div>
      <form className="admin-form-grid" onSubmit={onSubmit}>
        <label>Nama pelanggan (demo)<input name="customerName" autoComplete="off" maxLength={80} placeholder="Contoh: Ibu Ani" required /></label>
        <label>Nomor kontak (demo)<input name="phone" autoComplete="off" inputMode="tel" maxLength={30} placeholder="Contoh: 08xx-xxxx-xxxx" required /></label>
        <label>Layanan<select name="serviceId" defaultValue="" required><option value="" disabled>Pilih layanan</option>{siteContent.services.map((service) => <option key={service.id} value={service.id}>{service.title} — {service.price}</option>)}</select></label>
        <label>Tanggal<input name="date" type="date" min={localDateValue()} required /></label>
        <label>Jam<input name="time" type="time" required /></label>
        <label className="admin-form-wide">Catatan booking (opsional)<textarea name="note" maxLength={200} placeholder="Catatan administratif saja. Jangan masukkan diagnosis atau data kesehatan." /></label>
        <div className="admin-form-foot"><span>Booking dibuat dengan status Menunggu. Tarif merupakan simulasi.</span><div><button className="admin-secondary-button" type="button" onClick={onClose}>Batal</button><button className="admin-add-button" type="submit"><Check size={15} aria-hidden="true" /> Simpan booking</button></div></div>
      </form>
    </section>
  );
}

function InquiriesSection({
  inquiries,
  query,
  filter,
  onQuery,
  onFilter,
  onUpdate,
  onDelete,
  onExport,
}: {
  inquiries: CustomerInquiry[];
  query: string;
  filter: string;
  onQuery: (value: string) => void;
  onFilter: (value: string) => void;
  onUpdate: (id: string, patch: Partial<CustomerInquiry>) => void;
  onDelete: (id: string) => void;
  onExport: () => void;
}) {
  return (
    <section className="admin-section-content">
      <div className="admin-page-intro"><div><h2>Inbox pertanyaan</h2><p>Tandai pertanyaan yang sudah ditinjau dan catat tindak lanjut internal.</p></div><button className="admin-secondary-button" type="button" onClick={onExport}><ArrowDownToLine size={15} aria-hidden="true" /> Ekspor CSV</button></div>
      <div className="admin-inquiry-stats"><span><strong>{inquiries.length}</strong> percakapan demo</span><span><strong>{inquiries.filter((item) => item.status === "Baru").length}</strong> menunggu ditinjau</span><span><strong>{inquiries.filter((item) => item.status === "Ditindaklanjuti").length}</strong> ditindaklanjuti</span></div>
      <div className="admin-panel admin-table-panel">
        <div className="admin-table-toolbar"><div className="admin-search"><Search size={16} aria-hidden="true" /><label className="sr-only" htmlFor="inquiry-search">Cari pertanyaan</label><input id="inquiry-search" value={query} onChange={(event) => onQuery(event.target.value)} placeholder="Cari nama, topik, atau pesan…" /></div><label className="admin-select-label">Status<select value={filter} onChange={(event) => onFilter(event.target.value)}><option>Semua status</option>{inquiryStatuses.map((status) => <option key={status}>{status}</option>)}</select></label><span className="admin-result-count">{inquiries.length} pertanyaan</span></div>
        <div className="admin-inquiry-list">{inquiries.map((inquiry) => <article className="admin-inquiry-card" key={inquiry.id}>
          <div className="admin-inquiry-card-head"><div className="admin-customer-cell"><span className="admin-table-avatar inquiry-avatar">{inquiry.customerName.charAt(0)}</span><span><strong>{inquiry.customerName}</strong><small>{inquiry.id} · {formatDate(inquiry.receivedAt)} pukul {formatTime(inquiry.receivedAt)}</small></span></div><StatusBadge status={inquiry.status} /></div>
          <span className="admin-inquiry-topic">{inquiry.topic}</span><p className="admin-inquiry-message">{inquiry.message}</p>
          <label className="admin-followup-label" htmlFor={`followup-${inquiry.id}`}>Catatan tindak lanjut internal<textarea id={`followup-${inquiry.id}`} value={inquiry.followUpNote} maxLength={300} placeholder="Catatan singkat, jangan masukkan informasi kesehatan…" onChange={(event) => onUpdate(inquiry.id, { followUpNote: event.target.value })} /></label>
          <div className="admin-inquiry-actions"><label className="sr-only" htmlFor={`inquiry-status-${inquiry.id}`}>Status pertanyaan {inquiry.customerName}</label><select id={`inquiry-status-${inquiry.id}`} className={`admin-status-select ${statusClass(inquiry.status)}`} value={inquiry.status} onChange={(event) => onUpdate(inquiry.id, { status: event.target.value as InquiryStatus })}>{inquiryStatuses.map((status) => <option key={status}>{status}</option>)}</select><button className="admin-icon-button danger" type="button" aria-label={`Hapus pertanyaan ${inquiry.customerName}`} onClick={() => onDelete(inquiry.id)}><Trash2 size={15} aria-hidden="true" /></button></div>
        </article>)}
          {!inquiries.length && <EmptyState title="Pertanyaan tidak ditemukan" text="Ubah pencarian atau filter status." />}
        </div>
        <p className="admin-table-footnote">Pertanyaan yang tampil adalah contoh. Panel ini tidak mengirim balasan ke pelanggan.</p>
      </div>
    </section>
  );
}

function ReportsSection({
  month,
  bookings,
  completed,
  revenue,
  maxServiceCount,
  onMonth,
  onExport,
}: {
  month: string;
  bookings: Booking[];
  completed: Booking[];
  revenue: number;
  maxServiceCount: number;
  onMonth: (value: string) => void;
  onExport: () => void;
}) {
  const counts = bookingStatuses.map((status) => ({
    status,
    count: bookings.filter((booking) => booking.status === status).length,
  }));
  const total = bookings.length || 1;

  return (
    <section className="admin-section-content">
      <div className="admin-page-intro"><div><h2>Laporan ringkas</h2><p>Ringkasan booking dan estimasi pendapatan berdasarkan data demo.</p></div><div className="admin-action-group"><label className="admin-month-filter">Periode<input type="month" value={month} onChange={(event) => onMonth(event.target.value)} /></label><button className="admin-secondary-button" type="button" onClick={onExport}><ArrowDownToLine size={15} aria-hidden="true" /> Ekspor CSV</button></div></div>
      <div className="admin-stats-grid report-stats">
        <StatCard icon={ClipboardList} label="Total booking" value={String(bookings.length)} detail="Dalam periode dipilih" tone="sage" />
        <StatCard icon={Check} label="Selesai" value={String(completed.length)} detail="Booking berstatus selesai" tone="blue" />
        <StatCard icon={Wallet} label="Estimasi pendapatan" value={formatCurrency(revenue)} detail="Tarif layanan contoh" tone="amber" />
        <StatCard icon={Users} label="Rata-rata per booking" value={completed.length ? formatCurrency(Math.round(revenue / completed.length)) : formatCurrency(0)} detail="Dari booking selesai" tone="rose" />
      </div>
      <div className="admin-overview-grid report-grid">
        <section className="admin-panel">
          <div className="admin-panel-heading"><div><h3>Booking menurut status</h3><p>Periode {month || "—"} · data simulasi</p></div></div>
          <div className="admin-report-status">{counts.map(({ status, count }) => <div className="admin-report-status-row" key={status}><div><StatusBadge status={status} /><strong>{count}</strong></div><div className="admin-report-track"><span className={statusClass(status)} style={{ width: `${(count / total) * 100}%` }} /></div></div>)}</div>
        </section>
        <section className="admin-panel">
          <div className="admin-panel-heading"><div><h3>Layanan terpopuler</h3><p>Berdasarkan booking selesai</p></div></div>
          <div className="admin-report-services">{siteContent.services.map((service) => {
            const count = completed.filter((booking) => booking.serviceId === service.id).length;
            return <div className="admin-report-service" key={service.id}><div><span>{service.title}</span><strong>{count} booking</strong></div><div className="admin-report-track"><span style={{ width: `${(count / maxServiceCount) * 100}%` }} /></div></div>;
          })}</div>
        </section>
      </div>
      <div className="admin-report-note"><ShieldAlert size={16} aria-hidden="true" /><p>Laporan bersifat simulasi. Pendapatan hanya estimasi tarif demo untuk booking berstatus Selesai; laporan bukan catatan akuntansi atau rekam medis.</p></div>
    </section>
  );
}

function StatusBadge({ status }: { status: BookingStatus | InquiryStatus }) {
  return <span className={`admin-status-badge ${statusClass(status)}`}>{status}</span>;
}

function statusClass(status: BookingStatus | InquiryStatus): string {
  switch (status) {
    case "Menunggu":
    case "Baru":
      return "waiting";
    case "Dikonfirmasi":
    case "Ditindaklanjuti":
      return "confirmed";
    case "Selesai":
      return "complete";
    case "Dibatalkan":
      return "cancelled";
  }
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return <div className="admin-empty-state"><span><ClipboardList size={18} aria-hidden="true" /></span><strong>{title}</strong><p>{text}</p></div>;
}
