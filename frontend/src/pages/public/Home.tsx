import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MapPin, Phone, ShieldCheck, Wrench, Settings, Search, Star, ChevronRight } from 'lucide-react';
import api from '../../api/client';

export function Home() {
  const [enquiryForm, setEnquiryForm] = useState({
    name: '', phone: '', email: '', serviceReq: 'Vehicle Purchase', message: ''
  });
  const [enquiryStatus, setEnquiryStatus] = useState('');

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnquiryStatus('Submitting...');
    try {
      await api.post('/enquiries', enquiryForm);
      setEnquiryStatus('Enquiry sent successfully!');
      setEnquiryForm({ name: '', phone: '', email: '', serviceReq: 'Vehicle Purchase', message: '' });
      setTimeout(() => setEnquiryStatus(''), 5000);
    } catch (err) {
      setEnquiryStatus('Failed to send enquiry.');
    }
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop" 
            alt="Premium Heavy Duty Truck" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-gold/20 backdrop-blur-md mb-8">
            <ShieldCheck className="text-gold w-4 h-4" />
            <span className="text-xs uppercase tracking-widest text-gold-light font-medium">Trusted Automotive Engineering Hub</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight max-w-4xl mx-auto">
            Engineering <span className="text-gradient">Excellence.</span><br />
            Vehicles You Can Trust.
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Gold Star Engineering Hub specializes in premium vehicle sales, expert repairs, and electronic vehicle parts for cars, buses, trucks, and trailer heads.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/vehicles" className="w-full sm:w-auto px-8 py-4 bg-gold hover:bg-gold-light text-black font-bold rounded-full transition-all flex items-center justify-center gap-2 group hover:shadow-[0_0_20px_rgba(255,201,0,0.4)]">
              Explore Our Vehicles
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-full transition-all border border-white/10">
              Contact Us
            </a>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-black relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-gold/20 to-transparent blur-2xl rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073&auto=format&fit=crop" 
                alt="Founder Isiaka Akhamiojie" 
                className="relative rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 w-full object-cover border border-white/10 shadow-2xl"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md p-6 rounded-xl border border-white/10">
                <h3 className="text-white font-bold text-xl">Isiaka Akhamiojie</h3>
                <p className="text-gold text-sm uppercase tracking-wider">Founder & CEO</p>
              </div>
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Driven by <span className="text-gradient">Engineering.</span><br />Built on Trust.
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                At Gold Star Engineering Hub, we don't just sell vehicles; we engineer solutions for your automotive needs. With a relentless focus on reliability, professionalism, and customer satisfaction, we provide premium vehicle sales, expert repairs, and top-tier electronic automotive parts.
              </p>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-4xl font-bold text-white mb-2">10<span className="text-gold">+</span></h4>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Years Experience</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-white mb-2">100<span className="text-gold">+</span></h4>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Vehicles Served</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-white mb-2">500<span className="text-gold">+</span></h4>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Satisfied Customers</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-white mb-2">24/7</h4>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Customer Support</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* Vehicle Categories Section */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Explore Our <span className="text-gold">Vehicles</span></h2>
              <p className="text-gray-400 max-w-xl">Find the perfect vehicle for your personal or commercial needs from our curated selection.</p>
            </div>
            <Link to="/vehicles" className="hidden md:flex items-center gap-2 text-gold hover:text-gold-light font-medium transition-colors">
              View All Inventory <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Trailer Heads", desc: "Heavy-duty for logistics", img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800" },
              { title: "Trucks", desc: "Reliable commercial ops", img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800" },
              { title: "Buses", desc: "Passenger transport", img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800" },
              { title: "Cars", desc: "Quality personal use", img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800" }
            ].map((cat, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gold transition-colors">{cat.title}</h3>
                  <p className="text-sm text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">{cat.desc}</p>
                  <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:text-gold transition-colors">
                    View Vehicles <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-black relative border-y border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Automotive <span className="text-gradient">Engineering Services</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Expert diagnosis, repair, and maintenance for all classes of vehicles.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Wrench, title: "Vehicle Repairs", desc: "Professional mechanical repairs and diagnostics for all vehicle types." },
              { icon: Settings, title: "Vehicle Electronics", desc: "Diagnosis and repair of complex electronic vehicle systems and ECUs." },
              { icon: Search, title: "Vehicle Inspection", desc: "Thorough professional vehicle inspection before purchase." },
              { icon: CheckCircle2, title: "Maintenance", desc: "Routine servicing and preventive maintenance to keep you on the road." },
              { icon: ShieldCheck, title: "Vehicle Diagnostics", desc: "Advanced vehicle fault diagnosis using state-of-the-art scanners." },
              { icon: Settings, title: "Parts Replacement", desc: "Supply and installation of quality automotive parts and components." }
            ].map((srv, i) => (
              <div key={i} className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-gold/30 hover:bg-zinc-900 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                  <srv.icon className="w-32 h-32 text-gold -mr-8 -mt-8" />
                </div>
                <div className="w-14 h-14 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:border-gold/50 transition-colors">
                  <srv.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{srv.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parts Section */}
      <section id="parts" className="py-24 bg-zinc-950">
         <div className="container mx-auto px-4 md:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div>
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Quality Automotive <span className="text-gradient">Electronic Parts</span></h2>
               <p className="text-gray-400 text-lg mb-8">We supply genuine electronic control units, sensors, and diagnostic components to keep your vehicles running at peak performance.</p>
               
               <ul className="space-y-4 mb-10">
                 {['ECU (Electronic Control Units)', 'Sensors & Actuators', 'Vehicle Control Modules', 'Diagnostic Components'].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-gray-300">
                     <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold"><CheckCircle2 className="w-4 h-4" /></div>
                     {item}
                   </li>
                 ))}
               </ul>

               <button className="px-8 py-4 bg-white/10 hover:bg-gold hover:text-black text-white font-bold rounded-full transition-all border border-white/10 hover:border-transparent">
                 Request a Part
               </button>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1563260797-cb5cd70254c8?auto=format&fit=crop&q=80&w=600" alt="Engine Parts" className="rounded-2xl w-full h-64 object-cover mt-8" />
                <img src="https://images.unsplash.com/photo-1486262715619-673c246f6f26?auto=format&fit=crop&q=80&w=600" alt="Electronics" className="rounded-2xl w-full h-64 object-cover" />
             </div>
           </div>
         </div>
      </section>

      {/* Why Choose Us & How It Works */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="container mx-auto px-4 md:px-8">
          
          {/* Why Choose Us */}
          <div className="mb-32">
            <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-16">Why Choose <span className="text-gradient">Gold Star?</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {['Professional Expertise', 'Quality Vehicles', 'Reliable Repairs', 'Genuine Parts', 'Transparent Pricing', 'Customer-Focused', 'Experienced Team', 'Convenient Location'].map((reason, i) => (
                 <div key={i} className="bg-zinc-900/40 border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-zinc-900 hover:border-gold/30 transition-colors">
                    <div className="w-2 h-2 bg-gold rounded-full mb-4"></div>
                    <span className="text-gray-200 font-medium">{reason}</span>
                 </div>
               ))}
            </div>
          </div>

          {/* How It Works */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-16">How It <span className="text-gradient">Works</span></h2>
            <div className="relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent -translate-y-1/2"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { step: "01", title: "Choose a Vehicle" },
                  { step: "02", title: "Inspect & Verify" },
                  { step: "03", title: "Complete Purchase" },
                  { step: "04", title: "Drive Confidently" }
                ].map((s, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-black border-2 border-gold flex items-center justify-center text-xl font-bold text-gold mb-6 shadow-[0_0_20px_rgba(255,201,0,0.2)]">
                      {s.step}
                    </div>
                    <h3 className="text-white font-bold text-lg">{s.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-16">Client <span className="text-gradient">Testimonials</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
             {[1, 2, 3].map((t) => (
               <div key={t} className="bg-black border border-white/10 p-8 rounded-2xl text-left">
                  <div className="flex gap-1 mb-6">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-gold fill-gold" />)}
                  </div>
                  <p className="text-gray-400 italic mb-6 leading-relaxed">"Gold Star made the entire vehicle buying process smooth and professional. Their team was very helpful and the truck condition was exactly as described."</p>
                  <div>
                    <h4 className="text-white font-bold">Chinedu Okafor</h4>
                    <span className="text-gold text-xs uppercase tracking-wider">Logistics Manager</span>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-black relative border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Info & Map */}
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Get In <span className="text-gradient">Touch</span></h2>
              <p className="text-gray-400 mb-8 max-w-md">Ready to purchase a vehicle or need expert engineering services? Reach out to us today.</p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-gold w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Our Location</h4>
                    <p className="text-gray-400 text-sm">Sunrise Park, Sunrise Auto Dealers Association, Sunrise Bus Stop, Apapa/Oshodi Expressway, Lagos, Nigeria.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Phone className="text-gold w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Call Us</h4>
                    <p className="text-gray-400 text-sm">08037186643<br/>07084752096</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="h-64 bg-zinc-900 rounded-2xl overflow-hidden border border-white/10">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7077673994356!2d3.336338415277884!3d6.431622395346083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1684346098048!5m2!1sen!2sng"
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>

            {/* Form */}
            <div className="bg-zinc-900/50 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6">Send an Enquiry</h3>
              
              {enquiryStatus && (
                <div className={`mb-4 p-3 rounded text-sm font-bold ${enquiryStatus.includes('success') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {enquiryStatus}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleEnquirySubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase text-gray-500 mb-2 font-medium">Name</label>
                    <input required value={enquiryForm.name} onChange={e => setEnquiryForm({...enquiryForm, name: e.target.value})} type="text" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-gold transition-colors" placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-gray-500 mb-2 font-medium">Phone Number</label>
                    <input required value={enquiryForm.phone} onChange={e => setEnquiryForm({...enquiryForm, phone: e.target.value})} type="text" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-gold transition-colors" placeholder="Your Phone" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-2 font-medium">Email</label>
                  <input value={enquiryForm.email} onChange={e => setEnquiryForm({...enquiryForm, email: e.target.value})} type="email" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-gold transition-colors" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-2 font-medium">Service Required</label>
                  <select value={enquiryForm.serviceReq} onChange={e => setEnquiryForm({...enquiryForm, serviceReq: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-gold transition-colors appearance-none">
                    <option>Vehicle Purchase</option>
                    <option>Vehicle Repair</option>
                    <option>Electronic Parts</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-2 font-medium">Message</label>
                  <textarea value={enquiryForm.message} onChange={e => setEnquiryForm({...enquiryForm, message: e.target.value})} rows={4} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-gold transition-colors resize-none" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="w-full bg-gold hover:bg-gold-light text-black font-bold py-4 rounded-lg transition-colors">
                  Send Enquiry
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}