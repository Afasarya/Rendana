'use client';

import { useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CATEGORIES, formatCurrency, parseFormattedNumber } from '@/lib/constants';

export function Inventory() {
  const { control, register, watch, setValue } = useFormContext();
  const [isExpanded, setIsExpanded] = useState(true);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'inventory',
  });

  const handleAddInventory = () => {
    append({
      id: uuidv4(),
      category: CATEGORIES.inventory[0].value,
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
    const unitPrice = parseFormattedNumber(watch(`inventory.${index}.unitPrice`) || '0');
    const quantity = parseFloat(watch(`inventory.${index}.quantity`) || '1');
    const totalCost = unitPrice * quantity;
    setValue(`inventory.${index}.totalCost`, totalCost);
  };

  // Calculate total inventory cost
  const totalInventoryCost = fields.reduce((sum, _, index) => {
    const totalCost = parseFormattedNumber(watch(`inventory.${index}.totalCost`) || '0');
    return sum + totalCost;
  }, 0);

  return (
    <Card 
      title="Inventaris Awal (Initial Inventory)"
      subtitle="Masukkan kebutuhan bahan baku atau persediaan awal bisnis"
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
            <p className="text-sm text-gray-600">Total Inventaris Awal</p>
            <p className="font-semibold text-lg">{formatCurrency(totalInventoryCost)}</p>
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
                        name={`inventory.${index}.category`}
                        render={({ field }) => (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Kategori
                            </label>
                            <select
                              {...field}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                              {CATEGORIES.inventory.map((category) => (
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
                        {...register(`inventory.${index}.item`)}
                      />

                      <Controller
                        control={control}
                        name={`inventory.${index}.unitPrice`}
                        render={({ field }) => (
                          <Input
                            label="Harga Satuan"
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
                              setValue(`inventory.${index}.unitPrice`, value);
                              calculateTotalCost(index);
                            }}
                          />
                        )}
                      />

                      <div className="flex gap-4">
                        <Controller
                          control={control}
                          name={`inventory.${index}.quantity`}
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
                          defaultValue="unit"
                          {...register(`inventory.${index}.unit`)}
                        />
                      </div>

                      <Controller
                        control={control}
                        name={`inventory.${index}.totalCost`}
                        render={({ field }) => (
                          <Input
                            label="Total Biaya"
                            prefixIcon={<span>Rp</span>}
                            value={typeof field.value === 'number' ? formatCurrency(field.value).replace('Rp', '') : field.value}
                            disabled
                          />
                        )}
                      />

                      <Input
                        label="Keterangan (opsional)"
                        {...register(`inventory.${index}.notes`)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500 mb-4">Belum ada item inventaris yang ditambahkan</p>
                <p className="text-sm text-gray-500">Jika bisnis Anda tidak memerlukan inventaris awal, Anda bisa melewati bagian ini</p>
              </div>
            )}

            <div className="flex justify-center mt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAddInventory}
                className="flex items-center gap-2"
              >
                <PlusIcon className="h-4 w-4" />
                <span>Tambah Inventaris</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}