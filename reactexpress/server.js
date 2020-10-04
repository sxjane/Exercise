const express = require('express');
const app = express();

app.get('/api/customers', (req, res) => {
    const customers = [
        {id:1, firstname: "Jane", lastname:"Si"},
        {id:2, firstname:"Xiaojie", lastname:"Wu"},
        {id:3, firstname:"Ada",lastname:"Wu"}
    ];
    res.json(customers);
});

app.listen(5000);