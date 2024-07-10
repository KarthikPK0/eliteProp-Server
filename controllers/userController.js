const users = require('../models/userModel')
 

const jwt = require('jsonwebtoken')

//register logic
exports.registerController = async (req,res) => {
    console.log('Inside register function');
     const {username,email,password} = req.body
     console.log(username,email,password);
     
     try{
        const existingUser = await users.findOne({email})
        if(existingUser){
          res.status(406).json('Account already exist!! Please login')
        }else{
          const newUser = new users({
          username,email,password
          })
          await newUser.save()
          res.status(200).json(newUser)

        }
      
     }catch(err){
        res.status(401).json(err)
     }

     
} 

//login logic
exports.loginController = async (req,res) => {
  console.log('Inside loginController');
  const {email,password} = req.body
  console.log(email,password);
  
  try{
  const existingUser = await users.findOne({
    email,password
  })
  if(existingUser){
    token = jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)

    res.status(200).json({
      user:existingUser,
      token

    })
  }else{
   res.status(404).json("Invalid Email / Password...")
  }

  }catch(err){
    res.status(401).json(err)
  }

}

// to fetch user details by userId
exports.getUserDetailsById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ username: user.username });  
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

