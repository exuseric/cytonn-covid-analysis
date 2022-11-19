import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import styles from "../../styles/AnalysisTable.module.css";
useState;

const SortableColumn = ({ columnName }) => {
  const router = useRouter();
  const { sort } = router.query;
  let [sortName, sortType] = sort?.split(":") ?? [];
  let activeSort;

  if (sortName != columnName) {
    activeSort = columnName;
  } else if (sortName === columnName && sortType !== "desc") {
    activeSort = sortName + ":desc";
  } else if (sortName === columnName && sortType !== "asc") {
    activeSort = sortName + ":asc";
  } else {
    activeSort = null;
  }
  return (
    <th scope="col">
      <Link
        href={{ query: { sort: activeSort } }}
        className={styles.column__heading}
      >
        <span>{columnName}</span>
        <span className="icon-wrapper">
          {sortType === "asc" ? <HiSortAscending /> : <HiSortDescending />}
        </span>
      </Link>
    </th>
  );
};
export default SortableColumn;
