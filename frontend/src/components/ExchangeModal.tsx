import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import type { Match } from '../types';
import api from '../services/api';
import { useAuth } from '../store/AuthContext';

interface Props {
  match: Match;
  onClose: () => void;
}

export default function ExchangeModal({ match, onClose }: Props) {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [selectedOffered, setSelectedOffered] = useState<number | ''>(match.matchingRequestedSkill?.id || '');
  const [selectedRequested, setSelectedRequested] = useState<number | ''>(match.matchingOfferedSkill?.id || '');

  // Deduplicate options
  const theirOfferedSkills = match.user.skills.filter(s => s.skillType === 'OFFERED').map(s => s.skill);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOffered || !selectedRequested) {
      setError('Please select both skills for the exchange');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await api.post('/exchanges', {
        receiverId: match.user.id,
        offeredSkillId: Number(selectedOffered),
        requestedSkillId: Number(selectedRequested),
        message
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send request');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Propose Exchange with {match.user.username}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {success ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Request Sent!</h3>
            <p className="text-gray-500">We've notified {match.user.username}. You can track this in your Exchanges tab.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
            {error && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">{error}</div>}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What will you teach them?</label>
                <select 
                  value={selectedOffered} 
                  onChange={(e) => setSelectedOffered(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                  required
                >
                  <option value="" disabled>Select a skill you offer...</option>
                  {match.matchingRequestedSkill && (
                    <option value={match.matchingRequestedSkill.id}>{match.matchingRequestedSkill.name} (Perfect Match)</option>
                  )}
                  {user?.skills.filter(s => s.skillType === 'OFFERED').map(s => {
                    // Don't show duplicates if it's already the perfect match
                    if (match.matchingRequestedSkill?.id === s.skill.id) return null;
                    return <option key={s.skill.id} value={s.skill.id}>{s.skill.name}</option>
                  })}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What will they teach you?</label>
                <select 
                  value={selectedRequested} 
                  onChange={(e) => setSelectedRequested(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                  required
                >
                  <option value="" disabled>Select a skill they offer...</option>
                  {match.matchingOfferedSkill && (
                    <option value={match.matchingOfferedSkill.id}>{match.matchingOfferedSkill.name} (Perfect Match)</option>
                  )}
                  {theirOfferedSkills.map(s => {
                    if (match.matchingOfferedSkill?.id === s.id) return null;
                    return <option key={s.id} value={s.id}>{s.name}</option>
                  })}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Introductory Message</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Hi ${match.user.username}, I'd love to swap skills!`}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none min-h-[120px]"
                  required
                />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end gap-3">
              <button 
                type="button" 
                onClick={onClose}
                className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors flex items-center disabled:opacity-70"
              >
                {loading ? 'Sending...' : (
                  <>
                    <Send className="w-4 h-4 mr-2" /> Send Request
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
