import { useEffect } from "react";
import { useProducts } from "../../hooks/useProducts";
import {
    AboutPreview,
    EmotionCollections,
    FeaturedProducts,
    HeroSection,
    InstagramFeed,
    Testimonials,
} from "../../components/home";

export const Home = () => {
    const { getFeaturedProducts, featuredProducts, loading } = useProducts();

    useEffect(() => {
        getFeaturedProducts();
    }, [getFeaturedProducts]);

    return (
        <div className="min-h-screen overflow-hidden bg-white transition-colors duration-500 dark:bg-[#070707]">
            <HeroSection />
            <EmotionCollections />
            <FeaturedProducts products={featuredProducts} loading={loading} />
            <AboutPreview />
            <Testimonials />
            <InstagramFeed />
        </div>
    );
};
