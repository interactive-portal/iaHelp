import { CKEditor } from "ckeditor4-react";
import { FC, useEffect, useState } from "react";
import { useDebounce, useToggle } from "react-use";

type PropsType = {
  item: any;
  placeholder?: string;
  type?: "modern" | "simple" | "full";
  debounceInterval?: number;
  onChange?: any;
  customStyle?: object;
  customClassName?: string;
  customProps?: any;
  customDivNumber?: string;
  divNamePrefix?: string;
  sample?: boolean;
};

const AtomEditor: FC<PropsType> = ({
  item,
  placeholder = "",
  type = "modern",
  debounceInterval = 1500,
  onChange = () => {},
  customStyle = {},
  customClassName = "",
  customProps = {},
  customDivNumber = "DivEditor",
  divNamePrefix = "",
  sample = false,
}) => {
  //Debounce
  // const [state, setState] = useState("Typing stopped");
  const [isWriting, setIsWriting] = useToggle(false);
  const [val, setVal]: any = useState();
  const [debouncedValue, setDebouncedValue]: any = useState();
  const [, cancel] = useDebounce(
    () => {
      setIsWriting(false);
      setDebouncedValue(val);
    },
    debounceInterval,
    [val]
  );

  // useEffect(() => {
  //   onChange(debouncedValue);
  // }, [debouncedValue]);

  return (
    <>
      {/* <input
        type={type}
        className={twMergeUtil(
          "w-full outline-none shadow-none focus:border-current",
          customClassName,
          isWriting ? "focus:ring-red-400" : ""
        )}
        style={customStyle}
        placeholder={placeholder}
        defaultValue={item?.value}
        onChange={(e: any) => {
          e.preventDefault();
          setIsWriting(true);
          setVal(e);
          // onChange(e);
        }}
      /> */}
      <CKEditor
        initData="Энд материалаа оруулаарай."
        config={{
          // toolbar: [
          //   ["Source"],
          //   ["Styles", "Format", "Font", "FontSize"],
          //   ["UploadImage"],
          //   ["Bold", "Italic"],
          //   ["About"],
          //   ["EasyImageUpload"],
          //   ["Undo", "Redo"],
          // ],
          // allowedContent: "p strong h1 h2 h3 h4 h5 h6 img div span ul li ol",
          // allowedContent:
          //   "h1 h2 h3 p blockquote strong em" +
          //   "a[!href]" +
          //   "img[src,alt,width,height,style]",
          disallowedContent:
            "span{font,font-size,font-family} div{font,font-size,font-family}",
          extraPlugins: "uploadimage, autogrow, templates, resize",
          // removePlugins: "image",
          uploadUrl: "/api/uploadimage",
          resizeDir: "vertical",
          width: "100%",
          height: 550,
          autoGrowMinHeight: 200,
          autoGrowMaxHeight: 600,
          autoGrowBottomSpace: 50,
          ...customProps?.config,
        }}
        onInstanceReady={() => {
          console.log("Editor is ready!");
        }}
        onChange={(evt: any) => {
          evt.preventDefault();
          const data = evt.editor.getData();
          // console.log("XXXXXXXXX editor", evt.editor);
          // console.log("XXXXXXXXX data", data);
          setIsWriting(true);
          setVal(data);
        }}
        {...customProps}
      />
      {/* <div>{state}</div> */}
      {/* <div> */}
      {/* Debounced value: {debouncedValue} */}
      {/* <button onClick={cancel}>Cancel debounce</button> */}
      {/* </div> */}
    </>
  );
};

export default AtomEditor;
