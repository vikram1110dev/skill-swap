import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Skill } from '../types';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
  onSkillAdded: () => void;
}

export default function SkillSelectModal({ onClose, onSkillAdded }: Props) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedSkillId, setSelectedSkillId] = useState<number | ''>('');
  const [skillType, setSkillType] = useState<'OFFERED' | 'REQUESTED'>('OFFERED');
  const [proficiencyLevel, setProficiencyLevel] = useState('INTERMEDIATE');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get('/skills');
        setSkills(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSkillId) return;
    
    try {
      await api.post('/skills/user', {
        skillId: selectedSkillId,
        skillType,
        proficiencyLevel
      });
      onSkillAdded();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to add skill. You may have already added it.');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">Add a New Skill</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-gray-50/30">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select a Skill from Master List</label>
                <select 
                  required
                  value={selectedSkillId}
                  onChange={e => setSelectedSkillId(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none shadow-sm text-gray-700"
                >
                  <option value="" disabled>-- Choose a Skill --</option>
                  {skills.map(skill => (
                    <option key={skill.id} value={skill.id}>{skill.name} ({skill.category})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">What do you want to do?</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`border-2 rounded-xl p-4 cursor-pointer text-center font-bold transition-all ${skillType === 'OFFERED' ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 shadow-sm' : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200 hover:bg-gray-50'}`}>
                    <input type="radio" className="hidden" name="type" checked={skillType === 'OFFERED'} onChange={() => setSkillType('OFFERED')} />
                    Teach it
                  </label>
                  <label className={`border-2 rounded-xl p-4 cursor-pointer text-center font-bold transition-all ${skillType === 'REQUESTED' ? 'border-emerald-600 bg-emerald-50/50 text-emerald-700 shadow-sm' : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200 hover:bg-gray-50'}`}>
                    <input type="radio" className="hidden" name="type" checked={skillType === 'REQUESTED'} onChange={() => setSkillType('REQUESTED')} />
                    Learn it
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Proficiency Level</label>
                <select 
                  required
                  value={proficiencyLevel}
                  onChange={e => setProficiencyLevel(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none shadow-sm text-gray-700"
                >
                  <option value="BEGINNER">Beginner (Just starting)</option>
                  <option value="INTERMEDIATE">Intermediate (Some experience)</option>
                  <option value="ADVANCED">Advanced (Very comfortable)</option>
                  <option value="EXPERT">Expert (Can teach easily)</option>
                </select>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={!selectedSkillId}
                  className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:hover:shadow-md"
                >
                  Save to Profile
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
