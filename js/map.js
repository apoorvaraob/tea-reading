
//flashlight effect
let map = document.querySelector(".map");
let moveLight = (event) => {
    console.log(event.target);
    var light = document.querySelector(".reveal");
    light.style.clipPath = `circle(80px at ${event.offsetX}px ${event.offsetY}px)`;
}

map.addEventListener("mousemove", function(event){
    moveLight(event);
});


let teaModal = document.querySelector(".tea-container-modal");
//pin click show modal
let pins = document.querySelectorAll(".pin");
pins.forEach(pin => {
    pin.addEventListener("click", function(){
        teaModal.style.display = "block";
        setTimeout(function(){
            teaModal.style.opacity = 1;
        }, 100);
    })
})

//exit out of tea modal
let close = document.querySelector(".close");
close.addEventListener("click", function(){
    teaModal.style.opacity = 0;
    setTimeout(function(){
        teaModal.style.display = "none";
    }, 200);
})