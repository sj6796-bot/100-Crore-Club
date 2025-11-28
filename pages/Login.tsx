import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/ui/Logo';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/portfolio');
    }
  }, [user, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate('/'); // Redirect to home on success
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setSuccessMsg('Account created! Please sign in with your new credentials.');
        setIsLogin(true); // Switch back to login view
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    if (!email) {
      setError('Please enter your email address.');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/#/profile', // Redirect back to app to set new password
      });
      if (error) throw error;
      setSuccessMsg('Password reset link sent to your email.');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  const getHeaderText = () => {
    if (isForgotPassword) return 'Reset Password';
    return isLogin ? 'Welcome Back' : 'Join the Club';
  };

  const getSubText = () => {
    if (isForgotPassword) return 'Enter your email to receive instructions';
    return isLogin ? 'Access your wealth portfolio' : 'Start your premium journey';
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-gold-600/5 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Logo Text Section */}
        <div className="text-center mb-10 flex flex-col items-center">
          <Logo className="h-20 w-auto mb-4" />
          <h2 className="text-xl font-serif text-white tracking-wide mt-2">
            {getHeaderText()}
          </h2>
          <p className="text-neutral-500 text-sm mt-2 tracking-wider uppercase">
            {getSubText()}
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#0a0a0a] border border-neutral-800 rounded-2xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
          {/* Top Sheen */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent"></div>
          
          <form onSubmit={isForgotPassword ? handlePasswordReset : handleAuth} className="space-y-6">
            
            {/* Error Message */}
            {error && (
              <div className="bg-red-950/20 border border-red-900/50 rounded-lg p-3 flex items-start gap-3 text-red-200 text-sm">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Success Message */}
            {successMsg && (
              <div className="bg-green-950/20 border border-green-900/50 rounded-lg p-3 flex items-start gap-3 text-green-200 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs text-gold-600 font-semibold uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-neutral-500 group-focus-within:text-gold-500 transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {!isForgotPassword && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs text-gold-600 font-semibold uppercase tracking-wider ml-1">Password</label>
                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(true);
                        setError(null);
                        setSuccessMsg(null);
                      }}
                      className="text-[10px] text-neutral-500 hover:text-gold-400 transition-colors uppercase tracking-wider"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-neutral-500 group-focus-within:text-gold-500 transition-colors" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3.5 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all"
                    placeholder="••••••••"
                    minLength={6}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-xl text-sm font-bold uppercase tracking-widest text-black bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 hover:bg-[length:200%_auto] hover:animate-pulse transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isForgotPassword 
                    ? 'Send Reset Link' 
                    : (isLogin ? 'Sign In' : 'Create Account')
                  }
                  {!isForgotPassword && <ArrowRight className="ml-2 w-4 h-4" />}
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            {isForgotPassword ? (
              <button
                onClick={() => {
                  setIsForgotPassword(false);
                  setError(null);
                  setSuccessMsg(null);
                }}
                className="flex items-center justify-center gap-2 mx-auto text-gold-400 hover:text-gold-300 text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Sign In
              </button>
            ) : (
              <p className="text-neutral-500 text-sm">
                {isLogin ? "Don't have an account?" : "Already a member?"}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError(null);
                    setSuccessMsg(null);
                  }}
                  className="ml-2 text-gold-400 hover:text-gold-300 font-medium hover:underline underline-offset-4 transition-colors"
                >
                  {isLogin ? 'Apply for Access' : 'Sign In'}
                </button>
              </p>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-8 opacity-40">
           <p className="text-[10px] text-neutral-500 uppercase tracking-widest">
             Secure • Private • Exclusive
           </p>
        </div>

      </div>
    </div>
  );
};

export default Login;