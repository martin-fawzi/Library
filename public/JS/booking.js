var check = [false, false, false, false, false, false];
var check2 = [false, false, false, false, false, false];

function hello(cell, num) {
    
    if (check[num] == true) {
        check[num] = false;
        document.getElementById(cell).style.backgroundColor = "gray";
    } else if (check[num] == false) {
        if ((check[num + 1] == true || check[num - 1] == true || empty(check)) && max(check)) {
            check[num] = true;
            document.getElementById(cell).style.backgroundColor = "black";
        }
    }
}

function hello2(cell, num) {
    
    if (check[num] == true) {
        check[num] = false;
        document.getElementById(cell).style.backgroundColor = "gray";
    } else if (check[num] == false) {
        if ((check[num + 1] == true || check[num - 1] == true || empty(check)) && max(check)) {
            check[num] = true;
            document.getElementById(cell).style.backgroundColor = "black";
        }
    }
}

function max(check){
    let count = 0;
    for (let i = 0; i < 6; i++) {
        if (check[i] == true) {
            count++;
        }
    }
    if(count<3){
        return true;
    }else{
        return false;
    }
}

function empty(check) {
    for (let i = 0; i < 6; i++) {
        if (check[i] == true) {
            return false;
        }
    }
    return true;
}
