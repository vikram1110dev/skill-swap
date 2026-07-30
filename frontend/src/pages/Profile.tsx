import React, { useEffect, useState } from 'react';
import type { UserProfile } from '../types';
import api from '../services/api';
import { Save, Plus } from 'lucide-react';
import SkillSelectModal from '../components/SkillSelectModal';

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const fetchProfile = async () => {
    try {
      const response = await api.get('/users/me');
      setProfile(response.data);
      setBio(response.data.bio || '');
      setCity(response.data.city || '');
      setCountry(response.data.country || '');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/users/profile', { bio, city, country });
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveSkill = async (userSkillId: number) => {
    if (!window.confirm('Are you sure you want to remove this skill?')) return;
    try {
      await api.delete(`/users/skills/${userSkillId}`);
      fetchProfile();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Profile Details Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100 bg-gray-50/50 px-8 py-5">
          <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
          <p className="text-sm text-gray-500 mt-1">This information will be displayed on your public profile.</p>
        </div>
        
        <form onSubmit={handleSaveProfile} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
            <textarea 
              rows={4}
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Tell others about yourself and what you are looking for..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all resize-none text-gray-700"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
              <input 
                type="text" 
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="e.g. San Francisco"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
              <input 
                type="text" 
                value={country}
                onChange={e => setCountry(e.target.value)}
                placeholder="e.g. United States"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-gray-700"
              />
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <button 
              type="submit" 
              disabled={saving}
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all flex items-center shadow-sm disabled:opacity-50"
            >
              <Save className="w-5 h-5 mr-2" />
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>

      {/* Skills Management */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100 bg-gray-50/50 px-8 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Manage Skills</h2>
            <p className="text-sm text-gray-500 mt-1">Add skills you can teach or want to learn.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-50 text-indigo-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-100 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add Skill
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="p-8">
            <h3 className="text-lg font-bold mb-6 text-gray-800">I can teach...</h3>
            {!profile?.skills || profile.skills.filter(s => s.skillType === 'OFFERED').length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-500 text-sm">No skills added yet.</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {profile.skills.filter(s => s.skillType === 'OFFERED').map(us => (
                  <li key={us.id} className="group flex justify-between items-center bg-white px-4 py-3 rounded-xl border border-gray-100 shadow-sm hover:border-indigo-100 transition-all">
                    <div>
                      <p className="font-semibold text-gray-800">{us.skill.name}</p>
                      <p className="text-xs font-medium text-indigo-500 uppercase tracking-wide mt-0.5">{us.proficiencyLevel}</p>
                    </div>
                    <button onClick={() => handleRemoveSkill(us.id)} className="text-gray-400 hover:text-red-500 text-sm font-medium transition-colors p-2">Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-8">
            <h3 className="text-lg font-bold mb-6 text-gray-800">I want to learn...</h3>
            {!profile?.skills || profile.skills.filter(s => s.skillType === 'REQUESTED').length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-500 text-sm">No skills added yet.</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {profile.skills.filter(s => s.skillType === 'REQUESTED').map(us => (
                  <li key={us.id} className="group flex justify-between items-center bg-white px-4 py-3 rounded-xl border border-gray-100 shadow-sm hover:border-emerald-100 transition-all">
                    <div>
                      <p className="font-semibold text-gray-800">{us.skill.name}</p>
                      <p className="text-xs font-medium text-emerald-500 uppercase tracking-wide mt-0.5">{us.proficiencyLevel}</p>
                    </div>
                    <button onClick={() => handleRemoveSkill(us.id)} className="text-gray-400 hover:text-red-500 text-sm font-medium transition-colors p-2">Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <SkillSelectModal 
          onClose={() => setIsModalOpen(false)} 
          onSkillAdded={() => {
            setIsModalOpen(false);
            fetchProfile();
          }} 
        />
      )}
    </div>
  );
}
