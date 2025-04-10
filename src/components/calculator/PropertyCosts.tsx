'use client';

import { useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CATEGORIES, formatCurrency, parseFormattedNumber } from '@/lib/constants';
import { PropertyCost } from '@/lib/calculator';

export function PropertyCosts() {
  const { control, register, watch, setValue } = useFormContext();
  const [isExpanded, setIsExpanded] = useState(true);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'propertyCosts',
  });

  const handleAddProperty = () => {
    append({
      id: uuidv4(),
      category: CATEGORIES.property[0].value,
      location: '',
      monthlyRent: 0,
      quantity: 1,
      unit: 'bulan',
      annualRent: 0,
      notes: '',
    });
  };

  // Calculate annual rent when monthly rent or quantity changes
  const calculateAnnualRent = (index: number) => {
    try {
      const monthlyRent = parseFormattedNumber(watch(`propertyCosts.${index}.monthlyRent`));
      const quantity = parseFloat(String(watch(`propertyCosts.${index}.quantity`) || '1'));
      const annualRent = monthlyRent * quantity * 12;
      
      setValue(`propertyCosts.${index}.annualRent`, annualRent);
    } catch (error) {
      console.error('Error calculating annual rent:', error);
    }
  };

  // Calculate total property costs
  const totalPropertyCosts = fields.reduce((sum, _, index) => {
    try {
      const annualRent = parseFormattedNumber(watch(`propertyCosts.${index}.annualRent`));
      return sum + annualRent;
    } catch (error) {
      console.error('Error calculating total property costs:', error);
      return sum;
    }
  }, 0);

  return (
    <Card 
      title="Biaya Sewa Tempat"
      subtitle="Masukkan biaya sewa lokasi bisnis Anda"
      className="mb-6"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <button 
            type="button"
            className="text-primary text-sm font-medium flex items-center focus:outline-none"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Ciutkan' : 'Perluas'}
          </button>
          
          <div className="text-right">
            <p className="text-sm text-gray-600">Total Sewa Tahunan</p>
            <p className="font-semibold text-lg">{formatCurrency(totalPropertyCosts)}</p>
          </div>
        </div>

        {isExpanded && (
          <>
            {fields.length > 0 ? (
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between mb-3">
                      <h4 className="font-medium">Item {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-gray-500 hover:text-destructive"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Controller
                        control={control}
                        name={`propertyCosts.${index}.category`}
                        render={({ field }) => (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Kategori
                            </label>
                            <select
                              {...field}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                              {CATEGORIES.property.map((category) => (
                                <option key={category.value} value={category.value}>
                                  {category.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      />

                      <Input
                        label="Lokasi"
                        {...register(`propertyCosts.${index}.location`)}
                      />

                      <Controller
                        control={control}
                        name={`propertyCosts.${index}.monthlyRent`}
                        render={({ field }) => (
                          <Input
                            label="Sewa Bulanan"
                            type="text"
                            prefixIcon={<span>Rp</span>}
                            value={typeof field.value === 'number' ? 
                              formatCurrency(field.value).replace('Rp', '').trim() : 
                              field.value}
                            onChange={(e) => {
                              field.onChange(e);
                              setTimeout(() => calculateAnnualRent(index), 0);
                            }}
                            onBlur={(e) => {
                              field.onBlur();
                              const value = parseFormattedNumber(e.target.value);
                              setValue(`propertyCosts.${index}.monthlyRent`, value);
                              calculateAnnualRent(index);
                            }}
                          />
                        )}
                      />

                      <div className="flex gap-4">
                        <Controller
                          control={control}
                          name={`propertyCosts.${index}.quantity`}
                          render={({ field }) => (
                            <Input
                              label="Jumlah"
                              type="number"
                              min={1}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e);
                                setTimeout(() => calculateAnnualRent(index), 0);
                              }}
                            />
                          )}
                        />

                        <Input
                          label="Satuan"
                          defaultValue="bulan"
                          {...register(`propertyCosts.${index}.unit`)}
                          disabled
                        />
                      </div>

                      <Controller
                        control={control}
                        name={`propertyCosts.${index}.annualRent`}
                        render={({ field }) => (
                          <Input
                            label="Sewa Tahunan"
                            prefixIcon={<span>Rp</span>}
                            value={typeof field.value === 'number' ? 
                              formatCurrency(field.value).replace('Rp', '').trim() : 
                              field.value}
                            disabled
                          />
                        )}
                      />

                      <Input
                        label="Keterangan (opsional)"
                        {...register(`propertyCosts.${index}.notes`)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500 mb-4">Belum ada biaya sewa yang ditambahkan</p>
              </div>
            )}

            <div className="flex justify-center mt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAddProperty}
                className="flex items-center gap-2"
              >
                <PlusIcon className="h-4 w-4" />
                <span>Tambah Biaya Sewa</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}