const myModule=(()=>{"use strict";let e=[];const t=["C","D","H","S"],a=["A","J","Q","K"];let n=[];const o=document.querySelector("#btnNew"),r=document.querySelector("#btnTake"),l=document.querySelector("#btnStop"),s=document.querySelectorAll(".divCards"),d=document.querySelectorAll("small"),c=(t=2)=>{e=u(),n=[];for(let e=0;e<t;e++)n.push(0);d.forEach(e=>e.innerText=0),s.forEach(e=>e.innerHTML=""),r.disabled=!1,l.disabled=!1},u=()=>{e=[];for(let a=2;a<=10;a++)for(let n of t)e.push(a+n);for(let n of t)for(let t of a)e.push(t+n);return _.shuffle(e)},i=e=>{if(0===e.length)throw"No quedan cartas en el mazo.";return e.pop()},m=(e,t)=>(n[t]=n[t]+(e=>{const t=e.substring(0,e.length-1);return"A"===t?11:isNaN(t)?10:1*t})(e),d[t].innerText=n[t],n[t]),p=(e,t)=>{const a=document.createElement("img");a.src=`assets/cards/${e}.png`,a.classList.add("card"),s[t].append(a)},h=t=>{let a=0;do{const t=i(e);a=m(t,n.length-1),p(t,n.length-1)}while(a<t&&t<=21);(()=>{const[e,t]=n;setTimeout(()=>{t===e?alert("La computadora gana en caso de empate"):e>21?alert("Te has pasado la computadora gana"):t>21?alert("Gana el jugador"):alert("Gana la computadora ")},100)})()};return r.addEventListener("click",()=>{const t=i(e),a=m(t,0);p(t,0),a>21?(console.warn("Te has pasado de 21."),r.disabled=!0,l.disabled=!0,h(a)):21===a&&(console.warn("Tienes justo 21."),r.disabled=!0,l.disabled=!0,h(a))}),l.addEventListener("click",()=>{r.disabled=!0,l.disabled=!0,h(n[0])}),o.addEventListener("click",()=>{c()}),{newGame:c}})();