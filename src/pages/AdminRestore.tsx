
import React from 'react';
import { AdminAccessRestore } from '@/components/admin/AdminAccessRestore';

export default function AdminRestore() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Hotel Living</h1>
          <p className="text-purple-200">Admin Access Restoration</p>
        </div>
        
        <AdminAccessRestore />
        
        <div className="mt-6 text-center">
          <a 
            href="/login" 
            className="text-purple-200 hover:text-white transition-colors"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
