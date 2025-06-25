const jwt = require('jsonwebtoken')
const secret = 'Hello@!2Sanjett@12'
const setUser = (user) => {
  return jwt.sign({_id: user._id, email: user.email, role: user.role},secret);
};

const getUser = (token) => {
 try{
  return jwt.verify(token, secret)
 }catch(err){
  return null;
 }
};

module.exports = {
  getUser,
  setUser,
};
