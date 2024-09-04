/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import MDButton from "components/MDButton";
import { Icon, Grid, Modal } from "@mui/material";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import AgGreedTable from "examples/AgGreedTable/AgGreedTable";
import { useEffect, useState } from "react";

function Tables() {
  const [pupaRows, setPupaRows] = useState();
  const [lupaRows, setLupaRows] = useState();

  useEffect(() => {
    try {
      fetch("http://localhost:5000" + "/pupa/20/0", {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((res2) => {
          setPupaRows(res2);
        })
        .catch((err) => {
          console.log(err);
        });
      fetch("http://localhost:5000" + "/lupa/20/0", {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((res2) => {
          setLupaRows(res2);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(err);
    }
  }, []);

  console.log(lupaRows);
  console.log(pupaRows);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container columns={2}>
          <Grid item xs={1} marginTop={"auto"}>
            <AgGreedTable
              editable={false}
              url={"http://localhost:5000/lupa"}
              columnDefs={[
                // this row shows the row index, doesn't use any data from the row
                {
                  headerName: "ID",
                  maxWidth: 100,
                  // it is important to have node.id here, so that when the id changes (which happens
                  // when the row is loaded) then the cell is refreshed.
                  valueGetter: "node.id",
                  cellRenderer: (props) => {
                    if (props.value !== undefined) {
                      return props.value;
                    } else {
                      return <img src="https://www.ag-grid.com/example-assets/loading.gif" />;
                    }
                  },
                },
                { field: "age" },
                { field: "firstname" },
                { field: "salary" },
                { field: "newdate" },
              ]}
            />
          </Grid>
          <Grid item xs={1} marginTop={"auto"}>
            <AgGreedTable
              rowModelType="clientSide"
              editable={true}
              url={"http://localhost:5000/pupa"}
              columnDefs={[
                // this row shows the row index, doesn't use any data from the row
                {
                  headerName: "ID",
                  maxWidth: 100,
                  // it is important to have node.id here, so that when the id changes (which happens
                  // when the row is loaded) then the cell is refreshed.
                  valueGetter: "node.id",
                  cellRenderer: (props) => {
                    if (props.value !== undefined) {
                      return props.value;
                    } else {
                      return <img src="https://www.ag-grid.com/example-assets/loading.gif" />;
                    }
                  },
                },
                { field: "lupaid" },
                { field: "age" },
                { field: "firstname" },
                { field: "salary" },
                { field: "newdate" },
              ]}
            />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
