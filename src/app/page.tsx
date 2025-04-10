import Link from 'next/link';
import { 
  ArrowRightIcon,
  CurrencyDollarIcon,
  ClockIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  const features = [
    {
      title: 'Perhitungan Modal Awal',
      description: 'Hitung kebutuhan modal awal untuk memulai bisnis Anda, termasuk biaya sewa, peralatan, renovasi, dan lainnya.',
      icon: <CurrencyDollarIcon className="h-8 w-8 text-primary" />
    },
    {
      title: 'Estimasi Keuntungan',
      description: 'Dapatkan estimasi keuntungan bisnis berdasarkan pendapatan dan biaya operasional yang Anda masukkan.',
      icon: <ChartBarIcon className="h-8 w-8 text-primary" />
    },
    {
      title: 'Perkiraan Balik Modal',
      description: 'Ketahui kapan bisnis Anda akan balik modal (break-even point) berdasarkan perhitungan yang akurat.',
      icon: <ClockIcon className="h-8 w-8 text-primary" />
    },
    {
      title: 'Rekomendasi Bisnis',
      description: 'Terima rekomendasi apakah bisnis Anda layak dijalankan berdasarkan hasil perhitungan.',
      icon: <DocumentTextIcon className="h-8 w-8 text-primary" />
    }
  ];

  const examples = [
    'Warnet PC', 'Warmindo', 'Fotobox', 'Lapangan Basket', 
    'Es Teh Keliling', 'Laundry Kiloan', 'Mini Soccer', 'Karaoke'
  ];

  const testimonials = [
    {
      quote: "Rendana sangat membantu saya dalam merencanakan keuangan bisnis kafe saya. Proyeksi balik modalnya cukup akurat!",
      author: "Indra Wijaya",
      role: "Pemilik Kafe di Jakarta"
    },
    {
      quote: "Saya bisa lebih percaya diri saat presentasi ke investor karena perhitungan modal dan ROI yang detail dari Rendana.",
      author: "Siti Nurhaliza",
      role: "Startup Founder"
    },
    {
      quote: "Sebagai konsultan bisnis, saya selalu merekomendasikan Rendana ke klien saya untuk perencanaan finansial bisnis mereka.",
      author: "Budi Santoso",
      role: "Konsultan Bisnis"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-gray-200 opacity-30"></div>
        <div className="absolute right-0 bottom-0">
          <svg className="h-96 w-96 text-blue-200 opacity-20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 018.75 9.54V7a.75.75 0 00-.75-.75H2.5a.75.75 0 00-.75.75v1.5a.75.75 0 001.5 0V8h16v11.57a.75.75 0 01-1.28.53l-2.97-2.97v1.37a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-1.66zM3 12.25a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM3 16a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 16z" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
              Rencanakan <span className="text-primary">Modal Bisnis</span> dengan Tepat
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed">
              Rendana membantu Anda menghitung kebutuhan modal awal, estimasi keuntungan, dan perkiraan waktu balik modal bisnis Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculator" className="btn btn-primary inline-flex items-center justify-center space-x-2 px-6 py-4 text-lg shadow-lg hover:shadow-xl transition-all">
                <span>Mulai Hitung Sekarang</span>
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link href="/guide" className="btn btn-secondary inline-flex items-center justify-center space-x-2 px-6 py-4 text-lg">
                <span>Pelajari Cara Kerja</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Counters Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">Bisnis Terencana</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10+</div>
              <div className="text-gray-600">Model Bisnis</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-gray-600">Tingkat Akurasi</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">5K+</div>
              <div className="text-gray-600">Pengguna Puas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Fitur Utama <span className="text-primary">Rendana</span>
            </h2>
            <p className="text-xl text-gray-600">
              Optimalisasi bisnis Anda dengan kalkulasi yang akurat dan rekomendasi yang terpercaya
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-8 border-b-4 border-primary">
                <div className="mb-5">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contoh Model Bisnis</h2>
            <p className="text-xl text-gray-600">
              Rendana mendukung berbagai jenis model bisnis dengan perhitungan yang disesuaikan
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {examples.map((example, index) => (
              <div key={index} className="px-5 py-3 bg-white rounded-full shadow-sm border border-gray-200 text-gray-800 hover:bg-primary hover:text-white transition-colors cursor-pointer">
                {example}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <p className="text-lg text-gray-600 mb-6">
              Siap untuk menghitung perkiraan modal dan balik modal bisnis Anda?
            </p>
            <Link href="/calculator" className="btn btn-primary inline-flex items-center space-x-2 px-8 py-4 text-lg">
              <span>Coba Kalkulator</span>
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Apa Kata Mereka</h2>
            <p className="text-xl text-blue-100">
              Pendapat dari para pengguna Rendana
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-gray-800 relative">
                <div className="absolute -top-4 left-8 bg-primary text-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <div className="pt-6">
                  <p className="text-gray-700 mb-4 italic">{testimonial.quote}</p>
                  <div className="flex items-center mt-6">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <UserGroupIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-gray-900">{testimonial.author}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cara Kerja</h2>
            <p className="text-xl text-gray-600">
              Rencanakan bisnis Anda dalam beberapa langkah sederhana
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="relative pl-12">
                <div className="absolute left-0 top-0 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div className="absolute left-5 top-10 h-full w-0.5 bg-gray-200"></div>
                <h3 className="font-semibold text-xl mb-3">Masukkan data bisnis</h3>
                <p className="text-gray-600">
                  Isi informasi tentang biaya sewa, modal awal, inventaris, dan biaya operasional bisnis Anda.
                </p>
              </div>
              
              <div className="relative pl-12">
                <div className="absolute left-0 top-0 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div className="absolute left-5 top-10 h-full w-0.5 bg-gray-200"></div>
                <h3 className="font-semibold text-xl mb-3">Perkirakan pendapatan</h3>
                <p className="text-gray-600">
                  Masukkan perkiraan pendapatan dari bisnis berdasarkan model bisnis yang Anda rencanakan.
                </p>
              </div>
              
              <div className="relative pl-12">
                <div className="absolute left-0 top-0 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div className="absolute left-5 top-10 h-full w-0.5 bg-gray-200"></div>
                <h3 className="font-semibold text-xl mb-3">Dapatkan hasil analisis</h3>
                <p className="text-gray-600">
                  Lihat hasil perhitungan total investasi, estimasi keuntungan, dan perkiraan waktu balik modal.
                </p>
              </div>
              
              <div className="relative pl-12">
                <div className="absolute left-0 top-0 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  4
                </div>
                <h3 className="font-semibold text-xl mb-3">Terima rekomendasi</h3>
                <p className="text-gray-600">
                  Dapatkan rekomendasi apakah bisnis Anda layak untuk dijalankan berdasarkan hasil analisis.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <Link href="/guide" className="text-primary hover:underline inline-flex items-center text-lg font-medium">
              <span>Pelajari lebih lanjut tentang cara penggunaan</span>
              <ArrowRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-primary rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="bg-primary p-12 text-white md:w-7/12">
                <h2 className="text-3xl font-bold mb-6">Siap Menghitung Modal Bisnis Anda?</h2>
                <p className="text-blue-100 mb-8 text-lg">
                  Mulai perencanaan yang tepat dengan perhitungan yang akurat. Bergabunglah dengan ribuan pebisnis yang telah menggunakan Rendana.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-6 w-6 mr-3 text-blue-200" />
                    <span>Perhitungan tepat dan akurat</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-6 w-6 mr-3 text-blue-200" />
                    <span>Visualisasi data yang jelas</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-6 w-6 mr-3 text-blue-200" />
                    <span>Rencana bisnis yang terukur</span>
                  </div>
                </div>
                <div className="mt-10">
                  <Link href="/calculator" className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                    Coba Sekarang
                  </Link>
                </div>
              </div>
              <div className="bg-blue-800 p-12 md:w-5/12 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-white mb-2">100%</div>
                  <div className="text-xl text-blue-200 mb-6">Gratis</div>
                  <p className="text-blue-300 mb-6">
                    Akses ke seluruh fitur tanpa biaya tersembunyi. Mulai perencanaan bisnis Anda sekarang juga.
                  </p>
                  <Link href="/about" className="text-blue-200 hover:text-white transition-colors inline-flex items-center">
                    <span>Pelajari Tentang Kami</span>
                    <ArrowRightIcon className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}