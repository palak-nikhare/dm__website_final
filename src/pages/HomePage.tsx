import { useNavigate } from 'react-router-dom';
import { Hero } from '@/components/Hero';
import { Highlights } from '@/components/Highlights';
import { PopularThisWeek } from '@/components/PopularThisWeek';
import { Lifestyle } from '@/components/Lifestyle';
import { ColorCollection } from '@/components/ColorCollection';
import { PromoBanner } from '@/components/PromoBanner';
import type { Product } from '@/data/products';

interface HomePageProps {
  onView: (product: Product) => void;
}

export function HomePage({ onView }: HomePageProps) {
  const navigate = useNavigate();

  return (
    <>
      <Hero
        onShopClick={() => navigate('/shop')}
        onTechClick={() => navigate('/technology')}
      />
      <Highlights />
      <PopularThisWeek onView={onView} />
      <Lifestyle />
      <ColorCollection onView={onView} />
      <PromoBanner onShopClick={() => navigate('/shop')} />
    </>
  );
}
