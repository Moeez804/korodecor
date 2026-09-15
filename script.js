const data=[
{name:"Abstract Brown Wave Tote",cat:"Bags",price:3700,old:4600,img:"https://jutique.co/cdn/shop/files/KRP05544.jpg?v=1773909316&width=900"},
{name:"Botanical Embroidered Tote",cat:"Bags",price:3900,old:4900,img:"https://jutique.co/cdn/shop/files/KRP05479_1.jpg?v=1773643085&width=900"},
{name:"Aqua Blue Tie-Dye Clutch",cat:"Clutches",price:4500,old:5600,img:"https://jutique.co/cdn/shop/files/1.jpg?v=1780225098&width=900"},
{name:"Natural Textured Clutch",cat:"Clutches",price:4000,old:5000,img:"https://jutique.co/cdn/shop/files/13.jpg?v=1780198797&width=900"},
{name:"Black Tiger Pop Art Bag",cat:"Bags",price:3900,old:4900,img:"https://jutique.co/cdn/shop/files/KRP05542.jpg?v=1773825096&width=900"},
{name:"Organic Stripe Tote",cat:"Bags",price:3700,old:4600,img:"https://jutique.co/cdn/shop/files/KRP05626.jpg?v=1773908974&width=900"},
{name:"Artisan Home Set",cat:"Home",price:2600,old:3200,img:"https://jutique.co/cdn/shop/files/KRP05550.jpg?v=1773733581&width=900"},
{name:"Woven Statement Tote",cat:"Bags",price:4200,old:5200,img:"https://jutique.co/cdn/shop/files/KRP05644.jpg?v=1773909085&width=900"}
];
let filter="All",cart=[];
const $=id=>document.getElementById(id);
function money(n){return "PKR "+n.toLocaleString();}
function render(){
 const q=($("searchInput").value||"").toLowerCase();
 const items=data.filter(x=>(filter==="All"||x.cat===filter)&&x.name.toLowerCase().includes(q));
 $("products").innerHTML=items.map((p)=>`<article class="product">
 <div class="product-image"><span class="sale">SALE</span><button class="wish" onclick="toggleWish(this)" aria-label="Wishlist">♡</button><img src="${p.img}" alt="${p.name}"><button class="add" onclick="addProduct(${data.indexOf(p)})">ADD TO CART</button></div>
 <h3>${p.name}</h3><div class="price"><del>${money(p.old)}</del><b>${money(p.price)}</b></div></article>`).join("")||"<p class='empty'>No products found.</p>";
}
function addProduct(i){cart.push(data[i]);renderCart();openCart();}
function remove(i){cart.splice(i,1);renderCart();}
function renderCart(){
 $("count").textContent=cart.length;
 $("cartBody").innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-row"><img src="${p.img}"><div><h4>${p.name}</h4><div>${money(p.price)}</div><button onclick="remove(${i})">Remove</button></div></div>`).join(""):"<div class='empty'>Your cart is empty.</div>";
 $("total").textContent=money(cart.reduce((a,p)=>a+p.price,0));
}
function openCart(){$("cart").classList.add("open");$("shade").classList.add("open")}
function closeCart(){$("cart").classList.remove("open");$("shade").classList.remove("open")}
document.querySelectorAll(".filters button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");filter=b.dataset.cat;render()});
$("cartOpen").onclick=openCart;$("cartClose").onclick=closeCart;$("shade").onclick=closeCart;
$("searchOpen").onclick=()=>{$("search").classList.add("open");$("searchInput").focus()};$("searchClose").onclick=()=>$("search").classList.remove("open");$("searchInput").oninput=render;
$("hamb").onclick=()=>$("mobileNav").classList.toggle("open");
render();renderCart();

function toggleWish(btn){btn.classList.toggle("liked");btn.textContent=btn.classList.contains("liked")?"♥":"♡";}
