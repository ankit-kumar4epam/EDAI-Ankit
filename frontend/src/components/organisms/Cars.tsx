import React from "react";
import Layout from "./Layout";
import AlertBox from "../../context/alert/AlertBox";

const Cars = () => {
  // const successAlert = {
  //   type: "success",
  //   heading: "Success!",
  //   message: "Your operation was completed successfully.",
  // };
  // const errorAlert = {
  //   type: "error", // Enum ensures type safety
  //   heading: "Error!",
  //   message: "Something went wrong during the operation.",
  // };
  return (
    <Layout>
      {/* <AlertBox alert={successAlert} />
      <AlertBox alert={errorAlert} /> */}
      Carspage
    </Layout>
  );
};

export default Cars;
