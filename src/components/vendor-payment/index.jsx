"use client";
import { useContext, useState } from "react";
import { Checkbox, Col, Input, Row, Button } from "antd";
import {
  CustomBoldText,
  CustomCol,
  CustomExtraSmText,
  CustomInput,
  CustomPayBoldCol,
  CustomPayCol,
  CustomPayGreyRow,
  CustomText,
  CustomVendorCol,
  CustomVendorRow,
  StyledHr,
  ContentRow,
  BbCol,
  StrCol,
} from "./styledComponent.jsx";
import {
  SubmitButton,
  CartCol,
  H2,
  H3,
  H4,
  H5,
  BodyBold,
  BodySmallReg,
  BodySmallBold,
} from "@/styles/styledComponent";
import { AuthContext } from "@/app/layout";
import { SelectPlanVendService } from "@/Services/vendorForms.services";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  StripeSubscriptionIntentService,
  updateSubscriptionMonthlyOrAnnual,
  BIZ_APPLY_COUPON,
} from "@/Services/payment.service";
import VendorSubscriptionCheckoutForm from "@/lib/commonComponent/VendorSubscriptionCheckoutForm";
import { set } from "lodash";

const PaymentDashboard = (props) => {
  const { user_id, plan_id } = props;
  const router = useRouter();
  const [sumTotal, setSumTotal] = useState(10);
  const [clientSecret, setClientSecret] = useState("");
  const [intentId, setIntentId] = useState("");
  const [vendorPayId, setVendorPayId] = useState("");
  const [planDetail, setPlanabout] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [applyButtonDisabled, setApplyButtonDisabled] = useState(true);
  // const [netAmount, setNetAmount] = useState();
  const [coupon, setCoupon] = useState("");
  const [isCouponValid, setIsCouponValid] = useState(false);
  const [isCouponError, setIsCouponError] = useState(false);
  const [couponName, setCouponName] = useState(false);
  const [isAmountOff, setIsAmountOff] = useState(false);
  const [isPercentOff, setIsPercentOff] = useState(false);
  const [amountOff, setAmountOff] = useState();
  const [percentOff, setPercentOff] = useState();
  const [savings, setSavings] = useState();
  const [selectedPlan, setSelectedPlan] = useState('');
  const [netAmount, setNetAmount] = useState(0);

  const handleCheckboxChange = (plan, amount) => {
    setSelectedPlan(plan);
    setNetAmount(amount);
  };

  const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  const stripePromise = loadStripe(stripePublishableKey);

  const appearance = {
    theme: "stripe",
    labels: "floating",
    // layout:'Tabs',

    variables: {
      fontFaily: "poppins",
      // margin:'30px',
    },

    rules: {
      ".Input": {
        // margin:'20px 0',
      },
    },
  };

  const [loadings, setLoadings] = useState([]);
  const enterLoading = async (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    const APPLY_COUPON_FORM_DATA = new FormData();

    APPLY_COUPON_FORM_DATA.append("coupon", coupon);
    APPLY_COUPON_FORM_DATA.append("vendorPayId", vendorPayId);

    const result = await BIZ_APPLY_COUPON(APPLY_COUPON_FORM_DATA);

    // console.log(
    //   "coupon api response",
    //   result?.response?.data?.response?.validity
    // );

    if (result.response.status === 200) {
      setIsCouponValid(result?.response?.data?.response?.validity);

      if (result?.response?.data?.response?.validity) {
        if (result?.response?.data?.response?.amount_off) {
          setIsAmountOff(true);
          setIsPercentOff(false);
          setAmountOff(result?.response?.data?.response?.amount_off);
          setCouponName(result?.response?.data?.response?.coupon_details?.name);
        }

        if (result?.response?.data?.response?.percent_off) {
          setIsAmountOff(false);
          setIsPercentOff(true);
          setPercentOff(result?.response?.data?.response?.percent_off);
          setCouponName(result?.response?.data?.response?.coupon_details?.name);
        }
      } else {
        setIsCouponError(true);
      }

      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }
  };

  const options = {
    clientSecret,
    appearance,
    layout: {
      type: "tabs",
      // defaultCollapsed: false,
    },
  };

  const GetSubscriptionStripeIntent = async () => {
    const FORM_DATA = new FormData();
    FORM_DATA.append("user_id", parseInt(user_id));
    FORM_DATA.append("plan_id", parseInt(plan_id));
    const response = await StripeSubscriptionIntentService(FORM_DATA);
    console.log("39 api intent api response", response);
    const clientSecret = response?.response?.data?.intent_object?.client_secret;
    const intentId = response?.response?.data?.intent_object?.intent_id;
    const vendorPayId = response?.response?.data?.vendor_payment_id;
    const planDetail = response?.response?.data?.plan_details;

    setClientSecret(clientSecret);
    setIntentId(intentId);
    setVendorPayId(vendorPayId);
    setPlanabout(planDetail);

    const amount = parseFloat(planDetail?.monthly_amount); // + parseFloat(tax)

    const monthlyAmount = parseFloat(planDetail?.monthly_amount);
    const annualAmount = parseFloat(planDetail?.annual_amount);

    const saving = (12*monthlyAmount) - annualAmount ;
    setNetAmount(amount);
    setSavings(saving); 
  };

  if (!clientSecret) {
    GetSubscriptionStripeIntent();
  }

  const handleCheckbox = async (e) => {
    if (vendorPayId) {
      updateVendorPlanAmountonCheckboxChange(vendorPayId, e.target.checked);
    }

    if (e.target.checked == true) {
      setIsChecked(true);
      const amount = parseFloat(planDetail?.annual_amount); // + parseFloat(tax)
      setNetAmount(amount);
    } else {
      const amount = parseFloat(planDetail?.monthly_amount); // + parseFloat(tax)
      setNetAmount(amount);
    }
  };

  const updateVendorPlanAmountonCheckboxChange = async (id, checkedStatus) => {
    const response = await updateSubscriptionMonthlyOrAnnual({
      vendor_pay_id: id,
      status: checkedStatus,
    });
    console.log("response API updateSubscriptionMonthlyOrAnnual", response);
    const output = response?.response?.data?.data;
    console.log("Output ==>>", output);
    //  setApiData(output);
    //  setShowTable(true);
  };

  const couponInputFunction = async (e) => {
    setCoupon(e.target.value);
    if (e.target.value) {
      setApplyButtonDisabled(false);
      setIsCouponValid(false);
      setIsCouponError(false);
      setIsAmountOff(false);
      setIsPercentOff(false);
      setAmountOff();
      setPercentOff();
    } else {
      setApplyButtonDisabled(true);
      setIsCouponError(false);
      setIsCouponValid(false);
      setIsAmountOff(false);
      setIsPercentOff(false);
      setAmountOff();
      setPercentOff();
    }
  };

  console.log("planDetail-====>",planDetail)

  return (
    <>
      <CustomVendorRow>
        <CustomVendorCol span={24}>
          <ContentRow>
            <Col>
              <CustomCol span={24}>
                <h1 style={{ fontSize: "35px", fontWeight: 700 }}>
                  Bookabalebiz {planDetail?.name}{" "}
                </h1>
              </CustomCol>

              {/* <CustomCol style={{ margin: "10px 0" }}>
                <CustomText>
                  SGD {planDetail?.monthly_amount} per month
                </CustomText>{" "} */}
                <br />
                <br />
                {/* <CustomText>
                  Bookabalebiz’s {planDetail?.name} plan to work better
                </CustomText> */}
              {/* </CustomCol> */}

              {/* <Row>
                <CustomPayCol style={{marginBottom:'10px'}}>
                  <CustomBoldText
                    style={{ color: "white", paddingLeft: "20px" }}
                  >
                    Bookablebiz {planDetail?.name}{" "}
                  </CustomBoldText>
                  <CustomText style={{ color: "white", paddingRight: "20px" }}>
                    SGD {planDetail?.monthly_amount} /month
                  </CustomText>
                </CustomPayCol>
                
                <CustomPayCol style={{marginTop:'10px'}}>
                  <CustomBoldText
                    style={{ color: "white", paddingLeft: "20px" }}
                  >
                    Bookablebiz {planDetail?.name}{" "}
                  </CustomBoldText>
                  <CustomText style={{ color: "white", paddingRight: "20px" }}>
                    SGD {planDetail?.annual_amount} /year
                  </CustomText>
                </CustomPayCol>
              </Row>
              
              <CustomPayBoldCol style={{ height: "4rem" }}>
                <CustomBoldText>
                  Subtotal
                </CustomBoldText>
                <CustomBoldText> SGD {netAmount}</CustomBoldText>
              </CustomPayBoldCol> */}




<div>
      <Row>
        <CustomPayCol style={{ marginBottom: '10px',justifyContent:'space-between' }}>
          <div style={{marginLeft:'10px'}}>
            <input
              type="checkbox"
              style={{ transform: 'scale(2)', 
                margin: '10px'}}
              checked={selectedPlan === `${planDetail?.name} (Monthly)`}
              onChange={() => handleCheckboxChange(`${planDetail?.name} (Monthly)`, planDetail?.monthly_amount)}
            />
            <CustomBoldText style={{ color: "white", paddingLeft: "5px" }}>
              Bookablebiz {planDetail?.name}{" "}
            </CustomBoldText>
          </div>

          <CustomText style={{ color: "white", paddingRight: "20px" }}>
            SGD {planDetail?.monthly_amount} /month
          </CustomText>
        </CustomPayCol>
        
        <CustomPayCol style={{ marginTop: '10px',justifyContent:'space-between' }}>
          <div style={{marginLeft:'10px'}}>
            <input
              type="checkbox"
              style={{ transform: 'scale(2)', 
                margin: '10px'}}
              checked={selectedPlan === `${planDetail?.name} (Annual)`}
              onChange={() => handleCheckboxChange(`${planDetail?.name} (Annual)`, planDetail?.annual_amount)}
            />
            <CustomBoldText style={{ color: "white", paddingLeft: "5px" }}>
              Bookablebiz {planDetail?.name}{" "}
            </CustomBoldText>
        </div>
          <CustomText style={{ color: "white", paddingRight: "20px" }}>
            SGD {planDetail?.annual_amount} /year
          </CustomText>
        </CustomPayCol>
      </Row>

      <CustomPayBoldCol style={{ height: "4rem" }}>
        <CustomBoldText>
          Subtotal
        </CustomBoldText>
        <CustomBoldText> SGD {netAmount}</CustomBoldText>
      </CustomPayBoldCol>
    </div>





              <Row>
                <Col span={10}>
                  <CustomInput
                    placeholder="Apply promo code"
                    name="coupon"
                    id="title"
                    value={coupon}
                    onChange={(e) => couponInputFunction(e)}
                  />
                  {isCouponError && (
                    <>
                      <span className="red-para">
                        {" "}
                        <h3 style={{ color: 'red' }}> Coupon is not Valid! </h3>{" "}
                      </span>
                    </>
                  )}
                </Col>

                <Col span={12}>
                  <Button
                    style={{ margin: "10px 10px 10px 10px" }}
                    type="primary"
                    disabled={applyButtonDisabled}
                    loading={loadings[0]}
                    onClick={() => enterLoading(0)}
                  >
                    Apply
                  </Button>
                </Col>
              </Row>

              {isCouponValid && (
                <>
                  {" "}
                  <h4 style={{ color: 'green' }}>
                    Coupon applied Successfully!{" "}
                  </h4>{" "}
                </>
              )}

              {isCouponValid && isAmountOff && !isPercentOff && (
                <>
                  {/* <Row>
                    <CustomPayBoldCol style={{ height: "10%" }}>
                      <p>Coupon Name {couponName}</p>
                      <CustomBoldText>  </CustomBoldText>
                    </CustomPayBoldCol>
                  </Row> */}
                  <Row>
                    <CustomPayBoldCol style={{ height: "10%" }}>
                      <CustomBoldText> Discount Amount in SGD({couponName}) </CustomBoldText>
                      <CustomBoldText> -{amountOff / 100} </CustomBoldText>
                    </CustomPayBoldCol>
                  </Row>
                </>
              )}

              {isCouponValid && !isAmountOff && isPercentOff && (
                <>
                  {/* <Row>
                    <CustomPayBoldCol style={{ height: "10%" }}>
                    <p>Coupon Name {couponName}</p>
                      <CustomBoldText> {couponName} </CustomBoldText>
                    </CustomPayBoldCol>
                  </Row> */}
                  <Row>
                    <CustomPayBoldCol style={{ height: "10%" }}>
                      <CustomBoldText> Discount({couponName}) - {percentOff}%</CustomBoldText>
                      <CustomBoldText> -{netAmount*percentOff/100} </CustomBoldText>
                    </CustomPayBoldCol>
                  </Row>
                </>
              )}
            </Col>

            <Col
              style={{
                // border: "1px solid #72959A",
                // borderRadius: "5px",
                // padding: "20px",
                height: "fit-content",
              }}
            >
              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <VendorSubscriptionCheckoutForm />
                </Elements>
              )}
            </Col>
          </ContentRow>
        </CustomVendorCol>
      </CustomVendorRow>
    </>
  );
};

export default PaymentDashboard;
