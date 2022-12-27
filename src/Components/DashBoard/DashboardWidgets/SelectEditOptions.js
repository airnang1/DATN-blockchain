import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";

function SelectEditOptions(props) {
  const { item, handleSendOptions } = props;
  const [dataObj, setDataObj] = useState({
    name: "",
    description: "",
    options: [],
  });

  useEffect(() => {
    item &&
      setDataObj({
        name: item.name,
        description: item.description,
        options: item.options,
      });
  }, [item]);

  useEffect(() => {
    if (dataObj) {
      handleSendOptions({ _id: item._id, ...dataObj });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataObj, item._id]);

  const handleAddOptionItem = () => {
    setDataObj({
      ...dataObj,
      options: [...dataObj.options, "option new"],
    });
  };

  const onChangeOptions = (e) => {
    const objArray = dataObj.options.slice();
    objArray.forEach(function (part, index, theArray) {
      if (index === +e.target.name) {
        theArray[index] = e.target.value;
        setDataObj({ ...dataObj, options: theArray });
      }
    });
  };

  return (
    <Form name="dynamic_form_item">
      <Input
        placeholder="Name..."
        style={{ width: "100%", padding: "10px" }}
        className="input-select"
        onChange={(e) => setDataObj({ ...dataObj, name: e.target.value })}
        value={dataObj.name}
      />

      <Input
        placeholder="Description..."
        style={{ width: "100%", padding: "10px" }}
        className="input-select"
        onChange={(e) =>
          setDataObj({ ...dataObj, description: e.target.value })
        }
        value={dataObj.description}
      />
      <div className="text-title">Options</div>

      {dataObj.options.map((item, index) => (
        <Input
          // placeholder={item}
          name={index}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          className="input-select"
          value={item}
          key={index}
          onChange={onChangeOptions}
        />
      ))}
      <Button
        type="dashed"
        style={{ width: "100%" }}
        onClick={handleAddOptionItem}
      >
        Add Option
      </Button>
    </Form>
  );
}

SelectEditOptions.propTypes = {};

export default SelectEditOptions;
