"use strict"

const replay = document.querySelector("button");
const landscape = document.getElementById("landscape");
let c = false
let positionorigine = {}
let cercles = []
function Resizecircle(e){
    if (e.target instanceof HTMLSpanElement ) {
        c = e.target 
        return
    }

    c = e.target;
    const p = this.getBoundingClientRect()
    positionorigine.x = parseInt(p.left) + (parseInt(this.style.width)/2)
    positionorigine.y = parseInt(p.top) + (parseInt(this.style.height)/2)
    positionorigine.distance = Math.sqrt ((positionorigine.x-e.clientX)**2+(positionorigine.y-e.clientY)**2)
    positionorigine.size = parseInt(c.style.width)
    positionorigine.left = parseInt(c.style.left)
    positionorigine.top = parseInt(c.style.top)

}
document.addEventListener("mouseup", function (){
    c = false;
    
})
document.addEventListener("mousemove", function (e){
    if (c && c instanceof HTMLDivElement) {

        const distance = Math.sqrt ((positionorigine.x-e.clientX)**2+(positionorigine.y-e.clientY)**2);
        // console.log(positionorigine.distance-distance);
        const newsize = distance - positionorigine.distance 
        c.style.width = positionorigine.size + newsize + "px";
        c.style.height = positionorigine.size + newsize + "px";
        c.style.left = positionorigine.left - newsize/2 + "px";
        c.style.top = positionorigine.top - newsize/2 + "px"; 
    }
    else if(c){
        console.log("bouge cercle");
        const ci = c.parentElement;
        let offsetX, offsetY;
        const size = parseInt(ci.style.width)/2;

        offsetX = e.clientX - landscape.getBoundingClientRect().left - size;
        offsetY = e.clientY - landscape.getBoundingClientRect().top - size;
        ci.style.left = `${offsetX}px`;
        // console.log(`${e.clientX - offsetX}px`, offsetX, e.clientX, landscape);
        ci.style.top = `${offsetY}px`;

        console.log(ci.style.width);
        
    }
})

function generateLandscape() {
    // landscape.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        const element = document.createElement("div");
        const size = Math.random() * 160 + 50; // Taille aléatoire entre 10 et 50
        let left, top ;

        element.addEventListener("mousedown", Resizecircle)
        

        element.style.width = size + "px";
        element.style.height = size + "px";
        element.style.backgroundColor = "transparent";
        element.style.border = "2px solid " + getRandomColor();
        element.style.borderRadius = "50%";
        element.style.position = "absolute";
       
        
        const index = i + 1;
        element.innerHTML = `<span>${index}</span>`;
        element.style.display = "flex";
        element.style.alignItems = "center";
        element.style.justifyContent = "center";

        

        landscape.appendChild(element);
        
        do{
            left = Math.random() * (800 - size);
            top = Math.random() * (500 - size);
            element.style.left = left + "px";
            element.style.top = top + "px";
       }while (Ishurting(element)) 
           
       
       
       cercles.push(element);
    }
}
function Ishurting(newCircle) {
    for (const existingCircle of cercles) {
        if (existingCircle !== newCircle) {
            const rect1 = existingCircle.getBoundingClientRect();
            const rect2 = newCircle.getBoundingClientRect();

            if (
                rect1.left < rect2.left + rect2.width &&
                rect1.left + rect1.width > rect2.left &&
                rect1.top < rect2.top + rect2.height &&
                rect1.top + rect1.height > rect2.top
            ) {
                // Les cercles se chevauchent
                return true;
            }
        }
    }

    // Aucun chevauchement trouvé
    return false;
}
function saveResourcesData() {
    const resources = Array.from(document.querySelectorAll("#landscape > div"));
    const resourcesData = resources.map(resource => ({
        left: resource.style.left,
        top: resource.style.top,
        backgroundImage: resource.style.backgroundImage,
        backgroundSize: resource.style.backgroundSize,
    }));
    localStorage.setItem('resourcesData', JSON.stringify(resourcesData));
}

function loadResourcesData() {
    const savedResourcesData = JSON.parse(localStorage.getItem('resourcesData')) || [];

    for (const resourceData of savedResourcesData) {
        console.log(resourceData.backgroundSize);
        const elementres = document.createElement("div");
        elementres.style.width = "20px";
        elementres.style.height = "20px";
        elementres.style.position = "absolute";
        elementres.style.left = resourceData.left;
        elementres.style.top = resourceData.top;
        elementres.style.backgroundImage = resourceData.backgroundImage;
        elementres.style.backgroundSize = resourceData.backgroundSize;


        landscape.appendChild(elementres);
    }
}


function generateressource() {
    // const ressource = document.getElementById("landscape");
    // ressource.innerHTML = "";

    for (let i = 0; i < 25; i++) {
        const elementres = document.createElement("div");
        const size = 20;
        const left = Math.random() * (800 - size);
        const top = Math.random() * (500 - size);

        elementres.style.width = size + "px";
        elementres.style.height = size + "px";
        elementres.style.position = "absolute";
        elementres.style.left = left + "px";
        elementres.style.top = top + "px";
        const x = ["cristaux","soie","or","perle","Epice","Magie","ruine"]
        let r = x[Math.floor(Math.random()*x.length)] 

        elementres.style.backgroundSize = "cover"
        if (r=== "cristaux") {
            elementres.style.backgroundImage = "url(./cristaux.jpg)"
        }
        if (r==="soie") {
            elementres.style.backgroundImage = "url(./soie.jpg)"
        }
        if (r==="or") {
            elementres.style.backgroundImage = "url(./or.jpg)"
        }
        if (r==="perle") {
            elementres.style.backgroundImage = "url(./perle.jpg)"
        }
        if (r==="Epice") {
            elementres.style.backgroundImage = "url(./epice.jpeg)"
        }
        if (r==="Magie") {
            elementres.style.backgroundImage = "url(./magie.jpg)"
        }
        if (r==="ruine") {
            elementres.style.backgroundImage = "url(./ruine.jpg)"
        }
        landscape.appendChild(elementres);
    }
    saveResourcesData();
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function saveData() {
    localStorage.setItem('cercles', JSON.stringify(cercles.map(c => ({
        left: c.style.left,
        top: c.style.top,
        width: c.style.width,
        height: c.style.height,
        background:c.style.backgroundColor,
        border: c.style.border,
        borderRadius:c.style.borderRadius,
        content: c.innerHTML,
        display: c.style.display,
        alignItems: c.style.alignItems,
        justifyContent: c.style.justifyContent,
    }))));
}
function loadData() {
    const savedCercles = JSON.parse(localStorage.getItem('cercles')) || [];
    
    for (const savedCercle of savedCercles) {
        const element = document.createElement("div");
        element.style.left = savedCercle.left;
        element.style.top = savedCercle.top;
        element.style.width = savedCercle.width;
        element.style.height = savedCercle.height;
        element.style.backgroundColor = savedCercle.background;
        element.style.border = savedCercle.border;
        element.style.borderRadius = savedCercle.borderRadius;
        element.innerHTML = savedCercle.content;
        element.style.display = savedCercle.display;
        element.style.alignItems = savedCercle.alignItems;
        element.style.justifyContent = savedCercle.justifyContent;
        element.addEventListener("mousedown", Resizecircle)
        landscape.appendChild(element);
        cercles.push(element);
    }
    console.log(cercles,savedCercles);
}


replay.addEventListener("click", function(){
    landscape.innerHTML = ""
    cercles = []
    generateLandscape();
    generateressource();
    saveData();
//    console.log(cercles);
});
loadData(); 
loadResourcesData();
 
// replay.addEventListener("click", generateLandscape);



