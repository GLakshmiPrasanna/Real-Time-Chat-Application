import User from '../model/User.js'

export const addUser=async (req,res)=>{
    await User.findOne({ sub: req.body.sub})
        .then(async (exist) => {
            if(exist){
                return res.status(400).json({
                    message: 'User already exists'
                });
            }
            const newUser=new User(req.body);
            await newUser.save();
            return res.status(200).json(newUser);
        }).catch((error) => {
            return res.status(400).json({
                message: error.message
            });
        })
}

export const getUsers=async (req, res)=>{
    await User.find()
      .then(async (users) => {
            return res.status(200).json(users);
        }).catch((error) => {
            return res.status(400).json({
                message: error.message
            });
        })
}
