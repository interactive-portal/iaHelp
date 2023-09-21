import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import { toBoolean } from "@/utils/helper";
import { twMergeUtil } from "@/utils/widgetHelper";
import { useContext } from "react";

export default function BlockDiv({
  divNumber,
  customClassName,
  customStyle,
  type = "div",
  onClick,
  divNamePrefix = "",
  children,
  initial,
  animate,
  variants,
  transition,
}: {
  type?: "div" | "span" | "i" | "p" | "label" | "code" | "nav" | "ul" | "main";
  divNumber?: string;
  customClassName?: string;
  customStyle?: any;
  onClick?: any;
  divNamePrefix?: string;
  children?: any;
  initial?: any;
  animate?: any;
  variants?: any;
  transition?: any;
}) {
  const { widgetnemgooReady } = useContext(WidgetWrapperContext);

  const cloudContext = {};
  const myDivNumber = `${divNamePrefix}${divNumber}`;

  //global
  const isDefaultTheme: boolean =
    toBoolean(widgetnemgooReady?.isDefaultTheme) || false;
  const globalThemeNemgoo: any = {}; //cloudContext?.globalConfig?.theme;
  const globalDesignNemgoo: any = {}; //cloudContext?.globalConfig?.design?.[myDivNumber];
  const widgetDesignNemgoo = widgetnemgooReady?.design?.[myDivNumber];

  const blockProps = {
    ["div-name"]: myDivNumber,
    className: twMergeUtil(
      globalThemeNemgoo, //солих утгууд
      customClassName || "",
      myDivNumber === "divouterblock"
        ? isDefaultTheme
          ? globalDesignNemgoo?.className
          : ""
        : globalDesignNemgoo?.className,
      //! defaultAttribute?.className,
      widgetDesignNemgoo?.className ||
        widgetnemgooReady?.[myDivNumber]?.className ||
        ""
    ),
    style: {
      ...customStyle,
      ...(myDivNumber === "divouterblock"
        ? isDefaultTheme
          ? globalDesignNemgoo?.style
          : {}
        : globalDesignNemgoo?.style),

      //! ...defaultAttribute?.style,
      ...(widgetDesignNemgoo?.style || widgetnemgooReady?.[myDivNumber]?.style),
    },
    onClick: onClick,
    initial: {
      initial,
      ...widgetnemgooReady?.design?.[myDivNumber]?.motion?.initial,
    },
    animate: {
      animate,
      ...widgetnemgooReady?.design?.[myDivNumber]?.motion?.animate,
    },
    variants: {
      variants,
      ...widgetnemgooReady?.design?.[myDivNumber]?.motion?.variants,
    },
    transition: {
      transition,
      ...widgetnemgooReady?.design?.[myDivNumber]?.motion?.transition,
    },
  };

  switch (type) {
    case "div":
      return <div {...blockProps}>{children}</div>;
    case "span":
      return <span {...blockProps}>{children}</span>;
    case "i":
      return <i {...blockProps}>{children}</i>;
    case "p":
      return <p {...blockProps}>{children}</p>;
    case "label":
      return <label {...blockProps}>{children}</label>;
    case "code":
      return <code {...blockProps}>{children}</code>;
    case "nav":
      return <nav {...blockProps}>{children}</nav>;
    case "ul":
      return <ul {...blockProps}>{children}</ul>;
    case "main":
      return <main {...blockProps}>{children}</main>;
    default:
      return <div {...blockProps}>{children}</div>;
  }
}
