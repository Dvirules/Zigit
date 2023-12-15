import React, {useEffect, useMemo, useState} from "react";
import { useTable } from "react-table";
import ProjectsTableCard from "./ProjectsTableCard";
import "./Styles/ProjectsTable.css"
import ReactDOM from "react-dom";

interface ProjectsTableProps {
  data: ProjectObject[];
}

interface ProjectObject {
  id: string;
  name: string;
  score: number;
  durationInDays: number;
  bugsCount: number;
  madeDadeline: boolean;
  email: string;
}

// A component that renders and presents dynamically the data that is being passed to it (an array of objects that have identical keys) in the form of a react-table
function ProjectsTable(props: ProjectsTableProps) {

  const [data, setData] = useState<ProjectObject[]>(props.data);
  const [columns, setColumns] = useState<{Header: String|any; accessor: String|any}[]>([]);

  useEffect(() => {
    setColumns(buildHeaders);
  }, []);

  const buildHeaders = useMemo( //Build the headers of the table from the object's keys
    () => {
      const headersArr = [];
      for (const [key, value] of Object.entries(props.data[0])) {
        headersArr.push({ Header: key, accessor: key })
      }
      return headersArr;
    }, []);

  const handleFilter = (): void => {
    const filterInputs = Array.prototype.slice.call(document.getElementsByClassName("filter"));
    if(!noFiltersCheck(filterInputs)) {
      let filteredData: ProjectObject[] = props.data;
      filterInputs.forEach((element, index) => {
        // Iterates over every key-vlaue pair inside every object in the data list and filters the object off the list if its value doesn't include one of the filters.
        filteredData = filteredData.filter((projectObj: any) => projectObj[columns[index].Header].toString().toLowerCase().includes(element.value.toLowerCase()));
       });
      setData(filteredData);
    }
  }

  const noFiltersCheck = (filterInputs: any[]): boolean => { // If there are no filters active, sets the data to it's initial state.
   let hasNoFilter = true;
   filterInputs.forEach(element => {
    if(element.value !== "") {
      hasNoFilter = false;
    }
   });
   if(hasNoFilter)
    setData(props.data);
   return hasNoFilter;
  }

  const sort = (sortButtonNum: number) => {
    console.log(sortButtonNum)
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  return (
    <div>
      <ProjectsTableCard data={data} />

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}
                <div className="sort" onClick={ () => sort(index) } />
                <input className="filter" type="text" placeholder="Filter..." onChange={handleFilter} />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td style={row.values.score > 90 ? {backgroundColor: "lightgreen"} : row.values.score < 70 ? {backgroundColor: "lightcoral"} : {}} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectsTable;