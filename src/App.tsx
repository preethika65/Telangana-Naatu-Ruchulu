import { useEffect, useMemo, useState } from 'react';
import { Accessibility, ArrowDown, ArrowUpRight, Car, Check, Clock3, MapPin, Menu as MenuIcon, MessageCircle, Minus, Phone, Plus, Search, ShoppingBag, Star, Utensils, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const phoneNumber = 'tel:+919966681345';
const whatsappNumber = phoneNumber.replace('tel:', '').replace(/\D/g, '');
const directionsUrl = 'https://www.google.com/maps/search/?api=1&query=Telangana+Naatu+Ruchulu%2C+Survey+No+113%2C+Moinabad%2C+4%2C+15%2F2%2C+Himayat+Sagar+Road';

const menuRows: [string, string, number][] = [
  ['Veg Hong Kong Fried Rice', 'Veg Fried Rice', 259],
  ['Veg Fried Rice', 'Veg Fried Rice', 249],
  ['Mix Veg Fried Rice', 'Veg Fried Rice', 269],
  ['Veg Schezwan Fried Rice', 'Veg Fried Rice', 259],
  ['Dragon Chicken', 'Non-veg Starters', 449],
  ['Chilly Chicken', 'Non-veg Starters', 449],
  ['Chicken Lollipop', 'Non-veg Starters', 449],
  ['Crispy Chicken', 'Non-veg Starters', 449],
  ['Chilly Mutton', 'Non-veg Starters', 549],
  ['Chicken 65', 'Non-veg Starters', 449],
  ['Chilly Fish', 'Non-veg Starters', 449],
  ['Pepper Chicken', 'Non-veg Starters', 449],
  ['Loose Prawns', 'Non-veg Starters', 499],
  ['Chicken Drumstick', 'Non-veg Starters', 449],
  ['Apollo Fish', 'Non-veg Starters', 449],
  ['Pepper Prawns', 'Non-veg Starters', 499],
  ['Chicken Majestic', 'Non-veg Starters', 449],
  ['Bheja', 'Telangana Specials', 319],
  ['Talakai Kura', 'Telangana Specials', 419],
  ['Paya', 'Telangana Specials', 349],
  ['Boti', 'Telangana Specials', 420],
  ['Liver Fry', 'Telangana Specials', 420],
  ['Bokkala Charu', 'Telangana Specials', 420],
  ['Kodi Kura', 'Telangana Specials', 420],
  ['Telanaga Mamsam', 'Telangana Specials', 519],
  ['Gurda Kapura', 'Telangana Specials', 420],
  ['Naatu Kodi', 'Telangana Specials', 499],
  ['Mutton Kheema', 'Telangana Specials', 519],
  ['Egg Masala', 'Egg', 349],
  ['Chilly Egg', 'Egg', 349],
  ['Masala Omlet', 'Egg', 149],
  ['Boiled Egg', 'Egg', 149],
  ['Egg Bhurjee', 'Egg', 149],
  ['Steam Rice', 'Rice & Meals', 149],
  ['Ragi Sangati', 'Rice & Meals', 149],
  ['Dal Khichdi', 'Rice & Meals', 299],
  ['Curd Rice', 'Rice & Meals', 189],
  ['Bagara Rice', 'Rice & Meals', 189],
  ['Sambar Rice', 'Rice & Meals', 299],
  ['Jeera Rice', 'Rice & Meals', 189],
  ['Yellow Dal Fry', 'Dal', 199],
  ['Yellow Dal Tadka', 'Dal', 199],
  ['Mutton Haleem TAKE AWAY', 'Haleem', 250],
  ['Dum Ka Mutton', 'Non-veg Curries', 549],
  ['Chicken Kolhapuri', 'Non-veg Curries', 449],
  ['Kadhai Chicken', 'Non-veg Curries', 449],
  ['Chicken Mughlai', 'Non-veg Curries', 449],
  ['Mutton Kalimirchi', 'Non-veg Curries', 549],
  ['Chicken Butter Masala', 'Non-veg Curries', 449],
  ['Achhari Mutton', 'Non-veg Curries', 549],
  ['Prawns Curry', 'Non-veg Curries', 549],
  ['Chicken Tikka Masala', 'Non-veg Curries', 449],
  ['Punjabi Chicken Bone', 'Non-veg Curries', 449],
  ['Afgani Chicken', 'Non-veg Curries', 449],
  ['Chicken Chatpata', 'Non-veg Curries', 449],
  ['Chicken Curry', 'Non-veg Curries', 449],
  ['Kadhai Mutton', 'Non-veg Curries', 549],
  ['Mutton Masala', 'Non-veg Curries', 549],
  ['Chicken Kalimirch', 'Non-veg Curries', 449],
  ['Fish Curry', 'Non-veg Curries', 499],
  ['Prawns Masala', 'Non-veg Curries', 549],
  ['Mutton Rogan Josh', 'Non-veg Curries', 549],
  ['Chicken Hyderabadi', 'Non-veg Curries', 449],
  ['Tandoori Mushroom', 'Veg Tikka & Kabab', 299],
  ['Hariyali Paneer Tikka', 'Veg Tikka & Kabab', 299],
  ['Paneer Tikka', 'Veg Tikka & Kabab', 299],
  ['Paneer Achari Tikka', 'Veg Tikka & Kabab', 299],
  ['Hara Bhara Kabab', 'Veg Tikka & Kabab', 299],
  ['Lachha Paratha', 'Indian Breads', 69],
  ['Garlic Naan', 'Indian Breads', 69],
  ['Butter Naan', 'Indian Breads', 65],
  ['Plain Naan', 'Indian Breads', 49],
  ['Tandoori Roti', 'Indian Breads', 49],
  ['Rumali Roti', 'Indian Breads', 49],
  ['Aloo Paratha', 'Indian Breads', 69],
  ['Masala Kulcha', 'Indian Breads', 69],
  ['Butter Roti', 'Indian Breads', 55],
  ['Chicken Fry Piece Biryani', 'Non-veg Biryani', 499],
  ['Fish Biryani', 'Non-veg Biryani', 449],
  ['Mutton Kheema Biryani', 'Non-veg Biryani', 499],
  ['Chicken Biryani Full', 'Non-veg Biryani', 499],
  ['Chicken Biryani Jumbo', 'Non-veg Biryani', 1199],
  ['Chicken 65 Biryani', 'Non-veg Biryani', 499],
  ['Mutton Biryani Jumbo', 'Non-veg Biryani', 1299],
  ['Naatu Kodi Fry Piece Biryani', 'Non-veg Biryani', 499],
  ['Mutton Fry Piece Biryani', 'Non-veg Biryani', 549],
  ['Mutton Family Pack Biryani', 'Non-veg Biryani', 999],
  ['Egg Biryani', 'Non-veg Biryani', 399],
  ['Mutton Biryani Full', 'Non-veg Biryani', 549],
  ['Mutton Biryani Single', 'Non-veg Biryani', 319],
  ['Prawns Biryani', 'Non-veg Biryani', 499],
  ['Chicken Biryani Single', 'Non-veg Biryani', 289],
  ['Chicken Family Pack Biryani', 'Non-veg Biryani', 899],
  ['Palak Paneer', 'Veg Curries', 399],
  ['Kadhai Mushroom', 'Veg Curries', 399],
  ['Paneer Hyderabadi', 'Veg Curries', 399],
  ['Veg Dopiyaza', 'Veg Curries', 399],
  ['Sahi Paneer', 'Veg Curries', 399],
  ['Paneer Dopiyaza', 'Veg Curries', 399],
  ['Methi Chaman', 'Veg Curries', 399],
  ['Kadhai Paneer', 'Veg Curries', 399],
  ['Paneer Butter Masala', 'Veg Curries', 399],
  ['Kadhai Veg', 'Veg Curries', 399],
  ['Blue Lagon', 'Mocktails & Juices', 199],
  ['Jawa Plum Mojito', 'Mocktails & Juices', 199],
  ['Black Current Mojito', 'Mocktails & Juices', 199],
  ['Pina Colada', 'Mocktails & Juices', 199],
  ['Water Melon Mojito', 'Mocktails & Juices', 199],
  ['Fresh Juice', 'Mocktails & Juices', 199],
  ['Sunrised Mocktail', 'Mocktails & Juices', 199],
  ['Water Melon, Pine Apple', 'Mocktails & Juices', 199],
  ['Strawberry Mojito', 'Mocktails & Juices', 199],
  ['Fresh Lime Soda', 'Mocktails & Juices', 199],
  ['Virgin Mojito', 'Mocktails & Juices', 199],
  ['Spicy Orange', 'Mocktails & Juices', 199],
  ['Guava Marine', 'Mocktails & Juices', 199],
  ['Kiwi Delight', 'Mocktails & Juices', 199],
  ['Cream Of Tomato Soup', 'Veg Soups', 199],
  ['Veg Manchow Soup', 'Veg Soups', 199],
  ['Veg Sweet Corn Soup', 'Veg Soups', 199],
  ['Veg Lemon Coriender Soup', 'Veg Soups', 199],
  ['Veg Hot & Sour Soup', 'Veg Soups', 199],
  ['Veg Clear Soup', 'Veg Soups', 199],
  ['Paneer Biryani', 'Veg Biryani', 399],
  ['Kaju Biryani', 'Veg Biryani', 439],
  ['Veg Biryani Full', 'Veg Biryani', 399],
  ['Kaju Paneer Biryani', 'Veg Biryani', 449],
  ['Veg Biryani Single', 'Veg Biryani', 249],
  ['Mushroom Biryani', 'Veg Biryani', 399],
  ['Veg Biryani Family Pack', 'Veg Biryani', 749],
  ['Veg Manchurian', 'Veg Starters', 389],
  ['Crispy Corn', 'Veg Starters', 349],
  ['Chilly Mushroom', 'Veg Starters', 389],
  ['Dragon Paneer', 'Veg Starters', 389],
  ['French Fries (Salt-Peri Peri)', 'Veg Starters', 219],
  ['Chilly Baby Corn', 'Veg Starters', 389],
  ['Chilly Paneer', 'Veg Starters', 389],
  ['Veg Schezwan Noodles', 'Veg Noodles', 259],
  ['Veg Hakka Noodles', 'Veg Noodles', 249],
  ['Veg Soft Noodles', 'Veg Noodles', 249],
  ['Achari Fish Tikka', 'Tandoori & Kebabs', 499],
  ['Tangdi Kabab', 'Tandoori & Kebabs', 249],
  ['Lasuni Kebab', 'Tandoori & Kebabs', 449],
  ['Chicken Tikka', 'Tandoori & Kebabs', 449],
  ['Chicken Reshmi Kabab', 'Tandoori & Kebabs', 449],
  ['Kalmi Kabab', 'Tandoori & Kebabs', 449],
  ['Angara Kebab', 'Tandoori & Kebabs', 449],
  ['Chicken Hariyali Kebab', 'Tandoori & Kebabs', 449],
  ['Fish Tikka', 'Tandoori & Kebabs', 499],
  ['Tandoori Chicken', 'Tandoori & Kebabs', 449],
  ['Chicken Malai Kabab', 'Tandoori & Kebabs', 449],
  ['Mix Non-Veg Fried Rice (Chef Special)', 'Fried Rice', 349],
  ['Mix Non-Veg Noodles', 'Non-veg Noodles', 349],
  ['Chicken Schezwan Noodles', 'Non-veg Noodles', 309],
  ['Chicken Soft Noodles', 'Non-veg Noodles', 299],
  ['Chicken Fried Rice', 'Fried Rice', 299],
  ['Chicken Hong Kong Fried Rice', 'Fried Rice', 319],
  ['Chicken Schezwan Fried Rice', 'Fried Rice', 309],
  ['Egg Fried Rice', 'Fried Rice', 259],
  ['Green Salad', 'Sides', 149],
  ['Mix Raita', 'Sides', 99],
  ['Plain Curd', 'Sides', 99],
  ['Masala Papad Roast', 'Sides', 69],
  ['Masala Papad Fry', 'Sides', 69],
  ['Roasted Papad', 'Sides', 59],
  ['Chicken Hot Sour Soup', 'Non-veg Soups', 219],
  ['Chicken Sweetcorn Soup', 'Non-veg Soups', 219],
  ['Chicken Manchow Soup', 'Non-veg Soups', 219],
  ['Mutton Bone Soup', 'Non-veg Soups', 349],
  ['Chicken Clear Soup', 'Non-veg Soups', 219],
  ['Chicken Lemon Coriander Soup', 'Non-veg Soups', 219],
  ['ARABIAN DELIGHT', 'Desserts', 209],
  ['Apricot Delight', 'Desserts', 199],
  ['Double Ka Meetha', 'Desserts', 199],
  ['Gulab Jamun', 'Desserts', 199],
  ['Khadhu Ka Kheer', 'Desserts', 199],
];
const dishes = menuRows.map(([name, category, price]) => ({ name, category, price }));
const categories = ['All', ...Array.from(new Set(dishes.map((dish) => dish.category)))];
const getDishOrderKey = (dish: (typeof dishes)[number]) => `${dish.category}::${dish.name}`;

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [orderQuantities, setOrderQuantities] = useState<Record<string, number>>({});
  const [orderType, setOrderType] = useState<'Pickup' | 'Delivery'>('Pickup');
  const [orderOpen, setOrderOpen] = useState(false);
  const filteredDishes = useMemo(() => dishes.filter((dish) => (
    (selectedCategory === 'All' || dish.category === selectedCategory)
    && `${dish.name} ${dish.category}`.toLowerCase().includes(search.trim().toLowerCase())
  )), [selectedCategory, search]);
  const orderItems = useMemo(() => dishes.flatMap((dish) => {
    const quantity = orderQuantities[getDishOrderKey(dish)] ?? 0;
    return quantity > 0 ? [{ dish, quantity, lineTotal: dish.price * quantity }] : [];
  }), [orderQuantities]);
  const orderCount = orderItems.reduce((total, item) => total + item.quantity, 0);
  const orderSubtotal = orderItems.reduce((total, item) => total + item.lineTotal, 0);
  const orderMessage = [
    'Hello Telangana Naatu Ruchulu! I would like to place an order:',
    `Order type: ${orderType}`,
    '',
    ...orderItems.map(({ dish, quantity, lineTotal }) => `• ${quantity} × ${dish.name} — ₹${lineTotal.toLocaleString('en-IN')}`),
    '',
    `Estimated subtotal (before delivery charges): ₹${orderSubtotal.toLocaleString('en-IN')}`,
    orderType === 'Delivery'
      ? 'Please confirm delivery availability, final charges, and where I should share my address.'
      : 'Please confirm availability and pickup time.',
  ].join('\n');
  const whatsappOrderUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderMessage)}`;

  useEffect(() => {
    if (!orderOpen) return undefined;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOrderOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [orderOpen]);

  const changeOrderQuantity = (dish: (typeof dishes)[number], change: number) => {
    const key = getDishOrderKey(dish);
    setOrderQuantities((current) => {
      const nextQuantity = (current[key] ?? 0) + change;
      const next = { ...current };
      if (nextQuantity <= 0) delete next[key];
      else next[key] = nextQuantity;
      return next;
    });
  };

  const jumpTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-[100dvh] overflow-x-clip">
      <div className="bg-[#263f31] px-4 py-2 text-center text-[11px] font-semibold tracking-[.12em] text-[#f7e8c7]" data-testid="status-hours">
        MOINABAD · OPEN TODAY UNTIL 11:30 PM
      </div>
      <header className="sticky top-0 z-40 border-b border-[#d7c9b5] bg-[#f6f0e3]/95 backdrop-blur-md">
        <div className="section-wrap flex h-[76px] items-center justify-between">
          <a href="#top" className="flex items-center gap-3" aria-label="Telangana Naatu Ruchulu home" data-testid="link-home">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-[#b64a2d]/35 text-[#b64a2d]">
              <Utensils size={19} strokeWidth={1.7} />
            </span>
            <span className="leading-tight">
              <span className="block text-[11px] font-bold tracking-[.16em] text-[#b64a2d]">TELANGANA</span>
              <span className="serif block text-[19px] font-semibold tracking-[-.03em]">Naatu Ruchulu</span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            <button onClick={() => jumpTo('menu')} className="nav-link text-sm font-semibold" data-testid="nav-menu">Our menu</button>
            <button onClick={() => jumpTo('story')} className="nav-link text-sm font-semibold" data-testid="nav-story">Our place</button>
            <button onClick={() => jumpTo('reviews')} className="nav-link text-sm font-semibold" data-testid="nav-reviews">Guest notes</button>
            <button onClick={() => jumpTo('visit')} className="nav-link text-sm font-semibold" data-testid="nav-visit">Find us</button>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <a href={phoneNumber} className="flex items-center gap-2 px-2 py-3 text-sm font-semibold" data-testid="link-call-header"><Phone size={15} /> Call us</a>
            <a href={phoneNumber} className="btn-primary rounded-full bg-[#b64a2d] px-5 py-3 text-sm font-bold text-[#fff6e5]" data-testid="link-reserve-header">Reserve a table</a>
          </div>
          <button className="grid h-10 w-10 place-items-center rounded-full border border-[#d7c9b5] md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} data-testid="button-mobile-menu">
            {mobileOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
        {mobileOpen && <nav className="grid gap-1 border-t border-[#d7c9b5] bg-[#f6f0e3] px-6 py-4 md:hidden" aria-label="Mobile navigation">
          {['menu', 'story', 'reviews', 'visit'].map((id) => <button key={id} onClick={() => jumpTo(id)} className="py-3 text-left font-semibold capitalize" data-testid={`mobile-nav-${id}`}>{id === 'story' ? 'Our place' : id === 'reviews' ? 'Guest notes' : id === 'visit' ? 'Find us' : 'Our menu'}</button>)}
          <a href={phoneNumber} className="mt-2 rounded-full bg-[#b64a2d] px-5 py-3 text-center font-bold text-[#fff6e5]" data-testid="link-mobile-call">Call 099666 81345</a>
        </nav>}
      </header>

      <main id="top">
        <section className="section-wrap grid min-h-[660px] items-center gap-10 py-14 lg:grid-cols-[.86fr_1.14fr] lg:py-20">
          <div className="relative z-10 order-2 lg:order-1">
            <p className="eyebrow mb-5 text-[#b64a2d] reveal">A taste of Telangana · Moinabad</p>
            <h1 className="serif max-w-[600px] text-[clamp(3.5rem,7.5vw,6.4rem)] font-semibold leading-[.98] tracking-[-.055em] reveal reveal-delay-1" data-testid="text-hero-title">
              Naatu ruchulu.<br /><em className="font-medium text-[#b64a2d]">Our kind of</em><br />welcome.
            </h1>
            <p className="mt-7 max-w-[430px] text-[16px] leading-7 text-[#65564a] reveal reveal-delay-2">
              Come hungry for Telangana flavours, stay for the easy family-table feeling. Find us just off Himayat Sagar Road.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 reveal reveal-delay-2">
              <button onClick={() => jumpTo('menu')} className="btn-primary inline-flex items-center gap-2 rounded-full bg-[#b64a2d] px-6 py-4 text-sm font-bold text-[#fff6e5]" data-testid="button-explore-menu">Explore the menu <ArrowDown size={16} /></button>
              <a href={directionsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#b9a894] px-6 py-4 text-sm font-bold" data-testid="link-directions-hero">Get directions <ArrowUpRight size={16} /></a>
            </div>
            <div className="mt-10 flex items-center gap-3 border-t border-[#d7c9b5] pt-5">
              <span className="flex items-center gap-1 text-[#b64a2d]" aria-label="4.6 out of 5 stars"><Star fill="currentColor" size={17} /><strong className="text-lg text-[#31241c]">4.6</strong></span>
              <span className="text-sm text-[#65564a]" data-testid="text-review-count">from 4,201 reviews</span>
              <span className="mx-1 h-1 w-1 rounded-full bg-[#b7a694]" />
              <span className="text-sm text-[#65564a]">Family-friendly</span>
            </div>
          </div>
          <div className="relative order-1 min-h-[350px] lg:order-2 lg:min-h-[520px]">
            <div className="absolute -right-10 -top-2 hidden h-[95%] w-[82%] rotate-[4deg] rounded-[48%_48%_12px_12px] border border-[#cbbba5] lg:block" />
            <div className="relative h-[360px] overflow-hidden rounded-[48%_48%_10px_10px] bg-[#263f31] shadow-[0_24px_65px_rgba(59,40,24,.18)] sm:h-[460px] lg:h-[520px]">
              <img src="/biryani-hero.jpg" alt="A Telangana-style chicken dum biryani served with raita and salan" width="1200" height="900" className="h-full w-full object-cover" fetchPriority="high" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d1a13]/70 via-transparent to-transparent" />
              <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between text-[#fff4dc]">
                <div><p className="eyebrow mb-2 text-[#f4d68f]">Made for sharing</p><p className="serif text-2xl">Gather round.</p></div>
                <span className="grid h-12 w-12 place-items-center rounded-full border border-white/50"><ArrowDown size={18} /></span>
              </div>
            </div>
            <div className="absolute -bottom-5 left-2 rounded-full border border-[#d7c9b5] bg-[#f6f0e3] px-5 py-3 text-xs font-bold tracking-[.08em] shadow-md sm:left-7">
              HIMAYAT SAGAR ROAD <span className="mx-2 text-[#b64a2d]">·</span> MOINABAD
            </div>
          </div>
        </section>

        <section className="grain-panel bg-[#263f31] py-6 text-[#f7e8c7]">
          <div className="section-wrap flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-center text-xs font-semibold tracking-[.11em] sm:justify-between">
            <span className="inline-flex items-center gap-2"><Utensils size={15} /> DINE-IN</span><span className="hidden h-1 w-1 rounded-full bg-[#d6b66d] sm:block" />
            <span>TAKEAWAY</span><span className="hidden h-1 w-1 rounded-full bg-[#d6b66d] sm:block" /><span>KERBSIDE PICKUP</span><span className="hidden h-1 w-1 rounded-full bg-[#d6b66d] sm:block" />
            <span>NO-CONTACT DELIVERY</span><span className="hidden h-1 w-1 rounded-full bg-[#d6b66d] sm:block" /><span>OUTDOOR SEATING</span>
          </div>
        </section>

        <section id="menu" className="section-wrap py-24 sm:py-28">
          <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr]">
            <div>
              <p className="eyebrow text-[#b64a2d]">From our kitchen</p>
              <h2 className="serif mt-4 text-5xl leading-[1.05] tracking-[-.04em] sm:text-6xl">A little spice.<br /><em className="text-[#b64a2d]">A lot of soul.</em></h2>
              <p className="mt-5 max-w-sm leading-7 text-[#65564a]">Browse the full menu by category, or search for a favourite. From Telangana specials to biryani, breads and something sweet.</p>
              <div className="mt-8 rounded-2xl border border-[#d7c9b5] bg-[#eee5d5] p-5">
                <p className="eyebrow text-[#7b604b]">Good to know</p>
                <p className="mt-2 text-sm leading-6 text-[#65564a]">Menu availability may vary. Call ahead to check today’s selection or arrange pickup and delivery.</p>
                <a href={phoneNumber} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#a44027]" data-testid="link-menu-pricing-call">Call 099666 81345 <Phone size={15} /></a>
              </div>
            </div>
            <div className="rounded-[26px] border border-[#d7c9b5] bg-[#fbf7ed] p-5 sm:p-8">
              <div className="relative mb-5">
                <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#806d5b]" />
                <input type="search" aria-label="Search menu" placeholder="Search dishes..." value={search} onChange={(event) => setSearch(event.target.value)} className="h-12 w-full rounded-full border border-[#d7c9b5] bg-[#f6f0e3] pl-11 pr-4 text-sm outline-none transition focus:border-[#b64a2d] focus:ring-2 focus:ring-[#b64a2d]/15" data-testid="input-menu-search" />
              </div>
              <div className="category-scroll mb-6 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Menu categories">
                {categories.map((category) => <button key={category} role="tab" aria-selected={selectedCategory === category} onClick={() => setSelectedCategory(category)} className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-bold transition ${selectedCategory === category ? 'bg-[#263f31] text-[#fff4dc]' : 'border border-[#d7c9b5] text-[#625448] hover:border-[#b64a2d]'}`} data-testid={`tab-category-${category.toLowerCase().replaceAll(' ', '-')}`}>{category}</button>)}
              </div>
              <p className="mb-2 px-3 text-xs text-[#8a7866]" data-testid="text-menu-results" aria-live="polite">{filteredDishes.length} {filteredDishes.length === 1 ? 'dish' : 'dishes'}{selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}</p>
              <div aria-live="polite" className="divide-y divide-[#e4d9c7]">
                {filteredDishes.length ? filteredDishes.map((dish, index) => {
                  const quantity = orderQuantities[getDishOrderKey(dish)] ?? 0;
                  return (
                    <article key={`${dish.category}-${dish.name}`} className="dish-row flex items-center justify-between gap-3 rounded-lg px-3 py-4" data-testid={`card-dish-${index}`}>
                      <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="serif text-[19px] font-semibold">{dish.name}</h3>{dish.name.includes('Family Pack') && <span className="rounded-full bg-[#eee4cf] px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#8d5738]">For sharing</span>}</div><p className="mt-1 text-xs leading-5 text-[#78695b]">{dish.category}</p></div>
                      <div className="flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center">
                        <span className="text-right font-semibold text-[#a44027]">₹{dish.price.toLocaleString('en-IN')}</span>
                        {quantity === 0 ? (
                          <button type="button" onClick={() => changeOrderQuantity(dish, 1)} className="rounded-full border border-[#b64a2d]/40 px-3 py-1.5 text-xs font-bold text-[#a44027] transition hover:bg-[#b64a2d] hover:text-white" aria-label={`Add ${dish.name} to your order`} data-testid={`button-add-${index}`}>Add</button>
                        ) : (
                          <div className="flex items-center gap-1 rounded-full border border-[#d7c9b5] bg-[#f6f0e3] p-1" role="group" aria-label={`Quantity for ${dish.name}`}>
                            <button type="button" onClick={() => changeOrderQuantity(dish, -1)} className="grid h-7 w-7 place-items-center rounded-full text-[#65564a] hover:bg-[#e9dfcc]" aria-label={`Remove one ${dish.name}`} data-testid={`button-decrease-${index}`}><Minus size={14} /></button>
                            <span className="min-w-5 text-center text-xs font-bold" aria-live="polite">{quantity}</span>
                            <button type="button" onClick={() => changeOrderQuantity(dish, 1)} className="grid h-7 w-7 place-items-center rounded-full bg-[#263f31] text-white hover:bg-[#355441]" aria-label={`Add one more ${dish.name}`} data-testid={`button-increase-${index}`}><Plus size={14} /></button>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                }) : <div className="py-12 text-center" data-testid="status-menu-empty"><p className="serif text-2xl">Nothing on this search.</p><p className="mt-2 text-sm text-[#78695b]">Try a different dish or category.</p><button onClick={() => { setSearch(''); setSelectedCategory('All'); }} className="mt-4 text-sm font-bold text-[#a44027] underline underline-offset-4" data-testid="button-clear-menu-search">Clear filters</button></div>}
              </div>
              <p className="mt-5 border-t border-[#e4d9c7] pt-4 text-xs text-[#8a7866]">Menu availability may vary. Please call to confirm today’s selection.</p>
            </div>
          </div>
        </section>

        <section id="story" className="bg-[#e9dfcc] py-20 sm:py-24">
          <div className="section-wrap grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
            <div className="relative min-h-[370px] overflow-hidden rounded-[180px_180px_18px_18px] bg-[#d4c4a9] p-3">
              <div className="grid h-full min-h-[350px] place-items-center rounded-[170px_170px_12px_12px] border border-[#f5eddd]/70 bg-[#263f31] px-10 text-center text-[#f8edd7]">
                <div>
                  <p className="eyebrow text-[#e0c17c]">Telangana, at the table</p>
                  <p className="serif mt-5 text-5xl leading-tight">Food tastes<br /><em>better together.</em></p>
                  <span className="mx-auto mt-7 block h-px w-16 bg-[#e0c17c]" />
                  <p className="mt-5 text-xs tracking-[.16em]">NAATU RUCHULU · MOINABAD</p>
                </div>
              </div>
            </div>
            <div>
              <p className="eyebrow text-[#b64a2d]">Your table is waiting</p>
              <h2 className="serif mt-4 text-5xl leading-[1.08] tracking-[-.04em] sm:text-6xl">A calm pause<br />off the road.</h2>
              <p className="mt-6 max-w-lg text-[16px] leading-7 text-[#65564a]">A relaxed stop for lunch, dinner and long conversations. Our guests describe a pleasant, well-kept setting, friendly service and the comfort of sharing Telangana food with family and friends.</p>
              <div className="mt-8 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 border-y border-[#cdbfa9] py-6">
                <div className="flex items-start gap-3"><Accessibility className="mt-1 text-[#b64a2d]" size={18} /><span><strong className="block text-sm">Accessible seating</strong><span className="text-xs text-[#78695b]">Wheelchair accessible</span></span></div>
                <div className="flex items-start gap-3"><Car className="mt-1 text-[#b64a2d]" size={18} /><span><strong className="block text-sm">Easy parking</strong><span className="text-xs text-[#78695b]">Free & on-site parking</span></span></div>
                <div className="flex items-start gap-3"><Utensils className="mt-1 text-[#b64a2d]" size={18} /><span><strong className="block text-sm">Room for everyone</strong><span className="text-xs text-[#78695b]">Family-friendly, outdoor seating</span></span></div>
                <div className="flex items-start gap-3"><Clock3 className="mt-1 text-[#b64a2d]" size={18} /><span><strong className="block text-sm">Open late</strong><span className="text-xs text-[#78695b]">Listed open until 11:30 pm</span></span></div>
              </div>
              <a href={phoneNumber} className="mt-7 inline-flex items-center gap-2 font-bold text-[#a44027]" data-testid="link-reserve-story">Lunch or dinner? Reservations recommended <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>

        <section id="details" className="section-wrap py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow text-[#b64a2d]">A little more to know</p>
            <h2 className="serif mt-4 text-4xl tracking-[-.04em] sm:text-5xl">Come as you are.</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl border border-[#d7c9b5] bg-[#fbf7ed] p-5">
              <h3 className="serif text-xl font-semibold">Around the table</h3>
              <p className="mt-3 text-sm leading-6 text-[#65564a]">Casual, cozy, quiet and trendy. Family-friendly for groups, tourists, university students and solo diners.</p>
            </article>
            <article className="rounded-2xl border border-[#d7c9b5] bg-[#fbf7ed] p-5">
              <h3 className="serif text-xl font-semibold">Dining &amp; service</h3>
              <p className="mt-3 text-sm leading-6 text-[#65564a]">Brunch, lunch and dinner with table service, seating, catering and dessert. Dine-in, outdoor seating, takeaway, kerbside pickup, delivery and no-contact delivery.</p>
            </article>
            <article className="rounded-2xl border border-[#d7c9b5] bg-[#fbf7ed] p-5">
              <h3 className="serif text-xl font-semibold">Easy for everyone</h3>
              <p className="mt-3 text-sm leading-6 text-[#65564a]">Wheelchair-accessible seating and toilet, restroom, good for kids and high chairs. Lunch and dinner reservations are recommended.</p>
            </article>
            <article className="rounded-2xl border border-[#d7c9b5] bg-[#fbf7ed] p-5">
              <h3 className="serif text-xl font-semibold">The useful bits</h3>
              <p className="mt-3 text-sm leading-6 text-[#65564a]">All-you-can-eat, late-night food, quick bites, small plates and vegetarian options. Free lot and street parking, on-site and paid parking, plenty of spaces and valet. Credit/debit cards, Google Pay and NFC payments accepted.</p>
            </article>
          </div>
        </section>

        <section id="reviews" className="section-wrap py-24 sm:py-28">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><p className="eyebrow text-[#b64a2d]">The word around the table</p><h2 className="serif mt-4 text-5xl tracking-[-.04em] sm:text-6xl">Guests said it best.</h2></div>
            <div className="flex items-center gap-4 self-start rounded-full border border-[#d7c9b5] bg-[#fbf7ed] px-5 py-3 md:self-auto">
              <Star fill="currentColor" size={20} className="text-[#b64a2d]" /><span className="text-2xl font-bold">4.6</span><span className="text-sm text-[#78695b]">/ 5 · 4,201 reviews</span>
            </div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <blockquote className="flex min-h-[220px] flex-col justify-between rounded-[20px] bg-[#263f31] p-7 text-[#f8edd7]">
              <div><div className="mb-5 flex gap-1 text-[#e3c379]" aria-label="5 stars"><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /></div><p className="serif text-[22px] leading-8">“Crispy chicken was delicious & crispy. Chicken Dum Biryani taste was very good & of huge quantity.”</p></div>
              <cite className="mt-6 text-[10px] font-bold not-italic uppercase tracking-[.14em] text-[#d7c28e]">Guest review · 4 months ago</cite>
            </blockquote>
            <blockquote className="flex min-h-[220px] flex-col justify-between rounded-[20px] border border-[#d7c9b5] bg-[#fbf7ed] p-7">
              <div><div className="mb-5 flex gap-1 text-[#b64a2d]" aria-label="5 stars"><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /></div><p className="serif text-[22px] leading-8">“Place looks good from inside, peaceful. Service is good. I tried bagara rice and kodi kura.”</p></div>
              <cite className="mt-6 text-[10px] font-bold not-italic uppercase tracking-[.14em] text-[#8a7866]">Guest review · 10 months ago</cite>
            </blockquote>
            <blockquote className="flex min-h-[220px] flex-col justify-between rounded-[20px] border border-[#d7c9b5] bg-[#fbf7ed] p-7">
              <div><div className="mb-5 flex gap-1 text-[#b64a2d]" aria-label="5 stars"><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /></div><p className="serif text-[22px] leading-8">“The apricot dessert was also great.”</p></div>
              <cite className="mt-6 text-[10px] font-bold not-italic uppercase tracking-[.14em] text-[#8a7866]">Guest review · 8 months ago</cite>
            </blockquote>
          </div>
          <p className="mt-4 text-xs text-[#8a7866]">Selected excerpts from guest comments provided for this page.</p>
        </section>

        <section id="visit" className="grain-panel bg-[#b64a2d] py-20 text-[#fff4dc] sm:py-24">
          <div className="section-wrap grid gap-12 lg:grid-cols-[1fr_.8fr]">
            <div>
              <p className="eyebrow text-[#f1d99e]">Come by for a meal</p>
              <h2 className="serif mt-4 text-5xl leading-[1.05] tracking-[-.04em] sm:text-7xl">On the way.<br /><em>Worth the stop.</em></h2>
              <p className="mt-6 max-w-md leading-7 text-[#f4ddc8]">Find us on Himayat Sagar Road in Moinabad. Call ahead for a table or to arrange pickup and delivery.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={directionsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#f6ead1] px-6 py-4 text-sm font-bold text-[#38271d]" data-testid="link-directions">Get map directions <MapPin size={16} /></a>
                <a href={phoneNumber} className="inline-flex items-center gap-2 rounded-full border border-[#f6ead1]/60 px-6 py-4 text-sm font-bold" data-testid="link-call-visit">Call 099666 81345 <Phone size={16} /></a>
              </div>
            </div>
            <div className="rounded-[24px] border border-white/25 bg-[#96391f]/35 p-7 sm:p-9">
              <p className="eyebrow text-[#f1d99e]">Visit us</p>
              <address className="mt-5 not-italic">
                <p className="serif text-2xl leading-8">Survey No. 113, Moinabad,<br />4, 15/2, Himayat Sagar Road</p>
                <p className="mt-2 text-sm text-[#f4ddc8]">Telangana, India</p>
              </address>
              <div className="my-7 h-px bg-white/25" />
              <div className="flex items-start gap-3"><Clock3 size={18} className="mt-1 shrink-0 text-[#f1d99e]" /><p><strong className="block">Open until 11:30 pm</strong><span className="text-sm text-[#f4ddc8]">Listed hours</span></p></div>
              <div className="mt-5 flex items-start gap-3"><Check size={18} className="mt-1 shrink-0 text-[#f1d99e]" /><p className="text-sm leading-6 text-[#f4ddc8]">Dine-in · Takeaway · Kerbside pickup · No-contact delivery · Outdoor seating</p></div>
              <a href={phoneNumber} className="mt-6 inline-flex items-center gap-2 font-bold" data-testid="link-phone-number"><Phone size={16} /> 099666 81345</a>
            </div>
          </div>
        </section>

        <section className="section-wrap py-16">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[24px] border border-[#d7c9b5] bg-[#eee5d5] p-7 sm:flex-row sm:items-center sm:p-10">
            <div><p className="eyebrow text-[#b64a2d]">Make it a gathering</p><h2 className="serif mt-3 text-3xl sm:text-4xl">Lunch or dinner, save your seats.</h2><p className="mt-2 text-sm text-[#65564a]">Reservations recommended. We’re one call away.</p></div>
            <a href={phoneNumber} className="btn-primary inline-flex shrink-0 items-center gap-2 rounded-full bg-[#b64a2d] px-6 py-4 font-bold text-[#fff6e5]" data-testid="link-reservation-cta">Call to reserve <Phone size={16} /></a>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#d7c9b5] bg-[#eee5d5] py-8 pb-24 sm:pb-8">
        <div className="section-wrap flex flex-col justify-between gap-5 text-sm sm:flex-row sm:items-center">
          <div><span className="serif text-lg font-semibold">Telangana Naatu Ruchulu</span><p className="mt-1 text-xs text-[#78695b]">A family table in Moinabad.</p></div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold"><button onClick={() => jumpTo('menu')} className="hover:text-[#b64a2d]" data-testid="footer-menu">Menu</button><button onClick={() => jumpTo('visit')} className="hover:text-[#b64a2d]" data-testid="footer-visit">Visit</button><a href={phoneNumber} className="hover:text-[#b64a2d]" data-testid="footer-call">Call us</a><a href={directionsUrl} target="_blank" rel="noreferrer" className="hover:text-[#b64a2d]" data-testid="footer-directions">Directions</a></div>
          <p className="text-[10px] text-[#8a7866]">Himayat Sagar Road · Moinabad</p>
        </div>
      </footer>
      {orderCount > 0 && !orderOpen && (
        <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-5 sm:pb-5">
          <div className="mx-auto max-w-5xl rounded-2xl border border-[#d7c9b5] bg-[#fbf7ed] p-2 shadow-[0_12px_50px_rgba(43,31,21,.22)]">
            <button type="button" onClick={() => setOrderOpen(true)} className="flex w-full items-center justify-between gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-[#f2eadb]" aria-label={`${orderCount} ${orderCount === 1 ? 'item' : 'items'} in order, subtotal ₹${orderSubtotal.toLocaleString('en-IN')}. Review order.`} data-testid="button-open-order">
              <span className="flex min-w-0 items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#263f31] text-[#fff4dc]"><ShoppingBag size={19} /></span>
                <span className="min-w-0 leading-tight"><span className="block truncate text-sm font-bold">Your order · {orderCount} {orderCount === 1 ? 'item' : 'items'}</span><span className="mt-1 block text-xs text-[#78695b]">Subtotal ₹{orderSubtotal.toLocaleString('en-IN')}</span></span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-[#a44027] sm:text-sm">Review order <ArrowUpRight size={16} /></span>
            </button>
          </div>
        </div>
      )}

      {orderOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[#211913]/55 sm:items-center sm:p-5" role="presentation" onClick={() => setOrderOpen(false)}>
          <section role="dialog" aria-modal="true" aria-labelledby="order-dialog-title" onClick={(event) => event.stopPropagation()} className="flex max-h-[90dvh] w-full max-w-xl flex-col overflow-hidden rounded-t-[26px] border border-[#d7c9b5] bg-[#fbf7ed] shadow-2xl sm:rounded-[26px]" data-testid="dialog-order">
            <div className="flex items-start justify-between gap-4 border-b border-[#e4d9c7] p-5 sm:p-6">
              <div><p className="eyebrow text-[#b64a2d]">From our kitchen</p><h2 id="order-dialog-title" className="serif mt-2 text-3xl">Your order</h2><p className="mt-1 text-sm text-[#78695b]">Review your items before opening WhatsApp.</p></div>
              <button type="button" onClick={() => setOrderOpen(false)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#d7c9b5] text-[#65564a] hover:bg-[#eee5d5]" aria-label="Close order" data-testid="button-close-order"><X size={18} /></button>
            </div>

            <div className="border-b border-[#e4d9c7] px-5 py-4 sm:px-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#78695b]">Pickup or delivery?</p>
              <div className="grid grid-cols-2 gap-2">
                {(['Pickup', 'Delivery'] as const).map((type) => <button key={type} type="button" onClick={() => setOrderType(type)} aria-pressed={orderType === type} className={`rounded-full px-4 py-2.5 text-sm font-bold transition ${orderType === type ? 'bg-[#263f31] text-[#fff4dc]' : 'border border-[#d7c9b5] text-[#625448] hover:border-[#b64a2d]'}`} data-testid={`button-order-type-${type.toLowerCase()}`}>{type}</button>)}
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 sm:px-6">
              {orderItems.length ? orderItems.map(({ dish, quantity, lineTotal }) => (
                <div key={getDishOrderKey(dish)} className="flex items-center justify-between gap-4 border-b border-[#e4d9c7] py-4">
                  <div className="min-w-0"><p className="truncate font-semibold">{dish.name}</p><p className="mt-1 text-xs text-[#78695b]">₹{dish.price.toLocaleString('en-IN')} each · ₹{lineTotal.toLocaleString('en-IN')}</p></div>
                  <div className="flex shrink-0 items-center gap-1 rounded-full border border-[#d7c9b5] bg-[#f6f0e3] p-1" role="group" aria-label={`Quantity for ${dish.name}`}>
                    <button type="button" onClick={() => changeOrderQuantity(dish, -1)} className="grid h-8 w-8 place-items-center rounded-full text-[#65564a] hover:bg-[#e9dfcc]" aria-label={`Remove one ${dish.name}`}><Minus size={14} /></button>
                    <span className="min-w-5 text-center text-sm font-bold" aria-live="polite">{quantity}</span>
                    <button type="button" onClick={() => changeOrderQuantity(dish, 1)} className="grid h-8 w-8 place-items-center rounded-full bg-[#263f31] text-white hover:bg-[#355441]" aria-label={`Add one more ${dish.name}`}><Plus size={14} /></button>
                  </div>
                </div>
              )) : (
                <div className="py-10 text-center">
                  <p className="serif text-xl">Your order is empty.</p>
                  <button type="button" onClick={() => { setOrderOpen(false); jumpTo('menu'); }} className="mt-3 text-sm font-bold text-[#a44027] underline underline-offset-4">Browse the menu</button>
                </div>
              )}
            </div>

            <div className="border-t border-[#e4d9c7] bg-[#f6f0e3] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4"><span className="text-sm font-semibold">Subtotal <span className="font-normal text-[#78695b]">(before delivery charges)</span></span><span className="text-lg font-bold text-[#a44027]">₹{orderSubtotal.toLocaleString('en-IN')}</span></div>
              <p className="mt-2 text-xs leading-5 text-[#78695b]">WhatsApp will open with this order ready to send. The restaurant will confirm availability and any delivery charges.</p>
              {orderItems.length ? (
                <a href={whatsappOrderUrl} target="_blank" rel="noreferrer" onClick={() => setOrderOpen(false)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#263f31] px-5 py-3.5 text-sm font-bold text-[#fff4dc] transition hover:bg-[#355441]" data-testid="link-whatsapp-order"><MessageCircle size={18} /> Order on WhatsApp <ArrowUpRight size={16} /></a>
              ) : (
                <button type="button" disabled className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#d7c9b5] px-5 py-3.5 text-sm font-bold text-[#78695b]" data-testid="button-whatsapp-order-disabled"><MessageCircle size={18} /> Add a dish to continue</button>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function Router() {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;