import _ from "lodash";
import { FC } from "react";
import ResponsiveWrapperSidebar from "./ResponsiveWrapperSidebar";

type PropsType = {
  wrapperNemgoo: any;
  isOpen?: boolean;
  setIsOpen?: any;
  customClassName?: string;
  customStyle?: any;
  props?: any;
  children?: any;
};

const RenderWrapperComponent: FC<PropsType> = ({
  wrapperNemgoo = {},
  isOpen,
  setIsOpen,
  customClassName,
  customStyle,
  props = {},
  children,
}) => {
  if (_.isEmpty(wrapperNemgoo)) return children;

  // const [isVisible, setIsVisible] = useState(isOpen);

  // console.log("DDDDDDDDDDDD", wrapperNemgoo, isOpen);
  // console.log("BBBBBBBBB", props?.config);

  switch (wrapperNemgoo?.type) {
    case "sidebar":
      return (
        <>
          {/* dsfdsfdsf */}
          {/* <Drawer
            title={
              <div style={{ background: "yellow" }}>
                <span>Ангилал</span>
              </div>
            }
            placement={wrapperNemgoo?.props?.position15 || "right"}
            width={500}
            mask={true}
            maskClosable={true}
            closable={true}
            open={isOpen}
            getContainer={false}
            destroyOnClose={true}
            onClose={() => {
              setIsOpen(false);
            }}
            drawerStyle={{}}
            bodyStyle={{ background: "pink" }}
            // headerStyle={{ background: "pink" }}
            contentWrapperStyle={{}}
          >
            {props?.config?.metadatacode}
            <pre>{JSON.stringify(wrapperNemgoo, null, 4)}</pre>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            {children}
          </Drawer> */}
          {/* hahaha
          <button
            onClick={() => {
              setIsOpen(true);
            }}
          >
            дараач ээ
          </button> */}
          <ResponsiveWrapperSidebar wrapperNemgoo={wrapperNemgoo} />
        </>
      );

    default:
      return <>{children}</>;
  }

  return children;
};

export default RenderWrapperComponent;
