'use client';

import { useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CATEGORIES, CONTINGENCY_PERCENTAGE, formatCurrency, parseFormattedNumber } from '@/lib/constants';

export function CapitalExpenses() {
  const { control, register, watch, setValue } = useFormContext();
  const [isExpanded, setIsExpanded] = useState(true);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'capitalExpenses',
  });

  const handleAddExpense = () => {
    append({
      id: uuidv4(),
      category: CATEGORIES.capex[0].value,
      item: '',
      unitPrice: 0,
      quantity: 1,
      unit: 'unit',
      totalCost: 0,
      notes: '',
    });
  };

  // Calculate total cost when unit price or quantity changes
  const calculateTotalCost = (index: number) => {
    try {
      const unitPrice = parseFormattedNumber(watch(`capitalExpenses.${index}.unitPrice`));
      const quantity = parseFloat(String(watch(`capitalExpenses.${index}.quantity`) || '1'));
      const totalCost = unitPrice * quantity;
      
      setValue(`capitalExpenses.${index}.totalCost`, totalCost);
    } catch (error) {
      console.error('Error calculating total cost:', error);
    }
  };

  // Calculate total capital expenses
  const subtotalCapitalExpenses = fields.reduce((sum, _, index) => {
    try {
      const totalCost = parseFormattedNumber(watch(`capitalExpenses.${index}.totalCost`));
      return sum + totalCost;
    } catch (error) {
      console.error('Error calculating subtotal capital expenses:', error);
      return sum;
    }
  }, 0);
  
  // Add contingency (typically 10% of capital expenses)
  const contingencyAmount = subtotalCapitalExpenses * (CONTINGENCY_PERCENTAGE / 100);
  const totalCapitalExpenses = subtotalCapitalExpenses + contingencyAmount;

  return (
    <Card 
      title="Modal Awal (Capital Expenditure)"
      subtitle="Masukkan kebutuhan peralatan dan aset untuk memulai bisnis"
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
                <p className="text-sm text-gray-600 mr-2">Subtotal:</p>
                <p className="font-medium">{formatCurrency(subtotalCapitalExpenses)}</p>
              </div>
              <div className="flex items-center mb-1">
                <p className="text-sm text-gray-600 mr-2">Biaya Tak Terduga ({CONTINGENCY_PERCENTAGE}%):</p>
                <p className="font-medium">{formatCurrency(contingencyAmount)}</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm text-gray-600 mr-2">Total Modal Awal:</p>
                <p className="font-semibold text-lg">{formatCurrency(totalCapitalExpenses)}</p>
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
                        name={`capitalExpenses.${index}.category`}
                        render={({ field }) => (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Kategori
                            </label>
                            <select
                              {...field}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                              {CATEGORIES.capex.map((category) => (
                                <option key={category.value} value={category.value}>
                                  {category.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      />

                      <Input
                        label="Nama Item / Produk"
                        {...register(`capitalExpenses.${index}.item`)}
                      />

                      <Controller
                        control={control}
                        name={`capitalExpenses.${index}.unitPrice`}
                        render={({ field }) => (
                          <Input
                            label="Harga Satuan"
                            type="text"
                            prefixIcon={<span>Rp</span>}
                            value={typeof field.value === 'number' ? 
                              formatCurrency(field.value).replace('Rp', '') : 
                              field.value || ''}
                            onChange={(e) => {
                              field.onChange(e);
                              setTimeout(() => calculateTotalCost(index), 0);
                            }}
                            onBlur={(e) => {
                              field.onBlur();
                              const value = parseFormattedNumber(e.target.value);
                              setValue(`capitalExpenses.${index}.unitPrice`, value);
                              calculateTotalCost(index);
                            }}
                          />
                        )}
                      />

                      <div className="flex gap-4">
                        <Controller
                          control={control}
                          name={`capitalExpenses.${index}.quantity`}
                          render={({ field }) => (
                            <Input
                              label="Jumlah"
                              type="number"
                              min={1}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e);
                                setTimeout(() => calculateTotalCost(index), 0);
                              }}
                            />
                          )}
                        />

                        <Input
                          label="Satuan"
                          defaultValue="unit"
                          {...register(`capitalExpenses.${index}.unit`)}
                        />
                      </div>

                      <Controller
                        control={control}
                        name={`capitalExpenses.${index}.totalCost`}
                        render={({ field }) => (
                          <Input
                            label="Total Biaya"
                            prefixIcon={<span>Rp</span>}
                            value={typeof field.value === 'number' ? 
                              formatCurrency(field.value).replace('Rp', '') : 
                              field.value || ''}
                            disabled
                          />
                        )}
                      />

                      <Input
                        label="Keterangan (opsional)"
                        {...register(`capitalExpenses.${index}.notes`)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500 mb-4">Belum ada item modal awal yang ditambahkan</p>
              </div>
            )}

            <div className="flex justify-center mt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAddExpense}
                className="flex items-center gap-2"
              >
                <PlusIcon className="h-4 w-4" />
                <span>Tambah Item</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}