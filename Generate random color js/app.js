let body=document.querySelector("body");
let h4=document.querySelector("h4");
let div=document.querySelector("div");
let button=document.querySelector("button");


    button.addEventListener("click",function(){
        let randomcolor=changecolor();
        h4.innerText=randomcolor;

        div.style.backgroundColor=randomcolor;
    });

    function changecolor(){
       let red= Math.floor(Math.random()*250);
       let green= Math.floor(Math.random()*250);
       let blue= Math.floor(Math.random()*250);
       let color=`rgb(${red},${green},${blue})`;
       return color;
    }