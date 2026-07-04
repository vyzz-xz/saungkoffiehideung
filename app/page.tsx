import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Facilities from "@/components/Facilities";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="bg-[#FAF8F5] min-h-screen">
      <Navbar />
      <Hero />
      <Story />
      <Facilities />
      <Gallery />
      <Testimonials />
      <Footer />
    </main>
  );
}
