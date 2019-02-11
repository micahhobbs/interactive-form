


/*
    Show/hide other job role text area
*/ 

// Hide by default on load
$(`#other-title, label[for="other-title"]`).hide();

$(`#title`).change(function(){
    const jobTitle = $(`#title`).val();
    if (jobTitle === `other`) {
        $(`#other-title, label[for="other-title"]`).show();
    } else {
        $(`#other-title, label[for="other-title"]`).hide();
    }
});


/*
    Configure t-shirt info section options
*/ 



