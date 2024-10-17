import Features from '@/components/landing/features'
import Header from '@/components/landing/header'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import AboutUsSection from '@/components/landing/about'


export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Features />
      <AboutUsSection />
      <Footer />
    </>
  )
}
