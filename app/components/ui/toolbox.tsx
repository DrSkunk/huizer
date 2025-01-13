import { Button } from "./button";

export interface Tool {
  id: string;
  icon: React.ComponentType;
  name: string;
}

interface ToolboxProps {
  tools: Tool[];
  onToolClick: (tool: Tool) => void;
  activeTool?: Tool | null;
}

export function Toolbox({ tools, onToolClick, activeTool }: ToolboxProps) {
  return (
    <div className="mt-4 flex flex-col gap-4 border p-4">
      {tools.map((tool) => (
        <Button
          key={tool.id}
          variant={activeTool?.id === tool.id ? "default" : "outline"}
          onClick={() => onToolClick(tool)}
        >
          <tool.icon />
          {tool.name}
        </Button>
      ))}
    </div>
  );
}
