import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { BsTags } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { PiShoppingCartFill } from "react-icons/pi";
import { BsFillLightningFill } from "react-icons/bs";
import { addToCartAction } from "../../../Redux/action/addToCartAction";
import { getUserId } from "../../../utils/auth";
import ReactImageMagnify from "react-image-magnify";
import { singleproduct } from "../../../Redux/action/getsingleProduct";
import Spinner from "../loader/spinner";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const userData = getUserId();
  const navigate = useNavigate();
  console.log(_id, "adsdsds");
  console.log(userData, "useeeeeeeeeeeeeee");

  const productDetail = useSelector((state) => state?.singleproduct?.listdata);
  const loading = useSelector((state) => state?.singleproduct?.isLoading);
  console.log(productDetail, "sdsdsdsds");

  const cartData = useSelector((state) => state?.addToCartFile);
  console.log(cartData, "kkk");

  const [imageState, setImageState] = useState();

  useEffect(() => {
    dispatch(singleproduct({ _id }));
  }, [_id]);
  console.log(productDetail, "productDetailproductDetail");
  console.log(productDetail._id, "hhhhhhhhhhh");
  const cartClick = (asd) => {
    if (userData == null) {
      navigate("/signin");
    } else {
      let apiObject = {
        productid: productDetail._id,
        userid: userData.id,
        quantity: 1,
      };
      dispatch(addToCartAction(apiObject)).then((res) => {
        navigate("/addtocart");
      });
    }
    console.log(cartData, "added to cart");
  };

  const buyClick = (e) => {
    if (userData == null) {
      navigate("/signin");
    } else {
      navigate(`/deliverydetail/${_id}`);
    }

    // console.log(_id, "rrrr");
  };

  console.log(productDetail?.images, `wopjveddwo`);

  console.log(imageState, "wioeiwj");
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="container mainrowdata">
            <Row>
              <Col className="singlecard_posit" lg={4}>
                <Card className="shoppingcard_bor">
                  <div className="margin_bottom magni_fieralign">
                    <ReactImageMagnify
                      {...{
                        smallImage: {
                          isFluidWidth: true,
                          height: "400",
                          alt: "Wristwatch by Ted Baker London",
                          src: imageState
                            ? imageState?.split("http").length > 1
                              ? imageState
                              : `http://localhost:5000/uploads/${imageState}`
                            : productDetail?.images?.length > 0 &&
                              (productDetail?.images[0].split("http").length > 1
                                ? productDetail?.images[0]
                                : `http://localhost:5000/uploads/${productDetail?.images[0]}`),
                        },
                        largeImage: {
                          src: imageState
                            ? imageState?.split("http").length > 1
                              ? imageState
                              : `http://localhost:5000/uploads/${imageState}`
                            : productDetail?.images?.length > 0 &&
                              (productDetail?.images[0].split("http").length > 1
                                ? productDetail?.images[0]
                                : `http://localhost:5000/uploads/${productDetail?.images[0]}`),
                          width: 1200,
                          height: 1800,
                        },

                        enlargedImageContainerStyle: {
                          zIndex: 999,
                        },
                        enlargedImageContainerDimensions: {
                          width: 750,
                          height: 450,
                        },
                      }}
                    />
                  </div>
                  {productDetail?.images && (
                    <>
                      <div className="main_image">
                        {productDetail?.images?.map((item, index) => {
                          if (item) {
                            return (
                              <img
                                key={index}
                                className="subphotof_main"
                                src={
                                  item?.split("https").length > 1
                                    ? item
                                    : `http://localhost:5000/uploads/${item}`
                                }
                                onMouseEnter={() => setImageState(item)}
                                alt=""
                              />
                            );
                          }
                        })}
                      </div>
                    </>
                  )}
                  <Card.Body>
                    <Card.Text>
                      <div className="mainimg_button">
                        <div className="twobuttondiv">
                          {" "}
                          <Button
                            className="addtocart_button"
                            onClick={() => {
                              cartClick();
                            }}
                          >
                            <div>
                              <PiShoppingCartFill className="buy_Addicon" />
                              ADD TO CART
                            </div>
                          </Button>
                        </div>
                        {}
                        <div className="twobuttondiv">
                          <Button
                            className="bynow_button"
                            data-bs-target="#collapseOne"
                            onClick={() => buyClick()}
                          >
                            <BsFillLightningFill className="buy_Addicon" /> BUY
                            NOW
                          </Button>
                        </div>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={8}>
                <Card className="shoppingcard_bor">
                  <Card.Body>
                    <Card.Title>
                      <h4>{productDetail.title}</h4>
                    </Card.Title>
                    <Card.Subtitle className="mb-2">
                      <h1>₹ {productDetail?.totalprice}</h1>
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted underline_position">
                      <h5>
                        {" "}
                        ₹{productDetail?.price}{" "}
                        <span>{productDetail?.discountpercentage}%Off</span>
                      </h5>
                      <div className="underline_discount"></div>
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 discriptionoffers_product text-muted">
                      <h6> Available offers</h6>
                      <p>
                        {" "}
                        <BsTags className="validpffers_icon" />
                        <span>Bank Offer10%</span> off on Axis Bank Credit Card
                        and EMI Transactions, up to ₹1000, on orders of ₹5,000
                        and above
                        <span>T&C</span>
                      </p>
                      <p>
                        {" "}
                        <BsTags className="validpffers_icon" />
                        <span>Special Price</span>Get extra ₹15901 off (price
                        inclusive of cashback/coupon)<span>T&C</span>
                      </p>
                      <p>View 10 more offers</p>
                    </Card.Subtitle>
                    <div className="delivery_code margin_bottom">
                      <h5>Delivery</h5>
                      <div>
                        <CiLocationOn className="deliverylocationcode" />
                        <input
                          type="text"
                          placeholder="Enter Delivery Pincode"
                          className="pincode_bar"
                        />
                      </div>
                    </div>
                    <Card.Text>
                      <div className="d-flex ">
                        <h6 className=" ">Description:</h6>
                        <p className="mainpro_rightdescrip margin_bottom">
                          {productDetail.description}
                        </p>
                      </div>
                    </Card.Text>
                    <div className="d-flex ">
                      <h6>Highlights</h6>
                      <div className="d-flex px-5">
                        <ul className="specification">
                          <td>{productDetail?.brand?.[0]?.brand}</td>
                          <td>{productDetail?.category?.[0]?.category}</td>
                          <td>
                            {productDetail?.subcategory?.[0]?.subcategory}
                          </td>
                          <li>{productDetail.title}</li>
                        </ul>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
