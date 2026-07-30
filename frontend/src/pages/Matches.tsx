import React, { useEffect, useState } from 'react';
import api from '../services/api';
import type { Match } from '../types';
import { Users, User as UserIcon, Sparkles } from 'lucide-react';
import ExchangeModal from '../components/ExchangeModal';

export default function Matches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await api.get('/matches');
        setMatches(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-md p-8 text-white">
        <div className="flex items-center space-x-4 mb-3">
          <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Your Matches</h1>
            <p className="text-indigo-100 mt-1">We found these users based on what you want to learn and teach.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((m) => (
          <div key={m.user.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:border-indigo-300 hover:shadow-md transition-all group flex flex-col h-full relative">
            {m.isTwoWayMatch && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center shadow-orange-500/20">
                <Sparkles className="w-3 h-3 mr-1" /> Perfect Match
              </div>
            )}
            <div className="p-6 border-b border-gray-50 bg-gray-50/50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-indigo-100 p-2.5 rounded-full text-indigo-600">
                  <UserIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{m.user.username}</h3>
                  <p className="text-xs font-medium text-gray-500">{m.user.city || 'Global'} {m.user.country ? `• ${m.user.country}` : ''}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-5 flex-grow">
              {m.matchingOfferedSkill && (
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">They can teach you</h4>
                  <span className="inline-block px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-semibold border border-indigo-100">
                    {m.matchingOfferedSkill.name}
                  </span>
                </div>
              )}
              {m.matchingRequestedSkill && (
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">You can teach them</h4>
                  <span className="inline-block px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-semibold border border-emerald-100">
                    {m.matchingRequestedSkill.name}
                  </span>
                </div>
              )}
            </div>

            <div className="p-6 pt-0 mt-auto">
              <button 
                onClick={() => setSelectedMatch(m)}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm shadow-indigo-200"
              >
                Propose Exchange
              </button>
            </div>
          </div>
        ))}
        
        {matches.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No matches yet</h3>
            <p className="text-gray-500 max-w-md mx-auto">Add more skills to your profile (both what you teach and what you want to learn) to increase your chances of finding a match.</p>
          </div>
        )}
      </div>

      {selectedMatch && (
        <ExchangeModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />
      )}
    </div>
  );
}
