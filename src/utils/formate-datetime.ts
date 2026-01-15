import {
  formatDistanceToNow as dateFnsFormatDistanceToNow,
  format,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDateTime(rawDate: string): string {
  const date = new Date(rawDate);
  return format(date, "dd/MM/yyyy 'ás' HH'h'mm", {
    locale: ptBR,
  });
}

export function formatDistanceToNow(rawDate: string): string {
  const date = new Date(rawDate);
  return dateFnsFormatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true,
  });
}

const rawDate = '2026-01-15T19:18:11.476Z';
console.log(rawDate);
console.log(formatDistanceToNow(rawDate));
