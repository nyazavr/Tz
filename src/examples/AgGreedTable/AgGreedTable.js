import { AgGridReact } from "ag-grid-react";
import { useCallback, useMemo, memo, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Dialog, Icon } from "@mui/material";
import AgGreedEditForm from "layouts/tables/components/AgGreedEditForm";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

const AgGreedTable = function AgGreedTable(props) {
  const { url, columnDefs, editable } = props;

  const [isOpenModal, setIsOpenModal] = useState(false);

  const agGreedRef = useRef();
  const isEditModal = useRef(false);

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const onCreate = () => {
    isEditModal.current = false;
    setIsOpenModal(true);
  };
  const onEdit = () => {
    if (agGreedRef.current.api.getSelectedRows().length) {
      isEditModal.current = true;
      setIsOpenModal(true);
    }
  };
  const onDelete = () => {
    if (agGreedRef.current.api.getSelectedRows().length) {
      console.log(agGreedRef.current.api.getSelectedRows()[0]);
      fetch(url + "/delete/" + agGreedRef.current.api.getSelectedRows()[0].id, { method: "DELETE" })
        .then(
          () => {}
          // agGreedRef.current.api.applyServerSideTransaction({remove: agGreedRef.current.api.getSelectedRows()[0],})
        )
        .catch((err) => console.log(err));
    }
  };

  const handleSubmit = useCallback(
    ({ LupaId, age, firstName, salary, newDate }) => {
      try {
        if (LupaId && age && firstName && salary && newDate) {
          const editItem = agGreedRef.current.api.getSelectedRows()[0];
          fetch(
            url +
              (isEditModal.current ? "/edit/" : "/add/") +
              (isEditModal.current ? editItem.id : ""),
            {
              method: isEditModal.current ? "PUT" : "POST",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({ LupaId, age, firstName, salary, newDate }),
            }
          ).then((res) => {
            if (res.ok) {
              let updatedItems = [
                {
                  id: editItem.id,
                  LupaId,
                  age,
                  firstName,
                  salary,
                  newDate,
                },
              ];
              forceUpdate();
              if (isEditModal.current) {
                setIsOpenModal(false);
                //editItem>=0?agGreedRef.current.api.applyServerSideTransaction({ update: updatedItems }):null;
              } else {
                setIsOpenModal(false);
                //agGreedRef.current.api.applyServerSideTransaction({add: res,});
              }
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    [agGreedRef.current]
  );

  const onGridReady = useCallback((params) => {
    const dataSource = {
      rowCount: fetch(url + "/count")
        .then((res) => res.text())
        .then((res) => res.count),
      getRows: (params) => {
        let lastRow = params.endRow;
        console.log(url + "/" + params.endRow + "/" + params.startRow);
        fetch(url + "/" + params.endRow + "/" + params.startRow)
          .then((res) => res.json())
          .then((res) => {
            console.log(Object.values(res));
            return params.successCallback(Object.values(res.data), lastRow + res.length);
          });
      },
    };
    params.api.setGridOption("datasource", dataSource);
  });
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: false,
    };
  }, []);

  return (
    <>
      <Dialog open={isOpenModal} onClose={handleCloseModal}>
        <AgGreedEditForm handleSubmit={handleSubmit} />
      </Dialog>
      {editable ? (
        <MDBox display={"flex"} flexDirection={"row-reverse"}>
          <MDButton style={{ margin: "2px" }} variant="gradient" color="dark" onClick={onCreate}>
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            &nbsp;add new
          </MDButton>
          <MDButton style={{ margin: "2px" }} variant="gradient" color="dark" onClick={onDelete}>
            <Icon sx={{ fontWeight: "bold" }}>delete</Icon>
            &nbsp;delete
          </MDButton>
          <MDButton style={{ margin: "2px" }} variant="gradient" color="dark" onClick={onEdit}>
            <Icon sx={{ fontWeight: "bold" }}>edit</Icon>
            &nbsp;edit
          </MDButton>
        </MDBox>
      ) : null}
      <div style={{ height: "500px" }} className={"ag-theme-quartz-dark"}>
        <AgGridReact
          ref={agGreedRef}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowBuffer={0}
          rowSelection={"single"}
          rowModelType={"infinite"}
          cacheBlockSize={100}
          cacheOverflowSize={2}
          maxConcurrentDatasourceRequests={1}
          infiniteInitialRowCount={1000}
          maxBlocksInCache={10}
          onGridReady={onGridReady}
        />
      </div>
    </>
  );
};

AgGreedTable.propTypes = {
  url: PropTypes.string,
  columnDefs: PropTypes.array,
  ref: PropTypes.object,
  editable: PropTypes.bool,
};

export default memo(AgGreedTable);
