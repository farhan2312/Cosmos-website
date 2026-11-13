import { notFound } from 'next/navigation';
import content from '@/lib/cosmos-content.json';
import IndustryView from '@/views/IndustryView';
import { meta } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return content.industries.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const s = content.industries.find((x) => x.slug === slug);
  return s ? meta(`${s.name} — COSMOS Innovation Labs`, s.intro) : { title: 'Not found', robots: { index: false } };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const index = content.industries.findIndex((x) => x.slug === slug);
  if (index < 0) notFound();
  return <IndustryView index={index} />;
}
