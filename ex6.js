const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

// GET Request
app.get("/", (req, res) => {
res.send(`
<html>
<head>
<title>Customer Survey</title>

<style>
body{
font-family: Arial;
background: linear-gradient(135deg,#6dd5ed,#2193b0);
display:flex;
justify-content:center;
align-items:center;
height:100vh;
margin:0;
}

.container{
background:white;
padding:25px;
border-radius:10px;
width:400px;
box-shadow:0 10px 20px rgba(0,0,0,0.2);
}

h2{
text-align:center;
}

label{
font-weight:bold;
margin-top:8px;
display:block;
}

input,select,textarea{
width:100%;
padding:8px;
margin-top:4px;
border-radius:5px;
border:1px solid #ccc;
}

button{
margin-top:15px;
width:100%;
padding:10px;
background:#2193b0;
color:white;
border:none;
border-radius:5px;
cursor:pointer;
}

button:hover{
background:#176b87;
}
</style>

</head>

<body>

<div class="container">

<h2>Customer Survey</h2>

<form method="POST" action="/submit">

<label>Name</label>
<input type="text" name="name" required>

<label>Email</label>
<input type="email" name="email">

<label>Phone</label>
<input type="tel" name="phone">

<label>Age</label>
<input type="number" name="age">

<label>Gender</label>
<select name="gender">
<option>Male</option>
<option>Female</option>
<option>Other</option>
</select>

<label>City</label>
<input type="text" name="city">

<label>Product Used</label>
<select name="product">
<option>Mobile App</option>
<option>Website</option>
<option>Customer Support</option>
<option>Store Visit</option>
</select>

<label>Satisfaction Level</label>
<select name="satisfaction">
<option>Very Satisfied</option>
<option>Satisfied</option>
<option>Neutral</option>
<option>Unsatisfied</option>
</select>

<label>Would you recommend us?</label>
<select name="recommend">
<option>Yes</option>
<option>No</option>
</select>

<label>Comments</label>
<textarea name="comment"></textarea>

<button type="submit">Submit Survey</button>

</form>
</div>
</body>
</html>
`);
});


// POST Request
app.post("/submit", (req, res) => {

const {name,email,phone,age,gender,city,product,satisfaction,recommend,comment} = req.body;

res.send(`
<h2>Survey Submitted Successfully</h2>

<p><b>Name:</b> ${name}</p>
<p><b>Email:</b> ${email}</p>
<p><b>Phone:</b> ${phone}</p>
<p><b>Age:</b> ${age}</p>
<p><b>Gender:</b> ${gender}</p>
<p><b>City:</b> ${city}</p>
<p><b>Product Used:</b> ${product}</p>
<p><b>Satisfaction:</b> ${satisfaction}</p>
<p><b>Recommend:</b> ${recommend}</p>
<p><b>Comment:</b> ${comment}</p>

<br>
<a href="/">Submit Another Response</a>
`);
});

app.listen(PORT, () => {
console.log("Server running at http://localhost:3000");
});