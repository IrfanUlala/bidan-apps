import { Icon } from "../../components/ui/icon";
import type { Activity } from "../content/site-content";

export function ActivityCard({ activity }: { activity: Activity }) {
  const dateLabel = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${activity.date}T00:00:00`));
  return (
    <article className="activity-list-card">
      <div className="activity-image-slot" aria-label={`Tempat gambar untuk ${activity.title}`}>
        <span className="image-slot-icon"><Icon name="flower" size={23} /></span>
        <span>Gambar kegiatan</span>
      </div>
      <div className="activity-list-copy">
        <span className="activity-tag">{activity.category}</span>
        <h3>{activity.title}</h3>
        <p className="activity-date"><Icon name="calendar" size={16} /> <time dateTime={activity.date}>{dateLabel} · {activity.time} WIB</time></p>
        <p className="activity-description">{activity.description}</p>
        <p className="activity-description">{activity.price} · {activity.location}</p>
        <a className="button" href="#booking">Tanya & booking <Icon name="arrow-up-right" size={15} /></a>
      </div>
    </article>
  );
}
