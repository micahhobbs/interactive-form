/*
    Show/hide other job role text area
*/ 

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

$(`#colors-js-puns`).hide();

$(`#design`).change(function(){
    $(`.love-js`).show();
    $(`.js-puns`).show();
    const $designSelected = $(`#design`).val();
    if ($designSelected === `js puns`){
        $(`#colors-js-puns`).show();
        $(`.love-js`).hide();
        $(`#color option`).eq(1).prop(`selected`, true);
    } else if ($designSelected === `heart js`){
        $(`#colors-js-puns`).show();
        $(`.js-puns`).hide();
        $(`#color option`).eq(3).prop(`selected`, true);
    } else {
        $(`#color option`).eq(0).prop(`selected`, true);
        $(`#colors-js-puns`).hide();
    }
});

/*
    Activities section
*/

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
    // Display total element
    if (totalCost > 0) {
        activitiesTotalDiv.classList.remove(`is-hidden`)
        activitiesWarningMessage.textContent = ``;
        activitiesP.textContent = `Total Amount: $${totalCost}`
    } else {
        activitiesTotalDiv.classList.add(`is-hidden`)
    }
}); 

/*
    Payment info section
*/

$(`#paypal, #bitcoin`).hide();

// Show / hide relevent payment method sections
$(`#payment`).change(function() {
    if ($(this).val() === `paypal`) {
        $(`#credit-card`).hide();
        $(`#bitcoin`).hide();
        $(`#paypal`).show();
    } else if ($(this).val() === `bitcoin`) {
        $(`#credit-card`).hide();
        $(`#paypal`).hide();
        $(`#bitcoin`).show(); 
    } else {
        $(`#credit-card`).show();
        $(`#paypal`).hide();
        $(`#bitcoin`).hide();
    }
});

/*
    Form validation
*/
    
    // Create Activity warning message elements
    const activitiesWarningMessage = document.createElement(`p`);
    activitiesTotalDiv.appendChild(activitiesWarningMessage);

$(`form`).submit(function(event){

    // Validate name field not blank
    const nameRegex = /^$|\s+/;
    const nameInput = $(`#name`).val()
    if (nameRegex.test(nameInput)){
        event.preventDefault();
        $(`#name`).css(`border`, `2px solid red`);
    } else {
        event.preventDefault();
        $(`#name`).css(`border`, ``);
    }

    // Validate email address
    const emailRegex = /^\w*@\w*\.com$/;
    const emailInput = $(`#mail`).val()
    if (emailRegex.test(emailInput)){
        event.preventDefault();
        $(`#mail`).css(`border`, ``);
    } else {
        event.preventDefault();
        $(`#mail`).css(`border`, `2px solid red`);
    }

    // Check user selected at least one activity checkbox
    if ($(`.activities input[type=checkbox]:checked`)) {
        activitiesWarningMessage.textContent = `Please selection at least 1 activity`; 
    }

    // If payment credit card
    // Make sure CC number between 13 and 15
    const ccNumRegex = /^\d{13,16}$/;
    const ccNumInput = $(`#cc-num`).val();
    if (ccNumRegex.test(ccNumInput)) {
        $(`#cc-num`).css(`border`, ``);
    } else {
        $(`#cc-num`).css(`border`, `2px solid red`);
    }

    // Zip code is a 5 digit number
    const ccZipRegex = /^\d{3,5}$/;
    const ccZipInput = $(`#zip`).val();
    if (ccZipRegex.test(ccZipInput)) {
        $(`#zip`).css(`border`, ``);
    } else {
        $(`#zip`).css(`border`, `2px solid red`);
    }

    const ccCVVRegex = /^\d{3}$/;
    const ccCVVInput = $(`#cvv`).val();
    if (ccCVVRegex.test(ccCVVInput)) {
        $(`#cvv`).css(`border`, ``);
    } else {
        $(`#cvv`).css(`border`, `2px solid red`);
    }

});

