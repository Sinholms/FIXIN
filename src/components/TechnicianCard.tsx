import { Link } from '@tanstack/react-router'
import { BadgeCheck, MapPin, Star } from 'lucide-react'
import type { Technician } from '../data/technicians'

type TechnicianCardProps = {
  technician: Technician
}

export function TechnicianCard({ technician }: TechnicianCardProps) {
  return (
    <article className="technician-card">
      <div className="tech-photo-wrap">
        <img src={technician.photo} alt={`Foto ${technician.name}`} />
        <span className="rating-badge">
          <Star size={14} fill="currentColor" />
          {technician.rating}
        </span>
      </div>
      <div className="tech-card-body">
        <div className="verified-line">
          <BadgeCheck size={15} />
          Teknisi Terverifikasi
        </div>
        <h3>{technician.name}</h3>
        <p>{technician.specialty}</p>
        <span className="distance-line">
          <MapPin size={14} />
          {technician.distance} - tiba {technician.eta}
        </span>
        <strong>{technician.priceRange}</strong>
        <Link className="primary-button" to="/teknisi/$id" params={{ id: technician.id }}>
          PILIH TEKNISI
        </Link>
      </div>
    </article>
  )
}
