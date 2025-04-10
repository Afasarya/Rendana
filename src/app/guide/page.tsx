import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function GuidePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Panduan Penggunaan</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Selamat datang di panduan penggunaan Estimasi Modal Bisnis. Halaman ini akan membantu Anda memahami
            cara menggunakan kalkulator modal bisnis kami untuk mendapatkan estimasi yang akurat.
          </p>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Langkah 1: Informasi Bisnis</h2>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <span className="font-medium">Masukkan nama bisnis Anda</span> pada kolom yang tersedia 
                  di bagian atas halaman kalkulator.
                </li>
                <li>
                  <span className="font-medium">Pilih model perhitungan</span> yang sesuai:
                  <ul className="list-disc pl-6 mt-2 mb-2">
                    <li><strong>Ticket-based:</strong> Untuk bisnis dengan banyak produk/jasa (contoh: restoran, kafe)</li>
                    <li><strong>Quantity-based:</strong> Untuk bisnis dengan satu jenis produk/jasa utama</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Langkah 2: Biaya Sewa Tempat</h2>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <span className="font-medium">Masukkan biaya sewa bulanan</span> untuk lokasi bisnis Anda.
                </li>
                <li>
                  <span className="font-medium">Tentukan jumlah unit</span> lokasi jika Anda merencanakan 
                  lebih dari satu tempat.
                </li>
                <li>
                  Sistem akan otomatis <span className="font-medium">menghitung sewa tahunan</span>.
                </li>
              </ol>
              
              <div className="bg-blue-50 p-4 rounded-md mt-4">
                <p className="text-sm text-blue-600">
                  <strong>Tip:</strong> Jika Anda tidak perlu menyewa tempat (misalnya bisnis dari rumah),
                  Anda bisa mengisi 0 pada jumlah sewa.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Langkah 3: Modal Awal (Capital Expenditure)</h2>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <span className="font-medium">Tambahkan setiap item peralatan atau aset</span> yang Anda perlukan 
                  untuk memulai bisnis.
                </li>
                <li>
                  Untuk setiap item, tentukan:
                  <ul className="list-disc pl-6 mt-2 mb-2">
                    <li>Kategori item (peralatan, furniture, renovasi, dll.)</li>
                    <li>Nama item atau produk</li>
                    <li>Harga satuan</li>
                    <li>Jumlah yang dibutuhkan</li>
                  </ul>
                </li>
                <li>
                  Gunakan tombol <span className="font-medium">+ Tambah Item</span> untuk menambahkan lebih banyak item 
                  jika diperlukan.
                </li>
                <li>
                  Sistem akan secara otomatis <span className="font-medium">menghitung total biaya</span> untuk setiap item 
                  dan <span className="font-medium">total modal awal</span>.
                </li>
              </ol>
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Langkah 4: Inventaris Awal</h2>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <span className="font-medium">Masukkan bahan baku</span> atau inventaris yang perlu Anda siapkan 
                  sebelum memulai bisnis.
                </li>
                <li>
                  Tentukan harga satuan dan jumlah untuk setiap item.
                </li>
                <li>
                  Sistem akan otomatis <span className="font-medium">menghitung total biaya inventaris awal</span>.
                </li>
              </ol>
              
              <div className="bg-blue-50 p-4 rounded-md mt-4">
                <p className="text-sm text-blue-600">
                  <strong>Tip:</strong> Jika bisnis Anda tidak memerlukan inventaris awal
                  (contoh: layanan konsultasi), bagian ini bisa dikosongkan.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Langkah 5: Biaya Operasional</h2>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <span className="font-medium">Masukkan semua biaya operasional bulanan</span>, seperti:
                  <ul className="list-disc pl-6 mt-2 mb-2">
                    <li>Gaji karyawan</li>
                    <li>Utilitas (listrik, air, internet)</li>
                    <li>Biaya pemasaran</li>
                    <li>Asuransi</li>
                    <li>Pajak</li>
                    <li>Lainnya</li>
                  </ul>
                </li>
                <li>
                  Sistem akan otomatis <span className="font-medium">menghitung total biaya operasional bulanan</span>.
                </li>
                <li>
                  Berdasarkan biaya operasional, sistem juga akan menghitung <span className="font-medium">buffer cash</span> 
                  yang direkomendasikan (biasanya 3 kali biaya operasional bulanan).
                </li>
              </ol>
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Langkah 6: Estimasi Pendapatan</h2>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  Sesuai dengan model bisnis yang Anda pilih:
                  <ul className="list-disc pl-6 mt-2 mb-2">
                    <li>
                      <strong>Ticket-based:</strong> Masukkan rata-rata nominal per bon/transaksi dan 
                      perkiraan jumlah bon/transaksi harian.
                    </li>
                    <li>
                      <strong>Quantity-based:</strong> Masukkan harga jual per unit dan perkiraan penjualan unit harian.
                    </li>
                  </ul>
                </li>
                <li>
                  Jika ada, masukkan <span className="font-medium">persentase biaya transaksi</span> (MDR)
                  jika Anda menggunakan sistem pembayaran online/kartu.
                </li>
                <li>
                  Masukkan <span className="font-medium">persentase COGS (Harga Pokok Penjualan)</span> untuk
                  menghitung biaya bahan yang dibutuhkan.
                </li>
                <li>
                  Sistem akan otomatis menghitung:
                  <ul className="list-disc pl-6 mt-2 mb-2">
                    <li>Pendapatan harian</li>
                    <li>Pendapatan bulanan</li>
                    <li>Total biaya bahan bulanan</li>
                    <li>Total biaya transaksi</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Langkah 7: Lihat Hasil Analisis</h2>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  Setelah semua data dimasukkan, lihat bagian <span className="font-medium">Hasil Analisis</span>
                  untuk melihat:
                  <ul className="list-disc pl-6 mt-2 mb-2">
                    <li>Total investasi awal yang dibutuhkan</li>
                    <li>Perkiraan keuntungan bersih bulanan</li>
                    <li>Perkiraan waktu balik modal (dalam bulan dan tahun)</li>
                    <li>Rekomendasi kelayakan bisnis</li>
                  </ul>
                </li>
                <li>
                  Perhatikan <span className="font-medium">grafik visualisasi</span> untuk melihat gambaran
                  biaya dan proyeksi balik modal.
                </li>
              </ol>
              
              <div className="bg-yellow-50 p-4 rounded-md mt-4">
                <p className="text-sm text-yellow-700">
                  <strong>Catatan:</strong> Umumnya, bisnis dengan perkiraan waktu balik modal kurang dari 18 bulan
                  dianggap memiliki prospek yang baik, sedangkan waktu lebih dari 36 bulan mungkin memerlukan
                  peninjauan ulang rencana bisnis.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <p className="mb-4">Siap untuk mencoba kalkulator?</p>
            <Link href="/calculator" className="btn btn-primary inline-flex items-center space-x-2">
              <span>Mulai Hitung Sekarang</span>
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}