"use client";

import React, { useState, useMemo } from "react";
import {
  ShoppingBag,
  Sparkles,
  MessageCircle,
  Search,
  Star,
  Truck,
  ShieldCheck,
  Clock,
  Gift,
  Plus,
  Minus,
  Trash2,
  X,
  CheckCircle2,
  MapPin,
  Phone,
  ExternalLink,
  Heart,
  SlidersHorizontal,
  ArrowRight,
  PackageCheck,
} from "lucide-react";
import {
  PRODUCTS,
  CATEGORIES,
  Product,
  ProductCategory,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
  WHATSAPP_CATALOG_URL,
  formatNaira,
} from "@/data/products";

interface CartItem {
  cartItemId: string;
  product: Product;
  selectedOption: string;
  customNote: string;
  quantity: number;
}

export default function MhidehStorefront() {
  // Catalog filtering & search state
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  // Cart & Drawer state
  const [cart, setCart] = useState<CartItem[]>([
    {
      cartItemId: "initial-sample-1",
      product: PRODUCTS[0],
      selectedOption: PRODUCTS[0].options?.[0] || "Standard",
      customNote: "Gold frame with 'Happy Anniversary' engraving plate",
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Product Customization Modal state
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [modalOption, setModalOption] = useState<string>("");
  const [modalCustomNote, setModalCustomNote] = useState<string>("");
  const [modalQuantity, setModalQuantity] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Checkout Customer Info state
  const [customerName, setCustomerName] = useState("");
  const [customerLocation, setCustomerLocation] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery");
  const [giftCardMessage, setGiftCardMessage] = useState("");

  // Bespoke Gift Concierge Builder state
  const [occasion, setOccasion] = useState("Birthday Celebration");
  const [budgetRange, setBudgetRange] = useState("₦25,000 – ₦50,000");
  const [recipientType, setRecipientType] = useState("Partner / Spouse");
  const [bespokeDetails, setBespokeDetails] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  // Open product modal for personalization
  const openPersonalizeModal = (product: Product) => {
    setActiveProduct(product);
    setModalOption(product.options?.[0] || "Standard");
    setModalCustomNote("");
    setModalQuantity(1);
  };

  // Add item to Gift Bag
  const handleAddToCart = (
    product: Product,
    option: string,
    note: string,
    qty: number,
    openDrawerAfter = false
  ) => {
    const cleanNote = note.trim() || "Will share customization photos/text on WhatsApp";
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedOption === option &&
          item.customNote === cleanNote
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      }
      return [
        ...prev,
        {
          cartItemId: `${product.id}-${Date.now()}`,
          product,
          selectedOption: option,
          customNote: cleanNote,
          quantity: qty,
        },
      ];
    });

    setActiveProduct(null);
    showToast(`Added "${product.name}" to your Gift Bag`);
    if (openDrawerAfter) {
      setIsCartOpen(true);
    }
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeCartItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const cartSubtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart]
  );

  // Instant single-product WhatsApp order
  const handleInstantWhatsAppOrder = (
    product: Product,
    option?: string,
    note?: string,
    qty = 1
  ) => {
    const chosenOption = option || product.options?.[0] || "Standard";
    const chosenNote =
      note?.trim() || "I will send the picture / customization details here in chat.";
    const total = product.price * qty;

    const message = [
      `Hello *Mhideh Enterprises*! ✨`,
      `I would like to order this personalized gift from your website:`,
      ``,
      `🎁 *Item:* ${product.name}`,
      `📐 *Option:* ${chosenOption}`,
      `🔢 *Quantity:* ${qty}`,
      `✍️ *Personalization Note:* ${chosenNote}`,
      `💰 *Estimated Price:* ${formatNaira(total)}`,
      ``,
      `Please let me know how to share my photos/details and confirm delivery. Thank you!`,
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Full Cart Checkout via WhatsApp
  const handleCartWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    const itemLines = cart
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.product.name}* (x${item.quantity}) — ${formatNaira(
            item.product.price * item.quantity
          )}\n   • Option: ${item.selectedOption}\n   • Personalization: ${item.customNote}`
      )
      .join("\n\n");

    const deliveryText =
      deliveryMethod === "pickup"
        ? "Studio Pickup (Ringroad, Ibadan)"
        : `Doorstep Delivery (${customerLocation.trim() || "Location to be confirmed"})`;

    const message = [
      `Hello *Mhideh Enterprises*! 🛍️✨`,
      `I'd like to place an order from the Mhideh Online Store:`,
      ``,
      itemLines,
      ``,
      `────────────────────`,
      `💎 *Estimated Total:* ${formatNaira(cartSubtotal)}`,
      `👤 *Customer Name:* ${customerName.trim() || "Not specified"}`,
      `🚚 *Delivery Preference:* ${deliveryText}`,
      giftCardMessage.trim()
        ? `💌 *Gift Note:* "${giftCardMessage.trim()}"`
        : null,
      `────────────────────`,
      ``,
      `I'm ready to send the pictures/names for customization and confirm payment details!`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Bespoke Gift Concierge WhatsApp inquiry
  const handleBespokeConciergeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      `Hello *Mhideh Enterprises*! 👑`,
      `I would like help curating a custom gift package / souvenir order:`,
      ``,
      `🎉 *Occasion:* ${occasion}`,
      `🎯 *For:* ${recipientType}`,
      `💳 *Budget Range:* ${budgetRange}`,
      `📝 *Custom Request Details:* ${
        bespokeDetails.trim() || "Looking for recommendations!"
      }`,
      ``,
      `Looking forward to your creative suggestions!`,
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-charcoal-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-charcoal-900 text-cream-50 px-5 py-3.5 rounded-full shadow-2xl border border-gold-400/40 flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-xs font-semibold uppercase tracking-wider text-gold-300 underline ml-2"
          >
            View Bag
          </button>
        </div>
      )}

      {/* Top Luxury Announcement Bar */}
      <div className="bg-burgundy-800 text-cream-100 text-xs sm:text-sm py-2.5 px-4 border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-400 shrink-0" />
            <span>
              <strong>Mhideh Enterprises:</strong> Handcrafted Personalized Gifts &amp; Souvenirs •{" "}
              <span className="text-gold-300 font-medium">
                Ibadan (Ringroad) &amp; Nationwide Delivery across Nigeria
              </span>
            </span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <a
              href={WHATSAPP_CATALOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-gold-300 hover:text-gold-400 font-medium transition-colors"
            >
              <span>WhatsApp Catalog</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span className="hidden sm:inline text-cream-300/40">|</span>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-cream-100 hover:text-gold-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span>{WHATSAPP_DISPLAY}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur-md border-b border-cream-300/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-burgundy-700 via-burgundy-800 to-charcoal-900 flex items-center justify-center border border-gold-400/50 shadow-md group-hover:scale-105 transition-transform">
              <Gift className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-charcoal-900 block leading-none">
                Mhideh <span className="text-burgundy-600">Enterprises</span>
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-gold-700 font-semibold block mt-1">
                Bespoke Gift Studio
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-charcoal-800">
            <a
              href="#catalog"
              className="hover:text-burgundy-600 transition-colors py-1"
            >
              Shop Catalog
            </a>
            <a
              href="#categories"
              className="hover:text-burgundy-600 transition-colors py-1"
            >
              Gift Categories
            </a>
            <a
              href="#how-it-works"
              className="hover:text-burgundy-600 transition-colors py-1"
            >
              How It Works
            </a>
            <a
              href="#bespoke-concierge"
              className="hover:text-burgundy-600 transition-colors py-1"
            >
              Custom &amp; Bulk Orders
            </a>
          </nav>

          {/* Actions: Direct WhatsApp + Gift Bag Drawer Trigger */}
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Hello Mhideh Enterprises! I'm visiting your website and would love to inquire about a personalized gift."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-gold-500/50 bg-cream-100 hover:bg-gold-400/15 text-charcoal-900 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <MessageCircle className="w-4 h-4 text-burgundy-600" />
              <span>Chat on WhatsApp</span>
            </a>

            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Gift Bag"
              className="relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-charcoal-900 hover:bg-burgundy-700 text-cream-50 text-sm font-medium transition-colors shadow-md"
            >
              <ShoppingBag className="w-4 h-4 text-gold-400" />
              <span className="hidden xs:inline">Gift Bag</span>
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-gold-400 text-charcoal-950 text-xs font-bold">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream-100 via-cream-50 to-cream-50 pt-10 pb-20 lg:py-24 border-b border-cream-200">
        {/* Decorative background radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-1/4 w-96 h-96 rounded-full bg-gold-400/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-10 w-80 h-80 rounded-full bg-burgundy-600/10 blur-3xl"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-burgundy-600/10 border border-burgundy-600/20 text-burgundy-700 text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                <span>Thoughtful Gifting, Perfected in Nigeria</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal-900 leading-[1.12] tracking-tight">
                Turn Cherished Memories Into{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-burgundy-600 via-burgundy-500 to-gold-600">
                  Timeless Keepsakes.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-charcoal-800/80 max-w-2xl leading-relaxed">
                From museum-grade portrait frames and acrylic photo wall clocks to
                custom birthday t-shirts &amp; hoodies, engraved gold cufflinks, velvet throw pillows, magic reveal mugs, and
                luxury event banners—every piece at{" "}
                <strong className="text-charcoal-900 font-semibold">
                  Mhideh Enterprises
                </strong>{" "}
                is custom-crafted to make your loved ones feel unforgettable.
              </p>

              {/* Hero CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#catalog"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-burgundy-600 hover:bg-burgundy-700 text-cream-50 font-semibold text-sm shadow-lg shadow-burgundy-600/25 transition-all hover:-translate-y-0.5"
                >
                  <span>Explore Gift Catalog</span>
                  <ArrowRight className="w-4 h-4 text-gold-300" />
                </a>

                <a
                  href="#bespoke-concierge"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-cream-100 text-charcoal-900 font-semibold text-sm border border-cream-300 shadow-sm transition-all"
                >
                  <Gift className="w-4 h-4 text-gold-600" />
                  <span>Build a Custom Gift Box</span>
                </a>
              </div>

              {/* Trust Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-cream-300/80 max-w-xl">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-charcoal-900">
                      24–48 Hr Express
                    </p>
                    <p className="text-xs text-charcoal-800/70">
                      Fast turnaround on custom prints
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Truck className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-charcoal-900">
                      Nationwide Delivery
                    </p>
                    <p className="text-xs text-charcoal-800/70">
                      Ibadan studio &amp; all 36 states
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-charcoal-900">
                      WhatsApp Checkout
                    </p>
                    <p className="text-xs text-charcoal-800/70">
                      Direct photo sharing &amp; confirmation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Visual Bento Grid */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="relative rounded-2xl overflow-hidden shadow-luxury border-2 border-gold-400/30 aspect-[4/5] group">
                      <img
                        src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
                        alt="Custom Portrait Frames & Wall Art"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent flex flex-col justify-end p-4">
                        <span className="text-[10px] uppercase tracking-widest text-gold-300 font-semibold">
                          Signature Series
                        </span>
                        <p className="text-cream-50 font-serif font-semibold text-sm">
                          Custom Portrait Frames
                        </p>
                      </div>
                    </div>
                    <div className="rounded-2xl bg-charcoal-900 text-cream-50 p-4 border border-gold-400/30 shadow-luxury flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gold-300 uppercase tracking-wider font-semibold">
                          Direct WhatsApp Line
                        </p>
                        <p className="font-serif text-base font-bold mt-0.5">
                          {WHATSAPP_DISPLAY}
                        </p>
                      </div>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gold-400 text-charcoal-950 flex items-center justify-center hover:bg-gold-300 transition-colors"
                        aria-label="Message Mhideh Enterprises on WhatsApp"
                      >
                        <MessageCircle className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6">
                    <div className="rounded-2xl bg-burgundy-700 text-cream-50 p-4 border border-gold-400/30 shadow-luxury">
                      <div className="flex items-center gap-1 text-gold-300 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs text-cream-100 leading-relaxed">
                        &ldquo;Ordered a custom portrait frame, throw pillow, and magic mug
                        for my husband&apos;s birthday. Delivered right on time in Ibadan!&rdquo;
                      </p>
                      <p className="text-[11px] font-semibold text-gold-300 mt-2">
                        —Verified WhatsApp Client
                      </p>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden shadow-luxury border-2 border-gold-400/30 aspect-[4/5] group">
                      <img
                        src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
                        alt="Bespoke Gift Boxes & Cufflinks"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent flex flex-col justify-end p-4">
                        <span className="text-[10px] uppercase tracking-widest text-gold-300 font-semibold">
                          Luxury Packaging
                        </span>
                        <p className="text-cream-50 font-serif font-semibold text-sm">
                          Cufflinks &amp; Gift Sets
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Category Cards Section */}
      <section id="categories" className="py-16 bg-cream-100/60 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-burgundy-600">
                Our Craftsmanship
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 mt-1">
                Shop by Signature Category
              </h2>
            </div>
            <p className="text-sm text-charcoal-800/75 max-w-md">
              Select any collection below to filter our catalog and personalize your items
              for instant WhatsApp checkout.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Night Wears & Loungewear" as const,
                subtitle: "Silk pyjama sets, night robes & couple loungewear",
                img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
              },
              {
                title: "Ladies' Wears" as const,
                subtitle: "The Stanley peplum dress, birthday outfits & chic sets",
                img: "/images/catalog-cover.jpg",
              },
              {
                title: "Men's Wears" as const,
                subtitle: "Monogrammed Senator outfits, heavy tees & hoodies",
                img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
              },
              {
                title: "Custom Frames & Wall Clocks" as const,
                subtitle: "Portrait frames, collages & acrylic clocks",
                img: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=600&q=80",
              },
              {
                title: "Throw Pillows & Towels" as const,
                subtitle: "Velvet photo pillows & embroidered robes",
                img: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
              },
              {
                title: "Customized Cufflinks & Gift Sets" as const,
                subtitle: "Engraved initials, pens & executive boxes",
                img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=600&q=80",
              },
              {
                title: "Picture / Magic Mugs & Stickers" as const,
                subtitle: "Heat-reveal mugs & waterproof event stickers",
                img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80",
              },
              {
                title: "Banners & Event Prints" as const,
                subtitle: "Roll-up stands, backdrops & welcome signs",
                img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80",
              },
            ].map((cat) => {
              const isSelected = selectedCategory === cat.title;
              return (
                <button
                  key={cat.title}
                  onClick={() => {
                    setSelectedCategory(cat.title);
                    document
                      .getElementById("catalog")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`group relative rounded-2xl overflow-hidden text-left h-56 border transition-all ${
                    isSelected
                      ? "border-gold-500 ring-2 ring-gold-400 shadow-gold-glow"
                      : "border-cream-300 hover:border-gold-400 shadow-sm"
                  }`}
                >
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/40 to-transparent p-4 flex flex-col justify-end">
                    <span className="inline-block w-8 h-0.5 bg-gold-400 mb-2 group-hover:w-14 transition-all" />
                    <h3 className="font-serif font-bold text-base text-cream-50 leading-snug">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-cream-200/80 mt-1 line-clamp-2">
                      {cat.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Product Catalog & Filter Section */}
      <section id="catalog" className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">
                Personalized Catalog
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 mt-1">
                Curated Keepsakes &amp; Custom Gifts
              </h2>
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1 sm:w-72">
                <Search className="w-4 h-4 text-charcoal-800/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search frames, shirts, hoodies, mugs..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-cream-300 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-400/20"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-800/50 hover:text-charcoal-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 bg-white border border-cream-300 rounded-full px-3.5 py-2">
                <SlidersHorizontal className="w-4 h-4 text-gold-600 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "featured" | "price-asc" | "price-desc")
                  }
                  aria-label="Sort products"
                  className="bg-transparent text-xs sm:text-sm font-medium text-charcoal-900 focus:outline-none pr-2"
                >
                  <option value="featured">Sort: Featured Gifts</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    active
                      ? "bg-burgundy-600 text-cream-50 shadow-md shadow-burgundy-600/20"
                      : "bg-white text-charcoal-800 border border-cream-300 hover:border-gold-400 hover:bg-cream-100"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-cream-300 p-12 text-center max-w-lg mx-auto my-8">
              <Gift className="w-12 h-12 text-gold-500 mx-auto mb-3" />
              <h3 className="font-serif text-2xl font-bold text-charcoal-900">
                Don&apos;t see the exact gift item?
              </h3>
              <p className="text-sm text-charcoal-800/75 mt-2 mb-6">
                We customize virtually any souvenir, frame size, or gift item on request.
                Reset your filters or message us directly on WhatsApp!
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="px-5 py-2.5 rounded-full bg-cream-200 hover:bg-cream-300 text-charcoal-900 text-xs font-semibold uppercase tracking-wider"
                >
                  Reset Filters
                </button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hello Mhideh Enterprises! I'm looking for a custom gift item: "${searchQuery}"`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-burgundy-600 hover:bg-burgundy-700 text-cream-50 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="group bg-white rounded-3xl border border-cream-300/90 hover:border-gold-400 overflow-hidden shadow-luxury transition-all duration-300 flex flex-col"
                >
                  {/* Product Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-cream-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-charcoal-900/90 backdrop-blur-sm text-gold-300 text-[11px] font-bold uppercase tracking-wider border border-gold-400/30">
                        {product.badge}
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-charcoal-900 text-[11px] font-semibold flex items-center gap-1 shadow-sm">
                      <Clock className="w-3 h-3 text-burgundy-600" />
                      {product.turnaround}
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs text-charcoal-800/70 mb-1.5">
                        <span className="font-semibold text-burgundy-600 uppercase tracking-wider text-[11px]">
                          {product.category}
                        </span>
                        <span className="inline-flex items-center gap-1 font-medium text-charcoal-900">
                          <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                          {product.rating.toFixed(1)}{" "}
                          <span className="text-charcoal-800/50">
                            ({product.reviewsCount})
                          </span>
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-charcoal-900 group-hover:text-burgundy-600 transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-sm text-charcoal-800/75 mt-2 leading-relaxed line-clamp-3">
                        {product.shortDescription}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-cream-200">
                      {/* Price Row */}
                      <div className="flex items-baseline justify-between mb-4">
                        <div>
                          <span className="text-xs text-charcoal-800/60 block">
                            Starting at
                          </span>
                          <div className="flex items-baseline gap-2">
                            <span className="font-serif text-2xl font-bold text-charcoal-900">
                              {formatNaira(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-xs text-charcoal-800/45 line-through">
                                {formatNaira(product.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-[11px] font-medium text-gold-700 bg-gold-400/15 px-2.5 py-1 rounded-full">
                          Includes Custom Design
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          onClick={() => openPersonalizeModal(product)}
                          className="inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-charcoal-900 hover:bg-burgundy-700 text-cream-50 text-xs font-semibold transition-colors"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-gold-400" />
                          <span>Customize &amp; Add</span>
                        </button>

                        <button
                          onClick={() => handleInstantWhatsAppOrder(product)}
                          className="inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-gold-400/20 hover:bg-gold-400/35 text-charcoal-900 border border-gold-500/40 text-xs font-semibold transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-burgundy-600" />
                          <span>WhatsApp Order</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How Personalization Works */}
      <section
        id="how-it-works"
        className="py-16 lg:py-20 bg-charcoal-900 text-cream-50 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">
              Seamless Ordering Process
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2">
              How Your Custom Gift Comes to Life
            </h2>
            <p className="text-sm sm:text-base text-cream-200/75 mt-3">
              No complicated forms—pick your favorite items here and finalize your photos
              and personalization directly with our design team on WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Select & Personalize",
                desc: "Browse our frames, throw pillows, cufflinks, magic mugs, or banners. Choose your preferred size and enter your custom wording or initials.",
                icon: Gift,
              },
              {
                step: "02",
                title: "Checkout via WhatsApp",
                desc: "Click 'Order via WhatsApp' from your Gift Bag. Your itemized order summary opens directly in a chat with Mhideh Enterprises (+234 810 791 8675).",
                icon: MessageCircle,
              },
              {
                step: "03",
                title: "Send Photos & Receive Delivery",
                desc: "Share your high-resolution pictures in the WhatsApp chat. We craft your order within 24–48 hours and deliver in Ibadan or nationwide across Nigeria.",
                icon: PackageCheck,
              },
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.step}
                  className="rounded-3xl bg-charcoal-800/90 border border-gold-400/25 p-7 relative group hover:border-gold-400/60 transition-colors"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-burgundy-600/30 border border-gold-400/40 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-gold-400" />
                    </div>
                    <span className="font-serif text-3xl font-bold text-gold-400/30">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-cream-50 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-cream-200/75 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bespoke Gift Box & Bulk Event Souvenir Concierge */}
      <section
        id="bespoke-concierge"
        className="py-16 lg:py-24 bg-gradient-to-b from-cream-100 to-cream-50 border-t border-cream-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-gold-400/40 shadow-luxury overflow-hidden grid lg:grid-cols-12">
            {/* Left Info Column */}
            <div className="lg:col-span-5 bg-gradient-to-br from-burgundy-800 via-burgundy-700 to-charcoal-900 text-cream-50 p-8 sm:p-10 flex flex-col justify-between">
              <div className="space-y-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/20 text-gold-300 text-xs font-semibold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>VIP Gift Concierge</span>
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                  Planning a Surprise Box or Bulk Event Souvenirs?
                </h2>
                <p className="text-sm text-cream-100/85 leading-relaxed">
                  Whether you want to combine a portrait frame, velvet throw pillow,
                  engraved cufflinks, and magic mug into one luxury hamper—or need 100+
                  branded souvenirs and banners for a wedding or birthday—tell us your
                  vision below.
                </p>

                <ul className="space-y-3 pt-2 text-sm text-cream-100">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                    <span>Custom Gift Hamper Curations for Him &amp; Her</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                    <span>Wedding, Birthday &amp; Funeral Souvenir Packages</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                    <span>Corporate Branding (Mugs, Towels, Stickers &amp; Banners)</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-cream-100/15 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gold-400 shrink-0" />
                <div className="text-xs text-cream-200">
                  <p className="font-semibold text-cream-50">
                    Studio Location: Ringroad, Ibadan, Oyo State
                  </p>
                  <p>Fast dispatch to Lagos, Abuja, Port Harcourt &amp; nationwide</p>
                </div>
              </div>
            </div>

            {/* Right Interactive Form */}
            <form
              onSubmit={handleBespokeConciergeSubmit}
              className="lg:col-span-7 p-8 sm:p-10 space-y-6"
            >
              <div>
                <h3 className="font-serif text-2xl font-bold text-charcoal-900">
                  Request a Custom Package Quote
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-800/70 mt-1">
                  Fill out the details below to generate an instant WhatsApp consultation
                  with Mhideh Enterprises.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-2">
                    Occasion / Event Type
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-charcoal-900 focus:outline-none focus:border-gold-500"
                  >
                    <option>Birthday Celebration</option>
                    <option>Wedding / Anniversary</option>
                    <option>Romantic Surprise Box</option>
                    <option>Corporate / Office Souvenirs</option>
                    <option>Graduation / Convocation</option>
                    <option>Bridal / Baby Shower</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-2">
                    Who is it for?
                  </label>
                  <select
                    value={recipientType}
                    onChange={(e) => setRecipientType(e.target.value)}
                    className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-charcoal-900 focus:outline-none focus:border-gold-500"
                  >
                    <option>Partner / Spouse</option>
                    <option>Him (Husband / Boyfriend / Boss)</option>
                    <option>Her (Wife / Mum / Best Friend)</option>
                    <option>Event Guests (Bulk Souvenirs)</option>
                    <option>Corporate Clients / Team</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-2">
                  Estimated Budget Range
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    "₦10,000 – ₦25,000",
                    "₦25,000 – ₦50,000",
                    "₦50,000 – ₦150,000",
                    "₦150,000+ (Bulk/VIP)",
                  ].map((range) => (
                    <button
                      type="button"
                      key={range}
                      onClick={() => setBudgetRange(range)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        budgetRange === range
                          ? "bg-burgundy-600 text-cream-50 border-burgundy-600 shadow-sm"
                          : "bg-cream-50 text-charcoal-800 border-cream-300 hover:border-gold-400"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-2">
                  Items or Personalization Ideas
                </label>
                <textarea
                  rows={3}
                  value={bespokeDetails}
                  onChange={(e) => setBespokeDetails(e.target.value)}
                  placeholder="E.g., I want a 16x20 frame, engraved gold cufflinks with initials A.B, and a magic mug delivered to Bodija, Ibadan by Friday..."
                  className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-charcoal-900 focus:outline-none focus:border-gold-500"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-charcoal-900 hover:bg-burgundy-700 text-cream-50 text-sm font-semibold shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 text-gold-400" />
                <span>Send Custom Request on WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal-950 text-cream-200 pt-16 pb-12 border-t border-gold-500/20 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-cream-100/10">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-burgundy-700 flex items-center justify-center border border-gold-400/50">
                  <Gift className="w-5 h-5 text-gold-400" />
                </div>
                <span className="font-serif text-2xl font-bold text-cream-50">
                  Mhideh <span className="text-gold-400">Enterprises</span>
                </span>
              </div>
              <p className="text-sm text-cream-200/70 max-w-md leading-relaxed">
                Your trusted online gift store in Ringroad, Ibadan for custom portrait
                frames, acrylic wall clocks, velvet throw pillows, embroidered towels,
                engraved cufflinks, magic mugs, stickers, and event banners.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400 text-charcoal-950 text-xs font-bold uppercase tracking-wider hover:bg-gold-300 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
                </a>
                <a
                  href={WHATSAPP_CATALOG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-cream-200/25 hover:border-gold-400 text-xs font-semibold text-cream-100 transition-colors"
                >
                  <span>Official WhatsApp Catalog</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-serif text-base font-bold text-cream-50 mb-4">
                Collections
              </h4>
              <ul className="space-y-2.5 text-sm text-cream-200/75">
                {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => {
                        setSelectedCategory(cat);
                        document
                          .getElementById("catalog")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="hover:text-gold-400 transition-colors text-left"
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-base font-bold text-cream-50 mb-4">
                Contact &amp; Delivery
              </h4>
              <ul className="space-y-3 text-sm text-cream-200/75">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
                  <span>Ringroad Area, Ibadan, Oyo State, Nigeria</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>{WHATSAPP_DISPLAY}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
                  <span>Nationwide Delivery across Nigeria</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-200/50">
            <p>
              &copy; {new Date().getFullYear()} Mhideh Enterprises (mhide online store).
              All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-burgundy-500 fill-current" />{" "}
              for unforgettable gifting
            </p>
          </div>
        </div>
      </footer>

      {/* Product Personalization Modal */}
      {activeProduct && (
        <div
          className="fixed inset-0 z-50 bg-charcoal-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveProduct(null)}
        >
          <div
            className="bg-cream-50 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gold-400/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-52 bg-charcoal-900">
              <img
                src={activeProduct.image}
                alt={activeProduct.name}
                className="w-full h-full object-cover opacity-90"
              />
              <button
                onClick={() => setActiveProduct(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-charcoal-950/80 text-cream-50 flex items-center justify-center hover:bg-burgundy-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-4 bg-charcoal-950/85 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-gold-400/30">
                <span className="font-serif font-bold text-gold-300 text-lg">
                  {formatNaira(activeProduct.price)}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-burgundy-600">
                  {activeProduct.category}
                </span>
                <h3 className="font-serif text-2xl font-bold text-charcoal-900 mt-0.5">
                  {activeProduct.name}
                </h3>
                <p className="text-xs text-charcoal-800/75 mt-1">
                  {activeProduct.shortDescription}
                </p>
              </div>

              {activeProduct.options && activeProduct.options.length > 0 && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-2">
                    Select Size / Style Option
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {activeProduct.options.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setModalOption(opt)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                          modalOption === opt
                            ? "bg-burgundy-600 text-cream-50 border-burgundy-600"
                            : "bg-white text-charcoal-800 border-cream-300 hover:border-gold-400"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1.5">
                  Personalization Instructions
                </label>
                <input
                  type="text"
                  value={modalCustomNote}
                  onChange={(e) => setModalCustomNote(e.target.value)}
                  placeholder={activeProduct.customizationPrompt}
                  className="w-full rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-sm text-charcoal-900 focus:outline-none focus:border-gold-500"
                />
                <p className="text-[11px] text-charcoal-800/60 mt-1">
                  💡 You can send your photos directly in the WhatsApp chat after clicking
                  checkout.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-800">
                  Quantity
                </span>
                <div className="inline-flex items-center gap-3 bg-white border border-cream-300 rounded-full px-3 py-1">
                  <button
                    type="button"
                    onClick={() => setModalQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 text-charcoal-800 hover:text-burgundy-600"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-bold w-6 text-center">
                    {modalQuantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setModalQuantity((q) => q + 1)}
                    className="p-1 text-charcoal-800 hover:text-burgundy-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    handleAddToCart(
                      activeProduct,
                      modalOption,
                      modalCustomNote,
                      modalQuantity,
                      true
                    )
                  }
                  className="w-full py-3.5 px-4 rounded-xl bg-charcoal-900 hover:bg-burgundy-700 text-cream-50 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 text-gold-400" />
                  <span>
                    Add to Bag ({formatNaira(activeProduct.price * modalQuantity)})
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleInstantWhatsAppOrder(
                      activeProduct,
                      modalOption,
                      modalCustomNote,
                      modalQuantity
                    )
                  }
                  className="w-full py-3.5 px-4 rounded-xl bg-burgundy-600 hover:bg-burgundy-700 text-cream-50 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-gold-300" />
                  <span>Order Now on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide-Over Gift Bag & WhatsApp Checkout Drawer */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-50 bg-charcoal-950/60 backdrop-blur-sm flex justify-end"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="w-full max-w-md bg-cream-50 h-full shadow-2xl border-l border-gold-400/30 flex flex-col justify-between overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-6 bg-charcoal-900 text-cream-50 flex items-center justify-between border-b border-gold-400/30">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-gold-400" />
                <div>
                  <h3 className="font-serif text-lg font-bold">
                    Your Personalized Gift Bag
                  </h3>
                  <p className="text-xs text-cream-200/70">
                    {cartCount} {cartCount === 1 ? "item" : "items"} ready for WhatsApp
                    checkout
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                aria-label="Close Gift Bag"
                className="p-2 rounded-full bg-charcoal-800 text-cream-200 hover:text-gold-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cream-200 flex items-center justify-center mx-auto">
                    <Gift className="w-8 h-8 text-burgundy-600" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-charcoal-900">
                    Your Gift Bag is Empty
                  </h4>
                  <p className="text-sm text-charcoal-800/70 max-w-xs mx-auto">
                    Explore our custom portrait frames, throw pillows, cufflinks, and magic
                    mugs to start personalizing your order.
                  </p>
                </div>
              ) : (
                <>
                  {/* Items List */}
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.cartItemId}
                        className="bg-white rounded-2xl p-4 border border-cream-300 shadow-sm flex gap-3.5"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 rounded-xl object-cover shrink-0 bg-cream-100"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-serif font-bold text-sm text-charcoal-900 truncate">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeCartItem(item.cartItemId)}
                              aria-label="Remove item"
                              className="text-charcoal-800/40 hover:text-burgundy-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-burgundy-600 font-medium mt-0.5">
                            {item.selectedOption}
                          </p>
                          <p className="text-xs text-charcoal-800/70 mt-1 line-clamp-2 italic">
                            &ldquo;{item.customNote}&rdquo;
                          </p>

                          <div className="flex items-center justify-between mt-3 pt-2 border-t border-cream-200">
                            <span className="font-serif font-bold text-sm text-charcoal-900">
                              {formatNaira(item.product.price * item.quantity)}
                            </span>
                            <div className="inline-flex items-center gap-2 bg-cream-100 rounded-full px-2.5 py-0.5">
                              <button
                                onClick={() => updateCartQuantity(item.cartItemId, -1)}
                                className="text-charcoal-800 hover:text-burgundy-600"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-xs font-bold w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQuantity(item.cartItemId, 1)}
                                className="text-charcoal-800 hover:text-burgundy-600"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Customer & Delivery Details for WhatsApp Message */}
                  <div className="bg-white rounded-2xl p-4 border border-cream-300 space-y-3.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-burgundy-700">
                      Delivery &amp; Gift Note Details
                    </h4>

                    <div>
                      <label className="block text-xs font-medium text-charcoal-800 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g., Adeola Ogunleye"
                        className="w-full rounded-xl border border-cream-300 bg-cream-50 px-3 py-2 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-charcoal-800 mb-1">
                        Delivery Option
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod("delivery")}
                          className={`py-2 px-2.5 rounded-xl text-xs font-semibold border ${
                            deliveryMethod === "delivery"
                              ? "bg-burgundy-600 text-cream-50 border-burgundy-600"
                              : "bg-cream-50 text-charcoal-800 border-cream-300"
                          }`}
                        >
                          Nationwide Delivery
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod("pickup")}
                          className={`py-2 px-2.5 rounded-xl text-xs font-semibold border ${
                            deliveryMethod === "pickup"
                              ? "bg-burgundy-600 text-cream-50 border-burgundy-600"
                              : "bg-cream-50 text-charcoal-800 border-cream-300"
                          }`}
                        >
                          Ibadan Pickup
                        </button>
                      </div>
                    </div>

                    {deliveryMethod === "delivery" && (
                      <div>
                        <label className="block text-xs font-medium text-charcoal-800 mb-1">
                          City / State (Nigeria)
                        </label>
                        <input
                          type="text"
                          value={customerLocation}
                          onChange={(e) => setCustomerLocation(e.target.value)}
                          placeholder="e.g., Ringroad Ibadan / Lekki Lagos / Abuja"
                          className="w-full rounded-xl border border-cream-300 bg-cream-50 px-3 py-2 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-medium text-charcoal-800 mb-1">
                        Complimentary Gift Card Note (Optional)
                      </label>
                      <input
                        type="text"
                        value={giftCardMessage}
                        onChange={(e) => setGiftCardMessage(e.target.value)}
                        placeholder="Short note to include inside the gift package..."
                        className="w-full rounded-xl border border-cream-300 bg-cream-50 px-3 py-2 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Drawer Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-cream-300 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-charcoal-800/70">
                    Estimated Subtotal
                  </span>
                  <span className="font-serif text-2xl font-bold text-charcoal-900">
                    {formatNaira(cartSubtotal)}
                  </span>
                </div>

                <button
                  onClick={handleCartWhatsAppCheckout}
                  className="w-full py-4 px-6 rounded-full bg-burgundy-600 hover:bg-burgundy-700 text-cream-50 font-semibold text-sm shadow-lg shadow-burgundy-600/25 flex items-center justify-center gap-2.5 transition-all"
                >
                  <MessageCircle className="w-5 h-5 text-gold-300" />
                  <span>Order via WhatsApp ({WHATSAPP_DISPLAY})</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
