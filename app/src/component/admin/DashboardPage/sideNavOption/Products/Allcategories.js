import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { addcategory } from "../../../../../Redux/action/createNewCategoryAction";
import { Col, Dropdown, Row, Table } from "react-bootstrap";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { allCategoryList } from "../../../../../Redux/action/getCategoryAction";
import { toast } from "react-toastify";

const Allcategories = () => {

  const [selectedImagesforpost, setselectedImagesforpost] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const dispatch = useDispatch();

  const data = useSelector((state) => state?.getcategorylistdata?.listdata);
  console.log(data, "adat");

  const onSubmit = (values) => {
    console.log(values, "gpoalpk");
    var formData = new FormData();
    // const payload = {
    //   category: values?.category,
    //   image: selectedImagesforpost,

    // }
    // console.log(payload, "payload")
if(selectedImagesforpost){

  formData.append("images", selectedImagesforpost);
}
    formData.append("userData", JSON.stringify(values.category))
  console.log(JSON.parse(formData.getAll("userData")), "ssssssssssssssss");
    // console.log([...formData.entries()], 'ssssssssssssssss');


    dispatch(addcategory(formData)).then((res) =>
      console.log(res, "Response from dispatch")
    );
  };

  // const onSubmit = (values) => {
  //   // console.log(values, imgupload, "dddd");
  //   var formData = new FormData();

  //   const payload = {
  //     category: values?.category,
  //     image: selectedImagesforpost,

  //   }


  //   formData.append("images", selectedImagesforpost);

  //   formData.append("userData", JSON.stringify(payload));

  //   console.log(JSON.parse(formData.getAll("userData")), "data");
  //   dispatch(addcategory(formData)).then((res) =>
  //     console.log(res, "Response from dispatch")
  //   );

  //   toast.success("Successfully !", {
  //     position: toast.POSITION.TOP_RIGHT,
  //   });


  // };
  useEffect(() => {
    dispatch(allCategoryList());
  }, []);
  const handleImgeFile = (e) => {
    const files = e.target.files;
    const uniqueId = Date.now();
    let name = e.target.files[0].name;
    const filename = uniqueId + "_" + name;

    let file = new File(files, filename);
    setselectedImagesforpost(file);
    // images  which is upoads
    let imagesArray = [];
    // Iterate through the selected files again to read and display them as previews
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        imagesArray.push(event.target.result);
        if (imagesArray.length === files.length) {
          setSelectedImages([imagesArray]);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };
  console.log(selectedImagesforpost, "forssssssssss post")
  const deleteimage = (index) => {
    let imagedataArray = [...selectedImagesforpost];
    let showimageArray = [...selectedImages];
    imagedataArray.splice(index, 1);
    showimageArray.splice(index, 1);
    setSelectedImages(showimageArray);
    setselectedImagesforpost(imagedataArray);
  };


  return (
    <>
      <Row>
        <div className="admin_toppadding ">
          <Col className="Admin_dashboard " lg={12}>
            <h3> Categories</h3>
          </Col>
        </div>
      </Row>
      <Row>
        <Col lg={8}>
          <div className="categoryadd_new margin_bottom">
            <div className="leftcategory_add">
              <Form
                onSubmit={onSubmit}
                // initialValues={sxsszs}
                // validate={validate}
                render={({
                  handleSubmit,
                  form,
                  submitting,
                  pristine,
                  valuess,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="category_item margin_bottom">
                      <Field
                        className="ctegorysearc_h"
                        name="category"
                        component="input"
                        type="text"
                        placeholder="category"
                        required
                      />
                      <div className="buttons">
                        {/* <button className="addcatsubit_button" type="submit">
                          Submit
                        </button> */}
                      </div>
                    </div>
                    {/* <div className="category_item"> */}
                    <div className="margin_bottom">
                      <h4>Upload image</h4>
                      <div>
                        <input
                          name="images"
                          type="file"
                          className="form-control signup_form_input margin_bottom"
                          onChange={handleImgeFile}
                        />
                        {selectedImages?.length > 0 && (
                          <div>
                            <h4>Selected Images:</h4>
                            <ul className="row">
                              {selectedImages?.map((imageUrl, index) => (
                                <li
                                  key={index}
                                  className=" productupload_item col-md-3"
                                >
                                  <img
                                    className="productupload_image"
                                    src={imageUrl}
                                    alt={`Image ${index}`}
                                  />
                                  <p
                                    className="addimagecncel_icon"
                                    onClick={() => {
                                      deleteimage(index);
                                    }}
                                  >
                                    {/* <MdCancel className="cancelicon_addproduct" /> */}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="buttons">
                        <button className="addcatsubit_button" type="submit">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <div className="categoryadd_new">
            <Table responsive="md">
              <thead>
                <tr>
                  <th>S/L</th>
                  <th> Category Name</th>
                  <th className="d-flex justify-content-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((e, i) => {
                    return (
                      <tr>
                        <td>{i + 1}</td>
                        <td>{e.category}</td>
                        <td className="d-flex justify-content-end">
                          <Dropdown>
                            <Dropdown.Toggle
                              variant=""
                              id="dropdown-basic"
                              className="focusotoggle"
                            >
                              <BiDotsVerticalRounded className="threedot_tog_gle" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              {/* <Dropdown.Item href="#/action-1">
                        {" "}
                        <LuEdit3 /> Edit
                      </Dropdown.Item> */}
                              <Dropdown.Item href="#/action-2">
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    );
                  })}
                {/* <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td className="d-flex justify-content-end">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant=""
                        id="dropdown-basic"
                        className="focusotoggle"
                      >
                        <BiDotsVerticalRounded className="threedot_tog_gle" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                         <Dropdown.Item href="#/action-1">
                        {" "}
                        <LuEdit3 /> Edit
                      </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr> */}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Allcategories;
