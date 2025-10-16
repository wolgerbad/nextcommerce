import BestSellersHero from './components/BestSellersHero';
import WhyChooseUs from './components/WhyChooseUs';
import PromoBanner from './components/PromoBanner';
import FeaturedCategories from './components/FeaturedCategories';
import Testimonials from './components/Testimonials';

export default async function Home() {
  return (
    <div>
      <BestSellersHero />
      <WhyChooseUs />
      <PromoBanner />
      <FeaturedCategories />
      <Testimonials />
    </div>
  );
}
