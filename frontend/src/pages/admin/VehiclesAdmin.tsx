import { useState, useEffect } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import api from '../../api/client';

export function VehiclesAdmin() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', brand: '', model: '', year: '', price: '', condition: 'USED', description: '', categoryId: ''
  });
  const [images, setImages] = useState<FileList | null>(null);

  const fetchVehicles = async () => {
    try {
      const res = await api.get('/vehicles');
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    
    if (images) {
      for (let i = 0; i < images.length; i++) {
        data.append('images', images[i]);
      }
    }

    try {
      await api.post('/vehicles', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setIsModalOpen(false);
      fetchVehicles();
    } catch (err) {
      console.error('Failed to create vehicle', err);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Manage Vehicles</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gold text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gold-light transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Vehicle
        </button>
      </div>
      
      <div className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-black/50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-6 py-4">Vehicle</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Condition</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {vehicles.map((v) => (
              <tr key={v.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  {v.images?.[0] ? (
                    <img 
                      src={`${import.meta.env.VITE_SERVER_URL || 'http://localhost:5000'}${v.images[0].url}`}
                      alt={v.name} 
                      className="w-12 h-12 object-cover rounded bg-zinc-800" 
                    />
                  ) : (
                    <div className="w-12 h-8 bg-zinc-800 rounded"></div>
                  )}
                  <span className="font-medium text-white">{v.name}</span>
                </td>
                <td className="px-6 py-4">₦ {v.price.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs font-bold">{v.condition}</span>
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <button className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {vehicles.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No vehicles found. Add one!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Add New Vehicle</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-1">Name / Title</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-1">Brand</label>
                  <input required value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-1">Model</label>
                  <input required value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-1">Year</label>
                  <input type="number" required value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-1">Price (₦)</label>
                  <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-1">Condition</label>
                  <select required value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white">
                    <option value="NEW">New</option>
                    <option value="USED">Used</option>
                    <option value="FOREIGN_USED">Foreign Used</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs uppercase text-gray-500 mb-1">Description</label>
                  <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white resize-none"></textarea>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs uppercase text-gray-500 mb-1">Images</label>
                  <input type="file" multiple accept="image/*" onChange={e => setImages(e.target.files)} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white" />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-white font-medium hover:bg-white/5">Cancel</button>
                <button type="submit" className="bg-gold text-black px-6 py-2 rounded-lg font-bold hover:bg-gold-light">Save Vehicle</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
