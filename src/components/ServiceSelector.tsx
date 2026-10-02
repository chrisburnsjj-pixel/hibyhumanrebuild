import React from 'react';
import { ServicePill } from './ServicePill';
import { FeedbackBanner } from './FeedbackBanner';

export const SERVICE_OPTIONS = [
  'Web & Apps',
  'AI Solutions',
  'Digital Marketing',
  'Creative & Content',
  'Branding',
  'Other',
] as const;

interface ServiceSelectorProps {
  selectedServices: string[];
  onToggleService: (service: string) => void;
  onLetsTalk: () => void;
}

export function ServiceSelector({
  selectedServices,
  onToggleService,
  onLetsTalk,
}: ServiceSelectorProps) {
  return (
    <div className="w-full">
      {/* Interactive Cyber Neon Service Pills */}
      <div className="flex flex-wrap gap-2.5 sm:gap-3.5 items-center">
        {SERVICE_OPTIONS.map((service) => {
          const isSelected = selectedServices.includes(service);
          return (
            <ServicePill
              key={service}
              label={service}
              isSelected={isSelected}
              onToggle={() => onToggleService(service)}
            />
          );
        })}
      </div>

      {/* Dynamic Tailored Deliverables & Conversion Banner */}
      <FeedbackBanner
        selectedServices={selectedServices}
        onLetsTalk={onLetsTalk}
      />
    </div>
  );
}
