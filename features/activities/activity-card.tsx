import { Icon } from "../../components/ui/icon";

export type Activity = {
  title: string;
  date: string;
  dateLabel: string;
  category: string;
  description: string;
};

export function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <article className="activity-list-card">
      <div className="activity-image-slot" aria-label={`Tempat gambar untuk ${activity.title}`}>
        <span className="image-slot-icon"><Icon name="flower" size={23} /></span>
        <span>Gambar kegiatan</span>
      </div>
      <div className="activity-list-copy">
        <span className="activity-tag">{activity.category}</span>
        <h3>{activity.title}</h3>
        <p className="activity-date"><Icon name="calendar" size={16} /> <time dateTime={activity.date}>{activity.dateLabel}</time></p>
        <p className="activity-description">{activity.description}</p>
        <a className="button" href="#booking">Tanya & booking <Icon name="arrow-up-right" size={15} /></a>
      </div>
    </article>
  );
}
