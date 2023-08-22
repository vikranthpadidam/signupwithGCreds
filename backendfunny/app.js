const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();
const {OAuth2Client}=require('google-auth-library')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

const oAuth2Client=new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
)

async function verify(req,res,next){
  const authHeader=req.headers.authorization
  if(!authHeader){
    next(createError.Unauthorized())
  }
  const token = authHeader.split(' ')[1]
  const ticket =await oAuth2Client.verifyIdToken({
    idToken:token,
    audience: '1065945153182-59fkhtjn04rsftv1dqldm6pmiqcrmhdf.apps.googleusercontent.com',
  })
  const payload=ticket.getPayload()
  if(payload){
    req.userId=payload['sub']
    next()
    return
  }
  next(createError.Unauthorized())
}

app.get('/protected',verify,async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻 for protected router' });
})

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/api', require('./routes/api.route'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
