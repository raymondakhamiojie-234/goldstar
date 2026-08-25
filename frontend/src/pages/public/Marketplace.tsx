import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search, ChevronDown, MapPin } from 'lucide-react';
import api from '../../api/client';

export function Marketplace() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('Newest Added');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await api.get('/vehicles');
        setVehicles(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles
    .filter(v => 
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (v.category?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'Price: Low to High') return (a.price || 0) - (b.price || 0);
      if (sortOption === 'Price: High to Low') return (b.price || 0) - (a.price || 0);
      if (sortOption === 'Year: Newest to Oldest') return (b.year || 0) - (a.year || 0);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="bg-black min-h-screen pt-32 pb-24">
      {/* Header */}
      <div className="bg-zinc-950 py-12 border-b border-white/5 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold/10 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Vehicle <span className="text-gradient">Inventory</span></h1>
          <p className="text-gray-400 max-w-2xl text-lg">Browse our premium selection of trailer heads, trucks, buses, and cars. Quality assured and ready for the road.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${filterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gold" /> Filters
                </h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm uppercase text-gray-500 font-bold tracking-wider mb-3">Vehicle Type</h4>
                  <div className="space-y-2">
                    {['All', 'Trailer Heads', 'Trucks', 'Buses', 'Cars'].map(type => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="form-checkbox text-gold bg-black border-white/20 rounded focus:ring-gold focus:ring-offset-black" />
                        <span className="text-gray-300 group-hover:text-gold transition-colors">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm uppercase text-gray-500 font-bold tracking-wider mb-3">Condition</h4>
                  <div className="space-y-2">
                    {['New', 'Used - Excellent', 'Used - Good', 'Refurbished'].map(cond => (
                      <label key={cond} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="form-checkbox text-gold bg-black border-white/20 rounded focus:ring-gold focus:ring-offset-black" />
                        <span className="text-gray-300 group-hover:text-gold transition-colors">{cond}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm uppercase text-gray-500 font-bold tracking-wider mb-3">Price Range (₦)</h4>
                  <div className="flex items-center gap-2">
                    <input type="text" placeholder="Min" className="w-full bg-black border border-white/10 rounded p-2 text-white text-sm" />
                    <span className="text-gray-500">-</span>
                    <input type="text" placeholder="Max" className="w-full bg-black border border-white/10 rounded p-2 text-white text-sm" />
                  </div>
                </div>

                <button className="w-full bg-gold hover:bg-gold-light text-black font-bold py-3 rounded-lg transition-colors">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            
            {/* Search & Sort Bar */}
            <div className="bg-zinc-900 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
              <button 
                className="lg:hidden w-full md:w-auto flex items-center justify-center gap-2 bg-black border border-white/10 p-3 rounded-lg text-white"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="w-4 h-4" /> {filterOpen ? 'Hide Filters' : 'Show Filters'}
              </button>
              
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search vehicles..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <span className="text-sm text-gray-400 whitespace-nowrap">Sort by:</span>
                <div className="relative w-full md:w-48">
                  <select 
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-lg pl-4 pr-10 py-3 text-white focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
                  >
                    <option>Newest Added</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Year: Newest to Oldest</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Vehicle Grid */}
            {loading ? (
              <div className="text-center py-20 text-gray-400">Loading vehicles...</div>
            ) : filteredVehicles.length === 0 ? (
              <div className="text-center py-20 text-gray-400 border border-white/5 rounded-2xl">
                No vehicles match your criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredVehicles.map(vehicle => (
                  <div key={vehicle.id} className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden group hover:border-gold/30 transition-all flex flex-col">
                    <div className="relative h-64 overflow-hidden bg-zinc-800">
                      {vehicle.images?.[0] && (
                        <img src={`http://localhost:5000${vehicle.images[0].url}`} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      )}
                      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded border border-white/10 text-xs font-bold text-white uppercase tracking-wider">
                        {vehicle.category?.name || 'Vehicle'}
                      </div>
                      {vehicle.condition === 'NEW' && (
                        <div className="absolute top-4 right-4 bg-gold px-3 py-1 rounded text-xs font-bold text-black uppercase tracking-wider shadow-lg shadow-gold/20">
                          New
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-gold transition-colors">{vehicle.name}</h3>
                      <div className="text-2xl font-bold text-white mb-4">
                        ₦ {vehicle.price?.toLocaleString()}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-400 mb-6 flex-grow">
                        <div><span className="text-gray-500 mr-2">Year:</span>{vehicle.year}</div>
                        <div><span className="text-gray-500 mr-2">Cond:</span>{vehicle.condition}</div>
                        <div><span className="text-gray-500 mr-2">Miles:</span>{vehicle.mileage?.toLocaleString() || '-'}</div>
                        <div><span className="text-gray-500 mr-2">Trans:</span>{vehicle.transmission || '-'}</div>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                          <MapPin className="w-3 h-3" /> {vehicle.location || 'Lagos'}
                        </div>
                        <Link to={`/vehicles/${vehicle.id}`} className="bg-white/10 hover:bg-gold hover:text-black text-white px-5 py-2 rounded font-bold text-sm transition-colors border border-white/5 hover:border-transparent">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-12 gap-2">
              <button className="w-10 h-10 rounded bg-zinc-900 border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-black transition-colors">&lt;</button>
              <button className="w-10 h-10 rounded bg-gold border border-gold flex items-center justify-center text-black font-bold">1</button>
              <button className="w-10 h-10 rounded bg-zinc-900 border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-black transition-colors">2</button>
              <button className="w-10 h-10 rounded bg-zinc-900 border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-black transition-colors">3</button>
              <button className="w-10 h-10 rounded bg-zinc-900 border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-black transition-colors">&gt;</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}