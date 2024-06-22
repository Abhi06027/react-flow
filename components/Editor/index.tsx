import React, { useState, useCallback } from "react";
import {
  DataEditor,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
} from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";

interface DummyItem {
  name: string;
  company: string;
  email: string;
  phone: string;
}

const Editor: React.FC = () => {
  const [data, setData] = useState<DummyItem[]>([
    {
      name: "Hines Fowler",
      company: "BUZZNESS",
      email: "hinesfowler@buzzness.com",
      phone: "+1 (869) 405-3127",
    },
  ]);

  const columns: GridColumn[] = [
    { title: "Name", id: "name" },
    { title: "Company", id: "company" },
    { title: "Email", id: "email" },
    { title: "Phone", id: "phone" },
  ];

  const getContent = useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const dataRow = data[row];
    const indexes: (keyof DummyItem)[] = ["name", "company", "email", "phone"];
    const d = dataRow[indexes[col]];
    return {
      kind: GridCellKind.Text,
      allowOverlay: true,
      readonly: false,
      displayData: d,
      data: d,
    };
  }, []);

  const onCellEdited = useCallback((cell: Item, newValue: GridCell) => {
    if (newValue.kind !== GridCellKind.Text) {
      return;
    }

    const indexes: (keyof DummyItem)[] = ["name", "company", "email", "phone"];
    const [col, row] = cell;
    const key = indexes[col];
    const newData = [...data];
    newData[row] = { ...newData[row], [key]: newValue.data as string };
    setData(newData);
  }, []);

  return (
    <div id="portal">
      <DataEditor
        editOnType
        getCellContent={getContent}
        columns={columns}
        rows={data.length}
        onCellEdited={onCellEdited}
      />
    </div>
  );
};

export default Editor;
