import HomeView from '@/views/HomeView';
import { meta } from '@/lib/seo';

export const metadata = meta("COSMOS Innovation Labs — Technology that moves business forward", "AI, data and enterprise technology built around the way your business actually works.");

export default function Page() {
  return <HomeView />;
}
