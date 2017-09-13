var http = require('http');
var invalid_customers = [];


http.get('http://backend-challenge-winter-2017.herokuapp.com/customers.json', (res) => {
    res.setEncoding('utf8');
    res.on('data', (body) => {
        splitJson(body);
    });
});


function splitJson(body) {
    var json = JSON.parse(body);
    var validations = json.validations;
    var customers = json.customers;

    customers.forEach((customer) => {
        validateCustomer(customer, validations);
    });

    var final_object = {
        "invalid_customers": invalid_customers
    };

    console.log(final_object);
}




function validateCustomer(customer, validations) {
    var invalid_fields = [];
    validations.forEach((validation) => {
        var thing = Object.keys(validation)[0];
        var value = customer[thing];
        if ((validation[thing])["required"] !== undefined) {
            if ((validation[thing])["required"] === true) {
                if (value != undefined);
                else {
                    invalid_fields.push(thing);
                }
            }
        }
        if ((validation[thing])["type"] !== undefined) {
            if ((validation[thing])["type"] !== typeof (value)) {
                invalid_fields.push(thing);
            }
        }
        if ((validation[thing])["length"] !== undefined) {
            if (((validation[thing])["length"])["min"] !== undefined) {
                if (((validation[thing])["length"])["min"] >= value.length) {} else {
                    invalid_fields.push(thing);
                }
            }
            if (((validation[thing])["length"])["max"] !== undefined) {
                if (((validation[thing])["length"])["max"] <= value.length) {} else {
                    invalid_fields.push(thing);
                }
            }
        }
    });

    var customerObj = {
        "id": customer["id"],
        "invalid_fields": JSON.stringify(invalid_fields)
    };

    if (invalid_fields.length > 0) {
        invalid_customers.push(customerObj);
    }
}