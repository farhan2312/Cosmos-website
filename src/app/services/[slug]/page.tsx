import { notFound } from 'next/navigation';
import content from '@/lib/cosmos-content.json';
import ServiceView from '@/views/ServiceView';
import { meta } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return content.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const s = content.services.find((x) => x.slug === slug);
  return s ? meta(`${s.name} — COSMOS Innovation Labs`, s.intro) : { title: 'Not found', robots: { index: false } };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const index = content.services.findIndex((x) => x.slug === slug);
  if (index < 0) notFound();
  return <ServiceView index={index} />;
}
