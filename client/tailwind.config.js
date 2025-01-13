/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sohne: ['sohne', 'sans-serif'],
      },
      boxShadow: {
        'even-shadow': '0px 2px 4px -1px rgba(0, 0, 0, 0.1), 0px -2px 4px -1px rgba(0, 0, 0, 0.1)',
      },
      colors: {
        primary: '#1E40AF',   // Mavi tonunda bir ana renk
        secondary: '#1E3A8A', // Daha koyu bir mavi tonu
        accent: '#F59E0B',    // Turuncu tonunda vurgu rengi
        background: '#212631', // Koyu gri arka plan rengi
        surface: '#1F2937',   // Orta koyulukta yüzey rengi
        error: '#EF4444',     // Kırmızı hata rengi
        textPrimary: '#F3F4F6', // Açık gri birincil metin rengi
        textSecondary: '#9CA3AF', // Orta gri ikincil metin rengi
        bodyColor: 'rgba(255, 255, 255, .87)',
        tertiaryBg: 'rgb(41.5, 48, 61)',
        tertiaryColor: 'rgba(255, 255, 255, .38)',
        emphasisColor: '#fff',
      },
      borderColor: {
        borderColor: '#323a49'
      }
    },
  },
  plugins: [],
}
