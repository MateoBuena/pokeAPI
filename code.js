
const types=document.querySelector(".types");

const filter=document.querySelectorAll(".filter");

filter[0].addEventListener("mouseover",()=>{
    types.classList.replace("invisible","visible");
})

filter[0].addEventListener("mouseout",()=>{
    types.classList.replace("visible","invisible");
})

const region=document.querySelector(".region");

filter[1].addEventListener("mouseover",()=>{
    region.classList.replace("invisible","visible");
})

filter[1].addEventListener("mouseout",()=>{
    region.classList.replace("visible","invisible");
})

const container=document.querySelector(".flex-section");

const createpokemon= async (image_pkm, id_pkm, name_pkm, types, height_pkm, weight_pkm)=>{
    const container_pokemon= document.createElement("DIV");
    const container_img= document.createElement("DIV");
    const img= document.createElement("IMG");
    const container_number_name= document.createElement("DIV");
    const b= document.createElement("B");
    const h2= document.createElement("H2");
    const container_types= document.createElement("DIV");
    const type1= document.createElement("DIV");
    const container_height_wieght= document.createElement("DIV");
    const height= document.createElement("P");
    const weight= document.createElement("P");
    
    container_pokemon.classList.add("pokemon");
    container_img.classList.add("pokemon_img");
    container_number_name.classList.add("number-name");
    b.classList.add("number");
    h2.classList.add("name");
    container_types.classList.add("types_pokedex");
    type1.classList.add("type");
    type1.classList.add(types[0].type.name);
    container_height_wieght.classList.add("height-wieght");
    height.classList.add("height");
    weight.classList.add("weight");
    
    img.setAttribute("src",image_pkm);
    b.textContent="#"+id_pkm;
    if(id_pkm<=99 && id_pkm>=10)b.textContent='#0'+id_pkm;
    else if(id_pkm<=9)b.textContent='#00'+id_pkm;
    h2.textContent=name_pkm;
    type1.textContent=types[0].type.name;
    height.textContent=height_pkm+"m";
    weight.textContent=weight_pkm+"kg";
    
    container_img.appendChild(img);
    container_number_name.appendChild(b);
    container_number_name.appendChild(h2);
    container_types.appendChild(type1);
    
    if(types[1]!=undefined){

        const type2= document.createElement("DIV");
        type2.classList.add("type");
        type2.classList.add(types[1].type.name);
        type2.textContent=types[1].type.name;
        container_types.appendChild(type2);
    }
    container_height_wieght.appendChild(height);
    container_height_wieght.appendChild(weight);
    
    container_pokemon.appendChild(container_img);
    container_pokemon.appendChild(container_number_name);
    container_pokemon.appendChild(container_types);
    container_pokemon.appendChild(container_height_wieght);
    
    const fragment=document.createDocumentFragment();
    fragment.appendChild(container_pokemon);
    container.appendChild(fragment);
    
}


const pokeApi_pokemon= n=>{
    const URL="https://pokeapi.co/api/v2/pokemon/";
    return axios(URL + n);
} 

const loadpokemon = async (type_filter='all',number=386)=>{
    container.innerHTML="";
    if(number==386){
        if(type_filter=='all'){
            for(let i=1; i<=number; i++){
                await pokeApi_pokemon(i).then(res=>{
                    let info=res.data;
                    createpokemon(info.sprites.other["official-artwork"].front_default, info.id,info.name,info.types,info.height,info.weight);
                })
            }
        }else{
            for(let i=1; i<=number; i++){
                await pokeApi_pokemon(i).then(res=>{
                    let info=res.data;
                    const type1=info.types[0].type.name;
                    let type2=info.types[1];
                    if(type2==undefined){
                        if(type1==type_filter){
                            createpokemon(info.sprites.other["official-artwork"].front_default, info.id,info.name,info.types,info.height,info.weight);
                        }
                    }else{
                        if(type1==type_filter || type2.type.name==type_filter){
                            createpokemon(info.sprites.other["official-artwork"].front_default, info.id,info.name,info.types,info.height,info.weight);
                        }
                    }
                })
            }
        }
    }else if(number==151){
        if(type_filter=='all'){
            for(let i=1; i<=151; i++){
                await pokeApi_pokemon(i).then(res=>{
                    let info=res.data;
                    createpokemon(info.sprites.other["official-artwork"].front_default, info.id,info.name,info.types,info.height,info.weight);
                })
            }
        }
    }else if(number==99){
        if(type_filter=='all'){
            for(let i=152; i<=251; i++){
                await pokeApi_pokemon(i).then(res=>{
                    let info=res.data;
                    createpokemon(info.sprites.other["official-artwork"].front_default, info.id,info.name,info.types,info.height,info.weight);
                })
            }
        }
    }else if(number==134){
        if(type_filter=='all'){
            for(let i=252; i<=386; i++){
                await pokeApi_pokemon(i).then(res=>{
                    let info=res.data;
                    createpokemon(info.sprites.other["official-artwork"].front_default, info.id,info.name,info.types,info.height,info.weight);
                })
            }
        }
    }
}

loadpokemon();

const li=document.querySelectorAll(".li");

for(list of li){
    list.addEventListener("click",(e)=>{
        loadpokemon(e.target.innerHTML);
    })
}

const li_region=document.querySelectorAll(".li_region");

for(l of li_region){
    l.addEventListener("click",(e)=>{
        loadpokemon('all',e.target.attributes[1].value);
    })
}
