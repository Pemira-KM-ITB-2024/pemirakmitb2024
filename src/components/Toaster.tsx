import { useEffect } from "react";

interface CustomToastProps {
  message: string;
  onClose: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000); // Auto close after 5 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded">
      {message}
      <button onClick={onClose} className="ml-4">X</button>
    </div>
  );
};

export default CustomToast;