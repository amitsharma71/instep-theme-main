const brandtable = require("../models/brandSchema");
const subcategorytable = require("../models/subcategorytable");
const Userproducts = require("../models/ProductsSchema");
const typeofsubcategorytable = require("../models/typesubcarte");

const create_typesubcategory = async (req, res) => {
  try {
    const check_sub = await subcategorytable.find({
      category_id: req.body.category_id,
    });

    if (check_sub) {
      console.log(req.body);

      // req.body.subcategoryData.map(async (item) => {
      const typesubcategrySave = new typeofsubcategorytable({
        category_id: req.body.category_id,
        subcategory_id: req.body.subcategory_id,
        typesubcategory: req.body.typesubcategory,
      });
      const typesub_cat_data = await typesubcategrySave.save();
      res.status(200).send({
        sucess: true,
        msg: "type_subcategory details",
        data: typesub_cat_data,
      });
      // }
      // )
    } else {
      res.status(400).send({
        sucess: false,
        msg: "give me categoryid ",
        data: sub_cat_data,
      });
    }
  } catch (error) {
    res.status(400).send({ sucess: false, msg: error.message });
  }
};
const get_typesubcategory = async (req, res) => {
  if (req.body.subcategory_id) {
    try {
      const dataof = await typeofsubcategorytable.find({ subcategory_id: req.body.subcategory_id });
      res.status(200).send({ success: true, data: dataof });
    } catch (error) {
      res.status(400).send({ success: false, msg: error.message });
    }
  }  else {
    
    try {
      const page = parseInt(req.body.page); // Default to page 1
      const perPage = parseInt(req.body.perPage); // Default to 10 items per page
      const skip = (page - 1) * perPage;

      const query = typeofsubcategorytable.find({
        $or: [
          { typesubcategory: { $regex: req.body.search, $options: "i" } },
        ],
      });
      const totalDocs = await typeofsubcategorytable.countDocuments(); // Count total documents

      if (page && perPage) {
        const dataoftypesub = await query.skip(skip).limit(perPage).exec();

        if (dataoftypesub?.length > 0) {
          res
            .status(200)
            .send({ success: true, data: dataoftypesub, totalDocs: totalDocs });
        } else {
          res.status(200).send({
            success: false,
            msg: "Please provide a valid page and perPage",
            totalDocs: totalDocs,
          });
        }
      } else {
        const dataoftypesub = await query.exec();
        if (dataoftypesub?.length > 0) {
          res
            .status(200)
            .send({ success: true, data: dataoftypesub, totalDocs: totalDocs });
        } else {
          res.status(200).send({
            success: false,
            msg: "Some error occurred",
            totalDocs: totalDocs,
          });
        }
      }
    } catch (error) {
      res.status(400).send({ success: false, msg: error.message });
    }
  }

};

const delete_typesubcat = async (req, res) => {
  try {
    const typesubcategory_id = req.body.typesubcategory_id;

    if (!typesubcategory_id) {
      return res.status(400).json({
        error: "Invalid request, provide typesubcategory_id for deletion",
      });
    }

    // Assuming brandtable, Userproducts, and typeofsubcategorytable are properly defined or imported
    await brandtable.deleteMany({ type_subcategory_id: typesubcategory_id });
    await Userproducts.deleteMany({ type_subcategory_id: typesubcategory_id });
    const data = await typeofsubcategorytable.findByIdAndDelete({
      _id: typesubcategory_id,
    });

    res.status(200).json({
      success: true,
      msg: "Deleted brands, products, and typeofsubcategory",
      data: data,
    });
  } catch (error) {
    // Handle specific errors here, e.g., validation error or database error
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  create_typesubcategory,
  get_typesubcategory,
  delete_typesubcat,
};
