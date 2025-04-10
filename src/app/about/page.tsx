export default function AboutPage() {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Tentang Estimasi Modal Bisnis</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg mb-6">
              Estimasi Modal Bisnis adalah alat perhitungan yang dirancang untuk membantu para pengusaha dan calon pengusaha 
              merencanakan modal bisnis dan memperkirakan waktu balik modal (return on investment) dengan lebih akurat.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Tujuan Kami</h2>
            <p className="mb-4">
              Kami bertujuan membantu para pengusaha untuk:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Menghitung kebutuhan modal awal dengan lebih terperinci dan akurat</li>
              <li>Memperkirakan biaya operasional secara realistis</li>
              <li>Memproyeksikan pendapatan potensial berdasarkan model bisnis</li>
              <li>Menghitung perkiraan waktu balik modal</li>
              <li>Memberikan rekomendasi awal terhadap kelayakan bisnis</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Metodologi</h2>
            <p className="mb-4">
              Kalkulator ini dikembangkan berdasarkan metodologi dan model bisnis yang telah teruji, dengan
              mempertimbangkan berbagai aspek penting dalam memulai dan mengelola bisnis, termasuk:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Biaya modal awal (peralatan, renovasi, lisensi, dll.)</li>
              <li>Biaya sewa tempat</li>
              <li>Inventaris awal</li>
              <li>Biaya operasional bulanan</li>
              <li>Perkiraan pendapatan berdasarkan model ticket-based atau quantity-based</li>
              <li>Buffer cash untuk mengantisipasi kondisi tak terduga</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Siapa yang Dapat Menggunakan?</h2>
            <p className="mb-6">
              Alat perhitungan ini dapat digunakan oleh siapa saja yang berencana memulai bisnis baru atau 
              ingin mengevaluasi bisnis yang sudah berjalan, seperti:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Calon pengusaha yang sedang merencanakan bisnis</li>
              <li>Pengusaha kecil yang ingin mengembangkan usahanya</li>
              <li>Konsultan bisnis yang membantu kliennya</li>
              <li>Mahasiswa atau pelajar yang mempelajari kewirausahaan</li>
              <li>Investor yang ingin mengevaluasi prospek bisnis</li>
            </ul>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-8">
              <p className="font-medium text-blue-700">Catatan Penting:</p>
              <p className="text-blue-600">
                Hasil perhitungan dari alat ini merupakan estimasi dan sebaiknya digunakan sebagai panduan awal. 
                Setiap bisnis memiliki karakteristik unik dan kondisi pasar yang berbeda. 
                Kami menyarankan untuk tetap melakukan riset pasar yang menyeluruh dan 
                berkonsultasi dengan profesional bisnis sebelum mengambil keputusan investasi final.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }