let EVENTS=[];

async function loadSchedule(){

const text=await fetch(
'data/schedule.csv'
).then(r=>r.text());

const rows=text.split('\n');

EVENTS=rows.slice(1).map((row,index)=>{

const cols=row.split(';');

return{
    id:index,
    time:cols[0]?.trim(),
    tent:cols[1]?.trim(),
    location:cols[2]?.trim(),
    title: (cols[3] || "")
  .replaceAll("&nbsp;", " ")
  .replaceAll("\u00A0", " ")
  .replaceAll("&quot;", '"')
  .replaceAll("&#39;", "'")
  .replaceAll('"', "")
  .replace(/\s+/g, " ")
  .trim()
   };

});

initFilters();
renderEvents();
renderNow();
renderFavorites();
}

loadSchedule();
