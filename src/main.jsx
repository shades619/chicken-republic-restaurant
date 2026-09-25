import { supabase } from "./lib/supabaseClient";
import Paystack from "@paystack/inline-js";
import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Accessibility, ArrowRight, CalendarDays, Check, ChevronDown, Clock3,
  CreditCard, ExternalLink, MapPin, Menu as MenuIcon, Minus, Phone,
  Plus, ShoppingBag, Star, Truck, Utensils, X
} from "lucide-react";
import "./styles.css";

const menuItems = [
  {
    id: 1,
    name: "Chicken Pie",
    image: "https://lh3.googleusercontent.com/grass-cs/ACvplmNum4WTgagyX4JLYdwxPQkKSJODjAY11T8C6ZGdQXiWXhUksKWFWiHixmfgC_F-TTNweM81euBESvb15peh6zHZn45t-a3p19vpAEJ_iMPyT4x9lWCM8LqzqGN_LVm3OOS99JswUg=w155-h202-p-k-no",
    category: "Pastries",
    description: "A savory chicken-filled pastry.",
    price: 2500
  },
  {
    id: 2,
    name: "Pasta with Meat Sauce",
    image: "https://lh3.googleusercontent.com/grass-cs/ACvplmOdrWsHse4W-kvTlR0MJqAr5QWyrmANhu_pEYI1zCKODQXqyijZqBOAMbnW08P7l62WvZqbSsWHRaRIklQmutU96WnSaH0Sjan_7dTUvbC0UndEbOMihjFrkafPYW14S98qoC0O=w155-h202-p-k-no",
    category: "Pasta",
    description: "Pasta served with rich meat sauce.",
    price: 4000
  },
  {
    id: 3,
    name: "Meat Pie and Ice Cream",
    image: "https://lh3.googleusercontent.com/grass-cs/ACvplmM4CBcu7XgE7ioW5wXxqScrC6uOnHjIDhWn9B4FrRc8Szzvzjm58sIaLPhwtaDE3YP71mUkrWD8MKwnpFP-BaK5FPW2C4UPe22uvapOl_7A3LlFvUTYC8zISVLJ0oXNIO9Wz8ld=w155-h202-p-k-no",
    category: "Dessert",
    description: "A savory meat pie paired with ice cream.",
    price: 3500
  },
  {
    id: 4,
    name: "Fried Rice and Chicken",
    image: "https://lh3.googleusercontent.com/grass-cs/ACvplmNO2loRJIQ6_2o4bKUIYEoS_SwaL-5ncoaW2kljNmWG53hnZX-XpXrtLBeg4K-G6SpCa4cTG8NVcxYTNBQ5aKN9-i_azZXLMeL1Nuq2KLOD43ypF8uyhwz6X5syfrpOHY6DwZbx=w155-h202-k-no",
    category: "Rice",
    description: "Flavorful fried rice served with chicken.",
    price: 5000
  },
  {
    id: 5,
    name: "Pasta with Chicken",
    image: "https://lh3.googleusercontent.com/grass-cs/ACvplmM-4GgIdHdG1Tuyibqabf76B0cqXTsMmM5l2a2QfOdiqpl7DSR-y0eTWHBL6vcIf604Qfcp2lmmZtad7ALg7o-sRlZftxNbGF-JhF3nXWRB48hSFc839TC5rkSY6o_HKJSkggY=w155-h202-p-k-no",
    category: "Pasta",
    description: "Comforting pasta paired with chicken.",
    price: 4500
  },
  {
    id: 6,
    name: "Full Chicken Spiced",
    image: "https://lh3.googleusercontent.com/grass-cs/ACvplmO0OKvmcxUPkTB2Bi3K6e3pLHUsTvF3RO-bpbAZNRt5zIKM1InENqmRhv5k0caLLwdBZcq1OeYep4KBsIuI7LzZe0K2SHOOGGsV7WZS_n497aTZ-I64tUeq1C9_b8sOBuDWXCgMOg=w155-h202-p-k-no",
    category: "Chicken",
    description: "Whole chicken prepared with a flavorful spice blend.",
    price: 12000
  },
  {
    id: 7,
    name: "White Rice and Sauce with Vegetables",
    image: "https://lh3.googleusercontent.com/grass-cs/ACvplmM3ZisHBimk8NyRtJkYX2s9_LMDBpceSFpXl-F1Lrj86yB29N5vSqgO7Y7M2H_uvx683WK7urXS1-zrNpVof7KgxsMX9xFIkYV1pKNRq3thRja2RznXyQvjgPaymgFsqiue-2oQ=w172-h224-p-k-no",
    category: "Rice",
    description: "White rice, sauce, and vegetables.",
    price: 3500
  }
];

const gallery = [
  { src: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlPcASCmLF--UizLp8bs71HDS9ucs3SRwniwxC5RFZgHD-OYtOG_m7qSoDD4b279GyqcgFMeYzROTkvdthKVDYfkBWvXhJRv9aIOkgHRLYo-0Hm9CHpYgCIusjGrYCqpX1_aHOW=w397-h298-k-no", label: "All" },
  { src: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlYclwwG6JtCa3lbFc2S8R6X7xulAZYGdOfpLGJ1B3xmcXugQZ49YVNkara3ONN-qeJgGPW_zN1wM6Zu3hQRUWpSVRxZ6dNTertKG_LOzS6cAjDaE8kONNWssqrCkuHSxJ5Gtns=w397-h298-k-no", label: "Menu" },
  { src: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWndQK1AkGXfFtc3-YX-5QXhMSnY98NEPs2Q_owV0-PiNmJxjt6q-mSU52OqNFIc6-B-AI1v87HkmHm85n8vmUeNj6Yvzk0mX2oDcUUHU2aTinSa2wWBOOVMQANB6szAY-tV907wKKUBQ0U=w224-h298-k-no", label: "Food & Drink" },
  
  
];

const reviews = [
  ["Mide Tomori", "A really nice place, very decent location for a date, corporate appointments or celebrations."],
  ["Ali Malik", "Good to have local KFC/McDonalds, better place for hygienic food. Quality is okay. Wait time is high. No water in taps."],
  ["Samson Johnson", "Its now opened and serving customers. The waiters are still fresh compared to the other outlets. But they will catch up."]
];

function App() {
  const [page, setPage] = useState(() => {
  return localStorage.getItem("chickenRepublicPage") || "home";
});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");
  const [reservationSent, setReservationSent] = useState(() => {
  return localStorage.getItem("chickenRepublicReservationSent") === "true";
});
  const [orderSent, setOrderSent] = useState(false);
  const [paymentReference, setPaymentReference] = useState("");

  const categories = ["All", ...new Set(menuItems.map((x) => x.category))];
  const filtered = useMemo(() => category === "All" ? menuItems : menuItems.filter(x => x.category === category), [category]);

 const go = (p) => {
  setPage(p);

  localStorage.setItem("chickenRepublicPage", p);

  setMobileOpen(false);

  window.scrollTo(0, 0);
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
          {["home","menu","order","track","reservations","gallery","contact","admin","adminReservations"].map(p =>
            <button key={p} className={page === p ? "active" : ""} onClick={() => go(p)}>
              {
  p === "home"
  ? "Home"
  : p === "order"
  ? "Order Online"
  : p === "track"
  ? "Track Order"
  : p === "admin"
  ? "Admin"
  : p === "adminReservations"
  ? "Admin Reservations"
  : p[0].toUpperCase() + p.slice(1)
}
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
        {page === "order" && <OrderPage cart={cart} total={total} changeQty={changeQty} go={go} orderSent={orderSent} setOrderSent={setOrderSent} setCart={setCart}/>}
        {page === "reservations" && <Reservations sent={reservationSent} setSent={setReservationSent}/>}
        {page === "gallery" && <Gallery/>}
        {page === "contact" && <Contact go={go}/>}
        {page === "admin" && <AdminOrders />}
        {page === "adminReservations" && <AdminReservations />}


        {page === "track" && <TrackOrder go={go} />}
      </main>

      <footer>
        <div className="footerGrid">
          <div><div className="footerBrand">Chicken Republic</div><p>Good food, good times, right here in Wurukum, Makurdi.</p></div>
          <div><h4>Quick Links</h4>{["home","menu","order","reservations","gallery","contact","admin"].map(p => <button key={p} onClick={() => go(p)}>{p === "order" ? "Order Online" : p[0].toUpperCase()+p.slice(1)}</button>)}</div>
          <div><h4>Contact</h4><a href="tel:09088808329">0908 880 8329</a><p>PGFP+W25, 10-4 Old Otukpo Rd, Wurukum, Makurdi 970101, Benue</p></div>
        </div>
        <div className="copyright">© 2026 Chicken Republic. All rights reserved.</div>
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
  return <article className="foodCard"><div className="foodImage"><img src={item.image} alt={item.name}/><span>{item.category}</span></div><div className="foodInfo"><h3>{item.name}</h3><p>{item.description}</p><div className="foodBottom"><strong className="price">₦{item.price.toLocaleString()}</strong><button className="smallAdd" onClick={()=>addToCart(item)}><Plus size={16}/> Add</button></div></div></article>;
}

function OrderPage({cart,total,changeQty,go,orderSent,setOrderSent,setCart}) {
  React.useEffect(() => {
    if (!orderSent) return;

    const checkOrders = () => {
      const savedOrders = JSON.parse(
        localStorage.getItem("chickenRepublicOrders") || "[]"
      );

      // Force OrderPage to re-render when the order changes
      setOrderSent((current) => current);
    };

    const interval = setInterval(checkOrders, 2000);

    window.addEventListener("storage", checkOrders);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", checkOrders);
    };
  }, [orderSent]);
  
  if (orderSent) {
  const savedOrders = JSON.parse(
    localStorage.getItem("chickenRepublicOrders") || "[]"
  );

  const latestOrder =
    savedOrders.length > 0
      ? savedOrders[savedOrders.length - 1]
      : null;

  const currentStatus = latestOrder?.orderStatus || "New";

  const statuses = [
    {
      name: "New",
      title: "Order Received",
      description: "Your order has been received successfully.",
    },
    {
      name: "Preparing",
      title: "Preparing Your Order",
      description: "Our kitchen is preparing your food.",
    },
    {
      name: "Ready",
      title: "Ready",
      description: "Your order is ready for pickup.",
    },
    {
      name: "Completed",
      title: "Completed",
      description: "Your order has been completed.",
    },
  ];

  const currentIndex = statuses.findIndex(
    (status) => status.name === currentStatus
  );

  return (
    <section className="section pageTop center">
      <div className="success trackingPage">

        <div className="successIcon">
          <Check />
        </div>

        <span className="eyebrow">ORDER TRACKING</span>

        <h1>Your order is on its way</h1>

        <p>
          Thank you for ordering from Chicken Republic.
          You can track the progress of your order below.
        </p>

        {latestOrder && (
          <div className="trackingOrderNumber">
            <span>ORDER NUMBER</span>
            <strong>{latestOrder.id}</strong>
          </div>
        )}

        <div className="trackingTimeline">

          {statuses.map((status, index) => {
            const isCompleted =
  currentStatus === "Completed" || index < currentIndex;

const isCurrent =
  index === currentIndex && currentStatus !== "Completed";

            return (
              <div
                className={`trackingStep ${
                  isCompleted ? "completed" : ""
                } ${isCurrent ? "current" : ""}`}
                key={status.name}
              >

                <div className="trackingIndicator">
                  {(isCompleted || index < currentIndex) ? (
  <Check size={18} />
) : (
  <span>{index + 1}</span>
)}s
                </div>

                <div className="trackingContent">

                  <strong>{status.title}</strong>

                  <span>{status.description}</span>

                </div>

              </div>
            );
          })}

        </div>

        <div className="orderConfirmation">

          <h3>Order Summary</h3>

          {cart.map((item) => (
            <div
              className="confirmationLine"
              key={item.id}
            >
              <span>
                {item.name} × {item.qty}

              </span>

              <strong>
                ₦
                {(
                  Number(item.price) * item.qty
                ).toLocaleString()}
              </strong>
            </div>
          ))}

          <div className="confirmationTotal">
  <span>Total Paid:</span>
  <strong>
    ₦
    {Number(
      latestOrder.total
    ).toLocaleString()}
  </strong>
</div>

        </div>

        <div className="trackingActions">

          <button
  className="secondary"
  onClick={() => {
    setCart([]);
    setOrderSent(false);
    go("track");
  }}
>
  Refresh Order Status
</button>

          <button
            className="primary"
            onClick={() => {
              setOrderSent(false);
              go("menu");
            }}
          >
            Back to Menu
          </button>

        </div>

      </div>
    </section>
  );
}

const checkoutSubmitRef = React.useRef(false);
  const itemCount = cart.reduce((s,x)=>s+x.qty,0);
  return <section className="section pageTop"><div className="pageIntro"><span className="eyebrow">ORDER ONLINE</span><h1>Build your order.</h1><p>Choose your meals, review your cart, then complete your customer and delivery details.</p></div><div className="orderLayout"><div className="orderBox"><h2>Your cart</h2>{!cart.length?<div className="empty"><ShoppingBag size={42}/><h3>Your cart is empty</h3><p>Add something delicious from the menu.</p><button className="primary" onClick={()=>go("menu")}>Browse Menu</button></div>:cart.map(x=><div className="cartLine" key={x.id}><img src={x.image} alt=""/><div><h3>{x.name}</h3><span>₦{x.price.toLocaleString()}</span></div><div className="qty"><button onClick={()=>changeQty(x.id,-1)}><Minus size={15}/></button><b>{x.qty}</b><button onClick={()=>changeQty(x.id,1)}><Plus size={15}/></button></div></div>)}</div><div className="orderBox"><h2>Checkout</h2><form onSubmit={(e) => e.preventDefault()}>
  <label>
    Name
    <input
      name="name"
      required
      placeholder="Your full name"
    />
  </label>

  <label>
    Phone
    <input
      name="phone"
      required
      type="tel"
      placeholder="0908 880 8329"
    />
  </label>

  <label>
    Email
    <input
      name="email"
      type="email"
      placeholder="you@example.com"
    />
  </label>

  <label>
    Fulfillment
    <select name="fulfillment">
      <option>Delivery</option>
      <option>Pickup / Takeaway</option>
      <option>Dine-in</option>
    </select>
  </label>

  <label>
    Delivery address
    <textarea
      name="deliveryAddress"
      placeholder="Enter your delivery address"
    />
  </label>

  <div className="checkoutSummary">
    <span>{itemCount} item(s)</span>
    <strong>Total: ₦{total.toLocaleString()}</strong>
  </div>

  <button
    type="button"
    className="primary wide"
    disabled={!cart.length}
    onClick={async (e) => {
      const form = e.currentTarget.form;

      const customerName = form.name.value;
      const customerPhone = form.phone.value;
      const customerEmail = form.email.value;

      const paystack = new Paystack();

      await paystack.checkout({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        email: customerEmail,
        amount: total * 100,
        currency: "NGN",

        onSuccess: async (transaction) => {
          console.log("Payment successful:", transaction);

          const orderId = `CR-${Date.now()}`;

          const newOrder = {
            id: orderId,
            customer_name: customerName,
            customer_phone: customerPhone,
            customer_email: customerEmail,
            total: Number(total),
            payment_reference: transaction.reference || "",
            payment_status: "Paid",
            order_status: "New",
          };

          const { error: orderError } = await supabase
            .from("orders")
            .insert([newOrder]);

          if (orderError) {
            console.error("Order save failed:", orderError);
            alert(
              "Payment was successful, but we could not save your order. Please contact the restaurant."
            );
            return;
          }

          const orderItems = cart.map((item) => ({
            order_id: orderId,
            item_id: item.id,
            name: item.name,
            price: Number(item.price),
            qty: item.qty,
          }));

          const { error: itemsError } = await supabase
            .from("order_items")
            .insert(orderItems);

          if (itemsError) {
            console.error("Order items save failed:", itemsError);
            alert(
              "Payment was successful, but we could not save the order items. Please contact the restaurant."
            );
            return;
          }

          const newOrderForTracking = {
            id: orderId,
            items: cart.map((item) => ({
              id: item.id,
              name: item.name,
              price: Number(item.price),
              qty: item.qty,
            })),
            total: Number(total),
            paymentReference: transaction.reference || "",
            paymentStatus: "Paid",
            orderStatus: "New",
            customerName: customerName,
            customerPhone: customerPhone,
            customerEmail: customerEmail,
            createdAt: new Date().toISOString(),
          };

          const existingOrders = JSON.parse(
            localStorage.getItem("chickenRepublicOrders") || "[]"
          );

          localStorage.setItem(
            "chickenRepublicOrders",
            JSON.stringify([
              ...existingOrders,
              newOrderForTracking,
            ])
          );

          setCart([]);
          setOrderSent(false);
          go("track");
        },

        onCancel: () => {
          console.log("Payment cancelled");
        },
      });
    }}
  >
    <CreditCard size={18} />
    Continue to Payment
  </button>

  <small>
    <p>
      Secure payment powered by Paystack.
    </p>
  </small>
</form></div></div></section>;
}

function Reservations({ sent, setSent }) {
  const [reservation, setReservation] = useState(() => {
  const savedReservation = localStorage.getItem(
    "chickenRepublicLatestReservation"
  );

  return savedReservation
    ? JSON.parse(savedReservation)
    : null;
});
  const [reservationStatus, setReservationStatus] = useState(() => {
  const savedReservation = localStorage.getItem(
    "chickenRepublicLatestReservation"
  );

  if (!savedReservation) return "Pending";

  const parsed = JSON.parse(savedReservation);

  return parsed.status || "Pending";
});

 const submitReservation = async (e) => {
  e.preventDefault();
  const form = e.currentTarget;

const customerName = form.name.value;
const customerPhone = form.phone.value;
const customerEmail = form.email.value;

  const formData = new FormData(e.target);

  const newReservation = {
    id: `RES-${Date.now()}`,
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    date: formData.get("date"),
    time: formData.get("time"),
    guests: Number(formData.get("guests")),
    special_request: formData.get("specialRequest"),
    status: "Pending",
    created_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("reservations")
    .insert([newReservation]);

  if (error) {
    console.error("Reservation failed:", error);
    alert(
      "Sorry, your reservation could not be submitted. Please try again."
    );
    return;
  }

  // Only save locally after Supabase successfully accepts it
  localStorage.setItem(
    "chickenRepublicLatestReservation",
    JSON.stringify(newReservation)
  );

  setReservation(newReservation);
  setReservationStatus("Pending");
  setSent(true);

  localStorage.setItem(
    "chickenRepublicReservationSent",
    "true"
  );
}; 

  React.useEffect(() => {
  if (!reservation?.id || !reservation?.phone) return;

  const checkReservationStatus = async () => {
    const { data, error } = await supabase.rpc(
      "get_reservation_status",
      {
        reservation_id: reservation.id,
        reservation_phone: reservation.phone,
      }
    );

    if (error) {
      console.error("Could not check reservation status:", error);
      return;
    }

    if (data && data.length > 0) {
      setReservationStatus(data[0].status);

      setReservation((current) => {
  const updated = {
    ...current,
    status: data[0].status,
  };

  localStorage.setItem(
    "chickenRepublicLatestReservation",
    JSON.stringify(updated)
  );

  return updated;
});
    }
  };

  checkReservationStatus();

  const interval = setInterval(
    checkReservationStatus,
    3000
  );

  return () => {
    clearInterval(interval);
  };
}, [reservation?.id, reservation?.phone]);
  if (sent) {
    return (
      <section className="section pageTop center">
        <div className="success">
          <div className="successIcon">
            <Check />
          </div>

          <span className="eyebrow">
            RESERVATION REQUEST RECEIVED
          </span>

          <h1>Reservation request sent.</h1>

          <p>
            Your reservation request has been received.
            The restaurant will review the request and
            confirm availability.
          </p>

          {reservation && (
            <div className="orderConfirmation">
              <h3>Reservation Details</h3>

              <div className="confirmationLine">
  <span>Reservation Number: {reservation.id}</span>
</div>

<div className="confirmationLine">
  <span>Date: {reservation.date}</span>
</div>

<div className="confirmationLine">
  <span>Time: {reservation.time}</span>
</div>

<div className="confirmationLine">
  <span>Guests: {reservation.guests}</span>
</div>

<div className="confirmationLine">
  <span>Status: {reservationStatus}</span>
</div>
            </div>
          )}

          <button
            className="primary"
            onClick={() => {
  setReservation(null);
  setReservationStatus("Pending");
  setSent(false);
  localStorage.removeItem("chickenRepublicReservationSent");
}}
          >
            Make Another Request
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="section pageTop">
      <div className="pageIntro">
        <span className="eyebrow">RESERVATIONS</span>

        <h1>Save a table for your next visit.</h1>

        <p>
          Tell us when you're coming and we'll collect
          your reservation request.
        </p>
      </div>

      <form
        className="reservationForm"
        onSubmit={submitReservation}
      >
        <label>
          Name
          <input
            name="name"
            required
            placeholder="Full name"
          />
        </label>

        <label>
          Phone
          <input
            name="phone"
            required
            type="tel"
            placeholder="Phone number"
          />
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            placeholder="Email address"
          />
        </label>

        <label>
          Date
          <input
            name="date"
            required
            type="date"
          />
        </label>

        <label>
          Time
          <input
            name="time"
            required
            type="time"
          />
        </label>

        <label>
          Guests
          <select
            name="guests"
            defaultValue="2"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
              (n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "guest" : "guests"}
                </option>
              )
            )}
          </select>
        </label>

        <label className="full">
          Special request
          <textarea
            name="specialRequest"
            placeholder="Birthday, seating preference, accessibility needs, or anything else..."
          />
        </label>

        <button
          className="primary full"
          type="submit"
        >
          Book a Table
          <CalendarDays size={18} />
        </button>
      </form>
    </section>
  );
}function Gallery() {
  const [filter,setFilter]=useState("All");
  const items=filter==="All"?gallery:gallery.filter(x=>x.label===filter);
  return <section className="section pageTop"><div className="pageIntro"><span className="eyebrow">GALLERY</span><h1>Inside Chicken Republic.</h1><p>Browse a selection of food, menu, and restaurant images.</p></div><div className="filters">{["All","Menu","Food & Drink","Vibe"].map(x=><button className={filter===x?"selected":""} key={x} onClick={()=>setFilter(x)}>{x}</button>)}</div><div className="galleryGrid">{items.map((x,i)=><img src={x.src} alt={`Chicken Republic ${x.label} gallery ${i+1}`} key={x.src+i}/>)}</div></section>;
}

function Contact({go}) {
  return <section className="section pageTop"><div className="pageIntro"><span className="eyebrow">CONTACT</span><h1>Come find us in Wurukum.</h1><p>Call us, get directions, or choose an action below.</p></div><div className="contactGrid"><div className="contactCard"><MapPin/><h2>Visit us</h2><p>PGFP+W25, 10-4 Old Otukpo Rd, Wurukum, Makurdi 970101, Benue, Nigeria</p><a className="secondary dark" href="https://www.google.com/maps/search/?api=1&query=PGFP%2BW25%2C%2010-4%20Old%20Otukpo%20Rd%2C%20Wurukum%2C%20Makurdi%20970101%2C%20Benue" target="_blank" rel="noreferrer">Get Directions <ExternalLink size={16}/></a></div><div className="contactCard"><Phone/><h2>Call us</h2><p>0908 880 8329</p><a className="primary" href="tel:09088808329">Call Now <Phone size={17}/></a></div><div className="contactCard"><Clock3/><h2>Services</h2><p>Delivery · Drive-through · Takeaway · Dine-in · Catering · Table service</p><button className="primary" onClick={()=>go("reservations")}>Book a Table <CalendarDays size={17}/></button></div></div><div className="infoStrip"><b>Accessibility</b><span>Wheelchair-accessible car park</span><span>Wheelchair-accessible entrance</span><span>Wheelchair-accessible seating</span><span>Wheelchair-accessible toilet</span></div><div className="mapPlaceholder"><MapPin size={35}/><h3>Wurukum, Makurdi</h3><p>Use the Get Directions button above for navigation.</p></div></section>;
}


  function CartDrawer({ cart, total, changeQty, close, go }) {
  return (
    <div className="overlay" onClick={close}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawerHead">
          <h2>Your order</h2>
          <button onClick={close}>
            <X />
          </button>
        </div>

        {!cart.length ? (
          <div className="empty">
            <ShoppingBag />
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            {cart.map((x) => (
              <div className="drawerLine" key={x.id}>
                <img src={x.image} alt={x.name} />

                <div>
                  <b>{x.name}</b>

                  <small>
                    ₦{Number(x.price || 0).toLocaleString()} × {x.qty}
                  </small>

                  <div className="qty">
                    <button onClick={() => changeQty(x.id, -1)}>
                      <Minus size={14} />
                    </button>

                    <b>{x.qty}</b>

                    <button onClick={() => changeQty(x.id, 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <strong>
                  ₦{(Number(x.price || 0) * x.qty).toLocaleString()}
                </strong>
              </div>
            ))}

            <div className="drawerTotal">
              <span>Total</span>
              <b>₦{Number(total || 0).toLocaleString()}</b>
            </div>

            <button
              className="primary wide"
              onClick={() => {
                close();
                go("order");
              }}
            >
              Checkout <ArrowRight size={17} />
            </button>
          </>
        )}
      </aside>
    </div>
  );
}

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [adminUser, setAdminUser] = useState(null);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminLoading, setAdminLoading] = useState(true);
  const [adminLoginError, setAdminLoginError] = useState("");

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
  const checkAdminSession = async () => {
    const { data } = await supabase.auth.getSession();

    setAdminUser(data.session?.user || null);
    setAdminLoading(false);
  };

  checkAdminSession();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      setAdminUser(session?.user || null);
    }
  );

  return () => {
    subscription.unsubscribe();
  };
}, []);

const handleAdminLogin = async (e) => {
  e.preventDefault();

  setAdminLoginError("");

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword,
    });

  if (error) {
    setAdminLoginError(
      "Invalid email or password."
    );
    return;
  }

  setAdminUser(data.user);
  setAdminPassword("");
};

const handleAdminLogout = async () => {
  await supabase.auth.signOut();
  setAdminUser(null);
};

  const loadOrders = async () => {
    try {
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

        console.log("SUPABASE ORDERS:", orderData);
console.log("SUPABASE ORDER ERROR:", orderError);

      if (orderError) {
        console.error("Orders loading failed:", orderError);
        return;
      }

      if (!orderData || orderData.length === 0) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const orderIds = orderData.map((order) => order.id);

      const { data: itemData, error: itemError } = await supabase
        .from("order_items")
        .select("*")
        .in("order_id", orderIds);

      if (itemError) {
        console.error("Order items loading failed:", itemError);
        return;
      }

      const combinedOrders = orderData.map((order) => ({
        id: order.id,

        items: (itemData || [])
          .filter((item) => item.order_id === order.id)
          .map((item) => ({
            id: item.item_id,
            name: item.name,
            price: Number(item.price || 0),
            qty: Number(item.qty || 0),
          })),

        total: Number(order.total || 0),

        paymentReference:
          order.payment_reference || "",

        paymentStatus:
          order.payment_status || "",

        orderStatus:
          order.order_status || "New",

        customerName:
          order.customer_name || "",

        customerPhone:
          order.customer_phone || "",

        customerEmail:
          order.customer_email || "",

        createdAt:
          order.created_at || "",
      }));

      setOrders(combinedOrders);
    } catch (error) {
      console.error("Unexpected error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
  if (!adminUser) return;

  loadOrders();

  const interval = setInterval(() => {
    loadOrders();
  }, 5000);

  return () => {
    clearInterval(interval);
  };
}, [adminUser]);

  const refreshOrders = () => {
    setLoading(true);
    loadOrders();
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    const { error } = await supabase
      .from("orders")
      .update({
        order_status: newStatus,
      })
      .eq("id", orderId);

    if (error) {
      console.error("Order status update failed:", error);

      alert(
        "Could not update the order status. Please try again."
      );

      return;
    }

    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              orderStatus: newStatus,
            }
          : order
      )
    );
  };

  const clearCompleted = async () => {
    const completedOrders = orders.filter(
      (order) => order.orderStatus === "Completed"
    );

    if (!completedOrders.length) {
      alert("There are no completed orders to clear.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${completedOrders.length} completed order(s)?`
    );

    if (!confirmed) {
      return;
    }

    const completedIds = completedOrders.map(
      (order) => order.id
    );

    const { error } = await supabase
      .from("orders")
      .delete()
      .in("id", completedIds);

    if (error) {
      console.error("Completed orders deletion failed:", error);

      alert(
        "Could not clear completed orders. Please try again."
      );

      return;
    }

    setOrders((currentOrders) =>
      currentOrders.filter(
        (order) => order.orderStatus !== "Completed"
      )
    );
  };

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const newOrders = orders.filter(
    (order) => order.orderStatus === "New"
  ).length;

  const preparingOrders = orders.filter(
    (order) => order.orderStatus === "Preparing"
  ).length;

  const readyOrders = orders.filter(
    (order) => order.orderStatus === "Ready"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.orderStatus === "Completed"
  ).length;

  const filteredOrders = orders
    .filter((order) => {
      if (filter === "All") return true;

      return order.orderStatus === filter;
    })
    .filter((order) => {
      const searchText = search
        .toLowerCase()
        .trim();

      if (!searchText) return true;

      const orderId =
        order.id?.toLowerCase() || "";

      const customerName =
        order.customerName?.toLowerCase() || "";

      const customerPhone =
        order.customerPhone?.toLowerCase() || "";

      const customerEmail =
        order.customerEmail?.toLowerCase() || "";

      const itemNames =
        order.items
          ?.map(
            (item) =>
              item.name?.toLowerCase() || ""
          )
          .join(" ") || "";

      return (
        orderId.includes(searchText) ||
        customerName.includes(searchText) ||
        customerPhone.includes(searchText) ||
        customerEmail.includes(searchText) ||
        itemNames.includes(searchText)
      );
    });

    if (adminLoading) {
  return (
    <section className="section pageTop center">
      <div className="success">
        <h2>Checking admin access...</h2>
      </div>
    </section>
  );
}

if (!adminUser) {
  return (
    <section className="section pageTop center">
      <div className="success trackingPage">

        <span className="eyebrow">
          RESTAURANT ADMIN
        </span>

        <h1>Admin Login</h1>

        <p>
          Sign in to manage customer orders.
        </p>

        <form
          onSubmit={handleAdminLogin}
          className="adminLoginForm"
        >

          <input
            type="email"
            placeholder="Admin email"
            value={adminEmail}
            onChange={(e) =>
              setAdminEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={adminPassword}
            onChange={(e) =>
              setAdminPassword(e.target.value)
            }
            required
          />

          {adminLoginError && (
            <p>
              {adminLoginError}
            </p>
          )}

          <button
            type="submit"
            className="primary"
          >
            Sign In
          </button>

        </form>

      </div>
    </section>
  );
}

  return (
    <section className="section pageTop">

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
  <button
    type="button"
    className="secondary"
    onClick={handleAdminLogout}
  >
    Logout
  </button>
</div>

      <div className="pageIntro">
        <span className="eyebrow">
          RESTAURANT ADMIN
        </span>

        <h1>Order Dashboard</h1>

        <p>
          Manage customer orders, payments, and order status.
        </p>
      </div>

      {/* DASHBOARD STATISTICS */}

      <div className="adminStats">

        <div className="adminStat">
          <span>Total Orders</span>
          <strong>{orders.length}</strong>
        </div>

        <div className="adminStat">
          <span>Total Revenue</span>

          <strong>
            ₦{totalRevenue.toLocaleString()}
          </strong>
        </div>

        <div className="adminStat">
          <span>New Orders</span>
          <strong>{newOrders}</strong>
        </div>

        <div className="adminStat">
          <span>Preparing</span>
          <strong>{preparingOrders}</strong>
        </div>

        <div className="adminStat">
          <span>Ready</span>
          <strong>{readyOrders}</strong>
        </div>

        <div className="adminStat">
          <span>Completed</span>
          <strong>{completedOrders}</strong>
        </div>

      </div>

      {/* ADMIN ACTIONS */}

      <div className="adminActions">

        <button
          className="secondary"
          onClick={refreshOrders}
        >
          Refresh Orders
        </button>

        <button
          className="secondary"
          onClick={clearCompleted}
        >
          Clear Completed
        </button>

      </div>

      {/* SEARCH */}

      <div className="adminSearch">

        <input
          type="text"
          placeholder="Search by order ID, customer, phone, email, or food item..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* FILTERS */}

      <div className="adminFilters">

        {[
          "All",
          "New",
          "Preparing",
          "Ready",
          "Completed",
        ].map((status) => (

          <button
            key={status}
            className={
              filter === status
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter(status)
            }
          >
            {status}
          </button>

        ))}

      </div>

      {/* LOADING */}

      {loading ? (

        <div className="orderBox">

          <div className="empty">

            <ShoppingBag size={42} />

            <h3>Loading orders...</h3>

            <p>
              Getting the latest orders from Supabase.
            </p>

          </div>

        </div>

      ) : !filteredOrders.length ? (

        <div className="orderBox">

          <div className="empty">

            <ShoppingBag size={42} />

            <h3>No orders found</h3>

            <p>
              Try another search or filter.
            </p>

          </div>

        </div>

      ) : (

        <div className="adminOrders">

          {filteredOrders.map((order) => (

            <div
              className="adminOrder"
              key={order.id}
            >

              <div className="adminOrderHeader">

                <div>

                  <span className="eyebrow">
                    ORDER
                  </span>

                  <h2>{order.id}</h2>

                </div>

                <span className="orderStatus">
                  {order.orderStatus}
                </span>

              </div>

              <div className="adminOrderItems">

                {order.items.map((item) => (

                  <div
                    className="adminOrderItem"
                    key={item.id}
                  >

                    <span>
                      {item.name} × {item.qty}:
                    </span>

                    <strong>
                      ₦
                      {(
                        Number(item.price) *
                        item.qty
                      ).toLocaleString()}
                    </strong>

                  </div>

                ))}

              </div>

              <div className="adminOrderTotal">

                <span>Total Paid:</span>

                <strong>
                  ₦
                  {Number(
                    order.total
                  ).toLocaleString()}
                </strong>

              </div>

              <div className="adminOrderDetails">

                <span>
                  Customer:{" "}
                  {order.customerName || "N/A"}
                </span>

                <span>
                  Phone:{" "}
                  {order.customerPhone || "N/A"}
                </span>

                <span>
                  Email:{" "}
                  {order.customerEmail || "N/A"}
                </span>

                <span>
                  Payment:{" "}
                  {order.paymentStatus || "N/A"}
                </span>

                <span>
                  Reference:{" "}
                  {order.paymentReference || "N/A"}
                </span>

                <span>
                  {order.createdAt
                    ? new Date(
                        order.createdAt
                      ).toLocaleString()
                    : "N/A"}
                </span>

              </div>

              <div className="adminStatusButtons">

                <button
                  className={
                    order.orderStatus === "New"
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    updateOrderStatus(
                      order.id,
                      "New"
                    )
                  }
                >
                  New
                </button>

                <button
                  className={
                    order.orderStatus === "Preparing"
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    updateOrderStatus(
                      order.id,
                      "Preparing"
                    )
                  }
                >
                  Preparing
                </button>

                <button
                  className={
                    order.orderStatus === "Ready"
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    updateOrderStatus(
                      order.id,
                      "Ready"
                    )
                  }
                >
                  Ready
                </button>

                <button
                  className={
                    order.orderStatus === "Completed"
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    updateOrderStatus(
                      order.id,
                      "Completed"
                    )
                  }
                >
                  Completed
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

function AdminReservations() {
  const [session, setSession] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [reservations, setReservations] = useState([]);
  const [loadingReservations, setLoadingReservations] = useState(false);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  React.useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (mounted) {
        setSession(session);
        setCheckingAuth(false);
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setCheckingAuth(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const loadReservations = async () => {
    setLoadingReservations(true);

    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load reservations:", error);
      alert("Could not load reservations.");
      setLoadingReservations(false);
      return;
    }

    setReservations(data || []);
    setLoadingReservations(false);
  };

  React.useEffect(() => {
    if (session) {
      loadReservations();
    }
  }, [session]);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoggingIn(true);
    setLoginError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Admin login failed:", error);
      setLoginError("Invalid email or password.");
    }

    setLoggingIn(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setReservations([]);
  };

  const updateReservationStatus = async (reservationId, newStatus) => {
    const { error } = await supabase
      .from("reservations")
      .update({
        status: newStatus,
      })
      .eq("id", reservationId);

    if (error) {
      console.error("Failed to update reservation:", error);
      alert("Could not update reservation status.");
      return;
    }

    setReservations((currentReservations) =>
      currentReservations.map((reservation) =>
        reservation.id === reservationId
          ? { ...reservation, status: newStatus }
          : reservation
      )
    );
  };

  if (checkingAuth) {
    return (
      <section className="section pageTop">
        <div className="orderBox">
          <h3>Checking admin access...</h3>
          <p>Please wait.</p>
        </div>
      </section>
    );
  }

  if (!session) {
    return (
      <section className="section pageTop">
        <div className="pageIntro">
          <span className="eyebrow">RESTAURANT ADMIN</span>

          <h1>Admin Login</h1>

          <p>
            Sign in to manage customer reservations.
          </p>
        </div>

        <form className="checkoutForm" onSubmit={handleLogin}>
          <label>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin email"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
            />
          </label>

          {loginError && (
            <p style={{ color: "crimson" }}>
              {loginError}
            </p>
          )}

          <button
            className="primary"
            type="submit"
            disabled={loggingIn}
          >
            {loggingIn ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </section>
    );
  }

  const filteredReservations = reservations.filter((reservation) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      reservation.id?.toLowerCase().includes(searchText) ||
      reservation.name?.toLowerCase().includes(searchText) ||
      reservation.phone?.toLowerCase().includes(searchText);

    const matchesFilter =
      filter === "All" || reservation.status === filter;

    return matchesSearch && matchesFilter;
  });

  const pendingReservations = reservations.filter(
    (reservation) => reservation.status === "Pending"
  ).length;

  const confirmedReservations = reservations.filter(
    (reservation) => reservation.status === "Confirmed"
  ).length;

  const declinedReservations = reservations.filter(
    (reservation) => reservation.status === "Declined"
  ).length;

  return (
    <section className="section pageTop">

      <div className="pageIntro">
        <span className="eyebrow">RESTAURANT ADMIN</span>

        <h1>Reservation Dashboard</h1>

        <p>
          Manage customer reservation requests and table availability.
        </p>

        <button
          className="secondary"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>

      <div className="adminStats">

        <div className="adminStat">
          <span>Total Reservations</span>
          <strong>{reservations.length}</strong>
        </div>

        <div className="adminStat">
          <span>Pending</span>
          <strong>{pendingReservations}</strong>
        </div>

        <div className="adminStat">
          <span>Confirmed</span>
          <strong>{confirmedReservations}</strong>
        </div>

        <div className="adminStat">
          <span>Declined</span>
          <strong>{declinedReservations}</strong>
        </div>

      </div>

      <div className="adminActions">

        <input
          type="text"
          placeholder="Search reservation..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Declined">Declined</option>
        </select>

        <button
          className="secondary"
          onClick={loadReservations}
          disabled={loadingReservations}
        >
          {loadingReservations
            ? "Refreshing..."
            : "Refresh Reservations"}
        </button>

      </div>

      <div className="adminOrders">

        {filteredReservations.length === 0 ? (

          <div className="orderBox">
            <h3>No reservations found</h3>
            <p>
              New reservation requests will appear here.
            </p>
          </div>

        ) : (

          filteredReservations.map((reservation) => (

            <div
              className="adminOrder"
              key={reservation.id}
            >

              <div className="adminOrderHeader">

                <div>
                  <strong>{reservation.id}</strong>

                  <span>
                    {reservation.created_at
                      ? new Date(
                          reservation.created_at
                        ).toLocaleString()
                      : ""}
                  </span>
                </div>

                <span className="orderStatus">
                  {reservation.status}
                </span>

              </div>

              <div className="adminOrderDetails">

                <p>
                  <strong>Name:</strong>{" "}
                  {reservation.name}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {reservation.phone}
                </p>

                {reservation.email && (
                  <p>
                    <strong>Email:</strong>{" "}
                    {reservation.email}
                  </p>
                )}

                <p>
                  <strong>Date:</strong>{" "}
                  {reservation.date}
                </p>

                <p>
                  <strong>Time:</strong>{" "}
                  {reservation.time}
                </p>

                <p>
                  <strong>Guests:</strong>{" "}
                  {reservation.guests}
                </p>

                {reservation.special_request && (
                  <p>
                    <strong>Special Request:</strong>{" "}
                    {reservation.special_request}
                  </p>
                )}

              </div>

              <div className="adminStatusButtons">

                <button
                  className="secondary"
                  onClick={() =>
                    updateReservationStatus(
                      reservation.id,
                      "Pending"
                    )
                  }
                >
                  Pending
                </button>

                <button
                  className="primary"
                  onClick={() =>
                    updateReservationStatus(
                      reservation.id,
                      "Confirmed"
                    )
                  }
                >
                  Confirm
                </button>

                <button
                  className="secondary"
                  onClick={() =>
                    updateReservationStatus(
                      reservation.id,
                      "Declined"
                    )
                  }
                >
                  Decline
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </section>
  );
}

function TrackOrder({ go }) {
  const [orders, setOrders] = useState(() => {
    return JSON.parse(
      localStorage.getItem("chickenRepublicOrders") || "[]"
    );
  });

  const [loading, setLoading] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [lookupOrderId, setLookupOrderId] = useState("");
const [lookupPhone, setLookupPhone] = useState("");
const [lookupLoading, setLookupLoading] = useState(false);
const [lookupError, setLookupError] = useState("");

  const loadOrders = async () => {
    try {
      const savedOrders = JSON.parse(
        localStorage.getItem("chickenRepublicOrders") || "[]"
      );

      if (!savedOrders.length) {
        setOrders([]);
        return;
      }

      const updatedOrders = await Promise.all(
        savedOrders.map(async (order) => {
          const { data, error } = await supabase
            .rpc("get_order_status", {
              p_order_id: order.id,
              p_customer_phone: order.customerPhone,
            });

          if (error) {
            console.error(
              `Could not load status for ${order.id}:`,
              error
            );

            return order;
          }

          return {
            ...order,
            orderStatus:
              data?.[0]?.order_status ||
              order.orderStatus ||
              "New",
          };
        })
      );

      setOrders(updatedOrders);

      localStorage.setItem(
        "chickenRepublicOrders",
        JSON.stringify(updatedOrders)
      );
    } catch (error) {
      console.error(
        "Unexpected tracking error:",
        error
      );
    }
  };

  const refreshOrders = async () => {
    setLoading(true);
    await loadOrders();
    setLoading(false);
  };

  const clearCompletedOrders = () => {
  const activeOrders = orders.filter(
    (order) => order.orderStatus !== "Completed"
  );

  setOrders(activeOrders);

  localStorage.setItem(
    "chickenRepublicOrders",
    JSON.stringify(activeOrders)
  );

  if (
    selectedOrderId &&
    !activeOrders.some(
      (order) => order.id === selectedOrderId
    )
  ) {
    setSelectedOrderId(
      activeOrders.length
        ? activeOrders[activeOrders.length - 1].id
        : null
    );
  }
};

const findOrder = async (e) => {
  e.preventDefault();

  setLookupError("");

  const orderId = lookupOrderId.trim();
  const phone = lookupPhone.trim();

  if (!orderId || !phone) {
    setLookupError(
      "Please enter your order number and phone number."
    );
    return;
  }

  setLookupLoading(true);

  try {
    const { data, error } = await supabase.rpc(
      "get_customer_order",
      {
        p_order_id: orderId,
        p_customer_phone: phone,
      }
    );

    if (error) {
      console.error("Order lookup failed:", error);
      setLookupError(
        "We could not find your order. Please check your details and try again."
      );
      return;
    }

    if (!data) {
      setLookupError(
        "No order was found with those details."
      );
      return;
    }

    const foundOrder = {
      id: data.id,
      items: data.items || [],
      total: Number(data.total || 0),
      paymentReference: data.payment_reference || "",
      paymentStatus: data.payment_status || "",
      orderStatus: data.order_status || "New",
      customerName: data.customer_name || "",
      customerPhone: data.customer_phone || "",
      customerEmail: data.customer_email || "",
      createdAt: data.created_at || "",
    };

    setOrders((currentOrders) => {
  let updatedOrders;

  const exists = currentOrders.some(
    (order) => order.id === foundOrder.id
  );

  if (exists) {
    updatedOrders = currentOrders.map((order) =>
      order.id === foundOrder.id
        ? foundOrder
        : order
    );
  } else {
    updatedOrders = [...currentOrders, foundOrder];
  }

  localStorage.setItem(
    "chickenRepublicOrders",
    JSON.stringify(updatedOrders)
  );

  return updatedOrders;
});

    setSelectedOrderId(foundOrder.id);

    setLookupOrderId("");
    setLookupPhone("");
  } catch (error) {
    console.error("Unexpected order lookup error:", error);

    setLookupError(
      "Something went wrong while looking up your order."
    );
  } finally {
    setLookupLoading(false);
  }
};

  React.useEffect(() => {
    loadOrders();

    const interval = setInterval(() => {
      loadOrders();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    if (orders.length > 0 && !selectedOrderId) {
      setSelectedOrderId(orders[orders.length - 1].id);
    }
  }, [orders, selectedOrderId]);

  const selectedOrder =
    orders.find(
      (order) => order.id === selectedOrderId
    ) || null;

  const statuses = [
    {
      name: "New",
      title: "Order Received",
      description:
        "Your order has been received successfully.",
    },
    {
      name: "Preparing",
      title: "Preparing Your Order",
      description:
        "Our kitchen is preparing your food.",
    },
    {
      name: "Ready",
      title: "Ready",
      description:
        "Your order is ready for pickup.",
    },
    {
      name: "Completed",
      title: "Completed",
      description:
        "Your order has been completed.",
    },
  ];

  const currentStatus =
    selectedOrder?.orderStatus || "New";

  const currentIndex = statuses.findIndex(
    (status) => status.name === currentStatus
  );

  return (
    <section className="section pageTop center">

      <div className="success trackingPage">

        <span className="eyebrow">
          ORDER TRACKING
        </span>

        <h1>Track Your Orders</h1>

<div className="orderLookup">
  <h3>Find an Order</h3>

  <p>
    Enter your order number and phone number to track
    an order from any device.
  </p>

  <form onSubmit={findOrder}>
    <input
      type="text"
      placeholder="Order Number"
      value={lookupOrderId}
      onChange={(e) =>
        setLookupOrderId(e.target.value)
      }
    />

    <input
      type="tel"
      placeholder="Phone Number"
      value={lookupPhone}
      onChange={(e) =>
        setLookupPhone(e.target.value)
      }
    />

    {lookupError && (
      <p className="lookupError">
        {lookupError}
      </p>
    )}

    <button
      type="submit"
      className="primary"
      disabled={lookupLoading}
    >
      {lookupLoading
        ? "Finding Order..."
        : "Find My Order"}
    </button>
  </form>
</div>

{!orders.length ? (
          <>
            <p>
              You don't have any orders yet.
            </p>

            <button
              className="primary"
              onClick={() => go("menu")}
            >
              Order From Menu
            </button>
          </>
        ) : (
          <>
            <p>
              View your order history and track
              your current orders.
            </p>

            <div className="orderHistory">

              <h3>Your Orders</h3>

              {orders
                .slice()
                .reverse()
                .map((order) => (

                  <button
                    key={order.id}
                    type="button"
                    className={`orderHistoryItem ${
                      selectedOrderId === order.id
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedOrderId(order.id)
                    }
                  >

                    <div>
                      <strong>{order.id}</strong>

<span>
  {order.createdAt
    ? new Date(order.createdAt).toLocaleString()
    : "Date unavailable"}
</span>

<span>
  {order.items?.length || 0} item
  {order.items?.length === 1
    ? ""
    : "s"}
</span>
                    </div>

                    <div>
                      <strong>
                        ₦
                        {Number(
                          order.total || 0
                        ).toLocaleString()}
                      </strong>

                      <span
  className={`orderStatusBadge ${String(
    order.orderStatus || "New"
  ).toLowerCase()}`}
>
  {order.orderStatus || "New"}
</span>
                    </div>

                  </button>

                ))}

            </div>

            {selectedOrder && (
              <>

                <div className="trackingOrderNumber">

                  <span>ORDER NUMBER</span>

                  <strong>
                    {selectedOrder.id}
                  </strong>

                </div>

                <div className="trackingTimeline">

                  {statuses.map((status, index) => {

                    const isCompleted =
                      currentStatus === "Completed" ||
                      index < currentIndex;

                    const isCurrent =
                      index === currentIndex &&
                      currentStatus !== "Completed";

                    return (
                      <div
                        className={`trackingStep ${
                          isCompleted
                            ? "completed"
                            : ""
                        } ${
                          isCurrent
                            ? "current"
                            : ""
                        }`}
                        key={status.name}
                      >

                        <div className="trackingIndicator">

                          {isCompleted ? (
                            <Check size={18} />
                          ) : (
                            <span>
                              {index + 1}
                            </span>
                          )}

                        </div>

                        <div className="trackingContent">

                          <strong>
                            {status.title}
                          </strong>

                          <span>
                            {status.description}
                          </span>

                        </div>

                      </div>
                    );
                  })}

                </div>

                <div className="orderConfirmation">

                  <h3>Order Summary</h3>

                  {selectedOrder.items?.map((item) => (

                    <div
                      className="confirmationLine"
                      key={item.id}
                    >

                      <span>
                        {`${item.name} × ${item.qty}: `}
                      </span>

                      <strong>
                        {`₦${(
                          Number(item.price) *
                          item.qty
                        ).toLocaleString()}`}
                      </strong>

                    </div>

                  ))}

                  <div className="confirmationTotal">

                    <span>Total Paid: </span>

                    <strong>
                      ₦
                      {Number(
                        selectedOrder.total || 0
                      ).toLocaleString()}
                    </strong>

                  </div>

                </div>

                <div className="trackingActions">

  <button
    className="secondary"
    onClick={refreshOrders}
    disabled={loading}
  >
    {loading
      ? "Refreshing..."
      : "Refresh Order Status"}
  </button>

  <button
    className="secondary"
    onClick={clearCompletedOrders}
  >
    Clear Completed Orders
  </button>

  <button
    className="primary"
    onClick={() => go("menu")}
  >
    Order Again
  </button>

</div>
              </>
            )}

          </>
        )}

      </div>

    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);