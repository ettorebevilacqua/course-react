import { useState } from "react";

import "./flex.css";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const OpsDirections = ["unset", "row", "column", "column-reverse", "row-reverse", "revert"]
const OptsFlexWrap = ["wrap", "nowrap", "wrap-reverse"];
const OptsJustifyContent = [
    "flex-start",
    "flex-end",
    "center",
    "space-between ",
    "space-around",
    "space-evenly",
    "start",
    "end",
    "left",
    "right",
];

const OptsAlignItems = [
    "stretch",
    "flex-start",
    "flex-end",
    "center",
    "baseline",
    "first baseline",
    "last baseline",
    "start",
    "end",
    "self-start",
    "self-end",
];
const OptsAlignContent = [
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "space-evenly",
    "stretch",
    "start",
    "end",
    "baseline",
    "first baseline",
    "last baseline",
];
const getFlexStyle = (
    flexDirection = "row",
    flexWrap = "wrap",
    justifyContent = "flex-start",
    alignContent = "flex-end",
) => ({
    display: "flex",
    flexDirection,
    flexWrap,
    justifyContent,
    alignContent
});

const getSelectFlex = (options, handle) => {
    const getOption = (value) => <option value={value}>{value}</option>;
    return <select onChange={handle}>{options.map(getOption)}</select>;
};

const Flex = () => {
    const [stBox, setStBox] = useState(getFlexStyle());
    const flexBox = (name) => <div>{name}</div>;
    const flexLI = (name) => <li style={{ width: `${getRandomInt(200)}px` }} key={name}>{name}</li>;
    const flexBoxNames = (names) => names.map(flexBox);
    const flexBoxNameLI = (names) => names.map(flexLI);

    const handelSelect = (name) => (e) => {
        console.log("xxxxxxxxx", name);
        setStBox({ ...stBox, [name]: e.target.value });
    };

    return (
        <div>
            <h2>Flex</h2>
            <a
                href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/"
                target="_blank"
                rel="noreferrer"
            >
                {" "}
                Guide{" "}
            </a>
            <div className="selects">
                {getSelectFlex(
                    OpsDirections,
                    handelSelect("flexDirection"),
                )}
                {getSelectFlex(
                    OptsJustifyContent,
                    handelSelect("justifyContent"),
                )}
                {getSelectFlex(OptsFlexWrap, handelSelect("flexWrap"))}
                {getSelectFlex(OptsAlignItems, handelSelect("alignItems"))}
                {getSelectFlex(OptsAlignContent, handelSelect("alignContent"))}
            </div>
            <div style={stBox} className="box boxSize">
                {flexBoxNames([" a ", " b ", " c ", " d ", "e"])}
            </div>
            <ul style={stBox} className="ul boxSize">
                {flexBoxNameLI([" a ", " b ", " c ", " d ", "e"])}
            </ul>
            <div>
                <pre> {JSON.stringify(stBox, null, 4)} </pre>
            </div>
        </div>
    );
};

export default Flex;
