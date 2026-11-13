import AboutView from '@/views/AboutView';
import { meta } from '@/lib/seo';

export const metadata = meta("About — COSMOS Innovation Labs", "COSMOS Innovation Labs is a technology company focused on helping businesses use emerging and enterprise technology in meaningful ways.");

export default function Page() {
  return <AboutView />;
}
