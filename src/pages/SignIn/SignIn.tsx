import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Yüklenme durumu
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      // Hata varsa kullanıcıya bildir
      alert("Giriş hatası: " + error.message);
    } else {
      // Başarılıysa ana sayfaya yönlendir
      navigate("/");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-pink-100">
        {/* Logo / Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#D22E74]">Hoş Geldin!</h1>
          <p className="text-gray-500 mt-2">Stilini yönetmeye devam et.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSignIn}>
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-posta
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400"
                size={20}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@mail.com"
                className="w-full pl-10 pr-4 py-3 bg-pink-50 border border-transparent rounded-xl focus:border-[#D22E74] focus:bg-white outline-none transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Şifre
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 bg-pink-50 border border-transparent rounded-xl focus:border-[#D22E74] focus:bg-white outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D22E74]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D22E74] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#b0225d] transition-colors shadow-lg shadow-pink-200 disabled:opacity-50"
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}{" "}
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          Hesabın yok mu?
          <button
            onClick={() => navigate("/signup")}
            className="ml-1 font-bold text-[#D22E74] hover:underline"
          >
            Kayıt Ol
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
