import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className=" flex flex-col">
      <Navbar />
      <Hero />
      <Footer />
    </main>
  )
}

