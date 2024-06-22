"use client";
import DataGridEditor from "@/components/DataGrid";
// import Editor from "@/components/Editor";
// import { PopoverComp } from "@/components/Popover";

// import SearchBar from "@/components/SearchBar";
import Table from "@/components/Table/Index";

import React, { useCallback } from "react";

import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useEdgesState,
  useNodesState,
  Connection,
  Edge,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";

const nodeTypes = {
  table: Table,
  // searchBar: SearchBar,
  // editor: Editor,
  // popover: PopoverComp,
  dataGrid: DataGridEditor,
};

const initialNodes: Node[] = [
  { id: "1", type: "table", position: { x: 300, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 300, y: 300 }, data: { label: "2" } },


  {
    id: "3",
    type: "dataGrid",
    position: { x: 500, y: 80 },
    data: { label: "3" },
  },
];

const initialEdges: Edge[] = [
  { id: "1-2", source: "1", target: "2", animated: true },
];

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = { ...connection, animated: true, id: `${edges.length + 1}` };
      setEdges((prevEdges) => addEdge(edge, prevEdges));
    },
    [edges.length, setEdges]
  );

  return (
    <main>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </main>
  );
}
