import ContactView from '@/views/ContactView';
import { meta } from '@/lib/seo';

export const metadata = meta("Contact — COSMOS Innovation Labs", "Have a problem worth solving? Let's talk about it.");

export default function Page() {
  return <ContactView />;
}
