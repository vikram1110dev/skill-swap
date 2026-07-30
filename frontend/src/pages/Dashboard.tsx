import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/AuthContext';
import { Link } from 'react-router-dom';
import api from '../services/api';
import type { UserProfile } from '../types';
import { User, BookOpen, GraduationCap } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/users/me');
        setProfile(response.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.username}!</h1>
        <p className="text-gray-500">Here's an overview of your SkillSwap journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-4 border-b border-gray-50 pb-4">
            <div className="bg-indigo-100 p-2 rounded-lg mr-3">
              <GraduationCap className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Skills You Teach</h2>
          </div>
          {!profile?.skills || profile.skills.filter(s => s.skillType === 'OFFERED').length === 0 ? (
             <p className="text-gray-500 text-sm">You haven't added any skills you can teach yet.</p>
          ) : (
            <ul className="space-y-3">
              {profile.skills.filter(s => s.skillType === 'OFFERED').map(us => (
                <li key={us.id} className="bg-indigo-50/50 text-indigo-800 px-4 py-3 rounded-lg font-medium text-sm border border-indigo-100 flex justify-between">
                  <span>{us.skill.name}</span>
                  <span className="text-indigo-400 font-normal text-xs uppercase tracking-wider">{us.proficiencyLevel || 'Any'}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-4 border-b border-gray-50 pb-4">
            <div className="bg-emerald-100 p-2 rounded-lg mr-3">
              <BookOpen className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Skills You Want</h2>
          </div>
          {!profile?.skills || profile.skills.filter(s => s.skillType === 'REQUESTED').length === 0 ? (
             <p className="text-gray-500 text-sm">You haven't requested any skills to learn yet.</p>
          ) : (
             <ul className="space-y-3">
              {profile.skills.filter(s => s.skillType === 'REQUESTED').map(us => (
                <li key={us.id} className="bg-emerald-50/50 text-emerald-800 px-4 py-3 rounded-lg font-medium text-sm border border-emerald-100 flex justify-between">
                  <span>{us.skill.name}</span>
                  <span className="text-emerald-400 font-normal text-xs uppercase tracking-wider">{us.proficiencyLevel || 'Any'}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {(!profile?.bio || !profile?.skills || profile.skills.length === 0) && (
        <div className="bg-amber-50 rounded-xl p-8 border border-amber-200 text-center mt-6">
          <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-amber-900 mb-2">Complete Your Profile</h3>
          <p className="text-amber-700 mb-6 max-w-lg mx-auto">
            To start matching with other users and exchanging knowledge, you need to add a short bio and list your skills.
          </p>
          <Link to="/profile" className="inline-block bg-amber-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-amber-700 transition-colors shadow-sm hover:shadow">
            Go to Profile Setup
          </Link>
        </div>
      )}
    </div>
  );
}
