import { describe, expect, it } from 'vitest';
import { dishes } from '@/config/restaurant';
import { formatPrice, localizedDish, matchesDish } from '@/i18n/translations';
import { bookingMessage, bookingSchema, telegramBookingUrl, type BookingValues } from '@/lib/booking';
const request: BookingValues = {name:'Zohid',phone:'+998 94 196 31 54',date:'2026-11-25',time:'14:00',guests:'4',note:'Window seat'};
describe('Bilingual restaurant rules',()=>{
 it('preserves every menu product, photograph, unit and size when localizing',()=>{
  expect(dishes).toHaveLength(17);
  for (const dish of dishes) {
   const en=localizedDish(dish,'en');
   expect(en.id).toBe(dish.id);expect(en.category).toBe(dish.category);expect(en.image).toBe(dish.image);expect(en.size).toBe(dish.size);
   expect(Number(en.price.split(' UZS')[0]?.replaceAll(',',''))).toBe(Number(dish.price.split(' so')[0]?.replaceAll(' ','')));
   expect(en.price.split('UZS')[1]).toBe(dish.price.split('so‘m')[1]?.replace('porsiya','portion'));
  }
 });
 it('formats prices as UZS without converting their value',()=>{
  expect(formatPrice('15 000 so‘m','en')).toBe('15,000 UZS');
  expect(formatPrice('250 000 so‘m / kg','en')).toBe('250,000 UZS / kg');
  expect(formatPrice('50 000 so‘m / porsiya','en')).toBe('50,000 UZS / portion');
  expect(formatPrice('15 000 so‘m','uz')).toBe('15 000 so‘m');
 });
 it('finds Osh with either plov or osh and soup with apostrophe variants',()=>{
  expect(dishes.filter(d=>matchesDish(d,'plov')).map(d=>d.id)).toEqual(['osh']);
  expect(dishes.filter(d=>matchesDish(d,'osh')).map(d=>d.id)).toContain('osh');
  expect(dishes.filter(d=>matchesDish(d,"sho'rva")).map(d=>d.id)).toEqual(['shorva']);
 });
 it('keeps the exact Telegram recipient and unambiguous English request details',()=>{
  const url=new URL(telegramBookingUrl(request,'en'));
  expect(url.origin+url.pathname).toBe('https://t.me/+998941963154');
  const message=bookingMessage(request,'en');
  expect(url.searchParams.get('text')).toBe(message);
  expect(message).toContain('Date: 2026-11-25');expect(message).toContain('Arrival time: 14:00 (Asia/Tashkent, UTC+5)');expect(message).toContain('Number of guests: 4');expect(message).toContain('Phone: +998 94 196 31 54');
  expect(bookingMessage(request,'uz')).toContain('JOY BAND QILISH SO‘ROVI');
 });
 it('applies the same arrival and guest rules in both languages',()=>{
  const now=new Date('2026-11-24T10:00:00Z');
  for (const language of ['uz','en'] as const) {
   expect(bookingSchema(now,language).safeParse(request).success).toBe(true);
   expect(bookingSchema(now,language).safeParse({...request,time:'00:00'}).success).toBe(false);
   expect(bookingSchema(now,language).safeParse({...request,guests:'0'}).success).toBe(false);
  }
 });
});
