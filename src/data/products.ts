export type ColorKey = 'black'|'charcoal'|'graphite'|'navy'|'olive'|'taupe'|'sand'|'stone'|'brown'|'burgundy'|'cream';

export interface ProductReview { name:string; title:string; text:string }

export interface Product {
  id:string;
  name:string;
  tagline:string;
  description:string;
  longDescription:string;
  price:number;
  originalPrice?:number;
  rating:number;
  reviews:number;
  badge?:string;
  colors:ColorKey[];
  defaultColor:ColorKey;
  images:string[];
  colorImages?:Partial<Record<ColorKey,string>>;
  dimensions:{height:number;width:number;depth:number};
  material:string;
  features:string[];
  demoReviews:ProductReview[];
  category:'business'|'commuter'|'creator';
  popular?:boolean;
  isNewProduct?:boolean;
}

export const COLORS:Record<ColorKey,{key:ColorKey;name:string;hex:string}>={
  black:{key:'black',name:'Jet Black',hex:'#191817'},
  charcoal:{key:'charcoal',name:'Charcoal',hex:'#393735'},
  graphite:{key:'graphite',name:'Graphite',hex:'#55575a'},
  navy:{key:'navy',name:'Navy',hex:'#263449'},
  olive:{key:'olive',name:'Deep Olive',hex:'#56604b'},
  taupe:{key:'taupe',name:'Taupe',hex:'#958675'},
  sand:{key:'sand',name:'Sand',hex:'#c6ad88'},
  stone:{key:'stone',name:'Stone',hex:'#aaa59b'},
  brown:{key:'brown',name:'Dark Brown',hex:'#4b352a'},
  burgundy:{key:'burgundy',name:'Burgundy',hex:'#6b3037'},
  cream:{key:'cream',name:'Cream',hex:'#e9e0cf'}
};

const R = (name:string, title:string, text:string):ProductReview => ({name, title, text});

export const PRODUCTS:Product[] = [
  {
    id: 'metro',
    name: 'NEXUS Metro',
    tagline: 'Sleek urban armor for daily commutes',
    description: 'A structured, compact backpack built with weather-resistant tech fabric for city travel.',
    longDescription: 'NEXUS Metro combines an architectural silhouette with discreet storage compartments. Crafted for everyday urban navigators, it features a padded laptop sleeve, quick-access key clip, and weight-balanced shoulder straps.',
    price: 5499,
    originalPrice: 6499,
    rating: 4.8,
    reviews: 52,
    badge: 'Bestseller',
    category: 'commuter',
    popular: true,
    colors: ['black', 'graphite', 'navy'],
    defaultColor: 'black',
    images: ['/nexus_backpacks/01-metro.png', '/nexus_backpacks/details/01-metro-details.jpg'],
    dimensions: { height: 45, width: 30, depth: 15 },
    material: 'Water-repellent Oxford weave with matte finish',
    features: ['Hidden anti-theft back pocket', 'Shock-proof 15.6" laptop compartment', 'Ergonomic breathable back padding', 'Water-resistant coated shell'],
    demoReviews: [
      R('Siddharth Malhotra', 'Perfect daily driver', 'Fits my laptop, charger, and coffee tumbler smoothly. Clean aesthetics.'),
      R('Ananya Sharma', 'Great for transit', 'The padded straps make a huge difference during long train commutes.')
    ]
  },
  {
    id: 'executive',
    name: 'NEXUS Executive',
    tagline: 'Disciplined sophistication for modern business',
    description: 'Dual front access and a structured profile bring seamless order to executive travel.',
    longDescription: 'NEXUS Executive balances refined formal aesthetics with expansive utility. Dedicated organizer compartments separate work tech from travel essentials, backed by TSA combination lock compatibility.',
    price: 6499,
    originalPrice: 7999,
    rating: 4.9,
    reviews: 68,
    badge: 'Signature',
    category: 'business',
    popular: true,
    colors: ['black', 'charcoal', 'navy', 'brown'],
    defaultColor: 'black',
    images: ['/nexus_backpacks/02-executive.png', '/nexus_backpacks/details/02-executive-details.jpg'],
    dimensions: { height: 48, width: 32, depth: 18 },
    material: 'High-density technical twill with reinforced base',
    features: ['TSA-approved lock compartment', 'Dual quick-access front pockets', 'Pass-through luggage strap', 'Dedicated power-bank sleeve'],
    demoReviews: [
      R('Dev Malhotra', 'Sharp and professional', 'Looks immaculate in client presentations and holds everything for overnight trips.'),
      R('Rhea Kapoor', 'Top notch organization', 'Every cable and dongle has its dedicated space.')
    ]
  },
  {
    id: 'slate',
    name: 'NEXUS Slate',
    tagline: 'Minimalist geometry for studio & design work',
    description: 'A clean, tactile pack featuring concealed zipper lines and balanced load suspension.',
    longDescription: 'NEXUS Slate delivers quiet elegance to creative professionals. Designed with a structured frame that retains its sharp shape whether light or fully packed, with soft plush lining for laptop protection.',
    price: 5999,
    originalPrice: 6999,
    rating: 4.7,
    reviews: 41,
    badge: 'Creator Pick',
    category: 'creator',
    popular: false,
    colors: ['graphite', 'charcoal', 'taupe', 'stone'],
    defaultColor: 'graphite',
    images: ['/nexus_backpacks/03-slate.png', '/nexus_backpacks/details/03-slate-details.jpg'],
    dimensions: { height: 46, width: 31, depth: 16 },
    material: 'Structured heathered canvas with water-resistant treatment',
    features: ['Fleece-lined tablet & laptop sleeves', 'Hidden key tether', 'Concealed main zippers', 'Stain-resistant coating'],
    demoReviews: [
      R('Naina Bose', 'Understated perfection', 'The texture and minimalist silhouette look premium.'),
      R('Arjun Nair', 'Ideal for my tablet & laptop', 'Very comfortable to wear all day around the studio.')
    ]
  },
  {
    id: 'verge',
    name: 'NEXUS Verge',
    tagline: 'Aerodynamic edge for high-speed travel',
    description: 'Contoured tech pack engineered with rapid-reach compartments and USB charge pass-through.',
    longDescription: 'NEXUS Verge is engineered for fast-paced professionals and jetsetters. Built with high-durability shell material, an integrated charging port, and multi-tier cable organization.',
    price: 5799,
    originalPrice: 6799,
    rating: 4.8,
    reviews: 36,
    badge: 'New',
    category: 'commuter',
    popular: true,
    colors: ['black', 'navy', 'olive'],
    defaultColor: 'black',
    images: ['/nexus_backpacks/04-verge.png', '/nexus_backpacks/details/04-verge-details.jpg'],
    dimensions: { height: 47, width: 31, depth: 17 },
    material: 'Hydrophobic ballistics nylon shell',
    features: ['External USB charging port', 'Expandable side bottle pocket', 'Air-flow back channel', 'Reflective accent piping'],
    demoReviews: [
      R('Kunal Shah', 'Built for travel', 'Charging phone on the move without opening the bag is super handy.'),
      R('Maya Iyer', 'Durable and weatherproof', 'Rode through light rain and everything inside remained bone dry.')
    ]
  },
  {
    id: 'apex',
    name: 'NEXUS Apex',
    tagline: 'Peak performance carry with ultimate security',
    description: 'A hard-shell hybrid profile designed to safeguard valuable gear in any environment.',
    longDescription: 'NEXUS Apex offers uncompromised armor for expensive tech. Featuring an impact-dampening outer casing, anti-theft zipper alignment, and waterproof seam sealing for extreme weather readiness.',
    price: 6999,
    originalPrice: 8499,
    rating: 4.9,
    reviews: 59,
    badge: 'Pro Series',
    category: 'business',
    popular: true,
    colors: ['black', 'graphite', 'burgundy'],
    defaultColor: 'black',
    images: ['/nexus_backpacks/05-apex.png', '/nexus_backpacks/details/05-apex-details.jpg'],
    dimensions: { height: 49, width: 33, depth: 19 },
    material: 'Molded EVA hard-shell with ballistic weave backing',
    features: ['Impact-resistant front shield', 'RFID-blocking card slot', 'TSA combination zipper lock', 'Full 180-degree lay-flat opening'],
    demoReviews: [
      R('Aarav Mehta', 'Ultimate peace of mind', 'The structured shell holds its shape and keeps cameras and laptop protected.'),
      R('Vikram Sen', 'Heavy duty security', 'Solid lock system and premium zippers.')
    ]
  },
  {
    id: 'pioneer',
    name: 'NEXUS Pioneer',
    tagline: 'Versatile utility tailored for hybrid workdays',
    description: 'A flexible volume carry pack featuring modular interior dividers and breathable mesh.',
    longDescription: 'NEXUS Pioneer blends urban commuting with overnight capacity. Its wide clam-shell access allows seamless packing for work gear alongside gym wear or travel changes.',
    price: 5299,
    originalPrice: 6199,
    rating: 4.6,
    reviews: 29,
    category: 'commuter',
    popular: false,
    colors: ['olive', 'charcoal', 'sand', 'black'],
    defaultColor: 'olive',
    images: ['/nexus_backpacks/06-pioneer.png', '/nexus_backpacks/details/06-pioneer-details.jpg'],
    dimensions: { height: 46, width: 32, depth: 16 },
    material: 'Lightweight ripstop composite fabric',
    features: ['Dual-compartment separation', 'Quick-access top organizer', 'Breathable lumbar cushion', 'Padded top carry handle'],
    demoReviews: [
      R('Kabir Sethi', 'Versatile daily pack', 'Great capacity for gym clothes after office hours.')
    ]
  },
  {
    id: 'core',
    name: 'NEXUS Core',
    tagline: 'Essential carry distilled to pure functional simplicity',
    description: 'An ultra-clean minimalist backpack built for daily office and university routines.',
    longDescription: 'NEXUS Core presents a streamlined form factor with zero clutter. Internal drop pockets keep cords, pens, and laptops secure without bulk, making it an effortless daily companion.',
    price: 4799,
    originalPrice: 5499,
    rating: 4.7,
    reviews: 44,
    badge: 'Essential',
    category: 'creator',
    popular: false,
    colors: ['cream', 'sand', 'stone', 'black'],
    defaultColor: 'cream',
    images: ['/nexus_backpacks/07-core.png', '/nexus_backpacks/details/07-core-details.jpg'],
    dimensions: { height: 44, width: 30, depth: 14 },
    material: 'Organic cotton canvas with weather-proof wax coating',
    features: ['Ultra-lightweight chassis', 'Slim profile design', 'Protected 14" laptop sleeve', 'Smooth YKK zippers'],
    demoReviews: [
      R('Tanya Roy', 'Light and graceful', 'Love the warm cream finish. Super light on the back.')
    ]
  },
  {
    id: 'legacy',
    name: 'NEXUS Legacy',
    tagline: 'Time-tested craft meets modern digital organization',
    description: 'Rich textured technical fabric detailed with reinforced stitching and premium trim.',
    longDescription: 'NEXUS Legacy honors classical heritage design while incorporating modern tech storage. Equipped with plush laptop protection, secure internal zip pockets, and ergonomic shoulder contouring.',
    price: 6299,
    originalPrice: 7299,
    rating: 4.8,
    reviews: 33,
    category: 'business',
    popular: false,
    colors: ['brown', 'black', 'navy', 'taupe'],
    defaultColor: 'brown',
    images: ['/nexus_backpacks/08-legacy.png', '/nexus_backpacks/details/08-legacy-details.jpg'],
    dimensions: { height: 47, width: 32, depth: 17 },
    material: 'Technical twill with synthetic leather trim',
    features: ['Reinforced base panel', 'Luggage handle passthrough', 'Dedicated tablet sleeve', 'Multi-pocket interior panel'],
    demoReviews: [
      R('Sameer Joshi', 'Classic appeal', 'Looks incredible with formal coats and suits.')
    ]
  },
  {
    id: 'nova',
    name: 'NEXUS Nova',
    tagline: 'Futuristic form with weight-distributing harness',
    description: 'An agile, lightweight backpack featuring magnetic quick-snap closures and water protection.',
    longDescription: 'NEXUS Nova delivers dynamic styling and quick access. Designed for modern creators and tech enthusiasts, it keeps all your digital gear organized in an agile silhouette.',
    price: 5499,
    originalPrice: 6299,
    rating: 4.7,
    reviews: 27,
    badge: 'New',
    category: 'creator',
    popular: true,
    colors: ['graphite', 'black', 'navy'],
    defaultColor: 'graphite',
    images: ['/nexus_backpacks/09-nova.png', '/nexus_backpacks/details/09-nova-details.jpg'],
    dimensions: { height: 45, width: 30, depth: 15 },
    material: 'Water-resistant high-density nylon',
    features: ['Fidlock magnetic accent straps', 'Padded sunglasses pocket', 'Hidden passport slot', 'Shock-absorbing laptop compartment'],
    demoReviews: [
      R('Pooja Nair', 'Super sleek', 'The magnetic closures snap satisfyingly into place.')
    ]
  },
  {
    id: 'vista',
    name: 'NEXUS Vista',
    tagline: 'Panoramic opening for effortless packing & access',
    description: 'Wide-angle doctor-bag closure engineered for maximum internal visibility.',
    longDescription: 'NEXUS Vista solves the dark backpack abyss. The structured top frame opens wide and stays open, providing instant visibility and access to every item inside.',
    price: 5199,
    originalPrice: 5999,
    rating: 4.6,
    reviews: 22,
    category: 'commuter',
    popular: false,
    colors: ['navy', 'olive', 'stone', 'charcoal'],
    defaultColor: 'navy',
    images: ['/nexus_backpacks/10-vista.png', '/nexus_backpacks/details/10-vista-details.jpg'],
    dimensions: { height: 44, width: 31, depth: 16 },
    material: 'High-density Oxford polyester',
    features: ['Stay-open frame top access', 'Dual side water bottle slots', 'Padded back panel', 'Integrated key clip'],
    demoReviews: [
      R('Rohan Das', 'No more digging around', 'You can see everything inside at a glance when opened.')
    ]
  },
  {
    id: 'solace',
    name: 'NEXUS Solace',
    tagline: 'Unrivaled ergonomic comfort for long travel days',
    description: 'Custom-molded memory foam harness engineered to eliminate neck and shoulder strain.',
    longDescription: 'NEXUS Solace focuses on supreme carry comfort. Engineered with dense memory foam shoulder straps and lumbar support channels that transform heavy load travel into an easy stroll.',
    price: 5899,
    originalPrice: 6799,
    rating: 4.9,
    reviews: 51,
    badge: 'Comfort Tech',
    category: 'commuter',
    popular: true,
    colors: ['taupe', 'sand', 'cream', 'charcoal'],
    defaultColor: 'taupe',
    images: ['/nexus_backpacks/11-solace.png', '/nexus_backpacks/details/11-solace-details.jpg'],
    dimensions: { height: 46, width: 31, depth: 17 },
    material: 'Soft-touch water-repellent micro-twill',
    features: ['Memory foam shoulder harness', 'Air-flow back channel', 'Padded 15.6" laptop compartment', 'Discreet phone pocket'],
    demoReviews: [
      R('Isha Patel', 'Heavenly shoulder support', 'Feels cushiony and light even with heavy gear.')
    ]
  },
  {
    id: 'atlas',
    name: 'NEXUS Atlas',
    tagline: 'Expansive volume & multi-terrain resilience',
    description: 'Heavy-duty commuter pack built with high-tensile fabric and expandable gussets.',
    longDescription: 'NEXUS Atlas is built for total versatility. From weekend work trips to heavy commuter loads, its expandable design adapts to carry everything you need securely.',
    price: 6199,
    originalPrice: 7199,
    rating: 4.8,
    reviews: 43,
    category: 'business',
    popular: false,
    colors: ['black', 'graphite', 'olive', 'navy'],
    defaultColor: 'black',
    images: ['/nexus_backpacks/12-atlas.png', '/nexus_backpacks/details/12-atlas-details.jpg'],
    dimensions: { height: 48, width: 33, depth: 18 },
    material: 'Reinforced 1000D water-repellent nylon',
    features: ['Expandable 5L main compartment', 'Dual water bottle holders', 'Heavy-duty luggage strap', 'Lockable dual zipper sliders'],
    demoReviews: [
      R('Karthik Menon', 'Indestructible feel', 'Robust zippers, tough fabric, and tons of space.')
    ]
  },
  {
    id: 'axis-pro',
    name: 'NEXUS Axis Pro',
    tagline: 'Sculpted security for modern business travel',
    description: 'A seamless hard-shell profile with discreet access and a side-mounted TSA lock.',
    longDescription: 'NEXUS Axis Pro pairs an architectural silhouette with a resilient water-repellent shell. Its protected laptop compartment, concealed openings and balanced harness make it a composed choice for office commutes and short business trips.',
    price: 6499,
    originalPrice: 7799,
    rating: 4.9,
    reviews: 48,
    badge: 'Signature',
    category: 'business',
    popular: true,
    isNewProduct: true,
    colors: ['black', 'graphite', 'navy', 'stone'],
    defaultColor: 'black',
    images: ['/images/products/nexus-axis.png'],
    dimensions: { height: 46, width: 31, depth: 16 },
    material: 'Water-repellent coated polyester with soft-touch trim',
    features: ['TSA-approved combination lock', 'Hidden anti-theft zippers', 'Shock-proof laptop compartment', 'Breathable back padding', 'Weight-distributing shoulder straps'],
    demoReviews: [
      R('Aarav Mehta', 'Sharp enough for client meetings', 'The structured shell keeps its shape and the lock is reassuring during train travel.'),
      R('Rhea Kapoor', 'Quiet, considered design', 'It looks refined with workwear and holds my laptop without becoming bulky.')
    ]
  },
  {
    id: 'transit-pro',
    name: 'NEXUS Transit Pro',
    tagline: 'High-capacity organization, tailored for the commute',
    description: 'A softly structured tech pack with generous capacity and external USB charging access.',
    longDescription: 'NEXUS Transit Pro is designed around a full working day. A wide-opening compartment keeps tech and documents orderly, while dedicated power-bank storage and an external USB charging port keep essential devices within reach.',
    price: 5799,
    originalPrice: 6999,
    rating: 4.8,
    reviews: 67,
    badge: 'Bestseller',
    category: 'commuter',
    popular: true,
    isNewProduct: true,
    colors: ['black', 'graphite', 'navy', 'olive'],
    defaultColor: 'black',
    images: ['/images/products/nexus-transit-black.png', '/images/products/nexus-transit-graphite.png'],
    colorImages: {
      black: '/images/products/nexus-transit-black.png',
      graphite: '/images/products/nexus-transit-graphite.png'
    },
    dimensions: { height: 47, width: 32, depth: 18 },
    material: 'High-density water-repellent Oxford weave',
    features: ['Built-in USB charging port', 'Dedicated power-bank pocket', 'Cable organizer', 'Shock-proof laptop compartment', 'Breathable back padding'],
    demoReviews: [
      R('Kunal Shah', 'My desk now travels neatly', 'Chargers, notebook and laptop finally have sensible places. The graphite finish is excellent.'),
      R('Maya Iyer', 'Comfortable on long commutes', 'Even fully packed, the shoulder straps distribute the load noticeably well.')
    ]
  },
  {
    id: 'studio-artisan',
    name: 'NEXUS Studio Artisan',
    tagline: 'Textured minimalism for creative workdays',
    description: 'A slim woven profile detailed with warm trim and a clean full-length opening.',
    longDescription: 'NEXUS Studio Artisan brings tactile warmth to technical carry. Its understated woven shell, padded computer sleeve and considered interior organization suit designers, students and hybrid workers who prefer a softer professional look.',
    price: 4999,
    originalPrice: 5799,
    rating: 4.6,
    reviews: 31,
    category: 'creator',
    popular: false,
    isNewProduct: true,
    colors: ['charcoal', 'navy', 'taupe', 'sand'],
    defaultColor: 'charcoal',
    images: ['/images/products/nexus-studio.png'],
    dimensions: { height: 44, width: 30, depth: 14 },
    material: 'Water-repellent woven polyester with vegan leather accents',
    features: ['Shock-proof laptop compartment', 'Hidden quick-access pocket', 'Cable organizer', 'Breathable back padding'],
    demoReviews: [
      R('Naina Bose', 'The texture makes it', 'It feels more like a considered design object than a typical laptop backpack.'),
      R('Kabir Sethi', 'Slim but genuinely useful', 'Carries my 15-inch laptop, sketchbook and cables without losing the clean profile.')
    ]
  },
  {
    id: 'form-edition',
    name: 'NEXUS Form Edition',
    tagline: 'Editorial utility with a tailored edge',
    description: 'A distinctive flap-top design with precise pockets and polished hardware.',
    longDescription: 'NEXUS Form Edition is an expressive professional carry with a composed monochrome finish. The flap-covered main opening and dedicated external pockets keep daily essentials organized while maintaining a sharp, vertical silhouette.',
    price: 5499,
    originalPrice: 6299,
    rating: 4.8,
    reviews: 26,
    badge: 'New',
    category: 'creator',
    popular: true,
    isNewProduct: true,
    colors: ['black', 'burgundy', 'brown', 'cream'],
    defaultColor: 'black',
    images: ['/images/products/nexus-form.png'],
    dimensions: { height: 45, width: 31, depth: 15 },
    material: 'Fine-grain water-repellent synthetic leather and technical fabric',
    features: ['Hidden anti-theft zippers', 'Shock-proof laptop compartment', 'Hidden quick-access pocket', 'Breathable back padding'],
    demoReviews: [
      R('Ishita Verma', 'Distinct without being loud', 'The flap and silver hardware feel fashion-led, but it remains completely office appropriate.'),
      R('Arjun Nair', 'Easy to organize', 'The separate exterior pockets make keys, cards and earbuds quick to reach.')
    ]
  }
];

export const imageForColor = (product:Product, color:ColorKey) => product.colorImages?.[color] ?? product.images[0];
export const HERO_IMAGE = '/nexus_backpacks/01-metro.png';
export const OPEN_BAG_IMAGE = '/nexus_backpacks/02-executive.png';
export const FLAT_LAY_IMAGE = '/nexus_backpacks/05-apex.png';
export const LIFESTYLE_IMAGES = {
  commute: '/nexus_backpacks/01-metro.png',
  campus: '/nexus_backpacks/07-core.png',
  study: '/nexus_backpacks/03-slate.png',
  coding: '/nexus_backpacks/04-verge.png',
  travel: '/nexus_backpacks/02-executive.png'
};
export const REVIEWS = [
  { id: 1, name: 'Maya Iyer', role: 'Product designer', rating: 5, text: 'NEXUS Metro keeps a full workday organized without looking technical or overbuilt.', initials: 'MI' },
  { id: 2, name: 'Aarav Mehta', role: 'Strategy consultant', rating: 5, text: 'The Executive has the restraint and structure I wanted for client meetings and business travel.', initials: 'AM' },
  { id: 3, name: 'Naina Bose', role: 'Creative director', rating: 5, text: 'NEXUS Slate feels thoughtful, tactile and genuinely comfortable on daily studio commutes.', initials: 'NB' }
];

