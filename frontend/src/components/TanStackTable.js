import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { SortUp, SortDown } from "../../assets/icons";
import "./TanStackTable.css";

/**
 * This component uses TanStack React Table
 * @params table
 */
const TanStackTable = ({ data, columns }) => {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: false,
  });

  return (
    <table style={{ width: "100%" }}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className={"tanstack_table_header"}
                onClick={header.column.getToggleSortingHandler()}
              >
                <div className={"tanstack_table_header_cover"}>
                  <span>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </span>
                  <span>
                    {{
                      asc: (
                        <SortUp
                          style={{
                            width: "12px",
                            height: "12px",
                            marginLeft: "4px",
                            marginTop: "2px",
                          }}
                        />
                      ),
                      desc: (
                        <SortDown
                          style={{
                            width: "12px",
                            height: "12px",
                            marginLeft: "4px",
                            marginTop: "2px",
                          }}
                        />
                      ),
                    }[header.column.getIsSorted()] ?? null}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row, index) => (
          <tr
            key={row.id}
            style={{ background: index % 2 == 0 ? "#ececec" : "#f7f7f7" }}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} style={{ padding: 8, textAlign: "center" }}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TanStackTable;
