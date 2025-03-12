import { Hero } from "@/components/hero";
import { Feature } from "@/components/feature";
import { Testimonial } from "@/components/testimonial";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";
export default function Home() {
  return (
    <>
      <div className="bg-gray-50">
        <Hero />
      </div>
      <div>
        <Feature />
      </div>
      <div>
        <Testimonial />
      </div>
      <div>
        <CTA />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
