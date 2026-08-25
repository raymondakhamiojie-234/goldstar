import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Share2, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../../api/client';

export function VehicleDetails() {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await api.get(`/vehicles/${id}`);
        setVehicle(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen pt-32 pb-24 flex items-center justify-center">
        <div className="text-gray-400">Loading vehicle details...</div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="bg-black min-h-screen pt-32 pb-24 flex items-center justify-center">
        <div className="text-gray-400">Vehicle not found.</div>
      </div>
    );
  }

  const whatsappMessage = `Hello Gold Star Engineering Hub, I am interested in the ${vehicle.name}. Please provide more information.`;
  const whatsappUrl = `https://wa.me/2348037186643?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-black min-h-screen pt-24 pb-24">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 mb-4 gap-4">
          <Link to="/vehicles" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors text-sm font-medium">
            <ChevronLeft className="w-4 h-4" /> Back to Inventory
          </Link>
          <div className="flex items-center gap-4">
            <span className="bg-zinc-900 border border-white/10 px-3 py-1 rounded text-xs font-bold text-gray-400 uppercase tracking-wider">
              {vehicle.category?.name || 'Vehicle'}
            </span>
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Images & Overview */}
          <div className="lg:col-span-2">
            
            <div className="mb-8">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">{vehicle.name}</h1>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{vehicle.location || 'Lagos'}</span>
              </div>
            </div>

            {/* Main Image Gallery */}
            <div className="mb-6 rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 aspect-video relative group flex items-center justify-center">
              {vehicle.images && vehicle.images.length > 0 ? (
                <img src={`${import.meta.env.VITE_SERVER_URL || 'http://localhost:5000'}${vehicle.images[activeImage].url}`} alt={vehicle.name} className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-600">No Image Available</div>
              )}
              {vehicle.condition === 'NEW' && (
                <div className="absolute top-6 right-6 bg-gold px-4 py-2 rounded text-sm font-bold text-black uppercase tracking-wider shadow-lg shadow-gold/20">
                  New Arrival
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {vehicle.images && vehicle.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4 mb-12">
                {vehicle.images.map((img: any, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative rounded-xl overflow-hidden aspect-video border-2 transition-all ${activeImage === idx ? 'border-gold scale-105' : 'border-transparent opacity-50 hover:opacity-100'}`}
                  >
                    <img src={`${import.meta.env.VITE_SERVER_URL || 'http://localhost:5000'}${img.url}`} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-2xl mb-12">
              <h3 className="text-2xl font-bold text-white mb-6">Description</h3>
              <p className="text-gray-400 leading-relaxed whitespace-pre-line">{vehicle.description}</p>
            </div>

            {/* Features */}
            {vehicle.features && vehicle.features.length > 0 && (
              <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">Key Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {vehicle.features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Price & Actions (Sticky) */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl sticky top-28">
              
              <div className="mb-8">
                <span className="text-gray-400 uppercase text-xs font-bold tracking-wider mb-2 block">Asking Price</span>
                <div className="text-4xl font-bold text-gold">₦ {vehicle.price.toLocaleString()}</div>
              </div>

              {/* Quick Specs */}
              <div className="space-y-4 mb-8 pb-8 border-b border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Year</span>
                  <span className="text-white font-medium">{vehicle.year}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Condition</span>
                  <span className="text-white font-medium">{vehicle.condition}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Mileage</span>
                  <span className="text-white font-medium">{vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : '-'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Transmission</span>
                  <span className="text-white font-medium">{vehicle.transmission || '-'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Fuel Type</span>
                  <span className="text-white font-medium">{vehicle.fuelType || '-'}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#25D366]/20"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  Enquire on WhatsApp
                </a>
                
                <button className="w-full bg-white/5 hover:bg-gold hover:text-black border border-white/10 hover:border-transparent text-white font-bold py-4 rounded-lg transition-colors">
                  Contact Seller
                </button>
              </div>

              <div className="mt-6 flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/5">
                <AlertCircle className="w-5 h-5 text-gray-400 shrink-0" />
                <p className="text-xs text-gray-400">Please mention the vehicle name when contacting us. Vehicles are subject to prior sale.</p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}