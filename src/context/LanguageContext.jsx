import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const translations = {
  en: {
    language: { label: 'Language' },
    nav: { home: 'Home', about: 'About Us', corporate: 'Corporate', products: 'Products', portfolio: 'Portfolio', contact: 'Contact', wedding: 'Wedding Printing' },
    actions: { quote: 'Request a Quote', shortQuote: 'Quote', navigation: 'Navigation Menu', customQuote: 'Request a Custom Quote', whatsapp: 'WhatsApp Studio', call: 'Call' }
  },
  hi: {
    language: { label: 'भाषा' },
    nav: { home: 'होम', about: 'हमारे बारे में', corporate: 'कॉर्पोरेट', products: 'प्रोडक्ट्स', portfolio: 'पोर्टफोलियो', contact: 'संपर्क', wedding: 'वेडिंग प्रिंटिंग' },
    actions: { quote: 'कोटेशन माँगें', shortQuote: 'कोटेशन', navigation: 'नेविगेशन मेन्यू', customQuote: 'कस्टम कोटेशन माँगें', whatsapp: 'व्हाट्सऐप स्टूडियो', call: 'कॉल करें' }
  }
};

const textTranslations = {
  hi: {
    'Trusted by Over 1,000+ Corporate, Aviation & Enterprise Leaders': '1,000+ कॉर्पोरेट, एविएशन और एंटरप्राइज़ लीडर्स का भरोसा',
    'Why Leading Enterprises Entrust Their Brand to Us': 'प्रमुख कंपनियाँ अपने ब्रांड का भरोसा हमें क्यों देती हैं',
    'Production Standard': 'उत्पादन मानक',
    'Quality checked': 'गुणवत्ता जाँची गई',
    'Customizable for Any Brand': 'हर ब्रांड के लिए कस्टमाइज़्ड',
    'Value for Money': 'पैसे का सही मूल्य',
    'Unmatched Print Quality': 'बेजोड़ प्रिंट गुणवत्ता',
    'On-Time, Every Time': 'हर बार समय पर',
    'Curated Corporate Collection': 'चुनिंदा कॉर्पोरेट कलेक्शन',
    'View All 90+ Products': '90+ प्रोडक्ट देखें',
    'Explore Our Collection': 'कलेक्शन देखें',
    'Request a Quote': 'कोटेशन माँगें',
    'Get Quote': 'कोटेशन लें',
    'Explore': 'देखें',
    'View Details': 'विवरण देखें',
    'Explore by Product Category': 'प्रोडक्ट कैटेगरी के अनुसार देखें',
    'Browse All Categories': 'सभी कैटेगरी देखें',
    'Explore Complete Gallery': 'पूरी गैलरी देखें',
    'Explore All 6 Articles': 'सभी 6 लेख देखें',
    'View': 'देखें',
    'Home': 'होम',
    'About Us': 'हमारे बारे में',
    'Products': 'प्रोडक्ट्स',
    'Services': 'सेवाएँ',
    'Portfolio': 'पोर्टफोलियो',
    'Contact': 'संपर्क',
    'Journals': 'जर्नल',
    'Wedding Printing': 'वेडिंग प्रिंटिंग',
    'Master Catalog': 'मास्टर कैटलॉग',
    'Bespoke Corporate &': 'कस्टम कॉर्पोरेट और',
    'Commercial Products': 'कमर्शियल प्रोडक्ट्स',
    'Industrial Mastery': 'इंडस्ट्रियल मास्टरी',
    'Comprehensive Printing &': 'संपूर्ण प्रिंटिंग और',
    'Brand Production Services': 'ब्रांड प्रोडक्शन सेवाएँ',
    'Editorial & Insights': 'एडिटोरियल और इनसाइट्स',
    'The Ganesha Print': 'द गणेशा प्रिंट',
    'Architecture Journal': 'आर्किटेक्चर जर्नल',
    'Heritage & Craftsmanship': 'विरासत और कारीगरी',
    'We Are Printers.': 'हम प्रिंटर हैं।',
    'We Are Brand Architects.': 'हम ब्रांड आर्किटेक्ट हैं।',
    'Specs & Details': 'स्पेसिफिकेशन और विवरण',
    'Inquire': 'पूछताछ करें',
    'Request Quote': 'कोटेशन माँगें',
    'Full Product Page': 'पूरा प्रोडक्ट पेज',
    'Full Service Page': 'पूरा सर्विस पेज',
    'Core Deliverables': 'मुख्य डिलिवरेबल्स',
    'Capabilities': 'क्षमताएँ',
    'WhatsApp Direct': 'सीधे व्हाट्सऐप करें',
    'Our Services': 'हमारी सेवाएँ',
    'Collections': 'कलेक्शंस',
    'Print Journal': 'प्रिंट जर्नल',
    'Inspect Details': 'विवरण देखें',
    'Full Case File': 'पूरा केस फाइल',
    'Physical Workshop & Studio': 'फिजिकल वर्कशॉप और स्टूडियो',
    'Direct Hotline & WhatsApp': 'डायरेक्ट हॉटलाइन और व्हाट्सऐप',
    'Official Quotations & Pre-Press Files': 'ऑफिशियल कोटेशन और प्री-प्रेस फाइल्स',
    'Operating Shifts': 'ऑपरेटिंग शिफ्ट्स',
    'Start WhatsApp Chat with Plant Manager': 'प्लांट मैनेजर से व्हाट्सऐप चैट शुरू करें',
    'Submit Request': 'रिक्वेस्ट सबमिट करें',
    'Inquire via WhatsApp': 'व्हाट्सऐप से पूछताछ करें',
    'Submit Project RFQ': 'प्रोजेक्ट RFQ सबमिट करें',
    'Article Not Found': 'लेख नहीं मिला',
    'Return to Journal': 'जर्नल पर वापस जाएँ',
    'Executive Takeaways': 'मुख्य निष्कर्ष',
    'More from the Print Journal': 'प्रिंट जर्नल से और लेख',
    'View All Articles →': 'सभी लेख देखें →',
    'All Collections': 'सभी कलेक्शन',
    'Business Essentials': 'बिज़नेस एसेंशियल्स',
    'Clothing, Caps & Bags': 'कपड़े, कैप्स और बैग्स',
    'Made by You & Stationery': 'कस्टम स्टेशनरी',
    'Home, Drinkware & Gifts': 'होम, ड्रिंकवेयर और गिफ्ट्स',
    'Signage, Awards & More': 'साइनेज, अवॉर्ड्स और अन्य',
    'Filter products...': 'प्रोडक्ट फ़िल्टर करें...',
    'Featured First': 'फीचर्ड पहले',
    'Alphabetical (A-Z)': 'अल्फाबेटिकल (A-Z)',
    'Turnaround Speed': 'टर्नअराउंड स्पीड',
    'Sub-Division:': 'सब-डिवीज़न:',
    'Showing': 'दिखाए जा रहे हैं',
    'verified corporate artifacts': 'सत्यापित कॉर्पोरेट प्रोडक्ट्स',
    'Clear all filters': 'सभी फ़िल्टर हटाएँ',
    'Corporate & Office Printing': 'कॉर्पोरेट और ऑफिस प्रिंटिंग',
    'Marketing & Promotional Printing': 'मार्केटिंग और प्रमोशनल प्रिंटिंग',
    'Customized Corporate Merchandise': 'कस्टम कॉर्पोरेट मर्चेंडाइज़',
    'Luxury Packaging & Custom Labels': 'लक्ज़री पैकेजिंग और कस्टम लेबल्स',
    'Large Format & Event Printing': 'लार्ज फॉर्मेट और इवेंट प्रिंटिंग',
    'Books, Calendars & Fine Photo Products': 'बुक्स, कैलेंडर्स और फोटो प्रोडक्ट्स',
    'Premium Finishing & Special Effects': 'प्रीमियम फिनिशिंग और स्पेशल इफेक्ट्स',
    '3D Design, Prototyping & Trophies': '3D डिज़ाइन, प्रोटोटाइपिंग और ट्रॉफीज़',
    'Executive Employee Welcome Kit': 'एग्जीक्यूटिव एम्प्लॉयी वेलकम किट',
    'Vacuum Flask with 3 Steel Cups Set': '3 स्टील कप वाला वैक्यूम फ्लास्क सेट',
    'Luxury Cotton Visiting Cards': 'लक्ज़री कॉटन विज़िटिंग कार्ड्स',
    'Mypaperclip Executive Hardbound Diary': 'मायपेपरक्लिप एग्जीक्यूटिव हार्डबाउंड डायरी',
    'Desktop Acrylic Photo Calendar': 'डेस्कटॉप एक्रिलिक फोटो कैलेंडर',
    "Scott Premium Men's & Unisex Polo": 'स्कॉट प्रीमियम मेन्स और यूनिसेक्स पोलो',
    'Deluxe Aluminium Roll-Up Standee': 'डीलक्स एल्युमिनियम रोल-अप स्टैंडी',
    'Prestige Optical Crystal & Acrylic Awards': 'प्रेस्टीज ऑप्टिकल क्रिस्टल और एक्रिलिक अवॉर्ड्स',
    'Custom Corrugated Mailers & Product Boxes': 'कस्टम कॉरुगेटेड मेलर्स और प्रोडक्ट बॉक्स',
    'Heavyweight Cotton Canvas Tote Bags': 'हेवीवेट कॉटन कैनवास टोट बैग्स',
    'High-DPI Architectural & Event Posters': 'हाई-DPI आर्किटेक्चरल और इवेंट पोस्टर्स',
    'Carbonless NCR Duplicate & Triplicate Bill Books': 'कार्बनलेस NCR डुप्लिकेट और ट्रिप्लिकेट बिल बुक्स',
    'Reinforced Corporate Luggage Tags': 'रीइन्फोर्स्ड कॉर्पोरेट लगेज टैग्स',
    'Ceramic Matte Executive Coffee Mugs': 'सिरेमिक मैट एग्जीक्यूटिव कॉफी मग्स',
    'Museum-Grade Wrapped Canvas Prints': 'म्यूज़ियम-ग्रेड रैप्ड कैनवास प्रिंट्स',
    'Industrial High-Visibility Safety Vests': 'इंडस्ट्रियल हाई-विज़िबिलिटी सेफ्टी वेस्ट्स',
    "WE DON'T JUST PRINT.": 'हम सिर्फ प्रिंट नहीं करते।',
    'WE CREATE': 'हम बनाते हैं',
    'IMPRESSIONS.': 'प्रभाव।',
    'Architecting Tactile Brand Excellence Since 2011.': '2011 से स्पर्शनीय ब्रांड उत्कृष्टता का निर्माण।',
    'Delivering Premium Print & Branding Since 2011.': '2011 से प्रीमियम प्रिंट और ब्रांडिंग समाधान।',
    'Exact Pantone & brand color matching': 'सटीक पैंटोन और ब्रांड कलर मैचिंग',
    'High-resolution Japanese UV flatbed printers': 'हाई-रेज़ोल्यूशन जापानी UV फ्लैटबेड प्रिंटर्स',
    'Premium gold & metallic foil embossing': 'प्रीमियम गोल्ड और मेटैलिक फॉइल एम्बॉसिंग',
    'Safe doorstep delivery across India': 'पूरे भारत में सुरक्षित डोरस्टेप डिलीवरी',
    'The Naraina Facility': 'नारायणा प्रिंटिंग फैसिलिटी',
    'Pantone® Ink Calibration': 'Pantone® इंक कैलिब्रेशन',
    'PantoneÂ® Ink Calibration': 'Pantone® इंक कैलिब्रेशन',
    'Sculpted Brass Foil Embossing': 'स्कल्प्टेड ब्रास फ़ॉइल एम्बॉसिंग',
    'High-DPI Japanese UV Flatbeds': 'हाई-DPI जापानी UV फ्लैटबेड',
    'Doorstep Pan-India Logistics': 'पूरे भारत में डोरस्टेप लॉजिस्टिक्स',
    'VIEW DETAILS': 'विवरण देखें',
    'Schedule Plant Tour': 'प्लांट टूर शेड्यूल करें',
    'The Naraina Atelier': 'नारायणा एटेलियर',
    'Our Genesis & Evolution': 'हमारी शुरुआत और विकास',
    'From a Specialized Digital Press to a Full-Spectrum Branding Studio.': 'विशेष डिजिटल प्रेस से संपूर्ण ब्रांडिंग स्टूडियो तक।',
    'Machinery & Production Infrastructure': 'मशीनरी और उत्पादन इंफ्रास्ट्रक्चर',
    'Visit Our Delhi Studio': 'हमारे दिल्ली स्टूडियो पर आएँ',
    'Experience the Paper Swatches in Person': 'पेपर स्वॉच का प्रत्यक्ष अनुभव लें'
    ,'Brand Strategy': 'ब्रांड रणनीति'
    ,'Merchandise & Gifting': 'मर्चेंडाइज़ और गिफ्टिंग'
    ,'Sustainability': 'सस्टेनेबिलिटी'
    ,'Why Custom Printing Is the Secret Weapon of Modern Branding': 'कस्टम प्रिंटिंग आधुनिक ब्रांडिंग का गुप्त हथियार क्यों है'
    ,'T-Shirts to Tumblers: Top 10 Custom Products to Boost Brand Loyalty': 'ब्रांड लॉयल्टी बढ़ाने वाले 10 कस्टम प्रोडक्ट्स'
    ,'Eco-Friendly Custom Printing: 5 Sustainable Materials You Should Try': 'इको-फ्रेंडली कस्टम प्रिंटिंग: 5 टिकाऊ सामग्री'
    ,'Every day, professionals scroll past thousands of fleeting digital ads. Discover why luxury brands and Fortune 500 enterprises are reinvesting heavily in heavyweight paper, tactile finishes, and bespoke physical touchpoints.': 'हर दिन प्रोफेशनल्स हजारों डिजिटल विज्ञापन देखते हैं। जानें कि लक्ज़री ब्रांड भारी पेपर, टैक्टाइल फिनिश और खास प्रिंट टचपॉइंट्स में फिर निवेश क्यों कर रहे हैं।'
    ,'Cheap pens get thrown away; retail-grade gear becomes an organic daily billboard. Here is the curated blueprint of 10 merchandise investments delivering the highest lifetime brand recall.': 'सस्ते पेन जल्दी फेंक दिए जाते हैं; प्रीमियम मर्चेंडाइज़ रोज़ाना ब्रांड पहचान बढ़ाता है। यहाँ 10 असरदार मर्चेंडाइज़ निवेशों की चुनिंदा सूची है।'
    ,'Sustainable printing has evolved far beyond raw brown cardboard. Explore five luxurious, planet-conscious materials leading the sustainable print revolution at...': 'सस्टेनेबल प्रिंटिंग अब साधारण भूरे कार्डबोर्ड तक सीमित नहीं है। पर्यावरण-सचेत और प्रीमियम सामग्री के विकल्प जानें।'
  },
  fr: {
    'Home': 'Accueil', 'About Us': 'À propos', 'Products': 'Produits', 'Services': 'Services', 'Portfolio': 'Portfolio', 'Contact': 'Contact', 'Wedding Printing': 'Impression de mariage', 'Request a Quote': 'Demander un devis', 'Get Quote': 'Obtenir un devis', 'View Details': 'Voir les détails', 'Explore': 'Explorer', 'Quality checked': 'Qualité vérifiée', 'Production Standard': 'Norme de production', 'View': 'Voir'
  },
  de: {
    'Home': 'Startseite', 'About Us': 'Über uns', 'Products': 'Produkte', 'Services': 'Leistungen', 'Portfolio': 'Portfolio', 'Contact': 'Kontakt', 'Wedding Printing': 'Hochzeitsdruck', 'Request a Quote': 'Angebot anfordern', 'Get Quote': 'Angebot erhalten', 'View Details': 'Details ansehen', 'Explore': 'Entdecken', 'Quality checked': 'Qualität geprüft', 'Production Standard': 'Produktionsstandard', 'View': 'Ansehen'
  },
  es: {
    'Home': 'Inicio', 'About Us': 'Nosotros', 'Products': 'Productos', 'Services': 'Servicios', 'Portfolio': 'Portafolio', 'Contact': 'Contacto', 'Wedding Printing': 'Impresión para bodas', 'Request a Quote': 'Solicitar presupuesto', 'Get Quote': 'Obtener presupuesto', 'View Details': 'Ver detalles', 'Explore': 'Explorar', 'Quality checked': 'Calidad verificada', 'Production Standard': 'Estándar de producción', 'View': 'Ver'
  },
  ar: {
    'Home': 'الرئيسية', 'About Us': 'من نحن', 'Products': 'المنتجات', 'Services': 'الخدمات', 'Portfolio': 'الأعمال', 'Contact': 'اتصل بنا', 'Wedding Printing': 'طباعة حفلات الزفاف', 'Request a Quote': 'طلب عرض سعر', 'Get Quote': 'احصل على عرض سعر', 'View Details': 'عرض التفاصيل', 'Explore': 'استكشف', 'Quality checked': 'تم فحص الجودة', 'Production Standard': 'معيار الإنتاج', 'View': 'عرض'
  },
  'zh-CN': {
    'Home': '首页', 'About Us': '关于我们', 'Products': '产品', 'Services': '服务', 'Portfolio': '作品集', 'Contact': '联系我们', 'Wedding Printing': '婚礼印刷', 'Request a Quote': '申请报价', 'Get Quote': '获取报价', 'View Details': '查看详情', 'Explore': '探索', 'Quality checked': '质量已检验', 'Production Standard': '生产标准', 'View': '查看'
  },
  ja: {
    'Home': 'ホーム', 'About Us': '会社概要', 'Products': '製品', 'Services': 'サービス', 'Portfolio': 'ポートフォリオ', 'Contact': 'お問い合わせ', 'Wedding Printing': 'ウェディング印刷', 'Request a Quote': '見積もりを依頼', 'Get Quote': '見積もりを取得', 'View Details': '詳細を見る', 'Explore': '見る', 'Quality checked': '品質確認済み', 'Production Standard': '生産基準', 'View': '表示'
  },
  pt: {
    'Home': 'Início', 'About Us': 'Sobre nós', 'Products': 'Produtos', 'Services': 'Serviços', 'Portfolio': 'Portfólio', 'Contact': 'Contato', 'Wedding Printing': 'Impressão para casamentos', 'Request a Quote': 'Solicitar orçamento', 'Get Quote': 'Obter orçamento', 'View Details': 'Ver detalhes', 'Explore': 'Explorar', 'Quality checked': 'Qualidade verificada', 'Production Standard': 'Padrão de produção', 'View': 'Ver'
  },
  ru: {
    'Home': 'Главная', 'About Us': 'О нас', 'Products': 'Продукты', 'Services': 'Услуги', 'Portfolio': 'Портфолио', 'Contact': 'Контакты', 'Wedding Printing': 'Свадебная печать', 'Request a Quote': 'Запросить предложение', 'Get Quote': 'Получить предложение', 'View Details': 'Подробнее', 'Explore': 'Открыть', 'Quality checked': 'Качество проверено', 'Production Standard': 'Производственный стандарт', 'View': 'Просмотр'
  }
};

const LanguageContext = createContext(null);

const filterTranslations = {
  hi: {
    'Visiting Cards': 'विज़िटिंग कार्ड्स',
    'Posters & Marketing': 'पोस्टर्स और मार्केटिंग',
    'Letterheads & Notebooks': 'लेटरहेड्स और नोटबुक्स',
    'Labels & Packaging': 'लेबल्स और पैकेजिंग',
    'Drinkware': 'ड्रिंकवेयर',
    'Gift Hampers': 'गिफ्ट हैम्पर्स',
    'Mugs, Albums & Gifts': 'मग्स, एल्बम और गिफ्ट्स'
  }
};

const phraseTranslations = {
  hi: { 'No Products Matched Your Criteria': 'आपके मानदंड से कोई प्रोडक्ट मेल नहीं खाता', 'Reset Filters': 'फ़िल्टर रीसेट करें', 'Try clearing search terms or selecting a different category. Our studio produces bespoke custom jobs beyond catalog listings.': 'सर्च हटाएँ या दूसरी कैटेगरी चुनें। हमारा स्टूडियो कैटलॉग से बाहर भी कस्टम काम करता है।' },
  fr: { "WE DON'T JUST PRINT.": 'Nous ne faisons pas que imprimer.', 'WE CREATE': 'Nous créons', 'IMPRESSIONS.': 'des impressions.', 'Why Leading Enterprises Entrust Their Brand to Us': 'Pourquoi les grandes entreprises nous font confiance', 'Curated Corporate Collection': 'Collection corporate sélectionnée', 'No Products Matched Your Criteria': 'Aucun produit ne correspond à vos critères', 'Reset Filters': 'Réinitialiser les filtres' },
  de: { "WE DON'T JUST PRINT.": 'Wir drucken nicht nur.', 'WE CREATE': 'Wir schaffen', 'IMPRESSIONS.': 'Eindrücke.', 'Why Leading Enterprises Entrust Their Brand to Us': 'Warum führende Unternehmen uns vertrauen', 'Curated Corporate Collection': 'Ausgewählte Corporate-Kollektion', 'No Products Matched Your Criteria': 'Keine Produkte entsprechen Ihren Kriterien', 'Reset Filters': 'Filter zurücksetzen' },
  es: { "WE DON'T JUST PRINT.": 'No solo imprimimos.', 'WE CREATE': 'Creamos', 'IMPRESSIONS.': 'impresiones.', 'Why Leading Enterprises Entrust Their Brand to Us': 'Por qué las empresas líderes confían en nosotros', 'Curated Corporate Collection': 'Colección corporativa seleccionada', 'No Products Matched Your Criteria': 'Ningún producto coincide con sus criterios', 'Reset Filters': 'Restablecer filtros' },
  ar: { "WE DON'T JUST PRINT.": 'نحن لا نطبع فقط.', 'WE CREATE': 'نحن نصنع', 'IMPRESSIONS.': 'انطباعات.', 'Why Leading Enterprises Entrust Their Brand to Us': 'لماذا تثق بنا الشركات الرائدة', 'Curated Corporate Collection': 'مجموعة الشركات المختارة' },
  'zh-CN': { "WE DON'T JUST PRINT.": '我们不只是印刷。', 'WE CREATE': '我们创造', 'IMPRESSIONS.': '精彩印象。', 'Why Leading Enterprises Entrust Their Brand to Us': '领先企业为何信赖我们', 'Curated Corporate Collection': '精选企业系列' },
  ja: { "WE DON'T JUST PRINT.": '私たちは印刷するだけではありません。', 'WE CREATE': '私たちは創造します', 'IMPRESSIONS.': '印象を。', 'Why Leading Enterprises Entrust Their Brand to Us': 'なぜ一流企業は私たちを信頼するのか', 'Curated Corporate Collection': '厳選コーポレートコレクション' },
  pt: { "WE DON'T JUST PRINT.": 'Nós não apenas imprimimos.', 'WE CREATE': 'Nós criamos', 'IMPRESSIONS.': 'impressões.', 'Why Leading Enterprises Entrust Their Brand to Us': 'Por que empresas líderes confiam em nós', 'Curated Corporate Collection': 'Coleção corporativa selecionada' },
  ru: { "WE DON'T JUST PRINT.": 'Мы не просто печатаем.', 'WE CREATE': 'Мы создаём', 'IMPRESSIONS.': 'впечатления.', 'Why Leading Enterprises Entrust Their Brand to Us': 'Почему ведущие компании доверяют нам', 'Curated Corporate Collection': 'Избранная корпоративная коллекция' }
};
export const supportedLanguages = [
  ['en', 'English'],
  ['hi', 'हिन्दी'],
  ['fr', 'Français'],
  ['de', 'Deutsch'],
  ['es', 'Español'],
  ['ar', 'العربية'],
  ['zh-CN', '中文'],
  ['ja', '日本語'],
  ['pt', 'Português'],
  ['ru', 'Русский']
];

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('ganesha-language') || 'en');

  useEffect(() => {
    localStorage.setItem('ganesha-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = (nextLanguage) => {
    if (!supportedLanguages.some(([code]) => code === nextLanguage)) return;
    setLanguage(nextLanguage);
  };

  const value = useMemo(() => ({
    language,
    setLanguage: changeLanguage,
    t: (section, key) => {
      const englishValue = translations.en[section]?.[key] || key;
      if (language === 'en') return englishValue;
      if (language === 'hi') return translations.hi[section]?.[key] || englishValue;
      return phraseTranslations[language]?.[englishValue] || textTranslations[language]?.[englishValue] || englishValue;
    },
    tr: (text) => phraseTranslations[language]?.[text] || filterTranslations[language]?.[text] || textTranslations[language]?.[text] || text
  }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
