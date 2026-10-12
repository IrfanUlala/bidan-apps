"use client";

import { useState, type FormEvent } from "react";
import { CalendarPlus, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import {
  AdminButton,
  DateInput,
  FormLabel,
  TextInput,
  TextareaInput,
} from "../../components/ui/admin-form-controls";
import type { Activity, Service, SiteContent } from "../content/site-content";

export type ContentSection = "profile" | "services" | "schedule" | "activities";

function createId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}

export function SiteContentManager({
  section,
  content,
  onSave,
}: {
  section: ContentSection;
  content: SiteContent;
  onSave: (nextContent: SiteContent) => void;
}) {
  switch (section) {
    case "profile":
      return <ProfileEditor content={content} onSave={onSave} />;
    case "services":
      return <ServicesEditor content={content} onSave={onSave} />;
    case "schedule":
      return <ScheduleEditor content={content} onSave={onSave} />;
    case "activities":
      return <ActivitiesEditor content={content} onSave={onSave} />;
  }
}

function ProfileEditor({
  content,
  onSave,
}: {
  content: SiteContent;
  onSave: (nextContent: SiteContent) => void;
}) {
  const [urlError, setUrlError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const phone = String(form.get("phone") ?? "").trim();
    const whatsappNumber = phone.replace(/\D/g, "");
    let mapsUrl: string | null;
    let iconUrl: string;
    let faviconUrl: string;
    try {
      mapsUrl = nullableUrl(form.get("mapsUrl"));
      iconUrl = validUrl(form.get("iconUrl"));
      faviconUrl = validUrl(form.get("faviconUrl"));
    } catch {
      setUrlError("Tautan hanya boleh berupa URL HTTP/HTTPS yang valid.");
      return;
    }
    setUrlError("");
    onSave({
      ...content,
      practice: {
        ...content.practice,
        businessName: String(form.get("businessName") ?? "").trim(),
        address: String(form.get("address") ?? "").trim(),
        contactHours: String(form.get("contactHours") ?? "").trim(),
        mapsUrl,
        iconUrl,
        faviconUrl,
        whatsappDisplay: phone || "Nomor belum diatur",
        whatsappNumber: whatsappNumber || null,
      },
      profile: {
        ...content.profile,
        name: String(form.get("name") ?? "").trim(),
        title: String(form.get("title") ?? "").trim(),
        description: String(form.get("description") ?? "").trim(),
        phone,
      },
    });
  }

  return (
    <section className="admin-section-content">
      <EditorHeading
        title="Profil usaha"
        description="Atur identitas tempat praktik dan informasi kontak yang ditampilkan di website."
      />
      <form className="admin-panel admin-content-form" onSubmit={submit}>
        <div className="admin-content-form-grid">
          <Field id="businessName" label="Nama usaha" defaultValue={content.practice.businessName} required maxLength={80} />
          <Field id="name" label="Nama bidan" defaultValue={content.profile.name} required maxLength={80} />
          <Field id="title" label="Jabatan atau keterangan" defaultValue={content.profile.title} maxLength={100} />
          <Field id="phone" label="Nomor telepon / WhatsApp" defaultValue={content.profile.phone} type="tel" maxLength={30} placeholder="Contoh: 628123456789" />
          <Field id="contactHours" label="Jam kontak" defaultValue={content.practice.contactHours} maxLength={100} />
          <Field id="address" label="Alamat praktik" defaultValue={content.practice.address} maxLength={200} />
          <Field id="mapsUrl" label="Tautan Google Maps" defaultValue={content.practice.mapsUrl ?? ""} placeholder="https://maps.google.com/…" />
          <Field id="iconUrl" label="URL icon / logo" defaultValue={content.practice.iconUrl} placeholder="https://… atau path aset situs" />
          <Field id="faviconUrl" label="URL favicon" defaultValue={content.practice.faviconUrl} placeholder="https://… atau path aset situs" />
          <div className="admin-content-field admin-content-field-wide">
            <FormLabel htmlFor="description">Deskripsi profil</FormLabel>
            <TextareaInput id="description" name="description" defaultValue={content.profile.description} maxLength={500} rows={4} />
          </div>
        </div>
        <p className="admin-form-help">URL icon dan favicon harus dapat diakses oleh pengunjung. Nomor telepon hanya ditampilkan; tombol WhatsApp tetap nonaktif selama mode DEMO.</p>
        {urlError && <p className="admin-form-error" role="alert">{urlError}</p>}
        <div className="admin-form-actions"><AdminButton variant="primary" type="submit"><Save size={16} aria-hidden="true" /> Simpan profil</AdminButton></div>
      </form>
    </section>
  );
}

function ServicesEditor({
  content,
  onSave,
}: {
  content: SiteContent;
  onSave: (nextContent: SiteContent) => void;
}) {
  function addService(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const service: Service = {
      id: createId("layanan"),
      title: String(form.get("title") ?? "").trim(),
      description: String(form.get("description") ?? "").trim(),
      price: String(form.get("price") ?? "").trim(),
      duration: String(form.get("duration") ?? "").trim(),
      isActive: true,
    };
    onSave({ ...content, services: [...content.services, service] });
    event.currentTarget.reset();
  }

  function updateService(id: string, patch: Partial<Service>) {
    onSave({
      ...content,
      services: content.services.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    });
  }

  function removeService(id: string) {
    if (!window.confirm("Hapus layanan dari website publik?")) return;
    onSave({
      ...content,
      services: content.services.filter((service) => service.id !== id),
    });
  }

  return (
    <section className="admin-section-content">
      <EditorHeading title="Layanan" description="Layanan aktif ditampilkan pada daftar layanan di halaman utama." />
      <form className="admin-panel admin-content-form" onSubmit={addService}>
        <h3 className="admin-content-subtitle"><Plus size={17} aria-hidden="true" /> Tambah layanan</h3>
        <div className="admin-content-form-grid">
          <Field id="service-title" name="title" label="Nama layanan" required maxLength={80} />
          <Field id="service-price" name="price" label="Tarif" maxLength={60} placeholder="Contoh: Rp150.000" />
          <Field id="service-duration" name="duration" label="Durasi" maxLength={50} placeholder="Contoh: 45 menit" />
          <div className="admin-content-field admin-content-field-wide">
            <FormLabel htmlFor="service-description">Deskripsi</FormLabel>
            <TextareaInput id="service-description" name="description" maxLength={300} rows={3} required />
          </div>
        </div>
        <div className="admin-form-actions"><AdminButton variant="primary" type="submit"><Plus size={16} aria-hidden="true" /> Tambah layanan</AdminButton></div>
      </form>
      <div className="admin-content-list">
        {content.services.map((service) => (
          <ServiceEditor
            key={service.id}
            service={service}
            onSave={(patch) => updateService(service.id, patch)}
            onDelete={() => removeService(service.id)}
          />
        ))}
        {!content.services.length && <p className="admin-empty-content">Belum ada layanan. Tambahkan layanan untuk ditampilkan di beranda.</p>}
      </div>
    </section>
  );
}

function ServiceEditor({
  service,
  onSave,
  onDelete,
}: {
  service: Service;
  onSave: (patch: Partial<Service>) => void;
  onDelete: () => void;
}) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    onSave({
      title: String(form.get("title") ?? "").trim(),
      description: String(form.get("description") ?? "").trim(),
      price: String(form.get("price") ?? "").trim(),
      duration: String(form.get("duration") ?? "").trim(),
    });
  }

  return (
    <form className="admin-panel admin-content-form" onSubmit={submit}>
      <div className="admin-content-item-heading">
        <h3>{service.title}</h3>
        <label className="admin-toggle-label">
          <input type="checkbox" checked={service.isActive} onChange={(event) => onSave({ isActive: event.target.checked })} />
          Tampilkan di website
        </label>
      </div>
      <div className="admin-content-form-grid">
        <Field id={`service-name-${service.id}`} name="title" label="Nama layanan" defaultValue={service.title} required maxLength={80} />
        <Field id={`service-price-${service.id}`} name="price" label="Tarif" defaultValue={service.price} maxLength={60} />
        <Field id={`service-duration-${service.id}`} name="duration" label="Durasi" defaultValue={service.duration} maxLength={50} />
        <div className="admin-content-field admin-content-field-wide">
          <FormLabel htmlFor={`service-description-${service.id}`}>Deskripsi</FormLabel>
          <TextareaInput id={`service-description-${service.id}`} name="description" defaultValue={service.description} maxLength={300} rows={3} required />
        </div>
      </div>
      <div className="admin-form-actions">
        <AdminButton variant="danger" type="button" onClick={onDelete}><Trash2 size={15} aria-hidden="true" /> Hapus</AdminButton>
        <AdminButton variant="primary" type="submit"><Save size={15} aria-hidden="true" /> Simpan perubahan</AdminButton>
      </div>
    </form>
  );
}

function ScheduleEditor({
  content,
  onSave,
}: {
  content: SiteContent;
  onSave: (nextContent: SiteContent) => void;
}) {
  const [schedule, setSchedule] = useState(content.schedule);

  function update(
    index: number,
    field: "day" | "hours" | "practitionerName",
    value: string,
  ) {
    setSchedule((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    );
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave({ ...content, schedule });
  }

  return (
    <section className="admin-section-content">
      <EditorHeading title="Jadwal praktik" description="Jadwal ini akan tampil pada bagian Jadwal Praktik di halaman utama." />
      <form className="admin-panel admin-content-form" onSubmit={submit}>
        <div className="admin-schedule-editor">
          {schedule.map((item, index) => (
            <div className="admin-schedule-edit-row" key={item.id}>
              <div className="admin-content-field">
                <FormLabel htmlFor={`schedule-day-${item.id}`}>Hari / periode</FormLabel>
                <TextInput id={`schedule-day-${item.id}`} value={item.day} maxLength={60} required onChange={(event) => update(index, "day", event.target.value)} />
              </div>
              <div className="admin-content-field">
                <FormLabel htmlFor={`schedule-hours-${item.id}`}>Jam praktik</FormLabel>
                <TextInput id={`schedule-hours-${item.id}`} value={item.hours} maxLength={80} required onChange={(event) => update(index, "hours", event.target.value)} />
              </div>
              <div className="admin-content-field">
                <FormLabel htmlFor={`schedule-practitioner-${item.id}`}>Nama bidan praktik</FormLabel>
                <TextInput id={`schedule-practitioner-${item.id}`} value={item.practitionerName ?? content.profile.name} maxLength={80} required onChange={(event) => update(index, "practitionerName", event.target.value)} />
              </div>
              <AdminButton variant="danger" type="button" aria-label={`Hapus jadwal ${item.day}`} onClick={() => setSchedule((current) => current.filter((row) => row.id !== item.id))}><Trash2 size={15} aria-hidden="true" /></AdminButton>
            </div>
          ))}
        </div>
        <div className="admin-form-actions">
          <AdminButton type="button" onClick={() => setSchedule((current) => [...current, { id: createId("jadwal"), day: "", hours: "", practitionerName: content.profile.name }])}><Plus size={15} aria-hidden="true" /> Tambah hari</AdminButton>
          <AdminButton variant="primary" type="submit"><Save size={15} aria-hidden="true" /> Simpan jadwal</AdminButton>
        </div>
      </form>
    </section>
  );
}

function ActivitiesEditor({
  content,
  onSave,
}: {
  content: SiteContent;
  onSave: (nextContent: SiteContent) => void;
}) {
  const [editing, setEditing] = useState<Activity | null>(null);
  const [formKey, setFormKey] = useState(0);

  function startNew() {
    setEditing({
      id: createId("kegiatan"),
      title: "",
      date: "",
      time: "",
      category: "KEGIATAN",
      description: "",
      price: "",
      location: "",
      isActive: true,
    });
    setFormKey((key) => key + 1);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;
    const form = new FormData(event.currentTarget);
    const activity: Activity = {
      ...editing,
      title: String(form.get("title") ?? "").trim(),
      date: String(form.get("date") ?? ""),
      time: String(form.get("time") ?? ""),
      category: String(form.get("category") ?? "").trim(),
      description: String(form.get("description") ?? "").trim(),
      price: String(form.get("price") ?? "").trim(),
      location: String(form.get("location") ?? "").trim(),
      isActive: form.get("isActive") === "on",
    };
    const exists = content.activities.some((item) => item.id === activity.id);
    onSave({
      ...content,
      activities: exists
        ? content.activities.map((item) => item.id === activity.id ? activity : item)
        : [...content.activities, activity],
    });
    setEditing(null);
  }

  function removeActivity(id: string) {
    if (!window.confirm("Hapus kegiatan dari website publik?")) return;
    onSave({
      ...content,
      activities: content.activities.filter((activity) => activity.id !== id),
    });
  }

  return (
    <section className="admin-section-content">
      <div className="admin-page-intro">
        <div><h2>List kegiatan</h2><p>Kegiatan aktif muncul di beranda dan halaman Kegiatan.</p></div>
        <AdminButton variant="primary" type="button" onClick={startNew}><CalendarPlus size={16} aria-hidden="true" /> Tambah kegiatan</AdminButton>
      </div>
      {editing && (
        <form key={formKey} className="admin-panel admin-content-form" onSubmit={submit}>
          <div className="admin-content-item-heading">
            <h3>{content.activities.some((item) => item.id === editing.id) ? "Ubah kegiatan" : "Kegiatan baru"}</h3>
            <AdminButton type="button" aria-label="Tutup form kegiatan" onClick={() => setEditing(null)}><X size={16} aria-hidden="true" /></AdminButton>
          </div>
          <div className="admin-content-form-grid">
            <Field id="activity-title" name="title" label="Nama kegiatan" defaultValue={editing.title} required maxLength={100} />
            <Field id="activity-category" name="category" label="Kategori" defaultValue={editing.category} required maxLength={60} />
            <div className="admin-content-field"><FormLabel htmlFor="activity-date">Tanggal</FormLabel><DateInput id="activity-date" name="date" defaultValue={editing.date} required /></div>
            <div className="admin-content-field"><FormLabel htmlFor="activity-time">Jam</FormLabel><DateInput id="activity-time" name="time" type="time" defaultValue={editing.time} required /></div>
            <Field id="activity-price" name="price" label="Biaya" defaultValue={editing.price} maxLength={60} />
            <Field id="activity-location" name="location" label="Lokasi" defaultValue={editing.location} maxLength={120} />
            <div className="admin-content-field admin-content-field-wide">
              <FormLabel htmlFor="activity-description">Deskripsi</FormLabel>
              <TextareaInput id="activity-description" name="description" defaultValue={editing.description} maxLength={500} rows={4} required />
            </div>
            <FormLabel className="admin-toggle-label admin-content-field-wide">
              <input name="isActive" type="checkbox" defaultChecked={editing.isActive} />
              Tampilkan kegiatan di website publik
            </FormLabel>
          </div>
          <div className="admin-form-actions">
            <AdminButton type="button" onClick={() => setEditing(null)}>Batal</AdminButton>
            <AdminButton variant="primary" type="submit"><Save size={15} aria-hidden="true" /> Simpan kegiatan</AdminButton>
          </div>
        </form>
      )}
      <div className="admin-content-list">
        {content.activities.map((activity) => (
          <article className="admin-panel admin-content-list-item" key={activity.id}>
            <div>
              <span className={`admin-content-state ${activity.isActive ? "active" : ""}`}>{activity.isActive ? "Tayang" : "Disembunyikan"}</span>
              <h3>{activity.title}</h3>
              <p>{activity.date} · {activity.time} · {activity.location}</p>
            </div>
            <div className="admin-content-item-actions">
              <AdminButton type="button" onClick={() => { setEditing(activity); setFormKey((key) => key + 1); }}><Pencil size={15} aria-hidden="true" /> Ubah</AdminButton>
              <AdminButton variant="danger" type="button" onClick={() => removeActivity(activity.id)}><Trash2 size={15} aria-hidden="true" /> Hapus</AdminButton>
            </div>
          </article>
        ))}
        {!content.activities.length && <p className="admin-empty-content">Belum ada kegiatan. Tambahkan acara untuk ditampilkan di website.</p>}
      </div>
    </section>
  );
}

function EditorHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="admin-page-intro">
      <div><h2>{title}</h2><p>{description}</p></div>
    </div>
  );
}

function Field({
  id,
  name = id,
  label,
  defaultValue,
  type = "text",
  required,
  maxLength,
  placeholder,
}: {
  id: string;
  name?: string;
  label: string;
  defaultValue?: string;
  type?: "text" | "tel";
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
}) {
  return (
    <div className="admin-content-field">
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <TextInput id={id} name={name} type={type} defaultValue={defaultValue} required={required} maxLength={maxLength} placeholder={placeholder} />
    </div>
  );
}

function validUrl(value: FormDataEntryValue | null): string {
  const input = String(value ?? "").trim();
  if (!input) return "";
  const url = new URL(input, window.location.origin);
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("URL harus menggunakan HTTP atau HTTPS.");
  }
  return input;
}

function nullableUrl(value: FormDataEntryValue | null): string | null {
  const url = validUrl(value);
  return url || null;
}
