// Product Database
export const products = [
    // Footwear - 10 Products
    {
        id: 1,
        name: "Premium Herbal Slippers",
        price: 1999,
        originalPrice: 2999,
        rating: 4.5,
        reviews: 45,
        image: "/Images/1.png",
        images: [
            "/Images/1.png",
            "/Images/1 (2).png",
            "/Images/1 (3).png",
            "/Images/1 (4).png"
        ],
        description: "Comfortable premium herbal slippers with natural ingredients infused into the fabric. Designed for all-day comfort and foot health.",
        features: ["100% Natural", "Anti-bacterial", "Soft Padding", "Breathable Material"],
        sku: "SLIP-001",
        stock: "In Stock",
        weight: "400g",
        category: "Footwear"
    },
    {
        id: 2,
        name: "Designer Fashion Sandals",
        price: 1599,
        originalPrice: 2299,
        rating: 4.8,
        reviews: 38,
        image: "/Images/1 (6).png",
        images: [
            "/Images/1 (6).png",
            "/Images/1 (7).png",
            "/Images/2 (2).png",
            "/Images/2 (3).png"
        ],
        description: "Elegant designer sandals with premium leather and decorative accents. Perfect for summer wear and casual outings. Premium quality craftsmanship.",
        features: ["Premium Leather", "Comfortable Fit", "Stylish Design", "Durable Soles"],
        sku: "SAND-001",
        stock: "In Stock",
        weight: "500g",
        category: "Footwear"
    },
    {
        id: 3,
        name: "Casual Comfort Flats",
        price: 749,
        originalPrice: 999,
        rating: 4.6,
        reviews: 52,
        image: "/Images/2 (5).png",
        images: [
            "/Images/2 (5).png",
            "/Images/2 (6).png",
            "/Images/3 (1).png",
            "/Images/3 (2).png"
        ],
        description: "Lightweight and comfortable casual flats perfect for everyday wear. Crafted with breathable materials and flexible soles for all-day comfort.",
        features: ["Lightweight", "Breathable", "Flexible", "Easy to Clean"],
        sku: "FLAT-001",
        stock: "In Stock",
        weight: "300g",
        category: "Footwear"
    },
    {
        id: 7,
        name: "Elegant Heeled Chappals",
        price: 2199,
        originalPrice: 3299,
        rating: 4.9,
        reviews: 62,
        image: "/Images/1 (3).png",
        images: [
            "/Images/1 (3).png",
            "/Images/1 (4).png",
            "/Images/1 (6).png",
            "/Images/1 (7).png"
        ],
        description: "Sophisticated heeled chappals designed for formal occasions. Features comfortable arch support and elegant design.",
        features: ["Heeled Design", "Arch Support", "Formal Style", "Premium Finish"],
        sku: "HEEL-001",
        stock: "In Stock",
        weight: "550g",
        category: "Footwear"
    },
    {
        id: 8,
        name: "Classic Leather Sandals",
        price: 1799,
        originalPrice: 2599,
        rating: 4.7,
        reviews: 44,
        image: "/Images/2 (2).png",
        images: [
            "/Images/2 (2).png",
            "/Images/2 (3).png",
            "/Images/2 (5).png",
            "/Images/2 (6).png"
        ],
        description: "Timeless leather sandals with adjustable straps. Perfect for both casual and semi-formal occasions.",
        features: ["Genuine Leather", "Adjustable Straps", "Cushioned Sole", "Versatile Design"],
        sku: "SAND-002",
        stock: "In Stock",
        weight: "480g",
        category: "Footwear"
    },
    {
        id: 9,
        name: "Summer Flat Chappals",
        price: 899,
        originalPrice: 1299,
        rating: 4.4,
        reviews: 56,
        image: "/Images/3 (1).png",
        images: [
            "/Images/3 (1).png",
            "/Images/3 (2).png",
            "/Images/1.png",
            "/Images/1 (2).png"
        ],
        description: "Perfect summer flat chappals with breathable design. Ideal for daily wear and outdoor activities.",
        features: ["Lightweight", "Slip-Resistant", "Quick Dry", "Comfortable Fit"],
        sku: "FLAT-002",
        stock: "In Stock",
        weight: "320g",
        category: "Footwear"
    },
    {
        id: 10,
        name: "Traditional Embroidered Chappals",
        price: 1499,
        originalPrice: 2199,
        rating: 4.8,
        reviews: 51,
        image: "/Images/1 (4).png",
        images: [
            "/Images/1 (4).png",
            "/Images/1 (6).png",
            "/Images/1 (7).png",
            "/Images/2 (2).png"
        ],
        description: "Beautifully embroidered traditional chappals with handcrafted details. Perfect for cultural events and weddings.",
        features: ["Handcrafted", "Embroidered Design", "Traditional Style", "Premium Quality"],
        sku: "TRAD-001",
        stock: "In Stock",
        weight: "460g",
        category: "Footwear"
    },
    {
        id: 11,
        name: "Sports Comfort Sandals",
        price: 1299,
        originalPrice: 1899,
        rating: 4.6,
        reviews: 39,
        image: "/Images/2 (3).png",
        images: [
            "/Images/2 (3).png",
            "/Images/2 (5).png",
            "/Images/2 (6).png",
            "/Images/3 (1).png"
        ],
        description: "Athletic-inspired sandals with superior comfort and support. Great for active lifestyles.",
        features: ["Sporty Design", "Extra Cushioning", "Non-Slip Sole", "Durable Build"],
        sku: "SPORT-001",
        stock: "In Stock",
        weight: "520g",
        category: "Footwear"
    },
    {
        id: 12,
        name: "Luxury Designer Heels",
        price: 2799,
        originalPrice: 3999,
        rating: 4.9,
        reviews: 68,
        image: "/Images/1 (7).png",
        images: [
            "/Images/1 (7).png",
            "/Images/2 (2).png",
            "/Images/2 (3).png",
            "/Images/1.png"
        ],
        description: "Premium designer heeled chappals with sophisticated appeal. Features luxurious materials and elegant craftsmanship.",
        features: ["Designer Collection", "Premium Materials", "Elegant Style", "Comfortable Height"],
        sku: "HEEL-002",
        stock: "In Stock",
        weight: "580g",
        category: "Footwear"
    },
    {
        id: 13,
        name: "Bohemian Flat Sandals",
        price: 999,
        originalPrice: 1499,
        rating: 4.5,
        reviews: 47,
        image: "/Images/2 (6).png",
        images: [
            "/Images/2 (6).png",
            "/Images/3 (1).png",
            "/Images/3 (2).png",
            "/Images/1 (2).png"
        ],
        description: "Trendy bohemian-style flat sandals with decorative beadwork. Perfect for beach outings and casual wear.",
        features: ["Bohemian Style", "Beaded Details", "Comfortable Base", "Fashion Forward"],
        sku: "FLAT-003",
        stock: "In Stock",
        weight: "340g",
        category: "Footwear"
    },

    // Treatment - 10 Products
    {
        id: 4,
        name: "Essence & Glow Treatment",
        price: 1299,
        originalPrice: 1899,
        rating: 4.7,
        reviews: 41,
        image: "/Images/3 (3).png",
        images: [
            "/Images/3 (3).png",
            "/Images/Banner.jpeg",
            "/Images/1 (2).png",
            "/Images/1 (3).png"
        ],
        description: "Advanced treatment essence for radiant glowing skin. Scientifically formulated with natural ingredients.",
        features: ["Brightening", "Hydrating", "Anti-Aging", "Fast Absorbing"],
        sku: "TRT-001",
        stock: "In Stock",
        weight: "200g",
        category: "Treatment"
    },
    {
        id: 14,
        name: "Vitamin C Serum Treatment",
        price: 1599,
        originalPrice: 2299,
        rating: 4.8,
        reviews: 55,
        image: "/Images/1 (2).png",
        images: [
            "/Images/1 (2).png",
            "/Images/1 (3).png",
            "/Images/1 (4).png",
            "/Images/1 (6).png"
        ],
        description: "Powerful Vitamin C serum for brightening and even skin tone. Reduces dark spots and enhances radiance.",
        features: ["High Potency", "Dark Spot Reducer", "Brightening Effect", "Dermatologist Tested"],
        sku: "TRT-002",
        stock: "In Stock",
        weight: "150g",
        category: "Treatment"
    },
    {
        id: 15,
        name: "Retinol Night Treatment",
        price: 1899,
        originalPrice: 2699,
        rating: 4.9,
        reviews: 63,
        image: "/Images/1 (4).png",
        images: [
            "/Images/1 (4).png",
            "/Images/1 (6).png",
            "/Images/1 (7).png",
            "/Images/2 (2).png"
        ],
        description: "Advanced retinol night treatment for anti-aging and skin renewal. Reduces fine lines and wrinkles.",
        features: ["Anti-Aging", "Skin Renewal", "Wrinkle Reduction", "Night Formula"],
        sku: "TRT-003",
        stock: "In Stock",
        weight: "180g",
        category: "Treatment"
    },
    {
        id: 16,
        name: "Hyaluronic Acid Treatment",
        price: 1399,
        originalPrice: 1999,
        rating: 4.7,
        reviews: 49,
        image: "/Images/2 (2).png",
        images: [
            "/Images/2 (2).png",
            "/Images/2 (3).png",
            "/Images/2 (5).png",
            "/Images/2 (6).png"
        ],
        description: "Intense hydration treatment with hyaluronic acid. Plumps and moisturizes skin for a youthful appearance.",
        features: ["Deep Hydration", "Plumping Effect", "Moisture Lock", "All Skin Types"],
        sku: "TRT-004",
        stock: "In Stock",
        weight: "170g",
        category: "Treatment"
    },
    {
        id: 17,
        name: "Niacinamide Brightening Treatment",
        price: 1199,
        originalPrice: 1799,
        rating: 4.6,
        reviews: 52,
        image: "/Images/2 (5).png",
        images: [
            "/Images/2 (5).png",
            "/Images/2 (6).png",
            "/Images/3 (1).png",
            "/Images/3 (2).png"
        ],
        description: "Niacinamide treatment for pore refinement and brightening. Improves skin texture and clarity.",
        features: ["Pore Minimizing", "Brightening", "Texture Improvement", "Non-Irritating"],
        sku: "TRT-005",
        stock: "In Stock",
        weight: "160g",
        category: "Treatment"
    },
    {
        id: 18,
        name: "AHA BHA Exfoliating Treatment",
        price: 1499,
        originalPrice: 2199,
        rating: 4.8,
        reviews: 58,
        image: "/Images/3 (1).png",
        images: [
            "/Images/3 (1).png",
            "/Images/3 (2).png",
            "/Images/1.png",
            "/Images/1 (2).png"
        ],
        description: "Gentle chemical exfoliant with AHA and BHA. Removes dead skin cells and unclogs pores for clearer skin.",
        features: ["Chemical Exfoliant", "Pore Cleansing", "Gentle Formula", "Weekly Use"],
        sku: "TRT-006",
        stock: "In Stock",
        weight: "190g",
        category: "Treatment"
    },
    {
        id: 19,
        name: "Peptide Repair Treatment",
        price: 2199,
        originalPrice: 3199,
        rating: 4.9,
        reviews: 61,
        image: "/Images/1 (6).png",
        images: [
            "/Images/1 (6).png",
            "/Images/1 (7).png",
            "/Images/2 (2).png",
            "/Images/2 (3).png"
        ],
        description: "Advanced peptide treatment for skin repair and firmness. Stimulates collagen production.",
        features: ["Collagen Boost", "Firming", "Repair Formula", "Premium Ingredients"],
        sku: "TRT-007",
        stock: "In Stock",
        weight: "200g",
        category: "Treatment"
    },
    {
        id: 20,
        name: "Antioxidant Defense Treatment",
        price: 1699,
        originalPrice: 2499,
        rating: 4.7,
        reviews: 46,
        image: "/Images/1 (7).png",
        images: [
            "/Images/1 (7).png",
            "/Images/2 (2).png",
            "/Images/2 (3).png",
            "/Images/2 (5).png"
        ],
        description: "Protective antioxidant treatment shield skin from environmental damage. Rich in vitamins and minerals.",
        features: ["Environmental Protection", "Antioxidant Rich", "Vitamin Infused", "Daily Defense"],
        sku: "TRT-008",
        stock: "In Stock",
        weight: "175g",
        category: "Treatment"
    },
    {
        id: 21,
        name: "Ceramide Barrier Treatment",
        price: 1799,
        originalPrice: 2599,
        rating: 4.8,
        reviews: 54,
        image: "/Images/2 (3).png",
        images: [
            "/Images/2 (3).png",
            "/Images/2 (5).png",
            "/Images/2 (6).png",
            "/Images/3 (1).png"
        ],
        description: "Strengthening ceramide treatment for skin barrier repair. Protects and restores sensitive skin.",
        features: ["Barrier Repair", "Sensitive Skin", "Strengthening", "Protective"],
        sku: "TRT-009",
        stock: "In Stock",
        weight: "185g",
        category: "Treatment"
    },
    {
        id: 22,
        name: "Green Tea Soothing Treatment",
        price: 1099,
        originalPrice: 1599,
        rating: 4.6,
        reviews: 48,
        image: "/Images/3 (2).png",
        images: [
            "/Images/3 (2).png",
            "/Images/1.png",
            "/Images/1 (2).png",
            "/Images/1 (3).png"
        ],
        description: "Calming green tea treatment for sensitive and irritated skin. Reduces redness and inflammation.",
        features: ["Soothing", "Anti-Inflammatory", "Natural Extract", "Gentle Formula"],
        sku: "TRT-010",
        stock: "In Stock",
        weight: "165g",
        category: "Treatment"
    },

    // Masks - 10 Products
    {
        id: 5,
        name: "Organic Face Masks Collection",
        price: 849,
        originalPrice: 1199,
        rating: 4.5,
        reviews: 35,
        image: "/Images/1 (2).png",
        images: [
            "/Images/1 (2).png",
            "/Images/1 (3).png",
            "/Images/1 (4).png",
            "/Images/1 (6).png"
        ],
        description: "Complete face mask collection for weekly treatments. Perfect for deep cleansing and nourishment.",
        features: ["Deep Cleansing", "Nourishing", "Natural Formula", "Weekly Ritual"],
        sku: "MSK-001",
        stock: "In Stock",
        weight: "250g",
        category: "Masks"
    },
    {
        id: 23,
        name: "Charcoal Detox Mask",
        price: 799,
        originalPrice: 1199,
        rating: 4.7,
        reviews: 67,
        image: "/Images/1 (3).png",
        images: [
            "/Images/1 (3).png",
            "/Images/1 (4).png",
            "/Images/1 (6).png",
            "/Images/1 (7).png"
        ],
        description: "Activated charcoal mask for deep detoxification. Draws out impurities and unclogs pores.",
        features: ["Detoxifying", "Pore Cleansing", "Oil Control", "Purifying"],
        sku: "MSK-002",
        stock: "In Stock",
        weight: "220g",
        category: "Masks"
    },
    {
        id: 24,
        name: "Clay Purifying Mask",
        price: 699,
        originalPrice: 999,
        rating: 4.6,
        reviews: 59,
        image: "/Images/1 (4).png",
        images: [
            "/Images/1 (4).png",
            "/Images/1 (6).png",
            "/Images/1 (7).png",
            "/Images/2 (2).png"
        ],
        description: "Natural clay mask for purification and oil absorption. Ideal for oily and combination skin.",
        features: ["Oil Absorbing", "Purifying", "Natural Clay", "Matte Finish"],
        sku: "MSK-003",
        stock: "In Stock",
        weight: "240g",
        category: "Masks"
    },
    {
        id: 25,
        name: "Sheet Mask Hydration Pack",
        price: 499,
        originalPrice: 799,
        rating: 4.8,
        reviews: 72,
        image: "/Images/2 (2).png",
        images: [
            "/Images/2 (2).png",
            "/Images/2 (3).png",
            "/Images/2 (5).png",
            "/Images/2 (6).png"
        ],
        description: "Set of 5 hydrating sheet masks infused with essence. Provides instant moisture boost.",
        features: ["Instant Hydration", "5 Pack", "Essence Infused", "Easy to Use"],
        sku: "MSK-004",
        stock: "In Stock",
        weight: "150g",
        category: "Masks"
    },
    {
        id: 26,
        name: "Brightening Gold Mask",
        price: 1299,
        originalPrice: 1899,
        rating: 4.9,
        reviews: 64,
        image: "/Images/2 (5).png",
        images: [
            "/Images/2 (5).png",
            "/Images/2 (6).png",
            "/Images/3 (1).png",
            "/Images/3 (2).png"
        ],
        description: "Luxurious gold-infused mask for brightening and radiance. Adds a luminous glow to dull skin.",
        features: ["Gold Infused", "Brightening", "Luxurious", "Radiance Boost"],
        sku: "MSK-005",
        stock: "In Stock",
        weight: "200g",
        category: "Masks"
    },
    {
        id: 27,
        name: "Sleeping Beauty Overnight Mask",
        price: 949,
        originalPrice: 1399,
        rating: 4.7,
        reviews: 56,
        image: "/Images/3 (1).png",
        images: [
            "/Images/3 (1).png",
            "/Images/3 (2).png",
            "/Images/1.png",
            "/Images/1 (2).png"
        ],
        description: "Overnight mask for intensive nourishment while you sleep. Wake up to refreshed, hydrated skin.",
        features: ["Overnight Treatment", "Intensive Care", "Non-Sticky", "Morning Glow"],
        sku: "MSK-006",
        stock: "In Stock",
        weight: "210g",
        category: "Masks"
    },
    {
        id: 28,
        name: "Vitamin E Nourishing Mask",
        price: 849,
        originalPrice: 1249,
        rating: 4.6,
        reviews: 51,
        image: "/Images/1 (6).png",
        images: [
            "/Images/1 (6).png",
            "/Images/1 (7).png",
            "/Images/2 (2).png",
            "/Images/2 (3).png"
        ],
        description: "Vitamin E enriched mask for deep nourishment and protection. Softens and smooths skin texture.",
        features: ["Vitamin E Rich", "Nourishing", "Softening", "Protective"],
        sku: "MSK-007",
        stock: "In Stock",
        weight: "230g",
        category: "Masks"
    },
    {
        id: 29,
        name: "Cooling Cucumber Mask",
        price: 599,
        originalPrice: 899,
        rating: 4.5,
        reviews: 68,
        image: "/Images/1 (7).png",
        images: [
            "/Images/1 (7).png",
            "/Images/2 (2).png",
            "/Images/2 (3).png",
            "/Images/2 (5).png"
        ],
        description: "Refreshing cucumber mask for soothing and cooling. Perfect for calming irritated skin.",
        features: ["Cooling Effect", "Soothing", "Refreshing", "Gentle"],
        sku: "MSK-008",
        stock: "In Stock",
        weight: "200g",
        category: "Masks"
    },
    {
        id: 30,
        name: "Peel-Off Blackhead Mask",
        price: 749,
        originalPrice: 1099,
        rating: 4.7,
        reviews: 73,
        image: "/Images/2 (3).png",
        images: [
            "/Images/2 (3).png",
            "/Images/2 (5).png",
            "/Images/2 (6).png",
            "/Images/3 (1).png"
        ],
        description: "Effective peel-off mask for removing blackheads and impurities. Leaves skin smooth and clean.",
        features: ["Blackhead Removal", "Peel-Off Formula", "Deep Cleansing", "Smooth Finish"],
        sku: "MSK-009",
        stock: "In Stock",
        weight: "190g",
        category: "Masks"
    },
    {
        id: 31,
        name: "Bubble Oxygenating Mask",
        price: 899,
        originalPrice: 1299,
        rating: 4.8,
        reviews: 62,
        image: "/Images/3 (2).png",
        images: [
            "/Images/3 (2).png",
            "/Images/1.png",
            "/Images/1 (2).png",
            "/Images/1 (3).png"
        ],
        description: "Fun bubble mask that oxygenates and cleanses. Creates micro-bubbles for deep pore cleaning.",
        features: ["Bubble Formula", "Oxygenating", "Fun Experience", "Deep Clean"],
        sku: "MSK-010",
        stock: "In Stock",
        weight: "180g",
        category: "Masks"
    },

    // Hair Care - 10 Products
    {
        id: 6,
        name: "Premium Hair Care System",
        price: 1099,
        originalPrice: 1599,
        rating: 4.8,
        reviews: 48,
        image: "/Images/1 (7).png",
        images: [
            "/Images/1 (7).png",
            "/Images/2 (2).png",
            "/Images/2 (3).png",
            "/Images/2 (5).png"
        ],
        description: "Complete hair care system for luscious locks. Naturally formulated with organic ingredients.",
        features: ["Hair Nourishing", "Scalp Care", "Shine Enhancing", "Organic Formula"],
        sku: "HAIR-001",
        stock: "In Stock",
        weight: "300g",
        category: "Hair Care"
    },
    {
        id: 32,
        name: "Argan Oil Hair Serum",
        price: 1299,
        originalPrice: 1899,
        rating: 4.9,
        reviews: 76,
        image: "/Images/1.png",
        images: [
            "/Images/1.png",
            "/Images/1 (2).png",
            "/Images/1 (3).png",
            "/Images/1 (4).png"
        ],
        description: "Pure argan oil serum for silky, smooth hair. Tames frizz and adds brilliant shine.",
        features: ["Argan Oil", "Frizz Control", "Shine Boost", "Heat Protection"],
        sku: "HAIR-002",
        stock: "In Stock",
        weight: "120g",
        category: "Hair Care"
    },
    {
        id: 33,
        name: "Keratin Repair Treatment",
        price: 1599,
        originalPrice: 2299,
        rating: 4.8,
        reviews: 69,
        image: "/Images/1 (2).png",
        images: [
            "/Images/1 (2).png",
            "/Images/1 (3).png",
            "/Images/1 (4).png",
            "/Images/1 (6).png"
        ],
        description: "Intensive keratin treatment for damaged hair. Repairs and strengthens hair fibers.",
        features: ["Keratin Infused", "Repair Formula", "Strengthening", "Damage Control"],
        sku: "HAIR-003",
        stock: "In Stock",
        weight: "280g",
        category: "Hair Care"
    },
    {
        id: 34,
        name: "Anti-Dandruff Scalp Treatment",
        price: 899,
        originalPrice: 1299,
        rating: 4.6,
        reviews: 58,
        image: "/Images/1 (3).png",
        images: [
            "/Images/1 (3).png",
            "/Images/1 (4).png",
            "/Images/1 (6).png",
            "/Images/1 (7).png"
        ],
        description: "Effective anti-dandruff treatment for healthy scalp. Eliminates flakes and soothes irritation.",
        features: ["Anti-Dandruff", "Scalp Soothing", "Flake Control", "Gentle Formula"],
        sku: "HAIR-004",
        stock: "In Stock",
        weight: "250g",
        category: "Hair Care"
    },
    {
        id: 35,
        name: "Hair Growth Activator",
        price: 1799,
        originalPrice: 2599,
        rating: 4.9,
        reviews: 82,
        image: "/Images/1 (4).png",
        images: [
            "/Images/1 (4).png",
            "/Images/1 (6).png",
            "/Images/1 (7).png",
            "/Images/2 (2).png"
        ],
        description: "Advanced hair growth serum with biotin and peptides. Stimulates follicles for thicker hair.",
        features: ["Growth Stimulation", "Biotin Rich", "Peptide Formula", "Thickening"],
        sku: "HAIR-005",
        stock: "In Stock",
        weight: "150g",
        category: "Hair Care"
    },
    {
        id: 36,
        name: "Deep Conditioning Mask",
        price: 999,
        originalPrice: 1499,
        rating: 4.7,
        reviews: 65,
        image: "/Images/2 (2).png",
        images: [
            "/Images/2 (2).png",
            "/Images/2 (3).png",
            "/Images/2 (5).png",
            "/Images/2 (6).png"
        ],
        description: "Rich deep conditioning mask for dry, damaged hair. Provides intense moisture and repair.",
        features: ["Deep Conditioning", "Moisture Rich", "Repair Treatment", "Soft Finish"],
        sku: "HAIR-006",
        stock: "In Stock",
        weight: "320g",
        category: "Hair Care"
    },
    {
        id: 37,
        name: "Color Protection Shampoo",
        price: 1199,
        originalPrice: 1699,
        rating: 4.8,
        reviews: 71,
        image: "/Images/2 (5).png",
        images: [
            "/Images/2 (5).png",
            "/Images/2 (6).png",
            "/Images/3 (1).png",
            "/Images/3 (2).png"
        ],
        description: "Gentle shampoo for color-treated hair. Preserves color vibrancy and prevents fading.",
        features: ["Color Safe", "Fade Prevention", "Gentle Cleansing", "UV Protection"],
        sku: "HAIR-007",
        stock: "In Stock",
        weight: "290g",
        category: "Hair Care"
    },
    {
        id: 38,
        name: "Volume Boosting Mousse",
        price: 849,
        originalPrice: 1249,
        rating: 4.6,
        reviews: 54,
        image: "/Images/3 (1).png",
        images: [
            "/Images/3 (1).png",
            "/Images/3 (2).png",
            "/Images/1.png",
            "/Images/1 (2).png"
        ],
        description: "Lightweight mousse for volume and body. Creates lift without weighing hair down.",
        features: ["Volume Boost", "Lightweight", "Long-Lasting", "No Residue"],
        sku: "HAIR-008",
        stock: "In Stock",
        weight: "200g",
        category: "Hair Care"
    },
    {
        id: 39,
        name: "Split End Repair Serum",
        price: 1099,
        originalPrice: 1599,
        rating: 4.7,
        reviews: 63,
        image: "/Images/1 (6).png",
        images: [
            "/Images/1 (6).png",
            "/Images/1 (7).png",
            "/Images/2 (2).png",
            "/Images/2 (3).png"
        ],
        description: "Targeted serum for split end repair and prevention. Seals and smooths damaged ends.",
        features: ["Split End Repair", "Sealing Formula", "Smoothing", "Prevention"],
        sku: "HAIR-009",
        stock: "In Stock",
        weight: "100g",
        category: "Hair Care"
    },
    {
        id: 40,
        name: "Natural Herbal Hair Oil",
        price: 799,
        originalPrice: 1199,
        rating: 4.8,
        reviews: 88,
        image: "/Images/2 (6).png",
        images: [
            "/Images/2 (6).png",
            "/Images/3 (1).png",
            "/Images/3 (2).png",
            "/Images/1.png"
        ],
        description: "Traditional herbal hair oil blend for nourishment and growth. Strengthens from root to tip.",
        features: ["Herbal Blend", "Nourishing", "Root Strength", "Traditional Formula"],
        sku: "HAIR-010",
        stock: "In Stock",
        weight: "250g",
        category: "Hair Care"
    }
];
