import IndustriesView from '@/views/IndustriesView';
import { meta } from '@/lib/seo';

export const metadata = meta("Industries — COSMOS Innovation Labs", "Technology that understands your industry.");

export default function Page() {
  return <IndustriesView />;
}
