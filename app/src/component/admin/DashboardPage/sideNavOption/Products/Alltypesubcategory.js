import React from "react";
import { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { allCategoryList } from "../../../../../Redux/action/getCategoryAction";
import { Button, Col, Row, Spinner, Table } from "react-bootstrap";
import { allSubCategoryList } from "../../../../../Redux/action/getSubcategoryAction";
import {
  removeFromTypeSubcategory,
  typesubcategoryget,
  typesubcategorypost,
} from "../../../../../Redux/action/typesubcatpost";
import Allpagination from "../../../Pagination/pagination";
import { MdDelete } from "react-icons/md";
import Delete from "../../../deleteModel/delete";
import { ToastContainer, toast } from "react-toastify";
import { FiSearch } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
const Alltypesubcategory = () => {
  const dispatch = useDispatch();
  const [selectedsubCategoryId, setselectedsubCategoryId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // State to store the selected category
  const [searchQuery, setSearchQuery] = useState("");

  console.log(selectedCategoryId, "cdcdcd");
  const listCount = useSelector(
    (state) => state?.typesubcategory?.typesublist?.data?.totalDocs
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);
  const getscat = useSelector(
    (state) => state?.getcategorylistdata?.listdata?.data
  );

  // const getsubcat = useSelector(
  //   (state) => state?.getsubsategorylistdata?.listdata?.data
  // );

  const getsubcate = useSelector(
    (state) => state?.getsubsategorylistdata?.listdata?.data
  );

  const typesubcatgory = useSelector(
    (state) => state?.typesubcategory?.typesublist?.data?.data
  );
  const isLoading = useSelector((state) => state?.typesubcategory?.isLoading);
  console.log(typesubcatgory, "typesubcatgory");

  useEffect(() => {
    dispatch(allCategoryList());
    if (selectedCategoryId) {
      dispatch(allSubCategoryList({ category_id: selectedCategoryId }));
    }
    dispatch(allSubCategoryList());

    dispatch(
      typesubcategoryget({
        search: searchQuery,
        page: currentPage,
        perPage: postPerPage,
      })
    );
  }, [currentPage, searchQuery]);

  console.log(selectedCategoryId, "selectedCategoryId");

  const handleCategoryChange = (event) => {
    const selectedId = event.target.value;
    setSelectedCategoryId(selectedId);

    const selectedLabel =
      getscat.find((i) => i._id === selectedId)?.category || "";
    setSelectedCategory(selectedLabel);
    // if (selectedCategoryId) {
    dispatch(allSubCategoryList({ category_id: event.target.value }));
    // }
  };
  var selectedId;
  const handleCategoryChange2 = (event) => {
    selectedId = event.target.value;
    setselectedsubCategoryId(selectedId);
  };
  console.log(
    selectedsubCategoryId,
    "selectedSubcategoryId",
    selectedCategoryId
  );

  const onSubmittype = (value, form) => {
    console.log(form, "dssdsdsS");

    let typesub = {
      category_id: selectedCategoryId,
      subcategory_id: selectedsubCategoryId,
      typesubcategory: value.typesubcategory,
    };
    dispatch(typesubcategorypost(typesub)).then((res) => {
      if (res.payload.data.sucess) {
        dispatch(typesubcategoryget());
        toast.success("Successfuly added");
        form.reset();
        setselectedsubCategoryId("");
      }
    });
  };

  const handleClose = () => setShow(false);

  const handleDelete = (id) => {
    dispatch(removeFromTypeSubcategory({ typesubcategory_id: id })).then(
      (res) => {
        if (res?.payload?.data?.success) {
          dispatch(
            typesubcategoryget({
              search: searchQuery,
              page: currentPage,
              perPage: postPerPage,
            })
          );
        }
        handleClose();
        toast.warning("Successfully Deleted !", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    );
  };

  const [show, setShow] = useState(false);
  const [categoryid, setCategoryid] = useState(null);
  const handleShow = (id) => {
    setCategoryid(id);
    setShow(true);
  };

  const handleSearch = () => {
    if (searchQuery) {
      dispatch(typesubcategoryget({ search: searchQuery }));
    } else {
      dispatch(
        typesubcategoryget({
          search: "",
          page: currentPage,
          perPage: postPerPage,
        })
      );
    }
  };

  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };
  return (
    <div>
      {" "}
      <Row>
        <Col lg={12}>
          <div className="admin_toppadding ">
            <Col className="Admin_dashboard " lg={12}>
              <h3> Add New TypeSubcategory</h3>
            </Col>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <Form
            onSubmit={onSubmittype}
            initialValues={{}}
            render={({ handleSubmit, form, submitting, pristine }) => (
              <form onSubmit={handleSubmit}>
                <div className="cat_select">
                  <div>
                    <Field name="xyz">
                      {({ input, meta }) => (
                        <select
                          {...input}
                          className="subcategory_drop margin_bottom"
                          onChange={(e) => {
                            input.onChange(e);
                            handleCategoryChange(e);
                          }}
                          // value={selectedCategoryId}
                        >
                          <option value="">Select a category</option>
                          {getscat?.map((i) => (
                            <option name="option" key={i._id} value={i._id}>
                              {i.category}
                            </option>
                          ))}
                        </select>
                      )}
                    </Field>
                  </div>
                </div>
                <div className="cat_select">
                  <div>
                    <select
                      className="subcategory_drop margin_bottom"
                      onChange={handleCategoryChange2}
                      value={selectedsubCategoryId}
                    >
                      <option value="">Select a subcategory</option>
                      {getsubcate?.map((i) => (
                        <option name="option" key={i._id} value={i._id}>
                          {i.subcategory}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-2">
                  <Field
                    className="subcategory_drop"
                    name="typesubcategory"
                    component="input"
                    type="text"
                    placeholder="typesubcategory"
                    required
                    maxLength={40}
                  />
                </div>
                <div className="d-flex justify-content-end margin_bottom">
                  <button type="submit" className="addcatsubit_button">
                    Submit
                  </button>
                </div>
              </form>
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <div className="categoryadd_new margin_bottom">
            <div className="form_control_or_btngroup">
              <div className="all_product_search ">
                <FiSearch className="allproduct_searchicon " />
                <input
                  type="search"
                  className=" mr-sm-2 adminsearch_bar"
                  value={searchQuery}
                  onKeyDown={onKeyDownHandler}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                />
              </div>
              {/* <div className="btngroup">
                <Button className="select_button " type="submit" onClick={handleSearch}>
                  <AiOutlineSearch /> search
                </Button>
              </div> */}
            </div>
            {isLoading ? (
              <div className="table_Spinner">
                <Spinner animation="border" variant="dark" />
              </div>
            ) : (
              <>
                <Table responsive="md">
                  <thead>
                    <tr>
                      <th>S/L</th>
                      <th> Subcategory Name</th>
                      <th className="d-flex justify-content-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {typesubcatgory && typesubcatgory.length > 0 && (
                      <>
                        {typesubcatgory.map((e, index) => (
                          <tr key={index}>
                            <td>
                              {(currentPage - 1) * postPerPage + (index + 1)}
                            </td>
                            <td>{e.typesubcategory}</td>
                            <td>
                              <div className="d-flex justify-content-end">
                                <MdDelete
                                  className="deleteicn_forpro"
                                  onClick={() => {
                                    handleShow(e?._id);
                                  }}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </Table>
              </>
            )}
            <div className="d-flex justify-content-end">
              <Allpagination
                currentPage={currentPage}
                postPerPage={postPerPage}
                setPostPerPage={setPostPerPage}
                setCurrentPage={setCurrentPage}
                listCount={listCount}
              />
            </div>
          </div>
        </Col>
      </Row>
      {show && (
        <Delete
          handleDelete={handleDelete}
          handleClose={handleClose}
          show={show}
          categoryId={categoryid}
        />
      )}
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Alltypesubcategory;
