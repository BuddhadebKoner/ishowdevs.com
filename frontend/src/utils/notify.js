import toast from 'react-hot-toast';

const notify = (message, type = 'error') => {
  switch (type) {
    case 'success':
      toast.success(message, {
        duration: 5000,
        position: 'top-right',
      });
      break;
    case 'error':
      toast.error(message, {
        duration: 5000,
        position: 'top-right',
      });
      break;
    case 'loading':
      toast.loading(message, {
        duration: Infinity,
        position: 'top-right',
      });
      break;
    default:
      toast(message, {
        duration: 4000,
        position: 'top-right',
      });
  }
};

export default notify;
