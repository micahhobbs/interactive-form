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
        activitiesP.textContent = `Total Amount: $${totalCost}`
    } else {
        activitiesP.textContent = ``;
    }
    console.log(totalCost);
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

$(`form`).submit(function(event){
    // Validate name field not blank
    const nameRegex = /([\w]+)/;
    const nameInput = $(`#name`).val()
    if (nameRegex.test(nameInput)){
        $(`#name`).css(`border`, ``);
    } else {
        event.preventDefault();
        $(`#name`).css(`border`, `2px solid red`);
    }

    // Validate email address
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailInput = $(`#mail`).val()
    if (emailRegex.test(emailInput)){
        $(`#mail`).css(`border`, `2px solid lime`);
    } else {
        event.preventDefault();
        event.preventDefault();
        $(`#mail`).css(`border`, `2px solid red`);
    }

    // Check user selected at least one activity checkbox
    if ($(`.activities input[type=checkbox]:checked`).length > 0) {
        activitiesP.textContent = ``; 
    } else {
        activitiesP.textContent = `Please select at least 1 activity`;
        event.preventDefault();
    }

    // If payment credit card
    if ($(`#payment`).val() === `credit_card`) {
        // Make sure CC number between 13 and 15
        const ccNumRegex = /^\d{13,16}$/;
        let ccNumInputValue = $(`#cc-num`).val();
        const ccNumInput = $(`#cc-num`);
        if (ccNumRegex.test(ccNumInputValue)) {
            $(`#cc-num`).css(`border`, `2px solid lime`);
        } else if (ccNumInputValue.length === 0) {
            event.preventDefault();
            $(`#cc-num`).css(`border`, `2px solid red`);
            ccNumInput.attr(`placeholder`, `Please enter a credit card number`);
        } else if (ccNumInputValue.length < 13 || ccNumInputValue.length > 16) {
            event.preventDefault();
            ccNumInput.val(``);
            $(`#cc-num`).css(`border`, `2px solid red`);
            ccNumInput.attr(`placeholder`, `Provide number between 13 and 16 digits`);
        } else {
            event.preventDefault();
            $(`#cc-num`).css(`border`, `2px solid red`);
        }
    
        // Zip code is a 5 digit number
        const ccZipRegex = /^\d{3,5}$/;
        const ccZipInput = $(`#zip`).val();
        if (ccZipRegex.test(ccZipInput)) {
            $(`#zip`).css(`border`, `2px solid lime`);
        } else {
            $(`#zip`).css(`border`, `2px solid red`);
            event.preventDefault();
        }
    
        // CVV is a 3 digit number
        const ccCVVRegex = /^\d{3}$/;
        const ccCVVInput = $(`#cvv`).val();
        if (ccCVVRegex.test(ccCVVInput)) {
            $(`#cvv`).css(`border`, `2px solid lime`);
        } else {
            $(`#cvv`).css(`border`, `2px solid red`);
            event.preventDefault();
        }
    }
});

/*
    Real time form validation - email
*/

const emailRegex2 = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
$(`#mail`).keyup(function(){   
    if (emailRegex2.test($(`#mail`).val())) {
        $(`#mail`).css(`border`, `2px solid lime`)
    } else {
        $(`#mail`).css(`border`, `2px solid red`)
    }
});