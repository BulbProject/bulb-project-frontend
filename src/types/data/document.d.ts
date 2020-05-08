import type { Document as OCDSDocument } from 'ts4ocds';

export type Document = OCDSDocument & { relatesTo: string; relatedItem: string };
