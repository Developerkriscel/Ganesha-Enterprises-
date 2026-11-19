export const productCategories = [
  {
    id: "all",
    name: "All Collections",
    count: 24,
    description: "Explore the comprehensive Ganesha Enterprises portfolio of print, apparel, packaging, and branding assets."
  },
  {
    id: "business-essentials",
    name: "Business Essentials",
    count: 6,
    description: "Premium corporate stationery, visiting cards, presentation folders, and office essentials.",
    subcategories: ["Visiting Cards", "Posters & Marketing", "Letterheads & Notebooks", "Labels & Packaging", "Stamps & Ink", "Office Supplies"]
  },
  {
    id: "clothing-caps-bags",
    name: "Clothing, Caps & Bags",
    count: 5,
    description: "Premium corporate apparel, polo shirts, executive vests, caps, and heavy-duty organic tote bags.",
    subcategories: ["Custom Polo T-Shirts", "Printed T-Shirts", "Office Shirts", "Caps & Bags", "Safety Vests"]
  },
  {
    id: "made-by-you",
    name: "Made by You & Stationery",
    count: 5,
    description: "Customized desk organizers, fine diaries, engraved pens, photo calendars, and corporate keepsakes.",
    subcategories: ["Photo Albums", "Personalised Pens", "Magnets", "Notebooks & Diaries", "Calendars"]
  },
  {
    id: "home-and-gifts",
    name: "Home, Drinkware & Gifts",
    count: 5,
    description: "Luxury employee welcome hampers, insulated thermal drinkware, ceramic mugs, and curated festive boxes.",
    subcategories: ["Drinkware", "Gift Hampers", "Mugs, Albums & Gifts"]
  },
  {
    id: "signage-and-more",
    name: "Signage, Awards & More",
    count: 3,
    description: "Roll-up standees, acrylic prestige awards, wedding suites, and large-format architectural displays.",
    subcategories: ["Roll-up Standees", "Prestige Awards", "Event Banners", "Wedding Printing"]
  }
];

export const products = [
  {
    id: "employee-welcome-kit",
    slug: "employee-welcome-kit",
    name: "Executive Employee Welcome Kit",
    category: "home-and-gifts",
    categoryName: "Home & Gifts",
    subcategory: "Gift Hampers",
    featured: true,
    badge: "Bestseller",
    shortDesc: "Complete corporate welcome kit with an insulated flask, diary, engraved pen, and steel mug in a premium magnetic box.",
    description: "Turn day-one onboarding into an unforgettable brand moment. Our flagship Welcome Kit combines an insulated matte-black vacuum flask, a gold-foiled debossed vegan leather planner, a matte-metal laser engraved rollerball pen, and a premium thermal ceramic mug, nestled snugly in laser-cut high-density EVA foam inside a rigid presentation box.",
    image: "https://ganeshaenterprises.in/assets/imgs/feature-5/Welcome_Kit.jpg",
    backupImage: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop",
    moq: "25 Kits",
    turnaround: "4 – 6 Business Days",
    specs: {
      "Box Type": "Rigid Magnetic Box with Velvet Matte Lamination",
      "Contents": "1x Flask (500ml), 1x A5 Leather Diary, 1x Metal Pen, 1x Coffee Mug",
      "Customization": "Laser engraving, gold/silver foil stamping, screen printing",
      "Packaging": "Individual custom branded sleeve with company logo"
    },
    finishes: ["Velvet Matte Box", "UV Spot Highlights", "Foil Debossing", "Precision Foam Cutout"]
  },
  {
    id: "vacuum-flask-with-steel-cups",
    slug: "vacuum-flask-with-steel-cups",
    name: "Vacuum Flask with 3 Steel Cups Set",
    category: "home-and-gifts",
    categoryName: "Home & Gifts",
    subcategory: "Drinkware",
    featured: true,
    badge: "Corporate Choice",
    shortDesc: "Double-walled 304 food-grade stainless steel thermal flask with 3 matching steel cups in a presentation gift carry box.",
    description: "Engineered for executive gifting and field professionals. Keeps beverages steaming hot for 12 hours or refreshingly chilled for 24 hours. The set includes a 500ml matte-coated vacuum flask accompanied by three detachable insulated drinking cups. Custom laser-etched with your corporate crest for lifelong durability.",
    image: "https://ganeshaenterprises.in/assets/imgs/feature-5/Vacuum_Flask_with_3%20Steel_Cup.jpg",
    backupImage: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000&auto=format&fit=crop",
    moq: "50 Units",
    turnaround: "3 – 5 Days",
    specs: {
      "Capacity": "500ml Flask + 3x 150ml Cups",
      "Material": "SUS 304 Food-Grade Double-Wall Stainless Steel",
      "Thermal Retention": "12 Hrs Hot / 24 Hrs Cold",
      "Branding": "Rotary Laser Engraving / High-Adhesion UV Print"
    },
    finishes: ["Matte Charcoal", "Brushed Silver", "Midnight Navy", "Forest Emerald"]
  },
  {
    id: "standard-visiting-cards",
    slug: "standard-visiting-cards",
    name: "Luxury Cotton Visiting Cards",
    category: "business-essentials",
    categoryName: "Business Essentials",
    subcategory: "Visiting Cards",
    featured: true,
    badge: "Signature",
    shortDesc: "Heavyweight 450 GSM imported cotton pulp business cards with optional raised metallic foil and velvet touch.",
    description: "A business card is your handshake when you are no longer in the room. Printed on pure natural-white or deep charcoal French cotton boards, our visiting cards feature crisp micro-typography, raised polymer spot gloss, and radiant metallic edge-gilding.",
    image: "https://ganeshaenterprises.in/assets/imgs/prodact/IN_Standard-Visiting-Cards_Overview.jpeg",
    backupImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop",
    moq: "100 Cards",
    turnaround: "24 – 48 Hours",
    specs: {
      "Material": "400 - 600 GSM Premium Cotton Pulp / Linen Texture",
      "Finishing": "Raised Spot UV, Soft-Touch Velvet, Foil Stamping",
      "Edges": "Clean Die-Cut, Optional Gold/Rose-Gold Gilded Edges",
      "Dimensions": "Standard 89mm x 54mm or European 85mm x 55mm"
    },
    finishes: ["Soft-Touch Velvet", "Gold Foil Stamping", "Blind Embossing", "Duplex Sandwich Board"]
  },
  {
    id: "mypaperclip-executive-diary",
    slug: "mypaperclip-executive-diary",
    name: "Mypaperclip Executive Hardbound Diary",
    category: "made-by-you",
    categoryName: "Made by You",
    subcategory: "Notebooks & Diaries",
    featured: true,
    badge: "Editorial",
    shortDesc: "Italian thermal PU hardbound notebook with 80 GSM natural shade acid-free paper, bookmark ribbon, and custom debossed cover.",
    description: "Crafted for directors, strategists, and thinkers. Each diary is bound in imported thermal PU leatherette that debosses with high-contrast darkening under heat. Complete with 192 rule-lined archival pages, expandable rear gusset pocket, elastic closure band, and custom tipped-in full-color corporate insert pages.",
    image: "https://ganeshaenterprises.in/assets/imgs/prodact/IN_Mypaperclip-Medium-Cost-Diary_Overview.jpeg",
    backupImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
    moq: "50 Units",
    turnaround: "3 – 5 Days",
    specs: {
      "Size": "A5 (148 x 210 mm) / B5 Executive",
      "Paper": "80 GSM Archival Cream Acid-Free Pages",
      "Binding": "Section-sewn bookblock with layflat 180° opening",
      "Add-ons": "Custom 4-page corporate color intro, pen loop, ribbon"
    },
    finishes: ["Heat Debossing", "Metallic Foil Inlay", "Silk Ribbon Marker", "Elastic Band"]
  },
  {
    id: "acrylic-photo-calendar",
    slug: "acrylic-photo-calendar",
    name: "Desktop Acrylic Photo Calendar",
    category: "made-by-you",
    categoryName: "Made by You",
    subcategory: "Calendars",
    featured: true,
    badge: "Year-Round",
    shortDesc: "Diamond-polished 5mm virgin cast acrylic desktop stand with 12 interchangeable high-DPI textured calendar cards.",
    description: "Keep your brand visible on your client's desk 365 days a year. Our desktop calendar pairs an ultra-clear bevel-edged acrylic or solid teakwood base with 12 custom monthly cards printed on 350 GSM textured paper.",
    image: "https://ganeshaenterprises.in/assets/imgs/prodact/IN_Acrylic-photo-Calendar_Overview_01.jpeg",
    backupImage: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1000&auto=format&fit=crop",
    moq: "50 Units",
    turnaround: "3 – 4 Days",
    specs: {
      "Base": "5mm Diamond-Polished Optical Cast Acrylic",
      "Cards": "12 Months + Cover on 350 GSM Felt Matte Cardstock",
      "Printing": "6-Color High-Resolution Digital Press",
      "Packaging": "Packed in a premium gift envelope"
    },
    finishes: ["Diamond Bevel Edge", "Textured Cardstock", "Laser Logo on Base"]
  },
  {
    id: "scott-polo-t-shirts",
    slug: "scott-polo-t-shirts",
    name: "Scott Premium Men's & Unisex Polo",
    category: "clothing-caps-bags",
    categoryName: "Clothing, Caps & Bags",
    subcategory: "Custom Polo T-Shirts",
    featured: true,
    badge: "Apparel",
    shortDesc: "240 GSM 100% combed honeycomb pique cotton polo shirts with precision embroidery, side slits, and knitted ribbed collars.",
    description: "The trusted apparel choice for airline ground staff, tech enterprise summits, and sales forces across India. Pre-shrunk, bio-washed, and color-fast certified. Embroidered with German Madeira polyester threads for crisp crest details that withstand over 100 industrial washes.",
    image: "https://ganeshaenterprises.in/assets/imgs/prodact/Men_s-Scott-Polo-T-Shirts_Category-page.jpeg",
    backupImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
    moq: "25 Units",
    turnaround: "4 – 5 Days",
    specs: {
      "Fabric": "240 GSM 100% Combed Honeycomb Pique Cotton",
      "Fit": "Tailored Modern Corporate Fit with Reinforced Placket",
      "Branding": "High-Density Chest Embroidery / Screen / DTF Print",
      "Sizes": "S to 4XL with Matching Women's Silhouettes"
    },
    finishes: ["Bio-Washed", "Colorfast Dyed", "Pearlized Buttons", "Reinforced Placket"]
  },
  {
    id: "deluxe-rollup-standees",
    slug: "deluxe-rollup-standees",
    name: "Deluxe Aluminium Roll-Up Standee",
    category: "signage-and-more",
    categoryName: "Signage & More",
    subcategory: "Roll-up Standees",
    featured: true,
    badge: "Events",
    shortDesc: "Heavy-duty aluminium cassette with premium non-tear, non-curl polyester graphic film printed at 1200 DPI.",
    description: "Engineered for international conferences, retail lobbies, and high-footfall expos. Unlike cheap PVC flex banners, our deluxe roll-up uses imported non-curl polyester film that stays laser-straight, paired with a weighted broad-base aluminium housing and padded carry bag.",
    image: "https://ganeshaenterprises.in/assets/imgs/prodact/IN_Standees_Overview.jpeg",
    backupImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop",
    moq: "1 Unit",
    turnaround: "Same-Day / 24 Hours",
    specs: {
      "Graphic Size": "6ft x 2.5ft (Standard) or 6ft x 3ft (Wide)",
      "Media": "240 Micron Non-Curl Poly-PET Film with Matte Lamination",
      "Base": "Anodized Aerospace-Grade Aluminium with Stabilizer Feet",
      "Portability": "Padded Oxford Canvas Carrying Bag Included"
    },
    finishes: ["Anti-Glare Matte", "Zero-Curl Edges", "Weighted Aluminium Base"]
  },
  {
    id: "prestige-crystal-awards",
    slug: "prestige-crystal-awards",
    name: "Prestige Optical Crystal & Acrylic Awards",
    category: "signage-and-more",
    categoryName: "Signage & More",
    subcategory: "Prestige Awards",
    featured: true,
    badge: "Recognition",
    shortDesc: "Faceted K9 optical crystal and laser-polished acrylic trophies with sub-surface 3D engraving and metallic brass plaques.",
    description: "Honor extraordinary milestones with trophies that carry genuine physical weight and prestige. Crafted from high-purity K9 optical crystal or crystal-clear cast acrylic, laser-cut into geometric silhouettes and polished by hand to a brilliant shine.",
    image: "https://ganeshaenterprises.in/assets/imgs/prodact/Awards_Photo-gifts_Category-image_1x1.jpeg",
    backupImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1000&auto=format&fit=crop",
    moq: "5 Units",
    turnaround: "4 – 6 Business Days",
    specs: {
      "Material": "K9 Optical Grade Crystal / 20mm High-Transparency Acrylic",
      "Base": "Solid Black Obsidian Crystal or Brushed Brass Pedestal",
      "Customization": "Sub-surface 3D laser engraving, UV direct full-color",
      "Packaging": "Satin-lined navy blue gift presentation box"
    },
    finishes: ["Faceted Cut", "3D Sub-Surface Laser", "Brushed Metal Inlay", "Velvet Box"]
  },
  {
    id: "corrugated-boxes-labels",
    slug: "corrugated-boxes-labels",
    name: "Custom Corrugated Mailers & Product Boxes",
    category: "business-essentials",
    categoryName: "Business Essentials",
    subcategory: "Labels & Packaging",
    featured: false,
    badge: "Packaging",
    shortDesc: "High-crush resistance E-flute and 3-ply corrugated boxes with custom full-bleed exterior and interior branded printing.",
    description: "Upgrade your DTC brand packaging with structural boxes designed to withstand rigorous courier transit while delivering a breathtaking unboxing experience. Fully customizable in dimensions, flute thickness, and inside-outside printing.",
    image: "https://ganeshaenterprises.in/assets/imgs/prodact/Corrugated-Boxes_Labels-_-Stickers_Category-image_1x1.jpeg",
    backupImage: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=1000&auto=format&fit=crop",
    moq: "100 Boxes",
    turnaround: "5 – 7 Days",
    specs: {
      "Structure": "E-Flute / B-Flute Single or Double Wall Board",
      "Liner": "Bleached White Kraft or Natural Eco-Brown Kraft",
      "Printing": "UV Flexo or High-Resolution Digital Offset Laminated Sheet",
      "Protection": "Dust flaps and self-locking ear closure tabs"
    },
    finishes: ["Matte Water-Based Varnish", "White Ink on Kraft", "Inside Color Print"]
  },
  {
    id: "canvas-cotton-tote-bags",
    slug: "canvas-cotton-tote-bags",
    name: "Heavyweight Cotton Canvas Tote Bags",
    category: "clothing-caps-bags",
    categoryName: "Clothing, Caps & Bags",
    subcategory: "Caps & Bags",
    featured: false,
    badge: "Eco-Friendly",
    shortDesc: "380 GSM organic cotton duck canvas tote bags with cross-stitched webbing handles and screen-printed graphics.",
    description: "The quintessential eco-friendly event giveaway that attendees actually reuse for months. Made from durable unbleached organic cotton canvas, fitted with reinforced box-stitched handles and optional inner zipper pockets.",
    image: "https://ganeshaenterprises.in/assets/imgs/prodact/Canvas_Deluxe_Cotton_Tote_Bags_14_x_13.jpeg",
    backupImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop",
    moq: "100 Bags",
    turnaround: "3 – 5 Days",
    specs: {
      "Fabric": "350 - 380 GSM 100% GOTS Certified Organic Cotton",
      "Dimensions": "15\" W x 16\" H with 3\" Bottom Gusset",
      "Handles": "Heavy-duty 24\" woven cotton webbing handles",
      "Printing": "Eco-friendly water-based screen print or multi-color heat transfer"
    },
    finishes: ["Natural Unbleached", "Midnight Black", "Pastel Khaki", "Reinforced Seams"]
  },
  {
    id: "bulk-promotional-posters",
    slug: "bulk-promotional-posters",
    name: "High-DPI Architectural & Event Posters",
    category: "business-essentials",
    categoryName: "Business Essentials",
    subcategory: "Posters & Marketing",
    featured: false,
    badge: "High Resolution",
    shortDesc: "Printed on 250 GSM satin art paper or tear-resistant synthetic media with color calibration.",
    description: "Deliver high-fidelity promotional impact for cinema screenings, concert tours, retail sales events, and gallery exhibitions. Produced on high-speed digital web presses with rich blacks and balanced mid-tones.",
    image: "https://ganeshaenterprises.in/assets/imgs/prodact/bulk_posters.jpeg",
    backupImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1000&auto=format&fit=crop",
    moq: "50 Posters",
    turnaround: "24 Hours",
    specs: {
      "Paper": "250 GSM Imported European Satin Gloss / Velvet Matte Art Paper",
      "Resolution": "Up to 2400 x 1200 DPI",
      "Sizes": "A3, A2, A1, A0 and Custom Architectural Dimensions",
      "Coating": "Thermal Lamination or Gloss Aqueous Varnish"
    },
    finishes: ["Satin Gloss", "Velvet Matte", "Synthetic Tear-Proof"]
  },
  {
    id: "custom-bill-books-invoices",
    slug: "custom-bill-books-invoices",
    name: "Carbonless NCR Duplicate & Triplicate Bill Books",
    category: "business-essentials",
    categoryName: "Business Essentials",
    subcategory: "Letterheads & Notebooks",
    featured: false,
    badge: "Essential",
    shortDesc: "Hardbound and perforated NCR billing books with sequential numbering, wraparound writing shields, and crisp copy transfer.",
    description: "Designed for commercial accounting, retail stores, transport manifests, and clinic records. High-sensitivity carbonless chemical paper ensures every copy is transferred legibly without messy carbon sheets.",
    image: "https://ganeshaenterprises.in/assets/imgs/prodact/Bill_Books_A5_size.jpeg",
    backupImage: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=1000&auto=format&fit=crop",
    moq: "20 Books",
    turnaround: "48 Hours",
    specs: {
      "Copies": "Duplicate (Pink/White) or Triplicate (White/Yellow/Pink)",
      "Binding": "Heavy Craft Spine Binding with Micro-Perforated Tear Lines",
      "Numbering": "6-Digit Mechanical or Digital Sequential Red Numbering",
      "Sizes": "A5, A4, or Custom Cheque/Receipt Dimensions"
    },
    finishes: ["Perforated Edge", "Wraparound Writing Shield", "Color-Coded NCR"]
  },
  {
    id: "baggage-tags-labels",
    slug: "baggage-tags-labels",
    name: "Reinforced Corporate Luggage Tags",
    category: "business-essentials",
    categoryName: "Business Essentials",
    subcategory: "Labels & Packaging",
    featured: false,
    badge: "Travel",
    shortDesc: "Rigid synthetic luggage and boarding tags with metallic eyelets and genuine leather straps, trusted by airlines.",
    description: "Supplied to leading aviation and luxury travel networks. Made from tear-proof polypropylene with reinforced brass eyelets and an enclosed privacy flap.",
    image: "https://ganeshaenterprises.in/assets/imgs/prodact/Baggage-Tags_Labels-_-Stickers_Category-image_1x1.jpeg",
    backupImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop",
    moq: "100 Units",
    turnaround: "3 – 5 Days",
    specs: {
      "Material": "800 Micron Water-Resistant Poly-Card / Rigid PVC",
      "Strap": "Genuine Leather Buckle Strap or Clear Vinyl Loop",
      "Branding": "Full Color UV Print with Matte Anti-Scratch Lamination"
    },
    finishes: ["Tear-Proof Poly", "Brass Eyelet", "Leather Strap"]
  },
  {
    id: "custom-branded-mugs",
    slug: "custom-branded-mugs",
    name: "Ceramic Matte Executive Coffee Mugs",
    category: "home-and-gifts",
    categoryName: "Home & Gifts",
    subcategory: "Mugs, Albums & Gifts",
    featured: false,
    badge: "Giftware",
    shortDesc: "330ml stoneware ceramic mugs with smooth matte exterior finish, gloss interior, and permanent branding.",
    description: "An office desk staple elevated to luxury design. Features a silky touch exterior, comfortable ergonomic C-handle, and vibrant color contrasts that do not wash away in dishwashers.",
    image: "https://ganeshaenterprises.in/assets/imgs/prodact/Cello-SS-Hot-Sip-Mug---170ml_Overview.jpeg",
    backupImage: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop",
    moq: "50 Units",
    turnaround: "2 – 4 Days",
    specs: {
      "Capacity": "330 ml / 11 oz",
      "Material": "High-Density Ceramic Stoneware",
      "Safety": "Microwave and Dishwasher Safe Certified",
      "Branding": "800°C Kiln-Fired Decal or Ultra-Vibrant Sublimation"
    },
    finishes: ["Matte Obsidian", "Nordic White", "Inside Color Pop"]
  },
  {
    id: "fine-art-canvas-prints",
    slug: "fine-art-canvas-prints",
    name: "Museum-Grade Wrapped Canvas Prints",
    category: "made-by-you",
    categoryName: "Made by You",
    subcategory: "Photo Albums",
    featured: false,
    badge: "Fine Art",
    shortDesc: "400 GSM archival poly-cotton canvas stretched over seasoned kiln-dried pine wood frames with UV satin varnish.",
    description: "Designed for luxury executive boardrooms, hotel suites, and high-end residential interiors. Stretched by master framers with corner corner-keys to prevent sagging over decades.",
    image: "https://ganeshaenterprises.in/assets/imgs/prodact/canvasprint.jpeg",
    backupImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1000&auto=format&fit=crop",
    moq: "1 Unit",
    turnaround: "2 – 3 Days",
    specs: {
      "Canvas": "400 GSM Archival Textured Cotton Canvas",
      "Frame": "1.5\" Deep Seasoned Pinewood Stretcher Bars",
      "Ink": "12-Color Archival Pigment Inks with 100-Year Color Guarantee"
    },
    finishes: ["Gallery Wrap Edge", "UV Satin Varnish", "Pre-Installed Hanging Hardware"]
  },
  {
    id: "safety-reflective-vests",
    slug: "safety-reflective-vests",
    name: "Industrial High-Visibility Safety Vests",
    category: "clothing-caps-bags",
    categoryName: "Clothing, Caps & Bags",
    subcategory: "Safety Vests",
    featured: false,
    badge: "Industrial",
    shortDesc: "EN 471 certified fluorescent safety jackets with 3M reflective tape strips and bold company name screen printing.",
    description: "Equipping logistics teams, airport ground operators, and infrastructure engineers. Durable breathable polyester fabric with high-grade retro-reflective silver tape visible up to 300 meters at night.",
    image: "https://ganeshaenterprises.in/assets/imgs/prodact/Basic-Polyester-Polo-T-Shirts_Category-page.jpeg",
    backupImage: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1000&auto=format&fit=crop",
    moq: "50 Units",
    turnaround: "3 – 5 Days",
    specs: {
      "Standard": "EN 471 Class 2 Certified",
      "Material": "120 GSM Breathable Knitted Fluorescent Polyester",
      "Closure": "Heavy-Duty Front Zipper or Velcro Closure",
      "Reflective": "2-inch 3M Scotchlite High-Intensity Prismatic Tape"
    },
    finishes: ["Neon Yellow", "High-Vis Orange", "Dual Chest Pockets"]
  }
];

