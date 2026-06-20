function getFavorites(){
    return JSON.parse(
    localStorage.getItem("favorites") || "[]"
    );
    }
    
    function saveFavorite(id){
    
    let favs=getFavorites();
    
    if(favs.includes(id)){
    favs=favs.filter(x=>x!==id);
    }else{
    favs.push(id);
    }
    
    localStorage.setItem(
    "favorites",
    JSON.stringify(favs)
    );
    
    renderFavorites();
    renderEvents();
    }
