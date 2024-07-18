// import { useRouter } from "next/navigation";
// import {
//   CustomTabCol,
//   StyledTable,
//   CustomTabText,
//   CustomTabBlackText,
//   CustomTabRowButton,
// } from "./styledComponent";
// import { RegisterButton, SubmitButton } from "@/styles/styledComponent";
// import {
//   GetAllPlansService,
//   SelectPlanVendService,
//   GetExistingVendorPlan,
// } from "@/Services/vendorForms.services";
// import { useState, useEffect, useContext } from "react";
// import { AuthContext } from "@/app/layout";
// import { CheckCircleTwoTone } from "@ant-design/icons";

// const ChangePlan = () => {
//   const router = useRouter();
//   const [userId, setUserId] = useState();
//   const [apiData, setApiData] = useState({});
//   const [tableData, setTableData] = useState();
//   const [userPlan, setUserPlan] = useState();
//   const { paidPlans, setPaidPlans } = useContext(AuthContext);
//   const [existingPlan, setExistingPlan] = useState("Starter");

//   // const Data = [
//   //   {
//   //     key: "1",
//   //     features: (
//   //       <span style={{ float: "right" }}>
//   //         <CustomTabBlackText>Price</CustomTabBlackText>
//   //         <br />
//   //         <CustomTabRowButton>Monthly</CustomTabRowButton>
//   //       </span>
//   //     ),
//   //     //  starter: <CustomTabText>Free</CustomTabText>,
//   //     premium: <CustomTabText>SGD 19.96</CustomTabText>,
//   //     professional: <CustomTabText>SGD 39.92</CustomTabText>,
//   //   },
//   //   {
//   //     key: "2",
//   //     features: (
//   //       <span style={{ float: "right" }}>
//   //         <RegisterButton
//   //           style={{
//   //             background: "#ED510C",
//   //             height: "32px",
//   //             border: "1px solid #72959A",
//   //           }}
//   //         >
//   //           SAVE 25% Annual
//   //         </RegisterButton>
//   //       </span>
//   //     ),
//   //     //   starter: <CustomTabText>Free</CustomTabText>,
//   //     premium: <CustomTabText>SGD 180</CustomTabText>,
//   //     professional: <CustomTabText>SGD 360</CustomTabText>,
//   //   },
//   //   {
//   //     key: "999",
//   //     features: "",
//   //     //    starter: <span><SubmitButton onClick={() => setUserPlan("starter")} style={{height:'33px'}} >Subscribe</SubmitButton></span>,
//   //     premium: (
//   //       <span>
//   //         <SubmitButton
//   //           onClick={() => setUserPlan("premium")}
//   //           style={{ height: "33px" }}
//   //         >
//   //           Upgrade To Premium
//   //         </SubmitButton>
//   //       </span>
//   //     ),
//   //     professional: (
//   //       <span>
//   //         <SubmitButton
//   //           onClick={() => setUserPlan("professional")}
//   //           style={{ height: "33px" }}
//   //         >
//   //           Upgrade To Professional
//   //         </SubmitButton>
//   //       </span>
//   //     ),
//   //   },
//   // ];

//   // const Columns = [
//   //   {
//   //     title: "Features",
//   //     dataIndex: "features",
//   //     key: "features",
//   //     width: "50%",
//   //     className: "features",
//   //     render(text, record) {
//   //       return {
//   //         props: {
//   //           style: { background: "#E0E0E0" },
//   //         },
//   //         children: <div>{text}</div>,
//   //       };
//   //     },
//   //   },

//   //   {
//   //     title: `${apiData?.[1]?.name}`,
//   //     dataIndex: `${apiData?.[1]?.name.toLowerCase()}`,
//   //     key: `${apiData?.[1]?.name.toLowerCase()}`,
//   //     align: "center",
//   //     className: "premium",
//   //     render(text, record) {
//   //       return {
//   //         props: {
//   //           style: { background: "#FFBFBF" },
//   //         },
//   //         children: <div>{text}</div>,
//   //       };
//   //     },
//   //   },
//   //   {
//   //     title: `${apiData?.[2]?.name}`,
//   //     dataIndex: `${apiData?.[2]?.name.toLowerCase()}`,
//   //     key: `${apiData?.[2]?.name.toLowerCase()}`,
//   //     align: "center",
//   //     className: "professional",
//   //     render(text, record) {
//   //       return {
//   //         props: {
//   //           style: { background: "#D7B8FF" },
//   //         },
//   //         children: <div>{text}</div>,
//   //       };
//   //     },
//   //   },
//   // ];

//   if (existingPlan == "Premium") {
//     delete Columns[1];
//   }

//   useEffect(() => {
//     let encryptedUserId = localStorage.getItem("userId");
//     checkPageStatus(encryptedUserId);
//     getExistingPlan(encryptedUserId);
//     setUserId(encryptedUserId);
//   }, []);

//   const checkPageStatus = async (userId) => {
//     const response = await GetAllPlansService();
//     const data = response?.response?.data?.$vendorPlans;
//     const parsedData = data?.map((item) => {
//       const meta = JSON.parse(item.meta);

//       return { ...item, meta };
//     });
//     setApiData(parsedData);

//     const keys = Object.keys(parsedData[0].meta);
//     const newArr = keys
//       .map((item, index) => {
//         if (item === "description") {
//           return null; // Skip the "description" key
//         }

//         return {
//           key: `${2 + index}`,
//           features: item,
//           starter: "",
//           premium: "",
//           professional: "",
//         };
//       })
//       .filter((item) => item !== null); // Filter out null values

//     parsedData.forEach((plan, index) => {
//       const planType =
//         plan.type === "free" ? "starter" : plan.name.toLowerCase();

//       newArr[0][planType] = plan.meta.number_of_engine
//         ? plan.meta.number_of_engine.length.toString()
//         : "N/A";
//       newArr[1][planType] =
//         plan.meta.number_of_tamplate === "yes" ? "Yes" : "No";
//       newArr[2][planType] = plan.meta.number_of_resources || "N/A";
//     });

//     // Data.splice(2, 0, ...newArr);

//     // setTableData(Data);
//     // if (response.response.status === 200) {
//       // console.log("All Plans 1-->>", response)
//     // }
//   };

//   const getExistingPlan = async (userId) => {
//     const response = await GetExistingVendorPlan(userId);

//     const data = response?.response?.data?.$vendorPlan?.plan_name.toLowerCase();
//     console.log("data get existing plan vendor 153", data);
//     setExistingPlan(data);
//   };

//   useEffect(() => {
//     if (userPlan) {
//       if (userPlan === "starter") {
//         NewFun(userPlan, apiData?.[0]?.id);
//       } else if (userPlan === "premium") {
//         NewFun(userPlan, apiData?.[1]?.id);
//       } else if (userPlan === "professional") {
//         NewFun(userPlan, apiData?.[2]?.id);
//       }
//     }
//   }, [userPlan]);

//   const NewFun = async (plan, id) => {
//     if (plan === "starter") {
//       const response = await SelectPlanVendService({
//         user_id: userId,
//         plan_id: id,
//       });
//       router.push("/vendor/profile");
//     } else {
//       setPaidPlans({ user_id: userId, plan_id: id });
//       router.push("/vendor/payment?user_id=" + userId + "&plan_id=" + id);
//     }
//   };

//   // const handleSubscribe = async (plan) => {
//   //     // setUserPlan(plan);

//   //     if (plan === 'starter') {
//   //         // const planId = apiData[0]?.id
//   //         // console.log("API Data 222 -->>",apiData)
//   //         // console.log("planId ==>>", plan)
//   //         // const response = await SelectPlanVendService({"user_id": userId, "plan_id": planId });
//   //         // router.push('/dashboard');
//   //     }
//   //     else {
//   //         // const response = await SelectPlanVendService({"user_id": userId, "plan_id": planId });
//   //         console.log("clicked -->>", plan)
//   //         // router.push('/vendor/payment');
//   //     }
//   // };
//   console.log("existingPlan..", existingPlan);
//   return (
//     <>
//       <div className="plan_table" style={{ margin: "30px 10px" }}>
//         <div className="plan_table_row">
//           <div className="plan_table_col">
//             <div
//               className={
//                 existingPlan === "starter"
//                   ? "pricing-table purple add-disabled"
//                   : "pricing-table purple"
//               }
//             >
//               <div className="pricing-label">{apiData[0]?.name}</div>
//               <h2>FREE subscription</h2>
//               <div
//                 className="feature"
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "20px",
//                   opacity: "0",
//                 }}
//               >
//                 ${apiData[1]?.annual_amount}/yr
//                 <span className="red">Annual saving 25%</span>
//               </div>
//               {existingPlan === "starter" ? (
//                 <>
//                   <span className="price-button">Current Plan</span>
//                 </>
//               ) : (
//                 <>
//                   <span className="price-button">Downgrade</span>
//                 </>
//               )}
//               <div className="pricing-features">
//                 <div
//                   className="feature"
//                   style={{ display: "flex", gap: "10px" }}
//                 >
//                   <CheckCircleTwoTone style={{ float: "initial" }} /> Online
//                   booking feature &  pay-on-platform<span>Yes</span>
//                 </div>
//                 <div
//                   className="feature"
//                   style={{ display: "flex", gap: "10px" }}
//                 >
//                   <CheckCircleTwoTone style={{ float: "initial" }} />
//                   Number of store locations
//                   <span>{apiData[0]?.number_of_stores}</span>
//                 </div>
//                 <div
//                   className="feature"
//                   style={{ display: "flex", gap: "10px" }}
//                 >
//                   <CheckCircleTwoTone style={{ float: "initial" }} />
//                   Number of Booking Engine Types Per Store
//                   <span>Pay & Go only</span>
//                 </div>
//                 <div className="feature">
//                   <CheckCircleTwoTone
//                     style={{ float: "initial", marginRight: "10px" }}
//                   />
//                   Services bundling creation{" "}
//                   <ul style={{ marginLeft: "35px" }}>
//                     {apiData[0]?.meta?.number_of_engine?.map((item) => (
//                       <>
//                         {parseInt(item) === 1 && (
//                           <>
//                             <li>Pay & Go</li>
//                           </>
//                         )}
//                         {parseInt(item) === 2 && (
//                           <>
//                             <li>Open subscription (Recutting)</li>
//                           </>
//                         )}
//                         {parseInt(item) === 3 && (
//                           <>
//                             <li>Closed subscription (Non-Recutting)</li>
//                           </>
//                         )}
//                         {parseInt(item) === 4 && (
//                           <>
//                             <li>Bundling</li>
//                           </>
//                         )}
//                         {parseInt(item) === 5 && (
//                           <>
//                             <li>Appointment</li>
//                           </>
//                         )}
//                       </>
//                     ))}
//                   </ul>
//                 </div>
//                 <div
//                   className="feature"
//                   style={{ display: "flex", gap: "10px" }}
//                 >
//                   <CheckCircleTwoTone style={{ float: "initial" }} />
//                   Number of resources available for bookings  per location
//                   <span>{apiData[1]?.meta?.number_of_resources}</span>
//                 </div>
//                 <div
//                   className="feature"
//                   style={{ display: "flex", gap: "10px" }}
//                 >
//                   <CheckCircleTwoTone style={{ float: "initial" }} />
//                   Online cancellation & re-schedule booking<span>Yes</span>
//                 </div>
//                 <div
//                   className="feature"
//                   style={{
//                     display: "flex",
//                     gap: "10px",
//                     alignItems: "flex-start",
//                   }}
//                 >
//                   <CheckCircleTwoTone style={{ float: "initial" }} />
//                   Automatic notification: booking confirmation, re-scheduling
//                   booking  & cancelation of booking
//                   <span>Default Storefront</span>
//                 </div>
//                 <div
//                   className="feature"
//                   style={{
//                     display: "flex",
//                     gap: "10px",
//                     alignItems: "flex-start",
//                   }}
//                 >
//                   <CheckCircleTwoTone style={{ float: "initial" }} />
//                   Vendor management dashboard: sales, bookings, customers,
//                   service creation/edit tools, platform account management.
//                   <span>Yes</span>
//                 </div>
//                 <div className="feature">
//                   <CheckCircleTwoTone
//                     style={{ float: "initial", marginRight: "10px" }}
//                   />
//                   Payment options<br></br>
//                   <ul style={{ marginLeft: "35px" }}>
//                     <li>
//                       Credit card<span>Yes</span>
//                     </li>
//                     <li>
//                       PayNow<span>Yes</span>
//                     </li>
//                   </ul>
//                 </div>
//                 <div
//                   className="feature"
//                   style={{
//                     display: "flex",
//                     gap: "10px",
//                     alignItems: "flex-start",
//                   }}
//                 >
//                   <CheckCircleTwoTone style={{ float: "initial" }} />
//                   Commission applicable for  All online book & pay services 
//                   <span>6%</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="plan_table_col">
//             <div
//               className={
//                 existingPlan === "premium"
//                   ? "pricing-table purple add-disabled"
//                   : "pricing-table purple"
//               }
//               style={{ backgroundColor: "#D7B8FF" }}
//             >
//               <div className="pricing-label">{apiData[1]?.name}</div>
//               <h2>
//                 ${(parseFloat(apiData[1]?.annual_amount) / 12).toFixed(2)}/mo
//               </h2>
//               <div
//                 className="feature"
//                 style={{ display: "flex", alignItems: "center", gap: "20px" }}
//               >
//                 ${apiData[1]?.annual_amount}/yr
//                 <span className="red">Annual saving 25%</span>
//               </div>
//               {existingPlan === "premium" ? (
//                 <>
//                   <span className="price-button">Current Plan</span>
//                 </>
//               ) : (
//                 <>
//                   {existingPlan === "professional" ? (
//                     <>
//                       <span className="price-button">Downgrade</span>
//                     </>
//                   ) : (
//                     <>
//                       <span
//                         className="price-button"
//                         onClick={() =>
//                           NewFun(apiData[1]?.name, apiData?.[1]?.id)
//                         }
//                       >
//                         Upgrade
//                       </span>
//                     </>
//                   )}
//                 </>
//               )}

//               <div className="pricing-features">
//                 <div
//                   className="feature"
//                   style={{ display: "flex", gap: "10px" }}
//                 >
//                   <CheckCircleTwoTone style={{ float: "initial" }} />
//                   Online booking feature &  pay-on-platform<span>Yes</span>
//                 </div>
//                 <div
//                   className="feature"
//                   style={{ display: "flex", gap: "10px" }}
//                 >
//                   <CheckCircleTwoTone style={{ float: "initial" }} />
//                   Number of store locations
//                   <span>{apiData[1]?.number_of_stores}</span>
//                 </div>
//                 <div className="feature">
//                   <CheckCircleTwoTone
//                     style={{ float: "initial", marginRight: "10px" }}
//                   />
//                   Number of Booking Engine Types Per Store
//                   <ul style={{ padding: "0px", marginLeft: "35px" }}>
//                     {apiData[1]?.meta?.number_of_engine?.map((item) => (
//                       <>
//                         {parseInt(item) === 1 && (
//                           <>
//                             <li>Pay & Go</li>
//                           </>
//                         )}
//                         {parseInt(item) === 2 && (
//                           <>
//                             <li>Open subscription (Recutting)</li>
//                           </>
//                         )}
//                         {parseInt(item) === 3 && (
//                           <>
//                             <li>Closed subscription (Non-Recutting)</li>
//                           </>
//                         )}
//                         {parseInt(item) === 4 && (
//                           <>
//                             <li>Bundling</li>
//                           </>
//                         )}
//                         {parseInt(item) === 5 && (
//                           <>
//                             <li>Appointment</li>
//                           </>
//                         )}
//                       </>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="feature">
//                   <CheckCircleTwoTone
//                     style={{ float: "initial", marginRight: "10px" }}
//                   />
//                   Services bundling creation{" "}
//                   <ul style={{ marginLeft: "35px" }}>
//                     <li>
//                       Single service bundling<span>No</span>
//                     </li>
//                     <li>
//                       Mix & Match services bundling<span>No</span>
//                     </li>
//                   </ul>
//                 </div>
//                 <div
//                   className="feature"
//                   style={{ display: "flex", gap: "10px" }}
//                 >
//                   <CheckCircleTwoTone style={{ float: "initial" }} />
//                   Number of resources available for bookings  per location
//                   <span>{apiData[1]?.meta?.number_of_resources}</span>
//                 </div>
//                 <div
//                   className="feature"
//                   style={{ display: "flex", gap: "10px" }}
//                 >
//                   <CheckCircleTwoTone style={{ float: "initial" }} />
//                   Online cancellation & re-schedule booking<span>Yes</span>
//                 </div>
//                 <div
//                   className="feature"
//                   style={{ display: "flex", gap: "10px" }}
//                 >
//                   <CheckCircleTwoTone style={{ float: "initial" }} />
//                   Automatic notification: booking confirmation, re-scheduling
//                   booking  & cancelation of booking<span>Yes</span>
//                 </div>
//                 <div
//                   className="feature"
//                   style={{ display: "flex", gap: "10px" }}
//                 >
//                   <CheckCircleTwoTone style={{ float: "initial" }} />
//                   Free virtual vendor store on platform. Can upload logo and
//                   vendor store name.<span>Customisable Storefront</span>
//                 </div>
//                 <div
//                   className="feature"
//                   style={{ display: "flex", gap: "10px" }}
//                 >
//                   <CheckCircleTwoTone style={{ float: "initial" }} />
//                   Vendor management dashboard: sales, bookings, customers,
//                   service creation/edit tools, platform account management.
//                   <span>Yes</span>
//                 </div>
//                 <div className="feature">
//                   <CheckCircleTwoTone
//                     style={{ float: "initial", marginRight: "10px" }}
//                   />
//                   Payment options{" "}
//                   <ul style={{ marginLeft: "35px" }}>
//                     <li>
//                       Credit card<span>Yes</span>
//                     </li>
//                     <li>
//                       PayNow<span>Yes</span>
//                     </li>
//                   </ul>
//                 </div>
//                 <div
//                   className="feature"
//                   style={{ display: "flex", gap: "10px" }}
//                 >
//                   <CheckCircleTwoTone style={{ float: "initial" }} />
//                   Commission applicable for  All online book & pay services 
//                   <span>6%</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="plan_table_col">
//             <div
//               className={
//                 existingPlan === "professional"
//                   ? "pricing-table purple add-disabled"
//                   : "pricing-table purple"
//               }
//               style={{ backgroundColor: "#FEDB61" }}
//             >
//               <div className="pricing-label">{apiData[2]?.name}</div>
//               <h2>
//                 ${(parseFloat(apiData[2]?.annual_amount) / 12).toFixed(2)}/mo
//               </h2>
//               <div
//                 className="feature"
//                 style={{ display: "flex", alignItems: "center", gap: "20px" }}
//               >
//                 ${apiData[2]?.annual_amount}/yr
//                 <span className="red">Annual saving 50%</span>
//               </div>
//               {existingPlan === "professional" ? (
//                 <>
//                   <span
//                     className="price-button"
//                     style={{ cursor: "not-allowed" }}
//                   >
//                     Current Plan
//                   </span>
//                 </>
//               ) : (
//                 <>
//                   <span
//                     className="price-button"
//                     onClick={() => NewFun(apiData[2]?.name, apiData?.[2]?.id)}
//                   >
//                     Upgrade
//                   </span>
//                 </>
//               )}
//               <div className="pricing-features">
//                 <div
//                   className="feature"
//                   style={{ display: "flex", gap: "10px" }}
//                 >
//                   <CheckCircleTwoTone style={{ float: "initial" }} />
//                   Online booking feature &  pay-on-platform<span>Yes</span>
//                 </div>
//                 <div
//                   className="feature"
//                   style={{ display: "flex", gap: "10px" }}
//                 >
//                   <CheckCircleTwoTone style={{ float: "initial" }} />
//                   Number of store locations{" "}
//                   <span>{apiData[2]?.number_of_stores}</span>
//                 </div>
//                 <div className="feature">
//                   <CheckCircleTwoTone
//                     style={{ float: "initial", marginRight: "10px" }}
//                   />
//                   Number of Booking Engine Types Per Store
//                   <ul style={{ padding: "0px", marginLeft: "35px" }}>
//                     {apiData[2]?.meta?.number_of_engine?.map((item) => (
//                       <>
//                         {parseInt(item) === 1 && (
//                           <>
//                             <li>Pay & Go</li>
//                           </>
//                         )}
//                         {parseInt(item) === 2 && (
//                           <>
//                             <li>Open subscription (Recutting)</li>
//                           </>
//                         )}
//                         {parseInt(item) === 3 && (
//                           <>
//                             <li>Closed subscription (Non-Recutting)</li>
//                           </>
//                         )}
//                         {parseInt(item) === 4 && (
//                           <>
//                             <li>Bundling</li>
//                           </>
//                         )}
//                         {parseInt(item) === 5 && (
//                           <>
//                             <li>Appointment</li>
//                           </>
//                         )}
//                       </>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="feature">
//                   <CheckCircleTwoTone
//                     style={{ float: "initial", marginRight: "10px" }}
//                   />
//                   Services bundling creation{" "}
//                   <ul style={{ marginLeft: "35px" }}>
//                     <li>
//                       Single service bundling<span>No</span>
//                     </li>
//                     <li>
//                       Mix & Match services bundling<span>No</span>
//                     </li>
//                   </ul>
//                 </div>
//                 <div
//                   className="feature"
//                   style={{ display: "flex", gap: "10px" }}
//                 >
//                   <CheckCircleTwoTone style={{ float: "initial" }} />
//                   Number of resources available for bookings  per location
//                   <span>{apiData[2]?.meta?.number_of_resources}</span>
//                 </div>
//                 <div className="feature style={{display: 'flex', gap:'10px'}}">
//                   <CheckCircleTwoTone
//                     style={{ float: "initial", marginRight: "10px" }}
//                   />
//                   Online cancellation & re-schedule booking<span>Yes</span>
//                 </div>
//                 <div
//                   className="feature"
//                   style={{ display: "flex", gap: "10px" }}
//                 >
//                   <CheckCircleTwoTone style={{ float: "initial" }} />
//                   Automatic notification: booking confirmation, re-scheduling
//                   booking  & cancelation of booking<span>Yes</span>
//                 </div>
//                 <div
//                   className="feature"
//                   style={{ display: "flex", gap: "10px" }}
//                 >
//                   <CheckCircleTwoTone style={{ float: "initial" }} />
//                   Free virtual vendor store on platform. Can upload logo and
//                   vendor store name.<span>Customisable Storefront</span>
//                 </div>
//                 <div
//                   className="feature"
//                   style={{ display: "flex", gap: "10px" }}
//                 >
//                   <CheckCircleTwoTone style={{ float: "initial" }} />
//                   Vendor management dashboard: sales, bookings, customers,
//                   service creation/edit tools, platform account management.
//                   <span>Yes</span>
//                 </div>
//                 <div className="feature">
//                   <CheckCircleTwoTone
//                     style={{ float: "initial", marginRight: "10px" }}
//                   />
//                   Payment options{" "}
//                   <ul style={{ marginLeft: "35px" }}>
//                     <li>
//                       Credit card<span>Yes</span>
//                     </li>
//                     <li>
//                       PayNow<span>Yes</span>
//                     </li>
//                   </ul>
//                 </div>
//                 <div
//                   className="feature"
//                   style={{ display: "flex", gap: "10px" }}
//                 >
//                   <CheckCircleTwoTone style={{ float: "initial" }} />
//                   Commission applicable for  All online book & pay services 
//                   <span>6%</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ChangePlan;



































import { useRouter } from "next/navigation";
import {
  CustomTabCol,
  StyledTable,
  CustomTabText,
  CustomTabBlackText,
  CustomTabRowButton,
} from "./styledComponent";
import { RegisterButton, SubmitButton } from "@/styles/styledComponent";
import {
  GetAllPlansService,
  SelectPlanVendService,
  GetExistingVendorPlan,
} from "@/Services/vendorForms.services";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/app/layout";
import { CheckCircleTwoTone } from "@ant-design/icons";
import {Spin} from 'antd'
const ChangePlan = () => {
  const router = useRouter();
  const [userId, setUserId] = useState();
  const [apiData, setApiData] = useState([]);
  const [userPlan, setUserPlan] = useState();
  const { paidPlans, setPaidPlans } = useContext(AuthContext);
  const [existingPlan, setExistingPlan] = useState("Starter");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let encryptedUserId = localStorage.getItem("userId");
    setUserId(encryptedUserId);
    checkPageStatus(encryptedUserId);
    getExistingPlan(encryptedUserId);
  }, []);

  const checkPageStatus = async (userId) => {
    const response = await GetAllPlansService();
    const data = response?.response?.data?.$vendorPlans.map((item) => {
      const meta = JSON.parse(item.meta);
      return { ...item, meta };
    });
    setApiData(data);
  };

  const getExistingPlan = async (userId) => {
    setLoading(true);
    try{
    const response = await GetExistingVendorPlan(userId);
    const data = response?.response?.data?.$vendorPlan?.plan_name.toLowerCase();
    setExistingPlan(data);
    }
    catch(err){
      console.error("error",err);
    }
    finally{
      setLoading(false)
    }

  };

  console.log("apiData===>",apiData)

  useEffect(() => {
    if (userPlan) {
      const selectedPlan = apiData.find(plan => plan.name.toLowerCase() === userPlan);
      NewFun(userPlan, selectedPlan?.id);
    }
  }, [userPlan]);

  const NewFun = async (plan, id) => {
    setLoading(true);
    try{
      if (plan === "starter") {
        await SelectPlanVendService({ user_id: userId, plan_id: id });
        router.push("/vendor/profile");
      } else {
        setPaidPlans({ user_id: userId, plan_id: id });
        router.push(`/vendor/payment?user_id=${userId}&plan_id=${id}`);
      }
  }
  catch(err){
    console.error("error",err);
  }
  finally{
    setLoading(false)
  }
  };

  return (
    <>
    {loading ? (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spin size="large" />
    </div>
    ):(    
    <div style={{ margin: "30px 10px", display: "flex",justifyContent: 'center', gap: "20px" }}>
      {apiData.map((plan, index) => (
        <div className="plan_table_col" key={index}>
          <div className={`pricing-table purple ${existingPlan === plan.name.toLowerCase() ? "add-disabled" : ""}`} style={{ backgroundColor: index === 1 ? "#D7B8FF" : index === 2 ? "#FEDB61" : "" }}>
            <div className="pricing-label">{plan.name}</div>
            <h2>{plan.annual_amount ? `$${(parseFloat(plan.annual_amount) / 12).toFixed(2)}/mo` : "FREE subscription"}</h2>
            {plan.annual_amount && <div className="feature" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              ${plan.annual_amount}/yr
              <span className="red">Annual saving {index === 2 ? "50%" : "25%"}</span>
            </div>}
            {existingPlan === plan.name.toLowerCase() ? (
              <span className="price-button">Current Plan</span>
            ) : (
              <span className="price-button" onClick={() => NewFun(plan.name.toLowerCase(), plan.id)}>
                {existingPlan === "starter" || (existingPlan === "premium" && plan.name.toLowerCase() === "professional") ? "Upgrade" : "Downgrade"}
              </span>
            )}
            <div className="pricing-features">
              <div className="feature" style={{ display: "flex", gap: "10px" }}>
                <CheckCircleTwoTone style={{ float: "initial" }} />
                Online booking feature & pay-on-platform<span>Yes</span>
              </div>
              <div className="feature" style={{ display: "flex", gap: "10px" }}>
                <CheckCircleTwoTone style={{ float: "initial" }} />
                Number of store locations<span>{plan.number_of_stores}</span>
              </div>
              <div className="feature">
                <CheckCircleTwoTone style={{ float: "initial", marginRight: "10px" }} />
                Number of Booking Engine Types Per Store
                <ul style={{ padding: "0px", marginLeft: "35px" }}>
                  {plan.meta.number_of_engine.map((item, i) => (
                    <li key={i}>
                      {item === "1" && "Pay & Go"}
                      {item === "2" && "Open subscription (Recutting)"}
                      {item === "3" && "Closed subscription (Non-Recutting)"}
                      {item === "4" && "Bundling"}
                      {item === "5" && "Appointment"}
                      {item === "6" && "Book for Free"}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="feature">
                <CheckCircleTwoTone style={{ float: "initial", marginRight: "10px" }} />
                  Services bundling creation
                  <ul style={{  padding: "0px", marginLeft: "35px"  }}>
                    <li>
                      Single service bundling<span>{plan.name.toLowerCase() ==='starter'?'No':'Yes'}</span>
                    </li>
                    <li>
                      Mix & Match services bundling<span>{plan.name.toLowerCase() ==='starter'?'No':'Yes'}</span>
                    </li>
                  </ul>
              </div>
              <div className="feature" style={{ display: "flex", gap: "10px" }}>
                <CheckCircleTwoTone style={{ float: "initial" }} />
                Number of resources available for bookings per location<span>{plan.meta.number_of_resources}</span>
              </div>
              <div className="feature" style={{ display: "flex", gap: "10px" }}>
                <CheckCircleTwoTone style={{ float: "initial" }} />
                Online cancellation & re-schedule booking<span>Yes</span>
              </div>
              <div className="feature" style={{ display: "flex", gap: "10px" }}>
                <CheckCircleTwoTone style={{ float: "initial" }} />
                Automatic notification: booking confirmation, re-scheduling booking & cancellation of booking<span>Yes</span>
              </div>
              <div className="feature" style={{ display: "flex", gap: "10px" }}>
                <CheckCircleTwoTone style={{ float: "initial" }} />
                Free virtual vendor store on platform. Can upload logo and vendor store name.<span>{plan.name.toLowerCase() === "starter" ? 'Default Storefront' :'Customisable Storefront'}</span>
              </div>
              <div className="feature" style={{ display: "flex", gap: "10px" }}>
                <CheckCircleTwoTone style={{ float: "initial" }} />
                Vendor management dashboard: sales, bookings, customers, service creation/edit tools, platform account management.<span>Yes</span>
              </div>
              <div className="feature">
                <CheckCircleTwoTone style={{ float: "initial", marginRight: "10px" }} />
                Payment options
                <ul style={{ marginLeft: "35px" }}>
                  <li>Credit card<span>Yes</span></li>
                  <li>PayNow<span>Yes</span></li>
                </ul>
              </div>
              <div className="feature" style={{ display: "flex", gap: "10px" }}>
                <CheckCircleTwoTone style={{ float: "initial" }} />
                Commission applicable for all online book & pay services<span>6%</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>)}
    </>

  );
};

export default ChangePlan;
