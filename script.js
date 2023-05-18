var currentTime = document.querySelector("h1");
let content = document.querySelector(".content");
let selectMenu = document.querySelectorAll("select");
let setAlarmBtn = document.querySelector(".setAlarmBtn");
let todayDate = document.querySelector(".today-date");
let ok = document.querySelector(".ok");
let items = document.querySelectorAll(".item");
let p = document.querySelector(".notification p");
let ringtone = new Audio("./files/ringtone.mp3");
let arr = [];

todayDate.innerHTML = new Date().toDateString();

// compltet the inputes 
for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
    let date = new Date(),
        h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        ampm = "AM";
    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === `${h}:${m} ${ampm}`) {
            effect(true)
            p.innerHTML = arr[i];
        }
    }

    // stop alarm sog and delet the noutification 
    ok.addEventListener("click", () => {
        effect(false)
        for (i = 0; i < arr.length; i++) {
            if (arr[i] === `${h}:${m} ${ampm}`) {
                let index = arr.indexOf(arr[i])
                document.getElementById(arr[index]).remove()
                arr.splice(index)
            }
        }
    })
}, 1000);

function effect(e) {

    if (e === true) {
        ringtone.play();
        ringtone.loop = true;
        // show the noutification alarm 
        document.querySelector(".overley").style.cssText = "z-index: 1;";
        document.querySelector(".notification").style.cssText = "z-index: 1;";
    }

    if (e === false) {
        ringtone.pause();
        document.querySelector(".overley").style.cssText = "z-index: -1;";
        document.querySelector(".notification").style.cssText = "z-index: -1;";
    }
}

setAlarmBtn.addEventListener("click", function setAlarm() {
    let t = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (t.includes("Hour") || t.includes("Minute") || t.includes("AM/PM")) {
        return alert("Please, select a valid time to set Alarm!");
    };

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === t) {
            return alert("deja !");
        }
    };

    arr.push(t)
    addTimeTodashboard(t)
});

// to add the time to dashboard 
function addTimeTodashboard(time) {
    let dashbord = document.querySelector(".wrapper-two")
    let newitem = document.createElement("div")
    newitem.className = "item"
    let id = time
    newitem.setAttribute("id", id)
    let h3 = document.createElement("h3")
    h3.innerText = time
    let Button = document.createElement("button")
    Button.setAttribute("data-id", id)
    Button.innerText = "delet"
    Button.className = "delet"
    newitem.append(h3)
    newitem.append(Button)
    dashbord.append(newitem)
}

// to delet item
window.addEventListener("click", (e) => {
    if (e.target.className === "delet") {
        document.getElementById(e.target.dataset.id).remove()
    }
})