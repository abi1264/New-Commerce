import { Button } from './Button';
import { Dispatch, SetStateAction } from 'react';
import { X } from 'lucide-react';

type DialogProps = {
  title: string;
  description: string;
  onConfirm: () => void;
  className?: string;
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
};
//component name is dialog
const Dialog = ({
  title,
  description,
  onConfirm,
  showDialog,
  setShowDialog,
}: DialogProps) => {
  if (!showDialog) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ">
      {showDialog && (
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-3xl relative">
          <button
            type="button"
            onClick={() => setShowDialog(false)}
            className="absolute right-4 top-4 cursor-pointer rounded-md  hover:bg-red-500"
          >
            <X size={30} />
          </button>
          <h2 className="text-center text-xl font-bold mb-4 w-full">{title}</h2>
          <h2 className="text-center text-xl font-thin mb-4 w-full">
            {description}
          </h2>
          <div className="flex justify-center gap-5 mt-5">
            <Button
              title="Delete"
              className="hover:bg-red-500 hover:text-white"
              onClick={onConfirm}
            />
            <Button
              title="Cancel"
              className="hover:bg-blue-500 hover:text-white"
              onClick={() => setShowDialog(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export { Dialog };
