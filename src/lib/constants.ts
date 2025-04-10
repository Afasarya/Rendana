export const CATEGORIES = {
    property: [
      { label: 'Sewa Lahan/Tempat', value: 'Sewa Lahan/Tempat' },
      { label: 'Sewa Kios', value: 'Sewa Kios' },
      { label: 'Lainnya', value: 'Lainnya' },
    ],
    capex: [
      { label: 'Peralatan - Mesin', value: 'Peralatan - Mesin' },
      { label: 'Peralatan - Lain2', value: 'Peralatan - Lain2' },
      { label: 'Peralatan - Dapur', value: 'Peralatan - Dapur' },
      { label: 'Peralatan - Kantor', value: 'Peralatan - Kantor' },
      { label: 'Furniture', value: 'Furniture' },
      { label: 'Renovasi/Desain Interior', value: 'Renovasi/Desain Interior' },
      { label: 'Sistem Software', value: 'Sistem Software' },
      { label: 'Lisensi & Legalitas', value: 'Lisensi & Legalitas' },
      { label: 'Lainnya', value: 'Lainnya' },
    ],
    inventory: [
      { label: 'Bahan Baku', value: 'Bahan Baku' },
      { label: 'Persediaan', value: 'Persediaan' },
      { label: 'Lainnya', value: 'Lainnya' },
    ],
    operational: [
      { label: 'Gaji Karyawan', value: 'Gaji Karyawan' },
      { label: 'Marketing', value: 'Marketing' },
      { label: 'Utilitas (Listrik, Air, Gas)', value: 'Utilitas (Listrik, Air, Gas)' },
      { label: 'Internet & Telepon', value: 'Internet & Telepon' },
      { label: 'Transportasi', value: 'Transportasi' },
      { label: 'Sewa Tambahan', value: 'Sewa Tambahan' },
      { label: 'Pajak & Asuransi', value: 'Pajak & Asuransi' },
      { label: 'Lainnya', value: 'Lainnya' },
    ],
  };
  
  export const BUSINESS_MODELS = [
    { label: 'Ticket-based (cocok untuk bisnis banyak produk/jasa)', value: 'ticket' },
    { label: 'Quantity-based (cocok untuk bisnis dengan 1 produk/jasa)', value: 'quantity' },
  ];
  
  export const BUFFER_CASH_MULTIPLIER = 3;
  export const CONTINGENCY_PERCENTAGE = 10; // 10% for unexpected costs
  
  export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  export const parseFormattedNumber = (value: string | number | undefined): number => {
    // Guard against undefined values
    if (value === undefined) {
      return 0;
    }
    
    // Ensure value is a string
    const valueStr = String(value);
    
    // If empty string, return 0
    if (!valueStr.trim()) {
      return 0;
    }
    
    try {
      // Remove currency symbol, dots as thousand separators, and replace comma with dot for decimal
      const cleanedValue = valueStr
        .replace(/[^\d,.-]/g, '')
        .replace(/\./g, '')
        .replace(',', '.');
        
      return parseFloat(cleanedValue) || 0;
    } catch (error) {
      console.error('Error parsing number:', error, 'Value:', value);
      return 0;
    }
  };
  
  export const ROI_RECOMMENDATION = {
    EXCELLENT: {
      maxMonths: 12,
      label: 'Sangat Baik',
      description: 'Bisnis ini memiliki prospek balik modal yang sangat baik, dengan perkiraan balik modal kurang dari 12 bulan.',
      color: 'success'
    },
    GOOD: {
      maxMonths: 24,
      label: 'Baik',
      description: 'Bisnis ini memiliki prospek balik modal yang baik, dengan perkiraan balik modal antara 12-24 bulan.',
      color: 'success'
    },
    MODERATE: {
      maxMonths: 36,
      label: 'Moderat',
      description: 'Bisnis ini memiliki prospek balik modal yang moderat, dengan perkiraan balik modal antara 24-36 bulan. Pertimbangkan untuk meninjau kembali rencana bisnis Anda.',
      color: 'warning'
    },
    POOR: {
      maxMonths: Infinity,
      label: 'Kurang Baik',
      description: 'Bisnis ini memiliki prospek balik modal yang kurang baik, dengan perkiraan balik modal lebih dari 36 bulan. Sebaiknya pertimbangkan kembali rencana bisnis Anda atau cari cara untuk meningkatkan pendapatan dan mengurangi biaya.',
      color: 'destructive'
    }
  };
  
  export const getRecommendation = (paybackPeriodMonths: number) => {
    if (paybackPeriodMonths <= ROI_RECOMMENDATION.EXCELLENT.maxMonths) {
      return ROI_RECOMMENDATION.EXCELLENT;
    } else if (paybackPeriodMonths <= ROI_RECOMMENDATION.GOOD.maxMonths) {
      return ROI_RECOMMENDATION.GOOD;
    } else if (paybackPeriodMonths <= ROI_RECOMMENDATION.MODERATE.maxMonths) {
      return ROI_RECOMMENDATION.MODERATE;
    } else {
      return ROI_RECOMMENDATION.POOR;
    }
  };