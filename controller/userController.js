const User = require('../model/userModel')

exports.createUser = async(req,res) =>{
    let { name, parentId , earnings} = req.body;

    try {
        let parentUser = null;
        if(parentId) {
            parentUser = await User.findById(parentId);
            if (!parentUser) {
                return res.status(400).json({ error: 'Parent user not found' });
            }
        }

        let newUser = new User({
            name,
            parentId: parentId || null,
            earnings: earnings || 0
        });

        await newUser.save();
        res.status(200).json(newUser);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.distributeEarnings = async(req,res) =>{
    const {userId , earnings} = req.body;

    try {
       let totalEarning = earnings

       let userData = await User.findById(userId)
       console.log(userData.parentId)

       let allUsers = [userData]

        function calculateEarning(parentLevel) {
                let amount = 0
                if(parentLevel == 1){
                    amount = earnings * 0.2
                    totalEarning -= amount
                }else if(parentLevel == 2){
                    amount = earnings * 0.1
                    totalEarning -= amount
                }else if(parentLevel == 3){
                    amount = earnings * 0.05
                    totalEarning -= amount
                }else if(parentLevel < 9){
                    amount = earnings * 0.01
                    totalEarning -= amount
                }
                return amount
        }

       for(i=0;i<8;i++){
          if(allUsers[i].parentId == null){
            break;
          }
          let parentData = await User.findById(allUsers[i].parentId)
          parentData.earnings+= calculateEarning(i+1)
          allUsers.push(parentData)
          await parentData.save()
       }

       userData.earnings += totalEarning
       await userData.save()
       res.status(200).json(allUsers);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getUsers = async(req,res)=>{
    const user = await User.find()
    res.status(200).json(user)
}