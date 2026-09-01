<div align="center">

# 👗 Style Keeper

   <div align="center">

   ### 🚀 Programı kullanmak için: [style-keeper.netlify.app](https://style-keeper.netlify.app)

   </div>
**Dijital gardırobunu yönet, favorilerini takip et.**
**Manage your digital wardrobe, keep track of your favorites.**

Built with React · TypeScript · Supabase · Tailwind CSS

</div>

---

## 🇹🇷 Türkçe

### 📖 Proje Hakkında

**Style Keeper**, kullanıcıların sahip oldukları kıyafetleri dijital bir gardıropta saklayabildiği, favori ürünlerini işaretleyebildiği ve harcamalarını takip edebildiği bir web uygulamasıdır. Her kullanıcı kendi hesabıyla giriş yapar ve yalnızca kendi ürünlerini görüntüler/yönetir.

### ✨ Özellikler

- 🔐 **Kullanıcı Kimlik Doğrulama** — Supabase Auth ile kayıt olma / giriş yapma
- 🛡️ **Korumalı Rotalar** — Oturum açmamış kullanıcılar giriş sayfasına yönlendirilir
- 👕 **Ürün Ekleme** — Mağaza adı, ürün adı, kategori, fiyat ve fotoğraf ile yeni kıyafet ekleme
- 🖼️ **Görsel Yükleme** — Supabase Storage üzerinden kullanıcıya özel klasörde resim saklama
- 🔍 **Arama & Filtreleme** — Ürün adı, mağaza adı veya kategoriye göre canlı arama
- 💰 **Toplam Tutar Hesaplama** — Filtrelenen ürünlerin toplam fiyatını gösterme
- ❤️ **Favoriler** — Ürünleri favorilere ekleme, favoriler sayfasında listeleme ve arama
- 🗑️ **Silme / Düzenleme** — Onay diyaloğu ile güvenli silme işlemleri
- 🎬 **Animasyonlar** — GSAP ile akıcı sidebar ve form animasyonları
- 📱 **Responsive Tasarım** — Tailwind CSS ile mobil-öncelikli arayüz

### 🛠️ Kullanılan Teknolojiler

| Katman | Teknoloji |
|---|---|
| Frontend | React + TypeScript |
| Styling | Tailwind CSS |
| Backend / DB / Auth / Storage | [Supabase](https://supabase.com) |
| Form Yönetimi | React Hook Form + Zod |
| Routing | React Router DOM |
| Animasyon | GSAP (`@gsap/react`) |
| Bildirimler | Sonner (toast) |
| İkonlar | Lucide React |

### 📂 Proje Yapısı (özet)

```
src/
├── components/
│   ├── Header.tsx
│   ├── SideBar.tsx
│   ├── ProductCard.tsx
│   ├── FavoriteCard.tsx
│   ├── ConfirmDialog.tsx
│   ├── CustomButton.tsx
│   ├── CustomInput.tsx
│   ├── CustomTextInput.tsx
│   ├── ImageUploadButton.tsx
│   └── ProtectedRoute.tsx
├── pages/
│   ├── Home/
│   │   └── Home.tsx
│   ├── Favorites/
│   │   ├── Favorites.tsx
│   │   └── FavoritesModels.ts
│   ├── SignIn/
│   │   └── SignIn.tsx
│   └── SignUp/
│       └── SignUp.tsx
├── routes/
│   └── PageRoutes.tsx
├── utils/
│   └── stringHelpers.ts
└── lib/
    └── supabase.ts
```

### 🚀 Kurulum

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/kullanici-adi/style-keeper.git
   cd style-keeper
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Ortam değişkenlerini tanımlayın — proje kök dizininde bir `.env` dosyası oluşturun:
   ```env
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

### 🗄️ Supabase Kurulumu

Uygulamanın çalışması için Supabase projenizde şu tabloların bulunması gerekir:

- **`clothes`** — `id`, `user_id`, `product_name`, `product_category`, `product_price`, `shop_name`, `image_url`
- **`favorites`** — `id`, `product_id` (`clothes` tablosuna foreign key)

Ayrıca resim yüklemeleri için `wardrobe` adında bir **Storage bucket**, kullanıcıların yalnızca kendi verilerine erişebilmesi için de **Row Level Security (RLS)** politikaları oluşturulmalıdır.

### 📝 Kullanılabilir Komutlar

| Komut | Açıklama |
|---|---|
| `npm run dev` | Geliştirme sunucusunu başlatır |
| `npm run build` | Üretim için derler |
| `npm run preview` | Derlenmiş uygulamayı önizler |

---

## 🇬🇧 English

### 📖 About

**Style Keeper** is a web app that lets users store their clothes in a digital wardrobe, mark favorite items, and keep track of spending. Every user signs in with their own account and can only view and manage their own items.

### ✨ Features

- 🔐 **Authentication** — Sign up / sign in via Supabase Auth
- 🛡️ **Protected Routes** — Unauthenticated users are redirected to the sign-in page
- 👕 **Add Items** — Add new clothing items with shop name, product name, category, price, and photo
- 🖼️ **Image Upload** — Images stored per-user in Supabase Storage
- 🔍 **Search & Filter** — Live search by product name, shop name, or category
- 💰 **Total Price Calculation** — Shows the total price of the filtered items
- ❤️ **Favorites** — Add items to favorites, list and search them on a dedicated page
- 🗑️ **Delete / Edit** — Safe deletion with a confirmation dialog
- 🎬 **Animations** — Smooth sidebar and form animations powered by GSAP
- 📱 **Responsive Design** — Mobile-first UI built with Tailwind CSS

### 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript |
| Styling | Tailwind CSS |
| Backend / DB / Auth / Storage | [Supabase](https://supabase.com) |
| Form Handling | React Hook Form + Zod |
| Routing | React Router DOM |
| Animation | GSAP (`@gsap/react`) |
| Notifications | Sonner (toast) |
| Icons | Lucide React |

### 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/style-keeper.git
   cd style-keeper
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables — create a `.env` file in the project root:
   ```env
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

### 🗄️ Supabase Setup

Your Supabase project needs the following tables:

- **`clothes`** — `id`, `user_id`, `product_name`, `product_category`, `product_price`, `shop_name`, `image_url`
- **`favorites`** — `id`, `product_id` (foreign key to `clothes`)

You'll also need a **Storage bucket** named `wardrobe` for image uploads, plus **Row Level Security (RLS)** policies so users can only access their own data.

### 📝 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the app for production |
| `npm run preview` | Previews the production build |


</div>
