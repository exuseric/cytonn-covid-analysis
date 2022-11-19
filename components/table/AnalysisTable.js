import { format, parseISO } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { HiSearch } from "react-icons/hi";
import formatNumber from "../../lib/formatNumbers";
import handleSort from "../../lib/sort";
import styles from "../../styles/AnalysisTable.module.css";
import SortableColumn from "../table/SortableColumn";
import StackedData from "./StackedData";

const AnalysisTable = () => {
  const router = useRouter();
  const { sort } = router.query;

  const [searchQuery, setSearchQuery] = useState("");
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);

  let hasRendered = useRef();
  async function getData() {
    const fetchOptions = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "b427af1f07msha8033cbf7053452p11cd29jsnbe1e5d54fd05",
        "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
      },
    };
    const res = await fetch(
      "https://covid-193.p.rapidapi.com/statistics",
      fetchOptions
    );

    const { response } = await res.json();
    const columns = Object.keys(response[0]);
    setTableData(response);
    setTableColumns(columns);
  }
  useEffect(() => {
    if (!hasRendered.current) {
      hasRendered.current = true;
      return;
    }
    getData();
  }, []);

  function handleSearchQuery(e) {
    setSearchQuery(e.target.value);

    if (searchQuery.length >= 3) {
      setTableData(
        [...tableData].filter((data) =>
          data.country
            .toLocaleLowerCase()
            .includes(searchQuery.toLocaleLowerCase())
        )
      );
    } else {
      setTableData([...raw]);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    const query = e.target.search?.value;

    searchQuery?.length > 1 &&
      setTableData(
        [...tableData].filter((data) =>
          data.country
            .toLocaleLowerCase()
            .includes(searchQuery.toLocaleLowerCase())
        )
      );
  }

  return (
    <div className={styles.analysis}>
      <div className={styles.table__options}>
        <form
          name="search"
          method="post"
          action="#"
          className={styles.search}
          onSubmit={handleSearch}
        >
          <label htmlFor="search">Search Country</label>
          <div className={styles.search__bar}>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Enter Country Name"
              value={searchQuery}
              onChange={handleSearchQuery}
            />
            <button
              type="submit"
              className={`primary-btn ${styles.search__bar__btn}`}
            >
              <HiSearch />
            </button>
          </div>
        </form>
      </div>
      {/* Table */}
      <table className={styles.table} cellSpacing="0">
        <thead>
          <tr>
            {tableColumns?.map((column, idx) =>
              column === "country" ? (
                <SortableColumn columnName={column} />
              ) : (
                <th scope="col">{column}</th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {handleSort({
            unsorted: [...tableData],
            sort,
          })?.map((d, idx) => (
            <>
              <tr key={idx}>
                <td>{d.continent}</td>
                <td>{d.country}</td>
                <td>{formatNumber(d.population)}</td>
                <>
                  <StackedData stack={d.cases} />
                </>
                <>
                  <StackedData stack={d.deaths} />
                </>

                <StackedData stack={d.tests} />

                <td>{format(parseISO(d.day), "eee do MMM, yyyy")}</td>
                <td>{format(parseISO(d.time), "hh:mm a")}</td>
              </tr>
              <tr className={styles.spacer}>
                <td colSpan="100"></td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AnalysisTable;
