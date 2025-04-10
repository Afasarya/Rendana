import { z } from 'zod';

export const businessCalculatorSchema = z.object({
  businessName: z.string().min(1, 'Nama bisnis harus diisi'),
  businessModel: z.enum(['ticket', 'quantity']),
  
  propertyCosts: z.array(
    z.object({
      id: z.string(),
      category: z.string(),
      location: z.string().optional(),
      monthlyRent: z.number().min(0, 'Biaya sewa harus 0 atau lebih'),
      quantity: z.number().min(1, 'Jumlah harus lebih dari 0'),
      unit: z.string(),
      annualRent: z.number().optional(),
      notes: z.string().optional(),
    })
  ).optional().default([]),
  
  capitalExpenses: z.array(
    z.object({
      id: z.string(),
      category: z.string(),
      item: z.string().optional(),
      unitPrice: z.number().min(0, 'Harga harus 0 atau lebih'),
      quantity: z.number().min(1, 'Jumlah harus lebih dari 0'),
      unit: z.string(),
      totalCost: z.number().optional(),
      notes: z.string().optional(),
    })
  ).optional().default([]),
  
  inventory: z.array(
    z.object({
      id: z.string(),
      category: z.string(),
      item: z.string().optional(),
      unitPrice: z.number().min(0, 'Harga harus 0 atau lebih'),
      quantity: z.number().min(1, 'Jumlah harus lebih dari 0'),
      unit: z.string(),
      totalCost: z.number().optional(),
      notes: z.string().optional(),
    })
  ).optional().default([]),
  
  operationalCosts: z.array(
    z.object({
      id: z.string(),
      category: z.string(),
      item: z.string().optional(),
      monthlyCost: z.number().min(0, 'Biaya harus 0 atau lebih'),
      quantity: z.number().min(1, 'Jumlah harus lebih dari 0'),
      unit: z.string(),
      totalCost: z.number().optional(),
      notes: z.string().optional(),
    })
  ).optional().default([]),
  
  ticketBasedRevenue: z.object({
    averageTicketSize: z.number().min(0, 'Harga tiket harus 0 atau lebih'),
    dailyTickets: z.number().min(0, 'Jumlah tiket harus 0 atau lebih'),
    dailyRevenue: z.number().optional(),
    monthlyRevenue: z.number().optional(),
    mdrPercentage: z.number().min(0, 'Persentase harus 0 atau lebih').max(100, 'Persentase maksimal 100').default(0),
    totalTransactionFee: z.number().optional(),
    cogsPercentage: z.number().min(0, 'Persentase harus 0 atau lebih').max(100, 'Persentase maksimal 100').default(0),
    totalRawMaterials: z.number().optional(),
  }).optional(),
  
  quantityBasedRevenue: z.object({
    unitPrice: z.number().min(0, 'Harga unit harus 0 atau lebih'),
    dailyQuantity: z.number().min(0, 'Jumlah unit harus 0 atau lebih'),
    dailyRevenue: z.number().optional(),
    monthlyRevenue: z.number().optional(),
    mdrPercentage: z.number().min(0, 'Persentase harus 0 atau lebih').max(100, 'Persentase maksimal 100').default(0),
    totalTransactionFee: z.number().optional(),
    cogsPercentage: z.number().min(0, 'Persentase harus 0 atau lebih').max(100, 'Persentase maksimal 100').default(0),
    totalRawMaterials: z.number().optional(),
  }).optional(),
});

export type BusinessCalculatorForm = z.infer<typeof businessCalculatorSchema>;

export const defaultValues: BusinessCalculatorForm = {
  businessName: '',
  businessModel: 'ticket',
  propertyCosts: [],
  capitalExpenses: [],
  inventory: [],
  operationalCosts: [],
  ticketBasedRevenue: {
    averageTicketSize: 0,
    dailyTickets: 0,
    dailyRevenue: 0,
    monthlyRevenue: 0,
    mdrPercentage: 0,
    totalTransactionFee: 0,
    cogsPercentage: 0,
    totalRawMaterials: 0,
  },
  quantityBasedRevenue: {
    unitPrice: 0,
    dailyQuantity: 0,
    dailyRevenue: 0,
    monthlyRevenue: 0,
    mdrPercentage: 0,
    totalTransactionFee: 0,
    cogsPercentage: 0,
    totalRawMaterials: 0,
  },
};