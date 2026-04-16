import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { Toaster } from "sonner";
import "./App.css";
import PageRoutes from "./routes/PageRoutes";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Uygulama açıldığında oturum durumunu bir kez kontrol et
    const checkSession = async () => {
      await supabase.auth.getSession();
      setLoading(false);
    };

    checkSession();

    // Kullanıcı login veya logout olduğunda bunu dinle
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // Burada session bilgisini bir context'e veya state'e aktarabilirsin
      // Ama şu an PageRoutes içindeki korumalı rotalar için bu dinleyici yeterli.
      console.log("Oturum Durumu Değişti:", session?.user?.email);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-pink-100">
        <div className="animate-bounce text-[#D22E74] font-bold text-xl">
          Style Keeper Hazırlanıyor...
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageRoutes />
      <Toaster richColors position="top-right" duration={3000} closeButton />
    </div>
  );
}

export default App;
