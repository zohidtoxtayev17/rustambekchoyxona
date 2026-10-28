import type { Dish } from '@/config/restaurant';
export type Language = 'uz' | 'en';
export const languageStorageKey = 'rustambek-language';
export const translations: Record<string, string> = {
'Bosh sahifa':'Home','Menyu':'Menu','Biz haqimizda':'About Us','Galereya':'Gallery','Joy band qilish':'Reserve a Table','Aloqa':'Contact',
'Milliy ta’m, samimiy muhit':'Traditional Flavours, a Warm Welcome','An’anaviy o‘zbek taomlari va unutilmas choyxona muhiti.':'Traditional Uzbek dishes and a memorable choyxona atmosphere.',
'An’anaviy o‘zbek choyxonasi muhiti (namuna rasm)':'Traditional Uzbek choyxona atmosphere (sample image)','Menyuni ko‘rish':'Explore the Menu',
'Asosiy navigatsiya':'Main navigation','Mobil navigatsiya':'Mobile navigation','Pastki navigatsiya':'Footer navigation','Menyuni yopish':'Close menu','Menyuni ochish':'Open menu','Qo‘ng‘iroq qilish':'Call the Restaurant',
'Bizning menyu':'Our Menu','Sevimli milliy taomlaringizni kashf eting.':'Discover your favourite Uzbek dishes.','Taom toifalari':'Menu categories','Barchasi':'All','Asosiy taomlar':'Main Dishes','Somsa va non':'Samsa & Bread','Salatlar':'Salads','Ichimliklar':'Drinks','Sevimlilar':'Favourites','Taom qidirish':'Search dishes','Taom qidirish...':'Search dishes...',
'Hech narsa topilmadi':'No dishes found','Boshqa so‘z bilan qidirib ko‘ring yoki boshqa toifani tanlang.':'Try another search or choose a different category.','Barcha taomlarni ko‘rsatish':'Show All Dishes','Nima tanlasam ekan?':'What Shall I Choose?','Bugun qaysi taomni tatib ko‘rishni bilmayapsizmi?':'Not sure what to try today?','Taom tavsiya qil':'Suggest a Dish','Bugungi tavsiya':'Today’s Suggestion','Ko‘rish':'View','Tavsiya':'Recommended','Narx kiritiladi':'Price to be added','Sevimlilardan olib tashlash':'Remove from favourites','Sevimlilarga qo‘shish':'Add to favourites','havolasini ulashish':'share link','Havola nusxalandi':'Link copied',
'Milliy taomlar':'Uzbek Cuisine','Samimiy muhit':'A Warm Atmosphere','An’anaviy choyxona ruhi':'Traditional Choyxona Spirit',
'Choyxona uslubidagi shinam burchak (namuna rasm)':'A cosy choyxona corner (sample image)',
'Rustambek Choyxona — milliy ta’mlar va samimiy suhbatlar uyg‘unlashadigan maskan.':'Rustambek Choyxona — a place where Uzbek flavours meet warm conversation.',
'Bu yerda har bir mehmon aziz. Issiq choy, qozondan uzilgan taom va shoshilmasdan o‘tkaziladigan suhbat — choyxona an’anasining eng go‘zal jihatlari.':'Every guest is welcome here. Hot tea, freshly cooked dishes and unhurried conversation are at the heart of the choyxona tradition.',
'O‘zbek oshi lagan likopchada':'Uzbek plov served on a traditional platter','Choyxona uslubidagi shinam burchak':'A cosy choyxona corner','Cho‘g‘da pishirilgan shashlik':'Meat skewers grilled over embers','Choynak va piyolalarda ko‘k choy':'Green tea in a teapot and traditional cups','Tandir somsa va non':'Tandoor-baked samsa and bread',
'Rasmni kattalashtirish':'Enlarge image','Rasm ko‘rish':'Image viewer','Yopish':'Close','Oldingi rasm':'Previous image','Keyingi rasm':'Next image',
'Manzil va aloqa':'Location & Contact','Manzil':'Address','Telefon raqamlari':'Phone Numbers','Ish vaqti':'Opening Hours','Har kuni 08:00–00:00':'Every day 08:00–00:00','Telegram orqali yozish':'Message on Telegram','Xaritada ko‘rish':'View on Google Maps','Ma’lumot hali kiritilmagan':'Information not yet provided','Barcha huquqlar himoyalangan.':'All rights reserved.','Raqamni tanlang':'Choose a phone number','Tezkor amallar':'Quick actions','Qo‘ng‘iroq':'Call',
'Hozir ochiq':'Open Now','Hozir yopiq':'Closed Now','Belgilangan ish vaqti bo‘yicha; bayram va kutilmagan yopilishlar hisobga olinmaydi.':'Based on scheduled hours; holidays and unexpected closures are not reflected.',
'Tashrifingizni oldindan rejalashtiring':'Plan Your Visit','Rustambek Choyxonada joy band qilish uchun qulay sana va vaqtni tanlang.':'Choose a convenient date and time to request a table at Rustambek Choyxona.',
'Bandlov xodimimiz tasdiqlaganidan keyin kuchga kiradi.':'Your reservation is only confirmed after our staff approves it.','Bandlov oynasini yopish':'Close reservation dialog','Ma’lumotlarni kiritish':'Enter Your Details','Bandlovni tekshirish':'Review Reservation','Ismingiz':'Your Name','Ismingizni kiriting':'Enter your name','Telefon raqamingiz':'Phone Number','Kelish sanasi':'Reservation Date','Sanani tanlang':'Choose a date','Kelish vaqti':'Arrival Time','Vaqtni tanlang':'Choose a time','Bugun uchun vaqtlar tugagan. Iltimos, keyingi sanani tanlang.':'No arrival times remain today. Please choose a later date.',
'Mehmonlar soni':'Number of Guests','kishi':'guests','Aniq mehmonlar soni':'Exact number of guests','Aniq sonni kiriting':'Enter the exact number','Qo‘shimcha izoh':'Additional Requests','Maxsus istaklaringiz bo‘lsa yozing...':'Let us know any special requests...',
'Bandlov ma’lumotlarini tekshiring':'Review Your Details','Telegramga o‘tishdan oldin ma’lumotlaringiz to‘g‘riligini tekshiring.':'Please check your details before continuing to Telegram.','Ism':'Name','Telefon':'Phone','Sana':'Date','Vaqt':'Time','Mehmonlar':'Guests','Izoh':'Requests','O‘zgartirish':'Edit Details',
'Davom etish orqali ma’lumotlaringiz Telegram orqali yuborish uchun tayyorlanadi.':'Continuing prepares your details for you to send through Telegram.','Telegram orqali davom etish':'Continue to Telegram','Telegram ochiladi. Xabarni yuborish uchun Telegramdagi Yuborish tugmasini bosing.':'Telegram will open. Press Send in Telegram to send your request.','Xabarni nusxalash':'Copy Message','Telegramni ochish':'Open Telegram','Nusxalash uchun bandlov xabari':'Reservation message to copy','Telefon orqali bog‘lanish':'Call the Restaurant','Xabar nusxalandi.':'Message copied.','Xabarni quyidagi maydondan qo‘lda nusxalang.':'Please copy the message manually from the field below.',
'Iltimos, ismingizni kiriting.':'Please enter your name.','Ismingiz 100 belgidan oshmasin.':'Your name must be no more than 100 characters.','Ismingizni to‘g‘ri kiriting.':'Please enter a valid name.','Telefon raqamingizni to‘g‘ri kiriting.':'Please enter a valid Uzbekistan phone number (+998 and 9 digits).','Bugungi yoki keyingi sanani tanlang.':'Please choose today or a future date.','Mehmonlar sonini tanlang.':'Please enter a positive whole number of guests.','Mehmonlar sonini to‘g‘ri kiriting.':'Please enter a valid number of guests.','Izoh 300 belgidan oshmasin.':'Requests must be no more than 300 characters.','Kelish uchun amaldagi vaqtni tanlang.':'Please choose an available future arrival time.',
'Oldingi oy':'Previous month','Keyingi oy':'Next month','Taqvim':'Calendar','bugun':'today','tanlangan':'selected',
'Sahifa topilmadi':'Page not found','Bu sahifa mavjud emas yoki ko‘chirilgan.':'This page does not exist or has been moved.','Bosh sahifaga qaytish':'Go Home','Sahifa yuklanmadi':'This page could not load','Qayta urinib ko‘ring yoki bosh sahifaga qayting.':'Please try again or return to the home page.','Qayta urinish':'Try Again',
};
export function translate(text: string, language: Language): string { return language === 'en' ? translations[text] ?? text : text; }
const englishDishes: Record<string, {name: string; description: string; varieties?: string[]}> = {
'kuskavoy-shashlik': {name:'Grilled Meat Skewers',description:'Juicy skewers of selected meat pieces, grilled over an open flame.'},
'qiyma-shashlik': {name:'Minced Meat Kebab',description:'Tender minced meat kebabs seasoned with aromatic spices.'},
 tabaka: {name:'Tabaka (Fried Chicken)',description:'Chicken fried until golden, with a tender, juicy centre.'},
 baliq: {name:'Fish',description:'A flavourful, aromatic fish dish.'},
 osh: {name:'Uzbek Plov',description:'Traditional Uzbek plov made with rice, meat, carrots and aromatic spices.'},
 shorva: {name:'Traditional Uzbek Soup',description:'A hearty, aromatic Uzbek soup made with meat and vegetables.'},
'jizzax-somsa': {name:'Large Jizzakh Samsa',description:'A large, golden-baked Jizzakh samsa with a savoury meat filling.'},
 jiz: {name:'Jiz (Traditional Meat Dish)',description:'A hearty, flavourful traditional dish made with juicy pieces of meat.'},
'achchiq-chuchuk': {name:'Achchiq-chuchuk (Tomato & Onion Salad)',description:'A traditional Uzbek salad made with tomatoes and onions.'},
 suzma: {name:'Suzma Salad',description:'A light salad made with smooth, flavourful suzma.'},
'karam-salat': {name:'Cabbage Salad',description:'A light, crunchy salad made with fresh cabbage.'},
 sezar: {name:'Caesar Salad',description:'A familiar Caesar-style salad.'},
'coca-cola': {name:'Coca-Cola',description:'A refreshing Coca-Cola soft drink.'},
 pepsi: {name:'Pepsi',description:'A refreshing, sparkling Pepsi soft drink.'},
 fanta: {name:'Fanta',description:'A refreshing orange-flavoured soft drink.'},
 dena: {name:'Dena',description:'Dena drink.'},
 choy: {name:'Tea',description:'Regular tea, lemon tea and other varieties.',varieties:['Regular tea','Lemon tea','Other varieties']},
};
export function localizedDish(dish: Dish, language: Language): Dish {
 if (language === 'uz') return dish;
 const translated = englishDishes[dish.id];
 return { ...dish, ...(translated ?? {}), price: formatPrice(dish.price, language) };
}
export function formatPrice(price: string, language: Language) {
 if (language === 'uz' || !price) return price;
 const match = price.match(/^(\d[\d ]*) so[‘'’]m(.*)$/);
 if (!match) return price;
 return `${Number(match[1]?.replaceAll(' ', '')).toLocaleString('en-US')} UZS${(match[2] ?? '').replace('porsiya','portion')}`;
}
export function matchesDish(dish: Dish, query: string) {
 const normalize = (s: string) => s.toLocaleLowerCase().normalize('NFKD').replace(/[‘’ʻʼ'`]/g,'');
 const en = localizedDish(dish,'en');
 return normalize([dish.name,dish.description,en.name,en.description,...(dish.varieties ?? []),...(en.varieties ?? [])].join(' ')).includes(normalize(query.trim()));
}
export const metadata = {
 uz: { title:'Rustambek Choyxona | Milliy taomlar',description:'Rustambek Choyxona: milliy taomlar, menyu, manzil va aloqa. Tashrifingizni rejalashtiring va Telegram orqali joy band qilish so‘rovini yuboring.' },
 en: { title:'Rustambek Choyxona | Traditional Uzbek Cuisine',description:'Explore traditional Uzbek cuisine at Rustambek Choyxona. View the menu, location and contact details, and request a table through Telegram.' },
};
