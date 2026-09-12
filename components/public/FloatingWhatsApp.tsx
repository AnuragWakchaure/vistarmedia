import { getSettingsAction } from "@/actions/settings.actions";
import FloatingWhatsAppClient from "./FloatingWhatsAppClient";

export default async function FloatingWhatsApp() {
  const settings = await getSettingsAction();

  const rawPhone = settings.whatsappNumber ? settings.whatsappNumber.replace(/[^0-9]/g, "") : "";
  const encodedMsg = encodeURIComponent(settings.whatsappDefaultMessage || "Hello VISTAR team, I want to inquire about influencer campaigns.");
  const whatsappUrl = `https://wa.me/${rawPhone}?text=${encodedMsg}`;

  return <FloatingWhatsAppClient whatsappUrl={whatsappUrl} />;
}
