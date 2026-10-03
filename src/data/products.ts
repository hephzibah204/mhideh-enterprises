export type ProductCategory =
  | "All"
  | "Night Wears & Loungewear"
  | "Ladies' Wears"
  | "Men's Wears"
  | "Custom Frames & Wall Clocks"
  | "Throw Pillows & Towels"
  | "Customized Cufflinks & Gift Sets"
  | "Picture / Magic Mugs & Stickers"
  | "Banners & Event Prints";

export interface Product {
  id: string;
  name: string;
  category: Exclude<ProductCategory, "All">;
  price: number;
  originalPrice?: number;
  badge?: string;
  rating: number;
  reviewsCount: number;
  shortDescription: string;
  customizationPrompt: string;
  options?: string[];
  turnaround: string;
  image: string;
  featured?: boolean;
}

export const WHATSAPP_NUMBER = "2348107918675";
export const WHATSAPP_DISPLAY = "+234 810 791 8675";
export const WHATSAPP_CATALOG_URL = "https://wa.me/c/2348107918675";

export const CATEGORIES: ProductCategory[] = [
  "All",
  "Night Wears & Loungewear",
  "Ladies' Wears",
  "Men's Wears",
  "Custom Frames & Wall Clocks",
  "Throw Pillows & Towels",
  "Customized Cufflinks & Gift Sets",
  "Picture / Magic Mugs & Stickers",
  "Banners & Event Prints",
];

export const PRODUCTS: Product[] = [
  // ==================== NIGHT WEARS & LOUNGEWEAR ====================
  {
    id: "nightwear-01",
    name: "Personalized Silk-Satin Pyjama 2-Piece Set",
    category: "Night Wears & Loungewear",
    price: 19500,
    originalPrice: 24000,
    badge: "Bestseller Sleepwear",
    rating: 4.9,
    reviewsCount: 89,
    shortDescription:
      "Butter-soft satin pyjama set tailored with contrast piping and custom monogrammed initials or name on the breast pocket. Breathable, luxury sleepwear.",
    customizationPrompt: "Name/initials for pocket embroidery & color (Blush Pink, Champagne, Burgundy, Navy, Black)",
    options: ["Shorts & Short Sleeve Set", "Trousers & Long Sleeve Set (+₦4,500)", "Bridal Squad 4-Pack (+₦58,000)"],
    turnaround: "24–48 Hours",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    featured: true,
  },
  {
    id: "nightwear-02",
    name: "Custom Metallic Gold Lettering Kimono Night Robe",
    category: "Night Wears & Loungewear",
    price: 16000,
    originalPrice: 19500,
    badge: "Bridal Shower Favorite",
    rating: 4.9,
    reviewsCount: 74,
    shortDescription:
      "Silky-smooth satin kimono night robe personalized with glistening metallic gold calligraphy across the back (e.g., Bride, Mrs. Adeleke, Birthday Queen).",
    customizationPrompt: "Title or name to print on back & robe color preference",
    options: ["Robe Only", "Robe + Matching Silk Sleep Mask", "VIP Velvet Trim Edition (+₦5,000)"],
    turnaround: "24 Hours",
    image:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=900&q=80",
    featured: true,
  },
  {
    id: "nightwear-03",
    name: "Cozy Couple Monogram Cotton Nightwear & Lounge Duo",
    category: "Night Wears & Loungewear",
    price: 22500,
    originalPrice: 27000,
    badge: "Couple Special",
    rating: 4.8,
    reviewsCount: 51,
    shortDescription:
      "Matching 100% organic cotton lounge pants and soft graphic night shirts with his & hers custom nicknames or romantic anniversary date.",
    customizationPrompt: "Couple names/dates and sizes for both (His & Hers)",
    options: ["Couple 2-Set Bundle", "Single Loungeset Only (₦12,500)"],
    turnaround: "24–48 Hours",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
  },

  // ==================== LADIES' WEARS ====================
  {
    id: "ladies-01",
    name: "The Stanley Luxury Peplum Midi Dress",
    category: "Ladies' Wears",
    price: 18500,
    originalPrice: 22000,
    badge: "Official Catalog",
    rating: 5.0,
    reviewsCount: 148,
    shortDescription:
      "Signature tailored bodycon peplum midi dress featuring elegant cowl neck drapery, floral shoulder corsage, and structured puff sleeves. Available in Bottle Green and Burgundy Red.",
    customizationPrompt: "Choose color (Bottle Green or Burgundy Wine) & size (UK 8 to 20)",
    options: ["Bottle Green (Size 8 - 18)", "Burgundy Wine (Size 8 - 18)", "Custom Sizing / Fitting"],
    turnaround: "24–48 Hours",
    image: "/images/catalog-cover.jpg",
    featured: true,
  },
  {
    id: "ladies-02",
    name: "Personalized Ladies Cropped Hoodie & Jogger Set",
    category: "Ladies' Wears",
    price: 26000,
    originalPrice: 31000,
    badge: "Trending Chic",
    rating: 5.0,
    reviewsCount: 46,
    shortDescription:
      "Heavyweight brushed-fleece cropped hoodie and tailored high-waist sweatpants customized with subtle chest embroidery or aesthetic sleeve text.",
    customizationPrompt: "Initials or custom text, size & color (Mocha, Blush, Cream, Charcoal)",
    options: ["Full 2-Piece Tracksuit Set", "Cropped Hoodie Only (₦15,000)"],
    turnaround: "48 Hours",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ladies-03",
    name: "Bespoke Pearl & Embroidered Denim Jacket for Ladies",
    category: "Ladies' Wears",
    price: 32000,
    originalPrice: 38000,
    badge: "Statement Wear",
    rating: 4.9,
    reviewsCount: 38,
    shortDescription:
      "Vintage-wash denim jacket custom-embroidered with pearl accents and your custom surname or bridal title across the back shoulders.",
    customizationPrompt: "Text / surname to embroider (e.g., 'Mrs. Adebayo') & jacket wash",
    options: ["Classic Light Wash", "Midnight Black Wash", "Pearl-Beaded Bridal Edition (+₦8,000)"],
    turnaround: "2–3 Days",
    image:
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80",
    featured: true,
  },

  // ==================== MEN'S WEARS ====================
  {
    id: "mens-01",
    name: "Monogrammed Executive Senator / Kaftan Outfit",
    category: "Men's Wears",
    price: 35000,
    originalPrice: 42000,
    badge: "Gentleman's Choice",
    rating: 5.0,
    reviewsCount: 67,
    shortDescription:
      "Tailored premium wool-cashmere blend Senator set with precision gold-thread embroidery on the chest pocket and bespoke neck styling.",
    customizationPrompt: "Monogram initials, pocket design & color (Navy, Wine, Black, White, Emerald)",
    options: ["Standard Sizing (M, L, XL, XXL)", "Custom Measurements (Send on WhatsApp)"],
    turnaround: "3–4 Days",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
    featured: true,
  },
  {
    id: "mens-02",
    name: "Heavyweight Boxy Drop-Shoulder Graphic Tee",
    category: "Men's Wears",
    price: 12500,
    originalPrice: 15000,
    badge: "Streetwear Essential",
    rating: 4.9,
    reviewsCount: 104,
    shortDescription:
      "240 GSM heavy cotton oversized t-shirt with high-density puff print, custom photography, or typography that won't fade or crack.",
    customizationPrompt: "Graphic design / text idea, shirt size & base color",
    options: ["Single Oversized Tee", "Set of 3 Colorways (₦33,000)"],
    turnaround: "24–48 Hours",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    featured: true,
  },
  {
    id: "mens-03",
    name: "Luxury Embroidered Heavy Fleece Hoodie for Men",
    category: "Men's Wears",
    price: 24000,
    originalPrice: 28500,
    badge: "Customer Favorite",
    rating: 4.9,
    reviewsCount: 82,
    shortDescription:
      "Thick fleece pullover hoodie featuring custom chest embroidery, roman numeral anniversary dates on the wrist, and double-lined hood.",
    customizationPrompt: "Embroidery text/initials, date & hoodie color (Black, Burgundy, Grey, Forest Green)",
    options: ["Single Heavyweight Hoodie", "Matching Couple Duo (+₦20,000)"],
    turnaround: "48 Hours",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "mens-04",
    name: "3D Puff Embroidered Snapback & Trucker Cap",
    category: "Men's Wears",
    price: 8500,
    originalPrice: 11000,
    badge: "Popular Accessory",
    rating: 4.8,
    reviewsCount: 57,
    shortDescription:
      "Structured 6-panel cap with high-definition 3D puff embroidery or laser-engraved leather emblem. Perfect for daily style and gifts.",
    customizationPrompt: "Initials or word to embroider & cap color",
    options: ["Single Cap", "Couple Pair of 2 (+₦7,500)", "Squad Pack of 5 (+₦25,000)"],
    turnaround: "24–48 Hours",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=80",
  },

  // ==================== OTHER GIFTS & PRINTS ====================
  {
    id: "frame-01",
    name: "Royal Gold-Bordered Portrait Frame",
    category: "Custom Frames & Wall Clocks",
    price: 18500,
    originalPrice: 22000,
    badge: "Bestseller",
    rating: 4.9,
    reviewsCount: 84,
    shortDescription:
      "Museum-grade laminated photo print mounted in a handcrafted brushed-gold & charcoal frame. Perfect for portraits, weddings, and milestone anniversaries.",
    customizationPrompt: "Preferred size & caption text (you'll send photo on WhatsApp)",
    options: ["12x16 inches", "16x20 inches (+₦6,500)", "20x24 inches (+₦12,000)"],
    turnaround: "24–48 Hours",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80",
    featured: true,
  },
  {
    id: "clock-02",
    name: "Bespoke Acrylic Photo Wall Clock",
    category: "Custom Frames & Wall Clocks",
    price: 16000,
    originalPrice: 19500,
    badge: "Popular Gift",
    rating: 4.8,
    reviewsCount: 52,
    shortDescription:
      "Silent-sweep quartz timepiece crafted with high-gloss acrylic, custom family or couple photography, and metallic gold Roman numerals.",
    customizationPrompt: "Name/message on clock face & shape preference",
    options: ["Round (12 inch)", "Square (12 inch)", "Heart-Shaped (12 inch)"],
    turnaround: "48 Hours",
    image:
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "frame-03",
    name: "Multi-Piece Gallery Memory Collage",
    category: "Custom Frames & Wall Clocks",
    price: 34000,
    rating: 5.0,
    reviewsCount: 39,
    shortDescription:
      "Curated set of 5 coordinated wall frames designed to tell your story across living rooms, offices, or hallways.",
    customizationPrompt: "Frame finish (Gold, Black, White, or Wood)",
    options: ["5-Piece Set", "7-Piece Set (+₦11,000)"],
    turnaround: "2–3 Days",
    image:
      "https://images.unsplash.com/photo-1582582621959-48d27397dc69?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "pillow-01",
    name: "Velvet Picture & Monogram Throw Pillow",
    category: "Throw Pillows & Towels",
    price: 9500,
    originalPrice: 12000,
    badge: "Customer Favorite",
    rating: 4.9,
    reviewsCount: 96,
    shortDescription:
      "Ultra-plush hypoallergenic throw pillow with vibrant double-sided sublimation print or gold-style monogramming.",
    customizationPrompt: "Name/message to print & color theme",
    options: ["Classic White Velvet", "Royal Burgundy Back", "Magic Sequin Reveal (+₦3,500)"],
    turnaround: "24 Hours",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=80",
    featured: true,
  },
  {
    id: "towel-02",
    name: "Embroidered Luxury Towel & Robe Duo",
    category: "Throw Pillows & Towels",
    price: 28500,
    originalPrice: 33000,
    badge: "Wedding & Bridal",
    rating: 4.9,
    reviewsCount: 47,
    shortDescription:
      "100% Egyptian cotton bath sheet and plush robe custom-embroidered with golden thread initials, names, or couple titles.",
    customizationPrompt: "Exact name/initials for gold embroidery",
    options: ["Bath Towel Only (₦12,500)", "Towel + Hand Towel Set", "Full Robe + Towel Box"],
    turnaround: "48–72 Hours",
    image:
      "https://images.unsplash.com/photo-1616627561950-9f746e330187?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "cufflinks-01",
    name: "Engraved Gold Initials Cufflinks & Tie Clip Box",
    category: "Customized Cufflinks & Gift Sets",
    price: 17500,
    originalPrice: 21000,
    badge: "Executive Choice",
    rating: 5.0,
    reviewsCount: 68,
    shortDescription:
      "18K gold-plated stainless steel cufflinks and matching tie bar laser-engraved with custom initials, dates, or crest in a velvet presentation box.",
    customizationPrompt: "Initials or short date to engrave (e.g., T.A. | 10.10.26)",
    options: ["Gold Finish", "Silver Finish", "Matte Black & Gold"],
    turnaround: "24–48 Hours",
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80",
    featured: true,
  },
  {
    id: "giftset-02",
    name: "The Sovereign Executive Hamper Box",
    category: "Customized Cufflinks & Gift Sets",
    price: 42000,
    originalPrice: 48000,
    badge: "Luxury Box",
    rating: 4.9,
    reviewsCount: 41,
    shortDescription:
      "All-in-one curated gift box featuring a personalized leather journal, engraved metal pen, insulated temperature flask, and custom keychain.",
    customizationPrompt: "Recipient full name & box ribbon color",
    options: ["Charcoal Black Set", "Burgundy Wine Set", "Tan Brown Set"],
    turnaround: "48 Hours",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "mug-01",
    name: "Heat-Activated Magic Reveal Photo Mug",
    category: "Picture / Magic Mugs & Stickers",
    price: 6500,
    originalPrice: 8000,
    badge: "Top Seller",
    rating: 4.8,
    reviewsCount: 129,
    shortDescription:
      "Matte black ceramic mug that magically reveals your hidden photos and heartfelt message when hot coffee or tea is poured inside.",
    customizationPrompt: "Quote/text to pair with your picture",
    options: ["Standard Magic Mug", "Gold-Handle Ceramic Mug", "Couple Set of 2 (+₦5,500)"],
    turnaround: "24 Hours",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80",
    featured: true,
  },
  {
    id: "stickers-02",
    name: "Custom Die-Cut Souvenir & Brand Stickers (Pack of 50)",
    category: "Picture / Magic Mugs & Stickers",
    price: 8500,
    rating: 4.8,
    reviewsCount: 34,
    shortDescription:
      "Waterproof, scratch-resistant vinyl stickers with metallic gold foil or full-color finish for wedding souvenirs, product packaging, and party favors.",
    customizationPrompt: "Event title / brand name & preferred shape",
    options: ["50 Stickers Pack", "100 Stickers Pack (+₦6,000)", "250 Stickers Pack (+₦14,000)"],
    turnaround: "24–48 Hours",
    image:
      "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "banner-01",
    name: "Celebration Backdrop & Roll-Up Event Banner",
    category: "Banners & Event Prints",
    price: 25000,
    originalPrice: 29500,
    badge: "Event Essential",
    rating: 4.9,
    reviewsCount: 58,
    shortDescription:
      "High-definition large-format flex banner or retractable aluminum stand banner designed and printed for birthdays, bridal showers, and corporate launches.",
    customizationPrompt: "Event type, celebrant name, color palette & dimensions",
    options: [
      "Roll-Up Stand Banner (33x80 in)",
      "Large Flex Backdrop (6x4 ft)",
      "Grand Event Backdrop (8x6 ft)",
    ],
    turnaround: "24–48 Hours",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "banner-02",
    name: "Frosted Acrylic & Gold Mirror Welcome Sign",
    category: "Banners & Event Prints",
    price: 32000,
    rating: 5.0,
    reviewsCount: 27,
    shortDescription:
      "Statement entrance signage with raised gold calligraphy lettering for weddings, milestone birthdays, and luxury receptions.",
    customizationPrompt: "Event title, date, and welcome wording",
    options: ["A2 Size (16x24 in)", "A1 Size (24x36 in)"],
    turnaround: "2–3 Days",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
  },
];

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}
