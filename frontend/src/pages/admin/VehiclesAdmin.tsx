import { useState, useEffect } from 'react';
import { Plus, Trash2, X, Edit2 } from 'lucide-react';
import api, { getImageUrl } from '../../api/client';

const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/')) {
      return resolve('');
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        const maxDim = 1200;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(e.target?.result as string);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
};

export function VehiclesAdmin() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [existingImages, setExistingImages] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const defaultForm = { name: '', brand: '', year: '', price: '', condition: 'USED', description: '', categoryId: '', mileage: '', transmission: '', fuelType: '' };
  const [formData, setFormData] = useState(defaultForm);
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

  const openEditModal = (v: any) => {
    setEditingId(v.id);
    setExistingImages(v.images || []);
    setFormData({
      name: v.name || '',
      brand: v.brand || '',
      year: v.year?.toString() || '',
      price: v.price?.toString() || '',
      condition: v.condition || 'USED',
      description: v.description || '',
      categoryId: v.categoryId || '',
      mileage: v.mileage?.toString() || '',
      transmission: v.transmission || '',
      fuelType: v.fuelType || ''
    });
    setImages(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return;
    try {
      await api.delete(`/vehicles/${id}`);
      fetchVehicles();
    } catch (err) {
      alert('Failed to delete vehicle');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const compressedList: string[] = [];
      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const comp = await compressImage(images[i]);
          if (comp) compressedList.push(comp);
        }
      }

      const payload: any = {
        ...formData
      };
      if (compressedList.length > 0) {
        payload.images = compressedList;
      }

      if (editingId) {
        await api.put(`/vehicles/${editingId}`, payload);
      } else {
        await api.post('/vehicles', payload);
      }

      setIsModalOpen(false);
      setEditingId(null);
      setExistingImages([]);
      setFormData(defaultForm);
      setImages(null);
      fetchVehicles();
    } catch (err: any) {
      console.error('Failed to save vehicle', err);
      alert('Error saving vehicle: ' + (err.response?.data?.details || err.response?.data?.error || err.message));
    } finally {
      setIsSubmitting(false);
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
                      src={getImageUrl(v.images[0].url)}
                      alt={v.name} 
                      className="w-12 h-12 object-cover rounded bg-zinc-800" 
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 bg-zinc-800 rounded flex items-center justify-center text-xs text-gray-600">No img</div>
                  )}
                  <span className="font-medium text-white">{v.name}</span>
                </td>
                <td className="px-6 py-4">{v.price}</td>
                <td className="px-6 py-4">
                  <span className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs font-bold">{v.condition}</span>
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <button onClick={() => openEditModal(v)} className="text-gray-400 hover:text-blue-500"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(v.id)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
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
              <h3 className="text-xl font-bold text-white">{editingId ? 'Edit Vehicle' : 'Add New Vehicle'}</h3>
              <button onClick={() => { setIsModalOpen(false); setEditingId(null); setExistingImages([]); setFormData(defaultForm); }} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
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
                  <label className="block text-xs uppercase text-gray-500 mb-1">Year</label>
                  <input type="number" required value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-1">Price</label>
                  <input type="text" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-1">Condition</label>
                  <select required value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white">
                    <option value="NEW">New</option>
                    <option value="USED">Used</option>
                    <option value="FOREIGN_USED">Foreign Used</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-1">Mileage</label>
                  <input type="number" placeholder="e.g. 50000" value={formData.mileage} onChange={e => setFormData({...formData, mileage: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-1">Transmission</label>
                  <select value={formData.transmission} onChange={e => setFormData({...formData, transmission: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white">
                    <option value="">Select Transmission</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-1">Fuel Type</label>
                  <select value={formData.fuelType} onChange={e => setFormData({...formData, fuelType: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white">
                    <option value="">Select Fuel Type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs uppercase text-gray-500 mb-1">Description</label>
                  <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white resize-none"></textarea>
                </div>
                {editingId && existingImages.length > 0 && (
                  <div className="col-span-2">
                    <label className="block text-xs uppercase text-gray-500 mb-1">Current Saved Images</label>
                    <div className="flex gap-2 flex-wrap mb-2">
                      {existingImages.map((img: any, idx: number) => (
                        <div key={idx} className="relative w-16 h-16 rounded overflow-hidden border border-white/10 bg-zinc-800">
                          <img src={getImageUrl(img.url)} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="col-span-2">
                  <label className="block text-xs uppercase text-gray-500 mb-1">
                    {editingId ? 'Upload New Images (Replaces current images)' : 'Images'}
                  </label>
                  <input type="file" multiple accept="image/*" onChange={e => setImages(e.target.files)} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white" />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => { setIsModalOpen(false); setEditingId(null); setExistingImages([]); setFormData(defaultForm); }} className="px-4 py-2 rounded-lg text-white font-medium hover:bg-white/5">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="bg-gold text-black px-6 py-2 rounded-lg font-bold hover:bg-gold-light disabled:opacity-50">
                  {isSubmitting ? 'Optimizing & Saving...' : 'Save Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
