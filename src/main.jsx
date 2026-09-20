import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Accessibility, ArrowRight, CalendarDays, Check, ChevronDown, Clock3,
  CreditCard, ExternalLink, MapPin, Menu as MenuIcon, Minus, Phone,
  Plus, ShoppingBag, Star, Truck, Utensils, X
} from "lucide-react";
import "./styles.css";

const menuItems = [
  { id: 1, name: "Chicken Pie", image: "https://lh3.googleusercontent.com/grass-cs/ACvplmNum4WTgagyX4JLYdwxPQkKSJODjAY11T8C6ZGdQXiWXhUksKWFWiHixmfgC_F-TTNweM81euBESvb15peh6zHZn45t-a3p19vpAEJ_iMPyT4x9lWCM8LqzqGN_LVm3OOS99JswUg=w155-h202-p-k-no", category: "Pastries", description: "A savory chicken-filled pastry.", price: 0 },
  { id: 2, name: "Pasta with Meat Sauce", image: "https://lh3.googleusercontent.com/grass-cs/ACvplmOdrWsHse4W-kvTlR0MJqAr5QWyrmANhu_pEYI1zCKODQXqyijZqBOAMbnW08P7l62WvZqbSsWHRaRIklQmutU96WnSaH0Sjan_7dTUvbC0UndEbOMihjFrkafPYW14S98qoC0O=w155-h202-p-k-no", category: "Pasta", description: "Pasta served with rich meat sauce.", price: 0 },
  { id: 3, name: "Meat Pie and Ice Cream", image: "https://lh3.googleusercontent.com/grass-cs/ACvplmM4CBcu7XgE7ioW5wXxqScrC6uOnHjIDhWn9B4FrRc8Szzvzjm58sIaLPhwtaDE3YP71mUkrWD8MKwnpFP-BaK5FPW2C4UPe22uvapOl_7A3LlFvUTYC8zISVLJ0oXNIO9Wz8ld=w155-h202-p-k-no", category: "Dessert", description: "A savory meat pie paired with ice cream.", price: 0 },
  { id: 4, name: "Fried Rice and Chicken", image: "https://lh3.googleusercontent.com/grass-cs/ACvplmNO2loRJIQ6_2o4bKUIYEoS_SwaL-5ncoaW2kljNmWG53hnZX-XpXrtLBeg4K-G6SpCa4cTG8NVcxYTNBQ5aKN9-i_azZXLMeL1Nuq2KLOD43ypF8uyhwz6X5syfrpOHY6DwZbx=w155-h202-k-no", category: "Rice", description: "Flavorful fried rice served with chicken.", price: 0 },
  { id: 5, name: "Pasta with Chicken", image: "https://lh3.googleusercontent.com/grass-cs/ACvplmM-4GgIdHdG1Tuyibqabf76B0cqXTsMmM5l2a2QfOdiqpl7DSR-y0eTWHBL6vcIf604Qfcp2lmmZtad7ALg7o-sRlZftxNbGF-JhF3nXWRB48hSFc839TC5rkSY6o_HKJSkggY=w155-h202-p-k-no", category: "Pasta", description: "Comforting pasta paired with chicken.", price: 0 },
  { id: 6, name: "Full Chicken Spiced", image: "https://lh3.googleusercontent.com/grass-cs/ACvplmO0OKvmcxUPkTB2Bi3K6e3pLHUsTvF3RO-bpbAZNRt5zIKM1InENqmRhv5k0caLLwdBZcq1OeYep4KBsIuI7LzZe0K2SHOOGGsV7WZS_n497aTZ-I64tUeq1C9_b8sOBuDWXCgMOg=w155-h202-p-k-no", category: "Chicken", description: "Whole chicken prepared with a flavorful spice blend.", price: 0 },
  { id: 7, name: "White Rice and Sauce with Vegetables", image: "https://lh3.googleusercontent.com/grass-cs/ACvplmNncg35WEQ9fnyjVjGWfP_HLkFd1heawKp9T8vUXMe1vHucO8lgp_VMCwsMzpDwBD2K3mJruh9eFy6t6ZhJw1qITo9zmgYltQk1mEjMm-qUigu2aUbd9eBkZcYfm9LSFgOogm0B=w155-h202-p-k-no", category: "Rice", description: "White rice, sauce, and vegetables.", price: 0 }
];

const gallery = [
  { src: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlPcASCmLF--UizLp8bs71HDS9ucs3SRwniwxC5RFZgHD-OYtOG_m7qSoDD4b279GyqcgFMeYzROTkvdthKVDYfkBWvXhJRv9aIOkgHRLYo-0Hm9CHpYgCIusjGrYCqpX1_aHOW=w397-h298-k-no", label: "All" },
  { src: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlYclwwG6JtCa3lbFc2S8R6X7xulAZYGdOfpLGJ1B3xmcXugQZ49YVNkara3ONN-qeJgGPW_zN1wM6Zu3hQRUWpSVRxZ6dNTertKG_LOzS6cAjDaE8kONNWssqrCkuHSxJ5Gtns=w397-h298-k-no", label: "Menu" },
  { src: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWndQK1AkGXfFtc3-YX-5QXhMSnY98NEPs2Q_owV0-PiNmJxjt6q-mSU52OqNFIc6-B-AI1v87HkmHm85n8vmUeNj6Yvzk0mX2oDcUUHU2aTinSa2wWBOOVMQANB6szAY-tV907wKKUBQ0U=w224-h298-k-no", label: "Food & Drink" },
  { src: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlQ3oEq-XUREZUXKWuCWv7djL-XvrMtjs4JdhuZlR2RMgyce_H6gyn-O_IdwsGtp0m15sRCuDEWf0_c5X3MO_xGqvHqqrzGznPXjHzVbRIKY_Ek_1onHs5_Ddzjq6iTyJ9wOvmaw=w397-h298-k-no", label: "Vibe" },
  { src: "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=tYxB7eJLwqiPP-jOvX7D7w&cb_client=maps_sv.tactile.gps&w=224&h=298&yaw=163.86093&pitch=0&thumbfov=100", label: "Vibe" }
];

const reviews = [
  ["Mide Tomori", "A really nice place, very decent location for a date, corporate appointments or celebrations."],
  ["Ali Malik", "Good to have local KFC/McDonalds, better place for hygienic food. Quality is okay. Wait time is high. No water in taps."],
  ["Samson Johnson", "Its now opened and serving customers. The waiters are still fresh compared to the other outlets. But they will catch up."]
];

function App() {
  const [page, setPage] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");
  const [reservationSent, setReservationSent] = useState(false);
  const [orderSent, setOrderSent] = useState(false);

  const categories = ["All", ...new Set(menuItems.map((x) => x.category))];
  const filtered = useMemo(() => category === "All" ? menuItems : menuItems.filter(x => x.category === category), [category]);

  const go = (p) => {
    setPage(p);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (item) => {
    setCart(c => {
      const found = c.find(x => x.id === item.id);
      return found ? c.map(x => x.id === item.id ? {...x, qty: x.qty + 1} : x) : [...c, {...item, qty: 1}];
    });
    setCartOpen(true);
  };

  const changeQty = (id, delta) => setCart(c => c.map(x => x.id === id ? {...x, qty: Math.max(0, x.qty + delta)} : x).filter(x => x.qty > 0));
  const total = cart.reduce((sum, x) => sum + x.price * x.qty, 0);
  const count = cart.reduce((sum, x) => sum + x.qty, 0);

  return (
    <>
      <header className="nav">
        <button className="brand" onClick={() => go("home")} aria-label="Chicken Republic home">
          <span className="brandMark">CR</span><span>Chicken <b>Republic</b></span>
        </button>
        <nav className={mobileOpen ? "navLinks open" : "navLinks"}>
          {["home","menu","order","reservations","gallery","contact"].map(p =>
            <button key={p} className={page === p ? "active" : ""} onClick={() => go(p)}>
              {p === "home" ? "Home" : p === "order" ? "Order Online" : p[0].toUpperCase()+p.slice(1)}
            </button>
          )}
          <button className="navOrder" onClick={() => go("order")}>Order Now <ArrowRight size={17}/></button>
        </nav>
        <div className="navActions">
          <a href="tel:09088808329" className="iconBtn" aria-label="Call Chicken Republic"><Phone size={19}/></a>
          <button className="cartBtn" onClick={() => setCartOpen(true)} aria-label="Open cart"><ShoppingBag size={19}/><span>{count}</span></button>
          <button className="hamburger" onClick={() => setMobileOpen(v => !v)} aria-label="Open menu">{mobileOpen ? <X/> : <MenuIcon/>}</button>
        </div>
      </header>

      <main>
        {page === "home" && <Home go={go} addToCart={addToCart}/>}
        {page === "menu" && <MenuPage filtered={filtered} categories={categories} category={category} setCategory={setCategory} addToCart={addToCart}/>}
        {page === "order" && <OrderPage cart={cart} total={total} changeQty={changeQty} go={go} orderSent={orderSent} setOrderSent={setOrderSent}/>}
        {page === "reservations" && <Reservations sent={reservationSent} setSent={setReservationSent}/>}
        {page === "gallery" && <Gallery/>}
        {page === "contact" && <Contact go={go}/>}
      </main>

      <footer>
        <div className="footerGrid">
          <div><div className="footerBrand">Chicken Republic</div><p>Good food, good times, right here in Wurukum, Makurdi.</p></div>
          <div><h4>Quick Links</h4>{["home","menu","order","reservations","gallery","contact"].map(p => <button key={p} onClick={() => go(p)}>{p === "order" ? "Order Online" : p[0].toUpperCase()+p.slice(1)}</button>)}</div>
          <div><h4>Contact</h4><a href="tel:09088808329">0908 880 8329</a><p>PGFP+W25, 10-4 Old Otukpo Rd, Wurukum, Makurdi 970101, Benue</p></div>
        </div>
        <div className="copyright">© 2026 Chicken Republic. Website demo — update pricing and live payment credentials before launch.</div>
      </footer>

      {cartOpen && <CartDrawer cart={cart} total={total} changeQty={changeQty} close={() => setCartOpen(false)} go={go}/>}
    </>
  );
}

function Home({go, addToCart}) {
  return <div>
    <section className="hero">
      <div className="heroContent">
        <span className="eyebrow">WURUKUM · MAKURDI</span>
        <h1>Good food.<br/><em>Good times.</em></h1>
        <p>Welcome to Chicken Republic, home of the iconic Refuel Meal and the tastiest, spiciest chicken in town!</p>
        <div className="heroBtns"><button className="primary" onClick={() => go("order")}>Order Online <ArrowRight size={18}/></button><button className="secondary" onClick={() => go("reservations")}>Book a Table <CalendarDays size={18}/></button></div>
        <a className="callHero" href="tel:09088808329"><Phone size={17}/> 0908 880 8329</a>
      </div>
    </section>
    <section className="section">
      <div className="sectionHead"><div><span className="eyebrow">WHY CHICKEN REPUBLIC</span><h2>Made for every kind of appetite.</h2></div><button className="textBtn" onClick={() => go("menu")}>Explore menu <ArrowRight size={17}/></button></div>
      <div className="featureGrid">
        {[
          [<Utensils/>, "Dine-in & takeaway", "Enjoy table service, takeaway, drive-through, or delivery."],
          [<Truck/>, "Delivery", "Choose delivery or no-contact delivery when you order online."],
          [<Accessibility/>, "Accessible", "Wheelchair-accessible entrance, seating, toilet, and car park."],
          [<Star/>, "Family friendly", "Good for kids, birthdays, groups, students, and solo dining."]
        ].map(([icon,t,d]) => <div className="feature" key={t}><div className="featureIcon">{icon}</div><h3>{t}</h3><p>{d}</p></div>)}
      </div>
    </section>
    <section className="section tinted">
      <div className="sectionHead"><div><span className="eyebrow">POPULAR PICKS</span><h2>A taste of what's on the table.</h2></div></div>
      <div className="foodGrid">{menuItems.slice(0,4).map(item => <FoodCard item={item} key={item.id} addToCart={addToCart}/>)}</div>
    </section>
    <section className="section">
      <div className="reviewsHead"><span className="eyebrow">CUSTOMER REVIEWS</span><h2>What guests are saying.</h2></div>
      <div className="reviewGrid">{reviews.map(([name,text]) => <article className="review" key={name}><div className="stars">★★★★★</div><p>“{text}”</p><strong>{name}</strong></article>)}</div>
    </section>
  </div>;
}

function MenuPage({filtered,categories,category,setCategory,addToCart}) {
  return <section className="section pageTop"><div className="pageIntro"><span className="eyebrow">OUR MENU</span><h1>Something delicious for everyone.</h1><p>Prices are intentionally left editable until the restaurant supplies the current menu pricing.</p></div><div className="filters">{categories.map(c => <button className={category===c?"selected":""} key={c} onClick={()=>setCategory(c)}>{c}</button>)}</div><div className="foodGrid">{filtered.map(item=><FoodCard item={item} key={item.id} addToCart={addToCart}/>)}</div></section>;
}

function FoodCard({item,addToCart}) {
  return <article className="foodCard"><div className="foodImage"><img src={item.image} alt={item.name}/><span>{item.category}</span></div><div className="foodInfo"><h3>{item.name}</h3><p>{item.description}</p><div className="foodBottom"><strong className="price">Price TBC</strong><button className="smallAdd" onClick={()=>addToCart(item)}><Plus size={16}/> Add</button></div></div></article>;
}

function OrderPage({cart,total,changeQty,go,orderSent,setOrderSent}) {
  if(orderSent) return <section className="section pageTop center"><div className="success"><div className="successIcon"><Check/></div><span className="eyebrow">ORDER RECEIVED</span><h1>Thanks for your order.</h1><p>Your order form has been submitted in demo mode. Connect Paystack or Flutterwave and your restaurant backend before accepting live payments.</p><button className="primary" onClick={()=>{setOrderSent(false);go("menu")}}>Back to Menu</button></div></section>;
  const itemCount = cart.reduce((s,x)=>s+x.qty,0);
  return <section className="section pageTop"><div className="pageIntro"><span className="eyebrow">ORDER ONLINE</span><h1>Build your order.</h1><p>Choose your meals, review your cart, then complete your customer and delivery details.</p></div><div className="orderLayout"><div className="orderBox"><h2>Your cart</h2>{!cart.length?<div className="empty"><ShoppingBag size={42}/><h3>Your cart is empty</h3><p>Add something delicious from the menu.</p><button className="primary" onClick={()=>go("menu")}>Browse Menu</button></div>:cart.map(x=><div className="cartLine" key={x.id}><img src={x.image} alt=""/><div><h3>{x.name}</h3><span>Price TBC</span></div><div className="qty"><button onClick={()=>changeQty(x.id,-1)}><Minus size={15}/></button><b>{x.qty}</b><button onClick={()=>changeQty(x.id,1)}><Plus size={15}/></button></div></div>)}</div><div className="orderBox"><h2>Checkout</h2><form onSubmit={e=>{e.preventDefault();setOrderSent(true)}}><label>Name<input required placeholder="Your full name"/></label><label>Phone<input required type="tel" placeholder="0908 880 8329"/></label><label>Email<input type="email" placeholder="you@example.com"/></label><label>Fulfillment<select><option>Delivery</option><option>Pickup / Takeaway</option><option>Dine-in</option></select></label><label>Delivery address<textarea placeholder="Enter your delivery address"/></label><div className="checkoutSummary"><span>{itemCount} item(s)</span><strong>Total: Price TBC</strong></div><button className="primary wide" disabled={!cart.length}><CreditCard size={18}/> Continue to Payment</button><small>Demo checkout: connect Paystack or Flutterwave credentials and a secure backend before going live.</small></form></div></div></section>;
}

function Reservations({sent,setSent}) {
  if(sent) return <section className="section pageTop center"><div className="success"><div className="successIcon"><Check/></div><span className="eyebrow">REQUEST RECEIVED</span><h1>Reservation request sent.</h1><p>This demo confirms receipt of the form only. A live reservation backend should confirm availability before confirming a table.</p><button className="primary" onClick={()=>setSent(false)}>Make Another Request</button></div></section>;
  return <section className="section pageTop"><div className="pageIntro"><span className="eyebrow">RESERVATIONS</span><h1>Save a table for your next visit.</h1><p>Lunch reservations are recommended. Tell us when you're coming and we'll collect your request.</p></div><form className="reservationForm" onSubmit={e=>{e.preventDefault();setSent(true)}}><label>Name<input required placeholder="Full name"/></label><label>Phone<input required type="tel" placeholder="Phone number"/></label><label>Email<input type="email" placeholder="Email address"/></label><label>Date<input required type="date"/></label><label>Time<input required type="time"/></label><label>Guests<select defaultValue="2">{[1,2,3,4,5,6,7,8,9,10].map(n=><option key={n}>{n} {n===1?"guest":"guests"}</option>)}</select></label><label className="full">Special request<textarea placeholder="Birthday, seating preference, accessibility needs, or anything else..."/></label><button className="primary full" type="submit">Book a Table <CalendarDays size={18}/></button></form></section>;
}

function Gallery() {
  const [filter,setFilter]=useState("All");
  const items=filter==="All"?gallery:gallery.filter(x=>x.label===filter);
  return <section className="section pageTop"><div className="pageIntro"><span className="eyebrow">GALLERY</span><h1>Inside Chicken Republic.</h1><p>Browse a selection of food, menu, and restaurant images.</p></div><div className="filters">{["All","Menu","Food & Drink","Vibe"].map(x=><button className={filter===x?"selected":""} key={x} onClick={()=>setFilter(x)}>{x}</button>)}</div><div className="galleryGrid">{items.map((x,i)=><img src={x.src} alt={`Chicken Republic ${x.label} gallery ${i+1}`} key={x.src+i}/>)}</div></section>;
}

function Contact({go}) {
  return <section className="section pageTop"><div className="pageIntro"><span className="eyebrow">CONTACT</span><h1>Come find us in Wurukum.</h1><p>Call us, get directions, or choose an action below.</p></div><div className="contactGrid"><div className="contactCard"><MapPin/><h2>Visit us</h2><p>PGFP+W25, 10-4 Old Otukpo Rd, Wurukum, Makurdi 970101, Benue, Nigeria</p><a className="secondary dark" href="https://www.google.com/maps/search/?api=1&query=PGFP%2BW25%2C%2010-4%20Old%20Otukpo%20Rd%2C%20Wurukum%2C%20Makurdi%20970101%2C%20Benue" target="_blank" rel="noreferrer">Get Directions <ExternalLink size={16}/></a></div><div className="contactCard"><Phone/><h2>Call us</h2><p>0908 880 8329</p><a className="primary" href="tel:09088808329">Call Now <Phone size={17}/></a></div><div className="contactCard"><Clock3/><h2>Services</h2><p>Delivery · Drive-through · Takeaway · Dine-in · Catering · Table service</p><button className="primary" onClick={()=>go("reservations")}>Book a Table <CalendarDays size={17}/></button></div></div><div className="infoStrip"><b>Accessibility</b><span>Wheelchair-accessible car park</span><span>Wheelchair-accessible entrance</span><span>Wheelchair-accessible seating</span><span>Wheelchair-accessible toilet</span></div><div className="mapPlaceholder"><MapPin size={35}/><h3>Wurukum, Makurdi</h3><p>Use the Get Directions button above for navigation.</p></div></section>;
}

function CartDrawer({cart,total,changeQty,close,go}) {
  return <div className="overlay" onClick={close}><aside className="drawer" onClick={e=>e.stopPropagation()}><div className="drawerHead"><h2>Your order</h2><button onClick={close}><X/></button></div>{!cart.length?<div className="empty"><ShoppingBag/><p>Your cart is empty.</p></div>:<>{cart.map(x=><div className="drawerLine" key={x.id}><img src={x.image} alt=""/><div><b>{x.name}</b><small>Price TBC</small><div className="qty"><button onClick={()=>changeQty(x.id,-1)}><Minus size={14}/></button><b>{x.qty}</b><button onClick={()=>changeQty(x.id,1)}><Plus size={14}/></button></div></div></div>)}<div className="drawerTotal"><span>Total</span><b>Price TBC</b></div><button className="primary wide" onClick={()=>{close();go("order")}}>Checkout <ArrowRight size={17}/></button></>}</aside></div>;
}

createRoot(document.getElementById("root")).render(<App />);
