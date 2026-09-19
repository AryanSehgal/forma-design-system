import { notFound } from 'next/navigation';
import { catalog, getComponent } from '@/components/catalog';
import { ComponentPage } from '@/components/component-page';
export function generateStaticParams() {
  return catalog.map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getComponent(slug);
  return { title: c?.name ?? 'Component', description: c?.description };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getComponent(slug);
  if (!c) notFound();
  return <ComponentPage key={slug} component={c} />;
}
