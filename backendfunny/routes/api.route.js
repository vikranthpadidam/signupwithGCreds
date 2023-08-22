const router = require('express').Router();
const {google}=require('googleapis')

const oauth2Client=new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
)

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.post('/create-tokens',async(req,res ,next) => {
  try{
    const{code}=req.body
    res.send(code)
  //   const {tokens}=await oauth2Client.getToken(code)
  //   res.send(tokens)//refresh token should not send to frontend should store secretely in database
  }catch(error){
    next(error)
  }
})

module.exports = router;
