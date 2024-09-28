import Community from '@/sections/community'
import Features from '@/sections/features'
import Header from '@/sections/header'
import Faq from '@/sections/faq'
import Pricing from '@/sections/pricing'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Features />
      <Community />
      <Faq />
      <Pricing />
      <Footer />
    </>
  )
}
