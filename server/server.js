const express = require('express')
const http = require('http')
const mysql = require('mysql')
const cors = require('cors')
const bcrypt = require('bcrypt')
const {Server} = require('socket.io')

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'whatsapp-clone',
})

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Signup request:', { name, email });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);

    const sql = 'INSERT INTO users (`name`, `email`, `password`) VALUES (?)';
    const values = [name, email, hashedPassword];

    db.query(sql, [values], (err, data) => {
      if (err) {
        console.log('DB insert error:', err);
        return res.status(500).json({ success: false, error: err });
      }

      console.log('User created successfully:', data);
      return res.status(201).json({ success: true, message: 'User created', userId: data.insertId });
    });
  } catch (err) {
    console.log('Signup error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

app.post('/login', (req, res) => {
  const {email, password} = req.body
  const sql = 'SELECT * FROM users WHERE email = ?'

  db.query(sql, [email], (err, data) => {
    if (err) return res.status(500).json(err)
    if (data.length === 0)
      return res.status(401).json({success: false, message: 'Email not found'})
    const user = data[0]
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json(err)
      if (isMatch)
        return res.status(200).json({
          success: true,
          message: 'Successful!',
          user: {id: user.id, name: user.name, email: user.email},
        })
      else
        return res.status(401).json({success: false, message: 'Wrong passowrd'})
    })
    // if(data.length > 0)
    //     return res.json("Success")
  })
})

// io.on('connection', (socket) => {
//   const id = socket.handshake.query.id
//   socket.join(id)

//   socket.on('send-message', async ({recipients, text}) => {
//     try {
//       recipients.forEach((recipient) => {
//         const newRecipients = recipients.filter((r) => r !== id)
//         newRecipients.push(id)
//          console.log(`Sending message to ${recipient}:`, { sender: id, text })
//         socket.broadcast.to(recipient).emit('receive-message', {
//           recipients: newRecipients,
//           sender: id,
//           text,
//         })
//       })
//     } catch (err) {
//       console.log(err)
//     }
//   })
// })


io.on('connection', (socket) => {
  const id = socket.handshake.query.id
  console.log('New socket connected:', id)
  socket.join(id)

  socket.on('send-message', ({ recipients, text }) => {
    console.log('send-message received on server:', { sender: id, recipients, text })
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r)=> r !== recipient)
      newRecipients.push(id)
      console.log(`Sending message to ${recipient}`)
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients : newRecipients,
        sender: id,
        text,
      })
    })
  })
})


server.listen(8081, () => {
  console.log('listining')
})
