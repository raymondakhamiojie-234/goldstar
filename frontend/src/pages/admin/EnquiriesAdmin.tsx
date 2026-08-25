import { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, Search } from 'lucide-react';
import api from '../../api/client';

export function EnquiriesAdmin() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await api.get('/enquiries');
        setEnquiries(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEnquiries();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Manage Enquiries</h2>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search enquiries..." 
            className="w-64 bg-zinc-900 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-gold transition-colors"
          />
        </div>
      </div>
      
      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enquiries.map((enq) => (
            <div key={enq.id} className="bg-zinc-900 border border-white/5 rounded-2xl p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-white text-lg">{enq.name}</h3>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(enq.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded text-xs font-bold ${enq.status === 'New' ? 'bg-gold/10 text-gold' : 'bg-green-500/10 text-green-500'}`}>
                  {enq.status || 'New'}
                </span>
              </div>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Phone className="w-4 h-4 text-gray-500" />
                  {enq.phone}
                </div>
                {enq.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Mail className="w-4 h-4 text-gray-500" />
                    {enq.email}
                  </div>
                )}
              </div>
              
              <div className="bg-black rounded-lg p-4 mb-4 flex-grow border border-white/5">
                <p className="text-xs text-gold uppercase tracking-wider mb-2 font-bold">{enq.serviceReq}</p>
                <p className="text-sm text-gray-300 leading-relaxed">{enq.message}</p>
              </div>

              <div className="mt-auto pt-4 border-t border-white/5 flex gap-2">
                <button className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded text-sm font-medium transition-colors">Mark Contacted</button>
              </div>
            </div>
          ))}
          
          {enquiries.length === 0 && (
            <div className="col-span-3 text-center py-12 text-gray-500 bg-zinc-900 border border-white/5 rounded-2xl">
              No enquiries found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
