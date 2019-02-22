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

$(`#name`).change(function(event){
    let nameInput = this.value; 
    const nameRegex = /^$|\s+/;
    if (regexParser(nameInput, nameRegex)){
        warningMessage(event)
    } else {
        validatedMessage(event)
    }
});

// function to pass regex and form element
function regexParser(pattern, string) {
    return pattern.test(string)
}

// function to pass produce form warnings
function warningMessage(event) {

}

function validatedMessage(event) {

}
