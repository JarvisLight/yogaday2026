function showTab(id){

    document
    .querySelectorAll("section")
    .forEach(x=>x.classList.add("hidden"));
    
    document
    .getElementById(id)
    .classList.remove("hidden");
    }
    
    function renderEvents(){
    
    const search=document
    .getElementById("search")
    ?.value
    ?.toLowerCase() || "";
    
    const tent=
    document.getElementById("tentFilter")
    ?.value || "";
    
    let html="";
    
    EVENTS
    .filter(e=>{
    
    return (
    (!tent || e.tent===tent)
    &&
    JSON.stringify(e)
    .toLowerCase()
    .includes(search)
    );
    
    })
    .forEach(e=>{
    
    const fav=
    getFavorites().includes(e.id);
    
    html+=`
    
    <div class="card">
    
    <div class="time">${e.time}</div>
    
    <div class="tent">
    Шатёр ${e.tent}
    ${e.location}
    </div>
    
    <h3>${e.title}</h3>
    
    <div
    class="star"
    onclick="saveFavorite(${e.id})">
    ${fav ? '⭐':'☆'}
    </div>
    
    </div>
    `;
    
    });
    
    document
    .getElementById("events")
    .innerHTML=html;
    }
    
    function renderFavorites(){
    
    let html="";
    
    EVENTS
    .filter(e=>
    getFavorites()
    .includes(e.id)
    )
    .forEach(e=>{
    
    html+=`
    <div class="card">
    <div class="time">${e.time}</div>
    <div>${e.location}</div>
    <h3>${e.title}</h3>
    </div>
    `;
    
    });
    
    document
    .getElementById(
    "favoritesList"
    ).innerHTML=html;
    }
    
    function renderNow(){

 const nowEl=document.getElementById("now");

 const d=new Date();

 const current=
 d.getHours()*60+
 d.getMinutes();

 let activeHtml="";
 let upcoming=[];

 EVENTS.forEach(e=>{

   const match=
   e.time.match(
     /(\d\d:\d\d).*?(\d\d:\d\d)/
   );

   if(!match) return;

   const [sh,sm]=
   match[1].split(":").map(Number);

   const [eh,em]=
   match[2].split(":").map(Number);

   const start=sh*60+sm;
   const end=eh*60+em;

   if(
      current>=start &&
      current<=end
   ){

      const left=end-current;

      activeHtml+=`

      <div class="card">

      <div class="time">
      🟢 Осталось ${left} мин
      </div>

      <div class="tent">
      Шатёр ${e.tent}
      · ${e.location}
      </div>

      <h3>${e.title}</h3>

      <small>${e.time}</small>

      </div>
      `;
   }

   if(start > current && start <= current + 30){

  upcoming.push({
     ...e,
     start,
     delta:start-current
  });

}

 });

 upcoming.sort(
   (a,b)=>a.delta-b.delta
 );

 let upcomingHtml="";

 upcoming
 .slice(0,10)
 .forEach(e=>{

   upcomingHtml+=`

   <div class="card">

   <div class="time">
   ⏰ Через ${e.delta} мин
   </div>

   <div class="tent">
   Шатёр ${e.tent}
   · ${e.location}
   </div>

   <h3>${e.title}</h3>

   <small>${e.time}</small>

   </div>
   `;

 });

 nowEl.innerHTML=`

 <h2 style="padding:12px">
 🟢 Сейчас идут
 </h2>

 ${activeHtml ||
 "<div class='card'>Нет активных событий</div>"}

 <h2 style="padding:12px">
 ⏰ Начнётся скоро
 </h2>

 ${upcomingHtml}

 `;
}
    
    function initFilters(){
    
    const tents=
    [
    ...new Set(
    EVENTS.map(e=>e.tent)
    )
    ];
    
    const select=
    document.getElementById(
    "tentFilter"
    );
    
    tents.forEach(t=>{
    
    const option=
    document.createElement(
    "option"
    );
    
    option.value=t;
    option.textContent=
    `Шатёр ${t}`;
    
    select.appendChild(option);
    
    });
    
    select.onchange=renderEvents;
    
    document
    .getElementById("search")
    .oninput=renderEvents;

    
    }
setInterval(
 renderNow,
 60000
);
