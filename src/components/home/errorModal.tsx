import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setErrorMessage } from "../../redux/reducers/dataSlice";
interface ModalProps {
  message: string;
}
const ErrorModal: React.FC<ModalProps> = (props) => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.dataReducer.errorMessage);

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(setErrorMessage(""));
    }, 3000);
  }, [selector]);

  return (
   selector?  <div className='modalContainer' onClick={() => dispatch(setErrorMessage("asdasdasd"))}>
      <span>{props.message}</span>
    </div> : null
  );
};

export default ErrorModal;
