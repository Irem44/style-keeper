import React, { useState } from "react";
import { User, Mail, Lock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Input değişikliklerini yakalayan fonksiyon
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basit doğrulama
    if (formData.password !== formData.confirmPassword) {
      toast.error("Şifreler eşleşmiyor!");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        // Kullanıcının adını metadata olarak kaydediyoruz
        data: {
          full_name: formData.name,
        },
      },
    });

    if (error) {
      toast.error("Şifre uzunluğu en az 6 karakter olamlıdır");
    } else {
      toast.success("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.");
      navigate("/signin");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-pink-100">
        <button
          onClick={() => navigate("/signin")}
          className="flex items-center gap-1 text-gray-400 hover:text-[#D22E74] mb-6 transition-colors"
        >
          <ArrowLeft size={18} /> Geri Dön
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#D22E74]">Yeni Hesap Aç</h1>
          <p className="text-gray-500 mt-2">
            Gardırobunu dijitalleştirmeye başla.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSignUp}>
          {/* Ad Soyad */}
          <div>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400"
                size={20}
              />
              <input
                type="text"
                name="name" // name prop'u handleChange için önemli
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Ad Soyad"
                className="w-full pl-10 pr-4 py-3 bg-pink-50 border border-transparent rounded-xl focus:border-[#D22E74] focus:bg-white outline-none transition-all"
              />
            </div>
          </div>

          {/* E-posta */}
          <div>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400"
                size={20}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="E-posta Adresi"
                className="w-full pl-10 pr-4 py-3 bg-pink-50 border border-transparent rounded-xl focus:border-[#D22E74] focus:bg-white outline-none transition-all"
              />
            </div>
          </div>

          {/* Şifre */}
          <div>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400"
                size={20}
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Şifre"
                className="w-full pl-10 pr-4 py-3 bg-pink-50 border border-transparent rounded-xl focus:border-[#D22E74] focus:bg-white outline-none transition-all"
              />
            </div>
          </div>

          {/* Şifre Tekrar */}
          <div>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400"
                size={20}
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Şifre Tekrar"
                className="w-full pl-10 pr-4 py-3 bg-pink-50 border border-transparent rounded-xl focus:border-[#D22E74] focus:bg-white outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D22E74] text-white py-4 rounded-xl font-bold mt-4 hover:bg-[#b0225d] transition-transform active:scale-95 shadow-lg shadow-pink-200 disabled:opacity-50"
          >
            {loading ? "Hesap Oluşturuluyor..." : "Hesabımı Oluştur"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400 px-6">
          Kayıt olarak kullanım koşullarını ve gizlilik politikasını kabul etmiş
          sayılırsınız.
        </p>
      </div>
    </div>
  );
};

export default SignUp;
