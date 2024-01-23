import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homecategory } from "../../../Redux/action/categoryWiseAction";
import { Link, useParams } from "react-router-dom";
import { Accordion, Card, Col, Container, Row } from "react-bootstrap";
import Subcaregoryfilter from "./SubcaregoryMobilefilter";
import { BiChevronRight } from "react-icons/bi";
import SubCategoryfilter from "./subCategoryfilter";
import { AllFilterationData } from "../../../Redux/action/allFilterationAction";
import { BsFillHeartFill } from "react-icons/bs";
import Spinner from "../loader/spinner";

const Homecategory = () => {
  // const { subcategoryid } = props;
  // console.log(subcategoryid, "propsid");

  const dispatch = useDispatch();

  const { categoryName, subcategoryName } = useParams();

  console.log(categoryName, "ddasasasasas");

  const loading = useSelector((state) => state?.homecategory?.isLoading);

  const filterbyPrice = useSelector(
    (state) => state?.filterationalltype?.listdata?.data
  );
  console.log(filterbyPrice, "filterbyPrice");

  // const filterbyPrice1 = useSelector(
  //   (state) =>
  //     state?.filterationalltype?.listdata?.data[0]?.category[0]?.category
  // );

  // console.log(filterbyPrice1, "filterbyPriceasasa");

  const data = useSelector((state) => state?.homecategory?.listdata);
  console.log(data, "dassssssss");

  useEffect(() => {
    dispatch(homecategory(categoryName));
    dispatch(
      AllFilterationData({
        category: categoryName,
        subcategoryId: subcategoryName,
      })
    );
  }, [categoryName]);

  console.log(categoryName, "categoryNamemm");

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Container fluid>
            <div className="pt-5">
              <Row>
                <Col lg={2} md={3} sm={4}>
                  {" "}
                  <Subcaregoryfilter />
                  <SubCategoryfilter />
                </Col>
                <Col lg={10} md={9} sm={8}>
                  <div className="subcarhide">
                    <div className="subcategory_topcontent">
                      <div>
                        <Link className="home_link" to="/">
                          Home{" "}
                        </Link>
                        <BiChevronRight />
                      </div>
                    </div>
                    <div className="margin_bottom">
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </p>
                    </div>
                    <div></div>
                    <div className="righthome_filter">
                      <h4>Sort By</h4>
                      <h4>Popularity</h4>
                      <h4>Price--Low to High</h4>
                      <h4>Price--High to Low </h4>
                      <h4>Newest First </h4>
                    </div>
                  </div>
                  <Row>
                    {data &&
                      data?.map((item) => {
                        return (
                          <>
                            <div className="subcatkitechenmaindiv row margin_bottom">
                              <Col lg={4} md={4} sm={4}>
                                <div className="d-flex justify-content-end mt-2 mx-2">
                                  <BsFillHeartFill
                                    style={{ color: "#808080" }}
                                  />
                                </div>
                                <Link
                                  className="carddecorationnone_cat text_edit"
                                  reloadDocumen={true}
                                  to={`/productdetail/${item._id}`}
                                >
                                  <div>
                                    <img
                                      className="subcatkitchen_image"
                                      variant="top"
                                      // src={item?.image || item?.thumbnail}
                                      src={
                                        item?.image
                                          ? item?.image
                                          : item?.thumbnail?.split(":").length >
                                            1
                                          ? item?.thumbnail
                                          : `http://localhost:5000/uploads/${item.thumbnail}`
                                      }
                                      alt=""
                                    />
                                  </div>
                                </Link>
                              </Col>
                              <Col lg={6} md={6} sm={6}>
                                <Link
                                  className="carddecorationnone_cat text_edit"
                                  reloadDocumen={true}
                                  to={`/productdetail/${item?._id}`}
                                >
                                  <div className="p-4">
                                    <div className="subcatitem_cont">
                                      {" "}
                                      {item.title}
                                    </div>
                                    <div className="descripmob">
                                      {" "}
                                      {item?.description}
                                    </div>
                                    <div className="kit_homestarticon">
                                      {item?.rating}
                                    </div>
                                  </div>
                                </Link>
                              </Col>
                              <Col lg={2} md={2} sm={2}>
                                <Link
                                  className="carddecorationnone_cat text_edit"
                                  reloadDocumen={true}
                                  to={`/productdetail/${item?._id}`}
                                >
                                  <div className="p-4">
                                    <h5> ₹{item?.price}</h5>

                                  </div>
                                </Link>
                              </Col>
                            </div>
                          </>
                        );
                      })}
                  </Row>
                </Col>
              </Row>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default Homecategory;
