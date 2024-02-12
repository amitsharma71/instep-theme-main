import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allCategoryList } from "../../../Redux/action/getCategoryAction";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AllCategories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allcatgorydata = useSelector(
    (state) => state?.getcategorylistdata?.listdata?.data
  );

  const productClicks = (categoryId) => {
    console.log(categoryId, "sfdsfd");
    navigate(`/category/${categoryId}`);
  };

  useEffect(() => {
    dispatch(allCategoryList());
  }, []);
  return (
    <>
      <Container>
        <div className="slider_col margin_bottom" style={{ height: "100vh" }}>
          <Row>
            <Col lg={12}>
              {/* <h2 className="ourtopcategories_home margin_bottom"></h2> */}
              <div className=" margin_bottom">
                <Row>
                  {allcatgorydata &&
                    allcatgorydata?.map((item, index) => {
                      console.log(item, "Gdsgdsgd");
                      const categoryId = item?._id;
                      return (
                        <Col lg={2} className="catborder_align margin_bottom">
                          <div key={index}>
                            <Card>
                              <div
                                className="top_catcard"
                                onClick={() => productClicks(categoryId)}
                              >
                                <div className="pos_catimage">
                                  <img
                                    className="topcatimage_home"
                                    src={`http://localhost:5000/categoryimg/${item.images}`}
                                    alt=""
                                  />
                                </div>
                                <p>{item?.category}</p>
                              </div>
                            </Card>
                          </div>
                        </Col>
                      );
                    })}
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default AllCategories;
