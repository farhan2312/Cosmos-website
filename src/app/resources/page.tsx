import ResourcesView from '@/views/ResourcesView';
import { meta } from '@/lib/seo';

export const metadata = meta("Resources — COSMOS Innovation Labs", "Insights, case studies, technology perspectives and research from COSMOS Innovation Labs.");

export default function Page() {
  return <ResourcesView />;
}
