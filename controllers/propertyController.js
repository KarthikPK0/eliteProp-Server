const properties = require('../models/propertyModel')
const users = require('../models/userModel');

  //addproperty
exports.addPropertyController = async (req,res) => {
   console.log("Inside addPropertyController");
   const {location,propertyType,purpose,price,contactNo,title,description} = req.body
   const userId = req.payload
   const propertyImg = req.file.filename
   console.log(location,propertyType,purpose,price,contactNo,title,description,userId,propertyImg);

   try{
       const newProperty = new properties({
         location,propertyType,purpose,price,contactNo,title,description,propertyImg,userId
       })
       await newProperty.save()
       res.status(200).json(newProperty)
   }catch(err){ 
       res.status(401).json(err)
   }
   
}
  //getallproperty
exports.getAllPropertyController = async (req, res) => {
   console.log('Inside getAllPropertyController');
   const { type, location } = req.query;  
   try {
      let query = {};
      if (type) query.propertyType = type;  
      if (location) query.location = location;  

      const allProperties = await properties.find(query);
      res.status(200).json(allProperties);

   } catch (err) {
      console.error('Error fetching properties:', err);
      res.status(500).json({ error: 'Server error' });
   }
}
  //getuserproperty
exports.getUserPropertyController = async (req, res) => {
   console.log('Inside getUserPropertyController');
   const userId = req.payload;
   const { purpose } = req.query; 
   try {
     let query = { userId };
     if (purpose) query.purpose = purpose;  
 
     const allProperties = await properties.find(query);
     res.status(200).json(allProperties);
   } catch (err) {
     console.error('Error fetching properties:', err);
     res.status(500).json({ error: 'Server error' });
   }
 }
 
  //get property by ID
exports.getPropertyByIdController = async (req, res) => {
   const { id } = req.params;
 
   try {
     const property = await properties.findById(id);
     if (!property) {
       return res.status(404).json({ message: 'Property not found' });
     }
 
     
     const user = await users.findById(property.userId);
     if (!user) {
       return res.status(404).json({ message: 'User not found' });
     }
 
     res.status(200).json({
       property: {
         ...property.toObject(),
         username: user.username  
       }
     });
   } catch (error) {
     console.error('Error fetching property details:', error);
     res.status(500).json({ message: 'Server error' });
   }
 };

 //edit property
 exports.editPropertyController = async (req,res) => {
   console.log('Inside editPropertyController');
   const  {pid} = req.params

   const {location,propertyType,purpose,price,contactNo,title,description,propertyImg} = req.body

   const uploadImg = req.file?req.file.filename:propertyImg
   const userId = req.payload

   try{
      const updatedProperty = await properties.findByIdAndUpdate({_id:pid},{
         location,propertyType,purpose,price,contactNo,title,description,propertyImg:uploadImg,userId 
      },{new:true}) 

      await updatedProperty.save()

      res.status(200).json(updatedProperty)


   }catch(err){
      res.status(401).json(err)
   }

 }

  //remove property
  exports.removePropertyController = async (req,res) => {
   console.log('Inside removePropertyController');
   const {pid} = req.params
   try{
      const removedProperty = await properties.findByIdAndDelete({_id:pid})
      res.status(200).json(removedProperty)
      
   }catch(err){
      res.status(401).json(err)
   } 
  }





