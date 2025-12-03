# Groq REST API (Node.js + Groq LPU — Llama 3.1 Instant)

Groq REST API adalah layanan berbasis Node.js yang memanfaatkan **Groq LPU Inference Engine** dan model **Llama 3.1 8B Instant** dari Meta. API ini memberikan respons AI dengan latensi super rendah (150–400 ms) — jauh lebih cepet daripada OpenAI, Gemini, atau Claude dalam banyak kasus.

Project ini menyediakan **REST API server** dan **web chat interface** yang siap pakai, jadi kamu bisa langsung test atau integrasikan AI kilat ke aplikasi web, mobile, bot, atau automation.

## Fitur Utama

- **REST API Endpoint**  
  Endpoint `/generate-text` untuk kirim prompt teks dan dapatkan respons AI secara real-time.

- **Web Chat Interface**  
  Interface chat berbasis HTML yang sudah siap pakai (`chat.html`) dengan desain modern dan responsive.

- **Latensi Gila**  
  Rata-rata < 400 ms bahkan pakai model 70B — berkat hardware LPU (Language Processing Unit) dari Groq.

- **Gratis & Rate Limit Tinggi**  
  1 juta token/hari (cukup banget buat personal project, demo, bahkan produksi kecil).

- **Gampang Diganti Model**  
  Tinggal ganti satu baris kode di `server.js` untuk pakai 8B, 70B, Gemma2, Mixtral, dll.

---

## Teknologi yang Digunakan

- **Node.js + Express** – Backend ringan & cepat
- **Groq SDK** – Official client untuk Groq Cloud
- **dotenv** – Simpan API key dengan aman
- **CORS** – Bisa dipanggil dari frontend lokal (Live Server, dll)

---

## Instalasi & Setup

```bash
# 1. Clone repo
git clone https://github.com/hildan-anugrah/groq-rest-api.git
cd groq-rest-api

# 2. Install dependencies
npm install

# 3. Dapatkan API Key GRATIS di Groq
#    Buka → https://console.groq.com/keys
#    Klik "Create API Key" → Copy

# 4. Masukan API Key ke file .env
GROQ_API_KEY=YOUR_API_KEY_HERE

# 5. Jalankan server
npm run dev
# atau
node server.js
```

Server berjalan di: **http://localhost:3000**

---

## Cara Pakai

### 1. Pakai Web Chat Interface (RECOMMENDED ✅)

#### Menggunakan Live Server (VS Code)

**Kenapa harus pakai Live Server?**  
Karena CORS policy browser tidak mengizinkan request dari `file://` protocol. Kalau kamu buka `chat.html` langsung (double-click), akan muncul **CORS error**. Live Server menjalankan local web server sehingga pakai protocol `http://` yang diizinkan.

**Cara Install Live Server (VS Code):**

1. Buka **Visual Studio Code**
2. Klik icon **Extensions** di sidebar kiri (atau tekan `Ctrl+Shift+X`)
3. Ketik **"Live Server"** di search box
4. Install extension **"Live Server"** by Ritwick Dey (⭐ 30M+ downloads)
5. Restart VS Code (kalau diminta)

**Cara Pakai Live Server:**

1. Pastikan server backend sudah jalan:
   ```bash
   npm run dev
   # Server jalan di http://localhost:3000
   ```

2. Buka file `chat.html` di VS Code

3. Klik kanan di editor → pilih **"Open with Live Server"**  
   ATAU klik tombol **"Go Live"** di status bar bawah kanan

4. Browser akan otomatis buka di `http://127.0.0.1:5500/chat.html`

5. Langsung ketik pesan dan chat dengan AI! 🚀

#### Alternatif: Tanpa Live Server (Tidak Disarankan)

Kalau tidak mau pakai Live Server, kamu bisa:
1. Double-click `chat.html` untuk buka di browser
2. Kalau muncul CORS error, sudah di-handle di `server.js` (origin 'null' sudah diizinkan)
3. Tapi **tidak disarankan** karena kurang aman untuk production

> **Note:** `chat.html` di-configure untuk connect ke `http://localhost:3000`. Kalau server jalan di port lain, edit URL di line 140 (`chat.html`).

### 2. Pakai API Endpoint (Untuk Integrasi)

Endpoint utama: `POST /generate-text`

**Contoh Request (cURL):**

```bash
curl -X POST http://localhost:3000/generate-text \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Buatin puisi pendek tentang kopi dan deadline programmer"
  }'
```

**Response:**

```json
{
  "result": "Kopi hitam di cangkir retak,\nDeadline datang, jantung bergetar...\n..."
}
```

**Contoh Request (JavaScript/Fetch):**

```javascript
const response = await fetch('http://localhost:3000/generate-text', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: 'Halo, apa kabar?' })
});

const data = await response.json();
console.log(data.result);
```

### 3. Ganti Model AI

Edit `server.js` line 29, ganti nilai `model`:

```js
model: "llama-3.1-8b-instant"      // default — super cepet
model: "llama-3.1-70b-instant"     // lebih pintar, masih kilat
model: "gemma2-27b-it"             // Google Gemma2
model: "mixtral-8x7b-instant"      // Mixtral dari Mistral AI
```

Lihat semua model tersedia di: https://console.groq.com/docs/rate-limits

---

## Struktur File

```
groq-rest-api/
├── server.js          # Backend API server (Express + Groq SDK)
├── chat.html          # Web chat interface (siap pakai!)
├── package.json       # Dependencies
├── .env               # API key (JANGAN upload ke GitHub!)
└── README.md          # Dokumentasi ini
```

## Catatan Penting

- API key Groq **GRATIS** dan bisa langsung didapat di https://console.groq.com/keys
- **Gunakan Live Server** untuk buka `chat.html` agar tidak CORS error (tutorial di atas)
- Saat ini hanya support **text-only** (untuk **Speech to Text, Text to Speech, OCR, Image** dan lainnya, silahkan baca di https://console.groq.com/docs/overview)
- CORS sudah di-configure untuk Live Server (`http://127.0.0.1:5500`, `http://localhost:5500`) dan direct file access

---

## Kontribusi & Lisensi

Project ini 100% open source.  
Silakan fork, modifikasi, deploy, atau pakai untuk portofolio / project pribadi.

Kalau mau tambah fitur:
- Streaming response (SSE)
- Rate limiting
- Web chat improvements

---

**By Hildan Anugrah Tamadi Putra**  
GitHub: [@hildan-anugrah](https://github.com/hildan-anugrah)