import { toast } from 'react-toastify';

const toastUtils = {
    toastSuccess: (message, option) => {
        toast.success(message, { ...option });
    },
    toastError: (message, option) => {
        toast.error(message, { ...option });
    },
    toastWarning: (message, option) => {
        toast.warning(message, { ...option });
    },
};
export default toastUtils;
