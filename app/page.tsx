import BestSellersHero from './components/BestSellersHero';
import WhyChooseUs from './components/WhyChooseUs';
import PromoBanner from './components/PromoBanner';
import FeaturedCategories from './components/FeaturedCategories';
import Testimonials from './components/Testimonials';

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_BASE_URL}/api/books`);
  const books = await res.json();
  return (
    <div>
      <BestSellersHero books={books} />
      <WhyChooseUs />
      <PromoBanner />
      <FeaturedCategories />
      <Testimonials />
    </div>
  );
}
