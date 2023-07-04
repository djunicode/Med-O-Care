const UserSchema = require("../models/user");
const MedicineSchema = require("../models/medicine");
require("dotenv").config();

//add medicine
const addMedicine = async (req, res) => {
  try {
    const { medicineName, frequency, countLeft } = req.body;
    const user = req.user;
    const medicine = new MedicineSchema(req.body);
    medicine.email = req.user.email
    const medicineSaved = await medicine.save();

    const updateUser = await UserSchema.findByIdAndUpdate(
      { _id: user._id },
      { $push: { medicines: medicineSaved._id } }
    );
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//delete medicine

const deleteMedicine = async (req, res) => {
  try {
    const { medicineID } = req.body;
    const deleteMedicine = await MedicineSchema.findByIdAndDelete({
      _id: medicineID,
    });
    const deleteFromUser = await UserSchema.findByIdAndUpdate(
      { _id: req.user._id },

      { $pull: { medicines: medicineID } }
    );

    res.status(200).json({
      success: true,
      data: deleteMedicine,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateCount = async (req, res) => {
  try {
    const { medicineID, count } = req.body;
    const updateCount = await MedicineSchema.findByIdAndUpdate(
      { _id: medicineID },
      { $inc: { countLeft: count } }
    );

    res.status(200).json({
        success : true,
        data : updateCount
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//get my medicine
const getMyMedicine = async(req,res) => {
    try{
        const userID = req.user._id
        const medicines = await UserSchema.findById({_id: userID}).populate("medicines").select("medicines")

        res.status(200).json({
            success : true,
            data : medicines
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message,
          });
    }
}

module.exports = {
  addMedicine,
  deleteMedicine,
  updateCount,
  getMyMedicine
};
