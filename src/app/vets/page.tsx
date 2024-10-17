

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import VetHeroSection from '@/components/vets/vets-hero'
import VetsPage from '@/components/vets/vets'
export default function Home() {
    return (
        <>
            <Navbar />
            <VetHeroSection />
            <VetsPage />
            <Footer />
        </>
    )
}
