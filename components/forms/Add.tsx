import React from "react";

interface AddProps {
  onClick: () => void;
  name: string;
}

const Add: React.FC<AddProps> = ({ onClick, name }) => {
  return (
    <button onClick={onClick} className="px-4 py-2 border-2 rounded-lg bg-purple-100 text-white hover:text-purple-100 hover:bg-white hover:border-2 hover:border-purple-100">
      Agregar {name}
    </button>
  );
};

export default Add;