const products = [
  {id:1,name:"Essential Oversized Tee",category:"Men",price:1450,colour:"Black / White",tag:"BESTSELLER",image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85"},
  {id:2,name:"Everyday Street Sneakers",category:"Men",price:3800,colour:"White",tag:"NEW DROP",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85"},
  {id:3,name:"The Tailored Blazer",category:"Women",price:4200,colour:"Charcoal",tag:"CAPTAIN PICK",image:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=700&q=85"},
  {id:4,name:"Everyday Crossbody",category:"Accessories",price:1950,colour:"Black",tag:"",image:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=85"},
  {id:5,name:"Classic Denim Jacket",category:"Men",price:3200,colour:"Indigo",tag:"",image:"https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=700&q=85"},
  {id:6,name:"Minimal Gold Watch",category:"Accessories",price:2750,colour:"Gold / Black",tag:"LOW STOCK",image:"https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=700&q=85"},
  {id:7,name:"Relaxed Fit Shirt",category:"Women",price:1850,colour:"Cream",tag:"",image:"https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=700&q=85"},
  {id:8,name:"Everyday Sunglasses",category:"Accessories",price:1200,colour:"Black",tag:"",image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85"}
];
const money = n => "KSh " + Number(n).toLocaleString("en-KE");
let cart = JSON.parse(localStorage.getItem("captainStoreCart") || "[]");
let activeFilter = "All", searchTerm = "";
const grid = document.getElementById("productGrid");
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const checkoutModal = document.getElementById("checkoutModal");
let toastTimer;

function saveCart(){ localStorage.setItem("captainStoreCart", JSON.stringify(cart)); }
function showToast(message){
  const toast=document.getElementById("toast"); toast.textContent=message; toast.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove("show"),2200);
}
function renderProducts(){
  let list=products.filter(p=>(activeFilter==="All"||p.category===activeFilter)&&(`${p.name} ${p.category} ${p.colour}`).toLowerCase().includes(searchTerm.toLowerCase()));
  const sort=document.getElementById("sortSelect").value;
  if(sort==="low") list.sort((a,b)=>a.price-b.price);
  if(sort==="high") list.sort((a,b)=>b.price-a.price);
  grid.innerHTML=list.length?list.map(p=>`<article class="product-card">
    <div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.opacity='.2'">
    ${p.tag?`<span class="product-tag">${p.tag}</span>`:""}
    <button class="quick-add" data-add="${p.id}">ADD TO BAG +</button></div>
    <div class="product-info"><span class="product-category">${p.category}</span><h3 class="product-title">${p.name}</h3>
    <div class="product-bottom"><span class="product-price">${money(p.price)}</span><span class="product-colour">${p.colour}</span></div></div></article>`).join(""):`<p class="empty-cart">No products match that search. Try another term.</p>`;
}
function addToCart(id){
  const item=cart.find(x=>x.id===id);
  if(item)item.qty++; else cart.push({id,qty:1});
  saveCart(); renderCart(); showToast("Added to your bag");
}
function cartTotal(){return cart.reduce((sum,item)=>sum+products.find(p=>p.id===item.id).price*item.qty,0);}
function renderCart(){
  const count=cart.reduce((s,i)=>s+i.qty,0);
  document.getElementById("cartCount").textContent=count;
  document.getElementById("drawerCount").textContent=`(${count})`;
  document.getElementById("cartSubtotal").textContent=money(cartTotal());
  document.getElementById("checkoutTotal").textContent=money(cartTotal());
  document.getElementById("cartItems").innerHTML=cart.length?cart.map(item=>{
    const p=products.find(x=>x.id===item.id);
    return `<div class="cart-item"><img src="${p.image}" alt="${p.name}"><div><h3>${p.name}</h3><small>${p.colour}</small><div class="item-price">${money(p.price)}</div><div class="quantity-control"><button data-qty="${p.id}" data-change="-1" aria-label="Decrease quantity">−</button><span>${item.qty}</span><button data-qty="${p.id}" data-change="1" aria-label="Increase quantity">+</button></div></div><button class="remove-item" data-remove="${p.id}" aria-label="Remove ${p.name}">×</button></div>`;
  }).join(""):`<div class="empty-cart"><b>Your bag is waiting.</b>Your next favourite could be right here.<br><br><button class="button button-gold" id="emptyShop">EXPLORE THE COLLECTION ↗</button></div>`;
}
function openCart(){cartDrawer.classList.add("open");cartDrawer.setAttribute("aria-hidden","false");overlay.classList.remove("hidden");document.body.style.overflow="hidden";}
function closeCart(){cartDrawer.classList.remove("open");cartDrawer.setAttribute("aria-hidden","true");overlay.classList.add("hidden");document.body.style.overflow="";}
function openCheckout(){
  if(!cart.length){showToast("Your bag is empty");return;}
  closeCart(); checkoutModal.classList.remove("hidden");overlay.classList.remove("hidden");document.body.style.overflow="hidden";
  document.getElementById("checkoutSummary").innerHTML=cart.map(i=>`${products.find(p=>p.id===i.id).name} × ${i.qty}`).join("<br>")+`<br><br><strong>Subtotal: ${money(cartTotal())}</strong>`;
  document.getElementById("checkoutForm").classList.remove("hidden");document.getElementById("orderSuccess").classList.add("hidden");
}
function closeCheckout(){checkoutModal.classList.add("hidden");overlay.classList.add("hidden");document.body.style.overflow="";}
document.addEventListener("click",e=>{
  const add=e.target.closest("[data-add]"); if(add){addToCart(Number(add.dataset.add));return;}
  const qty=e.target.closest("[data-qty]"); if(qty){const id=Number(qty.dataset.qty),item=cart.find(i=>i.id===id);item.qty+=Number(qty.dataset.change);if(item.qty<=0)cart=cart.filter(i=>i.id!==id);saveCart();renderCart();return;}
  const remove=e.target.closest("[data-remove]");if(remove){cart=cart.filter(i=>i.id!==Number(remove.dataset.remove));saveCart();renderCart();return;}
  const filter=e.target.closest("[data-filter]");if(filter){activeFilter=filter.dataset.filter;document.querySelectorAll(".filter-tab").forEach(b=>b.classList.toggle("active",b.dataset.filter===activeFilter));renderProducts();return;}
  const filterLink=e.target.closest("[data-filter-link]");if(filterLink){activeFilter=filterLink.dataset.filterLink;document.querySelectorAll(".filter-tab").forEach(b=>b.classList.toggle("active",b.dataset.filter===activeFilter));renderProducts();document.getElementById("mobileNav").classList.add("hidden");}
});
document.getElementById("cartOpen").addEventListener("click",openCart);
document.getElementById("cartClose").addEventListener("click",closeCart);
document.getElementById("continueShopping").addEventListener("click",closeCart);
document.getElementById("checkoutOpen").addEventListener("click",openCheckout);
document.getElementById("checkoutClose").addEventListener("click",closeCheckout);
overlay.addEventListener("click",()=>{closeCart();closeCheckout();});
document.getElementById("sortSelect").addEventListener("change",renderProducts);
document.getElementById("searchToggle").addEventListener("click",()=>{document.getElementById("searchBar").classList.toggle("hidden");document.getElementById("searchInput").focus();});
document.getElementById("searchClose").addEventListener("click",()=>{document.getElementById("searchBar").classList.add("hidden");document.getElementById("searchInput").value="";searchTerm="";renderProducts();});
document.getElementById("searchInput").addEventListener("input",e=>{searchTerm=e.target.value;activeFilter="All";document.querySelectorAll(".filter-tab").forEach(b=>b.classList.toggle("active",b.dataset.filter==="All"));renderProducts();});
document.getElementById("mobileMenu").addEventListener("click",()=>document.getElementById("mobileNav").classList.toggle("hidden"));
document.getElementById("checkoutForm").addEventListener("submit",e=>{
  e.preventDefault();
  const data=Object.fromEntries(new FormData(e.target).entries());
  const orderId="CS-"+Date.now().toString().slice(-7);
  document.getElementById("checkoutForm").classList.add("hidden");
  const success=document.getElementById("orderSuccess");success.classList.remove("hidden");
  success.innerHTML=`<h3>Thanks, ${escapeHtml(data.name)}.</h3><p>Your demo order reference is <strong>${orderId}</strong>.</p><p>This is a front-end demonstration only. No order has been sent to Captain Store and no payment has been taken. To accept real orders, connect a backend and payment provider.</p><button class="button button-gold" id="finishOrder">BACK TO SHOP ↗</button>`;
  cart=[];saveCart();renderCart();
  document.getElementById("finishOrder").addEventListener("click",closeCheckout);
});
function escapeHtml(str){return String(str).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();document.getElementById("newsletterMessage").textContent="Thanks! Newsletter signup is a demo until connected to an email service.";e.target.reset();});
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();renderCart();
