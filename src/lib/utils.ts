type ClassNameInput = string | number | boolean | null | undefined;

export function cn(...inputs: ClassNameInput[]) {
  return inputs.filter(Boolean).join(' ');
}

export function getServiceHref(id: string): string {
  switch (id) {
    case 'lightbox':
      return '/services/lightboxes';
    case 'flex-neon':
      return '/services/neon';
    case 'pylon-signs':
      return '/services/wayfinding';
    default:
      return `/services/${id}`;
  }
}

