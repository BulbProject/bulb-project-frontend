import { Item as OCDSItem } from 'ts4ocds';

export type Item = Omit<OCDSItem, 'quantity' | 'unit'>;
