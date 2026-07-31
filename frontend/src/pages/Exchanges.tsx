import React, { useEffect, useState } from 'react';
import api from '../services/api';
import type { ExchangeRequest } from '../types';
import { Inbox, CheckCircle, XCircle, Clock, Mail } from 'lucide-react';
import { useAuth } from '../store/AuthContext';

export default function Exchanges() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<ExchangeRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await api.get('/exchanges');
      setRequests(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await api.put(`/exchanges/${id}/status`, { status });
      fetchRequests(); // Refresh the list
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Inbox & Requests</h1>
        <p className="text-gray-500 mb-2">Manage your incoming and outgoing skill exchange proposals.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {requests.map((req) => {
          const isIncoming = req.receiverId === user?.id;
          const partnerName = isIncoming ? req.senderName : req.receiverName;
          const partnerEmail = isIncoming ? req.senderEmail : req.receiverEmail;

          return (
            <div key={req.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2.5 rounded-full ${isIncoming ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}>
                    <Inbox className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {isIncoming ? `Request from ${partnerName}` : `Request sent to ${partnerName}`}
                    </h3>
                    <p className="text-xs font-medium text-gray-500">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                    req.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    req.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    req.status === 'COMPLETED' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    'bg-red-50 text-red-700 border-red-200'
                  }`}>
                    {req.status}
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">They Teach</h4>
                    <p className="font-semibold text-gray-800">{isIncoming ? req.offeredSkill.name : req.requestedSkill.name}</p>
                  </div>
                  <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">You Teach</h4>
                    <p className="font-semibold text-gray-800">{isIncoming ? req.requestedSkill.name : req.offeredSkill.name}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Message</h4>
                  <div className="p-4 bg-gray-50 rounded-xl text-gray-700 text-sm whitespace-pre-wrap">
                    {req.message}
                  </div>
                </div>

                {req.status === 'ACCEPTED' && partnerEmail && (
                  <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">Contact Details</h4>
                      <p className="font-medium text-indigo-900 flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-indigo-500" /> {partnerEmail}
                      </p>
                    </div>
                    <a href={`mailto:${partnerEmail}`} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors text-center">
                      Send Email
                    </a>
                  </div>
                )}
              </div>

              {isIncoming && req.status === 'PENDING' && (
                <div className="p-6 pt-0 flex gap-3">
                  <button 
                    onClick={() => updateStatus(req.id, 'ACCEPTED')}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" /> Accept Request
                  </button>
                  <button 
                    onClick={() => updateStatus(req.id, 'DECLINED')}
                    className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors flex items-center justify-center"
                  >
                    <XCircle className="w-5 h-5 mr-2" /> Decline
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {requests.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No requests yet</h3>
            <p className="text-gray-500">When you propose an exchange or someone proposes one to you, it will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
