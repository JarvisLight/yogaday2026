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
    
    const now=document
    .getElementById("now");
    
    const date=new Date();
    
    const current=
    date.getHours()*60+
    date.getMinutes();
    
    let html="";
    
    EVENTS.forEach(e=>{
    
    const start=e.time
    .match(/\d\d:\d\d/);
    
    if(!start) return;
    
    const [h,m]=start[0]
    .split(':')
    .map(Number);
    
    const mins=h*60+m;
    
    if(
    mins>=current &&
    mins<=current+30
    ){
    
    html+=`
    <div class="card">
    
    <div class="time">
    ${e.time}
    </div>
    
    <div class="tent">
    Шатёр ${e.tent}
    ${e.location}
    </div>
    
    <h3>${e.title}</h3>
    
    </div>
    `;
    }
    
    });
    
    now.innerHTML=html;
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
