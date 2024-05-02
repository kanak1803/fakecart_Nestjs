import Image from "next/image";
import HomeBanner from "./Components/HomeBanner";
import ProductCard from "./Components/ProductCard";
import FeaturedProduct from "./Sections/FeaturedProduct";

export default function Home() {
  return (
    <div>
      <main>
        <HomeBanner />
        <div>
          <FeaturedProduct />
        </div>
      </main>
    </div>
  );
}
