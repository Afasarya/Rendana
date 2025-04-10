'use client';

import { useState } from 'react';
import { useForm, FormProvider, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PropertyCosts } from './PropertyCosts';
import { CapitalExpenses } from './CapitalExpenses';
import { Inventory } from './Inventory';
import { Operational } from './Operational';
import { Revenue } from './Revenue';
import { Results } from './Results';
import { BUSINESS_MODELS } from '@/lib/constants';
import { BusinessCalculatorForm, businessCalculatorSchema, defaultValues } from '@/lib/validation';
import { ArrowDownIcon } from '@heroicons/react/24/outline';

export function CalculatorForm() {
  const [submitting, setSubmitting] = useState(false);
  
  // Fix resolver type issues by ensuring the schema is correctly applied
  const methods = useForm<BusinessCalculatorForm>({
    resolver: zodResolver(businessCalculatorSchema) as Resolver<BusinessCalculatorForm>, // Properly typed resolver
    defaultValues,
    mode: 'onChange',
  });
  
  const { 
    handleSubmit, 
    register, 
    formState: { errors },
    watch,
    setValue,
    trigger
  } = methods;
  
  const businessModel = watch('businessModel');
  
  // Fix submit handler type signature
  const onSubmit: SubmitHandler<BusinessCalculatorForm> = async (data) => {
    setSubmitting(true);
    
    try {
      // Trigger calculation (actually this is already done real-time)
      // You could add additional validation or processing here
      console.log('Form submitted with data:', data);
      
      // Scroll to results section
      const resultsElement = document.getElementById('results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleModelChange = (model: string) => {
    setValue('businessModel', model as 'ticket' | 'quantity');
    
    // Initialize the appropriate revenue model with default values if empty
    if (model === 'ticket' && !watch('ticketBasedRevenue')) {
      setValue('ticketBasedRevenue', defaultValues.ticketBasedRevenue);
    } else if (model === 'quantity' && !watch('quantityBasedRevenue')) {
      setValue('quantityBasedRevenue', defaultValues.quantityBasedRevenue);
    }
    
    trigger(); // Validate after changing model
  };
  
  const handleAddSampleData = () => {
    // Add sample property cost
    setValue('propertyCosts', [
      {
        id: uuidv4(),
        category: 'Sewa Lahan/Tempat',
        location: 'Lokasi Bisnis',
        monthlyRent: 5000000,
        quantity: 1,
        unit: 'bulan',
        annualRent: 60000000,
        notes: 'Sewa tahunan',
      }
    ]);
    
    // Add sample capital expenses
    setValue('capitalExpenses', [
      {
        id: uuidv4(),
        category: 'Peralatan - Mesin',
        item: 'Mesin #1',
        unitPrice: 15000000,
        quantity: 1,
        unit: 'unit',
        totalCost: 15000000,
        notes: '',
      },
      {
        id: uuidv4(),
        category: 'Furniture',
        item: 'Meja & Kursi',
        unitPrice: 2000000,
        quantity: 1,
        unit: 'set',
        totalCost: 2000000,
        notes: '',
      }
    ]);
    
    // Add sample inventory
    setValue('inventory', [
      {
        id: uuidv4(),
        category: 'Bahan Baku',
        item: 'Persediaan Awal',
        unitPrice: 5000000,
        quantity: 1,
        unit: 'lot',
        totalCost: 5000000,
        notes: '',
      }
    ]);
    
    // Add sample operational costs
    setValue('operationalCosts', [
      {
        id: uuidv4(),
        category: 'Gaji Karyawan',
        item: 'Karyawan (2 orang)',
        monthlyCost: 8000000,
        quantity: 1,
        unit: 'bulan',
        totalCost: 8000000,
        notes: '',
      },
      {
        id: uuidv4(),
        category: 'Utilitas (Listrik, Air, Gas)',
        item: 'Listrik & Air',
        monthlyCost: 2000000,
        quantity: 1,
        unit: 'bulan',
        totalCost: 2000000,
        notes: '',
      }
    ]);
    
    // Add sample revenue data based on chosen model
    if (businessModel === 'ticket') {
      setValue('ticketBasedRevenue', {
        averageTicketSize: 100000,
        dailyTickets: 20,
        dailyRevenue: 2000000,
        monthlyRevenue: 60000000,
        mdrPercentage: 2,
        totalTransactionFee: 1200000,
        cogsPercentage: 30,
        totalRawMaterials: 18000000,
      });
    } else {
      setValue('quantityBasedRevenue', {
        unitPrice: 50000,
        dailyQuantity: 40,
        dailyRevenue: 2000000,
        monthlyRevenue: 60000000,
        mdrPercentage: 2,
        totalTransactionFee: 1200000,
        cogsPercentage: 30,
        totalRawMaterials: 18000000,
      });
    }
    
    // Set businessName as well to ensure required fields are populated
    setValue('businessName', 'Bisnis Contoh');
    
    trigger(); // Validate after adding sample data
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                label="Nama Bisnis"
                placeholder="Masukkan nama bisnis Anda"
                error={errors.businessName?.message}
                {...register('businessName')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model Perhitungan
              </label>
              <div className="flex flex-col space-y-2">
                {BUSINESS_MODELS.map((model) => (
                  <label
                    key={model.value}
                    className={`flex items-center space-x-2 p-3 border rounded-md cursor-pointer transition-colors ${
                      businessModel === model.value
                        ? 'border-primary bg-blue-50'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      value={model.value}
                      checked={businessModel === model.value}
                      onChange={() => handleModelChange(model.value)}
                      className="text-primary"
                    />
                    <span>{model.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleAddSampleData}
            >
              Isi Data Contoh
            </Button>
          </div>
        </Card>
        
        <PropertyCosts />
        <CapitalExpenses />
        <Inventory />
        <Operational />
        <Revenue />
        
        <div className="flex justify-center mt-8 mb-4">
          <Button 
            type="submit" 
            size="lg"
            disabled={submitting}
            className="px-8 py-3 text-lg"
          >
            {submitting ? 'Menghitung...' : 'Hitung Investasi & Balik Modal'}
          </Button>
        </div>
        
        <div className="flex justify-center text-center">
          <p className="text-gray-500 flex items-center">
            <ArrowDownIcon className="h-4 w-4 mr-1" />
            Hasil perhitungan akan muncul di bawah
          </p>
        </div>
        
        <div id="results-section">
          <Results />
        </div>
      </form>
    </FormProvider>
  );
}