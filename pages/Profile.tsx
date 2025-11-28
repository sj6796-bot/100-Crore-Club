
import React, { useState, useEffect } from 'react';
import { User, Save, Loader2, CreditCard, Wallet, Building, Phone, Calendar, Briefcase, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { SectionHeader, Card } from '../components/ui/Card';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    age: '',
    pan: '',
    annualIncome: '',
    netWorth: '',
    occupation: '',
    riskProfile: 'Moderate'
  });

  useEffect(() => {
    if (user && user.user_metadata) {
      setFormData({
        fullName: user.user_metadata.fullName || '',
        phone: user.user_metadata.phone || '',
        age: user.user_metadata.age || '',
        pan: user.user_metadata.pan || '',
        annualIncome: user.user_metadata.annualIncome || '',
        netWorth: user.user_metadata.netWorth || '',
        occupation: user.user_metadata.occupation || '',
        riskProfile: user.user_metadata.riskProfile || 'Moderate'
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const { error } = await supabase.auth.updateUser({
        data: formData
      });

      if (error) throw error;
      setSuccess('Profile updated successfully');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <SectionHeader title="Investor Profile" subtitle="Manage your personal details and financial metrics" />

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Avatar & Basic Info */}
          <div className="md:col-span-1 space-y-6">
            <Card className="text-center py-10">
              <div className="w-24 h-24 mx-auto bg-neutral-900 rounded-full border-2 border-gold-500/50 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <User className="w-10 h-10 text-gold-500" />
              </div>
              <h3 className="text-xl font-serif text-white mb-1">{formData.fullName || 'Guest User'}</h3>
              <p className="text-xs text-neutral-500 uppercase tracking-widest">{user?.email}</p>
              <div className="mt-6 inline-block px-4 py-1.5 rounded-full bg-gold-950/50 border border-gold-500/20 text-gold-400 text-xs font-semibold tracking-wider">
                PREMIUM MEMBER
              </div>
            </Card>

            <Card className="bg-neutral-900/30 border-neutral-800">
               <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">Status</h4>
               <div className="space-y-3">
                 <div className="flex justify-between text-sm">
                   <span className="text-neutral-500">KYC Status</span>
                   <span className="text-green-500 font-medium flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Verified</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-neutral-500">Account Type</span>
                   <span className="text-gold-500/80">Individual</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-neutral-500">Joined</span>
                   <span className="text-neutral-300">{new Date(user?.created_at || Date.now()).toLocaleDateString()}</span>
                 </div>
               </div>
            </Card>
          </div>

          {/* Right Column: Form Fields */}
          <div className="md:col-span-2">
            <Card className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-lg font-serif text-neutral-200">Personal & Financial Details</h3>
                 {success && <span className="text-xs text-green-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Saved</span>}
                 {error && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {error}</span>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-xs text-gold-600/80 font-semibold uppercase tracking-wider ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-3 top-3.5 w-4 h-4 text-neutral-600 group-focus-within:text-gold-500 transition-colors" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-3 pl-10 pr-4 text-neutral-200 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all placeholder-neutral-700"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-xs text-gold-600/80 font-semibold uppercase tracking-wider ml-1">Phone Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-3.5 w-4 h-4 text-neutral-600 group-focus-within:text-gold-500 transition-colors" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-3 pl-10 pr-4 text-neutral-200 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all placeholder-neutral-700"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <label className="text-xs text-gold-600/80 font-semibold uppercase tracking-wider ml-1">Age</label>
                  <div className="relative group">
                    <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-neutral-600 group-focus-within:text-gold-500 transition-colors" />
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-3 pl-10 pr-4 text-neutral-200 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all placeholder-neutral-700"
                      placeholder="35"
                    />
                  </div>
                </div>

                {/* PAN */}
                <div className="space-y-2">
                  <label className="text-xs text-gold-600/80 font-semibold uppercase tracking-wider ml-1">PAN Number</label>
                  <div className="relative group">
                    <CreditCard className="absolute left-3 top-3.5 w-4 h-4 text-neutral-600 group-focus-within:text-gold-500 transition-colors" />
                    <input
                      type="text"
                      name="pan"
                      value={formData.pan}
                      onChange={handleChange}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-3 pl-10 pr-4 text-neutral-200 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all placeholder-neutral-700 uppercase"
                      placeholder="ABCDE1234F"
                    />
                  </div>
                </div>

                {/* Annual Income */}
                <div className="space-y-2">
                  <label className="text-xs text-gold-600/80 font-semibold uppercase tracking-wider ml-1">Annual Income</label>
                  <div className="relative group">
                    <Wallet className="absolute left-3 top-3.5 w-4 h-4 text-neutral-600 group-focus-within:text-gold-500 transition-colors" />
                    <input
                      type="text"
                      name="annualIncome"
                      value={formData.annualIncome}
                      onChange={handleChange}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-3 pl-10 pr-4 text-neutral-200 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all placeholder-neutral-700"
                      placeholder="₹ 50,00,000"
                    />
                  </div>
                </div>

                {/* Net Worth */}
                <div className="space-y-2">
                  <label className="text-xs text-gold-600/80 font-semibold uppercase tracking-wider ml-1">Net Worth</label>
                  <div className="relative group">
                    <Building className="absolute left-3 top-3.5 w-4 h-4 text-neutral-600 group-focus-within:text-gold-500 transition-colors" />
                    <input
                      type="text"
                      name="netWorth"
                      value={formData.netWorth}
                      onChange={handleChange}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-3 pl-10 pr-4 text-neutral-200 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all placeholder-neutral-700"
                      placeholder="₹ 5 Cr"
                    />
                  </div>
                </div>

                 {/* Occupation */}
                 <div className="space-y-2">
                  <label className="text-xs text-gold-600/80 font-semibold uppercase tracking-wider ml-1">Occupation</label>
                  <div className="relative group">
                    <Briefcase className="absolute left-3 top-3.5 w-4 h-4 text-neutral-600 group-focus-within:text-gold-500 transition-colors" />
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-3 pl-10 pr-4 text-neutral-200 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all placeholder-neutral-700"
                      placeholder="Business Owner"
                    />
                  </div>
                </div>

                {/* Risk Profile */}
                 <div className="space-y-2">
                  <label className="text-xs text-gold-600/80 font-semibold uppercase tracking-wider ml-1">Risk Profile</label>
                  <div className="relative group">
                    <select
                      name="riskProfile"
                      value={formData.riskProfile}
                      onChange={handleChange}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-3 pl-3 pr-4 text-neutral-200 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all appearance-none"
                    >
                      <option value="Low">Low Risk (Conservative)</option>
                      <option value="Moderate">Moderate Risk (Balanced)</option>
                      <option value="High">High Risk (Aggressive)</option>
                      <option value="Very High">Very High Risk</option>
                    </select>
                  </div>
                </div>

              </div>

              <div className="pt-6 border-t border-neutral-800 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3 bg-gold-600 hover:bg-gold-500 text-black font-bold uppercase tracking-wider text-xs rounded-lg transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Changes
                </button>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
