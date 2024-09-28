

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import Hero from "@/components/adopt/hero-section"
import AdoptPetSection from '@/components/adopt/adopt-section'
export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <AdoptPetSection />
            <Footer />
        </>
    )
}
