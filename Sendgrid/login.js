const name = document.getElementById("name");
const email = document.getElementById("email");
const form = document.getElementById("form");
const errorElement = document.getElementById("error");

form.addEventListener('submit', (e) => {
    let messages = [];
    if (email.value === '' || email.value === null) {
        messages.push('Email is required');
    }

    if (messages.length > 0) {
        e.preventDefault();
        errorElement.innerText = messages.join(', ');
    }
    
})


//code for connecting to CockroachDB
// const { Client } = require('pg')
// DATABASE_URL = "postgresql://aditya:E_96sxFnQeXCLBRdcYWNEQ@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster=karmic-kakapo-1943";
// const client = new Client(process.env.DATABASE_URL)

// client.connect()

// (async () => {
//     const client = new Client(process.env.DATABASE_URL);
  
//     const statements = [
//       // CREATE the messages table
//       "CREATE TABLE IF NOT EXISTS messages (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), message STRING)",
//       // INSERT a row into the messages table
//       "INSERT INTO messages (message) VALUES ('Hello world!')",
//       // SELECT a row from the messages table
//       "SELECT message FROM messages",
//     ];
  
//     try {
//       // Connect to CockroachDB
//       await client.connect();
//       for (let n = 0; n < statements.length; n++) {
//         let result = await client.query(statements[n]);
//         if (result.rows[0]) { console.log(result.rows[0].message); }
//       }
//       await client.end();
//     } catch (err) {
//       console.log(`error connecting: ${err}`);
//     }
  
//     // Exit program
//     process.exit();
//   })().catch((err) => console.log(err.stack));
