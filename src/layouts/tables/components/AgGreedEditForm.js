import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import PropTypes from "prop-types";
import { useState } from "react";

function AgGreedEditForm({ handleSubmit }) {
  const [LupaId, setLupaId] = useState("");
  const [age, setAge] = useState("");
  const [firstName, setFirstName] = useState("");
  const [salary, setSalary] = useState("");
  const [newDate, setNewDate] = useState("");

  return (
    <MDBox width="300px" height="400px" display="flex" flexDirection="column" justifyContent="center">
      <MDInput
        style={{ margin: "auto", width: "200px" }}
        id="standard-basic"
        type="number"
        label="LupaId"
        value={LupaId}
        onChange={(e) => setLupaId(e.target.value)}
        variant="standard"
      />
      <MDInput
        style={{ margin: "auto", width: "200px" }}
        id="standard-basic"
        type="number"
        label="age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        variant="standard"
      />
      <MDInput
        style={{ margin: "auto", width: "200px" }}
        id="standard-basic"
        label="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        variant="standard"
      />
      <MDInput
        style={{ margin: "auto", width: "200px" }}
        id="standard-basic"
        type="number"
        label="salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        variant="standard"
      />
      <MDInput
        style={{ margin: "auto", width: "200px" }}
        id="otlined"
        type="date"
        value={newDate}
        onChange={(e) => setNewDate(e.target.value)}
      />
      <MDButton
        style={{ margin: "auto" }}
        width="200px"
        onClick={() => {
          handleSubmit({ LupaId, age, firstName, salary, newDate });
        }}
      >
        Send
      </MDButton>
    </MDBox>
  );
}
AgGreedEditForm.propTypes = {
  handleSubmit: PropTypes.func,
};
export default AgGreedEditForm;
