let pointer=()=>{
    document.addEventListener("mousemove",(e)=>{
        gsap.to("#pointer",{
            opacity:1,
            top:e.y,
            left:e.x,
            duration:0.1
        })
    })
}

//  WORD MOVERS
let cardMove=(cardName)=>{{
    document.querySelector(`.${cardName}`).addEventListener("mouseenter",()=>{
        gsap.to(`.${cardName} h1`,{
            y:-50,
            duration:0.4
        })
    })
    document.querySelector(`.${cardName}`).addEventListener("mouseleave",()=>{
        gsap.to(`.${cardName} h1`,{
            y:0,
            duration:0.4
        })
    })
}}

let aLinkScroll=()=>{
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
          });
        });
    });
}

let themeMode=()=>{
    let darkLightbtn = document.querySelector(".theme-checkbox")
    darkLightbtn.checked = true;
    let element = document.querySelector("#element")

    let colorModeValue;

    darkLightbtn.addEventListener("click",()=>{

        document.body.classList.toggle("lightMode")

        let modeVal;
        // console.log(document.body.classList)

        if(document.body.classList.contains("lightMode")){
            // console.log("lightMode")
            modeVal = "lightMode"
        }
        else{
            // console.log("darkMode")
            modeVal = "darkMode"
        }
        localStorage.setItem("colorMode",modeVal)
    })

    colorModeValue = localStorage.getItem("colorMode")

    if(colorModeValue === "lightMode"){
        document.body.classList.toggle("lightMode")
        darkLightbtn.checked = true;
    }
    else{
        // console.log("Dark Mode on hai")
        darkLightbtn.checked = false;
    }
}

let sideMenuBar=()=>{
    
    let sideMenuBtn = document.querySelector("#burger")

    sideMenuBtn.addEventListener("click",()=>{
        if(sideMenuBtn.checked === true){
            document.querySelector("nav .center").style.display = "flex";
            document.querySelector("nav .center").style.opacity = 1;
            gsap.from("nav .center a",{
                opacity:0,
                x:80,
                duration:0.5,
                delay:0.1,
                stagger:0.1
            })
            // console.log("Opened")
        }
        else{
            gsap.to("nav .center",{
                duration:0.5,
                opacity:0,
                display:"none"
            })
            // console.log("Closed")
        }
    })
}

let scrollTopFun=()=>{
    let scrollTop = document.querySelector(".scrollTop")
    scrollTop.addEventListener("click",()=>{
        window.scrollTo(0,0)
    })
    window.addEventListener("scroll",(e)=>{
        if(window.pageYOffset <= 700){
            // scrollTop.style.opacity = 0;
            gsap.to(".scrollTop",{
                opacity:0,
                duration:0.3
            })
        }
        else{
            // scrollTop.style.opacity = 1;
            gsap.to(".scrollTop",{
                opacity:1,
                duration:0.3
            })
        }
    })
}

let page1Animation=()=>{
    gsap.from("nav",{
        y: -100,
        opacity:0,
        duration:1,
        // delay:0.2,
    })
    
    gsap.from("#hero1 h1",{
        y:80,
        duration:0.6,
        opacity:0,
        delay:0.4
    })
    gsap.from("#hero2 h1",{
        y:100,
        duration:0.8,
        opacity:0,
        delay:1,
        stagger:0.2
    })
    gsap.from("#hero3 h1",{
        opacity:0,
        delay:1.8,
        duration:1,
    })
    gsap.from(".icons .gitIcon",{
        y:150,
        opacity:0,
        delay:2,
        duration:0.4,
        stagger:0.2
    })
    gsap.from("#hero4 .scrolldown",{
        y:100,
        opacity:0,
        delay:3,
        duration:0.4,
    })
}

let formResponse=()=>{
    const form = document.querySelector("form");
    const result = document.getElementById("result");

    form.addEventListener("submit", function (e) {
    const formData = new FormData(form);
    e.preventDefault();
    var object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });
    var json = JSON.stringify(object);
    result.innerHTML = "Please wait...";

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
        },
        body: json
    })
        .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
            result.innerHTML = json.message;
            result.classList.remove("text-gray-500");
            result.classList.add("text-green-500");
        } else {
            // console.log(response);
            result.innerHTML = json.message;
            result.classList.remove("text-gray-500");
            result.classList.add("text-red-500");
        }
        })
        .catch((error) => {
        // console.log(error);
        result.innerHTML = "Something went wrong!";
        })
        .then(function () {
        form.reset();
        setTimeout(() => {
            result.style.display = "none";
        }, 5000);
        });
    });

}


pointer();  

aLinkScroll();

sideMenuBar();

themeMode();

scrollTopFun()

page1Animation();

formResponse();


cardMove("todolist")
cardMove("dicegame")
cardMove("tictaetoe")
cardMove("weather")
cardMove("fdcal")
cardMove("emailvalid")
cardMove("getKnowMe")


