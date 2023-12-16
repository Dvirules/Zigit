import React, {useEffect, useMemo, useState} from "react";
import { useTable } from "react-table";
import ProjectsTableCard from "./ProjectsTableCard";
import "./Styles/ProjectsTable.css"

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
  const [sortDirections, setSortDirections] = useState<string[]>([]);
  const ascending = "Ascending Order";
  const descending = "Descending Order";
  const noOrder = "No Order";

  useEffect(() => {
    setColumns(buildHeaders);
  }, []);

  useEffect(() => {
    fillSortDirections();
  }, [columns]);

  const fillSortDirections = () => {
    const numOfSortingButtons = document.getElementsByClassName("sort").length;
    for(let i = 0; i < numOfSortingButtons; i++) {
      sortDirections.push(noOrder);
    }
  }

  const buildHeaders = useMemo( //Build the headers of the table from the object's keys
    () => {
      const headersArr = [];
      for (const [key, value] of Object.entries(props.data[0])) {
        headersArr.push({ Header: key, accessor: key })
      }
      return headersArr;
    }, []);

  const handleFilter = (): void => {
    resetSortDirections();
    const filterInputs = Array.prototype.slice.call(document.getElementsByClassName("filter"));
    let filteredData: ProjectObject[] = props.data;
    filterInputs.forEach((element, index) => {
      // Iterates over every key-vlaue pair inside every object in the data list and filters the object off the list if its value doesn't include one of the filters.
      filteredData = filteredData.filter((projectObj: any) => projectObj[columns[index].Header].toString().toLowerCase().includes(element.value.toLowerCase()));
      });
    setData(filteredData);
  }

  // This is a rather complicated function so I added many comments on it:
  const handleSort = (sortButtonNum: number) => {
    handleSortDirection(sortButtonNum); // Resets all sorting to none.
    const dataCopy: any[] = data;
    let sortedDataTargetKeyArr: any[] = [];
    let sortedData: ProjectObject[] = [];
    const sortTargetHeader: any = columns[sortButtonNum].Header; // The targeted header for sorting.
    const sampleProjectObj: any = props.data[0];
    const typeOfColumnData = typeof(sampleProjectObj[sortTargetHeader]);

    dataCopy.forEach((projectObj: any) => { // Pushes into an array all the values of the targeted header to be sorted of all of the objects in the list.
      sortedDataTargetKeyArr.push(projectObj[sortTargetHeader]);
    });

    if(typeOfColumnData === "number") { // If said values are numbers sorts them as numbers.
      sortedDataTargetKeyArr = sortedDataTargetKeyArr.map(value => parseInt(value));
      sortDirections[sortButtonNum] === ascending ? sortedDataTargetKeyArr = sortedDataTargetKeyArr.sort((a, b) => a - b) :
      sortedDataTargetKeyArr = sortedDataTargetKeyArr.sort((a, b) => b - a);
    }
    else { // Else sorts them as strings.
      sortDirections[sortButtonNum] === ascending ? sortedDataTargetKeyArr = sortedDataTargetKeyArr.sort() :
      sortedDataTargetKeyArr = sortedDataTargetKeyArr.sort().reverse();
    }

    while(sortedDataTargetKeyArr.length > 0) { // While there are still values in the sorted array, searches for the object with the current value,
      // pushes it in order to the sorted objects array and removes it from the unordered one.
      for(let i = 0; i < dataCopy.length; i++) {
        if(dataCopy[i][sortTargetHeader] === sortedDataTargetKeyArr[0]) {
          sortedData.push(dataCopy[i]);
          dataCopy.splice(i, 1);
          sortedDataTargetKeyArr.shift();
          i = -1;
        }
      }
    }
    setData(sortedData);
  }

  const handleSortDirection = (index: number) => {
    resetSortDirections(index);
    if(sortDirections[index] === noOrder) {
      sortDirections[index] = ascending;
    }
    else if(sortDirections[index] === ascending) {
      sortDirections[index] = descending;
    }
    else {
      sortDirections[index] = ascending;
    }
  }

  // If called without the index argument resets all the sorting directions, else resets all sorting directions except for the one in the index position.
  const resetSortDirections = (index?: number) => {
    for(let i = 0; i < sortDirections.length; i++) {
      if(index !== null) {
        if(i !== index) {
          sortDirections[i] = noOrder;
        }
      }
      else {
        sortDirections[i] = noOrder;
      }
    }
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
                <div className="sort-direction">{sortDirections[index]}</div>
                <div className="sort" onClick={ () => handleSort(index) } />
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
                  return <td className={row.values.score > 90 ? "row-green" : row.values.score < 70 ? "row-red" : "row-white"} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
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