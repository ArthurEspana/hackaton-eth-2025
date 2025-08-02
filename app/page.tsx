import { Hero } from '@/components/Hero';
import { CausasGrid } from '@/components/CausasGrid';
import { Stats } from '@/components/Stats';

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <Stats />
      <CausasGrid />
    </div>
  );
}