const SkeletonItemDefault = ({}) => {
  return (
    <div className="rounded-2xl border border-gray-50 p-3 flex flex-col gap-5 select-none">
      <div className="h-5 rounded-xl bg-gray-200 animate-pulse"></div>
      <div className="flex flex-col flex-1 gap-5">
        <div className="flex flex-1 flex-col gap-3">
          <div className="bg-gray-200 w-full animate-pulse h-8 rounded-2xl"></div>
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
        </div>
        <div className="mt-auto flex gap-3">
          <div className="bg-gray-200 w-1/3 h-5 animate-pulse rounded-full"></div>
          <div className="bg-gray-200 w-1/3 h-5 animate-pulse rounded-full ml-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonItemDefault;
