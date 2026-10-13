/** Correo de contacto público y destinatario por defecto del formulario. */
export const SITE_CONTACT_EMAIL = 'ventas@dgmcloud.dev' as const;

/** WhatsApp de contacto: número internacional sin `+` ni espacios (Perú, +51). */
export const SITE_WHATSAPP_NUMBER = '51921376930' as const;
export const SITE_WHATSAPP_DISPLAY = '921 376 930' as const;

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${SITE_WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
