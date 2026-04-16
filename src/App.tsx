import { Toaster } from "sonner";
import "./App.css";
import PageRoutes from "./routes/PageRoutes";

function App() {
  // toast.success("Başarılı");
  // toast.info("Bilgi");
  // toast.loading("Loading");
  // toast.error("Hata");
  // toast.message("Message");
  // toast.warning("Uyarı");
  return (
    <div>
      <PageRoutes />
      <div>
        {/* Diğer bileşenlerin (Header, Home vb.) */}

        <Toaster richColors position="top-right" duration={3000} closeButton />
      </div>
    </div>
  );
}

export default App;
