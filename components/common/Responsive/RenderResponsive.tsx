import useResponsiveBreakpoint from "@customhook/useResponsiveBreakpoint";
import _ from "lodash";
import { FC } from "react";
import RenderWrapperComponent from "./RenderWrapperComponent";

type PropsType = {
  responsiveNemgoo?: any;
  isOpen?: boolean;
  setIsOpen?: any;
  customClassName?: string;
  customStyle?: any;
  props?: any;
  children?: any;
};

const RenderResponsive: FC<PropsType> = ({
  responsiveNemgoo = {},
  isOpen,
  setIsOpen,
  customClassName,
  customStyle,
  props = {},
  children,
}) => {
  const { breakpoint } = useResponsiveBreakpoint();

  if (_.isEmpty(responsiveNemgoo)) return children;

  // "responsive": {
  //     "md": {
  //         "type": "sidebar",
  //         "props": {
  //             "position": "left",
  //             "width": "80%"
  //         }
  //     },
  //     "lg": {}
  // },

  switch (breakpoint) {
    case "sm":
      return (
        <RenderWrapperComponent wrapperNemgoo={responsiveNemgoo?.sm}>
          {children} sm орлооо
        </RenderWrapperComponent>
      );
    case "md":
      console.log("Энд орж байгаа юм уу%", isOpen);
      return (
        <RenderWrapperComponent
          wrapperNemgoo={responsiveNemgoo?.md}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          props={props}
        >
          {children} md орлоо
        </RenderWrapperComponent>
      );
    case "lg":
      return (
        <RenderWrapperComponent wrapperNemgoo={responsiveNemgoo?.lg}>
          {children} lg орлоо
        </RenderWrapperComponent>
      );
    case "xl":
      return (
        <RenderWrapperComponent wrapperNemgoo={responsiveNemgoo?.xl}>
          {children} xl орлоо
        </RenderWrapperComponent>
      );
    case "2xl":
      return (
        <RenderWrapperComponent wrapperNemgoo={responsiveNemgoo?.["2xl"]}>
          {children} 2xl орлоо
        </RenderWrapperComponent>
      );
    default:
      return <>{children}</>;
  }
};

export default RenderResponsive;
