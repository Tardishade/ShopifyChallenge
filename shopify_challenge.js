var http = require('http');

var data;

http.get('http://backend-challenge-winter-2017.herokuapp.com/customers.json',(res) => {
    res.setEncoding('utf8');
          res.on('data', (body) => {console.log(body);
            data = body;});
        });

var json = JSON.parse(data);
var validations = json.validations;
var customers = json.customers;
var attributes = ["required", "type", "length"];
var invalid_customers = [];

function validateCustomer(customer) {
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
            if ((validation[thing])["type"] !== typeof(value)) {
                invalid_fields.push(thing);
            }
        }
        if ((validation[thing])["length"] !== undefined) {
            if(((validation[thing])["length"])["min"] !== undefined) {
                if(((validation[thing])["length"])["min"] >= value.length){}
                else {
                    invalid_fields.push(thing);
                }
            }
            if(((validation[thing])["length"])["max"] !== undefined) {
                if(((validation[thing])["length"])["max"] <= value.length){}
                else {
                    invalid_fields.push(thing);
                }
            }
        } 
    });       
    
}

customers.forEach((customer) => {
    validateCustomer(customer);    
});

var final_object = {"invalid_customers": invalid_customers};

console.log(final_object);

