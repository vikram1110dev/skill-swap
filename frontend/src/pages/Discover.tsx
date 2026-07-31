import React, { useEffect, useState } from 'react';
import api from '../services/api';
import type { UserProfile, Match } from '../types';
import { Search, User as UserIcon } from 'lucide-react';
import ExchangeModal from '../components/ExchangeModal';

export default function Discover() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/discover');
        setUsers(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.skills.some(s => s.skill.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Skills</h1>
        <p className="text-gray-500 mb-6">Search for users offering the skills you want to learn.</p>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by username or skill (e.g., 'React' or 'Spanish')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-gray-800"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map(u => (
          <div key={u.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:border-indigo-300 hover:shadow-md transition-all group flex flex-col h-full">
            <div className="p-6 border-b border-gray-50 bg-gray-50/50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-indigo-100 p-2.5 rounded-full text-indigo-600">
                  <UserIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{u.username}</h3>
                  <p className="text-xs font-medium text-gray-500">{u.city || 'Global'} {u.country ? `• ${u.country}` : ''}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{u.bio || 'No bio provided.'}</p>
            </div>
            
            <div className="p-6 space-y-5 flex-grow">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Teaches</h4>
                <div className="flex flex-wrap gap-2">
                  {u.skills.filter(s => s.skillType === 'OFFERED').map(s => (
                    <span key={s.id} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold border border-indigo-100">
                      {s.skill.name}
                    </span>
                  ))}
                  {u.skills.filter(s => s.skillType === 'OFFERED').length === 0 && <span className="text-xs text-gray-400 italic">None listed</span>}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Wants to Learn</h4>
                <div className="flex flex-wrap gap-2">
                  {u.skills.filter(s => s.skillType === 'REQUESTED').map(s => (
                    <span key={s.id} className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold border border-emerald-100">
                      {s.skill.name}
                    </span>
                  ))}
                  {u.skills.filter(s => s.skillType === 'REQUESTED').length === 0 && <span className="text-xs text-gray-400 italic">None listed</span>}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 mt-auto">
              <button 
                onClick={() => setSelectedUser(u)}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm shadow-indigo-200"
              >
                Propose Exchange
              </button>
            </div>
          </div>
        ))}
        
        {filteredUsers.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No users found</h3>
            <p className="text-gray-500">We couldn't find anyone matching your search criteria.</p>
          </div>
        )}
      </div>

      {selectedUser && (
        <ExchangeModal 
          match={{
            user: selectedUser,
            matchingOfferedSkill: null,
            matchingRequestedSkill: null,
            isTwoWayMatch: false
          }} 
          onClose={() => setSelectedUser(null)} 
        />
      )}
    </div>
  );
}
