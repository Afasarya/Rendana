import { CalculatorForm } from "@/components/calculator/CalculatorForm";

export default function CalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Kalkulator Estimasi Modal & Balik Modal</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Isi informasi bisnis Anda untuk mendapatkan estimasi modal awal yang dibutuhkan dan perkiraan waktu balik modal.
          </p>
        </div>
        
        <CalculatorForm />
        
        <div className="bg-blue-50 rounded-lg p-6 mt-12 border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Catatan Penting</h3>
          <div className="text-blue-700 text-sm space-y-2">
            <p>
              Hasil perhitungan ini merupakan estimasi awal dan sebaiknya digunakan sebagai panduan awal dalam merencanakan bisnis Anda.
            </p>
            <p>
              Keberhasilan bisnis dipengaruhi oleh banyak faktor lain seperti lokasi, persaingan, tren pasar, dan kemampuan mengelola bisnis.
            </p>
            <p>
              Lakukan riset pasar yang mendalam dan konsultasikan dengan profesional bisnis sebelum mengambil keputusan investasi final.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}