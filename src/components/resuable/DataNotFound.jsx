import React from "react";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "./loadingSpinner";

const DataNotFound = ({ name, isLoading }) => {
  const { t } = useTranslation();

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex justify-center items-center min-h-[20vh]">
          <p className="text-gray-500 text-sm sm:text-base -mt-10">
            {t(`no_data.${name}`)}
          </p>
        </div>
      )}
    </div>
  );
};

export default DataNotFound;
