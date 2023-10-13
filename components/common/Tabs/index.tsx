import React, { useState } from "react";

export function Tabs({ children }) {
	function findActiveTab(a) {
		return a.reduce((accumulator, currentValue, i) => {
			if (currentValue.props.active) {
				return i;
			}

			return accumulator;
		}, 0);
	}

	function tabValidator(tab) {
		return tab.type.displayName === "Tab" ? true : false;
	}

	const [activeTab, setActiveTab] = useState(findActiveTab(children));
	return (
		<>
			<div className="flex gap-2 justify-items-start p-0">
				{children.map((item, i) => {
					return (
						<>
							{tabValidator(item) && (
								<Tab
									key={`tab-${i}`}
									currentTab={i}
									activeTab={activeTab}
									setActiveTab={setActiveTab}
								>
									{item.props.children}
								</Tab>
							)}
						</>
					);
				})}
			</div>
			<div className="p-0 ">
				{children.map((item, i) => {
					return (
						<div className={` ${i === activeTab ? "visible" : "hidden"}`}>
							{item.props.component}
						</div>
					);
				})}
			</div>
		</>
	);
}

export function Tab({ children, activeTab, currentTab, setActiveTab }) {
	return (
		<>
			<div
				className={`mr-1 ml-4 pb-1 cursor-pointer text-center font-bold text-[16px]
						${
							activeTab === currentTab
								? "text-[#699BF7] border-b-2 border-[#699BF7]"
								: "text-[#67748E] "
						}`}
				onClick={() => setActiveTab(currentTab)}
			>
				{children}
			</div>
		</>
	);
}

Tab.displayName = "Tab";
