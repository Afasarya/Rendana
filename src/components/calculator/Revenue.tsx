'use client';

import { useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { formatCurrency, parseFormattedNumber } from '@/lib/constants';

export function Revenue() {
  const { control, setValue, } = useFormContext();
  const businessModel = useWatch({ control, name: 'businessModel' });
  
  // Ticket-based revenue fields
  const ticketBasedFields = useWatch({
    control,
    name: ['ticketBasedRevenue.averageTicketSize', 'ticketBasedRevenue.dailyTickets', 'ticketBasedRevenue.mdrPercentage', 'ticketBasedRevenue.cogsPercentage']
  });

  // Quantity-based revenue fields
  const quantityBasedFields = useWatch({
    control,
    name: ['quantityBasedRevenue.unitPrice', 'quantityBasedRevenue.dailyQuantity', 'quantityBasedRevenue.mdrPercentage', 'quantityBasedRevenue.cogsPercentage']
  });

  // Calculate ticket-based revenue
  useEffect(() => {
    if (businessModel === 'ticket') {
      const [averageTicketSize, dailyTickets, mdrPercentage, cogsPercentage] = ticketBasedFields;
      
      if (averageTicketSize && dailyTickets) {
        const parsedTicketSize = typeof averageTicketSize === 'string' 
          ? parseFormattedNumber(averageTicketSize) 
          : averageTicketSize || 0;
          
        const parsedDailyTickets = typeof dailyTickets === 'string'
          ? parseFloat(dailyTickets)
          : dailyTickets || 0;
          
        const dailyRevenue = parsedTicketSize * parsedDailyTickets;
        const monthlyRevenue = dailyRevenue * 30; // Assuming 30 days per month
        
        setValue('ticketBasedRevenue.dailyRevenue', dailyRevenue);
        setValue('ticketBasedRevenue.monthlyRevenue', monthlyRevenue);
        
        // Calculate transaction fee if MDR percentage is set
        if (mdrPercentage) {
          const parsedMdrPercentage = typeof mdrPercentage === 'string'
            ? parseFloat(mdrPercentage)
            : mdrPercentage || 0;
            
          const totalTransactionFee = monthlyRevenue * (parsedMdrPercentage / 100);
          setValue('ticketBasedRevenue.totalTransactionFee', totalTransactionFee);
        }
        
        // Calculate raw materials cost if COGS percentage is set
        if (cogsPercentage) {
          const parsedCogsPercentage = typeof cogsPercentage === 'string'
            ? parseFloat(cogsPercentage)
            : cogsPercentage || 0;
            
          const totalRawMaterials = monthlyRevenue * (parsedCogsPercentage / 100);
          setValue('ticketBasedRevenue.totalRawMaterials', totalRawMaterials);
        }
      }
    }
  }, [businessModel, ticketBasedFields, setValue]);

  // Calculate quantity-based revenue
  useEffect(() => {
    if (businessModel === 'quantity') {
      const [unitPrice, dailyQuantity, mdrPercentage, cogsPercentage] = quantityBasedFields;
      
      if (unitPrice && dailyQuantity) {
        const parsedUnitPrice = typeof unitPrice === 'string' 
          ? parseFormattedNumber(unitPrice) 
          : unitPrice || 0;
          
        const parsedDailyQuantity = typeof dailyQuantity === 'string'
          ? parseFloat(dailyQuantity)
          : dailyQuantity || 0;
          
        const dailyRevenue = parsedUnitPrice * parsedDailyQuantity;
        const monthlyRevenue = dailyRevenue * 30; // Assuming 30 days per month
        
        setValue('quantityBasedRevenue.dailyRevenue', dailyRevenue);
        setValue('quantityBasedRevenue.monthlyRevenue', monthlyRevenue);
        
        // Calculate transaction fee if MDR percentage is set
        if (mdrPercentage) {
          const parsedMdrPercentage = typeof mdrPercentage === 'string'
            ? parseFloat(mdrPercentage)
            : mdrPercentage || 0;
            
          const totalTransactionFee = monthlyRevenue * (parsedMdrPercentage / 100);
          setValue('quantityBasedRevenue.totalTransactionFee', totalTransactionFee);
        }
        
        // Calculate raw materials cost if COGS percentage is set
        if (cogsPercentage) {
          const parsedCogsPercentage = typeof cogsPercentage === 'string'
            ? parseFloat(cogsPercentage)
            : cogsPercentage || 0;
            
          const totalRawMaterials = monthlyRevenue * (parsedCogsPercentage / 100);
          setValue('quantityBasedRevenue.totalRawMaterials', totalRawMaterials);
        }
      }
    }
  }, [businessModel, quantityBasedFields, setValue]);

  return (
    <Card 
      title="Estimasi Pendapatan"
      subtitle="Masukkan perkiraan pendapatan bisnis Anda"
      className="mb-6"
    >
      <div className="space-y-6">
        {businessModel === 'ticket' ? (
          // Ticket-based revenue form
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-md mb-4">
              <p className="text-blue-700 text-sm">
                Model <strong>Ticket-based</strong> cocok untuk bisnis dengan banyak produk/jasa seperti restoran, kafe, toko retail, dll.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Pendapatan (Revenue)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  control={control}
                  name="ticketBasedRevenue.averageTicketSize"
                  render={({ field }) => (
                    <Input
                      label="Rata-rata Nominal per Bon"
                      prefixIcon={<span>Rp</span>}
                      value={typeof field.value === 'number' ? formatCurrency(field.value).replace('Rp', '') : field.value}
                      onChange={field.onChange}
                      onBlur={(e) => {
                        field.onBlur();
                        const value = parseFormattedNumber(e.target.value);
                        setValue('ticketBasedRevenue.averageTicketSize', value);
                      }}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="ticketBasedRevenue.dailyTickets"
                  render={({ field }) => (
                    <Input
                      label="Jumlah Bon per Hari"
                      type="number"
                      min={0}
                      suffixIcon={<span>bon</span>}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="ticketBasedRevenue.dailyRevenue"
                  render={({ field }) => (
                    <Input
                      label="Revenue Harian"
                      prefixIcon={<span>Rp</span>}
                      value={typeof field.value === 'number' ? formatCurrency(field.value).replace('Rp', '') : field.value}
                      disabled
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="ticketBasedRevenue.monthlyRevenue"
                  render={({ field }) => (
                    <Input
                      label="Revenue Bulanan"
                      prefixIcon={<span>Rp</span>}
                      value={typeof field.value === 'number' ? formatCurrency(field.value).replace('Rp', '') : field.value}
                      disabled
                    />
                  )}
                />
              </div>

              <h3 className="font-medium text-gray-700 mt-6">Merchant Discount Rate (MDR)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  control={control}
                  name="ticketBasedRevenue.mdrPercentage"
                  render={({ field }) => (
                    <Input
                      label="Fee Transaksi Online"
                      type="number"
                      min={0}
                      max={100}
                      step={0.1}
                      suffixIcon={<span>%</span>}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="ticketBasedRevenue.totalTransactionFee"
                  render={({ field }) => (
                    <Input
                      label="Total Fee Transaksi"
                      prefixIcon={<span>Rp</span>}
                      value={typeof field.value === 'number' ? formatCurrency(field.value).replace('Rp', '') : field.value}
                      disabled
                    />
                  )}
                />
              </div>

              <h3 className="font-medium text-gray-700 mt-6">Harga Pokok Penjualan (COGS)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  control={control}
                  name="ticketBasedRevenue.cogsPercentage"
                  render={({ field }) => (
                    <Input
                      label="COGS Margin (asumsi)"
                      type="number"
                      min={0}
                      max={100}
                      step={0.1}
                      suffixIcon={<span>%</span>}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="ticketBasedRevenue.totalRawMaterials"
                  render={({ field }) => (
                    <Input
                      label="Total Bahan Baku"
                      prefixIcon={<span>Rp</span>}
                      value={typeof field.value === 'number' ? formatCurrency(field.value).replace('Rp', '') : field.value}
                      disabled
                    />
                  )}
                />
              </div>
            </div>
          </div>
        ) : (
          // Quantity-based revenue form
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-md mb-4">
              <p className="text-blue-700 text-sm">
                Model <strong>Quantity-based</strong> cocok untuk bisnis dengan 1 produk/jasa utama seperti lapangan futsal, warnet, jasa fotografi, dll.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Pendapatan (Revenue)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  control={control}
                  name="quantityBasedRevenue.unitPrice"
                  render={({ field }) => (
                    <Input
                      label="Harga Jual per Unit"
                      prefixIcon={<span>Rp</span>}
                      value={typeof field.value === 'number' ? formatCurrency(field.value).replace('Rp', '') : field.value}
                      onChange={field.onChange}
                      onBlur={(e) => {
                        field.onBlur();
                        const value = parseFormattedNumber(e.target.value);
                        setValue('quantityBasedRevenue.unitPrice', value);
                      }}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="quantityBasedRevenue.dailyQuantity"
                  render={({ field }) => (
                    <Input
                      label="Jumlah Penjualan per Hari"
                      type="number"
                      min={0}
                      suffixIcon={<span>unit</span>}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="quantityBasedRevenue.dailyRevenue"
                  render={({ field }) => (
                    <Input
                      label="Revenue Harian"
                      prefixIcon={<span>Rp</span>}
                      value={typeof field.value === 'number' ? formatCurrency(field.value).replace('Rp', '') : field.value}
                      disabled
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="quantityBasedRevenue.monthlyRevenue"
                  render={({ field }) => (
                    <Input
                      label="Revenue Bulanan"
                      prefixIcon={<span>Rp</span>}
                      value={typeof field.value === 'number' ? formatCurrency(field.value).replace('Rp', '') : field.value}
                      disabled
                    />
                  )}
                />
              </div>

              <h3 className="font-medium text-gray-700 mt-6">Merchant Discount Rate (MDR)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  control={control}
                  name="quantityBasedRevenue.mdrPercentage"
                  render={({ field }) => (
                    <Input
                      label="Fee Transaksi Online"
                      type="number"
                      min={0}
                      max={100}
                      step={0.1}
                      suffixIcon={<span>%</span>}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="quantityBasedRevenue.totalTransactionFee"
                  render={({ field }) => (
                    <Input
                      label="Total Fee Transaksi"
                      prefixIcon={<span>Rp</span>}
                      value={typeof field.value === 'number' ? formatCurrency(field.value).replace('Rp', '') : field.value}
                      disabled
                    />
                  )}
                />
              </div>

              <h3 className="font-medium text-gray-700 mt-6">Harga Pokok Penjualan (COGS)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  control={control}
                  name="quantityBasedRevenue.cogsPercentage"
                  render={({ field }) => (
                    <Input
                      label="COGS Margin (asumsi)"
                      type="number"
                      min={0}
                      max={100}
                      step={0.1}
                      suffixIcon={<span>%</span>}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="quantityBasedRevenue.totalRawMaterials"
                  render={({ field }) => (
                    <Input
                      label="Total Bahan Baku"
                      prefixIcon={<span>Rp</span>}
                      value={typeof field.value === 'number' ? formatCurrency(field.value).replace('Rp', '') : field.value}
                      disabled
                    />
                  )}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}