import React, {useMemo} from "react";
import { useTable } from "react-table";
import ProjectsTableCard from "./ProjectsTableCard";
import "./Styles/ProjectsTable.css"

interface ProjectsTableProps {
  data: object[];
}

// A component that renders and presents dynamically the data that is being passed to it (an array of objects) in the form of a table
function ProjectsTable(props: ProjectsTableProps) {

  const columns: {Header: String|any; accessor: String|any}[] = useMemo(
    () => {
      const headersArr = [];
      for (const [key, value] of Object.entries(props.data[0])) {
        headersArr.push({ Header: key, accessor: key })
      }
      return headersArr;
    }, []);

  const data = props.data

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
      <ProjectsTableCard data={props.data} />

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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