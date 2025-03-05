import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const dropDownItems = ["Item 1", "Item 2", "Item 3", "Item 4"];

const CustomDropdown = ({
  title,
  multiSelect,
  showSelectedItemCount,
  containerstyles,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [multiSelectItem, setMultiSelectItem] = useState([]);
  const selectedItemCount =
    multiSelectItem.length === 0 ? null : multiSelectItem.length;

  const onSelection = (item) => {
    if (multiSelect) {
      setMultiSelectItem((prevSelected) =>
        prevSelected.includes(item)
          ? prevSelected.filter((i) => i !== item)
          : [...prevSelected, item]
      );
    } else {
      setSelectedItem((prevSelected) => (prevSelected === item ? null : item));
      setShowDropdown(false);
    }
  };

  return (
    <div
      onBlur={() => setShowDropdown(false)}
      tabIndex={0}
      style={{
        marginBottom: 20,
        position: "relative",
        cursor: "pointer",
        display: "inline-block",
        ...containerstyles,
      }}
    >
      <div
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
      >
        <div style={styles.dropDownContainerStyle}>
          {selectedItem ? selectedItem : title}{" "}
          {showSelectedItemCount && selectedItemCount
            ? `(${selectedItemCount})`
            : null}
          <MdKeyboardArrowDown />
        </div>
      </div>
      {showDropdown && (
        <div
          style={{
            position: "absolute",
            top: 50,
            zIndex: 1,
            background: "#fff",
            width: 200,
            boxShadow: "2px 2px 16px 1px rgba(0, 0, 0, 0.75)",
            borderRadius: 10,
          }}
        >
          <ul
            style={{ listStyleType: "none", paddingLeft: 20, paddingRight: 20 }}
          >
            {dropDownItems.map((item, index) => {
              const isSelected = multiSelectItem.includes(item);
              return (
                <li
                  onClick={() => {
                    onSelection(item);
                  }}
                  key={index}
                  style={
                    isSelected || selectedItem === item
                      ? styles.activeItemStyle
                      : styles.dropdownItemStyle
                  }
                  className="dropdown-item"
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;

const styles = {
  dropDownContainerStyle: {
    display: "inline-block",
    background: "#000",
    color: "#fff",
    borderRadius: 30,
    padding: "10px 20px",
  },
  dropdownItemStyle: {
    padding: "10px 20px",
    cursor: "pointer",
  },
  activeItemStyle: {
    background: "#000",
    color: "#fff",
    borderRadius: 10,
    padding: "10px 20px",
    cursor: "pointer",
  },
};
