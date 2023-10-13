import { useToggle } from "react-use";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculeDropdown({
  item,
  customClassName = "",
  customStyle = {},
  divNamePrefix = "",
}: {
  item: any;
  customClassName?: string;
  customStyle?: object;
  divNamePrefix?: string;
}) {
  const [toggle, setToggle] = useToggle(false);

  return (
    <>
      <BlockDiv customClassName="relative max-w-xs">
        <button
          className="flex w-48 space-y-2 px-4 py-2 font-medium rounded-md outline-none  focus:outline-none bg-blue-800 text-white"
          onClick={() => setToggle(!toggle)}
        >
          Dropdown
        </button>
        <BlockDiv
          customClassName={`left-0 w-48 p-2 mt-1 bg-white rounded-md shadow lg:absolute transition-200 ${
            toggle ? `flex-col flex opacity-100` : `hidden opacity-0`
          }`}
        >
          <ul className="space-y-2 w-full">
            <li>
              <a
                href="#"
                className="flex p-2 font-medium text-gray-600 rounded-md  hover:bg-gray-100 hover:text-black"
              >
                Categories
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex p-2 font-medium text-gray-600 rounded-md  hover:bg-gray-100 hover:text-black"
              >
                Inventories
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex p-2 font-medium text-gray-600 rounded-md  hover:bg-gray-100 hover:text-black"
              >
                Brands
              </a>
            </li>
          </ul>
        </BlockDiv>
      </BlockDiv>
    </>
  );
}
