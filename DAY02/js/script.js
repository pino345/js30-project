let now = new Date();
let year = now.getFullYear();
let month = now.getMonth() + 1;
let date = now.getDate()

const vYear = year;
const vMonth = month < 10 ? `0${month}`: month;
const vDate = date < 10 ? `0${date}` : date;

let startDate = new Date(now.getFullYear(), now.getMonth(), 1);    // day는 0(sun) ~ 6(sat)
let startDay = startDate.getDay();

const inputCheckin = document.querySelector("#checkin-input");
const inputCheckout = document.querySelector("#checkout-input");

const checkin = document.querySelector(".checkin");
const checkout = document.querySelector(".checkout");

// const tbody = document.querySelector("tbody");
const inTbody = document.querySelector("table#in tbody");
const outTbody = document.querySelector("table#out tbody");
let outTd = outTbody.querySelectorAll("td");

// const td = document.getElementsByTagName("td");
const disableTd = document.getElementsByClassName("disable");



function inCalendar(year, month) {
    let startDate = new Date(year, month - 1, 1);    // day는 0(sun) ~ 6(sat)
    let startDay = startDate.getDay();
    let endDate = new Date(year, month, 0); // month 0(jan) ~ 11(dec)

    for (i=0; i < startDay + endDate.getDate(); i++) {
        if (i == 0) {
            const accountDate = i - startDay + 1;
            const rowAgain = inTbody.insertRow(-1);
            const cell = rowAgain.insertCell(0);

            if (accountDate == 1) {    
                cell.innerHTML = accountDate;
                cell.setAttribute('value',`${year}년 ${month}월 ${accountDate}일`)
            } else {
                cell.setAttribute('class', 'empty');
            }
        } else if (i < startDay) {
            const lastRow = document.querySelector("table#in tbody tr:last-child");
            const createTd = document.createElement("td");
            const insertDate = document.createTextNode("");
            createTd.appendChild(insertDate);
            createTd.setAttribute('class', 'empty');
            lastRow.appendChild(createTd);
        } else if (i % 7 == 0) {
            const rowAgain = inTbody.insertRow(-1);
            const cell = rowAgain.insertCell(0);

            const accountDate = i - startDay + 1;

            cell.innerHTML = accountDate;

            const aMonth = month < 10 ? `0${month}`: month;
            const aDate = accountDate < 10 ? `0${accountDate}`: accountDate;

            cell.setAttribute('value',`${year}년 ${aMonth}월 ${aDate}일`)

            if ((parseInt(`${year}${aMonth}${aDate}`) - parseInt(`${vYear}${vMonth}${vDate}`)) < 0) {
                cell.classList.add("disable");
            }

        } else {
            const lastRow = document.querySelector("table#in tbody tr:last-child");
            const createTd = document.createElement("td");

            const accountDate = i - startDay + 1;
            const insertDate = document.createTextNode(accountDate);
            
            const aMonth = month < 10 ? `0${month}`: month;
            const aDate = accountDate < 10 ? `0${accountDate}`: accountDate;

            createTd.setAttribute('value', `${year}년 ${aMonth}월 ${aDate}일`)

            if ((parseInt(`${year}${aMonth}${aDate}`) - parseInt(`${vYear}${vMonth}${vDate}`)) < 0) {
                createTd.classList.add("disable");
            }

            createTd.appendChild(insertDate);
            lastRow.appendChild(createTd);
        }
    }
    // todayMark(startDate);

    inTbody.onclick = function(event) {
        let target = event.target;

        if (!(target.classList.contains("disable")) && (target.getAttribute("value") !== null)) {
            inputCheckin.setAttribute('value',target.getAttribute("value"));
            focusOutCalendar(checkin);
        }

        let inTd = inTbody.querySelectorAll("td");
        inMark(startDay, inTd);

        outTbody.innerHTML = "";
        outCalendar(year, month);
    }
}

function inMark(startDay, inTd) {
    if (inputCheckin.value !== null) {
        inTd.forEach(function(t) {
            t.classList.remove("checkin-date");
        })

        let str = inputCheckin.value;
        let dDate = str.slice(10, 12);

        let number = parseInt(startDay) + parseInt(dDate) -1;
        inTd[number].classList.add("checkin-date");
    }
}



function outCalendar(year, month) {
    let startDate = new Date(year, month - 1, 1);    // day는 0(sun) ~ 6(sat)
    let startDay = startDate.getDay();
    let endDate = new Date(year, month, 0); // month 0(jan) ~ 11(dec)

    if (inputCheckin.value !== null) {
        let str = inputCheckin.value;

        const dYear = str.slice(0, 4);
        const dMonth = str.slice(6, 8)
        const dDate = str.slice(10, 12);

        
        for (i=0; i < startDay + endDate.getDate(); i++) {
            if (i == 0) {
                const rowAgain = outTbody.insertRow(-1);
                const cell = rowAgain.insertCell(0);
                cell.setAttribute('class', 'empty');
            } else if (i < startDay) {
                const lastRow = document.querySelector("table#out tbody tr:last-child");
                const createTd = document.createElement("td");
                const insertDate = document.createTextNode("");
                createTd.appendChild(insertDate);
                createTd.setAttribute('class', 'empty');
                lastRow.appendChild(createTd);
            } else if (i % 7 == 0) {
                const rowAgain = outTbody.insertRow(-1);
                const cell = rowAgain.insertCell(0);
    
                const accountDate = i - startDay + 1;
    
                cell.innerHTML = accountDate;
    
                const aMonth = month < 10 ? `0${month}`: month;
                const aDate = accountDate < 10 ? `0${accountDate}`: accountDate;
    
                cell.setAttribute('value',`${year}년 ${aMonth}월 ${aDate}일`);

                if (year == dYear && aMonth == dMonth && aDate == dDate) {
                    cell.classList.add("checkin-date");   
                }
    
                if ((parseInt(`${year}${aMonth}${aDate}`) - parseInt(`${vYear}${vMonth}${vDate}`)) < 0 || 
                    ((parseInt(`${year}${aMonth}${aDate}`) - parseInt(`${dYear}${dMonth}${dDate}`)) <= 0 ))  {
                    cell.classList.add("disable");
                }
    
            } else {
                const lastRow = document.querySelector("table#out tbody tr:last-child");
                const createTd = document.createElement("td");
    
                const accountDate = i - startDay + 1;
                const insertDate = document.createTextNode(accountDate);
                
                const aMonth = month < 10 ? `0${month}`: month;
                const aDate = accountDate < 10 ? `0${accountDate}`: accountDate;
    
                createTd.setAttribute('value', `${year}년 ${aMonth}월 ${aDate}일`)

                const a = parseInt(`${year}${aMonth}${aDate}`);
                const b = parseInt(`${year}${dMonth}${dDate}`);

                if (year == dYear && aMonth == dMonth && aDate == dDate) {
                    createTd.classList.add("checkin-date");   
                }
    
                if ((parseInt(`${year}${aMonth}${aDate}`) - parseInt(`${vYear}${vMonth}${vDate}`)) <= 0|| 
                ((parseInt(`${year}${aMonth}${aDate}`) - parseInt(`${dYear}${dMonth}${dDate}`)) <= 0 )) {
                    createTd.classList.add("disable");
                }
    
                createTd.appendChild(insertDate);
                lastRow.appendChild(createTd);
            }
        }        

        outTd.forEach(function(td, i) {
            if ((td.getAttribute('value') !== null) &&
                (!td.classList.contains("empty")) &&
                (td.getAttribute('class') !== "disable") &&
                (!td.classList.contains("checkin-date"))){
                    td.onmouseover = function(event) {    
                        if (month == dMonth) {
                            for (n = 0; n <= i - startDay - dDate; n++){
                                let selectTd = outTd[i - n];
                                selectTd.classList.add("checkout-hover");
                            }
                        } else {
                            for (n = 0; n <= i - startDay ; n++){
                                let selectTd = outTd[i - n];
                                selectTd.classList.add("checkout-hover");
                            }
                        }
                        
                    }
                    td.onmouseout = function(event) {    
                        if (month == dMonth) {
                            for (n = 0; n <= i - startDay - dDate; n++){
                                let selectTd = outTd[i - n];
                                selectTd.classList.remove("checkout-hover");
                            }
                        } else {
                            for (n = 0; n <= i - startDay ; n++){
                                let selectTd = outTd[i - n];
                                selectTd.classList.remove("checkout-hover");
                            }
                        }
                        
                    }

            }
        })
    }

    
    // todayMark(startDate);

    outTbody.onclick = function(event) {
        let target = event.target;
        
        if (!(target.classList.contains("disable")) && 
            (target.getAttribute("value") !== null))
            // && ((parseInt(`${dYear}${dMonth}${dDate}`) - parseInt(`${vYear}${vMonth}${vDate}`)) <= 0)) 
            {
            inputCheckout.setAttribute('value',target.getAttribute("value"));
            focusOutCalendar(checkout);
        }
        
        let outTd = outTbody.querySelectorAll("td");
        outMark(outTd);
    }
}

function outMark(outTd){
    if (inputCheckout.value !== null) {
        outTd.forEach(function(t) {
            t.classList.remove("check-date")
        })
    }

    let inYear = inputCheckin.value.slice(0, 4);
    let inMonth = inputCheckin.value.slice(6, 8);
    let inDate = inputCheckin.value.slice(10, 12);

    let outYear = inputCheckout.value.slice(0, 4);
    let outMonth = inputCheckout.value.slice(6, 8);
    let outDate = inputCheckout.value.slice(10, 12)

    outTd.forEach(function(t) {
        if (t.getAttribute("value") !== null) {
            let tYear = t.getAttribute("value").slice(0, 4);
            let tMonth = t.getAttribute("value").slice(6, 8);
            let tDate = t.getAttribute("value").slice(10, 12);
            if ((parseInt(`${tYear}${tMonth}${tDate}`) - parseInt(`${inYear}${inMonth}${inDate}`)) >= 0 && 
            ((parseInt(`${tYear}${tMonth}${tDate}`) - parseInt(`${outYear}${outMonth}${outDate}`)) <= 0 )) {
                t.classList.add("check-date");
                console.log(t);
            }
        }
    })
}

function todayMark(now) {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth(); // 0 ~ 11
    const date = today.getDate();

    if (year == now.getFullYear()
    && month == now.getMonth()) {
        const td = document.querySelectorAll("td");

        const countToday = startDay -1 + date;
        const todayCell = td[countToday];
        todayCell.classList.add("todayCell");
    }
}

function selectMark() {
    
}

function current(year, month) {
    const current = document.querySelectorAll(".current");
    const currentMonth = month;

    current.forEach(function(c) {
        c.innerHTML = `${year}, ${currentMonth}`;
    })
}

function prevMonth() {
    inTbody.innerHTML = "";
    outTbody.innerHTML = "";
    year = (month == 1) ? year - 1 : year;
    month = (month == 1) ? 12 : month - 1;
    inCalendar(year, month);
    outCalendar(year, month);
    current(year, month);

    let outTd = outTbody.querySelectorAll("td");
    outMark(outTd);
}

function nextMonth() {
    inTbody.innerHTML = "";
    outTbody.innerHTML = "";
    year = (month == 12) ? year + 1 : year;
    month = (month == 12) ? 1 : month + 1;
    inCalendar(year, month);
    outCalendar(year, month);
    current(year, month);

    let outTd = outTbody.querySelectorAll("td");
    outMark(outTd);
}

function focusCalendar(target) {
    const calendar = target.querySelector(".calendar");
    const input = target.querySelector("input");
    
    calendar.classList.add("d-block");
    input.classList.add("focus");
}

function focusOutCalendar(target) {
    const calendar = target.querySelector(".calendar");
    const input = target.querySelector("input");

    calendar.classList.remove("d-block");
    input.classList.remove("focus");
}

function init() {
    const input = document.querySelectorAll("input")
    input.forEach(function(i){
        i.onclick = function(e) {
            let target = e.target.parentElement;
            focusCalendar(target);

            if (target.nextElementSibling !== null ) {
                const nTarget = target.nextElementSibling;
                nTarget.onclick = function(e) {
                    focusOutCalendar(target);
                }
            } else {
                const pTarget = target.previousElementSibling;
                pTarget.onclick = function(e) {
                    focusOutCalendar(target);
                }
            }
        }
    })

    
    inCalendar(year, month);
    outCalendar(year, month);
    todayMark(now);
    current(year, month);
    
    // inputCheckin.addEventListener("focusin", focusCalendar);
    // inputCheckout.addEventListener("focusin", focusCalendar);
}

init();