'use client';

import { useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { BUFFER_CASH_MULTIPLIER, CATEGORIES, formatCurrency, parseFormattedNumber } from '@/lib/constants';

export function Operational() {
  const { control, register, watch, setValue } = useFormContext();
  const [isExpanded, setIsExpanded] = useState(true);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'operationalCosts',
  });

  const handleAddOperational = () => {
    append({
      id: uuidv4(),
      category: CATEGORIES.operational[0].value,
      item: '',
      monthlyCost: 0,
      quantity: 1,
      unit: 'bulan',
      totalCost: 0,
      notes: '',
    });
  };

  // Calculate total cost when monthly cost or quantity changes
  const calculateTotalCost = (index: number) => {
    const monthlyCost = parseFormattedNumber(watch(`operationalCosts.${index}.monthlyCost`) || '0');
    const quantity = parseFloat(watch(`operationalCosts.${index}.quantity`) || '1');
    const totalCost = monthlyCost * quantity;
    setValue(`operationalCosts.${index}.totalCost`, totalCost);
  };

  // Calculate total operational costs
  const totalMonthlyOperationalCosts = fields.reduce((sum, _, index) => {
    const totalCost = parseFormattedNumber(watch(`operationalCosts.${index}.totalCost`) || '0');
    return sum + totalCost;
  }, 0);

  // Calculate buffer cash (typically 3x monthly operational costs)
  const bufferCash = totalMonthlyOperationalCosts * BUFFER_CASH_MULTIPLIER;

  return (
    <Card 
      title="Biaya Operasional Bulanan"
      subtitle="Masukkan estimasi biaya operasional rutin setiap bulan"
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
            <div className="flex flex-col items-end">
              <div className="flex items-center mb-1">
                <p className="text-sm text-gray-600 mr-2">Total Operasional Bulanan:</p>
                <p className="font-medium">{formatCurrency(totalMonthlyOperationalCosts)}</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm text-gray-600 mr-2">Buffer Cash ({BUFFER_CASH_MULTIPLIER}x):</p>
                <p className="font-semibold text-lg">{formatCurrency(bufferCash)}</p>
              </div>
            </div>
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
                        name={`operationalCosts.${index}.category`}
                        render={({ field }) => (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Kategori
                            </label>
                            <select
                              {...field}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                              {CATEGORIES.operational.map((category) => (
                                <option key={category.value} value={category.value}>
                                  {category.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      />

                      <Input
                        label="Deskripsi"
                        {...register(`operationalCosts.${index}.item`)}
                      />

                      <Controller
                        control={control}
                        name={`operationalCosts.${index}.monthlyCost`}
                        render={({ field }) => (
                          <Input
                            label="Biaya Bulanan"
                            type="text"
                            prefixIcon={<span>Rp</span>}
                            value={typeof field.value === 'number' ? formatCurrency(field.value).replace('Rp', '') : field.value}
                            onChange={(e) => {
                              field.onChange(e);
                              calculateTotalCost(index);
                            }}
                            onBlur={(e) => {
                              field.onBlur();
                              const value = parseFormattedNumber(e.target.value);
                              setValue(`operationalCosts.${index}.monthlyCost`, value);
                              calculateTotalCost(index);
                            }}
                          />
                        )}
                      />

                      <div className="flex gap-4">
                        <Controller
                          control={control}
                          name={`operationalCosts.${index}.quantity`}
                          render={({ field }) => (
                            <Input
                              label="Jumlah"
                              type="number"
                              min={1}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e);
                                calculateTotalCost(index);
                              }}
                            />
                          )}
                        />

                        <Input
                          label="Satuan"
                          defaultValue="bulan"
                          {...register(`operationalCosts.${index}.unit`)}
                          disabled
                        />
                      </div>

                      <Controller
                        control={control}
                        name={`operationalCosts.${index}.totalCost`}
                        render={({ field }) => (
                          <Input
                            label="Total Biaya Bulanan"
                            prefixIcon={<span>Rp</span>}
                            value={typeof field.value === 'number' ? formatCurrency(field.value).replace('Rp', '') : field.value}
                            disabled
                          />
                        )}
                      />

                      <Input
                        label="Keterangan (opsional)"
                        {...register(`operationalCosts.${index}.notes`)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500 mb-4">Belum ada biaya operasional yang ditambahkan</p>
              </div>
            )}

            <div className="flex justify-center mt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAddOperational}
                className="flex items-center gap-2"
              >
                <PlusIcon className="h-4 w-4" />
                <span>Tambah Biaya Operasional</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}