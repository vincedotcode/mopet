import Community from '@/components/landing/community'
import Features from '@/components/landing/features'
import Header from '@/components/landing/header'
import Faq from '@/components/landing/faq'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Features />
      <Community />
     
      <Footer />
    </>
  )
}
