import { useState } from "react";
import { useToggle } from "react-use";

import BlockDiv from "../Block/BlockDiv";

export default function MoleculeSelect({
  type = "default",
  item,
  customClassName = "",
  customStyle = {},
  divNamePrefix = "",
}: {
  type?: "default" | "modern";
  item: any;
  customClassName?: string;
  customStyle?: object;
  divNamePrefix?: string;
}) {
  const [toggle, setToggle] = useToggle(false);
  const [value, setValue] = useState("");
  const list = [
    "React",
    "Vue",
    "Angular",
    "Ember",
    "Svelte",
    "Preact",
    "Sapper",
  ];
  return (
    <BlockDiv customClassName="flex flex-col padding-1 relative max-w-xs">
      <BlockDiv customClassName="relative w-48">
        <Input
          onChange={(inputValue: any) => {
            setValue(inputValue);
            setToggle(true);
          }}
          value={value}
          onClick={(e: any) => setToggle(!toggle)}
        />
        <SelectList
          value={value}
          list={list}
          setValue={setValue}
          toggle={toggle}
          setToggle={setToggle}
        />
      </BlockDiv>
    </BlockDiv>
  );
}

const Input = ({
  onChange,
  value,
  onClick,
}: {
  onChange?: any;
  value: any;
  onClick: any;
}) => {
  return (
    <BlockDiv customClassName="relative flex w-48 " onClick={onClick}>
      <input
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="w-full space-y-2 px-4 m-1 py-2 font-medium text-gray-600 rounded-md outline-none  focus:outline-none"
        type="search"
        role="combobox"
        aria-haspopup="listbox"
        placeholder="Choose One"
      />
      <span className="absolute inset-y-1/4 right-4 fas fa-caret-down"></span>
    </BlockDiv>
  );
};
const SelectList = ({
  list,
  value,
  setValue,
  toggle,
  setToggle,
}: {
  list: any;
  value: any;
  setValue: any;
  toggle: any;
  setToggle: any;
}) => {
  const filteredList = list.filter((item: any) =>
    item.toString().toLowerCase().startsWith(value.toLowerCase())
  );
  if (filteredList.length) {
    return (
      toggle && (
        <div
          className={`left-0 w-48 mt-1 bg-gray-100 cursor-pointer rounded-md shadow lg:absolute transition-200 ${
            toggle ? `flex-col flex opacity-100` : `hidden opacity-0`
          }`}
        >
          {filteredList.map((item: any) => (
            <div
              onClick={(e) => {
                setValue(item);
                setToggle(false);
              }}
              className="flex p-4 font-medium text-gray-600 rounded-md cursor-pointer hover:bg-gray-100 hover:text-black"
            >
              {item}
            </div>
          ))}
        </div>
      )
    );
  }
};
