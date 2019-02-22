


/*
    Show/hide other job role text area
*/ 

// Hide by default on load
$(`#other-title, label[for="other-title"]`).hide();

$(`#title`).change(function(){
    const $jobTitle = $(`#title`).val();
    if ($jobTitle === `other`) {
        $(`#other-title, label[for="other-title"]`).show();
    } else {
        $(`#other-title, label[for="other-title"]`).hide();
    }
});

/*
    Configure t-shirt info section options
*/ 

// $(`#design`).change(function(){
//     $(`option[value="cornflowerblue"],
//         option[value="darkslategrey"],
//         option[value="gold"],
//         option[value="tomato"],
//         option[value="steelblue"],
//         option[value="dimgrey"]`).show();
//     const $designSelected = $(`#design`).val();
//     if ($designSelected === `js puns`) {
//         $()
//         $(`option[value="tomato"],
//             option[value="steelblue"],
//             option[value="dimgrey"]`).hide();
//     } else if ($designSelected === `heart js`) {
//         $(`option[value="cornflowerblue"],
//         option[value="darkslategrey"],
//         option[value="gold"]`).hide();
//     } else {
//         $(`option[value="cornflowerblue"],
//         option[value="darkslategrey"],
//         option[value="gold"],
//         option[value="tomato"],
//         option[value="steelblue"],
//         option[value="dimgrey"]`).show();
//     }
// });

$(`#design`).change(function(){
    $(`.love-js`).show();
    $(`.js-puns`).show();
    const $designSelected = $(`#design`).val();
    if ($designSelected === `js puns`){
        $(`.love-js`).hide();
        $(`#color option`).eq(1).prop(`selected`, true);
    } else if ($designSelected === `heart js`){
        $(`.js-puns`).hide();
        $(`#color option`).eq(3).prop(`selected`, true);
    } else {
        $(`#color option`).eq(0).prop(`selected`, true);
    }
});


// enable/disable checkboxes 
$(`.activities input:checkbox`).change(function(){
    if ($(this).hasClass(`morning-session`)) {
        if ($(this).is(`:checked`)) {
            $(`.morning-session`).not($(this)).prop({ disabled: true, checked: false });
        } else {
            $(`.morning-session`).prop(`disabled`, false);
        }
    } else if ($(this).hasClass(`afternoon-session`)) {
        if ($(this).is(`:checked`)) {
            $(`.afternoon-session`).not($(this)).prop({ disabled: true, checked: false });
        } else {
            $(`.afternoon-session`).prop(`disabled`, false);
        }
    }
}); 

// Create running total elements and append to DOM
const activitiesSection = document.getElementsByClassName(`activities`)[0];
const activitiesTotalDiv = document.createElement(`div`);
const activitiesP = document.createElement(`p`);
activitiesTotalDiv.appendChild(activitiesP);
activitiesSection.appendChild(activitiesTotalDiv);

// Calculate total 
$(`.activities input:checkbox`).change(function(){
    let totalCost = 0;
    $(`.activities input:checkbox:checked`).each(function(){
        totalCost += parseFloat(this.value);
    });
    if (totalCost > 0) {
        activitiesTotalDiv.classList.remove(`is-hidden`)
        displayTotal(totalCost);
    } else {
        activitiesTotalDiv.classList.add(`is-hidden`)
    }
}); 

function displayTotal(totalAmount) {
    activitiesP.textContent = `Total Amount: $${totalAmount}`
}
